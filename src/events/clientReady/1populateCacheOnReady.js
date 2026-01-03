import {
  checkAndCreateCacheDirectory,
  checkAndCreateTotalDataFile,
  checkAndCreateUniqueDataFile,
} from "../../utils/cacheManage/cacheInit.js";

import {
  fetchApiDataJson,
  parseApiDataResponse,
} from "../../utils/API/metaForgeApiFetch.js";

import { METAFORGE_API_URL } from "../../constants/apiUrl.js";
import { CACHE_TOTAL_DATA_FILEPATH } from "../../constants/filePaths.js";

import {
  populateTotalData,
  parseToUniqueData,
  compareUniqueData,
  populateUniqueData,
} from "../../utils/cacheManage/cachePopulate.js";

import {
  fetchCacheTotalData,
  processCacheTotalData,
} from "../../utils/cacheFetch/totalDatafetch.js";

/**
 * @param {import('discord.js').Client} client
 */
export default async (client) => {
  // Startup routine. Must be in this order. All is sync not async
  checkAndCreateCacheDirectory();
  checkAndCreateTotalDataFile();
  checkAndCreateUniqueDataFile("Map");
  checkAndCreateUniqueDataFile("Event");

  const rawData = await fetchApiDataJson(METAFORGE_API_URL);
  const parsedData = parseApiDataResponse(rawData);

  populateTotalData(parsedData, CACHE_TOTAL_DATA_FILEPATH);

  // I could use parsed data but I'd rather get it from the pipeline

  const rawCacheTotalData = await fetchCacheTotalData(
    CACHE_TOTAL_DATA_FILEPATH
  );
  const processedCacheTotalData = processCacheTotalData(rawCacheTotalData);

  // Map
  const mapUniqueData = parseToUniqueData(
    processedCacheTotalData,
    "Map"
  ).sort();
  populateUniqueData(mapUniqueData, "cache/uniqueMapData.json");

  // Event
  const eventUniqueData = parseToUniqueData(
    processedCacheTotalData,
    "Event"
  ).sort();
  populateUniqueData(eventUniqueData, "cache/uniqueEventData.json");
};
