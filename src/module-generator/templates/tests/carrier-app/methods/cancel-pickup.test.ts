import { CancelPickupRequest } from "@shipengine/connect-carrier-api";
import { CancelPickup } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let cancelPickupRequest: CancelPickupRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  cancelPickupRequest = {
    transaction_id: "",
    metadata: {},
    confirmation: {},
    location: {},
    contact: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: ""
    },
    pickup_details: {
      pickup_service_code: "",
      shipments: []
    },
    pickup_windows: [],
    custom_properties: {}
  };
});

describe("Unit tests for CancelPickup function", () => {
  test("TEST", async () => {
    //Arrange

    //Act
    var result = await CancelPickup(cancelPickupRequest);

    //Assert
    expect(result).toBe("");
  });
});
