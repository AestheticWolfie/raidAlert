import { EmbedBuilder, time } from "discord.js";
import { timeState } from "../../constants/timeState.js";

/**
 * @typedef {Object} ProcessedData
 * @property {string} event
 * @property {string} map
 * @property {Date} start
 * @property {Date} end
 * @property {number} state
 *
 * @typedef {Object} RefinedData
 * @property {string} dataKeyword
 * @property {ProcessedData[]} refinedDataArray
 *
 * @param {RefinedData[]} processedSpecificUniqueData
 */
export function postEventScheduleEmbedBuilder(processedSpecificUniqueData) {
  const embed = new EmbedBuilder()
    .setTitle("📅 Event Schedule")
    .addFields([
      {
        name: "══════ ⚡ LIVE EVENTS ⚡ ══════",
        value: activeMessageHelper(processedSpecificUniqueData),
      },
      // {
      //   name: "───────────────────────────────────",
      //   value: "",
      // },
      {
        name: "════ ⚔️ COMPLETE SCHEDULE 🛡️ ════",
        value: "\n",
      },
      ...processedSpecificUniqueData.map((ele) => {
        return { name: ele.dataKeyword, value: fieldHelper(ele) };
      }),
      {
        name: "Notes",
        value: "",
      },
    ])
    .setFooter({
      text: "Data provided by MetaForge",
      iconURL: "https://cdn.metaforge.app/logo.png",
    })
    .setColor("#0f952c");

  return embed;
}

/**
 * @typedef {Object} ProcessedData
 * @property {string} event
 * @property {string} map
 * @property {Date} start
 * @property {Date} end
 * @property {number} state
 *
 * * @typedef {Object} RefinedData
 * @property {string} dataKeyword
 * @property {ProcessedData[]} refinedDataArray
 *
 * @param {RefinedData} dataEle
 */
function fieldHelper(dataEle) {
  if (!Array.isArray(dataEle.refinedDataArray)) {
    throw TypeError("refinedDataArray needs to be an array");
  }
  let fieldValueString;
  switch (dataEle.refinedDataArray.length) {
    case 0:
      fieldValueString = "🔴 Event not scheduled";
      break;
    case 1:
      fieldValueString = stateMessageHelper(dataEle.refinedDataArray[0]);
      break;
    default:
      fieldValueString =
        stateMessageHelper(dataEle.refinedDataArray[0]) +
        "\n" +
        stateMessageHelper(dataEle.refinedDataArray[1]);
  }

  return fieldValueString;
}

/**
 * @typedef {Object} ProcessedData
 * @property {string} event
 * @property {string} map
 * @property {Date} start
 * @property {Date} end
 * @property {number} state
 *
 * @param {ProcessedData} refinedDataArrayEle
 */
function stateMessageHelper(refinedDataArrayEle) {
  if (refinedDataArrayEle.state === timeState.START) {
    const stateMessage = `🟡 **${refinedDataArrayEle.event}** ${
      refinedDataArrayEle.map
    } starts ${time(refinedDataArrayEle.start, "R")}`;
    return stateMessage;
  }
  if (refinedDataArrayEle.state === timeState.END) {
    const stateMessage = `🟢 **${refinedDataArrayEle.event}** ${
      refinedDataArrayEle.map
    } ends ${time(refinedDataArrayEle.end, "R")}`;
    return stateMessage;
  }

  throw new Error(`Invalid state: ${refinedDataArrayEle.state}`);
}

function activeMessageHelper(processedSpecificUniqueData) {
  let activeMessage = "";
  for (const processedSpecificUniqueDataEle of processedSpecificUniqueData) {
    for (const dataEle of processedSpecificUniqueDataEle.refinedDataArray) {
      if (dataEle.state === timeState.END) {
        activeMessage += `${stateMessageHelper(dataEle)}\n`;
      }
    }
  }

  if (activeMessage === "") {
    activeMessage = "🔴 No Events Active\n";
  }
  return activeMessage.slice(0, -1);
}
