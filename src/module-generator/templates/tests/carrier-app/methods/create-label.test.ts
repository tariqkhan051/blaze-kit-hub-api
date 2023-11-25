import { CreateLabelRequest } from "@shipengine/connect-carrier-api";
import { CreateLabel } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let createLabelRequest: CreateLabelRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  createLabelRequest = {
    metadata: {},
    transaction_id: "",
    ship_datetime: "",
    is_return_label: false,
    packages: [
      {
        insured_value: {
          amount: "1",
          currency: "USD"
        }
      }
    ],
    ship_to: {
      postal_code: "",
      country_code: ""
    },
    ship_from: {
      postal_code: "",
      country_code: ""
    }
  };
});

describe("Unit tests for CreateLabel function", () => {
  test("TEST", async () => {
    //Act
    var result = await CreateLabel(createLabelRequest);

    //Assert
    expect(result.tracking_number).toBe("");
  });
});
