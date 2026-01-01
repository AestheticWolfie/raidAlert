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
  if (typeof dataObject !== "object" || dataObject === null) {
    throw new TypeError("dataObject in parseToUniqueData must be an object");
  }

  if (dataObject?.data === undefined) {
    throw new TypeError("dataObject does not have a data attribute.");
  }

  let keyword;
  if (dataTypeString === "Map") {
    keyword = "map";
  }
  if (dataTypeString === "Event") {
    keyword = "name";
  }

  const dataTypeArray = dataObject.data.map((ele) => ele[keyword]);

  const uniqueDataTypeArray = [...new Set(dataTypeArray)].sort();

  return uniqueDataTypeArray;
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
export function compareUniqueData(dataArray, UniqueDataCacheArray) {
  const combinedArray = dataArray.concat(...UniqueDataCacheArray);

  const newUniqueDataArray = [...new Set(combinedArray)].sort();

  return newUniqueDataArray;
}

/**
 *
 * @param {Array} dataArray
 * @param {string} dataTypeString
 * @param {string} uniqueDataFilePath
 *
 * @description Write data array to the uniqueDataFilePath
 */
export function populateUniqueData(dataArray, uniqueDataFilePath) {
  if (typeof totalDataFilepath !== "string") {
    throw new TypeError("Path must be a string");
  }

  fs.writeFileSync(
    totalDataFilepath,
    JSON.stringify(dataObject, null, 2),
    "utf-8"
  );
}
