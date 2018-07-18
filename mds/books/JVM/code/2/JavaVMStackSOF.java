/**
 * 虚拟机栈和本地方法栈 OOM 测试
 * VM Args: -Xss256k
 * -Xss 参数减少栈内存容量
 *  定义大量本地变量，增加方法栈帧中本地变量表长度
 */
public class JavaVMStackSOF {
	private int stackLength = 1;

	public void stackLeak() {
		double 
			a0 = 0.0, a1 = 0.1, a2 = 0.2, a3 = 0.3, a4 = 0.4,
			a5 = 0.5, a6 = 0.6, a7 = 0.7, a8 = 0.8, a9 = 0.9;
		long 
			b0 = 10L, b1 = 11L, b2 = 12L, b3 = 13L, b4 = 14L,
			b5 = 15L, b6 = 16L, b7 = 17L, b8 = 18L, b9 = 19L;
		stackLength++;
		stackLeak();
	}

	public static void main(String[] args) throws Throwable {
		JavaVMStackSOF oom = new JavaVMStackSOF();
		try {
			oom.stackLeak();
		} catch (Throwable e) {
			System.out.println("stack length: " + oom.stackLength);
			throw e;
		}
	}
}
