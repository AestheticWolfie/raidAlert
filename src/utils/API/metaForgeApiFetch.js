import fetch from "node-fetch";

/**
 *
 * @param {string} url
 * @returns
 *
 * @description Fetching raw data from API.
 */
export async function fetchApiDataJson(url) {
  if (typeof url != "string") {
    throw new TypeError("fetchApiDataJson url must be a string");
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

/**
 *
 * @param {{data: object.Array}} dataObject
 * @returns {{data: object}}
 *
 * @description Process data we get from API by returning a data object.
 */
export function parseApiDataResponse(dataObject) {
  if (typeof dataObject != "object" || dataObject === null) {
    throw new Error(
      "DataObject in parseApiDataResponse is not an object. What recieved from the API is not what we expect"
    );
  }
  if (
    dataObject?.data === undefined ||
    !Array.isArray(dataObject?.data) ||
    dataObject?.data === null
  ) {
    throw new Error(
      "Object we have recieved in parseApiDataResponse is not the correct format. The data attribute is not what we expect"
    );
  }

  return dataObject;
}

// /**
//  *
//  * @param {string} url
//  * @returns {{object}}
//  *
//  * @description Batches together fetchApiDataJson and parseApiDataResponse into one function
//  */
// export async function returnApiData(url) {

//   const rawdataObject = await fetchApiDataJson(url);
//   const validatedDataObject = parseApiDataResponse(rawdataObject);

//   return validatedDataObject;
// }
