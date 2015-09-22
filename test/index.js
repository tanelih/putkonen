/**
 * @module putkonen/test
 * @author Taneli Hartikainen <taneli.hartikainen89@gmail.com>
 *
 * @description Test suites for the 'putkonen' module.
 */

import tape   from 'tape'
import assert from 'assert'

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

suite('putkonen.map', {
	'should invoke the \'fn\' each pass': () =>
		putkonen.map([1, 1, 1], n => n + 1).map(n => assert.equal(n, 2))
})

suite('putkonen.merge', {
	'should handle simple objects': () => {
		let a      = { foo: 'bar'  }
		let b      = { baz: 'quux' }
		let merged = putkonen.merge(a, b)

		assert.equal(putkonen.keys(merged).length, 2)

		assert(putkonen.has(merged, 'foo'))
		assert(putkonen.has(merged, 'baz'))

		assert.notStrictEqual(merged, a)
		assert.notStrictEqual(merged, b)

		return true
	},

	'should handle nested objects': () => {
		let a      = { foo: 'bar'  }
		let b      = { baz: 'quux', bish: { bosh: 'bush' } }
		let merged = putkonen.merge(a, b)

		assert.equal(putkonen.keys(merged).length, 3)

		assert(putkonen.has(merged, 'foo'))
		assert(putkonen.has(merged, 'baz'))
		assert(putkonen.has(merged, 'bish'))

		assert(putkonen.has(merged.bish, 'bosh'))

		assert.notStrictEqual(merged, a)
		assert.notStrictEqual(merged, b)

		assert.notStrictEqual(merged.bish, b.bish)

		return true
	}
})

suite('putkonen.flatten', {
	'should handle non-nested arrays': () => {
		let flat = putkonen.flatten([1, 1, 1])
			.map(n => assert.equal(n, 1) || n)
		return assert.equal(flat.length, 3) || true
	},

	'should handle single-level nesting': () => {
		let flat = putkonen.flatten([1, [ 1 ], 1, [ 1 ]])
			.map(n => assert.equal(n, 1) || n)
		return assert.equal(flat.length, 4) || true
	},

	'should handle nesting many levels deep': () => {
		let arr = [
			1, [ 1, [ 1, [ 1 ], [ 1 ] ], [ 1 ] ], 1, 1, [ 1 ], [ [ [ 1 ] ] ]
		]
		let flat = putkonen.flatten(arr)
			.map(n => assert.equal(n, 1) || n)
		return assert.equal(flat.length, 10) || true
	}
})
