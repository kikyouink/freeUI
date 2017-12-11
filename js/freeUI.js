	var type;
	var source;
	
	function allowDrop(ev) {
		ev.preventDefault();
	
		source = ev.target;
		//	console.log(source);
	
	}
	
	function drag(ev) {
		type = ev.target.className.split(' ')[1];
		console.log(type);
	}
	
	function drop(ev) {
		console.log(ev.target + 'drop');
		ev.preventDefault();
		if(type == 'div') {
			var div = $(source).putDiv('default', '示例文字DIV');
			div.putDiv('coor');
		} else var node = $(source).put(type, 'default');
	
	}
(function() {
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
	var moving;
	function print(str) {
		$(".command_input").val(str);
	};

	function run() {
		var text = $('.command_input').val();
		$('.command_input').val('');
		eval(text);
	}
	//----------------JQ扩展--------------------	
	$.fn.extend({
		put: function(type, className, innerHTML) {
			if(!className) className = '';
			if(!innerHTML) innerHTML = '';
			console.log(type);
			var node = $("<" + type + "></" + type + ">");
			node.addClass(className);
			node.text(innerHTML);
			$(this).append(node);
			return node;
		},
		putDiv: function(className, innerHTML) {
			if(!className) className = '';
			if(!innerHTML) innerHTML = '';
			var div = $("<div></div>");
			div.addClass(className);			
			div.text(innerHTML);
			$(this).append(div);
			return div;
		},
		slideDown:function(){
			moving=true;
			$(this).css({
				'z-index': 100,
				'background-color': '#FDF0CC',
				'border':'2px solid gray',
			});
			$(this).animate({
				height: "120px"
			},function(){
				moving=false;
			});
		},
		slideUp:function(){
			moving=true;
			$(this).animate({
				height: "0px"
			},function(){
				$(this).css({
					'z-index':1,
					'border':'none',
				});
				moving=false;
			});
		},
		putParam:function(area){
			function a(){
				var input=menu.put('input');
				input.attr('type','number');
				input.val(area[i]);
			}
			function aa(){
				
			}
			function b(){
				var input=menu.put('input');
				input.attr('type','color');
			}
			function c(){
				var select_box=menu.putDiv('select_box');
				var select=select_box.putDiv('select','default');
				var ul=select.put('ul','option');
				for(var j=0;j<area[i].length;j++){
					var option=ul.put('li','',area[i][j]);
				}
			}
			for(var i in area){
				var menu=$(this).putDiv('menu '+i,i);
				if(typeof area[i]=='number'){
					a();
				}
				else if(typeof area[i]=='string'){
					b();
				}
				else{
					var first=area[i][0];
					if(first!='color'&&typeof first=='string'){
						c();
					}
					else{
						for(var j=0;j<area[i].length;j++){
							if(typeof area[i][j]=='number') aa();
							else if(typeof area[i][j]=='string') bb();
							else cc();
						}
					}
					
				}
			}
		}
	});

	//----------------系统流程--------------------
	$(document).ready(function() {
		$(document).on("contextmenu", function(e) {
			return false;
		});
		//----------------component--------------------	
		$('.main .item').attr({
			'draggable': 'true',
			'ondragstart': 'drag(event)'
		});
		$('.front').attr({
			'ondrop': 'drop(event)',
			'ondragover': 'allowDrop(event)'
		});
		$('.code').attr('contenteditable', 'true');
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
			if(!!this.move) {
				var posix = !document.move_target ? {
						'x': 0,
						'y': 0
					} : document.move_target.posix,
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
			if(!!this.move) {
				var callback = document.call_up || function() {};
				callback.call(this, e);
				$.extend(this, {
					'move': false,
					'move_target': null,
					'call_down': false,
					'call_up': false
				});
			}
		});
		$('.front').on('mousedown', '.default', function(e) {
			if(e.which == 3) {
				$(this).fadeOut('slow', function() {
					$(this).remove();
				});
				return false;
			}
			var $box = $(this);
			$box.focus();
			var position = $box.position();
			this.posix = {
				'x': e.pageX - position.left,
				'y': e.pageY - position.top
			};
			$.extend(document, {
				'move': true,
				'move_target': this
			});
			$box.on('mousedown', '.coor', function(e) {
				var posix = {
					'w': $box.width(),
					'h': $box.height(),
					'x': e.pageX,
					'y': e.pageY
				};
				$.extend(document, {
					'move': true,
					'call_down': function(e) {
						$box.css({
							'width': Math.max(30, e.pageX - posix.x + posix.w),
							'height': Math.max(30, e.pageY - posix.y + posix.h)
						});
					}
				});
				return false;
			});
			return false;
		})
		$('.default').click(function() {
			$('.default.active').removeClass('active');
			$(this).toggleClass('active');
			return false;
		});
		//控制台
		$('.command_input').keydown(function(e) {
			if(e.which == 13) run();
		})
		$('.command_btn').click(run);

		//翻转查看代码
		$('.front').dblclick(function(e) {
			var ss = $('.front').html();
			//HTML标签转义
			var a = ss.trim()
				.replace(/<div class="coor"><\/div\>/g, '')
				.replace(/style=\"(.*?)\"/g, '')
				.replace(/></g, "&gt;&#10;&lt;")
				.replace(/</g, "&#10;&lt;")
				.replace(/>/g, "&gt;&#10;&#09")
				.replace(/"/g, "&quot")
				.replace(/ /g, "&nbsp;")
			var code = $('.back').find('code').html(a);
			$('.front').css('transform', 'rotateY(180deg)');
			$('.back').css('transform', 'rotateY(0deg)');
			return false;
		});
		$('.back').dblclick(function(e) {
			$('.front').css('transform', 'rotateY(0deg)');
			$('.back').css('transform', 'rotateY(180deg)');
		});

		//----------------param--------------------	
		var param;
		$('.basic').putParam(style_basic);
		$('.advance').putParam(style_advance);
		$('.option').prepend( $("<li>default</li>"));
		$('.fold').on('click', function(e) {
			$(this).siblings('.menu.item').slideToggle('fast');
			return false;
		})
		$('.select_box').click(function(){
			$(this).find('.option').slideDown();
		});
		$('input').on('input porpertychange',function(){
			var number=str.replace(/[^1-9]/g, '');//123
			var string=str.replace(/\d+/g, '');//abc
		});
		$('li').hover(function() {
			if(moving) return ;
			var active=$('.default.active');
			if(!active.length) return ;
			var menu = $(this).parent().parent().parent();
			var select_box=$(this).parent().parent();
			var select = $(this).parent().siblings('.select');
			//获取可更改的样式数量并建立数组，方便之后替换样式
			var size=menu.children().size();
			console.log('size:'+size);
			var style=new Array(size);
			var index=select_box.index();
			console.log('index:'+index);			
			var name = menu.attr('class').split(' ')[1];
			var value = $(this).text();
			select.attr('value', value);
			select.text(value);
			if(value == 'default') value = ' ';
			var css = '';
			menu.children().each(function() {
				if($(this)[0].tagName == 'INPUT') {
					var val = $(this).val();
					if(val == '') val = 15;
					css += val + 'px ';
				}
				if($(this)[0].tagName == 'DIV'){
					css += value + ' ';
				}
			});
			console.log(css);
			$('.default.active').css(name, css);
			return false;
		})
		$('li').click(function() {
			var ul=$(this).parent();
			ul.slideUp();
			return false;	
		})
		$('.menu').click(function(){
			$('.fold').slideToggle();
		})
	});
}());