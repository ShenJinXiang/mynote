// lib/routes/index.js
const express = require('express');
const userService = require('../service/user');
const MD5 = require('../utils/MD5Util');

let router = express.Router();

/**
 * 登录、注册页面
 */
router.get('/', function (req, res) {
	res.render('index');
});

/**
 * 登录验证
 */
router.post('/login', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	userService.queryUserByUsername(username, function (err, data) {
		if (err) {
			res.json({result: false, msg: '用户不存在'});
		} else {
			if (data.length === 1 && data[0].password === MD5.md5(password)) {
				req.session.currentUser = data[0];
				res.json({result: true});
			} else {
				res.json({result: false, msg: '用户或密码错误'});
			}
		}
	});
});

/**
 * 注册用户
 */
router.post('/register', function (req, res) {
	userService.register(req.body, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			req.session.currentUser = data;
			res.json({result: true});
		}
	});
});

/**
 * 验证用户名是否存在
 */
router.post('/checkUsername', function (req, res) {
	userService.queryUserByUsername(req.body.username, function (err, data) {
		if (err) {
			res.json({result: false, msg: err.message});
		} else {
			if (data.length > 0) {
				res.json({result: false, msg: '用户名已经存在'});
			} else {
				res.json({result: true});
			}
		}
	});
});

/**
 * 登出
 */
router.get('/logout', function (req, res) {
	delete req.session.currentUser;
	res.redirect('/');
});

/**
 * 主页面
 */
router.get('/main', function (req, res){
	let user = req.session.currentUser;
	res.render('main', {name: user.name});
});

module.exports = router;
