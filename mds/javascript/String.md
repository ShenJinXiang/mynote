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
* [String.length](#stringlength)    

## String.length
一个字符串的长度

### 概要
> string.length    

### 描述
String.length属性是一个只读的整数，指明指定的字符串string的字符个数，对任意字符串s来说。最后一个字符的索引都是s.length - 1。字符串的length属性不会在for/in循环中枚举，不可通过delete操作符删除

## 方法
* [String.charAt()](#stringcharat)    
* [String.charCodeAt()](#stringcharcodeat)    
* [String.concat()](#stringconcat)    
* [String.indexOf()](#stringindexof)    
* [String.lastIndexOf()](#stringlastindexof)    
* [String.localeCompare()](#stringlocalecompare)    
* [String.match()](#stringmatch)    

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

## String.lastIndexOf()
从后面开始搜索一个字符串

### 概要
> string.lastIndexOf(substring)    
> string.lastIndexOf(substring, start)    

### 参数
* substring - 要在字符串string中搜索的子串
* strrt - 一个可选的整数参数，指定string中搜索开始的位置，合法址为0到string.length - 1,如果忽略这个参数，将从字符串string的最后一个字符开始搜索

### 返回
子串substring在字符串string的start位置之前最后一次出现的位置，如果没有找到则返回-1

### 描述
String.lastIndexOf()从字符串string的结尾开始搜索到开头，检查是否包含子串substring。开始与字符串string中的start位置，如果没有指定start则开始与string的尾部，如果找到子串substring则返回子串的第一个字符的位置。**由于本方法从字符串string的末尾搜索到开头，因此找到的第一个匹配子串将是string中start位置前的最后一个匹配**

## String.localeCompare()
使用本地特定的顺序比较两个字符串

### 概要
> string.localeCompare(target)    

### 参数
* target - 要与string使用区分地区设置的方式比较的字符串

### 返回
一个表示比较结果的数字，如果string比taget“小”，则localeCompare()将返回一个比0小的数，如果string比target“大”，则返回一个比0大的数，如果相同，或无法区分，则返回0

###  描述
当在字符串上使用“&lt;”或“&gt;”操作时，只比较这些字符的Unicode编码，而不考虑本地的顺序，这种方式的顺序并不总是正确的，localeCompare()提供一个根据默认的本地排序来比较字符串的方法，利用底层的操作系统提供的排序

## String.match()
找到一个或多个正则表达式匹配结果

### 概要
> string.match(regexp)    

### 参数
* regexp - 一个指定要匹配的模式的RegExp对象。如果这个参数不是一个RegExp对象，则将先被传入RegExp()构造函数，后转换为RegExp对象

### 返回
一个包含匹配结果的数组。数组的内容取决于regexp是否设置了“g”属性。

### 描述
match()在字符串string中寻找一个或多个regexp的匹配结果，这个方法的行为取决于regexp是否有“g”属性

如果regexp没有“g”属性，match()将只在string中执行一次匹配，如果没有找到匹配结果，match()将返回null。其它情况下，将返回一个包含它所发现的匹配结果的信息的数组。该数组的元素0为匹配文本，剩下的元素为匹配正则表达式中圆括号子表达式的文本，除了常规的数组元素，返回的数组还有两个额外的对象属性，其中index属性指明了匹配文本在string中的开始位置，input属性则是对该string本身的引用

如果regexp有“g”标志，则match()将执行一次全局搜索，在string中寻找所有匹配的子串，如果没有找到匹配的结果则返回null。如果找到一个或多个匹配结果则返回一个数组

### 示例
```javascript
"1 plus 2 equals 3".match(/\d+/g);   // ["1", "2", "3"]
```

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
