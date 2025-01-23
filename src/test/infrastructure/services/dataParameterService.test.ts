import { getRequiredDataParameter, getDataParameter } from "../../../infrastructure/services/dataParameterService";
import { DataParameters } from "../../../models/DataParameters";

describe("dataParameterService", () => {
    const originalLocation = window.location;

    beforeEach(() => {
        // Mock window.location
        window.location = { search: '' } as any
    })

    afterEach(() => {
        window.location = originalLocation
    })

    describe("getRequiredDataParameter", () => {
        it("should return parsed data when valid data parameter is present", () => {
            const data: DataParameters = { key: "value" };
            window.location.search = `?data=${encodeURIComponent(JSON.stringify(data))}`;


            const result = getRequiredDataParameter();
            expect(result).toEqual(data);
        });

        it("should throw an error when data parameter is missing", () => {
            window.location.search = "";

            expect(() => getRequiredDataParameter()).toThrow("Data parameter not found in query string.");
        });

        it("should throw an error when data parameter is not valid JSON", () => {
            window.location.search = "?data=invalidJSON";

            expect(() => getRequiredDataParameter()).toThrow("Data parameter is not valid JSON.");
        });
    });

    describe("getDataParameter", () => {
        it("should return parsed data when valid data parameter is present", () => {
            const data: DataParameters = { key: "value" };
            window.location.search = `?data=${encodeURIComponent(JSON.stringify(data))}`;

            const result = getDataParameter();
            expect(result).toEqual(data);
        });

        it("should return null when data parameter is missing", () => {
            window.location.search = "";

            const result = getDataParameter();
            expect(result).toBeNull();
        });

        it("should throw an error when data parameter is not valid JSON", () => {
            window.location.search = "?data=invalidJSON";

            expect(() => getDataParameter()).toThrow("Data parameter is not valid JSON.");
        });
    });
});
