'use strict';

/**
 * Password reset controller.
 */
angular.module('docs').controller('PasswordReset', ($scope, Restangular, $state, $stateParameters, $translate, $dialog) => {
	$scope.submit = function () {
		Restangular.one('user').post('password_reset', {
			key: $stateParameters.key,
			password: $scope.password,
		}).then(() => {
			$state.go('login');
		}, () => {
			const title = $translate.instant('passwordreset.error_title');
			const message = $translate.instant('passwordreset.error_message');
			const btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
			$dialog.messageBox(title, message, btns);
		});
	};
});
