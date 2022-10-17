const mongoose = require('mongoose');
const config = require('../config');
const db = mongoose.connection;

mongoose.connect(config.url);

db.on('error', console.error.bind(console, 'connection error:'));

db.once("open", () => {
  console.log(`MongoDB connecting with ${config.url}`);
})

module.exports = mongoose;