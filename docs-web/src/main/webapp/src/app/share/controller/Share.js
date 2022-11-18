'use strict';

/**
 * Share controller.
 */
angular.module('share').controller('Share', ($scope, $state, $stateParameters, Restangular, $uibModal) => {
	// Load document
	Restangular.one('document', $stateParameters.documentId).get({share: $stateParameters.shareId})
		.then(data => {
			$scope.document = data;
		}, error => {
			if (error.status === 403) {
				$state.go('403');
			}
		});

	// Load files
	Restangular.one('file/list').get({id: $stateParameters.documentId, share: $stateParameters.shareId})
		.then(data => {
			$scope.files = data.files;
		});

	// Load comments from server
	Restangular.one('comment', $stateParameters.documentId).get({share: $stateParameters.shareId}).then(data => {
		$scope.comments = data.comments;
	}, error => {
		$scope.commentsError = error;
	});

	/**
   * Navigate to the selected file.
   */
	$scope.openFile = function (file) {
		$state.go('share.file', {documentId: $stateParameters.documentId, shareId: $stateParameters.shareId, fileId: file.id});
	};

	/**
   * Export the current document to PDF.
   */
	$scope.exportPdf = function () {
		$uibModal.open({
			templateUrl: 'partial/share/share.pdf.html',
			controller: 'ShareModalPdf',
		});

		return false;
	};
});
