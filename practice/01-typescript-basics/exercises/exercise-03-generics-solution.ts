// EXERCISE 3: TypeScript Generics - SOLUTION
//
// This file contains the solutions for exercise-03-generics.ts
// Run with: npx tsx exercise-03-generics-solution.ts

console.log("=== Exercise 3: TypeScript Generics - SOLUTION ===\n");

// ============================================
// SOLUTION 1: Create a generic function
// ============================================

function identity<T>(value: T): T {
  return value;
}

console.log("Identity string:", identity("hello")); // "hello"
console.log("Identity number:", identity(42)); // 42
console.log("Identity boolean:", identity(true)); // true

// ============================================
// SOLUTION 2: Generic function with arrays
// ============================================

function lastElement<T>(arr: T[]): T | undefined {
  // Return last element or undefined if empty
  if (arr.length === 0) {
    return undefined;
  }
  return arr[arr.length - 1];
}

console.log("\nLast element of [1,2,3]:", lastElement([1, 2, 3])); // 3
console.log("Last element of ['a','b','c']:", lastElement(["a", "b", "c"])); // "c"
console.log("Last element of []:", lastElement([])); // undefined

// ============================================
// SOLUTION 3: Generic with constraint
// ============================================

interface WithLength {
  length: number;
}

function getLength<T extends WithLength>(value: T): number {
  return value.length;
}

console.log("\nLength of 'hello':", getLength("hello")); // 5
console.log("Length of [1,2,3,4,5]:", getLength([1, 2, 3, 4, 5])); // 5

// ============================================
// SOLUTION 4: Generic with multiple type parameters
// ============================================

function createPair<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

const pair1 = createPair(1, "one");
const pair2 = createPair("username", "alice");
const pair3 = createPair("age", 30);

console.log("\nPair 1:", pair1); // { key: 1, value: "one" }
console.log("Pair 2:", pair2); // { key: "username", value: "alice" }
console.log("Pair 3:", pair3); // { key: "age", value: 30 }

// ============================================
// SOLUTION 5: Generic class
// ============================================

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

console.log("\n=== Generic Stack ===");
const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log("Pop string:", stringStack.pop()); // "second"
console.log("Pop string:", stringStack.pop()); // "first"
console.log("Pop empty:", stringStack.pop()); // undefined

// ============================================
// BONUS CHALLENGE SOLUTION
// ============================================

interface Repository<T> {
  findById(id: number): T | undefined;
  save(item: T): void;
  getAll(): T[];
}

interface User {
  id: number;
  name: string;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  save(item: User): void {
    this.users.push(item);
  }

  getAll(): User[] {
    return [...this.users]; // Return copy to prevent external modification
  }
}

console.log("\n=== Bonus Challenge ===");
const userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice" });
userRepo.save({ id: 2, name: "Bob" });

console.log("Find user 1:", userRepo.findById(1)); // { id: 1, name: "Alice" }
console.log("Find user 3:", userRepo.findById(3)); // undefined
console.log("All users:", userRepo.getAll()); // Array with 2 users

console.log("\n✅ Exercise complete!");

export {};
