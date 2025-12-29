import { describe, it, expect, test, vi } from "vitest";
import fs from "fs";

import { populateTotalData } from "../src/utils/cacheManage/cachePopulate.js";

vi.mock("fs");

it("If filepath is not a string do not write to file", () => {
  expect(() => populateTotalData({}, 0)).toThrow(TypeError);
});
