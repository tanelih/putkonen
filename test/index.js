/**
 * @module putkonen/test
 * @author Taneli Hartikainen <taneli.hartikainen89@gmail.com>
 *
 * @description Test suites for the 'putkonen' module.
 */

import tape   from 'tape'
import assert from 'assert'

import * as putkonen from '..'

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
