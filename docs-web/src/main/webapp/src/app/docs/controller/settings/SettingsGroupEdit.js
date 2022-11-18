'use strict';

/**
 * Settings group edition page controller.
 */
angular.module('docs').controller('SettingsGroupEdit', ($scope, $dialog, $state, $stateParameters, Restangular, $q, $translate) => {
	/**
   * Returns true if in edit mode (false in add mode).
   */
	$scope.isEdit = function () {
		return $stateParameters.name;
	};

	/**
   * In edit mode, load the current group.
   */
	if ($scope.isEdit()) {
		Restangular.one('group', $stateParameters.name).get().then(data => {
			$scope.group = data;
		});
	}

	/**
   * Update the current group.
   */
	$scope.edit = function () {
		let promise = null;
		const group = angular.copy($scope.group);

		if ($scope.isEdit()) {
			promise = Restangular
				.one('group', $stateParameters.name)
				.post('', group);
		} else {
			promise = Restangular
				.one('group')
				.put(group);
		}

		promise.then(() => {
			$scope.loadGroups();
			if ($scope.isEdit()) {
				$state.go('settings.group');
			} else {
				// Go to edit this group to add members
				$state.go('settings.group.edit', {name: group.name});
			}
		}, error => {
			if (error.data.type === 'GroupAlreadyExists') {
				var title = $translate.instant('settings.group.edit.edit_group_failed_title');
				var message = $translate.instant('settings.group.edit.edit_group_failed_message');
				var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
				$dialog.messageBox(title, message, btns);
			} else if (error.data.type === 'GroupUsedInRouteModel') {
				var title = $translate.instant('settings.group.edit.group_used_title');
				var message = $translate.instant('settings.group.edit.group_used_message', {name: error.data.message});
				var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
				$dialog.messageBox(title, message, btns);
			}
		});
	};

	/**
   * Delete the current group.
   */
	$scope.remove = function () {
		const title = $translate.instant('settings.group.edit.delete_group_title');
		const message = $translate.instant('settings.group.edit.delete_group_message');
		const btns = [
			{result: 'cancel', label: $translate.instant('cancel')},
			{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'},
		];

		$dialog.messageBox(title, message, btns, result => {
			if (result === 'ok') {
				Restangular.one('group', $stateParameters.name).remove().then(() => {
					$scope.loadGroups();
					$state.go('settings.group');
				}, error => {
					if (error.data.type === 'GroupUsedInRouteModel') {
						const title = $translate.instant('settings.group.edit.group_used_title');
						const message = $translate.instant('settings.group.edit.group_used_message', {name: error.data.message});
						const btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
						$dialog.messageBox(title, message, btns);
					}
				});
			}
		});
	};

	/**
   * Returns a promise for typeahead group.
   */
	$scope.getGroupTypeahead = function ($viewValue) {
		const deferred = $q.defer();
		Restangular.one('group')
			.get({
				sort_column: 1,
				asc: true,
			}).then(data => {
				deferred.resolve(_.pluck(_.filter(data.groups, group => group.name.includes($viewValue)), 'name'));
			});
		return deferred.promise;
	};

	/**
   * Returns a promise for typeahead user.
   */
	$scope.getUserTypeahead = function ($viewValue) {
		const deferred = $q.defer();
		Restangular.one('user/list')
			.get({
				search: $viewValue,
				sort_column: 1,
				asc: true,
			}).then(data => {
				deferred.resolve(_.pluck(_.filter(data.users, user => user.username.includes($viewValue)), 'username'));
			});
		return deferred.promise;
	};

	/**
   * Add a new member.
   */
	$scope.addMember = function (member) {
		$scope.member = '';
		Restangular.one('group/' + $stateParameters.name).put({
			username: member,
		}).then(() => {
			if (!$scope.group.members.includes(member)) {
				$scope.group.members.push(member);
			}
		});
	};

	/**
   * Remove a member.
   */
	$scope.removeMember = function (member) {
		Restangular.one('group/' + $stateParameters.name, member).remove().then(() => {
			$scope.group.members.splice($scope.group.members.indexOf(member), 1);
		});
	};
});
