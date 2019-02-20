// ↑↑↓↓←→←→ba
cheat.add( [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], function() {
	var r = Math.random()
	var e = document.getElementsByClassName("book-body")[0]
	alert("We are the Future!");
	if ( r < 0.2 ) {
		e.style.backgroundImage = 'url("https://borderless.teamlab.art/images/pc-l/14787")';
		e.innerHTML = ""
	} else if ( r < 0.4 ) {
		e.style.backgroundImage = 'url("https://borderless.teamlab.art/images/pc-l/14590")';
		e.innerHTML = ""
	} else if ( r < 0.6 ) {
		e.style.backgroundImage = 'url("https://borderless.teamlab.art/images/pc-l/14927")';
		e.innerHTML = ""
	} else if ( r < 0.8 ) {
		e.style.backgroundImage = 'url("https://borderless.teamlab.art/images/pc-l/14924")';
		e.innerHTML = ""
	} else {
		e.style.backgroundImage = 'url("https://borderless.teamlab.art/images/pc-l/14788")';
		e.innerHTML = ""
	}
});

function code_exchange(){
	$('code').each(function(index,element){
		// console.log(element.innerHTML);
		if (element.innerHTML.match('file_path:')) {
			var file_path = element.innerHTML.match(/file_path:.+\n/)[0];
			element.innerHTML = element.innerHTML.split(/file_path:.+\n/)[1];
			if (file_path) {
				if (file_path.match(':')) {
					var file_name = file_path.split(':')[1];
					$(this).before('<span class="is_chenge" style="background-color: gainsboro;font-size: small;position: relative;top: -20px;left: -10px;">'+file_name+'</span>');
				}
			}
		}
	})	
}
$('head').on('DOMSubtreeModified propertychange', function() {
       code_exchange();
});
code_exchange();
