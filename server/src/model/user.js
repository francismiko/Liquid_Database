const mongoose = require('./index');

var UserSchema = new mongoose.Schema({
  account: { type: String },
  passwd: { type: String },
})


var User = mongoose.model('user', UserSchema)


module.exports = User;