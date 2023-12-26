const fs = require("fs");
const path = require("path");
const {
  trackChanges,
  updateAndSendZip,
  sendZip,
  isModified,
  getToolDetails
} = require("./helpers");

//Sends the zip file
function getTool(req, res) {
  try {
    const toolName = req.query.toolName;
    const toolDetails = getToolDetails(toolName);
    const trackedFolder = toolDetails?.folderPath;
    const trackingFileName = toolDetails?.trackingFile;
    const zipFileName = toolDetails?.zipFileName;

    const buffer = fs.readFileSync(path.join(__dirname, trackingFileName));
    const folderExists = fs.existsSync(trackedFolder);
    const oldDetails = buffer.length > 0 ? JSON.parse(buffer) : {};
    let newDetails = {};

    if (folderExists) {
      trackChanges(trackedFolder, newDetails);

      isModified(oldDetails, newDetails)
        ? updateAndSendZip(
            newDetails,
            trackingFileName,
            res,
            trackedFolder,
            zipFileName
          )
        : sendZip(res, path.join(__dirname, zipFileName + ".zip"), zipFileName);
    } else {
      sendZip(res, path.join(__dirname, zipFileName + ".zip"), zipFileName);
    }
  } catch (error) {
    res.status(500).send("An unexpected error occurred. " + error);
  }
}

//Returns the DateTime of when the zip file was last created
function getLastUpdatedInfo(req, res) {
  try {
    const toolName = req.query.toolName;
    const toolZipName = getToolDetails(toolName).zipFileName + ".zip";
    const zipPath = path.join(__dirname, toolZipName);

    if (fs.existsSync(zipPath)) {
      const stats = fs.statSync(zipPath);
      res.send(stats.mtime.toLocaleString());
    } else {
      res.send("No file available.");
    }
  } catch (error) {
    res.status(500).send("An unexpected error occurred. " + error);
  }
}

//Returns the json file with all tools' information (toolDetails.json). Can be updated to get this data from db in future.
function getToolsData(res) {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, "toolDetails.json"));
    const toolsData = buffer.length > 0 ? JSON.parse(buffer) : [];

    res.send(toolsData);
  } catch (error) {
    res.status(500).send("An unexpected error occurred. " + error);
  }
}

module.exports = { getTool, getLastUpdatedInfo, getToolsData };
