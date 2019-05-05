# itextpdf
参考博客：https://www.cnblogs.com/liaojie970/p/7132475.html

## maven引入
```xml
<dependency>
	<groupId>com.itextpdf</groupId>
	<artifactId>itextpdf</artifactId>
	<version>5.5.10</version>
</dependency>
```

## 生成PDF
```java
String path = "e:\\temp\\pdf1.pdf";
File file = new File(path);
OutputStream outputStream = new FileOutputStream(file);
Document document = new Document();
PdfWriter pdfWriter = PdfWriter.getInstance(document, outputStream);
document.open();
document.add(new Paragraph("shenjinxiang"));
document.close();
```

## 设置页面大小、背景色、边距以及标题、作者等属性
```java
// 页面大小
Rectangle rect = new Rectangle(PageSize.B5);
// 背景色
rect.setBackgroundColor(BaseColor.GRAY);
Document document = new Document(rect);
// 边距
document.setMargins(10, 10, 20, 20);
// 文档属性
document.addTitle("shenjinxiang_pdf");
document.addAuthor("shenjinxiang");
document.addSubject("shenjinxiang.com");
document.addKeywords("shenjinxiang pdf");
document.addCreator("www.shenjinxiang.com");
PdfWriter pdfWriter = PdfWriter.getInstance(document, outputStream);
// pdf版本
pdfWriter.setPdfVersion(PdfWriter.PDF_VERSION_1_2);
document.open();
document.add(new Paragraph("shenjinxiang"));
document.close();
```

## 设置密码
```java
pdfWriter.setEncryption("shen".getBytes(), "jinxiang".getBytes(),
                PdfWriter.ALLOW_SCREENREADERS,
                PdfWriter.STANDARD_ENCRYPTION_128);
```
此处需依赖其他jar，访问[http://mvnrepository.com/artifact/com.itextpdf/itextpdf/](http://mvnrepository.com/artifact/com.itextpdf/itextpdf/)，查看依赖库

依赖项配置：
```xml
<dependency>
	<groupId>org.apache.santuario</groupId>
	<artifactId>xmlsec</artifactId>
	<version>1.5.1</version>
</dependency>

<dependency>
	<groupId>org.bouncycastle</groupId>
	<artifactId>bcprov-jdk15on</artifactId>
	<version>1.49</version>
</dependency>

<dependency>
	<groupId>org.bouncycastle</groupId>
	<artifactId>bcpkix-jdk15on</artifactId>
	<version>1.49</version>
</dependency>
```

## 添加页面
```java
document.open();
document.add(new Paragraph("shenjinxiang"));
document.newPage();
document.add(new Paragraph("page2"));
document.newPage();
document.add(new Paragraph("shenjinxiang"));
document.close();
```
