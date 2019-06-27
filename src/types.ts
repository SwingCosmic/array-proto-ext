export type Comparable = number | string | boolean | Date ;
export interface Dictionary<V> { [key: string]: V; }

export type Mapper<T, U> = (obj: T) => U;
export interface PropertyMapper<T, K extends keyof T>  extends Mapper<T, K> {}
export interface NumberMapper<T> extends Mapper<T, number> {}
export interface Predicate<T> extends Mapper<T, boolean> {}