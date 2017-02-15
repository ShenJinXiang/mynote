# Canvas填充样式
这一节主要说两个属性，`fillStyle`和`strokeStyle`，在此之前，设置这两个属性的值，都是一个表示颜色的字符串，但是这两属性的值不仅仅可以是个颜色，如果只可以设置颜色的话，属性名称就应该叫`fillColor`和`strokeColor`

实际上这两个属性的值可以是任意的css中接受的表示颜色的字符串以外，还可以是表示渐变颜色的CanvasGradient对象以及基于图片的CanvasPattern对象

## 线性渐变
关于线性渐变需要引入两个方法：

> CanvasRenderingContext2D.createLinearGradient(x0, y0, x1, y1)    
> CanvasGradient.addColorStop(stop, color)    

CanvasRenderingContext2D的`createLinearGradient()`生成并返回一个新的CanvasGradient对象，表示颜色重起点`(x0, y0)`到终点`(x1, y1)`之间的线性渐变，这个方法并没有指定渐变的颜色

要指定颜色，需要使用返回对象的`addColorStop()`方法，`addColorStop()`方法用于定义一个渐变中的固定颜色，参数`color`的值为任意css可以接收的表示颜色的字符串。参数`stop`是0.0 ~ 1.0之间的一个浮点数，对于渐变的起点到终点的位置，值为0表示起点，值为1表示终点

当设置好颜色以后将这个CanvasGradient对象赋值给`fillStyle`或`strokeStyle`属性，当调用对应的`fill()`和`stroke()`方法时，即实现渐变效果
