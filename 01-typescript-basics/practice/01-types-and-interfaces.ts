// TypeScript Types and Interfaces Practice
// Run with: npx tsx 01-types-and-interfaces.ts

console.log("=== TypeScript Types and Interfaces ===\n");

// ============================================
// LEVEL 1: Basic Type Annotations
// ============================================

// Explicit type annotations
let userName: string = "Alice";
let userAge: number = 30;
let isActive: boolean = true;

console.log("User:", userName, userAge, isActive);

// Type inference (TypeScript infers the type)
let inferred = "Hello"; // TypeScript knows this is a string
// inferred = 42; // Error: Type 'number' is not assignable to type 'string'

// ============================================
// LEVEL 1: Array Types
// ============================================

// Array of strings
let fruits: string[] = ["apple", "banana", "orange"];

// Array of numbers (alternative syntax)
let scores: Array<number> = [95, 87, 92];

console.log("\nArrays:");
console.log("Fruits:", fruits);
console.log("Scores:", scores);

// ============================================
// LEVEL 1: Tuple Types
// ============================================

// Tuple: Fixed-length array with specific types
let user: [string, number] = ["Alice", 30];
// user = ["Bob", 25, "extra"]; // Error: Type '[string, number, string]' is not assignable to type '[string, number]'

// Destructuring tuples
const [name, age] = user;
console.log("\nTuple destructuring:");
console.log("Name:", name, "Age:", age);

// Tuples with optional elements
let tupleWithOptional: [string, number, boolean?] = ["Alice", 30];
console.log("Tuple with optional:", tupleWithOptional);

// ============================================
// LEVEL 1: Array Typing Styles
// ============================================

// Two equivalent ways to type arrays
let fruits1: string[] = ["apple", "banana", "orange"];
let fruits2: Array<string> = ["apple", "banana", "orange"];

// Use string[] for simplicity (most common)
// Use Array<string> when combining with other types
let nested: Array<Array<string>> = [["a", "b"], ["c", "d"]];

console.log("\nArray typing:");
console.log("fruits1:", fruits1);
console.log("fruits2:", fruits2);
console.log("nested:", nested);

// ============================================
// LEVEL 1: Type Inference
// ============================================

console.log("\n=== Type Inference ===");

// TypeScript infers types from initialization
let message = "Hello"; // Type: string
let count = 42; // Type: number
let isActiveFlag = true; // Type: boolean

console.log("Inferred types:");
console.log("message:", typeof message);
console.log("count:", typeof count);
console.log("isActiveFlag:", typeof isActiveFlag);

// Inference works with arrays too
let numbers = [1, 2, 3]; // Type: number[]
// numbers.push("four"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

// Inference with const (more specific)
const userNameConst = "Alice"; // Type: "Alice" (literal type, not just string)
const userAgeConst = 30; // Type: 30 (literal type, not just number)

// Best practice: Let TypeScript infer when obvious
let inferredString = "obvious"; // ✅ Good - type is clear
let explicitString: string = "obvious"; // ❌ Unnecessary - redundant

// Annotate when type isn't clear
let value: number | string = getValue(); // ✅ Good - return type could be either

function getValue(): number | string {
  return Math.random() > 0.5 ? 42 : "hello";
}

// ============================================
// LEVEL 1: Special Types - any vs unknown vs never
// ============================================

console.log("\n=== Special Types ===");

// 'any' - Turns off ALL type checking (use sparingly!)
let anything: any = 42;
anything = "now a string";
anything = { now: "an object" };
// anything.someMethod(); // No error at compile time, but fails at runtime!
console.log("'any' variable:", anything);

// 'unknown' - Safer than any, requires type checking before use
let unsure: unknown = 42;
// unsure * 2; // Error: Object is of type 'unknown'
// unsure.toString(); // Error: Object is of type 'unknown'

// Must narrow the type first
if (typeof unsure === "number") {
  console.log("Doubled unsure:", unsure * 2); // ✅ OK
}

// Type guard function for unknown
function isString(value: unknown): value is string {
  return typeof value === "string";
}

let maybeString: unknown = "hello";
if (isString(maybeString)) {
  console.log("Uppercase:", maybeString.toUpperCase()); // ✅ OK
}

// 'never' - Represents values that never occur
// Used for: functions that never return, exhaustive checks

// Function that always throws (never returns)
function fail(message: string): never {
  throw new Error(message);
}

// Function with infinite loop (never returns)
function forever(): never {
  while (true) {
    // do something
  }
}

// Using never for exhaustive type checking
type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      const _exhaustiveCheck: never = shape; // ✅ Catches missing cases
      return _exhaustiveCheck;
  }
}

console.log("Circle area:", getArea({ kind: "circle", radius: 5 }));

// ============================================
// LEVEL 2: Interface Definitions
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  age: 25,
};

console.log("\n=== Interfaces ===");
console.log("User 1:", user1);
console.log("User 2:", user2);

// ============================================
// LEVEL 2: Extending Interfaces
// ============================================

interface AdminUser extends User {
  permissions: string[];
  isAdmin: true;
}

const admin: AdminUser = {
  id: 1,
  name: "Admin Alice",
  email: "admin@example.com",
  permissions: ["read", "write", "delete"],
  isAdmin: true,
};

console.log("\nAdmin:", admin);

// ============================================
// LEVEL 2: Type Aliases
// ============================================

// Type alias for object
type Product = {
  id: number;
  name: string;
  price: number;
};

// Type alias for union
type Status = "pending" | "active" | "inactive";

// Type alias for tuple
type Coordinate = [number, number]; // [x, y]

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 999,
};

const userStatus: Status = "active";

const location: Coordinate = [10, 20];

console.log("\n=== Type Aliases ===");
console.log("Product:", product);
console.log("Status:", userStatus);
console.log("Location:", location);

// ============================================
// LEVEL 3: Union Types
// ============================================

// Value can be string or number
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log("ID:", id);
}

printId(101); // number
printId("abc-123"); // string

// ============================================
// LEVEL 3: Intersection Types
// ============================================

type Employee = {
  id: number;
  name: string;
};

type Manager = {
  employees: Employee[];
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
  id: 1,
  name: "Sarah",
  employees: [
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
  ],
};

console.log("\n=== Intersection Types ===");
console.log("Team lead:", teamLead);

// ============================================
// LEVEL 2: When to Use Special Types
// ============================================

console.log("\n=== When to Use Special Types ===");

// WHEN TO USE 'any':
// ❌ Avoid in most cases
// ✅ Only when migrating JS to TS gradually
// ✅ When dealing with dynamic data from unreliable sources
let legacyData: any = parseLegacyFormat('{"key": "value"}');

function parseLegacyFormat(data: string): any {
  // Legacy parser with unknown structure
  try {
    return JSON.parse(data);
  } catch {
    return { error: "Invalid format" };
  }
}

// WHEN TO USE 'unknown':
// ✅ When you truly don't know the type upfront
// ✅ For user input, API responses, JSON parsing
function handleApiResponse(data: unknown) {
  // Must validate before using
  if (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    "value" in data
  ) {
    console.log("API response:", data.value);
  }
}

handleApiResponse({ success: true, value: 42 });

// WHEN TO USE 'never':
// ✅ For functions that never return (throw or infinite loop)
// ✅ For exhaustive type checking
// ✅ For unreachable code paths

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

type Color = "red" | "green" | "blue";

function getColorHex(color: Color): string {
  switch (color) {
    case "red":
      return "#FF0000";
    case "green":
      return "#00FF00";
    case "blue":
      return "#0000FF";
    default:
      // If we add a new color to Color type, TypeScript will error here
      return assertNever(color);
  }
}

console.log("Color hex:", getColorHex("red"));

// 'never' also appears naturally
// Function returning never (always throws)
function throwError(message: string): never {
  throw new Error(message);
}

// Variable that can never be assigned a value (demonstration only)
// const impossible: never = (() => {
//   throw new Error("Can't assign me");
// })();

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use interfaces for objects that can be extended
interface ApiResponse {
  success: boolean;
  data: unknown;
}

// ✅ Use type aliases for unions, tuples, or primitives
type HttpResponseCode = 200 | 201 | 400 | 404 | 500;

// ✅ Make properties optional with ?
interface Config {
  apiUrl?: string;
  timeout?: number;
}

// ✅ Let TypeScript infer types when obvious
let inferred2 = "hello"; // ✅ Good
let explicit: string = "hello"; // ❌ Unnecessary

// ✅ Add explicit types when not obvious
function processValue(value: string | number) {
  // Complex logic...
}

// ✅ Use 'unknown' instead of 'any' for dynamic data
function handleDynamic(data: unknown) {
  if (typeof data === "string") {
    console.log("String value:", data);
  }
}

// ❌ Avoid 'any' - it disables type checking
// let avoidAny: any = 42;
// avoidAny.whatever(); // No compile error, but runtime error!

// ✅ Use 'never' for exhaustive checking
function exhaustiveCheck(type: "a" | "b" | "c"): never {
  throw new Error(`Unknown type: ${type}`);
}

// ✅ Use readonly for properties that shouldn't change
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 15; // Error: Cannot assign to 'x' because it is read-only

// ✅ Prefer string[] over Array<string> (unless complex)
let fruitsArray: string[] = ["apple", "banana"]; // Simpler
let complex: Array<string | number> = [1, "two", 3]; // Array<T> for union types

// ✅ Use tuples for fixed-length, fixed-type arrays
let coordinates: [number, number] = [10, 20]; // x, y

console.log("\n✅ Practice complete!");

export {}