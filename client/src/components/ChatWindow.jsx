import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
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

  const handleForm = (e) => {
    e.preventDefault();
    socket.emit('sent-message', { message });
    setMessage('');
  };
  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', (data) => {
        setChat((prev) => [...prev, data.message]);
      });
    } else {
      return;
    }
  }, [socket, chat]);
  return (
    <div>
      <Box sx={{ marginBottom: 5 }}>
        {chat.map((message) => (
          <Typography key={message}>{message}</Typography>
        ))}
      </Box>

      <Box component="form" onSubmit={handleForm}>
        <OutlinedInput
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
    </div>
  );
};

export default ChatWindow;
