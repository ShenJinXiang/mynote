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
