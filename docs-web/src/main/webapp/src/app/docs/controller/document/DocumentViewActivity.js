'use strict';

/**
 * Document view activity controller.
 */
angular.module('docs').controller('DocumentViewActivity', ($scope, $stateParameters, Restangular) => {
	// Load audit log data from server
	Restangular.one('auditlog').get({
		document: $stateParameters.id,
	}).then(data => {
		$scope.logs = data.logs;
	});
});
