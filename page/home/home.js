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
			var username=$(this).siblings('.username').val();
			var password=$(this).siblings('.password').val();
			switch(sys.check([username,password])){
				case 0:ui.showAlert('用户名及密码均需6位以上');break;
				case true:ui.showAlert('用户名需为字母数字组合');break;
				case false:
					if($(this).text()=='注册'){
						sys.sign([username,password]);
					}
					else sys.login([username,password]);
				break;
			}
		});
	})
}())
