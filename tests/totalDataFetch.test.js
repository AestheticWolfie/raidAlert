import { test, describe, expect } from "vitest";

import { processCacheTotalData } from "../src/utils/cacheFetch/totalDataFetch.js";

describe("Incorrect input should flag a TypeError", () => {
  const invalidInputs = [1, "a", null, undefined, []];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheTotalData(input)).toThrow(TypeError);
    });
  });
});

test("Test if object has no data attribute then throw Error", () => {
  const invalidInput = { hello: "cat" };
  expect(() => processCacheTotalData(invalidInput)).toThrow(Error);
});

describe("Test if data is not an array then throw Error", () => {
  const invalidInputs = [{ data: "Mouse" }, { data: 1 }];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheTotalData(input)).toThrow(TypeError);
    });
  });
});

describe("Test if object has data attribute but any of its elements are not objects", () => {
  const invalidInputs = [{ data: [1, "Hello"] }];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheTotalData(input)).toThrow(Error);
    });
  });
});

describe("Test if object has data attribute but any of its elements dont have a map and event attribute then throw Error", () => {
  const invalidInputs = [
    {
      data: [{ map: "Bee Hive", name: "Dam" }, { map: "Hello" }],
    },
    {
      data: [{}],
    },
  ];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheTotalData(input)).toThrow(Error);
    });
  });
});

describe("Test if object has data attribute, all of the elements are objects but some element attributes map/name are not strings", () => {
  const invalidInputs = [
    { data: { name: 1, map: "Hello" } },
    { data: { name: "null", map: null } },
  ];

  invalidInputs.forEach((input, index) => {
    test(`Reject invalid input #${index + 1}`, () => {
      expect(() => processCacheTotalData(input)).toThrow(Error);
    });
  });
});

describe("Correct output with correct input", () => {
  const validInputs = [
    {
      data: [
        {
          game: "arc-raiders",
          name: "Prospecting Probes",
          map: "Buried City",
          icon: "https://cdn.metaforge.app/arc-raiders/custom/probe.webp",
          description: "",
          days: [],
          times: [
            {
              start: "00:00",
              end: "01:00",
            },
            {
              start: "08:00",
              end: "09:00",
            },
            {
              start: "16:00",
              end: "17:00",
            },
          ],
        },
        {
          game: "arc-raiders",
          name: "Cold Snap",
          map: "Blue Gate",
          icon: "https://cdn.metaforge.app/arc-raiders/custom/coldsnap.webp",
          description: "",
          days: [],
          times: [
            {
              start: "00:00",
              end: "02:00",
            },
            {
              start: "08:00",
              end: "10:00",
            },
            {
              start: "16:00",
              end: "18:00",
            },
          ],
        },
      ],
    },
  ];

  validInputs.forEach((input, index) => {
    test(`Accept input #${index + 1}`, () => {
      expect(processCacheTotalData(input)).toEqual(input);
    });
  });
});
