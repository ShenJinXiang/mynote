(function () {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 800;
	canvas.height = 800;
	let context = canvas.getContext('2d');

	let lg = context.createLinearGradient(100, 100, 700, 700);
	lg.addColorStop(0, '#058');
	lg.addColorStop(1, '#085');
	context.fillStyle = lg;
	context.fillRect(100, 100, 600, 600);
})();
