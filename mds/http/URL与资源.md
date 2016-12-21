# URL与资源

## 浏览网络资源
URI是一类通用的资源标识符，URL是URI的子集，HTTP应用程序处理的值是URL

*URL三部分*

url: http://www.shenjinxiang.com/index.html

* 第一部分(http)：URL方案，告知web客户端怎么样访问资源，这里采用了HTTP协议
* 第二部分(www.shenjinxiang.com)：服务器位置，告知web客户端资源位于何处，即地址
* 第三部分(/index.html)：资源路径，说明了请求的是服务器上哪个特定的资源

## URL的语法

大多数URL语法都建立在9个部分构成的通用格式上：
> &lt;scheme&gt;://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;path&gt;;&lt;params&gt;?&lt;query&gt;#&lt;frag&gt;

几乎咩有哪个URL中包含所有组件，其中最终要的3个部分是*方案(scheme)*、*主机(host)*和*路径(path)*

*通用URL组件*

|组件|描述|默认值|
|:--:|:--|:--:|
|方案(scheme)|访问服务器以获取资源时要使用哪种协议|无|
|用户(user)|某些方案访问资源时需要的用户名|匿名|
|密码(password)|用户名后面可能要包含的密码，中间由冒号(:)分割|&lt;E-mail 地址&gt;|
|主机(host)|服务器主机名或IP地址|无|
|端口(port)|服务器正则监听的端口号，很多方案都有默认端口号(HTTP的默认端口号为80)|每个方案特有|
|路径(path)|服务器上资源的本地名，由一个斜杠(/)与前面的URL组件分割|无|
|参数(params)|使用这个组件传入参数，参数为名、值对|无|
|查询(query)|某些方案用这个组件传递参数以激活应用程序，使用字符(?)与URL其余部分分割|无|
|片段|一小片或一部分资源的名字，通过字符(#)与其他URL分割|无|

## URL快捷方式
