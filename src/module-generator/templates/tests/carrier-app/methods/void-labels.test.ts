import { VoidLabelsRequest } from "@shipengine/connect-carrier-api";
import { VoidLabels } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let voidLabelRequest: VoidLabelsRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  voidLabelRequest = {
    transaction_id: "",
    metadata: {},
    void_requests: [
      {
        void_request_id: "",
        tracking_number: "",
        ship_from: {
          postal_code: "",
          country_code: ""
        }
      }
    ]
  };
});

describe("Unit tests for void label function", () => {
  test("Get success response from API", async () => {
    //Act
    var result = await VoidLabels(voidLabelRequest);

    //Assert
    expect(result.void_responses[0].message).toBe("Label has been voided.");
  });

  test("Get validation error on empty tracking number", async () => {
    //Arrange
    voidLabelRequest.void_requests[0].tracking_number = "";

    //Act
    var result = await VoidLabels(voidLabelRequest);

    //Assert
    expect(result.void_responses[0].errors![0]).toBe(
      "Tracking number is required."
    );
  });
});
