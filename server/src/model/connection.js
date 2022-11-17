const mongoose = require('./index');

var ConnectionSchema = new mongoose.Schema({
  _id: { type: String },
  mysql_host: { type: String },
  mysql_port: { type: Number },
  mysql_user: { type: String },
  mysql_password: { type: String },
  mysql_database: { type: String },
}, { versionKey: false })

var Connection = mongoose.model('connection', ConnectionSchema)

module.exports = Connection;