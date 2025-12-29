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
