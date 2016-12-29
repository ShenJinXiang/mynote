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
对一条路径填充或描边时，可以通过```strokeStyle```及```fillStyle```属性来定义线条或填充区域的渲染方式。这两种属性以及定义渐变团的CanvasGradient及CanvasPattern对象都支持CSS格式的颜色字符串。创建渐变可以用```createLinearGradient()``` 或```createRadialGradient()```方法，创建图案可以使用```createPattern()```

要用CSS符号定义一种不透明的颜色，可以使用"#RRGGBB"格式的字符串，其中RR、GG和BB是十六进制数字，定义颜色的红、绿、蓝分量，取值在00~FF之间。要定义部分透明的颜色，可使用"rgba(R,G,B,A)"格式的字符串，R、G以及B定义颜色的红、绿、蓝分量，采用十进制，值在0~255之间，A为一个浮点数，定义alpha(透明度)分量，值在0.0(完全透明) ~ 1 (完全不透明)之间。

### 线宽、线帽以及线的连接
画布有几个属性用于定义线条如何绘制。可以使用```lineWidth```属性定义线条的宽度，用```lineCap```属性定义线条断点的样式，以及使用```lineJoin```属性来定义多条线条之间如果连接

### 画矩形
可以使用```strokeRect()```或```fillRect()```来给一个矩形描边或填充，另外，也可以使用```clearRect()```来清空一个矩形区域

### 画图像
在画布API中，可以使用HTML &lt;img&gt;元素或```Image()```构造函数来定义图像，&lt;canvas&gt;元素或&lt;video&gt;元素也可以使用图像资源

可以使用```drawImage()```方法来将一幅图像绘制到画布中，在大多数清空下，这个方法运行从源图像中任意选取一个矩形区域，经过缩放后绘制到画布中

### 画文字
CanvasRenderingContext2D的```fillText()``` 方法绘制一段文字，```strokeText()```方法绘制一段描边的文字。```font```属性定义使用的字体，值应该是一个CSS字体说明字符串。```textAlign``` 属性定义文字在传入的水平方向上是左对齐、居中还是右对齐，```textBaseline```属性定义文字在传入的垂直方向上的位置

### 坐标空间与转换
默认情况下，画布的坐标空间的原点(0, 0)位于画布的左上角，x的值向右递增，y的值向下递增。画布的```width```及```height```属性定义X与Y的最大坐标值，坐标空间的基本单位一般对应屏幕上的一个像素

可以自定义坐标空间，之后，为画布的绘图方法传入的坐标会自动转换，自定义坐标空间的方法有```translate()```、```scale()```以及```rotate()```，它们将影响画面的转换矩阵

### 阴影
CanvasRenderingContext2D可以给画的任何东西自动添加阴影。阴影的颜色有shadowColor定义，偏移量由```shadowOffsetX```和```shadowOffsetY```定义。另外，阴影边缘的羽化成都可以由shadowBlur来设置。

### 保存绘图状态
可以通过```save()```和```restore()```方法来保存或还原一个CanvasRenderingContext2D对象的状态。```save()```将当前状态压入栈中，```restore()```从栈的顶部弹出最近保存的状态，并将根据它的值设置当前绘图状态

CanvasRenderingContext2D对象的所有属性(canvas属性除外，canvas属性是个常量)都可在绘图状态中保存。转换矩阵和裁剪区域也是状态的一部分，但当前路径和当前点不是。

### 像素操作
CanvasRenderingContext2D的```getImageData()```方法允许查询画布的原始像素，```putImageData()```允许设置单个像素的值

### 属性

**canvas**

> readonly Canvas canvas

用于绘图的Canvas元素


**fillStyle**

> any fillStyle

当前用于填充路径的颜色、图案或渐变。这个属性的值可以是CSS颜色字符串，也可以是一个CanvasGradient或CanvasPattern对象，默认的填充样式是纯黑色


**font**

> string font
绘制文本时使用的字体，值为一段字符串，格式与CSS font属性格式相同。默认值为：'10px sans-serif'


**globalAlpha**

> double globalAlpha

在画布上的所有内容定义一个额外的透明度。画布上的所有像素的alpha值将乘以这个值，这个值只能为0.0(所有内容完全透明) ~ 1.0 (默认值，没有额外透明度)之间的一个数字


**globalCompositeOperation**

> string globalCompositeOperation

这个属性指定绘制到画布上的源像素与画布上已经存在的目标像素之间如何结合。一般只有在处理部分透明的颜色或设置globalAlpha属性后这个属性才有用，默认值为"source-over"，其它常用值为"destination-over"和"copy"


**lineCap**

> string lineCap

lineCap属性定义线条末端的样式，只有在画粗线条时这个属性才有用

|值|含义|
|:--|:--|
|'butt'|默认值，线条没有线帽，线条的终点上平直的，与线条方向垂直，线条不会超过终点|
|'round'|线条由一个半圆形的线帽，半圆的直径等于线条的宽度，半圆在线条的终点处向外扩展、距离为线条宽度的一半|
|'square'|这个值定义线条由一个矩形的纤毛，和'butt'类似，但线条的终点处会扩展出其宽度一半的距离|


**lineJoin**

> string lineJoin

如果路径中由线段、曲线的定焦相交，这些焦点的绘制方式由lineJoin属性定义，这个属性仅当绘制的是宽线条时才有效。

属性默认值为"miter"，表示两根线条的外部边缘将伸直到它们相交，如果两条线条以一个锐角斜接，它们的交合部分可能会很长，```miterLimit```属性定义这个交合部分的长度上线，如果交合部分长于这个限制，它将转化为一个斜面

属性值"round"定义交合部分顶点的外边缘为一段实心圆弧，直径与线条的宽度相等。属性值"bevel"定义交合部分顶点的外边缘为一个实心的三角形


**lineWidth**

> double lineWidth

定义描边操作时的线条宽度，默认值为1，线条的中心在路径上，路径两边各占一半的宽度


**miterLimit**

> double miterLimit

如果```lineJoin```属性的值为"miter"，并且两条线以一个锐角斜交，那么它们的交合部分可能会很长，如果这个斜交的部分太长，看起来就很不协调，```miterLimit```属性设置斜交部分长度的上线。这个值定义斜交部分长度与线宽的一半之间的比例，默认为10，即斜交部分的长度不会超过线条宽度的5倍，如果超过了允许的最大值，这两条线条将以斜面而不是斜接的方式连接


**shadowBlur**

> double shadowBlur

定义阴影的模糊程度，默认值为0，将生成边缘清晰的阴影。取值越大模糊成都也越大，不过需要注意，这个值的单位不是像素，也不受当前变换的影响


**shadowColor**

> string shadowColor

定义阴影的颜色，格式同CSS颜色格式，默认情况是透明黑色


**shadowOffsetX 和 shadowOffsetY**

> double shadowOffsetX
> double shadowOffsetY

定义阴影的横向和纵向偏移量，取值越大，产生阴影的对象看起来就像在背景上飘得越高，默认值为0


**strokeStyle**

> any strokeStyle

定义描边路径的颜色、图案或渐变，这个属性的值可以是一个CSS颜色字符串，也可以是一个CanvasGradien 或CanvasPattern对象


**textAlign**

> string textAlign

定义文本水平对齐方式，其对应的x坐标值会传递给```fillText()```及```strokeText()```，允许的值由：'left'、'center'、'right'、'start'以及'end'，'start'和'end'的含义取决于当前&lt;canvas&gt;标签的dir(文字方向)属性，默认值为"start"


**textBaseline**

> string textBaseline

定义文本的垂直对齐方式，对应的y坐标值传递给```fillText()```及```strokeText()```，允许的值：'top'、'middle'、'bottom'、'alphabetic'、'hanging'以及'ideographic'，默认值为'alphabetic'

### 方法
**arc()**

> void arc(double x, y, radius, startAngle, endAngle, [boolean anticlockwise])

这个方法根据指定的圆心及半径在画布的当前子路径上绘制一段圆弧，该方法的前三个参数指定一个圆的圆心及半径，接下来两个参数定在这个圆上的一段圆弧的起点及终点的角度，角度的单位为弧度制，沿着x轴正向3点方向就是0度，沿顺时针方向角度增加，最后一个参数定义角度是沿圆周的逆时针方向(true)还是顺时针方向(false 默认值)

调用这个方法会在当前路径中的当前点和圆弧起点之间添加一条直线，然后再添加圆弧本身


**arcTo()**

> void arcTo(double x1, y1, x2, y2, radius)

在当前子路径中添加一条直线和一个圆弧，并以某种方式描述圆弧，从而使它在为多边形添加圆角时特别有用，参数x1、y1定义点p1，参数x2、y2定义点p2添加到路径中的圆弧是一个半径为radius的圆的一部分，圆弧上有一点与当前点到p1之间的连线相切，一点与p1、p2之间的连线相切，这两个相切点也是圆弧的起点及终点，绘制的圆弧为连接这两个点的最短圆弧。


**beginPath()**

> void beginPath()

beginPath()丢弃当前定义的路径，并开始一条新的路径，调用beginPath()之后没有当前点。

首次创建画布上下文时，beginPath()会隐含地调用


**bezierCurveTo()**

> void bezierCurveTo(double cpx1, cpy1, cpx2, cpy2, x, y)

bezierCurveTo()添加一条三次贝塞尔曲线到画布的当前子路径中。曲线的起点是画布的当前点，重点是(x, y)，两个贝塞尔控制点(cpX1, cpY1)及(cpX2, cpY2)定义曲线的形状，当这个方法返回时，当前点是(x, y)


**clearRect()**

> void clearRect(double x, y, width, height)

clearRect() 使用透明黑色填充指定的矩形区域。不像```rect()```，它不会影响当前点或当前路径


**clip()**

> void clip()

这个方法计算当前路径和当前裁剪区域中的相交部分，并将这个较小的区域作为新的裁剪区域返回

类似于```fill()```方法，```clip()```将所有子路径视为关闭，并使用非零环绕规则来判定路径的内部与外部


**closePath()**

> void closePath()

如果当前画布的子路径未关闭，```closePath()```会通过当前点与这条子路径的第一个点之间添加一条连接来闭合它，并在同一点开始一条新的子路径


**createImageData()**

> ImageData createImageData(ImageData imagedata)

返回一个和传入的imagedata尺寸相同的新的ImageData对象


**createImageData()**

> ImageData createImageData(double w, double h)

返回一个指定宽度和高度的新的ImageData对象，这个新的ImageData对象中的所有像素都初始化为透明黑色

参数w和h定义图片的尺寸，单位为CSS像素


**createLinearGradient()**

> CanvasGradient createLinearGradient(double x0, y0, x1, y1)

生成并返回一个新的CanvasGradient对象，其中颜色从起点(x0, y0)到终点(x1, y1)之间线性渐变。这个方法并没有指定渐变的颜色，要指定颜色，使用它返回对象的```addColorStop()```方法，如果要绘制渐变描边或填充区域，秩序将一个CanvasGradient对象赋值给```strokeStyle```或```fillStyle```属性


**createPattern()**

> CanvasPattern createPattern(Element image, string repetition)

生成并返回一个CanvasPattern对象，这个对象表示一幅平铺图像定义的图案。参数```image```必须是一个&lt;img&gt;、&lt;canvas&gt;或&lt;video&gt;元素，包含图案中要使用的图像。 参数```repetition```定义图片如何平铺

repetition的值：

|值|含义|
|:--|:--|
|'repeat'|默认值，在x轴方向和y轴方向都平铺图像|
|'repeat-x'|只在x轴方向平铺图像|
|'repeat-y'|只在y轴方向平铺图像|
|'no-repeat'|不平铺图像，图像只绘制一次|

如果要使用图案来描边或填充一个区域，可将CanvasPattern对象作为```strokeStyle```或```fillStyle```属性的值


**createRadiaGradient()**

> CanvasGradient createRadialGradient(double x0, y0, r0, x1, y1, r1)

创建并返回一个新的CanvasGradient对象，其中颜色在两个指定的圆的圆周之间辐射渐变。这个方法并没有指定渐变的颜色，如要要指定颜色，使用它返回对象的```addColorStop()```方法。如果要绘制渐变描边或填充区域，只须将一个CanvasGradient对象赋值给```strokeStyle```或```fillStyle```属性

辐射渐变的渲染方式如下：在第一个圆的圆周出的颜色偏移量为0， 在第二个圆周处颜色偏移量为1，两个圆之间为渐变的中间色


**drawImage()**

> void drawImage(Element image, double dx, dy, [dw, dh])

复制指定image(必须是一个&lt;img&gt;、&lt;canvas&gt;、&lt;video&gt;元素)到画布中，图像的左上角位置为(dx, dy)，如果指定dw和dh，图像的宽度和高度会缩放到dw像素宽和dh像素高

> void drawImage(Element image, double sx, sy, sw, sh, dx, dy, dw, dh)

复制指定的images的一个源矩形区域的内容到画布的目标矩形区域，(sx, sy)定义图像的源矩形区域的左上角，sw和sh定义源矩形区域的宽度和高度


**fill()**

> void fill()

fill()方法使用```fillStyle```属性定义的颜色、渐变或图案对当前路径进行填充，没有闭合的子路径在填充时将表现得如同调用```closePath()```方法一样

填充一条路径并不会清除掉这条路径，在调用```fill()```之后，仍然可以调用```stroke()```而不需重定义这条路径

如果路径与自身相交或者与子路径重叠，填充画布将使用非零环绕规则来判定一个点是在路径的内部还是外部


**fillRect()**

> void fillRect(double x, y, width, height)

```fillRect()``` 使用```fillStyle```属性定义的颜色、渐变或图案对指定的矩形进行填充，和```rect()```不同，```fillRect()```对当前点和当前路径没有影响


**fillText()**

> void fillTest(string text, double x, y, [double maxWidth])

fillText()使用当前字体及```fillStyle```属性绘制text，参数x和y定义文本应该画在画布的什么位置，但这两个参数的实际值分别收到```textAlign```和```textBaseline```属性的影响

可选参数```maxwidth```定义文本的最大宽度，如果text的宽度有可能超过maxwidth，文本就将使用更小或压缩版的字体来绘制


**getImageData()**

> ImageData getImageData(double sx, sy, sw, sh)

这个方法的参数为未转换的坐标，定义画布中的一个矩形区域，将这个区域的像素数据复制到一个新的ImageData对象中并返回该对象

这个方法会进行安全检验，避免跨域信息泄漏，只有当画布是同源时，该方法才会返回一个ImageData对象，否则抛出错误


**isPointInPath()**

> boolean isPointInPath(double x, y)

如果指定的点在当前路径的边缘之内或智商，```isPointInPath()```返回true，否则返回false。指定的点没有根据当前转换矩阵转换，x值应该在0 ～ canvas.width之间，y值应该在0 ～ canvas.height之间

isPointInPath()测试的是未转换的点，因此它的设计目的是做"命中测试"，比如判断用户的鼠标单击是否在画布上当亲啊路径描述的某个部分智商。

```javascript
function hittest(event) {
	var canvas = this;
	var c = canvas.getContext('2d');
	var bb = canvas.getBoundingClientRect();

	var x = (event.clientX - bb.left) * (canvas.width / bb.width);
	var y = (event.clientY - bb.top) * (canvas.height / bb.height);

	if (c.isPointInPath(x, y)) c.fill();
}
```


**lineTo()**

> void lineTo(double x, double y)

该方法在当前子路径中添加一条直线，直线重当前点开始，到(x, y) 结束，这个方法返回后当前点是(x, y)


**measureText()**

> TextMetrics measureText(string text)

测量在当前字体下指定text将占据多大的宽度，返回一个包含测量结果的TextMetrics对象


**moveTo()**

> void moveTo(double x, double y)

将当前点设置为(x, y)，并以这个点作为第一个点，开始一条新的子路径。如果之前有一条自路径，并且这条子路径只包含一个点，那么这条空子路径将会从路径中移除
