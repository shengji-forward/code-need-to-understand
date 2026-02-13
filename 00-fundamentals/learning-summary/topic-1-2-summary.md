# Learning Summary: Topics 1-2

**Completed**: 2026-02-12
**Topics**: Variables & Types + Functions
**Purpose**: Use this summary for AI interview practice, recap, and YouTube video preparation

---

## Topic 1: Variables and Data Types

### What You Learned

#### 1. `const` vs `let`

**Your code:**
```typescript
const userName = "SJ forward";  // Cannot reassign
let score = 0;                  // Can reassign
const isActive = true;           // Cannot reassign
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

#### 5. TypeScript Types

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
- `default` handles unmatched cases (conventionally last)
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
| Import statement not needed | Added `@ts-expect-error: Js version more clear` | Remove unused imports |
| Parameter name `number` confusing | Self-noted | Use `n`, `num`, `value` instead |
| `default` first in switch | Convention issue | Put `default` last |
| `increment()` returns new value vs incrementing | Comment: "Previsou issue: return count + 1" | Both approaches work |

### Best Practices Learned

1. ✅ Arrow functions for short callbacks
2. ✅ Function declarations for main logic
3. ✅ Default parameters instead of `undefined` checks
4. ✅ Descriptive function names (`square`, not `s`)
5. ✅ TypeScript types on all params and returns
6. ✅ Keep functions small and focused
7. ✅ Explore multiple approaches (your 5 variations!)

---

## Interview Questions (Practice These!)

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

---

## Code Examples for YouTube Video

### Topic 1 Example (from your code)

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

### Topic 2 Example (from your code)

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

**Functions:**
- Callback: function passed to another function
- Callback type: `(n: number) => number` describes function shape
- Arrow vs declaration: both valid if matching type
- `map`: array method applying callback, returns new array
- Closure: inner functions keep access to outer variables
- `object.method()`: calls function stored as object property
- Methods belong to object that holds them, not function that created object

**Control flow:**
- `switch(value) { case "x": ... break; default: ... }`
- `default`: handles unmatched cases

---

## Ready for: Topic 3 (Control Flow)

**Coming next:**
- if/else, ternary operators
- for loops, for...of, for...in
- while loops
- break and continue

**After completing Topic 3:** Update this file with your learning and continue building your YouTube video script!
