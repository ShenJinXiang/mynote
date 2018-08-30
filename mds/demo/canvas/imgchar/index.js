(function() {
	var body = document.getElementsByTagName('body')[0];
	var img = new Image();
	img.src = './01.jpg';
	img.onload = function() {
		var startCtx = drawStartImage();
		drawGrayImage(startCtx);
	}


	function drawStartImage() {
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		body.append(canvas);
		return ctx;
	}

	function drawGrayImage(sctx) {
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');

		var imgData = sctx.getImageData(0, 0, img.width, img.height);
		console.log(imgData);
	}
})();
