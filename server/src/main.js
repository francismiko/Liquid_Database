const app = require('./app')
const config = require("./config"); // 配置文件

app.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port}`);
});