const setStatus = require('../utils/setStatus');
const setRoom = require('../utils/setRoom');
const User = require('../models/user.js');

/**
 * @param {import('socket.io').Socket} socket
 */
const handler = (io, socket) => {
  socket.on('status', async ({ userID, online }) => {
    if (!socket.user) socket.user = await User.findById(userID).exec();

    await setStatus(userID, online, {
      socketID: socket.id,
    });
  });

  socket.on('room', async ({ roomID, userID }) => {
    if (!socket.user) socket.user = await User.findById(userID).exec();

    const { _id } = socket.user ?? {};
    await setRoom(io, _id ?? userID, roomID, socket);
  });

  socket.on('message', (message) => {
    if (!socket.user) socket.user = await User.findById(message.userID).exec();

    io.sockets.in(socket.room).emit('user:message', message);
  });

  socket.once('disconnect', async () => {
    if (!socket.user) return;

    await Promise.all([
      setStatus(socket.user, false, {
        socketID: null,
      }),
      setRoom(io, socket?.user?._id, 'landing', socket),
    ]);
  });
};

module.exports = handler;
