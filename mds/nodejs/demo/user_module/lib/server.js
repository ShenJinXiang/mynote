// lib/server.js
const http = require('http');

exports.start = function (route, handle) {
	function onRequest(req, res) {
		route(handle, req, res);
	}
	http.createServer(onRequest).listen(3000);
	console.log('Server running at 3000 port.');
}
