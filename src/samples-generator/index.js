const {
  getMostRecentFile,
  createFile,
  writeLabelFile,
  formatDate
} = require("./helpers");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const dateTime = formatDate(Date.now());
const config = require("../config.json").samplesGenerator;
const { addToLogFile } = require("../helpers/utils");
const { API_NAMES, ERROR_MSGS } = require("../helpers/constants");

let folderPath = "";

const writeSample = async (req, res) => {
  try {
    var responseWritten = false,
      requestWritten = false;

    if (!req.body?.samplesPath) {
      res
        .status(400)
        .send("Sample generation failed. No path provided for samples folder.");
      return;
    }

    folderPath = `${req.body?.samplesPath}/${req.body.moduleName}/Samples_${dateTime}/${req.body.name}`;

    // Create the folder path in case it doesn't exist
    shell.mkdir("-p", folderPath);

    addToLogFile(
      API_NAMES.SAMPLES_GENERATOR,
      `Data is being stored at location: ${folderPath}`
    );
    let respData;

    try {
      respData = JSON.parse(req.body.responseData);
    } catch (e) {
      respData = req.body.responseData;
    }

    let extension = req.body.fileExtension || config.defaultFileExtension,
      fsMode = config.defaultMode,
      responseFileName = req.body.responseFileName ?? "response",
      requestFileName = req.body.requestFileName ?? "request",
      responseFilePath = `${path.join(
        folderPath,
        responseFileName
      )}.${extension}`,
      requestFilePath = `${path.join(
        folderPath,
        requestFileName
      )}.${extension}`,
      labelFilePath = path.join(folderPath, "label"),
      logFinalPath = `${path.join(folderPath, "logs")}.txt`,
      latestLogFilePath = path.join(req.body.logFilePath),
      options = req.body.options || undefined;

    if (req.body.generateResultsSheet) {
      await createFile(req);
    }

    const latestFile = getMostRecentFile(latestLogFilePath);

    if (latestFile) {
      latestLogFilePath = `${latestLogFilePath}\\${latestFile.file}`;

      fs.copyFile(latestLogFilePath, logFinalPath, function (err) {
        if (err) return console.error(err);
        addToLogFile(API_NAMES.SAMPLES_GENERATOR, "Log file moved!");
      });
    }

    if (respData?.documents) {
      writeLabelFile(labelFilePath, respData.documents);
    }

    if (respData?.packages) {
      for (var i = 0; i < respData.packages.length; i++) {
        let pkgLabelFilePath = path.join(folderPath, `pkg_${i + 1}_label`);
        writeLabelFile(pkgLabelFilePath, respData.packages[i].documents);
      }
    }

    fs[fsMode](
      responseFilePath,
      JSON.stringify(respData, null, 4),
      options,
      (err) => {
        if (err) {
          responseWritten = false;
          addToLogFile(err);
        } else {
          responseWritten = true;
          addToLogFile(
            API_NAMES.SAMPLES_GENERATOR,
            "Successfully wrote response file."
          );
        }
      }
    );

    fs[fsMode](requestFilePath, req.body.requestData, options, (err) => {
      if (err) {
        requestWritten = false;
        addToLogFile(API_NAMES.SAMPLES_GENERATOR, err);
        res.send(
          `Request file written: ${requestWritten}. Response file written: ${responseWritten}.`
        );
      } else {
        requestWritten = true;
        addToLogFile(
          API_NAMES.SAMPLES_GENERATOR,
          "Successfully wrote request file."
        );
        res.send(
          `Request file written: ${requestWritten}. Response file written: ${responseWritten}.`
        );
      }
    });
  } catch (error) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

module.exports = {
  writeSample
};
