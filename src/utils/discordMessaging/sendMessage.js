/**
 *
 * @param {import('discord.js').Client} client
 * @param {string} channelId
 * @param {string} content
 * @param {object} options
 *
 *
 */
export async function sendChannelMessage(
  client,
  channelId,
  content,
  options = {}
) {
  const { isAdmin = false } = options;

  if (isAdmin) {
    try {
      const channel = await client.channels.fetch(channelId);
      await channel.send(content);
    } catch (error) {
      console.error("Admin notification failed:", error);
    }
    return;
  }
}
