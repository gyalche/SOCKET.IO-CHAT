import { Button, Card } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const roomId = uuidv4();

  return (
    <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button sx={{ color: 'white' }}>Home</Button>
      </Link>
      <Link to="/chats" style={{ textDecoration: 'none' }}>
        <Button sx={{ color: 'white' }} variant="text">
          Chats
        </Button>
      </Link>
      <Link to={`/room/${roomId}`} style={{ textDecoration: 'none' }}>
        <Button sx={{ color: 'white' }} variant="text">
          Rooms
        </Button>
      </Link>
    </Card>
  );
};

export default Header;
