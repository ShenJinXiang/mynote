# java命令行构建

## 不在包中的java文件
### 文件结构
```
demo
└-- HelloWorld.java
```

内容：
```java
public class HelloWorld {

	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
```

### 编译

```sh
$ javac HelloWorld.java
```

编译后的文件结构：

```
demo
|-- HelloWorld.class
└-- HelloWorld.class
```

### 运行
```sh
$ java HelloWorld
Hello World!
```

### 生成jar包：
```sh
$ jar -cvfe hello.jar HelloWorld HelloWorld.class
已添加清单
正在添加: HelloWorld.class(输入 = 426) (输出 = 288)(压缩了 32%)
```

文件结构：
```
demo
|-- HelloWorld.class
|-- HelloWorld.java
└-- hello.jar
```

> -c  创建新档    
> -v  在标准输出中生成详细输出    
> -f  指定档案文件名    
> -e  为捆绑到可执行 jar 文件的独立应用程序指定应用程序入口点       

### 运行jar包
```
$ java -jar hello.jar
Hello World!
```

## 在包中的java文件
### 文件结构
```
demo
|-- bin
└-- src
    └-- com
        └-- shenjinxiang
            |-- demo
            |   └-- Demo.java
            └-- entity
                └-- Person.java
```

文件`src/com/shenjinxiang/entity/Person.java`内容：

```java
package com.shenjinxiang.entity;

public class Person {

	private String name;
	private int age;
	private String address;

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getAge() {
		return this.age;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress() {
		return this.address;
	}

}
```

文件`src/com/shenjinxiang/demo/Demo.java`内容：

```java
package com.shenjinxiang.demo;

import com.shenjinxiang.entity.Person;

public class Demo {

	public static void main(String[] args) {
		Person person = new Person();
		person.setName("张三");
		person.setAge(22);
		person.setAddress("北京");
		System.out.println("姓名：" + person.getName());
		System.out.println("年龄：" + person.getAge());
		System.out.println("地址：" + person.getAddress());
	}
}
```

### 编译
```sh
$ javac src/com/shenjinxiang/demo/Demo.java -sourcepath src/ -d bin/ 
```

> -sourcepath <路径>           指定查找输入源文件的位置    
> -d <目录>                    指定放置生成的类文件的位置    

编译后的文件结构：
```
demo
|-- bin
|   └-- com
|       └-- shenjinxiang
|           |-- demo
|           |   └-- Demo.class
|           └-- entity
|               └-- Person.class
└-- src
    └-- com
        └-- shenjinxiang
            |-- demo
            |   └-- Demo.java
            └-- entity
                └-- Person.java
```

### 运行
```sh
$ cd bin/
$ java com.shenjinxiang.demo.Demo
姓名：张三
年龄：22
地址：北京
```

### 生成jar包
```sh
$ jar -cvfe person.jar com.shenjinxiang.demo.Demo com/
已添加清单
正在添加: com/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/demo/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/demo/Demo.class(输入 = 977) (输出 = 603)(压缩了 38%)
正在添加: com/shenjinxiang/entity/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/entity/Person.class(输入 = 709) (输出 = 370)(压缩了 47%)
```

### 运行jar包
```sh
$ java -jar person.jar 
姓名：张三
年龄：22
地址：北京
```

## 使用jar包后的java文件
先写一个简单的工具类StrKit，生成jar包
### 构建strkit.jar
文件结构：
```
demo
|-- bin
└-- src
    └-- com
        └-- shenjinxiang
            └-- util
                └-- StrKit.java
```

文件`src/com/shenjinxiang/util/StrKit.java`的内容：
```java
package com.shenjinxiang.util;

public class StrKit {

	public static boolean isBlank(String str) {
		return (null == str) || ("".equals(str.trim()));
	}
}
```

编译：
```sh
$ javac src/com/shenjinxiang/util/StrKit.java -sourcepath src/ -d bin/
```

生成jar包：
```sh
$ cd bin/
$ jar -cvf strkit.jar *
已添加清单
正在添加: com/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/util/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/util/StrKit.class(输入 = 442) (输出 = 307)(压缩了 30%)
```

### 编写运行文件

结构：
```
demo
|-- bin
|-- lib
|   └-- strkit.jar
└-- src
    └-- com
        └-- shenjinxiang
            └-- demo
                └-- StrKitTest.java
```

文件`src/com/shenjinxiang/demo/StrKitTest.java`的内容：
```java
package com.shenjinxiang.demo;

import com.shenjinxiang.util.StrKit;

public class StrKitTest {

	public static void main(String[] args) {
		System.out.println("\"\"是空吗？" + StrKit.isBlank(""));
		System.out.println("\"123\"是空吗？" + StrKit.isBlank("123"));
		System.out.println("null是空吗？" + StrKit.isBlank(null));
	}
}
```

### 编译
```sh
$ javac src/com/shenjinxiang/demo/StrKitTest.java -sourcepath src/ -d bin -cp lib/strkit.jar 
```

编译后文件结构
```
demo
|-- bin
|   └-- com
|       └-- shenjinxiang
|           └-- demo
|               └-- StrKitTest.class
|-- lib
|   └-- strkit.jar
└-- src
    └-- com
        └-- shenjinxiang
            └-- demo
                └-- StrKitTest.java
```

### 运行
```sh
java -cp lib/strkit.jar:bin com.shenjinxiang.demo.StrKitTest
""是空吗？true
"123"是空吗？false
null是空吗？true
```

### 生成jar包
```
$cd bin/
$ jar -cvfe strTest.jar com.shenjinxiang.demo.Str
KitTest *
已添加清单
正在添加: com/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/.DS_Store(输入 = 6148) (输出 = 225)(压缩了 96%)
正在添加: com/shenjinxiang/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/demo/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: com/shenjinxiang/demo/StrKitTest.class(输入 = 860) (输出 = 493)(压缩了 42%)
正在添加: com/shenjinxiang/.DS_Store(输入 = 6148) (输出 = 197)(压缩了 96%)
```

### 运行jar包
```
$ java -Djava.ext.dirs=../lib/ -jar strTest.jar 
""是空吗？true
"123"是空吗？false
null是空吗？true
```
