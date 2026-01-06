import { SUCCESS_DEV_CHANNEL } from "../../constants/discordIds.js";
import { sendChannelMessage } from "../../utils/discordMessaging/sendMessage.js";

/**
 * @param {import('discord.js').Guild} guild
 * @param {import('discord.js').Client} client
 *
 * @description Logging for guilds that join servers. Can be spammed a little.
 */
export default async (guild, client) => {
  const successMessage = `🥳🎉 ${guild.name} - ${guild.id} has joined the party!!! 🥳🎉`;
  console.log(successMessage);

  try {
    await sendChannelMessage(client, SUCCESS_DEV_CHANNEL, successMessage, {
      isAdmin: true,
    });
  } catch (error) {
    console.log("success command error: ", error);
    return;
  }
};
