# Canvas绘制曲线
在此之前我们都是使用canvas绘制线段组成一些图案，今天介绍Canvas绘制曲线的一些接口

## arc()方法
arc()方法用来绘制一段圆弧，调用方法：
> context.arc(x, y, r, sAngle, eAngle, counterclockwise)

参数说明：

* x: 要绘制圆弧圆心的x坐标值，Number类型
* y: 要绘制圆弧圆心的y坐标值，Number类型
* r: 要绘制圆弧半径，Number类型
* sAngle: 绘制的圆弧的起始角度，单位为弧度
* eAngle: 绘制的圆弧的结束角度，单位为弧度
* counterclockwise: 规定应该逆时针还是顺时针绘图，false表示顺时针，true表示逆时针，默认为false

这里需要注意的是起始弧度终止弧度参数，默认情况下，x坐标正方向上的为0度，即圆弧的三点钟位置为0度，顺时针为正，示例如下图：

![](./images/00028.png)

不论是要顺时针还是要逆时针绘图，角度是不会变的，看下面的代码：
```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	context.lineWidth = 5;
	context.fillStyle = '#058';

	context.beginPath();
	context.arc(100, 100, 75, 0, 0.5 * Math.PI, false);
	context.stroke();

	context.beginPath();
	context.arc(300, 100, 75, 0, 1 * Math.PI, false);
	context.stroke();

	context.beginPath();
	context.arc(500, 100, 75, 0, 1.5 * Math.PI, false);
	context.stroke();

	context.beginPath();
	context.arc(700, 100, 75, 0, 2 * Math.PI, false);
	context.stroke();

	context.beginPath();
	context.arc(100, 300, 75, 0, 0.5 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.arc(300, 300, 75, 0, 1 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.arc(500, 300, 75, 0, 1.5 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.arc(700, 300, 75, 0, 2 * Math.PI, false);
	context.fill();
})();
```

效果：

![](./images/00029.png)

上图中所有圆弧的其实位置都是在0度位置，结束角度不同，可以看到如果一段不封闭的圆弧，调用`fill()`方法的时候，会将起点和终点连接成封闭的路径，然后填充

```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	context.lineWidth = 5;
	context.fillStyle = '#058';

	context.beginPath();
	context.arc(100, 100, 75, 0, 0.5 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(300, 100, 75, 0, 1 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(500, 100, 75, 0, 1.5 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(700, 100, 75, 0, 2 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(100, 300, 75, 0, 0.5 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(300, 300, 75, 0, 1 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(500, 300, 75, 0, 1.5 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(700, 300, 75, 0, 2 * Math.PI, true);
	context.fill();
})();
```

效果：

![](./images/00030.png)

这个例子和上一个例子代码唯一的区别在于绘制圆弧的时候最后一个参数由`false`改成`true`，意味着将采用逆时针方式绘制图形，可以看到没有调用rotate的情况下，0度在3点钟位置，而`0.5 * Math.PI`的角度在6点钟位置
