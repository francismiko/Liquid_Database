const dotenv = require('dotenv');
const env = process.env;

dotenv.config();


const config = {
  port: env.PORT || 3000,// 后端服务端口
  url: env.MONGODB_URL || "mongodb://localhost:27017",//数据库配置
}

module.exports = config;