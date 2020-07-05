const { initMysqlPool } = require('./../config/database/mysql');
const pool = initMysqlPool();

class UserModel {
  constructor({
    id = 0,
    name = '',
    email = '',
    site = '',
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.site = site;
  }

  // 注册用户
  insertData({
    name = '',
    email = '',
    site = '',
  }) {
    return pool.query('INSERT into users SET ?', {
      name,
      email,
      site,
    })
  }

  // 查找所有用户
  findAllUsers() {
    return pool.query('SELECT * FROM users');
  }

  // 通过名字查找用户信息
  findDataByName( name ) {
    return pool.query(
      'SELECT * FROM users WHERE name = ?',
      [
        name,
      ]
    )
  }
}

module.exports = UserModel;
