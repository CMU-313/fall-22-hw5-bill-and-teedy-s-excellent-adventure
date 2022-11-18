'use strict';

/**
 * Image error event directive.
 */
angular.module('docs').directive('imgError', () => ({
	restrict: 'A',
	link(scope, element, attrs) {
		element.bind('error', () => {
			// Call the function that was passed
			scope.$apply(attrs.imgError);
		});
	},
}));
