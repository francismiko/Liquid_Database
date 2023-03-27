const Sequelize = require('sequelize');

const sequelize_init_ = (host, port, user, password, database) => {
  return new Sequelize(database, user, password, {
    host: host,    //数据库地址,默认本机
    port: port,
    dialect: 'mysql',
    pool: {   //连接池设置
      max: 10, //最大连接数
      min: 0, //最小连接数
      idle: 10000
    },
  });
}

module.exports = sequelize_init_;