const SHIP_TO_FROM = {
  ship_to: {
    tax_identifiers: [
      {
        id: "string",
        type: "tin",
        registration_country: "string",
        description: "string"
      }
    ],
    name: "string",
    first_name: "string",
    last_name: "string",
    email: "string",
    phone_number: "string",
    company_name: "string",
    address_residential_indicator: "unknown",
    instructions: "string",
    address_metadata: {
      property1: "string",
      property2: "string"
    },
    address_lines: ["string"],
    city_locality: "string",
    state_province: "string",
    postal_code: "string",
    country_code: "string"
  }
};

const SUPPORTED_COUNTRIES = {
  Countries: {
    Country: [
      {
        country: "albania",
        code: "AL",
        URL: "URL/getAddress?countryCode=AL/"
      },
      {
        country: "Australia",
        code: "AU",
        URL: "URL/getAddress?countryCode=AU/"
      },
      {
        country: "Austria",
        code: "AT",
        URL: "URL/getAddress?countryCode=AT/"
      },
      {
        country: "Belgium",
        code: "BE",
        URL: "URL/getAddress?countryCode=BE/"
      },
      {
        country: "Bolivia",
        code: "BO",
        URL: "URL/getAddress?countryCode=BO/"
      },
      {
        country: "Botswana",
        code: "BW",
        URL: "URL/getAddress?countryCode=BW/"
      },
      {
        country: "Brasil",
        code: "BR",
        URL: "URL/getAddress?countryCode=BR/"
      },
      {
        country: "Brunei",
        code: "BN",
        URL: "URL/getAddress?countryCode=BN/"
      },
      {
        country: "bulgaria",
        code: "BG",
        URL: "URL/getAddress?countryCode=BG/"
      },
      {
        country: "cambodia",
        code: "KH",
        URL: "URL/getAddress?countryCode=KH/"
      },
      {
        country: "Canada",
        code: "CA",
        URL: "URL/getAddress?countryCode=CA/"
      },
      {
        country: "Chile",
        code: "CL",
        URL: "URL/getAddress?countryCode=CL/"
      },
      {
        country: "China",
        code: "CN",
        URL: "URL/getAddress?countryCode=CN/"
      },
      {
        country: "Colombia",
        code: "CO",
        URL: "URL/getAddress?countryCode=CO/"
      },
      {
        country: "Costa_Rica",
        code: "CR",
        URL: "URL/getAddress?countryCode=CR/"
      },
      {
        country: "Croatia",
        code: "HR",
        URL: "URL/getAddress?countryCode=HR/"
      },
      {
        country: "Cuba",
        code: "CU",
        URL: "URL/getAddress?countryCode=CU/"
      },
      {
        country: "Cyprus",
        code: "CY",
        URL: "URL/getAddress?countryCode=CY/"
      },
      {
        country: "Czechia",
        code: "CZ",
        URL: "URL/getAddress?countryCode=CZ/"
      },
      {
        country: "Denmark",
        code: "DK",
        URL: "URL/getAddress?countryCode=DK/"
      },
      {
        country: "DO",
        code: "",
        URL: "URL/getAddress?countryCode=DO/"
      },
      {
        country: "DR_Congo",
        code: "CD",
        URL: "URL/getAddress?countryCode=CD/"
      },
      {
        country: "Ecuador",
        code: "EC",
        URL: "URL/getAddress?countryCode=EC/"
      },
      {
        country: "Egypt",
        code: "EG",
        URL: "URL/getAddress?countryCode=EG/"
      },
      {
        country: "El_Salvador",
        code: "SV",
        URL: "URL/getAddress?countryCode=SV/"
      },
      {
        country: "Emirates",
        code: "AE",
        URL: "URL/getAddress?countryCode=AE/"
      },
      {
        country: "England",
        code: "GB-ENG",
        URL: "URL/getAddress?countryCode=England/"
      },
      {
        country: "Estonia",
        code: "EE",
        URL: "URL/getAddress?countryCode=EE/"
      },
      {
        country: "Ethiopia",
        code: "ET",
        URL: "URL/getAddress?countryCode=ET/"
      },
      {
        country: "Fiji",
        code: "FJ",
        URL: "URL/getAddress?countryCode=FJ/"
      },
      {
        country: "Finland",
        code: "FI",
        URL: "URL/getAddress?countryCode=FI/"
      },
      {
        country: "France",
        code: "FR",
        URL: "URL/getAddress?countryCode=FR/"
      },
      {
        country: "Gabon",
        code: "GA",
        URL: "URL/getAddress?countryCode=GA/"
      },
      {
        country: "Georgia",
        code: "GE",
        URL: "URL/getAddress?countryCode=GE/"
      },
      {
        country: "Germany",
        code: "DE",
        URL: "URL/getAddress?countryCode=DE/"
      },
      {
        country: "Ghana",
        code: "GH",
        URL: "URL/getAddress?countryCode=GH/"
      },
      {
        country: "Greece",
        code: "GR",
        URL: "URL/getAddress?countryCode=GR/"
      },
      {
        country: "Guatemala",
        code: "GT",
        URL: "URL/getAddress?countryCode=GT/"
      },
      {
        country: "Honduras",
        code: "HN",
        URL: "URL/getAddress?countryCode=HN/"
      },
      {
        country: "Hongkong",
        code: "HK",
        URL: "URL/getAddress?countryCode=HK/"
      },
      {
        country: "hungary",
        code: "HU",
        URL: "URL/getAddress?countryCode=HU/"
      },
      {
        country: "Iceland",
        code: "IS",
        URL: "URL/getAddress?countryCode=IS/"
      },
      {
        country: "India",
        code: "IN",
        URL: "URL/getAddress?countryCode=IN/"
      },
      {
        country: "Indonesia",
        code: "ID",
        URL: "URL/getAddress?countryCode=ID/"
      },
      {
        country: "Iran",
        code: "IR",
        URL: "URL/getAddress?countryCode=IR/"
      },
      {
        country: "Ireland",
        code: "IE",
        URL: "URL/getAddress?countryCode=IE/"
      },
      {
        country: "Isle_of_Man",
        code: "IM",
        URL: "URL/getAddress?countryCode=IM/"
      },
      {
        country: "Israel",
        code: "IL",
        URL: "URL/getAddress?countryCode=IL/"
      },
      {
        country: "Italia",
        code: "IT",
        URL: "URL/getAddress?countryCode=IT/"
      },
      {
        country: "Ivory_Coast",
        code: "CI",
        URL: "URL/getAddress?countryCode=CI/"
      },
      {
        country: "Jamaica",
        code: "JM",
        URL: "URL/getAddress?countryCode=JM/"
      },
      {
        country: "japan",
        code: "JP",
        URL: "URL/getAddress?countryCode=JP/"
      },
      {
        country: "Jordan",
        code: "JO",
        URL: "URL/getAddress?countryCode=JO/"
      },
      {
        country: "kazakhstan",
        code: "KZ",
        URL: "URL/getAddress?countryCode=KZ/"
      },
      {
        country: "Kenya",
        code: "KE",
        URL: "URL/getAddress?countryCode=KE/"
      },
      {
        country: "korea",
        code: "KR",
        URL: "URL/getAddress?countryCode=KR/"
      },
      {
        country: "Kuwait",
        code: "KW",
        URL: "URL/getAddress?countryCode=KW/"
      },
      {
        country: "Kyrgyzstan",
        code: "KG",
        URL: "URL/getAddress?countryCode=KG/"
      },
      {
        country: "Lebanon",
        code: "LB",
        URL: "URL/getAddress?countryCode=LB/"
      },
      {
        country: "Lesotho",
        code: "LS",
        URL: "URL/getAddress?countryCode=LS/"
      },
      {
        country: "Libya",
        code: "LY",
        URL: "URL/getAddress?countryCode=LY/"
      },
      {
        country: "Lithuania",
        code: "LT",
        URL: "URL/getAddress?countryCode=LT/"
      },
      {
        country: "Luxembourg",
        code: "LU",
        URL: "URL/getAddress?countryCode=LU/"
      },
      {
        country: "Madagascar",
        code: "MG",
        URL: "URL/getAddress?countryCode=MG/"
      },
      {
        country: "Malawi",
        code: "MW",
        URL: "URL/getAddress?countryCode=MW/"
      },
      {
        country: "Malaysia",
        code: "MY",
        URL: "URL/getAddress?countryCode=MY/"
      },
      {
        country: "Mali",
        code: "ML",
        URL: "URL/getAddress?countryCode=ML/"
      },
      {
        country: "Malta",
        code: "MT",
        URL: "URL/getAddress?countryCode=MT/"
      },
      {
        country: "Mauritius",
        code: "MU",
        URL: "URL/getAddress?countryCode=MU/"
      },
      {
        country: "Mexico",
        code: "MX",
        URL: "URL/getAddress?countryCode=MX/"
      },
      {
        country: "Monaco",
        code: "MC",
        URL: "URL/getAddress?countryCode=MC/"
      },
      {
        country: "Morocco",
        code: "MA",
        URL: "URL/getAddress?countryCode=MA/"
      },
      {
        country: "Myanmar",
        code: "MM",
        URL: "URL/getAddress?countryCode=MM/"
      },
      {
        country: "Namibia",
        code: "NA",
        URL: "URL/getAddress?countryCode=NA/"
      },
      {
        country: "Nepal",
        code: "NP",
        URL: "URL/getAddress?countryCode=NP/"
      },
      {
        country: "Netherlands",
        code: "NL",
        URL: "URL/getAddress?countryCode=NL/"
      },
      {
        country: "New_Zealand",
        code: "NZ",
        URL: "URL/getAddress?countryCode=NZ/"
      },
      {
        country: "Nicaragua",
        code: "NI",
        URL: "URL/getAddress?countryCode=NI/"
      },
      {
        country: "Nigeria",
        code: "NG",
        URL: "URL/getAddress?countryCode=NG/"
      },
      {
        country: "Norway",
        code: "NO",
        URL: "URL/getAddress?countryCode=NO/"
      },
      {
        country: "Oman",
        code: "OM",
        URL: "URL/getAddress?countryCode=OM/"
      },
      {
        country: "Pakistan",
        code: "PK",
        URL: "URL/getAddress?countryCode=PK/"
      },
      {
        country: "Panama",
        code: "PA",
        URL: "URL/getAddress?countryCode=PA/"
      },
      {
        country: "Papua_New_Guinea",
        code: "PG",
        URL: "URL/getAddress?countryCode=PG/"
      },
      {
        country: "Paraguay",
        code: "PY",
        URL: "URL/getAddress?countryCode=PY/"
      },
      {
        country: "Peru",
        code: "PE",
        URL: "URL/getAddress?countryCode=PE/"
      },
      {
        country: "Philippines",
        code: "PH",
        URL: "URL/getAddress?countryCode=PH/"
      },
      {
        country: "Poland",
        code: "PL",
        URL: "URL/getAddress?countryCode=PL/"
      },
      {
        country: "Portugal",
        code: "PT",
        URL: "URL/getAddress?countryCode=PT/"
      },
      {
        country: "Puerto_Rico",
        code: "PR",
        URL: "URL/getAddress?countryCode=PR/"
      },
      {
        country: "Qatar",
        code: "QA",
        URL: "URL/getAddress?countryCode=QA/"
      },
      {
        country: "Romania",
        code: "RO",
        URL: "URL/getAddress?countryCode=RO/"
      },
      {
        country: "russia",
        code: "RU",
        URL: "URL/getAddress?countryCode=RU/"
      },
      {
        country: "Rwanda",
        code: "RW",
        URL: "URL/getAddress?countryCode=RW/"
      },
      {
        country: "Saudi_Arabia",
        code: "SA",
        URL: "URL/getAddress?countryCode=SA/"
      },
      {
        country: "Scotland",
        code: "GB-SCT",
        URL: "URL/getAddress?countryCode=GB-SCT/"
      },
      {
        country: "Senegal",
        code: "SN",
        URL: "URL/getAddress?countryCode=SN/"
      },
      {
        country: "Singapore",
        code: "SG",
        URL: "URL/getAddress?countryCode=SG/"
      },
      {
        country: "Slovakia",
        code: "SK",
        URL: "URL/getAddress?countryCode=SK/"
      },
      {
        country: "Slovenia",
        code: "SI",
        URL: "URL/getAddress?countryCode=Slovenia/"
      },
      {
        country: "South_Africa",
        code: "ZA",
        URL: "URL/getAddress?countryCode=ZA/"
      },
      {
        country: "Spain",
        code: "ES",
        URL: "URL/getAddress?countryCode=ES/"
      },
      {
        country: "Sri_Lanka",
        code: "LK",
        URL: "URL/getAddress?countryCode=LK/"
      },
      {
        country: "Suriname",
        code: "SR",
        URL: "URL/getAddress?countryCode=SR/"
      },
      {
        country: "Sweden",
        code: "SE",
        URL: "URL/getAddress?countryCode=SE/"
      },
      {
        country: "Switzerland",
        code: "CH",
        URL: "URL/getAddress?countryCode=CH/"
      },
      {
        country: "Syria",
        code: "SY",
        URL: "URL/getAddress?countryCode=SY/"
      },
      {
        country: "taiwan",
        code: "TW",
        URL: "URL/getAddress?countryCode=TW/"
      },
      {
        country: "Tanzania",
        code: "TZ",
        URL: "URL/getAddress?countryCode=TZ/"
      },
      {
        country: "Thailand",
        code: "TH",
        URL: "URL/getAddress?countryCode=TH/"
      },
      {
        country: "Trinidad_and_Tobago",
        code: "TT",
        URL: "URL/getAddress?countryCode=TT/"
      },
      {
        country: "Turkey",
        code: "TR",
        URL: "URL/getAddress?countryCode=TR/"
      },
      {
        country: "Uganda",
        code: "UG",
        URL: "URL/getAddress?countryCode=UG/"
      },
      {
        country: "ukraine",
        code: "UA",
        URL: "URL/getAddress?countryCode=UA/"
      },
      {
        country: "United_Kingdom",
        code: "GB",
        URL: "URL/getAddress?countryCode=GB/"
      },
      {
        country: "Uruguay",
        code: "UY",
        URL: "URL/getAddress?countryCode=UY/"
      },
      {
        country: "usa",
        code: "US",
        URL: "URL/getAddress?countryCode=US/"
      },
      {
        country: "Uzbekistan",
        code: "UZ",
        URL: "URL/getAddress?countryCode=UZ/"
      },
      {
        country: "Venezuela",
        code: "VE",
        URL: "URL/getAddress?countryCode=VE/"
      },
      {
        country: "Vietnam",
        code: "VN",
        URL: "URL/getAddress?countryCode=VN/"
      },
      {
        country: "Yemen",
        code: "YE",
        URL: "URL/getAddress?countryCode=YE/"
      },
      {
        country: "Zambia",
        code: "ZM",
        URL: "URL/getAddress?countryCode=ZM/"
      },
      {
        country: "Zimbabwe",
        code: "ZW",
        URL: "URL/getAddress?countryCode=ZW/"
      }
    ]
  }
};
module.exports = { SHIP_TO_FROM, SUPPORTED_COUNTRIES };
