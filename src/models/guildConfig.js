import { Schema, model } from "mongoose";

import { FREE_TIER } from "../constants/subscriptionTiers.js";

const messagePostSettingsSchema = new Schema({
  channelId: {
    type: String,
    default: "",
  },
  messageId: {
    type: String,
    default: "",
  },
});

const notifierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // This will be fleshed out more when we figure out what notifier exactly needs
});

const guildConfigSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    index: true,
  },
  messagePostSettings: { type: messagePostSettingsSchema, default: () => ({}) },
  notifiers: [notifierSchema],
  subscriptionTier: {
    type: String,
    required: true,
    default: FREE_TIER,
  },
  isKicked: {
    type: Boolean,
    default: false,
  },
});

const GuildConfig = model("GuildConfig", guildConfigSchema);

export default GuildConfig;
