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
  OutlinedInput,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatWindow = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', (data) => {
        setChat((prev) => [...prev, { message: data.message, received: true }]);
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
          <OutlinedInput
            sx={{
              color: 'white',
              backgroundColor: 'white',
              color: 'black',
              width: '100%',
            }}
            id="outlined-adornment-password"
            lable="Write your message"
            size="small"
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
