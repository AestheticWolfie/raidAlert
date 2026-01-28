import { timestampConsoleLogs } from "../../utils/timestampLogs.js";

/**
 * @param {import('discord.js').Client} client
 */
export default async (client) => {
  timestampConsoleLogs(`🤖 ${client.user.tag} is online and ready.`);
};
