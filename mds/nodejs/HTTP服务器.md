# HTTP服务器
javaWeb创建一个简单的服务器，需要tomcat等中间件，创建项目文件，配置web.xml文件等操作。在Node.js中，不需要这么麻烦，Node.js标准库提供了http模块，封装了一个高效的HTTP服务器，http.Server是http模块的HTTP服务器对象，用Node.js做的所有基于HTTP协议的系统，如网站、社交应用甚至代理服务器，都是基于http.Server实现的

## 一个简单的http服务器
```javascript
// app.js
const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>shenjinxiang</p>');
}).listen(3000);

console.log('HTTP server is running at 3000 port.');
```
*运行app.js*
```
node app.js
HTTP server is running at 3000 port.
```
服务已经启动了，打开浏览器，输入网址“http://localhost:3000/”:
![](./img/007.png)

**代码分析**

* 第一行获取Node.js自带的http模块，并赋值给http变量
* 接下来用http模块提供的函数“createServer”，创建http.Server的实例对象，接着链式调用这个对象的listen方法来监听3000端口
* createServer函数接受了一个匿名函数，这是个回调函数，这个函数接受两个参数，分别是请求对象(req)和响应对象(res)
* 在函数体内，res显示的写回响应代码200(表示请求成功)，指定响应头，写入响应体

## http.Server的事件
http.Server是一个基于事件的http服务器，继承自EventEmitter，代码中的匿名函数，实际上是http.Server对象上绑定的request事件的事件监听程序，所以我们也可以这样写：
```javascript
// app.js
const http = require('http');

let server = new http.Server();

function onRequest (req, res) {
    res.writeHead(200, {'Conetn-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>shenjinxiang</p>');
}

// 绑定request事件
server.on('request', onRequest);
// 监听3000端口
server.listen(3000);

console.log('HTTP server is running at 3000 port.');
```
运行结果与第一个例子是一样的

**http.Server的事件列表:**

* request: 当客户端请求到来时，事件触发，提供两个参数req和res，分别是http.ServerRequest和http.ServerResponse的实例，表示请求和响应信息
* connection: 当TCP链接建立时，事件触发，提供一个参数socket，为net.Socket的实例
* close：当服务器关闭时，事件触发，注意不是在用户链接断开时
* 还有一些checkContinue、upgrade、clientError等事件

## http.ServerRequest
http.ServerRequest是http请求的信息，一般由http.Server的request事件发送，作为事件处理函数的第一个参数

HTTP请求分为两部分：请求头和请求体，请求头的信息较短，可以通过req直接获取，请求体的时间可能较长

**事件列表:**

* data: 当请求体数据到来时，事件触发，事件提供一个参数chunk，表示接收到的数据，可能被调用多次
* end: 当请求体数据传输完成时，事件触发，此后不会再有数据到来
* close: 用户当前请求结束时，事件触发，如果用户强制终止了传输，还是会触发close

*ServerRequest的属性:*

|名称|含义
|:--|:--|
|complete|客户端请求是否发送完成|
|httpVersion|HTTP协议版本，通常是1.0或1.1|
|method|HTTP请求方法，如GET、POST、PUT、DELETE等|
|url|原始的请求路径|
|headers|HTTP请求头|
|trailers|HTTP请求尾|
|connection|当前HTTP连接套接字，为net.Socket的实例|
|socket|connection属性的别名|
|client|client属性的别名|

## 获取get请求内容
对于get请求，请求内容就在url路径中，所以获取请求内容比较简单：


1. 获取到请求的url，request即ServerRequest的url属性的值
2. 解析url获取到请求内容，需要用到url模块的parse方法

*url.parse的例子*
```javascript
// parseURL.js
const url = require('url');

let str = 'http://localhost:3000/user?username=admin&password=123456';
let urlObj = url.parse(str, true);
console.log(urlObj);
```
*运行结果:*
```
node parseURL.js
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: null,
  search: '?username=admin&password=123456',
  query: { username: 'admin', password: '123456' },
  pathname: '/user',
  path: '/user?username=admin&password=123456',
  href: 'http://localhost:3000/user?username=admin&password=123456' }
```
*http服务器获取get请求内容*
```javascript
// app.js 获取get请求内容，并发送给浏览器
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
    console.log('url ->', req.url);
    let params = url.parse(req.url, true).query;
    console.log(params);
    console.log('username:', params.username, 'password:', params.password);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Node.js');
    res.end();
}).listen(3000);
console.log('Server running at 3000 port.');
```
运行app.js，打开浏览器输入地址：“http://localhost:3000/user?username=admin&password=123456”，查看后台运行结果：
```
node app.js
Server running at 3000 port.
url -> /user?username=admin&password=123456
{ username: 'admin', password: '123456' }
username: admin password: 123456
```

## 获取post请求的内容
post请求的内容全部都在请求体中，http.ServerRequest并没有一个属性内容为请求体，所以需要手动解析请求体内容
```javascript
// getPost.js
const http = require('http');
const querystring = require('querystring');
const util = require('util');

http.createServer(function (req, res) {
    let post = '';
    req.on('data', function (chunk) {
        post += chunk;
    });

    req.on('end', function () {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
console.log('Server running at 3000 port.');
```
通过req的data事件监听函数，每当接受到请求体的数据就累加到post变量中，end事件触发以后，将post解析为真正的post请求格式，然后发送至客户端，此例中的querystring和util模块以后会讲到

## http.ServerResponse
http.ServerResponse是返回给客户端的信息，常用的函数有:

* response.writeHead(statusCode, [headers]) 向客户端发送响应头。 statusCode是http状态码，如200、404、500等，headers是响应头信息
* response.write(data, [encoding]) 向客户端发送响应内容，打他是一个Buffer或字符串，表示发送的内容，encoding是编码方式，默认的是utf-8，这个函数可以多次调用(在调用end方法之前)
* response.end([data], [encoding]) 结束响应，告知客户端所有发送已经完成，如果不调用此函数，客户端永远处于等待状态
