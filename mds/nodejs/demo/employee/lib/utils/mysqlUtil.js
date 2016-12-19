// lib/utils/mysqlUtil.js
const mysql = require('mysql');
const dbConfig = require('../Config').mysql;

let pool = mysql.createPool(dbConfig);

/**
 * 通用查询
 */
let query = exports.query = function (sql, callback) {
	console.log(sql);
	pool.getConnection(function (err, conn) {
		if (err) {
			callback(err);
		} else {
			conn.query(sql, function (err, rows, fields) {
				conn.release();
				console.log(rows);
				callback(err, rows, fields);
			});
		}
	});
};

/**
 * 判断obj是否为对象，也不是{}，即至少有一个属性
 */
let isNotEmptyObject = function (obj) {
	if (typeof obj !== 'object') {
		return false;
	}
	for (let k in obj) {
		return true;
	}
	return false;
}

/**
 * 根据id获取一条记录
 * tableName 数据库表名
 * idName 表主键的名称，默认为'id'
 * idValue 表主键的值
 * callback 回调函数
 */
exports.findById = function () {
	let tableName, idName, idValue, callback;
	if (arguments.length === 3) {
		tableName = arguments[0];
		idName = 'id';
		idValue = arguments[1];
		callback = arguments[2];
	} else if (arguments.length == 4) {
		tableName = arguments[0];
		idName = arguments[1];
		idValue = arguments[2];
		callback = arguments[3];
	} else {
		throw new Error('参数个数错误');
	}
	query({
		sql: 'select * from ' + tableName + ' where ' + idName + ' = ?',
		values: [idValue]
	}, function (err, data) {
		if (err) {
			callback(err);
		} else {
			if (data.length === 0) {
				callback(null, {});
			} else if (data.length === 1) {
				callback(null, data[0]);
			} else {
				callback(new Error('结果错误'));
			}
		}
	});
};

/**
 * 保存一条记录
 * tableName 表名
 * obj 要保存的对象
 * callback 回调函数
 */
exports.save = function(tableName, obj, callback) {
	if (!isNotEmptyObject(obj)) {
		callback(new Error('参数错误'));
		return;
	}
	let sql = 'insert into ' + tableName + ' (';
	let temp = 'values (';
	let values = [];

	for (let k in obj) {
		sql += ' `' + k + '`,';
		temp += ' ?,';
		values.push(obj[k]);
	}
	sql = sql.substring(0, sql.length - 1) + ') ';
	temp = temp.substring(0, temp.length - 1) + ') ';
	sql += temp;
	query({sql: sql, values: values}, function (err, data) {
		callback(err, data);
	});
};

/**
 * 修改一条记录
 * tableName 对应的数据库表名
 * idName 对应的数据库表主键名称
 * obj 修改的对象
 * callback 回调函数
 */
exports.update = function () {
	let tableName, idName, obj, callback;
	if (arguments.length === 3) {
		tableName = arguments[0];
		idName = 'id';
		obj = arguments[1];
		callback = arguments[2];
	} else if (arguments.length === 4) {
		idName = arguments[1];
		obj = arguments[2];
		callback = arguments[3];
	} else {
		throw new Error('参数个数错误');
	}
	if (!isNotEmptyObject(obj)) {
		callback(new Error('参数错误'));
		return;
	}
	if (!obj[idName]) {
		callback(new Error('参数错误'));
		return;
	}

	let sql = 'update ' + tableName + ' set';
	let values = [];
	for (let k in obj) {
		if (k !== idName) {
			sql += ' `' + k + '` = ?,'
			values.push(obj[k]);
		}
	}
	sql = sql.substring(0, sql.length - 1) + ' where ' + idName + ' = ? ';
	values.push(obj[idName]);

	query({sql: sql, values: values}, function (err, data) {
		callback(err, data);
	});
};

/**
 * 根据id删除一条记录
 */
exports.delById = function () {
	let tableName, idName, idValue, callback;
	if (arguments.length === 3) {
		tableName = arguments[0];
		idName = 'id';
		idValue = arguments[1];
		callback = arguments[2]
	} else if (arguments.length === 4) {
		tableName = arguments[0];
		idName = arguments[1];
		idValue = arguments[2];
		callback = arguments[3]
	} else {
		throw new Error('参数个数错误');
	}

	let sql = 'delete from ' + tableName + ' where ' + idName + ' = ?';
	let values = [idValue];
	query({sql: sql, values: values}, function (err, data) {
		callback(err, data);
	});
};
