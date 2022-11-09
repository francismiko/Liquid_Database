const mongoose = require('./index');

var UserSchema = new mongoose.Schema({
  account: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { versionKey: false })

var User = mongoose.model('user', UserSchema)

module.exports = User;