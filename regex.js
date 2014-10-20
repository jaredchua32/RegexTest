;(function($) {

var RegexTest = {
	init: function(config) {
		this.regexBox = config.regexBox;
		this.testBox = config.testBox;
		this.resultsBox = config.resultsBox;

		this.bindEvents();
	},

	bindEvents: function() {
		var self = this;

		this.regexBox.on('keyup', function() {
			clearTimeout(self.updateTimeout);
			self.updateTimeout = setTimeout(function() {
				self.update();
			}, 500);
		});

		this.testBox.on('keyup', function() {
			self.updateCountdown();
		});
	},

	updateCountdown: function() {
		var self = this;

		clearTimeout(self.updateTimeout);
		self.updateTimeout = setTimeout(function() {
			self.update();
		}, 500);
	},

	update: function() {
		var regexString = this.regexBox[0].value,
			testString = this.testBox[0].value;

		if(this.validateRegex(regexString)) {
			var newRegex = new RegExp(regexString);
			this.resultsBox[0].value = newRegex;		
		} else {
			this.resultsBox[0].value = "";
		}
	},

	validateRegex: function(userRegex) {
		var regexIsValid = true,
			userRegexLen = userRegex.length;

		for(var index = 0; index < userRegexLen; index++) {
			if(userRegex.charAt(index) === '\\') {
				/* end of string returns NaN */
				if(isNaN(userRegex.charCodeAt(index + 1))) {
					regexIsValid = false;
				/* \ is followed by a valid char. */
				} else {
					index++;
				}
			}
		}

		return regexIsValid;		
		// if(userRegex.charAt(userRegex.length - 1) === '\\' &&
		// 	userRegex.charAt(userRegex.length - 2) !== '\\') {

		// 	console.log('badregex');
		// 	return false;
		// }

		// return true;
		// if(userRegex.charAt(userRegex.length))
	}
} /* RegexTest */

regexTest = function(config) {
	var regexTest = Object.create(RegexTest);
	regexTest.init(config);
	return regexTest;
}

myRegexTest = regexTest({
	regexBox: $("#regexBox"),
	testBox: $("#testBox"),
	resultsBox: $("#resultBox")
});

})(jQuery);

// r1 = regexTest();
// var timeout;

// $('#regex').on('keyup', function() {
// 	clearTimeout(timeout);
// 	timeout = setTimeout(function() {
// 		console.log('up!');
// 	}, 500)
// });