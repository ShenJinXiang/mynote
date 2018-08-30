(function() {

	qyGrid();
	
	function qyGrid() {

		addEvent(_$('btn'), 'click', function(e) {
			console.log(e);
		});


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
