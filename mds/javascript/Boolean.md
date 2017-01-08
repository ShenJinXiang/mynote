# Boolean
对布尔值的支持

## 构造函数

> new Boolean(value)  // 构造函数    
> Boolean(value)      // 转化函数    

**参数**

* value - Boolean对象存放的值，或要转化成布尔值的值

**返回**

作为构造函数调用（带有new操作符）时，Boolean()会将参数转换成布尔值，并返回一个包含该值的Boolean对象，当做函数调用（不带new操作符）时，Boolean()只会将参数转换成一个原始的布尔值，并返回该值

0、NaN、null、空字符串""和undefined值都会转换成false，其它原始值除了false(但包含“false”的字符串)，以及其它对象和数组都会转换成true

## 方法
* [Boolean.toString()](#booleantostring)    
* [Boolean.valueOf()](#booleanvalueof)

## Boolean.toString()
将布尔值转换成字符串

**概要**

> b.toString()

**返回值**

根据原始布尔值或Boolean对象b的值返回“true”或“false”字符串

**异常**

* TypeError - 调用该方法时，如果对象不是Boolean类型，则抛出异常

## Boolean.valueOf()
Boolean对象的布尔值

**概要**

> b.valueOf()

**返回值**

Boolean对象b存放的原始布尔值

**异常**

* TypeError - 调用该方法时，如果对象不是Boolean类型，则抛出异常
