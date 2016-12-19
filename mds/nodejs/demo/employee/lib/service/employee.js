// lib/service/employee.js

const uuid = require('node-uuid');
const mysqlUtil = require('../utils/mysqlUtil');

/**
 * 获取员工列表
 */
exports.queryList = function (departmentId, callback) {
	mysqlUtil.query({
		sql: 'select a.id, a.name, a.departmentId, (select name from department where id = a.departmentId) departmentName, a.age, a.sex, a.address, a.desc from employee a where a.departmentId = ?',
		values: [departmentId]
	}, callback);
};

/**
 * 添加员工
 */
exports.addEmployee = function (obj, callback) {
	obj.id = uuid.v4();
	mysqlUtil.save('employee', obj, callback);
};

/**
 * 删除员工
 */
exports.delEmployee = function (id, callback) {
	mysqlUtil.delById('employee', id, callback);
}

/**
 * 修改员工
 */
exports.updEmployee = function (obj, callback) {
	delete obj.departmentId;
	mysqlUtil.update('employee', obj, callback);
}

/**
 * 获取一条员工记录
 */
exports.queryOne = function (id, callback) {
	mysqlUtil.query ({
		sql: 'select a.id, a.name, a.departmentId, (select name from department where id = a.departmentId) departmentName, a.age, a.sex, a.address, a.desc from employee a where a.id = ?',
		values: [id]
	}, function (err, data) {
		if (err) {
			callback(err);
		} else {
			if (data.length !== 1) {
				callback(new Error('返回记录不正确'));
			} else {
				callback(null, data[0]);
			}
		}
	});
}
