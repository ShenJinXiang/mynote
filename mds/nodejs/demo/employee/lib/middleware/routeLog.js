// lib/middleware/routeLog.js
const url = require('url');
const util = require('util');

/**
 * 用于打印每次请求的路径和参数
 */
module.exports = function(req, res, next) {
    let pathname = url.parse(req.url).pathname;
    util.log('请求路径:', pathname);
    if (req.method === 'GET' || req.method === 'get') {
        util.log('Get请求，参数:', req.query);
        next();
    } else if (req.method === 'POST' || req.method === 'post') {
        util.log('POST请求，参数:', req.body);
        next();
    }
};
