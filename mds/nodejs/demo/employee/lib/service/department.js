// lib/service/department.js
const uuid = require('node-uuid');
const mysqlUtil = require('../utils/mysqlUtil');

/**
 * 获取部门数据
 */
exports.departmentTree = function (callback) {
	mysqlUtil.query('select * from department order by createTime asc', callback);
};

/**
 * 根据id获取部门信息
 */
exports.queryDepartmentById = function (id, callback) {
	mysqlUtil.query({
		sql: 'select a.id, a.name, a.pId, (select name from department where id = a.pId) pName from department a where a.id = ?',
		values: [id]
	}, function (err, data) {
		if (err) {
			callback(err);
		} else {
			if (data.length !== 1) {
				callback(new Error('返回记录数量不正确'), data);
			} else {
				callback(null, data[0]);
			}
		}
	});
};

/**
 * 添加部门信息
 */
exports.addDepartment = function (obj, callback) {
	obj.pId = obj.pId || null;
	obj.id = uuid.v4();
	mysqlUtil.save('department', obj, function (err, data) {
		if (err) {
			callback(err);
		} else {
			mysqlUtil.findById('department', obj.id, callback);
		}
	});
};

/**
 * 修改部门信息
 */
exports.updDepartment = function (obj, callback) {
	mysqlUtil.query({
		sql: 'update department set name = ? where id = ?',
		values: [obj.name, obj.id]
	}, function (err, data) {
		if (err) {
			callback(err);
		} else {
			mysqlUtil.findById('department', obj.id, callback);
		}
	});
};

/**
 * 删除部门信息
 */
exports.delDepartment = function (id, callback) {
	mysqlUtil.query({
		sql: 'select count(1) cnt from department where pId = ?',
		values: [id]
	}, function (err, data) {
		if (err) {
			callback(err);
		} else {
			if (data[0].cnt !== 0) {
				callback(new Error('有下级部门，无法删除!'));
			} else {
				mysqlUtil.query({
					sql: 'select count(1) cnt from employee where departmentId = ?',
					values: [id]
				}, function (err, data) {
					if (err) {
						callback(err);
					} else {
						if (data[0].cnt !== 0) {
							callback(new Error('该部门有员工，无法删除!'));
						} else {
							mysqlUtil.delById('department', id, callback);
						}
					}
				});
			}
		}
	});
};
