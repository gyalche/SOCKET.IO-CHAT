import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(cors());

import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//creating server from the http and we have use the express instance;
const httpServer = http.createServer(app); // we can link this server to the socket server;
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    // allowedHeaders: ['my-custom-header'],
    // credentials: true,
  },
});

//connection;
io.on('connection', (socket) => {
  //we are listening to send-message from client side;
  //and we are reciveivng the data;
  socket.on('sent-message', (data) => {
    socket.broadcast.emit('message-from-server', data);
    console.log('message received', data);
  });
  socket.on('typing-started', (data) => {
    socket.broadcast.emit('typing-started-from-server');
  });
  socket.on('typing-stoped', () => {
    socket.broadcast.emit('typing-stoped-from-server');
  });
  socket.on('disconnect', (socket) => {
    console.log('User is disconnected');
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
