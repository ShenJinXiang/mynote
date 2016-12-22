# Canvas

## Canvas
用于脚本绘图的HTML元素

Canvas对象表现为HTML的canvas元素。该元素并不能做什么，但定义了一个支持在客户端使用脚本绘图的API，可以为这个对象定义width和height，也可以用toDataURL()方法从画布中导出图片，实际绘图的API是由getContext()方法返回的一个独立“上下文”对象事件的

**属性**
>unsigned long height
>unsigned long width

对应&lt;canvas&gt;标签的width及height属性，指定canvas坐标控件的纬度，width和height的默认值分别为300 和150

如果canvas元素的尺寸在样式表和内敛style属性中都没有另外的定义，则width及height属性也将指定canvas元素在屏幕上的尺寸

设置width和height中任意一个，豆浆清空画布

**方法**

