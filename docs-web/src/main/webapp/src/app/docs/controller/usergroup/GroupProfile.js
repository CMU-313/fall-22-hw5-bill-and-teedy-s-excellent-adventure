'use strict';

/**
 * Group profile controller.
 */
angular.module('docs').controller('GroupProfile', ($stateParameters, Restangular, $scope) => {
	// Load user
	Restangular.one('group', $stateParameters.name).get().then(data => {
		$scope.group = data;
	});
});
