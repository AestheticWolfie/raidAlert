import { describe, it, expect, vi } from "vitest";
import fs, { mkdirSync } from "fs";
import {
  checkAndCreateCacheDirectory,
  checkAndCreateTotalDataFile,
  checkAndCreateUniqueDataFile,
} from "../src/utils/cacheManage/cacheInit.js";

vi.mock("fs");

describe("checkAndCreateDirectory", () => {
  it("should create the directory if it does not exist", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const mkdirSyncMock = vi.spyOn(fs, "mkdirSync").mockReturnValue(() => {});

    const CACHE_PATH = "cache/";

    checkAndCreateCacheDirectory();

    expect(existsSyncMock).toHaveBeenCalledWith(CACHE_PATH);
    expect(mkdirSyncMock).toHaveBeenCalledWith(CACHE_PATH, { recursive: true });

    existsSyncMock.mockRestore();
    mkdirSyncMock.mockRestore();
  });

  it("should not create the directory if it does exist", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const mkdirSyncMock = vi.spyOn(fs, "mkdirSync");

    checkAndCreateCacheDirectory();

    expect(mkdirSyncMock).not.toHaveBeenCalled();

    existsSyncMock.mockRestore();
    mkdirSyncMock.mockRestore();
  });
});

describe("checkAndCreateTotalDataFile", () => {
  it("should create totalData.json if the file does not exist", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const writeFileSyncMock = vi
      .spyOn(fs, "writeFileSync")
      .mockReturnValue(() => {});

    const TOTAL_DATA_PATH = "cache/totalData.json";

    checkAndCreateTotalDataFile();

    expect(existsSyncMock).toHaveBeenCalledWith(TOTAL_DATA_PATH);
    expect(writeFileSyncMock).toHaveBeenCalledWith(TOTAL_DATA_PATH, "{}");

    existsSyncMock.mockRestore();
    writeFileSyncMock.mockRestore();
  });

  it("should not create totalData.json if the file exists", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const writeFileSyncMock = vi.spyOn(fs, "writeFileSync");

    checkAndCreateTotalDataFile();

    expect(writeFileSyncMock).not.toBeCalled();

    existsSyncMock.mockRestore();
    writeFileSyncMock.mockRestore();
  });
});

describe("checkAndCreateUniqueDataFile", () => {
  it("should create uniqueEventData.json if the file does not exist", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const writeFileSyncMock = vi
      .spyOn(fs, "writeFileSync")
      .mockReturnValue(() => {});

    const UNIQUE_EVENT_DATA_PATH = "cache/uniqueEventData.json";

    checkAndCreateUniqueDataFile("Event");

    expect(existsSyncMock).toHaveBeenCalledWith(UNIQUE_EVENT_DATA_PATH);
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      UNIQUE_EVENT_DATA_PATH,
      "[]"
    );

    existsSyncMock.mockRestore();
    writeFileSyncMock.mockRestore();
  });

  it("should not create uniqueEventData.json if the file exists", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const writeFileSyncMock = vi.spyOn(fs, "writeFileSync");

    const UNIQUE_EVENT_DATA_PATH = "cache/uniqueEventData.json";

    checkAndCreateUniqueDataFile("Event");

    expect(writeFileSyncMock).not.toBeCalled();

    existsSyncMock.mockRestore();
    writeFileSyncMock.mockRestore();
  });

  it("should create uniqueMapData.json if the file does not exist", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const writeFileSyncMock = vi
      .spyOn(fs, "writeFileSync")
      .mockReturnValue(() => {});

    const UNIQUE_MAP_DATA_PATH = "cache/uniqueMapData.json";

    checkAndCreateUniqueDataFile("Map");

    expect(existsSyncMock).toHaveBeenCalledWith(UNIQUE_MAP_DATA_PATH);
    expect(writeFileSyncMock).toHaveBeenCalledWith(UNIQUE_MAP_DATA_PATH, "[]");

    existsSyncMock.mockRestore();
    writeFileSyncMock.mockRestore();
  });

  it("should not create uniqueMapData.json if the file exists", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const writeFileSyncMock = vi.spyOn(fs, "writeFileSync");

    const UNIQUE_MAP_DATA_PATH = "cache/uniqueMapData.json";

    checkAndCreateUniqueDataFile("Map");

    expect(writeFileSyncMock).not.toBeCalled();

    existsSyncMock.mockRestore();
    writeFileSyncMock.mockRestore();
  });
});
