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
* [constructor](#constructor)    

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
