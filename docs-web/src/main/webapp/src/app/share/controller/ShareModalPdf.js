'use strict';

/**
 * Document modal PDF controller.
 */
angular.module('share').controller('ShareModalPdf', ($scope, $window, $stateParameters, $uibModalInstance) => {
	$scope.export = {
		metadata: false,
		comments: false,
		fitimagetopage: true,
		margin: 10,
	};

	// Export to PDF
	$scope.exportPdf = function () {
		$window.open('../api/document/' + $stateParameters.documentId
        + '/pdf?metadata=' + $scope.export.metadata
        + '&comments=' + $scope.export.comments
        + '&fitimagetopage=' + $scope.export.fitimagetopage
        + '&margin=' + $scope.export.margin
        + '&share=' + $stateParameters.shareId);

		$uibModalInstance.close();
	};

	// Close the modal
	$scope.close = function () {
		$uibModalInstance.close();
	};
});
