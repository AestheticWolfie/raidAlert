import { Embed } from "discord.js";

import {
  fetchCacheTotalData,
  processCacheTotalData,
} from "../cacheFetch/totalDataFetch.js";

import {
  CACHE_TOTAL_DATA_FILEPATH,
  CACHE_UNIQUE_EVENT_DATA_FILEPATH,
} from "../../constants/filePaths.js";
import {
  DRAKE_DEV_ID,
  NOTIFICATION_DEV_CHANNEL,
} from "../../constants/discordIds.js";

import { createErrorNotifier } from "../errorHandler.js";

import {
  fetchCacheUniqueData,
  getSpecificUniqueData,
  processSpecificUniqueData,
} from "../cacheFetch/uniqueDataFetch.js";

import { postEventScheduleEmbedBuilder } from "../customEmbeds/postScheduleEmbed.js";

/**
 * @description Helper func which contains fetching all the data and then constructing an embed with the data provided.
 *
 * @returns {Promise<Embed>}
 */
export async function createEventScheduleEmbedHelper(client) {
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

  let uniqueEventArray;
  try {
    uniqueEventArray = await fetchCacheUniqueData(
      CACHE_UNIQUE_EVENT_DATA_FILEPATH
    );
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetch Unique Cache Total Data",
      error
    );
    return;
  }

  let embedData = [];
  for (const uniqueDataString of uniqueEventArray) {
    const rawDataArray = getSpecificUniqueData(
      uniqueDataString,
      "Event",
      processedCacheTotalData
    );

    const processedDataObject = processSpecificUniqueData(
      uniqueDataString,
      "Event",
      rawDataArray
    );

    embedData.push(processedDataObject);
  }
  const postEmbed = postEventScheduleEmbedBuilder(embedData);

  if (postEmbed === undefined) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Embed is undefined!",
      error
    );
    return;
  }

  return postEmbed;
}
