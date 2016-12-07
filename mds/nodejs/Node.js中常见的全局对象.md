# Node.js中常见的全局对象
在浏览器中，宿主对象Window，为顶级作用域对象，定义在Window对象上的属性，即为全局属性，例如：document, location等属性。

在Node.js中不存在Window对象，但是也存在一个全局对象：global, global是全局对象的一个引用，可以在node命令行中直接输入global来查看。

## conlose
console 用于提供控制台标准输出，与浏览器上的console 对象类似

### console.log([data], [...])
向stdout打印并另起一行
```javascript
console.log('hello wrold');
console.log('hello', 'world');
console.log('今年是%d年', 2016); // c语言中的printf() 函数
console.log('今年是%d年'); // 看看这个
```
运行结果：
```
hello wrold
hello world
今年是2016年
今年是%d年
```

### console.info([data], [...])
与console.log() 差别不大

### console.error([data], [...])
与console.log() 一样，不过是输出至stderr 输出错误消息的

### console.warn([data], [...])
打印警告信息

### console.dir(obj)
调试的时候经常会用到，对 obj 使用 util.inspect 并将结果字符串输出到 stdout，说白了就是对象obj的字符串形式打印出来。

### console.time(label)
标记一个时间点，开始计时

### console.timeEnd(label)
结束计时器，输出结果，与console.time(label) 配合使用

```javascript
console.time('消耗时间：');
var arr = [];
for (var index = 0; index < 10000; index++) {
	arr.push(index);
}
console.timeEnd('消耗时间：');
```
输出结果：
```
消耗时间：: 2.002ms
```

## process
进程对象process是一个全局对象，可以在任何地方访问到它，这个对象有很多属性和方法，这里只说几个简单的、目前可能会用到的：

### process.argv
一个包含命令行参数的数组。第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数

```javascript
// argvTest.js
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});
```

执行命令：
> node argvTest.js hello shenjinxiang node.js

运行结果：
```
0:  /usr/local/Cellar/node/6.2.2/bin/node
1:  /Users/shenjinxiang/Documents/git_xm/ourWorld/shenjinxiang/nodejs/nodejs总结/argvTest.js
2:  hello
3:  shenjinxiang
4:  node.js
```

### process.cwd()
返回进程当前的工作目录

```javascript
console.log('当前目录：' + process.cwd());
// 当前目录：/Users/shenjinxiang/Documents/git_xm/ourWorld/shenjinxiang/nodejs/nodejs总结
```

## __filename
字符串类型，当前所执行代码文件的文件路径
```javascript
// filenameTest.js
console.log(__filename);
// /Users/shenjinxiang/Documents/git_xm/ourWorld/shenjinxiang/nodejs/nodejs总结/filenameTest.js
```

## __dirname
字符串类型，当前执行脚本所在目录的目录名

```javascript
// dirnameTest.js
console.log(__dirname);
// /Users/shenjinxiang/Documents/git_xm/ourWorld/shenjinxiang/nodejs/nodejs总结
```

## 定时器函数
### setTimeout(cb, ms)
与浏览器上Window对象的setTimeout的方法一样的效果，在至少ms毫秒后调用回调cb。实际延迟取决于外部因素，如操作系统定时器粒度及系统负载，返回一个代表该定时器的句柄值

### clearTimeout(t)
停止一个之前通过setTimeout()创建的定时器。回调不会再被执行

### setInterval(cb, ms)
每隔ms毫秒重复调用回调cb。注意，取决于外部因素，如操作系统定时器粒度及系统负载，实际间隔可能会改变。它不会少于ms但可能比ms长，返回一个代表该定时器的句柄值

### clearInterval(t)
停止一个之前通过setInterval()创建的定时器。回调不会再被执行

## 最后说明
Node.js中还有很多全局的属性和方法，比如module、require()等等，以后会慢慢涉及到
