import { Box, Container, Typography } from '@mui/material';
import './App.css';
import ChatWindow from './components/ChatWindow';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookies';
function App() {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    setSocket(io('http://localhost:4000'));
    const _userId = Cookies.getItem('userId');

    if (_userId) {
      setUserId(true);
    }
    // setSocket(socket);
  }, []);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Container>
          <Header socket={socket} userId={userId} setUserId={setUserId} />
          <Outlet context={{ socket, userId }} />
        </Container>
      </Box>
    </div>
  );
}

export default App;
