const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const server = http.createServer(app);
var cors = require('cors');

const {
  ENDPOINTS,
  API_NAMES,
  ERROR_MSGS,
  SERVICE_PATH,
  PERF_API_PATH,
  ADDRESS_API_PATH,
  SAMPLES_API_PATH,
  SUMO_LOGS_API_PATH,
  TOOL_DOWNLOADER_API_PATH,
  MODULE_GENERATOR_API_PATH,
  USEFUL_LINKS_API_PATH,
  CREDENTIALS_MANAGER_API_PATH
} = require('./helpers/constants');
const {
  getApiStatus,
  clearLogFiles,
  getLogFile,
  getAPIInfo
} = require('./helpers/utils');
const config = require('./config.json');
const { getCarrier } = require('./module-generator');
const { writeSample } = require('./samples-generator');
const { checkPerf } = require('./performance-calculator');
const { getAddress, addressCall } = require('./address-generator');
const { searchLogs, getMessagesForJob } = require('./sumo-logic');
const {
  getTool,
  getLastUpdatedInfo,
  getToolsData
} = require('./tool-downloader');
const { getUsefulLinks, addUsefulLink } = require('./useful-links');
const {
  getCredentials,
  addCredentials,
  deleteCredentials,
  updateCredentials
} = require('./credentials-manager');

// Change the limits according to your response size
app.use(bodyParser.json({ limit: '1500mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(cors({ origin: '*' }), function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

////#region SERVER
app.get('/', function (req, res) {
  res.send('OK!');
});

app.get(`${SERVICE_PATH}${ENDPOINTS.INFO}`, async function (req, res) {
  try {
    let config = [
      {
        status: await getApiStatus(app, req, ADDRESS_API_PATH),
        name: API_NAMES.ADDRESS_GENERATOR
      },
      {
        status: await getApiStatus(app, req, MODULE_GENERATOR_API_PATH),
        name: API_NAMES.MODULE_GENERATOR
      },
      {
        status: await getApiStatus(app, req, PERF_API_PATH),
        name: API_NAMES.PERF_CALCULATOR
      },
      {
        status: await getApiStatus(app, req, SAMPLES_API_PATH),
        name: API_NAMES.SAMPLES_GENERATOR
      },
      {
        status: await getApiStatus(app, req, SUMO_LOGS_API_PATH),
        name: API_NAMES.SUMO_LOGS_API
      }
    ];

    let resp = getAPIInfo(config);
    res.send(resp);
  } catch (err) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + err);
  }
});

app.get(SERVICE_PATH, function (req, res) {
  res.send('OK!');
});

server.listen(config.port, function () {
  console.log(
    `Listening at ${config.https ? 'https' : 'http'}://localhost:${config.port}`
  );
});
//#endregion SERVER

//#region ADDRESS GENERATOR
app.get(ADDRESS_API_PATH, function (req, res) {
  if (config.addressGenerator.isActive || false) {
    addressCall(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.get(
  `${ADDRESS_API_PATH}${ENDPOINTS.ADDRESS_API.GET_ADDRESS}`,
  function (req, res) {
    if (config.addressGenerator.isActive || false) {
      getAddress(req, res);
    } else {
      res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
    }
  }
);

app.post(`${ADDRESS_API_PATH}${ENDPOINTS.LOGS}`, function (req, res) {
  getLogFile(API_NAMES.ADDRESS_GENERATOR, res);
});

app.post(`${ADDRESS_API_PATH}${ENDPOINTS.CLEAR_LOGS}`, function (req, res) {
  clearLogFiles(API_NAMES.ADDRESS_GENERATOR, res);
});
//#endregion ADDRESS GENERATOR

//#region SAMPLES GENERATOR
app.get(SAMPLES_API_PATH, function (req, res) {
  if (config.samplesGenerator.isActive || false) {
    res.status(200).send('Samples OK!');
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.post(
  `${SAMPLES_API_PATH}${ENDPOINTS.SAMPLES_API.WRITE}`,
  async function (req, res) {
    if (config.samplesGenerator.isActive || false) {
      await writeSample(req, res);
    } else {
      res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
    }
  }
);

app.post(`${SAMPLES_API_PATH}${ENDPOINTS.LOGS}`, function (req, res) {
  getLogFile(API_NAMES.SAMPLES_GENERATOR, res);
});

app.post(`${SAMPLES_API_PATH}${ENDPOINTS.CLEAR_LOGS}`, function (req, res) {
  clearLogFiles(API_NAMES.SAMPLES_GENERATOR, res);
});
//#endregion SAMPLES GENERATOR

//#region PERFORMANCE CALCULATOR
app.get(PERF_API_PATH, function (req, res) {
  if (config.performanceCalculator.isActive || false) {
    res.send('PERF OK!');
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.post(
  `${PERF_API_PATH}${ENDPOINTS.PERF_API.TEST}`,
  jsonParser,
  function (req, res) {
    if (config.performanceCalculator.isActive || false) {
      checkPerf(req, res);
    } else {
      res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
    }
  }
);

app.post(`${PERF_API_PATH}${ENDPOINTS.LOGS}`, function (req, res) {
  getLogFile(API_NAMES.PERF_CALCULATOR, res);
});

app.post(`${PERF_API_PATH}${ENDPOINTS.CLEAR_LOGS}`, function (req, res) {
  clearLogFiles(API_NAMES.PERF_CALCULATOR, res);
});
//#endregion PERFORMANCE CALCULATOR

//#region MODULE_GENERATOR
app.get(MODULE_GENERATOR_API_PATH, function (req, res) {
  if (config.moduleGenerator.isActive || false) {
    res.send('Module Generator OK!');
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.post(
  `${MODULE_GENERATOR_API_PATH}${ENDPOINTS.MODULE_GENERATOR_API.CREATE}`,
  function (req, res) {
    if (config.moduleGenerator.isActive || false) {
      getCarrier(req, res);
    } else {
      res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
    }
  }
);

app.post(`${MODULE_GENERATOR_API_PATH}${ENDPOINTS.LOGS}`, function (req, res) {
  getLogFile(API_NAMES.MODULE_GENERATOR, res);
});

app.post(`${SAMPLES_API_PATH}${ENDPOINTS.CLEAR_LOGS}`, function (req, res) {
  clearLogFiles(API_NAMES.MODULE_GENERATOR, res);
});
//#endregion MODULE_GENERATOR

//#region TOOL DOWNLOADER
app.get(TOOL_DOWNLOADER_API_PATH, function (req, res) {
  if (config.toolDownloader.isActive || false) {
    getTool(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.get(
  `${TOOL_DOWNLOADER_API_PATH}${ENDPOINTS.TOOL_DOWNLOADER_API.GET_LAST_UPDATE_TIME}`,
  function (req, res) {
    if (config.toolDownloader.isActive || false) {
      getLastUpdatedInfo(req, res);
    } else {
      res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
    }
  }
);

app.get(
  `${TOOL_DOWNLOADER_API_PATH}${ENDPOINTS.TOOL_DOWNLOADER_API.GET_DETAILS}`,
  function (req, res) {
    if (config.toolDownloader.isActive || false) {
      getToolsData(res);
    } else {
      res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
    }
  }
);
//#endregion

//#region SUMO LOGS
app.get(SUMO_LOGS_API_PATH, function (req, res) {
  if (config.sumoLogsApi.isActive || false) {
    res.status(200).send('Sumo Logs OK!');
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.get(
  `${SUMO_LOGS_API_PATH}${ENDPOINTS.SUMO_LOGS_API.GET_JOB_MESSAGES}`,
  function (req, res) {
    getMessagesForJob(req, res);
  }
);

app.post(
  `${SUMO_LOGS_API_PATH}${ENDPOINTS.SUMO_LOGS_API.SEARCH_LOGS}`,
  function (req, res, next) {
    searchLogs(req, res, next);
  }
);
//#endregion

//#region USEFUL LINKS
app.get(USEFUL_LINKS_API_PATH, function (req, res) {
  if (config.usefulLinksApi.isActive || false) {
    getUsefulLinks(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.post(USEFUL_LINKS_API_PATH, function (req, res) {
  if (config.usefulLinksApi.isActive || false) {
    addUsefulLink(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});
//#endregion USEFUL LINKS

//#region CREDENTIALS_MANAGER
app.get(CREDENTIALS_MANAGER_API_PATH, function (req, res) {
  if (config.seCredentialsApi.isActive || false) {
    getCredentials(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.post(CREDENTIALS_MANAGER_API_PATH, function (req, res) {
  if (config.seCredentialsApi.isActive || false) {
    addCredentials(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.delete(`${CREDENTIALS_MANAGER_API_PATH}/:id`, function (req, res) {
  if (config.seCredentialsApi.isActive || false) {
    deleteCredentials(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});

app.put(`${CREDENTIALS_MANAGER_API_PATH}/:id`, function (req, res) {
  if (config.seCredentialsApi.isActive || false) {
    updateCredentials(req, res);
  } else {
    res.status(404).send(ERROR_MSGS.SERVICE_INACTIVE);
  }
});
//#endregion CREDENTIALS_MANAGER
