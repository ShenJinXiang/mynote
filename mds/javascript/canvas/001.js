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

		//draw();
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
/*
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
*/
/*
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 660;
	canvas.height = canvas.width * 2 / 3;
	let context = canvas.getContext('2d');
	
	let gWidth = canvas.width / 30;

	let [maxX, maxY] = [5, 5];
	let minX = [10, 12, 12, 10];
	let minY = [2, 4, 7, 9];

	draw();
	function draw() {
		// 红色背景
		context.fillStyle = 'red';
		context.fillRect(0, 0, canvas.width, canvas.height);

		// 大五角星
		drawStar(maxX * gWidth, maxY * gWidth, 3 * gWidth, -Math.PI / 2);

		// 小五角星
		for (let i = 0; i < 4; i++) {
			drawStar(minX[i] * gWidth, minY[i] * gWidth, gWidth, Math.PI + Math.atan((minY[i] - maxY ) / (minX[i] - maxX)));
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
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	let data = [
		{x: 200, y: 400},
		{x: 300, y: 200},
		{x: 500, y: 600},
		{x: 600, y: 400}
	];

	let current = {
		isMove: false,
		pIndex: -1
	};

	canvas.onmousemove = mouseMove;
	canvas.onmousedown = mouseDown;
	document.body.onmouseup = mouseUp;

	drawByData();

	function drawByData() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawBaseLine();
		drawGrid();
		drawLine();

		function drawBaseLine() {
			context.beginPath();
			context.strokeStyle = '#ddd';
			context.lineWidth = 1;
			context.moveTo(data[0].x, data[0].y);
			context.lineTo(data[1].x, data[1].y);
			context.stroke();
			context.moveTo(data[2].x, data[2].y);
			context.lineTo(data[3].x, data[3].y);
			context.stroke();
		}

		function drawGrid() {
			for (let i = 0; i < 4; i++) {
				strokeRectByXY(data[i].x, data[i].y);
			}
		}

		function drawLine() {
			context.lineWidth = 3;
			context.strokeStyle = '#058';
			context.beginPath();
			context.moveTo(data[0].x, data[0].y);
			context.bezierCurveTo(data[1].x, data[1].y, data[2].x, data[2].y, data[3].x, data[3].y);
			context.stroke();
		}

		function strokeRectByXY(x, y) {
			context.save();
			context.lineWidth = 1;
			context.strokeStyle = '#555';
			context.translate(x, y);
			context.beginPath();
			context.lineTo(-5, -5);
			context.lineTo(5, -5);
			context.lineTo(5, 5);
			context.lineTo(-5, 5);
			context.closePath();
			context.stroke();
			context.restore();
		}
	}

	function mouseMove(e) {
		let xy = getXY(e);
		if (current.isMove) {
			//console.log(current.pIndex);
			data[current.pIndex].x = xy.x;
			data[current.pIndex].y = xy.y;
			drawByData();
		}
	}

	function mouseDown(e) {
		let xy = getXY(e);
		for (let i = 0; i < 4; i++) {
			if ((data[i].x - 5) < xy.x && (data[i].x + 5) > xy.x && (data[i].y - 5) < xy.y && (data[i].y + 5) > xy.y ) {
				current.isMove = true;
				current.pIndex = i;
				break;
			}
		}
	}

	function mouseUp() {
		current.isMove = false;
		current.pIndex = -1;
	}


	function getXY(e) {
		let box = canvas.getBoundingClientRect();
		return {
			x: e.clientX - box['left'],
			y: e.clientY - box['top']
		};
	}
})();
*/

/*
(function() {
		let canvas = document.getElementById('mycanvas');
		canvas.width = 800;
		canvas.height = 800;
		let context = canvas.getContext('2d');
		
		context.beginPath();
		context.lineTo(100, 400);
		context.lineTo(700, 400);
		context.stroke();

		context.beginPath();
		context.lineTo(400, 100);
		context.lineTo(400, 700);
		context.stroke();

		context.beginPath();
		context.lineTo(700 - 10, 400 - 5);
		context.lineTo(700 + 10, 400);
		context.lineTo(700 - 10, 400 + 5);
		context.closePath();
		context.fill();

		context.beginPath();
		context.lineTo(400 - 5, 700 - 10);
		context.lineTo(400, 700 + 10);
		context.lineTo(400 + 5, 700 - 10);
		context.closePath();
		context.fill();

		context.fillStyle = '#047'
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = '20px Arial';

		context.fillText('圆心(x, y)', 450, 380);
		context.fillText('0', 700, 420);
		context.fillText('2 * Math.PI', 700, 380);
		context.fillText('0.5 * Math.PI', 400, 720);
		context.fillText('1 * Math.PI', 100, 380);
		context.fillText('1.5 * Math.PI', 400, 80);

		context.beginPath();
		context.arc(400, 400, 200, 0, Math.PI * 2, false);
		context.lineWidth = 5;
		context.strokeStyle = '#058';
		context.stroke();
})();
*/
/*
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	context.lineWidth = 5;
	context.fillStyle = '#058';

	context.beginPath();
	context.arc(100, 100, 75, 0, 0.5 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(300, 100, 75, 0, 1 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(500, 100, 75, 0, 1.5 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(700, 100, 75, 0, 2 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(100, 300, 75, 0, 0.5 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(300, 300, 75, 0, 1 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(500, 300, 75, 0, 1.5 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(700, 300, 75, 0, 2 * Math.PI, true);
	context.fill();
})();
*/

/*
(function() {
	CanvasRenderingContext2D.prototype.strokeRoundRect = function (x, y, width, height, r) {
		this.save();
		this.translate(x, y);
		roundRect(this, width, height, r);
		this.stroke();
		this.restore();
	};

	CanvasRenderingContext2D.prototype.fillRoundRect = function (x, y, width, height, r) {
		this.save();
		this.translate(x, y);
		roundRect(this, width, height, r);
		this.fill();
		this.restore();
	};

	function roundRect(ctx, width, height, r) {
		ctx.beginPath();
		ctx.arc(width - r, height - r, r, 0, 0.5 * Math.PI, false);
		ctx.lineTo(r, height);
		ctx.arc(r, height - r, r, 0.5 * Math.PI, Math.PI, false);
		ctx.lineTo(0, r);
		ctx.arc(r, r, r, Math.PI, 1.5 * Math.PI, false);
		ctx.lineTo(width -r, 0);
		ctx.arc(width -r, r, r, 1.5 * Math.PI, 0, false);
		ctx.closePath();
	}

	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	context.strokeRoundRect(100, 100, 200, 200, 50);

	context.lineWidth = 5;
	context.strokeStyle = '#058';
	context.strokeRoundRect(500, 100, 200, 200, 50);
		
	context.fillStyle='#058';
	context.fillRoundRect(100, 500, 200, 200, 50);
	
	context.fillStyle = 'yellow';
	context.fillRoundRect(500, 500, 200, 200, 50);
	context.strokeRoundRect(500, 500, 200, 200, 50);
})();
*/

/*
(function () {
		let canvas = document.getElementById('mycanvas');
		canvas.width = 800;
		canvas.height = 800;
		let context = canvas.getContext('2d');

		context.fillStyle = '#058';
		context.fillRect(100, 100, 600, 600);

		let imgData = context.getImageData(0, 0, canvas.width, canvas.height);

		for (let x = 0; x < canvas.width; x++) {
			for (let y = 0; y < canvas.height; y++) {
				if (x == y) {
					imgData.data[canvas.width * y * 4 + x * 4] = 0;
					imgData.data[canvas.width * y * 4 + x * 4 + 1] = 85;
					imgData.data[canvas.width * y * 4 + x * 4 + 2] = 136;
					imgData.data[canvas.width * y * 4 + x * 4 + 3] = 255;
				} else {
					imgData.data[canvas.width * y * 4 + x * 4] = 255;
					imgData.data[canvas.width * y * 4 + x * 4 + 1] = 255;
					imgData.data[canvas.width * y * 4 + x * 4 + 2] = 255;
					imgData.data[canvas.width * y * 4 + x * 4 + 3] = 255;
				}
			}
		}
		setTimeout(function() {
			context.putImageData(imgData, 0, 0, 0, 0, canvas.width, canvas.height);
		}, 2000);
})();
*/

(function () {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	var context = canvas.getContext('2d');

	var config = {
		padding : 5,
		grid: 10
	};

	drawBaseLine();


	function drawBaseLine() {
		var padding = config.padding;
		var grid = config.grid;

		context.lineWidth = 3;
		context.strokeStyle = '#000';

		context.beginPath();
		context.lineTo(padding, canvas.height / 2);
		context.lineTo(canvas.width - padding - 10, canvas.height / 2);
		context.stroke();

		context.beginPath();
		context.lineTo(canvas.width / 2, padding + 10);
		context.lineTo(canvas.width / 2, canvas.height - padding);
		context.stroke();

		context.fillStyle = '#000';
		context.beginPath();
		context.lineTo(canvas.width - padding - 20, canvas.height / 2 - 5);
		context.lineTo(canvas.width - padding, canvas.height / 2);
		context.lineTo(canvas.width - padding - 20, canvas.height / 2 + 5);
		context.closePath();
		context.fill();

		context.beginPath();
		context.lineTo(canvas.width / 2 - 5, padding + 20);
		context.lineTo(canvas.width / 2, padding);
		context.lineTo(canvas.width / 2 + 5, padding + 20);
		context.closePath();
		context.fill();

		context.lineWidth = 1;
		context.strokeStyle = '#ddd';
		var x = grid;
		while (x + canvas.width / 2 < canvas.width - padding - 20) {
			context.beginPath();
			context.lineTo(canvas.width / 2 + x, padding + 20);
			context.lineTo(canvas.width / 2 + x, canvas.height - padding - 20);
			context.stroke();
			x += grid;
		}

		x = grid;
		while (canvas.width / 2 - x > padding + 20) {
			context.beginPath();
			context.lineTo(canvas.width / 2 - x, padding + 20);
			context.lineTo(canvas.width / 2 - x, canvas.height - padding - 20);
			context.stroke();
			x += grid;
		}

		x = grid;
		while (x + canvas.height / 2 < canvas.height - padding - 20) {
			context.beginPath();
			context.lineTo(padding + 20, canvas.height / 2 + x);
			context.lineTo(canvas.width - padding - 20, canvas.height / 2 + x);
			context.stroke();
			x += grid;
		}
		
	}
})();
