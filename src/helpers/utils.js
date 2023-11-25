const response_info = require("../../responses/info");
const winston = require("winston");
const path = require("path");
const fs = require("fs");
var handleRequest = require("supertest");

const getAPIInfo = (config) => {
  for (let i = 0; i < config.length; i++) {
    let match = response_info.info.findIndex((x) => x.name === config[i].name);

    response_info.info[match].status =
      config[i].status == 200 ? "Active" : "Inactive";
  }
  return response_info.info;
};

const getFormatDate = (date) => {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("");
};

const addToLogFile = (apiName, message) => {
  let logConfiguration = {
    transports: [
      new winston.transports.File({
        filename: "logs\\" + apiName + "\\" + getFormatDate(new Date()) + ".txt"
      })
    ]
  };
  const logger = winston.createLogger(logConfiguration);
  logger.info(message);
};

const clearLogFiles = (apiName, res) => {
  try {
    let pathToLogs = path.join("logs", apiName);
    if (fs.existsSync(pathToLogs)) {
      fs.readdirSync(pathToLogs).forEach((f) => fs.rm(`${pathToLogs}/${f}`));
    }
    res.send("Logs cleared!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLogFile = (apiName, res) => {
  try {
    let logs = fs.readFileSync(
      "logs\\" + apiName + "\\" + getFormatDate(new Date()) + ".txt"
    );
    res.send(logs);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getApiStatus = async (app, req, url) => {
  // req = {
  //   url: url,
  //   method: "GET"
  // };
  // return app._router.handle(req, res); //to call an internal endpoint of the same server
  //console.log(res.statusCode);
  //return res;

  var request = handleRequest(app)["get"](url);
  var res = await request.send();
  return res.statusCode;
};

module.exports = {
  getAPIInfo,
  addToLogFile,
  clearLogFiles,
  getApiStatus,
  getLogFile
};
