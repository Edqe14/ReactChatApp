const Room = require('../models/room');

const createRoom = async (id, creator) => {
  if (!id || !creator) return;
  const _id = id?.replace(/ /gi, '-');

  if (await Room.exists({ _id })) return;

  const newRoom = new Room({
    _id,
    creator,
  });

  return await newRoom.save();
};

module.exports = createRoom;
