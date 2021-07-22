const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  _id: {
    type: String,
    required: true,
    validate: {
      validator: (s) => !s.includes(' '),
      message: 'ID could not contain spaces',
    },
  },
  createdAt: { type: Number, default: Date.now },
  creator: { type: String },
});

module.exports = mongoose.model('Room', RoomSchema);
