// SOLUTION: Exercise 1 - ES Modules
// Compare with your work to see how you did!

console.log("=== Exercise 1: ES Modules (Solution) ===\n");

// ============================================
// SOLUTION 1: Named Exports
// ============================================

// In calculator.ts:
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
};

// Usage in main.ts:
// import { add, subtract, multiply, divide } from './calculator.js';

console.log("=== Named Exports ===");
console.log("5 + 3 =", add(5, 3));
console.log("5 - 3 =", subtract(5, 3));
console.log("5 * 3 =", multiply(5, 3));
console.log("6 / 3 =", divide(6, 3));

// ============================================
// SOLUTION 2: Default Export
// ============================================

// In logger.ts:
export default class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}

// Usage in main.ts:
// import Logger from './logger.js';

console.log("\n=== Default Export ===");
const logger = new Logger();
logger.log("Application started");
logger.warn("This is a warning");
logger.error("This is an error");

// ============================================
// SOLUTION 3: Type Exports
// ============================================

// In types.ts:
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

// Usage in main.ts:
// import type { User, UserRole } from './types.js';

console.log("\n=== Type Exports ===");
// Example of using the types (would be in separate files normally)
const userRole: UserRole = "admin";
console.log("User role:", userRole);

// ============================================
// SOLUTION 4: Re-exports (Barrel File)
// ============================================

// In index.ts (barrel file):
// export { add, subtract, multiply, divide } from './calculator.js';
// export { default as Calculator } from './calculator.js'; // If there was a default
// export { default as Logger } from './logger.js';
// export type { User, UserRole } from './types.js';

// Usage in main.ts:
// import { add, Logger, type User } from './index.js';

console.log("\n=== Re-exports ===");
console.log("Re-exports allow clean imports from a single index file");

// ============================================
// SOLUTION 5: Type-Only Imports
// ============================================

// Type-only import (best practice when only importing types):
// import type { User, UserRole } from './types.js';

// Combined import (default + named + type):
// import Logger, { type LogLevel } from './logger.js';

console.log("\n=== Type-Only Imports ===");
console.log("Use 'import type { ... }' when only importing types");
console.log("This helps bundlers optimize the bundle size");

// ============================================
// BONUS SOLUTION: Dynamic Imports
// ============================================

console.log("\n=== Dynamic Import ===");

async function loadModule() {
  // Dynamic import loads the module at runtime
  // const math = await import('./calculator.js');
  // console.log(math.add(2, 3));

  console.log("Dynamic imports allow:");
  console.log("  - Code splitting");
  console.log("  - Lazy loading");
  console.log("  - Conditional loading");
  console.log("  - Importing modules with variable names");
}

loadModule();

// ============================================
// Summary
// ============================================

console.log("\n=== Summary ===");
console.log("✅ Named exports: Multiple exports per module");
console.log("✅ Default exports: One main export per module");
console.log("✅ Type exports: Export and import types separately");
console.log("✅ Re-exports: Create barrel files for cleaner imports");
console.log("✅ Dynamic imports: Load modules at runtime");

console.log("\n✅ Exercise complete!");

export {};
