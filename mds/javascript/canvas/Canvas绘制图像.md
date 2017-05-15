# Canvas绘制图像
Canvas可以通过调用CanvasRenderingContext2D对象的属性和方法来绘制各种线条或图案。当然也可以操作图片，实现各种有意思的功能，主要涉及到`drawImage()`方法

## drawImage()方法
通过`drawImage()`方法，可以将图片、Canvas或者视频绘制到Canvas画布上，这个方法非常强大，可以绘制图像的任意部分到画布上，需要注意的是该方法的参数，有三种参数调用方式：
1. 在画布上定位图像：

> context.drawImage(img, x, y)

2. 在画布上定位图像，并规定图像的宽度和高度：

> context.drawImage(img, x, y, width, height)

3. 剪切图像，并在画布上定位被剪切的部分：

> context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)

### 参数说明

|参数|说明|
|:--:|:---|
|img|规定要使用的图像、画布或视频|
|sx|可选。开始剪切img的 x 坐标位置|
|sy|可选。开始剪切img的 y 坐标位置|
|swidth|可选。被剪切图像的宽度|
|sheight|可选。被剪切图像的高度|
|x|在画布上放置图像的 x 坐标位置|
|y|在画布上放置图像的 y 坐标位置|
|width|可选。要使用的图像的宽度（伸展或缩小图像）|
|height|可选。要使用的图像的高度（伸展或缩小图像）|

## 图片缩放的例子
为了更好理解和使用`drawImage()`方法，做一个图片缩放的小练习

html部分
```html
<!doctype html>
<html>
<head>
	<meta charset='utf-8'>
	<style>
	* {margin: 0px; padding: 0px;}
	body {background-color: #111;}
	canvas {display: block; margin: 10px auto; border: 1px solid #ccc;}
	#range {display: block; margin: 5px auto; border-color: #fff;}
	</style>
	<title>SCALE</title>
</head>
<body>
	<canvas id='canvas'></canvas>
	<input type='range' id='range' value='1' />
<script src='./zoom.js'></script>
</body>
</html>
```

javascript部分zoom.js
```javascript
(function(){

	var config = {
		img: './001.jpg', // 图片源地址
		min: 0.5,  // 最小缩放比例
		max: 3     // 最大缩放比例
	};
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth - 200;
	canvas.height = window.innerHeight - 100;
	var context = canvas.getContext('2d');

	var range = document.getElementById('range');
	range.style.width = canvas.width + 'px';
	range.max = config.max;
	range.min = config.min;
	range.step = 0.01;
	range.value = 1;

	var markCanvas = getMarkCanvas();

	var img = new Image();
	img.src = config.img;
	img.onload = function () {
		draw(range.value);
	}

	range.addEventListener('mousemove', function() {
		var scale = range.value;
		draw(scale);
	});

	function draw(scale) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(img, 
			(canvas.width - canvas.width * scale) / 2,
			(canvas.height - canvas.height * scale) / 2,
			scale * canvas.width,
			scale * canvas.height
		);
		context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
	}
	
	function getMarkCanvas() {
		var markCanvas = document.createElement('canvas');
		markCanvas.width = 400;
		markCanvas.height = 100;
		var ctx = markCanvas.getContext('2d');
		
		ctx.fillStyle = 'rgba(204, 204, 204, 0.5)';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '40px cursive';
		ctx.fillText('www.shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2, 340);
		return markCanvas;
	}
})();
```

基本思路：
1. 设置图片的源地址以及图片缩放的最大最小比例
2. 当图片加载完成以后使用`drawImage()`方法将图片绘制到画布上
3. 当滑竿的值有变化时，使用`clearRect()`清楚画布所有内容，重新根据比例绘制图像
4. 在这个例子中，使用了离屏Canvas技术，在画布右下角添加了一个水印签名，这个水印签名本身是另外一个Canvas，在本例中，通过`getMarkCanvas()`生成，每次绘制画布时，同样使用`drawImage()`方法将这个Canvas绘制到画布上

最终效果地址：[http://www.shenjinxiang.com/static/canvas/2016/08/23/zoom/index.html](http://www.shenjinxiang.com/static/canvas/2016/08/23/zoom/index.html)
