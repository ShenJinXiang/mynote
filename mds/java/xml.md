# XML

## XML简介
XML被设计用来传输和存储数据

* XML 指可扩展标记语言（EXtensible Markup Language）
* XML 是一种标记语言，很类似 HTML
* XML 的设计宗旨是传输数据，而非显示数据
* XML 标签没有被预定义。您需要自行定义标签。
* XML 被设计为具有自我描述性。
* XML 是 W3C 的推荐标准

## XML与HTML的主要差异
XML 不是 HTML 的替代，XML 和 HTML 为不同的目的而设计:

* XML 被设计为传输和存储数据，其焦点是数据的内容。
* HTML 被设计用来显示数据，其焦点是数据的外观。
* HTML 旨在显示信息，而 XML 旨在传输信息

## XML的用途
XML 应用于 web 开发的许多方面，常用于简化数据的存储和共享

1. XML简化数据共享：在真实的世界中，计算机系统和数据使用不兼容的格式来存储数据。XML 数据以纯文本格式进行存储，因此提供了一种独立于软件和硬件的数据存储方法。这让创建不同应用程序可以共享的数据变得更加容易
2. XML简化数据传输：通过 XML，可以在不兼容的系统之间轻松地交换数据。对开发人员来说，其中一项最费时的挑战一直是在因特网上的不兼容系统之间交换数据。由于可以通过各种不兼容的应用程序来读取数据，以 XML 交换数据降低了这种复杂性
3. 很多新的 Internet 语言是通过 XML 创建的：

* XHTML - 最新的 HTML 版本
* WSDL - 用于描述可用的 web service
* WAP 和 WML - 用于手持设备的标记语言
* RSS - 用于 RSS feed 的语言
* RDF 和 OWL - 用于描述资源和本体
* SMIL - 用于描述针针对 web 的多媒体

## XML语法规则
### 所有XML元素都须有关闭标签
在 XML 中，省略关闭标签是非法的。所有元素都必须有关闭标签：
```xml
<p>This is a paragraph</p>
<p>This is another paragraph</p>
```

### XML标签对大小写敏感
XML标签对大小写敏感。在XML中，标签 &lt;Letter&gt; 与标签 &lt;letter&gt; 是不同的，必须使用相同的大小写来编写打开标签和关闭标签
```xml
<Message>这是错误的。</message>
<message>这是正确的。</message>
```

### XML必须正确地嵌套
在XML中，所有元素都必须彼此正确地嵌套：
```xml
<b><i>This text is bold and italic</i></b>
```

### XML文档必须有根元素
XML文档必须有一个元素是所有其他元素的父元素。该元素称为根元素
```xml
<root>
  <child>
    <subchild>.....</subchild>
  </child>
</root>
```

### XML的属性值须加引号
与HTML类似，XML也可拥有属性（名称/值的对）， 在XML中，XML的属性值须加引号
```xml
<!-- 错误的例子 -->
<note date=08/08/2008>
  <to>zhangfei</to>
  <from>linchong</from>
</note> 

<!-- 正确的例子 -->
<note date="08/08/2008">
  <to>zhangfei</to>
  <from>linchong</from>
</note> 
```

### 实体引用
在XML中，有5个预定义的实体引用：

|引用|实体|说明|
|:--|:--|:--|
|\&lt;|&lt;|小于|
|\&gt;|&gt;|大于|
|\&amp;|&amp;|和号|
|\&apos;|'|单引号|
|\&quot;|"|引号|

### XML中的注释
在XML中编写注释的语法与 HTML 的语法很相似：
```xml
<!-- 这里是注释 --> 
```

## XML元素
XML 元素指的是从（且包括）开始标签直到（且包括）结束标签的部分。元素可包含其他元素、文本或者两者的混合物。元素也可以拥有属性
```xml
<bookstore>
<book category="CHILDREN">
  <title>Harry Potter</title> 
  <author>J K. Rowling</author> 
  <year>2005</year> 
  <price>29.99</price> 
</book>
<book category="WEB">
  <title>Learning XML</title> 
  <author>Erik T. Ray</author> 
  <year>2003</year> 
  <price>39.95</price> 
</book>
</bookstore>
```
在上例中，&lt;bookstore&gt; 和 &lt;book&gt; 都拥有元素内容，因为它们包含了其他元素。&lt;author&gt; 只有文本内容，因为它仅包含文本。只有 &lt;book&gt; 元素拥有属性 (category="CHILDREN")。

XML 元素必须遵循以下命名规则：
* 名称可以含字母、数字以及其他的字符
* 名称不能以数字或者标点符号开始
* 名称不能以字符 “xml”（或者 XML、Xml）开始
* 名称不能包含空格

## XML属性
XML元素可以在开始标签中包含属性，类似于HTML，属性（Attribute）提供关于元素的额外信息

属性通常提供不属于数据组成部分的信息
```xml
<file type='gif'>computer.gif</file>
```

XML属性必须加引号，单引号和双引号都可使用
```xml
<person sex='female'>
<person sex="female">
```

在xml中尽量避免使用属性，如果信息很像数据，那么使用子元素

* 属性无法包含多重的值（元素可以）
* 属性无法描述树结构（元素可以）
* 属性不易扩展（为未来的变化）
* 属性难以阅读和维护

## XML验证
拥有正确语法的XML被称为“形式良好”的XML

* XML 文档必须有根元素
* XML 文档必须有关闭标签
* XML 标签对大小写敏感
* XML 元素必须被正确的嵌套
* XML 属性必须加引号
