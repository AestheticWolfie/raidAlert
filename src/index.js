import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";

import mongoose from "mongoose";

import { dirname as dn } from "node:path";
import { fileURLToPath } from "node:url";
import { timestampConsoleLogs } from "./utils/timestampLogs.js";
import { DEV_GUILD, DEV_ID } from "./constants/discordIds.js";

const dirname = dn(fileURLToPath(import.meta.url));

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

try {
  await mongoose.connect(process.env.MONGODB_URI);
  timestampConsoleLogs("🛢 Connected to DB.");
} catch (error) {
  timestampConsoleLogs("database connection error", error);
}
let devGuildIdsArray = [];
if (DEV_GUILD) {
  devGuildIdsArray.push(DEV_GUILD);
}

let devUserIdsArray = [];
if (DEV_ID) {
  devUserIdsArray.push(DEV_ID);
}

new CommandKit({
  client,
  eventsPath: `${dirname}/events`,
  commandsPath: `${dirname}/commands`,
  validationsPath: `${dirname}/validations`,
  bulkRegister: true,
  devGuildIds: devGuildIdsArray,
  devUserIds: devUserIdsArray,
});

client.login(process.env.DISCORD_TOKEN);
