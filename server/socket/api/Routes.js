import express from 'express';
import Room from '../../model/Rooms.js';

const router = new express.Router();
router.get('/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

export default router;
