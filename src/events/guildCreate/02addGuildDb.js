import {
  DRAKE_DEV_ID,
  NOTIFICATION_DEV_CHANNEL,
} from "../../constants/discordIds.js";
import GuildConfig from "../../models/guildConfig.js";
import { createErrorNotifier } from "../../utils/errorHandler.js";
import { timestampConsoleLogs } from "../../utils/timestampLogs.js";

/**
 * @param {import('discord.js').Guild} guild
 * @param {import('discord.js').Client} client
 *
 * @description Check guild exists then add them to db.
 */
export default async (guild, client) => {
  let currentGuildDocument;
  try {
    currentGuildDocument = await GuildConfig.findOne({ guildId: guild.id });
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetching GuildConfig object",
      error,
    );
    return;
  }

  if (currentGuildDocument === null) {
    let newGuildConfigDocument;
    try {
      newGuildConfigDocument = new GuildConfig({ guildId: guild.id });
    } catch (error) {
      await createErrorNotifier(
        client,
        NOTIFICATION_DEV_CHANNEL,
        DRAKE_DEV_ID,
        "Forming GuildConfig object",
        error,
      );
      return;
    }

    try {
      await newGuildConfigDocument.save();
    } catch (error) {
      await createErrorNotifier(
        client,
        NOTIFICATION_DEV_CHANNEL,
        DRAKE_DEV_ID,
        "Saving GuildConfig object",
        error,
      );
      return;
    }

    timestampConsoleLogs(`Saving ${guild.name} - ${guild.id} success!`);
    return;
  } else {
    currentGuildDocument.isKicked = false;

    try {
      await currentGuildDocument.save();
    } catch (error) {
      await createErrorNotifier(
        client,
        NOTIFICATION_DEV_CHANNEL,
        DRAKE_DEV_ID,
        "Saving GuildConfig object",
        error,
      );
      return;
    }
  }
};
