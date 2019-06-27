# array-proto-ext
A functional extension directly adds to Array.prototype

----
## features

* Strong type definition(written by TypeScript)
* Webpack support(e.g. Vue CLI project)
* Import just **ONCE** in the entry, directly add functions to Array.prototype
* Conditional collection query functions, like `countIf`, `groupBy`, etc.
* Unit test
  
----
## example

```javascript
import "array-proto-ext";

let arr = Array.prototype.range(2, 10);
// arr = [2, 3, 4, 5, 6, 7, 8, 9, 10]
let evenCount = arr.count(x => x % 2 === 0);
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