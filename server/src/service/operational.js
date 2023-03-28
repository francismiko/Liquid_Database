const sequelize_init_ = require('../lib/sequelize');

class OperationalService {
  async queryTables(host, port, user, password, database) {
    // 初始化sequelize连接池
    const sequelize = await sequelize_init_(host, port, user, password, database);

    // 查询数据表参数
    /**
    * @TODO 需要返回数组对象
    */
    var array = [{
      table_name: '',
      table_engine: '',
      table_autoincrement: '',
      table_bytes: '',
      table_description: '',
    }];

    const table_name = '1' //await sequelize.getQueryInterface().showAllTables();
    const table_engine = '1';
    const table_autoincrement = '1';
    const table_bytes = '1';
    const table_description = '1';

    for (let i = 0; i < 1; i++) {
      array[i].table_name = table_name;
      array[i].table_engine = table_engine;
      array[i].table_autoincrement = table_autoincrement;
      array[i].table_bytes = table_bytes;
      array[i].table_description = table_description;
    }

    return array
  }
}

module.exports = new OperationalService();