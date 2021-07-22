const User = require('../models/user.js');
const Room = require('../models/room.js');
const createRoom = require('./createRoom.js');

const setRoom = async (io, id, roomID, socket) => {
  if (!id || !socket || !roomID) return;

  if (!(await Room.exists({ _id: roomID }))) {
    await createRoom(roomID, id);
  }

  socket.join(roomID);
  const { username, image } = socket.user ?? {};
  if (socket.room && socket.room !== 'landing') {
    socket.leave(socket.room);
    io.sockets.in(socket.room).emit('user:leave', { _id: id });
  }

  if (roomID !== 'landing') {
    io.sockets.in(roomID).emit('user:join', {
      _id: id,
      username,
      image,
    });
  }

  socket.room = roomID;

  return await User.findByIdAndUpdate(id, {
    roomID,
  }).exec();
};

module.exports = setRoom;
