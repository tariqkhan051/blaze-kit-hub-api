import { GetRelayPointsRequest as getRelayPointsRequest } from "@shipengine/connect-carrier-api";
import { GetRelayPoints } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let getRelayPointsRequest: getRelayPointsRequest;
let errorMessage: string;

beforeEach(() => {
    errorMessage;
    getRelayPointsRequest = {
        service_code: "",
        city_locality: "",
        postal_code: "",
        country_code: "",
        transaction_id: "",
        metadata: {}
    };
});

describe("Unit tests for GetRelayPoints function", () => {
    test("TEST", async () => {
        //Act
        var result = await GetRelayPoints(getRelayPointsRequest);

        //Assert
        expect(result).toBe("");
    });
});
