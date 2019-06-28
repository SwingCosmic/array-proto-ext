import _ from "lodash";
import { Comparable, Dictionary, Mapper, NumberMapper, Predicate } from "./types";


(Array.prototype as any).groupBy = function <T, TKey>(this: T[], fn: (e: T) => TKey): Dictionary<T[]> {
    return _.groupBy(this, fn);
};

(Array.prototype as any).sum = function <T>(this: T[], fn?: (e: T) => number): number {
    return this.reduce((s, v) =>
        s + (typeof (fn) === "function" ? fn(v) : (v as any as number)), 0);
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
    }
    else {
        return Array.from(new Set(this).values());
    }

};


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

// =====================================================================

// (Object.prototype as any).map = function <V, T extends Dictionary<V>, U>
//     (this: T, fn: (value: V, key: string, obj: T) => U): U[] {
//     let r: U[] = [];
//     for (const k of Object.keys(this)) {
//         r.push(fn(this[k], k, this));
//     }
//     return r;
// };




