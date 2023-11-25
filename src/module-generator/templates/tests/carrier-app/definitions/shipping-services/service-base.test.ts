import {
    LabelSizesEnum,
    ServiceGradeEnum,
    ServiceClassEnum,
    ConfirmationTypeEnum,
    ServiceAttributesEnum
} from "@shipengine/connect-carrier-api";
import { <%= serviceNameWithoutSpaces%> } from "../../../src/definitions/shipping-services";

describe("Check service definitions properties - <%= serviceName%>", () => {
    test("Check Id", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.Id;

        //Assert
        expect(result).toBe("");
    });

    test("Check Name", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.Name;

        //Assert
        expect(result).toBe("<%= serviceName%>");
    });

    test("Check ApiCode", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.ApiCode;

        //Assert
        expect(result).toBe("");
    });

    test("Check Abbreviation", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.Abbreviation;

        //Assert
        expect(result).toBe("");
    });

    test("Check Code", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.Code;

        //Assert
        expect(result).toBe("");
    });

    test("Check International flag", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.International;

        //Assert
        expect(result).toBeTruthy();
    });

    test("Check SupportedLabelSizes", () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = <%= serviceNameWithoutSpaces%>.SupportedLabelSizes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check SupportedCountries", () => {
        //Arrange
        const expected = [{ FromCountry: "" }];

        //Act
        const result = <%= serviceNameWithoutSpaces%>.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check Class", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test("Check Grade", () => {
        //Act
        const result = <%= serviceNameWithoutSpaces%>.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test("Check ServiceAttributes", () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.MultiPackage,
            ServiceAttributesEnum.Tracking
        ];

        //Act
        const result = <%= serviceNameWithoutSpaces%>.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test("Check ConfirmationTypes", () => {
        //Arrange
        const expected = [
            { Name: "No Confirmation Required", Type: ConfirmationTypeEnum.None }
        ];

        //Act
        const result = <%= serviceNameWithoutSpaces%>.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
