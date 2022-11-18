'use strict';
angular.module('ngLocale', [], ['$provide', function ($provide) {
	const PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
	$provide.value('$locale', {
		DATETIME_FORMATS: {
			AMPMS: [
				'AM',
				'PM',
			],
			DAY: [
				'dimanche',
				'lundi',
				'mardi',
				'mercredi',
				'jeudi',
				'vendredi',
				'samedi',
			],
			ERANAMES: [
				'avant J\u00E9sus-Christ',
				'apr\u00E8s J\u00E9sus-Christ',
			],
			ERAS: [
				'av. J.-C.',
				'ap. J.-C.',
			],
			FIRSTDAYOFWEEK: 0,
			MONTH: [
				'janvier',
				'f\u00E9vrier',
				'mars',
				'avril',
				'mai',
				'juin',
				'juillet',
				'ao\u00FBt',
				'septembre',
				'octobre',
				'novembre',
				'd\u00E9cembre',
			],
			SHORTDAY: [
				'dim.',
				'lun.',
				'mar.',
				'mer.',
				'jeu.',
				'ven.',
				'sam.',
			],
			SHORTMONTH: [
				'janv.',
				'f\u00E9vr.',
				'mars',
				'avr.',
				'mai',
				'juin',
				'juil.',
				'ao\u00FBt',
				'sept.',
				'oct.',
				'nov.',
				'd\u00E9c.',
			],
			STANDALONEMONTH: [
				'janvier',
				'f\u00E9vrier',
				'mars',
				'avril',
				'mai',
				'juin',
				'juillet',
				'ao\u00FBt',
				'septembre',
				'octobre',
				'novembre',
				'd\u00E9cembre',
			],
			WEEKENDRANGE: [
				5,
				6,
			],
			fullDate: 'EEEE d MMMM y',
			longDate: 'd MMMM y',
			medium: 'd MMM y HH:mm:ss',
			mediumDate: 'd MMM y',
			mediumTime: 'HH:mm:ss',
			short: 'dd/MM/y HH:mm',
			shortDate: 'dd/MM/yyyy',
			shortTime: 'HH:mm',
		},
		NUMBER_FORMATS: {
			CURRENCY_SYM: '\u20AC',
			DECIMAL_SEP: ',',
			GROUP_SEP: '\u00A0',
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
		id: 'fr',
		localeID: 'fr',
		pluralCat(n, opt_precision) {
			const i = n | 0; if (i == 0 || i == 1) {
				return PLURAL_CATEGORY.ONE;
			}

			return PLURAL_CATEGORY.OTHER;
		},
	});
}]);
