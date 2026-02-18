import fs from "fs/promises";

/**
 *
 * @param {string} cacheTotalDataFilepath
 * @returns {Promise}
 */
export async function fetchCacheTotalData(cacheTotalDataFilepath) {
  if (typeof cacheTotalDataFilepath !== "string") {
    throw TypeError("Filepath must be a string");
  }
  const rawData = await fs.readFile(cacheTotalDataFilepath, "utf-8");

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
      "DataObject.data in processCacheTotalData is not an Array",
    );
  }

  for (const dataEle of dataObject.data) {
    if (
      typeof dataEle !== "object" ||
      Array.isArray(dataEle) ||
      dataEle === null
    ) {
      throw new Error(
        "Invalid array of dataObject.data. Some elements are not objects",
      );
    }

    if (typeof dataEle?.name !== "string" || typeof dataEle.map !== "string") {
      throw new Error(
        "Invalid array of dataObject.data. Wrong data type for ele",
      );
    }
  }

  return dataObject;
}
