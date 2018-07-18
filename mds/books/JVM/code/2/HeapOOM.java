/**
 * 测试 Java 堆溢出
 * VM Args: -Xms20m -Xmx20m -XX:+HeapDumpOnOutOfMemoryError
 * 限制java堆大小为20MB，不可扩展（最小值-Xms和最大值-Xmx设置为一样，避免堆自动扩展）
 * -XX:+HeapDumpOnOutOfMemoryError 出现内存溢出异常时Dump出当前的内存堆快照
 */
import java.util.*;

public class HeapOOM {

	static class OOMObject {}

	public static void main(String[] args) {
		List<OOMObject> list = new ArrayList<OOMObject>();

		while (true) {
			list.add(new OOMObject());
		}
	}
}
