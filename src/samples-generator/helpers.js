const Excel = require("exceljs"),
  flatten = require("flat"),
  fs = require("fs"),
  path = require("path"),
  shell = require("shelljs");
const config = require("../config.json").samplesGenerator;
const { addToLogFile } = require("../helpers/utils");
const { API_NAMES } = require("../helpers/constants");

var colIndex = 2;
var index;
var attributesCol = [];
var shipmentCol = [];
var workbook = new Excel.Workbook();

const getMostRecentFile = (dir) => {
  addToLogFile(API_NAMES.SAMPLES_GENERATOR, `Searching dir ${dir}`);
  if (fs.existsSync(dir)) {
    const files = orderRecentFiles(dir);
    return files.length ? files[0] : undefined;
  }
};

const orderRecentFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

const createFile = async (req) => {
  let responseTrackingNbr =
    JSON.parse(req.body.responseData)?.tracking_number || "";
  let requestData = JSON.parse(req.body.requestData);
  let caseName = req.body.name ?? requestData.service_code;
  let excelPath = `${req.body.samplesPath}/${
    req.body.moduleName
  }/Samples_${formatDate(Date.now())}`;
  let excelFilePath = excelPath + `/${req.body.moduleName}-samples.xlsx`;
  let methodName = req.body.url;
  methodName = methodName?.substring(methodName?.lastIndexOf("/") + 1);

  // Create the folder path in case it doesn't exist
  shell.mkdir("-p", excelPath);

  workbook = await readFromFile(excelFilePath, methodName);
  var worksheet = workbook.getWorksheet(methodName);
  attributesCol = worksheet.getColumn(1).values;
  let keyValues = Object.entries(flatten(requestData));
  let styleObj = { style: "thin", color: { argb: "ff1e1e15" } };

  keyValues.forEach((property) => {
    if (!attributesCol.includes(property[0])) {
      attributesCol.push(property[0]);
      worksheet.getColumn(1).values = attributesCol;
    }
  });

  attributesCol = worksheet.getColumn(1).values;

  colIndex = index;
  let keyVals = Object.entries(flatten(requestData));
  shipmentCol = [];
  keyVals.forEach((property) => {
    attributesCol.forEach((attribute) => {
      let attrIndex = attributesCol.indexOf(attribute);
      if (attribute == property[0]) {
        shipmentCol[attrIndex] = property[1];
      } else if (attribute === "response tracking_number") {
        shipmentCol[attrIndex] = responseTrackingNbr;
      } else if (attribute === "Attributes") {
        shipmentCol[attrIndex] = caseName;
      }
    });
  });

  worksheet.getRow(1).getCell(colIndex).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffffff4d" },
    bgColor: { argb: "ffffff4d" }
  };
  worksheet.getRow(1).getCell(colIndex).border = {
    top: styleObj,
    left: styleObj,
    bottom: styleObj,
    right: styleObj
  };

  worksheet.getColumn(colIndex).values = shipmentCol;
  worksheet.getColumn(colIndex).alignment = {
    horizontal: "left",
    vertical: "middle"
  };
  worksheet.getColumn(colIndex).width = 40;
  const table = worksheet.getTable("Samples");
  table.commit();
  await writeToFile(excelFilePath);
};

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
};

const readFromFile = async (path, worksheetName) => {
  var workbok;
  if (fs.existsSync(path)) {
    workbok = await workbook.xlsx.readFile(path);
    let workSheet = workbok.getWorksheet(worksheetName);
    if (workSheet) {
      index = workSheet.actualColumnCount + 1;
    } else {
      workbok = createNewWorksheet(workbok, worksheetName, true);
    }
  } else {
    workbok = createNewWorksheet(workbok, worksheetName);
  }
  return workbok;
};

const writeToFile = async (path) => {
  addToLogFile(
    API_NAMES.SAMPLES_GENERATOR,
    `Samples excel file created at location: ${path}`
  );
  await workbook.xlsx.writeFile(path);
};

const createNewWorksheet = (workbok, worksheetName, workBookExists = false) => {
  if (!workBookExists) {
    workbok = new Excel.Workbook();
  }
  var worksheet = workbok.addWorksheet(worksheetName);

  worksheet.addTable({
    name: "Samples",
    ref: "A1",
    headerRow: true,
    totalsRow: false,
    style: {
      theme: null,
      showRowStripes: true,
      showColumnStripes: true
    },
    columns: [{ name: "Attributes", style: { font: { bold: true } } }],
    rows: []
  });

  if (worksheetName.toLowerCase() == "createlabel") {
    worksheet.getRow(2).getCell(1).value = "response tracking_number";
    worksheet.getRow(2).getCell(1).style = { font: { bold: true } };
  }

  worksheet.getColumn(1).width = 57;
  worksheet.getColumn(1).style = { font: { bold: true } };
  worksheet.getRow(1).font = { bold: true };

  index = 2;
  return workbok;
};

const writeLabelFile = (path, documentObj) => {
  let numOfLabels = documentObj?.length || 0;

  if (numOfLabels > 0) {
    for (var i = 0; i < numOfLabels; i++) {
      let labelFormat = documentObj[i].format?.toLowerCase();

      fs[config.defaultMode](
        numOfLabels > 1
          ? `${path}${i}.${labelFormat}`
          : `${path}.${labelFormat}`,
        documentObj[i].data,
        "base64",
        (error) => {
          if (error) addToLogFile(API_NAMES.SAMPLES_GENERATOR, error);
          addToLogFile(API_NAMES.SAMPLES_GENERATOR, "Label saved!");
        }
      );
    }
  }
};

module.exports = {
  getMostRecentFile,
  createFile,
  writeLabelFile,
  formatDate
};
