# Canvas图形变换
canvas中的图形变换，主要涉及到的方法有`translate()`、`rotate()`和`scale()`以及保存和恢复绘图状态的`save()`和`restroe()`方法。本文所有的代码采用的html模板均为：
```html
<!doctype html>
<html>
<head>
	<meta charset='utf-8'>
	<style>
		canvas{display:block; border: 1px solid #ccc;margin: 0px auto;}
	</style>
	<title>canvas</title>
</head>
<body>
	<canvas id='mycanvas'></canvas>
<script src='外部js路径'></script>
</body>
</html>
```

## translate()方法
