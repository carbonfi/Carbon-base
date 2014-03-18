// Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License
// https://github.com/scottjehl/Hide-Address-Bar
(function (win) {
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if (!location.hash && win.addEventListener) {

		//scroll to 1
		window.scrollTo(0, 1);
		var scrollTop = 1,
			getScrollTop = function () {
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function () {
				if (doc.body) {
					clearInterval(bodycheck);
					scrollTop = getScrollTop();
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 15);

		win.addEventListener("load", function () {
			setTimeout(function () {
				//at load, if user hasn't scrolled more than 20 or so...
				if (getScrollTop() < 20) {
					//reset to hide addr bar at onload
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 0);
		});
	}
})(this);



// Improved version of JavaScript fix for the iOS viewport scaling bug. See http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
// https://gist.github.com/mathiasbynens/901295
// By @mathias, @cheeaun and @jdalton
(function (doc) {

	var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [0.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));



// iOS Sticky :hover Fix – disable :hover on touch devices
// http://retrogamecrunch.com/tmp/hover-fix
// based on https://gist.github.com/4404503
if ('createTouch' in document) {
	try {
		var ignore = /:hover/;
		for (var i = 0; i < document.styleSheets.length; i++) {
			var sheet = document.styleSheets[i];
			for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
				var rule = sheet.cssRules[j];
				if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
					sheet.deleteRule(j);
				}
			}
		}
	} catch (e) {}
}



// 60fps scrolling using pointer-events: none
// http://www.thecssninja.com/javascript/pointer-events-60fps
// You need to add this to your CSS:
// .disable-hover, .disable-hover * { pointer-events: none !important; }
var body = document.body,
	timer;

window.addEventListener('scroll', function () {
	clearTimeout(timer);
	if (!body.classList.contains('disable-hover')) {
		body.classList.add('disable-hover');
	}

	timer = setTimeout(function () {
		body.classList.remove('disable-hover');
	}, 250);
}, false);

// Animate scrollto element
// To use: add class="scrollto" to an element and then define the scrolled target
// with data-attr data-scrollto="#element-id"
// Example: <div class="scrollto" data-scrollto="#content"></div>
$('.scrollto').click(function(e){
	e.preventDefault();
	$('html,body').animate({
		scrollTop: $($(this).data('scrollto')).offset().top + 'px'
	}, 800)
})