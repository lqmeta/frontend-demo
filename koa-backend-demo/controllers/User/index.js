'use strict'

const User = require('./User');
const user = new User();

module.exports = {
  'GET /user/get-user-by-name': user.getUserByName.bind(user),
  'GET /user/get-user-list': user.getUserList.bind(user),
  'GET /user/create-user': user.createUser.bind(user),
}
