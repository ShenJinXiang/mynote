# java 命令行

## 编译并运行没有package的java文件
创建目录`demo`，并切换到`demo`：
```sh
$ mkdir demo
$ cd demo
```

在此目录中编写简单的java程序，`HelloWorld.java`:
```sh
$ vim HelloWorld.java
```

```java
public class HelloWorld {

	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
```

编译：
```sh
$ javac HelloWorld.java
```

生成`HelloWorld.class`文件，运行：
```sh
$ java HelloWorld
```

结果：
```
Hello World!
```

## 编译package中的java文件
在`demo`目录中创建两个文件夹，`src`和`bin`:

```sh
$ mkdir src bin
```

在`src`目录中编写源文件：`com/shenjinxiang/demo/HelloWorld.java`，先创建包：
```sh
$ mkdir -p src/com/shenjinxiang/demo
```

编辑：
```sh
$ vim src/com/shenjinxiang/demo/HelloWorld.java
```

```java
package com.shenjinxiang.demo;

public class HelloWorld {

	public static void main(String[] args) {
		System.out.println("************************************");
		System.out.println("************************************");
		System.out.println("************Hello World!************");
		System.out.println("************************************");
		System.out.println("************************************");
	}
}
```

编译：
```sh
$ javac src/com/shenjinxiang/demo/HelloWorld.java -d bin/
```

> -d 表示编译到bin目录下

运行：
```sh
$ cd bin
$ java com.shenjinxiang.demo.HelloWorld
```

运行结果：
```
************************************
************************************
************Hello World!************
************************************
************************************
```

## 编译多个类
