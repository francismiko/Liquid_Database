const mongoose = require('./index');

var UserSchema = new mongoose.Schema({
  account: { type: String },
  password: { type: String },
  permission: { type: String, default: 'user' },
}, { versionKey: false })

var User = mongoose.model('user', UserSchema)

module.exports = User;