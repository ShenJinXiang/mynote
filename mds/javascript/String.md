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

## 静态方法
