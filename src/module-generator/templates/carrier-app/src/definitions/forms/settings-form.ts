const JsonSchema = {
  type: "object",
  title: "Settings Form",
  required: ["username", "password"],
  properties: {
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
  },
  description: "Update your account."
};

const UiSchema = {
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

export const SettingsFormSchema = {
  JsonSchema,
  UiSchema
};
