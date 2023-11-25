import { SettingsFormSchema } from "../../../src/definitions/forms/settings-form";

describe("Check settings form structure", () => {
  test("Check Title", () => {
    //Act
    const result = SettingsFormSchema.JsonSchema.title;

    //Assert
    expect(result).toBe("Settings Form");
  });

  test("Check Type", () => {
    //Act
    const result = SettingsFormSchema.JsonSchema.type;

    //Assert
    expect(result).toBe("object");
  });

  test("Check required properties", () => {
    //Arrange
    const expected = ["username", "password"];

    //Act
    const result = SettingsFormSchema.JsonSchema.required;

    //Assert
    expect(result).toStrictEqual(expected);
  });

  test("Check Properties", () => {
    //Arrange
    const expected = {
      username: {
        type: "string",
        title: "User Name",
        maxLength: 25
      },
      password: {
        type: "string",
        title: "Password",
        maxLength: 25
      }
    };

    //Act
    const result = SettingsFormSchema.JsonSchema.properties;

    //Assert
    expect(result).toStrictEqual(expected);
  });

  test("Check uiSchema", () => {
    //Arrange
    const expected = {
      "ui:order": ["username", "password"],
      username: {
        "ui:autofocus": true,
        "ui:emptyValue": "username"
      },
      password: {
        "ui:help": "Note: password is case sensitive.",
        "ui:widget": "password"
      }
    };

    //Act
    const result = SettingsFormSchema.UiSchema;

    //Assert
    expect(result).toStrictEqual(expected);
  });
});
