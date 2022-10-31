import { Box, Container, Typography } from '@mui/material';
import './App.css';
import ChatWindow from './components/ChatWindow';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    setSocket(socket);
  }, []);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Container>
          <Header />

          <Outlet context={{ socket }} />
        </Container>
      </Box>
    </div>
  );
}

export default App;
