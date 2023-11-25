import { GetServicePointsRequest } from "@shipengine/connect-carrier-api";
import { SearchRadiusUnit } from "@shipengine/connect-carrier-api/lib/models/service-points/search-radius-unit";
import { GetServicePoints } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let getServicePointsRequest: GetServicePointsRequest;
let errorMessage: string;

beforeEach(() => {
    errorMessage;
    getServicePointsRequest = {
        service_code: "",
        address: {
            address_lines: [],
            city_locality: "",
            state_province: "",
            postal_code: "31450",
            country_code: "",
            geo: {
                lat: 0.0,
                long: 0.0
            }
        },
        search_radius: {
            radius_in_kilometers: 2,
            source_radius_unit: SearchRadiusUnit.Kilometers
        },
        max_results: 2,
        transaction_id: "",
        metadata: {}
    };
});

describe("Unit tests for GetServicePoints function", () => {
    test("TEST", async () => {
        //Act
        var result = await GetServicePoints(getServicePointsRequest);

        //Assert
        expect(result).toBe("");
    });
});
