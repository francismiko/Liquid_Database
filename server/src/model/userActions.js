const mongoose = require('./index');

var UserActionsSchema = new mongoose.Schema({
  uid: { type: String },
  account: { type: String },
  action: { type: String },
  date: { type: Date },
}, { versionKey: false })

var UserActions = mongoose.model('user_actions', UserActionsSchema)

module.exports = UserActions;