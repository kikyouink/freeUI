//引入之前需引入jq
//公共函数
//----------------数组方法--------------------
	//搜寻
	Array.prototype.find = function(value) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == value) return this[i];
		}
		return null;
	}
	//移除
	Array.prototype.remove = function(item) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == item) {
				this.splice(i, 1);
				return;
			}
		}
		return null;
	}
//----------------JQ方法--------------------	
	$.fn.extend({          
        put:function(type,className,innerHTML){
        	if(!className) className='';
        	if(!innerHTML) innerHTML='';
			var node=$("<"+type+"></"+type+">");
			node.addClass(className);
			if(type=='option'){
				node.attr('value',innerHTML);
			}
			node.html(innerHTML);
			$(this).append(node);
			return node;
		},
		putDiv:function(className,innerHTML){
			if(!innerHTML) innerHTML='';
			var div=$("<div></div>");
			div.addClass(className);
			div.innerHTML=innerHTML;
			$(this).append(div);
			return div;
		},
	});
	
//----------------拖拽事件--------------------	
	var type;
	var type_bool;
	function allowDrop(ev) {
		ev.preventDefault();
	}
	
	function drag(ev) {
		type = ev.target.className.split(' ')[1];
		console.log(type);
	}
	
	function drop(ev) {
		ev.preventDefault();
		var node=$(ev.target).put(type);
		node.html('示例文字ABC');
		
	}

//----------------系统流程--------------------	
//拖动
$(document).ready(function() {
	//拖拽、组件界面
	$('.item').attr({
		'draggable':'true',
		'ondragstart':'drag(event)'
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
	$('.front').click(function(e) {
		var ss=$('.front').html();
		//HTML标签转义
		var a=ss.trim().replace(/</g, "&#10;&lt;").replace(/>/g, "&gt;&#10;&#09").replace(/"/g, "&quot").replace(/ /g,"&nbsp;").replace(/&#10;&#09&#10;/g,"&#10");
		把人code=$('.back').find('code').html(a);
		$('.front').css('transform','rotateY(180deg)');
		$('.back').css('transform','rotateY(0deg)');
		return false;
	});
	$('.back').click(function(e) {
		$('.front').css('transform','rotateY(0deg)');
		$('.back').css('transform','rotateY(180deg)');	
	});
	//参数界面
	for (var i in style_basic){
		var menu=$('.basic').putDiv('menu').html(i);
		if(typeof style_basic[i][0]!='object'){
			if(style_basic[i][0]==0){
				var input=menu.put('input');
			}
			else if(style_basic[i][0]=='color'){
				var input=menu.put('input');
				input.attr('type','color');
			}
			else{
				var select=menu.put('select');
				for(var j=0;j<style_basic[i].length;j++){
					select.put('option','',style_basic[i][j]);
				}
			}
		}
		else{
			
		}
	}
	for (var i in style_advance){
		var menu=$('.advance').putDiv('menu').html(i);
	}
});
