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

### 静态方法
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
