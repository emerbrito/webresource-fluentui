import { DataParameters } from "../../models/DataParameters";

export function getRequiredDataParameter(): DataParameters | null {
    const queryParams = new URLSearchParams(window.location.search);

    const rawData = queryParams.get("data") || queryParams.get("Data");

    if (!rawData) {
        console.log("Data parameter not found in query string.");
        return null;
    }

    const decodedData = decodeURIComponent(rawData);

    try {
        return JSON.parse(decodedData) as DataParameters;
    } catch {
        console.log("Data parameter is not valid JSON.");
        return null
    }
}

export function getDataParameter(): DataParameters | null {
    const queryParams = new URLSearchParams(window.location.search);

    const rawData = queryParams.get("data") || queryParams.get("Data");

    if (!rawData) {
        return null;
    }

    const decodedData = decodeURIComponent(rawData);

    try {
        return JSON.parse(decodedData) as DataParameters;
    } catch {
        console.log("Data parameter is not valid JSON.");
        return null
    }
}
