// lib/render.js
const readTemp = require('./readTemp');

/**
 * 渲染主页面
 */
exports.index = function (res) {
	readTemp(function (before, end) {
		let content = [
			'<p>index 页面</p>',
			'<p><a href="/user">用户列表</a></p>'
		];
		let arr = before.concat(content, end);
		res.writeHead(200, {'Content-Type': 'text/html'});
		arr.forEach(function (item) {
			res.write(item);
		});
		res.end();
	});
};

/**
 * 渲染人员列表页面
 */
exports.user = function (res, data) {
		readTemp(function(before, end) {
			let content = [];
			content.push('<a href="/addUserForm">添加人员</a>');
			content.push('<table>');
			content.push('<tr>');
			content.push('<th width="15%">姓名</th>');
			content.push('<th width="10%">年龄</th>');
			content.push('<th width="25%">地址</th>');
			content.push('<th width="35%">说明</th>');
			content.push('<th width="15%">操作</th>');
			content.push('</tr>');

			let isEmpty = true;
			for (var key in data) {
				isEmpty = false;
				content.push('<tr>');
				content.push('<td>' + data[key].name + '</td>');
				content.push('<td>' + data[key].age + '</td>');
				content.push('<td>' + data[key].address + '</td>');
				content.push('<td>' + data[key].discription + '</td>');
				content.push('<td class="cz_td">');
				content.push('<a href="/updUserForm?id=' + data[key].id + '">修改</a>');
				content.push('<a href="/delUser?id=' + data[key].id + '">修改</a>');
				content.push('</td>');
				content.push('</tr>');
			}
			if (isEmpty) {
				content.push('<tr>');
				content.push('<td colspan="5">暂无人员</td>');
				content.push('</tr>');
			}

			let arr = before.concat(content, end);
			res.writeHead(200, {'Content-Type': 'text/html'});
			arr.forEach(function (item) {
				res.write(item);
			});
			res.end();
		});
};

/**
 * 渲染添加人员信息页面
 */
exports.addUserForm = function (res) {
	readTemp(function (before, end) {
		let content = [];
		content.push('<br>');
		content.push('<div class="content">');
		content.push('<form action="/addUser" method="post">');
		content.push('<ul>');
		content.push('<li>');
		content.push('<input type="hidden" id="id" name="id" />');
		content.push('<label for="name">姓名：</label>');
		content.push('<input type="text" class="text" id="name" name="name" />');
		content.push('<label for="age">年龄：</label>');
		content.push('<input type="text" class="text" id="age" name="age" />');
		content.push('</li>');
		content.push('<li>');
		content.push('<label for="address">地址：</label>');
		content.push('<input type="text" class="width-text text" id="address" name="address" />');
		content.push('</li>');
		content.push('<li>');
		content.push('<label for="discription">说明：</label>');
		content.push('<input type="text" class="width-text text" id="discription" name="discription" />');
		content.push('</li>');
		content.push('<li style="text-indent:105px;">');
		content.push('<input type="submit" class="save_btn btn" value="保存"/>&nbsp;&nbsp;');
		content.push('<input type="reset" class="reset_btn btn" value="重置"/>');
		content.push('</li>');
		content.push('</ul>');
		content.push('</form>');
		content.push('</div>');
		
		let arr = before.concat(content, end);
		res.writeHead(200, {'Content-Type': 'text/html'});
		arr.forEach(function (item) {
			res.write(item);
		});
		res.end();
	});
};

/**
 * 渲染修改页面
 */
exports.updUserForm = function (res, data) {
	readTemp(function (before, end) {
		let content = [];
		content.push('<br>');
		content.push('<div class="content">');
		content.push('<form action="/updUser" method="post">');
		content.push('<ul>');
		content.push('<li>');
		content.push('<input type="hidden" id="id" name="id" value="' + data.id + '" />');
		content.push('<label for="name">姓名：</label>');
		content.push('<input type="text" class="text" id="name" name="name" value="' + data.name + '" />');
		content.push('<label for="age">年龄：</label>');
		content.push('<input type="text" class="text" id="age" name="age" value="' + data.age + '" />');
		content.push('</li>');
		content.push('<li>');
		content.push('<label for="address">地址：</label>');
		content.push('<input type="text" class="width-text text" id="address" name="address" value="' + data.address + '"/>');
		content.push('</li>');
		content.push('<li>');
		content.push('<label for="discription">说明：</label>');
		content.push('<input type="text" class="width-text text" id="discription" name="discription" value="' + data.discription + '" />');
		content.push('</li>');
		content.push('<li style="text-indent:105px;">');
		content.push('<input type="submit" class="save_btn btn" value="保存"/>&nbsp;&nbsp;');
		content.push('<input type="reset" class="reset_btn btn" value="重置"/>');
		content.push('</li>');
		content.push('</ul>');
		content.push('</form>');
		content.push('</div>');
		
		let arr = before.concat(content, end);
		res.writeHead(200, {'Content-Type': 'text/html'});
		arr.forEach(function (item) {
			res.write(item);
		});
		res.end();
	});
};
