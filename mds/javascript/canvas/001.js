	/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.lineWidth = 10;

	context.beginPath();
	context.moveTo(100, 200);
	context.lineTo(300, 400);
	context.lineTo(100, 600);
	context.strokeStyle = "red";
	context.stroke();

	context.beginPath();
	context.moveTo(300, 200);
	context.lineTo(500, 400);
	context.lineTo(300, 600);
	context.strokeStyle = "green";
	context.stroke();

	context.beginPath();
	context.moveTo(500, 200);
	context.lineTo(700, 400);
	context.lineTo(500, 600);
	context.strokeStyle = "blue";
	context.stroke();
})();
*/

/*
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(100, 350);
	context.lineTo(500, 350);
	context.lineTo(500, 200);
	context.lineTo(700, 400);
	context.lineTo(500, 600);
	context.lineTo(500, 450);
	context.lineTo(100, 450);
	context.closePath();

	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.fillStyle = 'yellow';

	context.fill();
	context.stroke();
})();
*/

/*
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(100, 100);
	context.lineTo(700, 700);
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
	*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	drawRect({context: context, x: 50, y: 50, width: 400, height: 300, borderWidth : 5, borderColor : '#058', fillColor : 'yellow'});

})();
	function drawRect({context, x = 0, y = 0, width = 10, height = 10, borderWidth = 1, borderColor = '#333', fillColor = '#eee'}) {
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x + width, y);
		context.lineTo(x + width, y + height);
		context.lineTo(x, y + height);
		context.closePath();

		context.lineWidth = borderWidth;
		context.strokeStyle = borderColor;
		context.fillStyle = fillColor;

		context.fill();
		context.stroke();
	}
	*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.lineTo(100, 360);
	context.lineTo(700, 360);
	context.strokeStyle = 'red';
	context.stroke();

	context.beginPath();
	context.lineTo(100, 440);
	context.lineTo(700, 440);
	context.strokeStyle = 'red';
	context.stroke();

	context.beginPath();
	context.lineTo(100, 400);
	context.lineTo(700, 400);
	context.lineWidth = 80;
	context.strokeStyle = '#ddd';
	context.stroke();
})();
*/

/*
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	
	// 设置通用样式
	context.lineWidth = 80;
	context.strokeStyle = '#058';
	
	// lineCap属性值为 butt
	context.beginPath();
	context.lineTo(100, 200);
	context.lineTo(700, 200);
	context.lineCap = 'butt';
	context.stroke();

	// lineCap属性值为 round
	context.beginPath();
	context.lineTo(100, 400);
	context.lineTo(700, 400);
	context.lineCap = 'round';
	context.stroke();

	// lineCap属性值为 square
	context.beginPath();
	context.lineTo(100, 600);
	context.lineTo(700, 600);
	context.lineCap = 'square';
	context.stroke();

	// 绘制辅助线，便于观察
	
	context.lineWidth = 1;
	context.strokeStyle = '#aaa';
	context.lineCap = 'butt';

	context.beginPath();
	context.lineTo(60, 0);
	context.lineTo(60, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.lineTo(100, 0);
	context.lineTo(100, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.lineTo(700, 0);
	context.lineTo(700, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.lineTo(740, 0);
	context.lineTo(740, context.canvas.width);
	context.stroke();
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(100, 350);
	context.lineTo(500, 350);
	context.lineTo(500, 200);
	context.lineTo(700, 400);
	context.lineTo(500, 600);
	context.lineTo(500, 450);
	context.lineTo(100, 450);

	context.strokeStyle = '#058';
	context.lineWidth = 20;
	context.lineCap = 'round';

	context.stroke();
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.lineWidth = 10;
	context.strokeStyle = '#058';

	context.beginPath();
	context.lineTo(50, 700);
	context.lineTo(150, 100);
	context.lineTo(250, 700);
	context.lineJoin = 'miter';
	context.stroke();

	context.beginPath();
	context.lineTo(300, 700);
	context.lineTo(400, 100);
	context.lineTo(500, 700);
	context.lineJoin = 'round';
	context.stroke();

	context.beginPath();
	context.lineTo(550, 700);
	context.lineTo(650, 100);
	context.lineTo(750, 700);
	context.lineJoin = 'bevel';
	context.stroke();
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.save();
	context.fillStyle = 'blue';
	context.translate(100, 100);
	context.fillRect(0, 0, 400, 400);
	context.restore();

	context.save();
	context.fillStyle = 'red';
	context.translate(300, 300);
	context.fillRect(0, 0, 400, 400);
	context.restore();
})();
*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.save();
	context.fillStyle = '#058';
	context.translate(400, 400);
	context.rotate(Math.PI / 6);
	context.fillRect(-200, -200, 400, 400);
	context.restore();
})();
*/
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	// 辅助线
	context.strokeStyle = '#aaa';
	context.moveTo(0, canvas.height / 2);
	context.lineTo(canvas.width, canvas.height / 2);
	context.stroke();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();

	// 绘制图案
	for (let i = 0; i < 4; i++) {
		context.save();
		context.fillStyle = 'red';
		context.translate(400, 400);
		if (i == 0) {
			context.scale(10, 20);
		} else if (i == 1) {
			context.scale(-10, 20);
		} else if (i == 2) {
			context.scale(10, -20);
		} else if (i == 3) {
			context.scale(-10, -20);
		}
		context.beginPath();
		context.lineTo(10, 10);
		context.lineTo(20, 10);
		context.lineTo(10, 20);
		context.closePath();
		context.fill();
		context.restore();
	}
})();
