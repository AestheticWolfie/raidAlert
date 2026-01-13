import { ApplicationCommandType, Embed } from "discord.js";

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

import GuildConfig from "../models/guildConfig.js";

/** @type {import('commandkit').CommandData}  */
export const data = {
  name: "post-schedule",
  description: "Post an up to data schedule of arc raiders events.",
  type: ApplicationCommandType.ChatInput,
};

/**
 * @param {import('commandkit').SlashCommandProps} param0
 */
export const run = async ({ client, interaction }) => {
  await interaction.deferReply();

  await deletePreviousMessageHelper(client, interaction);

  const postEmbed = await createEmbedHelper(client);

  if (postEmbed === undefined) {
    interaction.editReply({
      content:
        "Technical Error has occured with retrieving and posting event data",
    });
    return;
  }

  const finalMessage = await interaction.editReply({ embeds: [postEmbed] });

  const updatedGuild = await saveMessageDataHelper(
    client,
    interaction,
    finalMessage
  );

  if (updatedGuild === undefined) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Guild update suspected failure",
      error
    );
    return;
  }
};

/**
 * @description Helper func which contains fetching all the data and then constructing an embed with the data provided.
 *
 * @returns {Promise<Embed>}
 */
async function createEmbedHelper(client) {
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

/**
 * @description Helper func which saves the newly create message to the db.
 *
 * @param {*} interaction
 * @param {*} message
 * @returns
 */
async function saveMessageDataHelper(client, interaction, message) {
  let updatedGuild;
  try {
    updatedGuild = await GuildConfig.findOneAndUpdate(
      {
        guildId: interaction.guildId,
      },
      {
        messagePostSettings: {
          channelId: interaction.channelId,
          messageId: message.id,
        },
      },
      { new: true }
    );
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Updating message post settings",
      error
    );
    return;
  }

  return updatedGuild;
}

/**
 * @description Helper func which deletes the previous message from the db.
 *
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Interaction} interaction
 */
async function deletePreviousMessageHelper(client, interaction) {
  let guildConfig;
  try {
    guildConfig = await GuildConfig.findOne({ guildId: interaction.guildId });
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetching guild info",
      error
    );
    return;
  }

  if (guildConfig === null) {
    return;
  }

  if (!guildConfig?.messagePostSettings?.channelId) {
    return;
  }

  let message;
  try {
    const channel = await client.channels.fetch(
      guildConfig.messagePostSettings.channelId
    );
    message = await channel.messages.fetch(
      guildConfig.messagePostSettings.messageId
    );
  } catch (error) {
    console.log(
      `Fetching message error in delete. It may have already been deleted - ${interaction.guildId}`
    );
    return;
  }

  try {
    await message.delete();
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Deleting Previous Message",
      error
    );
    return;
  }
}
