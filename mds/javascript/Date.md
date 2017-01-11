# Date
操作日期和时间

## 构造函数
> new Date()    
> new Date(milliseconds)    
> new Date(datestring)    
> new Date(year, month, day, hours, minutes, seconds, ms)    

* 不带参数时，Date()构造函数将根据当前日期和时间创建一个Date对象
* 当传入一个数字参数时，这个数字将当作日期的内容数字表示形式，单位为毫秒，值等于对应的getTime()方法的返回值
* 当传入一个字符串参数时，它将当作日期的字符串表示形式，格式为Date.parse()方法可接收的格式
* 其它情况下，应向构造函数传入2～7个数字参数，用于指定日期及时间的各个字段。除了前两个参数（指定年以及月的范围），其余的参数都时可选的

**参数**

* milliseconds - 需要的时间与1970年1月1日午夜（UTC）之间的毫秒数。例如传入参数5000将创建一个表示1970-01-01午夜之后5秒钟的日期
* datestring - 一个以字符串形式定义日期的参数，这个字符串应当为Date.parse()可接收的一种格式
* year - 年份，4位数字，例如2001代表2001年
* month - 月份，介于0（1月）～11（12月）之间的整数
* day - 月份中的第几天，介于1～31之间的一个整数，可选参数
* hours - 小时，0（午夜）～23（晚上11点）之间的整数，可选参数
* minutes - 小时中的分钟，0～59之间的整数，可选参数
* seconds - 分钟里的秒数，0～59之间的整数，可选参数
* ms - 秒中的毫秒数，0～999之间的整数，可选参数

## 方法
* [Date.getDate()](#dategetdate)
* [Date.getDay()](#dategetday)
* [Date.getFullYear()](#dategetfullyear)
* [Date.getHours()](#dategethours)
* [Date.getMillisecondes()](#dategetmillisecondes)
* [Date.getMinutes()](#dategetminutes)
* [Date.getMonth()](#dategetmonth)
* [Date.getSeconds()](#dategetseconds)
* [Date.getTime()](#dategettime)
* [Date.getTimezoneOffset()](#dategettimezoneoffset)
* [Date.getUTCDate()](#dategetutcdate)
* [Date.getUTCDay()](#dategetutcday)
* [Date.getUTCFullYear()](#dategetutcfullyear)
* [Date.getUTCHours()](#dategetutchours)
* [Date.getUTCMilliseconds()](#dategetutcmilliseconds)
* [Date.getUTCMinutes()](#dategetutcminutes)
* [Date.getUTCMonth()](#dategetutcmonth)
* [Date.getUTCSeconds()](#dategetutcseconds)
* [Date.getYear()](#dategetyear)
* [Date.setDate()](#datesetdate)
* [Date.setFullYear()](#datesetfullyear)
* [Date.setHours()](#datesethours)

## Date.getDate()
返回一个Date对象的月份中的日期值

**概要**

> date.getDate()

**返回**

给定Date对象的date的月份中的日期值，使用本地时间，返回值在1～31之间

## Date.getDay()
返回一个Date对象的一周中的日期值

**概要**

> date.getDay()

**返回**

给定Date对象的date的一周中的日期值，使用本地时间，返回值介于0（星期天）～6（星期六）之间

## Date.getFullYear()
返回一个Date对象的年份值

**概要**

> date.getFullYear()

**返回**

date以本地时间表示的年份值，返回值是一个完整的4为数字的年份，包含实际，而不是一个两位数字的缩写

## Date.getHours()
返回一个Date对象的小时值

**概要**

> date.getHours()

**返回**

指定的Date对象date以本地时间表示的小时值，返回值在0（午夜）～23（晚上11点）之间

## Date.getMillisecondes()
返回一个Date对象的毫秒值

**概要**

> date.getMillisecondes()

**返回**

指定额date以本地时间表示的毫秒值

## Date.getMinutes()
返回一个Date对象的分钟值

**概要**

> date.getMinutes()

**返回**

指定Date对象date以本地事件表示是的分钟值，返回值是在0～59之间的整数

## Date.getMonth()
返回一个Date对象的月份值

**概要**

> date.getMonth()

**返回**

指定Date对象的date以本地时间表示的月份值。返回值是在0（1月）～11（12月）之间

## Date.getSeconds()
返回一个Date对象的秒钟值

**概要**

> date.getSeconds()

**返回**

指定Date对象date以本地时间表示的秒钟值。返回值在0～59之间

## Date.getTime()
将一个Date对象以毫秒形式返回

**概要**

> date.getTime()

**返回**

指定的Date对象date的毫秒表示形式，即1970-01-01午夜（GMT）到指定日期之间的毫秒数

**描述**

getTime()将日期和时间转换为一个单独的整数，在比较两个Date对象或判断两个日期之间的时间差时，这个方法很有用

## Date.getTimezoneOffset()
取得与GMT时间之间的差

**概要**

> date.getTimezoneOffset()

**返回**

GMT时间与本地时间的差，用分钟表示

**描述**

getTimezoneOffset()以分钟为单位返回GMT或UTC时间与本地时间的差，实际上这个函数可以知晓代码运行在哪个时区

## Date.getUTCDate()
返回一个Date对象的一月中的日期值（全球时间)

**概要**

> date.getUTCDate()

**返回**

以全球时间表示的date的一月中的日期值（介于1～31之间）

## Date.getUTCDay()
返回一个Date对象的一周中的日期值（全球时间）

**概要**

> date.getUTCDay()

**返回**

以全球时间表示的date一周中的日期值。返回值在0（星期天）～6（星期六）之间

## Date.getUTCFullYear()
返回一个Date对象的年份值（全球时间）

**概要**

> date.getUTCFullYear()

**返回**

以全球时间表示的date的年份值，返回值是一个完整的4位数字的年份，而不是两位数字的缩写

## Date.getUTCHours()
返回一个Date对象的小时值（全球时间）

**概要**

> date.getUTCHours()

**返回**

以全球时间表示的date的小时值，返回值是0（午夜）～23（晚上11点）之间的一个整数

## Date.getUTCMilliseconds()
返回一个Date对象的毫秒值（全球时间）

**概要**

> date.getUTCMilliseconds()

**返回**

以全球时间表示的date的毫秒值

## Date.getUTCMinutes()
返回一个Date对象的分钟值（全球时间）

**概要**

> date.getUTCMinutes()

**返回**

以全球时间表示的date的分钟值。返回值是0～59之间的一个整数

## Date.getUTCMonth()
返回一个Date对象的一年中的月份值（全球时间）

**概要**

> date.getUTCMonth()

**返回**

以全球时间表示的date的一年中的月份值。返回值是0（1月）～11（12月）之间的一个整数。注意Date对象用1表示一个月中的第一天，但用0表示一年中的第一个月

## Date.getUTCSeconds()
返回一个Date的秒数值（全球时间）

**概要**

> date.getUTCSeconds()

**返回**

以全球时间表示的date的秒数值，返回值是0～59之间的一个整数

## Date.getYear()
返回一个Date对象的年份值

**概要**

> date.getYear()

**返回**

给定Date对象的年份值减去1900

**描述**

getYear()返回给定Date对象的Date的年份值减去1900，自ECMAScript3开始使用getFullYear()替代该方法

## Date.setDate()
设置一个Date对象的一个月中的日期值

**概要**

> date.setDate(day_of_month)

**参数**

* day_of_month - 1~31之间的一个整数，将用作date的对应月中的日期值（本地时间）

**返回值**

调整后的日期的毫秒表示形式

## Date.setFullYear()
设置一个Date的年份值，以及可选的月份值和日期值

**概要**

> date.setFullYear(year)    
> date.setFullYear(year, month)    
> date.setFullYear(year, month, day)    

**参数**

* year - date中待设置的年份值，本地形式，应该是一个包含世纪的整数，如1999不能缩写成99
* month - 0~11之间的可选整数，将用作date的月份值（本地时间）
* day - 1~31之间的可选整数，用作date对应月中的日期值（本地时间）

**返回**

调整后的日期的内部毫秒表示形式

## Date.setHours()
设置一个Date的小时、分钟、秒以及毫秒值

**概要**

> date.setHours(hours)    
> date.setHours(hours, minutes)    
> date.setHours(hours, minutes, seconds)    
> date.setHours(hours, minutes, seconds, millis)    

**参数**

* hours - 0（午夜）～23（晚上11点）之间的一个整数，将用做date的新的小时值（本地时间）
* minutes - 0 ～59之间的一个可选整数，将用做date的新的分钟值（本地时间）
* seconds - 0 ～ 59之间的一个可选参数，将用做date的新的秒钟值（本地时间）
* millis - 0 ～ 999之间的一个可选整数，将用做date的新的毫秒数（本地时间）

**返回**

调整后的时间的毫秒表示形式


## 静态方法
* [Date.now()](#datenow)
* [Date.parse()](#dateparse)

## Date.now()
以毫秒的形式返回当前时间

**概要**

> Date.now()

**返回**

从1970-01-01午夜（GMT）到现在的时间，以毫秒表示

**描述**

在ECMAScript5之前，可以如下来实现：
```javascript
Date.now = function () {
	return (new Date()).getTime();
};
```

## Date.parse()
解析一个日期／时间字符串

**概要**

> Date.parse()

**参数**

* date - 一个包含待解析的日期和时间的字符串

**返回**

从1970-01-01午夜（GMT）到给定日期之间的毫秒数

**描述**
Date.parse()是Date的一个静态方法。返回从纪元开始到给定字符串参数所指定的日期之间的毫秒数。返回值可以直接用于创建一个新的Date对象，或用于通过Date.setTime()设置一个已存在的Date对象的日期
