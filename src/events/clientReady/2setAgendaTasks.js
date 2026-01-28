import Agenda from "agenda";
import GuildConfig from "../../models/guildConfig.js";
import { createEventScheduleEmbedHelper } from "../../utils/customEmbeds/createEventScheduleHelper.js";
import { UPDATE_EMBEDS } from "../../constants/agendaTaskNames.js";
import { timestampConsoleLogs } from "../../utils/timestampLogs.js";

/**
 * @param {import('discord.js').Client} client
 */
export default async (client) => {
  timestampConsoleLogs(`Setting Agenda Tasks...`);
  const agenda = new Agenda({ db: { address: process.env.MONGODB_TOKEN } });

  agenda.define(UPDATE_EMBEDS, async () => {
    const dateNowMins = new Date().getMinutes();

    if (dateNowMins % 3 !== 1) return;

    await updateEventPostsHelper(client);
  });

  (async function () {
    await agenda.start();

    await agenda.cancel({ name: UPDATE_EMBEDS });

    await agenda.every("1 minute", UPDATE_EMBEDS);
  })();
};

/**
 *
 * @param {import('discord.js').Client} client
 * @returns
 */
async function updateEventPostsHelper(client) {
  let activeGuildConfigArray;
  try {
    activeGuildConfigArray = await GuildConfig.find({ isKicked: false });
  } catch (error) {
    await createErrorNotifier(
      client,
      NOTIFICATION_DEV_CHANNEL,
      DRAKE_DEV_ID,
      "Fetching activeGuildConfigs",
      error,
    );
    return;
  }

  const newEmbed = await createEventScheduleEmbedHelper(client);

  for (const activeGuild of activeGuildConfigArray) {
    if (!activeGuild?.messagePostSettings.channelId) {
      continue;
    }
    if (!activeGuild?.messagePostSettings.messageId) {
      continue;
    }

    let message;
    try {
      const channel = await client.channels.fetch(
        activeGuild.messagePostSettings.channelId,
      );
      message = await channel.messages.fetch(
        activeGuild.messagePostSettings.messageId,
      );
    } catch (error) {
      timestampConsoleLogs(
        `Error finding message in guild: ${activeGuild.guildId}. Might have been deleted in guild`,
      );
      continue;
    }

    if (!message) {
      continue;
    }

    try {
      await message.edit({ embeds: [newEmbed] });
    } catch (error) {
      await createErrorNotifier(
        client,
        NOTIFICATION_DEV_CHANNEL,
        DRAKE_DEV_ID,
        `Editing Embed - Guild: ${activeGuild.guildId} `,
        error,
      );
      continue;
    }
  }
}
