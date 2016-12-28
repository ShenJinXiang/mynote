# Maven

## 目录结构

src
	-main
		-java
			-package
	-test
		-java
			-package
	resources

## 常用构建命令

|命令|说明|
|:--|:--|
|mvn -v|查看maven版本|
|mvn compile|编译|
|mvn test|测试|
|mvn package|打包|
|mvn clean|删除maven生成的目标文件|
|mvn install|安装jar包到本地仓库中|

## 自动创建目录骨架

1. archetype:generate 安装提示进行选择
2. archetype"gennerate -DgroupId=组织名"
