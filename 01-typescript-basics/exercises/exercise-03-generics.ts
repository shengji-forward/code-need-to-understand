// EXERCISE 3: TypeScript Generics
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-03-generics.ts

console.log("=== Exercise 3: TypeScript Generics ===\n");

// ============================================
// TODO 1: Create a generic function
// ============================================
// Instructions:
// - Create a function called 'identity' that:
//   - Takes a generic type parameter T
//   - Takes a value of type T
//   - Returns the value of type T
// - Test it with a string, number, and boolean

// TODO: Your code here
// function identity<T>(value: T): T {
//   ...
// }

console.log("Identity string:", identity("hello")); // "hello"
console.log("Identity number:", identity(42)); // 42
console.log("Identity boolean:", identity(true)); // true

// ============================================
// TODO 2: Generic function with arrays
// ============================================
// Instructions:
// - Create a function called 'lastElement' that:
//   - Takes a generic type parameter T
//   - Takes an array of type T[]
//   - Returns the last element (T) or undefined if array is empty
// - Test with string array and number array

// TODO: Your code here
// function lastElement<T>(arr: T[]): T | undefined {
//   ...
// }

console.log("\nLast element of [1,2,3]:", lastElement([1, 2, 3])); // 3
console.log("Last element of ['a','b','c']:", lastElement(["a", "b", "c"])); // "c"
console.log("Last element of []:", lastElement([])); // undefined

// ============================================
// TODO 3: Generic with constraint
// ============================================
// Instructions:
// - Create an interface 'WithLength' with a 'length' property (number)
// - Create a function called 'getLength' that:
//   - Takes a generic type T constrained to WithLength
//   - Returns the length property
// - Test with string and array

// TODO: Your code here
// interface WithLength {
//   length: number;
// }

// function getLength<T extends WithLength>(value: T): number {
//   ...
// }

console.log("\nLength of 'hello':", getLength("hello")); // 5
console.log("Length of [1,2,3,4,5]:", getLength([1, 2, 3, 4, 5])); // 5

// ============================================
// TODO 4: Generic with multiple type parameters
// ============================================
// Instructions:
// - Create a function called 'createPair' that:
//   - Takes two type parameters: K and V
//   - Takes a key of type K
//   - Takes a value of type V
//   - Returns an object with properties 'key' and 'value'
// - Test with different type combinations

// TODO: Your code here
// function createPair<K, V>(key: K, value: V): { key: K; value: V } {
//   ...
// }

const pair1 = createPair(1, "one");
const pair2 = createPair("username", "alice");
const pair3 = createPair("age", 30);

console.log("\nPair 1:", pair1); // { key: 1, value: "one" }
console.log("Pair 2:", pair2); // { key: "username", value: "alice" }
console.log("Pair 3:", pair3); // { key: "age", value: 30 }

// ============================================
// TODO 5: Generic class
// ============================================
// Instructions:
// - Create a generic class called 'Stack' that:
//   - Has a type parameter T
//   - Has a private items array of type T[]
//   - Has a 'push' method that adds an item
//   - Has a 'pop' method that removes and returns the last item (or undefined if empty)
// - Create a Stack<string> and Stack<number>
// - Push some items and pop them

// TODO: Your code here
// class Stack<T> {
//   private items: T[] = [];
//
//   push(item: T): void {
//     ...
//   }
//
//   pop(): T | undefined {
//     ...
//   }
// }

console.log("\n=== Generic Stack ===");
const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log("Pop string:", stringStack.pop()); // "second"
console.log("Pop string:", stringStack.pop()); // "first"
console.log("Pop empty:", stringStack.pop()); // undefined

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a generic interface called 'Repository' with:
//   - findById(id: number): T | undefined
//   - save(item: T): void
//   - getAll(): T[]
// - Implement this interface for a 'User' type
// - User should have: id (number), name (string)
// - Store users in a private array

// TODO: Your code here
// interface Repository<T> {
//   findById(id: number): T | undefined;
//   save(item: T): void;
//   getAll(): T[];
// }
//
// interface User {
//   id: number;
//   name: string;
// }
//
// class UserRepository implements Repository<User> {
//   private users: User[] = [];
//
//   findById(id: number): User | undefined {
//     ...
//   }
//
//   save(item: User): void {
//     ...
//   }
//
//   getAll(): User[] {
//     ...
//   }
// }

console.log("\n=== Bonus Challenge ===");
const userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice" });
userRepo.save({ id: 2, name: "Bob" });

console.log("Find user 1:", userRepo.findById(1)); // { id: 1, name: "Alice" }
console.log("Find user 3:", userRepo.findById(3)); // undefined
console.log("All users:", userRepo.getAll()); // Array with 2 users

console.log("\n✅ Exercise complete!");

export {};
