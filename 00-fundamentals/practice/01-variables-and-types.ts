// Variables and Data Types Practice
// Run with: npx tsx 01-variables-and-types.ts

console.log("=== Variables and Data Types ===\n");

// ============================================
// LEVEL 1: Basics
// ============================================

// 'let' allows reassignment
let count = 0;
console.log("Initial count:", count);

count = 1;
console.log("After reassignment:", count);

// 'const' does NOT allow reassignment (read-only reference)
const pi = 3.14159;
console.log("Pi value:", pi);

// This would cause an error:
// pi = 3.14; // Error: Cannot assign to 'pi' because it is a constant

// ============================================
// LEVEL 2: Primitive Types
// ============================================

// String - text data
const message = "Hello, OpenCoach!";
console.log("\nString:", message);

// Number - both integers and floating-point
const integer = 42;
const decimal = 3.14;
console.log("Integer:", integer, "Decimal:", decimal);

// Boolean - true or false
const isActive = true;
const isComplete = false;
console.log("Boolean values:", isActive, isComplete);

// Null and Undefined
let emptyVar = null; // Intentional absence of value
let notDefined = undefined; // Variable declared but not assigned
console.log("Null:", emptyVar, "Undefined:", notDefined);

// ============================================
// LEVEL 3: Type Coercion (Common Gotcha!)
// ============================================

console.log("\n=== Type Coercion Examples ===");

// String + Number = String (concatenation)
const result1 = 1 + "1";
console.log("1 + '1' =", result1, "(type:", typeof result1 + ")");

// Number + Number = Number (addition)
const result2 = 1 + 1;
console.log("1 + 1 =", result2, "(type:", typeof result2 + ")");

// String - Number = Number (coerces string to number)
const result3 = "10" - 5;
console.log("'10' - 5 =", result3, "(type:", typeof result3 + ")");

// String * Number = Number (coerces string to number)
const result4 = "3" * 4;
console.log("'3' * 4 =", result4, "(type:", typeof result4 + ")");

// ============================================
// LEVEL 3: Strict Equality (===) vs Loose (==)
// ============================================

console.log("\n=== Equality Examples ===");

// Loose equality (==) - converts types before comparing
console.log("5 == '5':", 5 == "5"); // true (string converted to number)
console.log("null == undefined:", null == undefined); // true

// Strict equality (===) - no type conversion
console.log("5 === '5':", 5 === "5"); // false (different types)
console.log("null === undefined:", null === undefined); // false

// ALWAYS use strict equality (===) to avoid bugs!

// ============================================
// LEVEL 3: Template Literals
// ============================================

console.log("\n=== Template Literals ===");

const userName = "Alice";
const userAge = 30;

// Old way (string concatenation)
const oldWay = "Name: " + userName + ", Age: " + userAge;
console.log("Old way:", oldWay);

// New way (template literals)
const newWay = `Name: ${userName}, Age: ${userAge}`;
console.log("New way:", newWay);

// Template literals support multiple lines
const multiline = `
  This is a
  multiline
  string
`;
console.log("Multiline:", multiline);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use const by default
const API_URL = "https://api.opencoach.com";

// ✅ Use let only when you need to reassign
let attemptCount = 0;
attemptCount++;

// ✅ Use meaningful variable names
const userAuthenticationToken = "abc123"; // Good
const x = "abc123"; // Bad - unclear what x is

// ✅ Use === instead of ==
if (attemptCount === 3) {
  console.log("Max attempts reached");
}

// ✅ Initialize variables to avoid undefined
const defaultConfig = {
  retries: 3,
  timeout: 5000,
};
console.log("Default config:", defaultConfig);

console.log("\n✅ Practice complete!");
