# Learning Summary: 03-Node-and-Modules Complete (Topic 1)

**Completed**: 2026-03-03
**Topics**: ES Modules, Named/Default Exports, Type Exports, Re-exports, Dynamic Imports
**Purpose**: Use this summary for AI interview practice, recap, and YouTube video preparation

---

## Topic 1: ES Modules

### What You Learned

#### 1. Named Exports/Imports

**Your code:**
```typescript
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
```

**Import usage:**
```typescript
import { add, subtract } from './math-utils.js';
```

**Key concept:**
- Named exports export specific values/functions with their names
- Can have multiple named exports per file
- Import with curly braces `{ name1, name2 }`
- Must use exact exported name when importing (or use `as` to rename)
- File extension required in import paths (`.js`)
- Named exports are best for utilities and multiple functions

**Practice file pattern:**
```typescript
// math-utils.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;

// main.ts
import { add, subtract } from './math-utils.js';
console.log(add(5, 3)); // 8
```

**Mixed exports with renaming:**
```typescript
// utils.ts
const API_URL = "https://api.example.com";

export { fetchData };
export { API_URL as configUrl }; // Rename on export

// main.ts
import { fetchData, configUrl } from './utils.js';
```

#### 2. Default Exports/Imports

**Your code:**
```typescript
export default class Logger {
  log(msg: string): void {
    console.log(`Message: ${msg}`)
  }

  warn(msg: string): void {
    console.warn(`Warn: ${msg}`)
  }

  error(msg: string): void {
    console.error(`Error: ${msg}`)
  }
}
```

**Import usage:**
```typescript
import Logger from './logger.js';

const logger = new Logger();
logger.log("Hello!");
```

**Key concept:**
- Default export exports a single value as the "main" export
- Each file can have only ONE default export
- Import without curly braces (any name can be used)
- Best for: main classes, components, or primary functionality
- Named exports vs default: Named = utilities, Default = main thing

**Practice file pattern:**
```typescript
// calculator.ts
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// main.ts
import Calculator from './calculator.js';
const calc = new Calculator();
console.log(calc.add(2, 3));
```

#### 3. Type Exports

**Your code:**
```typescript
interface User {
  id: number;
  name: string;
  email: string
}

type UserRole = "admin" | "user" | "guest"

export { type User, type UserRole }
```

**Import usage:**
```typescript
import type { User, UserRole } from './types.js';

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };
const role: UserRole = "admin";
```

**Key concept:**
- Export types with `export type { TypeName }` syntax
- Or define inline: `export interface User { ... }`
- Type-only imports with `import type { ... }` prevent runtime errors
- TypeScript removes type imports at compile time (not in JavaScript)
- Essential for sharing types across modules
- Type exports don't exist in runtime - compile-time only

**Practice file pattern:**
```typescript
// types.ts
export interface User {
  id: number;
  name: string;
}

export type UserRole = "admin" | "user" | "guest";

// main.ts (type-only import)
import type { User, UserRole } from './types.js';
```

#### 4. Re-exports (Barrel Files)

**Your code:**
```typescript
// In index.js
import { Calculator } from "./calculator.js"
import Logger from "./logger.js"
import { User, UserRole } from "./types.js"

export { Calculator }
export { Logger as default }
export type { User, UserRole }

// In other places import all things from one place (index.js)
import Logger, { Calculator, type User, type UserRole } from "./index.js"
```

**Key concept:**
- Re-export combines exports from multiple modules into one file
- Barrel file (index.ts/index.js) pattern for cleaner imports
- `export { name } from './file.js'` re-exports named exports
- `export { default as Name }` re-exports default as named
- `export * from './file.js'` re-exports all (wildcard)
- Reduces deep relative import paths
- Centralizes imports for easier refactoring

**Practice file pattern:**
```typescript
// index.ts (barrel file)
export { add, subtract, multiply } from './math-utils.js';
export { divide } from './division-utils.js';
export { default as Calculator } from './calculator.js';

// main.ts (clean imports from one place)
import { add, Calculator } from './index.js';
```

**Re-export patterns:**
```typescript
// Re-export named
export { fetchUser } from './api.js';

// Re-export default as named
export { default as UserService } from './user-service.js';

// Re-export all
export * from './utils.js';

// Re-export types
export type { User, Post } from './types.js';
```

#### 5. Type-Only Imports

**Your code:**
```typescript
// import type { User, UserRole } from "./types.ts"
```

**Key concept:**
- Use `import type { ... }` when only importing types
- TypeScript ensures no runtime value is imported
- Prevents accidental use of types as values
- Required for type-only exports in some TypeScript configurations
- Clean separation between types and values
- Important for circular dependency resolution

**Type-only vs regular import:**
```typescript
// ✅ Type-only import (compile-time only)
import type { User } from './types.js';

// ❌ Regular import (exists at runtime - may fail if no value)
import { User } from './types.js';

// Mixed import (types and values)
import { fetchUser, type User } from './api.js';
```

#### 6. Dynamic Imports (Bonus!)

**Your code:**
```typescript
// Normal import: loaded when program starts
// import { Calculator } from './calculator.js'

// Dynamic import: loaded when this line runs
// const { Calculator } = await import('./calculator.js')

async function add(a: number, b: number): Promise<number> {
  const { Calculator } = await import('./calculator.js')
  console.log("Calculator excuted the add function!")
  const calc = new Calculator()
  return calc.add(a, b)
}
```

**Key concept:**
- `import()` function returns a Promise (dynamic import)
- Loads module at runtime, not build time
- Used for code splitting and lazy loading
- Improves initial load time (only load what's needed)
- Returns module namespace object with all exports
- Must use `await` or `.then()` to get module
- Useful for: route-based loading, feature toggles, heavy dependencies

**Dynamic vs static import:**
```typescript
// Static import (loads at build time)
import { Calculator } from './calculator.js';

// Dynamic import (loads at runtime)
const math = await import('./calculator.js');
const Calculator = math.Calculator;

// Or with destructuring
const { Calculator } = await import('./calculator.js');
```

**Use cases:**
```typescript
// 1. Code splitting by route
const module = await import(`./pages/${pageName}.js`);

// 2. Lazy load heavy dependencies
async function processImage() {
  const sharp = await import('sharp');
  return sharp(data);
}

// 3. Feature flags
if (featureEnabled) {
  const module = await import('./premium-feature.js');
  module.doSomething();
}
```

#### 7. Common Import Patterns (Level 3)

**Pattern 1: Import all as namespace**
```typescript
import * as math from './math-utils.js';
math.add(2, 3);
```

**Pattern 2: Side-effect imports**
```typescript
import './polyfills.js'; // Runs code, imports nothing
```

**Pattern 3: Import default and named together**
```typescript
import Calculator, { add } from './calculator.js';
```

---

### Mistakes You Made & Fixed (Topic 1)

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **1 - Named exports** | Created `export class Calculator` instead of named function exports | Changed to `export const add = ...` | Use named exports for utilities, not classes |
| **3 - Type exports** | `export interface User, {type UserRole}` - invalid syntax | Changed to `export { type User, type UserRole }` | Type exports need braces or inline `export` |
| **4 - Re-export syntax** | Lines 92-101 and 111 were actual code, not comments | Added `//` prefix to all example code | Example code must be commented out in exercises |
| **3 - Export types** | Used `export { User }` without `type` keyword | Use `export { type User }` for type-only exports | Types need explicit `type` keyword in export |

---

### Best Practices Learned (Topic 1)

1. ✅ **Use named exports for utilities** - Multiple exports per file
2. ✅ **Use default exports for main components/classes** - One primary export
3. ✅ **Always include file extension** in import paths (`./file.js`)
4. ✅ **Use barrel files (index.ts)** to re-export and organize imports
5. ✅ **Use type-only imports** when only importing types (`import type { ... }`)
6. ✅ **Group imports by source** - Node built-ins, packages, internal
7. ✅ **Use dynamic imports** for code splitting and lazy loading
8. ✅ **Avoid deep relative imports** (e.g., `../../../utils.js`)
9. ✅ **Use absolute imports** for large projects with path mapping
10. ✅ **Import types separately** from values for clarity
11. ✅ **Re-export with meaningful names** from barrel files
12. ✅ **Comment out example code** in exercises (don't execute)
13. ✅ **Use `as` keyword** to rename on import/export conflicts
14. ✅ **Prefer named exports** over default for better tree-shaking
15. ✅ **Use namespace imports** (`import * as`) for modules with many exports

---

### Interview Questions (Topic 1)

1. **What's the difference between named exports and default exports?**
   - Answer: Named exports export specific values with their names (`export const foo`). Can have multiple per file. Import with `{ name }`. Default export is a single "main" export (`export default`). Import without braces. Named for utilities, default for main components.

2. **Why do import paths need `.js` extensions in ES modules?**
   - Answer: ES modules require explicit file extensions for browser compatibility and to avoid ambiguity. TypeScript doesn't require it, but runtime (Node.js/browsers) does.

3. **What are type-only imports and when should you use them?**
   - Answer: `import type { User }` imports types only at compile time. Use when you're not using any runtime values from the module. Prevents accidental runtime usage and improves build performance.

4. **What's a barrel file in ES modules?**
   - Answer: An index file that re-exports from multiple modules (`export * from './file.js'`). Centralizes imports, reduces deep relative paths, and provides a cleaner API for a directory.

5. **What's the difference between `import { type Foo }` and `import type { Foo }`?**
   - Answer: `import { type Foo }` imports type in a mixed import (with values). `import type { Foo }` is a pure type-only import. Both remove types at compile time, but syntax differs slightly.

6. **How do dynamic imports work?**
   - Answer: `import('./module.js')` returns a Promise that resolves to the module. Loads at runtime instead of build time. Used for code splitting, lazy loading, and conditional imports.

7. **When should you use namespace imports (`import * as`)?**
   - Answer: When importing modules with many exports or to avoid naming conflicts. Example: `import * as utils from './utils.js'` then `utils.add()`.

8. **What happens if you forget to use `.js` in import paths?**
   - Answer: TypeScript may compile fine, but runtime will fail with "module not found" error. ES modules require explicit file extensions.

9. **Can you mix named and default exports in the same file?**
   - Answer: Yes! You can have both `export default` and named `export const foo`. Import as `import Foo, { bar } from './file.js'`.

10. **How do you rename an import?**
    - Answer: Use the `as` keyword: `import { foo as bar } from './file.js'` or `import { default as Foo } from './file.js'`.

---

### Code Examples for YouTube Video (Topic 1)

#### Example 1: Named vs Default Exports

```typescript
// ========== NAMED EXPORTS ==========
// math-utils.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;

// main.ts - import with curly braces
import { add, subtract } from './math-utils.js';
console.log(add(5, 3)); // 8

// ========== DEFAULT EXPORTS ==========
// calculator.ts
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// main.ts - import without braces
import Calculator from './calculator.js';
const calc = new Calculator();
console.log(calc.add(5, 3)); // 8

// ========== MIXED EXPORTS ==========
// utils.ts
export default class Utils {
  // main thing
}

export const helper1 = () => {};
export const helper2 = () => {};

// main.ts - import both
import Utils, { helper1 } from './utils.js';
```

#### Example 2: Type Exports

```typescript
// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

// main.ts - type-only import
import type { User, UserRole } from './types.js';

function processUser(user: User): void {
  console.log(`Processing ${user.name}`);
}

const admin: UserRole = "admin";
```

#### Example 3: Barrel Files (Re-exports)

```typescript
// ========== WITHOUT BARREL ==========
// main.ts - messy deep imports
import { add } from './utils/math/add.js';
import { subtract } from './utils/math/subtract.js';
import Calculator from './utils/calculator/Calculator.js';
// ... hard to maintain

// ========== WITH BARREL ==========
// utils/math/index.ts
export { add } from './add.js';
export { subtract } from './subtract.js';
export { default as Calculator } from './Calculator.js';

// main.ts - clean imports
import { add, Calculator } from './utils/math/index.js';
// Much better!
```

#### Example 4: Dynamic Imports

```typescript
// ========== STATIC IMPORT ==========
// Loads at build time (always in bundle)
import { heavyLibrary } from './heavy.js';
heavyLibrary.doSomething();

// ========== DYNAMIC IMPORT ==========
// Loads only when needed (lazy loading)
async function useHeavyLibrary() {
  const { heavyLibrary } = await import('./heavy.js');
  heavyLibrary.doSomething();
}

// ========== ROUTE-BASED CODE SPLITTING ==========
async function loadPage(pageName: string) {
  const page = await import(`./pages/${pageName}.js`);
  page.render();
}

// Usage
await loadPage('home'); // Loads home.js
await loadPage('about'); // Loads about.js
```

#### Example 5: Import Patterns

```typescript
// Pattern 1: Namespace import (many exports)
import * as mathUtils from './math-utils.js';
mathUtils.add(2, 3);
mathUtils.subtract(5, 2);

// Pattern 2: Side-effect import (run code, no imports)
import './polyfills.js';
import './styles.css';

// Pattern 3: Default + named imports
import UserService, { validateUser } from './user-service.js';

// Pattern 4: Renaming imports
import { add as sum, subtract as diff } from './math.js';

// Pattern 5: Type-only imports
import type { User, Post } from './types.js';

// Pattern 6: Mixed type and value imports
import { fetchUser, type User } from './api.js';
```

---

## Progress

### Completed: Topic 1 - ES Modules ✅

- ✅ Named exports/imports
- ✅ Default exports/imports
- ✅ Type exports/imports
- ✅ Re-exports (barrel files)
- ✅ Type-only imports
- ✅ Dynamic imports
- ✅ Common import patterns
- ✅ Best practices for module organization

### Ready For: Topic 2

**Next: npm and Package Management**
- `package.json` configuration
- Installing packages with npm
- Semantic versioning
- Dependencies vs devDependencies
- npm scripts
- Environment variables

---

## Final Stats (Topic 1)

- **Exercises Completed**: 1
  - Exercise 1: ES Modules (TODO 1-5 + Bonus)
- **TODOs Completed**: 6 (5 main + 1 bonus)
- **Mistakes Identified**: 4
- **Key Concepts**: 7
- **Interview Questions**: 10
- **Code Examples**: 5
- **Module Patterns Mastered**: 8

**Estimated Study Time**: ~2-3 hours
**Ready for npm & Package Management**: ✅ YES!

---

*This document covers Topic 1. Node.js & Modules module in progress.*
