# 第一个Lua程序

## 交互式编程
Lua 交互式编程模式可以通过命令 `lua -i` 或 `lua` 来启用：

```sh
$ lua -i
Lua 5.3.4  Copyright (C) 1994-2017 Lua.org, PUC-Rio
> 
```

第一行代码：
```sh
> print("hello world!")
hello world!
```

## 脚本式编程
创建文件**hello.lua**，内容如下：
```lua
print("hello world!")
print("ShenJinXiang")
```

使用`lua`命令执行文件：
```sh
$ lua hello.lua
hello world!
ShenJinXiang
```

也可以修改为可执行脚本，修改**hello.lua**，内容：
```lua
#!/usr/local/bin/lua

print("hello world!")
print("ShenJinXiang")
```

修改文件权限为可执行，运行该脚本：
```sh
$ ./hello.lua
hello world!
ShenJinXiang
```
