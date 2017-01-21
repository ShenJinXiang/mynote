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
* [Object.hasOwnProperty()](#objecthasownproperty)    
* [Object.isPrototypeOf()](#objectisprototypeof)    
* [propertyIsEnumerable()](#objectpropertyisenumerable)    
* [toLocaleString()](#objecttolocalestring)    
* [toString()](#objecttostring)    

## Object.hasOwnProperty()
检查一个属性是否是继承的

### 概要
> object.hasOwnProperty(propname)    

### 参数
* propname - 包含对象的属性名的字符串

### 返回
如果对象由一个指定名字的非继承的属性则返回true，如果该对象没有指定名称的属性或者个属性是从它的原型对象继承而来的，则返回false

### 描述
JavaScript对象可以由自己的属性，也可以从它们的原型对象那儿继承属性。hasOwnProperty()方法提供一个识别继承属性和非继承的本地属性的方法

### 示例
```javascript
var o = new Object();
o.x = 3.14;
o.hasOwnProperty("x");			// 返回true
o.hasOwnProperty("y");			// 返回false
o.hasOwnProperty("toString");   // 返回false
```

## Object.isPrototypeOf()
判断当前对象是否为另一个对象的原型

### 概要
> object.isPrototypeOf(o)    

### 参数
* o - 任意对象

### 返回
如果object是o的原型则返回true，如果o不是一个对象，或者object不是o的原型则返回false

### 示例
```javascript
var o = new Object();
Object.prototype.isPrototypeOf(o);	// true
Function.prototype.isPrototypeOf(o.toString);  // true  toString是一个函数
Array.prototype.isPrototypeOf([1, 2, 3]);   // true  [1, 2, 3] 是一个数组

o.constructor == Object  // true  
o.toString.constructor = Function // ture
Object.prototype.isPrototypeOf(Function.prototype)
```

## Object.propertyIsEnumerable()
检测某个属性是否在for／in循环中可见

### 概要
> object.propertyIsEnumerable(propname)     

### 参数
* propname - 包含对象的指定属性名的一个字符串

### 返回
如果对象由一个名为propname的非继承属性，并且该属性可枚举，则返回true，意味着这个属性可以通过该对象的for／in循环枚举

### 描述
for/in语句遍历给定对象的可枚举性，对象的属性不全是可枚举的：由JavaScript代码添加到对象中的属性是可枚举的，内置对象的预定义的属性（如方法）通常不可枚举，propertyIsEnumerable()方法提供了一个曲风可枚举与不可枚举属性的方法

### 示例
```javascript
var o = new Object();
o.x = 3.14;
o.propertyIsEnumerable("x");  // true
o.propertyIsEnumerable("y");  // false
o.propertyIsEnumerable("toString");  // false
Object.prototype.propertyIsEnumerable("toString"); // false 
```

## Object.toLocaleString()
返回对象的本地化的字符串表示

### 概要
> object.toLocaleString()

### 返回
一个表示该对象的字符串

### 描述
用于返回一个表示当前对象的字符串，使用合适的本地化格式。Object类提供的默认的otLocaleString()方法值是简单地调用toString()方法，并返回字符串

## Object.toString()
定义一个对象的字符串表示形式

### 概要
> object.toString()

### 返回
一个表示该对象的字符串

### 描述
在JavaScript程序中一般不会经常显式的调用toString()方法，一般情况下，在对象中定义这个方法，系统会在需要时自动调用它以便将对象转换为字符串



## 静态方法
* [Object.create()](#objectcreate)    
* [Object.defineProperties()](#objectdefineproperties)    
* [Object.defineProperty()](#objectdefineproperty)    
* [Object.freeze()](#objectfreeze)    
* [Object.getOwnPropertyDescriptor()](#objectgetownpropertydescriptor)    
* [Object.getOwnPropertyNames()](#objectgetownpropertynames)    
* [Object.getPrototypeOf()](#objectgetprototypeof)    
* [Object.isExtensible()](#objectisextensible)    
* [Object.isFrozen()](#objectisfrozen)    
* [Object.isSealed()](#objectissealed)    
* [Object.keys()](#objectkeys)    
* [Object.preventExtensions()](#objectpreventextensions)    
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

## Object.getOwnPropertyNames()
返回非继承属性的名字

### 概要
> Object.getOwnPropertyNames(o)    

### 参数
* o - 一个对象

### 返回
一个包含o的所有非继承属性的名字的数组，包含那些不可枚举的属性

### 描述
Object.getOwnPropertyNames()返回一个包含o的所有非继承属性的名字的数组，包含那些不可枚举的属性。

这个方法不可在对象上调用，上一个全局函数，必须传入一个对象

### 示例
```javascript
Object.getOwnPropertyNames([]); // ['length']
```

## Object.getPrototypeOf()
返回一个对象的原型

### 概要
> Object.getPrototypeOf(o)    

### 参数
* o - 一个对象

### 返回
o的原型对象

### 描述
Object.getPrototypeOf()返回它的参数的原型，全局函数，必须传入一个对象

### 示例
```javascript
var p = {};
Object.getPrototypeOf(p);  // Object.prototype
var o = Object.create(p);
Object.getPrototypeOf(p); // p
```

## Object.isExtensible()
判断某个对象上是否可以添加新属性

### 概要
> Object.isExtensible(o)    

### 参数
* o - 待检查可扩展性的对象

### 返回
如果可以向该对象添加新属性则返回true，否则返回false

### 描述
如果可以向一个对象添加新的属性，则称它为可扩展的。所有对象在创建后都是可扩展的，直到作为参数传入Object.preventExtensions()、Object.seal()、Object.freeze()

### 示例
```javascript
var o = {};
Object.isExtensible(o);	// true
Object.preventExtensions(o); // 设置为不可扩展的
Object.isExtensible(o);  // false
```

## Object.isFrozen()
判断对象是否不可改变

### 概要
> Object.isFrozen(o)    

### 参数
* o - 待检测的对象

### 返回
如果o已冻结并不改变则为true；否则为false

### 描述
如果一个对象的所有非继承属性都为只读，或者它是封闭的（sealed）,则处于冻结状态。如果可以向一个对象添加新的属性，并且不可删除现有的属性，则称为封闭的。Object.isFrozen()检测它的参数是否为冻结状态。对象一旦冻结就不能再解冻

## Object.isSealed()
判断一个对象的属性是否可以添加或删除

### 概要
> Object.isSealed(o)    

### 参数
* o - 待检测的对象

### 返回
如果o是封闭的则为true，否则为false

### 描述
如果不可以向一个对象添加新的（非继承的）属性，并且现有的（非继承的）属性不能阐述，则成为封闭的。Object.isSealed()检测它的参数是否为封闭对象，对象一旦封闭将没有办法解封

## Object.keys()
返回自有的可枚举属性名
### 概要
> Object.keys(o)    

### 参数
* o - 一个对象

### 返回
一个包含o的所有可枚举自有（非继承）属性的名字的数组

### 描述
Object.keys()返回指定对象o的属性名组成的数组。这个数组只包含那些可枚举且直接定义在o上的属性的名字，不包含继承的属性。返回数组中的属性名的顺序即它们通过for／in循环枚举时的顺序

## Object.preventExtensions()
禁止在一个对象上添加新的属性

### 概要
> Object.preventExtensions(o)    

### 参数
* o - 带设置可扩展性的对象

### 返回
传入的参数对象o

### 描述
Object.preventExtensions()将o的可扩展性设置为false，之后将不能向它添加新的属性，是一个永久性的改变：一旦一个对象设置为不可扩展的，它就再也不能改为可扩展的

Object.preventExtensions()不会影响原型链，不可扩展的对象仍然可以获得新的继承属性

## Object.seal()
阻止添加或删除对象的属性

### 参数
* o - 待封闭的对象

### 返回
现在处于封闭状态的参数对象o

### 描述
Object.seal()将o设置为不可扩展，同时将它的所有自有属性设置为不可配置的，效果为阻止添加新的属性以及阻止删除现有属性，封闭一个对象是永久性的，一旦封闭，就不能解封
