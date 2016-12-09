# Nodejs连接mysql数据库
开发过程中通常要涉及到数据库操作，node.js开发也免不了要操作数据库，由于比较熟悉mysql，所以先从mysql开始总结

## 环境准备
安装nodejs的mysql包，GitHub地址：[https://github.com/mysqljs/mysql.git](https://github.com/mysqljs/mysql.git)
```
npm install mysql --save
```

## 简单例子
```javascript
// 引入mysql
const mysql = require('mysql');

// 创建链接 配置链接属性
let conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: 3306,
	database: 'nodejs'
});

// 启用链接
conn.connect();

// 执行查询nodejs.user表中的所有记录
conn.query('select * from user', function (err, rows, fields) {
	if (err) {
		throw err;
	}

	// 输出查询结果
	console.log(rows);
});

// 关闭链接
conn.end();
```
*运行结果:*
```
[ RowDataPacket { id: 1, name: '张三', age: 18 },
  RowDataPacket { id: 2, name: '李四', age: 19 },
  RowDataPacket { id: 3, name: '王五', age: 20 } ]
```

## 带数据查询
查询id是1的用户信息

```javascript
conn.query('select * from user where id = ?', 1, function (err, rows, fields) {
	if (err) throw err;
	console.log(rows);
});
```
*运行结果:*
```
[ RowDataPacket { id: 1, name: '张三', age: 18 } ]
```

## 插入、修改和删除操作

### 插入数据
```javascript
let sql = 'insert into user (`name`, `age`) values (?, ?)';
conn.query(sql, ['刘备', 46], function (err, results) {
	if (err) throw err;
	console.log(results);
	conn.query('select * from user', function (err, rows) {
		if (err) throw err;
		console.log(rows);
	});
});
```
*运行结果:*
```
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 4,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
[ RowDataPacket { id: 1, name: '张三', age: 18 },
  RowDataPacket { id: 2, name: '李四', age: 19 },
  RowDataPacket { id: 3, name: '王五', age: 20 },
  RowDataPacket { id: 4, name: '刘备', age: 46 } ]
```
查看运行结果，可以知道新插入的记录的id值为：4

### 修改记录
```javascript
let sql = 'update user set name = ?, age = ? where id = ?';
conn.query(sql, ['曹操', 66, 1], function (err, results) {
	if (err) throw err;
	console.log(results);
	conn.query('select * from user', function (err, rows) {
		if (err) throw err;
		console.log(rows);
	});
});
```
*运行结果:*
```
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1 }
[ RowDataPacket { id: 1, name: '曹操', age: 66 },
  RowDataPacket { id: 2, name: '李四', age: 19 },
  RowDataPacket { id: 3, name: '王五', age: 20 },
  RowDataPacket { id: 4, name: '刘备', age: 46 } ]
```

### 删除记录
```javascript
let sql = 'delete from user where id = ?';
conn.query(sql, 2, function (err, results) {
	if (err) throw err;
	console.log(results);
	conn.query('select * from user', function (err, rows) {
		if (err) throw err;
		console.log(rows);
	});
});
```
*运行结果:*
```
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
[ RowDataPacket { id: 1, name: '曹操', age: 66 },
  RowDataPacket { id: 3, name: '王五', age: 20 },
  RowDataPacket { id: 4, name: '刘备', age: 46 } ]
```

### 另外的传值方式
通过上面的练习，我们知道conn.query()方法可以接收三个参数：sql、值、回调函数。还有另外一种传递参数的方式：
```javascript
conn.query({
	sql: 'update user set name = ?, age = ? where id = ?',
	timeout: 10000, // 10秒超时
	values: ['赵云', 21, 3]
}, function (err, results) {
	if (err) throw err;
	console.log(results);
	conn.query('select * from user', function (err, rows) {
		if (err) throw err;
		console.log(rows);
	});
});
```
*运行结果:*
```
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1 }
[ RowDataPacket { id: 1, name: '曹操', age: 66 },
  RowDataPacket { id: 3, name: '赵云', age: 21 },
  RowDataPacket { id: 4, name: '刘备', age: 46 } ]
```

## 数据库链接池
建立数据库链接池，并执行查询操作
```javascript
const mysql = require('mysql');

let pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'nodejs',
	port: 3306
});

pool.query('select * from user', function (err, rows, fields) {
	if (err) throw err;
	console.log(rows);
});
```
*运行结果:*
```
[ RowDataPacket { id: 1, name: '曹操', age: 66 },
  RowDataPacket { id: 3, name: '赵云', age: 21 },
  RowDataPacket { id: 4, name: '刘备', age: 46 } ]
```

**数据库链接池中获取链接:**
```javascript
pool.getConnection(function (err, connection) {
	connection.query('select * from user', function (err, rows) {
		connection.release();	// 返回链接给链接池
		console.log(rows);
	});
});
```

## 事务处理
这个也是比较见的情况，代码如下:
```javascript
let insertSql = 'insert into user (`name`, `age`) values (?, ?)';
let updateSql = 'update user set name = ?, age = ? where id = ?';
conn.beginTransaction(function (err) {
	if (err) throw err;
	conn.query(insertSql, ['卡卡西', 24], function (err, result) {
		if (err) {
			return conn.rollback(function () {
				throw err;
			});
		}
		console.log(result);

		conn.query(updateSql, ['武松', 27, 1], function (err, result) {
			if (err) {
				return conn.rollback(function () {
					throw err;
				});
			}
			console.log(result);
			conn.commit(function (err) {		
				if (err) {
					return conn.rollback(function () {
						throw err;
					});
				}
				console.log('success!');
			});
		});
	});

});
```
connection的beginTransaction() 方法开启事务，rollback() 方法回滚，commit() 方法提交事务
