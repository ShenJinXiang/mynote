# temp
```java
public class BookFacadeCglib implements MethodInterceptor {

    private Object target;

    public Object getInstance(Object target) {
        this.target = target;
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(this.target.getClass());
        // 回调方法
        enhancer.setCallback(this);
        // 创建代理对象
        return enhancer.create();
    }

    @Override
    // 回调方法
    public Object intercept(Object obj, Method method, Object[] args,
                            MethodProxy proxy) throws Throwable {
        System.out.println("事物开始");
        String methodName = method.getName();
        System.out.println("方法名称:" + methodName);
        proxy.invokeSuper(obj, args);
        System.out.println("事物结束");
        return null;
    }


}


	public static void main(String[] args) {
        BookFacadeImpl bookFacade = (BookFacadeImpl) new BookFacadeCglib().getInstance(new BookFacadeImpl());
        bookFacade.addBook();
    }
```
