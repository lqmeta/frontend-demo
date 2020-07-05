'use strict'

class ApiResponse {
  constructor({
    code = 500,
    data = {},
    msg = '系统异常',
    errDetail = '',
  }) {
		this.code = code;
		this.data = data;
		this.msg = msg;
		this.errDetail = errDetail;
	}
}

module.exports = ApiResponse;
