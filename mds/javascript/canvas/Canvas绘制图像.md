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
|img|规定要使用的图像、画布或视频|
|sx|可选。开始剪切img的 x 坐标位置|
|sy|可选。开始剪切img的 y 坐标位置|
|swidth|可选。被剪切图像的宽度|
|sheight|可选。被剪切图像的高度|
|x|在画布上放置图像的 x 坐标位置|
|y|在画布上放置图像的 y 坐标位置|
|width|可选。要使用的图像的宽度（伸展或缩小图像）|
|height|可选。要使用的图像的高度（伸展或缩小图像）|
