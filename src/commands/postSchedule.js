import { ApplicationCommandType } from "discord.js";

/** @type {import('commandkit').CommandData}  */
export const data = {
  name: "post-schedule",
  description: "Post an up to data schedule of arc raiders events.",
  type: ApplicationCommandType.ChatInput,
};

/**
 * @param {import('commandkit').SlashCommandProps} param0
 */
export const run = async ({ interaction }) => {};
