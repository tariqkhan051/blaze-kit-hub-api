import { GetServicePointRequest  } from "@shipengine/connect-carrier-api";
import { GetServicePoint } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let getServicePointRequest: GetServicePointRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  getServicePointRequest={
    service_point_id: "",
    country_code: "",
    transaction_id: "",
    metadata: {}
  };
});

describe("Unit tests for GetServicePoint function", () => {
  test("TEST", async () => {
    //Act
    var result = await GetServicePoint(getServicePointRequest);

    //Assert
    expect(result).toBe("");
  });
});
