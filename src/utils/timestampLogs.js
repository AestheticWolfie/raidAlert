/**
 *
 * @param {string} message
 */
export function timestampConsoleLogs(message) {
  const date = new Date();

  const dateString = `[${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()} UTC]`;

  console.log(dateString, message);
}
