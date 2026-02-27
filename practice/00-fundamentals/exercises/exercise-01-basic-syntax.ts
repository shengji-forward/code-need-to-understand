// EXERCISE 1: Variables and Types
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-01-basic-syntax.ts

console.log("=== Exercise 1: Variables and Types ===\n");

// ============================================
// TODO 1: Create variables
// ============================================
// Instructions:
// - Create a const variable called 'userName' with your name
// - Create a let variable called 'score' with value 0
// - Create a const variable called 'isActive' with value true

// TODO: Your code here
const userName = "SJ forward";
let score = 0;
const isActive = true;

console.log("Name:", userName);
console.log("Score:", score);
console.log("Active:", isActive);

// ============================================
// TODO 2: Update the score
// ============================================
// Instructions:
// - Increment score by 10
// - Log the new score

// TODO: Your code here
score = score + 10 

console.log(`Score after update: ${score}`);

// Expected output: "Score after update: 10"

// ============================================
// TODO 3: Use template literals
// ============================================
// Instructions:
// - Create a string that says "Hello, [userName]!" using template literals
// - Log the greeting

// TODO: Your code here

console.log(`Hello, ${userName}!`);

// Expected output: "Hello, [your name]!"

// ============================================
// TODO 4: Fix the type coercion bug
// ============================================
// Instructions:
// - The code below has a bug due to type coercion
// - Fix it so the result is 15 (not 105)
// - Hint: Convert the string to a number

const value1 = 10;
const value2 = "5";
// let sum = value1 + value2; // This gives "105" (string concatenation)

// TODO: Fix the bug to get 15

let sum = value1 + +value2

// let sum = value1+ Number(value2)

// let sum = value1 + parseInt(value2, 10)

console.log("\nSum:", sum); // Should print 15

// ============================================
// TODO 5: Use strict equality
// ============================================
// Instructions:
// - Replace == with === to properly compare values
// - Check if 5 equals "5" (should be false with ===)

// const comparison = 5 == "5"; // Bad - uses loose equality

// TODO: Replace with strict equality
// @ts-expect-error Intentional: demonstrating strict equality returns false for different types
const comparison = 5 === "5";

console.log("Is 5 strictly equal to '5'?:", comparison); // Should be false

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a user object with properties: name, age, email
// - Use template literals to log a summary
// - Log: "User: [name], Age: [age], Email: [email]"

// TODO: Your code here

console.log("\n=== Bonus Challenge ===");
// Log your user summary here

interface User {
  name: string,
  age: number,
  email: string
}

const user: User = {
  name: "SJ forward",
  age: 26,
  email: "shengjideng@gmail.com"
}

console.log(`User: ${user.name}, Age: ${user.age}, Email: ${user.email}`);

console.log("\n✅ Exercise complete!");

export {};
