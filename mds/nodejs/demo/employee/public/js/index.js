$(function () {
	bindEvent();
});

/**
 * 绑定事件
 */
function bindEvent() {
	$('.index-menu li').click(function () {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		let data = $(this).attr('data');
		$('.list-content').eq(data).addClass('active').siblings().removeClass('active');
	});

	$('#login_username').keypress(function (event) {
		if (event.keyCode === 13) {
			$('#login_password').focus();
		}
	});

	$('#login_password').keypress(function (event) {
		if (event.keyCode === 13) {
			login();
		}
	});

	$('#register_name').keypress(function (event) {
		if (event.keyCode === 13) {
			$('#register_username').focus();
		}
	});
	
	$('#register_username').keypress(function (event) {
		if (event.keyCode === 13) {
			$('#register_password').focus();
		}
	});

	$('#register_password').keypress(function (event) {
		if (event.keyCode === 13) {
			register();
		}
	});

	$('#register_username').blur(function () {
		if ($.trim($(this).val()) != '') {
			checkUsername($(this).val());
		}
	});
}

/**
 * 登录
 */
function login() {
	let data = $('#loginForm').getFormJson();
	if (data.username === '' || $.trim(data.username) === '') {
		tips('请输入用户名', 'login_username');
		return;
	}
	if (data.password === '' || $.trim(data.password) === '') {
		tips('请输入密码', 'login_password');
		return;
	}
	doPost('/login', data, function(result) {
		if (result.result) {
			window.location.href = '/main';
		} else {
			alertMsg(result.msg);
		}
	});
}

/**
 * 注册
 */
function register() {
	let data = $('#registerForm').getFormJson();
	if (data.name === '' || $.trim(data.name) === '') {
		tips('请输入姓名', 'register_name');
		return;
	}
	if (data.username === '' || $.trim(data.username) === '') {
		tips('请输入用户名', 'register_username');
		return;
	}
	if (data.password === '' || $.trim(data.password) === '') {
		tips('请输入密码', 'register_password');
		return;
	}
	doPost('/register', data, function (result) {
		if (result.result) {
			window.location.href = '/main';
		} else {
			alertMsg(result.msg);
		}
	});
}

/**
 * 检测用户名是否重复
 */
function checkUsername(username) {
	doPost('/checkUsername', {username: username}, function (result) {
		if (!result.result) {
			tips(result.msg, 'register_username');
		}
	});
}
