import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
const Room = () => {
  const params = useParams();
  const socket = io('http://localhost:4000');

  console.log(params);
  useEffect(() => {
    socket.emit('join-room', { roomId: params.roomId });
  }, [params]);
  return <div>Room</div>;
};

export default Room;
