import _ from "lodash";
import { Comparable, Dictionary, Mapper, NumberMapper, Predicate } from "./types";
declare global {
    /**
     * 为JS Array添加辅助方法
     */
    interface Array<T> {

        //#region 生成方法

        /**
         * 生成指定范围内的数字序列
         * @param start 开始值（包含）
         * @param end 结束值（包含）
         */
        range(start: number, end: number): number[];
        /**
         * 生成指定数量的重复序列
         * @param value 要重复的值，只能用于值类型
         * @param times 重复次数
         */
        repeat<V>(value: V, times: number): V[];
        /**
         * 生成指定数量的重复序列
         * @param factory 返回指定值的工厂函数，用于对象
         * @param times 重复次数
         */
        repeat(factory: () => T, times: number): T[];
        //#endregion

        //#region 聚集函数
        count(): number;
        sum(this: number[]): number;
        max<U extends Comparable>(this: U[]): number | undefined;
        min<U extends Comparable>(this: U[]): number | undefined;

        count(callbackfn: Predicate<T>): number;
        sum(callbackfn: NumberMapper<T>): number;
        max<U extends Comparable>(callbackfn: Mapper<T, U>): T | undefined;
        min<U extends Comparable>(callbackfn: Mapper<T, U>): T | undefined;

        anyMatch(callbackfn: Predicate<T>): boolean;
        allMatch(callbackfn: Predicate<T>): boolean;
        //#endregion


        //#region 遍历函数
        first(): T | undefined;
        last(): T | undefined;

        distinct<K>(keySelector: Mapper<T, K>): T[];

        groupBy<K>(keySelector: Mapper<T, K>): Dictionary<T[]>;
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

(Array.prototype as any).groupBy = function <T, TKey>(this: T[], fn: (e: T) => TKey): Dictionary<T[]> {
    return _.groupBy(this, fn);
};

(Array.prototype as any).sum = function <T>(this: T[], fn: (e: T) => number): number {
    let s = 0;
    for (const o of this) {
        if (arguments.length === 0) {
            s += o as any as number;
        } else {
            s += fn(o);
        }

    }
    return s;
};
(Array.prototype as any).max = function <T, U extends number | string | Date>(
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
(Array.prototype as any).min = function <T, U extends number | string | Date>(
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

(Array.prototype as any).count = function <T>(this: T[], predicate?: (e: T) => boolean): number {
    if (typeof (predicate) === "function") {
        return this.filter(predicate).length;
    } else {
        return this.length;
    }
};

(Array.prototype as any).anyMatch = function <T>(this: T[], predicate: (e: T) => boolean): boolean {
    return this.some(predicate);
};
(Array.prototype as any).allMatch = function <T>(this: T[], predicate: (e: T) => boolean): boolean {
    return this.filter(predicate).length === this.length;
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
    const result: T[] = [];
    if (this.length > 0) {
        result.push(this[0]);
    }
    for (let i = 1; i < this.length; i++) {
        const element = this[i];
        if (result.filter(x => fn(x) === fn(element)).length === 0) {
            result.push(element);
        }
    }
    return (result);
};

(Array.prototype as any).range = function (start: number, end: number) {
    const r: number[] = [];
    for (let i = start; i <= end; i++) {
        r.push(i);
    }
    return r;
};

(Array.prototype as any).repeat = function <T>(value: T | (() => T), times: number) {
    const r: T[] = [];
    for (let i = 0; i < times; i++) {
        if (typeof (value) === "function") {
            r.push((value as Function)());
        } else {
            r.push(value);
        }

    }
    return r;
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




