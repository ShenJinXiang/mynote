(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(100, 200);
	context.lineTo(300, 400);
	context.lineTo(100, 600);

	context.moveTo(300, 200);
	context.lineTo(500, 400);
	context.lineTo(300, 600);

	context.moveTo(500, 200);
	context.lineTo(700, 400);
	context.lineTo(500, 600);

	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
	/*
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(100, 350);
	context.lineTo(500, 350);
	context.lineTo(500, 200);
	context.lineTo(700, 400);
	context.lineTo(500, 600);
	context.lineTo(500, 450);
	context.lineTo(100, 450);
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();

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
