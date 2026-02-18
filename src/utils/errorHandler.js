import { sendChannelMessage } from "./discordMessaging/sendMessage.js";

import { timestampConsoleLogs } from "./timestampLogs.js";

/**
 *
 * @param {import('discord.js').Client} client
 * @param {string} channelId
 * @param {string} devUserId
 * @param {string} operation
 * @param {string} errorMessage
 */
export async function createErrorNotifier(
  client,
  channelId,
  devUserId,
  operation,
  errorMessage,
) {
  timestampConsoleLogs(`${operation} Failed : \n ${errorMessage}`);

  if (channelId === "") {
    return;
  }
  await sendChannelMessage(
    client,
    channelId,
    `<@${devUserId}> ${operation} : \n ${errorMessage}`,
    { isAdmin: true },
  );
}
