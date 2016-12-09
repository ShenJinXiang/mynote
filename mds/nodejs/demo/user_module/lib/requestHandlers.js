// lib/requestHandlers.js
const querystring = require('querystring');
const url = require('url');
const uuid = require('node-uuid');
const render = require('./render');
const db = require('./dbUtil');

exports.index = function (req, res) {
	render.index(res);
};

exports.user = function (req, res) {
	db.queryList(function (data) {
		render.user(res, data);
	});
};

exports.addUser = function (req, res) {
	getParam(req, function (params) {
		params.id = uuid.v4();
		db.save(params, function () {
			res.writeHead(302, {'location': '/user'});
			res.end();
		});
	});	
};

exports.addUserForm = function (req, res) {
	render.addUserForm(res);
};

exports.updUser = function (req, res) {
	getParam(req, function (params) {
		db.save(params, function () {
			res.writeHead(302, {'location': '/user'});
			res.end();
		});
	});
};

exports.updUserForm = function (req, res) {
	getParam(req, function (param) {
		db.queryById(param.id, function (data) {
			render.updUserForm(res, data);
		});
	});
};

exports.delUser = function (req, res) {
	getParam(req, function(param) {
		db.delById(param.id, function () {
			res.writeHead(302, {'location': '/user'});
			res.end();
		});
	});
};

/**
 * 获取请求参数
 */
function getParam (req, callback) {
	if (req.method === 'POST' || req.method === 'post') {
		let post = '';
		req.on('data', function (chunk) {
			post += chunk;
		});
		req.on('end', function () {
			post = querystring.parse(post);
			callback(post);
		});
	} else {
		let param = url.parse(req.url, true).query;
		callback(param);
	}
}
