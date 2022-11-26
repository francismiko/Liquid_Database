const mongoose = require('./index');

var UserSchema = new mongoose.Schema({
  uid: { type: String, default: Date.now() },
  account: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { versionKey: false })

var User = mongoose.model('users', UserSchema)

module.exports = User;