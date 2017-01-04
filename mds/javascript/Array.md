# Array

## 构造函数

> new Array()
> new Array(size)
> new Array(element0, element1, ..., elementn)

**参数**

* size - 设定数组元素个数，返回数组的length属性等于size
* element0, ... elementn - 参数列表，可以是两个或多个任意值，新创建的数组实例会用指定的参数值来初始化，并将length属性设置为参数个数

**返回值**

新创建和初始化的数组，当不带参数调用Array()时，返回的数组为空，length属性为0，当用当个数值参数调用时，构造函数返回的数组带有指定个数的为定义元素，使用其它参数调用时，构造函数或使用指定的参数值初始化数组。当Array()构造函数不带new操作符，直接当作函数调用时，与带new操作调用时结果一样

**异常**

RangeError - 当给Array()构造函数传入单个整数参数size时，如果size
为负数，或大于2^32 - 1时，抛出RangeError异常

## 直接量语法
可以用逗号分割的表达式列表放在方括号中来创建和初始化一个数组，这些表达式的值会成为数组的元素，例如:
```javascript
var a = [1, true, 'abc'];
var b = [a[0], a[0] * 2, f(x)];
```

## 属性

* [Array.length](#arraylength)    

## Array.length
数组大小

**概要**

> array.length

**描述**

数组的length 属性总是比该数组中定义的序号最大的元素的序号大一，一般来说，数组都是稠密数组，拥有连续的元素，并且序号从0开始，对于这种数组，length属性表示数组中的元素个数

使用Array()构造函数创建数组时，会初始化该数组的length 属性，把新元素添加到数组中，如有必要时，会更新length属性

```javascript
a = new Array();  // a.length 初始化为 0
b = new Array(10); // b.length 初始化为 10
c = new Array('one', 'two', 'three'); // c.length初始化为 3
c[3] = 'four';  // c.length 更新为 4
c[10] = 'blastoff';  // c.length 变为 11
```

可以设置length 属性的值来改变数组的大小，如果设置的length小于原值，会裁剪数组，末尾处的元素会丢失，如果设置的length大于原值，数组会变大，新添加到末尾处的元素的值为undefined


## 方法

* [Array.concat()](#arrayconcat)    
* [Array.every()](#arrayevery)    
* [Array.filter()](#arrayfilter)    
* [Array.forEach()](#arrayforeach)    
* [Array.indexOf()](#arrayindexof)    
* [Array.join()](#arrayjoin)    
* [Array.lastIndexOf()](#arraylastindexof)    
* [Array.map()](#arraymap)    
* [Array.pop()](#arraypop)    
* [Array.push()](#arraypush)    
* [Array.reduce()](#arrayreduce)    
* [Array.reduceRight()](#arrayreduceright)    
* [Array.reverse()](#arrayreverse)    
* [Array.shift()](#arrayshift)    

## Array.concat()
将元素衔接到数组中

**概要**

> array.concat(value, ...)

**参数**

* value, ...  - 任意个数衔接到array中的值

**返回值**

一个新数组，包含array的元素，以及衔接的新元素

**描述**

concat()会将参数衔接到array中得到一个新数组并返回。不会修改array，如果传给concat的某个参数本身就是一个数组，则会将数组的元素衔接到array中，而不是数组本身

**示例**
```javascript
let a = [1, 2, 3];
a.concat(4, 5); // 返回 [1, 2, 3, 4, 5]
a.concat([4, 5]); // 返回 [1, 2, 3, 4, 5]
a.concat([4, 5], [6, 7]); // 返回 [1, 2, 3, 4, 5, 6, 7]
a.concat(4, [5, [6, 7]]); // 返回 [1, 2, 3, 4, 5, [6, 7]]
```

## Array.every()
测试断言函数是否对每个元素为真

**概要**

> array.every(predicate)    
> array.every(predicate, o)    

**参数**

* predicate - 用来测试数组元素的断言函数
* o - 调用predicate时可选this值

**返回值**

如果array的每个元素调用predicate时都返回真值，则返回true，如果有任何一个元素调用predicate时返回假值，则返回false

**描述**

every()方法用来测试数组的所有元素是否都满足某些条件，安装序号从小到大的顺序遍历array的元素，并对每个元素调用指定的predicate函数，如果predicate返回false(或任何可以转化为false的值)，则every()会停止遍历，并立刻返回false。如果predicate的每一次调用都返回true，则every()返回true，**当遍历的数组为空时，every()返回true**

对数组的每个序号i，调用predicate时带有三个参数

> predicate(array[i], i, array)

predicate的返回值会当作布尔值解析，true和所有真值表示该数组元素通过了测试或者说满足该函数所描述的条件，如果返回false或者假值，表示数组元素没有通过测试

**示例**
```javascript
[1, 2, 3].every(function (x) { return x < 5;}); // ture
[1, 2, 3].every(function (x) { return x < 3;}); // false
[].every(function (x) { return false; }); // true
```

## Array.filter()
返回通过断言的数组元素

**概要**

> array.filter(predicate)    
> array.filter(predicate, o)    

**参数**

* predicate - 用来判断array中的元素是否需要包含在返回数组中的调用函数
* o - 调用predicate时的可选this值

**返回值**

返回一个新数组，只包含那些让predicate返回真值的数组元素

**描述**

filter()会创建一个新数组，包含那些让predicate函数返回值为真值的array的元素，**filter()方法不会修改array本身**

filter()安装序号从小到大遍历array，对每个元素仅调用一次predicate，对于序号i，调用predicate时带有三个参数：

> predicate(array[i], i, array)

如果predicate返回真值，则array中序号为i的元素会追加到新创建的数组中，一但filter()测试完array中的每个元素，它就会返回新创建的数组

**示例**
```javascript
[1, 2, 3].filter(function (x) { return x > 1; }); // [2, 3]
```

## Array.forEach()
为每一个数组元素调用一个函数

**概要**

> array.forEach()    
> array.forEach(f, o)    

**参数**

* f - 为array的每个元素调用的函数
* o - 调用f时可选的this值

**返回值**

没有返回值

**描述**

forEach()安装序号从小到大遍历array，并对每一个元素调用一次f，对于序号i，调用f时带有三个参数：

> f(array[i], i, array)

f的任何返回值都会忽略，**forEach()没有返回值**

## Array.indexOf()
查找数组

**概要**

> array.indexOf(value)    
> array.indexOf(value, start)

**参数**

* value - 要在array中查找的值
* start - 开始查找的可选数组序号，如果省略，则为0

**返回值**

一个大于等于start的最小序号值，该序号值处的array元素与value全等，如果不存在匹配元素时，返回 -1

**描述**

该方法在array中查找等于value 的元素，并返回找到的第一个元素的序号，查找的起始位置时start指定的数组序号，如果没有指定，则从0开始，然后和一个接一个地查找，知道找到匹配的元素或检查完所有元素为止，判断是否相等使用的是"==="操作符，返回值是找到的第一个匹配元素的序号，如果没有找到匹配元素，则返回-1

**示例**
```javascript
['a', 'b', 'c'].indexOf('b'); // 1
['a', 'b', 'c'].indexOf('d'); // -1
['a', 'b', 'c'].indexOf('a', 1); // -1
```

## Array.join()
将数组元素衔接为字符串

**概要**

> array.join()    
> array.join(separator)

**参数**

separator - 在返回的字符串中，用来分割数组的某个元素与下一个元素的可选字符或字符串，如果省略，默认是英文逗号','

**返回值**

一个字符串。将array的每一个元素转化为字符串，然后用separator字符串分割开，最后衔接为返回的字符串

**描述**

join()将数组的每一个元素转化为字符串，并通过在中间插入指定的separator字符串将它们衔接起来，最后返回衔接好的字符串

可以进行相反操作———— 将字符串分割成数组元素：使用String对象的split()方法即可

**示例**
```javascript
var a = new Array(1, 2, 3, 'testing');
var s = a.join('+'); // s 是字符串 "1+2+3+testing"
```

## Array.lastIndexOf()
反向查找数组

**概要**

> array.lastIndexOf(value)    
> array.lastIndexOf(value, start)    

**参数**

* value - 要在array中查找的值
* start - 开始查找的可选数组序号，如果省略，则从最后一个元素开始查找

**返回值**

一个小于或等于start的最大序号值，该序号值处的array元素与value全等，如果不存在匹配元素时，返回-1

**描述**

该方法在array中一个接一个地方向查找等于value的元素，并返回找到的第一个元素的序号，查找的其实为止是start指定的数组序号，如果没有指定，则从最后一个元素开始。判断是否相等使用的是"==="操作符，返回值是找到的第一个匹配元素的序号，如果没有找到匹配的，则返回-1

## Array.map()
在数组元素中计算新值

**概要**

> array.map(f)    
> array.map(f, o)    

**参数**

* f - 为array的每个元素调用的函数，它的返回值会成为返回数组的元素
* o - f调用时的可选this值

**返回值**

一个新数组，由函数f计算出的元素组成

**描述**

map()会创建一个新数组，数组长度与array一样，数组元素通过将array的元素传递给函数f计算得到。map()安装从小到大的顺序遍历array的序号，并为每一个元素调用f一次。对于序号i，调用f时带有三个参数，f的返回值则存储在新创建的数组的序号i处：

> a[i] = f(array[i], i, array)

一旦map()将array中的每一个元素都传递给f，并将其返回值存储在新数组中后，就会返回新数组

**示例**

```javascript
[1, 2, 3].map(function(x) { return x * x; }); // [1, 4, 9]
```

## Array.pop()
移除并返回数组的最后一个元素

**概要**

> array.pop()

**返回值**

array的最后一个元素

**描述**

pop()会移除array的最后一个元素，缩短数组的长度，并返回所移除元素的值。如果数组已经为空，pop()不会修改该数组，返回值是undefined

**示例**

pop()与push()方法，可以提供先进后出(FILO)的栈功能：
```javascript
var stack = [];				// stack: []
stack.push(1, 2);			// stack: [1, 2]		返回2
stack.pop();				// stack: [1]			返回2
stack.push([4, 5])			// stack: [1, [4, 5]]	返回2
stack.pop();				// stack: [1]			返回[4, 5]
stack.pop();				// stack: []			返回1
```

## Array.push()
给数组追加元素

**概要**

> array.push(value, ...)

**参数**

* value,...  - 追加到array尾部的一个或多个值

**返回值**

把指定值追加到数组后数组的新长度

**描述**

push()会将参数按顺序追加到array尾部，会直接修改array，而不会创建新的数组，push()与pop()可以提供先进后出(FILO)的栈功能

## Array.reduce()
从数组元素中计算出一个值

**概要**

> array.reduce(f)    
> array.reduce(f, inital)

**参数**

* f - 一个函数，可以合并两个值（比如两个数组元素），并返回一个“缩减”的新值
* initial - 用来缩减数组的可选初始值。如果指定该参数，reduce()的行为会像是吧该参数插入array的头部一样

**返回值**

数组的化简值，该值是最后一次调用f时的返回值

**描述**

reduce()方法接受函数f作为第一个参数。该函数的行为应该像一个二元操作符一样：接受两个数值，执行某些操作，然后返回结果。如果array有n个元素，reduce()方法会调用n-1次来将这些元素缩减为一个合并值。

第一次调用f时传入的是array的前两个元素。接下来的调用传入之前的计算值和array的下一个元素。最后一次调用f的返回值会成为reduce()方法的返回值

reduce()在调用可以传入可选的第二个参数：initial。如果指定initial，reduce()的行为会像是把该参数插入array的头部一样（实际上并没有修改array）。换种说法，initial就像是之前f 的返回值一样，第一次调用f时传入的是initial和array的第一个元素。当指定initial时，要缩减的元素有n+1个，调用n次f函数

如果array为空，又没有指定initial，reduce()会抛出TypeError异常。如果array为空，但指定initial，则reduce()返回initial，且永远不调用f。如果array只有一个元素，且没有指定initial，reduce()不调用f，则返回array的单个元素

reduce()调用f时传入4个参数，第三个参数是第二个参数的数组序号。第四个参数则是array自身，f永远当作函数调用，而不是方法

**示例**

```javascript
[1, 2, 3, 4].reduce(function (x, y) { return x * y; });  // 24 : ((1 * 2) * 3) * 4
```

## Array.reduceRight()
从右到左缩减数组

**概要**

> array.reduceRight(f)    
> array.reduceRight(f, initial)    

**参数**

* f - 函数，可以合并两个值，并返回一个“缩减”的新值
* initial - 用来缩减数组的可选初始值，如果指定该参数，reduceRight()的行为会像把该参数插入array的尾部一样

**返回值**

数组的缩减值，该值是最后一次调用f时的返回值

**描述**

reduceRight()与reduce()方法一样，调用f函数n-1次，来讲array的n个元素缩减为单个值，只有一点不同，遍历数组是从右到左

**示例**
```javascript
[2, 10, 60].reduceRight( function (x, y) { return x / y; }); // 3 : (60 / 10) / 2
```

## Array.reverse()
颠倒数组中的元素顺序

**概要**

> array.reverse()

**描述**

Array对象的reverse()方法可以颠倒数组元素的顺序，会在愿数组中进行操作：重新调整array中的元素，而不会创建一个新数组。如果array又多个引用，该数组元素的新顺序在所有引用中可见

**示例**

```javascript
a = new Array(1, 2, 3);
a.reverse();
```

## Array.shift()
移除数组的第一个元素

**概要**

> array.shift()

**返回值**

数组原来的第一个元素

**描述**

shift()会移除会返回array的第一个元素，并将所有后续元素前移一位，填补数组头部的空缺。如果数组为空，shift()什么也不干，直接返回undefined值，shift()没有创建新数组，会直接修改array

shift()与Array.pop()类似，除了操作的是数组的头部而不是尾部。shift()经常与unshift()一起使用

**示例**

```javascript
var a = [1, [2, 3], 4];
a.shift(); // 返回1  a = [[2, 3], 4]
a.shift(); // 返回[2, 3]  a = [4]
```
