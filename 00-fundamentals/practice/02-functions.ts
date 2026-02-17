// Functions Practice
// Run with: npx tsx 02-functions.ts

console.log("=== Functions ===\n");

// ============================================
// LEVEL 1: Function Declaration
// ============================================

// Function declaration (hoisted - can be called before definition)
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log("Function declaration:");
console.log(greet("Alice"));

// ============================================
// LEVEL 1: Function Expression
// ============================================

// Function expression (not hoisted)
const greet2 = function (name: string): string {
  return `Hi, ${name}!`;
};

console.log("\nFunction expression:");
console.log(greet2("Bob"));

// ============================================
// LEVEL 1: Arrow Functions
// ============================================

// Arrow function (concise syntax)
const greet3 = (name: string): string => {
  return `Hey, ${name}!`;
};

// Even shorter (implicit return for one-liners)
const greet4 = (name: string): string => `Greetings, ${name}!`;

console.log("\nArrow functions:");
console.log(greet3("Charlie"));
console.log(greet4("Diana"));

// ============================================
// LEVEL 2: Parameters and Default Values
// ============================================

// Function with multiple parameters
function createUser(name: string, age: number, isAdmin: boolean) {
  return { name, age, isAdmin };
}

console.log("\nMultiple parameters:");
console.log(createUser("Eve", 25, true));

// Default parameters
function greetWithDefault(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

console.log("\nDefault parameters:");
console.log(greetWithDefault()); // Uses default "Guest"
console.log(greetWithDefault("Frank"));

// ============================================
// LEVEL 2: Rest Parameters
// ============================================

// Rest parameters collect multiple arguments into an array
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("\nRest parameters:");
console.log("sum(1, 2, 3):", sum(1, 2, 3));
console.log("sum(1, 2, 3, 4, 5):", sum(1, 2, 3, 4, 5));

// ============================================
// LEVEL 2: Callback Functions
// ============================================

// Function that takes another function as a parameter
function processData(data: number[], callback: (num: number) => number): number[] {
  return data.map(callback);
}

const numbers = [1, 2, 3, 4, 5];

// Using arrow functions as callbacks
const doubled = processData(numbers, (num) => num * 2);
const tripled = processData(numbers, (num) => num * 3);

console.log("\nCallback functions:");
console.log("Original:", numbers);
console.log("Doubled:", doubled);
console.log("Tripled:", tripled);

// ============================================
// LEVEL 3: Closures
// ============================================

console.log("\n=== Closures ===");

// A closure is a function that remembers variables from its outer scope
function createCounter() {
  let count = 0; // This variable is "closed over"

  return {
    increment: () => {
      count++;
      return count;
    },
    decrement: () => {
      count--;
      return count;
    },
    getCount: () => count,
  };
}

const counter = createCounter();
console.log("Initial count:", counter.getCount());
console.log("After increment:", counter.increment());
console.log("After increment:", counter.increment());
console.log("After decrement:", counter.decrement());

// Each closure has its own separate count variable
const counter2 = createCounter();
console.log("\nCounter 2 initial:", counter2.getCount()); // Starts at 0, not 3

// ============================================
// LEVEL 3: Function Factories
// ============================================

console.log("\n=== Function Factories ===");

// Function that creates functions with preset behavior
function createMultiplier(multiplier: number) {
  return function (num: number): number {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log("double(5):", double(5));
console.log("triple(5):", triple(5));
console.log("quadruple(5):", quadruple(5));

// ============================================
// LEVEL 3: Recursive Functions
// ============================================

console.log("\n=== Recursive Functions ===");

// Function that calls itself
function factorial(n: number): number {
  // Base case
  if (n <= 1) return 1;

  // Recursive case
  return n * factorial(n - 1);
}

console.log("factorial(5):", factorial(5)); // 5 * 4 * 3 * 2 * 1 = 120

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use arrow functions for short callbacks
const nums = [1, 2, 3];
const doubledNums = nums.map((n) => n * 2);

// ✅ Use function declarations for main logic
function mainProcess() {
  console.log("Main processing logic here");
}

// ✅ Keep functions small and focused
function validateEmail(email: string): boolean {
  return email.includes("@");
}

function sendEmail(email: string): void {
  if (validateEmail(email)) {
    console.log(`Sending email to ${email}`);
  }
}

// ✅ Use descriptive names that describe what they return
function getUserById(id: string) {
  return { id, name: "User" };
}
// NOT:
// @ts-expect-error
function get(id) {
  return { id, name: "User" };
}

// ✅ Use default parameters instead of checking for undefined
function connectToDb(connectionString: string = "localhost:5432") {
  console.log(`Connecting to ${connectionString}`);
}

console.log("\n✅ Practice complete!");

export {}