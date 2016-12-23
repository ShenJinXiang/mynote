# HTTP报文
如果说HTTP是互联网的心事，那么HTTP报文就是用来搬东西的包裹了

## 报文流
HTTP报文是在HTTP应用程序之间发送的数据块。这些数据块以一些文本形式的元信息(meta-infomation)开头，这些信息描述了报文的内容及含义，后面跟着可选的数据部分，这些报文在客户端、服务器和代理之间流动

### 报文流入源端服务器
HTTP使用术语*流入*(inbound)和*流出*(outbound)来描述*事物处理*(transaction)的方向。报文流入源端服务器，工作完成后，会流回用户的Agent代理中

### 报文向下游流动
HTTP报文会像流水一样流动，不管是请求报文还是响应报文，所有报文都会像下游流动，所有报文的发送者都在接收者的上游

## 报文的组成部分
HTTP报文由三部分组成：对报文进行描述的*起始行*(start line)、包含属性的*首部*(header)块，以及可选的、包含数据的*主体*(body)部分

起始行和首部就是由行分割的ASCII文本。每行都以一个由两个字符组成的行终止序列作为结束，其中包括一个回车符(ASCII码13)和换行符(ASCII码10)

报文的主体是一个可选的数据库，与起始行和首部不同的是，主体中可以包含文本或二进制数据，也可以为空

### 报文的语法
所有的HTTP报文都可以分为两类：*请求报文*(request message)和*响应报文*(response message)。请求报文会向Web服务器请求一个动作。响应报文会将请求的结果返回给客户端。请求和响应报文的基本结构相同

*请求报文的格式：*
> &lt;method&gt; &lt;request-URL&gt; &lt;version&gt;
> &lt;headers&gt;
>
> &lt;entity-body&gt;

*响应报文的格式：*
> &lt;version&gt; &lt;status&gt; &lt;reason-phrase&gt;
> &lt;headers&gt;
>
> &lt;entity-body&gt;
