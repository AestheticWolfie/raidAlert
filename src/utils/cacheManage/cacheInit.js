import fs from "fs";

/**
 * @description Ensures the cache directory exists by checking its existence
 * and creating it if necessary. Useful for preparing the filesystem for caching operations.
 */
export function checkAndCreateCacheDirectory() {
  const CACHE_PATH = "cache/";

  if (!fs.existsSync(CACHE_PATH)) {
    fs.mkdirSync(CACHE_PATH, { recursive: true });
  }
}

/**
 * @description Ensures the totalData.json file exists by checking its existence
 * and creating it if necessary.
 */
export function checkAndCreateTotalDataFile() {
  const TOTAL_DATA_PATH = "cache/totalData.json";
  if (!fs.existsSync(TOTAL_DATA_PATH)) {
    fs.writeFileSync(TOTAL_DATA_PATH, "{}");
  }
}

/**
 *
 * @param {string} dataType
 *
 * @description Ensures the dataTypeUniqueData.json file exists by checking its existence
 * and creating it if necessary.
 */
export function checkAndCreateUniqueDataFile(dataTypeString) {
  const UNIQUE_DATA_PATH = `cache/unique${dataTypeString}Data.json`;
  if (!fs.existsSync(UNIQUE_DATA_PATH)) {
    fs.writeFileSync(UNIQUE_DATA_PATH, "[]");
  }
}
