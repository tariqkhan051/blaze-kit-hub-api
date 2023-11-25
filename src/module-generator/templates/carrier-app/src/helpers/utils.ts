import { <%= capitalizeProjectName %>TrackRequest } from "../methods/track/<%= projectFolder %>-track-request";

export const getErrorMessage = (err: any): string => {
  if (err.response?.data?.error?.message)
    return err.response.data.error.message;
  if (err.response?.data?.Message) return err.response.data.Message;
  if (err.response?.data) return err.response.data;
  if (err.message) return err.message;
  else return err;
};

export const convertToCentimeter = (value: number, unit: string): number => {
  switch (unit?.toLowerCase()) {
    case "cm":
    case "centimeters":
      return value;
    case "in":
    case "inches":
      return value * 2.54;
    default:
      return value;
  }
};

export const convertToKiloGram = (weight: number, unit: string): number => {
  switch (unit?.toLowerCase()) {
    case "kg":
    case "kilograms":
      return weight;
    case "g":
    case "grams":
      return weight / 1000;
    case "oz":
    case "ounces":
      return weight * 0.02834952;
    case "lb":
    case "pounds":
      return weight * 0.45359237;
    default:
      return weight;
  }
};

export const getUrl = (baseUrl: string, resource: string): string => {
  return baseUrl.endsWith("/")
    ? `${baseUrl}${resource}`
    : `${baseUrl}/${resource}`;
};

export const isEmptyOrSpaces = (str: string): boolean => {
  return str === null || str === undefined || str.trim() === "";
};

export const formatDate = (date: string): string => {
  let d = new Date();

  if (date) {
    d = new Date(date);
  }

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getTrackingNumber = (request: <%= capitalizeProjectName %>TrackRequest): string => {
  let trackingNumber: string =
    request.identifiers?.find((p) => p.type === "tracking_number").value ?? "";

  return trackingNumber;
};