import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatWindow from '../components/ChatWindow';
const Room = () => {
  const params = useParams();
  const socket = io('http://localhost:4000');

  console.log(params);
  useEffect(() => {
    if (!socket) return;
    socket.emit('join-room', { roomId: params.roomId });
  }, [params]);
  return (
    <div>
      {/* <Typography>RoomId: {params.roomId}</Typography> */}
      <ChatWindow />
    </div>
  );
};

export default Room;
