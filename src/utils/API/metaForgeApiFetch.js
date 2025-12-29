import fetch from "node-fetch";

/**
 *
 * @param {string} url
 *
 * @description Fetching raw data from API. Attempts to convert into json but will return whatever passed as ok.
 */
export async function fetchTotalDataJson(url) {
  if (typeof url != "string") {
    throw new TypeError("fetchTotalDataJson url must be a string");
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error("Failed to parse JSON from API");
  }
  return data;
}

export function parseTotalDataResponse(dataObject) {
  if (typeof dataObject != "object" || dataObject === null) {
    throw new Error(
      "DataObject in parseTotalDataResponse is not an object. What recieved from the API is not what we expect"
    );
  }
  if (
    dataObject?.data === undefined ||
    !Array.isArray(dataObject?.data) ||
    dataObject?.data === null
  ) {
    throw new Error(
      "Object we have recieved in parseTotalDataResponse is not the correct format. The data attribute is not what we expect"
    );
  }

  return dataObject;
}

export async function returnTotalData(url) {
  const rawdataObject = await fetchTotalDataJson(url);
  const validatedDataObject = parseTotalDataResponse(rawdataObject);

  return validatedDataObject;
}
