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
import { populateTotalData } from "../../utils/cacheManage/cachePopulate.js";

/**
 * @param {import('discord.js').Client} client
 */
export default async (client) => {
  checkAndCreateCacheDirectory();
  checkAndCreateTotalDataFile();
  checkAndCreateUniqueDataFile("Map");
  checkAndCreateUniqueDataFile("Event");

  const rawData = await fetchApiDataJson(METAFORGE_API_URL);
  const parsedData = parseApiDataResponse(rawData);

  populateTotalData(parsedData, "cache/totalData.json");
};
