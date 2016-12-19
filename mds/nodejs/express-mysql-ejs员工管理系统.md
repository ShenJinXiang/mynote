# express-mysql-ejs员工管理系统
之前介绍过express、ejs的使用，也介绍了nodejs操作mysql数据库，现在将这些整合起来，做一个简单的员工管理系统

## 功能说明

* 数据存储在mysql数据库中，后台用express框架
* 包含一个登陆、注册页面和主页面
* 主页面包括左侧的部门信息，以及右侧的员工列表，可以添加删除修改员工和部门信息

## 目录结构
创建工作目录employee
```
$ mkdir employee
```

1. app.js - 应用启动文件    
2. packag.json - 项目总信息文件    
3. lib目录 - 存放后台js文件    
  3.1. lib/middleware - 中间件目录，自定义的中间件    
  3.2. lib/routes - 路由目录，用于配置路由    
  3.3. lib/service - 业务层目录，后台主要业务都在这个目录下    
  3.4. lib/sql - 数据库表设计sql文件    
  3.5. lib/utils - 工具目录，包括md5加密和操作数据库的工具文件    
  3.6. lib/config.json - 配置文件    
4. node_modules - 保存依赖的第三方包    
5. public - 静态文件目录，包括前段第三方插件、页面css、js文件    
6. views - 存放前段ejs文件    

## 初始化环境
初始化包，创建package.json
```
$ npm init
```

导入express
```
$ npm install express --save
```

导入mysql包
```
$ npm install mysql --save
```

导入ejs模板引擎
```
$ npm install ejs --save
```

导入uuid，用于生成数据库主键id
```
$ npm install node-uuid --save
```

导入body-parser包，用于解析post请求数据
```
$ npm install body-parser --save
```

导入express-session包，用于管理session
```
$ npm install express-session --save
```

创建静态文件根目录public
```
$ mkdir public
```

public目录下创建plugin目录，存放前段第三方插件
```
$ mkdir public/plugin
```

plugin目录中导入第三方插件:
* jquery.js - jquery插件
* jquery.form.js - jquery from表单插件
* ztrr - 树形控件
* layer - 弹出框控件

## 项目配置文件
创建lib目录
```
$ mkdir lib
```

lib目录下创建config.json
```
$ touch lib/config.json
```

编辑config.json
```json
{
	"mysql": {
		"user": "root",
		"password": "6098",
		"host": "localhost",
		"port": 3306,
		"database": "nodejs",
		"connectionLimit": 10
	},
	"noLogin": ["/", "/login", "/register", "/checkUsername"]
}
```
mysql指明数据库配置信息
* user - 数据库用户名
* password - 数据库用户密码
* host - 数据库地址
* port - 数据库端口
* database - 数据库名
* connectionLimit - 连接池连接数

noLogin 指明拦截配置信息，除了noLogin指定的路由，其他所有请求都需要session验证

## 创建MD5工具模块
有登录、注册功能，针对密码做个简单的MD5处理，lib目录下创建utils目录
```
$ mkdir lib/utils
```

utils目录下创建MD5Util.js
```
$ touch lib/utils/MD5Util.js
```

编辑MD5Util.js
```javascript
// lib/utils/MD5Util.js
const crypto = require('crypto');

exports.md5 = function (content) {
	if (typeof content !== 'string') {
		return '';
	}
	let md5 = crypto.createHash('md5');
	md5.update(content);
	return md5.digest('hex');
};

exports.sha1 = function (content) {
	if (typeof content !== 'string') {
		return '';
	}
	let shasum = crypto.createHash('sha1');
	shasum.update(content);
	return shasum.digest('hex');
};
```
