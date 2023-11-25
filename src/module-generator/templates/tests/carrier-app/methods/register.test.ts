import { RegisterRequest } from "@shipengine/connect-carrier-api";
import { Register } from "../../src/methods";

jest.mock("../../src/api/api-communicator");

let registerRequest: RegisterRequest;
let errorMessage: string;

beforeEach(() => {
  errorMessage;
  registerRequest = {
    transaction_id: "",
    registration_info: {
      username: "",
      password: ""
    }
  };
});

describe("Unit tests for Register function", () => {
  test.each([
    ["", "testpass"],
    ["testuserid", ""]
  ])("Get error message from validation", async (username, pass) => {
    //Arrange
    registerRequest.registration_info["username"] = username;
    registerRequest.registration_info["password"] = pass;

    //Act
    await Register(registerRequest).catch((e) => (errorMessage = e.message));

    //Assert
    expect(errorMessage).toBe("");
  });
});
