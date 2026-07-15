const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      // In a real system this would always be hashed. Seed script hashes it.
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Employee', 'Admin'],
      required: true,
      default: 'Employee',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
