# JavaScript/TypeScript Knowledge for OpenCoach Development

Progressive learning path from complete beginner to production-ready TypeScript developer.

## How to Use This Guide

**For Self-Learning**:
- ✅ Check off items as you master them
- 📝 Complete exercises in order
- 🎯 Practice interview questions
- 💡 Apply best practices immediately

**For AI Mock Interviews**:
- Each section has 3-5 interview questions
- Covers both recall and applied understanding
- Progresses from basic to advanced topics

**For YouTube Content Creation**:
- Each subsection is a standalone video topic
- Progressive difficulty builds audience loyalty
- Real OpenCoach code examples provide authenticity

---

## 00. JavaScript Fundamentals

**Goal**: Understanding basic syntax and concepts

### Variables and Data Types

**Why needed**: Every piece of code uses variables to store and manipulate data

**Learning Objectives**:
- Understand `let`, `const`, and when to use each
- Know primitive types: string, number, boolean, null, undefined
- Understand type coercion (how JS converts types automatically)

**Resources**:
- ✅ Simple Practice: `/00-fundamentals/practice/01-variables-and-types.ts`
- 📝 Exercise: `/00-fundamentals/exercises/exercise-01-basic-syntax.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/schema/index.ts` (schema definitions)
  - Used in: `apps/gateway/src/server.ts` (environment variables)
- 🎯 Interview Questions:
  1. What's the difference between `let` and `const`? When would you use each?
  2. What is `undefined` vs `null` in JavaScript?
  3. What is type coercion? Give an example.
  4. What does `===` check vs `==`?
  5. Why does `1 + '1'` equal `'11'` in JavaScript?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `let` allows reassignment, `const` creates a read-only reference. Use `const` by default, `let` only when you need to reassign (like loop counters).

2. `undefined` means a variable has been declared but not assigned. `null` is an intentional absence of value.

3. Type coercion is automatic conversion between types. Example: `5 + '5'` = `'55'` (number coerced to string for concatenation).

4. `===` checks both value and type (strict equality). `==` checks value only after type coercion.

5. JavaScript converts the number to a string for concatenation. This is a common source of bugs!
</details>

**💡 Best Practices**:
- Always use `const` by default
- Use `let` only when you need to reassign
- Use `===` instead of `==` to avoid bugs from type coercion
- Initialize variables to avoid `undefined`
- Use meaningful variable names

---

### Functions

**Why needed**: Functions are the building blocks of reusable logic

**Learning Objectives**:
- Function declarations vs expressions vs arrow functions
- Parameters and return values
- Scope and closures
- Default parameters

**Resources**:
- ✅ Simple Practice: `/00-fundamentals/practice/02-functions.ts`
- 📝 Exercise: `/00-fundamentals/exercises/exercise-02-functions.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/schema/health.ts` (schema functions)
  - Used in: `apps/gateway/src/doctor.ts` (CLI commands)
- 🎯 Interview Questions:
  1. What's the difference between function declaration and function expression?
  2. What is a closure and when would you use one?
  3. How do arrow functions differ from regular functions?
  4. What is hoisting in functions?
  5. Write a function that takes a callback as a parameter.

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Declaration: `function foo() {}` - hoisted, can be called before definition. Expression: `const foo = function() {}` - not hoisted.

2. A closure is when a function remembers variables from its outer scope even after the outer function has returned. Used for data encapsulation and function factories.

3. Arrow functions: don't have their own `this` or `arguments`, always anonymous, more concise syntax.

4. Hoisting moves function declarations to the top of their scope. Function expressions are NOT hoisted.

5. Example:
```typescript
function withCallback(fn: (num: number) => void) {
  fn(42);
}
```
</details>

**💡 Best Practices**:
- Use arrow functions for short callbacks
- Use function declarations for main logic
- Keep functions small and focused (one responsibility)
- Use descriptive names that describe what they return
- Use default parameters instead of checking for undefined

---

### Control Flow

**Why needed**: Making decisions and repeating actions

**Learning Objectives**:
- if/else statements and ternary operators
- switch statements
- for loops, for...of, for...in
- while loops
- break and continue

**Resources**:
- ✅ Simple Practice: `/00-fundamentals/practice/03-control-flow.ts`
- 📝 Exercise: `/00-fundamentals/exercises/exercise-03-loops.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/gateway/src/doctor.ts` (health check loops)
  - Used in: `packages/database/src/migrations/` (migration logic)
- 🎯 Interview Questions:
  1. When would you use a switch statement vs if/else?
  2. What's the difference between `for...of` and `for...in`?
  3. What does `break` vs `continue` do in a loop?
  4. How do ternary operators work?
  5. Write a loop that only processes even numbers.

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Use switch for many discrete values. Use if/else for ranges or complex conditions.

2. `for...of` iterates over VALUES (array items). `for...in` iterates over KEYS (object properties or array indices).

3. `break` exits the loop completely. `continue` skips to the next iteration.

4. `condition ? valueIfTrue : valueIfFalse` - concise if/else for expressions.

5. Example:
```typescript
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
```
</details>

**💡 Best Practices**:
- Use `for...of` for arrays (cleaner than traditional for loops)
- Use `for...in` only for objects, not arrays
- Use ternary for simple conditions, avoid nesting them
- Put early returns or continues at the top to reduce nesting
- Use array methods (map, filter, reduce) instead of loops when appropriate

---

### Arrays and Objects

**Why needed**: Organizing and accessing collections of data

**Learning Objectives**:
- Array methods: push, pop, shift, unshift, splice, slice
- Array iteration: map, filter, reduce, find, some, every
- Object properties and methods
- Destructuring arrays and objects
- Spread operator

**Resources**:
- ✅ Simple Practice: `/00-fundamentals/practice/04-arrays-and-objects.ts`
- 📝 Exercise: `/00-fundamentals/exercises/exercise-04-arrays.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/api/src/index.ts` (API route definitions)
  - Used in: `apps/gateway/src/events.ts` (event handling)
- 🎯 Interview Questions:
  1. What's the difference between `map` and `forEach`?
  2. What does `reduce` do? Give a use case.
  3. How does object destructuring work?
  4. What's the difference between spread and rest syntax?
  5. How do you deep clone an object?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `map` returns a NEW array with transformed values. `forEach` executes code for each item but returns undefined.

2. `reduce` transforms an array into a single value (accumulator). Use case: calculating totals, grouping data, building objects.

3. Destructuring extracts properties into variables: `const { name, age } = user;`

4. Spread: `...arr` expands array/object. Rest: `function(...args)` collects multiple values into an array.

5. `JSON.parse(JSON.stringify(obj))` or use structuredClone(). Shallow clone with `{...obj}` doesn't copy nested objects.
</details>

**💡 Best Practices**:
- Use `map`, `filter`, `find` instead of manual loops
- Use array methods for immutability (they return new arrays)
- Destructure to extract only what you need
- Use spread for immutable updates: `{...obj, newProp: value}`
- Avoid mutating arrays directly when possible

---

## 01. TypeScript Basics

**Why needed**: OpenCoach uses TypeScript throughout for type safety and better developer experience

### Type Annotations

**Why needed**: TypeScript catches bugs before runtime and improves autocomplete

**Learning Objectives**:
- Basic types: string, number, boolean, array, tuple
- Type annotations for variables and functions
- Type inference (when TS can infer types)
- any vs unknown vs never

**Resources**:
- ✅ Simple Practice: `/01-typescript-basics/practice/01-types-and-interfaces.ts`
- 📝 Exercise: `/01-typescript-basics/exercises/exercise-01-basic-types.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/schema/` (all schema definitions)
  - Used in: `apps/gateway/src/server.ts` (Hono server types)
- 🎯 Interview Questions:
  1. What's the difference between `any` and `unknown`?
  2. When does TypeScript infer types automatically?
  3. What is a tuple type?
  4. What is the `never` type used for?
  5. How do you type array elements?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `any` turns off type checking (avoid!). `unknown` is safer - must check type before using.

2. TypeScript infers types from initial values and return statements. You don't always need explicit annotations.

3. A tuple is a fixed-length array with known types: `[string, number]`

4. `never` represents values that never occur (like function that always throws or infinite loop). Used for exhaustive checks.

5. Two ways: `string[]` or `Array<string>`
</details>

**💡 Best Practices**:
- Avoid `any` - use `unknown` if you don't know the type
- Let TypeScript infer types when obvious
- Explicitly annotate function parameters and return values
- Use `const` assertions for literal types: `const status = 'active' as const`
- Enable strict mode in tsconfig.json

---

### Interfaces vs Types

**Why needed**: Defining the shape of data structures

**Learning Objectives**:
- Interface declarations
- Type aliases
- Differences between interface and type
- Extending interfaces and types
- Implementing interfaces

**Resources**:
- ✅ Simple Practice: `/01-typescript-basics/practice/02-type-annotations.ts`
- 📝 Exercise: `/01-typescript-basics/exercises/exercise-02-interfaces.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/schema/health.ts` (health check interfaces)
  - Used in: `apps/api/src/index.ts` (route types)
- 🎯 Interview Questions:
  1. What's the difference between `interface` and `type`?
  2. When would you use one over the other?
  3. How do you extend an interface?
  4. Can you extend a type? How?
  5. What is a declaration merge?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Interface: object-oriented, can be extended, can be declared multiple times (declaration merging). Type: more flexible (unions, primitives, tuples), cannot be reopened.

2. Use interface for objects that can be extended or for library definitions. Use type for unions, tuples, or when you need advanced type features.

3. `interface Child extends Parent { prop: string }`

4. Yes: `type Extended = Base & { newProp: string }` (intersection type)

5. Declaration merging: multiple interface declarations with same name are merged. Example: extending library interfaces.
</details>

**💡 Best Practices**:
- Use interface for public APIs and objects
- Use type for unions, intersections, and utility types
- Export interfaces for reuse across modules
- Keep interfaces focused and composable
- Use consistent naming (e.g., IUser vs User - pick one style)

---

### Union Types and Optional Types

**Why needed**: Handling data that can be one of several types

**Learning Objectives**:
- Union types with `|` operator
- Type narrowing (checking types at runtime)
- Optional properties with `?`
- Nullish coalescing and optional chaining
- Discriminated unions

**Resources**:
- ✅ Simple Practice: `/01-typescript-basics/practice/03-generics-basics.ts`
- 📝 Exercise: `/01-typescript-basics/exercises/exercise-03-unions.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/schema/` (optional columns)
  - Used in: `apps/web/` (component props)
- 🎯 Interview Questions:
  1. How do you create a union type?
  2. What is type narrowing?
  3. How does optional chaining (`?.`) work?
  4. What is nullish coalescing (`??`)?
  5. What is a discriminated union?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `string | number` - value can be either type

2. Using `typeof`, `instanceof`, or property presence checks to narrow types within conditional blocks.

3. `obj?.prop` - returns undefined if obj is null/undefined instead of throwing error.

4. `value ?? default` - returns default only if value is null or undefined (not 0 or empty string).

5. Union with shared property (discriminator) that TypeScript can use to narrow type. Common for API responses or state.
</details>

**💡 Best Practices**:
- Use union types for values that can legitimately be different types
- Narrow types before using union values
- Use optional chaining for deep property access
- Use nullish coalescing for defaults (better than `||`)
- Create discriminated unions for related variants

---

### Generics

**Why needed**: Creating reusable, type-safe components

**Learning Objectives**:
- Generic functions and classes
- Generic constraints
- Type inference with generics
- Common generic types: Array, Promise, Map
- Utility types: Partial, Pick, Omit

**Resources**:
- ✅ Simple Practice: `/01-typescript-basics/practice/04-generics.ts`
- 📝 Exercise: `/01-typescript-basics/exercises/exercise-04-generics.ts`
- 🔗 OpenCoach Reference:
  - Used in: Database libraries (Drizzle, Supabase) for type-safe queries
  - Used in: `apps/api/` (generic route handlers)
- 🎯 Interview Questions:
  1. What are generics and why use them?
  2. How do you define a generic function?
  3. What is a generic constraint?
  4. What does `Partial<T>` do?
  5. When would you use `Pick<T, K>` or `Omit<T, K>`?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Generics allow types to be parameters, creating reusable type-safe code without using `any`.

2. `function identity<T>(arg: T): T { return arg; }`

3. Constraints limit what types can be used: `<T extends Lengthwise>` requires T to have a length property.

4. `Partial<T>` makes all properties optional. Useful for updates.

5. `Pick<User, 'name' | 'email'>` creates type with only those properties. `Omit` removes specified properties.
</details>

**💡 Best Practices**:
- Use generics for reusable components (arrays, API handlers, utilities)
- Name generic types meaningfully (T, TKey, not just single letters)
- Use constraints to make generics more usable
- Leverage built-in utility types
- Keep generics simple - complex generics hurt readability

---

## 02. Async Programming

**Why needed**: Database queries, API calls, WebSocket messages all rely on async code

### Promises and Async/Await

**Why needed**: Handling operations that take time (network, database)

**Learning Objectives**:
- What is a Promise
- Promise states: pending, fulfilled, rejected
- Async/await syntax
- Error handling with try/catch
- Parallel vs sequential async operations

**Resources**:
- ✅ Simple Practice: `/02-async-programming/practice/01-promises.ts`
- 📝 Exercise: `/02-async-programming/exercises/exercise-01-async.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/index.ts` (database queries)
  - Used in: `apps/gateway/src/doctor.ts` (health checks)
- 🎯 Interview Questions:
  1. What are the three states of a Promise?
  2. How does async/await compare to .then() chains?
  3. What happens if you don't await a Promise?
  4. How do you handle errors with async/await?
  5. What's the difference between `Promise.all` and `Promise.allSettled`?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Pending (initial), fulfilled (success), rejected (error).

2. Async/await is synchronous-looking code that compiles to Promises. More readable than .then() chains.

3. The Promise still executes, but you can't get its result. Common bug!

4. Use try/catch blocks around awaited Promises.

5. `Promise.all` fails fast if any Promise rejects. `Promise.allSettled` waits for all to complete (success or failure).
</details>

**💡 Best Practices**:
- Always use async/await instead of .then() chains
- Always handle Promise errors (try/catch or .catch())
- Don't forget to await! (common bug)
- Use `Promise.all` for parallel operations
- Avoid mixing callbacks and Promises

---

### Error Handling in Async Code

**Why needed**: Network failures, database errors, invalid data

**Learning Objectives**:
- Try/catch/finally blocks
- Throwing errors in async functions
- Error types and custom errors
- Handling errors in Promise chains
- Global error handlers

**Resources**:
- ✅ Simple Practice: `/02-async-programming/practice/02-error-handling.ts`
- 📝 Exercise: `/02-async-programming/exercises/exercise-02-errors.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/gateway/src/server.ts` (error middleware)
  - Used in: `packages/database/src/` (query error handling)
- 🎯 Interview Questions:
  1. How does finally work in try/catch?
  2. What happens if you throw inside a catch block?
  3. How do you create a custom error class?
  4. What's the difference between Error and TypeError?
  5. How do you handle errors in Promise.all?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `finally` always runs, regardless of success or failure. Good for cleanup.

2. The new error propagates up, replacing the original error.

3. `class CustomError extends Error { constructor(message) { super(message); this.name = 'CustomError'; } }`

4. Error is generic. TypeError is for type-related failures. Both are Error instances.

5. If any Promise rejects, Promise.all rejects with that error. Use Promise.allSettled to handle all results.
</details>

**💡 Best Practices**:
- Always handle errors in async functions
- Use try/catch/finally for resource cleanup
- Create custom error types for different error categories
- Log errors with context (what operation, what inputs)
- Never swallow errors silently (at least log them)

---

## 03. Node.js and Modules

**Why needed**: OpenCoach runs on Node.js with ES modules

### ES Modules

**Why needed**: Organizing code into reusable modules

**Learning Objectives**:
- import/export syntax
- Default vs named exports
- Dynamic imports
- Module resolution
- package.json "type": "module"

**Resources**:
- ✅ Simple Practice: `/03-node-and-modules/practice/01-modules.ts`
- 📝 Exercise: `/03-node-and-modules/exercises/exercise-01-imports.ts`
- 🔗 OpenCoach Reference:
  - Used throughout: All files use ES module imports
  - Used in: `packages/database/src/index.ts` (re-exporting)
- 🎯 Interview Questions:
  1. What's the difference between default and named exports?
  2. How do you import a named export?
  3. What is a dynamic import?
  4. How does module resolution work?
  5. What does `"type": "module"` do in package.json?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Default: one per module, `import name from 'module'`. Named: multiple, `import { name } from 'module'`.

2. `import { specificExport } from './file'` (curly braces for named exports)

3. `const module = await import('./module')` - loads code at runtime, not build time.

4. Node.js resolves relative paths from current file, or from node_modules for package names.

5. Tells Node.js to treat .js files as ES modules (not CommonJS).
</details>

**💡 Best Practices**:
- Use named exports for utilities and components
- Use default exports for main exports or React components
- Group imports: built-in, external, internal
- Use absolute imports (if configured) for cleaner paths
- Re-export commonly used items from barrel files (index.ts)

---

### npm and Package Management

**Why needed**: Managing dependencies and running scripts

**Learning Objectives**:
- package.json structure
- Installing dependencies (npm install)
- Dev dependencies vs dependencies
- Running scripts with npm
- Semantic versioning

**Resources**:
- ✅ Simple Practice: `/03-node-and-modules/practice/02-npm.ts`
- 📝 Exercise: `/03-node-and-modules/exercises/exercise-02-scripts.ts`
- 🔗 OpenCoach Reference:
  - Root package.json: Monorepo configuration
  - All packages: Individual package.json files
- 🎯 Interview Questions:
  1. What's the difference between dependencies and devDependencies?
  2. What does semantic versioning mean (1.2.3)?
  3. How do you run a script defined in package.json?
  4. What is package-lock.json for?
  5. What's the difference between npm install and npm ci?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. dependencies: needed in production. devDependencies: only for development (testing, building).

2. major.minor.patch - Breaking changes, new features, bug fixes.

3. `npm run scriptname` or just `npm scriptname` for common scripts.

4. Locks exact versions of all dependencies for reproducible installs.

5. `npm install` updates package-lock.json. `npm ci` does a clean install from lock file (CI/CD).
</details>

**💡 Best Practices**:
- Commit package-lock.json for reproducible builds
- Use specific version ranges (not `*` or latest)
- Separate dev dependencies from production dependencies
- Use npm scripts for common tasks (build, test, dev)
- Keep dependencies updated but test before upgrading major versions

---

### Environment Variables

**Why needed**: Configuration that changes between environments

**Learning Objectives**:
- Reading env vars with process.env
- .env files
- Type-safe environment variables
- Default values and validation
- Security best practices

**Resources**:
- ✅ Simple Practice: `/03-node-and-modules/practice/03-env-vars.ts`
- 📝 Exercise: `/03-node-and-modules/exercises/exercise-03-env.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/gateway/src/server.ts` (server config)
  - Used in: Database connections
- 🎯 Interview Questions:
  1. How do you read an environment variable?
  2. Why should you never commit .env files?
  3. How do you provide default values for env vars?
  4. What's a good pattern for type-safe env vars?
  5. How do you validate required environment variables?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `process.env.VAR_NAME` (returns string or undefined)

2. .env files contain secrets (API keys, passwords). Different for each environment. Use .env.example as template.

3. `const port = process.env.PORT || 3000` (but better to validate explicitly)

4. Create a config object that reads and validates all env vars at startup, throwing if required ones are missing.

5. Check at application startup (not during usage). Use a library or custom validation function.
</details>

**💡 Best Practices**:
- Create a .env.example file with all required variables
- Validate environment variables at startup
- Use a dedicated config module
- Never log sensitive environment variables
- Use different .env files for different environments
- Document all environment variables in README

---

## 04. Database Basics

**Why needed**: OpenCoach uses Drizzle ORM with PostgreSQL for persistent storage

### SQL Basics

**Why needed**: Understanding database queries

**Learning Objectives**:
- SELECT, INSERT, UPDATE, DELETE
- WHERE clauses
- JOINs (inner, left, right)
- ORDER BY and LIMIT
- Indexes and performance

**Resources**:
- ✅ Simple Practice: `/04-database-basics/practice/01-sql-basics.ts`
- 📝 Exercise: `/04-database-basics/exercises/exercise-01-sql.ts`
- 🔗 OpenCoach Reference:
  - Used in: Drizzle queries in `packages/database/`
  - Used in: Schema definitions
- 🎯 Interview Questions:
  1. What's the difference between WHERE and HAVING?
  2. What are the types of JOINs?
  3. How do you prevent SQL injection?
  4. What is an index and when do you use one?
  5. What's a transaction and when would you use one?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. WHERE filters rows before grouping. HAVING filters after aggregation (GROUP BY).

2. INNER JOIN: matching rows only. LEFT JOIN: all left rows + matches. RIGHT JOIN: all right rows + matches. FULL JOIN: all rows.

3. Use parameterized queries or ORM (Drizzle). Never concatenate user input into SQL strings.

4. An index improves query speed on specific columns. Use on frequently filtered/joined columns. Tradeoff: slower writes.

5. A transaction groups multiple queries that succeed or fail together. Use for multi-step operations (bank transfer).
</details>

**💡 Best Practices**:
- Always use parameterized queries (ORM handles this)
- Use indexes on foreign keys and frequently queried columns
- Use transactions for multi-step operations
- Avoid SELECT * (list specific columns)
- Use EXPLAIN to analyze slow queries
- Consider read replicas for scaling

---

### Drizzle ORM

**Why needed**: Type-safe database queries

**Learning Objectives**:
- Defining schemas
- Insert, select, update, delete
- Query building
- Relations and joins
- Migrations

**Resources**:
- ✅ Simple Practice: `/04-database-basics/practice/02-drizzle.ts`
- 📝 Exercise: `/04-database-basics/exercises/exercise-02-drizzle.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/database/src/schema/` (all schema definitions)
  - Used in: All database operations throughout project
- 🎯 Interview Questions:
  1. What is an ORM and why use one?
  2. How do you define a table in Drizzle?
  3. What's a migration in Drizzle?
  4. How does Drizzle provide type safety?
  5. How do you query with relations in Drizzle?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. ORM (Object-Relational Mapping) lets you work with databases using objects instead of SQL strings. Provides type safety and prevents injection.

2. `export const users = pgTable('users', { id: serial('id').primaryKey(), name: text('name').notNull() })`

3. Migrations are schema changes (add table, add column) that can be version controlled and applied to databases.

4. Drizzle generates TypeScript types from your schema, so queries are type-checked at compile time.

5. Use `with` clause or query relations: `db.select().from(users).leftJoin(posts, eq(posts.userId, users.id))`
</details>

**💡 Best Practices**:
- Define schemas with all constraints (not null, unique, foreign keys)
- Generate and run migrations (never manually modify DB)
- Use transactions for multi-table operations
- Use prepared statements for repeated queries
- Keep queries in repository/data layer (not in routes)
- Use Drizzle's type inference (don't duplicate types)

---

## 05. Web Server Basics

**Why needed**: OpenCoach uses Hono as its web server framework

### HTTP Basics

**Why needed**: Understanding how clients and servers communicate

**Learning Objectives**:
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 201, 400, 404, 500)
- Headers (Content-Type, Authorization)
- Request/response cycle
- RESTful design

**Resources**:
- ✅ Simple Practice: `/05-web-server/practice/01-http-basics.ts`
- 📝 Exercise: `/05-web-server/exercises/exercise-01-http.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/api/src/` (all API routes)
  - Used in: `apps/gateway/src/server.ts` (WebSocket upgrade)
- 🎯 Interview Questions:
  1. What's the difference between GET and POST?
  2. What does HTTP status code 404 mean?
  3. What are common HTTP headers?
  4. What's the difference between 201 and 200?
  5. What is idempotency in HTTP?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. GET retrieves data (safe, cacheable). POST creates data (not cacheable, can have side effects).

2. Not Found - the resource doesn't exist (or you don't have permission to know it exists).

3. Content-Type (what format is the body), Authorization (credentials), Cache-Control, User-Agent.

4. 200 is OK (generic success). 201 is Created (new resource made, usually with Location header).

5. An operation is idempotent if doing it multiple times has same effect as doing it once. PUT is idempotent, POST is not.
</details>

**💡 Best Practices**:
- Use correct HTTP methods (GET for read, POST for create)
- Return appropriate status codes
- Use Content-Type headers correctly
- Make endpoints idempotent when possible
- Design APIs RESTfully (resources, not actions)
- Use pagination for large result sets

---

### Hono Framework

**Why needed**: Building fast, type-safe web servers

**Learning Objectives**:
- Route definitions
- Request handling and parsing
- Response formatting
- Middleware
- Error handling

**Resources**:
- ✅ Simple Practice: `/05-web-server/practice/02-hono.ts`
- 📝 Exercise: `/05-web-server/exercises/exercise-02-hono.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/gateway/src/server.ts` (main server)
  - Used in: `apps/api/src/` (API routes)
- 🎯 Interview Questions:
  1. How do you define a route in Hono?
  2. What is middleware in Hono?
  3. How do you parse JSON in Hono?
  4. How do you handle errors in Hono?
  5. What's the difference between c.text() and c.json()?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. `app.get('/path', handler)` or `app.post('/path', handler)`

2. Functions that run before/after the route handler. Used for auth, logging, error handling.

3. `const body = await c.req.json()` (parsed JSON body)

4. Error handler middleware catches thrown errors and formats responses.

5. `c.text()` returns plain text. `c.json()` returns JSON (sets Content-Type: application/json).
</details>

**💡 Best Practices**:
- Group routes by resource (not by function)
- Use middleware for cross-cutting concerns
- Validate request input before processing
- Return consistent error response format
- Use TypeScript for route type safety
- Keep handlers thin (move logic to services)

---

### API Design

**Why needed**: Building consistent, usable APIs

**Learning Objectives**:
- RESTful resource design
- Request/response DTOs
- Validation
- Error response formats
- API versioning

**Resources**:
- ✅ Simple Practice: `/05-web-server/practice/03-api-design.ts`
- 📝 Exercise: `/05-web-server/exercises/exercise-03-api-design.ts`
- 🔗 OpenCoach Reference:
  - Used in: `packages/api/` (shared API types)
  - Used in: `apps/api/src/` (route handlers)
- 🎯 Interview Questions:
  1. What makes an API RESTful?
  2. How do you handle validation errors?
  3. What's a DTO?
  4. Why version APIs?
  5. How do you authenticate API requests?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Resources (nouns) as URLs, HTTP methods as actions, stateless, HATEOAS (links to related resources).

2. Return 400 with details: `{ error: 'Validation failed', fields: { email: 'Invalid email' } }`

3. Data Transfer Object - defines shape of request/response data.

4. To avoid breaking existing clients when you change the API. Add version to URL or header.

5. JWT tokens, API keys, OAuth. Send in Authorization header (usually Bearer token).
</details>

**💡 Best Practices**:
- Use nouns for resource paths (/users, not /getUsers)
- Use plural for resource collections (/users, not /user)
- Return consistent response shapes
- Validate all input (never trust client data)
- Document APIs with OpenAPI/Swagger
- Use HTTP status codes correctly
- Include helpful error messages

---

## 06. WebSocket and Realtime

**Why needed**: OpenCoach uses WebSockets for real-time communication

### WebSocket Basics

**Why needed**: Bidirectional real-time communication

**Learning Objectives**:
- WebSocket vs HTTP
- WebSocket lifecycle (connect, message, disconnect)
- Sending and receiving messages
- Connection management
- Heartbeats and pings

**Resources**:
- ✅ Simple Practice: `/06-websocket-realtime/practice/01-websocket.ts`
- 📝 Exercise: `/06-websocket-realtime/exercises/exercise-01-websocket.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/gateway/src/server.ts` (WebSocket server)
  - Used in: `apps/gateway/src/events.ts` (event handling)
- 🎯 Interview Questions:
  1. How do WebSockets differ from HTTP?
  2. What's the WebSocket handshake?
  3. How do you handle reconnections?
  4. Why use heartbeats?
  5. How do you broadcast to all clients?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. WebSockets are bidirectional and persistent (always open). HTTP is request-response (one-way, closes after each request).

2. HTTP Upgrade request from client to switch protocol from HTTP to WebSocket.

3. Exponential backoff (wait longer between retries), limit max retries, show offline status.

4. To detect dead connections (TCP won't detect immediately). Send ping/pong messages.

5. Store all connections in a Set/Map and iterate: `connections.forEach(c => c.send(msg))`
</details>

**💡 Best Practices**:
- Always handle connection errors
- Implement reconnection with backoff
- Use heartbeats to detect stale connections
- Validate incoming messages
- Close connections gracefully
- Limit message sizes (prevent DoS)
- Use authentication in handshake

---

### Event-Driven Architecture

**Why needed**: Handling and reacting to real-time events

**Learning Objectives**:
- Event emitters and listeners
- Event types and routing
- Broadcasting vs targeting
- Event serialization
- Error handling

**Resources**:
- ✅ Simple Practice: `/06-websocket-realtime/practice/02-events.ts`
- 📝 Exercise: `/06-websocket-realtime/exercises/exercise-02-events.ts`
- 🔗 OpenCoach Reference:
  - Used in: `apps/gateway/src/events.ts` (event definitions)
  - Used in: `packages/database/src/schema/` (event storage)
- 🎯 Interview Questions:
  1. What's an event-driven architecture?
  2. How do you route events to handlers?
  3. What's event serialization?
  4. How do you handle events that fail?
  5. What's the difference between broadcast and emit?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Components communicate by emitting events (not direct calls). Decoupled, extensible.

2. Use event type or topic string to route to specific handler functions.

3. Converting event objects to/from JSON for transmission over network.

4. Dead letter queues, retry logic, logging for manual investigation.

5. Broadcast sends to everyone. Emit sends to specific client(s).
</details>

**💡 Best Practices**:
- Design event schemas carefully (breaking changes break clients)
- Use type checking on incoming events
- Log events for debugging
- Implement event replay for recovery
- Use event versioning for compatibility
- Keep event handlers fast (don't block)

---

## 07. React Basics

**Why needed**: OpenCoach web dashboard uses React (via Next.js)

### Components and JSX

**Why needed**: Building reusable UI pieces

**Learning Objectives**:
- Functional components
- JSX syntax
- Props and prop passing
- Component composition
- Conditional rendering

**Resources**:
- ✅ Simple Practice: `/07-react-basics/practice/01-components.tsx`
- 📝 Exercise: `/07-react-basics/exercises/exercise-01-components.tsx`
- 🔗 OpenCoach Reference:
  - Used in: `apps/web/src/components/` (all UI components)
- 🎯 Interview Questions:
  1. What is JSX?
  2. How do you pass data to components?
  3. What's the difference between props and state?
  4. How do you conditionally render content?
  5. Why use function components over class components?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Syntax extension that lets you write HTML-like code in JavaScript. Transpiled to function calls.

2. Via props: `<Component data={value} />` (accessed as props.data)

3. Props are data passed in (immutable). State is internal component data (mutable with setState).

4. `{condition && <div>}` or `{condition ? <IfTrue /> : <IfFalse />}` or using && for null.

5. Simpler, less code, hooks for state/effects, easier to test. Class components are legacy.
</details>

**💡 Best Practices**:
- Keep components small and focused
- Use TypeScript for prop types
- Destructure props in signature
- Use meaningful component names
- One component per file (usually)
- Extract repeated UI into components

---

### State and Hooks

**Why needed**: Managing component data and side effects

**Learning Objectives**:
- useState hook
- useEffect hook
- Custom hooks
- Rules of hooks
- useMemo and useCallback

**Resources**:
- ✅ Simple Practice: `/07-react-basics/practice/02-hooks.tsx`
- 📝 Exercise: `/07-react-basics/exercises/exercise-02-hooks.tsx`
- 🔗 OpenCoach Reference:
  - Used in: `apps/web/src/` (all interactive components)
- 🎯 Interview Questions:
  1. What does useState do?
  2. When does useEffect run?
  3. What are the rules of hooks?
  4. What's the difference between useMemo and useCallback?
  5. How do you fetch data in React?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Returns stateful value and function to update it. Triggers re-render when updated.

2. After render, and when dependencies change. Can control with dependency array.

3. Only call at top level, not in conditions/loops/nested functions. Only from React functions.

4. useMemo caches a value. useCallback caches a function. Both for performance optimization.

5. useEffect with empty dependency array: `useEffect(() => { fetchData() }, [])` + state to store result.
</details>

**💡 Best Practices**:
- Always list dependencies in useEffect
- Use custom hooks to share logic
- Keep effects focused (one effect per concern)
- Clean up effects (return function)
- Don't optimize prematurely (useMemo, useCallback)
- Keep state as local as possible

---

## 08. Next.js Fullstack

**Why needed**: OpenCoach web uses Next.js App Router

### App Router and Server Components

**Why needed**: Next.js's modern routing and server rendering

**Learning Objectives**:
- App router structure
- Server vs client components
- Server actions
- Data fetching
- Layouts

**Resources**:
- ✅ Simple Practice: `/08-nextjs-fullstack/practice/01-app-router.tsx`
- 📝 Exercise: `/08-nextjs-fullstack/exercises/exercise-01-app-router.tsx`
- 🔗 OpenCoach Reference:
  - Used in: `apps/web/src/app/` (all routes and pages)
- 🎯 Interview Questions:
  1. What's the App Router?
  2. What's the difference between server and client components?
  3. How do you mark a component as client component?
  4. What are server actions?
  5. How do you fetch data in server components?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Next.js 13+ routing system using file structure. Replaces pages router. Supports React Server Components.

2. Server components render on server (no JS sent to client, can access DB directly). Client components render in browser (interactive).

3. Add `'use client'` at top of file. Needed for hooks, event handlers, browser APIs.

4. Functions that run on server from client forms. Alternative to API routes.

5. Direct async calls: `const data = await db.query.users.findMany()` (no fetch needed).
</details>

**💡 Best Practices**:
- Use server components by default (better performance)
- Only use client components when needed (interaction, browser APIs)
- Keep data fetching in server components
- Use server actions for mutations
- Use layouts for shared UI
- Keep server components fast (avoid heavy computation)

---

### Data Fetching and Caching

**Why needed**: Loading and updating data efficiently

**Learning Objectives**:
- Fetching in server components
- Revalidation and caching
- Server actions for mutations
- Loading states
- Error handling

**Resources**:
- ✅ Simple Practice: `/08-nextjs-fullstack/practice/02-data-fetching.tsx`
- 📝 Exercise: `/08-nextjs-fullstack/exercises/exercise-02-data.tsx`
- 🔗 OpenCoach Reference:
  - Used in: `apps/web/src/app/` (all data-loaded pages)
- 🎯 Interview Questions:
  1. How does Next.js cache data?
  2. What's revalidation?
  3. How do you handle loading states?
  4. What's the difference between force-dynamic and revalidate?
  5. How do you handle mutations in Next.js?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Next.js caches fetch requests by default. Can control with revalidate option.

2. Refreshing cached data after a timeout or on-demand (after mutation).

3. Use loading.tsx file (automatic loading UI) or use Suspense with fallback.

4. `force-dynamic: true` disables caching. `revalidate: 60` caches for 60 seconds.

5. Use server actions (form actions) or POST to API routes.
</details>

**💡 Best Practices**:
- Cache aggressively (default caching)
- Revalidate after mutations
- Use loading.tsx for loading states
- Handle errors with error.tsx
- Keep mutations fast
- Use optimistic UI when possible

---

## 09. Agent Systems

**Why needed**: OpenCoach uses Mastra for AI agent orchestration

### Agent Concepts

**Why needed**: Understanding AI agents and tool calling

**Learning Objectives**:
- What is an AI agent
- Tool calling
- Context and memory
- Agent orchestration
- Prompt engineering

**Resources**:
- ✅ Simple Practice: `/09-agent-systems/practice/01-agents.ts`
- 📝 Exercise: `/09-agent-systems/exercises/exercise-01-agents.ts`
- 🔗 OpenCoach Reference:
  - Will be used in: Agent orchestration layer
  - Will be used in: Tool definitions for database/API access
- 🎯 Interview Questions:
  1. What's an AI agent?
  2. What is tool calling?
  3. How do agents maintain context?
  4. What's prompt engineering?
  5. How do you debug agent behavior?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. AI system that can perceive, reason, and act autonomously using tools (not just chat).

2. LLM generates structured requests to call functions/ APIs with specific parameters.

3. Through conversation history and context windows. Can also use vector databases for long-term memory.

4. Crafting prompts to get desired outputs. Include instructions, examples, constraints.

5. Log prompts, responses, tool calls. Use tracing. Test with examples.
</details>

**💡 Best Practices**:
- Give agents clear instructions
- Validate tool parameters
- Log all agent interactions
- Handle tool failures gracefully
- Test with examples before production
- Monitor agent behavior
- Set timeouts and limits

---

### Mastra Framework

**Why needed**: Building AI agents with Mastra

**Learning Objectives**:
- Agent definition
- Tool creation
- Agent workflows
- Evaluation
- Observability

**Resources**:
- ✅ Simple Practice: `/09-agent-systems/practice/02-mastra.ts`
- 📝 Exercise: `/09-agent-systems/exercises/exercise-02-mastra.ts`
- 🔗 OpenCoach Reference:
  - Will be used in: Agent definitions
  - Will be used in: Health coach agent
- 🎯 Interview Questions:
  1. What's Mastra?
  2. How do you define an agent in Mastra?
  3. How do you create tools for agents?
  4. What's a workflow in Mastra?
  5. How do you evaluate agent performance?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Framework for building AI agents with tools, memory, workflows, and observability.

2. Define agent with instructions, tools, and model. Export from module.

3. Create function with schema (Zod) and handler. Mastra validates parameters.

4. Multi-step agent process with decision points. Can have branches and loops.

5. Use test cases, measure success rate, log traces, use evaluation datasets.
</details>

**💡 Best Practices**:
- Define clear tool schemas with Zod
- Keep tools focused and simple
- Use workflows for complex tasks
- Monitor costs and rate limits
- Implement safeguards (e.g., budget limits)
- Test with realistic scenarios
- Keep prompts version controlled

---

## 10. Production Patterns

**Why needed**: Writing maintainable, reliable production code

### Error Handling and Logging

**Why needed**: Debugging and monitoring production issues

**Learning Objectives**:
- Error boundaries (React)
- Global error handlers
- Structured logging
- Error tracking
- Alerting

**Resources**:
- ✅ Simple Practice: `/10-production-patterns/practice/01-error-handling.ts`
- 📝 Exercise: `/10-production-patterns/exercises/exercise-01-errors.ts`
- 🔗 OpenCoach Reference:
  - Used in: All applications (error middleware, logging)
- 🎯 Interview Questions:
  1. What's an error boundary in React?
  2. How do you log errors effectively?
  3. What's structured logging?
  4. How do you track errors in production?
  5. What should you include in error logs?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Component that catches JavaScript errors in child components and displays fallback UI.

2. Use consistent log levels (info, warn, error). Include context (userId, action, error).

3. Logging as JSON/object (not strings). Enables querying and filtering.

4. Error tracking services (Sentry, etc.) capture errors, stack traces, and user context.

5. Error message, stack trace, request details (URL, method, body), user ID, timestamp.
</details>

**💡 Best Practices**:
- Never swallow errors silently
- Log errors with context
- Use error boundaries for React
- Centralize error handling
- Track errors in production
- Set up alerts for critical errors
- Review error logs regularly

---

### Testing

**Why needed**: Catching bugs before production

**Learning Objectives**:
- Unit testing
- Integration testing
- Testing async code
- Mocking
- Test coverage

**Resources**:
- ✅ Simple Practice: `/10-production-patterns/practice/02-testing.ts`
- 📝 Exercise: `/10-production-patterns/exercises/exercise-02-testing.ts`
- 🔗 OpenCoach Reference:
  - Will be used in: All packages and apps
- 🎯 Interview Questions:
  1. What's the difference between unit and integration tests?
  2. How do you test async code?
  3. What is mocking?
  4. What's a good test coverage goal?
  5. How do you organize tests?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Unit: test one function in isolation. Integration: test multiple parts together.

2. Use async test functions, await promises, test both success and failure cases.

3. Replacing real dependencies with fake versions for testing (e.g., mock database).

4. Aim for 80%+. 100% isn't always practical (test critical paths thoroughly).

5. Co-locate with source code or in `__tests__` directory. Group by feature.
</details>

**💡 Best Practices**:
- Test behavior, not implementation
- Write tests before or with code (TDD if possible)
- Test edge cases and error cases
- Keep tests simple and readable
- Use descriptive test names
- Mock external dependencies
- Run tests in CI/CD

---

### Code Quality and Maintainability

**Why needed**: Long-term project health

**Learning Objectives**:
- Code reviews
- Linting and formatting
- Type safety (strict TypeScript)
- Documentation
- Refactoring

**Resources**:
- ✅ Simple Practice: `/10-production-patterns/practice/03-code-quality.ts`
- 📝 Exercise: `/10-production-patterns/exercises/exercise-03-quality.ts`
- 🔗 OpenCoach Reference:
  - Used in: Biome linting configuration
  - Used in: TypeScript strict mode
- 🎯 Interview Questions:
  1. What's the purpose of linting?
  2. Why use strict TypeScript?
  3. What should code reviews focus on?
  4. How do you decide to refactor?
  5. What's technical debt?

**Interview Answers**:
<details>
<summary>Click to reveal answers</summary>

1. Enforce code style, catch common bugs, keep code consistent across team.

2. Catches more errors at compile time. Prevents runtime crashes. Better autocomplete.

3. Logic correctness, edge cases, readability, tests, security, performance.

4. When code is hard to understand, changes are risky, or you need to add features.

5. Shortcut or suboptimal code that works but needs improvement later. Accumulates over time.
</details>

**💡 Best Practices**:
- Use auto-formatter (Biome/Prettier)
- Enable strict TypeScript
- Review all code changes
- Write meaningful commit messages
- Document complex logic
- Remove unused code
- Refactor when adding features
- Keep functions small
- Use descriptive names
- Don't repeat yourself (DRY)

---

## Summary

This learning path takes you from **complete beginner** to **production-ready TypeScript developer** specifically for the OpenCoach project.

### Progression

1. **00-02**: Language fundamentals (JavaScript, TypeScript, async)
2. **03-06**: Backend development (Node, database, server, WebSockets)
3. **07-08**: Frontend development (React, Next.js)
4. **09**: AI agent systems (Mastra)
5. **10**: Production readiness

### How to Study

**For each topic**:
1. ✅ Read the simple practice example
2. 📝 Complete the exercise
3. 🎯 Practice interview questions
4. 💡 Apply best practices
5. 🔗 Find the concept in OpenCoach code

### Estimated Timeline

- **Absolute beginner**: 3-6 months
- **Some programming experience**: 2-3 months
- **JavaScript experience**: 1-2 months

### Next Steps

After completing this guide:
1. Contribute to OpenCoach (start with simple issues)
2. Build a small project using the stack
3. Practice mock interviews
4. Create YouTube tutorials (Feynman technique)

Good luck! 🚀
