import { Typography } from '@mui/material';
import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { socket } = useOutletContext();
  console.log(socket);
  return <Typography>Welcome to my chat system</Typography>;
};

export default Home;
