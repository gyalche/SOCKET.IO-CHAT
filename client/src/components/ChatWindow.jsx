import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
  Card,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useOutletContext } from 'react-router-dom';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  const { socket } = useOutletContext();

  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', (data) => {
        setChat((prev) => [...prev, { message: data.message, received: true }]);
      });
      socket.on('typing-started-from-server', () => {
        setTyping(true);
      });
      socket.on('typing-stoped-from-server', () => {
        setTyping(false);
      });
    } else {
      return;
    }
  }, [socket, chat]);

  const handleForm = (e) => {
    e.preventDefault();
    socket.emit('sent-message', { message });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage('');
  };

  const [typingTimeout, setTypingTimeout] = useState(null);
  //typing event;
  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit('typing-started');

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        socket.emit('typing-stoped');
      }, 1000)
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Card
        sx={{
          padding: 2,
          marginTop: 10,
          width: '60%',
          backgroundColor: 'gray',
          color: 'white',
        }}>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) => (
            <Typography
              sx={{ textAlign: data.received ? 'left' : 'right' }}
              key={data.message}>
              {data.message}
            </Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleForm}>
          {typing && (
            <InputLabel shrink htmlFor="message-input">
              <p style={{ color: 'white' }}>Typing...</p>
            </InputLabel>
          )}

          <OutlinedInput
            sx={{
              color: 'white',
              backgroundColor: 'white',
              color: 'black',
              width: '100%',
            }}
            id="message-input"
            lable="Write your message"
            size="small"
            placeholder="Write your message"
            value={message}
            // onChange={(e) => setMessage(e.target.value)}
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ChatWindow;
