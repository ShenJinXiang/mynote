# 用私有构造器或者枚举类型强化Singleton属性
Singleton 值仅仅被实例一次的类。Singleton 通常被用来代表那些本质上唯一的系统组件，比如窗口管理器或者文件系统。使类成为Singleton会使它的客户端测试变的十分困难，因为无法给Singleton替换模拟实现，除非它实现了一个充当其类型的接口。

在Java 1.5发行版本之前，实现Singleton有两种方法。这两张方法都要把构造器保持为私有的，并导出共有静态成员，以便运行客户端能够访问该类的唯一实例。在第一种方法中有个静态成员是个final域：
```java
// Singleton with public final field
public class Elvis {
	public static final Elvis INSTANCE
}
```
私有构造器仅被调用一次，用来实例化公有的静态`final`域`Elvis.INSTANCE`。由于缺少公有或者受保护的构造器，所以保证了`Elvis`的全局唯一性：一旦`Elvis`类被实例化，只会存在一个`Elvis`实例，不多也不少。客户端的任何行为都不会改变这一点，但要提醒一点：享有特权的客户端可以借助`AccessibleObject.setAccessible`方法，通过反射机制调用私有构造器。如果需要抵制这种攻击，可以修改构造器，让它在被要求创建第二个实例的时候抛出异常。

在实现`Singleton`的第二种方法中，公有的成员是个静态工厂方法：
```java
// Signleton with static factory
public class Elvis {
	private static final Elvis INSTANCE = new Elvis();
	private Elvis() { }
	public static Elvis getInstance() {
		return INSTANCE;
	}

	public void leaveTheBuilding() {
		// ...
	}
}
```

对于静态方法`Elvis.getInstance`的所有调用，都会返回同一个对象引用，所以，永远不会创建其他的`Elvis`实例。

公有域方法的主要好处在于，组成类的成员的声明很清楚地表明了这个类是一个`Signleton`：公有静态域是`final`的，所以该域总是包含相同的对象引用。公有域方法在性能上不再有任何优势：现代的JVM实现几乎都能够将静态工厂方法的调用内联化。

工厂方法的优势之一在于，它提供了灵活性：在不改变其API的前提下，我们可以改变该类是否应该为`Signleton`的想法。工厂方法返回该类的唯一实例，但是，它很容易被修改，比如改称为每个调用该方法的线程返回一个唯一的实例。第二个优势域泛型有关，这些优势之间通常都不想管，`public`域的方法比较简单。

为了使利用这其中一种方法实现的`Singleton`类编程是可序列化的，仅仅声明上`implements Serializable` 是不够的。为了维护并保证`Singleton`，必须声明所有实例域都是瞬时的，并提供了一个`readResolve`方法。否则，每次反序列化的实例时，都会创建一个新的实例，比如说，在我们的例子中，会导致“假冒的Elvis”。为了防止这种情况，要在`Elvis`类中加入下面这个`readResolve`方法：
```java
// readResolve method to preseve singleton property
private Object readResolve() {
	// Return the one true Elvis and let the garbage collector
	// take care of the Elvis impersonator.
	return INSTANCE;
}
```

从Java 1.5f发行版本起，实现`Singleton`还有第三种方法。只需编写一个包含单个元素的枚举类型：
```java
// Enum singleton - the preferred approach
public enum Elvis {
	INSTANCE;

	public void leaveTheBuilding() {
		// ...
	}
}
```

这种方法在功能上与公有域方法相近，但是它更加简洁，无偿地提供了序列化机制，绝对防止多次实例化，即使是面对复杂的序列化或者反射攻击的时候。虽然这种方法还没有广泛采用，但是单元素的枚举类型已成成为实现Singleton的最佳方法。
