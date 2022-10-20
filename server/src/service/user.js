const User = require('../model/user');

class UserService {
  // 创建新用户
  async createUser(account, passwd) {
    User.create([
      {
        account: account,
        passwd: passwd,
      }
    ]);
  }
  // 查找用户名是否存在
  async checkAccount(account) {
    const user = User.findOne({
      account: account,
    }).exec();
    return user // null || object
  }
  // 查找账号是否存在
  async checkUser(account, passwd) {
    const user = User.findOne({
      account: account,
      passwd: passwd,
    }).exec();
    return user // null || object
  }
}
module.exports = new UserService();