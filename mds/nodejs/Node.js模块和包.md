# Node.js模块和包
我们了解了Node.js的一些基本用法，可以用node运行js脚本文件，但是在实际开发的时候是远远不够的，开发一个具有一定规模的程序不可能只用一个文件，我们需要把各个功能拆分、封装然后组合起来，模块就是为了解决这个问题

## 创建模块和加载模块
模块是nodejs中的基本组成部分，一个nodejs文件就是一个模块，这个文件可以是js文件或者是JSON文件

### require和exports
在一个模块中，申明的变量，其作用域范围只是在当前的文档范围内，例如有两个js文件：a.js和b.js， a.js中申明了变量name， 在b.js中是访问不到的，通过exports这个全局对象，可以创建模块的对外接口，引用这可以通过require方法来加载外部模块，获得指定的外部模块公开的接口

*先来个简单的例子，创建person.js文件，内容为:*
```javascript
// person.js
var _name;

var setName = function (name) {
    _name = name;
};

var sayHello = function () {
    console.log('Hello, ' + 'my name is ' + _name);
};

exports.setName = setName;
exports.say = sayHello;
```
*在同一个目录下创建personTest.js文件，内容为:*
```javascript
// personTest.js
var p = require('./person');

p.setName('Xiao Ming');
p.say();
```
*运行personTest.js 查看结果:*
```
node personTest.js
Hello, my name is Xiao Ming
```
person.js中通过exports对外声明了setName和say这两个方法，personTest.js中通过require方法引入person的公开接口，可以调用person.js中的方法；另外，person.js中的_name属性，在personTest.js中的不能访问到的

需要注意的是，require不会多次加载模块，也就是说，**不管调用几次require，获得的是同一个模块**
```javascript
// personTest1.js
var p1 = require('./person');
p1.setName('张飞');
var p2 = require('./person');
p2.setName('岳飞');
p1.say();
p2.say();
console.log('p1 === p2 :', p1 === p2);
```
*查看运行结果:*
```
Hello, my name is 岳飞
Hello, my name is 岳飞
p1 === p2 : true
```

### module.exports
有些时候我们公开的接口只是一个对象
```javascript
// Person.js
function Person () {
    var _name;

    this.setName = function (name) {
        _name = name;
    };

    this.say = function () {
        console.log('Hello, ' + 'my name is ' + _name);
    };
}

exports.Person = Person;
```
此时，其它文件需要通过：require('./Person').Person，来获取，稍显麻烦，我们可以通过module.exports来简化:
```javascript
// Person.js
function Person () {
    var _name;

    this.setName = function (name) {
        _name = name;
    };

    this.say = function () {
        console.log('Hello, ' + 'my name is ' + _name);
    };
}

module.exports = Person;
```
*创建getPerson.js文件，内容:*
```javascript
// getPerson.js
var Person = require('./Person');

var p = new Person();
p.setName('刘备');
p.say();
```
看完上面的例子，或许会想，为什么不在Person.js中直接写成exports = Person;这样的呢？我们来试试
```javascript
// Person.js
function Person () {
    var _name;

    this.setName = function (name) {
        _name = name;
    };

    this.say = function () {
        console.log('Hello, ' + 'my name is ' + _name);
    };
}
exports = Person;   // 修改了此处
```
*getPerson.js中的内容:*
```javascript
// getPerson.js
var Person = require('./Person');
console.log(Person);    // 此处增加一样，打印我们获取到的Person
var p = new Person();
p.setName('刘备');
p.say();
```
*运行getPerson.js*
```
{}
var p = new Person();
        ^
TypeError: Person is not a function
```
可以看到报错了，并没有获取到Person，打印出来的Person的值是一个空的对象'{}'，问题来了，在Person.js中，我们确实用exports将Person对外开放了的，为什么获取不到呢？为了解释这个问题，先来看一个js基础的例子:
```javascript
var a = {name: 1};
var b = a;

console.log('a:', a);
console.log('b:', b);
console.log('a === b :', a === b);

b.name = 2;
console.log('设置 b.name = 2 以后：');
console.log('a:', a);
console.log('b:', b);
console.log('a === b :', a === b);

b = {name: 3};
console.log('设置 b = {name: 3} 以后：');
console.log('a:', a);
console.log('b:', b);
console.log('a === b :', a === b);
```
*运行结果:*
```
a: { name: 1 }
b: { name: 1 }
a === b : true
设置 b.name = 2 以后：
a: { name: 2 }
b: { name: 2 }
a === b : true
设置 b = {name: 3} 以后：
a: { name: 2 }
b: { name: 3 }
a === b : false
```
a是一个对象，b是对a的引用，也就是说a和b指向同一块内存，所以输出结果是一样的，a === b的结果也为true，当b作修改时，a的name属性也跟着改变了，所以输出结果也是一样的，当b = {name: 3} 时，相当于将b覆盖了，此时b指向了另外一块新的内存，a还是原来的，所以结果不一样

明白这个例子以后，我们可以这样来理解exports和module.exports的区别了:
* module.exports 初始值为一个空对象{}
* exports 是指向module.exports的引用
* require() 方法的返回值是module.exports而不是exports

## 包
包是在模块的基础上的抽象，类似于java中的类库。将某个独立的功能封装起来，用于发布、更新、依赖管理和版本控制。Node.js根据CommonJS规范实现包机制基本要求如下:
* 根目录下必须包含有一个package.json文件，用于说明包的信息
* 二进制文件应该在bin目录下
* JavaScript代码应该在lib目录下
* 文档应该在doc目录下
* 单元测试应该在test目录下

### 创建一个最简单的包
*创建一个文件夹sayhello，在sayhello中创建index.js:*
```javascript
// sayhello/index.js

exports.hello = function (name) {
    console.log('hello', name);
};
```
*在sayhello文件夹外创建getSayHello.js:*
```javascript
// getSayHello.js
var say = require('./sayhello');
say.hello('林冲');
```
*执行getSayHello.js:*
```
node getSayHello.js
hello 林冲
```

### 使用package.json
上个例子中，我们调用sayhello包，没有使用package.json，默认的加载了包内的index.js模块，使用package.json，可以创建更负责、更完善、更符合规范的包

在上面例子中的sayhello文件夹下，创建package.json文件
```javascript
{
	"main": "./lib/hello.js"
}
```
然后将index.js重命名为hello.js，放入lib子文件夹下，同样的方式调用sayhello包，依然可以正常使用

Node.js在调用某个包时，首先检查包中的package.json文件中的main字段，作为包的接口模块，如果package.json或main字段不存在，会尝试寻找index.js或index.node作为包的接口

符合规范的package.json文件应该包含:
* name: 包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格
* description: 包的简要说明
* version: 符合语义化版本识别规范的版本字符串
* keywords: 关键字数组，通常用于搜索
* maintainers: 维护者数组，每个元素包含name、email(可选)、web(可选)字段
* contributors: 贡献者数组，格式与maintainers相同，包的作者应该是贡献者数组的第一个元素
* bugs: 提交bug的地址，可以是网址或电子邮件地址
* licenses: 许可证数组，每个元素包含type(许可证名称)和url(连接到许可证文本的地址)字段
* repositories: 仓库托管地址数组，每个元素包含type(仓库类型，如git)、url(仓库地址)和path(相对于仓库的路径，可选)字段

## Node.js包管理器 npm
npm是Node.js官方提供的包管理工具，用于Node.js包的发布、传播、依赖控制，说简单点，npm相当于java中的mave，用于管理第三方包，同时管理自身的包

### 获取包
使用npm安装包的命令格式为:
```
npm install package_name
```
例如安装express包，可以运行命令:
```
npm install express
```
或者
```
npm i express
```

### 本地模式和全局模式
npm在默认情况下将下载的包安装到当前目录的node_modules子目录下，类似于java中lib目标中放置jar包一样，即本地模式，每个项目下的node_modules下都有一个副本

全局模式是直接安装在系统目录，然后注册PATH环境变量

全局模式的安装命令格式:
```
npm install -g package_name 
```
例如如果要将express安装成全局模式:
```
npm install -g express
```
或者
```
npm i -g express
```

本地模式和全局模式的特点:

|模式|可通过require使用|注册PATH|
|:--:|:--:|:--:|
|本地模式|是|否|
|全局模式|否|是|

如果要某个包作为工程运行时的一部分时，通过本地模式获取，如果要在命令行下使用，则使用全局模式安装

### npm 命令介绍:

|命令|说明|
|:--|:--|
|npm -v|查看npm版本号|
|npm install module_name|安装本地模块|
|npm install module_name -g|安装全局模块|
|npm ls|查看本地安装的模块列表|
|npm ls -g|查看全局安装的模块列表|
|npm uninstall module_name|卸载模块|
|npm update module_name|更新模块|
|npm search module_name|搜索模块|
|npm init|初始化一个模块，按提示创建package.json文件|
|npm install|按照package.json文件中的本地模块列表安装对应的本地模块|
|npm publish|发布模块，发布成功后，此模块可以和其他模块一样，可以通过npm安装|
|npm help comand|查看某条命令的帮助信息|

### 关于版本号
使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号

* 如果只是修复bug，需要更新Z位
* 如果是新增了功能，但是向下兼容，需要更新Y位
* 如果有大变动，向下不兼容，需要更新X位

版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv
