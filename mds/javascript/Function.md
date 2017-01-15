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

## Function.arguments[]

## 方法
* [Function.apply()](#functionapply)    

## Function.apply()
将函数作为一个对象的方法调用

**概要**

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
