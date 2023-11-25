import { <%= capitalizeProjectName %>Carrier } from "../../src/definitions/<%= projectFolder %>";
import { Metadata } from "../../src/definitions/index";

describe("Check metadata", () => {
    test("Check Id", () => {
        //Assert
        expect(Metadata.Id).toBe("");
    });

    test("Check Name", () => {
        //Assert
        expect(Metadata.Name).toBe("<%= projectNameValue %>");
    });

    test("Check Carriers", () => {
        //Assert
        expect(Metadata.Carriers).toStrictEqual([<%= capitalizeProjectName %>Carrier]);
    });
});
