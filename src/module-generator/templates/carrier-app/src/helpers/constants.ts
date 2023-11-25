export const enum CarrierApiOperation {
<% uppercaseMethodsAnswers.forEach(function(method){-%>
  <%= method %> = "<%= method %>",
<% });%>}

export const BASE_URL =
  process.env.<%= projectNameValue.toUpperCase().replace(/[^A-Za-z0-9]/g, '_') %>_API_URL || "<%= apiUrl %>";

export const CARRIER_URL = "<%= clientWebSite %>";

export const TRACKING_URL ="<%= trackingUrl %>";

export const API_RESOURCES = Object.freeze({
<% uppercaseMethodsAnswers.forEach(function(method){-%>
    <%= method %> : "", 
<% });%>});

export const ERROR_MESSAGES = Object.freeze({
  UnableToGetResponse: "Unable to get response from API.",
  ErrorInResponseMapping: "Error occurred while mapping response. ",
  TrackingNumberRequired: "Tracking number is required.",
  EmptyVoidRequests: "Void requests can not be null or empty.",
  BaseErrorMsg: "Error received from <%= projectNameValue %> API: "
});

export const COUNTRIES = Object.freeze([
  {
    country: "Afghanistan",
    countryCode: "AF",
    numericCode: 4
  },
  {
    country: "Åland Islands",
    countryCode: "AX",
    numericCode: 248
  },
  {
    country: "Albania",
    countryCode: "AL",
    numericCode: 8
  },
  {
    country: "Algeria",
    countryCode: "DZ",
    numericCode: 12
  },
  {
    country: "American Samoa",
    countryCode: "AS",
    numericCode: 16
  },
  {
    country: "Andorra",
    countryCode: "AD",
    numericCode: 20
  },
  {
    country: "Angola",
    countryCode: "AO",
    numericCode: 24
  },
  {
    country: "Anguilla",
    countryCode: "AI",
    numericCode: 660
  },
  {
    country: "Antarctica",
    countryCode: "AQ",
    numericCode: 10
  },
  {
    country: "Antigua and Barbuda",
    countryCode: "AG",
    numericCode: 28
  },
  {
    country: "Argentina",
    countryCode: "AR",
    numericCode: 32
  },
  {
    country: "Armenia",
    countryCode: "AM",
    numericCode: 51
  },
  {
    country: "Aruba",
    countryCode: "AW",
    numericCode: 533
  },
  {
    country: "Australia",
    countryCode: "AU",
    numericCode: 36
  },
  {
    country: "Austria",
    countryCode: "AT",
    numericCode: 40
  },
  {
    country: "Azerbaijan",
    countryCode: "AZ",
    numericCode: 31
  },
  {
    country: "Bahamas",
    countryCode: "BS",
    numericCode: 44
  },
  {
    country: "Bahrain",
    countryCode: "BH",
    numericCode: 48
  },
  {
    country: "Bangladesh",
    countryCode: "BD",
    numericCode: 50
  },
  {
    country: "Barbados",
    countryCode: "BB",
    numericCode: 52
  },
  {
    country: "Belarus",
    countryCode: "BY",
    numericCode: 112
  },
  {
    country: "Belgium",
    countryCode: "BE",
    numericCode: 56
  },
  {
    country: "Belize",
    countryCode: "BZ",
    numericCode: 84
  },
  {
    country: "Benin",
    countryCode: "BJ",
    numericCode: 204
  },
  {
    country: "Bermuda",
    countryCode: "BM",
    numericCode: 60
  },
  {
    country: "Bhutan",
    countryCode: "BT",
    numericCode: 64
  },
  {
    country: "Bolivia (Plurinational State of)",
    countryCode: "BO",
    numericCode: 68
  },
  {
    country: "Bonaire, Sint Eustatius and Saba",
    countryCode: "BQ",
    numericCode: 535
  },
  {
    country: "Bosnia and Herzegovina",
    countryCode: "BA",
    numericCode: 70
  },
  {
    country: "Botswana",
    countryCode: "BW",
    numericCode: 72
  },
  {
    country: "Bouvet Island",
    countryCode: "BV",
    numericCode: 74
  },
  {
    country: "Brazil",
    countryCode: "BR",
    numericCode: 76
  },
  {
    country: "British Indian Ocean Territory",
    countryCode: "IO",
    numericCode: 86
  },
  {
    country: "Brunei Darussalam",
    countryCode: "BN",
    numericCode: 96
  },
  {
    country: "Bulgaria",
    countryCode: "BG",
    numericCode: 100
  },
  {
    country: "Burkina Faso",
    countryCode: "BF",
    numericCode: 854
  },
  {
    country: "Burundi",
    countryCode: "BI",
    numericCode: 108
  },
  {
    country: "Cabo Verde",
    countryCode: "CV",
    numericCode: 132
  },
  {
    country: "Cambodia",
    countryCode: "KH",
    numericCode: 116
  },
  {
    country: "Cameroon",
    countryCode: "CM",
    numericCode: 120
  },
  {
    country: "Canada",
    countryCode: "CA",
    numericCode: 124
  },
  {
    country: "Cayman Islands",
    countryCode: "KY",
    numericCode: 136
  },
  {
    country: "Central African Republic",
    countryCode: "CF",
    numericCode: 140
  },
  {
    country: "Chad",
    countryCode: "TD",
    numericCode: 148
  },
  {
    country: "Chile",
    countryCode: "CL",
    numericCode: 152
  },
  {
    country: "China",
    countryCode: "CN",
    numericCode: 156
  },
  {
    country: "Christmas Island",
    countryCode: "CX",
    numericCode: 162
  },
  {
    country: "Cocos (Keeling) Islands",
    countryCode: "CC",
    numericCode: 166
  },
  {
    country: "Colombia",
    countryCode: "CO",
    numericCode: 170
  },
  {
    country: "Comoros",
    countryCode: "KM",
    numericCode: 174
  },
  {
    country: "Congo",
    countryCode: "CG",
    numericCode: 178
  },
  {
    country: "Congo, Democratic Republic of the",
    countryCode: "CD",
    numericCode: 180
  },
  {
    country: "Cook Islands",
    countryCode: "CK",
    numericCode: 184
  },
  {
    country: "Costa Rica",
    countryCode: "CR",
    numericCode: 188
  },
  {
    country: "Côte d'Ivoire",
    countryCode: "CI",
    numericCode: 384
  },
  {
    country: "Croatia",
    countryCode: "HR",
    numericCode: 191
  },
  {
    country: "Cuba",
    countryCode: "CU",
    numericCode: 192
  },
  {
    country: "Curaçao",
    countryCode: "CW",
    numericCode: 531
  },
  {
    country: "Cyprus",
    countryCode: "CY",
    numericCode: 196
  },
  {
    country: "Czechia",
    countryCode: "CZ",
    numericCode: 203
  },
  {
    country: "Denmark",
    countryCode: "DK",
    numericCode: 208
  },
  {
    country: "Djibouti",
    countryCode: "DJ",
    numericCode: 262
  },
  {
    country: "Dominica",
    countryCode: "DM",
    numericCode: 212
  },
  {
    country: "Dominican Republic",
    countryCode: "DO",
    numericCode: 214
  },
  {
    country: "Ecuador",
    countryCode: "EC",
    numericCode: 218
  },
  {
    country: "Egypt",
    countryCode: "EG",
    numericCode: 818
  },
  {
    country: "El Salvador",
    countryCode: "SV",
    numericCode: 222
  },
  {
    country: "Equatorial Guinea",
    countryCode: "GQ",
    numericCode: 226
  },
  {
    country: "Eritrea",
    countryCode: "ER",
    numericCode: 232
  },
  {
    country: "Estonia",
    countryCode: "EE",
    numericCode: 233
  },
  {
    country: "Eswatini",
    countryCode: "SZ",
    numericCode: 748
  },
  {
    country: "Ethiopia",
    countryCode: "ET",
    numericCode: 231
  },
  {
    country: "Falkland Islands (Malvinas)",
    countryCode: "FK",
    numericCode: 238
  },
  {
    country: "Faroe Islands",
    countryCode: "FO",
    numericCode: 234
  },
  {
    country: "Fiji",
    countryCode: "FJ",
    numericCode: 242
  },
  {
    country: "Finland",
    countryCode: "FI",
    numericCode: 246
  },
  {
    country: "France",
    countryCode: "FR",
    numericCode: 250
  },
  {
    country: "French Guiana",
    countryCode: "GF",
    numericCode: 254
  },
  {
    country: "French Polynesia",
    countryCode: "PF",
    numericCode: 258
  },
  {
    country: "French Southern Territories",
    countryCode: "TF",
    numericCode: 260
  },
  {
    country: "Gabon",
    countryCode: "GA",
    numericCode: 266
  },
  {
    country: "Gambia",
    countryCode: "GM",
    numericCode: 270
  },
  {
    country: "Georgia",
    countryCode: "GE",
    numericCode: 268
  },
  {
    country: "Germany",
    countryCode: "DE",
    numericCode: 276
  },
  {
    country: "Ghana",
    countryCode: "GH",
    numericCode: 288
  },
  {
    country: "Gibraltar",
    countryCode: "GI",
    numericCode: 292
  },
  {
    country: "Greece",
    countryCode: "GR",
    numericCode: 300
  },
  {
    country: "Greenland",
    countryCode: "GL",
    numericCode: 304
  },
  {
    country: "Grenada",
    countryCode: "GD",
    numericCode: 308
  },
  {
    country: "Guadeloupe",
    countryCode: "GP",
    numericCode: 312
  },
  {
    country: "Guam",
    countryCode: "GU",
    numericCode: 316
  },
  {
    country: "Guatemala",
    countryCode: "GT",
    numericCode: 320
  },
  {
    country: "Guernsey",
    countryCode: "GG",
    numericCode: 831
  },
  {
    country: "Guinea",
    countryCode: "GN",
    numericCode: 324
  },
  {
    country: "Guinea-Bissau",
    countryCode: "GW",
    numericCode: 624
  },
  {
    country: "Guyana",
    countryCode: "GY",
    numericCode: 328
  },
  {
    country: "Haiti",
    countryCode: "HT",
    numericCode: 332
  },
  {
    country: "Heard Island and McDonald Islands",
    countryCode: "HM",
    numericCode: 334
  },
  {
    country: "Holy See",
    countryCode: "VA",
    numericCode: 336
  },
  {
    country: "Honduras",
    countryCode: "HN",
    numericCode: 340
  },
  {
    country: "Hong Kong",
    countryCode: "HK",
    numericCode: 344
  },
  {
    country: "Hungary",
    countryCode: "HU",
    numericCode: 348
  },
  {
    country: "Iceland",
    countryCode: "IS",
    numericCode: 352
  },
  {
    country: "India",
    countryCode: "IN",
    numericCode: 356
  },
  {
    country: "Indonesia",
    countryCode: "ID",
    numericCode: 360
  },
  {
    country: "Iran (Islamic Republic of)",
    countryCode: "IR",
    numericCode: 364
  },
  {
    country: "Iraq",
    countryCode: "IQ",
    numericCode: 368
  },
  {
    country: "Ireland",
    countryCode: "IE",
    numericCode: 372
  },
  {
    country: "Isle of Man",
    countryCode: "IM",
    numericCode: 833
  },
  {
    country: "Israel",
    countryCode: "IL",
    numericCode: 376
  },
  {
    country: "Italy",
    countryCode: "IT",
    numericCode: 380
  },
  {
    country: "Jamaica",
    countryCode: "JM",
    numericCode: 388
  },
  {
    country: "Japan",
    countryCode: "JP",
    numericCode: 392
  },
  {
    country: "Jersey",
    countryCode: "JE",
    numericCode: 832
  },
  {
    country: "Jordan",
    countryCode: "JO",
    numericCode: 400
  },
  {
    country: "Kazakhstan",
    countryCode: "KZ",
    numericCode: 398
  },
  {
    country: "Kenya",
    countryCode: "KE",
    numericCode: 404
  },
  {
    country: "Kiribati",
    countryCode: "KI",
    numericCode: 296
  },
  {
    country: "Korea (Democratic People's Republic of)",
    countryCode: "KP",
    numericCode: 408
  },
  {
    country: "Korea, Republic of",
    countryCode: "KR",
    numericCode: 410
  },
  {
    country: "Kuwait",
    countryCode: "KW",
    numericCode: 414
  },
  {
    country: "Kyrgyzstan",
    countryCode: "KG",
    numericCode: 417
  },
  {
    country: "Lao People's Democratic Republic",
    countryCode: "LA",
    numericCode: 418
  },
  {
    country: "Latvia",
    countryCode: "LV",
    numericCode: 428
  },
  {
    country: "Lebanon",
    countryCode: "LB",
    numericCode: 422
  },
  {
    country: "Lesotho",
    countryCode: "LS",
    numericCode: 426
  },
  {
    country: "Liberia",
    countryCode: "LR",
    numericCode: 430
  },
  {
    country: "Libya",
    countryCode: "LY",
    numericCode: 434
  },
  {
    country: "Liechtenstein",
    countryCode: "LI",
    numericCode: 438
  },
  {
    country: "Lithuania",
    countryCode: "LT",
    numericCode: 440
  },
  {
    country: "Luxembourg",
    countryCode: "LU",
    numericCode: 442
  },
  {
    country: "Macao",
    countryCode: "MO",
    numericCode: 446
  },
  {
    country: "Madagascar",
    countryCode: "MG",
    numericCode: 450
  },
  {
    country: "Malawi",
    countryCode: "MW",
    numericCode: 454
  },
  {
    country: "Malaysia",
    countryCode: "MY",
    numericCode: 458
  },
  {
    country: "Maldives",
    countryCode: "MV",
    numericCode: 462
  },
  {
    country: "Mali",
    countryCode: "ML",
    numericCode: 466
  },
  {
    country: "Malta",
    countryCode: "MT",
    numericCode: 470
  },
  {
    country: "Marshall Islands",
    countryCode: "MH",
    numericCode: 584
  },
  {
    country: "Martinique",
    countryCode: "MQ",
    numericCode: 474
  },
  {
    country: "Mauritania",
    countryCode: "MR",
    numericCode: 478
  },
  {
    country: "Mauritius",
    countryCode: "MU",
    numericCode: 480
  },
  {
    country: "Mayotte",
    countryCode: "YT",
    numericCode: 175
  },
  {
    country: "Mexico",
    countryCode: "MX",
    numericCode: 484
  },
  {
    country: "Micronesia (Federated States of)",
    countryCode: "FM",
    numericCode: 583
  },
  {
    country: "Moldova, Republic of",
    countryCode: "MD",
    numericCode: 498
  },
  {
    country: "Monaco",
    countryCode: "MC",
    numericCode: 492
  },
  {
    country: "Mongolia",
    countryCode: "MN",
    numericCode: 496
  },
  {
    country: "Montenegro",
    countryCode: "ME",
    numericCode: 499
  },
  {
    country: "Montserrat",
    countryCode: "MS",
    numericCode: 500
  },
  {
    country: "Morocco",
    countryCode: "MA",
    numericCode: 504
  },
  {
    country: "Mozambique",
    countryCode: "MZ",
    numericCode: 508
  },
  {
    country: "Myanmar",
    countryCode: "MM",
    numericCode: 104
  },
  {
    country: "Namibia",
    countryCode: "NA",
    numericCode: 516
  },
  {
    country: "Nauru",
    countryCode: "NR",
    numericCode: 520
  },
  {
    country: "Nepal",
    countryCode: "NP",
    numericCode: 524
  },
  {
    country: "Netherlands",
    countryCode: "NL",
    numericCode: 528
  },
  {
    country: "New Caledonia",
    countryCode: "NC",
    numericCode: 540
  },
  {
    country: "New Zealand",
    countryCode: "NZ",
    numericCode: 554
  },
  {
    country: "Nicaragua",
    countryCode: "NI",
    numericCode: 558
  },
  {
    country: "Niger",
    countryCode: "NE",
    numericCode: 562
  },
  {
    country: "Nigeria",
    countryCode: "NG",
    numericCode: 566
  },
  {
    country: "Niue",
    countryCode: "NU",
    numericCode: 570
  },
  {
    country: "Norfolk Island",
    countryCode: "NF",
    numericCode: 574
  },
  {
    country: "North Macedonia",
    countryCode: "MK",
    numericCode: 807
  },
  {
    country: "Northern Mariana Islands",
    countryCode: "MP",
    numericCode: 580
  },
  {
    country: "Norway",
    countryCode: "NO",
    numericCode: 578
  },
  {
    country: "Oman",
    countryCode: "OM",
    numericCode: 512
  },
  {
    country: "Pakistan",
    countryCode: "PK",
    numericCode: 586
  },
  {
    country: "Palau",
    countryCode: "PW",
    numericCode: 585
  },
  {
    country: "Palestine, State of",
    countryCode: "PS",
    numericCode: 275
  },
  {
    country: "Panama",
    countryCode: "PA",
    numericCode: 591
  },
  {
    country: "Papua New Guinea",
    countryCode: "PG",
    numericCode: 598
  },
  {
    country: "Paraguay",
    countryCode: "PY",
    numericCode: 600
  },
  {
    country: "Peru",
    countryCode: "PE",
    numericCode: 604
  },
  {
    country: "Philippines",
    countryCode: "PH",
    numericCode: 608
  },
  {
    country: "Pitcairn",
    countryCode: "PN",
    numericCode: 612
  },
  {
    country: "Poland",
    countryCode: "PL",
    numericCode: 616
  },
  {
    country: "Portugal",
    countryCode: "PT",
    numericCode: 620
  },
  {
    country: "Puerto Rico",
    countryCode: "PR",
    numericCode: 630
  },
  {
    country: "Qatar",
    countryCode: "QA",
    numericCode: 634
  },
  {
    country: "Réunion",
    countryCode: "RE",
    numericCode: 638
  },
  {
    country: "Romania",
    countryCode: "RO",
    numericCode: 642
  },
  {
    country: "Russian Federation",
    countryCode: "RU",
    numericCode: 643
  },
  {
    country: "Rwanda",
    countryCode: "RW",
    numericCode: 646
  },
  {
    country: "Saint Barthélemy",
    countryCode: "BL",
    numericCode: 652
  },
  {
    country: "Saint Helena, Ascension and Tristan da Cunha",
    countryCode: "SH",
    numericCode: 654
  },
  {
    country: "Saint Kitts and Nevis",
    countryCode: "KN",
    numericCode: 659
  },
  {
    country: "Saint Lucia",
    countryCode: "LC",
    numericCode: 662
  },
  {
    country: "Saint Martin (French part)",
    countryCode: "MF",
    numericCode: 663
  },
  {
    country: "Saint Pierre and Miquelon",
    countryCode: "PM",
    numericCode: 666
  },
  {
    country: "Saint Vincent and the Grenadines",
    countryCode: "VC",
    numericCode: 670
  },
  {
    country: "Samoa",
    countryCode: "WS",
    numericCode: 882
  },
  {
    country: "San Marino",
    countryCode: "SM",
    numericCode: 674
  },
  {
    country: "Sao Tome and Principe",
    countryCode: "ST",
    numericCode: 678
  },
  {
    country: "Saudi Arabia",
    countryCode: "SA",
    numericCode: 682
  },
  {
    country: "Senegal",
    countryCode: "SN",
    numericCode: 686
  },
  {
    country: "Serbia",
    countryCode: "RS",
    numericCode: 688
  },
  {
    country: "Seychelles",
    countryCode: "SC",
    numericCode: 690
  },
  {
    country: "Sierra Leone",
    countryCode: "SL",
    numericCode: 694
  },
  {
    country: "Singapore",
    countryCode: "SG",
    numericCode: 702
  },
  {
    country: "Sint Maarten (Dutch part)",
    countryCode: "SX",
    numericCode: 534
  },
  {
    country: "Slovakia",
    countryCode: "SK",
    numericCode: 703
  },
  {
    country: "Slovenia",
    countryCode: "SI",
    numericCode: 705
  },
  {
    country: "Solomon Islands",
    countryCode: "SB",
    numericCode: 90
  },
  {
    country: "Somalia",
    countryCode: "SO",
    numericCode: 706
  },
  {
    country: "South Africa",
    countryCode: "ZA",
    numericCode: 710
  },
  {
    country: "South Georgia and the South Sandwich Islands",
    countryCode: "GS",
    numericCode: 239
  },
  {
    country: "South Sudan",
    countryCode: "SS",
    numericCode: 728
  },
  {
    country: "Spain",
    countryCode: "ES",
    numericCode: 724
  },
  {
    country: "Sri Lanka",
    countryCode: "LK",
    numericCode: 144
  },
  {
    country: "Sudan",
    countryCode: "SD",
    numericCode: 729
  },
  {
    country: "Suriname",
    countryCode: "SR",
    numericCode: 740
  },
  {
    country: "Svalbard and Jan Mayen",
    countryCode: "SJ",
    numericCode: 744
  },
  {
    country: "Sweden",
    countryCode: "SE",
    numericCode: 752
  },
  {
    country: "Switzerland",
    countryCode: "CH",
    numericCode: 756
  },
  {
    country: "Syrian Arab Republic",
    countryCode: "SY",
    numericCode: 760
  },
  {
    country: "Taiwan, Province of China",
    countryCode: "TW",
    numericCode: 158
  },
  {
    country: "Tajikistan",
    countryCode: "TJ",
    numericCode: 762
  },
  {
    country: "Tanzania, United Republic of",
    countryCode: "TZ",
    numericCode: 834
  },
  {
    country: "Thailand",
    countryCode: "TH",
    numericCode: 764
  },
  {
    country: "Timor-Leste",
    countryCode: "TL",
    numericCode: 626
  },
  {
    country: "Togo",
    countryCode: "TG",
    numericCode: 768
  },
  {
    country: "Tokelau",
    countryCode: "TK",
    numericCode: 772
  },
  {
    country: "Tonga",
    countryCode: "TO",
    numericCode: 776
  },
  {
    country: "Trinidad and Tobago",
    countryCode: "TT",
    numericCode: 780
  },
  {
    country: "Tunisia",
    countryCode: "TN",
    numericCode: 788
  },
  {
    country: "Turkey",
    countryCode: "TR",
    numericCode: 792
  },
  {
    country: "Turkmenistan",
    countryCode: "TM",
    numericCode: 795
  },
  {
    country: "Turks and Caicos Islands",
    countryCode: "TC",
    numericCode: 796
  },
  {
    country: "Tuvalu",
    countryCode: "TV",
    numericCode: 798
  },
  {
    country: "Uganda",
    countryCode: "UG",
    numericCode: 800
  },
  {
    country: "Ukraine",
    countryCode: "UA",
    numericCode: 804
  },
  {
    country: "United Arab Emirates",
    countryCode: "AE",
    numericCode: 784
  },
  {
    country: "United Kingdom of Great Britain and Northern Ireland",
    countryCode: "GB",
    numericCode: 826
  },
  {
    country: "United States of America",
    countryCode: "US",
    numericCode: 840
  },
  {
    country: "United States Minor Outlying Islands",
    countryCode: "UM",
    numericCode: 581
  },
  {
    country: "Uruguay",
    countryCode: "UY",
    numericCode: 858
  },
  {
    country: "Uzbekistan",
    countryCode: "UZ",
    numericCode: 860
  },
  {
    country: "Vanuatu",
    countryCode: "VU",
    numericCode: 548
  },
  {
    country: "Venezuela (Bolivarian Republic of)",
    countryCode: "VE",
    numericCode: 862
  },
  {
    country: "Viet Nam",
    countryCode: "VN",
    numericCode: 704
  },
  {
    country: "Virgin Islands (British)",
    countryCode: "VG",
    numericCode: 92
  },
  {
    country: "Virgin Islands (U.S.)",
    countryCode: "VI",
    numericCode: 850
  },
  {
    country: "Wallis and Futuna",
    countryCode: "WF",
    numericCode: 876
  },
  {
    country: "Western Sahara",
    countryCode: "EH",
    numericCode: 732
  },
  {
    country: "Yemen",
    countryCode: "YE",
    numericCode: 887
  },
  {
    country: "Zambia",
    countryCode: "ZM",
    numericCode: 894
  },
  {
    country: "Zimbabwe",
    countryCode: "ZW",
    numericCode: 716
  }
]);