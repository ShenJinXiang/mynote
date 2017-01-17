# properties工具类
读取properties配置很简单，jdk提供了`java.util.Properties`类，这里稍作封装，以便项目中直接使用
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
