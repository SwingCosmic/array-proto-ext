import "../src/index";
import { Dictionary } from "../src/types";

describe("Object tests", () => {
    test("! Check environment", () => {
        expect(Object.prototype.asItems).toBeDefined();
    });

    test("asItems", () => {
        const obj = {
            a: true,
            b: [2],
        };
        Object.defineProperty(obj, "c", {
            value: "3",
            enumerable: true
        });
        Object.defineProperty(obj, "d", {
            value: 4,
            enumerable: false
        });
        expect(obj.asItems()).toEqual([
            ["a", true],
            ["b", [2]],
            ["c", "3"],
        ]);
    });

    test("mapItem", () => {
        const obj = {
            a: 1,
            b: 2,
            c: 3,
            d: "10"
        }; // obj is Dictionary<string | number>
        
        expect(obj.mapItem((v, k) => `key:${k},value:${v}`)).toEqual([
            "key:a,value:1",
            "key:b,value:2",
            "key:c,value:3",
            "key:d,value:10",
        ]);
    });
});