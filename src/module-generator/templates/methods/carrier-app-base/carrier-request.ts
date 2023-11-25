import { Metadata } from "../../helpers/internal-models";
import { <%= capitalizeShipstationMethodName %>Request } from "@shipengine/connect-carrier-api";

export interface <%= capitalizeProjectName %><%= capitalizeMethodName %>Request extends <%= capitalizeShipstationMethodName %>Request {
    metadata?: Metadata;
    <%- capitalizeMethodName === 'Register' ? `registration_info: Metadata;`:"" %>
}