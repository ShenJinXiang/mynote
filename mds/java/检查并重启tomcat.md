# 检查并重启tomcat

java 代码：

```java

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class ServerKit {

    private static String url = "http://localhost:8080";
    private static int t = 10 * 1000;
    private static String command = "/Users/shenjinxiang/dev/tomcat/apache-tomcat-7.0.69/bin/startup.sh";

    public static void main(String[] args) {
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                if (!checkUrl()) {
                    System.out.println(getDateStr(new Date()) + "  服务器连接不上，重新启动。。");
                    try {
                        Runtime.getRuntime().exec(command);
                        System.out.println("重启成功");
                    } catch (IOException e) {
                        System.out.println("重启失败");
                        System.out.println(e.getMessage());
                    }
                } else {
                    System.out.println(getDateStr(new Date()) + " 正常!");
                }
            }
        }, 0, t);
    }


    private static boolean checkUrl() {
        try {
            URL u = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) u.openConnection();
            connection.setUseCaches(false);
            connection.setConnectTimeout(3000);
            int code = connection.getResponseCode();
            if (code != 200) {
                connection.disconnect();
                return false;
            }
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private static String getDateStr(Date d) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(d);
    }
}
```
