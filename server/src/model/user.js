const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  uid: { type: String, default: Date.now() },
  account: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
})

var User = mongoose.model('users', UserSchema)

module.exports = User;