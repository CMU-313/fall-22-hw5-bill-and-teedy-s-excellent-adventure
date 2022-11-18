'use strict';

/**
 * File modal view controller.
 */
angular.module('docs').controller('FileModalView', ($uibModalInstance, $scope, $state, $stateParameters, $sce, Restangular, $transitions) => {
	const setFile = function (files) {
		// Search current file
		_.each(files, value => {
			if (value.id === $stateParameters.fileId) {
				$scope.file = value;
				$scope.trustedFileUrl = $sce.trustAsResourceUrl('../api/file/' + $stateParameters.fileId + '/data');
			}
		});
	};

	// Load files
	Restangular.one('file/list').get({id: $stateParameters.id}).then(data => {
		$scope.files = data.files;
		setFile(data.files);

		// File not found, maybe it's a version
		if (!$scope.file) {
			Restangular.one('file/' + $stateParameters.fileId + '/versions').get().then(data => {
				setFile(data.files);
			});
		}
	});

	/**
   * Return the next file.
   */
	$scope.nextFile = function () {
		let next;
		_.each($scope.files, (value, key) => {
			if (value.id === $stateParameters.fileId) {
				next = $scope.files[key + 1];
			}
		});
		return next;
	};

	/**
   * Return the previous file.
   */
	$scope.previousFile = function () {
		let previous;
		_.each($scope.files, (value, key) => {
			if (value.id === $stateParameters.fileId) {
				previous = $scope.files[key - 1];
			}
		});
		return previous;
	};

	/**
   * Navigate to the next file.
   */
	$scope.goNextFile = function () {
		const next = $scope.nextFile();
		if (next) {
			$state.go('^.file', {id: $stateParameters.id, fileId: next.id});
		}
	};

	/**
   * Navigate to the previous file.
   */
	$scope.goPreviousFile = function () {
		const previous = $scope.previousFile();
		if (previous) {
			$state.go('^.file', {id: $stateParameters.id, fileId: previous.id});
		}
	};

	/**
   * Open the file in a new window.
   */
	$scope.openFile = function () {
		window.open('../api/file/' + $stateParameters.fileId + '/data');
	};

	/**
   * Open the file content a new window.
   */
	$scope.openFileContent = function () {
		window.open('../api/file/' + $stateParameters.fileId + '/data?size=content');
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

	/**
   * Return true if we can display the preview image.
   */
	$scope.canDisplayPreview = function () {
		return $scope.file && $scope.file.mimetype !== 'application/pdf';
	};
});
