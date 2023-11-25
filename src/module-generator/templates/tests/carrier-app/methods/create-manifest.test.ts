import { CreateManifestRequest } from "@shipengine/connect-carrier-api";
import { CreateManifest } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let createManifestRequest: CreateManifestRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  createManifestRequest = {
    metadata: {},
    open_datetime: '',
    close_datetime: '',
    transaction_id: '',
  };
});

describe("Unit tests for CreateManifest function", () => {
  test("TEST", async () => {
    //Act
    var result = await CreateManifest(createManifestRequest);

    //Assert
    expect(result).toBe("");
  });
});
