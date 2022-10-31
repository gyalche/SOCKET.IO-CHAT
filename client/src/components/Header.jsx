import { Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Header = ({ socket }) => {
  const navigate = useNavigate();
  //   const { socket } = useOutletContext();
  const [rooms, setRooms] = useState([]);
  //new room created;
  const createNewRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    socket.emit('new-room-created', { roomId });
    setRooms([...rooms, roomId]);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('new-room-created', ({ roomId }) => {
      setRooms([...rooms, roomId]);
    });
  }, [socket, rooms]);

  //fetching rooms;
  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch('http://localhost:4000/rooms');
      const data = await res.json();
      console.log(data);
      setRooms(data);
    }
    fetchRooms();
  }, []);
  return (
    <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'white' }}>Home</Button>
          </Link>

          {rooms.length > 0 &&
            rooms.map((room) => (
              <Link
                to={`/room/${room.roomId}`}
                key={room._id}
                style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'white' }} variant="text">
                  {room.name}
                </Button>
              </Link>
            ))}
        </Box>

        <Button sx={{ color: 'white' }} variant="text" onClick={createNewRoom}>
          New Room
        </Button>
      </Box>
    </Card>
  );
};

export default Header;
