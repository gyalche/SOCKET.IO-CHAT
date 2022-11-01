import TypingController from './controller/TypingController.js';
import RoomController from './controller/RoomController.js';
import MessageController from './controller/MessageController.js';
import fs from 'fs';
const sockets = (socket) => {
  //creating an instance of typingcontroller;
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);
  const messageController = new MessageController(socket);

  //we are listening to send-message from client side;
  //and we are reciveivng the data;
  socket.on('sent-message', messageController.sentMessage);
  socket.on('typing-started', typingController.typingStarted);

  socket.on('typing-stoped', typingController.typingStopped);

  socket.on('join-room', roomController.joinRoom);
  socket.on('new-room-created', roomController.newRoomCreated);
  socket.on('room-removed', roomController.roomRemoved);
  socket.on('upload', ({ data, roomId }) => {
    console.log(data);
    fs.writeFile('upload' + 'test.png', data, { encoding: 'base64' }, () => {});
    socket.to(roomId).emit('upload', { buffer: data.toString('base64') });
  });
  socket.on('disconnect', (socket) => {
    console.log('User is disconnected');
  });
};

export default sockets;
