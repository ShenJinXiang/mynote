# querystring 模块
Node.js内置模块，使用require('querystring') 引入

## querystring.stringify
querystring.stringify(obj[, sep][, eq]) 方法用于将对象转成字符串，可以设置转换时的分隔符

### 参数
* obj - 要解析的对象
* sep - 键值对与键值对之间的分隔符默认为'&'
* eq - 键值之间的分隔符，默认为'='

### 例子
```javascript
// stringify.js
const qs = require('querystring');
let obj = {
    x: 1,
    y: 2
};
let result1 = qs.stringify(obj);
let result2 = qs.stringify(obj, ', ', ': ');
console.log(typeof result1);
console.log(result1);
console.log(typeof result1);
console.log(result2);
```
*运行js文件:*
```
node stringify.js
string
x=1&y=2
string
x: 1, y: 2
```
如果值为数组，结果是什么样呢？
```javascript
const qs = require('querystring');
let obj = {
    x: 1,
    y: [1, 2, 3]
};
qs.stringify(obj);
// x=1&y=1&y=2&y=3
```

## querystring.parse
将字符串转为对象，querystring.stringify方法的反向操作

### 参数
* str - 要解析的字符串
* sep - 键值对与键值对之间的分隔符默认为'&'
* eq - 键值之间的分隔符，默认为'='

### 例子
```javascript
// parse.js
const qs = require('querystring');

let str1 = 'x=1&y=2&z=3';
let str2 = 'x=1&y=2&y=3';
let str3 = 'x: 1, y: 2';
let obj1 = qs.parse(str1);
let obj2 = qs.parse(str2);
let obj3 = qs.parse(str3, ', ', ': ');
console.log(typeof obj1);
console.log(obj1);
console.log(obj2);
console.log(obj3);
```
*运行js文件:*
```
node parse.js
object
{ x: '1', y: '2', z: '3' }
{ x: '1', y: [ '2', '3' ] }
{ x: '1', y: '2' }
```
