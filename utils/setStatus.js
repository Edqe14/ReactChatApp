const User = require('../models/user');

const setStatus = (id, isOnline = false, additional = {}) => {
  if (!id) return;
  return User.findByIdAndUpdate(id, {
    isOnline,
    ...additional,
  }).exec();
};

module.exports = setStatus;
