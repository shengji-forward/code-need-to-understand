# Learning Summary: 03-Node-and-Modules Complete (Topics 1-2)

**Completed**: 2026-03-04
**Topics**: ES Modules, Named/Default Exports, Type Exports, Re-exports, Dynamic Imports, npm Scripts, Semantic Versioning, Dependencies
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

## Topic 2: npm & Package Management

### What You Learned

#### 1. package.json Structure

**Your code:**
```typescript
const packageJson = {
  name: "my-porject",
  version: "1.0.0",
  type: "module",
  scripts: {
    start: "npx tsx index.ts",
    dev: "npx tsx watch index.ts",
    build: "tsc",
  },
  dependencies: {
    express: "^4.18.0"
  },
  devDependencies: {
    typescript: "^5.0.0"
  }
}
```

**Key concept:**
- `package.json` is the heart of every Node.js project
- Contains metadata about the project and its dependencies
- `name`: Unique identifier for the package
- `version`: Follows semantic versioning (MAJOR.MINOR.PATCH)
- `type: "module"`: Enables ES modules (critical for modern Node.js)
- `scripts`: Define shortcuts for common commands
- `dependencies`: Packages needed in production
- `devDependencies`: Packages only needed during development

**Essential fields:**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "type": "module",
  "scripts": { ... },
  "keywords": ["node", "javascript"],
  "author": "Your Name",
  "license": "MIT"
}
```

#### 2. Semantic Versioning (Semver)

**Your code:**
```typescript
// - 1.0.0 → 1.0.1 = PATCH changed
// - 1.0.0 → 1.1.0 = MINOR changed
// - 1.0.0 → 2.0.0 = MAJOR changed
```

**Key concept:**
- Format: `MAJOR.MINOR.PATCH` (e.g., 2.4.1)
- **MAJOR**: Breaking changes - upgrading might break your code
- **MINOR**: New features - backward compatible
- **PATCH**: Bug fixes - backward compatible

**Version change examples:**
```
1.0.0 → 1.0.1  (PATCH: Bug fix)
1.0.0 → 1.1.0  (MINOR: New feature, backward compatible)
1.0.0 → 2.0.0  (MAJOR: Breaking changes, may need code updates)
```

**Why semver matters:**
- Predictable updates
- Clear communication of changes
- Automated dependency management
- Prevents breaking changes from sneaking in

#### 3. Dependencies vs DevDependencies

**Your code:**
```typescript
const productionDeps = ["express", "react", "lodash", "axios", "mongoose"]
const devDeps = ["typescript", "jest", "eslint", "prettier", "nodemon"]
```

**Key concept:**
- **dependencies**: Required for the app to run in production
  - Install with: `npm install <package>`
  - Examples: express, react, lodash, axios, mongoose
  - These are deployed with your app

- **devDependencies**: Only needed during development
  - Install with: `npm install --save-dev <package>`
  - Examples: typescript, jest, eslint, prettier, nodemon
  - Testing, linting, building tools
  - NOT installed in production

**Installation commands:**
```bash
# Production dependency
npm install express

# Dev dependency
npm install --save-dev typescript
# or shorthand
npm install -D typescript

# Install all dependencies (both types)
npm install
```

**Classification guide:**
```
PRODUCTION DEPENDENCIES:
├── Frameworks: express, react, vue
├── Libraries: lodash, axios, moment
├── Database: mongoose, prisma, sequelize
└── Utilities: dotenv, helmet

DEV DEPENDENCIES:
├── Compilers: typescript, babel
├── Linters: eslint, prettier
├── Testers: jest, mocha, cypress
├── Runners: nodemon, tsx, ts-node
└── Bundlers: webpack, vite, rollup
```

#### 4. Version Ranges

**Your code:**
```typescript
//   - "^1.2.3" = >=1.2.3 <2.0.0 — same major, any minor/patch
//   - "~1.2.3" = >=1.2.3 <1.3.0 — same major+minor, any patch
//   - "1.2.3" = exactly 1.2.3 only
//   - "*" = any version (avoid in production — too unpredictable)
```

**Key concept:**
- **^1.2.3** (Caret): Allows 1.x.x updates, but not 2.0.0
  - Updates: 1.2.3 → 1.2.4 ✅, 1.3.0 ✅, 2.0.0 ❌
  - Most common for dependencies
  - Balances stability and updates

- **~1.2.3** (Tilde): Allows patch updates only (1.2.x)
  - Updates: 1.2.3 → 1.2.4 ✅, 1.3.0 ❌, 2.0.0 ❌
  - More conservative
  - Good for stability-critical apps

- **1.2.3** (Exact): Only version 1.2.3
  - No updates allowed
  - Maximum stability
  - Used for locked dependencies

- ***** (Wildcard): Any version
  - **NOT recommended for production**
  - Too unpredictable
  - Can introduce breaking changes

**Version range examples:**
```json
{
  "dependencies": {
    "express": "^4.18.0",    // 4.x.x (common)
    "react": "~18.2.0",      // 18.2.x only (conservative)
    "critical-lib": "1.2.3"  // exact version (locked)
  }
}
```

#### 5. Lifecycle Scripts

**Your code:**
```typescript
// 1. preinstall
//    Runs: Before npm install
//    Use case: Check Node.js version, create necessary directories

// 2. postinstall
//    Runs: After npm install
//    Use case: Build assets, setup database, run migrations

// 3. prestart
//    Runs: Before npm start
//    Use case: Validate environment variables, create logs directory
```

**Key concept:**
- Lifecycle scripts run automatically at specific times
- Named with `pre` and `post` prefixes
- Run in order: `pre<script>` → `<script>` → `post<script>`
- Useful for automation and setup tasks

**All lifecycle scripts:**
```typescript
preinstall    → Runs before npm install
install       → Runs during npm install
postinstall   → Runs after npm install
prestart      → Runs before npm start
start         → Runs during npm start
poststart     → Runs after npm start
pretest       → Runs before npm test
test          → Runs during npm test
posttest      → Runs after npm test
```

**Common npm scripts:**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

**Running scripts:**
```bash
npm start         # Runs start script
npm run dev       # Runs custom scripts
npm test          # Runs test script
```

#### 6. npm install vs npm ci vs npm update (Bonus!)

**Your code:**
```typescript
// npm install
// Reads package.json, installs missing packages
// Updates package-lock.json if needed
// Use: local development, after adding a new package

// npm ci (clean install)
// Reads package-lock.json only (ignores package.json ranges)
// Deletes node_modules first, then installs exact versions
// Fails if package-lock.json is missing or out of sync
// Use: CI/CD pipelines, production builds — guarantees reproducible installs

// npm update
// Updates packages to the latest version allowed by the ^/~ ranges in package.json
// Updates package-lock.json with new versions
// Use: when you want to pull in latest bug fixes/features within your version constraints
```

**Key concept:**
- **npm install**: For development
  - Reads `package.json`
  - Updates `package-lock.json` if needed
  - Installs missing packages
  - Use when: Adding packages, local development

- **npm ci**: For production/CI
  - Reads `package-lock.json` only (faster!)
  - Deletes `node_modules` first
  - Installs exact versions
  - Fails if lock file is missing/outdated
  - Use when: CI/CD, production deployments

- **npm update**: For updates
  - Updates packages within version ranges
  - Updates `package-lock.json`
  - Use when: Getting latest bug fixes/features

**Command comparison:**
```bash
# Development workflow
npm install              # Install dependencies
npm install express      # Add new package
npm update               # Update packages

# Production workflow
npm ci                   # Clean, fast install (CI/CD)

# Other useful commands
npm list                 # Show installed packages
npm outdated             # Check for updates
npm audit                # Check security
npm audit fix            # Fix security issues
```

---

### Mistakes You Made & Fixed (Topic 2)

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **1 - package.json** | Typo: `"my-porject"` instead of `"my-project"` | Fixed spelling | Check all string values in objects |

---

### Best Practices Learned (Topic 2)

16. ✅ **Commit package-lock.json** to version control
17. ✅ **Use `^` for most dependencies** (allows safe updates)
18. ✅ **Separate production and dev dependencies** correctly
19. ✅ **Use npm scripts** for common tasks (start, dev, build, test)
20. ✅ **Run npm audit** regularly for security
21. ✅ **Use npm ci** in CI/CD pipelines (faster, reproducible)
22. ✅ **Keep dependencies updated** but test before major upgrades
23. ✅ **Document why specific packages** are needed
24. ✅ **Use `~` for conservative updates** when stability is critical
25. ✅ **Avoid `*` or `latest`** in production dependencies
26. ✅ **Don't commit node_modules/** (use .gitignore)
27. ✅ **Use lifecycle scripts** for automation (preinstall, postinstall)
28. ✅ **Check Node.js version** compatibility before installing
29. ✅ **Use semantic versioning** consistently
30. ✅ **Pin exact versions** for critical production dependencies

---

### Interview Questions (Topic 2)

1. **What's the difference between `dependencies` and `devDependencies`?**
   - Answer: `dependencies` are required for the app to run in production (e.g., express, react). `devDependencies` are only needed during development (e.g., typescript, jest, eslint). Production installs skip devDependencies.

2. **What does `^1.2.3` mean in package.json?**
   - Answer: Allows updates to 1.x.x but not 2.0.0. Accepts 1.2.3 → 1.2.4, 1.3.0, but not 2.0.0. Most common for dependencies.

3. **What's semantic versioning?**
   - Answer: Version format: MAJOR.MINOR.PATCH. MAJOR = breaking changes, MINOR = new features (backward compatible), PATCH = bug fixes. Example: 2.4.1

4. **What's the difference between `npm install` and `npm ci`?**
   - Answer: `npm install` reads package.json and updates package-lock.json (for development). `npm ci` only reads package-lock.json, deletes node_modules, and installs exact versions (for CI/CD - faster and reproducible).

5. **What are npm lifecycle scripts?**
   - Answer: Scripts that run automatically: `preinstall`, `postinstall`, `prestart`, `poststart`, etc. Used for setup, validation, and automation.

6. **When should you use `~` vs `^` for version ranges?**
   - Answer: `~1.2.3` allows patch updates only (1.2.x) - more conservative. `^1.2.3` allows minor updates (1.x.x) - more common. Use `~` for critical stability.

7. **Should you commit package-lock.json to git?**
   - Answer: YES! Ensures reproducible installs across machines and CI/CD. Only ignore node_modules/.

8. **What does `npm update` do?**
   - Answer: Updates packages to the latest version allowed by ^/~ ranges in package.json. Updates package-lock.json with new versions. Good for getting bug fixes.

9. **What's the difference between `npm install` and `npm install --save-dev`?**
   - Answer: `npm install <package>` adds to dependencies (production). `npm install --save-dev <package>` or `npm install -D <package>` adds to devDependencies (development only).

10. **Why avoid `*` or `latest` in production dependencies?**
    - Answer: Too unpredictable - can introduce breaking changes without warning. Use specific versions or ranges (`^1.2.3`) for stability.

---

### Code Examples for YouTube Video (Topic 2)

#### Example 6: package.json Structure

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint ."
  },
  "keywords": ["node", "javascript", "express"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "axios": "~1.4.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.5.0",
    "nodemon": "^2.0.22"
  }
}
```

#### Example 7: Semantic Versioning in Action

```bash
# Initial release
npm version 1.0.0    # First release

# Bug fix
npm version patch    # 1.0.0 → 1.0.1

# New feature
npm version minor    # 1.0.1 → 1.1.0

# Breaking changes
npm version major    # 1.1.0 → 2.0.0
```

#### Example 8: Dependency Management

```bash
# ========== INSTALLING PACKAGES ==========
# Production dependency
npm install express

# Dev dependency
npm install --save-dev typescript
# or
npm install -D jest

# Exact version
npm install axios@1.4.0

# ========== UPDATING PACKAGES ==========
# Check for updates
npm outdated

# Update packages (within ranges)
npm update

# Update specific package
npm update express

# ========== USEFUL COMMANDS ==========
npm list                    # Show all installed
npm list --depth=0          # Show top-level only
npm audit                   # Check security
npm audit fix               # Fix security issues
npm uninstall <package>     # Remove package
npm info <package>          # Show package info
```

#### Example 9: npm Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "postinstall": "node setup.js"
  }
}
```

**Running scripts:**
```bash
npm start           # Run start script
npm run dev         # Run custom dev script
npm run build       # Runs prebuild → build → postbuild (if defined)
```

#### Example 10: CI/CD Workflow

```bash
# ========== DEVELOPMENT WORKFLOW ==========
npm install              # Install dependencies
npm run dev              # Start development server
npm run build            # Build for production
npm test                 # Run tests

# ========== CI/CD PIPELINE ==========
npm ci                   # Clean install (fast, exact versions)
npm run lint            # Check code quality
npm test                # Run all tests
npm run build           # Build production bundle
# Deploy to production...

# ========== PRODUCTION DEPLOYMENT ==========
npm ci --only=production # Skip devDependencies (faster)
npm run build           # Build
npm start               # Start server
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

### Completed: Topic 2 - npm & Package Management ✅

- ✅ package.json structure and configuration
- ✅ Semantic versioning (MAJOR.MINOR.PATCH)
- ✅ Dependencies vs devDependencies classification
- ✅ Version ranges (^, ~, exact, *)
- ✅ npm scripts and lifecycle hooks
- ✅ npm install vs npm ci vs npm update

### Ready For: Topic 3

**Next: Environment Variables & Security**
- `process.env` for accessing environment variables
- Using `dotenv` for loading .env files
- Best practices for secrets management
- Never committing .env files
- Environment-specific configurations

---

## Final Stats (Topics 1-2)

- **Exercises Completed**: 2
  - Exercise 1: ES Modules (TODO 1-5 + Bonus)
  - Exercise 2: npm Scripts (TODO 1-5 + Bonus)
- **TODOs Completed**: 12 (10 main + 2 bonuses)
- **Mistakes Identified**: 5 (Topic 1: 4, Topic 2: 1)
- **Key Concepts**: 13
- **Interview Questions**: 20
- **Code Examples**: 10
- **Module Patterns Mastered**: 8
- **npm Concepts Mastered**: 6

**Estimated Study Time**: ~4-5 hours
**Ready for Environment Variables**: ✅ YES!

---

*This document covers Topics 1-2. Node.js & Modules module in progress.*
