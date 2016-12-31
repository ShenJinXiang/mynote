# 函数参数数组

## arguments

**描述**

arguments[]数组只定义在函数体中，在函数体中，arguments指代该函数的Arguments对象，该对象拥有数值属性，可以当作数组来用，还有传入到该函数的所有参数。arguments标识符本质上是一个局部变量，在每个函数中会自动声明并初始化这个变量。**arguments仅在函数体中时才指代Arguments对象，在全局代码中为undefined**

## Arguments

**元素**

Arguments对象只定义在函数体中，Arguments对象不是数组，但是拥有数值属性和length属性，数值属性可当作是数组元素，length属性则表示数组元素的个数。这些数组元素是传递给该方法的参数值，元素0是第一个参数，元素1是第二个参数，以此类推。所有作为参数传入的值都会成为Arguments对象的数组元素，即便在函数声明中没有指定参数名

**属性**

* callee - 指代当前正在执行的函数
* length - 传递给函数的参数个数，以及Arguments对象中数组元素的个数

**描述**

调用函数时，会为其创建一个Arguments对象，并自动初始化局部变量arguments，指代该Arguments对象，Arguments对象的主要用途是：1.用来判断有多少个参数传入函数; 2.用来指代未命名的参数; 3.通过calleee属性指代匿名函数自身

大多数情况下，可以将Arguments对象相信成一个数组，并额外带有callee属性，但是，Arguments对象并不是Array的实例，Arguments.length属性也不具有Array.length属性的任何特殊行为，而且不能用来改变数组的大小

### Arguments.callee

**描述**

argument.callee指代当前正在执行的函数，通过它可以引用匿名函数自身，只定义在函数体中

**示例**

```javascript
// 在匿名函数内使用callee属性来引用匿名函数自身
// 实现递归
var factorial = function (x) {
	if (x < 2) return 1;
	else return x * arguments.callee(x - 1);
};

var y = factorial(5); // 返回 120
```

### Arguments.length

**描述**

Arguments对象的length属性表示当前函数的参数个数，该属性只定义在函数体中

是实际传入的参数个数，而不是声明的参数个数

**示例**

```javascript
// 使用Arguments对象来检测传入参数个数的正确性
function check(args) {
	var actual = args.length;
	var expected = args.callee.length;
	if (actual != expected) {
		throw new Erroe('参数个数有误：期望值: ' + expected + '; 实际值: ' + actual);
	}
}

function f(x, y, z) {
	check(arguments);
	return x + y + z;
}
```

