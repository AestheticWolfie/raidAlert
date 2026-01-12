import { ApplicationCommandType } from "discord.js";

import {
  fetchCacheTotalData,
  processCacheTotalData,
} from "../utils/cacheFetch/totalDataFetch.js";

import {
  CACHE_TOTAL_DATA_FILEPATH,
  CACHE_UNIQUE_EVENT_DATA_FILEPATH,
} from "../constants/filePaths.js";
import {
  DRAKE_DEV_ID,
  NOTIFICATION_DEV_CHANNEL,
} from "../constants/discordIds.js";

import { createErrorNotifier } from "../utils/errorHandler.js";

import {
  fetchCacheUniqueData,
  getSpecificUniqueData,
  processSpecificUniqueData,
} from "../utils/cacheFetch/uniqueDataFetch.js";
import { postEventScheduleEmbedBuilder } from "../utils/customEmbeds/postScheduleEmbed.js";

/** @type {import('commandkit').CommandData}  */
export const data = {
  name: "post-schedule",
  description: "Post an up to data schedule of arc raiders events.",
  type: ApplicationCommandType.ChatInput,
};

/**
 * @param {import('commandkit').SlashCommandProps} param0
 */
export const run = async ({ interaction }) => {
  await interaction.deferReply();

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

  interaction.editReply({ embeds: [postEmbed] });
};
