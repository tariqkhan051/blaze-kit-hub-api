const { processGetRequest } = require("./apiCommunicator");
const jsdom = require("jsdom");
const config = require("../config.json").addressGenerator;
const { addToLogFile } = require("../helpers/utils");
const { API_NAMES } = require("../helpers/constants");
const { SHIP_TO_FROM, SUPPORTED_COUNTRIES } = require("./templates");

const getAddressDetails = async (country) => {
  const address = {
    StateFull: "",
    City: "",
    Street: "",
    State: "",
    Doorplate: "",
    ZipCode: "",
    Postcode: "",
    Address: ""
  };
  try {
    var rawHtml = await processGetRequest(config.webUrl, country);
    var doc = new jsdom.JSDOM(rawHtml, "text/xml");
    var ul = doc.window.document.querySelectorAll("ul");

    var data = ul[1].querySelectorAll("li");
    for (let i = 0; i < data.length; i++) {
      let node = data[i].innerHTML;

      let filterData = node.includes("=") ? node.split("=") : node.split(":");
      let propName = filterData[0].replace(/(:|\s+)/g, "");
      if (address.hasOwnProperty(propName)) {
        address[propName] = filterData[1].trim();
      }
      addToLogFile(API_NAMES.ADDRESS_GENERATOR, node);
    }
  } catch (ex) {
    return ex;
  }
  return address;
};

const getPhoneNumber = async (country) => {
  var rawHtml = await processGetRequest(config.webUrl, `phone/${country}`);
  var doc = new jsdom.JSDOM(rawHtml, "text/xml");
  var phone = doc.window.document.getElementById("copyInput1")?.innerHTML;

  if (!this.isRetry && phone === undefined) {
    this.isRetry = true;
    phone = await getPhoneNumber(toPascalCase(country));
  }
  addToLogFile(API_NAMES.ADDRESS_GENERATOR, phone);
  return phone;
};

const toPascalCase = (string) => {
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), "-")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

const getNameEmail = async () => {
  var rawHtml = await processGetRequest("https://www.randomnamescopy.com");
  var doc = new jsdom.JSDOM(rawHtml, "text/xml");
  var name = doc.window.document.getElementById("selectable")?.innerHTML;
  var nameDetails = name?.split(" ");
  addToLogFile(API_NAMES.ADDRESS_GENERATOR, name);
  return {
    name: name,
    first_name: nameDetails?.[0],
    last_name: nameDetails?.[1],
    email: `${nameDetails?.[0]}@gmail.com`
  };
};

const getAddressObj = async (code) => {
  let country = getCountryName(code);
  let SE = SHIP_TO_FROM.ship_to;
  var address = await getAddressDetails(country);
  if (address.Address) {
    var nameEmail = await getNameEmail();
    var phone = await getPhoneNumber(country);
    SE = createTemplate(code, address, nameEmail, phone);
    addToLogFile(API_NAMES.ADDRESS_GENERATOR, SE);
    return SE;
  } else {
    return new Error("Please check supported countries list.");
  }
};

const getCountryName = (code) => {
  return (
    SUPPORTED_COUNTRIES.Countries.Country.find((ct) => {
      return ct.code.match(new RegExp(code, "i"));
    })?.country ?? 0
  );
};

const createTemplate = (country, address, nameEmail, phone) => {
  var addressLines = address.Address.split(",");
  return (SE = {
    name: nameEmail.name,
    first_name: nameEmail.first_name,
    last_name: nameEmail.last_name,
    email: nameEmail.email,
    phone_number: phone,
    state_province: address.StateFull == "" ? address.State : address.StateFull,
    city_locality: address.City,
    postal_code: address.Postcode == "" ? address.ZipCode : address.Postcode,
    country_code: country,
    address_lines: [
      addressLines[0]?.trim(),
      addressLines[1]?.trim(),
      addressLines[2]?.trim() + " " + (addressLines[3]?.trim() ?? "")
    ]
  });
};

module.exports = {
  toPascalCase,
  getAddressObj
};
