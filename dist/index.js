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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var log = function log(obj) {
  return console.log(JSON.stringify(obj, null, 2)) || obj;
};

exports.log = log;
/**
 * @function
 * @description Shortcut for 'map'.
 *
 * @param {Array<?>} arr - Array to map over.
 * @param {Function} fn  - Function to map over 'arr'.
 *
 * @return {Array<?>} Result of the map.
 */
var map = function map(arr, fn) {
  return arr.map(fn);
};

exports.map = map;
/**
 * @function
 * @description Shortcut for 'forEach'.
 *
 * @param {Array<?>} arr - Array to invoke 'fn' on.
 * @param {Function} fn  - Function to invoke for each element in 'arr'.
 */
var each = function each(arr, fn) {
  return arr.forEach(fn);
};

exports.each = each;
/**
 * @function
 * @description Shortcut for 'reduce'.
 *
 * @param {Array<?>} arr          - Array to reduce.
 * @param {Function} fn           - The reducer function.
 * @param {?}        [initial={}] - The initial value for the reducer.
 *
 * @return {?} The completed reduction, usually the same type as the initial
 *             value for the reducer.
 */
var reduce = function reduce(arr, fn) {
  var initial = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  return arr.reduce(fn, initial);
};

exports.reduce = reduce;
/**
 * @function
 * @description Simple check to make sure the target is an array.
 *
 * @param {?} target - The target to be checked.
 *
 * @return {boolean} True if the target is an array, false if not.
 */
var isArray = function isArray(target) {
  return !!target && Array.isArray(target);
};

exports.isArray = isArray;
/**
 * @function
 * @description Simple check to make sure the target is an object.
 *
 * @param {?} target - The target to be checked.
 *
 * @return {boolean} True if the target is an object, false if not.
 */
var isObject = function isObject(target) {
  return !isArray(target) && typeof target === 'object';
};

exports.isObject = isObject;
/**
 * @function
 * @description Check if the 'target' object has the given 'props'.
 *
 * @param {object}    target - The 'target' object.
 * @param {...string} props  - We check that these exist in the 'target'.
 *
 * @return {boolean} True if the 'target' object has the 'props'.
 */
var has = function has(target) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return reduce(props, function (result, prop) {
    return result ? target.hasOwnProperty(prop) : result;
  }, true);
};

exports.has = has;
/**
 * @function
 * @description Check if the 'value' is contained in the 'arr'.
 *
 * @param {Array<?>} arr   - Array to search in.
 * @param {?}        value - Value to check for.
 *
 * @return {boolean} True if the 'value' is in 'arr', false if not.
 */
var contains = function contains(arr, value) {
  return arr.indexOf(value) >= 0;
};

exports.contains = contains;
/**
 * @function
 * @description Shortcut for 'Object.keys'. Get the 'keys' for the given object.
 *
 * @param {object} target - The 'target' object.
 *
 * @return {Array<string>} The 'keys' of the 'target' object.
 */
var keys = function keys(target) {
  return Object.keys(target);
};

exports.keys = keys;
/**
 * @function
 * @description Simple shortcut method for 'Object.assign', which behaves as if
 *              given an empty object as the 'target' to 'Object.assign'.
 *
 * @param {...object} sources - The source objects to be assigned to 'target'.
 *
 * @return {object} The 'target' object.
 */
var assign = function assign() {
  for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    sources[_key2] = arguments[_key2];
  }

  return Object.assign.apply(Object, [{}].concat(sources));
};

exports.assign = assign;
/**
 * @function
 * @description Merge the given objects together. Basically this is a recursive
 *              assign function, preserving objects inside the given objects.
 *
 * @param {...object} sources - Objects to be merged together.
 *
 * @return {object} The merged object.
 */
var merge = function merge() {
  for (var _len3 = arguments.length, objects = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    objects[_key3] = arguments[_key3];
  }

  return(
    // collapse multiple objects into a single 'target' object
    reduce(objects, function (target, source) {
      return assign(target,
      // reduce over the keys so we can run 'assign' to specific keys
      reduce(keys(source), function (target, key) {
        return(
          // if the 'key' is an object, we want to merge it recursively,
          // otherwise we can just assign the new value on top
          has(target, key) && isObject(target[key]) && isObject(source[key]) ? assign(target, _defineProperty({}, key, merge(target[key], source[key]))) : assign(target, _defineProperty({}, key, source[key]))
        );
      },
      // the initial value for the 'keys' reduce is the 'target'
      target));
    })
  );
};

exports.merge = merge;
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
var wrap = function wrap(key, target) {
  return assign(_defineProperty({}, key, target[key]));
};

exports.wrap = wrap;
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
var omit = function omit(target) {
  for (var _len4 = arguments.length, props = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    props[_key4 - 1] = arguments[_key4];
  }

  return reduce(keys(target), function (result, key) {
    return contains(props, key) ? result : merge(result, wrap(key, target));
  });
};
exports.omit = omit;
