const sequelize_init_ = require('../lib/sequelize');

class BusinessService {
  async queryTables(host, port, user, password, database) {
    // 初始化sequelize连接池
    const sequelize = await sequelize_init_(host, port, user, password, database);

    const COUNT = (await sequelize.getQueryInterface().showAllTables()).length;
    const table_name = await sequelize.getQueryInterface().showAllTables();
    const table_engine = '1';
    const table_autoincrement = '1';
    const table_bytes = '1';
    const table_description = '1';
    const tables = new Array;

    const getTables = (table_name, table_engine, table_autoincrement, table_bytes, table_description) => {
      return {
        table_name: table_name,
        table_engine: table_engine,
        table_autoincrement: table_autoincrement,
        table_bytes: table_bytes,
        table_description: table_description,
      }
    }

    // 将数据表对象放入数组
    for (let i = 0; i < COUNT; i++) {
      tables.push(getTables(table_name[i], table_engine, table_autoincrement, table_bytes, table_description));
    }

    return tables
  }
}

module.exports = new BusinessService();