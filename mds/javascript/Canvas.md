# Canvas

## Canvas
用于脚本绘图的HTML元素

Canvas对象表现为HTML的canvas元素。该元素并不能做什么，但定义了一个支持在客户端使用脚本绘图的API，可以为这个对象定义width和height，也可以用```toDataURL()```方法从画布中导出图片，实际绘图的API是由```getContext()```方法返回的一个独立“上下文”对象事件的

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

```toDataURL()```以data://URL 的方式返回canvas位图的内容，这种方式可以很容易的在&lt;img&gt;标签中使用或者通过网络传输

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

``addColorStop()``定义一种渐变中的固定颜色。参数color的值为一个css颜色字符串，参数offset是0.0～1.0之间的一个浮点数，对于渐变的起点到终点的位置。offset为0相当于起点，offset为1相当于终点

1. 如果定义两个或多个色标，各个颜色之间将平滑地过度。在第一个色标之前，渐变将显示第一个色标的颜色，在最后一个色标之后，渐变将显示最后一个色标的颜色。
2. 如果只定义了一种色标，渐变将显示一种固定的颜色。如果没有设置颜色，渐变将全是清一色的透明黑色

## CanvasPattern
用于Canvas的基于图片的模式

CanvasPattern对象是不透明对象，由CanvasRenderingContext2D对象的```CreatePattern()```方法返回。CanvasPattern对象可用做CanvasRenderingContext2D对象的strokeStyle及fillStyle属性的值

## CanvasRenderingContext2D
用于在canvas上画图的对象，提供用于绘制而为图形的属性及方法

### 创建并渲染路径
画布的一个强大特性是可以通过基本的绘制操作来生成各种形状，然后可以给它们描边(stroke)或填充(fill)。多个操作的结果统称为当前路径。一张画布只能维护一条当前路径

为了将多个片段连城一个形状，绘图操作之间需要一个连接点。为了实现这点，画布维护了一个当前位置，画布的绘制操作是显式把这个位置做为起点，并不断更新，知道达到终点。

可以使用当前路径创建一系列断开的形状，这些形状会一起使用相同的绘图参数进行渲染，可以使用```moveTo()```方法来分开形状，这个方法会在不添加连结线的晴空下将当前点移动到一个新的位置，这个操作会生成一条新的自路径(subpath)。

可以用的方法有：```lineTo()```绘制直线，```rect()```绘制矩形，```arc()```及```arcTo()```绘制扇形，```bezierCurveTo()```及```quadraticCurveTo()```绘制曲线。

路径完成以后，可以使用```stroke()``` 对它描边，使用```fill()```进行填充，也可以同时描边及填充

除了描边和填充，还可以使用当前路径来定义个当前画布渲染时使用的裁剪区域，在这个区域的像素会显示，之外的则不显示，裁剪区域是可以累加的

如果所有自路径中的片段都没有形成一个闭合形状，```fill()```及```clip()```操作会在自路径的起点和终点之间添加一条虚拟的线来隐式的闭合形状，也可以调用```closePath()```来显式地添加这条线

可以使用```isPointInPath()```来测试一个点是否包含在当前路径中，如果一条路径与自身相交，或者由多条重叠的自路径组成，那么‘包含’的定义取决于‘非零缠绕规则’(nonzero winding rule)。如果在一个圆里面画了另外一个圆，并且两个圆绘制的方向相同，那么在大圆里的所有点都被认为是包含在这条路径中。否则如果一个圆按顺时针方向画，另一个按逆时针方向画，定义的就是一个圆环的形状，小圆内部的点则在路径之外，```fill()```和```clip()```对包含的定义也是这样的

### 颜色、渐变以及团
对一条路径填充或描边时，可以通过```strokeStyle```及```fillStyle```属性来定义线条或填充区域的渲染方式
