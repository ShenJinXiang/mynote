# fs 文件系统模块
Node.js中提供了文件系统(fs)模块，用来执行文件操作，使用时调用：require('fs') 引入

## 同步和异步
fs模块一般都会提供同步异步两种方法，异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)，尽量使用异步方法，因为没有阻塞，效率较高，下面是一个readFile的同步和异步的例子

*创建data.txt文件，内容为:*
```
这里是data.txt文件的第一行
用于readFile方法异步和同步获取例子

这里是第四行，一共只有4行数据，其中第三行是空的
```
*同步读取文件readSync.js*
```javascript
// readSync.js
const fs = require('fs');
const util = require('util');

util.log('开始读取文件信息');
let data = fs.readFileSync('./data.txt', 'utf-8');
util.log('数据读取完毕，内容为：');
console.log(data);
util.log('输出结束！');
```
*运行结果:*
```
node readSync.js
1 Dec 09:25:16 - 开始读取文件信息
1 Dec 09:25:16 - 数据读取完毕，内容为：
这里是data.txt文件的第一行
用于readFile方法异步和同步获取例子

这里是第四行，一共只有4行数据，其中第三行是空的


1 Dec 09:25:16 - 输出结束！
```
*异步读取文件:*
```javascript
// read.js
const fs = require('fs');
const util = require('util');

util.log('开始读取数据');
fs.readFile('./data.txt', 'utf-8', function (err, data) {
	if (err) throw err;
	util.log('数据读取完毕，内容为:');
	console.log(data);
});
util.log('结束了~~~');
```
*运行结果:*
```
node read.js
1 Dec 09:29:36 - 开始读取数据
1 Dec 09:29:36 - 结束了~~~
1 Dec 09:29:36 - 数据读取完毕，内容为:
这里是data.txt文件的第一行
用于readFile方法异步和同步获取例子

这里是第四行，一共只有4行数据，其中第三行是空的
```

## fs.open
fs.open(path, flags[, mode], callback) 方法用于在异步模式下打开文件

**参数**

* path - 文件的路径
* flags - 文件的打开行为
* mode - 设置文件权限，默认权限为0666(可读、可写)
* callback - 回调函数，带有两个参数：callback(err, fd)

**flags参数介绍**

|flag|说明|
|:--|:--|
|r|以读取模式打开文件，如果文件不存在跑出异常，即callback中第一个参数err不为null和undefined|
|r+|以读写模式打开文件，如果文件不存在跑出异常|
|rs|以同步的方式读取文件|
|rs+|以同步的方式读取和写入文件|
|w|写入模式打开文件，如果文件不存在则创建，文件的权限由参数mode决定，默认为0666|
|wx|类似 'w'，但是如果文件路径存在，则文件写入失败|
|w+|以读写模式打开文件，如果文件不存在则创建|
|wx+|类似 'w+'， 但是如果文件路径存在，则文件读写失败|
|a|以追加模式打开文件，如果文件不存在则创建|
|ax|类似 'a'， 但是如果文件路径存在，则文件追加失败|
|a+|以读取追加模式打开文件，如果文件不存在则创建|
|ax+|类似 'a+'， 但是如果文件路径存在，则文件读取追加失败|

**例子**

```javascript
// open.js
const fs = require('fs');

console.time('文件打开时间');
fs.open('./demo.txt', 'r', function (err, fd) {
    if (err) throw err;
    console.log('文件打开成功');
    console.timeEnd('文件打开时间');
});
```
*运行结果:*
```
node open.js
文件打开成功
文件打开时间: 2.159ms
```
回调函数中的fd是一个整数，至于作用，下面的一些方法会用到的

## fs.openSync
fs.openSync(path, flags[, mode]) 方法是fs.open(path, flags[, mode], callback) 方法的同步版本，返回值为整数形式的文件描述符fd

## fs.stat
fs.stat(path, callback) 方法以异步模式获取文件信息

**参数**

* path - 文件路径
* callback - 回调函数，带有两个参数：callback(err, stat) stat是fs.Stats对象

**stats类的方法**

|方法|描述|
|:--|:--|
|stats.isFile()|如果是文件返回true，否则返回false|
|stats.isDirectory()|如果是目录返回true，否则返回false|
|stats.isBlockDevice()|如果是块设备返回true，否则返回false|
|stats.isCharacterDevice()|如果是字符设备返回true，否则返回false|
|stats.isSymbolicLink()|如果是软连接返回true，否则返回false|
|stats.isFIFO()|如果是FIFO，返回true，否则返回false，FIFO是UNIX中的一种特殊类型的命令管道|
|stats.isSocket()|如果是Socket返回true，否则返回false|

**例子**
```javascript
// stat.js
const fs = require('fs');
fs.stat('./data.txt', function (err, stat) {
    if (err) throw err;
    console.dir(stat);
    console.log('是否为文件(ifFile)?', stat.isFile());
    console.log('是否为目录(isDirectory)?', stat.isDirectory());
});
```
*运行结果:*
```
node stat.js
{ dev: 2094910713,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 2533274790592340,
  size: 162,
  blocks: undefined,
  atime: 2016-12-01T01:25:09.104Z,
  mtime: 2016-12-01T01:25:09.105Z,
  ctime: 2016-12-01T01:25:09.105Z,
  birthtime: 2016-12-01T01:25:09.104Z }
是否为文件(ifFile)? true
是否为目录(isDirectory)? false
```

## fs.statSync
fs.statSync(path) 方法是fs.stat() 方法的同步版本，返回值为fs.Stats对象的实例

## fs.writeFile
fs.writeFile(filename, data[, options], callback) 以异步方式写入文件，默认情况下如果文件存在，写入的内容会覆盖旧的文件内容

**参数**

* filename - 文件地址路径
* data - 要写入文件的数据，可以是String字符串或Buffer流对象
* options - 这个参数是个对象，包含{encoding, mode, flag} 默认情况编码为utf-8，模式为0666，flag为'w'，如果想不覆盖原内容，可在此处修改

**例子**

*创建文件data.txt，内容:*
```
hello world
申锦祥
```
*js文件writeFile.js:*
```javascript
// writeFile.js
const fs = require('fs');
const util = require('util');

let str = 'shenjinxiang';

util.log('开始写入数据');
fs.writeFile('./data.txt', str, function (err) {
	if (err) throw err;
	util.log('数据写入成功，读取数据内容:');
	fs.readFile('./data.txt', 'utf-8', function (err, data) {
		if (err) throw err;
		util.log('数据读取完毕，内容：');
		console.log(data);
	});
});
```
*运行writeFile文件:*
```
node writeFile.js
1 Dec 10:04:03 - 开始写入数据
1 Dec 10:04:03 - 数据写入成功，读取数据内容:
1 Dec 10:04:03 - 数据读取完毕，内容：
shenjinxiang
```
*改用追加模式写入data.txt:*
```javascript
// writeFile.js
const fs = require('fs');
const util = require('util');

let str = '追加内容\r\n申锦祥';
util.log('开始写入数据');
fs.writeFile('./data.txt', str, (encoding: 'utf-8', flag: 'a'), function (err) {
	if (err) throw err;
	util.log('数据写入成功，读取数据内容:');
	fs.readFile('./data.txt', 'utf-8', function (err, data) {
		if (err) throw err;
		util.log('数据读取完毕，内容:');
		console.log(data);
	});
});
```
*运行writeFile.js:*
```
node writeFile.js
1 Dec 10:12:01 - 开始写入数据
1 Dec 10:12:01 - 数据写入成功，读取数据内容:
1 Dec 10:12:01 - 数据读取完毕，内容:
shenjinxiang追加内容
申锦祥
```
