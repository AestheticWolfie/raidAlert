import { describe, test, expect, it } from "vitest";

/**
 *
 * @param {function} fn
 * @param {string} dataTypeString
 * @param {Array} invalidInputs
 * @param {Error} expectedError
 *
 * @description Test generator to generate tests for invalid input.
 */
export function testInvalidUniqueDataInput(
  fn,
  dataTypeString,
  invalidInputs,
  expectedError = Error
) {
  describe(`${fn.name} ${dataTypeString} - invalid input handling`, () => {
    invalidInputs.forEach((input, index) => {
      it(`rejects for invalid input #${index + 1}`, () => {
        expect(() => fn(input, dataTypeString)).toThrow(expectedError);
      });
    });
  });
}
