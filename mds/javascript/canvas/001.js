/*
(function () {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	let linearGrad = context.createLinearGradient(0, 0, canvas.width, canvas.height);
	linearGrad.addColorStop(0, 'white');
	linearGrad.addColorStop(0.25, 'yellow');
	linearGrad.addColorStop(0.5, 'green');
	linearGrad.addColorStop(0.75, 'blue');
	linearGrad.addColorStop(1, 'black');
	context.fillStyle = linearGrad;
	context.fillRect(0, 0, canvas.width, canvas.height);
})();
*/
/*
(function () {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	let linearGrad = context.createLinearGradient(0, 0, canvas.width, 0);
	linearGrad.addColorStop(0, 'red');
	linearGrad.addColorStop(0.5, 'red');
	linearGrad.addColorStop(0.5 + Number.MIN_VALUE, 'blue');
	linearGrad.addColorStop(1, 'blue');
	context.fillStyle = linearGrad;
	context.fillRect(100, 150, 600, 100);
})();
*/
/*
(function () {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	let canvasGradient = context.createRadialGradient(400, 400, 50, 400, 400, 300);
	canvasGradient.addColorStop(0, 'red');
	canvasGradient.addColorStop(1, 'white');
	context.fillStyle = canvasGradient;
	context.fillRect(200, 200, 400, 400);
})();
*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let context = canvas.getContext('2d');

	let img = new Image();
	img.src = './images/00039.png';
	img.onload = function () {
		context.fillStyle = context.createPattern(img, 'repeat');
		context.fillRect(0, 0, canvas.width, canvas.height);
	};
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');
	context.fillStyle = context.createPattern(getStarCanvas(), 'repeat');
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	function getStarCanvas() {
		let starCanvas = document.createElement('canvas');
		starCanvas.width = 50;
		starCanvas.height = 50;
		let ctx = starCanvas.getContext('2d');

		ctx.fillStyle = 'yellow';
		ctx.fillRect(0, 0, starCanvas.width, starCanvas.height);
		let r = 20;
		ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.translate(starCanvas.width / 2, starCanvas.height / 2);
		ctx.rotate(-Math.PI / 2);
		for(let i = 0; i < 5; i++) {
			ctx.lineTo(Math.cos(4 * Math.PI / 5 * i) * r, Math.sin(4 * Math.PI / 5 * i) * r);
		}
		ctx.closePath();
		ctx.restore();
		ctx.fill();
		return starCanvas;
	}
})();
*/
/*
(function() {
		let canvas = document.getElementById('mycanvas');
		canvas.width = 800;
		canvas.height = 200;
		let context = canvas.getContext('2d');

		context.font = '50px 宋体';
		context.fillText('申锦祥', 100, 50);
		
		context.font = '50px Arial';
		context.fillText('www.shenjinxiang.com', 100, 150);
})();
*/
/*
(function () {
	let str = 'www.shenjinxiang.com';

	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 200;
	let context = canvas.getContext('2d');

	// 纯色
	context.fillStyle = '#058';
	context.font = 'bold 50px Arial';
	context.fillText(str, 100, 70);

	// 渐变色
	let gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, 'magenta');
	gradient.addColorStop(0.5, 'blue');
	gradient.addColorStop(1, 'red');
	context.fillStyle = gradient;
	context.fillText(str, 100, 170);
})();
*/
/*
(function () {
	let str = 'www.shenjinxiang.com';

	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 200;
	let context = canvas.getContext('2d');

	// 纯色
	context.strokeStyle = '#058';
	context.font = 'bold 50px Arial';
	context.strokeText(str, 100, 70);

	// 渐变色
	let gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, 'magenta');
	gradient.addColorStop(0.5, 'blue');
	gradient.addColorStop(1, 'red');
	context.strokeStyle = gradient;
	context.strokeText(str, 100, 170);
})();
*/
/*
(function() {
	let str = 'shenjinxiang';

	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 700;
	let context = canvas.getContext('2d');

	context.lineWidth = 1;
	context.strokeStyle = '#eee';
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();

	var aligns = ['start', 'end', 'center', 'left', 'right'];

	context.fillStyle = '#084';
	context.font = 'bold 50px Arial';
	for (var i = 0; i < aligns.length; i++) {
		context.textAlign = aligns[i];
		context.fillText(str, canvas.width / 2, (i + 1) * 120);

		context.beginPath();
		context.lineTo(0, (i + 1) * 120);
		context.lineTo(canvas.width, (i + 1) * 120);
		context.closePath();
		context.stroke();
	}

})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 1200;
	canvas.height = 200;
	let context = canvas.getContext('2d');

	context.lineWidth = 1;
	context.strokeStyle = '#eee';
	context.moveTo(0, canvas.height / 2);
	context.lineTo(canvas.width, canvas.height / 2);
	context.stroke();

	var bls = ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom'];

	context.fillStyle = '#084';
	context.font = 'bold 40px Arial';

	context.textBaseline = 'alphabetic';
	context.fillText('alphabetic', 20, canvas.height / 2);

	context.textBaseline = 'top';
	context.fillText('top', 230, canvas.height / 2);

	context.textBaseline = 'hanging';
	context.fillText('hanging', 320, canvas.height / 2);

	context.textBaseline = 'middle';
	context.fillText('middle', 520, canvas.height / 2);

	context.textBaseline = 'ideographic';
	context.fillText('ideographic', 720, canvas.height / 2);

	context.textBaseline = 'bottom';
	context.fillText('bottom', 1000, canvas.height / 2);
})();
*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	context.shadowColor = 'gray';
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowBlur = 5;

	context.fillStyle = '#058';
	context.fillRect(200, 200, 400, 400);
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	context.shadowColor = 'green';
	context.shadowOffsetX = -400;
	context.shadowOffsetY = -400;
	context.shadowBlur = 0;

	context.fillStyle = '#058';
	context.fillRect(400, 400, 400, 400);
})();
*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 300;
	let context = canvas.getContext('2d');

	context.fillStyle = '#058';
	context.font = "bold 50px Arial";
	context.textAlign = 'center';
	context.textBaseline = 'middle';

	context.shadowColor = '#aaa';
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 5;
	context.shadowBlur = 2;
	context.fillText('申锦祥', 400, 100);

	context.strokeStyle = '#058';
	context.lineWidth = 2;
	context.shadowColor = '00f7ff';
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 5;
	context.strokeText('www.shenjinxiang.com', 400, 180);
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 100;
	canvas.height = 100;
	let context = canvas.getContext('2d');
	
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.font = 'bold 100px Arial';
	context.fillText('A', canvas.width / 2, canvas.height / 2);

	context.getImageData(0, 0, canvas.width, canvas.height);
})();
*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, 200, 0, 2 * Math.PI, false);
	context.fillStyle = '#fff';
	context.fill();
	context.clip();

	context.font = 'bold 200px Arial';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillStyle = '048';
	context.fillText('CANVAS', canvas.width / 2, canvas.height / 2);
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 660;
	canvas.height = canvas.width * 2 / 3;
	let context = canvas.getContext('2d');
	
	let config = {
		x: canvas.width / 2,
		y: canvas.height / 2,
		r: 100
	}
	var box = canvas.getBoundingClientRect();
	canvas.addEventListener('mousemove', function(e) {
		config.x = e.clientX - box.left;
		config.y = e.clientY - box.top;
		draw();
	}, false);

	draw();

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.save();
		context.beginPath();
		context.arc(config.x, config.y, config.r, 0, 2 * Math.PI, false);
		context.fillStyle = '#fff';
		context.fill();
		context.clip();

		drawGQ();
		context.restore();
	}

	function drawGQ() {

		let gWidth = canvas.width / 30;
		let [maxX, maxY] = [5, 5];		// 大五角星的坐标
		let minX = [10, 12, 12, 10];	// 小五角星的x坐标值
		let minY = [2, 4, 7, 9];		// 小五角星的y坐标值

		// 红色背景
		context.fillStyle = 'red';
		context.fillRect(0, 0, canvas.width, canvas.height);

		// 大五角星
		drawStar(maxX * gWidth, maxY * gWidth, 3 * gWidth, -Math.PI / 2);

		// 小五角星
		for (let i = 0; i < 4; i++) {
			drawStar(minX[i] * gWidth, minY[i] * gWidth, gWidth, 
					Math.PI + Math.atan((minY[i] - maxY ) / (minX[i] - maxX)));
		}
	}

	// 五角星
	function drawStar(x, y, r, rotate) {
		context.save();
		context.fillStyle = 'yellow';
		context.translate(x, y);
		context.scale(r, r);
		context.rotate(rotate);
		context.beginPath();
		let dig = 2 * 2 * Math.PI / 5;
		for(let i = 0; i < 5; i++) {
			context.lineTo(Math.cos(i * dig), Math.sin(i * dig));
		}
		context.closePath();
		context.fill();
		context.restore();
	}
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	context.fillStyle = '#058';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.clearRect(100, 100, 300, 400);
})();
*/
(function (){
	let canvas = document.getElementById('mycanvas');
	canvas.width = window.innerWidth;
	canvas.height = window. innerHeight;
	let context = canvas.getContext('2d');

	// 配置信息
	let config = {
		num: 20,
		minr: 10,
		maxr: 40,
		bcolor: '#059',
		ccolor: 'red'
	};

	let balls = [];
	let box = canvas.getBoundingClientRect();

	init();

	// 初始化
	function init() {
		for (let i = 0; i < config.num; i++) {
			balls[i] = {
				x: config.maxr + Math.random() * (canvas.width - 2 * config.maxr),
				y: config.maxr + Math.random() * (canvas.height - 2 * config.maxr),
				r: Math.random() * (config.maxr - config.minr) + config.minr
			};
		}
		draw();
	}

	// 绑定事件
	canvas.addEventListener('mousemove', draw, false);
	window.onresize = function () {
		init();
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	function draw(e) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		let x = -1000, y = -1000;
		if (e) {
			x = e.clientX - box.left;
			y = e.clientY - box.top;
		}
		for (let i = 0; i < balls.length; i++) {
			context.beginPath();
			context.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI, false);
			if (context.isPointInPath(x, y)) {
				context.fillStyle = config.ccolor;
			} else {
				context.fillStyle = config.bcolor;
			}
			context.fill();
			context.closePath();
		}
	}
})();
