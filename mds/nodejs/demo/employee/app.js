// app.js
const express = require('express');
const path = require('path');
const url = require('url');

let app = express();

/**
 * 设置视图，引入ejs
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * 设置静态文件路面
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 引入express-session
 */
app.use(require('express-session')({
	secret: 'shenjinxiang',
	saveUninitialized: true
}));

/**
 * 引入body-parser
 */
app.use(require('body-parser')());

/**
 * 引入路由日志
 */
app.use(require('./lib/middleware/routeLog'));

/**
 * 登录拦截器
 */
app.use(require('./lib/middleware/loginFilter'));

app.use('/', require('./lib/routes/index'));
// 部门路由
app.use('/department', require('./lib/routes/department'));
// 员工路由
app.use('/employee', require('./lib/routes/employee'));


app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});
