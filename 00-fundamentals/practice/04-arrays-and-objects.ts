// Arrays and Objects Practice
// Run with: npx tsx 04-arrays-and-objects.ts

console.log("=== Arrays and Objects ===\n");

// ============================================
// LEVEL 1: Array Basics
// ============================================

// Creating arrays
const fruits = ["apple", "banana", "orange"];
console.log("Fruits array:", fruits);

// Accessing elements (zero-indexed)
console.log("First fruit:", fruits[0]);
console.log("Last fruit:", fruits[fruits.length - 1]);

// ============================================
// LEVEL 1: Array Methods - Adding/Removing
// ============================================

console.log("\n=== Array Methods ===");

// push - add to end
fruits.push("grape");
console.log("After push:", fruits);

// pop - remove from end
const removed = fruits.pop();
console.log("Removed:", removed);
console.log("After pop:", fruits);

// shift - remove from beginning
const first = fruits.shift();
console.log("Removed first:", first);
console.log("After shift:", fruits);

// unshift - add to beginning
fruits.unshift("mango");
console.log("After unshift:", fruits);

// ============================================
// LEVEL 2: Array Iteration Methods
// ============================================

console.log("\n=== Array Iteration Methods ===");

const numbers = [1, 2, 3, 4, 5];

// map - transform each element (returns new array)
const doubled = numbers.map((n) => n * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

// filter - keep elements that match condition
const evens = numbers.filter((n) => n % 2 === 0);
console.log("Even numbers:", evens);

// find - get first element that matches
const found = numbers.find((n) => n > 3);
console.log("First number > 3:", found);

// some - check if any elements match
const hasLarge = numbers.some((n) => n > 4);
console.log("Has number > 4?", hasLarge);

// every - check if all elements match
const allPositive = numbers.every((n) => n > 0);
console.log("All positive?", allPositive);

// reduce - transform array into single value
const sum = numbers.reduce((total, n) => total + n, 0);
console.log("Sum of all:", sum);

// ============================================
// LEVEL 2: Object Basics
// ============================================

console.log("\n=== Objects ===");

const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  isAdmin: true,
};

console.log("User object:", user);

// Accessing properties
console.log("Name:", user.name);
console.log("Email:", user["email"]);

// Adding properties
user.city = "NYC";
console.log("After adding city:", user);

// Deleting properties
delete user.isAdmin;
console.log("After deleting isAdmin:", user);

// ============================================
// LEVEL 2: Destructuring
// ============================================

console.log("\n=== Destructuring ===");

// Array destructuring
const colors = ["red", "green", "blue"];
const [firstColor, secondColor, thirdColor] = colors;
console.log("Destructured colors:", firstColor, secondColor, thirdColor);

// Skip elements
const [primary, , tertiary] = colors;
console.log("Primary and tertiary:", primary, tertiary);

// Object destructuring
const person = { name: "Bob", age: 25, city: "Boston" };
const { name, age } = person;
console.log("Destructured person:", name, age);

// Destructuring with rename
const { name: userName, city: userCity } = person;
console.log("Renamed:", userName, userCity);

// ============================================
// LEVEL 3: Spread Operator
// ============================================

console.log("\n=== Spread Operator ===");

// Spread with arrays (create copies and combine)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
console.log("Combined arrays:", combined);

// Create copy with new element
const newArr = [...arr1, 4];
console.log("New array:", newArr);

// Spread with objects (create copies and merge)
const baseUser = { name: "Charlie", age: 30 };
const extendedUser = { ...baseUser, email: "charlie@example.com" };
console.log("Extended user:", extendedUser);

// Override properties
const updatedUser = { ...baseUser, age: 31 };
console.log("Updated user:", updatedUser);

// ============================================
// LEVEL 3: Array Methods for Immutability
// ============================================

console.log("\n=== Immutability Patterns ===");

const todoList = [
  { id: 1, task: "Learn TypeScript", done: false },
  { id: 2, task: "Build project", done: false },
];

// Add item immutably
const newTodo = { id: 3, task: "Deploy", done: false };
const updatedTodos = [...todoList, newTodo];
console.log("Added todo:", updatedTodos);

// Update item immutably
const markedDone = updatedTodos.map((todo) =>
  todo.id === 2 ? { ...todo, done: true } : todo
);
console.log("Marked todo 2 as done:", markedDone);

// Remove item immutably
const removedTodo = markedDone.filter((todo) => todo.id !== 1);
console.log("Removed todo 1:", removedTodo);

// ============================================
// LEVEL 3: Object Methods and this
// ============================================

console.log("\n=== Object Methods ===");

const calculator = {
  value: 0,

  add(num: number) {
    this.value += num;
    return this;
  },

  subtract(num: number) {
    this.value -= num;
    return this;
  },

  getResult() {
    return this.value;
  },
};

console.log("Calculator chaining:");
const result = calculator.add(10).subtract(3).add(5).getResult();
console.log("Result:", result);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use map, filter, find instead of manual loops
const data = [1, 2, 3, 4, 5];
const processed = data
  .filter((n) => n % 2 === 0)
  .map((n) => n * 2);
console.log("Processed data:", processed);

// ✅ Use spread for immutable updates
const state = { count: 0, name: "counter" };
const newState = { ...state, count: state.count + 1 };
console.log("Updated state:", newState);

// ✅ Destructure to extract only what you need
const config = { host: "localhost", port: 3000, ssl: true, timeout: 5000 };
const { host, port } = config;
console.log("Using:", host, port);

// ✅ Avoid mutating arrays directly
const original = [1, 2, 3];
const badUpdate = original; // This references the same array!
const goodUpdate = [...original]; // This creates a copy!

badUpdate.push(4);
console.log("Original after bad update:", original); // Changed!

goodUpdate.push(5);
console.log("Original after good update:", original); // Unchanged!

// ✅ Use meaningful property names
const userAccount = {
  firstName: "Alice",
  lastName: "Johnson",
  emailAddress: "alice@example.com",
  accountAge: 30,
};

console.log("\n✅ Practice complete!");
