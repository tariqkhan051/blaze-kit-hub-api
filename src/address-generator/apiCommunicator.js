const axios = require("axios");
const { addToLogFile } = require("../helpers/utils");
const { API_NAMES } = require("../helpers/constants");

module.exports = {
  async processGetRequest(url, country = "") {
    try {
      let processingUrl = `${url}/${country}/`;
      let response = await axios.get(processingUrl);
      let rawHtml = response?.data;
      return rawHtml;
    } catch (err) {
      addToLogFile(API_NAMES.ADDRESS_GENERATOR, err);
    }
  }
};
