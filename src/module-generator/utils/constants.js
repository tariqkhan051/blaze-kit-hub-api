//API Type options
const API_TYPE = {
  REST: "rest-client",
  SOAP: "soap-client",
  FORM_URL_ENCODED: "form-url-encoded"
};

const DEFAULT_VALUES = {
  CARRIER_DESCRIPTION: "A new carrier module (based on the API connection): ",
  CARRIER_FOLDER: "demo",
  CARRIER_NAME: "Demo",
  SERVICES: "Demo Service",
  PACKAGING: "Package",
  METHODS: "register"
};

//APP Type options
const APP_TYPE = {
  CARRIER_APP: "Carrier App",
  ORDER_APP: "Order App"
};

//Method choices for carrier app
const CARRIER_METHOD_CHOICES = [
  {
    name: "createLabel",
    value: "createLabel"
  },
  {
    name: "track",
    value: "track"
  },
  {
    name: "getRates",
    value: "getRates"
  },
  {
    name: "createManifest",
    value: "createManifest"
  },
  {
    name: "schedulePickup",
    value: "schedulePickup"
  },
  {
    name: "voidLabels",
    value: "voidLabels"
  },
  {
    name: "cancelPickup",
    value: "cancelPickup"
  },
  {
    name: "register",
    value: "register"
  },
  {
    name: "getServicePoints",
    value: "getServicePoints"
  },
  {
    name: "getServicePoint",
    value: "getServicePoint"
  },
  {
    name: "getRelayPoints",
    value: "getRelayPoints"
  }
];

const DEFINITIONS_TEST_FILES = [
  "index.test.ts",
  "project-name.test.ts",
  "pkg-base.test.ts",
  "service-base.test.ts"
];

const CARRIER_TEST_FILES = DEFINITIONS_TEST_FILES.concat([
  "registration-form.test.ts",
  "settings-form.test.ts"
]);

const TEMPLATE_FILES = {
  PKG_TEST_FILE: "pkg-base.test.ts",
  SERVICE_TEST_FILE: "service-base.test.ts",
  TEMPORARY_FILE: "tempFile.json",
  CARRIER_APP_BASE: "carrier-app-base.ts",
  CARRIER_REQUEST: "carrier-request.ts",
  SERVICE_BASE: "service.ts",
  PACKAGE_BASE: "package.ts"
};

const DEFAULT_DIRECTORIES = {
  CARRIER_APP: "../shipping/modules",
  ORDER_APP: "../ecommerce/modules",
  MODULE_GENERATOR: "../module-generator",
  DEFAULT_DESTINATION: "ModulesGenerated"
};

const SKIP_FILES = ["node_modules"];

const DEFAULT_DIRECTORIES_LIST = Array.from(Object.keys(DEFAULT_DIRECTORIES));

module.exports = {
  APP_TYPE,
  API_TYPE,
  DEFAULT_VALUES,
  CARRIER_TEST_FILES,
  DEFAULT_DIRECTORIES,
  DEFINITIONS_TEST_FILES,
  SKIP_FILES,
  TEMPLATE_FILES,
  CARRIER_METHOD_CHOICES,
  DEFAULT_DIRECTORIES_LIST
};
