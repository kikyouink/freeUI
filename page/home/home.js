(function(){
	'use strict'	
	$(document).ready(function() {
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
		$('.s').click(function(){		
			var username=$(this).siblings('.username').val();
			var password=$(this).siblings('.password').val();
			var url="http://localhost/index.php/";
			$.post(url,{
				username:username,
				password:password
			},function(data){
				ui.showAlert(data);
			},'text');
		})
	})
}())