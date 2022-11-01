import express from 'express';
import Room from '../../model/Rooms.js';

const router = new express.Router();

router.get('/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

//delete room;
router.delete('/rooms/:roomId', async (req, res) => {
  req.params.roomId;
  const rooms = await Room.deleteOne({ roomId: req.params.roomId });
  res.json({ data: { message: 'Deleted' } });
});

export default router;
