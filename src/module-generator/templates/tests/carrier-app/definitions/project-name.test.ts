import { <%= capitalizeProjectName %>Carrier } from "../../src/definitions/<%= projectFolder %>";
import {<% servicesAnswers.forEach(function(answer) { %>
    <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
  } from "../../src/definitions/shipping-services";
  import {<% packagingAnswers.forEach(function(answer) { %>
    <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
  } from "../../src/definitions/packaging";
import {
    LabelSizesEnum,
    LabelFormatsEnum,
    ConfirmationTypeEnum,
    ShippingOptionEnum
} from "@shipengine/connect-carrier-api";

var RegistrationFormSchema = <%= capitalizeProjectName %>Carrier.AccountModals.RegistrationFormSchema;
var SettingsFormSchema = <%= capitalizeProjectName %>Carrier.AccountModals.SettingsFormSchema;

describe("Check carrier definitions properties", () => {
    test("Check Id", () => {
        //Act
        const result = <%= capitalizeProjectName %>Carrier.Id;

        //Assert
        expect(result).toBe("");
    });

    test("Check Name", () => {
        //Act
        const result = <%= capitalizeProjectName %>Carrier.Name;

        //Assert
        expect(result).toBe("<%= projectNameValue %>");
    });

    test("Check PackageTypes", () => {
        //Arrange
        const expected = [<% packagingAnswers.forEach(function(answer) { %>
            <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
          ];

        //Act
        const result = <%= capitalizeProjectName %>Carrier.PackageTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check ShippingServices", () => {
        //Arrange
        const expected = [<% servicesAnswers.forEach(function(answer) { %>
            <%- answer.replace(/[^a-zA-z0-9]/g, "") %>, <% }); %>
          ];

        //Act
        const result = <%= capitalizeProjectName %>Carrier.ShippingServices;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check ShippingOptions", () => {
        //Arrange
        const expected = {};

        //Act
        const result = <%= capitalizeProjectName %>Carrier.ShippingOptions;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check DefaultSupportedCountries", () => {
        //Arrange
        const expected = [{ FromCountry: "" }];

        //Act
        const result = <%= capitalizeProjectName %>Carrier.DefaultSupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check DefaultLabelSizes", () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = <%= capitalizeProjectName %>Carrier.DefaultLabelSizes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check LabelFormats", () => {
        //Arrange
        const expected = [
            LabelFormatsEnum.PDF,
            LabelFormatsEnum.ZPL,
            LabelFormatsEnum.PNG
        ];

        //Act
        const result = <%= capitalizeProjectName %>Carrier.LabelFormats;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check DefaultConfirmationTypes", () => {
        //Arrange
        const expected = {
            [ConfirmationTypeEnum.None]: "No Confirmation Required"
        };

        //Act
        const result = <%= capitalizeProjectName %>Carrier.DefaultConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check TrackingUrl", () => {
        //Act
        const result = <%= capitalizeProjectName %>Carrier.TrackingUrl;

        //Assert
        expect(result).toBe("<%= trackingUrl %>");
    });

    test("Check CarrierUrl", () => {
        //Act
        const result = <%= capitalizeProjectName %>Carrier.CarrierUrl;

        //Assert
        expect(result).toBe("<%= clientWebSite %>");
    });

    test("Check Description", () => {
        //Act
        const result = <%= capitalizeProjectName %>Carrier.Description;

        //Assert
        expect(result).toBe("<%= carrierDescription %>");
    });

    test("Check AccountModals", () => {
        //Arrange
        const expected = {
            RegistrationFormSchema,
            SettingsFormSchema
        };

        //Act
        const result = <%= capitalizeProjectName %>Carrier.AccountModals;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
