# Function

## 概要

```javascript
function functionname(argument_name_list) {  // 函数定义语句
	body
}

function (argument_name_list) {body}  // 匿名函数直接量

functionname(argument_value_list)     // 函数调用
```

## 构造函数

> new Function(argument_names..., body)    

**参数**

* argument_names... - 任意多个字符串参数，每个字符串命名要创建的Function对象的一个或多个参数
* body - 指定函数体的字符串，可以包含任意多条JavaScript语句，这些语句之间用分毫隔开，可以引用任意参数名，这些参数名由前面提到的传给构造函数的参数指定

**返回**

新创建的Function对象，调用该函数会执行由body指定的JavaScript代码

**异常**

* SyntaxError - 表示body参数或者某个argument_names参数中存在的JavaScript语法错误

## 属性
* [Function.arguments\[\]](#functionarguments)
* [Function.length](#functionlength)    
* [Function.prototype](#functionprototype)    

## Function.arguments[]
传递给函数的参数

### 概要

> function.arguments[i]    
> function.arguments.length    

### 描述
Function对象的arguments属性是一个参数数组，它的元素是传递给函数的参数，只有函数执行时才定义，arguments.length是表示数组中的元素个数，不推荐使用该属性，赞成使用Arguments对象

## Function.length
声明的参数的个数

### 概要
> function.length

### 描述
函数的length属性指定定义函数时所声明的形参的个数，实际调用函数时，传入的参数的个数可以比函数的length属性多，也可以少

## Function.prototype
对象类的原型

### 概要
> function.prototype

### 描述
prototype属性会在函数作为构造函数时使用。它指代作为整个对象类的原型对象。用构造函数创建的任何对象都会继承prototype对象引用的对象的所有属性

## 方法
* [Function.apply()](#functionapply)    
* [Function.bind()](#functionbind)    
* [Function.call()](#functioncall)    
* [Function.toString()](#functiontostring)    

## Function.apply()
将函数作为一个对象的方法调用

### 概要

> function.apply(thisobj, args)

**参数**

* thisobj - 调用function的对象，在函数体重，thisobj是关键字this的值，如果参数为null，则使用全局对象
* args - 一个值数组，它的元素是传递给function的参数值

**返回**

调用函数function的返回值

**异常**

* TypeError - 如果调用该函数的对象不是函数，或者参数args不是数组和Arguments对象，则抛出该异常

### 描述

apply()将指定的函数function作为对象thisobj的方法来调用，并传入在args数组中包含的参数，返回的是调用function的返回值，函数体内，this指代thisobj对象

args参数必须是数组或Arguments对象，如果想单独指定传递给函数的参数，而不是通过数组元素来指定参数，可以使用Function.call()方法

### 示例

````javascript
// 将默认的Object.toString()应用在一个对象上
// 以便覆盖该对象上的toString()方法
Object.prototype.toString.apply(o);

var data = [1, 2, 3, 4, 5, 6, 7, 8];
Max.max.apply(null, data);
```

## Function.bind()
返回一个作为方法调用的函数

### 概要

> function.bind(o)    
> function.bind(o, args...)    

**参数**

* o - 要绑定到函数上的对象
* args... - 要绑定到函数上的零个或多个参数值

**返回**

一个新函数，该函数会当作o的方法来调用，并向它传入args参数

### 描述
bind()方法返回一个新函数，这个函数会当作对象o的方法来调用，传递给该函数的参数由两部分组成，一部分是传递给bind()的args数组指定的参数，剩下的是传递给这个新函数的所有值

#### 示例
假设f是个函数
```javascript
var g = f.bind(o, 1, 2);
g(3)
// 等价于
f.call(o, 1, 2, 3)
```

## Function.call()
将函数作为对象的方法调用

### 概要
> function.call(thisobj, args...)    

**参数**

* thisobj - 调用function的对象。在函数体中，thisobj是关键字this的值。这个参数为null，则使用全局对象
* args... - 任意多个参数，它们会作为参数传递给function

**返回**

调用函数function的返回值

**异常**

* TypeError - 如果调用该函数的对象不是函数，则抛出该异常

### 描述
call()将指定的函数function作为对象thisobj的方法来调用，并传入参数列表中thisobj之后的参数。返回的是调用function的返回值。在函数体内，关键字this指代thisobj对象，如果thisobj为null，则使用全局对象

如果向用数组来指定传递函数的参数，使用Function.apply()方法

### 示例

```javascript
// 将默认的Object.toString()应用在一个对象上
// 以便覆盖该对象上的toString()方法
Object.prototype.toString().call(o);
```

## Function.toString()
将函数转换成字符串

### 概要
> function.toString()

**返回**

表示函数的字符串

**异常**

* TypeError - 如果调用该函数的对象不是函数，则抛出该异常

### 描述
Function对象的toString()方法能将函数转换为字符串，但其功能与具体实现相关。
