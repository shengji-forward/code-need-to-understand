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
// LEVEL 1: Any vs Unknown
// ============================================

// 'any' turns off type checking (avoid!)
let anything: any = 42;
anything = "now a string";
anything = { now: "an object" };
console.log("\n'any' variable:", anything);

// 'unknown' is safer - must check type before using
let unsure: unknown = 42;
// console.log(unsure * 2); // Error: Object is of type 'unknown'

// Must check type first
if (typeof unsure === "number") {
  console.log("Doubled unsure:", unsure * 2);
}

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

// ✅ Avoid 'any' - use 'unknown' if you don't know the type
function processValue(value: unknown) {
  if (typeof value === "string") {
    console.log("String value:", value);
  }
}

// ✅ Use readonly for properties that shouldn't change
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 15; // Error: Cannot assign to 'x' because it is read-only

console.log("\n✅ Practice complete!");

export {}