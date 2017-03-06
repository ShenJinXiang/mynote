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
