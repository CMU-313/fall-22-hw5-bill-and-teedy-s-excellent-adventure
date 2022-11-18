'use strict';

/**
 * Navigation controller.
 */
angular.module('docs').controller('Navigation', ($scope, $state, $stateParameters, $rootScope, User) => {
	User.userInfo().then(data => {
		$rootScope.userInfo = data;
		if (data.anonymous && $state.current.name !== 'login') {
			$state.go('login', {
				redirectState: $state.current.name,
				redirectParams: JSON.stringify($stateParameters),
			}, {
				location: 'replace',
			});
		}
	});

	/**
   * User logout.
   */
	$scope.logout = function ($event) {
		User.logout().then(() => {
			User.userInfo(true).then(data => {
				$rootScope.userInfo = data;
			});
			$state.go('main');
		});
		$event.preventDefault();
	};
});
