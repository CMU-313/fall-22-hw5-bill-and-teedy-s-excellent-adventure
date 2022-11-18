'use strict';

/**
 * File modal view controller.
 */
angular.module('share').controller('FileModalView', ($uibModalInstance, $scope, $state, $stateParameters, Restangular, $transitions) => {
	// Load files
	Restangular.one('file/list').get({id: $stateParameters.documentId, share: $stateParameters.shareId}).then(data => {
		$scope.files = data.files;

		// Search current file
		_.each($scope.files, value => {
			if (value.id === $stateParameters.fileId) {
				$scope.file = value;
			}
		});
	});

	/**
   * Navigate to the next file.
   */
	$scope.nextFile = function () {
		_.each($scope.files, (value, key) => {
			if (value.id === $stateParameters.fileId) {
				const next = $scope.files[key + 1];
				if (next) {
					$state.go('share.file', {documentId: $stateParameters.documentId, shareId: $stateParameters.shareId, fileId: next.id});
				}
			}
		});
	};

	/**
   * Navigate to the previous file.
   */
	$scope.previousFile = function () {
		_.each($scope.files, (value, key) => {
			if (value.id === $stateParameters.fileId) {
				const previous = $scope.files[key - 1];
				if (previous) {
					$state.go('share.file', {documentId: $stateParameters.documentId, shareId: $stateParameters.shareId, fileId: previous.id});
				}
			}
		});
	};

	/**
   * Open the file in a new window.
   */
	$scope.openFile = function () {
		window.open('../api/file/' + $stateParameters.fileId + '/data?share=' + $stateParameters.shareId);
	};

	/**
   * Print the file.
   */
	$scope.printFile = function () {
		const popup = window.open('../api/file/' + $stateParameters.fileId + '/data', '_blank');
		popup.addEventListener('load', () => {
			popup.print();
			popup.close();
		});
	};

	/**
   * Close the file preview.
   */
	$scope.closeFile = function () {
		$uibModalInstance.dismiss();
	};

	// Close the modal when the user exits this state
	var off = $transitions.onStart({}, transition => {
		if (!$uibModalInstance.closed) {
			if (transition.to().name === $state.current.name) {
				$uibModalInstance.close();
			} else {
				$uibModalInstance.dismiss();
			}
		}

		off();
	});
});
