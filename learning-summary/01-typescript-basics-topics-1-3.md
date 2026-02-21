# Learning Summary: 01-TypeScript-Basics Complete (Topics 1-3)

**Completed**: 2026-02-21
**Topics**: Types & Interfaces + Advanced Type Annotations + Generics & Constraints
**Purpose**: Use this summary for AI interview practice, recap, and YouTube video preparation

---

## Topic 1: Types and Interfaces

### What You Learned

#### 1. Interface Definitions

**Your code:**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;  // Optional property
}

const product: Product = {
  id: 1,
  name: "iPhone",
  price: 1999,
  category: "mobile"
};
```

**Key concept:**
- Interface defines **shape** of data (contract)
- PascalCase naming (`Product`, not `product`)
- Optional properties with `?` (`category?: string`)
- Type annotation: `variable: InterfaceName`

#### 2. Extending Interfaces

**Your code:**
```typescript
interface DigitalProduct extends Product {
  downloadLink: string;
}

const digitalProduct: DigitalProduct = {
  downloadLink: "www.example.com",
  id: 1,
  name: "iPhone",
  price: 1999,
  category: "mobile"
};
```

**Key concept:**
- `extends` inherits properties from base interface
- Child interface must include all parent properties
- Additional properties are added after inherited ones

#### 3. Type Aliases (Literal Types)

**Your code:**
```typescript
type Status = "pending" | "active" | "inactive" | "suspended";

const currentStatus: Status = "active";
```

**Key concept:**
- `type` keyword creates reusable type alias
- Union of literal types: `"value1" | "value2" | "value3"`
- Variable can ONLY be one of the specified literal values
- TypeScript validates at compile time
- Different from general `string` type (which allows ANY string)

**Common pattern:**
```typescript
// Literal type - only these 4 values allowed
type Status = "pending" | "active" | "inactive" | "suspended";

// General type - ANY string allowed
type Text = string;
```

#### 4. Union Types

**Your code:**
```typescript
type ID = number | string;

function parseId(id: ID): string {
  if (typeof id === "number") {
    return `Number ID: ${id}`
  } else {
    return `String ID: ${id}`
  }
}

parseId(123);      // "Number ID: 123"
parseId("abc");    // "String ID: abc"
```

**Key concept:**
- Union type: `Type1 | Type2` means value can be EITHER type
- Type narrowing: `typeof` checks actual type at runtime
- `typeof value === "number"` for primitives
- `typeof value === "string"` for strings
- TypeScript knows type inside each branch (type guard)

#### 5. Intersection Types

**Your code:**
```typescript
type Employee = {
  id: number;
  name: string;
};

type Manager = {
  department: string;
  reports: Employee[];  // Array of Employee objects
};

type TeamManager = Employee & Manager;

const teamManager: TeamManager = {
  id: 1,
  name: "shengji",
  department: "Product",
  reports: []  // Empty array of Employee objects
};
```

**Key concept:**
- Intersection type: `Type1 & Type2` combines properties
- Result must have ALL properties from BOTH types
- Use for composing complex types from simple ones
- `reports: Employee[]` is an ARRAY type (can be empty)

#### 6. Tuple Types

**Your code:**
```typescript
type Coordinate = [number, number];

function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  return Math.sqrt((coord2[0] - coord1[0]) ** 2 + (coord2[1] - coord1[1]) ** 2);
}

const coord1: Coordinate = [0, 0];
const coord2: Coordinate = [3, 4];
calculateDistance(coord1, coord2);  // Returns 5
```

**Key concept:**
- Tuple: Fixed-length array with specific types at each position
- `[number, number]` = array with exactly 2 numbers
- Access with index: `coord[0]`, `coord[1]`
- Different from `number[]` which can be ANY length
- Used for coordinates, pairs, fixed-position data

---

### Mistakes You Made & Fixed

| Area | Mistake | Fixed | Lesson |
|------|---------|-------|--------|
| **Literal vs type** | `name: "string"` | `name: string` | `"string"` is literal value, `string` is type |
| **Literal vs type** | `type Coordinate = [1, 2]` | `type Coordinate = [number, number]` | Use TYPES in definitions, not values |
| **Variable vs value** | `reports: [Danny, XX]` | `reports: [{name: "Danny", ...}, ...]` | Use object literals, not undefined variables |
| **Empty array type** | `type Foo = { reports: [] }` | `type Foo = { reports: Employee[] }` | `[]` is empty tuple, use `Type[]` for arrays |

---

### Best Practices Learned

1. ✅ **Use interfaces for objects** that can be extended
2. ✅ **Use type aliases for** unions, tuples, or literal types
3. ✅ **Literal types** restrict values to specific strings/numbers
4. ✅ **General types** (`string`, `number`) allow any value of that type
5. ✅ **Union types** (`|`) for "either/or" scenarios
6. ✅ **Intersection types** (`&`) for combining objects
7. ✅ **Type narrowing** with `typeof` for runtime checks
8. ✅ **Optional properties** with `?` when data might not exist
9. ✅ **Array types** (`Type[]`) not empty tuples (`[]`)
10. ✅ **Object literals** with actual values, not variable names

---

### Interview Questions (Topic 1)

1. **What's the difference between `interface` and `type`?**
   - Answer: `interface` is for objects and can be extended. `type` is for unions, tuples, and primitives.

2. **What's a union type and when would you use one?**
   - Answer: `Type1 | Type2` means value can be either type. Use for flexible APIs.

3. **What's the difference between `"string"` and `string`?**
   - Answer: `"string"` is a **literal type** (only that exact value). `string` is a **general type** (any string value).

4. **What's a tuple and when would you use it?**
   - Answer: Fixed-length array with specific types at each position: `[number, number]`.

5. **How do you make a property optional in an interface?**
   - Answer: Add `?` after the property name: `category?: string`

---

## Topic 2: Advanced Type Annotations

### What You Learned

#### 1. Discriminated Unions

**Your code:**
```typescript
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; error: string };

type AppState = LoadingState | SuccessState | ErrorState;

function renderState(state: AppState): string {
  if (state.status === "loading") {
    return `Loading...`
  } else if (state.status === "success") {
    return `Data: ${state.data}`
  } else {
    return `Error: ${state.error}`
  }
}
```

**Key concept:**
- Discriminated union = union types with a common property (the "discriminator")
- TypeScript narrows the type based on the discriminator value
- Common pattern for state management (loading/success/error states)

#### 2. Partial, Pick, Omit Utility Types

**Your code:**
```typescript
// Partial - makes all properties optional
function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
  return {...todo, ...updates}
}

// Pick - keeps only specified properties
type TodoPreview = Pick<Todo, "id" | "title" | "completed">;

// Omit - removes specified properties
type TodoCreate = Omit<Todo, "id" | "completed">;
```

**Key concept:**
- `Partial<T>` makes ALL properties optional
- `Pick<T, "props">` keeps only specified properties
- `Omit<T, "props">` removes specified properties

#### 3. Type Guards with 'in' Operator

**Your code:**
```typescript
function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

**Key concept:**
- `in` operator checks if property exists in object
- TypeScript narrows type based on property existence
- Different from `typeof` (used for primitives)

#### 4. Basic Generics (Bonus!)

**Your code:**
```typescript
type ValueWithTimestamp<T> = {
  value: T;
  timestamp: number;
};

function addTimestamp<T>(value: T): ValueWithTimestamp<T> {
  return {
    value: value,
    timestamp: Date.now()
  }
}
```

**Key concept:**
- Generics: `<T>` is a type variable (placeholder for any type)
- Function remembers the specific type you pass in
- Used for reusable, type-safe components

---

### Mistakes You Made & Fixed

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **1 - Discriminated union** | Used `console.log()` instead of `return` | Return the string values | Functions should return, not just log |
| **5 - Type guards** | Wrote `return animal.fly` / `return animal.swim` | Call them: `animal.fly()` / `animal.swim()` | Method references ≠ calling methods |
| **Bonus - Generics** | Used `Date.now` (no parentheses) | Call it: `Date.now()` | Function name ≠ function call |

---

### Best Practices Learned (Topic 2)

11. ✅ **Discriminated unions** for type-safe state management
12. ✅ **Partial<T>** for partial updates (PATCH operations)
13. ✅ **Pick<Type, keys>** to select specific properties
14. ✅ **Omit<Type, keys>** to exclude specific properties
15. ✅ **Type guards** with `in` operator for object properties
16. ✅ **Type guards** with `typeof` for primitives
17. ✅ **Generics** `<T>` for reusable, type-safe code
18. ✅ **Return values** from functions, don't just console.log
19. ✅ **Call methods** with `()`, don't just reference them
20. ✅ **Immutability** with spread operator when updating objects

---

### Interview Questions (Topic 2)

11. **What's a discriminated union and why is it useful?**
    - Answer: Union types sharing a common property (discriminator) with different literal values. TypeScript narrows the type based on that property.

12. **What does `Partial<T>` do?**
    - Answer: Makes all properties of Type T optional. Useful for partial updates like PATCH requests.

13. **What's the difference between `Pick<T, K>` and `Omit<T, K>`?**
    - Answer: `Pick` keeps only specified properties. `Omit` removes specified properties.

14. **How does the `in` operator work as a type guard?**
    - Answer: Checks if a property exists in an object. TypeScript narrows the type based on property existence.

15. **What's a generic type and when would you use one?**
    - Answer: A type parameterized by another type: `<T>`. Used for reusable, type-safe code.

---

## Topic 3: Generics & Constraints

### What You Learned

#### 1. Generic Functions

**Your code:**
```typescript
function identity<T>(value: T): T {
  return value
}

identity("hello");  // Returns "hello" (type: string)
identity(42);       // Returns 42 (type: number)
identity(true);     // Returns true (type: boolean)
```

**Key concept:**
- Generic function: `<T>` is a type parameter
- Type `T` is inferred from the argument passed in
- Return type matches input type exactly
- Type inference works automatically (no need to specify `<string>`)

**How it works:**
```typescript
// T is inferred as string
const result1 = identity("hello");  // result1 is string

// T is inferred as number
const result2 = identity(42);       // result2 is number
```

#### 2. Generic Functions with Arrays

**Your code:**
```typescript
function lastElement<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

lastElement([1, 2, 3]);              // 3
lastElement(["a", "b", "c"]);        // "c"
lastElement([]);                     // undefined
```

**Key concept:**
- Generic type `T` applies to array elements
- `T[]` means "array of T"
- Return type is `T | undefined` (element or undefined)
- Works with ANY array type

**Common pattern:**
```typescript
// Generic array processing
function first<T>(array: T[]): T | undefined {
  return array[0];
}

const names = ["Alice", "Bob"];
first(names);  // "Alice" | undefined

const numbers = [1, 2, 3];
first(numbers);  // 1 | undefined
```

#### 3. Generic Constraints

**Your code:**
```typescript
interface WithLength {
  length: number;
}

function getLength<T extends WithLength>(value: T): number {
  return value.length
}

getLength("hello");                    // 5
getLength([1, 2, 3, 4, 5]);           // 5
// getLength(42);                      // ERROR! Number has no .length
```

**Key concept:**
- `T extends SomeType` restricts what `T` can be
- `T extends WithLength` means "T must have a length property"
- Allows access to known properties safely
- TypeScript errors if constraint is violated

**How constraints work:**
```typescript
// Without constraint - T could be anything
function logValue<T>(value: T): void {
  // console.log(value.length); // ERROR! T might not have .length
}

// With constraint - T must have .length
function logLength<T extends WithLength>(value: T): void {
  console.log(value.length); // ✅ OK! We know T has .length
}
```

#### 4. Multiple Type Parameters

**Your code:**
```typescript
function createPair<K, V>(key: K, value: V): {key: K, value: V} {
  return {key, value}
}

const pair1 = createPair(1, "one");           // { key: number, value: string }
const pair2 = createPair("username", "alice"); // { key: string, value: string }
const pair3 = createPair("age", 30);          // { key: string, value: number }
```

**Key concept:**
- Multiple type parameters: `<K, V>` (can be any letters)
- Each parameter represents a different type
- Types are inferred independently from arguments
- Return type can use both types

**Common use case:**
```typescript
// Key-Value pairs
function createMap<K, V>(key: K, value: V): Map<K, V> {
  return new Map([[key, value]]);
}

// HTTP request
function fetch<K, V>(url: K, options: V): Promise<V> {
  // K = string (URL), V = Response type
  return Promise.resolve({} as V);
}
```

#### 5. Generic Classes

**Your code:**
```typescript
class Stack<T> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = initialItems
  }

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }
}

const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
stringStack.pop();  // "second"
```

**Key concept:**
- Generic class: `class Stack<T>` - `T` applies to the entire class
- All methods can use type `T`
- Type is specified when instantiating: `new Stack<string>()`
- Class remembers the type throughout its lifetime

**Constructor pattern:**
```typescript
class Stack<T> {
  private items: T[] = [];

  // Default parameter allows creating empty stack
  constructor(initialItems: T[] = []) {
    this.items = initialItems
  }
}

// Both work:
const empty = new Stack<string>();
const withItems = new Stack<number>([1, 2, 3]);
```

#### 6. Generic Interfaces (Bonus!)

**Your code:**
```typescript
interface Repository<T> {
  findById(id: number): T | undefined
  save(item: T): void
  getAll(): T[]
}

type User = {
  id: number
  name: string
}

class UserRepository implements Repository<User> {
  private users: User[] = []

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  save(item: User): void {
    this.users.push(item)
  }

  getAll(): User[] {
    return this.users
  }
}

const userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice" });
userRepo.findById(1);  // { id: 1, name: "Alice" }
```

**Key concept:**
- Generic interface: `interface Repository<T>` defines contract
- Implementation specifies type: `implements Repository<User>`
- All methods must use the specified type `T`
- Type-safe CRUD operations (Create, Read, Update, Delete)

**Repository pattern:**
```typescript
// Generic interface (reusable contract)
interface Repository<T> {
  findById(id: number): T | undefined;
  save(item: T): void;
  getAll(): T[];
}

// Implementation for User
class UserRepository implements Repository<User> {
  private users: User[] = [];
  // ... methods
}

// Implementation for Product
class ProductRepository implements Repository<Product> {
  private products: Product[] = [];
  // ... methods
}
```

---

### Mistakes You Made & Fixed

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **5 - Stack push()** | Used `this.items.push()` instead of `this.items.push(item)` | Pass the parameter: `this.items.push(item)` | Must pass parameter to method |
| **5 - Stack pop()** | Used `this.array.pop` instead of `return this.items.pop()` | Call and return: `return this.items.pop()` | Call method AND return result |
| **5 - Constructor** | Expected `T[]` but used `new Stack<string>()` | Add default: `constructor(items: T[] = [])` | Default params allow optional args |
| **5 - Tests** | No `Stack<number>` usage | Add test with `new Stack<number>()` | Test with multiple types |
| **Bonus - findById** | Used `this.user.find(id)` instead of `this.users.find((u) => u.id === id)` | Use predicate: `this.users.find((u) => u.id === id)` | Array.find() needs predicate function |
| **Bonus - save** | Used `{id: T, name:}` instead of `save(item: User)` | Accept param: `save(item: User)` then `this.users.push(item)` | Methods should accept parameters |
| **Bonus - private** | Used `private user = []` (untyped) | Add type: `private users: User[] = []` | Always type class properties |
| **Bonus - Methods** | Forgot `findById` and `getAll` initially | Implement all interface methods | Interface = contract, must implement all |

### Deep Dive: Your Mistakes

#### Mistake 1: Stack push() - Parameter Not Passed

**What you did wrong:**
```typescript
// ❌ WRONG - push() with no parameter
push(item: T): void {
  this.items.push()  // Missing the item!
}
```

**Why this is wrong:**
- `Array.push()` requires the element to add as a parameter
- Calling `push()` with no args doesn't add anything
- Method accepts `item: T` but doesn't use it

**Correct version:**
```typescript
// ✅ CORRECT - Pass the parameter
push(item: T): void {
  this.items.push(item)  // Add the item to the array
}
```

#### Mistake 2: Stack pop() - Not Called or Returned

**What you did wrong:**
```typescript
// ❌ WRONG - Reference without calling or returning
pop(): T | undefined {
  this.array.pop  // Wrong property name, not called, not returned
}
```

**Multiple issues:**
1. `this.array` should be `this.items` (wrong property name)
2. `.pop` is a reference, not a call (needs `()`)
3. No `return` statement (should return the popped value)

**Correct version:**
```typescript
// ✅ CORRECT - Call the method and return result
pop(): T | undefined {
  return this.items.pop()
}
```

**Key lessons:**
- Always return from functions with return types
- Use `()` to call methods
- Check property names match class definition

#### Mistake 3: Constructor - No Default Parameter

**What you did wrong:**
```typescript
// ❌ WRONG - Required parameter
class Stack<T> {
  constructor(initialItems: T[]) {
    this.items = initialItems
  }
}

// Usage - ERROR! Parameter required
new Stack<string>();  // Missing argument
```

**Why this is wrong:**
- Constructor parameter is required
- Can't create empty stack without passing an array
- User might want to start with empty stack

**Correct version:**
```typescript
// ✅ CORRECT - Default parameter
class Stack<T> {
  constructor(initialItems: T[] = []) {
    this.items = initialItems
  }
}

// Usage - Both work!
new Stack<string>();        // Empty stack
new Stack<number>([1, 2]);  // Stack with items
```

#### Mistake 4: findById - Wrong find() Usage

**What you did wrong:**
```typescript
// ❌ WRONG - Direct value instead of predicate
findById(id: number): User | undefined {
  return this.users.find(id)  // This searches for the number, not a user
}
```

**Why this is wrong:**
- `Array.find()` expects a predicate function
- `find(id)` searches for the value `id` in the array (not what you want)
- You need to find a user WHERE `user.id === id`

**Correct version:**
```typescript
// ✅ CORRECT - Use predicate function
findById(id: number): User | undefined {
  return this.users.find((user) => user.id === id)
}
```

**How find() works:**
```typescript
// find() calls your function for each element
array.find((element) => {
  // Return true to keep this element
  // Return false to skip
  return element.someProperty === targetValue;
});

// First element that returns true is returned
// If none match, returns undefined
```

#### Mistake 5: save - Wrong Method Signature

**What you did wrong:**
```typescript
// ❌ WRONG - Trying to create object in type annotation
save(item: User): void {
  // Type annotation can't create objects
  // {id: T, name:} is not valid syntax
}
```

**Why this is wrong:**
- Method signatures define parameters, not object structure
- `id: T` in signature is invalid (`T` doesn't exist here)
- Should accept the full User object as parameter

**Correct version:**
```typescript
// ✅ CORRECT - Accept User object, use it directly
save(item: User): void {
  this.users.push(item)
}

// Usage
userRepo.save({ id: 1, name: "Alice" });
```

#### Mistake 6: Untyped Class Properties

**What you did wrong:**
```typescript
// ❌ WRONG - No type annotation
class UserRepository {
  private user = []  // What type is this array?
}
```

**Why this is wrong:**
- TypeScript infers `never[]` (empty array of nothing)
- Can't add users because type is unknown
- Property name `user` (singular) should be `users` (plural)

**Correct version:**
```typescript
// ✅ CORRECT - Type annotation, plural name
class UserRepository implements Repository<User> {
  private users: User[] = []  // Clearly typed as User array
}
```

---

### Best Practices Learned (Topic 3)

21. ✅ **Generic functions** with `<T>` for reusable logic
22. ✅ **Type inference** - TypeScript often infers `T` automatically
23. ✅ **Generic constraints** `T extends Type` to restrict generics
24. ✅ **Multiple type parameters** `<K, V>` for independent types
25. ✅ **Generic classes** `class Stack<T>` for type-safe data structures
26. ✅ **Generic interfaces** for reusable contracts (Repository pattern)
27. ✅ **Default parameters** `constructor(items: T[] = [])` for flexibility
28. ✅ **Array.find()** with predicate: `arr.find((item) => item.prop === value)`
29. ✅ **Always type class properties** - `private items: T[] = []`
30. ✅ **Implement all interface methods** - contracts require complete implementation

---

### Generic Patterns Reference

| Pattern | Syntax | Use Case |
|---------|--------|----------|
| Generic function | `function fn<T>(val: T): T` | Reusable single-type functions |
| Generic with array | `function fn<T>(arr: T[]): T` | Process arrays of any type |
| Generic constraint | `fn<T extends Interface>` | Restrict generic to specific shape |
| Multiple parameters | `fn<K, V>(key: K, val: V)` | Independent type parameters |
| Generic class | `class Stack<T>` | Type-safe data structures |
| Generic interface | `interface Repo<T>` | Reusable contracts |

---

### Interview Questions (Topic 3)

21. **What's a generic function and when would you use one?**
    - Answer: A function with a type parameter `<T>` that works with any type. Use for reusable logic like `identity<T>(value: T): T`.

22. **What's a generic constraint?**
    - Answer: `T extends SomeType` restricts what types `T` can be. Example: `T extends { length: number }` ensures T has a length property.

23. **How do you create a generic class?**
    - Answer: `class Stack<T> { private items: T[] = []; }` - the type parameter `T` applies to the entire class.

24. **What's the difference between `Array.find(id)` and `Array.find(user => user.id === id)`?**
    - Answer: `find(id)` searches for the value `id` in the array. `find(user => user.id === id)` searches for an element where the property matches.

25. **When would you use multiple type parameters?**
    - Answer: When you have multiple independent types. Example: `Map<K, V>` has key type `K` and value type `V`.

26. **What does `T extends SomeType` mean?**
    - Answer: `T` must be a subtype of `SomeType`. It's a constraint that restricts what types are allowed.

27. **Write a generic function that returns the last element of an array.**
    - Answer: `function last<T>(arr: T[]): T | undefined { return arr[arr.length - 1]; }`

28. **How do you implement a generic interface?**
    - Answer: `class UserRepository implements Repository<User>` - specify the concrete type when implementing.

29. **Why use default parameters in constructors?**
    - Answer: To allow instantiation without arguments: `constructor(items: T[] = [])` enables both `new Stack()` and `new Stack([1, 2])`.

30. **What's type inference in generics?**
    - Answer: TypeScript automatically determines the type parameter from the arguments. `identity("hello")` infers `T` is `string` without needing `identity<string>("hello")`.

---

### Code Examples for YouTube Video (Topic 3)

#### Example 11: Generic Function

```typescript
// Generic identity function
function identity<T>(value: T): T {
  return value;
}

// Type inference in action
const s = identity("hello");  // s is string
const n = identity(42);       // n is number
const b = identity(true);     // b is boolean
```

#### Example 12: Generic with Array

```typescript
// Get last element of any array
function lastElement<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

lastElement([1, 2, 3]);        // 3
lastElement(["a", "b", "c"]);  // "c"
lastElement([]);               // undefined
```

#### Example 13: Generic Constraint

```typescript
// Constraint: T must have a .length property
interface WithLength {
  length: number;
}

function getLength<T extends WithLength>(value: T): number {
  return value.length;
}

getLength("hello");         // 5 (string has .length)
getLength([1, 2, 3]);       // 3 (array has .length)
// getLength(42);           // ERROR! (number has no .length)
```

#### Example 14: Multiple Type Parameters

```typescript
// Create key-value pairs
function createPair<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

const p1 = createPair(1, "one");           // { key: number, value: string }
const p2 = createPair("age", 30);          // { key: string, value: number }
const p3 = createPair(true, false);        // { key: boolean, value: boolean }
```

#### Example 15: Generic Class

```typescript
// Type-safe Stack
class Stack<T> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

// Stack of strings
const stringStack = new Stack<string>();
stringStack.push("hello");

// Stack of numbers
const numberStack = new Stack<number>([1, 2, 3]);
numberStack.pop();  // 3
```

#### Example 16: Generic Interface

```typescript
// Generic repository interface
interface Repository<T> {
  findById(id: number): T | undefined;
  save(item: T): void;
  getAll(): T[];
}

// User type
type User = { id: number; name: string };

// Implementation
class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  save(item: User): void {
    this.users.push(item);
  }

  getAll(): User[] {
    return this.users;
  }
}

const repo = new UserRepository();
repo.save({ id: 1, name: "Alice" });
console.log(repo.findById(1));  // { id: 1, name: "Alice" }
```

---

## Progress

### Completed: Topic 1 - Types and Interfaces ✅

- ✅ Interface definitions and extension
- ✅ Type aliases (literal and general types)
- ✅ Union types and type narrowing
- ✅ Intersection types
- ✅ Tuple types
- ✅ Optional properties
- ✅ Array types vs empty tuples

### Completed: Topic 2 - Advanced Type Annotations ✅

- ✅ Discriminated unions
- ✅ Utility types (Partial, Pick, Omit)
- ✅ Type guards (`in`, `typeof`, discriminators)
- ✅ Basic generics introduction
- ✅ Function return types
- ✅ Immutability patterns

### Completed: Topic 3 - Generics & Constraints ✅

- ✅ Generic functions with single type parameter
- ✅ Generic functions with arrays (`T[]`)
- ✅ Generic constraints (`T extends Type`)
- ✅ Multiple type parameters (`<K, V>`)
- ✅ Generic classes (`class Stack<T>`)
- ✅ Generic interfaces (`interface Repository<T>`)
- ✅ Type inference
- ✅ Repository pattern implementation

### Ready For: Next Module

**Completed: 01-TypeScript-Basics**
**Next: 02-Async-Programming**
- Promises
- async/await
- Error handling
- Parallel execution

---

## Final Stats (Topics 1-3)

- **Exercises Completed**: 3
- **TODOs Completed**: 18 (15 + 3 bonuses)
- **Mistakes Identified**: 14 (Topic 1: 4, Topic 2: 3, Topic 3: 7)
- **Key Concepts**: 19
- **Interview Questions**: 30
- **Utility Types Mastered**: 3 (Partial, Pick, Omit)
- **Type Guards Mastered**: 3 (typeof, in, discriminators)
- **Generic Patterns Mastered**: 6 (functions, constraints, classes, interfaces, arrays, multi-param)

**Estimated Study Time**: ~6-8 hours
**Ready for Async Programming**: ✅ YES!

---

*This document covers Topics 1-3. TypeScript Basics module complete!*
