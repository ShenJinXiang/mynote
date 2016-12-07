# Node.js中util模块
util 是一个Node.js 核心模块，提供常用函数的集合，通过：“require('util')” 引入该包

## util.log
util.log(string)将string参数的内容加上当前时间戳，输出到stdout标准输出
```javascript
// utilLog.js
let util = require('util');
util.log('shenjinxiang');
```
*运行js文件:*
```
node utilLog.js
25 Nov 09:53:48 - shenjinxiang
```

## util.inspect
util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出

### 参数说明
* object - 要显示的对象
* showHidden - 默认值为false，如果为true，object对象的不可枚举属性也会显示
* depth - 格式化对象信息时的递归次数，默认为2层，指定位null标识将不限递归层数完整遍历对象
* color - 如果值位true，输出格式将会以ANSI颜色编码，通常用于终端显示更漂亮的效果

### 例子
```javascript
// utilInspect.js
let util = require('util');
let obj = {
    x: 1,
    y: 2,
    z: [1, 2, 3, 4, 5, [6, 7]],
    m: {x: 1, y: 2},
    n: {x: {a: 1, b: 2}, y: {a: ['a', 'b'], b: {aa: 1, bb: 2, cc: 3}}}
};
console.log(util.inspect(obj));
console.log('--------------');
console.log(util.inspect(obj, true)); // 同时也显示可不枚举属性
console.log('--------------');
console.log(util.inspect(obj, true, 4)); // 设置格式化层数
```
*运行js文件:*
```
node utilInspect.js
{ x: 1,
  y: 2,
  z: [ 1, 2, 3, 4, 5, [ 6, 7 ] ],
  m: { x: 1, y: 2 },
  n: { x: { a: 1, b: 2 }, y: { a: [Object], b: [Object] } } }
--------------
{ x: 1,
  y: 2,
  z: [ 1, 2, 3, 4, 5, [ 6, 7, [length]: 2 ], [length]: 6 ],
  m: { x: 1, y: 2 },
  n: { x: { a: 1, b: 2 }, y: { a: [Object], b: [Object] } } }
--------------
{ x: 1,
  y: 2,
  z: [ 1, 2, 3, 4, 5, [ 6, 7, [length]: 2 ], [length]: 6 ],
  m: { x: 1, y: 2 },
  n:
   { x: { a: 1, b: 2 },
     y: { a: [ 'a', 'b', [length]: 2 ], b: { aa: 1, bb: 2, cc: 3 } } } }
```

## util.inherits
util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数

### 例子
```javascript
// inherits.js
var util = require('util'); 

function Base() { 
	this.name = 'base'; 
	this.base = 1991; 
	this.sayHello = function() { 
		console.log('Hello ' + this.name); 
	}; 
} 

Base.prototype.showName = function() { 
	console.log(this.name);
}; 

function Sub() { 
	this.name = 'sub'; 
} 

util.inherits(Sub, Base); 
var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase); 
var objSub = new Sub(); 
objSub.showName(); 
console.log(objSub);
```
*运行js文件:*
```
node inherits.js
base
Hello base
Base { name: 'base', base: 1991, sayHello: [Function] }
sub
Sub { name: 'sub' }
```
Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承，同时，在原型中定义的属性不会被console.log 作 为对象的属性输出

## util.format
util.format(format[, ...])返回一个格式化字符串，类似c语言中printf函数的格式，第一个参数包含0个或多个占位参数，后面的参数按格式传入字符串中

### 占位符列表
* %s - String
* %d - Number(包括integer和float)
* %j - JSON
* %% - 不是占位的，只是打印‘%’

### 例子
```javascript
// utilFormat.js
let util = require('util');
console.log(util.format('hello', 'world'));
console.log(util.format('小明今年%d岁', 18));
console.log(util.format('小明今年%d岁'));
console.log(util.format('这是个json：%j格式的内容', {x: 1, y: 2}));
```
*运行js文件:*
```
node utilFormat.js
hello world
小明今年18岁
小明今年%d岁
这是个json：{"x":1,"y":2}格式的内容
```

## util.isArray(object)
如果给定的参数 "object" 是一个数组返回true，否则返回false

### 例子
```javascript
var util = require('util');

util.isArray([])
// true
util.isArray(new Array)
// true
util.isArray({})
// false
```

## util.isRegExp(object)
如果给定的参数 "object" 是一个正则表达式返回true，否则返回false

### 例子
```javascript
var util = require('util');

util.isRegExp(/some regexp/)
// true
util.isRegExp(new RegExp('another regexp'))
// true
util.isRegExp({})
// false
```

## util.isDate(object)<span id='isDate'></span>
如果给定的参数 "object" 是一个日期返回true，否则返回false

### 例子
```
var util = require('util');

util.isDate(new Date())
// true
util.isDate(Date())
// false (without 'new' returns a String)
util.isDate({})
// false
```

## util.isError(object)
如果给定的参数 "object" 是一个错误对象返回true，否则返回false

### 例子
```javascript
var util = require('util');

util.isError(new Error())
// true
util.isError(new TypeError())
// true
util.isError({ name: 'Error', message: 'an error occurred' })
// false
```
