# CS61A Composing Programs JS — Session Plan

30-session Feynman-method learning path, adapted from [Composing Programs](https://www.composingprograms.com/) by John DeNero (CC BY-SA 3.0).

## Session Overview

| # | Session | Source | Chapter |
|---|---------|--------|---------|
| 00 | Course Overview | Setup, tools, learning philosophy | — |
| 01 | Getting Started | 1.1 | 1 |
| 02 | Expressions & Names | 1.2 | 1 |
| 03 | Defining Functions | 1.3 | 1 |
| 04 | Designing Functions | 1.4 | 1 |
| 05 | Control Flow | 1.5 | 1 |
| 06 | Higher-Order Functions | 1.6 | 1 |
| 07 | Recursive Functions | 1.7 | 1 |
| 08 | Ch1 Review | All of Ch1 | 1 |
| 09 | Native Data Types & Abstraction | 2.1-2.2 | 2 |
| 10 | Sequences | 2.3 | 2 |
| 11 | Mutable Data | 2.4 | 2 |
| 12 | OOP | 2.5 | 2 |
| 13 | Implementing Objects | 2.6-2.7 | 2 |
| 14 | Efficiency | 2.8 | 2 |
| 15 | Recursive Objects | 2.9 | 2 |
| 16 | Ch2 Review | All of Ch2 | 2 |
| 17 | Programming Languages | 3.1 | 3 |
| 18 | Functional Programming in JS | 3.2 | 3 |
| 19 | Exceptions | 3.3 | 3 |
| 20 | Calculator Interpreter | 3.4 | 3 |
| 21 | JS Interpreter | 3.5 | 3 |
| 22 | Ch3 Review | All of Ch3 | 3 |
| 23 | Implicit Sequences | 4.2 | 4 |
| 24 | Declarative Programming / SQL | 4.3 | 4 |
| 25 | Logic Programming | 4.4-4.5 | 4 |
| 26 | Distributed Computing | 4.6-4.7 | 4 |
| 27 | Parallel Computing | 4.8 | 4 |
| 28 | Ch4 Review | All of Ch4 | 4 |
| 29 | Capstone | Full course | — |

## Session Details

### Session 00 — Course Overview
- **Source:** Setup, tools, learning philosophy
- **Chapter:** —
- **Objectives:**
  - Understand the 4-chapter course structure and learning philosophy
  - Set up Node.js development environment
  - Learn the Feynman method for self-teaching
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 01 — Getting Started (1.1)
- **Source:** [1.1 Getting Started](https://composingprograms.com/pages/11-getting-started.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Install and use Node.js REPL and script execution
  - Identify and distinguish syntax, runtime, and semantic errors
  - Experiment with basic expressions in the JavaScript REPL
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 02 — Expressions & Names (1.2)
- **Source:** [1.2 Elements of Programming](https://composingprograms.com/pages/12-elements-of-programming.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Understand expressions, call expressions, and evaluation order
  - Use `const`/`let` to bind names to values in the environment
  - Distinguish pure functions from non-pure functions like `console.log`
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 03 — Defining Functions (1.3)
- **Source:** [1.3 Defining New Functions](https://composingprograms.com/pages/13-defining-new-functions.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Define functions with parameters and return values
  - Trace function calls through environment diagrams (global frame, local frames)
  - Understand scope and local name lookup rules
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 04 — Designing Functions (1.4)
- **Source:** [1.4 Designing Functions](https://composingprograms.com/pages/14-designing-functions.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Apply design principles: domain, range, preconditions, side effects
  - Use locally defined (nested) functions and default parameters
  - Treat functions as abstractions that hide implementation details
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 05 — Control Flow (1.5)
- **Source:** [1.5 Control](https://composingprograms.com/pages/15-control.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Write conditional statements (`if`/`else if`/`else`) and `while` loops
  - Understand statements vs expressions and boolean truthiness in JS
  - Practice simple testing patterns with `console.assert`
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 06 — Higher-Order Functions (1.6)
- **Source:** [1.6 Higher-Order Functions](https://composingprograms.com/pages/16-higher-order-functions.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Pass functions as arguments and return functions from other functions
  - Implement map, filter, compose, curry, and decorator patterns
  - Apply Newton's method using higher-order function abstractions
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 07 — Recursive Functions (1.7)
- **Source:** [1.7 Recursive Functions](https://composingprograms.com/pages/17-recursive-functions.html)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Write recursive functions with proper base cases and recursive steps
  - Implement mutual recursion and understand tree recursion
  - Trace recursive call chains and count partitions
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 08 — Ch1 Review
- **Source:** All of Chapter 1 (1.1–1.7)
- **Chapter:** 1 — Building Abstractions with Functions
- **Objectives:**
  - Review and connect all Chapter 1 concepts: expressions → functions → HOFs → recursion
  - Run all practice solutions and identify weak areas
  - Consolidate understanding through comprehensive exercises
- **Artifacts:** learning-report.md (report-only — no transcript or slides)

### Session 09 — Native Data Types & Abstraction (2.1-2.2)
- **Source:** [2.1 Introduction](https://composingprograms.com/pages/21-introduction.html), [2.2 Data Abstraction](https://composingprograms.com/pages/22-data-abstraction.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Understand JavaScript native types and their behavior
  - Implement data abstraction with constructors and selectors
  - Build rational number arithmetic using abstraction barriers
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 10 — Sequences (2.3)
- **Source:** [2.3 Sequences](https://composingprograms.com/pages/23-sequences.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Work with arrays, strings, and sequence operations
  - Implement and use linked lists and tree data structures
  - Process sequences using map, filter, and reduce patterns
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 11 — Mutable Data (2.4)
- **Source:** [2.4 Mutable Data](https://composingprograms.com/pages/24-mutable-data.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Understand object mutation and identity vs equality
  - Use closures to encapsulate mutable state
  - Implement dispatch dictionaries for state management
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 12 — OOP (2.5)
- **Source:** [2.5 Object-Oriented Programming](https://composingprograms.com/pages/25-object-oriented-programming.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Define classes with constructors, methods, and inheritance in JS
  - Understand prototypal vs class-based inheritance
  - Apply multiple inheritance patterns and method resolution
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 13 — Implementing Objects (2.6-2.7)
- **Source:** [2.6 Implementing Classes](https://composingprograms.com/pages/26-implementing-classes-and-objects.html), [2.7 Object Abstraction](https://composingprograms.com/pages/27-object-abstraction.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Implement objects using dispatch dictionaries and closures
  - Understand special methods and generic function patterns
  - Apply multiple representation techniques with type tags
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 14 — Efficiency (2.8)
- **Source:** [2.8 Efficiency](https://composingprograms.com/pages/28-efficiency.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Analyze time and space complexity using big-O notation
  - Compare algorithm efficiency through empirical measurement
  - Implement memoization to optimize recursive algorithms
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 15 — Recursive Objects (2.9)
- **Source:** [2.9 Recursive Objects](https://composingprograms.com/pages/29-recursive-objects.html)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Implement linked list and tree classes with recursive methods
  - Build and search binary search trees
  - Understand recursive data structure invariants
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 16 — Ch2 Review
- **Source:** All of Chapter 2 (2.1–2.9)
- **Chapter:** 2 — Building Abstractions with Data
- **Objectives:**
  - Review data abstraction, sequences, OOP, and efficiency concepts
  - Connect data structures to their algorithmic trade-offs
  - Consolidate understanding through comprehensive exercises
- **Artifacts:** learning-report.md (report-only — no transcript or slides)

### Session 17 — Programming Languages (3.1)
- **Source:** [3.1 Introduction](https://composingprograms.com/pages/31-introduction.html)
- **Chapter:** 3 — Interpreting Computer Programs
- **Objectives:**
  - Understand the structure of programming language interpreters
  - Learn the eval/apply cycle at a high level
  - Distinguish syntax, parsing, and evaluation phases
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 18 — Functional Programming in JS (3.2)
- **Source:** [3.2 Functional Programming](https://composingprograms.com/pages/32-functional-programming.html)
- **Chapter:** 3 — Interpreting Computer Programs
- **Objectives:**
  - Apply functional programming patterns: closures, immutability, pure functions
  - Implement pairs and lists in functional style using closures
  - Work with symbolic data and pattern matching
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 19 — Exceptions (3.3)
- **Source:** [3.3 Exceptions](https://composingprograms.com/pages/33-exceptions.html)
- **Chapter:** 3 — Interpreting Computer Programs
- **Objectives:**
  - Use try/catch/finally for structured error handling
  - Create custom Error subclasses for domain-specific errors
  - Understand exception propagation and assertion patterns
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 20 — Calculator Interpreter (3.4)
- **Source:** [3.4 Interpreters for Calculator](https://composingprograms.com/pages/34-interpreters-for-languages-with-combination.html)
- **Chapter:** 3 — Interpreting Computer Programs
- **Objectives:**
  - Build a tokenizer and recursive descent parser
  - Construct and evaluate expression trees
  - Implement a calculator that handles arithmetic expressions
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 21 — JS Interpreter (3.5)
- **Source:** [3.5 Interpreters for JS](https://composingprograms.com/pages/35-interpreters-for-languages-with-abstraction.html)
- **Chapter:** 3 — Interpreting Computer Programs
- **Objectives:**
  - Implement a full eval/apply interpreter for a JS subset
  - Build environment frames with parent-chain lookup
  - Understand closures, recursion, and data-as-programs
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 22 — Ch3 Review
- **Source:** All of Chapter 3 (3.1–3.5)
- **Chapter:** 3 — Interpreting Computer Programs
- **Objectives:**
  - Review interpreter architecture: tokenize → parse → evaluate
  - Connect functional programming to interpreter implementation
  - Consolidate understanding through comprehensive exercises
- **Artifacts:** learning-report.md (report-only — no transcript or slides)

### Session 23 — Implicit Sequences (4.2)
- **Source:** [4.2 Implicit Sequences](https://composingprograms.com/pages/42-implicit-sequences.html)
- **Chapter:** 4 — Data Processing
- **Objectives:**
  - Implement iterators and generators using `function*` and `yield`
  - Build lazy sequences and streams with memoization
  - Understand the JS iterator protocol `[Symbol.iterator]()`
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 24 — Declarative Programming / SQL (4.3)
- **Source:** [4.3 Declarative Programming](https://composingprograms.com/pages/43-declarative-programming.html)
- **Chapter:** 4 — Data Processing
- **Objectives:**
  - Write SQL queries: SELECT, WHERE, JOIN, GROUP BY
  - Build a mini SQL engine in JavaScript
  - Compare declarative vs imperative data processing
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 25 — Logic Programming (4.4-4.5)
- **Source:** [4.4 Logic Programming](https://composingprograms.com/pages/44-logic-programming.html), [4.5 Unification](https://composingprograms.com/pages/45-unification.html)
- **Chapter:** 4 — Data Processing
- **Objectives:**
  - Represent facts and queries in a logic programming system
  - Implement the unification algorithm for pattern matching
  - Build a simple logic interpreter in JavaScript
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 26 — Distributed Computing (4.6-4.7)
- **Source:** [4.6 Distributed Computing](https://composingprograms.com/pages/46-distributed-computing.html), [4.7 Distributed Data Processing](https://composingprograms.com/pages/47-distributed-data-processing.html)
- **Chapter:** 4 — Data Processing
- **Objectives:**
  - Use Node.js `net` module and `fetch` for network communication
  - Implement the MapReduce pattern for distributed data processing
  - Understand client/server architecture and protocols
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 27 — Parallel Computing (4.8)
- **Source:** [4.8 Parallel Computing](https://composingprograms.com/pages/48-parallel-computing.html)
- **Chapter:** 4 — Data Processing
- **Objectives:**
  - Use `worker_threads` for parallel computation in Node.js
  - Implement synchronization with `MessageChannel` and `SharedArrayBuffer`
  - Understand race conditions and deadlock prevention
- **Artifacts:** learning-report.md, transcript.md, slides.html

### Session 28 — Ch4 Review
- **Source:** All of Chapter 4 (4.1–4.8)
- **Chapter:** 4 — Data Processing
- **Objectives:**
  - Review iterators, generators, SQL, and parallel computing
  - Connect lazy evaluation to declarative programming patterns
  - Consolidate understanding through comprehensive exercises
- **Artifacts:** learning-report.md (report-only — no transcript or slides)

### Session 29 — Capstone
- **Source:** Full course (Chapters 1–4)
- **Chapter:** —
- **Objectives:**
  - Synthesize all course concepts into a cohesive understanding
  - Complete final problems that span multiple chapters
  - Reflect on the journey from expressions to interpreters
- **Artifacts:** learning-report.md (report-only — no transcript or slides)
