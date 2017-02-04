# Canvas图形变换
canvas中的图形变换，主要涉及到图形的偏移、旋转、缩放功能。本文所有的代码采用的html模板均为：
```html
<!doctype html>
<html>
<head>
	<meta charset='utf-8'>
	<style>
		canvas{display:block; border: 1px solid #ccc;margin: 0px auto;}
	</style>
	<title>canvas</title>
</head>
<body>
	<canvas id='mycanvas'></canvas>
<script src='外部js路径'></script>
</body>
</html>
```

## translate()方法
CanvasRenderingContext2D的translate()方法为当前画布添加水平和垂直偏移量。默认情况下，canvas中的坐标系统是以左上角为坐标原点`(0, 0)`，水平向右x坐标值增加、垂直向下y坐标值增加。translate()方法接受两个Number类型参数，分别设置x轴和y轴方向的偏移量

```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.fillStyle = 'blue';
	context.translate(100, 100);
	context.fillRect(0, 0, 400, 400);
})();
```

效果：

![](./images/00016.png)

使用`fillRect()`方法填充一个400*400的矩形空间，在此之前使用translate()方法设置x、y方向的偏移量都为100。可以看到，虽然填充的起始点坐标设置为`(0, 0)`，但是在translate()方法影响下，相当于将坐标原点移动到了`(100, 100)`位置

## 保存还原绘图状态
