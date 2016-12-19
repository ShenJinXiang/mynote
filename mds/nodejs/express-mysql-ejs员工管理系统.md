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

app.js - 应用启动文件    
packag.json - 项目总信息文件    
lib目录 - 存放后台js文件    
  lib/middleware - 中间件目录，自定义的中间件    
  lib/routes - 路由目录，用于配置路由    
  lib/service - 业务层目录，后台主要业务都在这个目录下    
  lib/sql - 数据库表设计sql文件    
  lib/utils - 工具目录，包括md5加密和操作数据库的工具文件    
  lib/config.json - 配置文件    
node_modules - 保存依赖的第三方包    
public - 静态文件目录，包括前段第三方插件、页面css、js文件    
views - 存放前段ejs文件    

## 初始化环境
初始化包，创建package.json
```
npm init
```

导入express
```
npm install express --save
```

导入mysql包
```
npm install mysql --save
```

导入ejs模板引擎
```
npm install ejs --save
```

导入uuid，用于生成数据库主键id
```
npm install node-uuid --save
```

导入body-parser包，用于解析post请求数据
```
npm install body-parser --save
```

导入express-session包，用于管理session
```
npm install express-session --save
```
