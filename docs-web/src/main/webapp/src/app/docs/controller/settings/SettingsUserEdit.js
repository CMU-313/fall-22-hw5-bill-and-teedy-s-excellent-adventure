'use strict';

/**
 * Settings user edition page controller.
 */
angular.module('docs').controller('SettingsUserEdit', ($scope, $dialog, $state, $stateParameters, Restangular, $translate) => {
	/**
   * Returns true if in edit mode (false in add mode).
   */
	$scope.isEdit = function () {
		return $stateParameters.username;
	};

	/**
   * In edit mode, load the current user.
   */
	if ($scope.isEdit()) {
		Restangular.one('user', $stateParameters.username).get().then(data => {
			data.storage_quota /= 1_000_000;
			$scope.user = data;
		});
	} else {
		$scope.user = {}; // Very important otherwise ng-if in template will make a new scope variable
	}

	/**
   * Update the current user.
   */
	$scope.edit = function () {
		let promise = null;
		const user = angular.copy($scope.user);
		user.storage_quota *= 1_000_000;

		if ($scope.isEdit()) {
			promise = Restangular
				.one('user', $stateParameters.username)
				.post('', user);
		} else {
			promise = Restangular
				.one('user')
				.put(user);
		}

		promise.then(() => {
			$scope.loadUsers();
			$state.go('settings.user');
		}, error => {
			if (error.data.type === 'AlreadyExistingUsername') {
				const title = $translate.instant('settings.user.edit.edit_user_failed_title');
				const message = $translate.instant('settings.user.edit.edit_user_failed_message');
				const btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
				$dialog.messageBox(title, message, btns);
			}
		});
	};

	/**
   * Delete the current user.
   */
	$scope.remove = function () {
		const title = $translate.instant('settings.user.edit.delete_user_title');
		const message = $translate.instant('settings.user.edit.delete_user_message');
		const btns = [
			{result: 'cancel', label: $translate.instant('cancel')},
			{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'},
		];

		$dialog.messageBox(title, message, btns, result => {
			if (result === 'ok') {
				Restangular.one('user', $stateParameters.username).remove().then(() => {
					$scope.loadUsers();
					$state.go('settings.user');
				}, error => {
					if (error.data.type === 'UserUsedInRouteModel') {
						const title = $translate.instant('settings.user.edit.user_used_title');
						const message = $translate.instant('settings.user.edit.user_used_message', {name: error.data.message});
						const btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
						$dialog.messageBox(title, message, btns);
					}
				});
			}
		});
	};

	/**
   * Send a password reset email.
   */
	$scope.passwordReset = function () {
		Restangular.one('user').post('password_lost', {
			username: $stateParameters.username,
		}).then(() => {
			const title = $translate.instant('settings.user.edit.password_lost_sent_title');
			const message = $translate.instant('settings.user.edit.password_lost_sent_message', {username: $stateParameters.username});
			const btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
			$dialog.messageBox(title, message, btns);
		});
	};

	$scope.disableTotp = function () {
		const title = $translate.instant('settings.user.edit.disable_totp_title');
		const message = $translate.instant('settings.user.edit.disable_totp_message');
		const btns = [
			{result: 'cancel', label: $translate.instant('cancel')},
			{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'},
		];

		$dialog.messageBox(title, message, btns, result => {
			if (result === 'ok') {
				Restangular.one('user/' + $stateParameters.username + '/disable_totp').post('').then(() => {
					$scope.user.totp_enabled = false;
				});
			}
		});
	};
});
