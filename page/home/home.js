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
	})
	$('.sumbit').click(function(){
		var username=$('.username').val();
		var password=$('.password').val();
		alert(username+'  '+password);
//		$.post("http://localhost/index.php",{
//			username:username,
//			password:password
//		},function(data){
//			alert(data);
//		},'text');
	})
})