"use strict";
import { logger } from "@shipengine/connect-runtime";
import { AxiosRequestConfig } from "axios";
import { CarrierApiOperation } from "../helpers/constants";

export const logRequest = (
  requestConfig: AxiosRequestConfig,
  operationName: CarrierApiOperation
): void => {
  try {
    let msg = `Sending ${operationName} request to <%= projectNameValue %> API\nURL: ${requestConfig.url
      }\nMethod: ${requestConfig.method ?? ""}\nHeaders: ${requestConfig.headers ? JSON.stringify(requestConfig.headers) : ""
      }\nQueryParameters: ${requestConfig.params ? JSON.stringify(requestConfig.params) : ""
      }\nBody: ${requestConfig.data ? JSON.stringify(requestConfig.data) : ""
      }`;
    logger.info(msg);
  } catch (e) {
    logger.info(`Unable to generate request logs. ${e.message ?? e}`);
  }
};
export const logResponse = (response: unknown): void => {
  try {
    let msg = `Response received from <%= projectNameValue %> API\n${response ? JSON.stringify(response) : ""}`;
    logger.info(msg);
  } catch (e) {
    logger.info(`Unable to generate response logs. ${e.message ?? e}`);
  }
};
