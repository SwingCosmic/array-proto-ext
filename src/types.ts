export type Comparable = number | string | boolean | Date ;
export interface Dictionary<T> { [key: string]: T; }

export type Mapper<T, U> = (obj: T) => U;
export interface PropertyMapper<T, K extends keyof T>  extends Mapper<T, K> {}
export interface NumberMapper<T> extends Mapper<T, number> {}
export interface Predicate<T> extends Mapper<T, boolean> {}

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
        count(): number;
        countIf(filter: Predicate<T>): number;
        sum(this: number[]): number;
        max<U extends Comparable>(this: U[]): number | undefined;
        min<U extends Comparable>(this: U[]): number | undefined;

        sum(callbackfn: NumberMapper<T>): number;
        max<U extends Comparable>(callbackfn: Mapper<T, U>): T | undefined;
        min<U extends Comparable>(callbackfn: Mapper<T, U>): T | undefined;

        anyMatch(callbackfn: Predicate<T>): boolean;
        allMatch(callbackfn: Predicate<T>): boolean;
        //#endregion


        //#region 遍历函数
        first(): T | undefined;
        last(): T | undefined;

        distinct<U extends Comparable>(this: U[]): T[];
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