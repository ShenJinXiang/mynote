# Object
包含所有JavaScript对象的特性的超类，Object类的所有方法和行为都被其它对象继承了

## 构造函数

> new Object()    
> new Object(value)

### 参数
* value - 这个可选的参数指定一个原始的JavaScript值（一个数字、布尔值或字符串），这些值将分别转换为一个Number、Boolean或String对象

### 返回
如果没有传入value参数，则这个构造函数将返回一个新创建的Object实例，如果传入一个原始的value值，则构造函数将创建并返回一个原始值的Number、Boolean或String对象封装，如果不带new操作符，将Object()构造函数像函数一样调用，则行为和使用new操作符一样

## 属性
* [constructor](#objectconstructor)    

## Object.constructor
对象的构造函数

### 概要
> object.constructor

### 描述
所有对象的constructor属性都指向用做当前对象的构造函数的那个函数。例如：如果使用Array()构造函数创建一个数组a。则a.constructor是一个Array
```javascript
a = new Array(1, 2, 3);
a.constructor == Array; // true
```

constructor属性经常用来检查为止对象的类型，可以使用typeof操作符来检查它是一个原始值还是一个对象，如果是一个对象，可以使用constructor属性来检查对象的类型
```javascript
function isArray(x) {
	return ((typeif x == 'object') && (x.constructor == Array));
}
```
只对核心JavaScript中的内置对象有效

## 方法
* [hasOwnProperty()](#hasownproperty)    
* [isPrototypeOf()](#isprototypeof)    
* [propertyIsEnumerable()](#propertyisenumerable)    
* [toLocaleString()](#tolocalestring)    
* [toString()](#tostring)    
* [valueOf()](#valueof)    

## 静态方法
* [Object.create()](#objectcreate)    
* [Object.defineProperties()](#objectdefineproperties)    
* [Object.defineProperty()](#objectdefineproperty)    
* [Object.freeze()](#objectfreeze)    
* [Object.getOwnPropertyDescriptor()](#objectgetownpropertydescriptor)    
* [Object.getPrototypeOf()](#objectgetprototypeof)    
* [Object.isExtensible()](#objectisextensible)    
* [Object.isFrozen()](#objectisfrozen)    
* [Object.isSealed()](#objectissealed)    
* [Object.keys()](#objectkeys)    
* [Object.perventExtensions()](#objectpreventextensions)    
* [Object.seal()](#objectseal)    

## Object.create()
使用指定的原先和属性来创建一个对象

### 概要
> Object.create(proto)    
> Object.create(proto, descriptors)    

### 参数

* proto - 性创建对象的原型，可为null
* descriptors - 一个可选对象，吧属性名映射到属性描述符

### 返回

一个新创建的对象，继承自proto，同时拥有descriptors所描述的属性

### 异常
* TypeError 如果proto不是对象也不是null，或指定descriptors但引发`Object.defineProperties()`跑出一个TypeError

### 描述
Object.create()创建并返回一个新的以proto为原型的对象，新对象将继承proto的属性

如果指定可选的descriptors参数，则`Object.create()`将把它指定的属性添加到新对象中，等同于调用`Object.defineProperties()`，使用两个参数调用`Object.create(p, d)`等同于：
```javascript
Object.defineProperties(Object.create(p), d);
```

### 示例
```javascript
var p = Object.create({z: 0}, {
	x: {value: 1, writable: false, enumerable: true, configurable: true},
	y: {value: 2, writable: false, enumerable: true, configurable: true},
});
```

## Object.defineProperties()
创建或配置对象的多个属性

### 概要
> Object.defineProperties(o, descriptors)    

### 参数
* o - 要在其上创建或配置属性的对象
* descriptors - 将属性名映射到属性描述符的对象

### 返回
对象o

### 异常
* TypeError - 如果o不是一个对象，或者不能创建或配置某个指定的属性，就抛出该异常。这个函数不是原子性的：可能在创建或配置几个属性后，同时还有别的属性未创建或配置时抛出异常

### 描述
Object.defineProperties()在对象o上创建或配置由descriptors指定及描述的属性。

object.defineProperties()的行为非常类似Object.defineProperty()

### 示例
```javascript
var p = Object.defineProperties({}, {
	x: {value: 0, writable: false, enumerable: true, configurable: true},
	y: {value: 1, writable: false, enumerable: true, configurable: true},
});
```

## Object.defineProperty()
创建或配置对象的一个属性

### 概要
> Object.defineProperty(o, name, desc)

### 参数
* o - 将在其上创建或配置属性的对象
* name - 将创建或配置的属性的名字
* desc - 一个属性描述符对象，描述要创建的新属性或对现有属性的修改

### 返回
对象o

### 异常
* TypeError - 如果o不是一个对象，或者指定属性不能创建（比如o不可扩展）或配置（比如该属性已经存在，并且不可配置）

### 描述
Object.defineProperty() 使用属性描述符desc来创建或配置对象o中名为name的属性。如果o还不存在名为name 的属性，则这个函数将简单地使用desc指定的属性和值来创建一个新的属性，对于desc中未指定的属性，对应属性值将设置为false或null

如果name为o中已经存在的属性名，则Object.defineProperty()将通过改变它的值或属性来配置这个属性，这种情况下，desc只需要包含要改变的属性，不包含的属性将不会改变

### 示例
```javascript
function constant(o, n, n) {
	Object.defineProperty(o, n, {value: v, writable: false, enumerable:true, configurable: false});
}
```

## Object.freeze()
将一个对象设置为不可改变

### 概要
> object.freeze(o)

### 参数
* o - 要冻结的对象

### 返回
现在处于冻结状态的参数对象o

### 描述
Object.freeze()将o设置为不可扩展，同时就像Object.seal()那也，将它所有自有属性设置为不可配置。除此以外，将所有非继承的数据属性设置为只读，意味者不能向o添加新属性，同时已有属性也不能设置或删除

Object.freeeze()不会影响继承属性

## Object.getOwnPropertyDescriptor()
查询一个属性的特性

### 概要
> Object.getOwnPropertyDescriptor(o, name)

### 参数
* o - 待查询其属性特性的对象
* name - 待查询的属性名（或数组元素的索引）

### 返回
指定对象指定属性的一个属性描述符对象，如果不存在指定属性则返回undefined

### 描述
Object.getOwnPropertyDescriptor()返回指定对象指定属性的一个属性描述符。属性描述符是一个对象，描述该属性的特性和值。

**属性描述符**
一个普通的JavaScript对象，描述某个属性的特性，可枚举性（enumerable）、可写性（writable）以及可配置型（configurable）

```javascript
// 数据属性的描述符类似这样：
{
	value: /* 任意JavaScript值 */
	writable: /* true 或 false */
	enumberable: /* true 或 false */
	configurable: /* true 或 false */
}

// 访问器的描述符类似这样：
{
	get: /* function 或 undefined替换属性值 */
	set: /* function 或undefined 体啊还可写性 */
	enumerable: /* true或false */
	configurable: /* true或false */
}
```
