import {
    ShippingService,
    LabelSizesEnum,
    ServiceGradeEnum,
    ServiceClassEnum,
    ServiceAttributesEnum,
    ConfirmationTypeEnum
} from "@shipengine/connect-carrier-api";

export const <%= serviceName.replace(/[^a-zA-z0-9]/g, "")%>: ShippingService = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%=definitionsId%>",
    Name: "<%= serviceName%>",
    Abbreviation: "",
    ApiCode: "",
    Code: "",
    International: true,
    Class: ServiceClassEnum.Unspecified,
    Grade: ServiceGradeEnum.Unspecified,
    SupportedLabelSizes: [LabelSizesEnum.Inches4x6],
    SupportedCountries: [
        {
            FromCountry: ""
        }
    ],
    ServiceAttributes: [
        ServiceAttributesEnum.MultiPackage,
        ServiceAttributesEnum.Tracking
    ],
    ConfirmationTypes: [
        { Name: "No Confirmation Required", Type: ConfirmationTypeEnum.None }
    ]
};
