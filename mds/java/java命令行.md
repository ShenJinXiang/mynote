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

在`src`目录中编写源文件：`com/shenjinxiang/demo/HelloWorld.java`， 编辑：
```sh
$ mkdir -p src/com/shenjinxiang/demo
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

demo文件下目录结构：
```
|-- bin
|   └-- com
|       └-- shenjinxiang
|           └-- demo
|               └-- HelloWorld.class
└-- src
    └-- com
        └-- shenjinxiang
            └-- demo
                └-- HelloWorld.java
```
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
在`demo`目录中创建src和bin目录
```sh
$ mkdir src bin
```

编写源代码，文件结果如下：
```
|-- bin
└-- src
    └-- com
        └-- shenjinxiang
            |-- demo
            |   └-- StudentDemo.java
            └-- entity
                └-- Student.java
```

其中`src/com/shenjinxiang/entity/Student.java`的代码为：
```java
package com.shenjinxiang.entity;

public class Student {

	private String name;
	private int age;
	private String address;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
```

测试文件`src/com/shenjinxiang/demo/StudentDemo.java`代码为：
```java
package com.shenjinxiang.demo;

import com.shenjinxiang.entity.Student;

public class StudentDemo {

	public static void main(String[] args) {
		Student student = new Student();
		student.setName("张三丰");
		student.setAge(149);
		student.setAddress("武当山");
		System.out.println("姓名：" + student.getName());
		System.out.println("年龄：" + student.getAge());
		System.out.println("地址：" + student.getAddress());
	}
}
```

编译：
```
$ javac src/com/shenjinxiang/demo/StudentDemo.java -sourcepath src -d bin
```

> -sourcepath 表示 从指定的源文件目录位置

此时demo下目录结构：
```
|-- bin
|   └-- com
|       └-- shenjinxiang
|           |-- demo
|           |   └-- StudentDemo.class
|           └-- entity
|               └-- Student.class
└-- src
    └-- com
        └-- shenjinxiang
            |-- demo
            |   └-- StudentDemo.java
            └-- entity
                └-- Student.java
```

运行程序：
```sh
$ cd bin/
$ java com.shenjinxiang.demo.StudentDemo
```

运行结果：
```
姓名：张三丰
年龄：149
地址：武当山
```

## 单文件生成jar包
在`demo`目录中编写简单的`HelloWorld.java`文件：
```java
public class HelloWorld {

	public static void main(String[] args) {
		System.out.println("hello world!");
	}
}
```

编译成`class`文件：
```
$ javac HelloWorld.jar
```

运行class文件：
```sh
$ java HelloWorld
hello world!
```

生成jar包：
```
$ jar -cvf hello.jar HelloWorld
```

> -c  创建新档案
> -v  在标准输出中生成详细输出
> -f  指定档案文件名

运行jar文件：

```
$ java -jar hello.jar
hello.jar中没有主清单属性
```

这是因为没有指定入口程序，即`main`方法地址，所以重新生成：

```
$ jar -cvfe hello.jar HelloWorld HelloWorld.class
```
        
> -e 为捆绑到可执行 jar 文件的独立应用程序指定应用程序入口点

可以看到生成的jar中的`META-INF/MANIFEST.MF`文件中多了`Main-Class` 这个参数 指定的就是main方法的地址

运行生成的jar包：
```
$ java -jar hello.jar
hello world!
```

## 多文件生成jar包
多文件生成jar包的方法和单文件是一样的，看个简单的例子：读取properties配置文件内容，通过setter方法设置在实体类中，然后同个getter方法获取并打印内容。`demo`中创建两个目录`src`和`bin`，源代码文件结果如下：
```
|-- bin
└-- src
    |-- com
    |   └-- shenjinxiang
    |       |-- demo
    |       |   └-- MyDemo.java
    |       |-- entity
    |       |   └-- Person.java
    |       └-- utils
    |           └-- Prop.java
    └-- config
        └-- Config.properties
```

文件`src/com/shenjinxiang/utils/prop.java`代码：
```java
package com.shenjinxiang.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

public class Prop {

	private Properties properties = null;
	private static final String DEFAULT_ENCODING = "UTF-8";

	public Prop(String fileName) {
		this(fileName, DEFAULT_ENCODING);
	}

	public Prop (String filename, String encoding) {
		InputStream inputStream = null;
		
		try {
			inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(filename);
			if (inputStream == null) {
				throw new IllegalArgumentException("未找到properties文件：" + filename);
			}
			properties = new Properties();
			properties.load(new InputStreamReader(inputStream, encoding));
		} catch (IOException e) {
			throw new RuntimeException("加载文件失败：" + filename, e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public String get (String key) {
		return this.properties.getProperty(key);
	}
	
	public String get (String key, String defaultValue) {
		return this.properties.getProperty(key, defaultValue);
	}
}
```

文件`src/com/shenjinxiang/entity/Person.java`代码：
```java
package com.shenjinxiang.entity;

public class Person {

	private String name;
	private int age;
	private String address;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
```

文件`src/com/shenjinxiang/demo/MyDemo.java`代码：
```java
package com.shenjinxiang.demo;

import com.shenjinxiang.utils.Prop;
import com.shenjinxiang.entity.Person;

public class MyDemo {

	public static void main(String[] args) {
		Prop prop = new Prop("config/Config.properties");
		Person person = new Person();
		person.setName(prop.get("name"));
		person.setAge(Integer.valueOf(prop.get("age")));
		person.setAddress(prop.get("address"));
		System.out.println("name: " + person.getName());
		System.out.println("age: " + person.getAge());
		System.out.println("address: " + person.getAddress());
	}
}
```

配置文件`config/Config.properties`文件：
```
name = 诸葛亮
age = 26
address = 南阳
```

编译源代码：
```sh
$ javac src/com/shenjinxiang/demo/MyDemo.java -sourcepath src/ -d bin/
```

复制配置文件到bin目录中：
```sh
cp -rp src/config/ bin/config
```

运行文件：
```
$ java com.shenjinxiang.demo.MyDemo
name: 诸葛亮
age: 26
address: 南阳
```

生成jar包：
```sh
$ jar -cvfe demo.jar com.shenjinxiang.demo.MyDemo *
```

运行jar包：
```sh
$ java -jar demo.jar
name: 诸葛亮
age: 26
address: 南阳
```

# 编译带jar包的文件
情况`demo`目录的所有文件，分别创建`src`，`bin`，`lib`目录
```sh
$ mkdir src bin lib
```

