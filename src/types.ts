export interface Dictionary<T> { [key: string]: T; }

export type PrimitiveType = number | string | boolean;
export type Comparable = PrimitiveType | Date ;
export type Equatable = PrimitiveType | symbol

export type Mapper<T, U> = (obj: T) => U;
export interface PropertyMapper<T, K extends keyof T>  extends Mapper<T, K> {}
export interface NumberMapper<T> extends Mapper<T, number> {}
export interface Predicate<T> extends Mapper<T, boolean> {}

export type OrderString = "asc" | "desc";