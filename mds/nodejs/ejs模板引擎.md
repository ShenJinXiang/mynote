# ejs模板引擎
express使用到现在的阶段，有一个很重要的问题还没解决，那就是mvc模式中的view层，之前我们只是简单的给浏览器发送一个字符串，或者拼接html字符串，对于简单的页面来说还可以实现，但是实际开发的时候显然是不合适的，类似于java web开发的时候有jsp、FreeMarker等模板引擎，nodejs中同样也有模板引擎，比如 jade、ejs等模板引擎，今天简单介绍一下ejs，原因很简单，这个非常容易上手

## 安装ejs
ejs安装很简单，同样是使用npm工具
```
$ npm install ejs --save
```
使用'--save'命令同时更新package.json中的依赖列表

## express中加载ejs
```javascript
// app.js
const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});
```

上面的代码中，没有设置任何路由，不过已经加载了ejs，```app.set('views', path.join(__dirname, '/views'));``` 这行代码的意思是，设置视图根目录为views目录，```app.set('view engine', 'ejs');``` 的意思是设置视图的后缀名为‘ejs’，这样就加载上了ejs模板

## 使用ejs模板

创建目录views
```
$ mkdir views
```

在views目录下创建index.ejs文件
```
$ touch views/index.ejs
```

编辑index.ejs
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<title>index</title>
</head>
<body>
<h1>express ejs</h1>
</body>
</html>
```

修改app.js 添加路由
```javascript
const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// 渲染index.ejs视图
	res.render('index');
});

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});
```

启动app.js应用
```
$ node app.js
Server running at 3000 port.
```

浏览器中访问 "http://localhost:3000/" 结果如下:

![](./img/015.png)

需要注意的是，res.render()方法，ejs文件的路径是以配置的视图路径为根目录的，本例中，配置的视图根目录为“views”，所以要渲染“views/index.ejs”，则写成“res.render('index')”，ejs文件的目录为“views/user/user.ejs”，那么渲染的方法为“res.render('user/user')”

## ejs中的一些标签
