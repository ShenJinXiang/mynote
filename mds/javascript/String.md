# String
字符串支持

## 构造函数
> new String(s)    // 构造函数    
> function String(s)    // 转换函数    

### 参数
* s - 待存储到一个String对象中或转换为一个原始字符串的值

### 返回
当使用new操作符将String()作为一个构造函数使用时，它将返回一个String对象，内容为字符串s或s的字符串表示。当不带new操作符调用String()构造函数时，它只是简单地将s转换为原始字符串并返回转换后的值

## 属性
length

## 方法
* [String.charAt()](#stringcharat)    
* [String.charCodeAt()](#stringcharcodeat)    
* [String.concat()](#stringconcat)    
* [String.indexOf()](#stringindexof)    

## String.charAt()
取得一个字符串中第“n”个字符

### 概要
> string.charAt(n)    

### 参数
* n - 希望返回的字符在字符串string中的索引

### 返回
字符串string的第n个字符

### 描述
String.charAt()返回字符串string中的第n个字符。字符串的第一个字符的编号为0。如果n不再0~string.length - 1之间，这个方法将返回一个空字符串。注意，JavaScript中并没有字符类型，所以返回的字符实际上是一个长度为1的字符串

## String.charCodeAt()
取得字符串中第n个字符的编码

### 概要
> string.charCodeAt(n)    

### 参数
* n - 待返回编码的字符的索引

### 返回
string中第n个字符的Unicode编码，返回的值是一个16位的整数，值在0~65535之间

### 描述
charCodeAt()类似charAt()，不同之处是它返回指定为止的字符的编码，而不返回包含该字符的子串。如果n为负数或者大于等于字符串的长度，则charCodeAt()将返回NaN

## String.concat()
连接字符串

### 概要
> string.concat(value, ...)    

### 参数
* value,... - 一个或多个待连接为字符串的值

### 返回
由每个参数连接为string而组成的新的字符串

### 描述
concat()将每个参数转换为字符串，并按顺序追加到string的末尾，返回最后的连接结果，string本身没有改变

## String.indexOf()
搜索一个字符串

### 概要
> string.indexOf(substring)     
> string.indexOf(substring, start)    

### 参数
* substring - 要在string中搜索的子串
* start - 一个可选的整数参数，指定该次搜索在字符串string中的开始位置。合法的值为0（字符串中的第一个字符的位置）到string.length - 1 (字符串中最后一个字符的位置，如果省略这个参数，将从第一个字符开始

### 返回
在字符串string中start位置之后，substring第一次出现的位置，如果没有找到则返回-1

### 描述
String.indexOf()搜素指定的字符串string，从前到后搜索，检测它是否包含指定的子串substring。搜索开始于string中的start位置，如果没有指定start则从string的开始开始搜索，如果发现了子串substring，则string.indexOf()将返回substring在string中的第一次出现时第一个字符所在的位置

如果在string中没有找到substring，则返回-1

## 静态方法
* [String.fromCharCode()](#stringfromcharcode)

## String.fromCharCode()
从字符编码创建一个字符串

### 概要
> String.fromCharCode(c1, c2, ...)   

### 参数
* c1, c2,... - 指定待创建字符串中国年的字符Unicode编码，一个或多个整数

### 返回
一个新的字符串，内容为指定编码对应的字符

### 描述
这个静态方法提供一个通过指定每个字符的Unicode编码数字来创建字符串的方式。静态方法，是String()构造函数的一个属性，不是字符串或String对象的方法

### 示例
```javascript
var s = String.fromCharCode(104, 101, 108, 108, 111);
```
