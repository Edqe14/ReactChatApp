const Room = require('../../../models/room.js');
const User = require('../../../models/user.js');

const get = async (req, res) => {
  const _id = req.params.id;

  if (!(await Room.exists({ _id })))
    return res.status(404).json({ message: 'Unknown room' });

  const users = await User.find(
    { roomID: _id },
    {
      _id: 1,
      username: 1,
      image: 1,
    }
  );

  return res.json(users);
};

module.exports = { get };
