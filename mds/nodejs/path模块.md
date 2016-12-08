# path 路径模块
Node.js path 模块提供了一些用于处理文件路径的小工具，可以通过require('path')方法引入paht模块

## path.normaliza
path.normalize(p)用于标准化一个字符型的路径，当发现有多个斜杠（/）时，系统会将他们替换为一个斜杠；如果路径末尾中包含有一个斜杠，那么系统会保留这个斜杠。在Windows中，上述路径中的斜杠（/）要换成反斜杠（\）

```javascript
path.normalize('/foo/bar//baz///asdf/qsdf/..');
// /foo/bar/baz/asdf
```

## path.join
path.join([path1], [path2], [...])方法用于合并方法中的各参数并得到一个标准化合并的路径字符串

```javascript
path.join('/foo', 'bar', 'baz/sdf', 'dfs');
// /foo/bar/baz/sdf/dfs
```

## path.dirname
path.dirname(p)方法返回一个路径的目录名

```javascript
path.dirname('/foo/bar/baz/asf/sdf');
// /foo/bar/baz/asf
path.dirname('/foo/bar/baz/asf/sdf.html');
// /foo/bar/baz/asf
```

## path.basename
path.basename(p)方法返回一个路径中最低一级目录名

```javascript
path.basename('/foo/bar/baz/asf/sdf');
// sdf
path.basename('/foo/bar/baz/asf/sdf.html');
// sdf
```

## path.parse
path.parse(path)用于将一个字符串路径解析成path对象

```javascript
path.parse('/home/user/dir/file.txt');
/*
{ root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file' }
*/
```

## path.format
path.format(pathObject)用于将path对象转成path字符串路径，path.parse()的反向操作

```javascript
path.format({
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
});
// /home/user/dir\file.txt
```

## path.sep
path.sep属性表示文件分隔符：windows中为\   linux中为 /
