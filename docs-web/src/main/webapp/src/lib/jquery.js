/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function (global, factory) {
	'use strict';

	if (typeof module === 'object' && typeof module.exports === 'object') {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document
			? factory(global, true)
			: function (w) {
				if (!w.document) {
					throw new Error('jQuery requires a window with a document');
				}

				return factory(w);
			};
	} else {
		factory(global);
	}

// Pass this if window is not defined yet
})(typeof window !== 'undefined' ? window : this, (window, noGlobal) => {
// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	'use strict';

	const array = [];

	const document = window.document;

	const getProto = Object.getPrototypeOf;

	const slice = array.slice;

	const concat = array.concat;

	const push = array.push;

	const indexOf = array.indexOf;

	const class2type = {};

	const toString = class2type.toString;

	const hasOwn = class2type.hasOwnProperty;

	const fnToString = hasOwn.toString;

	const ObjectFunctionString = fnToString.call(Object);

	const support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		const script = doc.createElement('script');

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module

	const
		version = '3.2.1';

	// Define a local copy of jQuery
	var jQuery = function (selector, context) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	};

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	const rtrim = /^[\s\uFEFF\u00A0]+|[\s\uFEFF\u00A0]+$/g;

	// Matches dashed string for camelizing
	const rmsPrefix = /^-ms-/;
	const rdashAlpha = /-([a-z])/g;

	// Used by jQuery.camelCase as callback to replace()
	const fcamelCase = function (all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray() {
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get(number_) {
			// Return all the elements in a clean array
			if (number_ == null) {
				return slice.call(this);
			}

			// Return just the one element from the set
			return number_ < 0 ? this[number_ + this.length] : this[number_];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack(elems) {
			// Build a new jQuery matched element set
			const returnValue = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			returnValue.prevObject = this;

			// Return the newly-formed element set
			return returnValue;
		},

		// Execute a callback for every element in the matched set.
		each(callback) {
			return jQuery.each(this, callback);
		},

		map(callback) {
			return this.pushStack(jQuery.map(this, (element, i) => callback.call(element, i, element)));
		},

		slice() {
			return this.pushStack(Reflect.apply(slice, this, arguments));
		},

		first() {
			return this.eq(0);
		},

		last() {
			return this.eq(-1);
		},

		eq(i) {
			const length = this.length;
			const j = Number(i) + (i < 0 ? length : 0);
			return this.pushStack(j >= 0 && j < length ? [this[j]] : []);
		},

		end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push,
		sort: array.sort,
		splice: array.splice,
	};

	jQuery.extend = jQuery.fn.extend = function () {
		let options; let name; let src; let copy; let copyIsArray; let clone;
		let target = arguments[0] || {};
		let i = 1;
		const length = arguments.length;
		let deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== 'object' && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy)
              || (copyIsArray = Array.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error(message) {
			throw new Error(message);
		},

		noop() {},

		isFunction(object) {
			return jQuery.type(object) === 'function';
		},

		isWindow(object) {
			return object != null && object === object.window;
		},

		isNumeric(object) {
			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			const type = jQuery.type(object);
			return (type === 'number' || type === 'string')

        // ParseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        && !isNaN(object - Number.parseFloat(object));
		},

		isPlainObject(object) {
			let proto; let Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!object || toString.call(object) !== '[object Object]') {
				return false;
			}

			proto = getProto(object);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
			return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject(object) {
			// See https://github.com/eslint/eslint/issues/6125
			let name;

			for (name in object) {
				return false;
			}

			return true;
		},

		type(object) {
			if (object == null) {
				return String(object);
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof object === 'object' || typeof object === 'function'
				? class2type[toString.call(object)] || 'object'
				: typeof object;
		},

		// Evaluates a script in a global context
		globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase(string) {
			return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
		},

		each(object, callback) {
			let length; let
				i = 0;

			if (isArrayLike(object)) {
				length = object.length;
				for (; i < length; i++) {
					if (callback.call(object[i], i, object[i]) === false) {
						break;
					}
				}
			} else {
				for (i in object) {
					if (callback.call(object[i], i, object[i]) === false) {
						break;
					}
				}
			}

			return object;
		},

		// Support: Android <=4.0 only
		trim(text) {
			return text == null
				? ''
				: (String(text)).replace(rtrim, '');
		},

		// Results is for internal usage only
		makeArray(array_, results) {
			const returnValue = results || [];

			if (array_ != null) {
				if (isArrayLike(new Object(array_))) {
					jQuery.merge(returnValue,
						typeof array_ === 'string'
							? [array_] : array_,
					);
				} else {
					push.call(returnValue, array_);
				}
			}

			return returnValue;
		},

		inArray(element, array_, i) {
			return array_ == null ? -1 : indexOf.call(array_, element, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge(first, second) {
			const length = Number(second.length);
			let j = 0;
			let i = first.length;

			for (; j < length; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep(elems, callback, invert) {
			let callbackInverse;
			const matches = [];
			let i = 0;
			const length = elems.length;
			const callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// Arg is for internal usage only
		map(elems, callback, arg) {
			let length; let value;
			let i = 0;
			const returnValue = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						returnValue.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						returnValue.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], returnValue);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy(fn, context) {
			let temporary; let args; let proxy;

			if (typeof context === 'string') {
				temporary = fn[context];
				context = fn;
				fn = temporary;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// JQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support,
	});

	if (typeof Symbol === 'function') {
		jQuery.fn[Symbol.iterator] = array[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
		(i, name) => {
			class2type['[object ' + name + ']'] = name.toLowerCase();
		});

	function isArrayLike(object) {
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		const length = Boolean(object) && 'length' in object && object.length;
		const type = jQuery.type(object);

		if (type === 'function' || jQuery.isWindow(object)) {
			return false;
		}

		return type === 'array' || length === 0
      || typeof length === 'number' && length > 0 && (length - 1) in object;
	}

	const Sizzle
    /*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
    = (function (window) {
    	let i;
    	let support;
    	let Expr;
    	let getText;
    	let isXML;
    	let tokenize;
    	let compile;
    	let select;
    	let outermostContext;
    	let sortInput;
    	let hasDuplicate;

    	// Local document vars
    	let setDocument;
    	let document;
    	let docElement;
    	let documentIsHTML;
    	let rbuggyQSA;
    	let rbuggyMatches;
    	let matches;
    	let contains;

    	// Instance-specific data
    	const expando = 'sizzle' + Date.now();
    	const preferredDoc = window.document;
    	let dirruns = 0;
    	let done = 0;
    	const classCache = createCache();
    	const tokenCache = createCache();
    	const compilerCache = createCache();
    	let sortOrder = function (a, b) {
    		if (a === b) {
    			hasDuplicate = true;
    		}

    		return 0;
    	};

    	// Instance methods
    	const hasOwn = ({}).hasOwnProperty;
    	let array_ = [];
    	const pop = array_.pop;
    	const push_native = array_.push;
    	let push = array_.push;
    	const slice = array_.slice;
    	// Use a stripped-down indexOf as it's faster than native
    	// https://jsperf.com/thor-indexof-vs-for/5
    	const indexOf = function (list, element) {
    		let i = 0;
    		const length = list.length;
    		for (; i < length; i++) {
    			if (list[i] === element) {
    				return i;
    			}
    		}

    		return -1;
    	};

    	const booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped';

    	// Regular expressions

    	// http://www.w3.org/TR/css3-selectors/#whitespace
    	const whitespace = '[\\x20\\t\\r\\n\\f]';

    	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    	const identifier = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+';

    	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    	const attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace
          // Operator (capture 2)
          + '*([*^$|!~]?=)' + whitespace
          // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
          + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace
          + '*\\]';

    	const pseudos = ':(' + identifier + ')(?:\\(('
          // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
          // 1. quoted (capture 3; capture 4 or capture 5)
          + '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|'
          // 2. simple (capture 6)
          + '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|'
          // 3. anything else (capture 2)
          + '.*'
          + ')\\)|)';

    	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    	const rwhitespace = new RegExp(whitespace + '+', 'g');
    	const rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g');

    	const rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*');
    	const rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*');

    	const rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*?)' + whitespace + '*\\]', 'g');

    	const rpseudo = new RegExp(pseudos);
    	const ridentifier = new RegExp('^' + identifier + '$');

    	const matchExpr = {
    		ID: new RegExp('^#(' + identifier + ')'),
    		CLASS: new RegExp('^\\.(' + identifier + ')'),
    		TAG: new RegExp('^(' + identifier + '|[*])'),
    		ATTR: new RegExp('^' + attributes),
    		PSEUDO: new RegExp('^' + pseudos),
    		CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace
            + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace
            + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
    		bool: new RegExp('^(?:' + booleans + ')$', 'i'),
    		// For use in libraries implementing .is()
    		// We use this for POS matching in `select`
    		needsContext: new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\('
            + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i'),
    	};

    	const rinputs = /^(?:input|select|textarea|button)$/i;
    	const rheader = /^h\d$/i;

    	const rnative = /^[^{]+{\s*\[native \w/;

    	// Easily-parseable/retrievable ID or TAG or CLASS selectors
    	const rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

    	const rsibling = /[+~]/;

    	// CSS escapes
    	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    	const runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig');
    	const funescape = function (_, escaped, escapedWhitespace) {
    		const high = '0x' + escaped - 0x1_00_00;
    		// NaN means non-codepoint
    		// Support: Firefox<24
    		// Workaround erroneous numeric interpretation of +"0x"
    		return high !== high || escapedWhitespace
    			? escaped
    			: (high < 0
    			// BMP codepoint
    				? String.fromCharCode(high + 0x1_00_00)
    			// Supplemental Plane codepoint (surrogate pair)
    				: String.fromCharCode(high >> 10 | 0xD8_00, high & 0x3_FF | 0xDC_00));
    	};

    	// CSS string/identifier serialization
    	// https://drafts.csswg.org/cssom/#common-serializing-idioms
    	const rcssescape = /([\0-\u001F\u007F]|^-?\d)|^-$|[^\0-\u001F\u007F-\uFFFF\w-]/g;
    	const fcssescape = function (ch, asCodePoint) {
    		if (asCodePoint) {
    			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
    			if (ch === '\0') {
    				return '\uFFFD';
    			}

    			// Control characters and (dependent upon position) numbers get escaped as code points
    			return ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' ';
    		}

    		// Other potentially-special ASCII characters get backslash-escaped
    		return '\\' + ch;
    	};

    	// Used for iframes
    	// See setDocument()
    	// Removing the function wrapper causes a "Permission Denied"
    	// error in IE
    	const unloadHandler = function () {
    		setDocument();
    	};

    	const disabledAncestor = addCombinator(
    			element => element.disabled === true && ('form' in element || 'label' in element),
    			{dir: 'parentNode', next: 'legend'},
    	);

    	// Optimize for push.apply( _, NodeList )
    	try {
    		push.apply(
    			(array_ = slice.call(preferredDoc.childNodes)),
    			preferredDoc.childNodes,
    		);
    		// Support: Android<4.0
    		// Detect silently failing push.apply
    		array_[preferredDoc.childNodes.length].nodeType;
    	} catch {
    		push = {apply: array_.length > 0

    		// Leverage slice if possible
    			? function (target, els) {
    				push_native.apply(target, slice.call(els));
    			}

    		// Support: IE<9
    		// Otherwise append directly
    			: function (target, els) {
    				let j = target.length;
    				let i = 0;
    				// Can't trust NodeList.length
    				while ((target[j++] = els[i++])) {}
    				target.length = j - 1;
    			},
    		};
    	}

    	function Sizzle(selector, context, results, seed) {
    		let m; let i; let element; let nid; let match; let groups; let newSelector;
    		let newContext = context && context.ownerDocument;

    		// NodeType defaults to 9, since context defaults to document
    		const nodeType = context ? context.nodeType : 9;

    		results = results || [];

    		// Return early from calls with invalid selector or context
    		if (typeof selector !== 'string' || !selector
          || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
    			return results;
    		}

    		// Try to shortcut find operations (as opposed to filters) in HTML documents
    		if (!seed) {
    			if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
    				setDocument(context);
    			}

    			context = context || document;

    			if (documentIsHTML) {
    				// If the selector is sufficiently simple, try using a "get*By*" DOM method
    				// (excepting DocumentFragment context, where the methods don't exist)
    				if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
    					// ID selector
    					if ((m = match[1])) {
    						// Document context
    						if (nodeType === 9) {
    							if ((element = context.getElementById(m))) {
    								// Support: IE, Opera, Webkit
    								// TODO: identify versions
    								// getElementById can match elements by name instead of ID
    								if (element.id === m) {
    									results.push(element);
    									return results;
    								}
    							} else {
    								return results;
    							}

    							// Element context
    						} else {
    							// Support: IE, Opera, Webkit
    							// TODO: identify versions
    							// getElementById can match elements by name instead of ID
    							if (newContext && (element = newContext.getElementById(m))
                    && contains(context, element)
                    && element.id === m) {
    								results.push(element);
    								return results;
    							}
    						}

    						// Type selector
    					} else if (match[2]) {
    						push.apply(results, context.getElementsByTagName(selector));
    						return results;

    						// Class selector
    					} else if ((m = match[3]) && support.getElementsByClassName
                && context.getElementsByClassName) {
    						push.apply(results, context.getElementsByClassName(m));
    						return results;
    					}
    				}

    				// Take advantage of querySelectorAll
    				if (support.qsa
              && !compilerCache[selector + ' ']
              && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
    					if (nodeType !== 1) {
    						newContext = context;
    						newSelector = selector;

    						// QSA looks outside Element context, which is not what we want
    						// Thanks to Andrew Dupont for this workaround technique
    						// Support: IE <=8
    						// Exclude object elements
    					} else if (context.nodeName.toLowerCase() !== 'object') {
    						// Capture the context ID, setting it first if necessary
    						if ((nid = context.getAttribute('id'))) {
    							nid = nid.replace(rcssescape, fcssescape);
    						} else {
    							context.setAttribute('id', (nid = expando));
    						}

    						// Prefix every selector in the list
    						groups = tokenize(selector);
    						i = groups.length;
    						while (i--) {
    							groups[i] = '#' + nid + ' ' + toSelector(groups[i]);
    						}

    						newSelector = groups.join(',');

    						// Expand context for sibling selectors
    						newContext = rsibling.test(selector) && testContext(context.parentNode)
                  || context;
    					}

    					if (newSelector) {
    						try {
    							push.apply(results,
    								newContext.querySelectorAll(newSelector),
    							);
    							return results;
    						} catch {} finally {
    							if (nid === expando) {
    								context.removeAttribute('id');
    							}
    						}
    					}
    				}
    			}
    		}

    		// All others
    		return select(selector.replace(rtrim, '$1'), context, results, seed);
    	}

    	/**
       * Create key-value caches of limited size
       * @returns {function(string, object)} Returns the Object data after storing it on itself with
       *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
       *	deleting the oldest entry
       */
    	function createCache() {
    		const keys = [];

    		function cache(key, value) {
    			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
    			if (keys.push(key + ' ') > Expr.cacheLength) {
    				// Only keep the most recent entries
    				delete cache[keys.shift()];
    			}

    			return (cache[key + ' '] = value);
    		}

    		return cache;
    	}

    	/**
       * Mark a function for special use by Sizzle
       * @param {Function} fn The function to mark
       */
    	function markFunction(fn) {
    		fn[expando] = true;
    		return fn;
    	}

    	/**
       * Support testing using an element
       * @param {Function} fn Passed the created element and returns a boolean result
       */
    	function assert(fn) {
    		let element = document.createElement('fieldset');

    		try {
    			return Boolean(fn(element));
    		} catch {
    			return false;
    		} finally {
    			// Remove from its parent by default
    			if (element.parentNode) {
    				element.remove();
    			}

    			// Release memory in IE
    			element = null;
    		}
    	}

    	/**
       * Adds the same handler for all of the specified attrs
       * @param {String} attrs Pipe-separated list of attributes
       * @param {Function} handler The method that will be applied
       */
    	function addHandle(attrs, handler) {
    		const array = attrs.split('|');
    		let i = array.length;

    		while (i--) {
    			Expr.attrHandle[array[i]] = handler;
    		}
    	}

    	/**
       * Checks document order of two siblings
       * @param {Element} a
       * @param {Element} b
       * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
       */
    	function siblingCheck(a, b) {
    		let cur = b && a;
    		const diff = cur && a.nodeType === 1 && b.nodeType === 1
            && a.sourceIndex - b.sourceIndex;

    		// Use IE sourceIndex if available on both nodes
    		if (diff) {
    			return diff;
    		}

    		// Check if b follows a
    		if (cur) {
    			while ((cur = cur.nextSibling)) {
    				if (cur === b) {
    					return -1;
    				}
    			}
    		}

    		return a ? 1 : -1;
    	}

    	/**
       * Returns a function to use in pseudos for input types
       * @param {String} type
       */
    	function createInputPseudo(type) {
    		return function (element) {
    			const name = element.nodeName.toLowerCase();
    			return name === 'input' && element.type === type;
    		};
    	}

    	/**
       * Returns a function to use in pseudos for buttons
       * @param {String} type
       */
    	function createButtonPseudo(type) {
    		return function (element) {
    			const name = element.nodeName.toLowerCase();
    			return (name === 'input' || name === 'button') && element.type === type;
    		};
    	}

    	/**
       * Returns a function to use in pseudos for :enabled/:disabled
       * @param {Boolean} disabled true for :disabled; false for :enabled
       */
    	function createDisabledPseudo(disabled) {
    		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
    		return function (element) {
    			// Only certain elements can match :enabled or :disabled
    			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
    			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
    			if ('form' in element) {
    				// Check for inherited disabledness on relevant non-disabled elements:
    				// * listed form-associated elements in a disabled fieldset
    				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
    				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
    				// * option elements in a disabled optgroup
    				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
    				// All such elements have a "form" property.
    				if (element.parentNode && element.disabled === false) {
    					// Option elements defer to a parent optgroup if present
    					if ('label' in element) {
    						if ('label' in element.parentNode) {
    							return element.parentNode.disabled === disabled;
    						}

    						return element.disabled === disabled;
    					}

    					// Support: IE 6 - 11
    					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
    					return element.isDisabled === disabled

                // Where there is no isDisabled, check manually
                /* jshint -W018 */
                || element.isDisabled !== !disabled
                && disabledAncestor(element) === disabled;
    				}

    				return element.disabled === disabled;

    				// Try to winnow out elements that can't be disabled before trusting the disabled property.
    				// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
    				// even exist on them, let alone have a boolean value.
    			}

    			if ('label' in element) {
    				return element.disabled === disabled;
    			}

    			// Remaining elements are neither :enabled nor :disabled
    			return false;
    		};
    	}

    	/**
       * Returns a function to use in pseudos for positionals
       * @param {Function} fn
       */
    	function createPositionalPseudo(fn) {
    		return markFunction(argument => {
    			argument = Number(argument);
    			return markFunction((seed, matches) => {
    				let j;
    				const matchIndexes = fn([], seed.length, argument);
    				let i = matchIndexes.length;

    				// Match elements found at the specified indexes
    				while (i--) {
    					if (seed[(j = matchIndexes[i])]) {
    						seed[j] = !(matches[j] = seed[j]);
    					}
    				}
    			});
    		});
    	}

    	/**
       * Checks a node for validity as a Sizzle context
       * @param {Element|Object=} context
       * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
       */
    	function testContext(context) {
    		return context && typeof context.getElementsByTagName !== 'undefined' && context;
    	}

    	// Expose support vars for convenience
    	support = Sizzle.support = {};

    	/**
       * Detects XML nodes
       * @param {Element|Object} elem An element or a document
       * @returns {Boolean} True iff elem is a non-HTML XML node
       */
    	isXML = Sizzle.isXML = function (element) {
    		// DocumentElement is verified for cases where it doesn't yet exist
    		// (such as loading iframes in IE - #4833)
    		const documentElement = element && (element.ownerDocument || element).documentElement;
    		return documentElement ? documentElement.nodeName !== 'HTML' : false;
    	};

    	/**
       * Sets document-related variables once based on the current document
       * @param {Element|Object} [doc] An element or document object to use to set the document
       * @returns {Object} Returns the current document
       */
    	setDocument = Sizzle.setDocument = function (node) {
    		let hasCompare; let subWindow;
    		const doc = node ? node.ownerDocument || node : preferredDoc;

    		// Return early if doc is invalid or already selected
    		if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
    			return document;
    		}

    		// Update global variables
    		document = doc;
    		docElement = document.documentElement;
    		documentIsHTML = !isXML(document);

    		// Support: IE 9-11, Edge
    		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
    		if (preferredDoc !== document
          && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
    			// Support: IE 11, Edge
    			if (subWindow.addEventListener) {
    				subWindow.addEventListener('unload', unloadHandler, false);

    				// Support: IE 9 - 10 only
    			} else if (subWindow.attachEvent) {
    				subWindow.attachEvent('onunload', unloadHandler);
    			}
    		}

    		/* Attributes
	---------------------------------------------------------------------- */

    		// Support: IE<8
    		// Verify that getAttribute really returns attributes and not properties
    		// (excepting IE8 booleans)
    		support.attributes = assert(element => {
    			element.className = 'i';
    			return !element.getAttribute('className');
    		});

    		/* GetElement(s)By*
	---------------------------------------------------------------------- */

    		// Check if getElementsByTagName("*") returns only elements
    		support.getElementsByTagName = assert(element => {
    			element.append(document.createComment(''));
    			return element.querySelectorAll('*').length === 0;
    		});

    		// Support: IE<9
    		support.getElementsByClassName = rnative.test(document.getElementsByClassName);

    		// Support: IE<10
    		// Check if getElementById returns elements by name
    		// The broken getElementById methods don't pick up programmatically-set names,
    		// so use a roundabout getElementsByName test
    		support.getById = assert(element => {
    			docElement.appendChild(element).id = expando;
    			return !document.getElementsByName || document.getElementsByName(expando).length === 0;
    		});

    		// ID filter and find
    		if (support.getById) {
    			Expr.filter.ID = function (id) {
    				const attrId = id.replace(runescape, funescape);
    				return function (element) {
    					return element.getAttribute('id') === attrId;
    				};
    			};

    			Expr.find.ID = function (id, context) {
    				if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
    					const element = context.getElementById(id);
    					return element ? [element] : [];
    				}
    			};
    		} else {
    			Expr.filter.ID = function (id) {
    				const attrId = id.replace(runescape, funescape);
    				return function (element) {
    					const node = typeof element.getAttributeNode !== 'undefined'
                && element.getAttributeNode('id');
    					return node && node.value === attrId;
    				};
    			};

    			// Support: IE 6 - 7 only
    			// getElementById is not reliable as a find shortcut
    			Expr.find.ID = function (id, context) {
    				if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
    					let node; let i; let elems;
    					let element = context.getElementById(id);

    					if (element) {
    						// Verify the id attribute
    						node = element.getAttributeNode('id');
    						if (node && node.value === id) {
    							return [element];
    						}

    						// Fall back on getElementsByName
    						elems = context.getElementsByName(id);
    						i = 0;
    						while ((element = elems[i++])) {
    							node = element.getAttributeNode('id');
    							if (node && node.value === id) {
    								return [element];
    							}
    						}
    					}

    					return [];
    				}
    			};
    		}

    		// Tag
    		Expr.find.TAG = support.getElementsByTagName
    			? function (tag, context) {
    				if (typeof context.getElementsByTagName !== 'undefined') {
    					return context.getElementsByTagName(tag);

    					// DocumentFragment nodes don't have gEBTN
    				}

    				if (support.qsa) {
    					return context.querySelectorAll(tag);
    				}
    			}

    			: function (tag, context) {
    				let element;
    				const temporary = [];
    				let i = 0;
    				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
    				const results = context.getElementsByTagName(tag);

    				// Filter out possible comments
    				if (tag === '*') {
    					while ((element = results[i++])) {
    						if (element.nodeType === 1) {
    							temporary.push(element);
    						}
    					}

    					return temporary;
    				}

    				return results;
    			};

    		// Class
    		Expr.find.CLASS = support.getElementsByClassName && function (className, context) {
    			if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
    				return context.getElementsByClassName(className);
    			}
    		};

    		/* QSA/matchesSelector
	---------------------------------------------------------------------- */

    		// QSA and matchesSelector support

    		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    		rbuggyMatches = [];

    		// QSa(:focus) reports false when true (Chrome 21)
    		// We allow this because of a bug in IE8/9 that throws an error
    		// whenever `document.activeElement` is accessed on an iframe
    		// So, we allow :focus to pass through QSA all the time to avoid the IE error
    		// See https://bugs.jquery.com/ticket/13378
    		rbuggyQSA = [];

    		if ((support.qsa = rnative.test(document.querySelectorAll))) {
    			// Build QSA regex
    			// Regex strategy adopted from Diego Perini
    			assert(element => {
    				// Select is set to empty string on purpose
    				// This is to test IE's treatment of not explicitly
    				// setting a boolean content attribute,
    				// since its presence should be enough
    				// https://bugs.jquery.com/ticket/12359
    				docElement.appendChild(element).innerHTML = '<a id=\'' + expando + '\'></a>'
              + '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>'
              + '<option selected=\'\'></option></select>';

    				// Support: IE8, Opera 11-12.16
    				// Nothing should be selected when empty strings follow ^= or $= or *=
    				// The test attribute must be unknown in Opera but "safe" for WinRT
    				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
    				if (element.querySelectorAll('[msallowcapture^=\'\']').length > 0) {
    					rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
    				}

    				// Support: IE8
    				// Boolean attributes and "value" are not treated correctly
    				if (element.querySelectorAll('[selected]').length === 0) {
    					rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
    				}

    				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
    				if (element.querySelectorAll('[id~=' + expando + '-]').length === 0) {
    					rbuggyQSA.push('~=');
    				}

    				// Webkit/Opera - :checked should return selected option elements
    				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
    				// IE8 throws error here and will not see later tests
    				if (element.querySelectorAll(':checked').length === 0) {
    					rbuggyQSA.push(':checked');
    				}

    				// Support: Safari 8+, iOS 8+
    				// https://bugs.webkit.org/show_bug.cgi?id=136851
    				// In-page `selector#id sibling-combinator selector` fails
    				if (element.querySelectorAll('a#' + expando + '+*').length === 0) {
    					rbuggyQSA.push('.#.+[+~]');
    				}
    			});

    			assert(element => {
    				element.innerHTML = '<a href=\'\' disabled=\'disabled\'></a>'
              + '<select disabled=\'disabled\'><option/></select>';

    				// Support: Windows 8 Native Apps
    				// The type and name attributes are restricted during .innerHTML assignment
    				const input = document.createElement('input');
    				input.setAttribute('type', 'hidden');
    				element.appendChild(input).setAttribute('name', 'D');

    				// Support: IE8
    				// Enforce case-sensitivity of name attribute
    				if (element.querySelectorAll('[name=d]').length > 0) {
    					rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
    				}

    				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
    				// IE8 throws error here and will not see later tests
    				if (element.querySelectorAll(':enabled').length !== 2) {
    					rbuggyQSA.push(':enabled', ':disabled');
    				}

    				// Support: IE9-11+
    				// IE's :disabled selector does not pick up the children of disabled fieldsets
    				docElement.appendChild(element).disabled = true;
    				if (element.querySelectorAll(':disabled').length !== 2) {
    					rbuggyQSA.push(':enabled', ':disabled');
    				}

    				// Opera 10-11 does not throw on post-comma invalid pseudos
    				element.querySelectorAll('*,:x');
    				rbuggyQSA.push(',.*:');
    			});
    		}

    		if ((support.matchesSelector = rnative.test((matches = docElement.matches
            || docElement.webkitMatchesSelector
            || docElement.mozMatchesSelector
            || docElement.oMatchesSelector
            || docElement.msMatchesSelector)))) {
    			assert(element => {
    				// Check to see if it's possible to do matchesSelector
    				// on a disconnected node (IE 9)
    				support.disconnectedMatch = matches.call(element, '*');

    				// This should fail with an exception
    				// Gecko does not error, returns false instead
    				matches.call(element, '[s!=\'\']:x');
    				rbuggyMatches.push('!=', pseudos);
    			});
    		}

    		rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
    		rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));

    		/* Contains
	---------------------------------------------------------------------- */
    		hasCompare = rnative.test(docElement.compareDocumentPosition);

    		// Element contains another
    		// Purposefully self-exclusive
    		// As in, an element does not contain itself
    		contains = hasCompare || rnative.test(docElement.contains)
    			? function (a, b) {
    				const adown = a.nodeType === 9 ? a.documentElement : a;
    				const bup = b && b.parentNode;
    				return a === bup || Boolean(bup && bup.nodeType === 1 && (
    					adown.contains
    						? adown.contains(bup)
    						: a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
    				));
    			}
    			: function (a, b) {
    				if (b) {
    					while ((b = b.parentNode)) {
    						if (b === a) {
    							return true;
    						}
    					}
    				}

    				return false;
    			};

    		/* Sorting
	---------------------------------------------------------------------- */

    		// Document order sorting
    		sortOrder = hasCompare
    			? function (a, b) {
    				// Flag for duplicate removal
    				if (a === b) {
    					hasDuplicate = true;
    					return 0;
    				}

    				// Sort on method existence if only one input has compareDocumentPosition
    				let compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    				if (compare) {
    					return compare;
    				}

    				// Calculate position if both inputs belong to the same document
    				compare = (a.ownerDocument || a) === (b.ownerDocument || b)
    					? a.compareDocumentPosition(b)

    				// Otherwise we know they are disconnected
    					: 1;

    				// Disconnected nodes
    				if (compare & 1
              || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
    					// Choose the first element that is related to our preferred document
    					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
    						return -1;
    					}

    					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
    						return 1;
    					}

    					// Maintain original order
    					return sortInput
    						? (indexOf(sortInput, a) - indexOf(sortInput, b))
    						: 0;
    				}

    				return compare & 4 ? -1 : 1;
    			}
    			: function (a, b) {
    				// Exit early if the nodes are identical
    				if (a === b) {
    					hasDuplicate = true;
    					return 0;
    				}

    				let cur;
    				let i = 0;
    				const aup = a.parentNode;
    				const bup = b.parentNode;
    				const ap = [a];
    				const bp = [b];

    				// Parentless nodes are either documents or disconnected
    				if (!aup || !bup) {
    					return a === document ? -1
    						: (b === document ? 1
    							: aup ? -1
    								: bup ? 1
    									: sortInput
    										? (indexOf(sortInput, a) - indexOf(sortInput, b))
    										: 0);

    					// If the nodes are siblings, we can do a quick check
    				}

    				if (aup === bup) {
    					return siblingCheck(a, b);
    				}

    				// Otherwise we need full lists of their ancestors for comparison
    				cur = a;
    				while ((cur = cur.parentNode)) {
    					ap.unshift(cur);
    				}

    				cur = b;
    				while ((cur = cur.parentNode)) {
    					bp.unshift(cur);
    				}

    				// Walk down the tree looking for a discrepancy
    				while (ap[i] === bp[i]) {
    					i++;
    				}

    				return i
    				// Do a sibling check if the nodes have a common ancestor
    					? siblingCheck(ap[i], bp[i])

    				// Otherwise nodes in our document sort first
    					: (ap[i] === preferredDoc ? -1
    						: bp[i] === preferredDoc ? 1
    							: 0);
    			};

    		return document;
    	};

    	Sizzle.matches = function (expr, elements) {
    		return Sizzle(expr, null, null, elements);
    	};

    	Sizzle.matchesSelector = function (element, expr) {
    		// Set document vars if needed
    		if ((element.ownerDocument || element) !== document) {
    			setDocument(element);
    		}

    		// Make sure that attribute selectors are quoted
    		expr = expr.replace(rattributeQuotes, '=\'$1\']');

    		if (support.matchesSelector && documentIsHTML
          && !compilerCache[expr + ' ']
          && (!rbuggyMatches || !rbuggyMatches.test(expr))
          && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
    			try {
    				const returnValue = matches.call(element, expr);

    				// IE 9's matchesSelector returns false on disconnected nodes
    				if (returnValue || support.disconnectedMatch
              // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              || element.document && element.document.nodeType !== 11) {
    					return returnValue;
    				}
    			} catch {}
    		}

    		return Sizzle(expr, document, null, [element]).length > 0;
    	};

    	Sizzle.contains = function (context, element) {
    		// Set document vars if needed
    		if ((context.ownerDocument || context) !== document) {
    			setDocument(context);
    		}

    		return contains(context, element);
    	};

    	Sizzle.attr = function (element, name) {
    		// Set document vars if needed
    		if ((element.ownerDocument || element) !== document) {
    			setDocument(element);
    		}

    		const fn = Expr.attrHandle[name.toLowerCase()];
    		// Don't get fooled by Object.prototype properties (jQuery #13807)
    		let value = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
    			? fn(element, name, !documentIsHTML)
    			: undefined;

    		return value !== undefined
    			? value
    			: (support.attributes || !documentIsHTML
    				? element.getAttribute(name)
    				: (value = element.getAttributeNode(name)) && value.specified
    					? value.value
    					: null);
    	};

    	Sizzle.escape = function (sel) {
    		return (String(sel)).replace(rcssescape, fcssescape);
    	};

    	Sizzle.error = function (message) {
    		throw new Error('Syntax error, unrecognized expression: ' + message);
    	};

    	/**
       * Document sorting and removing duplicates
       * @param {ArrayLike} results
       */
    	Sizzle.uniqueSort = function (results) {
    		let element;
    		const duplicates = [];
    		let j = 0;
    		let i = 0;

    		// Unless we *know* we can detect duplicates, assume their presence
    		hasDuplicate = !support.detectDuplicates;
    		sortInput = !support.sortStable && results.slice(0);
    		results.sort(sortOrder);

    		if (hasDuplicate) {
    			while ((element = results[i++])) {
    				if (element === results[i]) {
    					j = duplicates.push(i);
    				}
    			}

    			while (j--) {
    				results.splice(duplicates[j], 1);
    			}
    		}

    		// Clear input after sorting to release objects
    		// See https://github.com/jquery/sizzle/pull/225
    		sortInput = null;

    		return results;
    	};

    	/**
       * Utility function for retrieving the text value of an array of DOM nodes
       * @param {Array|Element} elem
       */
    	getText = Sizzle.getText = function (element) {
    		let node;
    		let returnValue = '';
    		let i = 0;
    		const nodeType = element.nodeType;

    		if (!nodeType) {
    			// If no nodeType, this is expected to be an array
    			while ((node = element[i++])) {
    				// Do not traverse comment nodes
    				returnValue += getText(node);
    			}
    		} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
    			// Use textContent for elements
    			// innerText usage removed for consistency of new lines (jQuery #11153)
    			if (typeof element.textContent === 'string') {
    				return element.textContent;
    			}

    			// Traverse its children
    			for (element = element.firstChild; element; element = element.nextSibling) {
    				returnValue += getText(element);
    			}
    		} else if (nodeType === 3 || nodeType === 4) {
    			return element.nodeValue;
    		}
    		// Do not include comment or processing instruction nodes

    		return returnValue;
    	};

    	Expr = Sizzle.selectors = {

    		// Can be adjusted by the user
    		cacheLength: 50,

    		createPseudo: markFunction,

    		match: matchExpr,

    		attrHandle: {},

    		find: {},

    		relative: {
    			'>': {dir: 'parentNode', first: true},
    			' ': {dir: 'parentNode'},
    			'+': {dir: 'previousSibling', first: true},
    			'~': {dir: 'previousSibling'},
    		},

    		preFilter: {
    			ATTR(match) {
    				match[1] = match[1].replace(runescape, funescape);

    				// Move the given value to match[3] whether quoted or unquoted
    				match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape);

    				if (match[2] === '~=') {
    					match[3] = ' ' + match[3] + ' ';
    				}

    				return match.slice(0, 4);
    			},

    			CHILD(match) {
    				/* Matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
    				match[1] = match[1].toLowerCase();

    				if (match[1].slice(0, 3) === 'nth') {
    					// Nth-* requires argument
    					if (!match[3]) {
    						Sizzle.error(match[0]);
    					}

    					// Numeric x and y parameters for Expr.filter.CHILD
    					// remember that false/true cast respectively to 0/1
    					match[4] = Number(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
    					match[5] = Number((match[7] + match[8]) || match[3] === 'odd');

    					// Other types prohibit arguments
    				} else if (match[3]) {
    					Sizzle.error(match[0]);
    				}

    				return match;
    			},

    			PSEUDO(match) {
    				let excess;
    				const unquoted = !match[6] && match[2];

    				if (matchExpr.CHILD.test(match[0])) {
    					return null;
    				}

    				// Accept quoted arguments as-is
    				if (match[3]) {
    					match[2] = match[4] || match[5] || '';

    					// Strip excess characters from unquoted arguments
    				} else if (unquoted && rpseudo.test(unquoted)
              // Get excess from tokenize (recursively)
              && (excess = tokenize(unquoted, true))
              // Advance to the next closing parenthesis
              && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
    					// Excess is a negative index
    					match[0] = match[0].slice(0, excess);
    					match[2] = unquoted.slice(0, excess);
    				}

    				// Return only captures needed by the pseudo filter method (type and argument)
    				return match.slice(0, 3);
    			},
    		},

    		filter: {

    			TAG(nodeNameSelector) {
    				const nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
    				return nodeNameSelector === '*'
    					? function () {
    						return true;
    					}
    					: function (element) {
    						return element.nodeName && element.nodeName.toLowerCase() === nodeName;
    					};
    			},

    			CLASS(className) {
    				let pattern = classCache[className + ' '];

    				return pattern
              || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)'))
              && classCache(className, element => pattern.test(typeof element.className === 'string' && element.className || typeof element.getAttribute !== 'undefined' && element.getAttribute('class') || ''));
    			},

    			ATTR(name, operator, check) {
    				return function (element) {
    					let result = Sizzle.attr(element, name);

    					if (result == null) {
    						return operator === '!=';
    					}

    					if (!operator) {
    						return true;
    					}

    					result = String(result);

    					return operator === '=' ? result === check
    						: (operator === '!=' ? result !== check
    							: operator === '^=' ? check && result.indexOf(check) === 0
    								: operator === '*=' ? check && result.includes(check)
    									: operator === '$=' ? check && result.slice(-check.length) === check
    										: operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').includes(check)
    											: operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-'
    												: false);
    				};
    			},

    			CHILD(type, what, argument, first, last) {
    				const simple = type.slice(0, 3) !== 'nth';
    					const forward = type.slice(-4) !== 'last';
    					const ofType = what === 'of-type';

    				return first === 1 && last === 0

    				// Shortcut for :nth-*(n)
    					? function (element) {
    						return Boolean(element.parentNode);
    					}

    					: function (element, context, xml) {
    						let cache; let uniqueCache; let outerCache; let node; let nodeIndex; let start;
    						let dir = simple !== forward ? 'nextSibling' : 'previousSibling';
    						const parent = element.parentNode;
    						const name = ofType && element.nodeName.toLowerCase();
    						const useCache = !xml && !ofType;
    						let diff = false;

    						if (parent) {
    							// :(first|last|only)-(child|of-type)
    							if (simple) {
    								while (dir) {
    									node = element;
    									while ((node = node[dir])) {
    										if (ofType
    											? node.nodeName.toLowerCase() === name
    											: node.nodeType === 1) {
    											return false;
    										}
    									}

    									// Reverse direction for :only-* (if we haven't yet done so)
    									start = dir = type === 'only' && !start && 'nextSibling';
    								}

    								return true;
    							}

    							start = [forward ? parent.firstChild : parent.lastChild];

    							// Non-xml :nth-child(...) stores cache data on `parent`
    							if (forward && useCache) {
    								// Seek `elem` from a previously-cached index

    								// ...in a gzip-friendly way
    								node = parent;
    								outerCache = node[expando] || (node[expando] = {});

    								// Support: IE <9 only
    								// Defend against cloned attroperties (jQuery gh-1709)
    								uniqueCache = outerCache[node.uniqueID]
                      || (outerCache[node.uniqueID] = {});

    								cache = uniqueCache[type] || [];
    								nodeIndex = cache[0] === dirruns && cache[1];
    								diff = nodeIndex && cache[2];
    								node = nodeIndex && parent.childNodes[nodeIndex];

    								while ((node = ++nodeIndex && node && node[dir]

                      // Fallback to seeking `elem` from the start
                      || (diff = nodeIndex = 0) || start.pop())) {
    									// When found, cache indexes on `parent` and break
    									if (node.nodeType === 1 && ++diff && node === element) {
    										uniqueCache[type] = [dirruns, nodeIndex, diff];
    										break;
    									}
    								}
    							} else {
    								// Use previously-cached element index if available
    								if (useCache) {
    									// ...in a gzip-friendly way
    									node = element;
    									outerCache = node[expando] || (node[expando] = {});

    									// Support: IE <9 only
    									// Defend against cloned attroperties (jQuery gh-1709)
    									uniqueCache = outerCache[node.uniqueID]
                        || (outerCache[node.uniqueID] = {});

    									cache = uniqueCache[type] || [];
    									nodeIndex = cache[0] === dirruns && cache[1];
    									diff = nodeIndex;
    								}

    								// Xml :nth-child(...)
    								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
    								if (diff === false) {
    									// Use the same loop as above to seek `elem` from the start
    									while ((node = ++nodeIndex && node && node[dir]
                        || (diff = nodeIndex = 0) || start.pop())) {
    										if ((ofType
    											? node.nodeName.toLowerCase() === name
    											: node.nodeType === 1)
                          && ++diff) {
    											// Cache the index of each encountered element
    											if (useCache) {
    												outerCache = node[expando] || (node[expando] = {});

    												// Support: IE <9 only
    												// Defend against cloned attroperties (jQuery gh-1709)
    												uniqueCache = outerCache[node.uniqueID]
                              || (outerCache[node.uniqueID] = {});

    												uniqueCache[type] = [dirruns, diff];
    											}

    											if (node === element) {
    												break;
    											}
    										}
    									}
    								}
    							}

    							// Incorporate the offset, then check against cycle size
    							diff -= last;
    							return diff === first || (diff % first === 0 && diff / first >= 0);
    						}
    					};
    			},

    			PSEUDO(pseudo, argument) {
    				// Pseudo-class names are case-insensitive
    				// http://www.w3.org/TR/selectors/#pseudo-classes
    				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
    				// Remember that setFilters inherits from pseudos
    				let args;
    				const fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()]
                || Sizzle.error('unsupported pseudo: ' + pseudo);

    				// The user may use createPseudo to indicate that
    				// arguments are needed to create the filter function
    				// just as Sizzle does
    				if (fn[expando]) {
    					return fn(argument);
    				}

    				// But maintain support for old signatures
    				if (fn.length > 1) {
    					args = [pseudo, pseudo, '', argument];
    					return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
    						? markFunction((seed, matches) => {
    							let idx;
    							const matched = fn(seed, argument);
    							let i = matched.length;
    							while (i--) {
    								idx = indexOf(seed, matched[i]);
    								seed[idx] = !(matches[idx] = matched[i]);
    							}
    						})
    						: function (element) {
    							return fn(element, 0, args);
    						};
    				}

    				return fn;
    			},
    		},

    		pseudos: {
    			// Potentially complex pseudos
    			not: markFunction(selector => {
    				// Trim the selector passed to compile
    				// to avoid treating leading and trailing
    				// spaces as combinators
    				const input = [];
    				const results = [];
    				const matcher = compile(selector.replace(rtrim, '$1'));

    				return matcher[expando]
    					? markFunction((seed, matches, context, xml) => {
    						let element;
    						const unmatched = matcher(seed, null, xml, []);
    						let i = seed.length;

    						// Match elements unmatched by `matcher`
    						while (i--) {
    							if ((element = unmatched[i])) {
    								seed[i] = !(matches[i] = element);
    							}
    						}
    					})
    					: function (element, context, xml) {
    						input[0] = element;
    						matcher(input, null, xml, results);
    						// Don't keep the element (issue #299)
    						input[0] = null;
    						return !results.pop();
    					};
    			}),

    			has: markFunction(selector => function (element) {
    					return Sizzle(selector, element).length > 0;
    				}),

    			contains: markFunction(text => {
    				text = text.replace(runescape, funescape);
    				return function (element) {
    					return (element.textContent || element.innerText || getText(element)).includes(text);
    				};
    			}),

    			// "Whether an element is represented by a :lang() selector
    			// is based solely on the element's language value
    			// being equal to the identifier C,
    			// or beginning with the identifier C immediately followed by "-".
    			// The matching of C against the element's language value is performed case-insensitively.
    			// The identifier C does not have to be a valid language name."
    			// http://www.w3.org/TR/selectors/#lang-pseudo
    			lang: markFunction(lang => {
    				// Lang value must be a valid identifier
    				if (!ridentifier.test(lang || '')) {
    					Sizzle.error('unsupported lang: ' + lang);
    				}

    				lang = lang.replace(runescape, funescape).toLowerCase();
    				return function (element) {
    					let elementLang;
    					do {
    						if ((elementLang = documentIsHTML
    							? element.lang
    							: element.getAttribute('xml:lang') || element.getAttribute('lang'))) {
    							elementLang = elementLang.toLowerCase();
    							return elementLang === lang || elementLang.indexOf(lang + '-') === 0;
    						}
    					} while ((element = element.parentNode) && element.nodeType === 1);

    					return false;
    				};
    			}),

    			// Miscellaneous
    			target(element) {
    				const hash = window.location && window.location.hash;
    				return hash && hash.slice(1) === element.id;
    			},

    			root(element) {
    				return element === docElement;
    			},

    			focus(element) {
    				return element === document.activeElement && (!document.hasFocus || document.hasFocus()) && Boolean(element.type || element.href || ~element.tabIndex);
    			},

    			// Boolean properties
    			enabled: createDisabledPseudo(false),
    			disabled: createDisabledPseudo(true),

    			checked(element) {
    				// In CSS3, :checked should return both checked and selected elements
    				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
    				const nodeName = element.nodeName.toLowerCase();
    				return (nodeName === 'input' && Boolean(element.checked)) || (nodeName === 'option' && Boolean(element.selected));
    			},

    			selected(element) {
    				// Accessing this property makes selected-by-default
    				// options in Safari work properly
    				if (element.parentNode) {
    					element.parentNode.selectedIndex;
    				}

    				return element.selected === true;
    			},

    			// Contents
    			empty(element) {
    				// http://www.w3.org/TR/selectors/#empty-pseudo
    				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
    				//   but not by others (comment: 8; processing instruction: 7; etc.)
    				// nodeType < 6 works because attributes (2) do not appear as children
    				for (element = element.firstChild; element; element = element.nextSibling) {
    					if (element.nodeType < 6) {
    						return false;
    					}
    				}

    				return true;
    			},

    			parent(element) {
    				return !Expr.pseudos.empty(element);
    			},

    			// Element/input types
    			header(element) {
    				return rheader.test(element.nodeName);
    			},

    			input(element) {
    				return rinputs.test(element.nodeName);
    			},

    			button(element) {
    				const name = element.nodeName.toLowerCase();
    				return name === 'input' && element.type === 'button' || name === 'button';
    			},

    			text(element) {
    				let attr;
    				return element.nodeName.toLowerCase() === 'input'
              && element.type === 'text'

              // Support: IE<8
              // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
              && ((attr = element.getAttribute('type')) == null || attr.toLowerCase() === 'text');
    			},

    			// Position-in-collection
    			first: createPositionalPseudo(() => [0]),

    			last: createPositionalPseudo((matchIndexes, length) => [length - 1]),

    			eq: createPositionalPseudo((matchIndexes, length, argument) => [argument < 0 ? argument + length : argument]),

    			even: createPositionalPseudo((matchIndexes, length) => {
    				let i = 0;
    				for (; i < length; i += 2) {
    					matchIndexes.push(i);
    				}

    				return matchIndexes;
    			}),

    			odd: createPositionalPseudo((matchIndexes, length) => {
    				let i = 1;
    				for (; i < length; i += 2) {
    					matchIndexes.push(i);
    				}

    				return matchIndexes;
    			}),

    			lt: createPositionalPseudo((matchIndexes, length, argument) => {
    				let i = argument < 0 ? argument + length : argument;
    				for (; --i >= 0;) {
    					matchIndexes.push(i);
    				}

    				return matchIndexes;
    			}),

    			gt: createPositionalPseudo((matchIndexes, length, argument) => {
    				let i = argument < 0 ? argument + length : argument;
    				for (; ++i < length;) {
    					matchIndexes.push(i);
    				}

    				return matchIndexes;
    			}),
    		},
    	};

    	Expr.pseudos.nth = Expr.pseudos.eq;

    	// Add button/input type pseudos
    	for (i in {radio: true, checkbox: true, file: true, password: true, image: true}) {
    		Expr.pseudos[i] = createInputPseudo(i);
    	}

    	for (i in {submit: true, reset: true}) {
    		Expr.pseudos[i] = createButtonPseudo(i);
    	}

    	// Easy API for creating new setFilters
    	function setFilters() {}
    	setFilters.prototype = Expr.filters = Expr.pseudos;
    	Expr.setFilters = new setFilters();

    	tokenize = Sizzle.tokenize = function (selector, parseOnly) {
    		let matched; let match; let tokens; let type;
    		let soFar; let groups; let preFilters;
    		const cached = tokenCache[selector + ' '];

    		if (cached) {
    			return parseOnly ? 0 : cached.slice(0);
    		}

    		soFar = selector;
    		groups = [];
    		preFilters = Expr.preFilter;

    		while (soFar) {
    			// Comma and first run
    			if (!matched || (match = rcomma.exec(soFar))) {
    				if (match) {
    					// Don't consume trailing commas as valid
    					soFar = soFar.slice(match[0].length) || soFar;
    				}

    				groups.push((tokens = []));
    			}

    			matched = false;

    			// Combinators
    			if ((match = rcombinators.exec(soFar))) {
    				matched = match.shift();
    				tokens.push({
    					value: matched,
    					// Cast descendant combinators to space
    					type: match[0].replace(rtrim, ' '),
    				});
    				soFar = soFar.slice(matched.length);
    			}

    			// Filters
    			for (type in Expr.filter) {
    				if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type]
                || (match = preFilters[type](match)))) {
    					matched = match.shift();
    					tokens.push({
    						value: matched,
    						type,
    						matches: match,
    					});
    					soFar = soFar.slice(matched.length);
    				}
    			}

    			if (!matched) {
    				break;
    			}
    		}

    		// Return the length of the invalid excess
    		// if we're just parsing
    		// Otherwise, throw an error or return tokens
    		return parseOnly
    			? soFar.length
    			: (soFar
    				? Sizzle.error(selector)
    			// Cache the tokens
    				: tokenCache(selector, groups).slice(0));
    	};

    	function toSelector(tokens) {
    		let i = 0;
    		const length = tokens.length;
    		let selector = '';
    		for (; i < length; i++) {
    			selector += tokens[i].value;
    		}

    		return selector;
    	}

    	function addCombinator(matcher, combinator, base) {
    		const dir = combinator.dir;
    		const skip = combinator.next;
    		const key = skip || dir;
    		const checkNonElements = base && key === 'parentNode';
    		const doneName = done++;

    		return combinator.first
    		// Check against closest ancestor/preceding element
    			? function (element, context, xml) {
    				while ((element = element[dir])) {
    					if (element.nodeType === 1 || checkNonElements) {
    						return matcher(element, context, xml);
    					}
    				}

    				return false;
    			}

    		// Check against all ancestor/preceding elements
    			: function (element, context, xml) {
    				let oldCache; let uniqueCache; let outerCache;
    				const newCache = [dirruns, doneName];

    				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
    				if (xml) {
    					while ((element = element[dir])) {
    						if ((element.nodeType === 1 || checkNonElements) && matcher(element, context, xml)) {
    							return true;
    						}
    					}
    				} else {
    					while ((element = element[dir])) {
    						if (element.nodeType === 1 || checkNonElements) {
    							outerCache = element[expando] || (element[expando] = {});

    							// Support: IE <9 only
    							// Defend against cloned attroperties (jQuery gh-1709)
    							uniqueCache = outerCache[element.uniqueID] || (outerCache[element.uniqueID] = {});

    							if (skip && skip === element.nodeName.toLowerCase()) {
    								element = element[dir] || element;
    							} else if ((oldCache = uniqueCache[key])
                    && oldCache[0] === dirruns && oldCache[1] === doneName) {
    								// Assign to newCache so results back-propagate to previous elements
    								return (newCache[2] = oldCache[2]);
    							} else {
    								// Reuse newcache so results back-propagate to previous elements
    								uniqueCache[key] = newCache;

    								// A match means we're done; a fail means we have to keep checking
    								if ((newCache[2] = matcher(element, context, xml))) {
    									return true;
    								}
    							}
    						}
    					}
    				}

    				return false;
    			};
    	}

    	function elementMatcher(matchers) {
    		return matchers.length > 1
    			? function (element, context, xml) {
    				let i = matchers.length;
    				while (i--) {
    					if (!matchers[i](element, context, xml)) {
    						return false;
    					}
    				}

    				return true;
    			}
    			: matchers[0];
    	}

    	function multipleContexts(selector, contexts, results) {
    		let i = 0;
    		const length = contexts.length;
    		for (; i < length; i++) {
    			Sizzle(selector, contexts[i], results);
    		}

    		return results;
    	}

    	function condense(unmatched, map, filter, context, xml) {
    		let element;
    		const newUnmatched = [];
    		let i = 0;
    		const length = unmatched.length;
    		const mapped = map != null;

    		for (; i < length; i++) {
    			if ((element = unmatched[i]) && (!filter || filter(element, context, xml))) {
    				newUnmatched.push(element);
    					if (mapped) {
    						map.push(i);
    					}
    				}
    		}

    		return newUnmatched;
    	}

    	function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
    		if (postFilter && !postFilter[expando]) {
    			postFilter = setMatcher(postFilter);
    		}

    		if (postFinder && !postFinder[expando]) {
    			postFinder = setMatcher(postFinder, postSelector);
    		}

    		return markFunction((seed, results, context, xml) => {
    			let temporary; let i; let element;
    			const preMap = [];
    			const postMap = [];
    			const preexisting = results.length;

    			// Get initial elements from seed or context
    			const elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []);

    			// Prefilter to get matcher input, preserving a map for seed-results synchronization
    			const matcherIn = preFilter && (seed || !selector)
    				? condense(elems, preMap, preFilter, context, xml)
    				: elems;

    			let matcherOut = matcher
    			// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
    				? (postFinder || (seed ? preFilter : preexisting || postFilter)

    				// ...intermediate processing is necessary
    					? []

    				// ...otherwise use results directly
    					: results)
    				: matcherIn;

    			// Find primary matches
    			if (matcher) {
    				matcher(matcherIn, matcherOut, context, xml);
    			}

    			// Apply postFilter
    			if (postFilter) {
    				temporary = condense(matcherOut, postMap);
    				postFilter(temporary, [], context, xml);

    				// Un-match failing elements by moving them back to matcherIn
    				i = temporary.length;
    				while (i--) {
    					if ((element = temporary[i])) {
    						matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = element);
    					}
    				}
    			}

    			if (seed) {
    				if (postFinder || preFilter) {
    					if (postFinder) {
    						// Get the final matcherOut by condensing this intermediate into postFinder contexts
    						temporary = [];
    						i = matcherOut.length;
    						while (i--) {
    							if ((element = matcherOut[i])) {
    								// Restore matcherIn since elem is not yet a final match
    								temporary.push((matcherIn[i] = element));
    							}
    						}

    						postFinder(null, (matcherOut = []), temporary, xml);
    					}

    					// Move matched elements from seed to results to keep them synchronized
    					i = matcherOut.length;
    					while (i--) {
    						if ((element = matcherOut[i])
                  && (temporary = postFinder ? indexOf(seed, element) : preMap[i]) > -1) {
    							seed[temporary] = !(results[temporary] = element);
    						}
    					}
    				}

    				// Add elements to results, through postFinder if defined
    			} else {
    				matcherOut = condense(
    					matcherOut === results
    						? matcherOut.splice(preexisting, matcherOut.length)
    						: matcherOut,
    				);
    				if (postFinder) {
    					postFinder(null, results, matcherOut, xml);
    				} else {
    					push.apply(results, matcherOut);
    				}
    			}
    		});
    	}

    	function matcherFromTokens(tokens) {
    		let checkContext; let matcher; let j;
    		const length = tokens.length;
    		const leadingRelative = Expr.relative[tokens[0].type];
    		const implicitRelative = leadingRelative || Expr.relative[' '];
    		let i = leadingRelative ? 1 : 0;

    		// The foundational matcher ensures that elements are reachable from top-level context(s)
    		const matchContext = addCombinator(element => element === checkContext, implicitRelative, true);
    		const matchAnyContext = addCombinator(element => indexOf(checkContext, element) > -1, implicitRelative, true);
    		let matchers = [function (element, context, xml) {
    				const returnValue = (!leadingRelative && (xml || context !== outermostContext)) || (
    				(checkContext = context).nodeType
    					? matchContext(element, context, xml)
    					: matchAnyContext(element, context, xml));
    			// Avoid hanging onto element (issue #299)
    			checkContext = null;
    			return returnValue;
    			}];

    		for (; i < length; i++) {
    			if ((matcher = Expr.relative[tokens[i].type])) {
    				matchers = [addCombinator(elementMatcher(matchers), matcher)];
    			} else {
    				matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

    				// Return special upon seeing a positional matcher
    				if (matcher[expando]) {
    					// Find the next relative operator (if any) for proper handling
    					j = ++i;
    					for (; j < length; j++) {
    						if (Expr.relative[tokens[j].type]) {
    							break;
    						}
    					}

    					return setMatcher(
    						i > 1 && elementMatcher(matchers),
    						i > 1 && toSelector(
    							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
    							tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === ' ' ? '*' : ''}),
    						).replace(rtrim, '$1'),
    						matcher,
    						i < j && matcherFromTokens(tokens.slice(i, j)),
    						j < length && matcherFromTokens((tokens = tokens.slice(j))),
    						j < length && toSelector(tokens),
    					);
    				}

    				matchers.push(matcher);
    			}
    		}

    		return elementMatcher(matchers);
    	}

    	function matcherFromGroupMatchers(elementMatchers, setMatchers) {
    		const bySet = setMatchers.length > 0;
    		const byElement = elementMatchers.length > 0;
    		const superMatcher = function (seed, context, xml, results, outermost) {
    				let element; let j; let matcher;
    			let matchedCount = 0;
    			let i = '0';
    			const unmatched = seed && [];
    			let setMatched = [];
    			const contextBackup = outermostContext;
    			// We must always have either seed elements or outermost context
    			const elems = seed || byElement && Expr.find.TAG('*', outermost);
    			// Use integer dirruns iff this is the outermost matcher
    			const dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
    			const length = elems.length;

    			if (outermost) {
    				outermostContext = context === document || context || outermost;
    			}

    			// Add elements passing elementMatchers directly to results
    			// Support: IE<9, Safari
    			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
    			for (; i !== length && (element = elems[i]) != null; i++) {
    				if (byElement && element) {
    					j = 0;
    					if (!context && element.ownerDocument !== document) {
    						setDocument(element);
    						xml = !documentIsHTML;
    					}

    					while ((matcher = elementMatchers[j++])) {
    						if (matcher(element, context || document, xml)) {
    							results.push(element);
    							break;
    						}
    					}

    					if (outermost) {
    						dirruns = dirrunsUnique;
    					}
    				}

    				// Track unmatched elements for set filters
    				if (bySet) {
    					// They will have gone through all possible matchers
    					if ((element = !matcher && element)) {
    						matchedCount--;
    					}

    					// Lengthen the array for every element, matched or not
    					if (seed) {
    						unmatched.push(element);
    						}
    					}
    				}

    				// `i` is now the count of elements visited above, and adding it to `matchedCount`
    				// makes the latter nonnegative.
    				matchedCount += i;

    				// Apply set filters to unmatched elements
    				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
    				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
    				// no element matchers and no seed.
    				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
    				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
    				// numerically zero.
    				if (bySet && i !== matchedCount) {
    					j = 0;
    					while ((matcher = setMatchers[j++])) {
    						matcher(unmatched, setMatched, context, xml);
    					}

    					if (seed) {
    						// Reintegrate element matches to eliminate the need for sorting
    						if (matchedCount > 0) {
    							while (i--) {
    								if (!(unmatched[i] || setMatched[i])) {
    									setMatched[i] = pop.call(results);
    								}
    							}
    						}

    						// Discard index placeholder values to get only actual matches
    						setMatched = condense(setMatched);
    					}

    					// Add matches to results
    					push.apply(results, setMatched);

    					// Seedless set matches succeeding multiple successful matchers stipulate sorting
    					if (outermost && !seed && setMatched.length > 0
                && (matchedCount + setMatchers.length) > 1) {
    					Sizzle.uniqueSort(results);
    					}
    				}

    				// Override manipulation of globals by nested matchers
    				if (outermost) {
    					dirruns = dirrunsUnique;
    					outermostContext = contextBackup;
    				}

    				return unmatched;
    			};

    		return bySet
    			? markFunction(superMatcher)
    			: superMatcher;
    	}

    	compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
    		let i;
    		const setMatchers = [];
    		const elementMatchers = [];
    		let cached = compilerCache[selector + ' '];

    		if (!cached) {
    			// Generate a function of recursive functions that can be used to check each element
    			if (!match) {
    				match = tokenize(selector);
    			}

    			i = match.length;
    			while (i--) {
    				cached = matcherFromTokens(match[i]);
    				if (cached[expando]) {
    					setMatchers.push(cached);
    				} else {
    					elementMatchers.push(cached);
    				}
    			}

    			// Cache the compiled function
    			cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

    			// Save selector and tokenization
    			cached.selector = selector;
    		}

    		return cached;
    	};

    	/**
       * A low-level selection function that works with Sizzle's compiled
       *  selector functions
       * @param {String|Function} selector A selector or a pre-compiled
       *  selector function built with Sizzle.compile
       * @param {Element} context
       * @param {Array} [results]
       * @param {Array} [seed] A set of elements to match against
       */
    	select = Sizzle.select = function (selector, context, results, seed) {
    		let i; let tokens; let token; let type; let find;
    		const compiled = typeof selector === 'function' && selector;
    		const match = !seed && tokenize((selector = compiled.selector || selector));

    		results = results || [];

    		// Try to minimize operations if there is only one selector in the list and no seed
    		// (the latter of which guarantees us context)
    		if (match.length === 1) {
    			// Reduce context if the leading compound selector is an ID
    			tokens = match[0] = match[0].slice(0);
    			if (tokens.length > 2 && (token = tokens[0]).type === 'ID'
            && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
    				context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
    				if (!context) {
    					return results;

    					// Precompiled matchers will still verify ancestry, so step up a level
    				}

    				if (compiled) {
    					context = context.parentNode;
    				}

    				selector = selector.slice(tokens.shift().value.length);
    			}

    			// Fetch a seed set for right-to-left matching
    			i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
    			while (i--) {
    				token = tokens[i];

    				// Abort if we hit a combinator
    				if (Expr.relative[(type = token.type)]) {
    					break;
    				}

    				if ((find = Expr.find[type]) // Search, expanding context for leading sibling combinators
               && (seed = find(
               	token.matches[0].replace(runescape, funescape),
               	rsibling.test(tokens[0].type) && testContext(context.parentNode) || context,
               ))) {
    					// If seed is empty or no tokens remain, we can return early
    					tokens.splice(i, 1);
    					selector = seed.length && toSelector(tokens);
    					if (!selector) {
    						push.apply(results, seed);
    						return results;
    					}

    					break;
    				}
    			}
    		}

    		// Compile and execute a filtering function if one is not provided
    		// Provide `match` to avoid retokenization if we modified the selector above
    		(compiled || compile(selector, match))(
    			seed,
    			context,
    			!documentIsHTML,
    			results,
    			!context || rsibling.test(selector) && testContext(context.parentNode) || context,
    		);
    		return results;
    	};

    	// One-time assignments

    	// Sort stability
    	support.sortStable = expando.split('').sort(sortOrder).join('') === expando;

    	// Support: Chrome 14-35+
    	// Always assume duplicates if they aren't passed to the comparison function
    	support.detectDuplicates = Boolean(hasDuplicate);

    	// Initialize against the default document
    	setDocument();

    	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    	// Detached nodes confoundingly follow *each other*
    	support.sortDetached = assert(element =>
    		// Should return 1, but returns 4 (following)
    		 element.compareDocumentPosition(document.createElement('fieldset')) & 1,
    	);

    	// Support: IE<8
    	// Prevent attribute/property "interpolation"
    	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    	if (!assert(element => {
    		element.innerHTML = '<a href=\'#\'></a>';
    		return element.firstChild.getAttribute('href') === '#';
    	})) {
    		addHandle('type|href|height|width', (element, name, isXML) => {
    			if (!isXML) {
    				return element.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
    			}
    		});
    	}

    	// Support: IE<9
    	// Use defaultValue in place of getAttribute("value")
    	if (!support.attributes || !assert(element => {
    		element.innerHTML = '<input/>';
    		element.firstChild.setAttribute('value', '');
    		return element.firstChild.getAttribute('value') === '';
    	})) {
    		addHandle('value', (element, name, isXML) => {
    			if (!isXML && element.nodeName.toLowerCase() === 'input') {
    				return element.defaultValue;
    			}
    		});
    	}

    	// Support: IE<9
    	// Use getAttributeNode to fetch booleans when getAttribute lies
    	if (!assert(element => element.getAttribute('disabled') == null)) {
    		addHandle(booleans, (element, name, isXML) => {
    			let value;
    			if (!isXML) {
    				return element[name] === true ? name.toLowerCase()
    					: ((value = element.getAttributeNode(name)) && value.specified
    						? value.value
    						: null);
    			}
    		});
    	}

    	return Sizzle;
    })(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[':'] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	const dir = function (element, dir, until) {
		const matched = [];
		const truncate = until !== undefined;

		while ((element = element[dir]) && element.nodeType !== 9) {
			if (element.nodeType === 1) {
				if (truncate && jQuery(element).is(until)) {
					break;
				}

				matched.push(element);
			}
		}

		return matched;
	};

	const siblings = function (n, element) {
		const matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== element) {
				matched.push(n);
			}
		}

		return matched;
	};

	const rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(element, name) {
		return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
	}

	const rsingleTag = (/^<([a-z][^/\0>: \t\r\n\f]*)[ \t\r\n\f]*\/?>(?:<\/\1>|)$/i);

	const risSimple = /^.[^:#[.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, (element, i) => Boolean(qualifier.call(element, i, element)) !== not);
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, element => (element === qualifier) !== not);
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== 'string') {
			return jQuery.grep(elements, element => (indexOf.call(qualifier, element) > -1) !== not);
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, element => (indexOf.call(qualifier, element) > -1) !== not && element.nodeType === 1);
	}

	jQuery.filter = function (expr, elems, not) {
		const element = elems[0];

		if (not) {
			expr = ':not(' + expr + ')';
		}

		if (elems.length === 1 && element.nodeType === 1) {
			return jQuery.find.matchesSelector(element, expr) ? [element] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, element_ => element_.nodeType === 1));
	};

	jQuery.fn.extend({
		find(selector) {
			let i; let returnValue;
			const length = this.length;
			const self = this;

			if (typeof selector !== 'string') {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < length; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			returnValue = this.pushStack([]);

			for (i = 0; i < length; i++) {
				jQuery.find(selector, self[i], returnValue);
			}

			return length > 1 ? jQuery.uniqueSort(returnValue) : returnValue;
		},
		filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is(selector) {
			return winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === 'string' && rneedsContext.test(selector)
					? jQuery(selector)
					: selector || [],
				false,
			).length > 0;
		},
	});

	// Initialize a jQuery object

	// A central reference to the root jQuery(document)
	let rootjQuery;

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

	const init = jQuery.fn.init = function (selector, context, root) {
		let match; let element;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === 'string') {
			if (selector[0] === '<'
          && selector[selector.length - 1] === '>'
          && selector.length >= 3) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {
				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true,
					));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {
							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				}

				element = document.getElementById(match[2]);

				if (element) {
					// Inject the element directly into the jQuery object
					this[0] = element;
					this.length = 1;
				}

				return this;

				// HANDLE: $(expr, $(...))
			}

			if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			}

			return this.constructor(context).find(selector);

			// HANDLE: $(DOMElement)
		}

		if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		}

		if (jQuery.isFunction(selector)) {
			return root.ready !== undefined
				? root.ready(selector)

			// Execute immediately if ready is not present
				: selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	const rparentsprev = /^(?:parents|prev(?:Until|All))/;

	// Methods guaranteed to produce a unique set when starting from a unique set
	const guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true,
	};

	jQuery.fn.extend({
		has(target) {
			const targets = jQuery(target, this);
			const l = targets.length;

			return this.filter(function () {
				let i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest(selectors, context) {
			let cur;
			let i = 0;
			const l = this.length;
			const matched = [];
			const targets = typeof selectors !== 'string' && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
						// Always skip document fragments
						if (cur.nodeType < 11 && (targets
							? targets.index(cur) > -1

						// Don't pass non-elements to Sizzle
							: cur.nodeType === 1
                && jQuery.find.matchesSelector(cur, selectors))) {
							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index(element) {
			// No argument, return index in parent
			if (!element) {
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof element === 'string') {
				return indexOf.call(jQuery(element), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

				// If it receives a jQuery object, the first element is used
				element.jquery ? element[0] : element,
			);
		},

		add(selector, context) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge(this.get(), jQuery(selector, context)),
				),
			);
		},

		addBack(selector) {
			return this.add(selector == null
				? this.prevObject : this.prevObject.filter(selector),
			);
		},
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent(element) {
			const parent = element.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents(element) {
			return dir(element, 'parentNode');
		},
		parentsUntil(element, i, until) {
			return dir(element, 'parentNode', until);
		},
		next(element) {
			return sibling(element, 'nextSibling');
		},
		prev(element) {
			return sibling(element, 'previousSibling');
		},
		nextAll(element) {
			return dir(element, 'nextSibling');
		},
		prevAll(element) {
			return dir(element, 'previousSibling');
		},
		nextUntil(element, i, until) {
			return dir(element, 'nextSibling', until);
		},
		prevUntil(element, i, until) {
			return dir(element, 'previousSibling', until);
		},
		siblings(element) {
			return siblings((element.parentNode || {}).firstChild, element);
		},
		children(element) {
			return siblings(element.firstChild);
		},
		contents(element) {
			if (nodeName(element, 'iframe')) {
				return element.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(element, 'template')) {
				element = element.content || element;
			}

			return jQuery.merge([], element.childNodes);
		},
	}, (name, fn) => {
		jQuery.fn[name] = function (until, selector) {
			let matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== 'Until') {
				selector = until;
			}

			if (selector && typeof selector === 'string') {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {
				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	const rnothtmlwhite = (/[^ \t\r\n\f]+/g);

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		const object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], (_, flag) => {
			object[flag] = true;
		});
		return object;
	}

	/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
	jQuery.Callbacks = function (options) {
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === 'string'
			? createOptions(options)
			: jQuery.extend({}, options);

		let // Flag to know if list is currently firing
			firing;

		// Last fire value for non-forgettable lists
		let memory;

		// Flag to know if list was already fired
		let fired;

		// Flag to prevent firing
		let locked;

		// Actual callback list
		let list = [];

		// Queue of execution data for repeatable lists
		let queue = [];

		// Index of currently firing callback (modified by add/remove as needed)
		let firingIndex = -1;

		// Fire callbacks
		const fire = function () {
			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for (; queue.length > 0; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {
					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false
              && options.stopOnFalse) {
						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (locked) {
				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = '';
				}
			}
		};

		// Actual Callbacks object
		var self = {

			// Add a callback or a collection of callbacks to the list
			add() {
				if (list) {
					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, (_, arg) => {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length > 0 && jQuery.type(arg) !== 'string') {
								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}

				return this;
			},

			// Remove a callback from the list
			remove() {
				jQuery.each(arguments, (_, arg) => {
					let index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has(fn) {
				return fn
					? jQuery.inArray(fn, list) > -1
					: list.length > 0;
			},

			// Remove all callbacks from the list
			empty() {
				if (list) {
					list = [];
				}

				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable() {
				locked = queue = [];
				list = memory = '';
				return this;
			},
			disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock() {
				locked = queue = [];
				if (!memory && !firing) {
					list = memory = '';
				}

				return this;
			},
			locked() {
				return Boolean(locked);
			},

			// Call all callbacks with the given context and arguments
			fireWith(context, args) {
				if (!locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}

				return this;
			},

			// Call all the callbacks with the given arguments
			fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired() {
				return Boolean(fired);
			},
		};

		return self;
	};

	function Identity(v) {
		return v;
	}

	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		let method;

		try {
			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction((method = value.promise))) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction((method = value.then))) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {
				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (error) {
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [error]);
		}
	}

	jQuery.extend({

		Deferred(func) {
			const tuples = [

				// Action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				['notify',
					'progress',
					jQuery.Callbacks('memory'),
					jQuery.Callbacks('memory'),
					2],
				['resolve',
					'done',
					jQuery.Callbacks('once memory'),
					jQuery.Callbacks('once memory'),
					0,
					'resolved'],
				['reject',
					'fail',
					jQuery.Callbacks('once memory'),
					jQuery.Callbacks('once memory'),
					1,
					'rejected'],
			];
			let state = 'pending';
			var promise = {
				state() {
					return state;
				},
				always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				catch(fn) {
					return promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe(/* fnDone, fnFail, fnProgress */) {
					let fns = arguments;

					return jQuery.Deferred(newDefer => {
						jQuery.each(tuples, (i, tuple) => {
							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							const fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// Deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								const returned = fn && Reflect.apply(fn, this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise()
										.progress(newDefer.notify)
										.done(newDefer.resolve)
										.fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + 'With'](
										this,
										fn ? [returned] : arguments,
									);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then(onFulfilled, onRejected, onProgress) {
					let maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							let that = this;
							let args = arguments;
							const mightThrow = function () {
								let returned; let then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError('Thenable self-resolution');
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned

                      // Support: Promises/A+ section 2.3.4
                      // https://promisesaplus.com/#point-64
                      // Only check objects and functions for thenability
                      && (typeof returned === 'object'
                        || typeof returned === 'function')
                      && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {
									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(
											returned,
											resolve(maxDepth, deferred, Identity, special),
											resolve(maxDepth, deferred, Thrower, special),
										);

										// Normal processors (resolve) also hook into progress
									} else {
										// ...and disregard older resolution values
										maxDepth++;

										then.call(
											returned,
											resolve(maxDepth, deferred, Identity, special),
											resolve(maxDepth, deferred, Thrower, special),
											resolve(maxDepth, deferred, Identity,
												deferred.notifyWith),
										);
									}

									// Handle all other returned values
								} else {
									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							};

							// Only normal processors (resolve) catch and reject exceptions
							var process = special
								? mightThrow
								: function () {
									try {
										mightThrow();
									} catch (error) {
										if (jQuery.Deferred.exceptionHook) {
											jQuery.Deferred.exceptionHook(error,
												process.stackTrace);
										}

										// Support: Promises/A+ section 2.3.3.3.4.1
										// https://promisesaplus.com/#point-61
										// Ignore post-resolution exceptions
										if (depth + 1 >= maxDepth) {
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if (handler !== Thrower) {
												that = undefined;
												args = [error];
											}

											deferred.rejectWith(that, args);
										}
									}
								};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {
								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}

								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(newDefer => {
						// Progress_handlers.add( ... )
						tuples[0][3].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction(onProgress)
									? onProgress
									: Identity,
								newDefer.notifyWith,
							),
						);

						// Fulfilled_handlers.add( ... )
						tuples[1][3].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction(onFulfilled)
									? onFulfilled
									: Identity,
							),
						);

						// Rejected_handlers.add( ... )
						tuples[2][3].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction(onRejected)
									? onRejected
									: Thrower,
							),
						);
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise(object) {
					return object != null ? jQuery.extend(object, promise) : promise;
				},
			};
			var deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, (i, tuple) => {
				const list = tuple[2];
				const stateString = tuple[5];

				// Promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(
						() => {
							// State = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// Rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[3 - i][2].disable,

						// Progress_callbacks.lock
						tuples[0][2].lock,
					);
				}

				// Progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// Deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + 'With'](this === deferred ? undefined : this, arguments);
					return this;
				};

				// Deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + 'With'] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when(singleValue) {
			let

				// Count of uncompleted subordinates
				remaining = arguments.length;

			// Count of unprocessed arguments
			let i = remaining;

			// Subordinate fulfillment data
			const resolveContexts = new Array(i);
			const resolveValues = slice.call(arguments);

			// The master Deferred
			const main = jQuery.Deferred();

			// Subordinate callback factory
			const updateFunc = function (i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
					if (!(--remaining)) {
						main.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, main.done(updateFunc(i)).resolve, main.reject,
					!remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (main.state() === 'pending'
          || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
					return main.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), main.reject);
			}

			return main.promise();
		},
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	const rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn('jQuery.Deferred exception: ' + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(() => {
			throw error;
		});
	};

	// The deferred used on DOM ready
	const readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {
		readyList
			.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
			.catch(error => {
				jQuery.readyException(error);
			});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready(wait) {
			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		},
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener('DOMContentLoaded', completed);
		window.removeEventListener('load', completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === 'complete'
    || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {
		// Use the handy event callback
		document.addEventListener('DOMContentLoaded', completed);

		// A fallback to window.onload, that will always work
		window.addEventListener('load', completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
		let i = 0;
		const length = elems.length;
		let bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === 'object') {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {
				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function (element, key, value) {
						return bulk.call(jQuery(element), value);
					};
				}
			}

			if (fn) {
				for (; i < length; i++) {
					fn(
						elems[i], key, raw
							? value
							: value.call(elems[i], i, fn(elems[i], key)),
					);
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return length ? fn(elems[0], key) : emptyGet;
	};

	const acceptData = function (owner) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !(Number(owner.nodeType));
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache(owner) {
			// Check if the owner object already has a cache
			let value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value,
							configurable: true,
						});
					}
				}
			}

			return value;
		},
		set(owner, data, value) {
			let prop;
			const cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === 'string') {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {
				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}

			return cache;
		},
		get(owner, key) {
			return key === undefined
				? this.cache(owner)

			// Always use camelCase key (gh-2257)
				: owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access(owner, key, value) {
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined
        || ((key && typeof key === 'string') && value === undefined)) {
				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove(owner, key) {
			let i;
			const cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {
				// Support array or space separated string of keys
				if (Array.isArray(key)) {
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache
						? [key]
						: (key.match(rnothtmlwhite) || []);
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData(owner) {
			const cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		},
	};
	const dataPriv = new Data();

	const dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	const rbrace = /^(?:{[\w\W]*}|\[[\w\W]*])$/;
	const rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === 'true') {
			return true;
		}

		if (data === 'false') {
			return false;
		}

		if (data === 'null') {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === String(Number(data))) {
			return Number(data);
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(element, key, data) {
		let name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && element.nodeType === 1) {
			name = 'data-' + key.replace(rmultiDash, '-$&').toLowerCase();
			data = element.getAttribute(name);

			if (typeof data === 'string') {
				try {
					data = getData(data);
				} catch {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(element, key, data);
			} else {
				data = undefined;
			}
		}

		return data;
	}

	jQuery.extend({
		hasData(element) {
			return dataUser.hasData(element) || dataPriv.hasData(element);
		},

		data(element, name, data) {
			return dataUser.access(element, name, data);
		},

		removeData(element, name) {
			dataUser.remove(element, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data(element, name, data) {
			return dataPriv.access(element, name, data);
		},

		_removeData(element, name) {
			dataPriv.remove(element, name);
		},
	});

	jQuery.fn.extend({
		data(key, value) {
			let i; let name; let data;
			const element = this[0];
			const attrs = element && element.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(element);

					if (element.nodeType === 1 && !dataPriv.get(element, 'hasDataAttrs')) {
						i = attrs.length;
						while (i--) {
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf('data-') === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(element, name, data[name]);
								}
							}
						}

						dataPriv.set(element, 'hasDataAttrs', true);
					}
				}

				return data;
			}

			// Sets multiple values
			if (typeof key === 'object') {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				let data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (element && value === undefined) {
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(element, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(element, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {
					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		},
	});

	jQuery.extend({
		queue(element, type, data) {
			let queue;

			if (element) {
				type = (type || 'fx') + 'queue';
				queue = dataPriv.get(element, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(element, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}

				return queue || [];
			}
		},

		dequeue(element, type) {
			type = type || 'fx';

			const queue = jQuery.queue(element, type);
			let startLength = queue.length;
			let fn = queue.shift();
			const hooks = jQuery._queueHooks(element, type);
			const next = function () {
				jQuery.dequeue(element, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === 'inprogress') {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === 'fx') {
					queue.unshift('inprogress');
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(element, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks(element, type) {
			const key = type + 'queueHooks';
			return dataPriv.get(element, key) || dataPriv.access(element, key, {
				empty: jQuery.Callbacks('once memory').add(() => {
					dataPriv.remove(element, [type + 'queue', key]);
				}),
			});
		},
	});

	jQuery.fn.extend({
		queue(type, data) {
			let setter = 2;

			if (typeof type !== 'string') {
				data = type;
				type = 'fx';
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined
				? this
				: this.each(function () {
					const queue = jQuery.queue(this, type, data);

					// Ensure a hooks for this queue
					jQuery._queueHooks(this, type);

					if (type === 'fx' && queue[0] !== 'inprogress') {
						jQuery.dequeue(this, type);
					}
				});
		},
		dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue(type) {
			return this.queue(type || 'fx', []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise(type, object) {
			let temporary;
			let count = 1;
			const defer = jQuery.Deferred();
			const elements = this;
			let i = this.length;
			const resolve = function () {
				if (!(--count)) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== 'string') {
				object = type;
				type = undefined;
			}

			type = type || 'fx';

			while (i--) {
				temporary = dataPriv.get(elements[i], type + 'queueHooks');
				if (temporary && temporary.empty) {
					count++;
					temporary.empty.add(resolve);
				}
			}

			resolve();
			return defer.promise(object);
		},
	});
	const pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	const rcssNumber = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i');

	const cssExpand = ['Top', 'Right', 'Bottom', 'Left'];

	const isHiddenWithinTree = function (element, element_) {
		// IsHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		element = element_ || element;

		// Inline style trumps all
		return element.style.display === 'none'
      || element.style.display === ''

      // Otherwise, check computed style
      // Support: Firefox <=43 - 45
      // Disconnected elements can have computed display: none, so first confirm that elem is
      // in the document.
      && jQuery.contains(element.ownerDocument, element)

      && jQuery.css(element, 'display') === 'none';
	};

	const swap = function (element, options, callback, args) {
		let returnValue; let name;
		const old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = element.style[name];
			element.style[name] = options[name];
		}

		returnValue = callback.apply(element, args || []);

		// Revert the old values
		for (name in options) {
			element.style[name] = old[name];
		}

		return returnValue;
	};

	function adjustCSS(element, prop, valueParts, tween) {
		let adjusted;
		let scale = 1;
		let maxIterations = 20;
		const currentValue = tween
			? function () {
				return tween.cur();
			}
			: function () {
				return jQuery.css(element, prop, '');
			};

		const initial = currentValue();
		let unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? '' : 'px');

		// Starting value computation is required for potential unit mismatches
		let initialInUnit = (jQuery.cssNumber[prop] || unit !== 'px' && Number(initial))
        && rcssNumber.exec(jQuery.css(element, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = Number(initial) || 1;

			do {
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || '.5';

				// Adjust and apply
				initialInUnit /= scale;
				jQuery.style(element, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations
			);
		}

		if (valueParts) {
			initialInUnit = Number(initialInUnit) || Number(initial) || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1]
				? initialInUnit + (valueParts[1] + 1) * valueParts[2]
				: Number(valueParts[2]);
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}

		return adjusted;
	}

	const defaultDisplayMap = {};

	function getDefaultDisplay(element) {
		let temporary;
		const doc = element.ownerDocument;
		const nodeName = element.nodeName;
		let display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temporary = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temporary, 'display');

		temporary.remove();

		if (display === 'none') {
			display = 'block';
		}

		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		let display; let element;
		const values = [];
		let index = 0;
		const length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			element = elements[index];
			if (!element.style) {
				continue;
			}

			display = element.style.display;
			if (show) {
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === 'none') {
					values[index] = dataPriv.get(element, 'display') || null;
					if (!values[index]) {
						element.style.display = '';
					}
				}

				if (element.style.display === '' && isHiddenWithinTree(element)) {
					values[index] = getDefaultDisplay(element);
				}
			} else if (display !== 'none') {
				values[index] = 'none';

				// Remember what we're overwriting
				dataPriv.set(element, 'display', display);
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show() {
			return showHide(this, true);
		},
		hide() {
			return showHide(this);
		},
		toggle(state) {
			if (typeof state === 'boolean') {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		},
	});
	const rcheckableType = (/^(?:checkbox|radio)$/i);

	const rtagName = (/<([a-z][^/\0> \t\r\n\f]+)/i);

	const rscriptType = (/^$|\/(?:java|ecma)script/i);

	// We have to close these tags to support XHTML (#13200)
	const wrapMap = {

		// Support: IE <=9 only
		option: [1, '<select multiple=\'multiple\'>', '</select>'],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, '<table>', '</table>'],
		col: [2, '<table><colgroup>', '</colgroup></table>'],
		tr: [2, '<table><tbody>', '</tbody></table>'],
		td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],

		_default: [0, '', ''],
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		let returnValue;

		if (typeof context.getElementsByTagName !== 'undefined') {
			returnValue = context.getElementsByTagName(tag || '*');
		} else if (typeof context.querySelectorAll !== 'undefined') {
			returnValue = context.querySelectorAll(tag || '*');
		} else {
			returnValue = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], returnValue);
		}

		return returnValue;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		let i = 0;
		const l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(
				elems[i],
				'globalEval',
				!refElements || dataPriv.get(refElements[i], 'globalEval'),
			);
		}
	}

	const rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		let element; let temporary; let tag; let wrap; let contains; let j;
		const fragment = context.createDocumentFragment();
		const nodes = [];
		let i = 0;
		const l = elems.length;

		for (; i < l; i++) {
			element = elems[i];

			if (element || element === 0) {
				// Add nodes directly
				if (jQuery.type(element) === 'object') {
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, element.nodeType ? [element] : element);

					// Convert non-html into a text node
				} else if (!rhtml.test(element)) {
					nodes.push(context.createTextNode(element));

					// Convert html into DOM nodes
				} else {
					temporary = temporary || fragment.appendChild(context.createElement('div'));

					// Deserialize a standard representation
					tag = (rtagName.exec(element) || ['', ''])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					temporary.innerHTML = wrap[1] + jQuery.htmlPrefilter(element) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						temporary = temporary.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, temporary.childNodes);

					// Remember the top-level container
					temporary = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					temporary.textContent = '';
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = '';

		i = 0;
		while ((element = nodes[i++])) {
			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(element, selection) > -1) {
				if (ignored) {
					ignored.push(element);
				}

				continue;
			}

			contains = jQuery.contains(element.ownerDocument, element);

			// Append to fragment
			temporary = getAll(fragment.appendChild(element), 'script');

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(temporary);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while ((element = temporary[j++])) {
					if (rscriptType.test(element.type || '')) {
						scripts.push(element);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		const fragment = document.createDocumentFragment();
		const div = fragment.appendChild(document.createElement('div'));
		const input = document.createElement('input');

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute('type', 'radio');
		input.setAttribute('checked', 'checked');
		input.setAttribute('name', 't');

		div.append(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = '<textarea>x</textarea>';
		support.noCloneChecked = Boolean(div.cloneNode(true).lastChild.defaultValue);
	})();

	const documentElement = document.documentElement;

	const
		rkeyEvent = /^key/;
	const rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
	const rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch {}
	}

	function on(element, types, selector, data, fn, one) {
		let origFn; let type;

		// Types can be a map of types/handlers
		if (typeof types === 'object') {
			// ( types-Object, selector, data )
			if (typeof selector !== 'string') {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}

			for (type in types) {
				on(element, type, selector, data, types[type], one);
			}

			return element;
		}

		if (data == null && fn == null) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === 'string') {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}

		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return element;
		}

		if (one === 1) {
			origFn = fn;
			fn = function (event) {
				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return Reflect.apply(origFn, this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}

		return element.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
	jQuery.event = {

		global: {},

		add(element, types, handler, data, selector) {
			let handleObjectIn; let eventHandle; let temporary;
			let events; let t; let handleObject;
			let special; let handlers; let type; let namespaces; let origType;
			const elementData = dataPriv.get(element);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elementData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjectIn = handler;
				handler = handleObjectIn.handler;
				selector = handleObjectIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elementData.events)) {
				events = elementData.events = {};
			}

			if (!(eventHandle = elementData.handle)) {
				eventHandle = elementData.handle = function (e) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== 'undefined' && jQuery.event.triggered !== e.type
						? jQuery.event.dispatch.apply(element, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || '').match(rnothtmlwhite) || [''];
			t = types.length;
			while (t--) {
				temporary = rtypenamespace.exec(types[t]) || [];
				type = origType = temporary[1];
				namespaces = (temporary[2] || '').split('.').sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// HandleObj is passed to all event handlers
				handleObject = jQuery.extend({
					type,
					origType,
					data,
					handler,
					guid: handler.guid,
					selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join('.'),
				}, handleObjectIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ((!special.setup
            || special.setup.call(element, data, namespaces, eventHandle) === false) && element.addEventListener) {
						element.addEventListener(type, eventHandle);
					}
				}

				if (special.add) {
					special.add.call(element, handleObject);

					if (!handleObject.handler.guid) {
						handleObject.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObject);
				} else {
					handlers.push(handleObject);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove(element, types, handler, selector, mappedTypes) {
			let j; let origCount; let temporary;
			let events; let t; let handleObject;
			let special; let handlers; let type; let namespaces; let origType;
			const elementData = dataPriv.hasData(element) && dataPriv.get(element);

			if (!elementData || !(events = elementData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || '').match(rnothtmlwhite) || [''];
			t = types.length;
			while (t--) {
				temporary = rtypenamespace.exec(types[t]) || [];
				type = origType = temporary[1];
				namespaces = (temporary[2] || '').split('.').sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(element, type + types[t], handler, selector, true);
					}

					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				temporary = temporary[2]
          && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObject = handlers[j];

					if ((mappedTypes || origType === handleObject.origType)
            && (!handler || handler.guid === handleObject.guid)
            && (!temporary || temporary.test(handleObject.namespace))
            && (!selector || selector === handleObject.selector
              || selector === '**' && handleObject.selector)) {
						handlers.splice(j, 1);

						if (handleObject.selector) {
							handlers.delegateCount--;
						}

						if (special.remove) {
							special.remove.call(element, handleObject);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && handlers.length === 0) {
					if (!special.teardown
            || special.teardown.call(element, namespaces, elementData.handle) === false) {
						jQuery.removeEvent(element, type, elementData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(element, 'handle events');
			}
		},

		dispatch(nativeEvent) {
			// Make a writable jQuery.Event from the native event object
			const event = jQuery.event.fix(nativeEvent);

			let i; let j; let returnValue; let matched; let handleObject; let handlerQueue;
			const args = Array.from({length: arguments.length});
			const handlers = (dataPriv.get(this, 'events') || {})[event.type] || [];
			const special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObject = matched.handlers[j++])
        && !event.isImmediatePropagationStopped()) {
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObject.namespace)) {
						event.handleObj = handleObject;
						event.data = handleObject.data;

						returnValue = ((jQuery.event.special[handleObject.origType] || {}).handle
              || handleObject.handler).apply(matched.elem, args);

						if (returnValue !== undefined && (event.result = returnValue) === false) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers(event, handlers) {
			let i; let handleObject; let sel; let matchedHandlers; let matchedSelectors;
			const handlerQueue = [];
			const delegateCount = handlers.delegateCount;
			let cur = event.target;

			// Find delegate handlers
			if (delegateCount

        // Support: IE <=9
        // Black-hole SVG <use> instance trees (trac-13180)
        && cur.nodeType

        // Support: Firefox <=42
        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
        // Support: IE 11 only
        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
        && !(event.type === 'click' && event.button >= 1)) {
				for (; cur !== this; cur = cur.parentNode || this) {
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === 'click' && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObject = handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObject.selector + ' ';

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObject.needsContext
									? jQuery(sel, this).index(cur) > -1
									: jQuery.find(sel, this, null, [cur]).length;
							}

							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObject);
							}
						}

						if (matchedHandlers.length > 0) {
							handlerQueue.push({elem: cur, handlers: matchedHandlers});
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < handlers.length) {
				handlerQueue.push({elem: cur, handlers: handlers.slice(delegateCount)});
			}

			return handlerQueue;
		},

		addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook)
					? function () {
						if (this.originalEvent) {
							return hook(this.originalEvent);
						}
					}
					: function () {
						if (this.originalEvent) {
							return this.originalEvent[name];
						}
					},

				set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value,
					});
				},
			});
		},

		fix(originalEvent) {
			return originalEvent[jQuery.expando]
				? originalEvent
				: new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true,
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: 'focusin',
			},
			blur: {
				trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: 'focusout',
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger() {
					if (this.type === 'checkbox' && this.click && nodeName(this, 'input')) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default(event) {
					return nodeName(event.target, 'a');
				},
			},

			beforeunload: {
				postDispatch(event) {
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				},
			},
		},
	};

	jQuery.removeEvent = function (element, type, handle) {
		// This "if" is needed for plain objects
		if (element.removeEventListener) {
			element.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {
		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented
      || src.defaultPrevented === undefined

      // Support: Android <=2.3 only
      && src.returnValue === false
				? returnTrue
				: returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = (src.target && src.target.nodeType === 3)
				? src.target.parentNode
				: src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// JQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault() {
			const e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation() {
			const e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation() {
			const e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		},
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		char: true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which(event) {
			const button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		},
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout',
	}, (orig, fix) => {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle(event) {
				let returnValue;
				const target = this;
				const related = event.relatedTarget;
				const handleObject = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || (related !== target && !jQuery.contains(target, related))) {
					event.type = handleObject.origType;
					returnValue = Reflect.apply(handleObject.handler, this, arguments);
					event.type = fix;
				}

				return returnValue;
			},
		};
	});

	jQuery.fn.extend({

		on(types, selector, data, fn) {
			return on(this, types, selector, data, fn);
		},
		one(types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1);
		},
		off(types, selector, fn) {
			let handleObject; let type;
			if (types && types.preventDefault && types.handleObj) {
				// ( event )  dispatched jQuery.Event
				handleObject = types.handleObj;
				jQuery(types.delegateTarget).off(
					handleObject.namespace
						? handleObject.origType + '.' + handleObject.namespace
						: handleObject.origType,
					handleObject.selector,
					handleObject.handler,
				);
				return this;
			}

			if (typeof types === 'object') {
				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}

				return this;
			}

			if (selector === false || typeof selector === 'function') {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}

			if (fn === false) {
				fn = returnFalse;
			}

			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		},
	});

	const

		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^/\0> \t\r\n\f]*)[^>]*)\/>/gi;

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	const rnoInnerhtml = /<script|<style|<link/i;

	// Checked="checked" or checked
	const rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i;
	const rscriptTypeMasked = /^true\/(.*)/;
	const rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:]]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(element, content) {
		if (nodeName(element, 'table')
      && nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')) {
			return jQuery('>tbody', element)[0] || element;
		}

		return element;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(element) {
		element.type = (element.getAttribute('type') !== null) + '/' + element.type;
		return element;
	}

	function restoreScript(element) {
		const match = rscriptTypeMasked.exec(element.type);

		if (match) {
			element.type = match[1];
		} else {
			element.removeAttribute('type');
		}

		return element;
	}

	function cloneCopyEvent(src, dest) {
		let i; let l; let type; let pdataOld; let pdataCur; let udataOld; let udataCur; let events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		const nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === 'input' && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === 'input' || nodeName === 'textarea') {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {
		// Flatten any nested arrays
		args = concat.apply([], args);

		let fragment; let first; let scripts; let hasScripts; let node; let doc;
		let i = 0;
		const l = collection.length;
		const iNoClone = l - 1;
		const value = args[0];
		const isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction
      || (l > 1 && typeof value === 'string'
        && !support.checkClone && rchecked.test(value))) {
			return collection.each(function (index) {
				const self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}

				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, 'script'));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || '')
              && !dataPriv.access(node, 'globalEval')
              && jQuery.contains(doc, node)) {
							if (node.src) {
								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ''), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove(element, selector, keepData) {
		let node;
		const nodes = selector ? jQuery.filter(selector, element) : element;
		let i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, 'script'));
				}

				node.remove();
			}
		}

		return element;
	}

	jQuery.extend({
		htmlPrefilter(html) {
			return html.replace(rxhtmlTag, '<$1></$2>');
		},

		clone(element, dataAndEvents, deepDataAndEvents) {
			let i; let l; let srcElements; let destElements;
			const clone = element.cloneNode(true);
			const inPage = jQuery.contains(element.ownerDocument, element);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (element.nodeType === 1 || element.nodeType === 11)
        && !jQuery.isXMLDoc(element)) {
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(element);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(element);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(element, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, 'script');
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(element, 'script'));
			}

			// Return the cloned set
			return clone;
		},

		cleanData(elems) {
			let data; let element; let type;
			const special = jQuery.event.special;
			let i = 0;

			for (; (element = elems[i]) !== undefined; i++) {
				if (acceptData(element)) {
					if ((data = element[dataPriv.expando])) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(element, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(element, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						element[dataPriv.expando] = undefined;
					}

					if (element[dataUser.expando]) {
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						element[dataUser.expando] = undefined;
					}
				}
			}
		},
	});

	jQuery.fn.extend({
		detach(selector) {
			return remove(this, selector, true);
		},

		remove(selector) {
			return remove(this, selector);
		},

		text(value) {
			return access(this, function (value) {
				return value === undefined
					? jQuery.text(this)
					: this.empty().each(function () {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length);
		},

		append() {
			return domManip(this, arguments, function (element) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					const target = manipulationTarget(this, element);
					target.append(element);
				}
			});
		},

		prepend() {
			return domManip(this, arguments, function (element) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					const target = manipulationTarget(this, element);
					target.insertBefore(element, target.firstChild);
				}
			});
		},

		before() {
			return domManip(this, arguments, function (element) {
				if (this.parentNode) {
					this.parentNode.insertBefore(element, this);
				}
			});
		},

		after() {
			return domManip(this, arguments, function (element) {
				if (this.parentNode) {
					this.parentNode.insertBefore(element, this.nextSibling);
				}
			});
		},

		empty() {
			let element;
			let i = 0;

			for (; (element = this[i]) != null; i++) {
				if (element.nodeType === 1) {
					// Prevent memory leaks
					jQuery.cleanData(getAll(element, false));

					// Remove any remaining nodes
					element.textContent = '';
				}
			}

			return this;
		},

		clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html(value) {
			return access(this, function (value) {
				let element = this[0] || {};
				let i = 0;
				const l = this.length;

				if (value === undefined && element.nodeType === 1) {
					return element.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === 'string' && !rnoInnerhtml.test(value)
          && !wrapMap[(rtagName.exec(value) || ['', ''])[1].toLowerCase()]) {
					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							element = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (element.nodeType === 1) {
								jQuery.cleanData(getAll(element, false));
								element.innerHTML = value;
							}
						}

						element = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch {}
				}

				if (element) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith() {
			const ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (element) {
				const parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(element, this);
					}
				}

				// Force callback invocation
			}, ignored);
		},
	});

	jQuery.each({
		appendTo: 'append',
		prependTo: 'prepend',
		insertBefore: 'before',
		insertAfter: 'after',
		replaceAll: 'replaceWith',
	}, (name, original) => {
		jQuery.fn[name] = function (selector) {
			let elems;
			const returnValue = [];
			const insert = jQuery(selector);
			const last = insert.length - 1;
			let i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(returnValue, elems.get());
			}

			return this.pushStack(returnValue);
		};
	});
	const rmargin = (/^margin/);

	const rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i');

	const getStyles = function (element) {
		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		let view = element.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(element);
	};

	(function () {
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText
        = 'box-sizing:border-box;'
        + 'position:relative;display:block;'
        + 'margin:auto;border:1px;padding:1px;'
        + 'top:1%;width:50%';
			div.innerHTML = '';
			documentElement.append(container);

			const divStyle = window.getComputedStyle(div);
			pixelPositionValue = divStyle.top !== '1%';

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftValue = divStyle.marginLeft === '2px';
			boxSizingReliableValue = divStyle.width === '4px';

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = '50%';
			pixelMarginRightValue = divStyle.marginRight === '4px';

			container.remove();

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		let pixelPositionValue; let boxSizingReliableValue; let pixelMarginRightValue; let reliableMarginLeftValue;
		var container = document.createElement('div');
		var div = document.createElement('div');

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = 'content-box';
		div.cloneNode(true).style.backgroundClip = '';
		support.clearCloneStyle = div.style.backgroundClip === 'content-box';

		container.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;'
      + 'padding:0;margin-top:1px;position:absolute';
		container.append(div);

		jQuery.extend(support, {
			pixelPosition() {
				computeStyleTests();
				return pixelPositionValue;
			},
			boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableValue;
			},
			pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightValue;
			},
			reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftValue;
			},
		});
	})();

	function curCSS(element, name, computed) {
		let width; let minWidth; let maxWidth; let returnValue;

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		const style = element.style;

		computed = computed || getStyles(element);

		// GetPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			returnValue = computed.getPropertyValue(name) || computed[name];

			if (returnValue === '' && !jQuery.contains(element.ownerDocument, element)) {
				returnValue = jQuery.style(element, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(returnValue) && rmargin.test(name)) {
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = returnValue;
				returnValue = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return returnValue !== undefined

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
			? String(returnValue)
			: returnValue;
	}

	function addGetHookIf(conditionFn, hookFn) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get() {
				if (conditionFn()) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return Reflect.apply(this.get = hookFn, this, arguments);
			},
		};
	}

	const

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/;
	const rcustomProp = /^--/;
	const cssShow = {position: 'absolute', visibility: 'hidden', display: 'block'};
	const cssNormalTransform = {
		letterSpacing: '0',
		fontWeight: '400',
	};

	const cssPrefixes = ['Webkit', 'Moz', 'ms'];
	const emptyStyle = document.createElement('div').style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {
		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		const capName = name[0].toUpperCase() + name.slice(1);
		let i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		let returnValue = jQuery.cssProps[name];
		if (!returnValue) {
			returnValue = jQuery.cssProps[name] = vendorPropName(name) || name;
		}

		return returnValue;
	}

	function setPositiveNumber(element, value, subtract) {
		// Any relative (+/-) values have already been
		// normalized at this point
		const matches = rcssNumber.exec(value);
		return matches

		// Guard against undefined "subtract", e.g., when used as in cssHooks
			? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || 'px')
			: value;
	}

	function augmentWidthOrHeight(element, name, extra, isBorderBox, styles) {
		let i;
		let value = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? 'border' : 'content')) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === 'width' ? 1 : 0;
		}

		for (; i < 4; i += 2) {
			// Both box models exclude margin, so add it if we want it
			if (extra === 'margin') {
				value += jQuery.css(element, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {
				// Border-box includes padding, so remove it if we want content
				if (extra === 'content') {
					value -= jQuery.css(element, 'padding' + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== 'margin') {
					value -= jQuery.css(element, 'border' + cssExpand[i] + 'Width', true, styles);
				}
			} else {
				// At this point, extra isn't content, so add padding
				value += jQuery.css(element, 'padding' + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== 'padding') {
					value += jQuery.css(element, 'border' + cssExpand[i] + 'Width', true, styles);
				}
			}
		}

		return value;
	}

	function getWidthOrHeight(element, name, extra) {
		// Start with computed style
		let valueIsBorderBox;
		const styles = getStyles(element);
		let value = curCSS(element, name, styles);
		const isBorderBox = jQuery.css(element, 'boxSizing', false, styles) === 'border-box';

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(value)) {
			return value;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox
      && (support.boxSizingReliable() || value === element.style[name]);

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if (value === 'auto') {
			value = element['offset' + name[0].toUpperCase() + name.slice(1)];
		}

		// Normalize "", auto, and prepare for extra
		value = Number.parseFloat(value) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return (value
      + augmentWidthOrHeight(
      	element,
      	name,
      	extra || (isBorderBox ? 'border' : 'content'),
      	valueIsBorderBox,
      	styles,
      )
		) + 'px';
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get(element, computed) {
					if (computed) {
						// We should always get a number back from opacity
						const returnValue = curCSS(element, 'opacity');
						return returnValue === '' ? '1' : returnValue;
					}
				},
			},
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			animationIterationCount: true,
			columnCount: true,
			fillOpacity: true,
			flexGrow: true,
			flexShrink: true,
			fontWeight: true,
			lineHeight: true,
			opacity: true,
			order: true,
			orphans: true,
			widows: true,
			zIndex: true,
			zoom: true,
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			float: 'cssFloat',
		},

		// Get and set the style property on a DOM Node
		style(element, name, value, extra) {
			// Don't set styles on text and comment nodes
			if (!element || element.nodeType === 3 || element.nodeType === 8 || !element.style) {
				return;
			}

			// Make sure that we're working with the right name
			let returnValue; let type; let hooks;
			const origName = jQuery.camelCase(name);
			const isCustomProp = rcustomProp.test(name);
			const style = element.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === 'string' && (returnValue = rcssNumber.exec(value)) && returnValue[1]) {
					value = adjustCSS(element, name, returnValue);

					// Fixes bug #9237
					type = 'number';
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === 'number') {
					value += returnValue && returnValue[3] || (jQuery.cssNumber[origName] ? '' : 'px');
				}

				// Background-* props affect original clone's values
				if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
					style[name] = 'inherit';
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !('set' in hooks)
          || (value = hooks.set(element, value, extra)) !== undefined) {
					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {
				// If a hook was provided get the non-computed value from there
				if (hooks && 'get' in hooks
          && (returnValue = hooks.get(element, false, extra)) !== undefined) {
					return returnValue;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css(element, name, extra, styles) {
			let value; let number_; let hooks;
			const origName = jQuery.camelCase(name);
			const isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && 'get' in hooks) {
				value = hooks.get(element, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (value === undefined) {
				value = curCSS(element, name, styles);
			}

			// Convert "normal" to computed value
			if (value === 'normal' && name in cssNormalTransform) {
				value = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === '' || extra) {
				number_ = Number.parseFloat(value);
				return extra === true || isFinite(number_) ? number_ || 0 : value;
			}

			return value;
		},
	});

	jQuery.each(['height', 'width'], (i, name) => {
		jQuery.cssHooks[name] = {
			get(element, computed, extra) {
				if (computed) {
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(element, 'display'))

          // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          && (element.getClientRects().length === 0 || !element.getBoundingClientRect().width)
						? swap(element, cssShow, () => getWidthOrHeight(element, name, extra))
						: getWidthOrHeight(element, name, extra);
				}
			},

			set(element, value, extra) {
				let matches;
				const styles = extra && getStyles(element);
				const subtract = extra && augmentWidthOrHeight(
					element,
					name,
					extra,
					jQuery.css(element, 'boxSizing', false, styles) === 'border-box',
					styles,
				);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNumber.exec(value))
          && (matches[3] || 'px') !== 'px') {
					element.style[name] = value;
					value = jQuery.css(element, name);
				}

				return setPositiveNumber(element, value, subtract);
			},
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
		(element, computed) => {
			if (computed) {
				return (Number.parseFloat(curCSS(element, 'marginLeft'))
          || element.getBoundingClientRect().left
          - swap(element, {marginLeft: 0}, () => element.getBoundingClientRect().left)
				) + 'px';
			}
		},
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: '',
		padding: '',
		border: 'Width',
	}, (prefix, suffix) => {
		jQuery.cssHooks[prefix + suffix] = {
			expand(value) {
				let i = 0;
				const expanded = {};

				// Assumes a single number if not a string
				const parts = typeof value === 'string' ? value.split(' ') : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix]
            = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			},
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css(name, value) {
			return access(this, (element, name, value) => {
				let styles; let length;
				const map = {};
				let i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(element);
					length = name.length;

					for (; i < length; i++) {
						map[name[i]] = jQuery.css(element, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined
					? jQuery.style(element, name, value)
					: jQuery.css(element, name);
			}, name, value, arguments.length > 1);
		},
	});

	function Tween(element, options, prop, end, easing) {
		return new Tween.prototype.init(element, options, prop, end, easing);
	}

	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init(element, options, prop, end, easing, unit) {
			this.elem = element;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
		},
		cur() {
			const hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get
				? hooks.get(this)
				: Tween.propHooks._default.get(this);
		},
		run(percent) {
			let eased;
			const hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](
					percent, this.options.duration * percent, 0, 1, this.options.duration,
				);
			} else {
				this.pos = eased = percent;
			}

			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}

			return this;
		},
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get(tween) {
				let result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1
          || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, '');

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === 'auto' ? 0 : result;
			},
			set(tween) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1
          && (tween.elem.style[jQuery.cssProps[tween.prop]] != null
            || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			},
		},
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		},
	};

	jQuery.easing = {
		linear(p) {
			return p;
		},
		swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: 'swing',
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	let
		fxNow; let inProgress;
	const rfxtypes = /^(?:toggle|show|hide)$/;
	const rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(() => {
			fxNow = undefined;
		});
		return (fxNow = jQuery.now());
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		let which;
		let i = 0;
		const attrs = {height: type};

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs['margin' + which] = attrs['padding' + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		let tween;
		const collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners['*']);
		let index = 0;
		const length = collection.length;
		for (; index < length; index++) {
			if ((tween = collection[index].call(animation, prop, value))) {
				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(element, props, options) {
		let prop; let value; let toggle; let hooks; let oldfire; let propTween; let restoreDisplay; let display;
		const isBox = 'width' in props || 'height' in props;
		const anim = this;
		const orig = {};
		const style = element.style;
		let hidden = element.nodeType && isHiddenWithinTree(element);
		let dataShow = dataPriv.get(element, 'fxshow');

		// Queue-skipping animations hijack the fx hooks
		if (!options.queue) {
			hooks = jQuery._queueHooks(element, 'fx');
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}

			hooks.unqueued++;

			anim.always(() => {
				// Ensure the complete handler is called before this completes
				anim.always(() => {
					hooks.unqueued--;
					if (jQuery.queue(element, 'fx').length === 0) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === 'toggle';
				if (value === (hidden ? 'hide' : 'show')) {
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}

				orig[prop] = dataShow && dataShow[prop] || jQuery.style(element, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && element.nodeType === 1) {
			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			options.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(element, 'display');
			}

			display = jQuery.css(element, 'display');
			if (display === 'none') {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {
					// Get nonempty value(s) by temporarily forcing visibility
					showHide([element], true);
					restoreDisplay = element.style.display || restoreDisplay;
					display = jQuery.css(element, 'display');
					showHide([element]);
				}
			}

			// Animate inline elements as inline-block
			if ((display === 'inline' || display === 'inline-block' && restoreDisplay != null) && jQuery.css(element, 'float') === 'none') {
				// Restore the original display value at the end of pure show/hide animations
				if (!propTween) {
					anim.done(() => {
						style.display = restoreDisplay;
					});
					if (restoreDisplay == null) {
						display = style.display;
						restoreDisplay = display === 'none' ? '' : display;
					}
				}

				style.display = 'inline-block';
			}
		}

		if (options.overflow) {
			style.overflow = 'hidden';
			anim.always(() => {
				style.overflow = options.overflow[0];
				style.overflowX = options.overflow[1];
				style.overflowY = options.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {
			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ('hidden' in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(element, 'fxshow', {display: restoreDisplay});
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([element], true);
				}

				anim.done(() => {
					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([element]);
					}

					dataPriv.remove(element, 'fxshow');
					for (prop in orig) {
						jQuery.style(element, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		let index; let name; let easing; let value; let hooks;

		// CamelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && 'expand' in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(element, properties, options) {
		let result;
		let stopped;
		let index = 0;
		const length = Animation.prefilters.length;
		const deferred = jQuery.Deferred().always(() => {
			// Don't match elem in the :animated selector
			delete tick.elem;
		});
		var tick = function () {
			if (stopped) {
				return false;
			}

			const currentTime = fxNow || createFxNow();
			const remaining = Math.max(0, animation.startTime + animation.duration - currentTime);

			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			const temporary = remaining / animation.duration || 0;
			const percent = 1 - temporary;
			let index = 0;
			const length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(element, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(element, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(element, [animation]);
			return false;
		};

		var animation = deferred.promise({
			elem: element,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default,
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween(prop, end) {
				const tween = jQuery.Tween(element, animation.opts, prop, end,
					animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop(gotoEnd) {
				let index = 0;

				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				const length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}

				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(element, [animation, 1, 0]);
					deferred.resolveWith(element, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(element, [animation, gotoEnd]);
				}

				return this;
			},
		});
		const props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, element, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop
            = jQuery.proxy(result.stop, result);
				}

				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(element, animation);
		}

		// Attach callbacks from options
		animation
			.progress(animation.opts.progress)
			.done(animation.opts.done, animation.opts.complete)
			.fail(animation.opts.fail)
			.always(animation.opts.always);

		jQuery.fx.timer(
			jQuery.extend(tick, {
				elem: element,
				anim: animation,
				queue: animation.opts.queue,
			}),
		);

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			'*': [function (prop, value) {
				const tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNumber.exec(value), tween);
				return tween;
			}],
		},

		tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ['*'];
			} else {
				props = props.match(rnothtmlwhite);
			}

			let prop;
			let index = 0;
			const length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		},
	});

	jQuery.speed = function (speed, easing, fn) {
		const opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing
      || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing,
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else if (typeof opt.duration !== 'number') {
			opt.duration = opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = 'fx';
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo(speed, to, easing, callback) {
			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css('opacity', 0).show()

			// Animate to the value specified
				.end().animate({opacity: to}, speed, easing, callback);
		},
		animate(prop, speed, easing, callback) {
			const empty = jQuery.isEmptyObject(prop);
			const optall = jQuery.speed(speed, easing, callback);
			const doAnimation = function () {
				// Operate on a copy of prop so per-property easing won't be lost
				const anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, 'finish')) {
					anim.stop(true);
				}
			};

			doAnimation.finish = doAnimation;

			return empty || optall.queue === false
				? this.each(doAnimation)
				: this.queue(optall.queue, doAnimation);
		},
		stop(type, clearQueue, gotoEnd) {
			const stopQueue = function (hooks) {
				const stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== 'string') {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}

			if (clearQueue && type !== false) {
				this.queue(type || 'fx', []);
			}

			return this.each(function () {
				let dequeue = true;
				let index = type != null && type + 'queueHooks';
				const timers = jQuery.timers;
				const data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this
            && (type == null || timers[index].queue === type)) {
						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish(type) {
			if (type !== false) {
				type = type || 'fx';
			}

			return this.each(function () {
				let index;
				const data = dataPriv.get(this);
				const queue = data[type + 'queue'];
				const hooks = data[type + 'queueHooks'];
				const timers = jQuery.timers;
				const length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		},
	});

	jQuery.each(['toggle', 'show', 'hide'], (i, name) => {
		const cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === 'boolean'
				? Reflect.apply(cssFn, this, arguments)
				: this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx('show'),
		slideUp: genFx('hide'),
		slideToggle: genFx('toggle'),
		fadeIn: {opacity: 'show'},
		fadeOut: {opacity: 'hide'},
		fadeToggle: {opacity: 'toggle'},
	}, (name, props) => {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		let timer;
		let i = 0;
		const timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (timers.length === 0) {
			jQuery.fx.stop();
		}

		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400,
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || 'fx';

		return this.queue(type, (next, hooks) => {
			const timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		let input = document.createElement('input');
		const select = document.createElement('select');
		const opt = select.appendChild(document.createElement('option'));

		input.type = 'checkbox';

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== '';

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement('input');
		input.value = 't';
		input.type = 'radio';
		support.radioValue = input.value === 't';
	})();

	let boolHook;
	const attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		},
	});

	jQuery.extend({
		attr(element, name, value) {
			let returnValue; let hooks;
			const nType = element.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof element.getAttribute === 'undefined') {
				return jQuery.prop(element, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(element)) {
				hooks = jQuery.attrHooks[name.toLowerCase()]
          || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(element, name);
					return;
				}

				if (hooks && 'set' in hooks
          && (returnValue = hooks.set(element, value, name)) !== undefined) {
					return returnValue;
				}

				element.setAttribute(name, String(value));
				return value;
			}

			if (hooks && 'get' in hooks && (returnValue = hooks.get(element, name)) !== null) {
				return returnValue;
			}

			returnValue = jQuery.find.attr(element, name);

			// Non-existent attributes return null, we normalize to undefined
			return returnValue == null ? undefined : returnValue;
		},

		attrHooks: {
			type: {
				set(element, value) {
					if (!support.radioValue && value === 'radio'
            && nodeName(element, 'input')) {
						const value_ = element.value;
						element.setAttribute('type', value);
						if (value_) {
							element.value = value_;
						}

						return value;
					}
				},
			},
		},

		removeAttr(element, value) {
			let name;
			let i = 0;

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			const attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && element.nodeType === 1) {
				while ((name = attrNames[i++])) {
					element.removeAttribute(name);
				}
			}
		},
	});

	// Hooks for boolean attributes
	boolHook = {
		set(element, value, name) {
			if (value === false) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr(element, name);
			} else {
				element.setAttribute(name, name);
			}

			return name;
		},
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), (i, name) => {
		const getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (element, name, isXML) {
			let returnValue; let handle;
			const lowercaseName = name.toLowerCase();

			if (!isXML) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = returnValue;
				returnValue = getter(element, name, isXML) != null
					? lowercaseName
					: null;
				attrHandle[lowercaseName] = handle;
			}

			return returnValue;
		};
	});

	const rfocusable = /^(?:input|select|textarea|button)$/i;
	const rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		},
	});

	jQuery.extend({
		prop(element, name, value) {
			let returnValue; let hooks;
			const nType = element.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(element)) {
				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && 'set' in hooks
          && (returnValue = hooks.set(element, value, name)) !== undefined) {
					return returnValue;
				}

				return (element[name] = value);
			}

			if (hooks && 'get' in hooks && (returnValue = hooks.get(element, name)) !== null) {
				return returnValue;
			}

			return element[name];
		},

		propHooks: {
			tabIndex: {
				get(element) {
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					const tabindex = jQuery.find.attr(element, 'tabindex');

					if (tabindex) {
						return Number.parseInt(tabindex, 10);
					}

					if (
						rfocusable.test(element.nodeName)
            || rclickable.test(element.nodeName)
            && element.href
					) {
						return 0;
					}

					return -1;
				},
			},
		},

		propFix: {
			for: 'htmlFor',
			class: 'className',
		},
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get(element) {
				/* eslint no-unused-expressions: "off" */

				const parent = element.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}

				return null;
			},
			set(element) {
				/* eslint no-unused-expressions: "off" */

				const parent = element.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			},
		};
	}

	jQuery.each([
		'tabIndex',
		'readOnly',
		'maxLength',
		'cellSpacing',
		'cellPadding',
		'rowSpan',
		'colSpan',
		'useMap',
		'frameBorder',
		'contentEditable',
	], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		const tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(' ');
	}

	function getClass(element) {
		return element.getAttribute && element.getAttribute('class') || '';
	}

	jQuery.fn.extend({
		addClass(value) {
			let classes; let element; let cur; let curValue; let clazz; let j; let finalValue;
			let i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === 'string' && value) {
				classes = value.match(rnothtmlwhite) || [];

				while ((element = this[i++])) {
					curValue = getClass(element);
					cur = element.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ');

					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (!cur.includes(' ' + clazz + ' ')) {
								cur += clazz + ' ';
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							element.setAttribute('class', finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass(value) {
			let classes; let element; let cur; let curValue; let clazz; let j; let finalValue;
			let i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (arguments.length === 0) {
				return this.attr('class', '');
			}

			if (typeof value === 'string' && value) {
				classes = value.match(rnothtmlwhite) || [];

				while ((element = this[i++])) {
					curValue = getClass(element);

					// This expression is here for better compressibility (see addClass)
					cur = element.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ');

					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							// Remove *all* instances
							while (cur.includes(' ' + clazz + ' ')) {
								cur = cur.replace(' ' + clazz + ' ', ' ');
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							element.setAttribute('class', finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass(value, stateValue) {
			const type = typeof value;

			if (typeof stateValue === 'boolean' && type === 'string') {
				return stateValue ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(
						value.call(this, i, getClass(this), stateValue),
						stateValue,
					);
				});
			}

			return this.each(function () {
				let className; let i; let self; let classNames;

				if (type === 'string') {
					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while ((className = classNames[i++])) {
						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === 'boolean') {
					className = getClass(this);
					if (className) {
						// Store className if set
						dataPriv.set(this, '__className__', className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute('class',
							className || value === false
								? ''
								: dataPriv.get(this, '__className__') || '',
						);
					}
				}
			});
		},

		hasClass(selector) {
			let className; let element;
			let i = 0;

			className = ' ' + selector + ' ';
			while ((element = this[i++])) {
				if (element.nodeType === 1
          && (' ' + stripAndCollapse(getClass(element)) + ' ').includes(className)) {
					return true;
				}
			}

			return false;
		},
	});

	const rreturn = /\r/g;

	jQuery.fn.extend({
		val(value) {
			let hooks; let returnValue; let isFunction;
			const element = this[0];

			if (arguments.length === 0) {
				if (element) {
					hooks = jQuery.valHooks[element.type]
            || jQuery.valHooks[element.nodeName.toLowerCase()];

					if (hooks
            && 'get' in hooks
            && (returnValue = hooks.get(element, 'value')) !== undefined
					) {
						return returnValue;
					}

					returnValue = element.value;

					// Handle most common string cases
					if (typeof returnValue === 'string') {
						return returnValue.replace(rreturn, '');
					}

					// Handle cases where value is null/undef or number
					return returnValue == null ? '' : returnValue;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				let value_;

				if (this.nodeType !== 1) {
					return;
				}

				value_ = isFunction ? value.call(this, i, jQuery(this).val()) : value;

				// Treat null/undefined as ""; convert numbers to string
				if (value_ == null) {
					value_ = '';
				} else if (typeof value_ === 'number') {
					value_ = String(value_);
				} else if (Array.isArray(value_)) {
					value_ = jQuery.map(value_, value => value == null ? '' : String(value));
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !('set' in hooks) || hooks.set(this, value_, 'value') === undefined) {
					this.value = value_;
				}
			});
		},
	});

	jQuery.extend({
		valHooks: {
			option: {
				get(element) {
					const value = jQuery.find.attr(element, 'value');
					return value != null
						? value

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						: stripAndCollapse(jQuery.text(element));
				},
			},
			select: {
				get(element) {
					let value; let option; let i;
					const options = element.options;
					const index = element.selectedIndex;
					const one = element.type === 'select-one';
					const values = one ? null : [];
					const max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index)

              // Don't return options that are disabled or in a disabled optgroup
              && !option.disabled
              && (!option.parentNode.disabled
                || !nodeName(option.parentNode, 'optgroup'))) {
							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set(element, value) {
					let optionSet; let option;
					const options = element.options;
					const values = jQuery.makeArray(value);
					let i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected
                = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						element.selectedIndex = -1;
					}

					return values;
				},
			},
		},
	});

	// Radios and checkboxes getter/setter
	jQuery.each(['radio', 'checkbox'], function () {
		jQuery.valHooks[this] = {
			set(element, value) {
				if (Array.isArray(value)) {
					return (element.checked = jQuery.inArray(jQuery(element).val(), value) > -1);
				}
			},
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (element) {
				return element.getAttribute('value') === null ? 'on' : element.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion

	const rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger(event, data, element, onlyHandlers) {
			let i; let cur; let temporary; let bubbleType; let ontype; let handle; let special;
			const eventPath = [element || document];
			let type = hasOwn.call(event, 'type') ? event.type : event;
			let namespaces = hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];

			cur = temporary = element = element || document;

			// Don't do events on text and comment nodes
			if (element.nodeType === 3 || element.nodeType === 8) {
				return;
			}

			// Focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.includes('.')) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split('.');
				type = namespaces.shift();
				namespaces.sort();
			}

			ontype = !type.includes(':') && 'on' + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando]
				? event
				: new jQuery.Event(type, typeof event === 'object' && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join('.');
			event.rnamespace = event.namespace
				? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)')
				: null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = element;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null
				? [event]
				: jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(element, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(element)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}

				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					temporary = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (temporary === (element.ownerDocument || document)) {
					eventPath.push(temporary.defaultView || temporary.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				event.type = i > 1
					? bubbleType
					: special.bindType || type;

				// JQuery handler
				handle = (dataPriv.get(cur, 'events') || {})[event.type]
          && dataPriv.get(cur, 'handle');
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}

			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented() && (!special._default
            || special._default.apply(eventPath.pop(), data) === false)
          && acceptData(element) // Call a native DOM method on the target with the same name as the event.
			// Don't do default actions on window, that's where global variables be (#6170)
           && ontype && jQuery.isFunction(element[type]) && !jQuery.isWindow(element)) {
				// Don't re-trigger an onFOO event when we call its FOO() method
				temporary = element[ontype];

				if (temporary) {
					element[ontype] = null;
				}

				// Prevent re-triggering of the same event, since we already bubbled it above
				jQuery.event.triggered = type;
				element[type]();
				jQuery.event.triggered = undefined;

				if (temporary) {
					element[ontype] = temporary;
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate(type, element, event) {
			const e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type,
					isSimulated: true,
				},
			);

			jQuery.event.trigger(e, null, element);
		},

	});

	jQuery.fn.extend({

		trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler(type, data) {
			const element = this[0];
			if (element) {
				return jQuery.event.trigger(type, data, element, true);
			}
		},
	});

	jQuery.each(('blur focus focusin focusout resize scroll click dblclick '
    + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '
    + 'change select submit keydown keypress keyup contextmenu').split(' '),
	(i, name) => {
		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0
				? this.on(name, null, data, fn)
				: this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		},
	});

	support.focusin = 'onfocusin' in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({focus: 'focusin', blur: 'focusout'}, (orig, fix) => {
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			const handler = function (event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup() {
					const doc = this.ownerDocument || this;
					const attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}

					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown() {
					const doc = this.ownerDocument || this;
					const attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				},
			};
		});
	}

	const location = window.location;

	let nonce = jQuery.now();

	const rquery = (/\?/);

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		let xml;
		if (!data || typeof data !== 'string') {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = (new window.DOMParser()).parseFromString(data, 'text/xml');
		} catch {
			xml = undefined;
		}

		if (!xml || xml.querySelectorAll('parsererror').length > 0) {
			jQuery.error('Invalid XML: ' + data);
		}

		return xml;
	};

	const
		rbracket = /\[]$/;
	const rCRLF = /\r?\n/g;
	const rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;
	const rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParameters(prefix, object, traditional, add) {
		let name;

		if (Array.isArray(object)) {
			// Serialize array item.
			jQuery.each(object, (i, v) => {
				if (traditional || rbracket.test(prefix)) {
					// Treat each array item as a scalar.
					add(prefix, v);
				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParameters(
						prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']',
						v,
						traditional,
						add,
					);
				}
			});
		} else if (!traditional && jQuery.type(object) === 'object') {
			// Serialize object item.
			for (name in object) {
				buildParameters(prefix + '[' + name + ']', object[name], traditional, add);
			}
		} else {
			// Serialize scalar item.
			add(prefix, object);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		let prefix;
		const s = [];
		const add = function (key, valueOrFunction) {
			// If value is a function, invoke it and use its return value
			const value = jQuery.isFunction(valueOrFunction)
				? valueOrFunction()
				: valueOrFunction;

			s[s.length] = encodeURIComponent(key) + '='
          + encodeURIComponent(value == null ? '' : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParameters(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join('&');
	};

	jQuery.fn.extend({
		serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray() {
			return this.map(function () {
				// Can add propHook for "elements" to filter or add form elements
				const elements = jQuery.prop(this, 'elements');
				return elements ? jQuery.makeArray(elements) : this;
			})
				.filter(function () {
					const type = this.type;

					// Use .is( ":disabled" ) so that fieldset[disabled] works
					return this.name && !jQuery(this).is(':disabled')
            && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type)
            && (this.checked || !rcheckableType.test(type));
				})
				.map(function (i, element) {
					const value = jQuery(this).val();

					if (value == null) {
						return null;
					}

					if (Array.isArray(value)) {
						return jQuery.map(value, value_ => ({name: element.name, value: value_.replace(rCRLF, '\r\n')}));
					}

					return {name: element.name, value: value.replace(rCRLF, '\r\n')};
				}).get();
		},
	});

	const
		r20 = /%20/g;
	const rhash = /#.*$/;
	const rantiCache = /([?&])_=[^&]*/;
	const rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm;

	// #7653, #8125, #8152: local protocol detection
	const rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
	const rnoContent = /^(?:GET|HEAD)$/;
	const rprotocol = /^\/\//;

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	const prefilters = {};

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	const transports = {};

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	const allTypes = '*/'.concat('*');

	// Anchor tag for parsing the document origin
	const originAnchor = document.createElement('a');
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {
		// DataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {
			if (typeof dataTypeExpression !== 'string') {
				func = dataTypeExpression;
				dataTypeExpression = '*';
			}

			let dataType;
			let i = 0;
			const dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {
				// For each dataType in the dataTypeExpression
				while ((dataType = dataTypes[i++])) {
					// Prepend if requested
					if (dataType[0] === '+') {
						dataType = dataType.slice(1) || '*';
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
		const inspected = {};
		const seekingTransport = (structure === transports);

		function inspect(dataType) {
			let selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], (_, prefilterOrFactory) => {
				const dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === 'string'
          && !seekingTransport && !inspected[dataTypeOrTransport]) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				}

				if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		let key; let deep;
		const flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
			}
		}

		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
	function ajaxHandleResponses(s, jqXHR, responses) {
		let ct; let type; let finalDataType; let firstDataType;
		const contents = s.contents;
		const dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === '*') {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {
			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
					finalDataType = type;
					break;
				}

				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}

			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		let conv2; let current; let conv; let temporary; let previous;
		const converters = {};

		// Work with a copy of dataTypes in case we need to modify it for conversion
		const dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {
			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!previous && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			previous = current;
			current = dataTypes.shift();

			if (current) {
				// There's only work to do if current dataType is non-auto
				if (current === '*') {
					current = previous;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (previous !== '*' && previous !== current) {
					// Seek a direct converter
					conv = converters[previous + ' ' + current] || converters['* ' + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {
							// If conv2 outputs current
							temporary = conv2.split(' ');
							if (temporary[1] === current) {
								// If prev can be converted to accepted input
								conv = converters[previous + ' ' + temporary[0]]
                  || converters['* ' + temporary[0]];
								if (conv) {
									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = temporary[0];
										dataTypes.unshift(temporary[1]);
									}

									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {
						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (error) {
								return {
									state: 'parsererror',
									error: conv ? error : 'No conversion from ' + previous + ' to ' + current,
								};
							}
						}
					}
				}
			}
		}

		return {state: 'success', data: response};
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: 'GET',
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

			/*
		Timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

			accepts: {
				'*': allTypes,
				text: 'text/plain',
				html: 'text/html',
				xml: 'application/xml, text/xml',
				json: 'application/json, text/javascript',
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/,
			},

			responseFields: {
				xml: 'responseXML',
				text: 'responseText',
				json: 'responseJSON',
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				'* text': String,

				// Text to html (true = no transformation)
				'text html': true,

				// Evaluate text as a json expression
				'text json': JSON.parse,

				// Parse text as xml
				'text xml': jQuery.parseXML,
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true,
			},
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup(target, settings) {
			return settings

			// Building a settings object
				? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)

			// Extending ajaxSettings
				: ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax(url, options) {
			// If url is an object, simulate pre-1.5 signature
			if (typeof url === 'object') {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			let transport;

			// URL without anti-cache param
			let cacheURL;

			// Response headers
			let responseHeadersString;
			let responseHeaders;

			// Timeout handle
			let timeoutTimer;

			// Url cleanup var
			let urlAnchor;

			// Request state (becomes false upon send and true upon completion)
			let completed;

			// To know if global events are to be dispatched
			let fireGlobals;

			// Loop variable
			let i;

			// Uncached part of the url
			let uncached;

			// Create the final options object
			const s = jQuery.ajaxSetup({}, options);

			// Callbacks context
			const callbackContext = s.context || s;

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			const globalEventContext = s.context
        && (callbackContext.nodeType || callbackContext.jquery)
				? jQuery(callbackContext)
				: jQuery.event;

			// Deferreds
			const deferred = jQuery.Deferred();
			const completeDeferred = jQuery.Callbacks('once memory');

			// Status-dependent callbacks
			let statusCode = s.statusCode || {};

			// Headers (they are sent all at once)
			const requestHeaders = {};
			const requestHeadersNames = {};

			// Default abort message
			let stringAbort = 'canceled';

			// Fake xhr
			var jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader(key) {
					let match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while ((match = rheaders.exec(responseHeadersString))) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}

						match = responseHeaders[key.toLowerCase()];
					}

					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()]
                = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}

					return this;
				},

				// Overrides response content-type header
				overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}

					return this;
				},

				// Status-dependent callbacks
				statusCode(map) {
					let code;
					if (map) {
						if (completed) {
							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {
							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								statusCode[code] = [statusCode[code], map[code]];
							}
						}
					}

					return this;
				},

				// Cancel the request
				abort(statusText) {
					const finalText = statusText || stringAbort;
					if (transport) {
						transport.abort(finalText);
					}

					done(0, finalText);
					return this;
				},
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = (String(url || s.url || location.href))
				.replace(rprotocol, location.protocol + '//');

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || '*').toLowerCase().match(rnothtmlwhite) || [''];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement('a');

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + '//' + originAnchor.host
            !== urlAnchor.protocol + '//' + urlAnchor.host;
				} catch {
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== 'string') {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger('ajaxStart');
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, '');

			// More options handling for requests with no content
			if (!s.hasContent) {
				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? '&' : '?') + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, '$1');
					uncached = (rquery.test(cacheURL) ? '&' : '?') + '_=' + (nonce++) + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData
        && (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0) {
				s.data = s.data.replace(r20, '+');
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
				}

				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader('Content-Type', s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				'Accept',
				s.dataTypes[0] && s.accepts[s.dataTypes[0]]
					? s.accepts[s.dataTypes[0]]
          + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '')
					: s.accepts['*'],
			);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend
        && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			stringAbort = 'abort';

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, 'No Transport');
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger('ajaxSend', [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(() => {
						jqXHR.abort('timeout');
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (error) {
					// Rethrow post-completion exceptions
					if (completed) {
						throw error;
					}

					// Propagate others as results
					done(-1, error);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				let isSuccess; let success; let error; let response; let modified;
				let statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || '';

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader('Last-Modified');
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}

						modified = jqXHR.getResponseHeader('etag');
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// If no content
					if (status === 204 || s.type === 'HEAD') {
						statusText = 'nocontent';

						// If not modified
					} else if (status === 304) {
						statusText = 'notmodified';

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = 'error';
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = String(nativeStatusText || statusText);

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError',
						[jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger('ajaxComplete', [jqXHR, s]);

					// Handle the global AJAX counter
					if (!(--jQuery.active)) {
						jQuery.event.trigger('ajaxStop');
					}
				}
			}

			return jqXHR;
		},

		getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, 'json');
		},

		getScript(url, callback) {
			return jQuery.get(url, undefined, callback, 'script');
		},
	});

	jQuery.each(['get', 'post'], (i, method) => {
		jQuery[method] = function (url, data, callback, type) {
			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url,
				type: method,
				dataType: type,
				data,
				success: callback,
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: 'GET',
			dataType: 'script',
			cache: true,
			async: false,
			global: false,
			throws: true,
		});
	};

	jQuery.fn.extend({
		wrapAll(html) {
			let wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					let element = this;

					while (element.firstElementChild) {
						element = element.firstElementChild;
					}

					return element;
				}).append(this);
			}

			return this;
		},

		wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				const self = jQuery(this);
				const contents = self.contents();

				if (contents.length > 0) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap(html) {
			const isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap(selector) {
			this.parent(selector).not('body').each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		},
	});

	jQuery.expr.pseudos.hidden = function (element) {
		return !jQuery.expr.pseudos.visible(element);
	};

	jQuery.expr.pseudos.visible = function (element) {
		return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length > 0);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch {}
	};

	const xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204,
	};
	let xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = Boolean(xhrSupported) && ('withCredentials' in xhrSupported);
	support.ajax = xhrSupported = Boolean(xhrSupported);

	jQuery.ajaxTransport(options => {
		let callback; let errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send(headers, complete) {
					let i;
					const xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password,
					);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers['X-Requested-With']) {
						headers['X-Requested-With'] = 'XMLHttpRequest';
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function (type) {
						return function () {
							if (callback) {
								callback = errorCallback = xhr.addEventListener('load', xhr.onerror = xhr.addEventListener('abort', xhr.onreadystatechange = null));

								if (type === 'abort') {
									xhr.abort();
								} else if (type === 'error') {
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== 'number') {
										complete(0, 'error');
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText,
										);
									}
								} else {
									complete(
										xhrSuccessStatus[xhr.status] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										(xhr.responseType || 'text') !== 'text'
                    || typeof xhr.responseText !== 'string'
											? {binary: xhr.response}
											: {text: xhr.responseText},
										xhr.getAllResponseHeaders(),
									);
								}
							}
						};
					};

					// Listen to events
					xhr.addEventListener('load', callback());
					errorCallback = xhr.onerror = callback('error');

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.addEventListener('abort', errorCallback);
					} else {
						xhr.addEventListener('readystatechange', () => {
							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(() => {
									if (callback) {
										errorCallback();
									}
								});
							}
						});
					}

					// Create the abort callback
					callback = callback('abort');

					try {
						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (error) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw error;
						}
					}
				},

				abort() {
					if (callback) {
						callback();
					}
				},
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(s => {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: 'text/javascript, application/javascript, '
      + 'application/ecmascript, application/x-ecmascript',
		},
		contents: {
			script: /\b(?:java|ecma)script\b/,
		},
		converters: {
			'text script'(text) {
				jQuery.globalEval(text);
				return text;
			},
		},
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter('script', s => {
		if (s.cache === undefined) {
			s.cache = false;
		}

		if (s.crossDomain) {
			s.type = 'GET';
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport('script', s => {
		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			let script; let callback;
			return {
				send(_, complete) {
					script = jQuery('<script>').prop({
						charset: s.scriptCharset,
						src: s.url,
					}).on(
						'load error',
						callback = function (evt) {
							script.remove();
							callback = null;
							if (evt) {
								complete(evt.type === 'error' ? 404 : 200, evt.type);
							}
						},
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.append(script[0]);
				},
				abort() {
					if (callback) {
						callback();
					}
				},
			};
		}
	});

	const oldCallbacks = [];
	const rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: 'callback',
		jsonpCallback() {
			const callback = oldCallbacks.pop() || (jQuery.expando + '_' + (nonce++));
			this[callback] = true;
			return callback;
		},
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter('json jsonp', (s, originalSettings, jqXHR) => {
		let callbackName; let overwritten; let responseContainer;
		const jsonProp = s.jsonp !== false && (rjsonp.test(s.url)
			? 'url'
			: typeof s.data === 'string'
          && (s.contentType || '')
          	.indexOf('application/x-www-form-urlencoded') === 0
          && rjsonp.test(s.data) && 'data'
		);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === 'jsonp') {
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback)
				? s.jsonpCallback()
				: s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters['script json'] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + ' was not called');
				}

				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = 'json';

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(() => {
				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return 'script';
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = (function () {
		const body = document.implementation.createHTMLDocument('').body;
		body.innerHTML = '<form></form><form></form>';
		return body.childNodes.length === 2;
	})();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== 'string') {
			return [];
		}

		if (typeof context === 'boolean') {
			keepScripts = context;
			context = false;
		}

		let base; let parsed; let scripts;

		if (!context) {
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument('');

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement('base');
				base.href = document.location.href;
				context.head.append(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length > 0) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
   * Load a url into a page
   */
	jQuery.fn.load = function (url, parameters, callback) {
		let selector; let type; let response;
		const self = this;
		const off = url.indexOf(' ');

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(parameters)) {
			// We assume that it's the callback
			callback = parameters;
			parameters = undefined;

			// Otherwise, build a param string
		} else if (parameters && typeof parameters === 'object') {
			type = 'POST';
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || 'GET',
				dataType: 'html',
				data: parameters,
			}).done(function (responseText) {
				// Save response for use in complete callback
				response = arguments;

				self.html(selector

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
					? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector)

				// Otherwise use the full result
					: responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && ((jqXHR, status) => {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			}));
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each([
		'ajaxStart',
		'ajaxStop',
		'ajaxComplete',
		'ajaxError',
		'ajaxSuccess',
		'ajaxSend',
	], (i, type) => {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (element) {
		return jQuery.grep(jQuery.timers, fn => element === fn.elem).length;
	};

	jQuery.offset = {
		setOffset(element, options, i) {
			let curPosition; let curLeft; let curCSSTop; let curTop; let curOffset; let curCSSLeft; let calculatePosition;
			const position = jQuery.css(element, 'position');
			const curElement = jQuery(element);
			const props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === 'static') {
				element.style.position = 'relative';
			}

			curOffset = curElement.offset();
			curCSSTop = jQuery.css(element, 'top');
			curCSSLeft = jQuery.css(element, 'left');
			calculatePosition = (position === 'absolute' || position === 'fixed')
        && (curCSSTop + curCSSLeft).includes('auto');

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElement.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = Number.parseFloat(curCSSTop) || 0;
				curLeft = Number.parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(element, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = (options.top - curOffset.top) + curTop;
			}

			if (options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft;
			}

			if ('using' in options) {
				options.using.call(element, props);
			} else {
				curElement.css(props);
			}
		},
	};

	jQuery.fn.extend({
		offset(options) {
			// Preserve chaining for setter
			if (arguments.length > 0) {
				return options === undefined
					? this
					: this.each(function (i) {
						jQuery.offset.setOffset(this, options, i);
					});
			}

			let doc; let docElement; let rect; let win;
			const element = this[0];

			if (!element) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (element.getClientRects().length === 0) {
				return {top: 0, left: 0};
			}

			rect = element.getBoundingClientRect();

			doc = element.ownerDocument;
			docElement = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElement.clientTop,
				left: rect.left + win.pageXOffset - docElement.clientLeft,
			};
		},

		position() {
			if (!this[0]) {
				return;
			}

			let offsetParent; let offset;
			const element = this[0];
			let parentOffset = {top: 0, left: 0};

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(element, 'position') === 'fixed') {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = element.getBoundingClientRect();
			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!nodeName(offsetParent[0], 'html')) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], 'borderTopWidth', true),
					left: parentOffset.left + jQuery.css(offsetParent[0], 'borderLeftWidth', true),
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(element, 'marginTop', true),
				left: offset.left - parentOffset.left - jQuery.css(element, 'marginLeft', true),
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent() {
			return this.map(function () {
				let offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, 'position') === 'static') {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		},
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset'}, (method, prop) => {
		const top = prop === 'pageYOffset';

		jQuery.fn[method] = function (value) {
			return access(this, (element, method, value_) => {
				// Coalesce documents and windows
				let win;
				if (jQuery.isWindow(element)) {
					win = element;
				} else if (element.nodeType === 9) {
					win = element.defaultView;
				}

				if (value_ === undefined) {
					return win ? win[prop] : element[method];
				}

				if (win) {
					win.scrollTo(
						!top ? value_ : win.pageXOffset,
						top ? value_ : win.pageYOffset,
					);
				} else {
					element[method] = value_;
				}
			}, method, value, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(['top', 'left'], (i, prop) => {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
			(element, computed) => {
				if (computed) {
					computed = curCSS(element, prop);

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test(computed)
						? jQuery(element).position()[prop] + 'px'
						: computed;
				}
			},
		);
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({Height: 'height', Width: 'width'}, (name, type) => {
		jQuery.each({padding: 'inner' + name, content: type, '': 'outer' + name},
			(defaultExtra, funcName) => {
				// Margin is only for outerHeight, outerWidth
				jQuery.fn[funcName] = function (margin, value) {
					const chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean');
					const extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');

					return access(this, (element, type, value) => {
						let doc;

						if (jQuery.isWindow(element)) {
							// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
							return funcName.indexOf('outer') === 0
								? element['inner' + name]
								: element.document.documentElement['client' + name];
						}

						// Get document width or height
						if (element.nodeType === 9) {
							doc = element.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
							// whichever is greatest
							return Math.max(
								element.body['scroll' + name], doc['scroll' + name],
								element.body['offset' + name], doc['offset' + name],
								doc['client' + name],
							);
						}

						return value === undefined

						// Get width or height on the element, requesting but not forcing parseFloat
							? jQuery.css(element, type, extra)

						// Set width or height on the element
							: jQuery.style(element, type, value, extra);
					}, type, chainable ? margin : undefined, chainable);
				};
			});
	});

	jQuery.fn.extend({

		bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate(selector, types, fn) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1
				? this.off(selector, '**')
				: this.off(types, selector || '**', fn);
		},
	});

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};

	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === 'function' && define.amd) {
		define('jquery', [], () => jQuery);
	}

	const

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery;

	// Map over the $ in case of overwrite
	const _$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
