'use strict';
angular.module('ngLocale', [], ['$provide', function ($provide) {
	const PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
	function getDecimals(n) {
		n = String(n);
		const i = n.indexOf('.');
		return (i == -1) ? 0 : n.length - i - 1;
	}

	function getVF(n, opt_precision) {
		let v = opt_precision;

		if (undefined === v) {
			v = Math.min(getDecimals(n), 3);
		}

		const base = 10 ** v;
		const f = ((n * base) | 0) % base;
		return {v, f};
	}

	$provide.value('$locale', {
		DATETIME_FORMATS: {
			AMPMS: [
				'AM',
				'PM',
			],
			DAY: [
				'domenica',
				'luned\u00EC',
				'marted\u00EC',
				'mercoled\u00EC',
				'gioved\u00EC',
				'venerd\u00EC',
				'sabato',
			],
			ERANAMES: [
				'avanti Cristo',
				'dopo Cristo',
			],
			ERAS: [
				'a.C.',
				'd.C.',
			],
			FIRSTDAYOFWEEK: 0,
			MONTH: [
				'gennaio',
				'febbraio',
				'marzo',
				'aprile',
				'maggio',
				'giugno',
				'luglio',
				'agosto',
				'settembre',
				'ottobre',
				'novembre',
				'dicembre',
			],
			SHORTDAY: [
				'dom',
				'lun',
				'mar',
				'mer',
				'gio',
				'ven',
				'sab',
			],
			SHORTMONTH: [
				'gen',
				'feb',
				'mar',
				'apr',
				'mag',
				'giu',
				'lug',
				'ago',
				'set',
				'ott',
				'nov',
				'dic',
			],
			STANDALONEMONTH: [
				'gennaio',
				'febbraio',
				'marzo',
				'aprile',
				'maggio',
				'giugno',
				'luglio',
				'agosto',
				'settembre',
				'ottobre',
				'novembre',
				'dicembre',
			],
			WEEKENDRANGE: [
				5,
				6,
			],
			fullDate: 'EEEE d MMMM y',
			longDate: 'd MMMM y',
			medium: 'dd MMM y HH:mm:ss',
			mediumDate: 'dd MMM y',
			mediumTime: 'HH:mm:ss',
			short: 'dd/MM/yy HH:mm',
			shortDate: 'dd/MM/yy',
			shortTime: 'HH:mm',
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
		id: 'it',
		localeID: 'it',
		pluralCat(n, opt_precision) {
			const i = n | 0; const vf = getVF(n, opt_precision); if (i == 1 && vf.v == 0) {
				return PLURAL_CATEGORY.ONE;
			}

			return PLURAL_CATEGORY.OTHER;
		},
	});
}]);
