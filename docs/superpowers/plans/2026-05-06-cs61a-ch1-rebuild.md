# CS61A Composing Programs JS — Phase 0 Cleanup & Chapter 1 Build

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete old SICP JS content, scaffold new Composing Programs structure, and build Chapter 1 completely (knowledge + practice + learning summary) as a validated template for Chapters 2-4.

**Architecture:** Three-folder pattern (knowledge/, practice/, learning-summary/) under `cs61a-composing-programs/`. Knowledge files are markdown translated from composingprograms.com. Practice files are runnable JS with `undefined` TODO placeholders and `assertEqual` self-checks. Shared utilities in `practice/cs61a-composing-programs/shared/`.

**Tech Stack:** Node.js >= 18 LTS, ES modules (.js files), no external dependencies beyond Node built-ins.

**Spec:** `docs/superpowers/specs/2026-05-06-cs61a-composing-programs-js-design.md`

---

## Chunk 1: Phase 0 — Cleanup & Scaffolding

### Task 1: Delete old CS61A content

**Files:**
- Delete: `knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/` (entire directory)
- Delete: `practice/cs61a-sicp-js/` (entire directory)
- Delete: `learning-summary/cs61a-sicp-js/` (entire directory)
- Delete: `LEARNING-PATH-CS61A.md` (repo root)

- [ ] **Step 1: Delete old knowledge directory**

Run: `rm -rf knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/`

- [ ] **Step 2: Delete old practice directory**

Run: `rm -rf practice/cs61a-sicp-js/`

- [ ] **Step 3: Delete old learning-summary directory**

Run: `rm -rf learning-summary/cs61a-sicp-js/`

- [ ] **Step 4: Delete old learning path file**

Run: `rm LEARNING-PATH-CS61A.md`

- [ ] **Step 5: Verify deletions**

Run: `ls knowledge/ && ls practice/ && ls learning-summary/`
Expected: knowledge/ shows only README.md. practice/ shows no cs61a-sicp-js. learning-summary/ shows no cs61a-sicp-js.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: delete old SICP JS Edition content (33 knowledge files, 6 practice files, 103 summary files)"
```

---

### Task 2: Update parent index docs

**Files:**
- Modify: `README.md` (repo root)
- Modify: `knowledge/README.md`
- Modify: `learning-summary/README.md`

- [ ] **Step 1: Update repo root README.md**

Replace the CS61A/SICP references. In `README.md`:

Replace the knowledge section:
```
### knowledge/ - Programming Fundamentals

Theory courses covering computer science fundamentals and programming principles.

**What's inside:**
- CS61A SICP JavaScript Edition
- Source Academy course materials
- Foundational programming concepts
```
with:
```
### knowledge/ - Programming Fundamentals

Theory courses covering computer science fundamentals, translated to JavaScript.

**What's inside:**
- CS61A Composing Programs (JavaScript Edition) — UC Berkeley's CS61A translated from Python to JS
- Foundational programming concepts
```

Replace the learning-summary CS61A line:
```
- **cs61a-sicp-js/** -- 97-video SICP JavaScript Edition path
```
with:
```
- **cs61a-composing-programs/** -- 30-session Composing Programs JS video path
```

Replace the navigation line:
```
- **Want theory first?** Check `knowledge/README.md` → CS61A SICP
```
with:
```
- **Want theory first?** Check `knowledge/README.md` → CS61A Composing Programs
```

- [ ] **Step 2: Update knowledge/README.md**

Replace the entire content of `knowledge/README.md` with:

```markdown
# Knowledge - Programming Fundamentals

Theory courses covering computer science fundamentals, translated to idiomatic JavaScript.

## CS61A Composing Programs (JavaScript Edition)

**Composing Programs** by John DeNero (UC Berkeley), translated from Python to JavaScript.

Based on the legendary CS61A course, this JavaScript edition covers fundamental programming concepts through idiomatic modern JS (ES2020+, Node.js runtime).

**License:** Original content licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

### Course Structure

| Chapter | Topic | Sections |
|---------|-------|----------|
| 1 | Building Abstractions with Functions | 1.1-1.7 |
| 2 | Building Abstractions with Data | 2.1-2.9 |
| 3 | Interpreting Computer Programs | 3.1-3.5 |
| 4 | Data Processing | 4.1-4.8 |

### Directory Structure

```
knowledge/cs61a-composing-programs/
├── README.md
├── 01-building-abstractions-with-functions/    # Chapter 1
├── 02-building-abstractions-with-data/         # Chapter 2
├── 03-interpreting-computer-programs/          # Chapter 3
└── 04-data-processing/                         # Chapter 4
```

### How to Use

1. **Practice-first** — Start with exercises in `practice/cs61a-composing-programs/`
2. **Reference when stuck** — Read knowledge files to deepen understanding
3. **Theory to practice** — Apply concepts in your own code

### Source Material

- **Original course:** [composingprograms.com](https://www.composingprograms.com/)
- **CS61A Berkeley:** [cs61a.org](https://cs61a.org/)

## Learning Philosophy

**Theory supports practice.** Use these materials to clarify concepts you encounter in practical work.

- **practice/** — Build muscle memory through hands-on coding
- **knowledge/** — Understand why things work the way they do
- **learning-summary/** — Document your insights and connections
```

- [ ] **Step 3: Update learning-summary/README.md**

In `learning-summary/README.md`:

Replace the cs61a-sicp-js row in the table:
```
| `cs61a-sicp-js/` | 97 | SICP JavaScript Edition -- computational thinking from expressions to compilers |
```
with:
```
| `cs61a-composing-programs/` | 30 | Composing Programs JS Edition -- functions, data, interpreters, data processing |
```

Replace the cs61a-sicp-js entry in the directory tree:
```
├── cs61a-sicp-js/                  # 97-video SICP Js path
│   ├── README.md / PLAN.md / TODO.md / SESSION-PROMPTS.md
│   └── 00-overview-and-philosophy/ ... 96-capstone-full-book/
```
with:
```
├── cs61a-composing-programs/       # 30-session Composing Programs JS path
│   ├── README.md / PLAN.md / TODO.md / SESSION-PROMPTS.md
│   └── sessions/00-course-overview/ ... 29-capstone/
```

- [ ] **Step 4: Commit**

```bash
git add README.md knowledge/README.md learning-summary/README.md
git commit -m "docs: update parent index docs from SICP JS to Composing Programs JS"
```

---

### Task 3: Create new folder structure + shared utilities

**Files:**
- Create: `knowledge/cs61a-composing-programs/README.md`
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/` (directory)
- Create: `practice/cs61a-composing-programs/README.md`
- Create: `practice/cs61a-composing-programs/shared/helpers.js`
- Create: `practice/cs61a-composing-programs/shared/pairs.js`
- Create: `practice/cs61a-composing-programs/shared/linked-list.js`
- Create: `practice/cs61a-composing-programs/shared/tree.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/` (directory)
- Create: `learning-summary/cs61a-composing-programs/README.md`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p knowledge/cs61a-composing-programs/01-building-abstractions-with-functions
mkdir -p knowledge/cs61a-composing-programs/02-building-abstractions-with-data
mkdir -p knowledge/cs61a-composing-programs/03-interpreting-computer-programs
mkdir -p knowledge/cs61a-composing-programs/04-data-processing
mkdir -p practice/cs61a-composing-programs/shared
mkdir -p practice/cs61a-composing-programs/01-building-abstractions-with-functions/{1.1-getting-started,1.2-elements-of-programming,1.3-defining-new-functions,1.4-designing-functions,1.5-control,1.6-higher-order-functions,1.7-recursive-functions}
mkdir -p practice/cs61a-composing-programs/02-building-abstractions-with-data
mkdir -p practice/cs61a-composing-programs/03-interpreting-computer-programs
mkdir -p practice/cs61a-composing-programs/04-data-processing
```

- [ ] **Step 2: Write knowledge README.md**

Write `knowledge/cs61a-composing-programs/README.md`:

```markdown
# CS61A Composing Programs (JavaScript Edition)

UC Berkeley's CS61A course translated from Python to idiomatic modern JavaScript.

**Source:** [Composing Programs](https://www.composingprograms.com/) by John DeNero
**License:** [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

## Chapters

| # | Title | Status |
|---|-------|--------|
| 1 | [Building Abstractions with Functions](01-building-abstractions-with-functions/) | In Progress |
| 2 | Building Abstractions with Data | Not Started |
| 3 | Interpreting Computer Programs | Not Started |
| 4 | Data Processing | Not Started |

## Usage

Each knowledge file is self-contained. Read alongside practice exercises in `practice/cs61a-composing-programs/`.
```

- [ ] **Step 3: Write practice README.md**

Write `practice/cs61a-composing-programs/README.md`:

```markdown
# CS61A Composing Programs — Practice Exercises

Hands-on exercises for CS61A Composing Programs (JavaScript Edition).

## Setup

Ensure Node.js >= 18 is installed. No npm install needed — exercises use only Node built-ins and shared helpers.

## Running Exercises

```bash
# From repo root:
node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/practice.js
```

## Structure

Each section has:
- `practice.js` — exercises with `undefined` TODO placeholders
- `solutions.js` — completed solutions

Shared utilities in `shared/`:
- `helpers.js` — `assertEqual()`, `range()`, `assertApprox()`
- `pairs.js` — pair constructor/selectors (Chapter 2)
- `linked-list.js` — linked list operations (Chapter 2)
- `tree.js` — tree operations (Chapter 2)

## Progress

| Chapter | Sections | Status |
|---------|----------|--------|
| 1. Building Abstractions with Functions | 1.1-1.7 | In Progress |
| 2. Building Abstractions with Data | 2.1-2.9 | Not Started |
| 3. Interpreting Computer Programs | 3.1-3.5 | Not Started |
| 4. Data Processing | 4.1-4.8 | Not Started |
```

- [ ] **Step 4: Write shared/helpers.js**

Write `practice/cs61a-composing-programs/shared/helpers.js`:

```javascript
/**
 * Shared helpers for CS61A Composing Programs practice exercises.
 * Provides assertion and utility functions.
 */

export function assertEqual(name, actual, expected) {
  const pass = actual === expected;
  const status = pass ? "PASS" : "FAIL";
  if (!pass) {
    console.log(`${status}: ${name} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`${status}: ${name}`);
  }
}

export function assertApprox(name, actual, expected, tolerance = 0.0001) {
  const pass = Math.abs(actual - expected) < tolerance;
  const status = pass ? "PASS" : "FAIL";
  if (!pass) {
    console.log(`${status}: ${name} — expected ~${expected}, got ${actual}`);
  } else {
    console.log(`${status}: ${name}`);
  }
}

export function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}
```

- [ ] **Step 5: Write shared/pairs.js**

Write `practice/cs61a-composing-programs/shared/pairs.js`:

```javascript
/**
 * Pair data structure for Chapter 2 data abstraction exercises.
 * Uses closures to implement pairs without arrays.
 */

export function pair(a, b) {
  return (selector) => selector(a, b);
}

export function head(p) {
  return p((a, _) => a);
}

export function tail(p) {
  return p((_, b) => b);
}
```

- [ ] **Step 6: Write shared/linked-list.js**

Write `practice/cs61a-composing-programs/shared/linked-list.js`:

```javascript
/**
 * Linked list data structure for Chapter 2 sequence exercises.
 * Uses the pair abstraction from pairs.js.
 */

import { pair, head, tail } from "./pairs.js";

export const EMPTY = null;

export function link(first, rest = EMPTY) {
  return pair(first, rest);
}

export function first(lst) {
  return head(lst);
}

export function rest(lst) {
  return tail(lst);
}

export function isEmpty(lst) {
  return lst === EMPTY;
}

export function listLength(lst) {
  return isEmpty(lst) ? 0 : 1 + listLength(rest(lst));
}
```

- [ ] **Step 7: Write shared/tree.js**

Write `practice/cs61a-composing-programs/shared/tree.js`:

```javascript
/**
 * Tree data structure for Chapter 2 tree exercises.
 */

export function tree(label, branches = []) {
  return { label, branches };
}

export function label(t) {
  return t.label;
}

export function branches(t) {
  return t.branches;
}

export function isLeaf(t) {
  return branches(t).length === 0;
}
```

- [ ] **Step 8: Verify shared helpers run**

Run: `node -e "import('./practice/cs61a-composing-programs/shared/helpers.js').then(m => { m.assertEqual('test', 1+1, 2) })"`
Expected: `PASS: test`

- [ ] **Step 9: Commit**

```bash
git add knowledge/cs61a-composing-programs/ practice/cs61a-composing-programs/
git commit -m "feat: scaffold CS61A Composing Programs folder structure and shared utilities"
```

---

## Chunk 2: Chapter 1 Knowledge Files (1.1-1.3)

### Task 4: Write knowledge file 1.1 — Getting Started

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/11-getting-started.html | head -500`

Review the Python examples and translate to JS in the knowledge file.

- [ ] **Step 2: Write 1.1-getting-started.md**

Write `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md` following the knowledge file format from the spec:

```markdown
# 1.1 Getting Started

> Based on [Composing Programs 1.1](https://composingprograms.com/pages/11-getting-started.html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python to JavaScript.

## Key Concepts
- Installing Node.js and using the REPL
- Understanding error types: syntax, runtime, semantic
- Interactive computing with the Node.js REPL
- Experimentation and exploration

## Content

### Programming in JavaScript

JavaScript runs in browsers and on servers via Node.js. For this course, we use Node.js as the runtime.

**Installing Node.js:**
- Download from [nodejs.org](https://nodejs.org/) (>= 18 LTS)
- Verify: `node --version`

**Interactive Mode (REPL):**
```bash
node
```
```javascript
> 2 + 2
4
> console.log("hello, world")
hello, world
```

**Script Files:**
```javascript
// hello.js
console.log("hello, world");
```
```bash
node hello.js
```

### Errors

Programming involves encountering errors. Three types:

**Syntax Errors** — Invalid program structure:
```javascript
console.log("hello  // missing closing quote
// SyntaxError: Invalid or unexpected token
```

**Runtime Errors** — Valid syntax but execution fails:
```javascript
console.log(undefined_variable);
// ReferenceError: undefined_variable is not defined
```

**Semantic Errors** — Runs but produces wrong results:
```javascript
// Intended: average of 2 and 4 (should be 3)
console.log(2 + 4); // 6 — wrong! Should be (2 + 4) / 2
```

### Interactive Computing

The Node.js REPL evaluates expressions:
```javascript
> 2 + 3 * 4
14
> (2 + 3) * 4
20
> Math.pow(2, 10)
1024
```

### Experimentation

The best way to learn is to try things. Open `node` in your terminal and experiment:
```javascript
> 1 + 2 + 3 + 4 + 5
15
> Math.sqrt(16)
4
> "hello" + " " + "world"
'hello world'
> typeof 42
'number'
> typeof "hello"
'string'
```

## Python vs JavaScript Notes

| Python | JavaScript |
|--------|-----------|
| `python3` REPL | `node` REPL |
| `print(...)` | `console.log(...)` |
| `**` for exponent | `Math.pow()` or `**` |
| `type(x)` | `typeof x` |
| `NameError` | `ReferenceError` |
| `SyntaxError` | `SyntaxError` (same) |
| f-strings `f"{x}"` | Template literals `` `${x}` `` |
```

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md
git commit -m "docs: add CS61A 1.1 Getting Started knowledge file"
```

---

### Task 5: Write knowledge file 1.2 — Elements of Programming

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/12-elements-of-programming.html | head -500`

Review and prepare for translation.

- [ ] **Step 2: Write 1.2-elements-of-programming.md**

Write `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md`:

```markdown
# 1.2 Elements of Programming

> Based on [Composing Programs 1.2](https://composingprograms.com/pages/12-elements-of-programming.html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python to JavaScript.

## Key Concepts
- Expressions and call expressions
- Importing library functions
- Names and the environment
- Evaluating nested expressions
- Pure vs non-pure functions

## Content

### Expressions

An expression describes a computation and evaluates to a value.

**Primitive expressions:**
```javascript
42          // number
"hello"     // string
true        // boolean
```

**Call expressions** apply a function to arguments:
```javascript
Math.pow(2, 3)    // 8 — 2 raised to power 3
Math.max(1, 3, 2) // 3 — largest argument
```

A call expression has:
- **Operator** — the function (`Math.pow`)
- **Operands** — the arguments (`2`, `3`)

### Importing Library Functions

JavaScript provides many built-in functions through the `Math` object:
```javascript
Math.sqrt(16)   // 4
Math.abs(-5)    // 5
Math.round(3.7) // 4
```

In Node.js, you can import modules:
```javascript
import { readFileSync } from "fs";
```

### Names and the Environment

Names refer to values. Using `const` or `let` binds a name to a value:
```javascript
const radius = 10;
const pi = 3.14159;
pi * radius * radius; // 314.159
```

Names are looked up in the **environment** — a mapping from names to values.

**Naming conventions:**
- Use descriptive names: `radius` not `r`
- `const` for values that won't change
- `let` for values that will be reassigned

### Evaluating Nested Expressions

JavaScript evaluates expressions in a specific order:

```javascript
Math.pow(2 + 3, 4 - 1);
```

1. Evaluate the operator: `Math.pow` is a function
2. Evaluate the operands left to right:
   - `2 + 3` → `5`
   - `4 - 1` → `3`
3. Apply the function: `Math.pow(5, 3)` → `125`

This procedure is recursive — sub-expressions are evaluated first.

### The Non-Pure `console.log` Function

**Pure functions** always return the same value for the same inputs and have no side effects:
```javascript
Math.sqrt(4);  // always returns 2
```

**Non-pure functions** have side effects. `console.log` prints and returns `undefined`:
```javascript
console.log("hello"); // prints "hello", returns undefined
// Two things happened: a side effect (printing) and a return value (undefined)
```

In this course, we emphasize pure functions. `console.log` is useful for debugging but avoid relying on it in your programs.

## Python vs JavaScript Notes

| Python | JavaScript |
|--------|-----------|
| `from math import sqrt` | `Math.sqrt()` (built-in) |
| `max(a, b)` | `Math.max(a, b)` |
| `radius = 10` | `const radius = 10` |
| `print(x)` returns `None` | `console.log(x)` returns `undefined` |
| Multiple return values: tuples | No direct equivalent; use arrays/objects |
```

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md
git commit -m "docs: add CS61A 1.2 Elements of Programming knowledge file"
```

---

### Task 6: Write knowledge file 1.3 — Defining New Functions

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/13-defining-new-functions.html | head -500`

- [ ] **Step 2: Write 1.3-defining-new-functions.md**

Write `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md`:

```markdown
# 1.3 Defining New Functions

> Based on [Composing Programs 1.3](https://composingprograms.com/pages/13-defining-new-functions.html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python to JavaScript.

## Key Concepts
- Function definitions and environments
- Calling user-defined functions
- Local names and scope
- Choosing descriptive names
- Functions as abstractions

## Content

### Environments

Function execution happens in an **environment** — a sequence of frames, each containing name-value bindings.

The **global frame** is always present. When a function is called, a new **local frame** is created.

### Defining Functions

```javascript
function square(x) {
  return x * x;
}
```

A function definition has:
- **Name** — `square`
- **Parameters** — `x`
- **Body** — `return x * x`

```javascript
square(3);      // 9
square(5);      // 25
square(square(3)); // 81
```

### Calling User-Defined Functions

When `square(3)` is evaluated:
1. A new local frame extends the global frame
2. Parameter `x` is bound to argument `3` in the local frame
3. The body `x * x` is evaluated in this extended environment
4. The result `9` is returned

### Local Names

Parameters are local to the function body:
```javascript
function square(x) {
  const result = x * x;
  return result;
}

// x and result are not accessible here
// square(5) works, but x is undefined outside
```

**Name lookup rule:** When evaluating a name, JavaScript looks in the current (local) frame first, then in parent frames, up to the global frame.

### Choosing Names

Good names make code self-documenting:
```javascript
// Good
function circumference(radius) {
  return 2 * Math.PI * radius;
}

// Bad
function f(r) {
  return 2 * 3.14159 * r;
}
```

### Functions as Abstractions

A function should do **one thing** and hide implementation details:
```javascript
function areaOfCircle(radius) {
  return Math.PI * square(radius);
}
```

The caller doesn't need to know how `square` works — only that it takes a number and returns its square.

### Operators

In JavaScript, operators are not regular functions, but you can wrap them:
```javascript
const add = (a, b) => a + b;
add(3, 4); // 7
```

## Python vs JavaScript Notes

| Python | JavaScript |
|--------|-----------|
| `def f(x):` with indentation | `function f(x) { }` with braces |
| `return` optional (returns `None`) | `return` required (returns `undefined` without it) |
| Nested `def` allowed | Nested `function` allowed |
| Docstrings `"""..."""` | JSDoc `/** ... */` |
| Default args: `def f(x=0)` | Default params: `function f(x = 0)` |
```

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md
git commit -m "docs: add CS61A 1.3 Defining New Functions knowledge file"
```

---

## Chunk 3: Chapter 1 Knowledge Files (1.4-1.7)

### Task 7: Write knowledge file 1.4 — Designing Functions

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/14-designing-functions.html | head -500`

- [ ] **Step 2: Write 1.4-designing-functions.md**

Translate following the same format. Key content to cover:
- Design principles: domain, range, preconditions
- Each function should do one thing
- Locally defined functions (nested function declarations)
- Default parameter values in JS

The file should follow the established markdown template with `> Based on` attribution, `## Key Concepts`, `## Content` with subsections, and `## Python vs JavaScript Notes`.

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions.md
git commit -m "docs: add CS61A 1.4 Designing Functions knowledge file"
```

---

### Task 8: Write knowledge file 1.5 — Control

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/15-control.html | head -500`

- [ ] **Step 2: Write 1.5-control.md**

Translate following the format. Key content:
- Statements vs expressions in JS
- Conditional statements: `if`/`else if`/`else`
- Iteration: `while` loops
- Testing: `console.assert()`, simple test patterns
- Boolean context and truthiness in JS (different from Python — JS has more falsy values)

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control.md
git commit -m "docs: add CS61A 1.5 Control knowledge file"
```

---

### Task 9: Write knowledge file 1.6 — Higher-Order Functions

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/16-higher-order-functions.html | head -500`

- [ ] **Step 2: Write 1.6-higher-order-functions.md**

Translate following the format. Key content:
- Functions as arguments: `applyToAll`, custom iterators
- Functions as general methods: golden ratio search, improve pattern
- Functions as return values: `compose1`, `makeAdder`
- Newton's method using higher-order functions
- Currying: `curry2`, `uncurry2`
- Lambda expressions → arrow functions
- Function decorators → HOF wrappers
- First-class functions concept

This is the most substantial knowledge file in Chapter 1.

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md
git commit -m "docs: add CS61A 1.6 Higher-Order Functions knowledge file"
```

---

### Task 10: Write knowledge file 1.7 — Recursive Functions

**Files:**
- Create: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions.md`

- [ ] **Step 1: Fetch source content from composingprograms.com**

Run: `curl -s https://composingprograms.com/pages/17-recursive-functions.html | head -500`

- [ ] **Step 2: Write 1.7-recursive-functions.md**

Translate following the format. Key content:
- Anatomy of recursion: base case + recursive step
- `factorial` example
- Mutual recursion: `isEven`/`isOdd`
- Tree recursion: `fibonacci`, `countPartitions`
- Printing vs returning in recursive functions

- [ ] **Step 3: Commit**

```bash
git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions.md
git commit -m "docs: add CS61A 1.7 Recursive Functions knowledge file"
```

---

## Chunk 4: Chapter 1 Practice Files (1.1-1.4)

### Task 11: Write practice + solutions for 1.1 — Getting Started

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/solutions.js`

- [ ] **Step 1: Write practice.js**

```javascript
/**
 * CS61A Composing Programs - 1.1 Getting Started
 * Based on: https://composingprograms.com/pages/11-getting-started.html
 *
 * Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/practice.js
 */

import { assertEqual } from "../../../shared/helpers.js";

// ============================================
// Exercise 1: Arithmetic Expressions
// ============================================

// TODO: Write an expression that computes the sum of 12 and 8
const sum = undefined;
assertEqual("Exercise 1", sum, 20);

// ============================================
// Exercise 2: String Expressions
// ============================================

// TODO: Concatenate "hello" and "world" with a space between them
const greeting = undefined;
assertEqual("Exercise 2", greeting, "hello world");

// ============================================
// Exercise 3: The typeof Operator
// ============================================

// TODO: What type is 42? Use typeof to check
const typeOfNumber = undefined;
assertEqual("Exercise 3", typeOfNumber, "number");

// ============================================
// Exercise 4: Math Functions
// ============================================

// TODO: Use Math.sqrt to compute the square root of 144
const root = undefined;
assertEqual("Exercise 4", root, 12);

// ============================================
// Exercise 5: Nested Expressions
// ============================================

// TODO: Compute the area of a circle with radius 5
// Formula: Math.PI * radius * radius
const circleArea = undefined;
// Use assertApprox since floating point isn't exact
```

- [ ] **Step 2: Write solutions.js**

Same structure with all TODOs filled in:
```javascript
const sum = 12 + 8;
const greeting = "hello" + " " + "world";
const typeOfNumber = typeof 42;
const root = Math.sqrt(144);
const circleArea = Math.PI * 5 * 5;
```

- [ ] **Step 3: Run solutions.js to verify all pass**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/
git commit -m "feat: add CS61A 1.1 Getting Started practice and solutions"
```

---

### Task 12: Write practice + solutions for 1.2 — Elements of Programming

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/solutions.js`

- [ ] **Step 1: Write practice.js**

Exercises covering:
- Call expressions with `Math` functions
- Names and `const` bindings
- Evaluating nested expressions
- Pure vs non-pure (`Math.sqrt` vs `console.log`)

- [ ] **Step 2: Write solutions.js**

Complete solutions for all exercises.

- [ ] **Step 3: Run solutions.js to verify all pass**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/
git commit -m "feat: add CS61A 1.2 Elements of Programming practice and solutions"
```

---

### Task 13: Write practice + solutions for 1.3 — Defining New Functions

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/solutions.js`

- [ ] **Step 1: Write practice.js**

Exercises covering:
- Writing simple functions (`square`, `cube`)
- Function composition (`areaOfCircle` using `square`)
- Local names and scope
- Default parameters

- [ ] **Step 2: Write solutions.js**

- [ ] **Step 3: Run solutions.js to verify**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/
git commit -m "feat: add CS61A 1.3 Defining New Functions practice and solutions"
```

---

### Task 14: Write practice + solutions for 1.4 — Designing Functions

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/solutions.js`

- [ ] **Step 1: Write practice.js**

Exercises covering:
- Designing functions with clear domain/range
- Locally defined (nested) functions
- Function documentation patterns

- [ ] **Step 2: Write solutions.js**

- [ ] **Step 3: Run solutions.js to verify**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/
git commit -m "feat: add CS61A 1.4 Designing Functions practice and solutions"
```

---

## Chunk 5: Chapter 1 Practice Files (1.5-1.7)

### Task 15: Write practice + solutions for 1.5 — Control

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/solutions.js`

- [ ] **Step 1: Write practice.js**

Exercises covering:
- `if`/`else` conditionals
- `while` loops
- Boolean logic and truthiness
- Simple assertions/testing

- [ ] **Step 2: Write solutions.js**

- [ ] **Step 3: Run solutions.js to verify**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/
git commit -m "feat: add CS61A 1.5 Control practice and solutions"
```

---

### Task 16: Write practice + solutions for 1.6 — Higher-Order Functions

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/solutions.js`

- [ ] **Step 1: Write practice.js**

Exercises covering:
- Functions as arguments (write a `map`/`filter` using HOFs)
- Functions as return values (`makeAdder`, `compose`)
- Currying
- Arrow functions as anonymous functions
- Newton's method (guided implementation)

This is the most substantial practice file in Chapter 1.

- [ ] **Step 2: Write solutions.js**

- [ ] **Step 3: Run solutions.js to verify**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/
git commit -m "feat: add CS61A 1.6 Higher-Order Functions practice and solutions"
```

---

### Task 17: Write practice + solutions for 1.7 — Recursive Functions

**Files:**
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions/practice.js`
- Create: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions/solutions.js`

- [ ] **Step 1: Write practice.js**

Exercises covering:
- Writing recursive functions (`factorial`, `sumToN`)
- Mutual recursion (`isEven`/`isOdd`)
- Tree recursion (`fibonacci`, `countPartitions`)
- Debugging: returning vs printing

- [ ] **Step 2: Write solutions.js**

- [ ] **Step 3: Run solutions.js to verify**

Run: `node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions/solutions.js`
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions/
git commit -m "feat: add CS61A 1.7 Recursive Functions practice and solutions"
```

---

## Chunk 6: Learning Summary Structure + Validation

### Task 18: Create learning-summary structure

**Files:**
- Create: `learning-summary/cs61a-composing-programs/README.md`
- Create: `learning-summary/cs61a-composing-programs/PLAN.md`
- Create: `learning-summary/cs61a-composing-programs/TODO.md`
- Create: `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md`
- Create: 30 session directories under `learning-summary/cs61a-composing-programs/sessions/`

- [ ] **Step 1: Create session directories**

```bash
mkdir -p learning-summary/cs61a-composing-programs/sessions/{00-course-overview,01-1.1-getting-started,02-1.2-elements-of-programming,03-1.3-defining-new-functions,04-1.4-designing-functions,05-1.5-control,06-1.6-higher-order-functions,07-1.7-recursive-functions,08-ch1-review,09-2.1-2.2-data-abstraction,10-2.3-sequences,11-2.4-mutable-data,12-2.5-oop,13-2.6-2.7-object-abstraction,14-2.8-efficiency,15-2.9-recursive-objects,16-ch2-review,17-3.1-programming-languages,18-3.2-functional-js,19-3.3-exceptions,20-3.4-calculator-interpreter,21-3.5-js-interpreter,22-ch3-review,23-4.2-implicit-sequences,24-4.3-sql,25-4.4-4.5-logic-programming,26-4.6-4.7-distributed,27-4.8-parallel,28-ch4-review,29-capstone}
```

- [ ] **Step 2: Write README.md**

Write `learning-summary/cs61a-composing-programs/README.md`:

```markdown
# CS61A Composing Programs JS — Video Learning Path

30-session video learning path for CS61A Composing Programs (JavaScript Edition), using the Feynman method.

**Source course:** [Composing Programs](https://www.composingprograms.com/) by John DeNero (CC BY-SA 3.0)

## Structure

| Document | Purpose |
|----------|---------|
| `README.md` | This file — collection overview |
| `PLAN.md` | Session-by-session breakdown |
| `TODO.md` | Progress tracker |
| `SESSION-PROMPTS.md` | Copy-paste prompts for each session |

## Session Structure

Each session directory may contain:
- `learning-report.md` — key insights and connections
- `transcript.md` — teaching script
- `slides.html` — Reveal.js slides

Review sessions (08, 16, 22, 28, 29) need only `learning-report.md`.

## Progress

See `TODO.md` for detailed checkbox tracking.

## Workflow

1. Study the knowledge file for the session's topics
2. Complete the practice exercises
3. Create session artifacts (report, transcript, slides)
4. Mark session complete in TODO.md
```

- [ ] **Step 3: Write PLAN.md**

Write `learning-summary/cs61a-composing-programs/PLAN.md` with the 30-session table from the spec (sessions 00-29), including for each session: number, title, source sections, learning objectives, and expected artifacts.

- [ ] **Step 4: Write TODO.md**

Write `learning-summary/cs61a-composing-programs/TODO.md` with unchecked checkboxes for all 30 sessions:
```markdown
# CS61A Composing Programs JS — Progress Tracker

## Sessions
- [ ] 00 — Course Overview
- [ ] 01 — Getting Started (1.1)
- [ ] 02 — Expressions & Names (1.2)
...
```

- [ ] **Step 5: Write SESSION-PROMPTS.md**

Write `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md` with copy-paste prompts for sessions 00-08 (Chapter 1). Later chapters will be added as they're built.

- [ ] **Step 6: Commit**

```bash
git add learning-summary/cs61a-composing-programs/
git commit -m "feat: add CS61A Composing Programs learning summary structure (30 sessions)"
```

---

### Task 19: Validation — Run all Chapter 1 practice files

**Files:** All practice files created in Tasks 11-17.

- [ ] **Step 1: Run all solutions files**

```bash
for dir in practice/cs61a-composing-programs/01-building-abstractions-with-functions/*/; do
  echo "=== Running $dir/solutions.js ==="
  node "${dir}solutions.js" || echo "FAILED: $dir"
done
```

Expected: All PASS for all 7 sections.

- [ ] **Step 2: Run all practice files (should all FAIL — TODOs are undefined)**

```bash
for dir in practice/cs61a-composing-programs/01-building-abstractions-with-functions/*/; do
  echo "=== Running $dir/practice.js ==="
  node "${dir}practice.js" 2>&1 | head -5
done
```

Expected: Mix of FAIL entries — confirms practice files are parseable and TODOs are in place.

- [ ] **Step 3: Verify knowledge files exist**

Run: `ls knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/`
Expected: 7 .md files (1.1 through 1.7).

- [ ] **Step 4: Verify learning summary structure**

Run: `ls learning-summary/cs61a-composing-programs/sessions/ | wc -l`
Expected: 30

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address validation issues in CS61A Chapter 1"
```
