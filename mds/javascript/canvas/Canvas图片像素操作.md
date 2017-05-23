# Canvas图片像素操作
针对图片的操作，Canvas不仅仅可以将图片缩放到一个区域中，而且可以进行像素级操作，即可以设置Canvas内部某一个像素点的颜色，涉及到的方法主要有：`createImageData()`、`getImageData()`和`putImageData()`

* createImageData() 用于创建新的、空白的 ImageData 对象
* getImageData() 用于返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据
* putImageData() 把图像数据（从指定的 ImageData 对象）放回画布上

## ImageData对象
在介绍上面三个方法之前，先说ImageData对象，ImageData对象用于存储图像数据，其中的data属性表述了一个矩形区域内每个像素点的颜色信息，width和height属性表述的矩形区域的宽和高

ImageData对象的data以数组的形式存在，用连续的4个元素来表示一个像素点的RGBA四个方面的信息：

* R - 红色（0～255）
* G - 绿色（0～255）
* B - 蓝色（0～255）
* A - alpha通道（0～255；0表示透明，255表示完全不透明）

### 例子
把 ImageData 对象中的第一个像素变为红色的语法：
```javascript
imgData = context.createImageData(100,100);

imgData.data[0]=255;
imgData.data[1]=0;
imgData.data[2]=0;
imgData.data[3]=255;
```

把 ImageData 对象中的第二个像素变为绿色的语法：
```javascript
imgData=ctx.createImageData(100,100);

imgData.data[4]=0;
imgData.data[5]=255;
imgData.data[6]=0;
imgData.data[7]=255;
```
由于一个像素点需要四个连续的元素来表示其RGBA信息，所以data属性必然包含`width * height * 4`个元素

## getImageData() 方法
CanvasRenderingContext2D对象的`getImageData()`方法可以获取Canvas中指定矩形区域的像素数据，返回ImageData对象

> var imageData = context.getImageData(x, y, width, height);

### 参数说明

| 参数 |             描述            |
|:----:|:----------------------------|
|   x  |开始复制的左上角位置的 x 坐标|
|   y  |开始复制的左上角位置的 y 坐标|
|width |将要复制的矩形区域的宽度     |
|height|将要复制的矩形区域的高度     |
