import { SchedulePickupRequest } from "@shipengine/connect-carrier-api";
import { SchedulePickup } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let schedulePickupRequest: SchedulePickupRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  schedulePickupRequest = {
    transaction_id: "",
    metadata: {},
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
    requested_pickup_window: {
      time_zone_iana: "",
      pickup_date: ""
    }
  };
});

describe("Unit tests for SchedulePickup function", () => {
  test("TEST", async () => {
    //Act
    var result = await SchedulePickup(schedulePickupRequest);

    //Assert
    expect(result).toBe("");
  });
});
