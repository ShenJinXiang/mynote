/**
 * // lib/sql/mysql.sql
 * 初始化数据库表
 */

-- 用户表
CREATE TABLE `user` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `username` varchar(255) DEFAULT NULL COMMENT '登录用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '登录密码',
  `registerDate` date DEFAULT NULL COMMENT '注册日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 用户表插入系统管理员记录
insert into user (`id`, `name`, `username`, `password`, `registerDate`) values (UUID(), '系统管理员', 'admin', MD5('admin'), now());

-- 部门表
CREATE TABLE `department` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `pId` varchar(64) DEFAULT NULL COMMENT '上级部门id',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 员工表
CREATE TABLE `employee` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `departmentId` varchar(64) DEFAULT NULL COMMENT '部门id',
  `age` int(3) DEFAULT NULL COMMENT '年龄',
  `sex` int(1) DEFAULT NULL COMMENT '性别 1 男   2 女',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `desc` text COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
