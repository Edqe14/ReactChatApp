const User = require('../../../models/user.js');

const get = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: 'Unknown user' });

  res.json(user);
};

module.exports = { get };
