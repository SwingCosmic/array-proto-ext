import _ from "lodash";
import { Dictionary, Constructor } from './types';

declare global {
    interface Object {

        /** 
         * 以元组的形式获取对象中包含的键值对并返回`Iterator`，
         * 和ES6 @see Array.entries 保持一致  
         */
        __entries<T, K extends keyof T, V = T[K]>(this: T): IterableIterator<[K, V]>;

        // WARNING: 此操作会带来无法预料的副作用
        /** 
         * 实现原生的for-of迭代协议，对值进行迭代。
         * 仅对target ES6或更高目标有效。
         */
        // [Symbol.iterator]<T, K extends keyof T, V = T[K]>(): IterableIterator<[K, V]>;

        /** 以元组的形式获取对象中包含的键值对 */
        entryList<T, K extends keyof T, V = T[K]>(this: T): Array<[K, V]>;

        // 由于对象的形式不适合执行函数式处理，因此itemList不提供Iterator版本
        /** 以对象的形式获取对象中包含的键值对 */
        itemList<T, K extends keyof T>(this: T): Array<Pick<T, K>>; 
        // Array<{ [P in keyof T]: Pick<T, P> }[keyof T]>;

        /** 
         * 获取对象中键的集合并返回`Iterator`，
         * 和ES6 @see Array.keys 保持一致  
         */
        __keys<T, K extends keyof T>(this: T): IterableIterator<K>;
        /** 获取对象中键的集合，等同于 @see Object.keys */
        keyList<T, K extends keyof T>(this: T): K[];
        /** 
         * 获取对象中值的集合并返回`Iterator`，
         * 和ES6 @see Array.values 保持一致  
         */
        __values<T, K extends keyof T, V = T[K]>(this: T): IterableIterator<V>;
        /** 获取对象中值的集合 */
        valueList<T, K extends keyof T, V = T[K]>(this: T): V[];
        

        /**
         * 将字典中的每一个键值对映射为指定的类型，类似@see Array.prototype.map
         * @param this 一个符合字典要求的对象
         * @param mapper 映射函数
         */
        mapItem<T extends Dictionary<T[K]>, K extends keyof T, U>(
            this: T, mapper: (value: T[K], key: K, obj: T) => U): U[];
    }
}

// ======================


// ES5 cannot simulate Symbol
// if (typeof (Symbol) !== "undefined" && Symbol.iterator) {
//     Object.defineProperty(Object.prototype, Symbol.iterator, {
//         *value<T extends Dictionary<any>, K extends keyof T>(this: T) {
//             for (const k of Object.keys(this)) {
//                 yield [k, this[k]] as [K, T[K]];
//             }
//         },
//     });
// }
Object.defineProperty(Object.prototype, "__entries", {
    *value<T extends Dictionary<any>, K extends keyof T>(this: T) {
        for (const k of Object.keys(this)) {
            yield [k, this[k]] as [K, T[K]];
        }
    }, 
});
Object.defineProperty(Object.prototype, "entryList", {
    value<T extends Dictionary<any>>(this: T) {
        return Array.from(this.__entries());
    }, writable: true, // user may define a prop with same name
});

Object.defineProperty(Object.prototype, "itemList", {
    value<T extends Dictionary<any>>(this: T) {
        return Object.keys(this).map(k => ({ [k]: this[k] }));
    }, writable: true,
});

Object.defineProperty(Object.prototype, "__keys", {
    *value<T extends Dictionary<any>>(this: T) {
        for (const k of Object.keys(this)) {
            yield k as keyof T;
        }
    },
});
Object.defineProperty(Object.prototype, "keyList", {
    value<T extends Dictionary<any>>(this: T) {
        return Object.keys(this) as Array<keyof T>; 
    }, writable: true,
});

Object.defineProperty(Object.prototype, "__values", {
    *value<T extends Dictionary<any>>(this: T) {
        for (const k of Object.keys(this)) {
            yield this[k];
        }
    },
});

Object.defineProperty(Object.prototype, "valueList", {
    value<T extends Dictionary<any>>(this: T) {
        return Array.from(this.__values());
    }, writable: true, 
});



Object.defineProperty(Object.prototype, "mapItem", {
    value<T extends Dictionary<T[K]>, K extends keyof T, U>(
        this: T, fn: (value: T[K], key: K, obj: T) => U): U[] {
        const r: U[] = [];
        for (const k of Object.keys(this)) {
            r.push(fn(this[k], k as K, this));
        }
        return r;
    }, writable: true
});


