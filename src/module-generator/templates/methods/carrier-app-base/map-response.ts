import { <%= capitalizeShipstationMethodName %>Response } from "@shipengine/connect-carrier-api";<% if (useTryCatch===true) { %>
import { ExternalServerError } from "@shipengine/connect-runtime";
import { ERROR_MESSAGES } from "../../helpers/constants";<%}%>
import { <%= capitalizeProjectName %><%= capitalizeMethodName %>Request } from "./<%= projectFolder %>-<%= methodHash %>-request";
import { <%= capitalizeMethodName %>ApiResponse } from "../../api/models/<%= methodHash %>-api-response";

export const mapResponse = (
    response: <%= capitalizeMethodName %>ApiResponse,
    request: <%= capitalizeProjectName %><%= capitalizeMethodName %>Request
     ): <%= capitalizeShipstationMethodName %>Response => {
        <% if (useTryCatch===true) { %>try {
            return {
                metadata: request.metadata,<% if (["GetRates","Register","Track"].includes(capitalizeMethodName)) { %>
                transaction_id: request.transaction_id <%}%>
            };
        } catch (err) {
            throw new ExternalServerError(ERROR_MESSAGES.ErrorInResponseMapping + err);
        }<%} else { %>return {
                metadata: request.metadata,<% if (["GetRates","Register","Track"].includes(capitalizeMethodName)) { %>
                transaction_id: request.transaction_id <%}%>
            };
        <% } %>        
};
