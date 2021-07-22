const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, default: 'Default User' },
  socketID: { type: String },
  image: { type: String, default: 'https://placeimg.com/32/32/nature' },
  isOnline: { type: Boolean, default: false },
  roomID: { type: String },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
