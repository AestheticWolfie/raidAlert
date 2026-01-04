import fs from "fs/promises";

export async function fetchCacheUniqueData(cacheUnqiueDataFilepath) {
  if (typeof cacheUnqiueDataFilepath !== "string") {
    throw TypeError("Filepath must be a string");
  }
  const rawData = await fs.readFile(cacheUnqiueDataFilepath, "utf-8");

  let dataObject;
  try {
    dataObject = JSON.parse(rawData);
  } catch (error) {
    throw Error("Raw data in fetchCacheUniqueData is not JSON");
  }

  return dataObject;
}

/**
 *
 * @param {Array} dataArray
 * @returns {Array}
 *
 * @description Process raw data from the unique data cache checking for inconsistencies
 */
export function processCacheUniqueData(dataArray) {
  if (!Array.isArray(dataArray)) {
    throw new TypeError("Data array in processCacheUniqueData is not an array");
  }

  for (const dataEle of dataArray) {
    if (typeof dataEle !== "string") {
      throw new TypeError(
        "Some or all of data array's elements arent what is expected in processCacheUniqueData"
      );
    }
  }

  return dataArray;
}
