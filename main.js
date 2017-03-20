function Serialize(){
	var res = _.map($('.grid-stack .grid-stack-item:visible'), function (el) {
		el = $(el);
		var node = el.data('_gridstack_node');
		return {
			id: el.attr('data-custom-id'),
			x: node.x,
			y: node.y,
			width: node.width,
			height: node.height,
			txt: el.find('div.grid-stack-item-content.ui-draggable-handle').html()
		};
	});
	//alert(JSON.stringify(res));
	return JSON.stringify(res);
}
function LoadFromArrayTest(){
	var serialization = [
		{x: 0, y: 0, width: 2, height: 2},
		{x: 3, y: 1, width: 1, height: 2},
		{x: 4, y: 1, width: 1, height: 1},
		{x: 2, y: 3, width: 3, height: 1},
		{x: 1, y: 4, width: 1, height: 1},
		{x: 1, y: 3, width: 1, height: 1},
		{x: 2, y: 4, width: 1, height: 1},
		{x: 2, y: 5, width: 1, height: 1}
	];

	serialization = GridStackUI.Utils.sort(serialization);

	var grid = $('.grid-stack').data('gridstack');
	grid.removeAll();

	_.each(serialization, function (node) {
		grid.addWidget($('<div><div class="grid-stack-item-content" /></div>'),
			node.x, node.y, node.width, node.height);
	});
}
function LoadFromArray(jsonString){

	//serialization = GridStackUI.Utils.sort(serialization);
	serialization=JSON.parse(jsonString);

	var grid = $('.grid-stack').data('gridstack');
	grid.removeAll();

	_.each(serialization, function (node) {
		grid.addWidget($('<div><div class="grid-stack-item-content" >'+node.txt+'</div></div>'),
			node.x, node.y, node.width, node.height);
	});
}
function saveData(){
	var value=Serialize();
	$.cookie('app', value, { expires: 7 });
	//setCookie('app',value,8);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;

}
function readFromCookie(){
	//var cookie=getCookie('app');
	var cookie=$.cookie('app');
	LoadFromArray(cookie);
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}