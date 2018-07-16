# 用私有构造器或者枚举类型强化Signleton属性
Singleton 值仅仅被实例一次的类。Singleton 通常被用来代表那些本质上唯一的系统组件，比如窗口管理器或者文件系统。使类成为Singleton会使它的客户端测试变的十分困难，因为无法给Singleton替换模拟实现，除非它实现了一个充当其类型的接口。

在Java 1.5发行版本之前，实现Singleton有两种方法。这两张方法都要把构造器保持为私有的，并导出共有静态成员，以便运行客户端能够访问该类的唯一实例。在第一种方法中有个静态成员是个final域：
```java
// Singleton with public final field
public class Elvis {
	public static final Elvis INSTANCE
}
```
