import GuildConfig from "../../models/guildConfig.js";

import { createErrorNotifier } from "../../utils/errorHandler.js";
import { timestampConsoleLogs } from "../../utils/timestampLogs.js";

/**
 * @param {import('discord.js').Guild} guild
 * @param {import('discord.js').Client} client
 *
 * @description Updates the guildConfig that the guild has been kicked using the isKicked field
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
    return;
  }

  currentGuildDocument.isKicked = true;

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

  timestampConsoleLogs(`${guild.name} - ${guild.id} has left`);
};
