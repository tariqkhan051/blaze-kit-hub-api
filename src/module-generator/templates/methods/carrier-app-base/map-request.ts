import { AxiosRequestConfig } from "axios";<% if (useTryCatch===true) { %>
import { BadRequestError } from "@shipengine/connect-runtime";<%}%>
import { getUrl } from "../../helpers/utils";
import { <%= capitalizeProjectName %><%= capitalizeMethodName %>Request } from "./<%= projectFolder %>-<%= methodHash %>-request";
import { <%= capitalizeMethodName %>ApiRequest } from "../../api/models/<%= methodHash %>-api-request";
import { BASE_URL, API_RESOURCES } from "../../helpers/constants";

const API_URL = getUrl(BASE_URL, API_RESOURCES.<%= capitalizeMethodName %>);

export const mapRequest = (
    request: <%= capitalizeProjectName %><%= capitalizeMethodName %>Request
): AxiosRequestConfig => {
    <% if (useTryCatch===true){%>try {
        return {
            url: API_URL,
            method: "",
            params: {},
            data: get<%= capitalizeMethodName.includes("Get") ? capitalizeMethodName.replace("Get",""):capitalizeMethodName %>Request(request)
        };
    } catch (err) {
        throw new BadRequestError(err);
    }<%} else { %>return {
            url: API_URL,
            method: "",
            params: {},
            data: get<%= capitalizeMethodName.includes("Get") ? capitalizeMethodName.replace("Get",""):capitalizeMethodName %>Request(request)
        };
    <% } %>    
};

const get<%= capitalizeMethodName.includes("Get") ? capitalizeMethodName.replace("Get",""):capitalizeMethodName %>Request = (
    request: <%= capitalizeProjectName %><%= capitalizeMethodName %>Request
): <%= capitalizeMethodName %>ApiRequest => {
    return {}
}