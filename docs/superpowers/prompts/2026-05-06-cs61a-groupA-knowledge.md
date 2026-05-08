You are executing Tasks 4-10 of the CS61A Composing Programs JS course rebuild: writing all 7 Chapter 1 knowledge files.

Working directory: /Users/shengji/sj-forward-way/missions/input/code-need-to-understand/

## Context

The repo is rebuilding its CS61A course from an old SICP JS Edition to the modern "Composing Programs" curriculum (https://www.composingprograms.com/ by John DeNero, UC Berkeley). The folder structure is already scaffolded. You need to create 7 knowledge markdown files — one per section — by fetching the source HTML from composingprograms.com and translating the Python content to idiomatic JavaScript.

## Rules

Every knowledge file MUST follow this template exactly:

```
# X.Y [Section Title]

> Based on [Composing Programs X.Y](https://composingprograms.com/pages/XY-[slug].html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python to JavaScript.

## Key Concepts
- 4-6 bullet points

## Content
### [Subsection Title]
(Translated theory with JavaScript code examples in ```javascript blocks)

## Python vs JavaScript Notes
(Table of Python→JS differences relevant to this section)
```

Every Python code example in the source must have a corresponding idiomatic JavaScript example. No Python code should remain in the output.

## The 7 Files

### File 1: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md

Fetch: https://www.composingprograms.com/pages/11-getting-started.html

Translate these subsections:
- Programming in JavaScript → Node.js setup, REPL (`node`), script files
- Errors → SyntaxError, ReferenceError, semantic errors (with JS examples)
- Interactive Computing → Node.js REPL arithmetic examples
- Experimentation → exploratory examples (typeof, Math functions, string concat)

Python→JS mappings for this section: `python3` REPL → `node`, `print()` → `console.log()`, `type(x)` → `typeof x`, `**` → `Math.pow()` or `**`, `NameError` → `ReferenceError`, f-strings → template literals.

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md && git commit -m "docs: add CS61A 1.1 Getting Started knowledge file"`

### File 2: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md

Fetch: https://www.composingprograms.com/pages/12-elements-of-programming.html

Translate these subsections:
- Expressions → call expressions, operator/operand, nested expressions
- Call Expressions → Math.pow, Math.max as JS examples
- Importing Library Functions → Math object, Node.js import syntax
- Names and the Environment → const/let bindings, environment concept
- Evaluating Nested Expressions → evaluation order (operator, operands left-to-right, apply)
- The Non-Pure Print Function → console.log returns undefined, pure vs non-pure

Python→JS: `from math import sqrt` → `Math.sqrt()`, `max(a,b)` → `Math.max(a,b)`, `radius = 10` → `const radius = 10`, `print(x)` returns None → `console.log(x)` returns undefined.

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md && git commit -m "docs: add CS61A 1.2 Elements of Programming knowledge file"`

### File 3: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md

Fetch: https://www.composingprograms.com/pages/13-defining-new-functions.html

Translate these subsections:
- Environments → global frame, local frames, environment diagrams
- Calling User-Defined Functions → parameter binding, return values
- Local Names → scope, name lookup (local → parent → global)
- Choosing Names → descriptive naming conventions
- Functions as Abstractions → single responsibility, hiding implementation
- Operators → operators as syntax, wrapping in functions

Python→JS: `def f(x):` → `function f(x) { }`, indentation → braces, `return` optional in Python (returns None) → `return` required in JS (returns undefined without it), docstrings → JSDoc, `def f(x=0)` → `function f(x = 0)`.

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md && git commit -m "docs: add CS61A 1.3 Defining New Functions knowledge file"`

### File 4: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions.md

Fetch: https://www.composingprograms.com/pages/14-designing-functions.html

Translate ALL subsections from the source:
- Design principles: domain, range, preconditions, side effects
- Each function does one thing
- Locally defined functions (nested function declarations in JS)
- Default parameter values: `function f(x = 0) { }`
- Abstractions and environment model

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions.md && git commit -m "docs: add CS61A 1.4 Designing Functions knowledge file"`

### File 5: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control.md

Fetch: https://www.composingprograms.com/pages/15-control.html

Translate ALL subsections from the source:
- Statements vs expressions in JS
- Compound statements (blocks with `{ }`)
- Conditional statements (`if`/`else if`/`else`)
- Iteration (`while` loops)
- Testing (`console.assert()`, simple test patterns)
- Boolean context and truthiness in JS — highlight that JS has more falsy values than Python: `""`, `0`, `null`, `undefined`, `NaN`, `false` are all falsy. Python only has `False`, `0`, `""`, `None`, `[]`, `{}`.

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control.md && git commit -m "docs: add CS61A 1.5 Control knowledge file"`

### File 6: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md

Fetch: https://www.composingprograms.com/pages/16-higher-order-functions.html

This is the most substantial file — the source has 9 subsections. Translate ALL of them:
- 1.6.1 Functions as Arguments — map/filter patterns, generalizing with HOFs
- 1.6.2 Functions as General Methods — golden ratio search, improve pattern
- 1.6.3 Definitions and Names in Local Frames — nested environments
- 1.6.4 Functions as Return Values — compose1, makeAdder
- 1.6.5 Newton's Method — using HOFs (improve, approx_eq, newton_update)
- 1.6.6 Currying — curry2, uncurry2
- 1.6.7 Lambda Expressions — Python `lambda` → JS arrow functions `() =>`
- 1.6.8 Abstractions and First-Class Functions — first-class elements
- 1.6.9 Function Decorators — Python `@decorator` → JS HOF wrapper: `const decorated = decorator(fn)`

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md && git commit -m "docs: add CS61A 1.6 Higher-Order Functions knowledge file"`

### File 7: knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions.md

Fetch: https://www.composingprograms.com/pages/17-recursive-functions.html

Translate ALL subsections from the source:
- 1.7.1 Recursion in Functions — base cases and recursive calls; factorial example
- 1.7.2 The Anatomy of Recursive Functions — base case + recursive step structure
- 1.7.3 Mutual Recursion — isEven/isOdd using ternary/conditional
- 1.7.4 Printing vs Returning — avoid console.log in recursive functions
- 1.7.5 Tree Recursion — fibonacci, countPartitions

Commit: `git add knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions.md && git commit -m "docs: add CS61A 1.7 Recursive Functions knowledge file"`

## Process

For each file:
1. Fetch the HTML page using curl or WebFetch
2. Extract and read the text content
3. Write the translated markdown file following the template
4. Commit that single file

Work through files 1→2→3→4→5→6→7 in order. Each gets its own commit. After all 7 are done, report which files were created and their approximate line counts.
