import { writeFileSync, renameSync } from "fs";

/**
 *
 * @param {string} filepath
 * @param {object} data
 */
export function atomicWriteJSONSync(filepath, data) {
  const tempPath = filepath + ".tmp";
  const jsonString = JSON.stringify(data, null, 2);

  writeFileSync(tempPath, jsonString, "utf8");
  renameSync(tempPath, filepath);
}
