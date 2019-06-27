import "../src/index";


test("environment", () => {
    expect(Array.prototype.repeat).toBeDefined();
});

test("distinct", () => {
    const a = [1, 1, 4, 5, 1, 4];
    expect(a.distinct()).toEqual([1, 4, 5]);

    const b = [{ id: 1, v: 2 }, { id: "x", v: 2 }, { id: 1, v: 4 }];
    expect(b.distinct(x => x.id)).toEqual([{ id: 1, v: 2 }, { id: "x", v: 2 }]);
});
