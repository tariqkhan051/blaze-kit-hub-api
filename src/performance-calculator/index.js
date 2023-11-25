const { handleEndpoints, handleScenarios } = require("./helpers");
const { ERROR_MSGS } = require("../helpers/constants");

const checkPerf = (req, res) => {
  try {
    var requestObj = req?.body?.request ?? {};
    var scenarios = req?.body?.scenarios ?? [];
    var iterationsCount = req?.body?.iterationsCount ?? 1;
    var endpoints = req?.body?.endpoints ?? [];
    //console.log(JSON.stringify(requestObj));

    var response = {
      scenarios: [],
      endpoints: [],
      iterationsCount: iterationsCount
    };
    handleScenarios(requestObj, scenarios, iterationsCount, response);
    handleEndpoints(requestObj, endpoints, iterationsCount, response);
    res.send(response);
  } catch (error) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

module.exports = {
  checkPerf
};
