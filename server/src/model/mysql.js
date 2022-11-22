const mongoose = require('./index');

var mysqlSchema = new mongoose.Schema({
  uid: { type: String },
  mysql_host: { type: String },
  mysql_port: { type: String },
  mysql_user: { type: String },
  mysql_password: { type: String },
  mysql_database: { type: String },
}, { versionKey: false });

var mysqlConfig = mongoose.model('mysql_config', mysqlSchema)

module.exports = mysqlConfig;