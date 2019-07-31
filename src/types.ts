export interface Dictionary<T> { [key: string]: T; }

export type PrimitiveType = number | string | boolean;
export type Comparable = PrimitiveType | Date ;
export type Equatable = PrimitiveType | symbol;

export type MethodName<T> = {
    [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never;
}[keyof T];
export type PropertyName<T> = Exclude<keyof T, MethodName<T>>;

export type Mapper<T, U> = (obj: T) => U;
export interface MemberMapper<T, K extends keyof T>  extends Mapper<T, K> {}
export interface PropertyMapper<T, K extends PropertyName<T>>  extends MemberMapper<T, K> {}
export interface NumberMapper<T> extends Mapper<T, number> {}
export interface Predicate<T> extends Mapper<T, boolean> {}

// Copied from Vue's definition
export type Constructor<T> = (() => T) | (new(...args: any[]) => T & object) | (new(...args: string[]) => Function)

export type OrderString = "asc" | "desc";