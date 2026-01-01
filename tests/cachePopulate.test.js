import { describe, it, expect, test, vi } from "vitest";
import fs from "fs";

import {
  populateTotalData,
  parseToUniqueData,
  populateUniqueData,
  compareUniqueData,
} from "../src/utils/cacheManage/cachePopulate.js";

import { testInvalidUniqueDataInput } from "./helpers/testUniqueDataInput.js";

vi.mock("fs");

it("If filepath is not a string do not write to file", () => {
  expect(() => populateTotalData({}, 0)).toThrow(TypeError);
});

const invalidInputs = [1, "a", null, undefined, { cat: "hello" }];

// Test generator that tests correct errors are being thrown for incorrect inputs
testInvalidUniqueDataInput(parseToUniqueData, "Map", invalidInputs, TypeError);

testInvalidUniqueDataInput(
  parseToUniqueData,
  "Event",
  invalidInputs,
  TypeError
);

describe("Test for correct output of unique data", () => {
  const validInput = {
    data: [
      { map: "Drakes House", name: "Loot Cache" },
      { map: "Bin Outside", name: "Dumpster Dive" },
      { map: "Nottingham", name: "Gamble Gamble" },
    ],
  };

  test("Correct Map Uniqueness, order doesn't matter", () => {
    expect(parseToUniqueData(validInput, "Map").sort()).toEqual(
      ["Drakes House", "Bin Outside", "Nottingham"].sort()
    );
  });

  test("Correct Event Uniqueness, order doesn't matter", () => {
    expect(parseToUniqueData(validInput, "Map").sort()).toEqual(
      ["Loot Cache", "Dumpster Dive", "Gamble Gamble"].sort()
    );
  });
});

describe("Test correct output for compareUniqueData", () => {
  const totalDataArray = ["Loot Cache", "Dumpster Dive", "Gamble Gamble"];
  const uniqueDataCacheArray = ["Loot Cache", "Gamble Gamble", "Bee Hive"];

  expect(
    compareUniqueData(totalDataArray, uniqueDataCacheArray).sort()
  ).toEqual(
    ["Loot Cache", "Dumpster Dive", "Gamble Gamble", "Bee Hive"].sort()
  );
});
