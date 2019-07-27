import _, { ValueKeyIteratee } from "lodash";
import { Comparable, Dictionary, Mapper, NumberMapper, Predicate, Equatable, OrderString, Constructor } from "./types";

declare global {

    interface Array<T> {

        //#region 生成方法

        /**
         * 生成指定范围内的数字序列
         * @param start 开始值（包含）
         * @param end 结束值（包含）
         * @param step 步长，default 1
         */
        range(start: number, end: number, step?: number): number[];
        /** 生成指定范围内的数字序列，返回`Iterator` */
        rangeIterator(start: number, end: number, step?: number): IterableIterator<number>;
        /**
         * 生成指定数量的重复序列
         * @param value 要重复的值或者工厂函数，当`value`为对象时只能使用工厂函数。
         * @param times 重复次数
         */
        repeat<V>(value: V | (() => V), times: number): V[];
        /** 生成指定数量的重复序列，返回`Iterator` */
        repeatIterator<V>(value: V | (() => V), times: number): IterableIterator<V>;
        //#endregion

        //#region 聚集函数
        /** 返回数组的元素个数 */
        count(): number;
        /**
         * 返回数组中满足条件的元素个数
         * @param filter 一个函数，若当前元素满足计数条件，返回`true`
         */
        countIf(filter: Predicate<T>): number;

        sum(this: number[]): number;
        sum(callbackfn: NumberMapper<T>): number;
        sumIf(this: number[], filter: Predicate<number>): number;

        max<U extends Comparable>(this: U[]): number | undefined;
        max<U extends Comparable>(callbackfn: Mapper<T, U>): T | undefined;

        min<U extends Comparable>(this: U[]): number | undefined;
        min<U extends Comparable>(callbackfn: Mapper<T, U>): T | undefined;

        anyMatch(callbackfn: Predicate<T>): boolean;
        allMatch(callbackfn: Predicate<T>): boolean;
        //#endregion


        //#region 遍历函数
        /** 
         * 返回数组的第一个元素。
         * 和`array[0]`不同的是，返回类型可以为`undefined`
         */
        first(): T | undefined;
        /** 
         * 返回数组的最后一个元素。
         * 和`array[array.length - 1]`不同的是，返回类型可以为`undefined`
         */
        last(): T | undefined;
        /**
         * 移除数组中第一个匹配的元素
         * @param item 要移除的元素，该元素 **自身** （不是相等）必须在数组中
         */
        remove(item: T): void;

        distinct<U extends Equatable>(this: U[]): T[];
        distinct<K>(keySelector: Mapper<T, K>): T[];

        groupBy<K>(keySelector: Mapper<T, K>): Dictionary<T[]>;

        sortX<U extends Comparable>(this: U[], desc?: boolean): T[];
        sortBy<K>(keySelector: Mapper<T, K>, desc?: boolean): T[];
        orderBy<K extends keyof T>(keyNames: K[], desc?: boolean): T[];
        orderByCustom<K extends keyof T>(customKeySelector: {
            prop: K,
            order: OrderString
        }[]): T[];

        ofType<U extends T>(constructor: Constructor<U>): U[];
        //#endregion

    }

    // interface Object {
    //     /**
    //      * 将字典中的每一个键值对映射为指定的类型，类似{@link Array.prototype.map}
    //      * @param this 字典，本质上是一个具有固定类型value的Object
    //      * @param callbackfn 映射函数
    //      */
    //     //map<V, T extends Dictionary<V>, U>(this: T, callbackfn: (value: V, key: string, obj: T) => U): U[];
    // }
}


(Array.prototype as any).rangeIterator = function* (start: number, end: number, step: number = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
};
(Array.prototype as any).range = function (start: number, end: number, step: number = 1) {
    return Array.from(Array.prototype.rangeIterator(start, end, step));
};
(Array.prototype as any).repeatIterator = function*<T>(value: T | (() => T), times: number) {
    for (let i = 0; i < times; i++) {
        if (typeof (value) === "function") {
            yield (value as (() => T))();
        } else {
            yield value;
        }
    }
};
(Array.prototype as any).repeat = function <T>(value: T | (() => T), times: number) {
    return Array.from(Array.prototype.repeatIterator(value, times));
};

// ===================================================

(Array.prototype as any).groupBy = function <T, TKey>(this: T[], fn: (e: T) => TKey): Dictionary<T[]> {
    return _.groupBy(this, fn);
};
(Array.prototype as any).sortX = function <T>(this: T[], desc: boolean = false) {
    let copy = _.clone(this);
    copy.sort();
    if (desc) {
        copy = copy.reverse();
    }
    return copy;
};
(Array.prototype as any).sortBy = function <T, K>(this: T[], selector: Mapper<T, K>, desc: boolean = false) {
    let order: OrderString = desc ? "desc" : "asc";
    return _.orderBy(this, selector, order);
};
(Array.prototype as any).orderBy = function <T, K extends keyof T>(this: T[],
    keys: K[], desc: boolean = false) {
    let order: OrderString = desc ? "desc" : "asc";
    return _.orderBy(this, keys, order);
};
(Array.prototype as any).orderByCustom = function<T, K extends keyof T>(selector: {
    prop: K,
    order: OrderString
}[]) {
    let keys = selector.map(x => x.prop);
    let orders = selector.map(x => x.order);
    return _.orderBy(this, keys, orders);
};

(Array.prototype as any).sum = function <T>(this: T[], fn?: (e: T) => number): number {
    return this.reduce((s, v) =>
        s + (typeof (fn) === "function" ? fn(v) : (v as any as number)), 0);
};
(Array.prototype as any).sumIf = function (this: number[], fn: (e: number) => boolean): number {
    return this.reduce((s, v) => s + (fn(v) ? v : 0), 0);
};
(Array.prototype as any).max = function <T, U extends Comparable>(
    this: T[], fn: (e: T) => U): T | undefined {
    if (this.length >= 1) {
        if (arguments.length === 0) {
            return _.max(this);
        } else {
            let max: { value: U, item: T } = { value: fn(this[0]), item: this[0] };
            for (const o of this) {
                let t = fn(o);
                max = t > max.value ? { value: t, item: o } : max;
            }
            return max.item;
        }
    }
    return undefined;
};
(Array.prototype as any).min = function <T, U extends Comparable>(
    this: T[], fn: (e: T) => U): T | undefined {
    if (this.length >= 1) {
        if (arguments.length === 0) {
            return _.min(this);
        } else {
            let min: { value: U, item: T } = { value: fn(this[0]), item: this[0] };
            for (const o of this) {
                let t = fn(o);
                min = t < min.value ? { value: t, item: o } : min;
            }
            return min.item;
        }
    }
    return undefined;
};

(Array.prototype as any).count = function <T>(this: T[]): number {
    return this.length;
};
(Array.prototype as any).countIf = function <T>(this: T[], predicate: (e: T) => boolean): number {
    return this.filter(predicate).length;
};
(Array.prototype as any).anyMatch = function <T>(this: T[], predicate: (e: T) => boolean): boolean {
    return this.some(predicate);
};
(Array.prototype as any).allMatch = function <T>(this: T[], predicate: (e: T) => boolean): boolean {
    return this.every(predicate);
};

(Array.prototype as any).first = function <T>(this: T[]): T | undefined {
    if (this.length > 0) {
        return this[0];
    } else {
        return undefined;
    }
};
(Array.prototype as any).last = function <T>(this: T[]): T | undefined {
    if (this.length > 0) {
        return this[this.length - 1];
    } else {
        return undefined;
    }
};

(Array.prototype as any).distinct = function <T, TKey>(this: T[], fn: (e: T) => TKey): T[] {
    if (typeof (fn) === "function") {
        return _.uniqBy(this, fn);
    } else {
        //Set is faster
        return Array.from(new Set(this).values());
    }

};

(Array.prototype as any).remove = function <T>(this: T[], item: T): void {
    if (this.includes(item)) {
        this.splice(this.indexOf(item), 1);
    }
};

(Array.prototype as any).ofType = function <T, U extends T>(this: T[], constructor: Constructor<U>): U[] {
    return this.filter(e => {
        if (constructor as Constructor<string> == String && 
            Object.prototype.toString.call(e) === "[object String]") {
            return true; 
        } else if (constructor as Constructor<number> == Number && 
            Object.prototype.toString.call(e) === "[object Number]") {
            return true; 
        } else if (constructor as Constructor<boolean> == Boolean && 
            Object.prototype.toString.call(e) === "[object Boolean]") {
            return true; 
        } else if (constructor as Constructor<object> == Object && 
            (typeof(e) === "object" || typeof(e) === "string")) {
            return true; // Object.create(null), string literal
        }
        return e instanceof constructor;
    }) as U[];
};


// =====================================================================

// (Object.prototype as any).map = function <V, T extends Dictionary<V>, U>
//     (this: T, fn: (value: V, key: string, obj: T) => U): U[] {
//     let r: U[] = [];
//     for (const k of Object.keys(this)) {
//         r.push(fn(this[k], k, this));
//     }
//     return r;
// };




