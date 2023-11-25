import axios, { AxiosRequestConfig } from "axios";
import { ExternalServerError } from "@shipengine/connect-runtime";
import { logRequest, logResponse } from "./logger";
import { CarrierApiOperation } from "../helpers/constants";
import { getErrorMessage } from "../helpers/utils";
<%- (apiType === "soap-client" || apiType === "form-url-encoded")?`import * as X2JS from "x2js";
const x2js = new X2JS();`:""-%>
<%- apiType === "form-url-encoded" ? `import * as qs from "qs";`:""-%>

export const processApiRequest = async <T>(
    requestConfig: AxiosRequestConfig,
    operationName: CarrierApiOperation
): Promise<T> => {
    try {
        <%- apiType === "soap-client"?`requestConfig.data = x2js.js2xml(requestConfig.data);`:""-%><%- apiType === "form-url-encoded"?`requestConfig.data = qs.stringify(requestConfig.data);`:""-%>
        logRequest(requestConfig, operationName);
        const axiosInstance = axios.create(requestConfig);

        const response = await axiosInstance.request(requestConfig);
        const parsedData = <% if(apiType === "rest-client"){%> <T><%}%>response.data;        
        logResponse(parsedData);

        <% if(apiType === "soap-client" || apiType === "form-url-encoded"){%>return <T>x2js.xml2js(parsedData);<%}%><% if(apiType === "rest-client"){%>return parsedData;<%}%>
    } catch (err) {
        const errorMsg = getErrorMessage(err);
        logResponse(errorMsg);
        throw new ExternalServerError(errorMsg);
    }
};
