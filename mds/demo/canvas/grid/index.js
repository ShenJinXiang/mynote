(function() {

	qyGrid({
		el: 'qyGrid'
	});
	
	function qyGrid(option) {


		var _option = {
			el: option.el,
			rowNum: option.rowNum || 40,
			colNum: option.colNum || 20,
			rowHeight: 24,
			colWidth: 120,
			lineColor: '#c3c3c3',
			rulerWidth: 30,
			rulerHeight: 20
		};

		var _data = {};

		initData();
		draw();


//  ----------------------------------------------------------------------------------------------------------------



		/**
		 * 初始化_data, 只执行一次
		 */
		function initData() {
			_data.rows = [];
			_data.cols = [];
			_data.cells = [];
			for (var r = 0; r <= _option.rowNum; r++) {
				_data.rows.push(_option.rulerHeight + r * _option.rowHeight);
			}
			for (var c = 0; c <= _option.colNum; c++) {
				_data.cols.push(_option.rulerWidth + c * _option.colWidth);
			}
			
			for (var r = 0; r < _option.rowNum; r++) {
				var row = [];
				for (var c = 0; c < _option.colNum; c++) {
					var _obj = {
						id: 'R' + r + 'C' + c,
						minX: _option.rulerWidth + c * _option.colWidth,
						maxX: _option.rulerWidth + (c + 1) * _option.colWidth,
						minY: _option.rulerHeight + r * _option.rowHeight,
						maxY: _option.rulerHeight + (r + 1) * _option.rowHeight
					}
					row.push(_obj);
				}
				_data.cells.push(row);
			}
			console.log(_data);
		};


		function draw() {
			var canvas = document.createElement('canvas');
			_$(_option.el).appendChild(canvas);
			var context = canvas.getContext('2d');
			drawByData(context);
		}

		function drawByData(ctx) {
			var canvas = ctx.canvas;
			canvas.width = _data.cols[_data.cols.length - 1];
			canvas.height = _data.rows[_data.rows.length - 1];
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.save();
			ctx.fillStyle = '#fafafa';
			ctx.fillRect(0, 0, canvas.width, _data.rows[0]);
			ctx.fillRect(0, 0, _data.cols[0], canvas.height);
			ctx.restore();

			// 绘制横线
			for (var r = 0; r < _data.rows.length; r++) {
				drawLine(0, _data.rows[r], _option.rulerWidth, _data.rows[r], '#dadada', 1);
				if (r != 0) {
					drawLine(_option.rulerWidth, _data.rows[r], canvas.width, _data.rows[r], _option.lineColor, 1);
				}
				if (r != _data.rows.length - 1) {
					drawRulerText(_option.rulerWidth / 2, (_data.rows[r] + _data.rows[r + 1]) / 2, 'R' + r);
				}
			}

			// 绘制竖线
			for (var c = 0; c < _data.cols.length; c++) {
				drawLine(_data.cols[c], 0, _data.cols[c], _option.rulerHeight, '#dadada', 1);
				if (c != 0) {
					drawLine(_data.cols[c], _option.rulerHeight, _data.cols[c], canvas.height, _option.lineColor, 1);
				}
				if (c != _data.cols.length - 1) {
					drawRulerText((_data.cols[c] + _data.cols[c + 1]) / 2, _option.rulerHeight / 2, 'C' + c);
				}
			}

			drawLine(0, _data.rows[0], canvas.width, _data.rows[0], _option.lineColor, 1);
			drawLine(_data.cols[0], 0, _data.cols[0], canvas.height, _option.lineColor, 1);


			function drawRulerText(x, y, txt) {
				ctx.save();
				ctx.fillStyle = '#5f7489';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = '12px';
				ctx.fillText(txt, x, y);
				ctx.restore();
			}

			function drawLine(sx, sy, ex, ey, color, width) {
				ctx.save();
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.beginPath();
				ctx.moveTo(sx, sy);
				ctx.lineTo(ex, ey);
				ctx.stroke();
				ctx.restore();
			}
		}





//  ----------------------------------------------------------------------------------------------------------------



		/**
		 * 根据元素id获取dom节点
		 */
		function _$(id) {
			return document.getElementById(id);
		}

		/**
		 * 事件绑定
		 */
		function addEvent(element, type, handler) {
			if (element.addEventListener) {  //如果支持addEventListener
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {  //如果支持attachEvent
				element.attachEvent("on" + type, function(){
					handler.call(element);  // 将this指向当前DOM对象
				});
			} else {  //否则使用兼容的onclick绑定
				element["on" + type] = handler;
			}
		}

		/*
		 * 事件解绑
		 */
		function removeEvent(element, type, handler) {
			if (element.addEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		}

	}
})();
