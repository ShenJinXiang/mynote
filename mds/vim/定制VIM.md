# 定制VIM
Vim可以根据个人喜好进行调整

## vimrc文件
查找vimrc的具体名字和位置:
```
:scriptnames
```

对于Unix系统，vimrc文件一般是:
```
~/.vimrc
```

对MS-DOS和MS-Windows，vimrc文件一般是:
```
$HOME/_vimrc
$VIM/_vimrc
```

vimrc文件里可以包含任何可以在冒号命令行上使用的命令。最简单的命令是对选项的设置。比如想在使用Vim时总是打开'incsearch'选项，就可以在vimrc文件中添加:
```
set incsearch
```

## vimrc示例
