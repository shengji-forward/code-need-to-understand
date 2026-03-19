# JavaScript Abstraction Hierarchy (Refined)

## Overview

This document represents a refined understanding of JavaScript's abstraction layers, incorporating concepts from both 00-fundamentals and 02-async-programming modules, with corrections based on production JavaScript/TypeScript patterns.

---

## Layer Hierarchy (Bottom-Up)

```
Layer 0: Foundation - Primitive Values (Raw Materials)
         ↓
Layer 1: Naming - Variables & Scope (Labeled Storage)
         ↓
Layer 2: Collection - Arrays, Objects, Built-ins (Organization)
         ↓
Layer 3: Behavior - Functions as First-Class Objects (Reusable Logic)
         ↓
Layer 4: Blueprints - Prototypes & Classes (Object Templates)
         ↓
Cross-Cutting: Async, Control Flow, Patterns (Span Multiple Layers)
```

---

## Layer 0: Foundation - Primitive Values

**The raw LEGO pieces of JavaScript - immutable values.**

### Level 1: Value Types
```
primitives {
  number:           // 64-bit floating point (including integers)
  string:           // UTF-16 text sequences
  boolean:          // true | false
  null:             // Intentional absence
  undefined:        // Unintentional absence
  symbol:           // ES6+ unique identifiers
  bigint:           // ES2020+ arbitrary precision integers
}
```

### Level 2: Value Operations
```
type-coercion {
  implicit:         // Automatic conversion (==, + with strings)
  explicit:         // Manual conversion (Number(), String(), Boolean())
  coercion-rules:   // ToPrimitive, ToString, ToNumber abstract operations
}

equality {
  loose-equality:   // == (with coercion)
  strict-equality:  // === (no coercion)
  same-value:       // Object.is() (handles NaN correctly, -0 vs 0)
}

truthy-falsy {
  falsy:            // false, 0, -0, 0n, "", null, undefined, NaN
  truthy:           // Everything else (including "0", [], {})
}
```

---

## Layer 1: Naming - Variables & Scope

**Labeled storage that references values.**

### Level 1: Declaration Types
```
declarations {
  const:            // Immutable reference (value can mutate if object/array)
  let:              // Mutable reference, block-scoped
  var:              // Legacy, function-scoped, hoisted (avoid in modern code)
}
```

### Level 2: Scope System
```
scope-types {
  global-scope:     // Window (browser) / global (Node.js)
  function-scope:   // Created by function boundaries (var, parameters)
  block-scope:      // Created by { } blocks (let, const)
  module-scope:     // File-level scope in ES modules
}

scope-chain {
  lexical-scope:    // Scope determined by where code is written (static)
  scope-lookup:     // Engine walks up scope chain to resolve variables
  shadowing:        // Inner variable can hide outer variable with same name
}

hoisting {
  var-hoisting:     // Declarations moved to top, initialized as undefined
  let-temporal-dead-zone:  // Access before declaration throws ReferenceError
  function-hoisting:       // Full function body hoisted (declaration only)
}
```

---

## Layer 2: Collection - Data Organization

**Ways to group and structure multiple values.**

### 2.1 Arrays (Ordered Collections)
```
array-structure {
  index:            // Numeric keys 0, 1, 2... (access: arr[index])
  length:           // arr.length property (not count of elements)
  sparse:           // Arrays can have empty slots
  heterogenous:     // Can hold mixed types
}

array-method-categories {
  mutation: {
    push/unshift:   // Add to end/beginning, return new length
    pop/shift:      // Remove from end/beginning, return removed element
    splice:         // Remove/insert at any position
    sort/reverse:   // In-place reordering
  }

  iteration: {
    forEach:        // Side-effect loop (no return value)
    map:            // Transform, return new array (1:1)
    filter:         // Subset, return new array (N:1 or 0)
    find:           // Return first match (single element)
    some/every:     // Return boolean (any/all match)
    reduce:         // Accumulate to single value (flexible)
    flat/flatMap:   // Flatten nested arrays
  }

  inspection: {
    includes:       // Boolean: contains value?
    indexOf:        // Number: first index of value
    findIndex:      // Number: first index matching predicate
  }
}
```

### 2.2 Objects (Key-Value Collections)
```
object-structure {
  property:         // key + value pair
  key-types:        // Strings and Symbols only
  dynamic:          // Properties can be added/removed at runtime
  reference:        // Objects are referenced by memory address
}

property-access {
  dot-notation:     // obj.property (key must be valid identifier)
  bracket-notation: // obj["prop"] or obj[key] (any expression)
  optional-chaining: // obj?.nested?.prop (short-circuit if null/undefined)
  computed:         // obj[`${dynamic}Key`] (ES6)
}

built-in-static-methods {
  Object.keys():    // Array of own enumerable property names
  Object.values():  // Array of own enumerable property values
  Object.entries(): // Array of [key, value] pairs
  Object.assign():  // Copy properties from source to target
  Object.freeze():  // Make object immutable
  Object.is():      // Same-value equality (better than === for NaN)
}
```

### 2.3 Built-in Collections (ES6+)
```
map: {
  purpose:          // Key-value pairs where keys can be any type
  difference-from-object:  // Keys can be objects, preserves insertion order
  size-property:    // map.size (not .length)
}

set: {
  purpose:          // Unique values only (no duplicates)
  use-cases:        // Deduplication, membership testing
}

weakmap-weakset: {
  purpose:          // Hold object references without preventing garbage collection
  use-cases:        // Caching, metadata storage
}
```

---

## Layer 3: Behavior - Functions as First-Class Objects

**Functions ARE objects in JavaScript - they can be passed, returned, and have properties.**

### Level 1: Function Types
```
function-declaration {
  syntax:           // function name() { }
  hoisted:          // Full body hoisted, usable anywhere in scope
  named:            // Required (for recursion, stack traces)
}

function-expression {
  syntax:           // const fn = function() { }
  not-hoisted:      // Only usable after declaration
  anonymous:        // Can be (name optional in callbacks)
  named:            // Better for debugging, recursion
}

arrow-function {
  syntax:           // const fn = () => { }
  not-hoisted:      // Same as expression
  lexical-this:     // Inherits this from surrounding scope (no own this)
  implicit-return:  // Single expression: () => value (no braces needed)
  no-arguments:     // Does not have own arguments object
}

generator-function {
  syntax:           // function* name() { }
  yield:            // Pause execution, return value, resume later
  iterable:         // Returns Generator object (implements Iterator protocol)
}
```

### Level 2: First-Class Nature
```
functions-as-values {
  passed-as-arguments:  // Callbacks, event handlers
  returned-from-functions:  // Closures, factories
  assigned-to-variables:   // const fn = function() { }
  stored-in-data-structures:  // Arrays of functions, object methods
  properties-on-functions:    // fn.name, fn.length, fn.customProp
}

higher-order-functions {
  definition:       // Function that takes/returns functions
  examples:         // Array methods (map, filter), decorators
}
```

### Level 3: Closures & Scope
```
closure {
  definition:       // Function + Lexical Environment (remembers variables from birth scope)
  use-cases:        // Data privacy, factories, memoization, partial application
  memory:           // Keeps outer variables alive (can cause memory leaks)
}

function-factories {
  pattern:          // Function that returns customized functions
  example:          // function createMultiplier(x) { return (n) => n * x; }
}

partial-application {
  definition:       // Pre-filling some arguments, returning function waiting for rest
  example:          // const add5 = (x) => add(5, x)
}

currying {
  definition:       // Transform f(a,b,c) into f(a)(b)(c)
  pattern:          // Unary functions only (single argument each)
}

recursive-functions {
  definition:       // Function calls itself
  requirements:     // Base case + recursive case
  call-stack:       // Each call adds frame (stack overflow risk)
  tail-call:        // Optimization (not consistently supported in JS)
}
```

### Level 4: Parameters & Return Values
```
parameters {
  required:         // function fn(a, b) { }
  default:          // function fn(a = 1, b = 2) { }
  rest:             // function fn(...args) { } (captures all to array)
  destructured:     // function fn({ a, b }) { }
}

callback-functions {
  definition:       // Function passed as argument to be called later
  sync-callback:    // Called immediately (array.map, array.filter)
  async-callback:   // Called later (event handlers, fs.readFile)
  inversion-of-control:  // You don't control when/how it's called
}
```

---

## Layer 4: Object Orientation - Prototypes & Classes

**JavaScript's inheritance is based on prototypes, not classes. Classes are syntax sugar.**

### Level 1: Prototypes (The Real Mechanism)
```
prototype-chain {
  __proto__:        // Internal link pointing to parent object
  prototype-property:  // On constructor functions, points to prototype object
  chain-lookup:     // Engine walks __proto__ chain for property access
  chain-end:        // Object.prototype.__proto__ === null
}

behavior-delegation {
  pattern:          // Objects delegate to prototypes, not copy behavior
  dynamic:          // Prototype chain can be modified at runtime
  performance:      // Deep chains slow down property lookup
}
```

### Level 2: Constructor Functions (Pre-ES6 Pattern)
```
constructor-functions {
  syntax:           // function Person(name) { this.name = name; }
  new-keyword:      // const p = new Person("Alice") (creates instance)
  prototype-methods:  // Person.prototype.greet = function() { }
  this-binding:     // `this` refers to newly created object
}
```

### Level 3: Classes (ES6+ Syntax Sugar)
```
class-syntax {
  declaration:      // class Person { constructor(name) { this.name = name; } }
  extends:          // class Student extends Person { }
  super:            // Call parent constructor/method (super(), super.method())
  methods:          // Automatically added to prototype
  static-methods:   // class MyClass { static method() { } } (on constructor, not instances)
  private-fields:   // class MyClass { #private = 0; } (ES2022)
}

class-vs-prototype {
  classes-are-sugar:  // class Fn extends Parent {} === Fn.prototype = Object.create(Parent.prototype)
  hoisting:         // Classes are not hoisted (temporal dead zone like let/const)
  new-required:      // Must call with new (enforced)
}
```

### Level 4: The `this` Binding (Runtime Context)
```
this-rules {
  1-default-binding:     // this === global (strict mode: undefined)
  2-implicit-binding:    // obj.method() → this === obj (left of dot)
  3-explicit-binding:    // call/apply/bind (fn.call(obj), fn.bind(obj))
  4-new-binding:         // new Fn() → this === new instance
  5-arrow-binding:       // this === outer scope's this (cannot be bound)
}

common-pitfalls {
  lost-this:            // const fn = obj.method; fn() → this !== obj
  callback-this:        // setTimeout(obj.method, 100) → this lost
  solutions:            // .bind(), arrow function wrapper, .bind(this) pattern
}

call-apply-bind {
  fn.call(thisArg, arg1, arg2):      // Call immediately, explicit this
  fn.apply(thisArg, [arg1, arg2]):  // Call immediately, args as array
  fn.bind(thisArg):                  // Return new function with bound this
}
```

---

## Cross-Cutting Concepts

These concepts span multiple layers and don't fit cleanly into one category.

### Control Flow (Syntax & Patterns)
```
conditionals {
  if-else:          // Branching based on boolean expression
  ternary:          // condition ? trueValue : falseValue (expression, not statement)
  switch:           // Multiple equality checks (strict ===)
  short-circuit:    // || (default), && (guard), ?? (nullish coalescing)
}

loops {
  for-loop:         // Traditional: for (let i = 0; i < n; i++)
  for-of:           // Iterate iterables: for (const item of array)
  for-in:           // Iterate object keys (includes prototype chain - use carefully)
  while-loop:       // while (condition) { }
  do-while:         // do { } while (condition) (always runs once)
  loop-control:     // break (exit), continue (skip to next iteration)
}

patterns {
  early-return:     // Exit function early if conditions not met (reduces nesting)
  guard-clauses:    // if (!valid) return; // rest of function
  loop-control:     // Break/continue for readable flow
}
```

### Async Programming (Runtime Model)
```
event-loop {
  call-stack:       // Synchronous code execution (LIFO)
  web-apis:         // Browser/Node.js async operations (setTimeout, fetch)
  task-queue:       // Callback queue (macrotasks)
  microtask-queue:  // Promise callbacks, queueMicrotask (higher priority)
  execution-order:  // Sync → Microtasks → Macrotasks → Repeat
}

promise-object {
  states:           // pending → fulfilled (value) | rejected (reason)
  immutable-state:  // Once settled, cannot change
  constructor:      // new Promise((resolve, reject) { })
  instance-methods: // .then(onFulfilled, onRejected), .catch(onRejected), .finally(onSettled)
}

promise-static-methods {
  Promise.all:         // All must fulfill (rejects fast on first rejection)
  Promise.allSettled:  // Wait for all to settle (never rejects)
  Promise.race:        // First to settle (fulfill or reject)
  Promise.any:         // First to fulfill (aggregates rejections)
  Promise.resolve:     // Create fulfilled promise
  Promise.reject:      // Create rejected promise
}

async-await {
  async-function:   // Always returns Promise
  await-expression: // Pause until Promise settles, unwrap value
  try-catch:        // Error handling for awaited rejections
  sequential:       // await in sequence (each waits for previous)
  parallel:         // Promise.all([await1, await2]) for concurrent
}

error-handling {
  throw:            // throw new Error("message") or throw value
  try-catch-finally: // try { } catch (error) { } finally { }
  error-types:      // Error, TypeError, ReferenceError, SyntaxError, RangeError
  custom-errors:    // class CustomError extends Error { }
  global-handlers:  // window.onerror, unhandledrejection
  promise-rejection: // Unhandled rejections → warnings in Node.js
}
```

### Modern Patterns & Syntax
```
destructuring {
  array-destructure:    // const [first, second] = array
  object-destructure:   // const { name, age } = person
  nested-destructure:   // const { user: { name } } = data
  rest-destructure:     // const { first, ...rest } = obj
  default-values:       // const { name = "Anonymous" } = obj
  parameter-destructure: // function fn({ a, b }) { }
}

spread-operator {
  spread-array:         // [...arr1, ...arr2] (shallow copy)
  spread-object:        // { ...obj1, ...obj2 } (shallow copy)
  function-arguments:   // fn(...args) (spread array as arguments)
  overrides:            // { ...obj, newProp: value } (later props win)
}

immutability {
  principle:            // Don't modify existing data, create new data
  benefits:             // Predictability, testability, reactivity (React/Redux)
  techniques:           // Spread, Object.freeze, Readonly<T>, libraries (Immer)
  shallow-vs-deep:      // Spread is shallow copy (nested objects still shared)
}

template-literals {
  interpolation:        // `Hello ${name}` (embed expressions)
  multi-line:           // Preserve newlines/formatting
  tagged-templates:     // tag`string ${expr}` (custom processing)
}

optional-chaining {
  syntax:               // obj?.nested?.prop (short-circuits on null/undefined)
  method-calls:         // obj.method?.() (safe method invocation)
  element-access:       // arr?.[index]
}

nullish-coalescing {
  syntax:               // value ?? defaultValue
  difference-from-or:    // Only triggers on null/undefined, not falsy values
  use-cases:            // Defaults when 0, "", false are valid
}
```

---

## Key Insights from This Hierarchy

1. **Functions are objects** - They're not just Layer 3, they exist in Layer 2 too (properties, methods)

2. **Everything is a value** - Including functions, objects, arrays (can be assigned, passed, returned)

3. **References matter** - Objects/arrays are passed by reference, primitives by value

4. **Async is runtime** - It's not just syntax, it's about how the JavaScript engine executes code

5. **Prototypes are core** - Classes are convenient syntax, but prototypes are the fundamental mechanism

6. **Scope is lexical** - Determined at write-time, not runtime (except `this` and `eval`)

---

## Common Gotchas

| Concept | Gotcha | Solution |
|---------|--------|----------|
| Array equality | `[] === []` is `false` | Compare values, not references |
| Object copying | Spread does shallow copy | Use structuredClone or JSON.parse(JSON.stringify(obj)) for deep copy |
| `this` in callbacks | `setTimeout(obj.method)` loses `this` | Use `.bind(this)` or arrow function |
| Async errors | Unhandled promise rejections | Always use `.catch()` or `try/catch` |
| Closure loops | `for` loop + closures share variable | Use `let` or IIFE to capture value |
| `==` vs `===` | `==` coerces types unexpectedly | Always use `===` |
| Array `delete` | `delete arr[1]` creates sparse array | Use `splice` instead |
| Function `length` | Arrow functions don't have `arguments` | Use `...args` rest parameter |

---

## Learning Progression

Based on the curriculum structure:

1. **Start with Layer 0-2** (00-fundamentals: values, variables, arrays, objects)
2. **Master Layer 3** (functions, closures, first-class nature)
3. **Add control flow** (conditionals, loops)
4. **Tackle async** (promises, async/await - relies on functions)
5. **Learn Layer 4** (prototypes, classes, `this`)
6. **Practice patterns** (destructuring, spread, immutability)

Each layer builds on the previous. You can't effectively use closures (Layer 3) without understanding scope (Layer 1). You can't understand prototypes (Layer 4) without understanding objects (Layer 2) and functions (Layer 3).

---

**Credits**: Original layer concept from Claude, refined based on 00-fundamentals and 02-async-programming modules, with production JavaScript/TypeScript patterns.
