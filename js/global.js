var ui={
	clear:function(){
		$('.front').empty();
	},
	showAlert:function(text){
		var alert=$('body').putDiv('alert normal',text);
		setTimeout(function(){
			alert.remove();
		},4000)
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