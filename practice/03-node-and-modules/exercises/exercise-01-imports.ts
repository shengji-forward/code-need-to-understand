// EXERCISE 1: ES Modules
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-01-imports.ts

console.log("=== Exercise 1: ES Modules ===\n");

// ============================================
// TODO 1: Create named exports
// ============================================
// Instructions:
// - Create a simple calculator object with named exports
// - Include: add, subtract, multiply, divide functions
// - All functions take (a: number, b: number) and return number

// TODO: Your code here

// ============================================
// TODO 2: Create a default export
// ============================================
// Instructions:
// - Create a Logger class with: log(), warn(), error() methods
// - Export it as the default export
// - Each method should log a message with a prefix

// TODO: Your code here

// ============================================
// TODO 3: Create type exports
// ============================================
// Instructions:
// - Define a User interface with: id (number), name (string), email (string)
// - Define a UserRole type: "admin" | "user" | "guest"
// - Export both types

// TODO: Your code here

// ============================================
// TODO 4: Create a re-export barrel file
// ============================================
// Instructions:
// - Create re-exports for:
//   - All calculator functions from ./calculator.js
//   - Logger from ./logger.js as default
//   - User type from ./types.js
// - This would normally be in index.ts

// TODO: Your code here (as comments showing the re-export syntax)

// ============================================
// TODO 5: Use type-only imports
// ============================================
// Instructions:
// - Show the correct syntax for importing only types
// - Import User and UserRole types (if they were in types.ts)

// TODO: Your code here (as comments showing the import syntax)

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Show how to dynamically import a module
// - Use async/await with the import() function
// - Log a message when the module is loaded

// TODO: Your code here (as comments showing dynamic import)

console.log("\n✅ Exercise complete!");
export {};
