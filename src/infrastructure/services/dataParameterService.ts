import { DataParameters } from "../../models/DataParameters";

export function getRequiredDataParameter(): DataParameters {
    const queryParams = new URLSearchParams(window.location.search);

    const rawData = queryParams.get("data") || queryParams.get("Data");

    if (!rawData) {
        throw new Error("Data parameter not found in query string.");
    }

    const decodedData = decodeURIComponent(rawData);

    try {
        return JSON.parse(decodedData) as DataParameters;
    } catch {
        throw new Error("Data parameter is not valid JSON.");
    }
}
  
export function getDataParameter(): DataParameters|null {
    const queryParams = new URLSearchParams(window.location.search);

    const rawData = queryParams.get("data") || queryParams.get("Data");

    if (!rawData) {
        return null;
    }

    const decodedData = decodeURIComponent(rawData);

    try {
        return JSON.parse(decodedData) as DataParameters;
    } catch {
        throw new Error("Data parameter is not valid JSON.");
    }
}
  