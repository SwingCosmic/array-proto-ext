# array-proto-ext
A functional extension directly adds to Array.prototype

----
## features

* Strong type definition

  Fully written by TypeScript.
* Webpack support

  You can use it in any Webpack project like Vue CLI.
* High performance

  * Use `Lodash` to improve the performance.
  * Use ES2015 generator function and `for ... of ...` expression(target to ES6) to decrease the useless `for` loop.
* Import just **ONCE** in the entry point
  
  Directly add functions to Array.prototype
* Conditional version of query functions, like `countIf`, `sumBy`, etc.
* Unit test support
  
----
## example

```javascript
import "array-proto-ext";

let arr = Array.prototype.range(2, 10);
// arr = [2, 3, 4, 5, 6, 7, 8, 9, 10]
let evenCount = arr.countIf(x => x % 2 === 0);
// evenCount = 5
let items = [
    { id: "100001", itemId: 1, name: "item A" },
    { id: "100002", itemId: 2, name: "item B" },
    { id: "100003", itemId: 1, name: "another item A"},
];
let ownedIds = items.distinct(x => x.itemId)
                    .map(x => x.itemId);
// ownedIds = [1, 2]
```