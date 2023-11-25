import { GetRatesRequest } from "@shipengine/connect-carrier-api";
import { WeightUnit } from '@shipengine/connect-carrier-api/lib/models';
import { GetRates } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let getRatesRequest: GetRatesRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  getRatesRequest = {
    transaction_id: "",
    metadata: {},
    ship_datetime: "",
    is_return_label: false,
    ship_from: {
      country_code: "",
      postal_code: ""
    },
    ship_to: {
      country_code: "",
      postal_code: ""
    },
    packages: [
      {
        weight_details: {
          weight_in_grams: 5000,
          source_weight_unit: WeightUnit.Grams
        },
        insured_value: {
          amount: "0",
          currency: "EUR"
        }
      },
      {
        weight_details: {
          weight_in_grams: 10000,
          source_weight_unit: WeightUnit.Grams
        },
        insured_value: {
          amount: "0",
          currency: "EUR"
        }
      }
    ],
    service_code: ""
  };
});

describe("Unit tests for GetRates function", () => {
  test("TEST", async () => {
    //Act
    var result = await GetRates(getRatesRequest);

    //Assert
    expect(result).toBe("");
  });
});
