# Project Structure

This document describes the structure of the `practice/` collection - the hands-on learning roadmap.

## Overview

This is a progressive JavaScript/TypeScript learning path designed for a junior developer working on the OpenCoach AI health agent project. It takes you from complete beginner to production-ready TypeScript developer.

## Repository Organization

This repository is organized into 3 collections:

```
code-need-to-understand/
├── practice/            # This collection - hands-on learning modules
├── knowledge/           # Programming fundamentals courses (CS61A SICP)
└── learning-summary/    # Progress documentation & concept hierarchies
```

**Learning Philosophy:** Practice-first. Do hands-on exercises in `practice/` first, reference `knowledge/` for theory when stuck, document insights in `learning-summary/`.

## Practice Collection Structure

```
practice/
├── README.md                    # Main knowledge guide with topics, interview questions, best practices
├── QUICKSTART.md                # Quick start guide for running code
├── PROJECT-STRUCTURE.md         # This file
├── IMPLEMENTATION-SUMMARY.md    # Implementation summary and statistics
├── CLAUDE.md                    # Guidance for Claude Code AI assistant
├── package.json                 # Dependencies (tsx for running TypeScript files)
├── tsconfig.json                # TypeScript configuration
├── .gitignore                   # Git ignore patterns
│
├── 00-fundamentals/             # JavaScript basics
│   ├── practice/
│   │   ├── 01-variables-and-types.ts      # Variables, data types, type coercion
│   │   ├── 02-functions.ts                 # Functions, closures, callbacks
│   │   ├── 03-control-flow.ts              # Loops, conditionals, control flow
│   │   └── 04-arrays-and-objects.ts        # Arrays, objects, destructuring, spread
│   └── exercises/
│       ├── exercise-01-basic-syntax.ts     # Variables exercise
│       ├── exercise-01-basic-syntax-solution.ts
│       ├── exercise-02-functions.ts        # Functions exercise
│       ├── exercise-02-functions-solution.ts
│       ├── exercise-03-loops.ts            # Control flow exercise
│       ├── exercise-03-loops-solution.ts
│       ├── exercise-04-arrays.ts           # Arrays/objects exercise
│       └── exercise-04-arrays-solution.ts
│
├── 01-typescript-basics/        # TypeScript fundamentals
│   ├── practice/
│   │   ├── 01-types-and-interfaces.ts      # Types, interfaces, type aliases
│   │   ├── 02-type-annotations.ts          # Advanced types, utility types, type guards
│   │   ├── 03-generics-basics.ts           # Generics, constraints, utility types with generics
│   │   └── 04-union-types.ts               # Union types, type narrowing, discriminated unions
│   └── exercises/
│       ├── exercise-01-types-and-interfaces.ts
│       ├── exercise-01-types-and-interfaces-solution.ts
│       ├── exercise-02-type-annotations.ts
│       ├── exercise-02-type-annotations-solution.ts
│       ├── exercise-03-generics.ts
│       └── exercise-03-generics-solution.ts
│
├── 02-async-programming/        # Promises, async/await
│   ├── practice/
│   │   ├── 01-promises.ts                    # Promises, async/await, error handling, parallel operations
│   │   └── 02-error-handling.ts              # Try/catch, custom errors, Promise error handling
│   └── exercises/
│       ├── exercise-01-async.ts
│       ├── exercise-01-async-solution.ts
│       ├── exercise-02-errors.ts
│       └── exercise-02-errors-solution.ts
│
├── 03-node-and-modules/         # ES modules, npm, environment
│   ├── practice/
│   │   ├── 01-modules.ts                     # ES modules, imports/exports, dynamic imports
│   │   ├── 02-npm.ts                         # npm, package.json, semantic versioning
│   │   └── 03-env-vars.ts                    # Environment variables, type-safe config
│   └── exercises/
│       ├── exercise-01-imports.ts            # ES modules exercise
│       ├── exercise-01-imports-solution.ts
│       ├── exercise-02-scripts.ts            # npm scripts exercise
│       ├── exercise-02-scripts-solution.ts
│       ├── exercise-03-env.ts                # Environment variables exercise
│       └── exercise-03-env-solution.ts
│
├── 04-database-basics/          # Drizzle ORM, SQL basics
│   ├── practice/
│   │   ├── 01-sql-basics.ts                 # SQL basics: SELECT, INSERT, UPDATE, DELETE, JOINs
│   │   └── 02-drizzle.ts                    # Drizzle ORM: schemas, queries, migrations
│   └── exercises/
│       ├── exercise-01-sql.ts               # SQL exercise
│       ├── exercise-01-sql-solution.ts
│       ├── exercise-02-drizzle.ts           # Drizzle ORM exercise
│       └── exercise-02-drizzle-solution.ts
│
├── 05-web-server/               # HTTP basics, Hono, API design
│   ├── practice/
│   │   ├── 01-http-basics.ts                # HTTP methods, status codes, headers
│   │   ├── 02-hono.ts                       # Hono framework, routes, middleware, validation
│   │   └── 03-api-design.ts                 # RESTful API design, error handling, documentation
│   └── exercises/
│       ├── exercise-01-http.ts              # HTTP basics exercise
│       ├── exercise-01-http-solution.ts
│       ├── exercise-02-hono.ts              # Hono framework exercise
│       ├── exercise-02-hono-solution.ts
│       ├── exercise-03-api-design.ts        # API design exercise
│       └── exercise-03-api-design-solution.ts
│
├── 06-websocket-realtime/       # WebSocket server, real-time communication
│   ├── practice/
│   │   ├── 01-websocket-basics.ts           # WebSocket lifecycle, connection management, heartbeat
│   │   ├── 02-event-driven-arch.ts          # Event emitters, routing, validation, replay
│   │   └── 03-realtime-patterns.ts          # Broadcast, rooms, presence, typing indicators
│   └── exercises/
│       ├── exercise-01-websocket.ts         # WebSocket basics exercise
│       ├── exercise-01-websocket-solution.ts
│       ├── exercise-02-events.ts            # Event-driven architecture exercise
│       ├── exercise-02-events-solution.ts
│       ├── exercise-03-realtime.ts          # Realtime patterns exercise
│       └── exercise-03-realtime-solution.ts
│
├── 07-react-basics/             # Components, hooks
│   ├── practice/                           # TODO: Add practice files
│   └── exercises/                           # TODO: Add exercises
│
├── 08-nextjs-fullstack/         # App router, server components
│   ├── practice/                           # TODO: Add practice files
│   └── exercises/                           # TODO: Add exercises
│
├── 09-agent-systems/            # Mastra, AI integration
│   ├── practice/                           # TODO: Add practice files
│   └── exercises/                           # TODO: Add exercises
│
└── 10-production-patterns/      # Error handling, testing, best practices
    ├── practice/                           # TODO: Add practice files
    └── exercises/                           # TODO: Add exercises
```

## File Descriptions

### Collection Root Files

- **README.md**: Comprehensive learning guide with all topics, interview questions, best practices, and OpenCoach code references
- **QUICKSTART.md**: Quick start guide for getting started immediately
- **PROJECT-STRUCTURE.md**: This file - documents the practice collection structure
- **CLAUDE.md**: Guidance for Claude Code AI assistant
- **IMPLEMENTATION-SUMMARY.md**: Implementation statistics and progress
- **package.json**: Dependencies for running TypeScript files (tsx)
- **tsconfig.json**: TypeScript configuration with strict mode enabled
- **.gitignore**: Git ignore patterns for node_modules and build artifacts

### Completed Sections

#### 00. Fundamentals (✅ Complete)
- 4 practice files with progressive difficulty (Level 1, 2, 3)
- 4 exercise files with solutions
- Covers: variables, types, functions, control flow, arrays, objects
- Each practice file has extensive comments and examples

#### 01. TypeScript Basics (✅ Complete)
- 4 practice files: types/interfaces, type annotations, generics, union types
- 3 exercise files with solutions
- Covers: type annotations, interfaces, union types, type guards, utility types, generics

#### 02. Async Programming (✅ Complete)
- 2 practice files: Promises, error handling
- 2 exercise files with solutions
- Covers: creating Promises, async/await, error handling, parallel operations, Promise.allSettled

#### 03. Node.js and Modules (✅ Complete)
- 3 practice files: ES modules, npm, environment variables
- 3 exercise files with solutions
- Covers: named/default exports, imports, re-exports, dynamic imports, package.json, semantic versioning, env vars, type-safe config

#### 04. Database Basics (✅ Complete)
- 2 practice files: SQL basics, Drizzle ORM
- 2 exercise files with solutions
- Covers: SELECT, INSERT, UPDATE, DELETE, JOINs, indexes, Drizzle schemas, queries, migrations

#### 05. Web Server (✅ Complete)
- 3 practice files: HTTP basics, Hono framework, API design
- 3 exercise files with solutions
- Covers: HTTP methods/status codes, Hono routes/middleware, request handling, validation, response formatting, RESTful API design

#### 06. WebSocket Realtime (✅ Complete)
- 3 practice files: WebSocket basics, event-driven architecture, realtime patterns
- 3 exercise files with solutions
- Covers: WebSocket lifecycle, connection management, heartbeat, reconnection, event emitters, event routing, validation, dead letter queues, event replay, broadcast, rooms, presence tracking, typing indicators, state synchronization

### Sections Needing Completion

The following sections have directory structure created but need practice and exercise files:

- **07. React Basics**: Components, hooks, JSX
- **08. Next.js Fullstack**: App router, server components
- **09. Agent Systems**: Mastra, AI integration
- **10. Production Patterns**: Error handling, testing, code quality

## How Each Section Is Organized

### Practice Files (`/practice/`)

Each practice file follows this structure:

1. **LEVEL 1: Basics** - Fundamental concepts with simple examples
2. **LEVEL 2: Practical Patterns** - Real-world usage patterns
3. **LEVEL 3: Production Complexity** - Advanced patterns used in OpenCoach
4. **Best Practices Summary** - Key takeaways and dos/don'ts

### Exercise Files (`/exercises/`)

Each exercise includes:

1. **Exercise Template** (`exercise-XX-*.ts`)
   - Clear instructions at the top
   - `// TODO: Your code here` markers
   - Expected output described

2. **Solution File** (`exercise-XX-*-solution.ts`)
   - Complete working solution
   - Comments explaining the approach
   - For comparison after completing the exercise

## How to Use This Collection

### For Self-Learning

1. Start with `00-fundamentals`
2. Read the practice file to understand concepts
3. Complete the corresponding exercise
4. Compare your solution with the provided solution
5. Move to the next topic
6. Use the README.md for interview questions and best practices

### For Mock Interviews

Each section in README.md has:
- 3-5 interview questions
- Hidden answers (spoiler tags)
- Covers both recall and applied understanding

### For YouTube Content Creation

- Each subsection is a standalone video topic
- Progressive difficulty builds audience loyalty
- Real OpenCoach code examples provide authenticity
- README.md provides the script/outline

## Completion Status

- ✅ **00-fundamentals**: Complete (4 practice + 4 exercises with solutions)
- ✅ **01-typescript-basics**: Complete (4 practice + 3 exercises with solutions)
- ✅ **02-async-programming**: Complete (2 practice + 2 exercises with solutions)
- ✅ **03-node-and-modules**: Complete (3 practice + 3 exercises with solutions)
- ✅ **04-database-basics**: Complete (2 practice + 2 exercises with solutions)
- ✅ **05-web-server**: Complete (3 practice + 3 exercises with solutions)
- ⚠️ **06-websocket-realtime**: Structure only, needs content
- ⚠️ **07-react-basics**: Structure only, needs content
- ⚠️ **08-nextjs-fullstack**: Structure only, needs content
- ⚠️ **09-agent-systems**: Structure only, needs content
- ⚠️ **10-production-patterns**: Structure only, needs content

## Running the Files

All TypeScript files can be run directly with tsx:

```bash
# Run a practice file
npx tsx 00-fundamentals/practice/01-variables-and-types.ts

# Run an exercise
npx tsx 00-fundamentals/exercises/exercise-01-basic-syntax.ts

# Check types without running
npm run check 00-fundamentals/practice/01-variables-and-types.ts
```

## Contributing

To add more content:

1. Follow the existing file structure
2. Include LEVEL 1, 2, 3 progression in practice files
3. Add clear TODO comments in exercises
4. Provide complete solutions
5. Update this PROJECT-STRUCTURE.md
6. Update README.md with new topics

## Next Steps

1. Complete practice files for sections 04-10
2. Add exercise files for sections 03-10
3. Add more references to actual OpenCoach code
4. Create video scripts based on the content
5. Add more interview questions per topic
6. Create additional bonus challenges

---

**Total Files Created**: 54 files
- 1 comprehensive README.md
- 1 quick start guide
- 1 project structure file
- 1 implementation summary
- 1 CLAUDE.md guidance
- 3 configuration files (package.json, tsconfig.json, .gitignore)
- 18 practice files across 6 sections
- 14 exercise/solution pairs across 5 sections (00: 4 pairs, 01: 3 pairs, 02: 2 pairs, 04: 2 pairs, 05: 3 pairs)

**Estimated completion time for existing content**: 40-60 hours
**Estimated completion time for full project**: 200+ hours
