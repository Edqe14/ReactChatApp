const Room = require('../../../models/room.js');

const get = async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) return res.status(404).json({ message: 'Unknown room' });

  return res.json(room);
};

module.exports = { get };
