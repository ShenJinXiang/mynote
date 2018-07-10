# Redis
安装
1.下载redis-4.0.9.tar文件
2.解压缩
```
tar -zxvf redis-4.0.9.tar
```

3. cd到解压后的目录，make
或
```
make PREFIX=/usr/local/redis install
```
如果没权限需要前面添加sudo命令

4.拷贝 redis.conf 到/usr/local/redis/ 目录
5.修改redis.conf文件
```
daemonize no
```
改为
```
daemonize yes
```

6. 启动 ./src/redis-server ./redis.conf
7. 查看 ps -ef | grep -i redis
8. 停止 ./src/redis-cli shutdown

## jedis

```
Jedis jedis = new Jedis('ip', port);
jedis.close();
```

连接池
```
JedisPoolConfig config = new JedisPoolConfig();
// 最大连接数
config.setMaxTotal(200);
// 最大空闲连接数
config.setMaxIdle(10);

JedisPool pool = new JedisPool(config. 'ip', port);

Jedis jedis = null;
try {
	jedis = pool.getResource();
} catch (Exception e) {
} finally {
	if (null != jedis) {
		jedis.close();
	}
}
```

## keys 操作

```
keys *
keys my?
del my1 my2 my3
exists my1
# 设置过期时间 单位秒
expire my 1000

# 获取类型
type my1
```
