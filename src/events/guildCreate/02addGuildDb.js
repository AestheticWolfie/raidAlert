import {
  DRAKE_DEV_ID,
  NOTIFICATION_DEV_CHANNEL,
} from "../../constants/discordIds.js";
import GuildConfig from "../../models/guildConfig.js";
import { createErrorNotifier } from "../../utils/errorHandler.js";

/**
 * @param {import('discord.js').Guild} guild
 * @param {import('discord.js').Client} client
 *
 * @description Check guild exists then add them to db.
 */
export default async (guild, client) => {
  let guildConfigDocument;
  try {
    guildConfigDocument = new GuildConfig({ guildId: guild.id });
  } catch (error) {
    console.log(`Forming GuildConfig object failed in guildCreate:\n ${error}`);
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Forming GuildConfig object",
      error
    );
    return;
  }

  try {
    await guildConfigDocument.save();
  } catch (error) {
    console.log(`Saving GuildConfig object failed in guildCreate:\n ${error}`);
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Saving GuildConfig object",
      error
    );
    return;
  }

  console.log(`Saving ${guild.name} - ${guild.id} success!`);
};
