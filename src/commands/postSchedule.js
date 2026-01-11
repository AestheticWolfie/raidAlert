import { ApplicationCommandType } from "discord.js";

import {
  fetchCacheTotalData,
  processCacheTotalData,
} from "../utils/cacheFetch/totalDataFetch.js";

import { CACHE_TOTAL_DATA_FILEPATH } from "../constants/filePaths.js";
import {
  DRAKE_DEV_ID,
  NOTIFICATION_DEV_CHANNEL,
} from "../constants/discordIds.js";

import { createErrorNotifier } from "../utils/errorHandler.js";

import {
  getSpecificUniqueData,
  processSpecificUniqueData,
} from "../utils/cacheFetch/uniqueDataFetch.js";

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

  const rawDataArray = getSpecificUniqueData(
    "Hidden Bunker",
    "Event",
    processedCacheTotalData
  );

  const processedDataObject = processSpecificUniqueData(
    "Hidden Bunker",
    "Event",
    rawDataArray
  );

  console.log(processedDataObject);
};
