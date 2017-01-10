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

## 静态方法
