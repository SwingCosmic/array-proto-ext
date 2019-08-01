import "../src/index";
import { Dictionary } from "../src/types";

describe("Object tests", () => {
    test("! Check environment", () => {
        expect(Object.prototype.__values).toBeDefined();
    });

    test("entries", () => {
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

        const r = obj.entryList();
        expect(r).toEqual([
            ["a", true],
            ["b", [2]],
            ["c", "3"],
        ]);
    });

    test("items", () => {
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

        const r = obj.itemList();
        expect(r).toEqual([
            { a: true},
            { b: [2] },
            { c: "3" },
        ]);
    });

    test("keys", () => {
        const obj = {
            a: true,
            b: [2],
        };
        // Symbol cannot display
        Object.defineProperty(obj, Symbol.toPrimitive, {
            value: "3",
            enumerable: true
        });
        Object.defineProperty(obj, "d", {
            value: 4,
            enumerable: false
        });

        const r = obj.keyList();
        expect(r).toEqual(["a", "b"]);
    });

    test("values", () => {
        const obj = {
            a: true,
            b: [2],
        };
        Object.defineProperty(obj, Symbol.toPrimitive, {
            value: "3",
            enumerable: true
        });
        Object.defineProperty(obj, "d", {
            value: 4,
            enumerable: false
        });

        const r = obj.valueList();
        expect(r).toEqual([true, [2]]);
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