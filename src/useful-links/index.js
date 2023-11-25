const fs = require('fs');
const path = require('path');
const { ERROR_MSGS } = require('../helpers/constants');

const getUsefulLinks = (req, res) => {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, 'links.json'));
    const linksList = JSON.parse(buffer);
    res.send(linksList);
  } catch (error) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

const addUsefulLink = (req, res) => {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, 'links.json'));
    const linksList = JSON.parse(buffer);
    const linkToAdd = req.body;
    linksList.push(linkToAdd);

    fs.writeFileSync(
      path.join(__dirname, 'links.json'),
      JSON.stringify(linksList)
    );

    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

module.exports = {
  getUsefulLinks,
  addUsefulLink
};
