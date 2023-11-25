import { CarrierAppMetadata } from "@shipengine/connect-carrier-api";
import { <%= capitalizeProjectName %>Carrier } from "./<%=projectFolder%>";

export const Metadata: CarrierAppMetadata = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%= appId %>",
  Name: "<%= projectNameValue %>",
  Carriers: [<%= capitalizeProjectName %>Carrier]
};
