import { Constructor } from './types';

export function isType<T>(o: any, constructor: Constructor<T>): boolean {
    if (constructor as Constructor<string> === String && 
        Object.prototype.toString.call(o) === "[object String]") {
        return true; 
    } else if (constructor as Constructor<number> === Number && 
        Object.prototype.toString.call(o) === "[object Number]") {
        return true; 
    } else if (constructor as Constructor<boolean> === Boolean && 
        Object.prototype.toString.call(o) === "[object Boolean]") {
        return true; 
    } else if (constructor as Constructor<object> === Object && 
        (typeof(o) === "object" || typeof(o) === "string")) {
        return true; // Object.create(null), string literal
    }
    return o instanceof constructor;
}