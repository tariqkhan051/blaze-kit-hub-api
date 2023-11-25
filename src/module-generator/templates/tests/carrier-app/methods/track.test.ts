import { TrackingRequest } from "@shipengine/connect-carrier-api";
import { Track } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let trackingRequest: TrackingRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  trackingRequest = {
    metadata: {},
    transaction_id: "",
    identifiers: [
      {
        type: "tracking_number",
        value: ""
      }
    ]
  };
});

describe("Unit tests for Track function", () => {
  test("TEST", async () => {
    //Act
    var result = await Track(trackingRequest);

    //Assert
    expect(result).toBe("");
  });
});
