/*
 * Angular-ui-sortable - This directive allows you to jQueryUI Sortable.
 * @version v0.17.2 - 2017-08-17
 * @link http://angular-ui.github.com
 * @license MIT
 */
(function (window, angular, undefined) {
	'use strict';
	/*
   JQuery UI Sortable plugin wrapper

   @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
   */
	angular.module('ui.sortable', [])
		.value('uiSortableConfig', {
			// The default for jquery-ui sortable is "> *", we need to restrict this to
			// ng-repeat items
			// if the user uses
			items: '> [ng-repeat],> [data-ng-repeat],> [x-ng-repeat]',
		})
		.directive('uiSortable', [
			'uiSortableConfig',
			'$timeout',
			'$log',
			function (uiSortableConfig, $timeout, $log) {
				return {
					require: '?ngModel',
					scope: {
						ngModel: '=',
						uiSortable: '=',
						/// /Expression bindings from html.
						create: '&uiSortableCreate',
						// Helper:'&uiSortableHelper',
						start: '&uiSortableStart',
						activate: '&uiSortableActivate',
						// Sort:'&uiSortableSort',
						// change:'&uiSortableChange',
						// over:'&uiSortableOver',
						// out:'&uiSortableOut',
						beforeStop: '&uiSortableBeforeStop',
						update: '&uiSortableUpdate',
						remove: '&uiSortableRemove',
						receive: '&uiSortableReceive',
						deactivate: '&uiSortableDeactivate',
						stop: '&uiSortableStop',
					},
					link(scope, element, attrs, ngModel) {
						let savedNodes;
						let helper;

						function combineCallbacks(first, second) {
							const firstIsFunc = typeof first === 'function';
							const secondIsFunc = typeof second === 'function';
							if (firstIsFunc && secondIsFunc) {
								return function () {
									Reflect.apply(first, this, arguments);
									Reflect.apply(second, this, arguments);
								};
							}

							if (secondIsFunc) {
								return second;
							}

							return first;
						}

						function getSortableWidgetInstance(element) {
							// This is a fix to support jquery-ui prior to v1.11.x
							// otherwise we should be using `element.sortable('instance')`
							const data = element.data('ui-sortable');
							if (data && typeof data === 'object' && data.widgetFullName === 'ui-sortable') {
								return data;
							}

							return null;
						}

						function patchSortableOption(key, value) {
							if (callbacks[key]) {
								if (key === 'stop') {
									// Call apply after stop
									value = combineCallbacks(
										value, () => {
											scope.$apply();
										});

									value = combineCallbacks(value, afterStop);
								}

								// Wrap the callback
								value = combineCallbacks(callbacks[key], value);
							} else if (wrappers[key]) {
								value = wrappers[key](value);
							}

							// Patch the options that need to have values set
							if (!value && (key === 'items' || key === 'ui-model-items')) {
								value = uiSortableConfig.items;
							}

							return value;
						}

						function patchUISortableOptions(newValue, oldValue, sortableWidgetInstance) {
							function addDummyOptionKey(value, key) {
								if (!(key in options)) {
									// Add the key in the opts object so that
									// the patch function detects and handles it
									options[key] = null;
								}
							}

							// For this directive to work we have to attach some callbacks
							angular.forEach(callbacks, addDummyOptionKey);

							// Only initialize it in case we have to
							// update some options of the sortable
							let optionsDiff = null;

							if (oldValue) {
								// Reset deleted options to default
								let defaultOptions;
								angular.forEach(oldValue, (oldValue, key) => {
									if (!newValue || !(key in newValue)) {
										if (key in directiveOptions) {
											if (key === 'ui-floating') {
												options[key] = 'auto';
											} else {
												options[key] = patchSortableOption(key, undefined);
											}

											return;
										}

										if (!defaultOptions) {
											defaultOptions = angular.element.ui.sortable().options;
										}

										let defaultValue = defaultOptions[key];
										defaultValue = patchSortableOption(key, defaultValue);

										if (!optionsDiff) {
											optionsDiff = {};
										}

										optionsDiff[key] = defaultValue;
										options[key] = defaultValue;
									}
								});
							}

							// Update changed options
							angular.forEach(newValue, (value, key) => {
								// If it's a custom option of the directive,
								// handle it approprietly
								if (key in directiveOptions) {
									if (key === 'ui-floating' && (value === false || value === true) && sortableWidgetInstance) {
										sortableWidgetInstance.floating = value;
									}

									options[key] = patchSortableOption(key, value);
									return;
								}

								value = patchSortableOption(key, value);

								if (!optionsDiff) {
									optionsDiff = {};
								}

								optionsDiff[key] = value;
								options[key] = value;
							});

							return optionsDiff;
						}

						function getPlaceholderElement(element) {
							const placeholder = element.sortable('option', 'placeholder');

							// Placeholder.element will be a function if the placeholder, has
							// been created (placeholder will be an object).  If it hasn't
							// been created, either placeholder will be false if no
							// placeholder class was given or placeholder.element will be
							// undefined if a class was given (placeholder will be a string)
							if (placeholder && placeholder.element && typeof placeholder.element === 'function') {
								let result = placeholder.element();
								// Workaround for jquery ui 1.9.x,
								// not returning jquery collection
								result = angular.element(result);
								return result;
							}

							return null;
						}

						function getPlaceholderExcludesludes(element, placeholder) {
							// Exact match with the placeholder's class attribute to handle
							// the case that multiple connected sortables exist and
							// the placeholder option equals the class of sortable items
							const notCssSelector = options['ui-model-items'].replace(/[^,]*>/g, '');
							const excludes = element.find('[class="' + placeholder.attr('class') + '"]:not(' + notCssSelector + ')');
							return excludes;
						}

						function hasSortingHelper(element, ui) {
							const helperOption = element.sortable('option', 'helper');
							return helperOption === 'clone' || (typeof helperOption === 'function' && ui.item.sortable.isCustomHelperUsed());
						}

						function getSortingHelper(element, ui/* , savedNodes */) {
							let result = null;
							if (hasSortingHelper(element, ui)
                && element.sortable('option', 'appendTo') === 'parent') {
								// The .ui-sortable-helper element (that's the default class name)
								result = helper;
							}

							return result;
						}

						// Thanks jquery-ui
						function isFloating(item) {
							return (/left|right/).test(item.css('float')) || (/inline|table-cell/).test(item.css('display'));
						}

						function getElementContext(elementScopes, element) {
							for (const c of elementScopes) {
								if (c.element[0] === element[0]) {
									return c;
								}
							}
						}

						function afterStop(e, ui) {
							ui.item.sortable._destroy();
						}

						// Return the index of ui.item among the items
						// we can't just do ui.item.index() because there it might have siblings
						// which are not items
						function getItemIndex(item) {
							return item.parent()
								.find(options['ui-model-items'])
								.index(item);
						}

						var options = {};

						// Directive specific options
						var directiveOptions = {
							'ui-floating': undefined,
							'ui-model-items': uiSortableConfig.items,
						};

						var callbacks = {
							create: null,
							start: null,
							activate: null,
							// Sort: null,
							// change: null,
							// over: null,
							// out: null,
							beforeStop: null,
							update: null,
							remove: null,
							receive: null,
							deactivate: null,
							stop: null,
						};

						var wrappers = {
							helper: null,
						};

						angular.extend(options, directiveOptions, uiSortableConfig, scope.uiSortable);

						if (!angular.element.fn || !angular.element.fn.jquery) {
							$log.error('ui.sortable: jQuery should be included before AngularJS!');
							return;
						}

						function wireUp() {
							// When we add or remove elements, we need the sortable to 'refresh'
							// so it can find the new/removed elements.
							scope.$watchCollection('ngModel', () => {
								// Timeout to let ng-repeat modify the DOM
								$timeout(() => {
									// Ensure that the jquery-ui-sortable widget instance
									// is still bound to the directive's element
									if (getSortableWidgetInstance(element)) {
										element.sortable('refresh');
									}
								}, 0, false);
							});

							callbacks.start = function (e, ui) {
								if (options['ui-floating'] === 'auto') {
									// Since the drag has started, the element will be
									// absolutely positioned, so we check its siblings
									const siblings = ui.item.siblings();
									const sortableWidgetInstance = getSortableWidgetInstance(angular.element(e.target));
									sortableWidgetInstance.floating = isFloating(siblings);
								}

								// Save the starting position of dragged item
								const index = getItemIndex(ui.item);
								ui.item.sortable = {
									model: ngModel.$modelValue[index],
									index,
									source: element,
									sourceList: ui.item.parent(),
									sourceModel: ngModel.$modelValue,
									cancel() {
										ui.item.sortable._isCanceled = true;
									},
									isCanceled() {
										return ui.item.sortable._isCanceled;
									},
									isCustomHelperUsed() {
										return Boolean(ui.item.sortable._isCustomHelperUsed);
									},
									_isCanceled: false,
									_isCustomHelperUsed: ui.item.sortable._isCustomHelperUsed,
									_destroy() {
										angular.forEach(ui.item.sortable, (value, key) => {
											ui.item.sortable[key] = undefined;
										});
									},
									_connectedSortables: [],
									_getElementContext(element) {
										return getElementContext(this._connectedSortables, element);
									},
								};
							};

							callbacks.activate = function (e, ui) {
								const isSourceContext = ui.item.sortable.source === element;
								const savedNodesOrigin = isSourceContext
									? ui.item.sortable.sourceList
									: element;
								const elementContext = {
									element,
									scope,
									isSourceContext,
									savedNodesOrigin,
								};
								// Save the directive's scope so that it is accessible from ui.item.sortable
								ui.item.sortable._connectedSortables.push(elementContext);

								// We need to make a copy of the current element's contents so
								// we can restore it after sortable has messed it up.
								// This is inside activate (instead of start) in order to save
								// both lists when dragging between connected lists.
								savedNodes = savedNodesOrigin.contents();
								helper = ui.helper;

								// If this list has a placeholder (the connected lists won't),
								// don't inlcude it in saved nodes.
								const placeholder = getPlaceholderElement(element);
								if (placeholder && placeholder.length > 0) {
									const excludes = getPlaceholderExcludesludes(element, placeholder);
									savedNodes = savedNodes.not(excludes);
								}
							};

							callbacks.update = function (e, ui) {
								// Save current drop position but only if this is not a second
								// update that happens when moving between lists because then
								// the value will be overwritten with the old value
								if (!ui.item.sortable.received) {
									ui.item.sortable.dropindex = getItemIndex(ui.item);
									const droptarget = ui.item.parent().closest('[ui-sortable], [data-ui-sortable], [x-ui-sortable]');
									ui.item.sortable.droptarget = droptarget;
									ui.item.sortable.droptargetList = ui.item.parent();

									const droptargetContext = ui.item.sortable._getElementContext(droptarget);
									ui.item.sortable.droptargetModel = droptargetContext.scope.ngModel;

									// Cancel the sort (let ng-repeat do the sort for us)
									// Don't cancel if this is the received list because it has
									// already been canceled in the other list, and trying to cancel
									// here will mess up the DOM.
									element.sortable('cancel');
								}

								// Put the nodes back exactly the way they started (this is very
								// important because ng-repeat uses comment elements to delineate
								// the start and stop of repeat sections and sortable doesn't
								// respect their order (even if we cancel, the order of the
								// comments are still messed up).
								const sortingHelper = !ui.item.sortable.received && getSortingHelper(element, ui, savedNodes);
								if (sortingHelper && sortingHelper.length > 0) {
									// Restore all the savedNodes except from the sorting helper element.
									// That way it will be garbage collected.
									savedNodes = savedNodes.not(sortingHelper);
								}

								const elementContext = ui.item.sortable._getElementContext(element);
								savedNodes.appendTo(elementContext.savedNodesOrigin);

								// If this is the target connected list then
								// it's safe to clear the restored nodes since:
								// update is currently running and
								// stop is not called for the target list.
								if (ui.item.sortable.received) {
									savedNodes = null;
								}

								// If received is true (an item was dropped in from another list)
								// then we add the new item to this list otherwise wait until the
								// stop event where we will know if it was a sort or item was
								// moved here from another list
								if (ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
									scope.$apply(() => {
										ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0,
											ui.item.sortable.moved);
									});
									scope.$emit('ui-sortable:moved', ui);
								}
							};

							callbacks.stop = function (e, ui) {
								// If the received flag hasn't be set on the item, this is a
								// normal sort, if dropindex is set, the item was moved, so move
								// the items in the list.
								const wasMoved = ('dropindex' in ui.item.sortable)
                  && !ui.item.sortable.isCanceled();

								if (wasMoved && !ui.item.sortable.received) {
									scope.$apply(() => {
										ngModel.$modelValue.splice(
											ui.item.sortable.dropindex, 0,
											ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]);
									});
									scope.$emit('ui-sortable:moved', ui);
								} else if (!wasMoved
                  && !angular.equals(element.contents().toArray(), savedNodes.toArray())) {
									// If the item was not moved
									// and the DOM element order has changed,
									// then restore the elements
									// so that the ngRepeat's comment are correct.

									const sortingHelper = getSortingHelper(element, ui, savedNodes);
									if (sortingHelper && sortingHelper.length > 0) {
										// Restore all the savedNodes except from the sorting helper element.
										// That way it will be garbage collected.
										savedNodes = savedNodes.not(sortingHelper);
									}

									const elementContext = ui.item.sortable._getElementContext(element);
									savedNodes.appendTo(elementContext.savedNodesOrigin);
								}

								// It's now safe to clear the savedNodes and helper
								// since stop is the last callback.
								savedNodes = null;
								helper = null;
							};

							callbacks.receive = function (e, ui) {
								// An item was dropped here from another list, set a flag on the
								// item.
								ui.item.sortable.received = true;
							};

							callbacks.remove = function (e, ui) {
								// Workaround for a problem observed in nested connected lists.
								// There should be an 'update' event before 'remove' when moving
								// elements. If the event did not fire, cancel sorting.
								if (!('dropindex' in ui.item.sortable)) {
									element.sortable('cancel');
									ui.item.sortable.cancel();
								}

								// Remove the item from this list's model and copy data into item,
								// so the next list can retrive it
								if (!ui.item.sortable.isCanceled()) {
									scope.$apply(() => {
										ui.item.sortable.moved = ngModel.$modelValue.splice(
											ui.item.sortable.index, 1)[0];
									});
								}
							};

							// Setup attribute handlers
							angular.forEach(callbacks, (value, key) => {
								callbacks[key] = combineCallbacks(callbacks[key],
									function () {
										const attrHandler = scope[key];
										let attrHandlerFn;
										if (typeof attrHandler === 'function'
                      && ('uiSortable' + key.slice(0, 1).toUpperCase() + key.slice(1)).length > 0
                      && typeof (attrHandlerFn = attrHandler()) === 'function') {
											Reflect.apply(attrHandlerFn, this, arguments);
										}
									});
							});

							wrappers.helper = function (inner) {
								if (inner && typeof inner === 'function') {
									return function (e, item) {
										const oldItemSortable = item.sortable;
										const index = getItemIndex(item);
										item.sortable = {
											model: ngModel.$modelValue[index],
											index,
											source: element,
											sourceList: item.parent(),
											sourceModel: ngModel.$modelValue,
											_restore() {
												angular.forEach(item.sortable, (value, key) => {
													item.sortable[key] = undefined;
												});

												item.sortable = oldItemSortable;
											},
										};

										const innerResult = Reflect.apply(inner, this, arguments);
										item.sortable._restore();
										item.sortable._isCustomHelperUsed = item !== innerResult;
										return innerResult;
									};
								}

								return inner;
							};

							scope.$watchCollection('uiSortable', (newValue, oldValue) => {
								// Ensure that the jquery-ui-sortable widget instance
								// is still bound to the directive's element
								const sortableWidgetInstance = getSortableWidgetInstance(element);
								if (sortableWidgetInstance) {
									const optionsDiff = patchUISortableOptions(newValue, oldValue, sortableWidgetInstance);

									if (optionsDiff) {
										element.sortable('option', optionsDiff);
									}
								}
							}, true);

							patchUISortableOptions(options);
						}

						function init() {
							if (ngModel) {
								wireUp();
							} else {
								$log.info('ui.sortable: ngModel not provided!', element);
							}

							// Create sortable
							element.sortable(options);
						}

						function initIfEnabled() {
							if (scope.uiSortable && scope.uiSortable.disabled) {
								return false;
							}

							init();

							// Stop Watcher
							initIfEnabled.cancelWatcher();
							initIfEnabled.cancelWatcher = angular.noop;

							return true;
						}

						initIfEnabled.cancelWatcher = angular.noop;

						if (!initIfEnabled()) {
							initIfEnabled.cancelWatcher = scope.$watch('uiSortable.disabled', initIfEnabled);
						}
					},
				};
			},
		]);
})(window, window.angular);
