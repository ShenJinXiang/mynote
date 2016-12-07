# Node.js中的事件处理
events模块是Node.js最重要的模块，可以说是Node.js事件编程的基石

## 一个简单的例子
```javascript
// eventTest.js
var events = require('events');
var o = new events.EventEmitter();

o.on('event1', function () {
    console.log('触发事件了');
});

o.emit('event1');
```
*运行结果:*
```
node eventTest.js
触发事件了
```
这个例子中，我们创建了个EventEmitter对象的实例o，给o绑定了事件'event1', 用emit() 方法触发事件，类似于浏览器上的事件处理，我们可以绑定多种事件类型，也可以给某一个事件绑定多个事件处理函数，这些函数会按照绑定顺序，依次调用
```javascript
// eventTest.js
var events = require('events');
var o = new events.EventEmitter();

o.on('type1', function () {
    console.log('对象：o, 事件类型：type1, 回调函数1');
});

o.on('type1', function () {
    console.log('对象：o, 事件类型：type1, 回调函数2');
});

o.on('type2', function () {
    console.log('对象：o, 事件类型：type2, 回调函数1');
});

o.on('type2', function () {
    console.log('对象：o, 事件类型：type2, 回调函数2');
});

o.on('type1', function () {
    console.log('对象：o, 事件类型：type1, 回调函数3');
});

o.emit('type1');
console.log('------------------------------------');
o.emit('type2');
```
*运行结果*
```
node eventTest.js 
对象：o, 事件类型：type1, 回调函数1
对象：o, 事件类型：type1, 回调函数2
对象：o, 事件类型：type1, 回调函数3
------------------------------------
对象：o, 事件类型：type2, 回调函数1
对象：o, 事件类型：type2, 回调函数2
```

## EventEmitter常用API
* EvnetEmitter.on(event, listener) 为指定事件注册一个监听器，接受一个字符串event和一个回调函数listener
* EventEmitter.emit(event, [arg1], [arg2], [...]) 触发event事件，传递若干可选参数到事件监听器的参数表
* EventEmitter.once(event, listener) 为指定事件注册一个单词监听器，即监听器最多只会触发一次，触发后立刻解除该监听器
* EvnetEmitter.removeListener(event, listener) 移除指定事件的某个监听器，listener必须是该事件已经注册过的监听器
* EventEmitter.removeAllListeners([event]) 移除所有时间的所有监听器，如果指定event，则移除指定事件的所有监听器

### error事件
EventEmitter 定义了一个特殊的事件 error，它包含了“错误”的语义，我们在遇到异常的时候通常会发射 error 事件。当 error 被发射时， EventEmitter 规定如果没有响应的监听器， Node.js 会把它当作异常，退出程序并打印调用栈。我们一般要为会发射 error事件的对象设置监听器，避免遇到错误后整个程序崩溃

## 模仿events
下面模仿events模块的功能，自定义一个事件模块
```javascript
// eventUtil.js
function EventObj() {}

let ep = EventObj.prototype;
ep.maxListeners = 10;
ep.events = Object.create(null);

/**
 * 获取最大监听器数量
 */
ep.getMaxListeners = function () {
	return this.maxListeners;
};

/**
 * 设置最大监听器数量
 */
ep.setMaxListeners = function (arg) {
	if (isNaN(arg)) {
		throw new Error('参数错误，不是数字');
	}
	this.maxListeners = arg;
};

/**
 * 添加监听器
 */
ep.addListener = ep.on = function (eventName, listener) {
	if (!this.events[eventName]) {
		this.events[eventName] = [];
	}
	this.events[eventName].push({
		name: eventName,
		listener: listener,
		times: 'static'
	});
};

/**
 * 添加监听器，只执行一次
 */
ep.once = function (eventName, listener) {
	if (!this.events[eventName]) {
		this.events[eventName] = [];
	}
	this.events[eventName].push({
		name: eventName,
		listener: listener,
		times: '1'
	});
};

/**
 * 触发事件
 */
ep.emit = function (eventName) {
	if (this.events && this.events[eventName]) {
		var args = [];
		for (let i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		if (this.events[eventName].length > this.getMaxListeners()) {
			throw new Error('事件监听器数量超过' + this.getMaxListeners());
		}
		this.events[eventName] = 
			this.events[eventName].filter(function (item) {
			item.listener.apply(null, args);
			return item.times !== '1';
		});
	}
};

/**
 * 删除监听器
 */
ep.removeAllListeners = function (eventName) {
	if (eventName) {
		delete this.events[eventName];
	} else {
		this.events = Object.create(null);
	}
};

/**
 * 删除某一监听器
 */
ep.removeListener = function (eventName, listener) {
	if (this.events[eventName]) {
		this.events[eventName] = 
			this.events[eventName].filter(function (item) {
			return item.listener !== listener;
		});
	}
};

/**
 * 根据事件类型获取监听器列表
 */
ep.listeners = function (eventName) {
	if (!this.events[eventName]) {
		return [];
	}
	let arr = [];
	this.events[eventName].forEach(function(item) {
		arr.push(item.listener);
	});
	return arr;
};

/**
 * 获取监听器数量
 */
ep.listenerCount = function (eventName) {
	if (!this.events[eventName]) {
		return 0;
	}
	return this.events[eventName].length;
};

/**
 * 事件类型名称列表
 */
ep.eventNames = function () {
	if (!this.events) {
		return [];
	}
	let arr = [];
	for (let e in this.events) {
		arr.push(e);
	}
	return arr;
};

module.exports = EventObj;
```
*简单测试:*
```javascript
var ev = require('./eventUtil');
var o = new ev();

o.on('click', function(arg1, arg2) {
    console.log('listener 1', arg1, arg2);
});
o.on('click', function(arg1, arg2) {
    console.log('listener 2', arg1, arg2);
});
o.once('click', function(arg1, arg2) {
    console.log('listener 3 once', arg1, arg2);
});
o.on('click', cb1);

function cb1 (arg1, arg2) {
    console.log('listener cb1', arg1, arg2);
}

o.emit('click', '123', 'hehe');
console.log('------------------------------------');
o.emit('click', '123', 'hehe');
console.log('------------------------------------');
o.emit('click', '123', 'hehe');
o.removeListener('click', cb1);
console.log('---------removeListener---------------------------');
o.emit('click', '123', 'hehe');
o.removeAllListeners();
console.log('----------removeAllListeners--------------------------');
o.emit('click');

o.on('click', function () {
    console.log('click 1');
});
o.emit('click');
```
*运行结果*
```
listener 1 123 hehe
listener 2 123 hehe
listener 3 once 123 hehe
listener cb1 123 hehe
------------------------------------
listener 1 123 hehe
listener 2 123 hehe
listener cb1 123 hehe
------------------------------------
listener 1 123 hehe
listener 2 123 hehe
listener cb1 123 hehe
---------removeListener---------------------------
listener 1 123 hehe
listener 2 123 hehe
----------removeAllListeners--------------------------
click 1
```
基本实现了events的一些功能，不过很多地方不严谨，权当娱乐~~
