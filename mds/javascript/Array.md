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

## 
