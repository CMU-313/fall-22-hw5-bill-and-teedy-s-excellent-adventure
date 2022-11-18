'use strict';

/**
 * Tag edit controller.
 */
angular.module('docs').controller('TagEdit', ($scope, $stateParameters, Restangular, $dialog, $state, $translate) => {
	// Retrieve the tag
	Restangular.one('tag', $stateParameters.id).get().then(data => {
		$scope.tag = data;

		// Replace the tag from the list with this reference
		_.each($scope.tags, (tag, i) => {
			if (tag.id === $scope.tag.id) {
				$scope.tags[i] = $scope.tag;
			}
		});
	});

	/**
   * Update a tag.
   */
	$scope.edit = function () {
		// Update the server
		Restangular.one('tag', $scope.tag.id).post('', $scope.tag).then(() => {}, error => {
			if (error.data.type === 'CircularReference') {
				const title = $translate.instant('tag.edit.circular_reference_title');
				const message = $translate.instant('tag.edit.circular_reference_message');
				const btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
				$dialog.messageBox(title, message, btns);
			}
		});
	};

	/**
   * Delete a tag.
   */
	$scope.deleteTag = function (tag) {
		const title = $translate.instant('tag.edit.delete_tag_title');
		const message = $translate.instant('tag.edit.delete_tag_message');
		const btns = [
			{result: 'cancel', label: $translate.instant('cancel')},
			{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'},
		];

		$dialog.messageBox(title, message, btns, result => {
			if (result === 'ok') {
				Restangular.one('tag', tag.id).remove().then(() => {
					$scope.loadTags();
					$state.go('tag.default');
				});
			}
		});
	};
});
