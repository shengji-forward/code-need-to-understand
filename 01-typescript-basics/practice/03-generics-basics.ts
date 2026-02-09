// TypeScript Generics Practice
// Run with: npx tsx 03-generics-basics.ts

console.log("=== TypeScript Generics ===\n");

// ============================================
// LEVEL 1: Generic Functions
// ============================================

// Generic function that works with any type
function identity<T>(arg: T): T {
  return arg;
}

// TypeScript infers the type
const num = identity(42); // T is number
const str = identity("hello"); // T is string

console.log("Identity function:");
console.log("Number:", num);
console.log("String:", str);

// Explicit type argument
const bool = identity<boolean>(true);

// ============================================
// LEVEL 1: Generic with Arrays
// ============================================

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log("\nFirst element:");
console.log("First number:", firstElement([1, 2, 3]));
console.log("First string:", firstElement(["a", "b", "c"]));

// ============================================
// LEVEL 2: Generic Constraints
// ============================================

// Constraint: T must have a length property
interface WithLength {
  length: number;
}

function getLength<T extends WithLength>(arg: T): number {
  return arg.length;
}

console.log("\n=== Generic Constraints ===");
console.log("String length:", getLength("hello"));
console.log("Array length:", getLength([1, 2, 3]));
console.log("Object length:", getLength({ length: 10, value: "test" }));

// Constraint: T must be an object with id property
interface WithId {
  id: number;
}

function logId<T extends WithId>(obj: T): void {
  console.log("ID:", obj.id);
}

logId({ id: 1, name: "Alice" });
logId({ id: 2, email: "bob@example.com" });

// ============================================
// LEVEL 2: Multiple Type Parameters
// ============================================

function merge<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

console.log("\n=== Multiple Type Parameters ===");
const merged1 = merge(1, "one");
const merged2 = merge("username", "alice");
console.log("Merged 1:", merged1);
console.log("Merged 2:", merged2);

// ============================================
// LEVEL 2: Generic Classes
// ============================================

class Box<T> {
  private contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  get(): T {
    return this.contents;
  }

  set(contents: T): void {
    this.contents = contents;
  }
}

const numberBox = new Box<number>(42);
console.log("\n=== Generic Classes ===");
console.log("Number box:", numberBox.get());

numberBox.set(100);
console.log("Updated:", numberBox.get());

const stringBox = new Box<string>("Hello");
console.log("String box:", stringBox.get());

// ============================================
// LEVEL 3: Generic Interfaces
// ============================================

interface Repository<T> {
  findById(id: number): T | undefined;
  save(item: T): void;
}

interface User {
  id: number;
  name: string;
}

// Implement generic interface
class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  save(user: User): void {
    this.users.push(user);
  }
}

const userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice" });
userRepo.save({ id: 2, name: "Bob" });

console.log("\n=== Generic Interfaces ===");
console.log("Found user 1:", userRepo.findById(1));
console.log("Found user 3:", userRepo.findById(3)); // undefined

// ============================================
// LEVEL 3: Utility Types with Generics
// ============================================

// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Create type where only 'description' is optional
type ProductInput = PartialBy<Product, "description">;

const productInput: ProductInput = {
  id: 1,
  name: "Laptop",
  price: 999,
  // description is optional
};

console.log("\n=== Advanced Utility Types ===");
console.log("Product input:", productInput);

// ============================================
// LEVEL 3: Generic with Default Type
// ============================================

interface ApiResponse<Data = unknown> {
  success: boolean;
  data: Data;
}

// Data defaults to unknown
const response1: ApiResponse = {
  success: true,
  data: { message: "Hello" },
};

// Specific data type
interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Alice" },
};

console.log("\n=== Generic with Default Type ===");
console.log("Response 1:", response1);
console.log("User response:", userResponse);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use generics for reusable components
function wrap<T>(value: T): { value: T } {
  return { value };
}

// ✅ Name generics meaningfully
function createPair<TKey, TValue>(key: TKey, value: TValue) {
  return { key, value };
}

// ✅ Use constraints to make generics more usable
interface Comparable {
  compare(other: this): number;
}

function max<T extends Comparable>(a: T, b: T): T {
  return a.compare(b) > 0 ? a : b;
}

// ✅ Provide reasonable defaults
interface Config<T = string> {
  items: T[];
}

const stringConfig: Config = { items: ["a", "b"] };
const numberConfig: Config<number> = { items: [1, 2, 3] };

// ✅ Don't use generics when unnecessary
function badGeneric<T extends string>(str: T): T {
  return str; // Generic not needed, just use string
}

// Good
function goodFunction(str: string): string {
  return str;
}

console.log("\n✅ Practice complete!");
