var type;
var source;
function allowDrop(ev) {
	ev.preventDefault();
	
	source=ev.target;
//	console.log(source);
	
}

function drag(ev) {
	type = ev.target.className.split(' ')[1];
	console.log(type);
}

function drop(ev) {
	console.log(ev.target+'drop');
	ev.preventDefault();
	if(type=='div'){
		var div=$(source).putDiv('default','DIV');
		div.putDiv('coor');
	}
	else var node=$(source).put(type,'default');	
	
}
(function(){
	'use strict'
	//----------------数组方法--------------------
	//搜寻
//	Array.prototype.find = function(value) {
//		for(var i = 0; i < this.length; i++) {
//			if(this[i] == value) return this[i];
//		}
//		return null;
//	}
//	//移除
//	Array.prototype.remove = function(item) {
//		for(var i = 0; i < this.length; i++) {
//			if(this[i] == item) {
//				this.splice(i, 1);
//				return;
//			}
//		}
//		return null;
//	}
	function print(str){
		$(".command_input").val(str);
	};
	function run(){
		var text=$('.command_input').val();
		$('.command_input').val('');
		eval(text);
	}
	//----------------JQ扩展--------------------	
	$.fn.extend({          
        put:function(type,className,innerHTML){
        	if(!className) className='';
        	if(!innerHTML) innerHTML='';
        	console.log(type);
        	var node=$("<"+type+"></"+type+">");
			node.addClass(className);
			node.html(innerHTML);
			$(this).append(node);
			return node;
		},
		putDiv:function(className,innerHTML){
			if(!className) className='';
			if(!innerHTML) innerHTML='';
			var div=$("<div></div>");
			div.addClass(className);
			div.html(innerHTML);
			$(this).append(div);
			return div;
		},
	});
	
	//----------------系统流程--------------------
	$(document).ready(function() {
		$(document).on("contextmenu",function(e){
	        return false;
	    });
		//----------------component--------------------	
		$('.main .item').attr({
			'draggable':'true',
			'ondragstart':'drag(event)'
		});
		$('.front').attr({
			'ondrop':'drop(event)', 
			'ondragover':'allowDrop(event)'
		});
		$('.code').attr('contenteditable','true');
		$('.menu.item').hide();
		$('.tab_item').click(function() {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			var id = $(this).index(); //当前操作的元素索引值 
			var number1 = 25 + id * 110;
			var number2 = -id * 350;
			$('.slider').animate({
				marginLeft: number1
			});
			$('.main').animate({
				marginLeft: number2
			});
		})
		//----------------preview--------------------	
		//拖拽
		$(document).mousemove(function(e) {
			if (!!this.move) {
				var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
					callback = document.call_down || function() {
						$(this.move_target).css({
							'top': e.pageY - posix.y,
							'left': e.pageX - posix.x,
						});
//						console.log($(this.move_target).position());
					};
	
				callback.call(this, e, posix);
				return false;
			}
		}).mouseup(function(e) {
			if (!!this.move) {
				var callback = document.call_up || function(){};
				callback.call(this, e);
				$.extend(this, {
					'move': false,
					'move_target': null,
					'call_down': false,
					'call_up': false
				});
			}
		});
		$('.front').on('mousedown','.default',function(e){
			if(e.which==3){
			 	$(this).fadeOut('slow',function(){
			 		$(this).remove();
			 	});
			 	return false;
			}
			var $box = $(this);
			$box.focus();
		    var position = $box.position();
		    this.posix = {'x': e.pageX - position.left, 'y': e.pageY - position.top};
		    $.extend(document, {'move': true, 'move_target': this});
			$box.on('mousedown', '.coor', function(e) {
			    var posix = {
		            'w': $box.width(), 
		            'h': $box.height(), 
		            'x': e.pageX, 
		            'y': e.pageY
		        };
			    $.extend(document, {'move': true, 'call_down': function(e) {
			        $box.css({
			            'width': Math.max(30, e.pageX - posix.x + posix.w),
			            'height': Math.max(30, e.pageY - posix.y + posix.h)
			        });
			    }});
			    return false;
			});
			 return false;
		})
		$('.default').click(function(){
			$('.default.active').removeClass('active');
			$(this).toggleClass('active');
			return false;
		});
		//控制台
		$('.command_input').keydown(function(e){
			if(e.which==13) run();
		})
		$('.command_btn').click(run);
		
		//翻转查看代码
		$('.front').dblclick(function(e) {
			var ss=$('.front').html();
			//HTML标签转义
			var a=ss.trim()
			.replace(/<div class="coor"><\/div\>/g,'')
			.replace(/style=\"(.*?)\"/g,'')
			.replace(/></g, "&gt;&#10;&lt;")
			.replace(/</g, "&#10;&lt;")
			.replace(/>/g, "&gt;&#10;&#09")
			.replace(/"/g, "&quot")
			.replace(/ /g,"&nbsp;")
			var code=$('.back').find('code').html(a);
			$('.front').css('transform','rotateY(180deg)');
			$('.back').css('transform','rotateY(0deg)');
			return false;
		});
		$('.back').dblclick(function(e) {
			$('.front').css('transform','rotateY(0deg)');
			$('.back').css('transform','rotateY(180deg)');	
		});
		
		//----------------param--------------------	
		var param;
		$('.fold').on('click',function(e){
			$(this).siblings('.menu.item').slideToggle('fast');
		})
		$('.select').mouseenter(function(){
			$(this).animate({
				height:"120px"
			});
			$(this).css({
				'z-index':100,
				'background-color':'#FDF0CC',
			});
		})
		$('.select').mouseleave(function(){
			$(this).animate({
				height:"26px"
			},function(){
				$(this).css('z-index',0);
			});
		})
		$('li').hover(function(){
			console.log('hover');
			var style=$(this).parent().parent().parent().className;
			console.log(style);
//			$('.default.active')
		})
	});
}());
