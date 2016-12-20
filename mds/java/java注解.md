# java注解
注解（Annotation），也叫元数据。一种代码级别的说明。它是JDK1.5及以后版本引入的一个特性，与类、接口、枚举是在同一个层次。它可以声明在包、类、字段、方法、局部变量、方法参数等的前面，用来对这些元素进行说明，注释, 可以替换xml配置文件

## jdk中常见的注解
* @Override 限定重写父类方法，只能用于方法上
* @Deprecated 用于表示某个程序元素(类、方法等)已过时
* @SuppressWarnings 抑制编译器警告

## 按运行机制分类
* 源码注解 注解只能在源码中存在，编译成class文件就不存在了
* 编译时注解 在class文件中仍存在
* 运行时注解 在运行阶段还气作用，甚至会影响运行逻辑的注解

## 自定义注解
java中使用```@interface```申明注解, 定义注解的格式：

> public @interface 注解名{定义体}

**代码示例**
```java
public @interface MyAnnotation1 {
	// 零个或多个属性
}
```

### 注解的属性
注解中可以带属性，比如定义包含name和age属性的注解，如下：
```java
public @interface MyAnnotation {

    String name() default "hello";
    int age();
}
```

使用方式：
```java
@MyAnnotation(name = "ZhangSan", age = 18)
public void test() {
    // do something
}
```

1. 注解中的成员属性的数量可以是0个、1个或者多个，如果没有成员属性，则成该注解为标记注解
2. 如果注解中只有一个成员属性，可以将其属性名称设置为value，在使用该注解的时候，不需要制定属性名
3. 注解可以设置默认值，如上例中的name属性设置了默认值“hello”
4. 成员属性的类型并不是随意的，类型范围有：

* String类型
* java中的基本类型
* Class类型
* 枚举类型
* 注解类型
* 以上类型的一维数组

## 元注解
元注解是指用来修饰注解的注解
### @Target
@Target用来描述Annotation作用的元素范围，如果没有申明，则默认可以用在任一程序元素上。 @Target的源码：
```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Target {
    ElementType[] value();
}
```
可以看到@Target注解只有一个成员属性value，所以在使用时，可以省略属性名称，同时value的类型是ElementType的一维数组，查看ElementType源码：
```java
public enum ElementType {
    TYPE, // 用于描述类、接口(包括注解)、枚举

    FIELD, // 用于描述字段 (包括枚举中的字段)

    METHOD, // 用于描述方法

    PARAMETER, // 用于描述参数

    CONSTRUCTOR, // 用于描述构造方法

    LOCAL_VARIABLE, // 用于描述局部变量

    ANNOTATION_TYPE, // 用于描述注解

    PACKAGE, // 用于描述包

    TYPE_PARAMETER, 

    TYPE_USE
}
```
接下来就可以使用了, 可以根据实际情况，设置注解使用的范围
```java
@Target({ElementType.TYPE, ElementType.FIELD, ElementType.METHOD})
public @interface MyAnnotation {

    String value();
}
```

### @Retention
@Retention指示注释类型的注释要保留多久,即用来描述注解的作用域，java源代码 --- class文件 --- 运行时
```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Retention {

    RetentionPolicy value();
}
```
@Retention同样只有一个成员属性value，类型为RetentionPolicy，查看源码可以知道RetentionPolicy是一个枚举，源码为：
```java
public enum RetentionPolicy {
    SOURCE, // 在源文件中有效, 即.java文件中有效
	
	CLASS, // 在class文件中有效(默认值)
		
	RUNTIME // 在运行时有效
}
```
如果不对@Retention进行设置，默认值为RetentionPolicy.CLASS。通常，我们需要通过反射技术对注解做一些逻辑处理，那么需要将值设定为RetentionPolicy.RUNTIME

### @Inherited
@Inherited注解用于描述被标注的类型是可以继承的，如果一个使用了@Inherited修饰的Annotation类型被用于一个class，则这个Annotation将被用于该class的子类 @Inherited的源码：
```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Inherited {
}
```
Inherited注解没有属性，是一个标记注解

**简单的例子**

定义两个注解Annotation1和Annotation2，声明两个类Person和Student，Student继承自Person类，Annotation1设置为@Inherited标记
```java
// Annotation1.java
@Inherited
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Annotation1 {

}

// Annotation2.java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Annotation2 {

}

// Person.java
@Annotation1
public class Person {

}

// Student.java
@Annotation2
public class Student extends Person{

}
```

*测试代码*
```java
@Test
public void test3() {
	Class personClass = Person.class;
	Annotation[] pas = personClass.getAnnotations();
	System.out.println("Person 类的注解有：");
	for(Annotation anno : pas) {
		System.out.println(anno.annotationType().getName());
	}
	Class studentClass = Student.class;
	Annotation[] sas = studentClass.getAnnotations();
	System.out.println("Student 类的注解有：");
	for(Annotation anno : sas) {
		System.out.println(anno.annotationType().getName());
	}
}
```

*运行结果:*
```
Person 类的注解有：
com.shenjinxiang.annotation.Annotation1
Student 类的注解有：
com.shenjinxiang.annotation.Annotation1
com.shenjinxiang.annotation.Annotation2
```

### @Documented
@Documented用于描述其它类型的annotation应该被作为被标注的程序成员的公共API，因此可以被例如javadoc此类的工具文档化。Documented是一个标记注解，没有成员,源码如下：
```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Documented {
}
```

## 解析注解
通常，我们需要通过反射技术解析注解，首先要获取需要解析的类、字段或方法，然后获取到注解实例，得到注解的属性值，从而做一些逻辑处理

### Annotation接口
此接口中涉及到的方法主要有：annotationType

```java
Class<? extends Annotation> annotationType();
```

### Class类
Class类涉及到的方法主要有：getAnnotation, isAnnotationPresent, getAnnotations, getDeclaredAnnotations
```java
// 如果存在该元素的指定类型的注解，则返回这些注释，否则返回 null
public <A extends Annotation> A getAnnotation(Class<A> annotationClass)

// 如果指定类型的注解存在于此元素上，则返回 true，否则返回 false
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)

// 返回此元素上存在的所有注解 如果此元素没有注释，则返回长度为零的数组
public Annotation[] getAnnotations()

// 返回直接存在于此元素上的所有注解，忽略继承的注解
// 如果没有注解直接存在于此元素上，则返回长度为零的一个数组
public Annotation[] getDeclaredAnnotations()
```

### Field类
Filed类涉及到的方法主要有：getAnnotation, getDeclaredAnnotations
```java
// 如果存在该元素的指定类型的注释，则返回这些注释，否则返回 null
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)

// 返回直接存在于此元素上的所有注释，忽略继承的注释 
// 如果没有注释直接存在于此元素上，则返回长度为零的一个数组
public Annotation[] getDeclaredAnnotations()
```

### Method类
Method类中涉及到的方法主要有：getAnnotation, getDeclaredAnnotations, getParameterAnnotations
```java
// 如果存在该元素的指定类型的注释，则返回这些注释，否则返回 null
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)

// 返回直接存在于此元素上的所有注释，忽略继承的注释 
// 如果没有注释直接存在于此元素上，则返回长度为零的一个数组
public Annotation[] getDeclaredAnnotations()

// 返回表示按照声明顺序对此 Method 对象所表示方法的形参进行注释的那个数组的数组
public Annotation[][] getParameterAnnotations()
```
