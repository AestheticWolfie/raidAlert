import { test, describe, expect } from "vitest";

import { processCacheUniqueData } from "../src/utils/cacheFetch/uniqueDataFetch.js";

describe("Incorrect input should flag a TypeError", () => {
  const invalidInputs = [1, "a", null, undefined, {}];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheUniqueData(input)).toThrow(TypeError);
    });
  });
});

describe("Test correct input does not throw a typeError", () => {
  const validInput = ["Stella", "Mount Bigus", "Toystory"];
  test("Test valid input throws no error in processCacheUniqueData", () => {
    expect(() => processCacheUniqueData(validInput)).not.toThrow(TypeError);
  });
});

describe("Test incorrect types in the array throw a typeError", () => {
  const invalidInputs = [
    ["Stella", 1, "Toystory"],
    [null],
    [undefined, undefined],
  ];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheUniqueData(input)).toThrow(TypeError);
    });
  });
});

describe("Test correct output with correct input in processCacheUniqueData", () => {
  const validInput = ["Stella", "Mount Bigus", "Toystory"];
  test("Test valid input throws no error in processCacheUniqueData", () => {
    expect(processCacheUniqueData(validInput).sort()).toEqual(
      validInput.sort()
    );
  });
});
