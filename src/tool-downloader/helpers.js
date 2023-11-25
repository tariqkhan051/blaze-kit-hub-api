const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const config = require("../config.json");

//Returns a json object containing the tracking info of tracked folder
const trackChanges = (searchPath, detailsObj) => {
  const filesInFolder = fs.readdirSync(searchPath);

  filesInFolder.forEach((file) => {
    const stats = fs.statSync(path.join(searchPath, file));

    if (stats.isDirectory()) {
      trackChanges(path.join(searchPath, file), detailsObj);
    }

    detailsObj[path.join(searchPath, file)] = stats.mtime;
  });
};

//Updates the tracked info, creates and sends a new zip file from the tracked folder
const updateAndSendZip = (
  trackInfo,
  trackingFileName,
  res,
  folderToArchive,
  zipFileName
) => {
  fs.writeFile(
    path.join(__dirname, trackingFileName),
    JSON.stringify(trackInfo),
    (error) => {
      if (error) throw error;
    }
  );

  const zipFileToSend = path.join(__dirname, zipFileName + ".zip");
  const output = fs.createWriteStream(zipFileToSend);
  const archive = archiver("zip");
  output.on("close", function () {
    sendZip(res, zipFileToSend, zipFileName);
  });

  archive.on("error", function (archive_error) {
    throw archive_error;
  });
  archive.pipe(output);
  archive.directory(folderToArchive, false);
  archive.finalize();
};

//Sends the existing zip file
const sendZip = (res, fileToSend, zipFileName) => {
  const file = fs.createReadStream(fileToSend);
  const stat = fs.statSync(fileToSend);

  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "arraybuffer");
  res.setHeader(
    "Content-Disposition",
    `"attachment; filename=${zipFileName}.zip"`
  );
  file.pipe(res);
};

//Checks if there is any difference between the existing and newly tracked info
function isModified(oldDetails, newDetails) {
  const oldDetailsCount = Object.entries(oldDetails)?.length || 0;
  const newDetailsCount = Object.entries(newDetails)?.length || 0;

  const isFolderModified =
    oldDetailsCount !== newDetailsCount ||
    JSON.stringify(getSortedObject(oldDetails)) !==
      JSON.stringify(getSortedObject(newDetails));

  return isFolderModified;
}

//Sorts the json object alphabetically
function getSortedObject(jsonObj) {
  const sortedObj = Object.keys(jsonObj)
    .sort()
    .reduce((acc, currValue) => {
      acc[currValue] = jsonObj[currValue];
      return acc;
    }, {});
  return sortedObj;
}

//Returns the config object for the tool
function getToolDetails(toolName) {
  const allToolDetails = config.toolDownloader.toolDetails;
  const result = allToolDetails?.find(
    (toolDetail) =>
      toolDetail?.toolName?.toLowerCase() === toolName?.toLowerCase()
  );
  return result;
}

module.exports = {
  trackChanges,
  updateAndSendZip,
  sendZip,
  isModified,
  getToolDetails
};
