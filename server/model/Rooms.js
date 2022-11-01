import mongoose from 'mongoose';

const roomsSchema = new mongoose.Schema({
  name: String,
  roomId: String,
  userId: String,
});

const Room = mongoose.model('Room', roomsSchema);
export default Room;
