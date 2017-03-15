# Canvas文字渲染
图片中不止有一些线条组成的一些图形，同样可能会有一些文字，Canvas同样提供了绘制文字的方法

## fillText()方法
CanvasRenderingContext2D对象的fillText方法用于在画布上绘制一段文本内容，绘制的颜色、渐变、背景通过fillStyle属性来设置，文本的字体大小、样式通过CanvasRenderingContext2D对象的font属性设置

> CanvasRenderingContext2D.fillText(text, x, y, maxWidth)

fillText()方法的参数也很好理解，第一个参数为需要渲染的文本内容，x和y指定渲染的位置，可选参数maxWidth规定渲染的最大宽度，如果文本内容比较长，超过maxWidth值，设置这个参数会将文本压缩到指定的最大宽度
