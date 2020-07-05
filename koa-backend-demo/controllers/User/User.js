'use strict';

const ApiResponse = require('./../../utils/ApiResponse/ApiResponse');
const { awaitWrap } = require('./../../utils/utils');
const UserModel = require('./../../models/UserModel');

const userModel = new UserModel({});

class User {

  async getUserList(ctx, next) {
    const res = new ApiResponse({});

    const [data, err] = await awaitWrap(
      userModel.findAllUsers()
    )
    if (err) {
      res.errDetail = err;
      ctx.body = res;
      return false;
    }

    const [userData] = data;

    res.code = 0;
    res.msg = '请求成功';
    res.data = userData;
    ctx.body = res;
  }

  async createUser(ctx, next) {
    const res = new ApiResponse({});

    const name = ctx.request.query.name || "";
    const email = ctx.request.query.email || "";
    const site = ctx.request.query.site || "";

    const userData = await this._getUserByName(name);
    if (
      userData.code === 0 &&userData.data &&
      userData.data.length > 0
    ) {
      res.code = 0;
      res.msg = '已存在该用户名';
      res.data = userData.data;
      ctx.body = res;
      return true;
    }
    
    const [data, err] = await awaitWrap(
      userModel.insertData({
        name,
        email,
        site,
      })
    );
    if (err) {
      res.errDetail = err;
      ctx.body = res;
      return false;
    }

    const [insertData] = data;

    res.code = 0;
    res.msg = '请求成功';
    res.data = [
      new UserModel({
        id: insertData.insertId,
        name: name,
        email: email,
        site: site,
      })
    ]

    ctx.body = res;
  }

  async _getUserByName(name) {
    const res = new ApiResponse({});

    if (!name) {
      res.msg = '用户姓名不能为空';
      return res;
    }

    const [data, err] = await awaitWrap(
      userModel.findDataByName(name)
    );
    if (err) {
      res.errDetail = err;
      return res;
    }

    const [userData] = data;
    if (userData.length > 0) {
      res.code = 0;
      res.msg = '请求成功';
      res.data = userData;
    } else {
      res.code = 0;
      res.msg = '用户信息不存在';
      res.data = []
    }

    return res;
  }

  async getUserByName(ctx, next) {
    const name = ctx.request.query.name || "";
    const res = await this._getUserByName(name);

    ctx.body = res;
  }
}

module.exports = User;
