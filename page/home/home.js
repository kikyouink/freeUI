(function(){
	'use strict'	
	$(document).ready(function() {
		$('input').attr('maxlength','12');
		$('.tab_item').click(function() {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			var id = $(this).index(); //当前操作的元素索引值 
			var number1 = 80 + id * 120;
			var number2 = -id * 360;
			$('.slider').animate({
				marginLeft: number1
			});
			$('.main').animate({
				marginLeft: number2
			});
		});
		$('.sumbit').click(function(){
			//防止多次提交
			var that=$(this);
			var text=that.text();
			that.attr('disabled','true').text('提交中...');
			var username=that.siblings('.username').val();
			var password=that.siblings('.password').val();
			function back(){
				that.removeAttr('disabled').text(text);
			}
			//先检查正则相关问题，再进行相应处理
			var result=sys.checkReg([username,password]);
			switch(result){
				case 0:ui.showAlert('用户名及密码不能为空',back);break;
				case 1:ui.showAlert('用户名及密码均需6位以上',back);break;
				case true:ui.showAlert('用户名需为字母数字组合',back);break;
				case false:
					if(text=='注册') sys.sign([username,password],back);
					else sys.login([username,password],back);
				break;
			}
		});
	})
}())
