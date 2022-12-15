const mongoose = require('mongoose');

var UserActionsSchema = new mongoose.Schema({
  account: { type: String },
  action_type: { type: String },
  action_content: { type: String },
  action_date: { type: Date },
})

var UserActions = mongoose.model('user_actions', UserActionsSchema)

module.exports = UserActions;