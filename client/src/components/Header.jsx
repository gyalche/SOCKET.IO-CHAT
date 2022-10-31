import { Button, Card } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
      <Link to="/room/:roomId">
        <Button sx={{ color: 'white', textDecoration: 'none' }} variant="text">
          Rooms
        </Button>
      </Link>
    </Card>
  );
};

export default Header;
