import {
  DRAKE_DEV_ID,
  NOTIFICATION_DEV_CHANNEL,
} from "../../constants/discordIds.js";

import { sendChannelMessage } from "../../utils/discordMessaging/sendMessage.js";

import {
  checkAndCreateTotalDataFile,
  checkAndCreateCacheDirectory,
  checkAndCreateUniqueDataFile,
} from "../../utils/cacheManage/cacheInit.js";

import {
  fetchApiDataJson,
  parseApiDataResponse,
} from "../../utils/API/metaForgeApiFetch.js";
import { METAFORGE_API_URL } from "../../constants/apiUrl.js";
import {
  compareUniqueData,
  parseToUniqueData,
  populateTotalData,
  populateUniqueData,
} from "../../utils/cacheManage/cachePopulate.js";
import {
  CACHE_TOTAL_DATA_FILEPATH,
  CACHE_UNIQUE_EVENT_DATA_FILEPATH,
  CACHE_UNIQUE_MAP_DATA_FILEPATH,
} from "../../constants/filePaths.js";
import {
  fetchCacheTotalData,
  processCacheTotalData,
} from "../../utils/cacheFetch/totalDataFetch.js";
import { createErrorNotifier } from "../../utils/errorHandler.js";
import {
  fetchCacheUniqueData,
  processCacheUniqueData,
} from "../../utils/cacheFetch/uniqueDataFetch.js";

/**
 * @param {import('discord.js').Client} client
 */
export default async (client) => {
  // This whole script may just be pulled out and put into its own function so I can pass it in interval.

  // Startup routine. Must be in this order. All is sync not async
  try {
    checkAndCreateCacheDirectory();
    checkAndCreateTotalDataFile();
    checkAndCreateUniqueDataFile("Map");
    checkAndCreateUniqueDataFile("Event");
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Cache creation",
      error
    );
    return;
  }

  // Fetch API data
  let rawApiTotalData;
  try {
    rawApiTotalData = await fetchApiDataJson(METAFORGE_API_URL);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "API Fetch",
      error
    );
    return;
  }

  // Parse and validate data
  let parsedApiTotalData;
  try {
    parsedApiTotalData = parseApiDataResponse(rawApiTotalData);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "API parse",
      error
    );
    return;
  }

  try {
    populateTotalData(parsedApiTotalData, CACHE_TOTAL_DATA_FILEPATH);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Populate Total Data",
      error
    );
    return;
  }

  // Design choice here - I could use parsedApiTotalData but instead I want to base the rest of our data off the cache.
  // My thinking is that I want totalData and uniqueEventData to be a single source of truth and for the API to only
  // depot. If I was to now use it to populate the rest then I now how multiple depots. Idk this is my thinking.

  let processedCacheTotalData;
  try {
    const rawCacheTotalData = await fetchCacheTotalData(
      CACHE_TOTAL_DATA_FILEPATH
    );
    processedCacheTotalData = processCacheTotalData(rawCacheTotalData);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetch Cache Total Data",
      error
    );
    return;
  }

  // MAP
  let mapUniqueData;
  try {
    mapUniqueData = parseToUniqueData(processedCacheTotalData, "Map").sort();
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Parse Map Unqiue Data",
      error
    );
    return;
  }

  let processedCacheMapData;
  try {
    const rawCacheMapData = await fetchCacheUniqueData(
      CACHE_UNIQUE_MAP_DATA_FILEPATH
    );
    processedCacheMapData = processCacheUniqueData(rawCacheMapData);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetch Unique Map Data",
      error
    );
    return;
  }

  let mergedMapData;
  try {
    mergedMapData = compareUniqueData(mapUniqueData, processedCacheMapData);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Merging Incoming Map Unique Data With Cache Map",
      error
    );
    return;
  }

  try {
    populateUniqueData(mergedMapData, CACHE_UNIQUE_MAP_DATA_FILEPATH);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Populating Cache Map Data",
      error
    );
    return;
  }

  // EVENT
  let eventUniqueData;
  try {
    eventUniqueData = parseToUniqueData(
      processedCacheTotalData,
      "Event"
    ).sort();
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Parse Event Unqiue Data",
      error
    );
    return;
  }

  let processedCacheEventData;
  try {
    const rawCacheEventData = await fetchCacheUniqueData(
      CACHE_UNIQUE_EVENT_DATA_FILEPATH
    );
    processedCacheEventData = processCacheUniqueData(rawCacheEventData);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetch Unique Event Data",
      error
    );
    return;
  }

  let mergedEventData;
  try {
    mergedEventData = compareUniqueData(
      eventUniqueData,
      processedCacheEventData
    );
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Merging Incoming Event Unique Data With Cache Event",
      error
    );
    return;
  }

  try {
    populateUniqueData(mergedEventData, CACHE_UNIQUE_EVENT_DATA_FILEPATH);
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Populating Cache Event Data",
      error
    );
    return;
  }
};
