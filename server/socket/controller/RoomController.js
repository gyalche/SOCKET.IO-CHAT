import Room from '../../model/Rooms.js';
import BaseController from './BaseController.js';
export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
  };

  newRoomCreated = ({ roomId }) => {
    const room = new Room({
      name: 'Test',
      roomId: roomId,
    });
    room.save();
    this.socket.broadcast.emit('new-room-created', { roomId });
  };
}
