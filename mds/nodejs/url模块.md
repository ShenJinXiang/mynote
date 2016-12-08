# url模块
此模块包含用于解析和分析URL的工具，用require('url')引入

## url.parse
url.parse(utlStr[, parseQueryString])方法以一个 URL字符串为参数，返回一个解析后的对象。如设置第二个参数为true，则会使用querystring模块解析URL中的查询字符串

```javascript
// parse.js
const url = require('url');
const urlstr = 'http://www.baidu.com?username=admin&password=123456';
let urlObj = url.parse(urlstr);
console.log(urlObj);
urlObj = url.parse(urlstr, true);
console.log(urlObj);
```
*运行js文件:*
```
node parse.js
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?username=admin&password=123456',
  query: 'username=admin&password=123456',
  pathname: '/',
  path: '/?username=admin&password=123456',
  href: 'http://www.baidu.com/?username=admin&password=123456' }
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?username=admin&password=123456',
  query: { username: 'admin', password: '123456' },
  pathname: '/',
  path: '/?username=admin&password=123456',
  href: 'http://www.baidu.com/?username=admin&password=123456' }
```

## url.format
url.format(urlObj)方法将一个url对象转成url路径，url.parse()的反向操作

## url.resolve
url.resolve(from, to)方法将to链接到from，返回url字符串

### 例子
```javascript
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```
