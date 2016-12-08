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

## fs.read
fs.read(fd, buffer, offset, length, position, callback) 方法通过异步方式读取文件内容

**参数**

* fd - 通过fs.open() 方法返回的文件描述符
* buffer - 数据写入的缓冲区
* offset - 缓冲区写入的写入偏移量
* length - 要从文件中读取的字节数
* position - 文件读取的其实位置，如果position的值为null，则会从当前文件指针的位置读取
* callback - 回调函数，有三个参数err, bytesRead, buffer，err为错误信息，bytesRead表示读取的字节数，buffer为缓存区对象

**例子**

*创建data.txt，内容:*
```
hello world
申锦祥
```
创建read.js，内容:
```javascript
// read.js
const fs = require('fs');
const util = require('util');
let buf = new Buffer(1024);

util.log('准备打开data.txt');
fs.open('./data.txt', 'r', function (err, fd) {
	if (err) throw err;
	util.log('文件打开成功，准备读取文件');
	fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
		if (err) throw err;
		util.log('读取了' + bytes + '字节的内容');
		if (bytes > 0) {
			util.log('读取的内容：');
			console.log(buf.slice(0, bytes).toString());
		}
	});
});
```
*运行read.js:*
```
node read.js
1 Dec 10:21:01 - 准备打开data.txt
1 Dec 10:21:01 - 文件打开成功，准备读取文件
1 Dec 10:21:01 - 读取了24字节的内容
1 Dec 10:21:01 - 读取的内容：
hello world
申锦祥
```
这个方法的强大之处在于，可以读取数据较大的文件内容，比如每次读取1024字节，然后继续读取下一个1024字节，直到读取完毕，即回调函数中bytes为0的时候，不过需要注意的是，需要嵌套回调函数，比较麻烦

## fs.readSync
fs.readSync(fd, buffer, offset, length, position) 方法是fs.read()方法的同步版本，返回值为bytesRead，即读取的字节数

**例子**
```javascript
// readSync.js
const fs = require('fs');
const util = require('util');

let buf = new Buffer(1024);
util.log('准备打开文件');
fs.open('./data.txt', 'r', function (err, fd) {
	if (err) throw err;
	util.log('文件打开成功，准备读取文件内容');
	let bytes = 0;
	while ((bytes = fs.readSync(fd, buf, 0, buf.length, null)) != 0) {
		console.log(buf.slice(0, bytes).toString());
	}
});
```
*运行readSync.js:*
```
node readSync.js
1 Dec 10:35:51 - 准备打开文件
1 Dec 10:35:51 - 文件打开成功，准备读取文件内容
hello world
申锦祥
```

## fs.close
fs.close(fd, callback) 方法以异步方式关闭文件

**参数**

* fd - 通过fs.open() 方法获取的文件描述符
* callback - 回调函数，没有参数

**例子**

*创建文件data.txt 内容:*
```
hello world
申锦祥
```
*close.js内容:*
```javascript
// close.js
const fs = require('fs');
const util = require('util');
let buf = new Buffer(1024);

util.log('准备打开文件');
fs.open('./data.txt', 'r', function (err, fd) {
    if (err) throw err;
    util.log('文件打开成功');
    util.log('准备读取文件内容');
    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
        if (err) throw err;
        util.log('读取了' + bytes + '字节的数据');
        if (bytes > 0) {
            util.log('文件内容：');
            console.log(buf.slice(0, bytes).toString());
        }

        util.log('准备关闭文件');
        fs.close(fd, function (err) {
            if (err) throw err;
            util.log('文件已经关闭了');
        });
    });
});
```
*运行close.js:*
```
node close.js
1 Dec 10:39:59 - 准备打开文件
1 Dec 10:39:59 - 文件打开成功
1 Dec 10:39:59 - 准备读取文件内容
1 Dec 10:39:59 - 读取了24字节的数据
1 Dec 10:39:59 - 文件内容：
hello world
申锦祥

1 Dec 10:39:59 - 准备关闭文件
1 Dec 10:39:59 - 文件已经关闭了
```

## fs.closeSync

fs.closeSync(fd) 方法是fs.close() 方法的同步版本

## fs.ftruncate
fs.ftruncate(fd, len, callback) 方法异步方式截取文件

**参数**

* fd - 通过fs.open() 方法返回的文件描述符
* len - 文件内容截取的长度
* callback - 回调函数，没有参数

**例子**

*创建data.txt文件，内容:*
```
shenjinxiang
hello world
申锦祥
```
*ftruncate.js 内容:*
```javascript
// ftruncate.js
const fs = require('fs');
const util = require('util');

let buf = new Buffer(1024);

util.log('准备打开文件');
// 打开文件
fs.open('./data.txt', 'r+', function (err, fd) {
    if (err) throw err;
    util.log('文件打开成功');
    util.log('准备截取文件10个字节的内容');

    // 截取文件
    fs.ftruncate(fd, 10, function (err) {
        if (err) throw err;
        util.log('文件截取成功');

        util.log('读取文件内容');
        // 读取文件内容
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) throw err;
            util.log('文件读取成功');
            if (bytes > 0) {
                util.log('文件内容');
                console.log(buf.slice(0, bytes).toString());
            }

            // 关闭文件
            fs.close(fd, function (err) {
                if (err) throw err;
                util.log('文件关闭成功');
            });
        });
    });
});
```
*运行ftruncate.js:*
```
node ftruncate.js
1 Dec 10:45:07 - 准备打开文件
1 Dec 10:45:07 - 文件打开成功
1 Dec 10:45:07 - 准备截取文件10个字节的内容
1 Dec 10:45:07 - 文件截取成功
1 Dec 10:45:07 - 读取文件内容
1 Dec 10:45:07 - 文件读取成功
1 Dec 10:45:07 - 文件内容
shenjinxia
1 Dec 10:45:07 - 文件关闭成功
```
*查看data.txt的内容:*
```
cat data.txt
shenjinxia
```

## fs.ftruncateSync
fs.ftruncateSync(fd, len) 方法是fs.ftruncate() 方法的同步版本

## fs.unlink
fs.unlink(path, callback) 通过异步方式删除文件

**参数**

* path - 文件路径
* callbcak - 回调函数，没有参数

**例子**

*创建文件data.txt，内容:*
```
hello world
申锦祥
```
*unlink.js文件内容:*
```javascript
// unlink.js
const fs = require('fs');
const util = require('util');

util.log('准备删除文件');
fs.unlink('./data.txt', function (err) {
    if (err) throw err;
    util.log('文件删除成功');
});
```
*运行unlink.js*
```
node unlink.js
1 Dec 10:50:45 - 准备删除文件
1 Dec 10:50:45 - 文件删除成功
```
查看当前目录下文件，data.txt文件已经删除了

## fs.unlinkSync
fs.unlinkSync(path) 方法是fs.unlink() 方法的同步版本

## fs.mkdir
fs.mkdir(path[, mode], callback)方法是创建目录的异步方式

**参数**

* path - 文件路径
* mode - 设置目录权限，默认为0777
* callback - 回调函数，没有参数

**例子**

*创建目录temp，创建mkdir.js，内容为:*

```javascript
// mkdir.js
let fs = require('fs');
let util = require('util');

util.log('开始创建目录');
fs.mkdir('./temp/a', function (err) {
    if (err) throw err;
    util.log('创建目录成功');
});
```
*运行mkdir.js*
```
node mkdir.js
1 Dec 10:57:12 - 开始创建目录
1 Dec 10:57:12 - 创建目录成功
```
*查看temp目录下的文件:*
```
ll temp/
total 0
drwxr-xr-x 1 shenjinxiang 197608 0 12月  1 10:57 a
```
需要注意的是，**mkdir方法不能创建已经存在的目录，也不能在不存在的目录下创建目录**

## fs.mkdirSync
fs.mkdirSync(path[, mode]) 是fs.mkdir() 方法的同步版本

## fs.readdir
fs.readdir(path, callback)异步方式读取目录信息

**参数**

* path - 文件路径
* callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表

**例子**

*创建temp目录，并在temp目录下创建a、b、c目录和temp.txt文件*
```
mkdir temp
mkdir temp/a temp/b temp/c
touch temp/temp.txt
```
*创建readdir.js，内容:*
```javascript
// readdir.js
const fs = require('fs');
const util = require('util');

util.log('开始读取目录信息');
fs.readdir('./temp', function (err, files) {
    if (err) throw err;
    util.log('目录信息读取完毕:');
    console.log(files);
});
```
运行readdir.js
```
node readdir.js
1 Dec 11:02:57 - 开始读取目录信息
1 Dec 11:02:57 - 目录信息读取完毕:
[ 'a', 'b', 'c', 'temp.txt' ]
```
需要注意，使用readdir时，path必须存在且**必须为目录**，不能是文件

## fs.readdirSync
fs.readdirSync(path) 方法是fs.readdir()方法的同步版本，返回files，即目录下的文件列表

## fs.rmdir
fs.rmdir(path, callback) 方法是以异步方式删除目录

**参数**

* path - 文件路径
* callback - 回调函数，没有参数

**例子**

*创建temp目录，并在temp目录下创建a、b、c目录和temp.txt文件*
```
mkdir temp
mkdir temp/a temp/b temp/c
touch temp/temp.txt
```
*创建rmdir.js 用于删除temp下的a文件:*
```javascript
// rmdir.js
const fs = require('fs');
const util = require('util');

util.log('准备删除目录');
fs.rmdir('./temp/a', function (err) {
    if (err) throw err;
    util.log('删除成功');
});
```
*运行rmdir.js:*
```
node rmdir.js
1 Dec 11:07:11 - 准备删除目录
1 Dec 11:07:11 - 删除成功
```
查看temp文件下的内容:
```
ll temp/
total 0
drwxr-xr-x 1 shenjinxiang 197608 0 12月  1 11:01 b
drwxr-xr-x 1 shenjinxiang 197608 0 12月  1 11:01 c
-rw-r--r-- 1 shenjinxiang 197608 0 12月  1 11:02 temp.txt
```
需要注意的是，**rmdir只能删除目录，且要删除的目录必须为空目录**

## fs.rmdirSync
fs.rmdirSync(path) 方法是fs.rmdir()方法的同步版本
