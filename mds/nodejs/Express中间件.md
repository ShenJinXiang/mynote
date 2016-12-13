# Express中间件
在express中，中间件很重要，完全是由路由和中间件构成的一个web开发框架，本质上来说，一个express应用就是在调用各种中间件

中间件(moddleware)是一个函数，这个函数包含，请求对象(request)、响应对象(response)和web应用中处理请求和响应循环流程中的next变量

中间件的工恩能够包括:

* 执行任何代码
* 修改请求和响应对象
* 调用下一个中间件
* 终结请求-响应循环

现在明白了，上一节“Express路由”中个中路由处理程序，都可以理解为中间件，针对每个路由的请求，可以有多个中间件程序，最后一个程序向浏览器发送响应信息，是不是很像java web开发中的拦截器呢？

中间件的分类:

* [应用级中间件](#应用级中间件)
* [路由级中间件](#路由级中间件)
* [错误处理中间件](#错误处理中间件)
* [内置中间件](#内置中间件)
* [第三方中间件](#第三方中间件)

## 应用级中间件
应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写

```javascript
// app.js
const express = require('express');
const url = require('url');
const util = require('util');

let app = express();

/**
 * 没有挂载路径的中间件，应用的每个请求都会执行该中间件
 * 这个中间件的功能是用来在后头打印每次请求的时间和路径
 */
app.use(function (req, res, next) {
	let pathname = url.parse(req.url).pathname;
	util.log('pathname: ', pathname);
	next();
});

/**
 * 挂载至 /user/* 的中间件
 * 用于打印请求方式
 */
app.use('/user/*', function (req, res, next) {
	util.log('request method: ', req.method);
	next();
});

/**
 * 挂载至 /user:name 的中间件, 只有get请求方式才会执行
 * 其实没什么用，只是打印路径中name的值
 */
app.get('/user/:name', function (req, res, next) {
	util.log('name: ', req.params.name);
	next();
});

app.get('/', function (req, res) {
	res.send('hello');
});

app.get('/user', function (req, res) {
	res.send('user page');
});

app.get('/user/adduser', function (req, res) {
	res.send('add user page');
});

app.get('/user/upduser', function (req, res) {
	res.send('update user page');
});

app.use(function (req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found.');
});

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});
```

类似于上节中的路由，可以在一个路由上设置多个回调函数一样，同样可以挂载多个中间件
```javascript
app.use(function (req, res, next) {
	console.log('middleware 1');
	next();
}, function (req, res, next) {
	console.log('middleware 2');
	next();
}, function (req, res, next) {
	console.log('middleware 3');
	next();
});
```

在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环
```javascript
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效
```javascript
app.get('/user/:name', function (req, res, next) {
	let name = req.params.name;
	console.log(' /user/:name 第一个中间件');
	if (name == 'adduser') {
		next('route');
	} else {
		next();
	}
}, function (req, res, next) {
	console.log(' /user/:name 第二个中间件');
});

app.get('/user/adduser', function (req, res) {
	res.send('add user page');
});

app.get('/user/upduser', function (req, res) {
	res.send('update user page');
});
```
浏览器中访问 "http://localhost:3000/user/adduser" 的时候 不会打印 第二个中间件的信息，但是访问 "http://localhost:3000/user/upduser" 的时候会打印第二个中间件输出的内容

## 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()，express.Router()的作用在上一节[Express路由-express.Router](./Express路由.md#expressrouter)有介绍，用于模块化路由管理

路由级使用 router.use() 或 router.VERB() 加载中间件

```javascript
// routes/user.js
const express = require('express');
const util = require('util');

let router = express.Router();

router.use(function (req, res, next) {
	util.log(req.method);
	next();
});

router.use('/:name', function (req, res, next) {
	console.log('use /user/:name  1');
	next();
}, function (req, res, next) {
	console.log('use /user/:name  2');
	next();
});

router.get('/:name', function (req, res, next) {
	let name = req.params.name;
	console.log('get /user:/name 1');
	if (name === 'adduser') {
		next('route');
	} else {
		next();
	}
}, function (req, res, next) {
	console.log('get /user:/name 2');
	next();
});

router.get('/', function (req, res) {
	res.send('user page');
});

router.get('/adduser', function (req, res) {
	res.send('add user page');
});

router.get('/upduser', function (req, res) {
	res.send('update user page');
});

module.exports = router;
```

## 错误处理中间件
错误处理中间件和其他中间件定义类似，只是要使用4个参数：err、req、res、next，即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 内置中间件

## 第三方中间件
