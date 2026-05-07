# CS61A Composing Programs (JavaScript Edition) — Course Rebuild Design

**Date:** 2026-05-06
**Status:** Approved
**Source:** https://www.composingprograms.com/ (John DeNero, UC Berkeley)

## Overview

Rebuild the CS61A learning materials in this repository from the old SICP JavaScript Edition (5 chapters, mostly empty scaffolding) to the modern Composing Programs curriculum (4 chapters), translated from Python to idiomatic modern JavaScript with Node.js runtime.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Old content | Delete completely | Was mostly empty scaffolding (0/97 videos, 3 practice files) |
| JS style | Idiomatic modern JS | ES2020+, closures over nonlocal, arrow functions, class syntax |
| Chapter 3 | JS interpreter in JS | Metacircular evaluator — more practical than Scheme |
| Folder structure | 3-folder pattern | knowledge/, practice/, learning-summary/ — matches repo philosophy |
| File format | .js + Node.js | ES modules (import/export), run with `node` |
| Learning path | Adapted video path | ~30 sessions (not 97), topic-cluster grouping |
| Build approach | Chapter-First | Build Ch1 fully, validate, then expand |

## Directory Structure

```
cs61a-composing-programs-js/ (in each of knowledge/, practice/, learning-summary/)

knowledge/cs61a-composing-programs/
├── README.md
├── 01-building-abstractions-with-functions/
│   ├── 1.1-getting-started.md
│   ├── 1.2-elements-of-programming.md
│   ├── 1.3-defining-new-functions.md
│   ├── 1.4-designing-functions.md
│   ├── 1.5-control.md
│   ├── 1.6-higher-order-functions.md
│   └── 1.7-recursive-functions.md
├── 02-building-abstractions-with-data/
├── 03-interpreting-computer-programs/
└── 04-data-processing/

practice/cs61a-composing-programs/
├── README.md
├── 01-building-abstractions-with-functions/
│   ├── 1.1-getting-started/
│   │   ├── practice.js
│   │   └── solutions.js
│   ├── 1.2-elements-of-programming/
│   │   ├── practice.js
│   │   └── solutions.js
│   └── ...
├── 02-building-abstractions-with-data/
├── 03-interpreting-computer-programs/
└── 04-data-processing/

learning-summary/cs61a-composing-programs/
├── README.md
├── PLAN.md
├── TODO.md
├── SESSION-PROMPTS.md
└── sessions/
    ├── 00-course-overview/
    ├── 01-1.1-getting-started/
    └── ... (~30 total)
```

## Knowledge File Format

Each knowledge file is a self-contained markdown document translated from composingprograms.com:

```markdown
# 1.2 Elements of Programming

> Based on [Composing Programs 1.2](https://composingprograms.com/pages/12-elements-of-programming.html)

## Key Concepts
- Expressions and call expressions
- Naming and the environment

## Content

### Expressions
(Translated theory with JavaScript examples)

```javascript
// Python: 2 + 3
// JavaScript:
2 + 3; // 5
```

## Python vs JavaScript Notes
(Only where translation is non-obvious)
```

## Practice File Format

Each `practice.js` follows this pattern:

```javascript
/**
 * CS61A Composing Programs - 1.2 Elements of Programming
 * Run: node 1.2-elements-of-programming/practice.js
 */

// Exercise 1: Expressions
const result1 = // TODO: your code here
console.log("Exercise 1:", result1 === 14 ? "PASS" : "FAIL");
```

- `console.log` assertions for self-checking (no test framework)
- `TODO` markers where students write code
- One file per section
- `solutions.js` has identical structure with TODOs filled in
- Exercises progress: fill-in-blank → write from scratch → debug/extend

## Python-to-JS Translation Guide

| Python | JavaScript | Notes |
|--------|-----------|-------|
| `print()` | `console.log()` | |
| `def f(x):` | `function f(x) {}` or `const f = (x) =>` | Context-dependent |
| `lambda x: x+1` | `(x) => x + 1` | Arrow functions |
| `import math` | Node built-ins or inline | |
| `@decorator` | HOF wrapper | `const decorated = decorator(fn)` |
| `nonlocal x` | Closures | Idiomatic JS — no keyword needed |
| `class Foo:` | `class Foo { constructor() {} }` | |
| `for x in seq:` | `for (const x of seq)` | |
| `[f(x) for x in s if p(x)]` | `s.filter(p).map(f)` | Method chains |
| `**` exponent | `**` | JS also supports |
| `True/False` | `true/false` | |
| `None` | `null` or `undefined` | Context-dependent |
| `len(x)` | `x.length` | |
| `range(n)` | `Array.from({length: n}, (_, i) => i)` | |
| `dict` | Plain objects or `Map` | |
| `try/except` | `try/catch` | |
| `raise ValueError(...)` | `throw new Error(...)` | |
| `yield` | `yield` in `function*` | Nearly identical |
| `__iter__`/`__next__` | `[Symbol.iterator]()`/`{next()}` | JS iterator protocol |
| `threading.Thread` | `worker_threads.Worker` | |
| `multiprocessing.Process` | `worker_threads.Worker` | |
| `queue.Queue` | `MessageChannel` | |

## Video Learning Path (~30 Sessions)

| # | Session | Topics | Chapter |
|---|---------|--------|---------|
| 00 | Course Overview | Setup, tools, learning philosophy | — |
| 01 | Getting Started | 1.1 — setup, errors, REPL | 1 |
| 02 | Expressions & Names | 1.2 — expressions, call expressions, names, environment | 1 |
| 03 | Defining Functions | 1.3 — environments, calling, scope, abstraction | 1 |
| 04 | Designing Functions | 1.4 — domain/range, local functions | 1 |
| 05 | Control Flow | 1.5 — statements, conditionals, iteration, testing | 1 |
| 06 | Higher-Order Functions | 1.6 — functions as args/returns, currying, lambda | 1 |
| 07 | Recursive Functions | 1.7 — recursion, mutual recursion, tree recursion | 1 |
| 08 | Ch1 Review | Chapter 1 comprehensive review + exercises | 1 |
| 09 | Native Data Types & Abstraction | 2.1-2.2 — types, rational numbers, pairs, barriers | 2 |
| 10 | Sequences | 2.3 — lists, processing, strings, trees, linked lists | 2 |
| 11 | Mutable Data | 2.4 — objects, mutation, closures for state, dispatch dicts | 2 |
| 12 | OOP | 2.5 — classes, inheritance, multiple inheritance | 2 |
| 13 | Implementing Objects | 2.6-2.7 — dispatch dicts, special methods, generics | 2 |
| 14 | Efficiency | 2.8 — memoization, orders of growth, data structures | 2 |
| 15 | Recursive Objects | 2.9 — linked list class, tree class, BST | 2 |
| 16 | Ch2 Review | Chapter 2 comprehensive review | 2 |
| 17 | Programming Languages | 3.1 — intro to interpreters | 3 |
| 18 | Functional JS Patterns | 3.2 — closures, immutability, pure functions | 3 |
| 19 | Exceptions | 3.3 — try/catch, custom errors | 3 |
| 20 | Calculator Interpreter | 3.4 — parsing, expression trees, evaluation | 3 |
| 21 | JS Interpreter | 3.5 — eval/apply, environments, data as programs | 3 |
| 22 | Ch3 Review | Chapter 3 comprehensive review | 3 |
| 23 | Implicit Sequences | 4.2 — iterators, generators, streams | 4 |
| 24 | Declarative Programming (SQL) | 4.3 — SQL basics, joins, aggregation | 4 |
| 25 | Logic Programming | 4.4-4.5 — facts, queries, unification | 4 |
| 26 | Distributed Computing | 4.6-4.7 — networking, MapReduce | 4 |
| 27 | Parallel Computing | 4.8 — worker threads, locks, message passing | 4 |
| 28 | Ch4 Review | Chapter 4 comprehensive review | 4 |
| 29 | Capstone | Full course review + final problems | — |

Each session produces 3 artifacts:
- `learning-report.md` — key insights and connections
- `transcript.md` — teaching script
- `slides.html` — Reveal.js slides

## Chapter 3 Adaptation: JS Interpreter in JS

| Original (Scheme-in-Python) | Adaptation (JS-in-JS) |
|------------------------------|----------------------|
| 3.1 Programming Languages | Same concepts, JS examples |
| 3.2 Functional Programming (Scheme) | Functional JS patterns — closures, immutability, pure functions |
| 3.3 Exceptions (try/except) | Exceptions — try/catch/finally, custom Error subclasses |
| 3.4 Calculator (Scheme-syntax) | Calculator interpreter — S-expression parser, arithmetic evaluator in JS |
| 3.5 Full Scheme interpreter | JS interpreter — parse JS-like syntax, eval/apply, environment model, closures |

## Chapter 4 Adaptation: Data Processing

| Topic | JS Equivalent |
|-------|--------------|
| Iterators (4.2) | `[Symbol.iterator]()`, `{next()}`, `for...of` |
| Generators (4.2) | `function*`, `yield` — nearly identical |
| Streams (4.2) | Lazy class with getter-based memoization, or async generators |
| SQL (4.3) | Mini SQL engine in JS (language-agnostic) |
| Logic Programming (4.4-4.5) | Fact/query engine in JS |
| Distributed Computing (4.6) | Node.js `net` module, `fetch` API |
| MapReduce (4.7) | Node.js streams + MapReduce pattern |
| Parallel Computing (4.8) | `worker_threads`, `MessageChannel`, `SharedArrayBuffer` |

## Implementation Order

### Phase 0: Cleanup
1. Delete old `cs61a-sicp-js` content from knowledge/, practice/, learning-summary/
2. Create new `cs61a-composing-programs` folder structure in all 3 locations
3. Write root README files for each location

### Phase 1: Chapter 1 — Full Build
1. Translate all 7 knowledge files from composingprograms.com
2. Create practice.js + solutions.js for each section
3. Create learning-summary structure (README, PLAN, TODO, SESSION-PROMPTS, session dirs)
4. Validate: run every practice file, verify knowledge accuracy

### Phase 2+: Chapters 2-4
- Same pattern for each chapter after Ch1 is validated
- Each chapter gets its own implementation cycle

## Course Structure (from composingprograms.com)

### Chapter 1: Building Abstractions with Functions
- 1.1 Getting Started (setup, errors, REPL)
- 1.2 Elements of Programming (expressions, names, environment)
- 1.3 Defining New Functions (environments, scope, abstraction)
- 1.4 Designing Functions (domain/range, local functions)
- 1.5 Control (statements, conditionals, iteration, testing)
- 1.6 Higher-Order Functions (functions as args/returns, currying, lambda, decorators)
- 1.7 Recursive Functions (recursion, mutual recursion, tree recursion)

### Chapter 2: Building Abstractions with Data
- 2.1 Introduction (native data types)
- 2.2 Data Abstraction (rational numbers, pairs, barriers)
- 2.3 Sequences (lists, processing, strings, trees, linked lists)
- 2.4 Mutable Data (objects, mutation, nonlocal/closures, dispatch dicts)
- 2.5 Object-Oriented Programming (classes, inheritance, multiple inheritance)
- 2.6 Implementing Classes and Objects (OOP with dispatch dicts)
- 2.7 Object Abstraction (special methods, multiple representations, generics)
- 2.8 Efficiency (memoization, orders of growth, data structures, sets)
- 2.9 Recursive Objects (linked list class, tree class, BST)

### Chapter 3: Interpreting Computer Programs
- 3.1 Introduction (programming languages)
- 3.2 Functional Programming (expressions, definitions, pairs, symbols)
- 3.3 Exceptions (try/catch, custom errors)
- 3.4 Interpreters for Languages with Combination (calculator, parsing)
- 3.5 Interpreters for Languages with Abstraction (full interpreter, eval/apply)

### Chapter 4: Data Processing
- 4.1 Introduction
- 4.2 Implicit Sequences (iterators, generators, streams)
- 4.3 Declarative Programming (SQL)
- 4.4 Logic Programming (facts, queries)
- 4.5 Unification (pattern matching, unification algorithm)
- 4.6 Distributed Computing (networking)
- 4.7 Distributed Data Processing (MapReduce)
- 4.8 Parallel Computing (threads, locks, message passing)
