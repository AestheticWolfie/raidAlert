import fs from "fs";

/**
 *
 * @param {object} dataObject
 * @param {string} totalDataFilepath
 *
 * @description Populates the totalData.json file with dataObject
 */
export function populateTotalData(dataObject, totalDataFilepath) {
  if (typeof totalDataFilepath !== "string") {
    throw new TypeError("Path must be a string");
  }

  fs.writeFileSync(
    totalDataFilepath,
    JSON.stringify(dataObject, null, 2),
    "utf-8"
  );
}

/**
 *
 * @param {object} dataObject
 * @param {string} dataTypeString
 *
 * @description Input a valid data object and get a unique array of dataType
 */
export function parseToUniqueData(dataObject, dataTypeString) {
  if (dataObject !== Object || dataObject === null) {
    throw new TypeError("dataObject in parseToUniqueData must be an object");
  }
}

/**
 *
 * @param {Array} dataArray
 * @param {Array} UniqueDataCacheArray
 *
 * @returns {Array}
 *
 * @description Input the dataArray which comes from our totalData Cache and the uniqueDataCacheArray which comes from our uniqueData Cache
 * to output a merge of the two arrays.
 */
export function compareUniqueData(dataArray, UniqueDataCacheArray) {}

/**
 *
 * @param {Array} dataArray
 * @param {string} dataTypeString
 * @param {string} uniqueDataFilePath
 *
 * @description Write data array to the uniqueDataFilePath
 */
export function populateUniqueData(
  dataArray,
  dataTypeString,
  uniqueDataFilePath
) {}
