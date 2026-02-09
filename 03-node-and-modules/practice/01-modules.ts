// ES Modules and Node.js
// Run with: npx tsx 01-modules.ts

console.log("=== ES Modules ===\n");

// ============================================
// LEVEL 1: Named Exports/Imports
// ============================================

// These would normally be in separate files, but shown here for demonstration

// In math-utils.ts (named exports)
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;

// In main.ts (named imports)
// import { add, subtract } from './math-utils.js';

// ============================================
// LEVEL 1: Default Exports/Imports
// ============================================

// In calculator.ts (default export)
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

// In main.ts (default import)
// import Calculator from './calculator.js';

// ============================================
// LEVEL 1: Mixed Exports
// ============================================

// In utils.ts
const API_URL = "https://api.example.com";

function fetchData() {
  return fetch(API_URL);
}

export { fetchData };
export { API_URL as configUrl }; // Rename on export

// In main.ts
// import { fetchData, configUrl } from './utils.js';

// ============================================
// LEVEL 2: Re-exports (Barrel Files)
// ============================================

// In index.ts (barrel file that re-exports from multiple files)
// export { add, subtract, multiply } from './math-utils.js';
// export { divide } from './division-utils.js';
// export { Calculator } from './calculator.js';

// In main.ts (clean imports)
// import { add, Calculator } from './index.js';

// ============================================
// LEVEL 2: Dynamic Imports
// ============================================

async function loadModule() {
  console.log("\n=== Dynamic Imports ===");

  // Load module at runtime (not build time)
  // const math = await import('./math-utils.js');
  // console.log(math.add(2, 3));

  console.log("Dynamic import would load module here");
  console.log("Useful for code splitting and lazy loading");
}

loadModule();

// ============================================
// LEVEL 2: Importing Types
// ============================================

// In types.ts
export interface User {
  id: number;
  name: string;
}

export type UserRole = "admin" | "user" | "guest";

// In main.ts (type-only import)
// import type { User, UserRole } from './types.js';

// ============================================
// LEVEL 3: Common Import Patterns
// ============================================

console.log("\n=== Import Patterns ===");

// Pattern 1: Import all as namespace
// import * as math from './math-utils.js';
// math.add(2, 3);

// Pattern 2: Side-effect imports (run code but don't import anything)
// import './polyfills.js';

// Pattern 3: Import default and named together
// import Calculator, { add } from './calculator.js';

console.log("Common patterns for organizing imports");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Group imports by source
// 1. Node.js built-ins
import { readFileSync } from "fs";

// 2. External packages
// import express from 'express';

// 3. Internal imports
// import { myFunction } from './utils.js';

// ✅ Use named exports for utilities
export const UTIL1 = "value1";
export const UTIL2 = "value2";

// ✅ Use default exports for main components/classes
export default class UserService {
  // Main class logic
}

// ✅ Re-export commonly used items from barrel files
// export * from './math-utils.js';
// export { default as Calculator } from './calculator.js';

// ✅ Use absolute imports for large projects
// import { Button } from '@/components/Button';
// (requires path mapping in tsconfig.json)

// ❌ Avoid deep relative imports
// import { utils } from '../../../utils/helpers.js';
// (hard to read and refactor)

// ✅ Use type-only imports when only importing types
// import type { User } from './types.js';

// ✅ Keep import paths consistent
// Use './file.js' not './file' (explicit about file type)

console.log("\n✅ Practice complete!");
