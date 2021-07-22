const Room = require('../../models/room.js');
const newRoom = require('../../utils/createRoom.js');

const get = async (req, res) => {
  const all = await Room.find({});
  return res.json(all.map((r) => r._id));
};

const post = async (req, res) => {
  const { id, connectedSockets, creator } = req.body;
  if (!id || !creator) return res.status(400).json({ message: 'Invalid body' });

  const room = await newRoom(id, creator, connectedSockets);
  return res.json(room);
};

module.exports = { get, post };
