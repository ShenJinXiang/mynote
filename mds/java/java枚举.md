# java枚举

## 枚举的作用
一些程序在运行时，需要的数据不能是任意的，必须是一定范围内的值，jdk5以前采用自定义类来解决，jdk5以后采用枚举，采用```enum```关键字来定义一个枚举类

## 简单的枚举

比如针对分数，可以用A、B、C、D、E五个档次来表示考试分数的好坏，jdk1.5之前的实现方式：

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

## 自定义构造函数、字段和方法
我们可以自定义枚举的构造函数、方法和字段，去封装更多的信息

同样是分数的例子，简单的A、B、C很难给人直观表示，我们希望知道每个档次对应的分数范围，代码如下

**jdk1.5之前**
```java
public class Grade {

	private String value;
	
	private Grade (String value) {
		this.value = value;
	}
	
	public static final Grade A = new Grade("90 - 100");
	public static final Grade B = new Grade("80 - 89");
	public static final Grade C = new Grade("70 - 79");
	public static final Grade D = new Grade("60 - 69");
	public static final Grade E = new Grade("0 - 59");
	
	@Override
	public String toString() {
		return this.value;
	}
	
}
```

等价于
```java
public enum Grade {

	A("90 - 100"), 
	B("80 - 89"), 
	C("70 - 79"), 
	D("60 - 69"), 
	E("0 - 59");
	
	private String value;
	
	private Grade (String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return this.value;
	}
	
}
```

## 带抽象方法的枚举
同样是分数的例子，对于我们平时的习惯，不是用A、B、C来区分成绩的，而是用：“优”、“良”、“一般”、“差”、“不及格”这样来说明的，很简单再申明一个成员变量来记录：
```java
public class Grade {
	
	private String value;
	private String localValue;
	
	private Grade (String value, String localValue) {
		this.value = value;
		this.localValue = localValue;
	}
	
	public static final Grade A = new Grade("90 - 100", "优"); 
	public static final Grade B = new Grade("80 - 89", "良"); 
	public static final Grade C = new Grade("70 - 79", "一般"); 
	public static final Grade D = new Grade("60 - 69", "差"); 
	public static final Grade E = new Grade("0 - 59", "不及格");

	@Override
	public String toString() {
		return this.value;
	} 
	
	public String toLocalString() {
		return this.localValue;
	}
	
}
```

我们同样可以使用抽象方法的方式来实现：
```java
public abstract class Grade {

	private String value;
	
	private Grade (String value) {
		this.value = value;
	}
	
	public static final Grade A = new Grade("90 - 100") {

		@Override
		public String toLocalString() {
			return "优";
		}
		
	};
	public static final Grade B = new Grade("80 - 89") {

		@Override
		public String toLocalString() {
			return "良";
		}
		
	};
	public static final Grade C = new Grade("70 - 79") {
		
		@Override
		public String toLocalString() {
			return "一般";
		}
	};
	public static final Grade D = new Grade("60 - 69") {
		
		@Override
		public String toLocalString() {
			return "差";
		}
	};
	public static final Grade E = new Grade("0 - 59") {
		
		@Override
		public String toLocalString() {
			return "不及格";
		}
	};
	
	@Override
	public String toString() {
		return this.value;
	}
	
	public abstract String toLocalString();
}
```

等价于：
```java
public enum GradeEnum {

	A ("90 - 100") {

		@Override
		public String toLocalString() {
			return "优";
		}
		
	}, 
	B ("80 - 89") {

		@Override
		public String toLocalString() {
			return "良";
		}
		
	}, 
	C ("70 - 79") {

		@Override
		public String toLocalString() {
			return "一般";
		}
		
	}, 
	D ("60 - 69") {

		@Override
		public String toLocalString() {
			return "差";
		}
		
	}, 
	E ("0 - 59") {

		@Override
		public String toLocalString() {
			return "不及格";
		}
		
	};
	
	private String value;
	
	private GradeEnum(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return this.value;
	}
	
	public abstract String toLocalString();
	
}
```

## 枚举的特性
* 特殊形式的java类
* 枚举类中声明的每个枚举值代表枚举类的一个实例对象
* 与java中的普通类一样，在声明枚举时，也可以声明属性、方法、和构造函数，但是枚举的构造函数必须为私有
* 枚举类也可以实现接口、或继承抽象类
* 若枚举类只有一个枚举值，可以当作单例设计模式使用
* swith语句，除了可以接收int、byte、char、short外，还可以接收一个枚举类型
