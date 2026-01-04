import { sendChannelMessage } from "./discordMessaging/sendMessage.js";

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
  errorMessage
) {
  console.log(`${operation} Failed : \n ${errorMessage}`);
  await sendChannelMessage(
    client,
    channelId,
    `<@${devUserId}> Cache Creation Failed : \n ${errorMessage}`,
    { isAdmin: true }
  );
}
