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
* [String.replace()](#stringreplace)    
* [String.search()](#stringsearch)    
* [String.slice()](#stringslice)    
* [String.split()](#stringsplit)    

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

## String.replace()
替换匹配给定正则表达式的（一个或多个）子串

### 概要
> string.replace(regexp, replacement)    

### 参数
* regexp - 指定了要替换的模式的RegExp对象，如果这个参数是一个字符串，将用做一个要搜索的直接量文本模式，不会转化为RegExp对象
* replacement - 一个内容替换文本的字符串，或者一个函数，用于在调用时生成对应的替换文本

### 返回
一个新的字符串，其中匹配regexp的第一个或所有的地方已替换为replacement
### 描述
replace()在字符串string上执行查找与替换的操作。它在string中搜索一个或多个匹配regexp的子串并使用replacement替换，如果regexp指定全局属性“g”，则replace()将替换所有匹配的子串，其它情况下只替换第一个匹配的子串

replacement可以是一个字符串或一个函数，如果是一个字符串，则每个匹配子串都将替换为该子串。注意replacement字符串中的$字符有特殊含义。

### 示例
```javascript
// 确保单词“JavaScript”的大小写是正确的
text.replace(/javascript/i, "JavaScript");

// 将一个单独的名字从格式“Done,John”替换为“John Done”
name.replace(/(\w+)\s,\s*(\w+)/, "$2 $1");

// 将所有双引号替换为成堆的前后单引号
text.replace(/"([^"]*)"/g, "''$1''");
```

## String.search()
根据一个正则表达式查找

### 概要
> string.search(regexp)    

### 参数
* regexp - 一个RegExp对象，指定要在字符串string中查找的模式，如果这个参数不是一个RegExp，将先传入RegExp()构造函数，转换为一个RegExp对象

### 返回
string中第一个匹配regexp的子串的开始位置，如果没有找到匹配则返回-1

### 描述
search()在string中寻找匹配regexp的子串，并返回匹配子串的第一个字符的位置，如果没有找到则返回-1

search()不会执行全局匹配，会忽略g标志，也会忽略regexp的lastIndex属性，总是从string的开始位置开始搜索，总是返回string中第一个匹配子串的位置

### 示例
```javascript
var s = "JavaScript is fun";
s.search(/script/i);  // 4
s.search(/a(.)a/); // 4
```

## String.slice()
提取一个子串

### 概要
> string.slice(start, end)    

### 参数
* start - 切片开始的字符串索引。如果为负，则将从该字符串的尾部开始计算
* end - 紧跟着切片结尾的字符串索引，如果不指定，则切片将包括从start到当前字符串结尾的索引字符，如果参数是负的，将从字符串的尾部开始计算

### 返回
一个新的字符串，内容为string中自start位置开始并且包含start的位置，直到但不包含end位置的所有字符

### 描述
slice()返回一个字符串，内容为string的一个切片或子串，不修改string

String的方法slice()、substring()以及弃用的substr()都返回一个字符串的指定部分。slice()比substring()更灵活，因为它允许负数参数值。slice()与substr()的不同之处是，前者通过两个字符位置来定义一个子串，后者使用一个位置和一个长度。

### 示例
```javascript
var s = "abcdefg";
s.slice(0, 4); // "abcd"
s.slice(2, 4); // "cd"
s.slice(4); // "efg"
s.slice(3, -1); // "def"
s.slice(3, -2); // "de"
s.slice(-3, -1);  // "ef"
```

## String.split()
将一个字符串切分为一个由字符串组成的数组

### 概要
> string.split(delimiter, limit)    

### 参数
* delimiter - string切分处的字符串或正则表达式
* limit - 这个可选的整数指定已返回数组的最大长度，如果指定，则最多返回数量为这个数字的子串，如果没有指定，则将切分整个字符串，无论结果数组由多长

### 返回
一个由字符串组成的数组，通过由delimiter节点的边界处切分string为子串创建返回数组中国年的子串不包含delimiter本身。

### 描述


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
