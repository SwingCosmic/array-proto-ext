export type Comparable = number | string | Date ;
export interface Dictionary<V> { [key: string]: V; }

export interface Mapper<T, U> { (obj: T): U; }
export interface NumberMapper<T> extends Mapper<T, number> {}
export interface Predicate<T> extends Mapper<T, boolean> {}