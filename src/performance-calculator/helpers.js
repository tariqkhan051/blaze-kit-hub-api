const axios = require("axios");

const handleScenarios = (requestObj, scenarios, iterationsCount, response) => {
  for (let i = 0; i < scenarios.length; i++) {
    let respCounter = 1;
    let respKey = "";
    let perfResult = "";
    const scenario = scenarios[i];
    var key = Object.keys(scenario)[0];
    var val = Object.values(scenario)[0];

    if (val) {
      console.log("Scenario " + i);
      perfResult = runPerf(iterationsCount, val, requestObj);
    } else {
      response.scenarios.push(getResponseObject("error", "code not found"));
      continue;
    }
    respKey = key ? key : val ? val : `scenario_${respCounter}`;
    response.scenarios.push(getResponseObject(respKey, perfResult));
    respCounter++;
  }
};

const handleEndpoints = (requestObj, endpoints, iterationsCount, response) => {
  for (let i = 0; i < endpoints.length; i++) {
    let respCounter = 1;
    let respKey = "";
    let perfResult = "";
    const endpoint = endpoints[i];
    var key = Object.keys(endpoint)[0];
    var val = Object.values(endpoint)[0];

    if (val) {
      console.log("Endpoint " + i);
      let url = val.url;

      if (url) {
        try {
          perfResult = runPerfOnApi(1, url, requestObj);
        } catch (e) {
          response.endpoints.push(getResponseObjectOfEndpoint("error", e));
          continue;
        }
      } else {
        response.endpoints.push(
          getResponseObjectOfEndpoint("error", "url not found")
        );
        continue;
      }
    } else {
      response.endpoints.push(
        getResponseObjectOfEndpoint("error", "url not found")
      );
      continue;
    }
    respKey = key ? key : `endpoint_${respCounter}`;
    response.endpoints.push(
      getResponseObjectOfEndpoint(respKey, {
        url: val,
        success: true,
        time: perfResult
      })
    );
    respCounter++;
  }
};

const executeJavaScriptCode = (stringValue, request) => {
  //console.log(evalWithContext(stringValue, request));
  eval(stringValue);
};

const runPerfOnApi = (iterationCount, url, request) => {
  var start = performance.now();
  for (let i = 0; i < iterationCount; i++) {
    callApi(url, request);
  }

  var duration = performance.now() - start;

  return duration;
};

const runPerf = (iterationCount, codeToExecute, request) => {
  //console.time(`"Scenario${scenarioCounter}"`);
  var start = performance.now();
  for (let i = 0; i < iterationCount; i++) {
    executeJavaScriptCode(codeToExecute, request);
  }
  //console.timeEnd(`"Scenario${scenarioCounter}"`);
  var duration = performance.now() - start;

  return duration;
};

const getResponseObject = (key, value) => {
  var jsObj = {};
  jsObj[key.toString()] = value.toString();
  return jsObj;
};

const getResponseObjectOfEndpoint = (key, value) => {
  var jsObj = {};
  jsObj[key.toString()] = value;
  return jsObj;
};

const callApi = (url, req) => {
  axios.post(url, req).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
};

module.exports = { handleScenarios, handleEndpoints };
