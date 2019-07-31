import _ from "lodash";
import { Dictionary, Constructor } from './types';

declare global {
    interface Object {

        /** 以元组的形式获取对象中包含的键值对 */
        asItems<T, K extends keyof T>(this: T): Array<[K, T[K]]>;
        /** 以元组的形式获取对象中包含的键值对，返回`Iterator` */
        itemIterator<T, K extends keyof T>(this: T): IterableIterator<[K, T[K]]>;

        /**
         * 将字典中的每一个键值对映射为指定的类型，类似@see Array.prototype.map
         * @param this 一个符合字典要求的对象
         * @param mapper 映射函数
         */
        mapItem<T extends Dictionary<T[K]>, K extends keyof T, U>(
            this: T, mapper: (value: T[K], key: K, obj: T) => U): U[];
    }
}

Object.defineProperty(Object.prototype, "itemIterator", {
    *value<T extends Dictionary<any>, K extends keyof T>(this: T) {
        for (const k of Object.keys(this)) {
            yield [k, this[k]] as [K, T[K]];
        }
    },
});
Object.defineProperty(Object.prototype, "asItems", {
    value<T extends Dictionary<any>>(this: T) {
        return Array.from(this.itemIterator());
    },
});
Object.defineProperty(Object.prototype, "mapItem", {
    value<T extends Dictionary<T[K]>, K extends keyof T, U>(
        this: T, fn: (value: T[K], key: K, obj: T) => U): U[] {
        const r: U[] = [];
        for (const k of Object.keys(this)) {
            r.push(fn(this[k], k as K, this));
        }
        return r;
    },
});


