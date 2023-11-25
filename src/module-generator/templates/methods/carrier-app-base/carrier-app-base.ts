import {
  <%= capitalizeShipstationMethodName %>Request,
  <%= capitalizeShipstationMethodName %>Response,
} from '@shipengine/connect-carrier-api';
import { processApiRequest } from "../../api/api-communicator";
import { CarrierApiOperation } from "../../helpers/constants";
import {
  <%= capitalizeMethodName %>ApiResponse,
} from "../../api/models/<%= methodHash %>-api-response";
import { <%= capitalizeProjectName %><%= capitalizeMethodName %>Request } from "./<%= projectFolder %>-<%= methodHash %>-request";
import { mapRequest } from "./map-request";
import { mapResponse } from "./map-response";
import { validate } from "./validate";

export const <%= capitalizeMethodName %> = async (
  request: <%= capitalizeShipstationMethodName %>Request,
): Promise <<%= capitalizeShipstationMethodName %>Response> => {
  const <%= upperCaseMethodName %>Request = request as <%= capitalizeProjectName %><%= capitalizeMethodName %>Request;
  
  validate(<%= upperCaseMethodName %>Request);  
  const thirdPartyRequest= mapRequest(<%= upperCaseMethodName %>Request);
  const response = await processApiRequest<<%= capitalizeMethodName %>ApiResponse>(thirdPartyRequest, CarrierApiOperation.<%= capitalizeMethodName %>);
  return mapResponse(response, <%= upperCaseMethodName %>Request);
};


