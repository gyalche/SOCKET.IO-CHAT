import { Button, Card } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const roomId = uuidv4();

  return (
    <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
      <Link to="/">
        <Button sx={{ color: 'white', textDecoration: 'none' }}>Home</Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Chats
        </Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Rooms
        </Button>
      </Link>
    </Card>
  );
};

export default Header;
