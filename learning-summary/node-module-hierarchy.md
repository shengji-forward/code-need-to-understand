# Node.js & Modules Abstraction Hierarchy

## Overview

This document complements the JavaScript Abstraction Hierarchy by focusing on **Node.js modules** - how JavaScript code is organized, communicated, and managed across files. While the JavaScript hierarchy explains values, functions, and objects within a single file, this hierarchy explains how modules discover each other, transfer data, and build applications at scale.

**Key Question Answered**: *How do modules/files communicate and transfer data in an OOP context, and what abstraction layers make this possible?*

---

## Layer Hierarchy (Bottom-Up)

```
Layer 0: Module Foundation - Core Primitives (Raw Materials)
         ↓
Layer 1: Module System - Import/Export Mechanisms (Language of Communication)
         ↓
Layer 2: Module Organization - Dependency Management (Discovery & Resolution)
         ↓
Layer 3: Runtime Integration - Node.js Environment (Platform Integration)
         ↓
Layer 4: Application Architecture - Patterns & Abstractions (Design Patterns)
         ↓
Cross-Cutting: Security, Async I/O, Error Handling (Span Multiple Layers)
```

---

## Layer 0: Module Foundation - Core Primitives

**The raw materials modules are built from - files as units of code.**

### Level 1: File System as Module Unit
```
module-primitives {
  file-system-unit: {
    file:              // Single file = single module (basic unit)
    extension:         // .js, .mjs, .cjs, .ts determines module system
    encoding:          // UTF-8 for source code text
    path:              // File location determines import resolution
  }

  module-type: {
    es-module:         // .mjs or "type": "module" in package.json
    commonjs:          // .cjs or default in older Node.js
    mixed:             // Possible but problematic (avoid)
  }
}
```

### Level 2: Module Scope & Encapsulation
```
encapsulation {
  module-scope: {
    top-level:         // Variables declared at file level (not in functions)
    private-by-default: // Anything not exported is invisible outside
    file-level-scope:  // Each file has its own scope (no global pollution)
  }

  export-interface: {
    public-api:        // Only exports are visible to importers
    selective-sharing: // Choose what to expose, hide implementation
    abstraction:       // Internal changes don't break importers (if API stable)
  }

  side-effects: {
    definition:        // Code that runs when module loads (not exported)
    examples:         // Polyfills, global setup, monkey-patching
    use-cases:        // React DOM rendering, analytics initialization
    caution:          // Side-effect imports have no import variable
  }
}
```

### Level 3: Module Communication Primitives
```
data-transfer {
  transfer-types: {
    values:            // Primitives, objects, functions, classes
    references:        // Objects/arrays passed by reference
    types:             // TypeScript interfaces, type aliases
  }

  direction: {
    export:            // Module provides data to others
    import:            // Module consumes data from others
    bidirectional:     // Both export and import (typical)
  }

  timing: {
    compile-time:      // Static imports (import statements)
    runtime:           // Dynamic imports (await import())
  }
}
```

---

## Layer 1: Module System - Import/Export Mechanisms

**The language of module communication - how data flows between files.**

### 1.1 Export Types (What Modules Provide)
```
export-types {
  named-export: {
    syntax:            // export const add = (a, b) => a + b;
    quantity:          // Multiple per file
    import-syntax:     // import { add, subtract } from './math.js';
    best-for:          // Utilities, helper functions, multiple exports
    tree-shaking:      // Bundlers can eliminate unused exports
    renaming:          // export { add as sum };
  }

  default-export: {
    syntax:            // export default class Calculator { }
    quantity:          // One per file (enforced)
    import-syntax:     // import Calculator from './calc.js';
    best-for:          // Main classes, components, single-purpose modules
    importer-chooses-name: // Importer picks name (not file author)
    caution:          // Can make refactoring harder (implicit naming)
  }

  type-export: {
    syntax:            // export interface User { }
    compile-time-only: // Removed from JavaScript output
    import-syntax:     // import type { User } from './types.js';
    best-for:          // Interfaces, type definitions, generics
    no-runtime-cost:   // Zero runtime overhead (pure TypeScript)
    mixed:             // export { func }; export type { User };
  }

  mixed-export: {
    pattern:           // Default + named exports in same file
    example:           // export default class API { }
                       // export const VERSION = "1.0";
    import-pattern:    // import API, { VERSION } from './api.js';
    best-for:          // Main export + related utilities
  }

  export-list: {
    syntax:            // export { add, subtract, multiply };
    benefits:          // All exports at bottom of file (easy to find)
    renaming:          // export { add as sum };
  }
}
```

### 1.2 Import Types (What Modules Consume)
```
import-types {
  named-import: {
    syntax:            // import { add, subtract } from './math.js';
    selective:         // Only import what you need
    aliasing:          // import { add as sum } from './math.js';
    tree-shaking:      // Bundlers eliminate unused code
    best-for:          // Utilities, specific functions
  }

  default-import: {
    syntax:            // import Calculator from './calc.js';
    any-name:          // Importer chooses name
    caveat:            // Can't tree-shake default exports effectively
    best-for:          // Main classes, components
  }

  namespace-import: {
    syntax:            // import * as math from './math.js';
    use-case:          // Many exports from one module
    access-pattern:    // math.add(), math.subtract()
    caution:           // Defeats tree-shaking (imports all)
  }

  side-effect-import: {
    syntax:            // import './polyfills.js';
    purpose:           // Run code, don't import anything
    use-cases:         // Polyfills, global CSS, analytics initialization
    no-bindings:       // Creates no variables
  }

  dynamic-import: {
    syntax:            // const math = await import('./math.js');
    runtime-loading:   // Load when needed, not at build time
    use-cases:         // Code splitting, lazy loading, feature flags
    returns:           // Promise resolving to module namespace object
    conditional:       // if (feature) { await import('./feature.js'); }
  }

  mixed-import: {
    syntax:            // import Calculator, { add } from './calc.js';
    pattern:           // Default + named in one statement
  }

  type-only-import: {
    syntax:            // import type { User } from './types.js';
    benefits:          // Eliminates unused import warnings
    no-runtime:        // Completely removed from output
  }
}
```

### 1.3 Re-export Patterns (Module Composition)
```
re-export-patterns {
  named-re-export: {
    syntax:            // export { name } from './file.js';
    purpose:           // Forward exports from another module
    renaming:          // export { name as alias } from './file.js';
  }

  default-re-export: {
    syntax:            // export { default as Name } from './file.js';
    purpose:           // Convert default to named export
    pattern:           // Common in barrel files
  }

  wildcard-re-export: {
    syntax:            // export * from './file.js';
    purpose:           // Re-export all exports
    caution:           // Can cause naming conflicts (use carefully)
  }

  barrel-file: {
    pattern:           // index.ts that aggregates and re-exports
    structure:         // export * from './utils/*.js';
    benefits: {
      clean-imports:   // import { add } from './utils' instead of './utils/add'
      single-entry:    // One public API per directory
      hide-implementation: // Internal structure can change
      reduced-paths:   // Avoid ../../../utils/import-hell
    }
    example: {
      // utils/index.ts
      export * from './string-utils.js';
      export * from './math-utils.js';
      export { default as DateUtil } from './date-utils.js';
    }
  }
}
```

### 1.4 Data Flow Between Modules (OOP Context)
```
module-communication {
  function-export: {
    pattern:           // export const add = (a, b) => a + b;
    data-transfer:      // Function reference (can be called)
    stateless:         // No internal state (preferred)
    example:           // import { add } from './math.js'; add(2, 3);
  }

  class-export: {
    pattern:           // export default class UserService { }
    data-transfer:      // Class constructor (creates instances)
    stateful:          // Each instance has own state
    example:           // import Service from './service.js';
                       // const s = new Service(); s.createUser();
  }

  object-export: {
    pattern:           // export const config = { port: 3000 };
    data-transfer:      // Object reference (shared state)
    shared-mutation:   // All importers see same object
    caution:           // Unintended side effects if mutated
  }

  primitive-export: {
    pattern:           // export const MAX_SIZE = 100;
    data-transfer:      // Value copy (for primitives)
    immutable:         // Can't change original (value semantics)
  }

  type-export: {
    pattern:           // export interface User { }
    data-transfer:      // Compile-time type information
    runtime:           // No runtime transfer (TypeScript only)
    example:           // import type { User } from './types.js';
                       // const u: User = { name: 'Alice' };
  }
}
```

---

## Layer 2: Module Organization - Dependency Management

**How modules discover and depend on each other - the social network of code.**

### 2.1 Module Resolution
```
module-resolution {
  file-extension-resolution: {
    specified:         // './file.js' (exact match required)
    implicit:          // './file' (tries .js, .json, .node)
    index-files:       // './dir/' resolves to './dir/index.js'
    extensionless:     // Works but discouraged (be explicit)
  }

  relative-imports: {
    syntax:            // import { foo } from './sibling.js';
    parent-navigation: // import { foo } from '../parent/file.js';
    same-directory:    // import { foo } from './file.js';
    deep-nesting:      // '../../../utils.js' (avoid - use barrel files)
    explicit-extension: // Always use .js in import paths
  }

  absolute-imports: {
    node-modules:      // import express from 'express';
                       // Searches: ./node_modules/express/package.json
    path-mapping:      // import { Button } from '@/components/Button';
                       // Requires tsconfig.json "paths" or bundler
    aliases:           // @/, ~/, @app (project-specific)
  }

  resolution-algorithm: {
    node-js-cjs:       // require() algorithm (legacy)
    node-js-esm:       // ES module import algorithm (modern)
    browser:           // Uses import maps or bundler resolution
    package-exports:   // Modern way to define entry points
  }
}
```

### 2.2 Package Exports (Modern Entry Points)
```
package-exports {
  package-json-exports: {
    purpose:           // Define public API of package
    restricts-access:  // Only expose specified subpaths
    example: {
      "exports": {
        ".": "./dist/index.js",           // Main entry
        "./utils": "./dist/utils.js",     // Subpath export
        "./internal/*": "./dist/internal/*.js"  // Wildcard
      }
    }
  }

  conditional-exports: {
    purpose:           // Different imports for different environments
    example: {
      "exports": {
        ".": {
          "import": "./dist/index.mjs",    // ES module import
          "require": "./dist/index.cjs",   // CommonJS require
          "default": "./dist/index.js"     // Fallback
        },
        "./node": {
          "node": "./dist/node.js",        // Node.js only
          "default": "./dist/browser.js"   // Browser default
        }
      }
    }
  }

  subpath-imports: {
    purpose:           // Import from private package paths
    example: {
      "imports": {
        "#internal/*": "./src/internal/*.js"
      }
    }
    usage:             // import { helper } from '#internal/helper.js';
  }
}
```

### 2.3 Dependency Graph
```
dependency-graph {
  module-graph: {
    vertices:          // Modules (files)
    edges:             // Import relationships (A → B means A imports B)
    direction:         // Unidirectional (imports don't create back edges)
    acyclic:           // Must not have circular dependencies (with static imports)
    depth:             // Graph depth affects load time
  }

  circular-dependencies: {
    problem:           // Module A imports B, B imports A
    static-import-issue: // Causes initialization order problems
    solutions:         // Extract shared code to module C
                       // Use dynamic imports: await import('./a.js')
                       // Restructure to remove cycle
  }

  dependency-types: {
    production: {
      key:             // "dependencies" in package.json
      needed:          // Required at runtime
      install:         // npm install <package>
      examples:        // express, lodash, react
    }

    development: {
      key:             // "devDependencies" in package.json
      needed:          // Only during development
      install:         // npm install --save-dev <package>
      not-in-production: // Not installed in prod builds
      examples:        // typescript, jest, eslint, prettier
    }

    peer: {
      key:             // "peerDependencies" in package.json
      provided-by:      // Consumer of the package
      purpose:         // Avoid duplicate installs (e.g., React)
      examples:        // react (for React components)
      warning:         // npm warns if peer dep missing
    }

    optional: {
      key:             // "optionalDependencies" in package.json
      behavior:         // Install failure doesn't fail npm install
      use-case:         // Platform-specific optional features
    }
  }
}
```

### 2.4 Semantic Versioning
```
semantic-versioning: {
  format:             // MAJOR.MINOR.PATCH (e.g., 2.4.1)

  MAJOR: {
    meaning:           // Breaking changes
    example:           // 1.0.0 → 2.0.0
    impact:            // May require code updates
    upgrade-caution:   // Review changelog before upgrading
  }

  MINOR: {
    meaning:           // New features (backward compatible)
    example:           // 1.0.0 → 1.1.0
    impact:            // Safe to upgrade (usually)
  }

  PATCH: {
    meaning:           // Bug fixes (backward compatible)
    example:           // 1.0.0 → 1.0.1
    impact:            // Always safe to upgrade
  }

  version-ranges: {
    caret: {
      syntax:          // ^1.2.3
      allows:          // 1.x.x (updates MINOR and PATCH)
      blocks:          // 2.0.0 (prevents MAJOR upgrades)
      common:          // Most common range for dependencies
    }

    tilde: {
      syntax:          // ~1.2.3
      allows:          // 1.2.x only (updates PATCH only)
      blocks:          // 1.3.0, 2.0.0
      use-case:        // Conservative updates
    }

    exact: {
      syntax:          // 1.2.3
      allows:          // Only this version
      use-case:        // Locking critical dependencies
    }

    wildcard: {
      syntax:          // *
      allows:          // Any version
      caution:         // Never use in production
    }

    range: {
      syntax:          // >=1.2.3 <2.0.0
      allows:          // Complex version ranges
      use-case:        // Precise control over versions
    }
  }
}
```

### 2.5 Package Management
```
package-management {
  package-json: {
    name:              // Unique identifier (used in imports)
    version:           // Current version (semver)
    type:              // "module" enables ES modules
    main:              // Entry point for CommonJS (require)
    module:            // Entry point for ES modules (import)
    exports:           // Modern entry points (replaces main/module)
    scripts:           // npm shortcuts (start, dev, build, test)
    engines:           // Required Node.js version
  }

  npm-commands: {
    install:           // npm install
                       // Reads package.json
                       // Updates package-lock.json if needed
                       // Installs missing dependencies

    ci:                // npm ci
                       // Reads package-lock.json only
                       // Faster, cleaner install
                       // Deletes node_modules first
                       // Use in CI/CD pipelines

    update:            // npm update
                       // Updates packages within version ranges

    audit:             // npm audit
                       // Checks for security vulnerabilities

    audit-fix:         // npm audit fix
                       // Automatically fixes security issues
  }

  lockfile: {
    package-lock-json: {
      purpose:         // Exact versions of all dependencies
      reproducibility: // Ensures same installs across machines
      commit-to-git:   // YES (critical for reproducible builds)
      nested:          // Locks dependencies' dependencies too
    }

    shrinkwrap: {
      purpose:         // Like package-lock.json but for published packages
      use-case:        // Libraries (not applications)
    }
  }
}
```

---

## Layer 3: Runtime Integration - Node.js Environment

**How modules interact with the Node.js runtime and execution environment.**

### 3.1 Environment Variables
```
environment-variables {
  process-env: {
    access:            // process.env.VARIABLE_NAME
    type:              // All values are strings (or undefined)
    case-sensitive:     // process.env.port !== process.env.PORT
    immutable:          // Can't directly assign (process.env.X = 'Y' works but doesn't set env var)
    provided-by:        // Shell, OS, deployment platform
  }

  config-patterns: {
    helper-function: {
      purpose:         // Centralize env var reading
      example:         // function getEnvVar(key, default) { }
      benefits:        // Consistent validation, defaults
    }

    type-safe-config: {
      purpose:         // Convert string env vars to correct types
      example:         // port: Number(process.env.PORT || 3000)
      types:           // String → Number, Boolean, JSON
    }

    validation-at-startup: {
      purpose:         // Fail fast if required vars missing
      pattern:         // Check all required vars on app start
      benefit:         // Prevents runtime crashes
    }

    singleton-export: {
      pattern:         // export const config = { ... }
      benefit:         // Load once, use everywhere
      caution:         // Can't change config after load
    }
  }

  security: {
    never-commit-env:  // Add .env to .gitignore
    env-example:       // Commit .env.example as template (no values)
    hide-secrets:      // Sanitize logs (replace passwords with ***)
    deployment:        // Use platform's secret management (AWS, Vercel, Railway)
  }
}
```

### 3.2 Lifecycle Scripts
```
lifecycle-scripts {
  npm-scripts: {
    definition:        // Commands in package.json "scripts" section
    run-syntax:        // npm run <script-name> (or npm start, npm test for built-ins)
    pre-commands:      // preinstall, prestart, pretest (run before main)
    post-commands:     // postinstall, poststart, posttest (run after main)
  }

  execution-order: {
    preinstall:        // Before npm install
    install:           // During npm install
    postinstall:       // After npm install
                       // Common use: Build native modules, setup

    prestart:          // Before npm start
    start:             // npm start (entry point for production)
    poststart:         // After npm start

    pretest:           // Before npm test
    test:              // npm test (run test suite)
    posttest:          // After npm test
  }

  common-scripts: {
    dev:               // Development server (hot reload)
    build:             // Compile TypeScript, bundle code
    lint:              // Run linter (eslint)
    format:            // Run formatter (prettier)
    type-check:        // TypeScript compiler check only
  }
}
```

### 3.3 Node.js Primitives
```
node-js-primitives {
  global-objects: {
    process: {
      env:             // Environment variables
      exit:            // process.exit(code) - terminate app
      argv:            // Command-line arguments
      cwd:             // Current working directory
      platform:        // OS platform (darwin, linux, win32)
    }

    global:            // Global scope (Node.js, not browser)
                       // Different from window in browsers

    __dirname:         // Current directory path
                       // NOT available in ES modules (use import.meta.url)

    __filename:        // Current file path
                       // NOT available in ES modules (use import.meta.url)

    import-meta: {
      url:             // Current file URL (ES modules)
      resolve:         // Resolve relative paths
    }
  }

  core-modules: {
    file-system: {
      module:          // 'fs' (file system)
      functions:       // readFile, writeFile, mkdir, readdir
      sync-async:      // readFile (async) vs readFileSync (sync)
      promises:        // fs/promises (Promise-based API)
    }

    path: {
      module:          // 'path'
      functions:       // join, resolve, dirname, basename
      platform:        // Handles / vs \ (Windows vs Unix)
    }

    http: {
      module:          // 'http'
      functions:       // createServer, request, get
      use-case:        // Build web servers
    }

    events: {
      module:          // 'events'
      class:           // EventEmitter
      pattern:         // on, emit, once (observer pattern)
    }

    stream: {
      module:          // 'stream'
      types:           // Readable, Writable, Duplex, Transform
      use-case:        // Process large data piece by piece
    }

    buffer: {
      module:          // 'buffer'
      purpose:         // Binary data handling
      global:          // Buffer available globally
    }
  }

  event-loop: {
    phases: {
      timers:          // setTimeout, setInterval callbacks
      pending-callbacks: // I/O callbacks (deferred)
      idle-prepare:    // Internal Node.js operations
      poll:            // New I/O events retrieved
      check:           // setImmediate callbacks
      close-callbacks: // Socket cleanup callbacks
    }

    microtasks: {
      priority:        // Higher than macrotasks
      types:           // Promise callbacks, queueMicrotask
      execution:       // After each phase completes
    }

    macrotasks: {
      priority:        // Lower than microtasks
      types:           // setTimeout, setInterval, I/O
      execution:       // In event-loop phases
    }
  }
}
```

---

## Layer 4: Application Architecture - Patterns & Abstractions

**High-level patterns for organizing modules in real applications - design patterns for modules.**

### 4.1 Architectural Patterns
```
architectural-patterns {
  config-module: {
    pattern:           // Dedicated config.ts with validation
    structure: {
      interface:       // Define Config interface with all properties
      load-function:   // loadConfig() validates and converts types
      singleton:       // Export const config = loadConfig()
      helpers:         // isProduction, isDevelopment, isTest booleans
    }
    example: {
      // config.ts
      interface Config {
        port: number;
        databaseUrl: string;
        isProduction: boolean;
      }
      export const config: Config = loadConfig();

      // usage.ts
      import { config } from './config.js';
      console.log(config.port);
    }
    benefits:          // Type-safe, validated, single source of truth
  }

  service-module: {
    pattern:           // Encapsulate business logic in service classes
    structure: {
      service-class:   // Class with business methods
      dependency-injection: // Pass dependencies to constructor
      stateless:       // Prefer stateless services (easier to test)
    }
    example: {
      // user-service.ts
      export class UserService {
        constructor(private db: Database) {}

        async createUser(email: string) {
          return this.db.users.create({ email });
        }
      }

      // usage.ts
      const service = new UserService(database);
      await service.createUser('alice@example.com');
    }
    benefits:          // Testable, reusable, separates concerns
  }

  utility-module: {
    pattern:           // Named exports for pure functions
    structure: {
      stateless:       // No side effects preferred
      pure-functions:  // Same input → same output
      multiple-exports: // Group related utilities
    }
    example: {
      // string-utils.ts
      export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
      export const truncate = (s: string, max: number) => s.slice(0, max);
      export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
    }
    benefits:          // Easy to test, tree-shakeable, reusable
  }

  barrel-module: {
    pattern:           // index.ts re-exports from directory
    structure: {
      index-file:      // Re-exports from sibling files
      clean-imports:   // Single entry point per directory
      hide-implementation: // Internal files can change without breaking imports
    }
    example: {
      // features/index.ts
      export { AuthFeature } from './auth/index.js';
      export { BillingFeature } from './billing/index.js';
      export { UserFeature } from './user/index.js';

      // usage
      import { AuthFeature, BillingFeature } from './features';
    }
    benefits:          // Cleaner imports, reduced relative paths
  }
}
```

### 4.2 Module Communication Patterns
```
module-communication-patterns {
  api-export: {
    public-interface:  // Only exports are public API
    private-details:   // Internal implementation is hidden
    semantic-imports:  // Import by purpose, not file structure
    example: {
      // Bad: import { dbConnect } from './database.js'
      // Good: import { createUser } from './user-service.js'
    }
  }

  type-sharing: {
    type-exports:      // export interface User { }
    type-imports:      // import type { User } from './types.js'
    benefits:          // Type safety across modules without runtime cost
    pattern:           // Dedicated types module or co-located with feature
  }

  circular-dependency-solutions: {
    extract-shared:    // Move shared code to third module
    lazy-import:       // Use dynamic import inside function
    inversion-of-control: // Pass dependencies as parameters
    event-emitter:     // Use events for decoupled communication
  }

  dependency-injection: {
    pattern:           // Pass dependencies as parameters
    benefits:          // Testability (mock dependencies), loose coupling
    example: {
      // Bad: Hard dependency
      // class Service { db = new Database(); }

      // Good: Inject dependency
      // class Service { constructor(private db: Database) {} }
    }
  }
}
```

### 4.3 Framework Integration Patterns
```
framework-integration {
  express-patterns: {
    middleware:        // Functions that modify req/res
    pattern:           // export const authMiddleware = (req, res, next) => { }
    usage:             // app.use(authMiddleware)

    routing:           // Separate router modules per feature
    pattern:           // export const userRouter = express.Router();
    usage:             // app.use('/users', userRouter)

    controllers:       // Handle HTTP requests, delegate to services
    pattern:           // export const createUser = async (req, res) => { }
    separation:        // Controllers (HTTP) vs Services (business logic)
  }

  module-integration: {
    entry-point:       // index.ts or main.ts (application bootstrap)
    initialization:    // Load config, connect to database, start server
    graceful-shutdown: // Handle SIGTERM, close connections
  }
}
```

---

## Cross-Cutting Concepts

These concerns span multiple layers and apply throughout the module system.

### Security
```
security {
  secret-management: {
    pattern:           // Environment variables, never hardcode
    platforms:         // AWS Secrets Manager, Vercel Env, Railway
    principle:         // Secret in code = compromised secret
  }

  input-validation: {
    boundaries:        // Validate at module boundaries (API inputs)
    schema-validation: // Use Zod, Joi, or TypeScript for validation
    sanitization:      // Clean user input (prevent XSS, SQL injection)
  }

  safe-logging: {
    hide-secrets:      // Sanitize logs (passwords, API keys, tokens)
    pattern:           // Replace sensitive values with *** in logs
  }

  dependency-auditing: {
    npm-audit:         // npm audit (check for vulnerabilities)
    regular-updates:   // Keep dependencies updated
    trusted-sources:   // Only install packages you trust
  }
}
```

### Error Handling
```
error-handling {
  error-boundaries: {
    pattern:           // Try/catch at module boundaries
    async-errors:      // Try/catch around await
    propagation:       // Throw to let caller handle (or catch at top level)
  }

  custom-errors: {
    pattern:           // class ValidationError extends Error
    benefits:          // Type-safe error handling, better error messages
    example: {
      throw new ValidationError('Invalid email format');
    }
  }

  graceful-degradation: {
    pattern:           // Fallbacks for optional features
    example:           // Try feature, catch error, continue without it
  }
}
```

### Async I/O
```
async-i-o {
  promise-based: {
    preference:        // Prefer async/await over callbacks
    readability:       // Sequential-looking async code
    error-handling:    // Try/catch around await
  }

  parallel-execution: {
    pattern:           // Promise.all for independent operations
    example:           // await Promise.all([fetchUser(), fetchPosts()])
    benefit:           // Faster total execution time
  }

  cleanup: {
    pattern:           // Finally blocks for resource cleanup
    example:           // try { await connect() } finally { await disconnect() }
  }

  streaming: {
    pattern:           // Process large data piece by piece
    benefit:           // Lower memory usage
    modules:           // fs.createReadStream, stream.Readable
  }
}
```

### Testing Modules
```
testing-modules {
  unit-tests: {
    pattern:           // Test individual modules in isolation
    framework:         // Jest, Vitest, Mocha
    location:          // *.test.ts or *.spec.ts alongside source
  }

  integration-tests: {
    pattern:           // Test module interactions
    focus:             // Multiple modules working together
  }

  mocking: {
    pattern:           // Mock dependencies for testing
    example:           // vi.mock('./database.js') (Vitest)
    benefit:           // Test modules without real dependencies
  }
}
```

---

## Key Insights from This Hierarchy

1. **Modules are units of encapsulation** - Each file is a module with private scope; only exports are public

2. **Communication = imports/exports** - Named exports for utilities, default exports for main components, type exports for TypeScript

3. **Dependency direction matters** - Avoid circular dependencies; use barrel files to organize; dependencies should flow one way

4. **Validation at startup** - Environment variables and config should be validated when app starts, not during runtime

5. **Tree-shaking requires structure** - Named exports enable bundlers to eliminate unused code; default exports cannot be tree-shaken effectively

6. **Platform integration via Layer 3** - Node.js provides process.env, core modules (fs, http), and event loop; modules interact with these through Layer 3

---

## Common Gotchas

| Concept | Gotcha | Solution |
|---------|--------|----------|
| File extensions | `import from './file'` fails in ESM | Always use `./file.js` (explicit extension) |
| Default exports | `import { name } from './module.js'` fails | Default import: `import name from './module.js'` |
| Relative imports | `import from '../../../utils.js` is fragile | Use barrel files and path mapping (`@/utils`) |
| Env vars | `process.env.PORT` is string, not number | Type convert: `Number(process.env.PORT \|\| 3000)` |
| Circular deps | Module A imports B, B imports A → error | Extract shared code to module C, use dynamic imports |
| Tree-shaking | Default exports prevent elimination | Prefer named exports for utilities |
| Side effects | `import './polyfills.js'` has no variable | This is intentional; runs code without importing |
| Type imports | Unused type imports cause warnings | Use `import type { User }` for type-only imports |
| package-lock | Not committing lockfile breaks reproducibility | Always commit package-lock.json |
| Config loading | Checking env vars during runtime is too late | Validate at startup in dedicated config module |

---

## Learning Progression

Based on the curriculum structure:

1. **Master JavaScript fundamentals first** (00-fundamentals: values, functions, objects, classes)
2. **Understand async patterns** (02-async-programming: promises, async/await)
3. **Learn module communication** (03-node-and-modules: imports, exports, re-exports)
4. **Practice dependency management** (npm, semver, package.json, package-lock.json)
5. **Integrate with runtime** (environment variables, process, core modules)
6. **Apply architectural patterns** (config modules, service classes, barrel files)

Each layer builds on the previous. You can't effectively use service modules (Layer 4) without understanding imports/exports (Layer 1). You can't manage dependencies (Layer 2) without understanding how modules communicate (Layer 1).

---

## How This Fits with JavaScript Hierarchy

The **JavaScript Hierarchy** (javascript-hierarchy-refined.md) explains concepts **within a single file**:
- Layer 0-2: Values, variables, objects, arrays
- Layer 3: Functions as first-class objects
- Layer 4: Prototypes, classes, OOP

The **Modules Hierarchy** (this document) explains **how multiple files communicate**:
- Layer 0: Files as module units
- Layer 1: Import/export mechanisms (the API between modules)
- Layer 2: Dependency discovery and resolution
- Layer 3: Node.js runtime integration
- Layer 4: Architectural patterns for organizing modules

**Connection point**: When you export a class or function from a module (Layer 1), you're using JavaScript's class/function concepts (Layer 3-4 of JavaScript hierarchy) to create a public API that other modules can import and use.

---

**Credits**: Developed alongside the 03-node-and-modules curriculum, complementing the JavaScript Abstraction Hierarchy with module-system concepts.
