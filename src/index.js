import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";

import mongoose from "mongoose";

import { dirname as dn } from "node:path";
import { fileURLToPath } from "node:url";
import { timestampConsoleLogs } from "./utils/timestampLogs.js";

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

new CommandKit({
  client,
  eventsPath: `${dirname}/events`,
  commandsPath: `${dirname}/commands`,
  validationsPath: `${dirname}/validations`,
  bulkRegister: true,
  devGuildIds: [],
  devUserIds: [],
});

client.login(process.env.DISCORD_TOKEN);
