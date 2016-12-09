// lib/dbUtil.js
const fs = require('fs');

/**
 * 存放数据的文件
 */
let dbPath = './lib/data.txt';

/**
 * 获取所有数据
 */
let queryList = exports.queryList = function (callback) {
	fs.readFile(dbPath, 'utf-8', function (err, data) {
		if (err) throw err;
		let obj = {};
		if (data) {
			obj = JSON.parse(data);
		}
		callback(obj);
	});
};

/**
 * 根据id获取一条记录
 */
let queryById = exports.queryById = function (id, callback) {
	queryList(function (obj) {
		let data = obj[id];
		callback(data);
	});
};

/**
 * 保存一条记录，如果id存在则修改，不存在则新增
 */
let save = exports.save = function (obj, callback) {
	queryList(function (data) {
		data[obj.id] = {
			"id": obj.id,
			"name": obj.name,
			"age": obj.age,
			"address": obj.address,
			"discription": obj.discription
		};

		fs.writeFile(dbPath, JSON.stringify(data), function(err) {
			if (err) throw err;
			callback();
		});
	});
};

/**
 * 根据id删除一条记录
 */
let delById = exports.delById = function (id, callback) {
	queryList(function (data) {
		delete data[id];

		fs.writeFile(dbPath, JSON.stringify(data), function(err) {
			if (err) throw err;
			callback();
		});
	});
};
