import GuildConfig from "../../models/guildConfig.js";

/**
 * @param {import('discord.js').Client} client
 */
export default async (client) => {
  console.log(`🤖 ${client.user.tag} is online and ready.`);
};
