'use strict';

/**
 * User profile controller.
 */
angular.module('docs').controller('UserProfile', ($stateParameters, Restangular, $scope) => {
	// Load user
	Restangular.one('user', $stateParameters.username).get().then(data => {
		$scope.user = data;
	});
});
