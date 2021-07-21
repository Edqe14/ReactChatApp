const User = require('../../models/user.js');

const post = async (req, res) => {
  const { isNew, userID, username } = req.body;

  if (!isNew && !(await User.exists({ _id: userID }))) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (isNew) {
    if (!username) {
      return res.status(400).json({ message: 'Username must not be empty' });
    }

    const newUser = new User({
      _id: userID,
      username,
      socketID: null,
      roomID: 'landing',
      isOnline: false,
    });

    await newUser.save();
  }

  return res.json({ message: 'OK', userID });
};

module.exports = { post };
