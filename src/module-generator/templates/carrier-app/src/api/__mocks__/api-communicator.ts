import { AxiosRequestConfig } from "axios";
<% uppercaseMethodsAnswers.forEach(function(method){-%>
import { <%= method %>Response } from "./responses/<%- method.split(/(?=[A-Z])/).join('-').toLowerCase() %>-response";
<% });%>import { CarrierApiOperation } from "../../helpers/constants";

export const processApiRequest = async <T>(
    requestConfig: AxiosRequestConfig,
    operationName: CarrierApiOperation
  ): Promise<Object> => {
    switch (operationName) {
<% uppercaseMethodsAnswers.forEach(function(method){-%>
    case CarrierApiOperation.<%= method %>:
        return <%= method %>Response;
<% });-%>
    default:
        return {};
    }
}