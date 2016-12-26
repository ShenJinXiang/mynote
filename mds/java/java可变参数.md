# java可变参数
可变参数是java1.5增加的新特性，提供了可以用可变的参数数量调用的方法，**适用于参数个数不确定，类型确定的情况**，java把可变参数当做数组处理

## 简单例子
先看一个简单的例子
```java
public class VarargusTest {
	
	public static void printArgs(int... is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		printArgs();
		printArgs(1, 2);
		printArgs(11, 22, 33, 44, 55);
	}
}
```

*运行结果:*
```

1 2 
11 22 33 44 55
```

printArgs方法中的省略号... 是java代码的一部分，表明这个方法可以接收任意数量的int类型的参数，可以是0个也可以是多个数量。可变参数可以当成是一维数组来处理，比如例子中可以用for循环来循环is

## 与数组参数的关系
将程序再改一下，添加一个方法来重载可变参数，看看是否可行
```java
public class VarargusTest {
	
	public static void printArgs(int... is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}
	
	public static void printArgs(int[] is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		printArgs();
		printArgs(1, 2);
		printArgs(new int[]{11, 22, 33, 44, 55});
	}
}
```
可以知道，这段代码是没法通过编译的，没法重载，再来一个例子:

```java
public class VarargusTest {
	
	public static void printArgs(int... is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		printArgs(new int[]{11, 22, 33, 44, 55});
	}
}
```
*运行结果:*
```
11 22 33 44 55 
```

再看另外一个例子:
```java
public class VarargusTest {
	
	public static void printArgs(int[] is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		printArgs(1, 2); // 编译错误
	}
}
```
直接编译错误了，可以看出来，可变参数是兼容数组类参数的，但是数组类参数却无法兼容可变参数

## 可变参数的位置
当方法有多个参数的时候，可变参数需要放在最后位置上
```java
public static void printArgs(int value, int... is) {
		// 代码
}
	
public static void printArgs(int... is, int... is) { // 编辑错误
	// 代码
}
```
同样的道理，一个方法只能申明一个可变参数，如果有两个或两个以上的可变参数，必然有一个不能在最后一个位置，同样会编译错误

## 优先级
我们再看下面这段代码:
```java
public class VarargusTest {
	
	public static void printArgs(int... is) {
		System.out.println("printArgs(int...)");
	}
	
	public static void printArgs(int a, int b) {
		System.out.println("printArgs(int, int)");
	}

	public static void main(String[] args) {
		printArgs();
		printArgs(1, 2);
		printArgs(11, 22, 33);
	}
}
```
*运行结果:*
```
printArgs(int...)
printArgs(int, int)
printArgs(int...)
```

## 总结

* 可变参数只能出现在参数列表的最后
* 一个方法最多有一个可变参数
* 声明可变参数时候的省略号... 位于变量类型和变量名之间，前后有无空格都可以
* 调用可变参数方法时，可变参数隐含创建一个数组，在方法体中一维数组的形式访问可变参数
* 可变参数可以传递任意数量的参数个数，也可以是一个数组
* 如果有能匹配定长的方法，那么优先匹配该方法，还有不定参数的那个重载方法是最后被选中的

我们知道java中的main方法的声明是这样的：
```java
public class VarargusTest {

	public static void main(String[] args) {
		System.out.println("hello world");
	}
}
```

我们也可以写成这样的：
```java
public class VarargusTest {

	public static void main(String... args) {
		System.out.println("hello world");
	}
}
```
