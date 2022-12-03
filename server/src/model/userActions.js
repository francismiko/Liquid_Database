const mongoose = require('./index');

var UserActionsSchema = new mongoose.Schema({
  account: { type: String },
  action_type: { type: String },
  action_content: { type: String },
  action_date: { type: Date },
}, { versionKey: false })

var UserActions = mongoose.model('user_actions', UserActionsSchema)

module.exports = UserActions;