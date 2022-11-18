//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function () {
	// Baseline setup
	// --------------

	// Establish the root object, `window` in the browser, or `exports` on the server.
	const root = this;

	// Save the previous value of the `_` variable.
	const previousUnderscore = root._;

	// Save bytes in the minified (but not gzipped) version:
	const ArrayProto = Array.prototype; const ObjectProto = Object.prototype; const
		FuncProto = Function.prototype;

	// Create quick reference variables for speed access to core prototypes.
	const
		push = ArrayProto.push;
	const slice = ArrayProto.slice;
	const toString = ObjectProto.toString;
	const hasOwnProperty = ObjectProto.hasOwnProperty;

	// All **ECMAScript 5** native function implementations that we hope to use
	// are declared here.
	const
		nativeIsArray = Array.isArray;
	const nativeKeys = Object.keys;
	const nativeBind = FuncProto.bind;
	const nativeCreate = Object.create;

	// Naked function reference for surrogate-prototype-swapping.
	const Ctor = function () {};

	// Create a safe reference to the Underscore object for use below.
	var _ = function (object) {
		if (object instanceof _) {
			return object;
		}

		if (!(this instanceof _)) {
			return new _(object);
		}

		this._wrapped = object;
	};

	// Export the Underscore object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}

		exports._ = _;
	} else {
		root._ = _;
	}

	// Current version.
	_.VERSION = '1.8.3';

	// Internal function that returns an efficient (for current engines) version
	// of the passed-in callback, to be repeatedly applied in other Underscore
	// functions.
	const optimizeCb = function (func, context, argCount) {
		if (context === void 0) {
			return func;
		}

		switch (argCount == null ? 3 : argCount) {
			case 1: { return function (value) {
				return func.call(context, value);
			};
			}

			case 2: { return function (value, other) {
				return func.call(context, value, other);
			};
			}

			case 3: { return function (value, index, collection) {
				return func.call(context, value, index, collection);
			};
			}

			case 4: { return function (accumulator, value, index, collection) {
				return func.call(context, accumulator, value, index, collection);
			};
			}
		}

		return function () {
			return func.apply(context, arguments);
		};
	};

	// A mostly-internal function to generate callbacks that can be applied
	// to each element in a collection, returning the desired result — either
	// identity, an arbitrary callback, a property matcher, or a property accessor.
	const cb = function (value, context, argCount) {
		if (value == null) {
			return _.identity;
		}

		if (_.isFunction(value)) {
			return optimizeCb(value, context, argCount);
		}

		if (_.isObject(value)) {
			return _.matcher(value);
		}

		return _.property(value);
	};

	_.iteratee = function (value, context) {
		return cb(value, context, Number.POSITIVE_INFINITY);
	};

	// An internal function for creating assigner functions.
	const createAssigner = function (keysFunc, undefinedOnly) {
		return function (object) {
			const length = arguments.length;
			if (length < 2 || object == null) {
				return object;
			}

			for (let index = 1; index < length; index++) {
				const source = arguments[index];
				const keys = keysFunc(source);
				const l = keys.length;
				for (let i = 0; i < l; i++) {
					const key = keys[i];
					if (!undefinedOnly || object[key] === void 0) {
						object[key] = source[key];
					}
				}
			}

			return object;
		};
	};

	// An internal function for creating a new object that inherits from another.
	const baseCreate = function (prototype) {
		if (!_.isObject(prototype)) {
			return {};
		}

		if (nativeCreate) {
			return nativeCreate(prototype);
		}

		Ctor.prototype = prototype;
		const result = new Ctor();
		Ctor.prototype = null;
		return result;
	};

	const property = function (key) {
		return function (object) {
			return object == null ? void 0 : object[key];
		};
	};

	// Helper for collection methods to determine whether a collection
	// should be iterated as an array or as an object
	// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	const MAX_ARRAY_INDEX = 2 ** 53 - 1;
	const getLength = property('length');
	const isArrayLike = function (collection) {
		const length = getLength(collection);
		return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};

	// Collection Functions
	// --------------------

	// The cornerstone, an `each` implementation, aka `forEach`.
	// Handles raw objects in addition to array-likes. Treats all
	// sparse array-likes as if they were dense.
	_.each = _.forEach = function (object, iteratee, context) {
		iteratee = optimizeCb(iteratee, context);
		let i; let length;
		if (isArrayLike(object)) {
			for (i = 0, length = object.length; i < length; i++) {
				iteratee(object[i], i, object);
			}
		} else {
			const keys = _.keys(object);
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(object[keys[i]], keys[i], object);
			}
		}

		return object;
	};

	// Return the results of applying the iteratee to each element.
	_.map = _.collect = function (object, iteratee, context) {
		iteratee = cb(iteratee, context);
		const keys = !isArrayLike(object) && _.keys(object);
		const length = (keys || object).length;
		const results = new Array(length);
		for (let index = 0; index < length; index++) {
			const currentKey = keys ? keys[index] : index;
			results[index] = iteratee(object[currentKey], currentKey, object);
		}

		return results;
	};

	// Create a reducing function iterating left or right.
	function createReduce(dir) {
		// Optimized iterator function as using arguments.length
		// in the main function will deoptimize the, see #1991.
		function iterator(object, iteratee, memo, keys, index, length) {
			for (; index >= 0 && index < length; index += dir) {
				const currentKey = keys ? keys[index] : index;
				memo = iteratee(memo, object[currentKey], currentKey, object);
			}

			return memo;
		}

		return function (object, iteratee, memo, context) {
			iteratee = optimizeCb(iteratee, context, 4);
			const keys = !isArrayLike(object) && _.keys(object);
			const length = (keys || object).length;
			let index = dir > 0 ? 0 : length - 1;
			// Determine the initial value if none is provided.
			if (arguments.length < 3) {
				memo = object[keys ? keys[index] : index];
				index += dir;
			}

			return iterator(object, iteratee, memo, keys, index, length);
		};
	}

	// **Reduce** builds up a single result from a list of values, aka `inject`,
	// or `foldl`.
	_.reduce = _.foldl = _.inject = createReduce(1);

	// The right-associative version of reduce, also known as `foldr`.
	_.reduceRight = _.foldr = createReduce(-1);

	// Return the first value which passes a truth test. Aliased as `detect`.
	_.find = _.detect = function (object, predicate, context) {
		let key;
		key = isArrayLike(object) ? _.findIndex(object, predicate, context) : _.findKey(object, predicate, context);

		if (key !== void 0 && key !== -1) {
			return object[key];
		}
	};

	// Return all the elements that pass a truth test.
	// Aliased as `select`.
	_.filter = _.select = function (object, predicate, context) {
		const results = [];
		predicate = cb(predicate, context);
		_.each(object, (value, index, list) => {
			if (predicate(value, index, list)) {
				results.push(value);
			}
		});
		return results;
	};

	// Return all the elements for which a truth test fails.
	_.reject = function (object, predicate, context) {
		return _.filter(object, _.negate(cb(predicate)), context);
	};

	// Determine whether all of the elements match a truth test.
	// Aliased as `all`.
	_.every = _.all = function (object, predicate, context) {
		predicate = cb(predicate, context);
		const keys = !isArrayLike(object) && _.keys(object);
		const length = (keys || object).length;
		for (let index = 0; index < length; index++) {
			const currentKey = keys ? keys[index] : index;
			if (!predicate(object[currentKey], currentKey, object)) {
				return false;
			}
		}

		return true;
	};

	// Determine if at least one element in the object matches a truth test.
	// Aliased as `any`.
	_.some = _.any = function (object, predicate, context) {
		predicate = cb(predicate, context);
		const keys = !isArrayLike(object) && _.keys(object);
		const length = (keys || object).length;
		for (let index = 0; index < length; index++) {
			const currentKey = keys ? keys[index] : index;
			if (predicate(object[currentKey], currentKey, object)) {
				return true;
			}
		}

		return false;
	};

	// Determine if the array or object contains a given item (using `===`).
	// Aliased as `includes` and `include`.
	_.contains = _.includes = _.include = function (object, item, fromIndex, guard) {
		if (!isArrayLike(object)) {
			object = _.values(object);
		}

		if (typeof fromIndex !== 'number' || guard) {
			fromIndex = 0;
		}

		return _.indexOf(object, item, fromIndex) >= 0;
	};

	// Invoke a method (with arguments) on every item in a collection.
	_.invoke = function (object, method) {
		const args = slice.call(arguments, 2);
		const isFunc = _.isFunction(method);
		return _.map(object, value => {
			const func = isFunc ? method : value[method];
			return func == null ? func : func.apply(value, args);
		});
	};

	// Convenience version of a common use case of `map`: fetching a property.
	_.pluck = function (object, key) {
		return _.map(object, _.property(key));
	};

	// Convenience version of a common use case of `filter`: selecting only objects
	// containing specific `key:value` pairs.
	_.where = function (object, attrs) {
		return _.filter(object, _.matcher(attrs));
	};

	// Convenience version of a common use case of `find`: getting the first object
	// containing specific `key:value` pairs.
	_.findWhere = function (object, attrs) {
		return _.find(object, _.matcher(attrs));
	};

	// Return the maximum element (or element-based computation).
	_.max = function (object, iteratee, context) {
		let result = Number.NEGATIVE_INFINITY;
		let lastComputed = Number.NEGATIVE_INFINITY;
		let value; let computed;
		if (iteratee == null && object != null) {
			object = isArrayLike(object) ? object : _.values(object);
			for (let i = 0, length = object.length; i < length; i++) {
				value = object[i];
				if (value > result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			_.each(object, (value, index, list) => {
				computed = iteratee(value, index, list);
				if (computed > lastComputed || computed === Number.NEGATIVE_INFINITY && result === Number.NEGATIVE_INFINITY) {
					result = value;
					lastComputed = computed;
				}
			});
		}

		return result;
	};

	// Return the minimum element (or element-based computation).
	_.min = function (object, iteratee, context) {
		let result = Number.POSITIVE_INFINITY;
		let lastComputed = Number.POSITIVE_INFINITY;
		let value; let computed;
		if (iteratee == null && object != null) {
			object = isArrayLike(object) ? object : _.values(object);
			for (let i = 0, length = object.length; i < length; i++) {
				value = object[i];
				if (value < result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			_.each(object, (value, index, list) => {
				computed = iteratee(value, index, list);
				if (computed < lastComputed || computed === Number.POSITIVE_INFINITY && result === Number.POSITIVE_INFINITY) {
					result = value;
					lastComputed = computed;
				}
			});
		}

		return result;
	};

	// Shuffle a collection, using the modern version of the
	// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	_.shuffle = function (object) {
		const set = isArrayLike(object) ? object : _.values(object);
		const length = set.length;
		const shuffled = new Array(length);
		for (var index = 0, rand; index < length; index++) {
			rand = _.random(0, index);
			if (rand !== index) {
				shuffled[index] = shuffled[rand];
			}

			shuffled[rand] = set[index];
		}

		return shuffled;
	};

	// Sample **n** random values from a collection.
	// If **n** is not specified, returns a single random element.
	// The internal `guard` argument allows it to work with `map`.
	_.sample = function (object, n, guard) {
		if (n == null || guard) {
			if (!isArrayLike(object)) {
				object = _.values(object);
			}

			return object[_.random(object.length - 1)];
		}

		return _.shuffle(object).slice(0, Math.max(0, n));
	};

	// Sort the object's values by a criterion produced by an iteratee.
	_.sortBy = function (object, iteratee, context) {
		iteratee = cb(iteratee, context);
		return _.pluck(_.map(object, (value, index, list) => ({
			value,
			index,
			criteria: iteratee(value, index, list),
		})).sort((left, right) => {
			const a = left.criteria;
			const b = right.criteria;
			if (a !== b) {
				if (a > b || a === void 0) {
					return 1;
				}

				if (a < b || b === void 0) {
					return -1;
				}
			}

			return left.index - right.index;
		}), 'value');
	};

	// An internal function used for aggregate "group by" operations.
	const group = function (behavior) {
		return function (object, iteratee, context) {
			const result = {};
			iteratee = cb(iteratee, context);
			_.each(object, (value, index) => {
				const key = iteratee(value, index, object);
				behavior(result, value, key);
			});
			return result;
		};
	};

	// Groups the object's values by a criterion. Pass either a string attribute
	// to group by, or a function that returns the criterion.
	_.groupBy = group((result, value, key) => {
		if (_.has(result, key)) {
			result[key].push(value);
		} else {
			result[key] = [value];
		}
	});

	// Indexes the object's values by a criterion, similar to `groupBy`, but for
	// when you know that your index values will be unique.
	_.indexBy = group((result, value, key) => {
		result[key] = value;
	});

	// Counts instances of an object that group by a certain criterion. Pass
	// either a string attribute to count by, or a function that returns the
	// criterion.
	_.countBy = group((result, value, key) => {
		if (_.has(result, key)) {
			result[key]++;
		} else {
			result[key] = 1;
		}
	});

	// Safely create a real, live array from anything iterable.
	_.toArray = function (object) {
		if (!object) {
			return [];
		}

		if (_.isArray(object)) {
			return slice.call(object);
		}

		if (isArrayLike(object)) {
			return _.map(object, _.identity);
		}

		return _.values(object);
	};

	// Return the number of elements in an object.
	_.size = function (object) {
		if (object == null) {
			return 0;
		}

		return isArrayLike(object) ? object.length : _.keys(object).length;
	};

	// Split a collection into two arrays: one whose elements all satisfy the given
	// predicate, and one whose elements all do not satisfy the predicate.
	_.partition = function (object, predicate, context) {
		predicate = cb(predicate, context);
		const pass = []; const
			fail = [];
		_.each(object, (value, key, object_) => {
			(predicate(value, key, object_) ? pass : fail).push(value);
		});
		return [pass, fail];
	};

	// Array Functions
	// ---------------

	// Get the first element of an array. Passing **n** will return the first N
	// values in the array. Aliased as `head` and `take`. The **guard** check
	// allows it to work with `_.map`.
	_.first = _.head = _.take = function (array, n, guard) {
		if (array == null) {
			return void 0;
		}

		if (n == null || guard) {
			return array[0];
		}

		return _.initial(array, array.length - n);
	};

	// Returns everything but the last entry of the array. Especially useful on
	// the arguments object. Passing **n** will return all the values in
	// the array, excluding the last N.
	_.initial = function (array, n, guard) {
		return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	};

	// Get the last element of an array. Passing **n** will return the last N
	// values in the array.
	_.last = function (array, n, guard) {
		if (array == null) {
			return void 0;
		}

		if (n == null || guard) {
			return array[array.length - 1];
		}

		return _.rest(array, Math.max(0, array.length - n));
	};

	// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	// Especially useful on the arguments object. Passing an **n** will return
	// the rest N values in the array.
	_.rest = _.tail = _.drop = function (array, n, guard) {
		return slice.call(array, n == null || guard ? 1 : n);
	};

	// Trim out all falsy values from an array.
	_.compact = function (array) {
		return _.filter(array, _.identity);
	};

	// Internal implementation of a recursive `flatten` function.
	var flatten = function (input, shallow, strict, startIndex) {
		const output = []; let
			idx = 0;
		for (let i = startIndex || 0, length = getLength(input); i < length; i++) {
			let value = input[i];
			if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
				// Flatten current level of array or arguments object
				if (!shallow) {
					value = flatten(value, shallow, strict);
				}

				let j = 0; const
					length_ = value.length;
				output.length += length_;
				while (j < length_) {
					output[idx++] = value[j++];
				}
			} else if (!strict) {
				output[idx++] = value;
			}
		}

		return output;
	};

	// Flatten out an array, either recursively (by default), or just one level.
	_.flatten = function (array, shallow) {
		return flatten(array, shallow, false);
	};

	// Return a version of the array that does not contain the specified value(s).
	_.without = function (array) {
		return _.difference(array, slice.call(arguments, 1));
	};

	// Produce a duplicate-free version of the array. If the array has already
	// been sorted, you have the option of using a faster algorithm.
	// Aliased as `unique`.
	_.uniq = _.unique = function (array, isSorted, iteratee, context) {
		if (!_.isBoolean(isSorted)) {
			context = iteratee;
			iteratee = isSorted;
			isSorted = false;
		}

		if (iteratee != null) {
			iteratee = cb(iteratee, context);
		}

		const result = [];
		let seen = [];
		for (let i = 0, length = getLength(array); i < length; i++) {
			const value = array[i];
			const computed = iteratee ? iteratee(value, i, array) : value;
			if (isSorted) {
				if (!i || seen !== computed) {
					result.push(value);
				}

				seen = computed;
			} else if (iteratee) {
				if (!_.contains(seen, computed)) {
					seen.push(computed);
					result.push(value);
				}
			} else if (!_.contains(result, value)) {
				result.push(value);
			}
		}

		return result;
	};

	// Produce an array that contains the union: each distinct element from all of
	// the passed-in arrays.
	_.union = function () {
		return _.uniq(flatten(arguments, true, true));
	};

	// Produce an array that contains every item shared between all the
	// passed-in arrays.
	_.intersection = function (array) {
		const result = [];
		const argsLength = arguments.length;
		for (let i = 0, length = getLength(array); i < length; i++) {
			const item = array[i];
			if (_.contains(result, item)) {
				continue;
			}

			for (var j = 1; j < argsLength; j++) {
				if (!_.contains(arguments[j], item)) {
					break;
				}
			}

			if (j === argsLength) {
				result.push(item);
			}
		}

		return result;
	};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	_.difference = function (array) {
		const rest = flatten(arguments, true, true, 1);
		return _.filter(array, value => !_.contains(rest, value));
	};

	// Zip together multiple lists into a single array -- elements that share
	// an index go together.
	_.zip = function () {
		return _.unzip(arguments);
	};

	// Complement of _.zip. Unzip accepts an array of arrays and groups
	// each array's elements on shared indices
	_.unzip = function (array) {
		const length = array && _.max(array, getLength).length || 0;
		const result = new Array(length);

		for (let index = 0; index < length; index++) {
			result[index] = _.pluck(array, index);
		}

		return result;
	};

	// Converts lists into objects. Pass either a single array of `[key, value]`
	// pairs, or two parallel arrays of the same length -- one of keys, and one of
	// the corresponding values.
	_.object = function (list, values) {
		const result = {};
		for (let i = 0, length = getLength(list); i < length; i++) {
			if (values) {
				result[list[i]] = values[i];
			} else {
				result[list[i][0]] = list[i][1];
			}
		}

		return result;
	};

	// Generator function to create the findIndex and findLastIndex functions
	function createPredicateIndexFinder(dir) {
		return function (array, predicate, context) {
			predicate = cb(predicate, context);
			const length = getLength(array);
			let index = dir > 0 ? 0 : length - 1;
			for (; index >= 0 && index < length; index += dir) {
				if (predicate(array[index], index, array)) {
					return index;
				}
			}

			return -1;
		};
	}

	// Returns the first index on an array-like that passes a predicate test
	_.findIndex = createPredicateIndexFinder(1);
	_.findLastIndex = createPredicateIndexFinder(-1);

	// Use a comparator function to figure out the smallest index at which
	// an object should be inserted so as to maintain order. Uses binary search.
	_.sortedIndex = function (array, object, iteratee, context) {
		iteratee = cb(iteratee, context, 1);
		const value = iteratee(object);
		let low = 0; let
			high = getLength(array);
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (iteratee(array[mid]) < value) {
				low = mid + 1;
			} else {
				high = mid;
			}
		}

		return low;
	};

	// Generator function to create the indexOf and lastIndexOf functions
	function createIndexFinder(dir, predicateFind, sortedIndex) {
		return function (array, item, idx) {
			let i = 0; let
				length = getLength(array);
			if (typeof idx === 'number') {
				if (dir > 0) {
					i = idx >= 0 ? idx : Math.max(idx + length, i);
				} else {
					length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
				}
			} else if (sortedIndex && idx && length) {
				idx = sortedIndex(array, item);
				return array[idx] === item ? idx : -1;
			}

			if (item !== item) {
				idx = predicateFind(slice.call(array, i, length), _.isNaN);
				return idx >= 0 ? idx + i : -1;
			}

			for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
				if (array[idx] === item) {
					return idx;
				}
			}

			return -1;
		};
	}

	// Return the position of the first occurrence of an item in an array,
	// or -1 if the item is not included in the array.
	// If the array is large and already in sort order, pass `true`
	// for **isSorted** to use binary search.
	_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	_.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	// Generate an integer Array containing an arithmetic progression. A port of
	// the native Python `range()` function. See
	// [the Python documentation](http://docs.python.org/library/functions.html#range).
	_.range = function (start, stop, step) {
		if (stop == null) {
			stop = start || 0;
			start = 0;
		}

		step = step || 1;

		const length = Math.max(Math.ceil((stop - start) / step), 0);
		const range = new Array(length);

		for (let idx = 0; idx < length; idx++, start += step) {
			range[idx] = start;
		}

		return range;
	};

	// Function (ahem) Functions
	// ------------------

	// Determines whether to execute a function as a constructor
	// or a normal function with the provided arguments
	const executeBound = function (sourceFunc, boundFunc, context, callingContext, args) {
		if (!(callingContext instanceof boundFunc)) {
			return sourceFunc.apply(context, args);
		}

		const self = baseCreate(sourceFunc.prototype);
		const result = sourceFunc.apply(self, args);
		if (_.isObject(result)) {
			return result;
		}

		return self;
	};

	// Create a function bound to a given object (assigning `this`, and arguments,
	// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	// available.
	_.bind = function (func, context) {
		if (nativeBind && func.bind === nativeBind) {
			return nativeBind.apply(func, slice.call(arguments, 1));
		}

		if (!_.isFunction(func)) {
			throw new TypeError('Bind must be called on a function');
		}

		const args = slice.call(arguments, 2);
		var bound = function () {
			return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
		};

		return bound;
	};

	// Partially apply a function by creating a version that has had some of its
	// arguments pre-filled, without changing its dynamic `this` context. _ acts
	// as a placeholder, allowing any combination of arguments to be pre-filled.
	_.partial = function (func) {
		const boundArgs = slice.call(arguments, 1);
		var bound = function () {
			let position = 0; const
				length = boundArgs.length;
			const args = new Array(length);
			for (let i = 0; i < length; i++) {
				args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
			}

			while (position < arguments.length) {
				args.push(arguments[position++]);
			}

			return executeBound(func, bound, this, this, args);
		};

		return bound;
	};

	// Bind a number of an object's methods to that object. Remaining arguments
	// are the method names to be bound. Useful for ensuring that all callbacks
	// defined on an object belong to it.
	_.bindAll = function (object) {
		let i; const length = arguments.length; let
			key;
		if (length <= 1) {
			throw new Error('bindAll must be passed function names');
		}

		for (i = 1; i < length; i++) {
			key = arguments[i];
			object[key] = _.bind(object[key], object);
		}

		return object;
	};

	// Memoize an expensive function by storing its results.
	_.memoize = function (func, hasher) {
		var memoize = function (key) {
			const cache = memoize.cache;
			const address = String(hasher ? Reflect.apply(hasher, this, arguments) : key);
			if (!_.has(cache, address)) {
				cache[address] = Reflect.apply(func, this, arguments);
			}

			return cache[address];
		};

		memoize.cache = {};
		return memoize;
	};

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	_.delay = function (func, wait) {
		const args = slice.call(arguments, 2);
		return setTimeout(() => func.apply(null, args), wait);
	};

	// Defers a function, scheduling it to run after the current call stack has
	// cleared.
	_.defer = _.partial(_.delay, _, 1);

	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time. Normally, the throttled function will run
	// as much as it can, without ever going more than once per `wait` duration;
	// but if you'd like to disable the execution on the leading edge, pass
	// `{leading: false}`. To disable execution on the trailing edge, ditto.
	_.throttle = function (func, wait, options) {
		let context; let args; let result;
		let timeout = null;
		let previous = 0;
		if (!options) {
			options = {};
		}

		const later = function () {
			previous = options.leading === false ? 0 : _.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) {
				context = args = null;
			}
		};

		return function () {
			const now = _.now();
			if (!previous && options.leading === false) {
				previous = now;
			}

			const remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}

				previous = now;
				result = func.apply(context, args);
				if (!timeout) {
					context = args = null;
				}
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}

			return result;
		};
	};

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	_.debounce = function (func, wait, immediate) {
		let timeout; let args; let context; let timestamp; let result;

		var later = function () {
			const last = _.now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) {
						context = args = null;
					}
				}
			}
		};

		return function () {
			context = this;
			args = arguments;
			timestamp = _.now();
			const callNow = immediate && !timeout;
			if (!timeout) {
				timeout = setTimeout(later, wait);
			}

			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	};

	// Returns the first function passed as an argument to the second,
	// allowing you to adjust arguments, run code before and after, and
	// conditionally execute the original function.
	_.wrap = function (func, wrapper) {
		return _.partial(wrapper, func);
	};

	// Returns a negated version of the passed-in predicate.
	_.negate = function (predicate) {
		return function () {
			return !Reflect.apply(predicate, this, arguments);
		};
	};

	// Returns a function that is the composition of a list of functions, each
	// consuming the return value of the function that follows.
	_.compose = function () {
		const args = arguments;
		const start = args.length - 1;
		return function () {
			let i = start;
			let result = Reflect.apply(args[start], this, arguments);
			while (i--) {
				result = args[i].call(this, result);
			}

			return result;
		};
	};

	// Returns a function that will only be executed on and after the Nth call.
	_.after = function (times, func) {
		return function () {
			if (--times < 1) {
				return Reflect.apply(func, this, arguments);
			}
		};
	};

	// Returns a function that will only be executed up to (but not including) the Nth call.
	_.before = function (times, func) {
		let memo;
		return function () {
			if (--times > 0) {
				memo = Reflect.apply(func, this, arguments);
			}

			if (times <= 1) {
				func = null;
			}

			return memo;
		};
	};

	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	_.once = _.partial(_.before, 2);

	// Object Functions
	// ----------------

	// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	const hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	const nonEnumerableProps = ['valueOf',
		'isPrototypeOf',
		'toString',
		'propertyIsEnumerable',
		'hasOwnProperty',
		'toLocaleString'];

	function collectNonEnumProps(object, keys) {
		let nonEnumIdx = nonEnumerableProps.length;
		const constructor = object.constructor;
		const proto = (_.isFunction(constructor) && constructor.prototype) || ObjectProto;

		// Constructor is a special case.
		let prop = 'constructor';
		if (_.has(object, prop) && !_.contains(keys, prop)) {
			keys.push(prop);
		}

		while (nonEnumIdx--) {
			prop = nonEnumerableProps[nonEnumIdx];
			if (prop in object && object[prop] !== proto[prop] && !_.contains(keys, prop)) {
				keys.push(prop);
			}
		}
	}

	// Retrieve the names of an object's own properties.
	// Delegates to **ECMAScript 5**'s native `Object.keys`
	_.keys = function (object) {
		if (!_.isObject(object)) {
			return [];
		}

		if (nativeKeys) {
			return nativeKeys(object);
		}

		const keys = [];
		for (const key in object) {
			if (_.has(object, key)) {
				keys.push(key);
			}
		}

		// Ahem, IE < 9.
		if (hasEnumBug) {
			collectNonEnumProps(object, keys);
		}

		return keys;
	};

	// Retrieve all the property names of an object.
	_.allKeys = function (object) {
		if (!_.isObject(object)) {
			return [];
		}

		const keys = [];
		for (const key in object) {
			keys.push(key);
		}

		// Ahem, IE < 9.
		if (hasEnumBug) {
			collectNonEnumProps(object, keys);
		}

		return keys;
	};

	// Retrieve the values of an object's properties.
	_.values = function (object) {
		const keys = _.keys(object);
		const length = keys.length;
		const values = new Array(length);
		for (let i = 0; i < length; i++) {
			values[i] = object[keys[i]];
		}

		return values;
	};

	// Returns the results of applying the iteratee to each element of the object
	// In contrast to _.map it returns an object
	_.mapObject = function (object, iteratee, context) {
		iteratee = cb(iteratee, context);
		const keys = _.keys(object);
		const length = keys.length;
		const results = {};
		let currentKey;
		for (let index = 0; index < length; index++) {
			currentKey = keys[index];
			results[currentKey] = iteratee(object[currentKey], currentKey, object);
		}

		return results;
	};

	// Convert an object into a list of `[key, value]` pairs.
	_.pairs = function (object) {
		const keys = _.keys(object);
		const length = keys.length;
		const pairs = new Array(length);
		for (let i = 0; i < length; i++) {
			pairs[i] = [keys[i], object[keys[i]]];
		}

		return pairs;
	};

	// Invert the keys and values of an object. The values must be serializable.
	_.invert = function (object) {
		const result = {};
		const keys = _.keys(object);
		for (let i = 0, length = keys.length; i < length; i++) {
			result[object[keys[i]]] = keys[i];
		}

		return result;
	};

	// Return a sorted list of the function names available on the object.
	// Aliased as `methods`
	_.functions = _.methods = function (object) {
		const names = [];
		for (const key in object) {
			if (_.isFunction(object[key])) {
				names.push(key);
			}
		}

		return names.sort();
	};

	// Extend a given object with all the properties in passed-in object(s).
	_.extend = createAssigner(_.allKeys);

	// Assigns a given object with all the own properties in the passed-in object(s)
	// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	_.extendOwn = _.assign = createAssigner(_.keys);

	// Returns the first key on an object that passes a predicate test
	_.findKey = function (object, predicate, context) {
		predicate = cb(predicate, context);
		const keys = _.keys(object); let
			key;
		for (let i = 0, length = keys.length; i < length; i++) {
			key = keys[i];
			if (predicate(object[key], key, object)) {
				return key;
			}
		}
	};

	// Return a copy of the object only containing the whitelisted properties.
	_.pick = function (object, oiteratee, context) {
		const result = {}; let object_ = object; let iteratee; let keys;
		if (object_ == null) {
			return result;
		}

		if (_.isFunction(oiteratee)) {
			keys = _.allKeys(object_);
			iteratee = optimizeCb(oiteratee, context);
		} else {
			keys = flatten(arguments, false, false, 1);
			iteratee = function (value, key, object_) {
				return key in object_;
			};

			object_ = new Object(object_);
		}

		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i];
			const value = object_[key];
			if (iteratee(value, key, object_)) {
				result[key] = value;
			}
		}

		return result;
	};

	// Return a copy of the object without the blacklisted properties.
	_.omit = function (object, iteratee, context) {
		if (_.isFunction(iteratee)) {
			iteratee = _.negate(iteratee);
		} else {
			const keys = _.map(flatten(arguments, false, false, 1), String);
			iteratee = function (value, key) {
				return !_.contains(keys, key);
			};
		}

		return _.pick(object, iteratee, context);
	};

	// Fill in a given object with default properties.
	_.defaults = createAssigner(_.allKeys, true);

	// Creates an object that inherits from the given prototype object.
	// If additional properties are provided then they will be added to the
	// created object.
	_.create = function (prototype, props) {
		const result = baseCreate(prototype);
		if (props) {
			_.extendOwn(result, props);
		}

		return result;
	};

	// Create a (shallow-cloned) duplicate of an object.
	_.clone = function (object) {
		if (!_.isObject(object)) {
			return object;
		}

		return _.isArray(object) ? object.slice() : _.extend({}, object);
	};

	// Invokes interceptor with the obj, and then returns obj.
	// The primary purpose of this method is to "tap into" a method chain, in
	// order to perform operations on intermediate results within the chain.
	_.tap = function (object, interceptor) {
		interceptor(object);
		return object;
	};

	// Returns whether an object has a given set of `key:value` pairs.
	_.isMatch = function (object, attrs) {
		const keys = _.keys(attrs); const
			length = keys.length;
		if (object == null) {
			return !length;
		}

		const object_ = new Object(object);
		for (let i = 0; i < length; i++) {
			const key = keys[i];
			if (attrs[key] !== object_[key] || !(key in object_)) {
				return false;
			}
		}

		return true;
	};

	// Internal recursive comparison function for `isEqual`.
	var eq = function (a, b, aStack, bStack) {
		// Identical objects are equal. `0 === -0`, but they aren't identical.
		// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
		if (a === b) {
			return a !== 0 || 1 / a === 1 / b;
		}

		// A strict comparison is necessary because `null == undefined`.
		if (a == null || b == null) {
			return a === b;
		}

		// Unwrap any wrapped objects.
		if (a instanceof _) {
			a = a._wrapped;
		}

		if (b instanceof _) {
			b = b._wrapped;
		}

		// Compare `[[Class]]` names.
		const className = toString.call(a);
		if (className !== toString.call(b)) {
			return false;
		}

		switch (className) {
			// Strings, numbers, regular expressions, dates, and booleans are compared by value.
			case '[object RegExp]':
				// RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
			case '[object String]': {
				// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
				// equivalent to `new String("5")`.
				return String(a) === String(b);
			}

			case '[object Number]': {
				// `NaN`s are equivalent, but non-reflexive.
				// Object(NaN) is equivalent to NaN
				if (Number(a) !== Number(a)) {
					return Number(b) !== Number(b);
				}

				// An `egal` comparison is performed for other numeric values.
				return Number(a) === 0 ? 1 / Number(a) === 1 / b : Number(a) === Number(b);
			}

			case '[object Date]':
			case '[object Boolean]': {
				// Coerce dates and booleans to numeric primitive values. Dates are compared by their
				// millisecond representations. Note that invalid dates with millisecond representations
				// of `NaN` are not equivalent.
				return Number(a) === Number(b);
			}
		}

		const areArrays = className === '[object Array]';
		if (!areArrays) {
			if (typeof a !== 'object' || typeof b !== 'object') {
				return false;
			}

			// Objects with different constructors are not equivalent, but `Object`s or `Array`s
			// from different frames are.
			const aCtor = a.constructor; const
				bCtor = b.constructor;
			if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor
          && _.isFunction(bCtor) && bCtor instanceof bCtor)
        && ('constructor' in a && 'constructor' in b)) {
				return false;
			}
		}
		// Assume equality for cyclic structures. The algorithm for detecting cyclic
		// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

		// Initializing stack of traversed objects.
		// It's done here since we only need them for objects and arrays comparison.
		aStack = aStack || [];
		bStack = bStack || [];
		let length = aStack.length;
		while (length--) {
			// Linear search. Performance is inversely proportional to the number of
			// unique nested structures.
			if (aStack[length] === a) {
				return bStack[length] === b;
			}
		}

		// Add the first object to the stack of traversed objects.
		aStack.push(a);
		bStack.push(b);

		// Recursively compare objects and arrays.
		if (areArrays) {
			// Compare array lengths to determine if a deep comparison is necessary.
			length = a.length;
			if (length !== b.length) {
				return false;
			}

			// Deep compare the contents, ignoring non-numeric properties.
			while (length--) {
				if (!eq(a[length], b[length], aStack, bStack)) {
					return false;
				}
			}
		} else {
			// Deep compare objects.
			const keys = _.keys(a); let
				key;
			length = keys.length;
			// Ensure that both objects contain the same number of properties before comparing deep equality.
			if (_.keys(b).length !== length) {
				return false;
			}

			while (length--) {
				// Deep compare each member
				key = keys[length];
				if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) {
					return false;
				}
			}
		}

		// Remove the first object from the stack of traversed objects.
		aStack.pop();
		bStack.pop();
		return true;
	};

	// Perform a deep comparison to check if two objects are equal.
	_.isEqual = function (a, b) {
		return eq(a, b);
	};

	// Is a given array, string, or object empty?
	// An "empty" object has no enumerable own-properties.
	_.isEmpty = function (object) {
		if (object == null) {
			return true;
		}

		if (isArrayLike(object) && (_.isArray(object) || _.isString(object) || _.isArguments(object))) {
			return object.length === 0;
		}

		return _.keys(object).length === 0;
	};

	// Is a given value a DOM element?
	_.isElement = function (object) {
		return Boolean(object && object.nodeType === 1);
	};

	// Is a given value an array?
	// Delegates to ECMA5's native Array.isArray
	_.isArray = nativeIsArray || function (object) {
		return toString.call(object) === '[object Array]';
	};

	// Is a given variable an object?
	_.isObject = function (object) {
		const type = typeof object;
		return type === 'function' || type === 'object' && Boolean(object);
	};

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], name => {
		_['is' + name] = function (object) {
			return toString.call(object) === '[object ' + name + ']';
		};
	});

	// Define a fallback version of the method in browsers (ahem, IE < 9), where
	// there isn't any inspectable "Arguments" type.
	if (!_.isArguments(arguments)) {
		_.isArguments = function (object) {
			return _.has(object, 'callee');
		};
	}

	// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	// IE 11 (#1621), and in Safari 8 (#1929).
	if (typeof /./ !== 'function' && typeof Int8Array !== 'object') {
		_.isFunction = function (object) {
			return typeof object === 'function' || false;
		};
	}

	// Is a given object a finite number?
	_.isFinite = function (object) {
		return isFinite(object) && !isNaN(Number.parseFloat(object));
	};

	// Is the given value `NaN`? (NaN is the only number which does not equal itself).
	_.isNaN = function (object) {
		return _.isNumber(object) && object !== Number(object);
	};

	// Is a given value a boolean?
	_.isBoolean = function (object) {
		return object === true || object === false || toString.call(object) === '[object Boolean]';
	};

	// Is a given value equal to null?
	_.isNull = function (object) {
		return object === null;
	};

	// Is a given variable undefined?
	_.isUndefined = function (object) {
		return object === void 0;
	};

	// Shortcut function for checking if an object has a given property directly
	// on itself (in other words, not on a prototype).
	_.has = function (object, key) {
		return object != null && hasOwnProperty.call(object, key);
	};

	// Utility Functions
	// -----------------

	// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	// previous owner. Returns a reference to the Underscore object.
	_.noConflict = function () {
		root._ = previousUnderscore;
		return this;
	};

	// Keep the identity function around for default iteratees.
	_.identity = function (value) {
		return value;
	};

	// Predicate-generating functions. Often useful outside of Underscore.
	_.constant = function (value) {
		return function () {
			return value;
		};
	};

	_.noop = function () {};

	_.property = property;

	// Generates a function for a given object that returns a given property.
	_.propertyOf = function (object) {
		return object == null ? function () {} : function (key) {
			return object[key];
		};
	};

	// Returns a predicate for checking whether an object has a given set of
	// `key:value` pairs.
	_.matcher = _.matches = function (attrs) {
		attrs = _.extendOwn({}, attrs);
		return function (object) {
			return _.isMatch(object, attrs);
		};
	};

	// Run a function **n** times.
	_.times = function (n, iteratee, context) {
		const accum = Array.from({length: Math.max(0, n)});
		iteratee = optimizeCb(iteratee, context, 1);
		for (let i = 0; i < n; i++) {
			accum[i] = iteratee(i);
		}

		return accum;
	};

	// Return a random integer between min and max (inclusive).
	_.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}

		return min + Math.floor(Math.random() * (max - min + 1));
	};

	// A (possibly faster) way to get the current timestamp as an integer.
	_.now = Date.now || function () {
		return Date.now();
	};

	// List of HTML entities for escaping.
	const escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;',
	};
	const unescapeMap = _.invert(escapeMap);

	// Functions for escaping and unescaping strings to/from HTML interpolation.
	const createEscaper = function (map) {
		const escaper = function (match) {
			return map[match];
		};

		// Regexes for identifying a key that needs to be escaped
		const source = '(?:' + _.keys(map).join('|') + ')';
		const testRegexp = new RegExp(source);
		const replaceRegexp = new RegExp(source, 'g');
		return function (string) {
			string = string == null ? '' : String(string);
			return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
		};
	};

	_.escape = createEscaper(escapeMap);
	_.unescape = createEscaper(unescapeMap);

	// If the value of the named `property` is a function then invoke it with the
	// `object` as context; otherwise, return it.
	_.result = function (object, property, fallback) {
		let value = object == null ? void 0 : object[property];
		if (value === void 0) {
			value = fallback;
		}

		return _.isFunction(value) ? value.call(object) : value;
	};

	// Generate a unique integer id (unique within the entire client session).
	// Useful for temporary DOM ids.
	let idCounter = 0;
	_.uniqueId = function (prefix) {
		const id = String(++idCounter);
		return prefix ? prefix + id : id;
	};

	// By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	_.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g,
	};

	// When customizing `templateSettings`, if you don't want to define an
	// interpolation, evaluation or escaping regex, we need one that is
	// guaranteed not to match.
	const noMatch = /(.)^/;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	const escapes = {
		'\'': '\'',
		'\\': '\\',
		'\r': 'r',
		'\n': 'n',
		'\u2028': 'u2028',
		'\u2029': 'u2029',
	};

	const escaper = /['\\\n\r\u2028\u2029]/g;

	const escapeChar = function (match) {
		return '\\' + escapes[match];
	};

	// JavaScript micro-templating, similar to John Resig's implementation.
	// Underscore templating handles arbitrary delimiters, preserves whitespace,
	// and correctly escapes quotes within interpolated code.
	// NB: `oldSettings` only exists for backwards compatibility.
	_.template = function (text, settings, oldSettings) {
		if (!settings && oldSettings) {
			settings = oldSettings;
		}

		settings = _.defaults({}, settings, _.templateSettings);

		// Combine delimiters into one regular expression via alternation.
		const matcher = new RegExp([
			(settings.escape || noMatch).source,
			(settings.interpolate || noMatch).source,
			(settings.evaluate || noMatch).source,
		].join('|') + '|$', 'g');

		// Compile the template source, escaping string literals appropriately.
		let index = 0;
		let source = '__p+=\'';
		text.replace(matcher, (match, escape, interpolate, evaluate, offset) => {
			source += text.slice(index, offset).replace(escaper, escapeChar);
			index = offset + match.length;

			if (escape) {
				source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
			} else if (interpolate) {
				source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
			} else if (evaluate) {
				source += '\';\n' + evaluate + '\n__p+=\'';
			}

			// Adobe VMs need the match returned to produce the correct offest.
			return match;
		});
		source += '\';\n';

		// If a variable is not specified, place data values in local scope.
		if (!settings.variable) {
			source = 'with(obj||{}){\n' + source + '}\n';
		}

		source = 'var __t,__p=\'\',__j=Array.prototype.join,'
      + 'print=function(){__p+=__j.call(arguments,\'\');};\n'
      + source + 'return __p;\n';

		try {
			var render = new Function(settings.variable || 'obj', '_', source);
		} catch (error) {
			error.source = source;
			throw error;
		}

		const template = function (data) {
			return render.call(this, data, _);
		};

		// Provide the compiled source as a convenience for precompilation.
		const argument = settings.variable || 'obj';
		template.source = 'function(' + argument + '){\n' + source + '}';

		return template;
	};

	// Add a "chain" function. Start chaining a wrapped Underscore object.
	_.chain = function (object) {
		const instance = _(object);
		instance._chain = true;
		return instance;
	};

	// OOP
	// ---------------
	// If Underscore is called as a function, it returns a wrapped object that
	// can be used OO-style. This wrapper holds altered versions of all the
	// underscore functions. Wrapped objects may be chained.

	// Helper function to continue chaining intermediate results.
	const result = function (instance, object) {
		return instance._chain ? _(object).chain() : object;
	};

	// Add your own custom functions to the Underscore object.
	_.mixin = function (object) {
		_.each(_.functions(object), name => {
			const func = _[name] = object[name];
			_.prototype[name] = function () {
				const args = [this._wrapped];
				push.apply(args, arguments);
				return result(this, func.apply(_, args));
			};
		});
	};

	// Add all of the Underscore functions to the wrapper object.
	_.mixin(_);

	// Add all mutator Array functions to the wrapper.
	_.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], name => {
		const method = ArrayProto[name];
		_.prototype[name] = function () {
			const object = this._wrapped;
			method.apply(object, arguments);
			if ((name === 'shift' || name === 'splice') && object.length === 0) {
				delete object[0];
			}

			return result(this, object);
		};
	});

	// Add all accessor Array functions to the wrapper.
	_.each(['concat', 'join', 'slice'], name => {
		const method = ArrayProto[name];
		_.prototype[name] = function () {
			return result(this, method.apply(this._wrapped, arguments));
		};
	});

	// Extracts the result from a wrapped and chained object.
	_.prototype.value = function () {
		return this._wrapped;
	};

	// Provide unwrapping proxy for some methods used in engine operations
	// such as arithmetic and JSON stringification.
	_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	_.prototype.toString = function () {
		return String(this._wrapped);
	};

	// AMD registration happens at the end for compatibility with AMD loaders
	// that may not enforce next-turn semantics on modules. Even though general
	// practice for AMD registration is to be anonymous, underscore registers
	// as a named module because, like jQuery, it is a base library that is
	// popular enough to be bundled in a third party lib, but not be part of
	// an AMD load request. Those cases could generate an error when an
	// anonymous define() is called outside of a loader request.
	if (typeof define === 'function' && define.amd) {
		define('underscore', [], () => _);
	}
}).call(this);
