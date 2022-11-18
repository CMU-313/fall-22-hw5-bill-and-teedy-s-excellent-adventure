'use strict';

/**
 * Modal file versions controller.
 */
angular.module('docs').controller('ModalFileVersions', ($scope, $state, $stateParameters, $uibModalInstance, Restangular, file) => {
	Restangular.one('file/' + file.id + '/versions').get().then(data => {
		$scope.files = data.files;
	});

	$scope.openFile = function (file) {
		$state.go('document.view.content.file', {id: $stateParameters.id, fileId: file.id});
	};

	$scope.close = function () {
		$uibModalInstance.close();
	};
});
