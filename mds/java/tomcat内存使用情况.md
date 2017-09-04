# Tomcat内存使用情况

## 查看
* tomcat主目录，conf/tomcat-users.xml 文件中，tomcat-users标签中添加
```xml
<role rolename="角色名称"/>
<user username="用户名" password="密码" roles="角色名称"/>
```

* 启动tomcat
* 浏览器访问 ip:port/manager/status 输入设置的用户名和密码，查看内存使用情况

## 设置
```
JAVA_OPTS="-server -Xms256m -Xmx1024m -XX:PermSize=128m -XX:MaxPermSize=256m"
```

解压版tomcat，catalina.bat 或 catalina.sh 文件 
```
set JAVA_OPTS=-Xms512m -Xmx512m -Xss1024k
```
数值分别对应了初始化的最小内存，最大内存，线程内存大小。如果JDK的版本是5.0之后的，线程内存可以不用设置

|参数             |说明                                                                               |
|:---------------:|:----------------------------------------------------------------------------------|
|-Xmx             |Java Heap最大值，默认值为物理内存的1/4                                             |
|-Xms             |Java Heap初始值，Server端JVM最好将-Xms和-Xmx设为相同值，开发测试机JVM可以保留默认值|
|-Xmn             |Java Heap Young区大小，不熟悉最好保留默认值                                        |
|-Xss             |每个线程的Stack大小，不熟悉最好保留默认值                                          |
|-XX:PermSize     |设定内存的永久保存区域                                                             |
|-XX:MaxPermSize  |设定最大内存的永久保存区域                                                         |
|-XX:PermSize     |设定内存的永久保存区域                                                             |
|-XX:NewSize      |设置JVM堆的‘新生代’的默认大小                                                      |
|-XX:MaxNewSize   |设置JVM堆的‘新生代’的最大大小                                                      |
