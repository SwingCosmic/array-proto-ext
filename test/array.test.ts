import "../src/index";


test("! Check environment", () => {
    expect(Array.prototype.range).toBeDefined();
});

test("range", () => {
    expect([].range(6, 10)).toEqual([6, 7, 8, 9, 10]);
    expect([].range(1, 8, 2)).toEqual([1, 3, 5, 7]);
});

test("repeat", () => {
    expect(Array.prototype.repeat(9, 4)).toEqual([9, 9, 9, 9]);

    const arr = [].repeat(() => ({ a: 1 }), 3);
    arr[0].a = 666;
    expect(arr).toEqual([{ a: 666 }, { a: 1 }, { a: 1 }]);
});

test("distinct", () => {
    const a = [1, 1, 4, 5, 1, 4];
    expect(a.distinct()).toEqual([1, 4, 5]);

    const b = [{ id: 1, v: 2 }, { id: "x", v: 2 }, { id: 1, v: 4 }];
    expect(b.distinct(x => x.id)).toEqual([{ id: 1, v: 2 }, { id: "x", v: 2 }]);
});

test("sum", () => {
    const a = [1, 12, 100, 4];
    expect(a.sum()).toBe(117);

    const b = [{ v: 1 }, { v: 2 }, { v: 4 }];
    expect(b.sum(x => x.v)).toBe(7);
});
