const { SUPPORTED_COUNTRIES } = require("./templates");
const { ERROR_MSGS } = require("../helpers/constants");
const { toPascalCase, getAddressObj } = require("./helpers");

const getAddress = async (req, res) => {
  try {
    var response = await getAddressObj(req.query.countryCode);
    if (response.message)
      res.status(400).json({ status: 400, message: response.message });
    else res.send(response);
  } catch (error) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

const addressCall = (req, res) => {
  try {
    const object = SUPPORTED_COUNTRIES.Countries;
    const country = object.Country.map((item) => ({
      country: toPascalCase(item.country),
      code: item.code
    }));

    res.send(`${JSON.stringify({ country }, null, 4)}`);
  } catch (error) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

module.exports = {
  getAddress,
  addressCall
};
