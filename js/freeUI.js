var type;
var source;

function allowDrop(ev) {
	ev.preventDefault();
	source = ev.target;
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
	} else
		var node = $(source).put(type, 'default');

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
	var ui={
		clear:function(){
			$('.front').empty();
		},
		showAlert:function(value,full){
			full=full||true;
			var alert;
			if(full==false){
				alert=$('body').putDiv('alert full');
				alert.css("height",$(document).height());     
        		alert.css("width",$(document).width());
			}
			else{
				alert=$('body').putDiv('alert normal',value);
			}
			alert.fadeIn();
			setTimeout(function(){
				alert.fadeOut();
			},1500)
		}
	};
	//----------------JQ扩展--------------------	
	$.fn.extend({
		print: function(str) {
			$(this).text(str)
		},
		put: function(type, className, innerHTML) {
			className = className||'';
			innerHTML = innerHTML||'';
			var node = $("<" + type + "></" + type + ">");
			node.addClass(className);
			node.text(innerHTML);
			$(this).append(node);
			return node;
		},
		putDiv: function(className, innerHTML) {
			className = className||'';
			innerHTML = innerHTML||'';
			var div = $("<div></div>");
			div.addClass(className);
			div.text(innerHTML);
			$(this).append(div);
			return div;
		},
		putInput: function(className,val) {
			var input = $(this).put('input',className);
			input.attr('type', 'number');
			input.val(val);
		},
		putColor: function() {
			var input = $(this).put('input');
			input.attr('type', 'color');
		},
		putMenu: function(array) {
			var select_box = $(this).putDiv('select_box');
			var select = select_box.putDiv('select');
			var span=select.put('span', 'label','default');
			var ul = select.put('ul', 'option');
			for(var i = 0; i < array.length; i++) {
				var option = ul.put('li', '', array[i]);
			}
		},
		getParent: function(num) {
			var parent;
			while(num--) {
				if(parent) parent = parent.parent();
				else parent = $(this).parent();
			}
			return parent;
		},
		putParam: function(area) {
			for(var i in area) {
				if($.type(area[i]) == 'object') {
					var menul = $(this).putDiv('menul ' + i);
					var menu = menul.putDiv('menu ' + i, i);
					var ss=menu.put('span','ss','›');
					var fold = menul.putDiv('fold');
					for(var j in area[i]) {
						if($.type(area[i][j]) == 'number') {
							var menuItem = fold.putDiv('menu item ' + j, j);
							menuItem.putInput('number',area[i][j]);
						} else if(area[i][j] == 'color') {
							var menuItem = fold.putDiv('menu item ' + j, j);
							menuItem.putColor();
						} else {
							var menuItem = fold.putDiv('menu item ' + j, j);
							menuItem.putMenu(area[i][j]);
						}
					}
				} else {
					var menu = $(this).putDiv('menu ' + i, i);
					if($.type(area[i]) == 'number') {
						menu.putInput('number',area[i]);
					} else if(area[i] == 'color') {
						menu.putColor();
					} else if($.type(area[i]) == 'array') {
						menu.putMenu(area[i]);
					}
				}

			}
		},
		htmlcode:function(o){
			var that = $(this);
			//获取HTML内容
			var str = that.html();
			var mark = /[&<>]/g, mark_val = {"&":"&amp;","<":"&lt;",">":"&gt;"};
			str = str.replace(mark, function(c){
				return mark_val[c];
			});
			console.log(str);
			//缩进、处理内联样式
			str=str.trim().replace(/&lt;div class="coor"&gt;&lt;\/div&gt;/g,'')
			.replace(/style="(.*?)"/g, '')
			.replace(/&lt;(?!\/)(.*?)&gt;/g,function(f){
				return "<blockquote>"+f;
			}).replace(/&lt;\/(.*?)&gt;/g,function(b){
				return b+"</blockquote>";
			});
			//标签上色
			str=str.replace(/&lt;(.*?)&gt;/g,function(tag){
				//属性上色
				tag=tag.replace(/\w+(?==)/g,function(attr){
					return "<span class='attr'>"+attr+"</span>";
				});
				//引号上色
				//设置span的class全部使用单引号，再次替换引号内容即可互不干扰
				tag=tag.replace(/("(.*?)")/g,function(sign){
					return "<span class='sign'>"+sign+"</span>";
				});
				return "<span class='tag'>"+tag+"</span>"
			});
			o.html(str);	
		},	   
	});

	//----------------系统流程--------------------
	$(document).ready(function() {
		$(document).on("contextmenu", function(e) {
			return false;
		});
		//----------------header-----------------------	
		$('.header_menu .item').click(function(){
			ui.showAlert('功能仍在开发中...',false);
			console.log('alert');
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
			//右键清除目标
			if(e.which == 3) {
				$(this).fadeOut('slow', function() {
					$(this).remove();
				});
				return false;
			}
			$('.default.active').removeClass('active');
			$(this).addClass('active');
			var $box = $(this);
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
						var width=Math.max(30, e.pageX - posix.x + posix.w);
						var height=Math.max(30, e.pageY - posix.y + posix.h);
						$box.css({
							'width': width,
							'height': height
						});
						//动态显示值
						$('.width').find('input').val(width);
						$('.height').find('input').val(height);
					}
				});
				return false;
			});
			return false;
		})
		//控制台
		function run() {
			var text = $('.command_input').val();
			$('.command_input').val('');
			eval(text);
		}
		$('.command_input').keydown(function(e) {
			if(e.which == 13) run();
		});
		$('.command_btn').click(run);

		//双击翻转查看代码
		$('.front').dblclick(function(e) {
			var node=$('.code')[0];
//			for(var i in node.style){
//				console.log(i+':'+node.style[i]);
//			}
			$('.front').htmlcode($('.code'));
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
		//彻底解决冒泡问题
		$('*').on('click', function(e) {
			console.log($(this));
			return false;
		})
		//菜单点击
		$('.menu').on('click', function(e) {
			$(this).find('.ss').toggleClass('rotate');
			$(this).siblings('.fold').slideToggle();
		})
		//手风琴下拉菜单
		$('.label').click(function() {
			var ul=$(this).siblings('ul');
			var Ul=$('.select.active').find('ul').not(ul);
			Ul.slideUp();
			Ul.parent().removeClass('active');
			ul.slideToggle();
			ul.parent().toggleClass('active');
			
		});
		//悬浮选项
		$('li').hover(function() {
			var active = $('.default.active');
			if(!active.length){
				console.log('当前没有活跃元素');
				return;
			}
			var menu = $(this).getParent(4);
			var select_box = $(this).getParent(3);
			var select = $(this).getParent(2);
			
			var type = menu.attr('class').split(' ')[0];
			var name = menu.attr('class').split(' ')[1];
			var value=$(this).text();
			//区分普通菜单和折叠菜单
			if(type=='menu'){
				active.css(name,value);
				var label=select.find('.label');
				label.text(value);
				label.attr('value',value);
				
			}
			else{
				var style='';
				console.log('fold');
				
			}
		});
		$('li').click(function() {
			var ul = $(this).parent();
			ul.slideUp();
			return false;
		})
		$('.number').on('input propertychange',function(){
			var active = $('.default.active');
			if(!active.length){
				console.log('当前没有活跃元素');
				return;
			}
			var menu=$(this).parent();
			var type = menu.attr('class').split(' ')[0];
			var name = menu.attr('class').split(' ')[1];
			var value=$(this).val();
			if($(this).val()=='') value=0;
			if(type=='menu'){
				console.log(name+'  '+value);
				active.css(name,value+'px');
				menu.attr('value',value);
				
			}
			else{
				var style='';
				console.log('fold');
				
			}
			
		})
	});
}());