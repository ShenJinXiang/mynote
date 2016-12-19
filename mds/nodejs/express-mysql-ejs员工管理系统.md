# express-mysql-ejs员工管理系统
之前介绍过express、ejs的使用，也介绍了nodejs操作mysql数据库，现在将这些整合起来，做一个简单的员工管理系统

## 功能说明

* 数据存储在mysql数据库中，后台用express框架
* 包含一个登陆、注册页面和主页面
* 主页面包括左侧的部门信息，以及右侧的员工列表，可以添加删除修改员工和部门信息

## 目录结构
创建工作目录employee
```
$ mkdir employee
```

1. app.js - 应用启动文件    
2. packag.json - 项目总信息文件    
3. lib目录 - 存放后台js文件    
  3.1. lib/middleware - 中间件目录，自定义的中间件    
  3.2. lib/routes - 路由目录，用于配置路由    
  3.3. lib/service - 业务层目录，后台主要业务都在这个目录下    
  3.4. lib/sql - 数据库表设计sql文件    
  3.5. lib/utils - 工具目录，包括md5加密和操作数据库的工具文件    
  3.6. lib/config.json - 配置文件    
4. node_modules - 保存依赖的第三方包    
5. public - 静态文件目录，包括前段第三方插件、页面css、js文件    
6. views - 存放前段ejs文件    

## 初始化环境
初始化包，创建package.json
```
$ npm init
```

导入express
```
$ npm install express --save
```

导入mysql包
```
$ npm install mysql --save
```

导入ejs模板引擎
```
$ npm install ejs --save
```

导入uuid，用于生成数据库主键id
```
$ npm install node-uuid --save
```

导入body-parser包，用于解析post请求数据
```
$ npm install body-parser --save
```

导入express-session包，用于管理session
```
$ npm install express-session --save
```

创建静态文件根目录public
```
$ mkdir public
```

public目录下创建plugin目录，存放前段第三方插件
```
$ mkdir public/plugin
```

plugin目录中导入第三方插件:
* jquery.js - jquery插件
* jquery.form.js - jquery from表单插件
* ztrr - 树形控件
* layer - 弹出框控件

## 项目配置文件
创建lib目录
```
$ mkdir lib
```

lib目录下创建config.json
```
$ touch lib/config.json
```

编辑config.json
```json
{
	"mysql": {
		"user": "root",
		"password": "6098",
		"host": "localhost",
		"port": 3306,
		"database": "nodejs",
		"connectionLimit": 10
	},
	"noLogin": ["/", "/login", "/register", "/checkUsername"]
}
```
mysql指明数据库配置信息
* user - 数据库用户名
* password - 数据库用户密码
* host - 数据库地址
* port - 数据库端口
* database - 数据库名
* connectionLimit - 连接池连接数

noLogin 指明拦截配置信息，除了noLogin指定的路由，其他所有请求都需要session验证

## 创建MD5工具模块
有登录、注册功能，针对密码做个简单的MD5处理，lib目录下创建utils目录
```
$ mkdir lib/utils
```

utils目录下创建MD5Util.js
```
$ touch lib/utils/MD5Util.js
```

编辑MD5Util.js
```javascript
// lib/utils/MD5Util.js
const crypto = require('crypto');

exports.md5 = function (content) {
	if (typeof content !== 'string') {
		return '';
	}
	let md5 = crypto.createHash('md5');
	md5.update(content);
	return md5.digest('hex');
};

exports.sha1 = function (content) {
	if (typeof content !== 'string') {
		return '';
	}
	let shasum = crypto.createHash('sha1');
	shasum.update(content);
	return shasum.digest('hex');
};
```

## 创建数据库操作模块
utils目录下创建mysqlUtil.js
```
$ touch /lib/utils/mysqlUtil.js
```

编辑mysqlUtil.js文件
```javascript
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
```

## 创建数据库表
lib目录下创建sql目录
```
$ mkdir lib/sql
```

sql目录下创建mysql.sql文件
```
$ touch lib/sql/mysql.sql
```

由于功能简单，所以数据库表只有3个，user表，用于登录、注册；department部门表，为树形结构数据以及employee员工表，编辑mysql.sql
```sql
/**
 * // lib/sql/mysql.sql
 * 初始化数据库表
 */

-- 用户表
CREATE TABLE `user` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `username` varchar(255) DEFAULT NULL COMMENT '登录用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '登录密码',
  `registerDate` date DEFAULT NULL COMMENT '注册日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 用户表插入系统管理员记录
insert into user (`id`, `name`, `username`, `password`, `registerDate`) values (UUID(), '系统管理员', 'admin', MD5('admin'), now());

-- 部门表
CREATE TABLE `department` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `pId` varchar(64) DEFAULT NULL COMMENT '上级部门id',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 员工表
CREATE TABLE `employee` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `departmentId` varchar(64) DEFAULT NULL COMMENT '部门id',
  `age` int(3) DEFAULT NULL COMMENT '年龄',
  `sex` int(1) DEFAULT NULL COMMENT '性别 1 男   2 女',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `desc` text COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

命令行登录mysql服务器，执行下面的命令，运行sql脚本
```
mysql> use nodejs;
mysql> source ~/Users/shenjinxiang/Documents/employee/lib/sql/mysql.sql;
```

## 搭建express应用
创建app.js文件
```
$ touch app.js
```

编辑app.js
```
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

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});
```

一个简单的应用已经好了，当然，现在没有引入任何路由，项目启动起来也没有任何意义

## 添加自定义中间件
**创建路由日志中间件**

lib目录下创建middleware目录
```
$ mkdir lib/middleware
```

middleware目录下创建routerLog.js文件
```
$ touch lib/middleware/routerLog.js
```

编辑routerLog.js文件
```javascript
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
```

**登录session验证中间件**

middleware目录下创建loginFilter.js
```
$ touch lib/middleware/loginFilter.js
```

编辑loginFilter.js文件
```javascript
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
```

app.js中添加自定义中间件
```javascript
/**
 * 引入路由日志
 */
app.use(require('./lib/middleware/routeLog'));

/**
 * 登录拦截器
 */
app.use(require('./lib/middleware/loginFilter'));
```

## 配置路由模块
lib目录下创建routes目录
```
$ mkdir lib/routes
```

routes目录下创建index.js、department.js、employee.js文件
```
$ touch lib/routes/index.js
$ touch lib/routes/department.js
$ touch lib/routes/employee.js
```

编辑刚创建的三个文件，内容都为:
```javascript
const express = require('express');

let router = express.Router();

module.exports = router;
```

app.js中配置这三个路由文件，app.js最终内容为:
```javascript
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
```

## 添加页面css文件
public目录下创建css目录
```
$ mkdir public/css
```

css目录中创建common.css文件
```
$ touch public/css/common.css
```

common.css内容
```css
* {
	margin: 0;
	padding: 0;
	font-size: 12px;
}
div {
	box-sizing: border-box;
}
ul li {
	list-style: none;
}
.clear {
	clear: both;
}
.fl {
	float: letf;
}
.fr {
	float: right;
}
.index-content {
	width: 500px;
	margin: 200px auto;
	border-radius: 5px;
	box-shadow: 0px 0px 20px #ccc;
	border: 1px solid #ddd;
}
.index-menu {
	height: 60px;
	line-height: 60px;
}
.index-menu li {
	float: left;
	width: 50%;
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	background: #eee;
	cursor: pointer;
}
.index-menu li.login-li {
	border-radius: 5px 0 0 0;
}
.index-menu li.register-li {
	border-radius: 0 5px 0 0;
}
.index-menu li:hover {
	background: #ddd;
}
.index-menu li.active {
	background: #428bca;
	color: #fff;
}
.list-content {
	display: none;
	margin: 20px 0;
}
.list-content li{
	line-height: 40px;
	text-align: center;
	padding: 5px;
	margin: 5px;
}
.list-content li input[type='text'],
.list-content li input[type='password'] {
	width: 80%;
	height: 32px;
	border-radius: 3px;
	border: 1px solid #ccc;
	padding: 2px 10px;
}
.list-content li input[type='button'] {
	width: 85%;
	height: 40px;
	border-radius: 3px;
	border: none;
	background: #428bca;
	color: #fff;
	cursor: pointer;
}
.list-content li input[type='button']:hover {
	background: #327bba;
}
.list-content.active{
	display: block;
}

.header {
	width: 100%;
	height: 100px;
	background: linear-gradient(#ddd, #fefefe);
	line-height: 100px;
}
.header .title {
	font-size: 26px;
	width: 200px;
	line-height: 100px;
	float: left;
	text-indent: 50px;
}
.header span {
	font-size: 14px;
	display: inline-block;
	float: right;
	margin-right: 20px;
}
.header a {
	font-size: 12px;
	display: inline-block;
	float: right;
}
.left-content {
	float: left;
	width: 20%;
	border: 1px solid #ccc;
}
.right-content {
	float: right;
	width: 79.5%;
	border: 1px solid #ccc;
}

.box-title {
	width: 100%;
	height: 42px;
	line-height: 42px;
	text-indent: 15px;
	background: #ddd;
	color: #444;
	font-weight: bold;
	font-size: 14px;
}
.box-title a {
	display: inline-block;
	float: right;
	line-height: 36px;
	padding: 0 10px;
	text-decoration: none;
	color: #444;
}
.box-title a:hover {
	color: #222;
}
.operate-box {
	width: 100%;
	height: 54px;
	line-height: 54px;
	border-bottom: 1px solid #eee;
	text-align: center;
}
.operate-box button {
	display: inline-block;
	cursor: pointer;
	border: 1px solid transparent;
	padding: 0 10px;
	width: 80px;
	height: 28px;
}

#departmentTree {
	overflow-y: auto;
}
.table-ware {
	width: 100%;
	overflow-y: auto;
}
.table {
	width: 100%;
	border-collapse: collapse;
}
.table th, 
.table td {
	border: 1px solid #ddd;
	height: 34px;
	line-height: 34px;
	text-indent: 10px;
}
.table> tbody > tr:nth-child(odd) > td,
.table> tbody > tr:nth-child(odd) > th {
	background-color: #f9f9f9;
}
.table> tbody > tr:hover > td,
.table> tbody > tr:hover > th {
	background-color: #f5f5f5;
}
.form-ul {
	line-height: 40px;
	text-align: center;
	padding: 5px;
	margin: 5px;
}
.form-ul ._text {
	width: 80%;
	height: 32px;
	border-radius: 3px;
	border: 1px solid #ccc;
	padding: 2px 10px;
}
.form-ul ._text:focus {
	border-color: #66afe9;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1pxrgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
	box-shadow: inset 0 1px 1pxrgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
}
input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
	outline: thin dotted;
	outline: 5px auto -webkit-focus-ring-color;
	outline-offset: -2px;
}
.form-ul label {
	display: inline-block;
	text-align: left;
	text-indent: 5px;
	width: 80px;
}
.form-ul textarea._text {
	height: 80px;
	resize: none;
	margin-top: 6px;
}
.form-ul ._btn {
	width: 100px;
	height: 32px;
	color: #444;
	background-color: #eee;
	border-radius: 4px;
	border: 1px solid #ccc;
	cursor: pointer;
	margin: 10px 20px;
}
.form-ul ._btn:hover {
	background-color: #fefefe;
}
```

## 添加页面公用js文件
public 目录下创建js目录
```
$ mkdir public/js
```

js目录下创建common.js
```
$ touch public/js/common.js
```

common.js文件内容
```javascript
// public/js/common.js
/**
 * 获取form表单数据
 */
$.fn.getFormJson = function() {  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
}; 

/**
 * 重置表单
 */
function formReset(formId){
	var $form = $("#"+formId);
	$form.get(0).reset();
	$form.find("input[type='hidden']").val("");
}

/**
 * 执行ajax post请求
 */
function doPost(url, data, callback) {
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		dataType: 'json',
		success: callback
	});
}

/**
 * 提示信息 用于表单验证
 */
function tips(str, key) {
	layer.tips(str, '#' + key);
}

/**
 * 弹出提示信息
 */
function alertMsg (str, fn) {
	if (typeof fn === 'function') {
		layer.msg(str, {time: 2000}, fn);
	} else {
		layer.msg(str, {time: 2000});
	}
}

/**
 * 弹出layer窗口
 */
function openContent(title, width, contentId) {
	layer.open({
		type: 1, 
		area: [width + 'px', 'auto'],
		title: title,
		shade: 0.6, 
		anim: 1,
		content: $('#' + contentId)
	}); 
}

/**
 * 关闭layer弹出窗口
 */
function closeLayer() {
	layer.closeAll();
}
```

## 登录、注册模块
创建views目录
```
$ mkdir views
```

创建登录页面index.ejs
```
$ touch views/index.ejs
```

index.ejs 文件内容
```html
<!doctype html>
<html>
<head>
	<meta charset='utf-8'>
	<link type='text/css' rel='stylesheet' href='/plugin/ztree/zTreeStyle.css' />
	<link type='text/css' rel='stylesheet' href='/plugin/layer/skin/default/layer.css' />
	<link type='text/css' rel='stylesheet' href='/css/common.css' />
	<title>员工管理系统</title>
</head>
<body>
<div class='index-content'>
	<ul class='index-menu'>
		<li class='login-li active' data='0'>登 录</li>
		<li class='register-li' data='1'>注 册</li>
	</ul>
	<i class='clear'></i>
	<div id='login-content' class='list-content active'>
		<form id='loginForm'>
			<ul>
				<li>
					<input type='text' id='login_username' name='username' placeholder='请输入用户名' />
				</li>
				<li>
					<input type='password' id='login_password' name='password' placeholder='请输入密码' />
				</li>
				<li>
					<input type='button' value='登  录' onclick='login()'/>
				</li>
			</ul>
		</form>
	</div>
	<div id='register-content' class='list-content'>
		<form id='registerForm'>
			<ul>
				<li>
					<input type='text' id='register_name' name='name' placeholder='请输入姓名' />
				</li>
				<li>
					<input type='text' id='register_username' name='username' placeholder='请输入用户名' />
				</li>
				<li>
					<input type='password' id='register_password' name='password' placeholder='请输入密码' />
				</li>
				<li>
					<input type='button' value='注  册' onclick='register()'/>
				</li>
			</ul>
		</form>
	</div>
</div>
<script type='text/javascript' src='/plugin/jquery.js'></script>
<script type='text/javascript' src='/plugin/jquery.form.js'></script>
<script type='text/javascript' src='/plugin/layer/layer.js'></script>
<script type='text/javascript' src='/plugin/ztree/jquery.ztree.core-3.5.min.js'></script>
<script type='text/javascript' src='/plugin/ztree/jquery.ztree.excheck-3.5.min.js'></script>
<script type='text/javascript' src='/js/common.js'></script>
<script type='text/javascript' src='/js/index.js'></script>
</body>
</html>
```

**登录、注册页面的js文件**

public/js 目录下创建文件 index.js
```
$ touch public/js/index.js
```

public/js/index.js文件内容
```javascript
$(function () {
	bindEvent();
});

/**
 * 绑定事件
 */
function bindEvent() {
	$('.index-menu li').click(function () {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		let data = $(this).attr('data');
		$('.list-content').eq(data).addClass('active').siblings().removeClass('active');
	});

	$('#login_username').keypress(function (event) {
		if (event.keyCode === 13) {
			$('#login_password').focus();
		}
	});

	$('#login_password').keypress(function (event) {
		if (event.keyCode === 13) {
			login();
		}
	});

	$('#register_name').keypress(function (event) {
		if (event.keyCode === 13) {
			$('#register_username').focus();
		}
	});
	
	$('#register_username').keypress(function (event) {
		if (event.keyCode === 13) {
			$('#register_password').focus();
		}
	});

	$('#register_password').keypress(function (event) {
		if (event.keyCode === 13) {
			register();
		}
	});

	$('#register_username').blur(function () {
		if ($.trim($(this).val()) != '') {
			checkUsername($(this).val());
		}
	});
}

/**
 * 登录
 */
function login() {
	let data = $('#loginForm').getFormJson();
	if (data.username === '' || $.trim(data.username) === '') {
		tips('请输入用户名', 'login_username');
		return;
	}
	if (data.password === '' || $.trim(data.password) === '') {
		tips('请输入密码', 'login_password');
		return;
	}
	doPost('/login', data, function(result) {
		if (result.result) {
			window.location.href = '/main';
		} else {
			alertMsg(result.msg);
		}
	});
}

/**
 * 注册
 */
function register() {
	let data = $('#registerForm').getFormJson();
	if (data.name === '' || $.trim(data.name) === '') {
		tips('请输入姓名', 'register_name');
		return;
	}
	if (data.username === '' || $.trim(data.username) === '') {
		tips('请输入用户名', 'register_username');
		return;
	}
	if (data.password === '' || $.trim(data.password) === '') {
		tips('请输入密码', 'register_password');
		return;
	}
	doPost('/register', data, function (result) {
		if (result.result) {
			window.location.href = '/main';
		} else {
			alertMsg(result.msg);
		}
	});
}

/**
 * 检测用户名是否重复
 */
function checkUsername(username) {
	doPost('/checkUsername', {username: username}, function (result) {
		if (!result.result) {
			tips(result.msg, 'register_username');
		}
	});
}
```
