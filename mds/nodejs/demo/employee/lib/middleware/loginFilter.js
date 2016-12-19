// lib/middleware/loginFilter.js
const noLogin = require('../config').noLogin;
const url = require('url');

/**
 * 登录session验证 中间件
 */
module.exports = function (req, res, next) {
    let pathname = url.parse(req.url).pathname;
    if (noLogin.indexOf(pathname) < 0 && !req.session.currentUser) {
        res.redirect('/');
    } else {
        next();
    }
};
