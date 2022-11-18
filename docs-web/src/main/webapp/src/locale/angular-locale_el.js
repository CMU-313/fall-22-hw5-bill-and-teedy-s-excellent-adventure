'use strict';
angular.module('ngLocale', [], ['$provide', function ($provide) {
	const PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
	$provide.value('$locale', {
		DATETIME_FORMATS: {
			AMPMS: [
				'\u03C0.\u03BC.',
				'\u03BC.\u03BC.',
			],
			DAY: [
				'\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE',
				'\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1',
				'\u03A4\u03C1\u03AF\u03C4\u03B7',
				'\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7',
				'\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7',
				'\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE',
				'\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF',
			],
			ERANAMES: [
				'\u03C0\u03C1\u03BF \u03A7\u03C1\u03B9\u03C3\u03C4\u03BF\u03CD',
				'\u03BC\u03B5\u03C4\u03AC \u03A7\u03C1\u03B9\u03C3\u03C4\u03CC\u03BD',
			],
			ERAS: [
				'\u03C0.\u03A7.',
				'\u03BC.\u03A7.',
			],
			FIRSTDAYOFWEEK: 0,
			MONTH: [
				'\u0399\u03B1\u03BD\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5',
				'\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5',
				'\u039C\u03B1\u03C1\u03C4\u03AF\u03BF\u03C5',
				'\u0391\u03C0\u03C1\u03B9\u03BB\u03AF\u03BF\u03C5',
				'\u039C\u03B1\u0390\u03BF\u03C5',
				'\u0399\u03BF\u03C5\u03BD\u03AF\u03BF\u03C5',
				'\u0399\u03BF\u03C5\u03BB\u03AF\u03BF\u03C5',
				'\u0391\u03C5\u03B3\u03BF\u03CD\u03C3\u03C4\u03BF\u03C5',
				'\u03A3\u03B5\u03C0\u03C4\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5',
				'\u039F\u03BA\u03C4\u03C9\u03B2\u03C1\u03AF\u03BF\u03C5',
				'\u039D\u03BF\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5',
				'\u0394\u03B5\u03BA\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5',
			],
			SHORTDAY: [
				'\u039A\u03C5\u03C1',
				'\u0394\u03B5\u03C5',
				'\u03A4\u03C1\u03AF',
				'\u03A4\u03B5\u03C4',
				'\u03A0\u03AD\u03BC',
				'\u03A0\u03B1\u03C1',
				'\u03A3\u03AC\u03B2',
			],
			SHORTMONTH: [
				'\u0399\u03B1\u03BD',
				'\u03A6\u03B5\u03B2',
				'\u039C\u03B1\u03C1',
				'\u0391\u03C0\u03C1',
				'\u039C\u03B1\u0390',
				'\u0399\u03BF\u03C5\u03BD',
				'\u0399\u03BF\u03C5\u03BB',
				'\u0391\u03C5\u03B3',
				'\u03A3\u03B5\u03C0',
				'\u039F\u03BA\u03C4',
				'\u039D\u03BF\u03B5',
				'\u0394\u03B5\u03BA',
			],
			STANDALONEMONTH: [
				'\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2',
				'\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2',
				'\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2',
				'\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2',
				'\u039C\u03AC\u03B9\u03BF\u03C2',
				'\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2',
				'\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2',
				'\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2',
				'\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2',
				'\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2',
				'\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2',
				'\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2',
			],
			WEEKENDRANGE: [
				5,
				6,
			],
			fullDate: 'EEEE, d MMMM y',
			longDate: 'd MMMM y',
			medium: 'd MMM y h:mm:ss a',
			mediumDate: 'd MMM y',
			mediumTime: 'h:mm:ss a',
			short: 'd/M/yy h:mm a',
			shortDate: 'd/M/yy',
			shortTime: 'h:mm a',
		},
		NUMBER_FORMATS: {
			CURRENCY_SYM: '\u20AC',
			DECIMAL_SEP: ',',
			GROUP_SEP: '.',
			PATTERNS: [
				{
					gSize: 3,
					lgSize: 3,
					maxFrac: 3,
					minFrac: 0,
					minInt: 1,
					negPre: '-',
					negSuf: '',
					posPre: '',
					posSuf: '',
				},
				{
					gSize: 3,
					lgSize: 3,
					maxFrac: 2,
					minFrac: 2,
					minInt: 1,
					negPre: '-',
					negSuf: '\u00A0\u00A4',
					posPre: '',
					posSuf: '\u00A0\u00A4',
				},
			],
		},
		id: 'el',
		localeID: 'el',
		pluralCat(n, opt_precision) {
			if (n == 1) {
				return PLURAL_CATEGORY.ONE;
			}

			return PLURAL_CATEGORY.OTHER;
		},
	});
}]);
