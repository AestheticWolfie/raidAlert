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
    .addFields(
      processedSpecificUniqueData.map((ele) => {
        return { name: ele.dataKeyword, value: fieldHelper(ele) };
      })
    )
    .setFooter({
      text: "Data provided by MetaForge",
      iconURL: "https://cdn.metaforge.app/logo.png",
    })
    .setColor("#ed3232");

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
  let stateMessage;
  if (refinedDataArrayEle.state === timeState.START) {
    stateMessage = `🟡 **${refinedDataArrayEle.event}** ${
      refinedDataArrayEle.map
    } starts in ${time(refinedDataArrayEle.start, "R")}`;
  }
  if (refinedDataArrayEle.state === timeState.END) {
    stateMessage = `🟢 **${refinedDataArrayEle.event}** ${
      refinedDataArrayEle.map
    } ends in ${time(refinedDataArrayEle.end, "R")}`;
  }

  return stateMessage;
}
