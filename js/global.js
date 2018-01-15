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
var ui={
	clear:function(){
		$('.front').empty();
	},
	showAlert:function(text,callback){
		var alert=$('body').putDiv('alert normal',text);
		setTimeout(function(){
			if(callback) callback();
			alert.remove();
		},2000)
	},
	showConfrim:function(text,callback){
		var confrim=$('body').putDiv('confrim',text);
		var buttonGroup=confrim.putDiv('buttonGroup');
		var yes=buttonGroup.put('button','yes','确认');
		var no=buttonGroup.put('button','no','取消');
		$('.yes,.no').click(function(){
			confrim.addClass('active');
			setTimeout(function(){
				confrim.remove();
			},1500);
			if($(this).hasClass('yes')) callback();
		});
	}
};
var sys={
	check:function(array,mode){
		var reg;
		mode=mode||'';
		switch(mode){
			case 'all':return 1;break;
			case 'remix':reg=/[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g;break;
			default:reg=/\W+/g;break;
		}
		for(var i=0;i<array.length;i++){
			if(array[i].length<6) return 0;
		}
		return reg.test(array[0]);
	},
	post:function(array,url,msg){
		var callback;
		var obj={
			username:array[0],
			password:array[1]
		}
		$.post(url,obj,function(data){
			console.log(data);
			if(data==msg){
				callback=function(){
					location.href='../../index.html';
				}
			}
			ui.showAlert(data,callback);
		},'text');
	},
	sign:function(array){
		var url="http://localhost/php/sign.php/";
		sys.post(array,url,'注册成功');
	},
	login:function(array){
		var url="http://localhost/php/login.php/";
		sys.post(array,url,'登录成功');
	}
}
$.fn.extend({
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
})
