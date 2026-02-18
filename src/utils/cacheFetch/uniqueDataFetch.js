import fs from "fs/promises";

import { timeState } from "../../constants/timeState.js";

export async function fetchCacheUniqueData(cacheUniqueDataFilepath) {
  if (typeof cacheUniqueDataFilepath !== "string") {
    throw TypeError("Filepath must be a string");
  }
  const rawData = await fs.readFile(cacheUniqueDataFilepath, "utf-8");

  let dataObject;
  try {
    dataObject = JSON.parse(rawData);
  } catch (error) {
    throw Error("Raw data in fetchCacheUniqueData is not JSON");
  }

  return dataObject;
}

/**
 * @description Input raw from getSpecificUniqueData and process it so we can pass it into our embed.
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
        "Some or all of data array's elements arent what is expected in processCacheUniqueData",
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
 * @param {{data: RawData[]}} fetchedTotalData
 *
 * @returns {RawData[]}
 *
 */
export function getSpecificUniqueData(dataKeyword, dataType, fetchedTotalData) {
  const data = fetchedTotalData.data;

  let formattedDataType;
  switch (dataType) {
    case "Map":
      formattedDataType = "map";
      break;
    case "Event":
      formattedDataType = "name";
      break;

    default:
      throw Error(
        `dataKeyword only accepts certain strings - ${dataType} is invalid! `,
      );
  }

  const specificUniqueDataArray = [];

  for (const dataEle of data) {
    if (dataEle[formattedDataType] === dataKeyword) {
      specificUniqueDataArray.push(dataEle);
    }
  }

  return specificUniqueDataArray;
}

/**
 *
 * @typedef {Object} RawData
 * @property {string} game
 * @property {string} name
 * @property {string} map
 * @property {string} icon
 * @property {number} startTime
 * @property {number} endTime
 *
 * @typedef {Object} ProcessedData
 * @property {string} event
 * @property {string} map
 * @property {Date} start
 * @property {Date} end
 * @property {number} state
 *
 * @typedef {Object} RefinedData
 * @property {string} dataKeyword
 * @property {ProcessedData[]} refinedDataArray
 *
 * @description Input raw from getSpecificUniqueData and process it so we can pass it into our embed.
 *
 * @param {string} dataKeyword
 * @param {string} dataType
 * @param {RawData[]} rawSpecificUniqueDataArray
 * @returns {RefinedData}
 *
 */
export function processSpecificUniqueData(
  dataKeyword,
  dataType,
  rawSpecificUniqueDataArray,
) {
  if (typeof dataKeyword !== "string") {
    throw TypeError(
      "dataKeyword in processSpecificUniqueData needs to be a string",
    );
  }
  if (typeof dataType !== "string") {
    throw TypeError(
      "dataKeyword in processSpecificUniqueData needs to be a string",
    );
  }
  if (!Array.isArray(rawSpecificUniqueDataArray)) {
    throw TypeError("rawSpecificUniqueDataArray needs to be an array");
  }

  let formattedDataType;
  switch (dataType) {
    case "Map":
      formattedDataType = "map";
      break;
    case "Event":
      formattedDataType = "name";
      break;

    default:
      throw Error(
        `dataKeyword only accepts certain strings - ${dataType} is invalid! `,
      );
  }

  const refinedDataObject = {
    dataKeyword: dataKeyword,
    refinedDataArray: [],
  };

  for (const dataEle of rawSpecificUniqueDataArray) {
    const refinedObject = refinedObjectHelper(
      dataEle.name,
      dataEle.map,
      dataEle.startTime,
      dataEle.endTime,
    );

    refinedDataObject.refinedDataArray.push(refinedObject);
  }

  // Sorting refinedDataArray

  let endSortedArray = refinedDataObject.refinedDataArray.filter(
    (dataEle) => dataEle.state === timeState.END,
  );
  endSortedArray = endSortedArray.sort((a, b) => a.end - b.end);

  let startSortedArray = refinedDataObject.refinedDataArray.filter(
    (dataEle) => dataEle.state === timeState.START,
  );
  startSortedArray = startSortedArray.sort((a, b) => a.start - b.start);

  const newSortedArray = endSortedArray.concat(startSortedArray);
  refinedDataObject.refinedDataArray = newSortedArray;

  return refinedDataObject;
}

function refinedObjectHelper(event, map, startTimeNumber, endTimeNumber) {
  if (typeof event !== "string") {
    throw TypeError("event param in refinedObjectHelper needs to be a string");
  }
  if (typeof map !== "string") {
    throw TypeError("map param in refinedObjectHelper needs to be a string");
  }
  if (typeof startTimeNumber !== "number") {
    throw TypeError(
      "startString param in refinedObjectHelper needs to be a number",
    );
  }
  if (typeof endTimeNumber !== "number") {
    throw TypeError(
      "endString param in refinedObjectHelper needs to be a number",
    );
  }
  const now = new Date();
  const startNext = new Date(startTimeNumber);
  const endNext = new Date(endTimeNumber);

  startNext.setUTCDate(now.getUTCDate());
  endNext.setUTCDate(now.getUTCDate());

  let state = timeState.START;
  if (endNext <= now) {
    endNext.setUTCDate(endNext.getUTCDate() + 1);
    startNext.setUTCDate(startNext.getUTCDate() + 1);
  } else {
    if (startNext <= now) {
      state = timeState.END;
    }
  }

  const refinedObject = {
    event: event,
    map: map,
    start: startNext,
    end: endNext,
    state: state,
  };

  return refinedObject;
}
