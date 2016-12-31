# java枚举

## 枚举的作用
一些程序在运行时，需要的数据不能是任意的，必须是一定范围内的值，jdk5以前采用自定义类来解决，jdk5以后采用枚举，采用```enum```关键字来定义一个枚举类

```
public class Grade {
	
	private Grade () {
	}

	public static final Grade A = new Grade();
	public static final Grade B = new Grade();
	public static final Grade C = new Grade();
	public static final Grade D = new Grade();
	public static final Grade E = new Grade();
}
```
等价于:
```java
public enum Grade {
	A, B, C, D, E;
}
```
