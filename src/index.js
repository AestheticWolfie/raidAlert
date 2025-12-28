import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";

import mongoose from "mongoose";

import { dirname as dn, join } from "node:path";
import { fileURLToPath } from "node:url";

const dirname = dn(fileURLToPath(import.meta.url));

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

try {
  await mongoose.connect(process.env.MONGODB_TOKEN);
  console.log("🛢 Connected to DB.");
} catch (error) {
  console.error("database connection error", error);
}

new CommandKit({
  client,
  eventsPath: `${dirname}/events`,
  commandsPath: `${dirname}/commands`,
  validationsPath: `${dirname}/validations`,
  bulkRegister: true,
  devGuildIds: ["1412294835359973420"],
  devUserIds: ["575110942807949336"],
});

client.login(process.env.DISCORD_TOKEN);
