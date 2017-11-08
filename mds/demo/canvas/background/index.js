(function() {
	draw({
		elem: 'canvas',
		width: window.innerWidth,
		height: window.innerHeight,
		background: '#fefefe',
		ballColor: 'rgba(200, 200, 200, 0.4)',
		min: 0.5,
		max: 20,
		maxV: 1,
		size: 50,
		maxLine: 200,
		outer: 100,
		lineColor: 'rgba(220, 220, 220, 0.5)'
	});
	function draw(config) {

		var canvas = document.getElementById(config.elem);
		canvas.width = config.width;
		canvas.height = config.height;
		var context = canvas.getContext('2d');
		
		var balls = [];

		initBalls();
		console.log(balls);

		setInterval(function() {
			drawBalls();
			update();
		}, 50);



		function drawBalls() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = config.background;
			context.fillRect(0, 0, canvas.width, canvas.height);

			context.fillStyle = config.ballColor;
			context.strokeStyle = config.lineColor;
			for (var i = 0 ; i < balls.length; i++) {
				var b = balls[i];
				context.beginPath();
				context.arc(b.x, b.y, b.r, 0, 2 * Math.PI, false);
				context.closePath();
				context.fill();

				for (var j = i + 1; j < balls.length; j++) {
					var d = balls[j];
					if (distance(b, d) < config.maxLine) {
						context.beginPath();
						context.lineWidth = 1;
						context.moveTo(b.x, b.y);
						context.lineTo(d.x, d.y);
						context.stroke();
					}
				}

			}
		}

		function update() {
			for (var i = 0; i < balls.length; i++) {
				var b = balls[i];
				b.x += b.vx;
				b.y += b.vy;
				if (b.x < -config.outer || b.x > (canvas.width + config.outer)) {
					b.vx = -b.vx;
				}
				if (b.y < -config.outer || b.y > (canvas.height + config.outer)) {
					b.vy = -b.vy;
				}
			}
		}

		function initBalls() {
			for (var i = 0; i < config.size; i++) {
				var ball = new Ball(
					random(-config.outer, canvas.width + config.outer),
					random(-config.outer, canvas.height + config.outer),
					random(config.min, config.max),
					random(-config.maxV, config.maxV),
					random(-config.maxV, config.maxV)
				);
				balls.push(ball);
			}
		}

		function Ball(x, y, r, vx, vy) {
			this.x = x;	
			this.y = y;	
			this.r = r;	
			this.vx = vx;	
			this.vy = vy;	
		}

		function random(b, e) {
			return b + Math.random() * (e - b);
		}

		function distance(b1, b2) {
			var d = (b1.x - b2.x) * (b1.x - b2.x) + (b1.y - b2.y) * (b1.y - b2.y);
			return Math.sqrt(d);
		}
	};
})();
