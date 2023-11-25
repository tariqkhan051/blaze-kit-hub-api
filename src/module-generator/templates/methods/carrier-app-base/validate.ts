import { BadRequestError } from "@shipengine/connect-runtime";
import { ERROR_MESSAGES } from "../../helpers/constants";
import { <%= capitalizeProjectName %><%= capitalizeMethodName %>Request } from "./<%= projectFolder %>-<%= methodHash %>-request";

export const validate = (request: <%= capitalizeProjectName %><%= capitalizeMethodName %>Request): void => {
  //TODO: Implement validations or remove the method
};