import {
  PackageAttribute,
  RequiredToShipEnum
} from "@shipengine/connect-carrier-api";
import { <%= packageNameWithoutSpaces %> } from "../../../src/definitions/packaging";

describe("Check packaging type properties - <%= packageName%>", () => {
  test("Check Id", () => {
    //Act
    const result = <%= packageNameWithoutSpaces %>.Id;

    //Assert
    expect(result).toBe("");
  });

  test("Check Name", () => {
    //Act
    const result = <%= packageNameWithoutSpaces %>.Name;

    //Assert
    expect(result).toBe("<%= packageName%>");
  });

  test("Check CarrierPackageTypeCode", () => {
    //Act
    const result = <%= packageNameWithoutSpaces %>.CarrierPackageTypeCode;

    //Assert
    expect(result).toBe("<%= packageName%>");
  });

  test("Check Description", () => {
    //Act
    const result = <%= packageNameWithoutSpaces %>.Description;

    //Assert
    expect(result).toBe("<%= packageName%>");
  });

  test("Check Abbreviation", () => {
    //Act
    const result = <%= packageNameWithoutSpaces %>.Abbreviation;

    //Assert
    expect(result).toBe("<%= packageName%>");
  });

  test("Check PackageAttributes", () => {
    //Arrange
    const expected = [
      PackageAttribute.Domestic,
      PackageAttribute.International
    ];

    //Act
    const result = <%= packageNameWithoutSpaces %>.PackageAttributes;

    //Assert
    expect(result).toStrictEqual(expected);
  });

  test("Check RequiredToShip", () => {
    //Arrange
    const expected = [RequiredToShipEnum.Weight, RequiredToShipEnum.Dimensions];

    //Act
    const result = <%= packageNameWithoutSpaces %>.RequiredToShip;

    //Assert
    expect(result).toStrictEqual(expected);
  });
});
