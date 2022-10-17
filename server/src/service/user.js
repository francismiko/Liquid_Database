const UserModel = require('../model/user');

class UserService {
  async createUser(account, passwd) {
    UserModel.create([
      {
        account: account,
        passwd: passwd,
      }
    ]);
  }
}

module.exports = new UserService();