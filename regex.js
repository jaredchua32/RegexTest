// ;(function($) {

// var RegexTest = {
// 	init: function() {

// 	},
// } /* RegexTest */

// regexTest = function() {
// 	var regexTest = Object.create(RegexTest);
// 	return regexTest;
// }

// })(jQuery);

// r1 = regexTest();
var timeout;

$('#regex').on('keyup', function() {
	clearTimeout(timeout);
	timeout = setTimeout(function() {
		console.log('up!');
	}, 500)
});