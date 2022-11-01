import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
  Card,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useOutletContext, useParams } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  const { roomId } = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', (data) => {
        setChat((prev) => [...prev, { message: data.message, received: true }]);
      });
      socket.on('typing-started-from-server', () => {
        setTyping(true);
      });
      socket.on('typing-stoped-from-server', () => {
        setTyping(false);
      });
      socket.on('uploaded', (data) => {
        console.log(data);
        setChat((prev) => [
          ...prev,
          { message: data.buffer, received: true, type: 'image' },
        ]);
      });
    } else {
      return;
    }
  }, [socket, chat]);

  const handleForm = (e) => {
    e.preventDefault();
    socket.emit('sent-message', { message, roomId });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage('');
  };

  const [typingTimeout, setTypingTimeout] = useState(null);
  //typing event;
  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit('typing-started', { roomId });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        socket.emit('typing-stoped', { roomId });
      }, 1000)
    );
  }

  const fileRef = useRef();

  function selectFile() {
    fileRef.current.click();
  }

  function fileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result;
      socket.emit('upload', { data, roomId });
      setChat((prev) => [
        ...prev,
        { message: reader.result, received: false, type: 'image' },
      ]);
    };
  }

  async function removeRoom() {
    // await fetch(`http://localhost:4000/rooms/${roomId}`, {
    //   method: 'DELETE',
    // });

    socket.emit('room-removed', { roomId });
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Card
        sx={{
          padding: 2,
          marginTop: 10,
          width: '60%',
          backgroundColor: 'gray',
          color: 'white',
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {roomId && <Typography>Room: {roomId}</Typography>}
          {roomId && (
            <Button
              size="small"
              variant="text"
              color="secondary"
              onClick={removeRoom}>
              Delete Room
            </Button>
          )}
        </Box>

        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) =>
            data.type === 'image' ? (
              <img src={data.message} alt="image" width="200" />
            ) : (
              <Typography
                sx={{ textAlign: data.received ? 'left' : 'right' }}
                key={data.message}>
                {data.message}
              </Typography>
            )
          )}
        </Box>

        <Box component="form" onSubmit={handleForm}>
          {typing && (
            <InputLabel shrink htmlFor="message-input">
              <p style={{ color: 'white' }}>Typing...</p>
            </InputLabel>
          )}

          <OutlinedInput
            sx={{
              color: 'white',
              backgroundColor: 'white',
              color: 'black',
              width: '100%',
            }}
            id="message-input"
            lable="Write your message"
            size="small"
            placeholder="Write your message"
            value={message}
            // onChange={(e) => setMessage(e.target.value)}
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <input
                  onChange={fileSelected}
                  ref={fileRef}
                  type="file"
                  style={{ display: 'none' }}
                />
                <IconButton
                  type="submit"
                  edge="end"
                  sx={{ marginRight: 1 }}
                  onClick={selectFile}>
                  <AttachFileIcon />
                </IconButton>
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ChatWindow;
