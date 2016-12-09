// lib/route.js
const util = require('util');
const url = require('url');

function route(handle, req, res) {
	let urlObj = url.parse(req.url, true);
	let pathname = urlObj.pathname;
	util.log('请求路径：', pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](req, res);
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('<p>404 Not found</p>');
		res.end();
	}
}

exports.route = route;
