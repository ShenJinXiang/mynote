(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context1 =canvas.getContext('2d');
	let context2 =canvas.getContext('2d');
	console.log(context1 === context2);
})();
