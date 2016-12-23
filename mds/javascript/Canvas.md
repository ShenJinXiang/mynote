# Canvas

## Canvas
用于脚本绘图的HTML元素

Canvas对象表现为HTML的canvas元素。该元素并不能做什么，但定义了一个支持在客户端使用脚本绘图的API，可以为这个对象定义width和height，也可以用toDataURL()方法从画布中导出图片，实际绘图的API是由getContext()方法返回的一个独立“上下文”对象事件的

### 属性
**height**

>unsigned long height

**width**

>unsigned long width

对应&lt;canvas&gt;标签的width及height属性，指定canvas坐标控件的纬度，width和height的默认值分别为300 和150

如果canvas元素的尺寸在样式表和内敛style属性中都没有另外的定义，则width及height属性也将指定canvas元素在屏幕上的尺寸

设置width和height中任意一个，豆浆清空画布

### 方法

**getContext()**

> object getContext(String contextID, [any args...])

这个方法返回一个用于在Canvas元素上画图的对象。如果传入字符串“2d”，本方法将返回一个用于2D绘图的CanvasRenderingContext2D对象，在这种情况下不需要额外的args

每个canvas元素只有一个CanvasRenderingContext2D对象，所以多次调用getContext('2d')返回的是同一个对象

**toDataURL()**

> string toDataURL([string type], [any args...])

toDataURL()以data://URL 的方式返回canvas位图的内容，这种方式可以很容易的在&lt;img&gt;标签中使用或者通过网络传输

```
var canvas = document.getElementById('my_canvas');
var image = document.createElement('img');
image.src = canvas.toDataURL();
document.body.appendChild(image);
```

*type*参数定义图片格式使用的MIME类型，如果省略该参数，默认值为'image/png'。只有PNG图片格式是要求支持的实现方式。除了PNG外的图片格式，可以传入额外的参数来定义编码细节。比如，如果*type*是'image/jpeg'，第二个参数应该为0~1之间的一个数字，用于定义图片的质量级别

## CanvasGradient
用于Canvas颜色渐变



创建CanvasGradien对象后，就可以使用```addColorStop()```来定义渐变中什么颜色在什么位置出现，颜色将在定义的位置插入并产生平滑的渐变或淡出(淡入)。如果没有定义色标，渐变将全是清一色的透明黑色。

### 方法

**addColorStop**

> void addColorStop(double offset, string color)

``addColorStop()```定义一种渐变中的固定颜色。参数color的值为一个css颜色字符串，参数offset是0.0～1.0之间的一个浮点数，对于渐变的起点到终点的位置。offset为0相当于起点，offset为1相当于终点

1. 如果定义两个或多个色标，各个颜色之间将平滑地过度。在第一个色标之前，渐变将显示第一个色标的颜色，在最后一个色标之后，渐变将显示最后一个色标的颜色。
2. 如果只定义了一种色标，渐变将显示一种固定的颜色。如果没有设置颜色，渐变将全是清一色的透明黑色

## CanvasPattern
用于Canvas的基于图片的模式

CanvasPattern对象是不透明对象，由CanvasRenderingContext2D对象的```CreatePattern()```方法返回。CanvasPattern对象可用做CanvasRenderingContext2D对象的strokeStyle及fillStyle属性的值

## CanvasRenderingContext2D
用于在canvas上画图的对象，提供用于绘制而为图形的属性及方法
