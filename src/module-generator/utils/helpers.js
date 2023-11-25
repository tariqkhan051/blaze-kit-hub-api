const X2JS = require("x2js");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const v4 = require("uuid").v4;
const template = require("./template");
const { addToLogFile } = require("../../helpers/utils");
const { API_NAMES } = require("../../helpers/constants");

const {
  API_TYPE,
  CARRIER_TEST_FILES,
  DEFINITIONS_TEST_FILES,
  SKIP_FILES,
  TEMPLATE_FILES
} = require("./constants");

const x2js = new X2JS();

const getHashedName = (str) => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join("-")
  );
};

const getCapitalValue = (method) => {
  return `${method.charAt(0).toUpperCase()}${method.slice(1)}`.replace(
    /\s/g,
    ""
  );
};

const getRootName = (text) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
};

const getArrayWithUniqueValues = (str) => {
  return removeDuplicates(
    str?.split(",")?.map(function (e) {
      return e.trim().replace(/[^a-zA-z0-9\s_\-()]/g, "");
    })
  );
};

const getCharacterAndNumbersOnly = (str) => {
  return str.replace(/[^a-zA-z0-9]/g, "");
};

const getGuid = () => {
  return v4().toString();
};

const createDirectoryIfNotPresent = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const renameFile = async (currentPath, targetPath) => {
  fs.rename(currentPath, targetPath, (error) => {
    if (error) {
      addToLogFile(API_NAMES.MODULE_GENERATOR, "No file was renamed");
    }
  });
};

const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const applyXOR = (case1, case2) => {
  return case1 !== case2;
};

const clearAndUpper = (text) => {
  return text.replace(/-/, "").toUpperCase();
};

const removeDuplicates = (arr) => {
  return arr?.filter(function (item, pos) {
    return arr.indexOf(item) == pos;
  });
};
const appId = getGuid();

const runCommand = (command) => {
  const result = shell.exec(command);
  return result.code === 0;
};

const createProjectDir = async (projectPath, shouldOverwriteContents) => {
  if (fs.existsSync(projectPath)) {
    if (shouldOverwriteContents === true) {
      fs.rmdirSync(projectPath, { recursive: true });
      fs.mkdirSync(projectPath, { recursive: true });
      return true;
    }
    return false;
  }
  fs.mkdirSync(projectPath, { recursive: true });
  return true;
};

const createModelInterfaces = (apiDataFolder, apiFolderPath, apiType) => {
  const filesToCreate = fs.readdirSync(apiDataFolder);
  const mockResponsesPath = path.join(apiFolderPath, "__mocks__", "responses");
  const modelsPath = path.join(apiFolderPath, "models");
  addToLogFile(API_NAMES.MODULE_GENERATOR, "Please wait...");

  createDirectoryIfNotPresent(mockResponsesPath);
  createDirectoryIfNotPresent(modelsPath);

  filesToCreate.forEach((file) => {
    let modelFileName = file.substring(0, file.lastIndexOf("."));
    let interfaceName = getRootName(modelFileName);
    let dataFilePath = path.join(apiDataFolder, file);
    let fileContent = fs.readFileSync(dataFilePath).toString();
    let interfaceFilePath = path.join(modelsPath, `${modelFileName}.ts`);
    let xmlToJsonResult = "";

    if (fileContent !== "" && file !== TEMPLATE_FILES.TEMPORARY_FILE) {
      if (apiType !== API_TYPE.REST && !isJSON(fileContent)) {
        fileContent = `\`${fileContent}\``;
        dataFilePath = path.join(apiDataFolder, TEMPLATE_FILES.TEMPORARY_FILE);
        xmlToJsonResult = JSON.stringify(x2js.xml2js(fileContent), null, 4);
        fs.writeFileSync(dataFilePath, xmlToJsonResult);
      }

      if (
        applyXOR(
          isJSON(fileContent) && apiType !== API_TYPE.SOAP,
          isJSON(xmlToJsonResult) && apiType !== API_TYPE.REST
        )
      ) {
        //Command to create the interface files
        runCommand(
          `make_types -i ${interfaceFilePath} ${dataFilePath} ${interfaceName}`
        );
        if (modelFileName.includes("response")) {
          let finalContent = `export const ${interfaceName.replace(
            "Api",
            ""
          )}=`.concat(fileContent);
          fs.writeFileSync(
            `${mockResponsesPath}/${modelFileName.replace("api-", "")}.ts`,
            finalContent,
            "utf8"
          );
        }
      } else {
        addToLogFile(
          API_NAMES.MODULE_GENERATOR,
          `Wrong data format in file: ${dataFilePath}`
        );
      }
    }
  });
  //Remove the temp file created for XML model generation
  if (fs.existsSync(path.join(apiDataFolder, TEMPLATE_FILES.TEMPORARY_FILE))) {
    shell.rm(path.join(apiDataFolder, TEMPLATE_FILES.TEMPORARY_FILE));
  }
};

const createTests = (
  testsPath,
  options,
  inputArr,
  currDir,
  pkgTestCreated,
  svcTestCreated
) => {
  const filesToCreate = fs.readdirSync(testsPath);
  let mappedTests = [];

  if (
    options.currentFolder ===
    path.join(options.projectFolder, "test", "methods")
  ) {
    // Maps each file from answer array adding a .test.ts extension so it can be used to filter the selected files
    mappedTests = inputArr.map((test) => {
      return getHashedName(test) + ".test.ts";
    });
  }

  filesToCreate.forEach((file) => {
    // Gets the original file path
    const origFilePath = path.join(testsPath, file);
    // Get stats about the current file
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      // If the file wasn't selected on the methods array, it does not create the file
      if (!mappedTests.includes(file) && !CARRIER_TEST_FILES.includes(file))
        return;

      let contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = path.join(currDir, options.currentFolder, file);

      //Update the content in case of other test files
      if (DEFINITIONS_TEST_FILES.includes(file)) {
        let testOptions = {},
          testContent = "";

        if (file === TEMPLATE_FILES.PKG_TEST_FILE && !pkgTestCreated) {
          options.packagingAnswers?.forEach((obj) => {
            testOptions = {
              packageName: obj,
              packageNameWithoutSpaces:
                getCharacterAndNumbersOnly(obj) || "test"
            };
            testContent = template.renderContent(contents, testOptions);
            fs.writeFileSync(
              path.join(
                currDir,
                options.currentFolder,
                `${getHashedName(obj)}.test.ts`
              ),
              testContent,
              "utf8"
            );
          });
          pkgTestCreated = true;
        } else if (
          file === TEMPLATE_FILES.SERVICE_TEST_FILE &&
          !svcTestCreated
        ) {
          options.servicesAnswers?.forEach((obj) => {
            testOptions = {
              serviceName: obj,
              serviceNameWithoutSpaces:
                getCharacterAndNumbersOnly(obj) || "testSer"
            };
            testContent = template.renderContent(contents, testOptions);
            fs.writeFileSync(
              path.join(
                currDir,
                options.currentFolder,
                `${getHashedName(obj)}.test.ts`
              ),
              testContent,
              "utf8"
            );
          });
          svcTestCreated = true;
        } else {
          contents = template.renderContent(contents, options);
          fs.writeFileSync(writePath, contents, "utf8");
        }
      } else {
        fs.writeFileSync(writePath, contents, "utf8");
      }
    } else if (stats.isDirectory()) {
      if (!fs.existsSync(path.join(currDir, options.currentFolder, file))) {
        fs.mkdirSync(path.join(currDir, options.currentFolder, file), {
          recursive: true
        });
      }
      const dirOptions = {
        ...options,
        currentFolder: path.join(options.currentFolder, file)
      };
      createTests(
        path.join(testsPath, file),
        dirOptions,
        inputArr,
        currDir,
        pkgTestCreated,
        svcTestCreated
      );
    }
  });
};

const createDefinitions = (
  projectFolder,
  definitions,
  currDir,
  isService = false,
  templatePath
) => {
  const templateFile = path.join(
    templatePath,
    "mappings",
    "carrier-app",
    "definitions",
    `${isService ? TEMPLATE_FILES.SERVICE_BASE : TEMPLATE_FILES.PACKAGE_BASE}`
  );
  const definitionFolderPath = path.join(
    currDir,
    projectFolder,
    "src",
    "definitions",
    `${isService ? "shipping-services" : "packaging"}`
  );

  definitions.forEach((def) => {
    const finalPath = path.join(
      definitionFolderPath,
      `${getHashedName(def)}.ts`
    );
    const definitionsId = getGuid();

    let fileContent = fs.readFileSync(templateFile, "utf8");
    const templateData = {
      definitionsId: definitionsId,
      packageName: isService ? undefined : def,
      serviceName: isService ? def : undefined
    };
    fileContent = template.renderContent(fileContent, templateData);

    fs.writeFileSync(finalPath, fileContent, "utf8");
  });
};

const createMethods = (
  appTypeHash,
  options,
  methods,
  currDir,
  templatePath
) => {
  const templateFolderPath = path.join(
    templatePath,
    "methods",
    `${appTypeHash}-base`
  );
  const filesToCreate = fs.readdirSync(templateFolderPath);

  filesToCreate.forEach((file) => {
    const templateFilePath = path.join(templateFolderPath, file);
    const stats = fs.statSync(templateFilePath);
    if (stats.isFile()) {
      methods.forEach((method) => {
        const methodHash = getHashedName(method);
        const methodFolderPath = path.join(
          currDir,
          options.projectFolder,
          `src/methods/${methodHash}`
        );

        if (!fs.existsSync(methodFolderPath)) {
          fs.mkdirSync(methodFolderPath, { recursive: true });
        }

        let writePath;

        if (file === TEMPLATE_FILES.CARRIER_APP_BASE) {
          writePath = path.join(methodFolderPath, `${methodHash}.ts`);
        } else if (file === TEMPLATE_FILES.CARRIER_REQUEST) {
          writePath = path.join(
            methodFolderPath,
            `${options.projectFolder}-${methodHash}-request.ts`
          );
        } else {
          writePath = path.join(methodFolderPath, `${file}`);
        }

        let fileContent = fs.readFileSync(templateFilePath, "utf8");
        const templateData = {
          upperCaseMethodName: method,
          useTryCatch: options.useTryCatch,
          capitalizeMethodName: getCapitalValue(method),
          methodHash: methodHash,
          capitalizeProjectName: options.capitalizeProjectName,
          projectName: options.projectName,
          projectFolder: options.projectFolder,
          capitalizeShipstationMethodName:
            methodHash === "track" ? "Tracking" : getCapitalValue(method)
        };
        fileContent = template.renderMethodFile(fileContent, templateData);

        fs.writeFileSync(writePath, fileContent, "utf8");
      });
    }
  });
};

const createDirectoryContents = (templatePath, options, currDir) => {
  const definitionsId = getGuid();
  // Read all files/folders (1 level) from template folder
  const filesToCreate = fs.readdirSync(templatePath);
  // Loop each file/folder
  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);
    // Get stats about the current file
    const stats = fs.statSync(origFilePath);
    const writePath = path.join(currDir, options.currentFolder, file);

    // Skip files and folders that should not be copied
    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      // Read file content
      let contents = fs.readFileSync(origFilePath, "utf8");
      // Adds the configuration info to the files using ejs (template engine) and uuidv4()
      contents = template.render(contents, {
        ...options,
        appId: appId,
        definitionsId: definitionsId,
        uppercaseMethodsAnswers: options.methodsAnswers.map(
          (method) =>
            `${method.substring(0, 1).toUpperCase()}${method.substring(1)}`
        ),
        splitMethodsAnswers: options.methodsAnswers.map(getHashedName),
        splitServicesAnswers: options.servicesAnswers?.map(getHashedName),
        splitPackagingAnswers: options.packagingAnswers?.map(getHashedName)
      });
      // Write file to destination folder
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      // Create folder in destination folder
      createDirectoryIfNotPresent(writePath);
      // Copy files/folder inside current folder recursively
      const dirOptions = {
        ...options,
        currentFolder: path.join(options.currentFolder, file)
      };
      createDirectoryContents(
        path.join(templatePath, file),
        dirOptions,
        currDir
      );
    }
  });
};

const deleteExistingModules = (currentDirectory) => {
  if (fs.existsSync(currentDirectory)) {
    fs.rmdirSync(currentDirectory, { recursive: true });
  }
};

module.exports = {
  getHashedName,
  getCapitalValue,
  getArrayWithUniqueValues,
  renameFile,
  runCommand,
  createProjectDir,
  createModelInterfaces,
  createTests,
  createDefinitions,
  createMethods,
  createDirectoryContents,
  deleteExistingModules
};
