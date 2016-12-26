# Base64算法

* jdk默认实现方式
* Commons Codec
* Bouncy Costle

## jdk默认实现方式
```java
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class BASE64Util {

	public static String jdkEncode (String str) {
		BASE64Encoder encoder = new BASE64Encoder();
		String result = encoder.encode(str.getBytes());
		return result;
	}
	
	public static String jdkDecode (String str) {
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] buff;
		try {
			buff = decoder.decodeBuffer(str);
			return new String(buff);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args) {
		String str = "申锦祥";
		String encode = BASE64Util.jdkEncode(str);
		System.out.println(encode);
		String decode = BASE64Util.jdkDecode(encode);
		System.out.println(decode);
	}
}
```

## Commons Codec方式
涉及到的jar包：commons-codec-1.10.jar
```java
import org.apache.commons.codec.binary.Base64;

public class BASE64Util {

	public static String CommonsCodecEncode(String str) {
		byte[] bf = Base64.encodeBase64(str.getBytes());
		return new String(bf);
	}
	
	public static String CommonsCodecDecode (String str) {
		byte[] buff = Base64.decodeBase64(str.getBytes());
		try {
			return new String(buff, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
```

## Bouncy Costle方式
涉及到的叫jar包:

1. bcprov-jdk15on-149.jar
2. bcprov-ext-jdk15on-149.jar

```java
import org.bouncycastle.util.encoders.Base64;

public class BASE64Util {

	public static String BoucyCostleEncode(String str) {
		byte[] bf = Base64.encode(str.getBytes());
		return new String(bf);
	}
	
	public static String BouncyCostleDecode(String str) {
		byte[] bf = Base64.decode(str);
		return new String (bf);
	}
	
}
```
