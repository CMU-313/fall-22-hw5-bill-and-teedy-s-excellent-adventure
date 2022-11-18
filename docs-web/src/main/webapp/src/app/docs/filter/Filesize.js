'use strict';

/**
 * Format file sizes.
 */
angular.module('docs').filter('filesize', $translate => function (text) {
	if (!text) {
		return '';
	}

	const size = Number.parseInt(text);
	if (size > 1_000_000) { // 1MB
		return Math.round(size / 1_000_000) + $translate.instant('filter.filesize.mb');
	}

	return Math.round(size / 1000) + $translate.instant('filter.filesize.kb');
});
