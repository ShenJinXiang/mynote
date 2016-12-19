// lib/service/user.js

const mysqlUtil = require('../utils/mysqlUtil');
const uuid = require('node-uuid');
const MD5 = require('../utils/MD5Util');

/**
 * 根据用户名获取用户信息
 */
let queryUserByUsername = exports.queryUserByUsername = function (username, callback) {
	mysqlUtil.query({
		sql: 'select * from user where username = ?',
		values: [username]
	}, callback);
};

/**
 * 注册
 */
exports.register = function (obj, callback) {
	queryUserByUsername(obj.username, function (err, data) {
		if (err) {
			callback(err);
		} else if (data.length > 0) {
			callback(new Error('用户名已存在'));
		} else {
			obj.id = uuid.v4();
			obj.registerDate = new Date();
			obj.password = MD5.md5(obj.password);
			mysqlUtil.save('user', obj, function (err, data) {
				if (err) {
					callback(err);
				} else {
					mysqlUtil.findById('user', obj.id, function (err, data) {
						callback(err, data);
					});
				}
			});
		}
	});
};
