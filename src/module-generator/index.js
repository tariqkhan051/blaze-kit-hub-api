#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { addToLogFile } = require("../helpers/utils");
const { API_NAMES } = require("../helpers/constants");

const {
  APP_TYPE,
  API_TYPE,
  DEFAULT_VALUES,
  DEFAULT_DIRECTORIES
} = require("./utils/constants");

const {
  renameFile,
  createTests,
  createMethods,
  getHashedName,
  getCapitalValue,
  createProjectDir,
  createDefinitions,
  createModelInterfaces,
  createDirectoryContents,
  getArrayWithUniqueValues,
  deleteExistingModules
} = require("./utils/helpers");

let PKG_TEST_CREATED = false,
  SERVICE_TEST_CREATED = false;

// Directory where the new module will be created
let CURR_DIR = "";
let DEFF_DIR = "";
let NEW_DEFF_DIR = "";

const getCarrier = async (req, res) => {
  (PKG_TEST_CREATED = false), (SERVICE_TEST_CREATED = false);

  try {
    deleteExistingModules(DEFAULT_DIRECTORIES.DEFAULT_DESTINATION);
    await createModule(req.body);
    var folderName = `${
      req.body?.["folderName"]?.toLowerCase() ||
      req.body?.["name"]?.replace(/[^A-Za-z0-9]/g, "").toLowerCase() ||
      DEFAULT_VALUES.CARRIER_FOLDER
    }`;
    var fileName = `${folderName}.zip`;
    var zipLocation = `${DEFAULT_DIRECTORIES.DEFAULT_DESTINATION}/${fileName}`;

    var output = fs.createWriteStream(`${zipLocation}`);
    var archive = archiver("zip");

    output.on("close", function () {
      addToLogFile(
        API_NAMES.MODULE_GENERATOR,
        archive.pointer() + " total bytes"
      );
      addToLogFile(
        API_NAMES.MODULE_GENERATOR,
        "archiver has been finalized and the output file descriptor has closed."
      );

      var file = fs.createReadStream(`${zipLocation}`);
      var stat = fs.statSync(`${zipLocation}`);

      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", "arraybuffer");
      res.setHeader(
        "Content-Disposition",
        `"attachment; filename=${fileName}"`
      );
      file.pipe(res);
    });

    archive.on("error", function (archive_error) {
      throw archive_error;
    });

    archive.pipe(output);
    archive.directory(`${CURR_DIR}/${folderName}`, false);
    archive.finalize();
  } catch (err) {
    addToLogFile(API_NAMES.MODULE_GENERATOR, err);
    res.status(500).send("Could not create module folder." + err);
  }
};

const createModule = async (req) => {
  const apiUrl = req?.["apiUrl"];
  const apiType = req?.["apiType"] || API_TYPE.REST;
  const appType = req?.["applicationType"] || APP_TYPE.CARRIER_APP;
  const appTypeHash = getHashedName(appType);
  const methodsAnswers = req?.["methods"] || [DEFAULT_VALUES.METHODS];
  const useTryCatch = req?.["useTryCatch"] || false;
  const trackingUrl = req?.["trackingUrl"];
  const clientWebSite = req?.["clientWebSite"];
  const projectNameValue = req?.["name"] || DEFAULT_VALUES.CARRIER_NAME;
  const projectName = projectNameValue.replace(/[^A-Za-z0-9]/g, "");
  const capitalizeProjectName = getCapitalValue(projectName);
  const projectFolder =
    req?.["folderName"]?.toLowerCase() ||
    projectName?.toLowerCase() ||
    DEFAULT_VALUES.CARRIER_FOLDER;
  const serviceAnswers = getArrayWithUniqueValues(
    req?.["services"] || DEFAULT_VALUES.SERVICES
  );
  const packageAnswers = getArrayWithUniqueValues(
    req?.["packaging"] || DEFAULT_VALUES.PACKAGING
  );
  const carrierDescription =
    req?.["carrierDescription"] ||
    DEFAULT_VALUES.CARRIER_DESCRIPTION + projectNameValue;
  const shouldOverwriteContents = req?.["overwriteFolderIfExists"] || true;

  CURR_DIR =
    appType === APP_TYPE.CARRIER_APP
      ? DEFAULT_DIRECTORIES.CARRIER_APP
      : DEFAULT_DIRECTORIES.ORDER_APP;

  // If folder doesn't exist, create the project in module-generator folder
  if (!fs.existsSync(CURR_DIR)) {
    CURR_DIR = DEFAULT_DIRECTORIES.DEFAULT_DESTINATION;
  }

  // Constant that stores the PathName of where the project files will be created
  const targetPath = path.join(CURR_DIR, projectFolder);

  if (!(await createProjectDir(targetPath, shouldOverwriteContents))) {
    throw new Error(
      "Operation cancelled. Directory already exists. To overwrite the existing folder, send overwriteFolderIfExists: true."
    );
  }

  if (appType === APP_TYPE.CARRIER_APP) {
    DEFF_DIR = path.join(targetPath, "src", "definitions", "project-name");
    NEW_DEFF_DIR = path.join(targetPath, "src", "definitions", projectFolder);
  }

  // Logic to select the template used to create files depending on application type
  const connectorFilesPath = path.join(__dirname, "templates", appTypeHash);

  // Path to the tests template folder
  const testTemplatesPath = path.join(
    __dirname,
    "templates",
    "tests",
    appTypeHash
  );

  // Options used for general file and folder creation
  const options = {
    apiUrl,
    apiType,
    targetPath,
    useTryCatch,
    trackingUrl,
    projectName,
    clientWebSite,
    projectFolder,
    methodsAnswers,
    projectNameValue,
    carrierDescription,
    capitalizeProjectName,
    appType: appTypeHash,
    currentFolder: projectFolder,
    servicesAnswers: serviceAnswers,
    templatePath: connectorFilesPath,
    packagingAnswers: packageAnswers
  };
  const testFolderPath = path.join(projectFolder, "test");
  const definitionTestFolderPath = path.join(targetPath, "test", "definitions");

  // Creates the contents of the directory
  createDirectoryContents(connectorFilesPath, options, CURR_DIR);

  //Create Package & Service definitions
  createDefinitions(
    options.projectFolder,
    serviceAnswers,
    CURR_DIR,
    true,
    path.join(__dirname, "templates")
  );
  createDefinitions(
    options.projectFolder,
    packageAnswers,
    CURR_DIR,
    false,
    path.join(__dirname, "templates")
  );

  // If there are methods selected, calls function that creates the methods
  createMethods(
    appTypeHash,
    options,
    methodsAnswers,
    CURR_DIR,
    path.join(__dirname, "templates")
  );

  createTests(
    testTemplatesPath,
    {
      ...options,
      currentFolder: testFolderPath
    },
    methodsAnswers,
    CURR_DIR,
    PKG_TEST_CREATED,
    SERVICE_TEST_CREATED
  );

  if (appType === APP_TYPE.CARRIER_APP) {
    await renameFile(`${DEFF_DIR}.ts`, `${NEW_DEFF_DIR}.ts`);
    await renameFile(
      `${definitionTestFolderPath}/project-name.test.ts`,
      `${definitionTestFolderPath}/${options.projectFolder}.test.ts`
    );
  }

  //Creates models and mock responses if JSON or XML request/responses are provided in the src/apiData folder
  createModelInterfaces(
    path.join(__dirname, "apiData"),
    path.join(CURR_DIR, projectFolder, "src", "api"),
    apiType
  );

  addToLogFile(
    API_NAMES.MODULE_GENERATOR,
    `Module folder created at: ${targetPath}`
  );
};

module.exports = {
  getCarrier
};
