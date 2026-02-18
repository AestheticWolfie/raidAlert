import { ApplicationCommandType } from "discord.js";

import { DEV_ID, NOTIFICATION_DEV_CHANNEL } from "../constants/discordIds.js";

import { createErrorNotifier } from "../utils/errorHandler.js";

import GuildConfig from "../models/guildConfig.js";

import { createEventScheduleEmbedHelper } from "../utils/customEmbeds/createEventScheduleHelper.js";
import { NOT_ADMIN_MESSAGE } from "../constants/replies.js";

/** @type {import('commandkit').CommandData}  */
export const data = {
  name: "post-schedule",
  description: "Post an up to date schedule of arc raiders events.",
  type: ApplicationCommandType.ChatInput,
};

/**
 * @param {import('commandkit').SlashCommandProps} param0
 */
export const run = async ({ client, interaction }) => {
  await interaction.deferReply();

  if (!interaction.member.permissions.has("Administrator")) {
    interaction.editReply({ content: NOT_ADMIN_MESSAGE });
    return;
  }

  await deletePreviousMessageHelper(client, interaction);

  const postEmbed = await createEventScheduleEmbedHelper(client);

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
    finalMessage,
  );
};

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
      { new: true },
    );
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DEV_ID,
      "Updating message post settings",
      error,
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
      DEV_ID,
      "Fetching guild info",
      error,
    );
    return;
  }

  if (guildConfig === null || guildConfig === undefined) {
    return;
  }

  if (!guildConfig?.messagePostSettings?.channelId) {
    return;
  }

  let message;
  try {
    const channel = await client.channels.fetch(
      guildConfig.messagePostSettings.channelId,
    );
    message = await channel.messages.fetch(
      guildConfig.messagePostSettings.messageId,
    );
  } catch (error) {
    console.log(
      `Fetching message error in delete. It may have already been deleted - ${interaction.guildId}`,
    );
    return;
  }

  try {
    await message.delete();
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DEV_ID,
      "Deleting Previous Message",
      error,
    );
    return;
  }
}
