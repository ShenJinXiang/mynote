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

