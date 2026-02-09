// EXERCISE 2: Functions
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-02-functions.ts

console.log("=== Exercise 2: Functions ===\n");

// ============================================
// TODO 1: Create a basic function
// ============================================
// Instructions:
// - Create a function called 'square' that takes a number
// - Return the square of that number (number * number)
// - Use TypeScript type annotations

// TODO: Your code here
// function square(...): ... {
//   ...
// }

console.log("Square of 4:", square(4)); // Should output 16
console.log("Square of 5:", square(5)); // Should output 25

// ============================================
// TODO 2: Create an arrow function
// ============================================
// Instructions:
// - Create an arrow function called 'double' that takes a number
// - Return the number multiplied by 2
// - Use concise syntax (one line)

// TODO: Your code here
// const double = ...

console.log("Double of 3:", double(3)); // Should output 6
console.log("Double of 7:", double(7)); // Should output 14

// ============================================
// TODO 3: Function with default parameter
// ============================================
// Instructions:
// - Create a function called 'greet' that takes a name parameter
// - Default the name to "Guest"
// - Return a greeting string: "Hello, [name]!"

// TODO: Your code here
// function greet(...): ... {
//   ...
// }

console.log("\nGreeting with name:", greet("Alice")); // Should output "Hello, Alice!"
console.log("Greeting without name:", greet()); // Should output "Hello, Guest!"

// ============================================
// TODO 4: Function that takes a callback
// ============================================
// Instructions:
// - Create a function called 'processArray' that takes:
//   1. An array of numbers
//   2. A callback function
// - Apply the callback to each number and return new array
// - Use the map method

// TODO: Your code here
// function processArray(numbers: number[], callback: ...): ... {
//   ...
// }

const nums = [1, 2, 3, 4];
const tripled = processArray(nums, (n) => n * 3);
console.log("\nTripled array:", tripled); // Should output [3, 6, 9, 12]

// ============================================
// TODO 5: Create a closure
// ============================================
// Instructions:
// - Create a function called 'createCounter' that:
//   1. Has a private 'count' variable initialized to 0
//   2. Returns an object with 'increment' and 'getCount' methods
//   3. 'increment' should increase count by 1
//   4. 'getCount' should return the current count

// TODO: Your code here
// function createCounter() {
//   let count = 0;
//   return {
//     increment(): ...,
//     getCount(): ...
//   };
// }

console.log("\n=== Closure Test ===");
const myCounter = createCounter();
console.log("Initial count:", myCounter.getCount()); // Should be 0
myCounter.increment();
myCounter.increment();
console.log("After 2 increments:", myCounter.getCount()); // Should be 2

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a function called 'calculate' that takes:
//   1. Two numbers
//   2. An operation string: 'add', 'subtract', 'multiply', or 'divide'
// - Perform the operation and return the result
// - Use a switch statement

// TODO: Your code here
// function calculate(...): ... {
//   switch (...) {
//     ...
//   }
// }

console.log("\n=== Bonus Challenge ===");
console.log("5 + 3 =", calculate(5, 3, "add")); // Should be 8
console.log("10 - 4 =", calculate(10, 4, "subtract")); // Should be 6
console.log("6 * 7 =", calculate(6, 7, "multiply")); // Should be 42
console.log("20 / 4 =", calculate(20, 4, "divide")); // Should be 5

console.log("\n✅ Exercise complete!");
