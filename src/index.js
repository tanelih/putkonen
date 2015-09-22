/**
 * @module putkonen
 * @author Taneli Hartikainen <taneli.hartikainen89@gmail.com>
 *
 * @description Utility functions for the working man.
 */

/**
 * @function
 * @description Log the given object using 'JSON.stringify' and return it.
 *
 * @param {object} obj - The object to be logged.
 *
 * @return {object} The same object that was just logged.
 */
export const log = obj => console.log(JSON.stringify(obj, null, 2)) || obj

/**
 * @function
 * @description Shortcut for 'array.forEach'.
 *
 * @param {Array<?>} arr - Array to invoke 'fn' on.
 * @param {Function} fn  - Function to invoke for each element in 'arr'.
 */
export const each = (arr, fn) => arr.forEach(fn)

/**
 * @function
 * @description Shortcut for 'array.find'.
 *
 * @param {Array<?>} arr - The array to search.
 * @param {Function} fn  - The function to define if the result has been found.
 *
 * @return {?} The result, or 'null' if nothing was found.
 */
export const find = (arr, fn) => arr.find(fn)

/**
 * @function
 * @description Shortcut for 'array.filter'.
 *
 * @param {Array<?>} arr - The array to filter.
 * @param {Function} fn  - The predicate function.
 *
 * @return {Array<?>} The filtered array.
 */
export const filter = (arr, fn) => arr.filter(fn)

/**
 * @function
 * @description Shortcut for 'array.map'.
 *
 * @param {Array<?>} arr - Array to map over.
 * @param {Function} fn  - Function to map over 'arr'.
 *
 * @return {Array<?>} Result of the map.
 */
export const map = (arr, fn) => arr.map(fn)

/**
 * @function
 * @description Shortcut for 'array.reduce'.
 *
 * @param {Array<?>} arr          - Array to reduce.
 * @param {Function} fn           - The reducer function.
 * @param {?}        [initial={}] - The initial value for the reducer.
 *
 * @return {?} The completed reduction, usually the same type as the initial
 *             value for the reducer.
 */
export const reduce = (arr, fn, initial = {}) => arr.reduce(fn, initial)

/**
 * @function
 * @description Get the first element in the array.
 *
 * @param {Array<?>} arr - The array to take the first element from.
 *
 * @return {?} The first element in the array.
 */
export const first = arr => arr[0]

/**
 * @function
 * @description Get the elements in the given array, expect the first one.
 *
 * @param {Array<?>} arr - The array to get the elements from.
 *
 * @return {Array<?>} Rest of the elements.
 */
export const rest = arr => arr.slice(1)

/**
 * @function
 * @description Shortcut for 'array.concat'.
 *
 * @param {...Array<?>} arrays - The arrays to concatenate.
 *
 * @return {Array<?>} The concatenated array.
 */
export const concat = (target, ...arrays) => target.concat(...arrays)

/**
 * @function
 * @description Flatten an array recursively.
 *
 * @param {Array<?>} arr - The array to flatten.
 *
 * @return {Array<?>}	The flattened array.
 */
export const flatten = arr =>
	reduce(arr, (flat, element) =>
		concat(flat, isArray(element) ? flatten(element) : element), [ ])

/**
 * @function
 * @description Check if the 'value' is contained in the 'arr'.
 *
 * @param {Array<?>} arr   - Array to search in.
 * @param {?}        value - Value to check for.
 *
 * @return {boolean} True if the 'value' is in 'arr', false if not.
 */
export const contains = (arr, value) => arr.indexOf(value) >= 0

/**
 * @function
 * @description Simple check to make sure the target is an array.
 *
 * @param {?} target - The target to be checked.
 *
 * @return {boolean} True if the target is an array, false if not.
 */
export const isArray = target => Array.isArray(target)

/**
 * @function
 * @description Simple check to make sure the target is an object.
 *
 * @param {?} target - The target to be checked.
 *
 * @return {boolean} True if the target is an object, false if not.
 */
export const isObject = target =>
	!isArray(target) && !!target && typeof target === 'object'

/**
 * @function
 * @description Check if the 'target' object has the given 'props'.
 *
 * @param {object}    target - The 'target' object.
 * @param {...string} props  - We check that these exist in the 'target'.
 *
 * @return {boolean} True if the 'target' object has the 'props'.
 */
export const has = (target, ...props) =>
	reduce(props, (result, prop) =>
		result ? target.hasOwnProperty(prop) : result, true)

/**
 * @function
 * @description Shortcut for 'Object.keys'. Get the 'keys' for the given object.
 *
 * @param {object} target - The 'target' object.
 *
 * @return {Array<string>} The 'keys' of the 'target' object.
 */
export const keys = target => Object.keys(target)

/**
 * @function
 * @description Returns the values corresponding to the object keys.
 *
 * @param {object} target - The 'target' object.
 *
 * @return {Array<?>} Array of the object values.
 */
export const values = target => keys(target).map(key => target[key])

/**
 * @function
 * @description Simple shortcut method for 'Object.assign', which behaves as if
 *              given an empty object as the 'target' to 'Object.assign'.
 *
 * @param {...object} sources - The source objects to be assigned to 'target'.
 *
 * @return {object} The 'target' object.
 */
export const assign = (...sources) => Object.assign({ }, ...sources)

/**
 * @function
 * @description Merge the given objects together. Basically this is a recursive
 *              assign function, preserving objects inside the given objects.
 *
 * @param {...object} sources - Objects to be merged together.
 *
 * @return {object} The merged object.
 */
export const merge = (...objects) =>
	// collapse multiple objects into a single 'target' object
	reduce(objects, (target, source) => assign(target,
		// reduce over the keys so we can run 'assign' to specific keys
		reduce(keys(source), (target, key) =>
			// if the 'key' is an object, we want to merge it recursively,
			// otherwise we can just assign the new value on top
			has(target, key) && isObject(target[key]) && isObject(source[key])
				? assign(target, { [key]: merge(source[key], target[key]) })
				// note that we do an 'assign' for the 'source[key]' to avoid
				// copying by reference
				: assign(target, { [key]: assign(source[key]) }),
			// the initial value for the 'keys' reduce is the 'target'
			target)))

/**
 * @function
 * @description Wrap the given 'key' inside an object, with the value pointing
 *              at the 'target' objects 'key' property.
 *
 * @param {string} key    - The property name to use in wrapping.
 * @param {object} target - The target object, from which to extract the 'key'.
 *
 * @return {object} The wrapped object.
 */
export const wrap = (key, target) => assign({ [key]: target[key] })

/**
 * @function
 * @description Returns the object with the given 'props' removed. Uses 'merge'
 *              behind the scenes.
 *
 * @param {object}    target - The 'target' object.
 * @param {...string} props  - The 'props' to be omitted from the 'target'.
 *
 * @return {object} Object without the 'props'.
 */
export const omit = (target, ...props) =>
	reduce(keys(target), (result, key) =>
		contains(props, key) ? result : merge(result, wrap(key, target)))
