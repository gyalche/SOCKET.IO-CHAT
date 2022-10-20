import './App.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    setSocket(socket);
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    // console.log(message);
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
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </Box>
        Hello Socket
        <Box component="form" onSubmit={handleForm}>
          <TextField
            label="Write Your Message"
            variant="standard"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="text" type="submit">
            SEND
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
