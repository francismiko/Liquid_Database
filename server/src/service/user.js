const User = require('../model/user');

class UserService {
  // 创建新用户
  async createUser(account, password) {
    User.create({
      account: account,
      password: password,
    }, (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log('新用户创建成功');
        console.log(data);
      }
    });
  }
  // 查找用户名是否存在
  async checkAccount(account) {
    return User.findOne({
      account: account,
    }).exec();
    // null || object
  }
  // 查找账号是否存在
  async checkUser(account, password) {
    return User.findOne({
      account: account,
      password: password,
    }).exec();
    // null || object
  }
}
module.exports = new UserService();