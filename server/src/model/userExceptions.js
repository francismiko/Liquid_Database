const mongoose = require('./index');

var UserExceptionsSchema = new mongoose.Schema({
  account: { type: String },
  exception_type: { type: String },
  exception_code: { type: Number },
  exception_content: { type: String },
  exception_date: { type: Date },
}, { versionKey: false })

var UserExceptions = mongoose.model('user_exceptions', UserExceptionsSchema)

module.exports = UserExceptions;