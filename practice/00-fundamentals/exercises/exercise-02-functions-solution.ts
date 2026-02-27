// SOLUTION: Exercise 2 - Functions
// Compare with your work to see how you did!

console.log("=== Exercise 2: Functions (Solution) ===\n");

// ============================================
// SOLUTION 1: Create a basic function
// ============================================
function square(num: number): number {
  return num * num;
}

console.log("Square of 4:", square(4)); // 16
console.log("Square of 5:", square(5)); // 25

// ============================================
// SOLUTION 2: Create an arrow function
// ============================================
const double = (n: number): number => n * 2;

console.log("Double of 3:", double(3)); // 6
console.log("Double of 7:", double(7)); // 14

// ============================================
// SOLUTION 3: Function with default parameter
// ============================================
function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

console.log("\nGreeting with name:", greet("Alice")); // "Hello, Alice!"
console.log("Greeting without name:", greet()); // "Hello, Guest!"

// ============================================
// SOLUTION 4: Function that takes a callback
// ============================================
function processArray(numbers: number[], callback: (n: number) => number): number[] {
  return numbers.map(callback);
}

const nums = [1, 2, 3, 4];
const tripled = processArray(nums, (n) => n * 3);
console.log("\nTripled array:", tripled); // [3, 6, 9, 12]

// ============================================
// SOLUTION 5: Create a closure
// ============================================
function createCounter() {
  let count = 0;

  return {
    increment(): number {
      count++;
      return count;
    },
    getCount(): number {
      return count;
    },
  };
}

console.log("\n=== Closure Test ===");
const myCounter = createCounter();
console.log("Initial count:", myCounter.getCount()); // 0
myCounter.increment();
myCounter.increment();
console.log("After 2 increments:", myCounter.getCount()); // 2

// ============================================
// BONUS SOLUTION
// ============================================
function calculate(a: number, b: number, operation: string): number {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    default:
      throw new Error("Unknown operation");
  }
}

console.log("\n=== Bonus Challenge ===");
console.log("5 + 3 =", calculate(5, 3, "add")); // 8
console.log("10 - 4 =", calculate(10, 4, "subtract")); // 6
console.log("6 * 7 =", calculate(6, 7, "multiply")); // 42
console.log("20 / 4 =", calculate(20, 4, "divide")); // 5

console.log("\n✅ Exercise complete!");
