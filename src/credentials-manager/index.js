const fs = require('fs');
const path = require('path');
const { ERROR_MSGS } = require('../helpers/constants');
const { randomUUID } = require('crypto');

const getCredentials = (req, res) => {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, 'credentials.json'));
    const credentials = JSON.parse(buffer);

    res.send(credentials);
  } catch (error) {
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

const addCredentials = (req, res) => {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, 'credentials.json'));
    const credentials = JSON.parse(buffer);
    const body = req.body;

    if (body) {
      const credentialsToAdd = {
        id: randomUUID(),
        name: body.name || '',
        integrationName: body.integrationName || '',
        originCountry: body.originCountry || '',
        devUsername: body.devUsername || '',
        devPassword: body.devPassword || '',
        stagingUsername: body.stagingUsername || '',
        stagingPassword: body.stagingPassword || '',
        lastUpdated: new Date()
      };

      credentials.push(credentialsToAdd);

      fs.writeFileSync(
        path.join(__dirname, 'credentials.json'),
        JSON.stringify(credentials)
      );

      res.send();
    } else {
      res.status(400).send(ERROR_MSGS.BAD_REQUEST);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

const deleteCredentials = (req, res) => {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, 'credentials.json'));
    const credentials = JSON.parse(buffer);
    const credentialsToDelete = req.params.id;

    if (credentialsToDelete) {
      const result = credentials.filter((object) => {
        return object.id !== credentialsToDelete;
      });

      fs.writeFileSync(
        path.join(__dirname, 'credentials.json'),
        JSON.stringify(result)
      );

      res.send();
    } else {
      res.status(400).send(ERROR_MSGS.BAD_REQUEST);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

const updateCredentials = (req, res) => {
  try {
    const buffer = fs.readFileSync(path.join(__dirname, 'credentials.json'));
    const credentials = JSON.parse(buffer);
    const updateRecordId = req.params.id;
    const updateRequestBody = req.body;

    if (updateRequestBody) {
      const otherCredentials = credentials.filter(
        (object) => object.id != updateRecordId
      );

      const existingCredentials = credentials.filter(
        (object) => object.id == updateRecordId
      );

      const replaceObject = {
        id: updateRecordId,
        name: updateRequestBody.name || existingCredentials.name,
        integrationName:
          updateRequestBody.integrationName ||
          existingCredentials.integrationName,
        originCountry:
          updateRequestBody.originCountry || existingCredentials.originCountry,
        devUsername:
          updateRequestBody.devUsername || existingCredentials.devUsername,
        devPassword:
          updateRequestBody.devPassword || existingCredentials.devPassword,
        stagingUsername:
          updateRequestBody.stagingUsername ||
          existingCredentials.stagingUsername,
        stagingPassword:
          updateRequestBody.stagingPassword ||
          existingCredentials.stagingPassword,
        lastUpdated: new Date()
      };

      otherCredentials.push(replaceObject);

      fs.writeFileSync(
        path.join(__dirname, 'credentials.json'),
        JSON.stringify(otherCredentials)
      );

      res.send();
    } else {
      res.status(400).send(ERROR_MSGS.BAD_REQUEST);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(ERROR_MSGS.ERROR_OCCURRED + error.message);
  }
};

module.exports = {
  getCredentials,
  addCredentials,
  deleteCredentials,
  updateCredentials,
};
