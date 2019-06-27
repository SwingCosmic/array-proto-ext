import "../src/index";


test("environment", () => {
    expect(Array.prototype.repeat).toBeDefined();
});

test("distinct", () => {
    const a = [1, 1, 4, 5, 1, 4];
    expect(a.distinct()).toEqual([1, 4, 5]);

    const b = [{ a: 1, b: 2 }, { a: "x", b: 2 }, { a: 1, b: 4 }];
    expect(b.distinct(x => x.a)).toEqual([{ a: 1, b: 2 }, { a: "x", b: 2 }]);
});
