(function() {
	/*
	 * 桃心型线的参数方程：
   * x = 16 （sinθ）^3
   * y = 13 cosθ- 5 cos 2θ - 2 cos 3θ - cos 4θ
   * 玫瑰线的参数方程：
   * x=sin4θ×cosθ
   * y=sin4θ×sinθ
	 */
	var canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	drawHeart(canvas.width / 2, canvas.height / 2);
	// drawMG(canvas.width / 2, canvas.height / 2);

	function drawHeart(x, y) {
		context.save();
		context.translate(x, y)
		context.beginPath();
		var n = 720;
		var r = 15
		var step = Math.PI * 2 / n;
		t = 0;
		var hxy = heartXY(t, r);
		context.moveTo(hxy.x, hxy.y);
		while (t <= Math.PI * 2) {
			hxy = heartXY(t, r);
			context.lineTo(hxy.x, hxy.y);
			t += step;
		}
		context.closePath();
		context.stroke();
		//context.restore();
		context.fillStyle = 'red';
		context.fill();
	}

	function drawMG(x, y) {
		context.save();
		context.translate(x, y)
		context.beginPath();
		var n = 100;
		var r = 20;
		var step = Math.PI * 2 / n;
		t = 0;
		var mxy = mgXY(t, r);
		context.moveTo(mxy.x, mxy.y);
		while (t <= Math.PI * 2) {
			mxy = mgXY(t, r);
			context.lineTo(mxy.x, mxy.y);
			t += step;
		}
		context.closePath();
		context.stroke();
		context.restore();
	}

	function heartXY(t, r) {
		return {
			x: r * 16 * Math.pow(Math.sin(t), 3),
			y: -r * (13 * Math.cos(t)- 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t) )
		};
	}

	function mgXY(t, r) {
		return {
			x : r * (Math.sin(4 * t) * Math.cos(t)),
			y : r * (Math.sin(4 * t) * Math.sin(t))
		};
	}

})();
