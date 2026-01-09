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
 * @description Input raw from getSpecificUnqiueData and process it so we can pass it into our embed.
 *
 * @param {Array} dataArray
 * @returns {Array}
 *
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

/**
 * @typedef {Object} Times
 * @property {string} start
 * @property {string} end
 *
 * @typedef {Object} RawData
 * @property {string} game
 * @property {string} map
 * @property {string} icon
 * @property {string} description
 * @property {string[]} days
 * @property {Times[]} times
 *
 * @description DataType is the keyword for which unique cache you want, so Map would be the map on and Event would be the 'name'.
 * DataKeyword is what zones into the specific event, so 'harvester' would be valid
 *
 * Gets all data entries in totalData and returns an array of objects matching the type
 *
 * @param {string} dataKeyword
 * @param {string} dataType
 *
 * @returns {RawData[]}
 *
 */
export function getSpecificUniqueData(dataKeyword, dataType) {}

/**
 * @typedef {Object} Times
 * @property {string} start
 * @property {string} end
 *
 * @typedef {Object} RawData
 * @property {string} game
 * @property {string} map
 * @property {string} icon
 * @property {string} description
 * @property {string[]} days
 * @property {Times[]} times
 *
 * @typedef {Object} ProcessedData
 * @property {string} game
 * @property {string} map
 * @property {Date} start
 * @property {Date} end
 * @property {number} state
 *
 * @typedef {Object} RefinedData
 * @property {string} dataKeyword
 * @property {ProcessedData[]} refinedDataArray
 *
 * @description Input raw from getSpecificUnqiueData and process it so we can pass it into our embed.
 *
 * @param {RawData[]} rawSpecificUnqiueDataArray
 * @param {string} dataType
 *
 * @param {RefinedData}
 *
 */
export function processSpecificUniqueData(
  rawSpecificUnqiueDataArray,
  dataType
) {}
