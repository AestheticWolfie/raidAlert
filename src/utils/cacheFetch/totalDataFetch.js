import fs from "fs/promises";

import { CACHE_TOTAL_DATA_FILEPATH } from "../../constants/filePaths.js";

export async function fetchCacheTotalData() {
  const rawData = await fs.readFile(CACHE_TOTAL_DATA_FILEPATH, "utf-8");

  let dataObject;
  try {
    dataObject = JSON.parse(rawData);
  } catch (error) {
    throw Error("Raw data in fetchCacheTotalData is not JSON");
  }

  return dataObject;
}

export function processCacheTotalData(dataObject) {
  if (
    typeof dataObject !== "object" ||
    Array.isArray(dataObject) ||
    dataObject === null
  ) {
    throw new TypeError("DataObject in processCacheTotalData is not an object");
  }

  if (!Array.isArray(dataObject.data)) {
    throw new TypeError(
      "DataObject.data in processCacheTotalData is not an Array"
    );
  }

  for (const dataEle of dataObject.data) {
    if (
      typeof dataEle !== "object" ||
      Array.isArray(dataEle) ||
      dataEle === null
    ) {
      throw new Error(
        "Invalid array of dataObject.data. Some elements are not objects"
      );
    }

    if (typeof dataEle?.name !== "string" || typeof dataEle.map !== "string")
      if (dataEle?.name === undefined || dataEle?.map === undefined) {
        throw new Error(
          "Invalid array of dataObject.data. Missing attributes in processCacheTotalData"
        );
      }
  }

  return dataObject;
}
