const SERVICE_PATH = '/api';
const PERF_API_PATH = `${SERVICE_PATH}/perf`;
const ADDRESS_API_PATH = `${SERVICE_PATH}/address`;
const SAMPLES_API_PATH = `${SERVICE_PATH}/samples`;
const MODULE_GENERATOR_API_PATH = `${SERVICE_PATH}/module-generator`;
const TOOL_DOWNLOADER_API_PATH = `${SERVICE_PATH}/tool`;
const SUMO_LOGS_API_PATH = `${SERVICE_PATH}/sumoLogs`;
const USEFUL_LINKS_API_PATH = `${SERVICE_PATH}/useful-links`;
const CREDENTIALS_MANAGER_API_PATH = `${SERVICE_PATH}/credentials-manager`;

const ENDPOINTS = {
  LOGS: '/logs',
  INFO: '/info',
  CLEAR_LOGS: '/logs/clear',
  ADDRESS_API: {
    GET_ADDRESS: '/getAddress'
  },
  SAMPLES_API: {
    WRITE: '/write'
  },
  PERF_API: {
    TEST: '/test'
  },
  MODULE_GENERATOR_API: {
    CREATE: '/create'
  },
  TOOL_DOWNLOADER_API: {
    GET_LAST_UPDATE_TIME: '/lastUpdate',
    GET_DETAILS: '/details'
  },
  SUMO_LOGS_API: {
    SEARCH_LOGS: '/search',
    GET_JOB_MESSAGES: '/getJobMessage/:id'
  }
};

const API_NAMES = {
  PERF_CALCULATOR: 'performance-calculator',
  ADDRESS_GENERATOR: 'address-generator',
  SAMPLES_GENERATOR: 'samples-generator',
  MODULE_GENERATOR: 'module-generator',
  SUMO_LOGS_API: 'sumo-logic-api'
};

const ERROR_MSGS = {
  SERVICE_INACTIVE: 'This service is currently unavailable.',
  ERROR_OCCURRED: 'An error occurred. ',
  BAD_REQUEST: 'Invalid request provided.'
};

module.exports = {
  ENDPOINTS,
  API_NAMES,
  ERROR_MSGS,
  SERVICE_PATH,
  PERF_API_PATH,
  ADDRESS_API_PATH,
  SAMPLES_API_PATH,
  SUMO_LOGS_API_PATH,
  USEFUL_LINKS_API_PATH,
  SE_CREDENTIALS_API_PATH: CREDENTIALS_MANAGER_API_PATH,
  TOOL_DOWNLOADER_API_PATH,
  MODULE_GENERATOR_API_PATH
};
