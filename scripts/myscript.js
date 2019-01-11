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

