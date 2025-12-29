import { describe, it, expect, test } from "vitest";
import {
  fetchApiDataJson,
  parseApiDataResponse,
} from "../src/utils/API/metaForgeApiFetch.js";

describe("typeError thrown if fetchApiDataJson url param is not a string", () => {
  it("passing integer url expecting a typeError", async () => {
    await expect(fetchApiDataJson(20)).rejects.toThrow(TypeError);
  });

  it("passing null url expecting a typeError", async () => {
    await expect(fetchApiDataJson(null)).rejects.toThrow(TypeError);
  });

  it("passing undefined url expecting a typeError", async () => {
    await expect(fetchApiDataJson(undefined)).rejects.toThrow(TypeError);
  });
});

describe("throw error if parseApiDataResponse dataObject is not an object", () => {
  it("passing integer dataObject expecting an error", () => {
    expect(() => parseApiDataResponse(1)).toThrow(Error);
  });

  it("passing string dataObject expecting an error", () => {
    expect(() => parseApiDataResponse("hello")).toThrow(Error);
  });

  it("passing string dataObject that looks like json expecting an error", () => {
    expect(() => parseApiDataResponse('{data: "hello"}"')).toThrow(Error);
  });

  it("passing null dataObject expecting an error", () => {
    expect(() => parseApiDataResponse(null)).toThrow(Error);
  });

  it("passing undefined dataObject expecting an error", () => {
    expect(() => parseApiDataResponse(undefined)).toThrow(Error);
  });
});

test("throw error if data in parseApiDataResponse is an undefined attribute", () => {
  const mockJson = {};

  expect(() => parseApiDataResponse(mockJson)).toThrow(Error);
});

describe("throw error if data attribute in parseTotalDataResponse is not an array type", () => {
  test("throw error if data attribute is null", () => {
    const mockJson = { data: null };
    expect(() => parseApiDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is undefined", () => {
    const mockJson = { data: undefined };
    expect(() => parseApiDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is an object not an array", () => {
    const mockJson = { data: {} };
    expect(() => parseApiDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is a string", () => {
    const mockJson = { data: "HELLO" };
    expect(() => parseApiDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is an int", () => {
    const mockJson = { data: 12 };
    expect(() => parseApiDataResponse(mockJson)).toThrow(Error);
  });
});
