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
