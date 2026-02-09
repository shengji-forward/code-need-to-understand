// SOLUTION: Exercise 1 - Variables and Types
// Compare with your work to see how you did!

console.log("=== Exercise 1: Variables and Types (Solution) ===\n");

// ============================================
// SOLUTION 1: Create variables
// ============================================
const userName = "Alice";
let score = 0;
const isActive = true;

console.log("Name:", userName);
console.log("Score:", score);
console.log("Active:", isActive);

// ============================================
// SOLUTION 2: Update the score
// ============================================
score = score + 10; // or: score += 10;
console.log("\nScore after update:", score);

// ============================================
// SOLUTION 3: Use template literals
// ============================================
const greeting = `Hello, ${userName}!`;
console.log(greeting);

// ============================================
// SOLUTION 4: Fix the type coercion bug
// ============================================
const value1 = 10;
const value2 = "5";
const sum = value1 + Number(value2); // Convert string to number

console.log("\nSum:", sum); // Prints 15

// ============================================
// SOLUTION 5: Use strict equality
// ============================================
const comparison = 5 === "5"; // Strict equality
console.log("Is 5 strictly equal to '5'?:", comparison); // false

// ============================================
// BONUS SOLUTION
// ============================================
const user = {
  name: "Bob",
  age: 25,
  email: "bob@example.com",
};

console.log("\n=== Bonus Challenge ===");
console.log(`User: ${user.name}, Age: ${user.age}, Email: ${user.email}`);

console.log("\n✅ Exercise complete!");
