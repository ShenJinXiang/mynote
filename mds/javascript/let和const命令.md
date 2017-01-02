# let和const命令
* [let命令](#let命令)    
* [块级作用域](#块级作用域)    


## let命令

### 基本用法

ES6新增了```let```命令，用来声明变量。它的用法类似于```var```，但是所声明的变量，只在```let```命令所在的代码块内有效。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

上面代码在代码块之中，分别用```let```和```var```声明了两个变量。然后在代码块之外调用这两个变量，结果```let```声明的变量报错，```var```声明的变量返回了正确的值。这表明，```let```声明的变量只在它所在的代码块有效。

for循环的计数器，就很合适使用```let```命令。

```javascript
for (let i = 0; i < 10; i++) {}

console.log(i);
//ReferenceError: i is not defined
```

上面代码中，计数器```i```只在```for```循环体内有效，在循环体外引用就会报错。

下面的代码如果使用```var```，最后输出的是```10```。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中，变量```i```是```var```声明的，在全局范围内都有效。所以每一次循环，新的```i```值都会覆盖旧值，导致最后输出的是最后一轮的```i```的值。

如果使用```let```，声明的变量仅在块级作用域内有效，最后输出的是```6```。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量```i```是```let```声明的，当前的```i```只在本轮循环有效，所以每一次循环的```i```其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量```i```时，就在上一轮循环的基础上进行计算。

### 不存在变量提升
关键字```let```不像```var```那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

上面代码中，变量```foo```用```var```命令声明，会发生变量提升，即脚本开始运行时，变量```foo```已经存在了，但是没有值，所以会输出```undefined```。变量```bar```用```let```命令声明，不会发生变量提升。这表示在声明它之前，变量```bar```是不存在的，这时如果用到它，就会抛出一个错误。

### 暂时性死区
只要块级作用域内存在```let```命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量```tmp```，但是块级作用域内```let```又声明了一个局部变量```tmp```，导致后者绑定这个块级作用域，所以在```let```声明变量前，对```tmp```赋值会报错。

ES6明确规定，如果区块中存在```let```和```const```命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用```let```命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，在```let```命令声明变量```tmp```之前，都属于变量```tmp```的“死区”。

“暂时性死区”也意味着```typeof```不再是一个百分之百安全的操作。

```javascript
typeof x; // ReferenceError
let x;
```

上面代码中，变量```x```使用```let```命令声明，所以在声明之前，都属于```x```的“死区”，只要用到该变量就会报错。因此，```typeof```运行时就会抛出一个```ReferenceError```。

作为比较，如果一个变量根本没有被声明，使用```typeof```反而不会报错。

```javascript
typeof undeclared_variable // "undefined"
```

上面代码中，```undeclared_variable```是一个不存在的变量名，结果返回“undefined”。所以，在没有```let```之前，```typeof```运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽，不太容易发现。

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

上面代码中，调用```bar```函数之所以报错（某些实现可能不报错），是因为参数```x```默认值等于另一个参数```y```，而此时```y```还没有声明，属于”死区“。如果```y```的默认值是```x```，就不会报错，因为此时```x```已经声明了。

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

ES6规定暂时性死区和```let```、```const```语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在ES5是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 不允许重复声明
关键字```let```不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```
因此，不能在函数内部重新声明参数。

```javascript
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

## 块级作用域
