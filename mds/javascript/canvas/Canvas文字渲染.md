# Canvas文字渲染
图片中不止有一些线条组成的一些图形，同样可能会有一些文字，Canvas同样提供了绘制文字的方法

## fillText()方法
CanvasRenderingContext2D对象的fillText方法用于在画布上绘制一段文本内容，绘制的颜色、渐变、背景通过fillStyle属性来设置，文本的字体大小、样式通过CanvasRenderingContext2D对象的font属性设置

> CanvasRenderingContext2D.fillText(text, x, y, maxWidth)

fillText()方法的参数也很好理解，第一个参数为需要渲染的文本内容，x和y指定渲染的位置，可选参数maxWidth规定渲染的最大宽度，如果文本内容比较长，超过maxWidth值，设置这个参数会将文本压缩到指定的最大宽度

```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 200;
	let context = canvas.getContext('2d');

	context.font = '50px 宋体';
	context.fillText('申锦祥', 100, 50);
		
	context.font = '50px Arial';
	context.fillText('www.shenjinxiang.com', 100, 150);
})();
```

效果:

![](./images/00043.png)

这样简单的文字渲染效果就出来了，上面提到过可以使用fillStyle来设置填充的样式，代码：

```javascript
(function () {
	let str = 'www.shenjinxiang.com';

	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 200;
	let context = canvas.getContext('2d');

	// 纯色
	context.fillStyle = '#058';
	context.font = 'bold 50px Arial';
	context.fillText(str, 100, 70);

	// 渐变色
	let gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, 'magenta');
	gradient.addColorStop(0.5, 'blue');
	gradient.addColorStop(1, 'red');
	context.fillStyle = gradient;
	context.fillText(str, 100, 170);
})();
```

效果：

![](./images/00044.png)

采用了纯色和渐变色绘制的一段文字，当然也可以使用外部图片或者其他canvas作为背景填充

## strokeText()方法
CanvasRenderingContext2D的strokeText()方法的与fillText()差不多，唯一的区别在于fillText()方法是填充一段文本，而strokeText()方法是绘制文本的描边，同样的可以设置strokeStyle属性来着是样式，直接来代码：

```javascript
(function () {
	let str = 'www.shenjinxiang.com';

	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 200;
	let context = canvas.getContext('2d');

	// 纯色
	context.strokeStyle = '#058';
	context.font = 'bold 50px Arial';
	context.strokeText(str, 100, 70);

	// 渐变色
	let gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, 'magenta');
	gradient.addColorStop(0.5, 'blue');
	gradient.addColorStop(1, 'red');
	context.strokeStyle = gradient;
	context.strokeText(str, 100, 170);
})();
```

效果：

![](./images/00045.png)

基本和上一个例子中的代码一样的，只是将fillText改成strokeText、将fillStyle改成strokeStyle，可以看到strokeText的效果

## 设置文本位置



