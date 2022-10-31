import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import sockets from './socket/routes.js';
import mongoose from 'mongoose';
import router from './socket/api/Routes.js';

dotenv.config();
const app = express();
app.use(morgan('dev'));

import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

mongoose
  .connect(
    'mongodb+srv://dawa:dawa@cluster0.b5xdyqs.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log(`mongo db is connect at ${data.connection.host}`);
  });
app.use(cors());
app.use('/', router);

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
io.on('connection', sockets);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
