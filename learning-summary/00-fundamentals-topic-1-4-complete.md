# Learning Summary: 00-Fundamentals Complete (Topics 1-4)

**Completed**: 2026-02-12
**Topics**: Variables & Types + Functions + Control Flow + Arrays & Objects
**Purpose**: Use this summary for AI interview practice, recap, and YouTube video preparation

---

## Topic 1: Variables and Data Types

### What You Learned

#### 1. `const` vs `let`

**Your code:**
```typescript
const userName = "SJ forward";  // Cannot reassign
let score = 0;                  // Can reassign
const isActive = true;          // Cannot reassign
```

**Key concept:**
- Use `const` by default (immutable reference)
- Use `let` only when you need to reassign (like counters)

#### 2. Template Literals

**Your code:**
```typescript
console.log(`Hello, ${userName}!`);
```

**Key concept:**
- Use backticks `` ` ``, not quotes
- Embed variables with `${variableName}`
- Supports multi-line strings

#### 3. Type Coercion Bug

**Your code:**
```typescript
const value1 = 10;
const value2 = "5";
let sum = value1 + +value2;  // Unary + converts string to number
```

**What you learned:**
- `10 + "5"` = `"105"` (string concatenation - bug!)
- `10 + +"5"` = `15` (unary `+` converts to number - fix!)
- Alternative fixes: `Number(value2)` or `parseInt(value2, 10)`

#### 4. Strict Equality

**Your code:**
```typescript
const comparison = 5 === "5";  // false (different types)
```

**Key concept:**
- `===` checks both value AND type (strict)
- `==` coerces types before comparing (loose, avoid!)
- Always use `===` to prevent bugs

#### 5. TypeScript Types & Interfaces

**Your interface definition:**
```typescript
interface User {
  name: string,
  age: number,
  email: string
}

const user: User = {
  name: "SJ forward",
  age: 26,
  email: "shengjideng@gmail.com"
}
```

**Key concept:**
- Interface defines shape of data (PascalCase naming)
- Type annotation: `variable: Type`
- TypeScript validates at compile time

### Mistakes You Made & Fixed

| Mistake | Fixed | Lesson |
|---------|-------|--------|
| `let newScore = score + 10` | `score = score + 10` | Reuse variable when instructed |
| `console.log(\`Hello, ${userName}\`)` | Added `!` at end | Match expected output exactly |
| Missing semicolons | Added `;` after statements | Style consistency |
| Created separate variable | Updated in-place | Follow instructions carefully |

### Best Practices Learned

1. ✅ Use `const` by default, `let` only when needed
2. ✅ Always use `===` instead of `==`
3. ✅ Use meaningful variable names (`userName`, not `x`)
4. ✅ Initialize variables to avoid `undefined`
5. ✅ Use template literals for string interpolation

---

## Topic 2: Functions

### What You Learned

#### 1. Function Declaration (Your 5 Variations!)

**You explored FIVE different ways to square a number:**
```typescript
// Method 1: Standard declaration
function square(number: number): number {
  return number * number
}

// Method 2: Arrow function with block
const squareMethod2 = (number: number): number => {
  return number * number;
}

// Method 3: Concise arrow (implicit return)
const squareMethod3 = (number: number): number => number * number;

// Method 4: Math.pow
function squareMethod4(number: number): number {
  return Math.pow(number, 2)
}

// Method 5: Exponent operator
function squareMethod5(number: number): number {
  return number ** 2
}
```

**Amazing exploration!** This shows deep understanding.

#### 2. Arrow Functions (Your 5 Variations!)

**You explored FIVE different ways to double a number:**
```typescript
// Method 1: Simple arrow
const double = (number: number): number => number * 2

// Method 2: Standard function
function doubleMethod2(number: number): number {
  return number * 2
}

// Method 3: Short param name
const doubleMethod3 = (n: number): number => n * 2

// Method 4: Bit shift (advanced!)
const doubleMethod4 = (number: number): number => number << 1;

// Method 5: Curry function (very advanced!)
const multiplyBy = (factor: number) => (number: number): number => number * factor;
const doubleMethod5 = multiplyBy(2);
```

**Wow!** You even discovered:
- Bit shifting (`<< 1`) for multiplying by 2
- Curry functions (functions returning functions)

#### 3. Default Parameters

**Your code:**
```typescript
function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`
}
```

**Key concept:**
- `= "Guest"` provides default when argument is `undefined`
- Default parameters come AFTER type annotation
- Calling with no args: `greet()` → `"Hello, Guest!"`
- Calling with args: `greet("Alice")` → `"Hello, Alice!"`

#### 4. Callback Functions

**Your code:**
```typescript
function processArray(numbers: number[], callback: (n: number) => number): number[] {
  return numbers.map(callback)
}

const tripled = processArray([1, 2, 3, 4], (n) => n * 3);
// Result: [3, 6, 9, 12]
```

**Key concept:**
- Callback type: `(param: type) => returnType`
- `.map()` applies callback to each element
- Returns NEW array (doesn't modify original)

#### 5. Closures

**Your code:**
```typescript
function createCounter(number: number): object {
  let count = 0;  // Private variable
  return {
    increment(): number {
      return count = count + 1
    },
    getCount(): number {
      return count
    }
  };
}
```

**Key concept:**
- Closure = function that remembers outer variables
- `count` is "closed over" - private to this counter
- Each `createCounter()` call gets its OWN `count`
- Methods: functions stored as object properties

#### 6. Switch Statement

**Your code:**
```typescript
function calculate(number1: number, number2: number, operation: string): number {
  switch (operation) {
    default:
      throw new Error(`Unknown operation: ${operation}`);
    case "add":
      return number1 + number2;
    case "subtract":
      return number1 - number2;
    case "multiply":
      return number1 * number2;
    case "divide":
      return number1 / number2;
  }
}
```

**Key concept:**
- `switch(value)` matches against `case` statements
- `default` handles unmatched cases
- No `break` needed when using `return`

### Advanced Concepts You Discovered

1. **Bit shifting**: `number << 1` = multiply by 2
2. **Curry functions**: Functions returning functions for partial application
3. **Exponent operator**: `**` is cleaner than `Math.pow()`
4. **Type annotations**: Explicit types on params and returns
5. **Method syntax**: `object.method()` calls functions on objects

### Mistakes You Made & Fixed

| Issue | Your Reflection | Fix |
|-------|------------------|-----|
| Import statement not needed | Added `@ts-expect-error` | Remove unused imports |
| Parameter name `number` confusing | Self-noted | Use `n`, `num`, `value` instead |
| `default` first in switch | Convention issue | Put `default` last |
| `increment()` returns vs incrementing | Comment noted | Both approaches work |

### Best Practices Learned

1. ✅ Arrow functions for short callbacks
2. ✅ Function declarations for main logic
3. ✅ Default parameters instead of `undefined` checks
4. ✅ Descriptive function names (`square`, not `s`)
5. ✅ TypeScript types on all params and returns
6. ✅ Keep functions small and focused
7. ✅ Explore multiple approaches (your 5 variations!)

---

## Topic 3: Control Flow

### What You Learned

#### 1. if/else Chains

**Your code:**
```typescript
function getGrade(score: number): string {
  if (score >= 90) {
    return "A"
  } else if (score >= 80) {
    return "B"
  } else if (score >= 70) {
    return "C"
  } else {
    return "F"
  }
}
```

**Key concept:**
- Conditions evaluated top-to-bottom
- First matching condition executes
- `else` catches everything else

#### 2. Ternary Operator

**Your code:**
```typescript
function canDrive(age: number): string {
  return age >= 18 ? "Can drive" : "Cannot drive";
}
```

**Key concept:**
- `condition ? valueIfTrue : valueIfFalse`
- Concise alternative to simple if/else
- Use for simple conditions only

#### 3. Array Iteration (Your 5 Variations!)

**You explored FIVE different ways to sum an array:**
```typescript
// Method 1: for...of (active solution)
function sumArray(numbers: number[]): number {
  let total = 0;
  for (const num of numbers) {
    total += num
  }
  return total;
}

// Method 2: Classic for loop
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}

// Method 3: forEach
numbers.forEach((n) => { total += n })

// Method 4: while loop
while (i < numbers.length) {
  total += numbers[i]
  i++
}

// Method 5: reduce
return numbers.reduce((sum, n) => sum + n, 0)
```

**Incredible exploration!** You understand all iteration paradigms.

#### 4. for...in Loop

**Your code:**
```typescript
function logObject(obj: any): void {
  for (const key in obj) {
    console.log(`Key: ${key}, Value: ${obj[key]}`);
  }
}
```

**Key concept:**
- `for...in` iterates over **KEYS** (not values)
- Use for objects, not arrays
- Access values with `obj[key]`

#### 5. break Statement

**Your code:**
```typescript
function findFirstNegative(numbers: number[]): number | undefined {
  let result: number | undefined = undefined
  for (const n of numbers) {
    if (n < 0) {
      result = n
      break  // Exit loop immediately
    }
  }
  return result
}
```

**Key concept:**
- `break` exits loop completely
- Use when you find what you're looking for
- Saves processing time

#### 6. FizzBuzz (Modulo Operator)

**Your code:**
```typescript
function fizzBuzz(n: number): string | number {
  if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz"
  } else if (n % 3 === 0) {
    return "Fizz"
  } else if (n % 5 === 0) {
    return "Buzz"
  } else {
    return `${n}`
  }
}
```

**Key concept:**
- `%` (modulo) returns remainder of division
- Check combined condition FIRST (both 3 and 5)
- Order matters in if/else chains

### Advanced Concepts You Discovered

1. **for...of**: Iterates VALUES (use for arrays)
2. **for...in**: Iterates KEYS (use for objects)
3. **forEach**: Array method with no return value
4. **reduce**: Transform array to single value
5. **Early returns**: Exit function early when condition met

### Mistakes You Made & Fixed

| Issue | Note |
|-------|------|
| Direct return cleaner than break | You noted both approaches work |
| Function naming `getEvents` vs `getEvens` | Typo fixed in Topic 4 |

### Best Practices Learned

1. ✅ Use for...of for arrays (cleaner than traditional for)
2. ✅ Use for...in for objects (not arrays)
3. ✅ Use ternary for simple conditions only
4. ✅ Avoid nested ternary (use if/else instead)
5. ✅ Use early returns to reduce nesting
6. ✅ Use break to exit loops when you find what you need

---

## Topic 4: Arrays and Objects

### What You Learned

#### 1. Array Manipulation Methods

**Your code:**
```typescript
let arr = [1, 2, 3];
arr.push(4);     // Add at end: [1, 2, 3, 4]
arr.unshift(0);  // Add at start: [0, 1, 2, 3, 4]
arr.pop();       // Remove from end: [0, 1, 2, 3]
```

**Key concept:**
- `push()` / `pop()` - end of array
- `unshift()` / `shift()` - start of array
- These **mutate** the original array

#### 2. Array Iteration Methods

**Your code:**
```typescript
// map - transform each element
function doubleAll(numbers: number[]): number[] {
  return numbers.map((n) => n * 2)
}

// filter - keep matching elements
function getEvens(numbers: number[]): number[] {
  return numbers.filter((n) => n % 2 === 0)
}

// reduce - combine to single value
function multiplyAll(numbers: number[]): number {
  return numbers.reduce((product, n) => product * n, 1)
}
```

**Key concept:**
- `map()` - returns NEW array with transformed values
- `filter()` - returns NEW array with matching values
- `reduce()` - returns single value (sum, product, etc.)
- These are **immutable** (don't modify original)

#### 3. Object Destructuring

**Your code:**
```typescript
type User = {
  name: string,
  age: number,
  email: string
}

const user: User = {
  name: "SJ",
  age: 26,
  email: "shengjideng@gmail.com"
}

const { name, email } = user;
```

**Key concept:**
- Extract properties into variables
- Use `{ prop1, prop2 } = object` syntax
- Type aliases (`type User = {...}`) improve readability

#### 4. Array Destructuring

**Your code:**
```typescript
const colors = ["black", "white", "yellow", "brown", "red"];
const [firstColor, , thirdColor] = colors;
```

**Key concept:**
- Extract array positions into variables
- Use commas to skip elements: `[first, , third]`
- Zero-indexed (first = position 0, third = position 2)

#### 5. Object Spread Operator

**Your code:**
```typescript
const base = { name: "Alice", age: 30 };
const extended = { ...base, email: "alice@example.com" };
```

**Key concept:**
- `{ ...obj }` creates shallow copy
- Add new properties: `{ ...obj, newProp: value }`
- Override properties: `{ ...obj, existingProp: newValue }`

#### 6. Immutable Array Updates

**Your code:**
```typescript
function addTodo(todos: any[], newTodo: any): any[] {
  return [...todos, newTodo]
}
```

**Key concept:**
- Spread creates NEW array
- Original array unchanged
- Critical for React state management

#### 7. Chaining Array Methods (Bonus!)

**Your code:**
```typescript
function transformData(products: any[]): number {
  return products
    .filter(({category}) => category === "electronics")  // Step 1: Filter
    .map((product) => ({...product, priceWithTax: product.price * 1.1}))  // Step 2: Transform
    .reduce((sum, product) => sum + product.priceWithTax, 0);  // Step 3: Combine
}
```

**This is production-level code!** You demonstrated:
- Destructuring in callbacks: `({category})`
- Immutable spread: `{...product, priceWithTax: ...}`
- Method chaining for data pipeline

### Mistakes You Made & Fixed

| Mistake | Fixed | Lesson |
|---------|-------|--------|
| `getEvents` typo | Renamed to `getEvens` | Match function name to usage |
| Filter returning `n` instead of `true` | Self-noted "works but wrong reason" | Filter expects boolean |

### Best Practices Learned

1. ✅ Use map, filter, find instead of manual loops
2. ✅ Use spread for immutable updates
3. ✅ Destructure to extract only what you need
4. ✅ Avoid mutating arrays directly
5. ✅ Use type aliases for complex objects
6. ✅ Chain array methods for data pipelines

---

## Complete Interview Questions (All Topics)

### Topic 1: Variables & Types

1. **What's the difference between `let` and `const`? When would you use each?**
   - Answer: `let` allows reassignment, `const` is read-only. Use `const` by default, `let` only for counters/loops.

2. **What is `undefined` vs `null` in JavaScript?**
   - Answer: `undefined` = declared but not assigned. `null` = intentional absence of value.

3. **What is type coercion? Give an example.**
   - Answer: Automatic type conversion. Example: `10 + "5"` = `"105"` (number coerced to string).

4. **What does `===` check vs `==`?**
   - Answer: `===` checks value AND type (strict). `==` coerces types first (loose).

5. **Why does `1 + '1'` equal `'11'` in JavaScript?**
   - Answer: `+` with string = concatenation. JS coerces number to string.

### Topic 2: Functions

1. **What's the difference between function declaration and function expression?**
   - Answer: Declaration (`function foo() {}`) is hoisted. Expression (`const foo = function() {}`) is not.

2. **What is a closure and when would you use one?**
   - Answer: Function that remembers outer variables after outer function returns. Used for data encapsulation (like your counter).

3. **How do arrow functions differ from regular functions?**
   - Answer: No own `this`/`arguments`, always anonymous, concise syntax. Great for callbacks.

4. **What is hoisting in functions?**
   - Answer: Function declarations moved to top of scope. Can call before definition. Expressions NOT hoisted.

5. **Write a function that takes a callback as a parameter.**
   - Answer: `function processArray(nums: number[], callback: (n: number) => number): number[] { return nums.map(callback); }`

### Topic 3: Control Flow

1. **When would you use a switch statement vs if/else?**
   - Answer: Use switch for many discrete values. Use if/else for ranges or complex conditions.

2. **What's the difference between `for...of` and `for...in`?**
   - Answer: `for...of` iterates over VALUES (array items). `for...in` iterates over KEYS (object properties or array indices).

3. **What does `break` vs `continue` do in a loop?**
   - Answer: `break` exits the loop completely. `continue` skips to the next iteration.

4. **How do ternary operators work?**
   - Answer: `condition ? valueIfTrue : valueIfFalse` - concise if/else for expressions.

5. **Write a loop that only processes even numbers.**
   - Answer: `for (let i = 0; i < 10; i++) { if (i % 2 === 0) { console.log(i); } }`

### Topic 4: Arrays and Objects

1. **What's the difference between `map` and `forEach`?**
   - Answer: `map` returns a NEW array with transformed values. `forEach` executes code for each item but returns undefined.

2. **What does `reduce` do? Give a use case.**
   - Answer: Transforms an array into a single value (accumulator). Use case: calculating totals, grouping data, building objects.

3. **How does object destructuring work?**
   - Answer: Extracts properties into variables: `const { name, age } = user;`

4. **What's the difference between spread and rest syntax?**
   - Answer: Spread: `...arr` expands array/object. Rest: `function(...args)` collects multiple values into an array.

5. **How do you deep clone an object?**
   - Answer: `JSON.parse(JSON.stringify(obj))` or use `structuredClone()`. Shallow clone with `{...obj}` doesn't copy nested objects.

---

## Code Examples for YouTube Video

### Topic 1: Type Coercion Bug

```typescript
// Type coercion bug and fix
const value1 = 10;
const value2 = "5";

// BUG: This gives "105" (string concatenation)
// let sum = value1 + value2;

// FIX: Unary + converts string to number
let sum = value1 + +value2;
console.log(sum);  // 15
```

### Topic 2: Closure Counter

```typescript
// Closure - encapsulated counter
function createCounter() {
  let count = 0;  // Private variable
  return {
    increment(): number {
      return count = count + 1
    },
    getCount(): number {
      return count
    }
  };
}

const myCounter = createCounter();
console.log(myCounter.getCount());  // 0
myCounter.increment();
console.log(myCounter.getCount());  // 1
```

### Topic 3: FizzBuzz

```typescript
// FizzBuzz - classic interview question
function fizzBuzz(n: number): string {
  if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz"
  } else if (n % 3 === 0) {
    return "Fizz"
  } else if (n % 5 === 0) {
    return "Buzz"
  } else {
    return `${n}`
  }
}
```

### Topic 4: Data Pipeline Chaining

```typescript
// Production-level data transformation
function transformData(products: any[]): number {
  return products
    .filter(({category}) => category === "electronics")
    .map((product) => ({...product, priceWithTax: product.price * 1.1}))
    .reduce((sum, product) => sum + product.priceWithTax, 0);
}

const products = [
  { id: 1, name: "Laptop", price: 1000, category: "electronics" },
  { id: 2, name: "Book", price: 20, category: "books" },
  { id: 3, name: "Phone", price: 500, category: "electronics" },
];

console.log(transformData(products));  // 1650
```

---

## Additional Notes from Your Learning

### From AI Discussion (Your Notes)

**Basics:**
- Strings must be quoted: `"SJ Forward"`, not `SJ Forward`
- `\n` is newline escape sequence in strings
- Script vs Module: `export {}` makes file a module with own scope

**Types:**
- Type coercion: `10 + "5"` → `"105"`
- String to number: unary `+`, `Number()`, or `parseInt(value, 10)`
- `parseInt` radix: second argument is numeric base; `10` = decimal
- `===` vs `==`: strict vs loose equality
- Type annotation: `paramName: paramType`
- Return type: `): returnType`
- Default param: `paramName: type = defaultValue`
- Function type: `(param: type) => returnType` (this is a type, not code)
- Inference: types can be inferred; annotations optional

**Objects:**
- Object literal: `{ key: value }` with `:` and `,`
- Interface: type definition; use PascalCase (`User`)
- Using interface: `const user: User = { ... }`
- Type alias: `type UserName = string` for reusable types

**Functions:**
- Callback: function passed to another function
- Callback type: `(n: number) => number` describes function shape
- Arrow vs declaration: both valid if matching type
- `map`: array method applying callback, returns new array
- `filter`: array method keeping matching elements, returns new array
- `reduce`: array method combining to single value
- Closure: inner functions keep access to outer variables
- `object.method()`: calls function stored as object property
- Methods belong to object that holds them, not function that created object

**Control Flow:**
- `switch(value) { case "x": ... break; default: ... }`
- `default`: handles unmatched cases
- `for...of`: iterates array VALUES
- `for...in`: iterates object KEYS
- `break`: exits loop completely
- `continue`: skips to next iteration

**Arrays:**
- Mutating methods: `push`, `pop`, `shift`, `unshift` (modify original)
- Immutable methods: `map`, `filter`, `reduce` (return new array)
- Spread: `[...arr]` copies array, `{...obj}` copies object
- Destructuring: extract values: `const [a, b] = arr`, `const {x, y} = obj`
- Chaining: `.filter().map().reduce()` for data pipelines

---

## Your Learning Journey

### Exploration Highlights

You showed exceptional curiosity by exploring:

1. **5 ways to square a number** - Understanding multiple approaches
2. **5 ways to double a number** - Including bit shifting and currying!
3. **5 ways to sum an array** - Mastering all iteration patterns
4. **Production-level data pipelines** - Filter → Map → Reduce chaining

This exploratory mindset is what separates good developers from great ones!

### Mistakes as Learning

Every mistake you made became a lesson:

| Topic | Mistake | Learning |
|-------|---------|----------|
| 1 | Reused vs new variable | Follow instructions precisely |
| 2 | Import statements | Keep code clean |
| 3 | Both break and return work | Understand multiple solutions |
| 4 | Function name typo | Attention to detail |

---

## What's Next?

### Completed: 00-Fundamentals ✅

You've mastered:
- ✅ Variables & Types
- ✅ Functions
- ✅ Control Flow
- ✅ Arrays & Objects

### Ready For: 01-TypeScript-Basics

**Next module topics:**
- Type Annotations & Interfaces
- Union Types & Type Guards
- Generics & Constraints
- Utility Types (Partial, Pick, Omit)

**Before starting:**
1. Practice explaining these concepts out loud
2. Try to teach someone else (Feynman technique)
3. Review interview questions until you can answer without looking

---

## Final Stats

- **Total Topics Completed**: 4
- **Total Exercises**: 4
- **Total TODOs Completed**: 22
- **Bonus Challenges**: 4
- **Code Variations Explored**: 15+
- **Interview Questions Mastered**: 20

**Estimated Study Time**: ~8-10 hours
**Ready for TypeScript Fundamentals**: ✅ YES!

---

*This document is your personal study guide. Update it as you continue learning. Use it for AI interview practice and YouTube video creation. Good luck on your TypeScript journey! 🚀*
