# 财税通（全国版）

## 2017-06-07
1. 财税通服务端，登录接口返回信息中添加用户所属区域、所属省、所属运营商信息
2. 财税通服务端，添加录入税号信息的接口。检验卡号密码信息，检查税号不重复，然后修改税号和公司名称信息
3. zkx数据库中添加一条鑫财税的用户信息（王叆如传）
   具体数据：“D:\work\财税服务网\用户数据导入\20170607\鑫财税培训学校-会员信息整理1.xlsx” 中序号 176、177的记录

## 2017-06-08
1. 测试保存税号信息的接口
2. 和李卓明确消息发布时的需求

## 2017-06-09
1. 和李卓测试登录、保存税号的接口
2. zkx中新建表：cst_qkrq cst_zhq
```sql
CREATE TABLE `cst_qkrq` (
  `id` varchar(36) NOT NULL,
  `sbyf` varchar(6) NOT NULL COMMENT '申报月份',
  `qkjzrq` date NOT NULL COMMENT '清卡截止日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `cst_zhq` (
  `id` varchar(36) NOT NULL,
  `zsxm_dm` varchar(20) NOT NULL COMMENT '征收项目代码 10101 增值税',
  `nsqx_dm` varchar(20) NOT NULL COMMENT '纳税期限代码 06按月 08 按季',
  `sbyf` varchar(6) NOT NULL COMMENT '申报月份',
  `sbqr` date DEFAULT NULL COMMENT '申报开始日期',
  `sbzr` date NOT NULL COMMENT '申报截止如期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8


-- 初始化数据
insert into cst_qkrq (id,sbyf,qkjzrq) values(uuid(),'201706','2017-06-15')

insert into cst_zhq (id,zsxm_dm,nsqx_dm,sbyf,sbqr,sbzr) values(uuid(),'10101','06','201706','2017-06-01','2017-06-15')
```
3. 添加 清卡日期和申报日期的小页面
4. 添加通过税号获取会员等级和卡号的接口

## 2017-06-10
1. cst_sx.sys_org表添加yys_id 字段

## 2017-06-12
1. 财税通后台 机构管理中添加运营商信息的维护，一级机构对应top_area的省信息，二级机构对应top_yys的信息
2. 数据库中添加视图
```sql
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`%` SQL SECURITY DEFINER VIEW `zkx_yys` AS SELECT
	`a`.`id` AS `id`,
	`a`.`name` AS `name`,
	`a`.`pid` AS `pid`
FROM
	`zkx`.`top_area` `a`
WHERE
	(`a`.`pid` = 0)
UNION ALL
	SELECT
		`b`.`id` AS `id`,
		`b`.`yys_name` AS `name`,
		`b`.`area_id` AS `pid`
	FROM
		`zkx`.`top_yys` `b`
```
3. 创建数据库表 cst_prepare_user
```sql
CREATE TABLE `cst_prepare_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `gid` int(4) NOT NULL DEFAULT '3' COMMENT '会员等级，默认为银卡',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(45) DEFAULT NULL COMMENT '密码',
  `province` varchar(20) DEFAULT NULL COMMENT '省信息 对应top_area ',
  `yys_id` int(11) DEFAULT NULL COMMENT '运营商id 对应top_yys',
  `yxts` int(11) DEFAULT '365' COMMENT '有效天数',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `confirm` tinyint(1) DEFAULT '0' COMMENT '确认状态 0 确认  1 已确认',
  `create_userid` varchar(20) DEFAULT NULL COMMENT '创建人id 对应 cst_sx.sys_user',
  `confirm_userid` varchar(20) DEFAULT NULL COMMENT '确认人id 对应 cst_sx.sys_user',
  `yxbz` tinyint(1) DEFAULT '1' COMMENT '有效标志 0 无效 1有效 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='注册会员，经确认后进入top_user表';
```
4. top_user表的type字段添加注释
5. top_area 表添加simple_name（拼音简称）字段，用于生成会员用户名
6. 资源中配置了注册码生成和注册码查询的地址

## 2017-06-13
1. 创建视图 zkx_prepare_user
```aql
create view `zkx_prepare_user` as
select 
  a.id,
  a.gid,
  a.username,
  a.password,
  a.province,
  (select zkx_yys.name from zkx_yys where zkx_yys.id = a.province) province_name,
  a.yys_id,
  (select zkx_yys.name from zkx_yys where zkx_yys.id = a.yys_id) yys_name,
  a.yxts,
  a.createTime,
  a.create_userid,
  (select sys_user.name from sys_user where sys_user.id = a.create_userid) create_username,
  a.confirm,
  a.confirm_time,
  a.confirm_userid,
  (select sys_user.name from sys_user where sys_user.id = a.confirm_userid) confirm_username,
  (select c.id from zkx.top_user c where c.username = a.username limit 1) uid,
  (select c.activate from zkx.top_user c where c.username = a.username limit 1) activate,
  (select c.createtime from zkx.top_user_activate_log c where c.username = a.username limit 1) active_time,
  a.yxbz
from zkx.cst_prepare_user a
```
2. top_user表 createtime 和 endtime 字段改为date类型
3. 创建 用户激活日志表top_user_activate_log
```sql
CREATE TABLE `top_user_activate_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(20) DEFAULT NULL COMMENT '用户id 对应 top_user.id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名 对应 top_user.username',
  `createtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '激活时间',
  `ip` varchar(255) DEFAULT NULL COMMENT 'ip地址',
  `type` tinyint(4) DEFAULT NULL COMMENT '终端类型 1（网站） 2（微信） 3（安卓端） 4 （ios）',
  `yys_id` int(11) DEFAULT NULL COMMENT '运营商id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户激活日志表';
```

## 2017-06-14
1. 完成注册用户发放模块中 批量生成注册用户
2. 完成注册用户发放模块中 批量删除注册用户(修改yxbz字段)
3. zkx.cst_prepare_user 中添加gname字段
4. 完成注册用户查询中批量确认功能

## 2017-06-15
1. 完成注册用户查询页面的导出excel功能
2. 财税通登录接口添加激活验证，如果未激活则修改激活状态为激活，并记录日志信息
3. 微信端 登录 对应的修改 激活状态
4. 接口 登录 对应的修改 激活状态

## 2017-06-16
1. 将之前做好的部分部署至服务器上测试
2. 消息表service_news 添加省份 地区 运营商信息的字段
3. 消息管理模块，页面展示 搜索

## 2017-06-21
1. cst_sx.service_newspublish_con表添加yys_id字段
2. 消息管理 新增 修改 查看 发布 查看发布情况 取消发布等功能

## 2017-06-22
1. 修改登录页面、主页面的图片
2. 添加dm_qq_province和dm_qq_yys表用于维护运营商对应的qq地址和省份对应的默认qq跳转地址
3. qq跳转接口，适应外省用户
4. 完成消息接口的修改
5. 修改消息发布，如果为外省消息，不能选择全部纳税人选项

## 2017-06-23
1. 正式数据库中cst_sx.service_news表添加字段province、area、yys_id
2. 正式数据库中cst_sx.service_newspublish_con添加字段yys_id
3. 正式数据库cst_sx中创建表dm_qq_province:
```sql
CREATE TABLE `dm_qq_province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` int(11) DEFAULT NULL COMMENT '省id 对应zkx.top_area.id 其中的省份信息',
  `province_name` varchar(255) DEFAULT NULL COMMENT '省份名称',
  `url` varchar(255) DEFAULT NULL COMMENT 'qq url地址',
  `yxbz` tinyint(1) DEFAULT '1' COMMENT '有效标志 1 有效 0 无效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
4. 正式数据库cst_sx中创建表dm_qq_yys：
```sql
CREATE TABLE `dm_qq_yys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `yys_id` int(11) DEFAULT NULL COMMENT '运营商id 对应zkx.top_yys.id',
  `yys_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL COMMENT 'qq地址',
  `yxbz` tinyint(1) DEFAULT '1' COMMENT '有效标志 1 有效 0无效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
5. 初始化dm_qq_province数据:
```sql
insert into dm_qq_province
(`province`, `province_name`, `url`)
select 
	id, name, 'http://wpa.qq.com/msgrd?v=3&uin=2850900674&site=qq&menu=yes'
from zkx.top_area 
where pid = 0
```
6. 初始化dm_qq_yys数据：
```sql
insert into dm_qq_yys
(`yys_id`, `yys_name`, `url`)
select 
id, yys_name, 'http://wpa.qq.com/msgrd?v=3&uin=2850900674&site=qq&menu=yes'
from zkx.top_yys
```
7. 安装财税通客户端，测试登录接口和消息推送接口的准确性
8. 修改注册码发放页面的“生成注册码”按钮为“生成会员卡”
9. 修改static/css/theme2.css top_right 宽度为270px(原来是260)
