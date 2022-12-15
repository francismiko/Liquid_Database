const mongoose = require('mongoose');

var mysqlSchema = new mongoose.Schema({
  uid: { type: String },
  mysql_host: { type: String },
  mysql_port: { type: String },
  mysql_user: { type: String },
  mysql_password: { type: String },
  mysql_database: { type: String },
});

var mysqlConfig = mongoose.model('mysql_configs', mysqlSchema)

module.exports = mysqlConfig;