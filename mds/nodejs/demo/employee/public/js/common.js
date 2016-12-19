/**
 * 获取form表单数据
 */
$.fn.getFormJson = function() {  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
}; 

/**
 * 重置表单
 */
function formReset(formId){
	var $form = $("#"+formId);
	$form.get(0).reset();
	$form.find("input[type='hidden']").val("");
}

/**
 * 执行ajax post请求
 */
function doPost(url, data, callback) {
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		dataType: 'json',
		success: callback
	});
}

/**
 * 提示信息 用于表单验证
 */
function tips(str, key) {
	layer.tips(str, '#' + key);
}

/**
 * 弹出提示信息
 */
function alertMsg (str, fn) {
	if (typeof fn === 'function') {
		layer.msg(str, {time: 2000}, fn);
	} else {
		layer.msg(str, {time: 2000});
	}
}

/**
 * 弹出layer窗口
 */
function openContent(title, width, contentId) {
	layer.open({
		type: 1, 
		area: [width + 'px', 'auto'],
		title: title,
		shade: 0.6, 
		anim: 1,
		content: $('#' + contentId)
	}); 
}

/**
 * 关闭layer弹出窗口
 */
function closeLayer() {
	layer.closeAll();
}
