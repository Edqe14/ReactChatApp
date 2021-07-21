const setStatus = require('../utils/setStatus');

/**
 * @param {import('socket.io').Socket} socket
 */
const handler = (socket) => {
  socket.on('status', async ({ userID, online }) => {
    socket.user = userID;

    await setStatus(userID, online, {
      socketID: socket.id,
    });
  });

  socket.once('disconnect', () => {
    if (!socket.user) return;
    setStatus(socket.user, false, {
      socketID: null,
      roomID: 'landing',
    });
  });
};

module.exports = handler;
