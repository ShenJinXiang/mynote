# java可变参数
可变参数是java1.5增加的新特性，提供了可以用可变的参数数量调用的方法，**适用于参数个数不确定，类型确定的情况**，java把可变参数当做数组处理

## 简单例子
先看一个简单的例子
```java
public class VarargusTest {
	
	public static void pringArgs(int... is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		pringArgs();
		pringArgs(1, 2);
		pringArgs(11, 22, 33, 44, 55);
	}
}
```

*运行结果:*
```

1 2 
11 22 33 44 55
```

pringArgs方法中的省略号... 是java代码的一部分，表明这个方法可以接收任意数量的int类型的参数，可以是0个也可以是多个数量。可变参数可以当成是一维数组来处理，比如例子中可以用for循环来循环is

## 与数组参数的关系
将程序再改一下，添加一个方法来重载可变参数，看看是否可行
```java
public class VarargusTest {
	
	public static void pringArgs(int... is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}
	
	public static void pringArgs(int[] is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		pringArgs();
		pringArgs(1, 2);
		pringArgs(new int[]{11, 22, 33, 44, 55});
	}
}
```
可以知道，这段代码是没法通过编译的，没法重载，再来一个例子:

```java
public class VarargusTest {
	
	public static void pringArgs(int... is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		pringArgs(new int[]{11, 22, 33, 44, 55});
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
	
	public static void pringArgs(int[] is) {
		for(int i : is) {
			System.out.print(i + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		pringArgs(1, 2); // 编译错误
	}
}
```
直接编译错误了，
