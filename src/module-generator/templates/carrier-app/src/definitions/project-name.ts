import {
  Carrier,
  LabelSizesEnum,
  LabelFormatsEnum,
  ShippingOptionEnum,
  ConfirmationTypeEnum
} from "@shipengine/connect-carrier-api";
import { join } from "path";
import {<% servicesAnswers.forEach(function(answer) { %>
  <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
} from "./shipping-services";
import {<% packagingAnswers.forEach(function(answer) { %>
  <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
} from "./packaging";
import { CARRIER_URL, TRACKING_URL } from "../helpers/constants";
import { RegistrationFormSchema } from "./forms/registration-form";
import { SettingsFormSchema } from "./forms/settings-form";

export const <%= capitalizeProjectName %>Carrier: Carrier = {
  Id: "<%= definitionsId %>",
  Name: "<%= projectNameValue %>",
  Description: "<%= carrierDescription %>",
  ShippingServices: [<% servicesAnswers.forEach(function(answer) { %>
    <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
  ],
  PackageTypes: [<% packagingAnswers.forEach(function(answer) { %>
    <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
  ],
  DefaultSupportedCountries: [
    {
      FromCountry: ""
    }
  ],
  DefaultLabelSizes: [LabelSizesEnum.Inches4x6],
  LabelFormats: [
    LabelFormatsEnum.PDF,
    LabelFormatsEnum.ZPL,
    LabelFormatsEnum.PNG
  ],
  DefaultConfirmationTypes: {
    [ConfirmationTypeEnum.None]: "No Confirmation Required"
  },
  TrackingUrl: TRACKING_URL,
  CarrierUrl: CARRIER_URL,
  AccountModals: {
    RegistrationFormSchema,
    SettingsFormSchema
  },
  Images: { //TO-DO: Update asset files and remove this comment
    Logo: join(__dirname, '../../assets/logo.svg'),
    Icon: join(__dirname, '../../assets/logo.svg')
  }
};
