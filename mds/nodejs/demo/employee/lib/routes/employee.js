// lib/routes/employee.js

const express = require('express');
const employee = require('../service/employee');

let router = express.Router();

/**
 * 获取员工列表信息
 */
router.post('/queryList', function (req, res) {
	employee.queryList(req.body.departmentId, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			res.json({result: true, data: data});
		}
	});
});

/**
 * 添加员工信息
 */
router.post('/addEmployee', function (req, res) {
	employee.addEmployee(req.body, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			res.json({result: true, data: data});
		}
	});
});

/**
 * 删除员工记录
 */
router.post('/delEmployee', function (req, res) {
	employee.delEmployee(req.body.id, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			res.json({result: true});
		}
	});
});

/**
 * 查询一条记录
 */
router.post('/queryOne', function (req, res) {
	employee.queryOne(req.body.id, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			res.json({result: true, data: data});
		}
	});
});

/**
 * 修改员工记录
 */
router.post('/updEmployee', function (req, res) {
	employee.updEmployee(req.body, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			res.json({result: true});
		}
	});
});

module.exports = router;
