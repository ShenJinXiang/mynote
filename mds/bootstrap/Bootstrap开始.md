# Bootstrap 安装和使用
Bootstrap 安装很简单直接去[官网](http://www.bootcss.com)下载即可，可以选择下载可以直接使用的生产环境的文件，也可以下载源码

## 目录结构

### 生产环境版本
下载完压缩包，解压以后的目录解构是这样的：

bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   └── bootstrap-theme.min.css
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    └── glyphicons-halflings-regular.woff

可以看到包含已经编译的css和js文件，包括压缩版和未压缩版。同时也包含了 Glyphicons 的字体

### 源码版本
如果下载的是源码，目录结构为:

bootstrap/
├── less/
├── js/
├── fonts/
├── dist/
│   ├── css/
│   ├── js/
│   └── fonts/
└── docs/
    └── examples/

less/、js/ 和 fonts/ 目录分别包含了 CSS、JS 和字体图标的源码。dist/ 目录包含了上面所说的预编译 Bootstrap 包内的所有文件。docs/ 包含了所有文档的源码文件，examples/ 目录是 Bootstrap 官方提供的实例工程。除了这些，其他文件还包含 Bootstrap 安装包的定义文件、许可证文件和编译脚本等

## html模板
基本模版如下:
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
	<!-- 可选的Bootstrap主题文件（一般不用引入） -->
	<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap-theme.min.css">
	<title>index</title>
</head>
<body>

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
</body>
</html>
```
如果已经下载好了bootstrap，当然可以引入本地的css和js文件，必须注意：**引入bootstrap.min.js之前必须先引入jQuery.min.js文件**
