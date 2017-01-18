# properties工具类
读取properties配置很简单，jdk提供了`java.util.Properties`类，这里稍作封装，以便项目中直接使用

## ConfigReader
```java
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;


public class ConfigReader extends Properties {

	private static String DEFAULT_ENCODING = "UTF-8";
	private static String FILENAME = "config/config1.properties";
	private static ConfigReader _instance = new ConfigReader();
	
	private ConfigReader () {
		InputStream inputStream = null;
		try {
			inputStream = this.getClass().getClassLoader().getResourceAsStream(FILENAME);
			this.load(new InputStreamReader(inputStream, DEFAULT_ENCODING));
		} catch (IOException e) {
			throw new RuntimeException("加载文件失败：" + FILENAME, e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public static ConfigReader getConfigReader () {
		return _instance;
	}
	
	public String get(String key) {
		return this.getProperty(key);
	}
	
	public String get(String key, String defaultValue) {
		return this.get(key, defaultValue);
	}
	
}
```
可以依据这个来写对应的Config类
```java
public class Config {

	public static final String NAME;
	
	
	static {
		NAME = get("name");
		
	}

	private static String get(String key) {
		return ConfigReader.getConfigReader().get(key);
	}
	
}
```

## Prop 类

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

public class Prop {

	private Properties properties = null;
	private static final String DEFAULT_ENCODING = "UTF-8";
	
	public Prop (String filename) {
		this(filename, DEFAULT_ENCODING);
	}
	
	public Prop (String filename, String encoding) {
		InputStream inputStream = null;
		
		try {
			inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(filename);
			if (inputStream == null) {
				throw new IllegalArgumentException("未找到properties文件：" + filename);
			}
			properties = new Properties();
			properties.load(new InputStreamReader(inputStream, encoding));
		} catch (IOException e) {
			throw new RuntimeException("加载文件失败：" + filename, e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public Prop (File file) {
		this(file, DEFAULT_ENCODING);
	}
	
	public Prop (File file, String encoding) {
		if (file == null) {
			throw new IllegalArgumentException("文件不能为空");
		}
		if (!file.isFile()) {
			throw new IllegalArgumentException("未找到文件：" + file.getName());
		}
		InputStream inputStream = null;
		try {
			inputStream = new FileInputStream(file);
			properties = new Properties();
			properties.load(new InputStreamReader(inputStream, encoding));
		} catch (IOException e) {
			throw new RuntimeException("加载文件失败：" + file.getName(), e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public String get (String key) {
		return this.properties.getProperty(key);
	}
	
	public String get (String key, String defaultValue) {
		return this.properties.getProperty(key, defaultValue);
	}
	
	public Integer getInt (String key) {
		return getInt(key, null);
	}
	
	public Integer getInt (String key, Integer defaultValue) {
		String value = get(key);
		return (value != null) ? Integer.parseInt(value) : defaultValue;
	}
	
	public Long getLong (String key) {
		return getLong(key, null);
	}
	
	public Long getLong (String key, Long defaultValue) {
		String value = get(key);
		return (value != null) ? Long.parseLong(value) : defaultValue;
	}
	
	public Boolean getBoolean (String key) {
		return getBoolean(key, null);
	}
	
	public Boolean getBoolean (String key, Boolean defaultValue) {
		String value = get(key);
		return (value != null) ? Boolean.parseBoolean(value) : defaultValue;
	}
	
	public boolean containsKey (String key) {
		return this.properties.containsKey(key);
	}
	
	public Properties getProperties () {
		return properties;
	}
	
}
```

PropKit类 操作多个Prop
```java
import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class PropKit {

	private static Prop prop = null;
	private static final Map<String, Prop> map = new HashMap<String, Prop>();
	private static final String DEFAULT_ENCODING = "UTF-8";
	
	private PropKit() {}
	
	public static Prop use(String filename) {
		return use(filename, DEFAULT_ENCODING);
	}
	
	public static Prop use (String filename, String encoding) {
		Prop result = map.get(filename);
		if (result == null) {
			synchronized (map) {
				result = map.get(filename);
				if (result == null) {
					result = new Prop(filename, encoding);
					map.put(filename, result);
					PropKit.prop = result;
				}
			}
		}
		return result;
	}
	
	public static Prop use (File file) {
		return use(file, DEFAULT_ENCODING);
	}
	
	public static Prop use (File file, String encoding) {
		Prop result = map.get(file.getName());
		if (result == null) {
			synchronized (map) {
				result = map.get(file.getName());
				if (result == null) {
					result = new Prop(file, encoding);
					map.put(file.getName(), result);
					PropKit.prop = result;
				}
			}
		}
		return result;
	}
	
	public static Prop useless(String fileName) {
		Prop previous = map.remove(fileName);
		if (PropKit.prop == previous)
			PropKit.prop = null;
		return previous;
	}
	
	public static void clear() {
		prop = null;
		map.clear();
	}
	
	public static Prop getProp() {
		if (prop == null)
			throw new IllegalStateException("Load propties file by invoking PropKit.use(String fileName) method first.");
		return prop;
	}
	
	public static Prop getProp(String fileName) {
		return map.get(fileName);
	}
	
	public static String get(String key) {
		return getProp().get(key);
	}
	
	public static String get(String key, String defaultValue) {
		return getProp().get(key, defaultValue);
	}
	
	public static Integer getInt(String key) {
		return getProp().getInt(key);
	}
	
	public static Integer getInt(String key, Integer defaultValue) {
		return getProp().getInt(key, defaultValue);
	}
	
	public static Long getLong(String key) {
		return getProp().getLong(key);
	}
	
	public static Long getLong(String key, Long defaultValue) {
		return getProp().getLong(key, defaultValue);
	}
	
	public static Boolean getBoolean(String key) {
		return getProp().getBoolean(key);
	}
	
	public static Boolean getBoolean(String key, Boolean defaultValue) {
		return getProp().getBoolean(key, defaultValue);
	}
	
	public static boolean containsKey(String key) {
		return getProp().containsKey(key);
	}

}
```
