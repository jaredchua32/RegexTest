;(function($) {

var RegexTest = {
	errors: [
		"Invalid backslash(es).",
		"Invalid repeat ('+', '*', '?') symbols.",
		"Invalid parentheses.",
		"Invalid square brackets."
	],

	init: function(config) {
		this.regexBox = config.regexBox;
		this.testBox = config.testBox;
		this.resultsBox = config.resultsBox;
		this.rawResultsBox = config.rawResultsBox; //

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
			testString = this.testBox[0].value,
			validationResults = this.validateRegex(regexString);
		
		// My results.
		if(validationResults.isValid) {
			var newRegex = new RegExp(regexString);
			this.resultsBox[0].value = newRegex;		
		} else {
			this.resultsBox[0].value = validationResults.reason;
		}
		// End my results.

		// Raw results.
		try {
			var newRegexTwo = new RegExp(regexString);
			this.rawResultsBox[0].value = newRegexTwo;
		} catch(e) {
			this.rawResultsBox[0].value = e.message;
		}
		// End raw results.
	},

	validateRegex: function(userRegex) {
		var isValid = true,
			reason = "RegEx is valid."
			userRegexLen = userRegex.length,
			parensTotal = 0,
			lastParenIndex = 0,
			sqBracketsTotal = 0;			

		for(var index = 0; index < userRegexLen; index++) {
			var currentChar = userRegex.charAt(index),
				nextChar = userRegex.charAt(index + 1);
			// console.log('index:' + index + ' curChar:' + currentChar + ' nextChar:' + nextChar + ' isNaN(nextChar):' + isNaN(nextChar) + ' typeof(nextChar):' + typeof(nextChar));

			/* Check for illegal backslashes. */
			if(currentChar === '\\') {
				/* end of string */
				if(index === userRegexLen - 1) {
					isValid = false;
					reason = 'Invalid backslash at index: ' + index + '.';
					break;
				/* \ is followed by a valid char. */
				} else {
					index++;
				}
			} 

			/* Check the repeat symbols. */
			else if((currentChar === '*' || currentChar === '+' || currentChar === '?')) {
				if(index === 0) {
					isValid = false;
					reason = "Nothing to to repeat: invalid " + "'" + currentChar +
						 "' character at index: " + index + ".";
					break;
				} 

				else if(nextChar === '*' || nextChar === '+' || nextChar === '?') {
					isValid = false;
					reason = "Nothing to to repeat: invalid " + "'" + nextChar +
						"' character at index: " + (index + 1) + ".";
					break;
				}
			} 

			/* Check parentheses. */
			else if(currentChar === '(' || currentChar === ')') {
				if(currentChar === '(') {
					lastParenIndex = index;
					parensTotal++;
				} else {
					parensTotal--;
				}

				if(parensTotal < 0) {
					/* Invalidate immediately if more 
					 * closing parentheses than opening ones. */
					isValid = false;
					reason = "Unmatched ')' at index: " + index + ".";
					break;
				} else if(index == userRegexLen - 1) {
					/* End of loop reached. */
					if(parensTotal > 0) {
						/* More opening than closing parentheses. */
						isValid = false;
						reason = "Unmatched '(' at index: " + lastParenIndex;
					} else if(parensTotal === 0) {
						regexIsValid = true;
					}
				}
			} /* End check parentheses. */

			/* Check square brackets. */
			else if(currentChar === '[' || currentChar === ']') {
				if(currentChar === '[') {
					sqBracketsTotal++;
				} else {
					sqBracketsTotal--;
				}

				if(sqBracketsTotal < 0) {
					/* Invalidate immediately if more 
					 * closing sq. brackets than opening ones. */
					return {
						isValid: false,
						reason: 3
					}
				} else if(sqBracketsTotal > 0) {
					regexIsValid = false;
				} else if(sqBracketsTotal === 0) {
					regexIsValid = true;
				}
			}
		}

		console.log('----')
		return { isValid: isValid, reason: reason };
		// if(userRegex.charAt(userRegex.length - 1) === '\\' &&
		// 	userRegex.charAt(userRegex.length - 2) !== '\\') {

		// 	console.log('badregex');
		// 	return false;
		// }

		// return true;
		// if(userRegex.charAt(userRegex.length))
	} /* end validateRegex */
} /* RegexTest */

regexTest = function(config) {
	var regexTest = Object.create(RegexTest);
	regexTest.init(config);
	return regexTest;
}

myRegexTest = regexTest({
	regexBox: $("#regexBox"),
	testBox: $("#testBox"),
	resultsBox: $("#resultBox"),
	rawResultsBox: $("#rawResultBox")
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