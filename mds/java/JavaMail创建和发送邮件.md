# JavaMail创建和发送邮件

JavaMail是用来处理email的API，可以方便的执行一些常用的邮件传输，我们可以用JavaMail创建并发送邮件，例如在java web项目中用户注册、密码认证、消息发布等很多地方会用到邮件服务，就需要用到JavaMail来创建和发送邮件

## 基本概念
### 邮件服务器
要在Internet上提供电子邮件功能，必须有专门的电子邮件服务器。例如现在Internet很多提供邮件服务的厂商：sina、sohu、163等等他们都有自己的邮件服务器。 这些服务器类似于现实生活中的邮局，它主要负责接收用户投递过来的邮件，并把邮件投递到邮件接收者的电子邮箱中

### 电子邮箱
电子邮箱（E-mail地址）的获得需要在邮件服务器上进行申请，确切地说，电子邮箱其实就是用户在邮件服务器上申请的一个帐户。用户在邮件服务器上申请了一个帐号后，邮件服务器就会为这个帐号分配一定的空间，用户从而可以使用这个帐号以及空间，发送电子邮件和保存别人发送过来的电子邮件

## 邮件传输协议
### SMTP协议
用户连上邮件服务器后，要想给它发送一封电子邮件，需要遵循一定的通迅规则，SMTP协议就是用于定义这种通讯规则的。 因而，通常我们也把处理用户smtp请求（邮件发送请求）的邮件服务器称之为SMTP服务器。(25端口)

### POP3协议
用户若想从邮件服务器管理的电子邮箱中接收一封电子邮件的话，他连上邮件服务器后，也需要遵循一定的通迅格式，POP3协议用于定义这种通讯格式。 因而，通常我们也把处理用户pop3请求（邮件接收请求）的邮件服务器称之为POP3服务器。(110端口)

## 创建邮件
### RFC822文档
RFC822文档规定了如何编写一封简单邮件(纯文本邮件)，一封简单的邮件包含邮件头和邮件体两个部分，邮件头和邮件体之间使用空行分隔

*邮件头包含的内容有:*

* rom - 用于指明发件人
* to - 用于指明收件人
* subject - 用于说明邮件主题
* cc - 抄送，将邮件发送给收件人的同时抄送给另一个收件人，收件人可以看到邮件抄送给了谁
* bcc - 密送，将邮件发送给收件人的同时将邮件秘密发送给另一个收件人，收件人无法看到邮件密送给了谁

邮件体指的就是邮件的具体内容

### MIME协议
MIME协议是对RFC822文档的升级和补充，它描述了如何生成一封复杂邮件。通常我们把MIME协议描述的邮件称之为MIME邮件，MIME协议描述的数据称之为MIME消息。 对于一封复杂邮件，如果包含了多个不同的数据，MIME协议规定了要使用分隔线对多段数据进行分隔，并使用Content-Type头字段对数据的类型、以及多个数据之间的关系进行描述

**Content-type头字段**

以“主类型/子类型”的形式出现，主类型有text、image、audio、video、application、message等，分别表示文本、图片、音频、视频、应用程序、组合结构、消息等。每个主类型下面都有多个子类型，例如text主类型包含plain、html、xml、css等子类型

**Content-Disposition头字段**

Content-Disposition头字段用于指定邮件阅读程序处理数据内容的方式，有inline和attachment两种标准方式，inline表示直接处理，而attachment表示当作附件处理。如果将Content-Disposition设置为attachment，在其后还可以指定filename属性： Content-Disposition: attachment; filename=“1.bmp” 表示MIME消息体的内容为邮件附件，附件名“1.bmp”

**Content-ID头字段**

Content-ID头字段用于为“multipart/related”组合消息中的内嵌资源指定一个唯一标识号，在HTML格式的正文中可以使用这个唯一标识号来引用该内嵌资源。例如，假设将一个表示内嵌图片的MIME消息的Content-ID头字段设置为如下形式： Content-ID: img001 那么，在HTML正文中就需要使用如下HTML语句来引用该图片资源:
```
<img src="cid:img001">
```
注意，在引用Content-ID头字段标识的内嵌资源时，要在资源的唯一标识号前面加上“cid:”，以说明要采用唯一标识号对资源进行引用

## JavaMail相关API
Session类用于定义整个应用程序所需的环境信息，以及收集客户端与邮件服务器建立网络连接的会话信息，如邮件服务器的主机名、端口号、采用的邮件发送和接收协议等。Session对象根据这些信息构建用于邮件收发的Transport和Store对象，以及为客户端创建Message对象时提供信息支持

创建和解析邮件内容的API：Message类是创建和解析邮件的核心API，它的实例对象代表一封电子邮件

发送邮件的API：Transport类是发送邮件的核心API类，它的实例对象代表实现了某个邮件发送协议的邮件发送对象，例如SMTP协议

接收邮件的API：Store类是接收邮件的核心API类，它的实例对象代表实现了某个邮件接收协议的邮件接收对象，例如POP3协议

## 发送邮件
1. 创建包含邮件服务器的网络连接信息的Session对象
2. 创建代表邮件内容的Message对象
3. 创建Transport对象、连接服务器、发送Message、关闭连接

### 发送简单邮件
```java
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SimpleMail {

    public static void main(String[] args) throws Exception {
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.163.com");
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.setProperty("mail.smtp.auth", "true");

        // 创建session
        Session session = Session.getInstance(prop);
        // 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
        session.setDebug(true);

        // 创建邮件
        Message message = createSimpleMessage(session);

        // 通过session得到transport对象
        Transport ts = session.getTransport();

        // 连上邮件服务器
        ts.connect("user@163.com", "password");

        // 发送邮件
        ts.sendMessage(message, message.getAllRecipients());
        ts.close();
    }

    /**
     * 创建一封简单邮件
     * @param session
     * @return
     * @throws shenjinxiang
     * @throws MessagingException
     */
    private static Message createSimpleMessage(Session session) throws Exception {
        MimeMessage message = new MimeMessage(session);

        // 发件人
        message.setFrom(new InternetAddress("user@163.com"));

        // 收件人
        message.setRecipient(Message.RecipientType.TO, 
							new InternetAddress("user@qq.com"));

        // 邮件标题
        message.setSubject("发送简单邮件");

        // 邮件内容
        message.setContent("这是一封简单邮件，没有多余的图片、附件之类的信息。", 
							"text/html;charset=utf-8");

        return message;
    }
}
```

### 发送带图片的邮件
```java
public class ImageMail {

	public static void main(String[] args) throws Exception {
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.163.com");
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.setProperty("mail.smtp.auth", "true");

        // 创建session
        Session session = Session.getInstance(prop);
        // 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
        session.setDebug(true);

        // 创建邮件
        Message message = createImageMessage(session);

        // 通过session得到transport对象
        Transport ts = session.getTransport();

        // 连上邮件服务器
        ts.connect("user@163.com", "password");

        // 发送邮件
        ts.sendMessage(message, message.getAllRecipients());
        ts.close();
    }

    private static Message createImageMessage(Session session) throws Exception {
        MimeMessage message = new MimeMessage(session);
        // 发件人
        message.setFrom(new InternetAddress("user@163.com"));

        // 收件人
        message.setRecipient(Message.RecipientType.TO, 
						new InternetAddress("user@qq.com"));

        // 邮件标题
        message.setSubject("附带一张图片");

        // 准备邮件正文数据
        MimeBodyPart text = new MimeBodyPart();
        text.setContent("下面是一张图片：<br/><img src='cid:1.jpg'><br/>图片后信息", 
						"text/html;charset=utf-8");

        // 准备邮件图片数据
        MimeBodyPart image = new MimeBodyPart();
        DataHandler dh = new DataHandler(new FileDataSource("src/1.jpg"));
        image.setDataHandler(dh);
        image.setContentID("1.jpg");

        // 描述数据关系
        MimeMultipart mm = new MimeMultipart();
        mm.addBodyPart(text);
        mm.addBodyPart(image);
        mm.setSubType("related");

        message.setContent(mm);
        message.saveChanges();
        return message;
    }
}
```

### 发送带附件的邮件
```java
public class AttachMail {

    public static void main(String[] args) throws Exception {
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.163.com");
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.setProperty("mail.smtp.auth", "true");

        // 创建session
        Session session = Session.getInstance(prop);
        // 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
        session.setDebug(true);

        // 创建邮件
        Message message = createAttachMessage(session);


        // 通过session得到transport对象
        Transport ts = session.getTransport();

        // 连上邮件服务器
        ts.connect("user@163.com", "password");

        // 发送邮件
        ts.sendMessage(message, message.getAllRecipients());
        ts.close();
    }

    private static Message createAttachMessage(Session session) throws Exception {
        MimeMessage message = new MimeMessage(session);

        // 发件人
        message.setFrom(new InternetAddress("user@163.com"));

        // 收件人
        message.setRecipient(Message.RecipientType.TO, 
						new InternetAddress("user@qq.com"));

        // 邮件标题
        message.setSubject("带附件的邮件");

        MimeBodyPart text = new MimeBodyPart();
        text.setContent("这里是邮件正文内容<br>这个邮件还有一个附件，请查收！", 
						"text/html;charset=utf-8");

        MimeBodyPart attach = new MimeBodyPart();
        DataHandler dh = new DataHandler(new FileDataSource("src/光辉岁月.mp3"));
        attach.setDataHandler(dh);
        attach.setFileName(MimeUtility.encodeText(dh.getName()));

        MimeMultipart mm = new MimeMultipart();
        mm.addBodyPart(text);
        mm.addBodyPart(attach);
        mm.setSubType("mixed");

        message.setContent(mm);
        message.saveChanges();
        return message;
    }
}
```

### 发送带图片和附件的邮件
```java
public class ComplexMail {

    public static void main(String[] args) throws Exception{
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.163.com");
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.setProperty("mail.smtp.auth", "true");

        // 创建session
        Session session = Session.getInstance(prop);
        // 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
        session.setDebug(true);

        // 创建邮件
        Message message = createComplexMessage(session);


        // 通过session得到transport对象
        Transport ts = session.getTransport();

        // 连上邮件服务器
        ts.connect("user@163.com", "password");

        // 发送邮件
        ts.sendMessage(message, message.getAllRecipients());
        ts.close();
    }

    private static Message createComplexMessage(Session session) throws Exception {
		MimeMessage message = new MimeMessage(session);

        // 发件人
        message.setFrom(new InternetAddress("user@163.com"));

        // 收件人
        message.setRecipient(Message.RecipientType.TO, 
						new InternetAddress("user@qq.com"));

        // 邮件标题
        message.setSubject("复杂的邮件");

        // 邮件正文数据
        MimeBodyPart text = new MimeBodyPart();
        text.setContent("这里是邮件正文内容，下面是一张图片：<br>" + 
						"<img src='cid:1.jpg'><br/>这个邮件还有附件，请查收！",
						"text/html;charset=utf-8");

        // 邮件图片数据
        MimeBodyPart image = new MimeBodyPart();
        image.setDataHandler(new DataHandler(new FileDataSource("src/1.jpg")));
        image.setContentID("1.jpg");

        // 正文和图片的关系
        MimeMultipart content = new MimeMultipart();
        content.addBodyPart(text);
        content.addBodyPart(image);
        content.setSubType("related");

        // 将正文和附件的MimeMultipart封装到MimeBodyPart中
        MimeBodyPart mbp = new MimeBodyPart();
        mbp.setContent(content);

        // 附件数据
        MimeBodyPart attach = new MimeBodyPart();
        DataHandler dh = new DataHandler(new FileDataSource("src/光辉岁月.mp3"));
        attach.setDataHandler(dh);
        attach.setFileName(MimeUtility.encodeText(dh.getName()));

        // 附件数据2
        MimeBodyPart attach1 = new MimeBodyPart();
        DataHandler dh1 = new DataHandler(new FileDataSource("src/盖伦特.mp3"));
        attach1.setDataHandler(dh1);
        attach1.setFileName(MimeUtility.encodeText(dh1.getName()));

        // 描述关系
        MimeMultipart mm = new MimeMultipart();
        mm.addBodyPart(mbp);
        mm.addBodyPart(attach);
        mm.addBodyPart(attach1);
        mm.setSubType("mixed");

        message.setContent(mm);
        message.saveChanges();
        return message;
    }
}
```
