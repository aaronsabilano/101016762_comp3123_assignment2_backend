// models/User.js
// User schema for signup/login

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the structure of a User document in MongoDB
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,     // no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function () {
  // If password wasn't changed, do nothing
  if (!this.isModified('password')) return;

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Helper method to compare plain password with hashed one
userSchema.methods.matchPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
