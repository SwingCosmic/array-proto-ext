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

test("sortX", () => {
    const arr = [1, 3, 5, 6, 2, 4, 1];
    expect(arr.sortX(true)).toEqual([6, 5, 4, 3, 2, 1, 1]);
    expect(arr).toEqual([1, 3, 5, 6, 2, 4, 1]);
});
test("sortBy", () => {
    const arr = [{ a: 2 }, { a: 1 }, { a: 3 }];
    expect(arr.sortBy(x => x.a)).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
    expect(arr.sortBy(x => x.a, true)).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }]);
});
test("orderBy", () => {
    const arr = [
        { a: 2, b: 1 },
        { a: 1, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 2 }
    ];
    expect(arr.orderBy(["a", "b"], false)).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 2, b: 2 }
    ]);
});
test("orderByCustom", () => {
    const arr = [
        { a: 2, b: 1 },
        { a: 1, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 2 }
    ];
    expect(arr.orderByCustom([
        { prop: "a", order: "asc" },
        { prop: "b", order: "desc" }
    ])).toEqual([
        { a: 1, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 2 },
        { a: 2, b: 1 }
    ]);
});

test("sum", () => {
    const a = [1, 12, 100, 4];
    expect(a.sum()).toBe(117);

    const b = [{ v: 1 }, { v: 2 }, { v: 4 }];
    expect(b.sum(x => x.v)).toBe(7);
});

test("sumIf", () => {
    const a = [1, 6666, 233, 4];
    expect(a.sumIf(x => x > 50)).toBe(6899);
});

test("remove", () => {
    const obj = { v: 2 };
    const arr = [{ v: 1 }, obj, { v: 4 }, { v: 2 }, { v: 3 }, obj];
    arr.remove({ v: 9 });
    expect(arr).toEqual([{ v: 1 }, { v: 2 }, { v: 4 }, { v: 2 }, { v: 3 }, { v: 2 }]);

    // only remove SAME object
    arr.remove({ v: 2 });
    expect(arr).toEqual([{ v: 1 }, { v: 2 }, { v: 4 }, { v: 2 }, { v: 3 }, { v: 2 }]);

    arr.remove(obj);
    expect(arr).toEqual([{ v: 1 }, /* obj */ { v: 4 }, { v: 2 }, { v: 3 }, { v: 2 }]);
    arr.remove(obj);
    expect(arr).toEqual([{ v: 1 }, /* obj */ { v: 4 }, { v: 2 }, { v: 3 },/* obj */]);
});
