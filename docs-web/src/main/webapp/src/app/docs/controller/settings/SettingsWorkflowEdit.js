
'use strict';

/**
 * Settings workflow edition page controller.
 */
angular.module('docs').controller('SettingsWorkflowEdit', ($scope, $dialog, $state, $stateParameters, Restangular, $translate, $q) => {
	/**
   * UI sortable options.
   */
	$scope.sortableOptions = {
		forceHelperSize: true,
		forcePlaceholderSize: true,
		tolerance: 'pointer',
		handle: '.handle',
	};

	/**
   * Auto-complete on ACL target.
   */
	$scope.getTargetAclTypeahead = function ($viewValue) {
		const deferred = $q.defer();
		Restangular.one('acl/target/search')
			.get({
				search: $viewValue,
			}).then(data => {
				const output = [];

				// Add the type to use later
				output.push.apply(output, _.map(data.users, user => {
					user.type = 'USER';
					return user;
				}));
				output.push.apply(output, _.map(data.groups, group => {
					group.type = 'GROUP';
					return group;
				}));

				// Send the data to the typeahead directive
				deferred.resolve(output, true);
			});
		return deferred.promise;
	};

	/**
   * Add a workflow step.
   */
	$scope.addStep = function () {
		const step = {
			type: 'VALIDATE',
		};
		$scope.updateTransitions(step);
		$scope.workflow.steps.push(step);
	};

	/**
   * Returns true if in edit mode (false in add mode).
   */
	$scope.isEdit = function () {
		return $stateParameters.id;
	};

	/**
   * Update the current workflow.
   */
	$scope.edit = function () {
		let promise = null;

		// Cleanup the workflow data
		const workflow = angular.copy($scope.workflow);
		_.each(workflow.steps, step => {
			_.each(step.transitions, transition => {
				delete transition.actionType;
			});
		});
		workflow.steps = JSON.stringify(workflow.steps);

		if ($scope.isEdit()) {
			promise = Restangular
				.one('routemodel', $stateParameters.id)
				.post('', workflow);
		} else {
			promise = Restangular
				.one('routemodel')
				.put(workflow);
		}

		promise.then(() => {
			$scope.loadWorkflows();
			$state.go('settings.workflow');
		});
	};

	/**
   * Delete the current workflow.
   */
	$scope.remove = function () {
		const title = $translate.instant('settings.workflow.edit.delete_workflow_title');
		const message = $translate.instant('settings.workflow.edit.delete_workflow_message');
		const btns = [
			{result: 'cancel', label: $translate.instant('cancel')},
			{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'},
		];

		$dialog.messageBox(title, message, btns, result => {
			if (result === 'ok') {
				Restangular.one('routemodel', $stateParameters.id).remove().then(() => {
					$scope.loadWorkflows();
					$state.go('settings.workflow');
				}, () => {
					$state.go('settings.workflow');
				});
			}
		});
	};

	/**
   * Remove a route step.
   */
	$scope.removeStep = function (step) {
		$scope.workflow.steps.splice($scope.workflow.steps.indexOf(step), 1);
	};

	/**
   * Update transitions on a step.
   */
	$scope.updateTransitions = function (step) {
		if (step.type === 'VALIDATE') {
			step.transitions = [{
				name: 'VALIDATED',
				actions: [],
				actionType: 'ADD_TAG',
			}];
		} else if (step.type === 'APPROVE') {
			step.transitions = [{
				name: 'APPROVED',
				actions: [],
				actionType: 'ADD_TAG',
			}, {
				name: 'REJECTED',
				actions: [],
				actionType: 'ADD_TAG',
			}];
		}
	};

	/**
   * Add an action.
   */
	$scope.addAction = function (transition) {
		if (_.isUndefined(transition.actionType)) {
			return;
		}

		transition.actions.push({
			type: transition.actionType,
		});
	};

	/**
   * Remove an action.
   */
	$scope.removeAction = function (actions, action) {
		actions.splice(actions.indexOf(action), 1);
	};

	// Fetch tags
	Restangular.one('tag/list').get().then(data => {
		$scope.tags = data.tags;
	});

	/**
   * In edit mode, load the current workflow.
   */
	if ($scope.isEdit()) {
		Restangular.one('routemodel', $stateParameters.id).get().then(data => {
			$scope.workflow = data;
			$scope.workflow.steps = JSON.parse(data.steps);
			_.each($scope.workflow.steps, step => {
				if (!step.transitions) {
					// Patch for old route models
					$scope.updateTransitions(step);
				}
			});
		});
	} else {
		$scope.workflow = {
			steps: [],
		};
		$scope.addStep();
	}
});
