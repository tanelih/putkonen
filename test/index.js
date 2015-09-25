/**
 * @module putkonen/test
 * @author Taneli Hartikainen <taneli.hartikainen89@gmail.com>
 *
 * @description Test suites for the 'putkonen' module.
 */

import tape          from 'tape'
import * as putkonen from '../src'

/**
 * @typedef TestSpec {object}
 *
 * Spec is an object, with keys acting as test case descriptions and the values
 * as the actual test case functions.
 */

/**
 * @function
 * @description Define and execute a test suite.
 *
 * @param {string}   name - Name of the test suite.
 * @param {TestSpec} spec - Specification containing the test cases.
 */
const suite = (name, spec) =>
	tape(name, test =>
		test.plan(putkonen.keys(spec).length) ||
		putkonen.each(putkonen.keys(spec), testcase =>
			spec[testcase]()
				? test.pass(testcase)
				: test.fail(testcase)))

/**
 * @function
 * @description Make sure each element in the array is 'truthy'.
 *
 * @param  {boolean[]} arr - Array of boolean'ish values.
 * @return {boolean}
 */
const areElementsTrue = arr =>
	putkonen.reduce(arr, (v, e) => v ? e : v, true)


suite('putkonen.isArray', {
	'should handle objects': () =>
		!putkonen.isArray({ }),

	'should handle null values': () =>
		!putkonen.isArray(null),

	'should handle arrays': () =>
		putkonen.isArray([ ]) && putkonen.isArray(new Array())
})

suite('putkonen.isObject', {
	'should handle null values': () =>
		!putkonen.isObject(null) && !putkonen.isObject(undefined),

	'should handle arrays': () =>
		!putkonen.isObject([]) && !putkonen.isObject(new Array()),

	'should handle strings': () =>
		!putkonen.isObject('') &&
		!putkonen.isObject('baz') &&
		!putkonen.isObject(new String('')) &&
		!putkonen.isObject(new String('baz')),

	'should handle objects': () =>
		putkonen.isObject({ }) &&
		putkonen.isObject(new Object())
})

suite('putkonen.merge', {
	'should handle simple objects': () => {
		let a      = { foo: 'bar'  }
		let b      = { baz: 'quux' }
		let merged = putkonen.merge(a, b)

		return (
			putkonen.has(merged, 'foo') &&
			putkonen.has(merged, 'baz') &&
			merged !== a                &&
			merged !== b
		)
	},

	'should handle nested objects': () => {
		let a      = { foo: 'bar'  }
		let b      = { baz: 'quux', bish: { bosh: 'bush' } }
		let merged = putkonen.merge(a, b)

		return (
			putkonen.has(merged,      'foo')  &&
			putkonen.has(merged,      'baz')  &&
			putkonen.has(merged,      'bish') &&
			putkonen.has(merged.bish, 'bosh') &&
			merged      !== a                 &&
			merged      !== b                 &&
			merged.bish !== b.bish
		)
	}
})

suite('putkonen.flatten', {
	'should handle non-nested arrays': () => {
		let flat = putkonen.flatten([1, 1, 1])
			.map(n => n === 1)
		return flat.length === 3 && areElementsTrue(flat)
	},

	'should handle single-level nesting': () => {
		let flat = putkonen.flatten([1, [ 1 ], 1, [ 1 ]])
			.map(n => n === 1)
		return flat.length === 4 && areElementsTrue(flat)
	},

	'should handle nesting many levels deep': () => {
		let flat = putkonen.flatten([
				1, [ 1, [ 1, [ 1 ], [ 1 ] ], [ 1 ] ], 1, 1, [ 1 ], [ [ [ 1 ] ] ]
			])
			.map(n => n === 1)
		return flat.length === 10 && areElementsTrue(flat)
	}
})
