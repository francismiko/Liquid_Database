const mongoose = require('./index');

var UserSchema = new mongoose.Schema({
  account: { type: String },
  passwd: { type: String },
})


var UserModel = mongoose.model('user', UserSchema)


module.exports = UserModel;