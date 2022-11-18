'use strict';

/**
 * Format file sizes.
 */
angular.module('share').filter('filesize', () => function (text) {
	if (!text) {
		return '';
	}

	const size = Number.parseInt(text);
	if (size > 1_000_000) { // 1MB
		return Math.round(size / 1_000_000) + 'MB';
	}

	return Math.round(size / 1000) + 'kB';
});
