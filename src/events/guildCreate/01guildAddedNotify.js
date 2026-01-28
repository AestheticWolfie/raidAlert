import { SUCCESS_DEV_CHANNEL } from "../../constants/discordIds.js";
import { sendChannelMessage } from "../../utils/discordMessaging/sendMessage.js";
import { timestampConsoleLogs } from "../../utils/timestampLogs.js";

/**
 * @param {import('discord.js').Guild} guild
 * @param {import('discord.js').Client} client
 *
 * @description Logging for guilds that join servers. Can be spammed a little.
 */
export default async (guild, client) => {
  const successMessage = `🥳🎉 ${guild.name} - ${guild.id} has joined the party!!! 🥳🎉`;
  timestampConsoleLogs(successMessage);

  try {
    await sendChannelMessage(client, SUCCESS_DEV_CHANNEL, successMessage, {
      isAdmin: true,
    });
  } catch (error) {
    timestampConsoleLogs("success command error: ", error);
    return;
  }
};
