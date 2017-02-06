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
/*
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
*/

/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.lineWidth = 5;

	context.save();
	context.scale(1, 1);
	context.strokeRect(50, 50, 200, 200);
	context.restore();

	context.save();
	context.scale(2, 2);
	context.strokeRect(50, 50, 200, 200);
	context.restore();

	context.save();
	context.scale(3, 3);
	context.strokeRect(50, 50, 200, 200);
	context.restore();
})();
*/

/*
(function() {
		let config = {
			width: 660,
			starColor: 'yellow'
		};
		let canvas = document.getElementById('mycanvas');
		canvas.width = config.width;
		canvas.height = config.width * 2 / 3;
		let context = canvas.getContext('2d');

		let gWidth = canvas.width / 30;

		let [maxX, maxY] = [5, 5];
		let minX = [10, 12, 12, 10];
		let minY = [2, 4, 7, 9];

		draw();
		//drawInit();

		function drawInit() {

			context.beginPath();
			context.lineTo(0, canvas.height / 2);
			context.lineTo(canvas.width, canvas.height / 2);
			context.stroke();

			context.beginPath();
			context.lineTo(canvas.width / 2, 0);
			context.lineTo(canvas.width / 2, canvas.height);
			context.stroke();

			context.strokeStyle = '#666';

			// 辅助线 竖线
			for(let i = 1; i < 15; i++) {
				context.beginPath();
				context.lineTo(i * gWidth, 0);
				context.lineTo(i * gWidth, canvas.height / 2);
				context.stroke();
			}

			// 辅助线 横线
			for (let i = 1; i < 10; i++) {
				context.beginPath();
				context.lineTo(0, i * gWidth);
				context.lineTo(canvas.width / 2, i * gWidth);
				context.stroke();
			}

			// 大圆
			context.beginPath();
			context.arc(maxX * gWidth, maxY * gWidth, 3 * gWidth, 0, 2 * Math.PI, false);
			context.stroke();

			// 小圆以及大圆圆心与小圆圆心的连接线
			for (let i = 0; i < 4; i++) {
				context.beginPath();
				context.arc(minX[i] * gWidth, minY[i] * gWidth, gWidth, 0, 2 * Math.PI, false);
				context.stroke();

				context.beginPath();
				context.lineTo(maxX * gWidth, maxY * gWidth);
				context.lineTo(minX[i] * gWidth, minY[i] * gWidth);
				context.stroke();
			}
		}

		function draw() {
			// 红色背景
			context.fillStyle = 'red';
			context.fillRect(0, 0, canvas.width, canvas.height);

			// 大五角星
			drawStar(maxX * gWidth, maxY * gWidth, 3 * gWidth, -90);

			// 小五角星
			for (let i = 0; i < 4; i++) {
				drawStar(minX[i] * gWidth, minY[i] * gWidth, gWidth, 180 + Math.atan((minY[i] - maxY ) / (minX[i] - maxX)) * 180 / Math.PI);
			}
		}

		// 五角星
		function drawStar(x, y, r, rotate) {
			context.save();
			context.fillStyle = config.starColor;
			context.translate(x, y);
			context.scale(r, r);
			context.rotate(rotate ? rotate * Math.PI / 180 : 0);
			context.beginPath();
			let dig = Math.PI / 5 * 4;
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
(function(){
		let canvas = document.getElementById('mycanvas');
		canvas.width = 800;
		canvas.height = 800;
		let context = canvas.getContext("2d");

		function strokeRegPolygon(ctx, num, sx, sy, radius, rotate) {
			ctx.save();
			ctx.translate(sx, sy);
			ctx.rotate(rotate);
			ctx.beginPath();
			for (let i = 0; i < num; i++) {
				ctx.lineTo(Math.cos(i * 2 * Math.PI / num) * radius, Math.sin(i * 2 * Math.PI / num) * radius);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}

		function fillRegPolygon(ctx, num, sx, sy, radius, rotate) {
			ctx.save();
			ctx.translate(sx, sy);
			ctx.rotate(rotate);
			ctx.beginPath();
			for (let i = 0; i < num; i++) {
				ctx.lineTo(Math.cos(i * 2 * Math.PI / num) * radius, Math.sin(i * 2 * Math.PI / num) * radius);
			}
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}

		function strokeStar(ctx, num, sx, sy, R, r, rotate) {
			ctx.save();
			ctx.translate(sx, sy);
			ctx.rotate(rotate);
			ctx.beginPath();
			for (let i = 0; i < num; i++) {
				ctx.lineTo(Math.cos(i * 2 * Math.PI / num) * R, Math.sin(i * 2 * Math.PI / num) * R);
				ctx.lineTo(Math.cos(i * 2 * Math.PI / num + Math.PI / num) * r, Math.sin(i * 2 * Math.PI / num + Math.PI / num) * r);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
		
		function fillStar(ctx, num, sx, sy, R, r, rotate) {
			ctx.save();
			ctx.translate(sx, sy);
			ctx.rotate(rotate);
			ctx.beginPath();
			for (let i = 0; i < num; i++) {
				ctx.lineTo(Math.cos(i * 2 * Math.PI / num) * R, Math.sin(i * 2 * Math.PI / num) * R);
				ctx.lineTo(Math.cos(i * 2 * Math.PI / num + Math.PI / num) * r, Math.sin(i * 2 * Math.PI / num + Math.PI / num) * r);
			}
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
})();
*/
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	context.fillStyle = "#058";
	context.beginPath();
	context.moveTo(200, 200);
	context.lineTo(600, 200);
	context.lineTo(600, 600);
	context.lineTo(200, 600);
	context.closePath();
	context.moveTo(250, 250);
	context.lineTo(250, 550);
	context.lineTo(550, 550);
	context.lineTo(550, 250);
	context.closePath();
	context.fill();
	
})();
