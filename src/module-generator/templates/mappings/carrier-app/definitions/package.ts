import {
    PackageAttribute,
    PackageType,
    RequiredToShipEnum
  } from "@shipengine/connect-carrier-api";
  
  export const <%= packageName.replace(/[^a-zA-z0-9]/g, "")%>: PackageType = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%=definitionsId%>",
    Name: "<%= packageName%>",
    CarrierPackageTypeCode: "<%= packageName%>",
    Description: "<%= packageName%>",
    Abbreviation: "<%= packageName%>",
    PackageAttributes: [
      PackageAttribute.Domestic,
      PackageAttribute.International
    ],
    RequiredToShip: [RequiredToShipEnum.Weight, RequiredToShipEnum.Dimensions]
  };
  