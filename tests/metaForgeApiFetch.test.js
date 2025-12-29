import { describe, it, expect, test } from "vitest";
import {
  fetchTotalDataJson,
  parseTotalDataResponse,
} from "../src/utils/API/metaForgeApiFetch.js";

describe("typeError thrown if fetchTotalDataJson url param is not a string", () => {
  it("passing integer url expecting a typeError", async () => {
    await expect(fetchTotalDataJson(20)).rejects.toThrow(TypeError);
  });

  it("passing null url expecting a typeError", async () => {
    await expect(fetchTotalDataJson(null)).rejects.toThrow(TypeError);
  });

  it("passing undefined url expecting a typeError", async () => {
    await expect(fetchTotalDataJson(undefined)).rejects.toThrow(TypeError);
  });
});

describe("throw error if parseTotalDataResponse dataObject is not an object", () => {
  it("passing integer dataObject expecting an error", () => {
    expect(() => parseTotalDataResponse(1)).toThrow(Error);
  });

  it("passing string dataObject expecting an error", () => {
    expect(() => parseTotalDataResponse("hello")).toThrow(Error);
  });

  it("passing string dataObject that looks like json expecting an error", () => {
    expect(() => parseTotalDataResponse('{data: "hello"}"')).toThrow(Error);
  });

  it("passing null dataObject expecting an error", () => {
    expect(() => parseTotalDataResponse(null)).toThrow(Error);
  });

  it("passing undefined dataObject expecting an error", () => {
    expect(() => parseTotalDataResponse(undefined)).toThrow(Error);
  });
});

test("throw error if data in parseTotalDataResponse is an undefined attribute", () => {
  const mockJson = {};

  expect(() => parseTotalDataResponse(mockJson)).toThrow(Error);
});

describe("throw error if data attribute in parseTotalDataResponse is not an array type", () => {
  test("throw error if data attribute is null", () => {
    const mockJson = { data: null };
    expect(() => parseTotalDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is undefined", () => {
    const mockJson = { data: undefined };
    expect(() => parseTotalDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is an object not an array", () => {
    const mockJson = { data: {} };
    expect(() => parseTotalDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is a string", () => {
    const mockJson = { data: "HELLO" };
    expect(() => parseTotalDataResponse(mockJson)).toThrow(Error);
  });

  test("throw error if data attribute is an int", () => {
    const mockJson = { data: 12 };
    expect(() => parseTotalDataResponse(mockJson)).toThrow(Error);
  });
});
