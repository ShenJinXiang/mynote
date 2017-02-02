# Canvas介绍
这里说的Canvas是HTML5中新增的一个标签元素，提供了一套接口，我们可以通过JavaScript脚本来调用这些接口，绘制图像，制作各种有意思的应用

## Canvas标签
canvas标签是HTML5新增的标签，使用很简单，需要注意的是，以前版本的一些浏览器可能会不支持canvas元素，可以在canvas开始和闭合标签之间写入一些内容，当浏览器不支持canvas的时候，这些内容将展示给用户，下面是一个简单的html文档：

```html
<!doctype html>
<html>
<head>
	<meta charset='utf-8'>
	<title>文档标题</title>
</head>
<body>
	<canvas id='mycanvas'>您的浏览器版本过低，请升级浏览器！</canvas>
<script type='text/javascript' src='外部的js文件路径'></script>
</body>
</html>
```

## Canvas对象
Canvas元素本身不不做什么，只是提供了一个画布，通过脚本来操作画布，在上面按像素绘制图案，可以在js中通过`document.getElementById('canvas标签的id值')`获取对应的Canvas对象，通过Canvas对象可以设置其宽高，也可以获取用于绘图的上下文环境。

### 宽度和高度
Canvas对象的width和height属性，用于指定canvas的宽度和高度，如果不指定这两个属性，默认的宽度和高度分别为：300和150

如果canvas元素的尺寸在样式表和内敛style属性中都没有另外的定义，则width及height属性也将指定canvas元素在屏幕上的尺寸

设置width和height中任意一个，都将清空画布

```javascript
// 获取Canvas对象
let canvas = document.getElementById('mycanvas');

// 设置宽高属性
canvas.width = 600;
canvas.height = 450;
```

### 上下文对象
Canvas对象的`getContext()`方法，这个方法返回一个用于在Canvas元素上画图的对象。如果传入字符串“2d”，本方法将返回一个用于2D绘图的CanvasRenderingContext2D对象，在这种情况下不需要额外的args

每个Canvas元素只有一个CanvasRenderingContext2D对象，所以多次调用getContext('2d')返回的是同一个对象，我们在canvas上实现绘制图案大部分都是通过调用CanvasRenderingContext2D对象的方法和属性来实现的

```javascript
let canvas = document.getElementById('mycanvas');
let context1 = canvas.getContext();
let context2 = canvas.getContext();
console.log(context1 === context2); // true
```

## Canvas中的坐标系统
通过脚本绘图时，经常需要传入像素点对应的坐标值，在canvas 中默认的坐标原点为canvas左上角。水平向右x坐标值增加，竖直向下y坐标值增加。即canvas左上角的坐标为`(0, 0)`，canvas右下角的坐标为`(canvas.width, canvas.height)`

CanvasRenderingContext2D有一些方法可以更改坐标系统，以后会涉及到
