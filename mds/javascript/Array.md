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

**length**

一个可读／写 的整数，用来指明数组中的元素个数，当数组中的元素不连续时，length等于数组中最后一个元素的序号加一，改变length值会裁剪或扩充数组

## 方法

### Array.concat()
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

### Array.every()
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
