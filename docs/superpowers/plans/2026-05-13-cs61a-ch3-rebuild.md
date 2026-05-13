# CS61A Composing Programs JS — Chapter 3: Interpreting Computer Programs

> **For agentic workers:** Follow the checkbox (`- [ ]`) steps and update them as work completes. If `superpowers:subagent-driven-development` or `superpowers:executing-plans` is available, use it; otherwise execute the checklist manually.

**Goal:** Build Chapter 3 (Interpreting Computer Programs) completely: 5 knowledge files, 10 practice files, and learning-summary updates for sessions 17-22, following the Chapter 1 and Chapter 2 patterns.

**Architecture:** Three-folder pattern (`knowledge/`, `practice/`, `learning-summary/`) under `cs61a-composing-programs/`. Chapter 3 introduces programming languages, functional programming, exceptions, a calculator interpreter, and a capstone JavaScript-subset interpreter.

**Tech Stack:** Node.js >= 18 LTS, ES modules (`.js` files), zero external dependencies. Chapter 3 practice remains plain ES module `.js` and must coexist with the existing `.ts` practice modules in the broader `practice/` tree.

**Spec:** `docs/superpowers/specs/2026-05-06-cs61a-composing-programs-js-design.md`
**Chapter 1 Plan (reference):** `docs/superpowers/plans/2026-05-06-cs61a-ch1-rebuild.md`
**Chapter 2 Plan (reference):** `docs/superpowers/plans/2026-05-11-cs61a-ch2-rebuild.md`

**Import path convention:** Practice files live 3 levels deep under `practice/cs61a-composing-programs/03-.../<section>/`. From any practice file, `../../shared/helpers.js` resolves to `practice/cs61a-composing-programs/shared/helpers.js`. Always use `../../shared/`, never `../../../shared/`.

**Do NOT modify:** Chapter 1 files, Chapter 2 files, unrelated `.ts` practice modules, unrelated dirty files, or root learning materials outside the Chapter 3 scope. Only add Chapter 3 content and update structural files that must reflect Chapter 3 availability.

---

## 1. Current State

### Completed Dependencies

Chapter 1 is complete and provides the function and recursion foundation:

- Function definitions, call expressions, scope, and environment diagrams.
- Higher-order functions, closures, currying, and decorators.
- Recursion, mutual recursion, and tree recursion.
- Safe-stub practice pattern using `undefined` placeholders and `assertEqual`.

Chapter 2 is complete and provides the data and object foundation:

- Data abstraction with constructors/selectors and closure-based pairs.
- Arrays, linked lists, trees, mutation, local state, dispatch dictionaries.
- JavaScript `class`, inheritance, mixins, type tags, generic functions.
- Efficiency, memoization, recursive objects, and binary search trees.
- `assertThrows` was added to shared helpers for exception assertions.

### Existing Shared Utilities

`practice/cs61a-composing-programs/shared/` currently contains:

| File | Exports | Chapter 3 Use |
|------|---------|---------------|
| `helpers.js` | `assertEqual`, `assertApprox`, `range`, `assertThrows` | Sufficient for all Chapter 3 tests, including exception exercises. |
| `pairs.js` | `pair`, `head`, `tail` | Useful for 3.2 functional data and 3.4 expression pairs if needed. |
| `linked-list.js` | `EMPTY`, `link`, `first`, `rest`, `isEmpty`, `listLength`, `listToString`, `listToArray`, `listFromArray`, `mapList`, `filterList`, `appendList` | Optional for 3.2 symbolic list exercises. |
| `tree.js` | `tree`, `label`, `branches`, `isLeaf`, `printTree`, `treeSize`, `treeContains`, `mapTree` | Optional for AST demonstrations in 3.4 and 3.5. |

**Verdict:** No shared utility additions are required for Chapter 3. The tokenizer, parser, AST constructors, `Frame` class, evaluator, and interpreter helpers belong inside the relevant 3.4 and 3.5 practice/solution files so learners build them explicitly.

### Learning Summary Status

The 30-session plan already reserves Chapter 3 as:

| Session | Topic | Source |
|---------|-------|--------|
| 17 | Programming Languages | 3.1 |
| 18 | Functional Programming in JS | 3.2 |
| 19 | Exceptions | 3.3 |
| 20 | Calculator Interpreter | 3.4 |
| 21 | JS Interpreter | 3.5 |
| 22 | Ch3 Review | All of Ch3 |

`learning-summary/cs61a-composing-programs/PLAN.md` has usable high-level session details. `SESSION-PROMPTS.md` still has placeholder prompts for sessions 17-22 and must be expanded when Chapter 3 is implemented.

---

## 2. Chapter 3 Scope

Build all sections 3.1 through 3.5:

| Section | Title | Key Topics | JavaScript Adaptation |
|---------|-------|------------|-----------------------|
| 3.1 | Introduction | Programming languages, syntax, semantics, interpreters, eval/apply | Language pipeline: source text -> tokens -> AST -> evaluation result. |
| 3.2 | Functional Programming | Expressions as values, pure functions, closures, symbolic data | Functional JavaScript using closures, immutable values, list/tree transforms, symbolic expression representation. |
| 3.3 | Exceptions | Error signaling, propagation, handling, assertions | `try`/`catch`/`finally`, custom `Error` subclasses, `assertThrows`, interpreter error reporting. |
| 3.4 | Interpreters for Languages with Combination | Calculator language, parsing, expression trees, evaluation | Build a small arithmetic S-expression calculator with tokenizer, parser, AST, and evaluator. |
| 3.5 | Interpreters for Languages with Abstraction | Eval/apply, environments, lexical scope, functions | Build a JavaScript-subset interpreter in JavaScript using recursive descent and `Frame` objects. |

### Chapter 3 Source Mapping

The original Composing Programs Chapter 3 uses Scheme and Python interpreters. This rebuild follows the approved JavaScript adaptation:

- 3.1 keeps the conceptual interpreter introduction.
- 3.2 translates Scheme-style functional programming to JavaScript functional patterns.
- 3.3 translates Python exceptions to JavaScript exceptions.
- 3.4 adapts the calculator interpreter to a small S-expression arithmetic language implemented in JavaScript.
- 3.5 replaces the Scheme interpreter with a JavaScript-subset interpreter in JavaScript.

---

## 3. Pinned Interpreter Design

The Chapter 3 capstone is a JavaScript-subset interpreter. This design is pinned by the approved spec and must not be widened during implementation.

### Supported JavaScript Subset

Implement only:

- Literals: numbers, strings, booleans, `null`.
- Variable references.
- Variable declarations and assignment: `let x = expression;`, `x = expression;`.
- Function declarations: `function name(param1, param2) { body }`.
- Arrow functions: `(x, y) => expression` and `(x, y) => { body }`.
- Function calls: `f(arg1, arg2)`.
- Conditionals: `if (condition) { consequent } else { alternate }`.
- Blocks: `{ statement1; statement2; }`.
- Return statements.
- Basic operators needed by the exercises: `+`, `-`, `*`, `/`, `%`, `===`, `!==`, `<`, `<=`, `>`, `>=`, `&&`, `||`, `!`.

Do not implement:

- Classes.
- Loops (`for`, `while`, `do`).
- Async/await or promises.
- Imports/exports.
- Destructuring.
- Arrays or objects as syntax in the interpreter subset.
- Template literals.
- `var`, `const`, hoisting, prototype lookup, `this`, `new`.
- JavaScript automatic semicolon insertion. Require semicolons in the teaching subset.

### Required Architecture

The interpreter must follow this exact pipeline:

```text
source code -> tokenize(code) -> parse(tokens) -> AST -> evaluate(ast, env) -> value
```

Implementation expectations:

- **Tokenizer:** hand-written scanner that emits token objects such as `{ type: "number", value: 42 }`, `{ type: "identifier", value: "x" }`, and punctuation/operator tokens.
- **Parser:** recursive descent parser. No parser generators or external libraries.
- **AST:** plain JavaScript objects with explicit `type` fields, for example `{ type: "BinaryExpression", operator: "+", left, right }`.
- **Evaluator:** dispatches on AST `type` and follows the eval/apply pattern.
- **Environment:** `Frame` class with parent-chain lookup, `define`, `lookup`, and `assign`.
- **Functions:** closures capture their defining environment.
- **Returns:** represent non-local return flow with an internal signal object or internal `ReturnSignal` class; do not expose it as a user-level language value.
- **Errors:** throw clear `SyntaxError` or custom interpreter errors for unsupported syntax, unbound names, arity mismatch, and invalid assignment targets.

### Resolved Design Decisions

| Decision | Resolution | Rationale |
|----------|------------|-----------|
| Interpreter language | JavaScript subset only | Matches the approved spec and avoids reintroducing Scheme as the primary language. |
| Parser strategy | Recursive descent | Teachable, dependency-free, and explicit. |
| Dependencies | Zero external dependencies | Keeps practice runnable with plain Node 18+. |
| Environment model | `Frame` class with parent pointer | Preserves CS61A environment-diagram concepts. |
| Function representation | Closure object `{ params, body, env }` or class with equivalent fields | Makes lexical scope explicit. |
| Loop support | Excluded | Recursive functions are enough for Chapter 3 and keep parser scope controlled. |
| Classes | Excluded | Already covered in Chapter 2; would explode the interpreter scope. |
| Semicolons | Required in interpreted subset | Avoids teaching automatic semicolon insertion. |
| Native bridge | Minimal built-ins only | Permit simple built-ins like `print` only if exercises require them; otherwise keep pure evaluation. |
| Shared interpreter module | Do not create one initially | Students should build tokenizer/parser/evaluator inside 3.4 and 3.5 practice files. Extract later only if real duplication becomes painful. |

---

## 4. File Plan

### Knowledge Files (5)

Create:

```text
knowledge/cs61a-composing-programs/03-interpreting-computer-programs/
├── 3.1-introduction.md
├── 3.2-functional-programming.md
├── 3.3-exceptions.md
├── 3.4-interpreters-for-languages-with-combination.md
└── 3.5-interpreters-for-languages-with-abstraction.md
```

Each file follows the Chapter 1/2 template:

```markdown
# 3.X Section Title

> Based on [Composing Programs 3.X](https://composingprograms.com/pages/3X-....html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python/Scheme concepts to JavaScript.

## Key Concepts
- 4-7 bullets

## Content
### Subsections
Translated theory with JavaScript examples.

## Python/Scheme vs JavaScript Notes
Only where translation is non-obvious.
```

### Practice Files (10)

Create:

```text
practice/cs61a-composing-programs/03-interpreting-computer-programs/
├── 3.1-introduction/
│   ├── practice.js
│   └── solutions.js
├── 3.2-functional-programming/
│   ├── practice.js
│   └── solutions.js
├── 3.3-exceptions/
│   ├── practice.js
│   └── solutions.js
├── 3.4-interpreters-for-languages-with-combination/
│   ├── practice.js
│   └── solutions.js
└── 3.5-interpreters-for-languages-with-abstraction/
    ├── practice.js
    └── solutions.js
```

Every practice file:

- Uses ES module syntax only.
- Imports from `../../shared/...` as needed.
- Runs with `node path/to/practice.js`.
- Produces only `PASS`/`FAIL` assertion output.
- Must not crash, hang, throw uncaught exceptions, or depend on user input.
- Uses finite tests and finite parser inputs only.

### Learning Summary Updates

Update during implementation:

- `learning-summary/cs61a-composing-programs/PLAN.md` if session 17-22 objectives need enrichment after the content lands.
- `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md` to replace placeholder prompts for sessions 17-22.
- `learning-summary/cs61a-composing-programs/TODO.md` only if it needs status or prompt references for Chapter 3.
- `knowledge/cs61a-composing-programs/README.md` to mark Chapter 3 `In Progress` or `Complete`.
- `practice/cs61a-composing-programs/README.md` to mark Chapter 3 `In Progress` or `Complete`.

Do not create session artifacts (`learning-report.md`, `transcript.md`, `slides.html`) as part of the Chapter 3 rebuild unless separately requested. This plan only updates the course path and teacher prompts.

---

## 5. Safe-Stub Rules

Every `practice.js` must parse and run end-to-end before a student fills TODOs. A stub may fail assertions, but it must not cause `TypeError`, `ReferenceError`, `SyntaxError`, uncaught exceptions, or hangs.

Required safe-stub patterns:

- Functions used as values must exist and return `undefined` or a safe placeholder.
- Functions called by other tests must be callable, even when incomplete.
- Parser functions must return AST-shaped placeholders when downstream code inspects `.type`, `.left`, `.right`, `.body`, etc.
- Tokenizer functions must return arrays, not `undefined`.
- Evaluator stubs must return `undefined`, except where downstream code needs a callable or frame-shaped object.
- `Frame` stubs must include `define`, `lookup`, and `assign` methods. They may return `undefined` or fail assertions, but method calls must not throw accidentally.
- Function-value stubs must be callable or function-object-shaped when tests call them through `applyFunction`.
- Exception exercises must catch expected errors inside assertions. No uncaught error should escape practice execution.
- Recursive stubs must not recurse until implemented. Use safe finite placeholders.
- Any exercise that intentionally demonstrates a thrown error must use `await assertThrows(...)` or local `try/catch`.
- No practice test should depend on random values, timers, network access, file system access, or stdin.

For `solutions.js`:

- All assertions should pass.
- No assertion should rely on output order beyond the deterministic order of the file.
- Interpreter tests should include both positive and negative cases.

---

## 6. Exercise Design

### 3.1 Introduction (6 exercises)

Purpose: establish the pipeline from source text to tokens to AST to evaluation.

Expected imports:

```javascript
import { assertEqual } from "../../shared/helpers.js";
```

Exercise specs:

```javascript
// Exercise 1: Classify language pipeline phases
// TODO: Return ["source", "tokens", "ast", "value"] in evaluation order.
const pipeline = undefined;
assertEqual("Exercise 1: pipeline order", pipeline, ["source", "tokens", "ast", "value"]);

// Exercise 2: Token objects
// TODO: Return token objects for the expression "2 + 3".
function tokenizeSimpleExpression(source) { return []; }
assertEqual("Exercise 2: tokenize 2 + 3", tokenizeSimpleExpression("2 + 3"), [
  { type: "number", value: 2 },
  { type: "operator", value: "+" },
  { type: "number", value: 3 },
]);

// Exercise 3: AST node shape
// TODO: Return a BinaryExpression AST for 2 + 3.
function makeAdditionAst(leftValue, rightValue) { return { type: undefined }; }
assertEqual("Exercise 3: AST type", makeAdditionAst(2, 3).type, "BinaryExpression");
assertEqual("Exercise 3: AST operator", makeAdditionAst(2, 3).operator, "+");

// Exercise 4: Evaluate a tiny AST
// TODO: Evaluate NumberLiteral and BinaryExpression nodes for + only.
function evaluateTinyAst(node) { return undefined; }
const tinyAst = {
  type: "BinaryExpression",
  operator: "+",
  left: { type: "NumberLiteral", value: 2 },
  right: { type: "NumberLiteral", value: 3 },
};
assertEqual("Exercise 4: evaluate tiny AST", evaluateTinyAst(tinyAst), 5);

// Exercise 5: Eval/apply vocabulary
// TODO: Return the missing words in order.
const evalApply = undefined;
assertEqual("Exercise 5: eval/apply", evalApply, ["evaluate operator", "evaluate operands", "apply function"]);

// Exercise 6: Environment lookup
// TODO: Implement lookup(name, env) where env is a plain object for this intro exercise.
function lookup(name, env) { return undefined; }
assertEqual("Exercise 6: lookup x", lookup("x", { x: 10, y: 20 }), 10);
assertEqual("Exercise 6: lookup missing", lookup("z", { x: 10 }), undefined);
```

Safe-stub notes:

- `tokenizeSimpleExpression` returns `[]`.
- `makeAdditionAst` returns an object with a `.type` property.
- `evaluateTinyAst` returns `undefined`.

### 3.2 Functional Programming (7 exercises)

Purpose: translate Scheme-style functional programming into idiomatic functional JavaScript.

Expected imports:

```javascript
import { assertEqual } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";
import { EMPTY, link, first, rest, isEmpty, listFromArray, listToArray } from "../../shared/linked-list.js";
```

Exercise specs:

```javascript
// Exercise 1: Pure function
// TODO: Return a new array with each number doubled; do not mutate input.
function doubleAll(nums) { return []; }
const original = [1, 2, 3];
assertEqual("Exercise 1: doubleAll result", doubleAll(original), [2, 4, 6]);
assertEqual("Exercise 1: original unchanged", original, [1, 2, 3]);

// Exercise 2: Compose functions
// TODO: Return a function x => f(g(x)).
function compose(f, g) { return (x) => undefined; }
const add1ThenSquare = compose((x) => x * x, (x) => x + 1);
assertEqual("Exercise 2: compose", add1ThenSquare(4), 25);

// Exercise 3: Closure-based pair transform
// TODO: Return a pair with both elements transformed by fn.
function mapPair(p, fn) { return pair(undefined, undefined); }
const mappedPair = mapPair(pair(2, 3), (x) => x * 10);
assertEqual("Exercise 3: mapPair head", head(mappedPair), 20);
assertEqual("Exercise 3: mapPair tail", tail(mappedPair), 30);

// Exercise 4: Functional list map
// TODO: Recursively map over a linked list without mutation.
function mapFunctionalList(lst, fn) { return EMPTY; }
assertEqual("Exercise 4: map list", listToArray(mapFunctionalList(listFromArray([1, 2, 3]), x => x + 1)), [2, 3, 4]);

// Exercise 5: Symbolic expression representation
// TODO: Build an addition expression as data.
function addExpr(left, right) { return { type: undefined }; }
assertEqual("Exercise 5: addExpr", addExpr("x", 3), { type: "add", left: "x", right: 3 });

// Exercise 6: Evaluate symbolic arithmetic
// TODO: Evaluate number literals and add/mul expression objects.
function evalSymbolic(expr) { return undefined; }
const symbolic = { type: "mul", left: { type: "add", left: 2, right: 3 }, right: 4 };
assertEqual("Exercise 6: eval symbolic", evalSymbolic(symbolic), 20);

// Exercise 7: Substitute symbols
// TODO: Replace string symbols using env, recursively through add/mul expression objects.
function substitute(expr, env) { return expr; }
const expr = { type: "add", left: "x", right: { type: "mul", left: "y", right: 2 } };
assertEqual("Exercise 7: substitute", substitute(expr, { x: 10, y: 5 }), { type: "add", left: 10, right: { type: "mul", left: 5, right: 2 } });
```

Safe-stub notes:

- List stubs return `EMPTY`.
- Pair stubs return `pair(undefined, undefined)`.
- Symbolic expression stubs return objects, not `undefined`, when properties are asserted.

### 3.3 Exceptions (7 exercises)

Purpose: make error handling explicit before interpreter error reporting.

Expected imports:

```javascript
import { assertEqual, assertThrows } from "../../shared/helpers.js";
```

Use top-level `await` where needed. Node 18 ES modules support it.

Exercise specs:

```javascript
// Exercise 1: Throw on invalid input
// TODO: Return n / d, but throw Error("division by zero") when d is 0.
function safeDivide(n, d) { return undefined; }
assertEqual("Exercise 1: safeDivide", safeDivide(10, 2), 5);
await assertThrows("Exercise 1: divide by zero", () => safeDivide(10, 0), "division by zero");

// Exercise 2: Catch and recover
// TODO: Return fallback when fn throws; otherwise return fn().
function withFallback(fn, fallback) { return undefined; }
assertEqual("Exercise 2: no error", withFallback(() => 42, 0), 42);
assertEqual("Exercise 2: fallback", withFallback(() => { throw new Error("boom"); }, 0), 0);

// Exercise 3: finally behavior
// TODO: Push "try", "catch", "finally" in the correct order and return the log.
function traceTryCatchFinally(shouldThrow) { return []; }
assertEqual("Exercise 3: no throw", traceTryCatchFinally(false), ["try", "finally"]);
assertEqual("Exercise 3: throw", traceTryCatchFinally(true), ["try", "catch", "finally"]);

// Exercise 4: Custom error subclass
// TODO: Define InterpreterError extends Error with name "InterpreterError".
class InterpreterError extends Error {
  constructor(message) {
    super(message);
    this.name = undefined;
  }
}
const err = new InterpreterError("unbound name: x");
assertEqual("Exercise 4: error name", err.name, "InterpreterError");
assertEqual("Exercise 4: instanceof Error", err instanceof Error, true);

// Exercise 5: Assertion helper use
// TODO: Throw InterpreterError when name is missing from env.
function lookupOrThrow(name, env) { return undefined; }
assertEqual("Exercise 5: lookup", lookupOrThrow("x", { x: 10 }), 10);
await assertThrows("Exercise 5: missing name", () => lookupOrThrow("y", { x: 10 }), "unbound name");

// Exercise 6: Parse error reporting
// TODO: Throw SyntaxError with the unexpected token value in the message.
function expectToken(actual, expectedValue) { return undefined; }
assertEqual("Exercise 6: matching token", expectToken({ value: ")" }, ")"), ")");
await assertThrows("Exercise 6: unexpected token", () => expectToken({ value: "+" }, ")"), "expected )");

// Exercise 7: Error boundary for a tiny evaluator
// TODO: Return { ok: true, value } or { ok: false, error } without throwing.
function runSafely(fn) { return { ok: false, error: undefined }; }
assertEqual("Exercise 7: run success", runSafely(() => 5), { ok: true, value: 5 });
assertEqual("Exercise 7: run failure", runSafely(() => { throw new Error("bad"); }), { ok: false, error: "bad" });
```

Safe-stub notes:

- Any intentionally throwing behavior must be wrapped by `assertThrows`.
- `safeDivide(10, 2)` must not throw in the stub.
- `runSafely` returns a result object in both practice and solution.

### 3.4 Interpreters for Languages with Combination (8 exercises)

Purpose: build a small calculator interpreter with an S-expression surface syntax. This mirrors the original calculator interpreter while staying in JavaScript implementation.

Calculator language examples:

```text
(+ 1 2)
(* (+ 1 2) 4)
(- 10 3 2)
(/ 20 2 2)
```

Expected imports:

```javascript
import { assertEqual, assertThrows } from "../../shared/helpers.js";
```

AST shape:

```javascript
{ type: "NumberLiteral", value: 3 }
{ type: "CallExpression", operator: "+", operands: [ast1, ast2] }
```

Exercise specs:

```javascript
// Exercise 1: Tokenize calculator source
// TODO: Split parentheses, operators, and numbers into token strings.
function tokenizeCalculator(source) { return []; }
assertEqual("Exercise 1: tokenize", tokenizeCalculator("(+ 1 (* 2 3))"), ["(", "+", "1", "(", "*", "2", "3", ")", ")"]);

// Exercise 2: Parse numbers
// TODO: Parse one numeric token into a NumberLiteral AST.
function parseNumberToken(token) { return { type: undefined, value: undefined }; }
assertEqual("Exercise 2: parse number", parseNumberToken("42"), { type: "NumberLiteral", value: 42 });

// Exercise 3: Parse complete calculator expression
// TODO: Recursive descent parser for prefix S-expressions.
function parseCalculator(source) { return { type: undefined, operator: undefined, operands: [] }; }
assertEqual("Exercise 3: parse type", parseCalculator("(+ 1 2)").type, "CallExpression");
assertEqual("Exercise 3: parse operator", parseCalculator("(+ 1 2)").operator, "+");
assertEqual("Exercise 3: operand count", parseCalculator("(+ 1 2)").operands.length, 2);

// Exercise 4: Evaluate number literal
// TODO: Evaluate NumberLiteral.
function evaluateCalculator(ast) { return undefined; }
assertEqual("Exercise 4: evaluate literal", evaluateCalculator({ type: "NumberLiteral", value: 7 }), 7);

// Exercise 5: Apply primitive operators
// TODO: Implement +, -, *, / with variable arity.
function applyCalculatorOperator(operator, args) { return undefined; }
assertEqual("Exercise 5: add", applyCalculatorOperator("+", [1, 2, 3]), 6);
assertEqual("Exercise 5: subtract", applyCalculatorOperator("-", [10, 3, 2]), 5);
assertEqual("Exercise 5: multiply", applyCalculatorOperator("*", [2, 3, 4]), 24);
assertEqual("Exercise 5: divide", applyCalculatorOperator("/", [20, 2, 2]), 5);

// Exercise 6: Evaluate nested call expressions
// TODO: Recursively evaluate operands, then apply the operator.
assertEqual("Exercise 6: nested eval", evaluateCalculator({
  type: "CallExpression",
  operator: "*",
  operands: [
    { type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] },
    { type: "NumberLiteral", value: 4 },
  ],
}), 12);

// Exercise 7: End-to-end calculator
// TODO: Compose tokenize -> parse -> evaluate.
function runCalculator(source) { return undefined; }
assertEqual("Exercise 7: run calculator", runCalculator("(* (+ 1 2) (- 10 6))"), 12);

// Exercise 8: Calculator syntax and operator errors
// TODO: Throw SyntaxError for malformed input and Error for unknown operator.
await assertThrows("Exercise 8: syntax error", () => runCalculator("(+ 1 2"), "expected");
await assertThrows("Exercise 8: unknown operator", () => runCalculator("(% 10 3)"), "unknown operator");
```

Safe-stub notes:

- `parseCalculator` returns `{ type: undefined, operands: [] }` if downstream tests inspect `operands.length`; do not return bare `undefined`.
- `runCalculator` may return `undefined` for positive tests, but must catch or throw only inside `assertThrows` negative tests.
- Parser recursion must always consume tokens or throw; never loop while waiting for a token that was not consumed.

### 3.5 Interpreters for Languages with Abstraction (10 exercises)

Purpose: build the pinned JavaScript-subset interpreter.

Expected imports:

```javascript
import { assertEqual, assertThrows } from "../../shared/helpers.js";
```

Required public functions/classes inside the practice file:

```javascript
class Frame { ... }
function tokenize(code) { ... }
function parse(tokens) { ... }
function evaluate(node, env) { ... }
function run(code, env = createGlobalFrame()) { ... }
function createGlobalFrame() { ... }
```

Exercise specs:

```javascript
// Exercise 1: Frame lookup and definition
// TODO: Implement define(name, value), lookup(name), assign(name, value).
class Frame {
  constructor(parent = null) {
    this.parent = parent;
    this.bindings = new Map();
  }
  define(name, value) { return undefined; }
  lookup(name) { return undefined; }
  assign(name, value) { return undefined; }
}
const global = new Frame();
global.define("x", 10);
assertEqual("Exercise 1: lookup local", global.lookup("x"), 10);
const child = new Frame(global);
assertEqual("Exercise 1: lookup parent", child.lookup("x"), 10);
child.assign("x", 20);
assertEqual("Exercise 1: assign parent", global.lookup("x"), 20);

// Exercise 2: Tokenize JS subset
// TODO: Emit token objects for numbers, strings, identifiers, keywords, operators, punctuation.
function tokenize(code) { return []; }
assertEqual("Exercise 2: tokenize let", tokenize("let x = 42;").map(t => t.value), ["let", "x", "=", 42, ";"]);
assertEqual("Exercise 2: tokenize comparison", tokenize("x <= 10").map(t => t.value), ["x", "<=", 10]);

// Exercise 3: Parse literals and binary expressions
// TODO: Recursive descent parser with precedence for arithmetic/comparison/logical operators.
function parse(tokens) { return { type: undefined, body: [] }; }
assertEqual("Exercise 3: parse program", parse(tokenize("1 + 2 * 3;")).type, "Program");
assertEqual("Exercise 3: parse statement count", parse(tokenize("1 + 2 * 3;")).body.length, 1);

// Exercise 4: Evaluate literals and binary expressions
// TODO: Evaluate Program, ExpressionStatement, literals, unary, binary, logical expressions.
function evaluate(node, env) { return undefined; }
function run(code, env = createGlobalFrame()) { return undefined; }
function createGlobalFrame() { return new Frame(); }
assertEqual("Exercise 4: arithmetic", run("1 + 2 * 3;"), 7);
assertEqual("Exercise 4: comparison", run("3 * 4 === 12;"), true);

// Exercise 5: Variables and assignment
// TODO: Implement let declarations, identifier lookup, and assignment.
assertEqual("Exercise 5: let and lookup", run("let x = 10; x;"), 10);
assertEqual("Exercise 5: assignment", run("let x = 10; x = x + 5; x;"), 15);

// Exercise 6: Blocks and if/else
// TODO: Implement BlockStatement with child frames and IfStatement.
assertEqual("Exercise 6: if true", run("let x = 1; if (x < 2) { x = 10; } else { x = 20; } x;"), 10);
assertEqual("Exercise 6: block scope", run("let x = 1; { let x = 2; } x;"), 1);

// Exercise 7: Function declarations and calls
// TODO: Implement function declarations, call expressions, lexical closure env, parameter binding.
assertEqual("Exercise 7: function call", run("function add(a, b) { return a + b; } add(2, 3);"), 5);

// Exercise 8: Arrow functions
// TODO: Implement arrow function expressions with expression body and block body.
assertEqual("Exercise 8: arrow expression", run("let inc = (x) => x + 1; inc(4);"), 5);
assertEqual("Exercise 8: arrow block", run("let twice = (x) => { return x * 2; }; twice(6);"), 12);

// Exercise 9: Recursion through environment lookup
// TODO: Support recursive named functions without loops.
assertEqual("Exercise 9: recursive factorial", run("function fact(n) { if (n <= 1) { return 1; } else { return n * fact(n - 1); } } fact(5);"), 120);

// Exercise 10: Interpreter errors
// TODO: Throw clear errors for unbound names, arity mismatch, unsupported syntax, and invalid assignment.
await assertThrows("Exercise 10: unbound name", () => run("missing;"), "unbound");
await assertThrows("Exercise 10: arity mismatch", () => run("function f(x) { return x; } f(1, 2);"), "arity");
await assertThrows("Exercise 10: no loops", () => run("while (true) { }"), "unsupported");
await assertThrows("Exercise 10: invalid assignment", () => run("1 = 2;"), "assignment");
```

Safe-stub notes:

- `Frame` methods exist from the start.
- `tokenize` returns `[]`.
- `parse` returns `{ type: undefined, body: [] }`.
- `createGlobalFrame` returns a `Frame`.
- `run` returns `undefined` for positive assertions until implemented.
- Negative tests must be written so the practice stub does not throw unless inside `assertThrows`. If a stub does not throw, `assertThrows` reports `FAIL` safely.

Implementation guidance for 3.5:

- Use a parser object with `peek`, `advance`, `match`, `expect`, and precedence-specific parse functions.
- Parse precedence in this order: assignment, logical OR, logical AND, equality, comparison, additive, multiplicative, unary, call, primary.
- Treat `let`, `function`, `if`, `else`, `return`, `true`, `false`, `null` as keywords.
- Block evaluation creates a new child `Frame`, except function bodies already execute in a call frame whose parent is the captured closure environment.
- Assignment should update the nearest frame where the name exists, not always the current frame.
- Function declarations should define the function name in the current frame before the body is evaluated, enabling recursion.
- Return statements should throw or return an internal signal that is intercepted by function application only.
- Truthiness can follow JavaScript truthiness for primitive subset values.

---

## 7. Chunk Plan

### Chunk 1: Chapter 3 Structure and Status Gates

**Tasks:** 1-2

**Owned files:**

- `knowledge/cs61a-composing-programs/README.md`
- `practice/cs61a-composing-programs/README.md`
- New Chapter 3 directories under `knowledge/` and `practice/`

**Steps:**

- [ ] Create `knowledge/cs61a-composing-programs/03-interpreting-computer-programs/`.
- [ ] Create practice section directories for 3.1 through 3.5.
- [ ] Update knowledge README Chapter 3 status to `In Progress`.
- [ ] Update practice README Chapter 3 status to `In Progress`.
- [ ] Do not change Chapter 1 or Chapter 2 statuses.

**Validation:**

```bash
ls knowledge/cs61a-composing-programs/03-interpreting-computer-programs
ls practice/cs61a-composing-programs/03-interpreting-computer-programs
grep -n "Interpreting Computer Programs" knowledge/cs61a-composing-programs/README.md practice/cs61a-composing-programs/README.md
```

**Commit:** `chore: scaffold CS61A Chapter 3 directories`

**Parallelizable:** No. This is the setup gate.

---

### Chunk 2: Knowledge Files 3.1-3.3

**Tasks:** 3-5

**Owned files:**

- `knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction.md`
- `knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.2-functional-programming.md`
- `knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.3-exceptions.md`

**Steps:**

- [ ] Write 3.1 with source pipeline, syntax vs semantics, ASTs, eval/apply, and environment lookup.
- [ ] Write 3.2 with functional JS, purity, closures, symbolic data, expression-as-data examples.
- [ ] Write 3.3 with JS exception semantics, custom `Error` classes, propagation, and interpreter-oriented error handling.
- [ ] Include attribution and CC BY-SA 3.0 note in all files.
- [ ] Include Python/Scheme vs JavaScript notes only where translation is non-obvious.

**Validation:**

```bash
ls knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.{1,2,3}*.md
grep -c "CC BY-SA 3.0" knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.{1,2,3}*.md
grep -c "Translated" knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.{1,2,3}*.md
```

**Commit:** `docs: add CS61A 3.1-3.3 knowledge files`

**Parallelizable:** Yes. The three files are independent.

---

### Chunk 3: Knowledge Files 3.4-3.5

**Tasks:** 6-7

**Owned files:**

- `knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination.md`
- `knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction.md`

**Steps:**

- [ ] Write 3.4 around tokenizer, recursive descent parsing, calculator ASTs, primitive operator application, and evaluation.
- [ ] Write 3.5 around the pinned JavaScript subset, recursive descent parser, `Frame` environment model, eval/apply, closures, return handling, and interpreter errors.
- [ ] Explicitly state the 3.5 exclusions: no classes, loops, async, destructuring, imports/exports, arrays/objects syntax, `this`, or `new`.
- [ ] Include clear AST shape examples and a full interpreter pipeline diagram in text.
- [ ] Include attribution and CC BY-SA 3.0 note in both files.

**Validation:**

```bash
ls knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.{4,5}*.md
grep -n "tokenize.*parse.*evaluate" knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction.md
grep -n "Frame" knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction.md
grep -n "No classes\\|no classes" knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction.md
```

**Commit:** `docs: add CS61A 3.4-3.5 interpreter knowledge files`

**Parallelizable:** Yes, but 3.5 should be reviewed by the chunk owner after 3.4 vocabulary is final.

---

### Chunk 4: Practice Files 3.1-3.3

**Tasks:** 8-10

**Owned files:**

- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction/{practice.js,solutions.js}`
- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.2-functional-programming/{practice.js,solutions.js}`
- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.3-exceptions/{practice.js,solutions.js}`

**Steps:**

- [ ] Implement the 3.1 practice and solution files exactly from the exercise spec.
- [ ] Implement the 3.2 practice and solution files exactly from the exercise spec.
- [ ] Implement the 3.3 practice and solution files exactly from the exercise spec, using top-level `await` for `assertThrows`.
- [ ] Ensure all practice stubs fail safely without uncaught exceptions.
- [ ] Ensure all solution assertions pass.

**Validation:**

```bash
for d in 3.1-introduction 3.2-functional-programming 3.3-exceptions; do
  echo "=== $d/solutions.js ==="
  node "practice/cs61a-composing-programs/03-interpreting-computer-programs/$d/solutions.js"
done

for d in 3.1-introduction 3.2-functional-programming 3.3-exceptions; do
  echo "=== $d/practice.js ==="
  node "practice/cs61a-composing-programs/03-interpreting-computer-programs/$d/practice.js" >/tmp/ch3-practice.out 2>/tmp/ch3-practice.err || true
  test ! -s /tmp/ch3-practice.err
  grep -Eq "^(PASS|FAIL):" /tmp/ch3-practice.out
done
```

**Commit:** `feat: add CS61A 3.1-3.3 practice and solutions`

**Parallelizable:** Yes. The three section directories are independent.

---

### Chunk 5: Calculator Interpreter Practice 3.4

**Tasks:** 11

**Owned files:**

- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination/practice.js`
- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination/solutions.js`

**Steps:**

- [ ] Implement calculator tokenization for parentheses, operators, and numbers.
- [ ] Implement recursive descent parsing for S-expression call syntax.
- [ ] Implement AST evaluation for `NumberLiteral` and `CallExpression`.
- [ ] Implement primitive operator application for `+`, `-`, `*`, `/`.
- [ ] Implement `runCalculator(source)` as tokenize -> parse -> evaluate.
- [ ] Add syntax and unknown-operator error tests with `assertThrows`.
- [ ] Keep practice stubs shape-safe.

**Validation:**

```bash
node practice/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination/solutions.js
node practice/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination/practice.js >/tmp/ch34-practice.out 2>/tmp/ch34-practice.err || true
test ! -s /tmp/ch34-practice.err
grep -Eq "^(PASS|FAIL):" /tmp/ch34-practice.out
```

**Commit:** `feat: add CS61A 3.4 calculator interpreter practice`

**Parallelizable:** No. Tokenizer, parser, and evaluator are coupled and should be implemented/reviewed together.

---

### Chunk 6: JavaScript-Subset Interpreter Practice 3.5

**Tasks:** 12

**Owned files:**

- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction/practice.js`
- `practice/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction/solutions.js`

**Steps:**

- [ ] Implement `Frame` with parent-chain `define`, `lookup`, and `assign`.
- [ ] Implement tokenizer for literals, identifiers, keywords, operators, punctuation, strings, and comments if included.
- [ ] Implement recursive descent parser for the pinned subset.
- [ ] Implement AST evaluator for programs, statements, expressions, frames, functions, calls, blocks, conditionals, and returns.
- [ ] Implement function declarations and arrow functions as lexical closures.
- [ ] Implement recursive named functions.
- [ ] Implement clear errors for unbound names, arity mismatch, unsupported syntax, invalid assignment targets, and syntax errors.
- [ ] Explicitly reject unsupported constructs such as `while`, `for`, `class`, `async`, `await`, `import`, `export`, `new`, and `this`.
- [ ] Keep practice stubs shape-safe and finite.

**Validation:**

```bash
node practice/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction/solutions.js
node practice/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction/practice.js >/tmp/ch35-practice.out 2>/tmp/ch35-practice.err || true
test ! -s /tmp/ch35-practice.err
grep -Eq "^(PASS|FAIL):" /tmp/ch35-practice.out
```

**Commit:** `feat: add CS61A 3.5 JavaScript subset interpreter practice`

**Parallelizable:** No. This is the highest-risk chunk and should have one owner.

---

### Chunk 7: Learning Summary Updates

**Tasks:** 13-14

**Owned files:**

- `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md`
- `learning-summary/cs61a-composing-programs/PLAN.md` if enrichment is needed
- `learning-summary/cs61a-composing-programs/TODO.md` if status references are needed
- `knowledge/cs61a-composing-programs/README.md`
- `practice/cs61a-composing-programs/README.md`

**Steps:**

- [ ] Replace placeholder prompts for sessions 17-22 with full teacher-agent prompts.
- [ ] Keep session numbering exactly 17-22.
- [ ] Make session 17 reference 3.1 knowledge and practice.
- [ ] Make session 18 reference 3.2 knowledge and practice.
- [ ] Make session 19 reference 3.3 knowledge and practice.
- [ ] Make session 20 reference 3.4 knowledge and practice.
- [ ] Make session 21 reference 3.5 knowledge and practice, including the pinned interpreter subset.
- [ ] Make session 22 run all Chapter 3 solutions and test interpreter understanding.
- [ ] Update README status for Chapter 3 to `Complete` only after files and validation pass.

**Prompt requirements:**

- Prompts must ask the teacher agent to guide with questions and not give away answers immediately.
- Prompts must reference exact knowledge and practice paths.
- 3.5 prompt must mention tokenizer -> parser -> evaluator, `Frame`, lexical scope, recursive descent, and excluded syntax.
- Review prompt must ask the learner to predict outputs before running code.

**Validation:**

```bash
grep -n "## Session 1[7-9]\\|## Session 2[0-2]" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
grep -n "3.5-interpreters-for-languages-with-abstraction" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
grep -n "tokenize.*parse.*evaluate\\|Frame\\|recursive descent" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
grep -n "Interpreting Computer Programs.*Complete" knowledge/cs61a-composing-programs/README.md practice/cs61a-composing-programs/README.md
```

**Commit:** `docs: add CS61A Chapter 3 session prompts and status`

**Parallelizable:** No. This should happen after practice paths and names are final.

---

### Chunk 8: Full Chapter 1-3 Validation and Final Commit Check

**Tasks:** 15

**Owned files:** No new files unless validation reveals a Chapter 3 defect.

**Steps:**

- [ ] Run every Chapter 1, Chapter 2, and Chapter 3 `solutions.js`.
- [ ] Run every Chapter 3 `practice.js` and confirm safe-stub behavior.
- [ ] Confirm Chapter 3 file counts.
- [ ] Confirm attribution in all Chapter 3 knowledge files.
- [ ] Confirm no external dependencies were introduced.
- [ ] Confirm no implementation file accidentally uses CommonJS.
- [ ] Confirm git diff only contains expected Chapter 3 and structural-path changes.

**Validation commands:**

```bash
# All Chapter 1-3 solutions should pass.
for f in practice/cs61a-composing-programs/0{1,2,3}-*/*/solutions.js; do
  echo "=== $f ==="
  node "$f" || exit 1
done

# Chapter 3 practice files should fail safely, not crash.
for f in practice/cs61a-composing-programs/03-interpreting-computer-programs/*/practice.js; do
  echo "=== $f ==="
  node "$f" >/tmp/ch3-practice.out 2>/tmp/ch3-practice.err || true
  test ! -s /tmp/ch3-practice.err || { cat /tmp/ch3-practice.err; exit 1; }
  grep -Eq "^(PASS|FAIL):" /tmp/ch3-practice.out || { cat /tmp/ch3-practice.out; exit 1; }
done

# File counts.
test "$(ls knowledge/cs61a-composing-programs/03-interpreting-computer-programs/*.md | wc -l | tr -d ' ')" = "5"
test "$(ls practice/cs61a-composing-programs/03-interpreting-computer-programs/*/practice.js | wc -l | tr -d ' ')" = "5"
test "$(ls practice/cs61a-composing-programs/03-interpreting-computer-programs/*/solutions.js | wc -l | tr -d ' ')" = "5"

# Attribution.
grep -L "CC BY-SA 3.0" knowledge/cs61a-composing-programs/03-interpreting-computer-programs/*.md

# ES module only.
grep -R "module.exports\\|require(" practice/cs61a-composing-programs/03-interpreting-computer-programs && exit 1 || true

# Dependency check.
git diff -- package.json package-lock.json pnpm-lock.yaml yarn.lock
```

**Commit:** `chore: validate CS61A Chapter 3 rebuild`

**Parallelizable:** No. This is the final sequential gate.

---

## 8. Chunk Execution Order

```text
Chunk 1 (structure/status gates)
        |
        +--> Chunk 2 (knowledge 3.1-3.3) --+
        |                                   |
        +--> Chunk 3 (knowledge 3.4-3.5) --+  knowledge chunks can run in parallel
                                            |
        +--> Chunk 4 (practice 3.1-3.3) ---+
        |
        +--> Chunk 5 (practice 3.4) -------- sequential within chunk
        |
        +--> Chunk 6 (practice 3.5) -------- highest-risk sequential chunk
                                            |
        Chunk 7 (learning-summary updates)
                                            |
        Chunk 8 (full Ch1-Ch3 validation)
```

Preferred order:

1. Complete Chunk 1.
2. Run Chunks 2 and 3 in parallel if separate workers are available.
3. Run Chunk 4 after the relevant knowledge vocabulary is stable.
4. Run Chunk 5 before Chunk 6 so calculator parser lessons inform the JS-subset parser.
5. Run Chunk 6 as a single-owner implementation.
6. Run Chunk 7 once paths and exercise names are final.
7. Run Chunk 8 before final status/merge.

---

## 9. Task List

- [ ] **Task 1:** Create Chapter 3 knowledge directory.
- [ ] **Task 2:** Create Chapter 3 practice section directories and mark Chapter 3 in progress.
- [ ] **Task 3:** Write 3.1 introduction knowledge file.
- [ ] **Task 4:** Write 3.2 functional programming knowledge file.
- [ ] **Task 5:** Write 3.3 exceptions knowledge file.
- [ ] **Task 6:** Write 3.4 calculator interpreter knowledge file.
- [ ] **Task 7:** Write 3.5 JavaScript-subset interpreter knowledge file.
- [ ] **Task 8:** Implement 3.1 practice and solutions.
- [ ] **Task 9:** Implement 3.2 practice and solutions.
- [ ] **Task 10:** Implement 3.3 practice and solutions.
- [ ] **Task 11:** Implement 3.4 calculator interpreter practice and solutions.
- [ ] **Task 12:** Implement 3.5 JavaScript-subset interpreter practice and solutions.
- [ ] **Task 13:** Expand learning-summary session prompts for sessions 17-22.
- [ ] **Task 14:** Update Chapter 3 status in knowledge/practice READMEs after validation.
- [ ] **Task 15:** Run full Chapter 1-3 validation and perform git hygiene checks.

---

## 10. Parallelization Plan

Safe parallel work:

- Knowledge 3.1, 3.2, and 3.3 can be written in parallel.
- Knowledge 3.4 and 3.5 can be drafted in parallel, but 3.5 should be reviewed against the pinned spec.
- Practice 3.1, 3.2, and 3.3 can be implemented in parallel after the exercise specs are accepted.

Do not parallelize:

- Directory/status setup with other chunks that assume directories exist.
- 3.4 tokenizer/parser/evaluator within the same file.
- 3.5 interpreter implementation.
- Learning-summary updates before practice paths are final.
- Final validation.

If using multiple subagents:

- Assign one subagent per disjoint file group.
- Require each subagent to report exact file paths changed.
- Merge by path, not by `git add -A`.
- Re-run full validation after all subagent work lands.

---

## 11. Validation Strategy

### Per-File Validation

- Markdown files exist and include title, attribution, key concepts, content, and JS translation notes.
- Practice files import only from `../../shared/...` or Node built-ins.
- Practice files run with only `PASS`/`FAIL` output.
- Solution files pass every assertion.

### Interpreter Validation

For 3.4:

- Tokenizes nested S-expressions.
- Parses nested calls.
- Evaluates nested arithmetic.
- Rejects malformed input.
- Rejects unknown operators.

For 3.5:

- Tokenizes multi-character operators before single-character operators.
- Parses operator precedence correctly.
- Evaluates block scope without leaking inner `let` bindings.
- Assignment updates parent frames when appropriate.
- Function closures capture lexical environment.
- Recursive named functions work.
- Arrow functions work with expression and block bodies.
- Unsupported syntax is rejected intentionally.
- Error messages include useful keywords like `unbound`, `arity`, `unsupported`, `assignment`, or `expected`.

### Full Validation

Run:

```bash
for f in practice/cs61a-composing-programs/0{1,2,3}-*/*/solutions.js; do
  node "$f" || exit 1
done

for f in practice/cs61a-composing-programs/03-interpreting-computer-programs/*/practice.js; do
  node "$f" >/tmp/ch3-practice.out 2>/tmp/ch3-practice.err || true
  test ! -s /tmp/ch3-practice.err || exit 1
  grep -Eq "^(PASS|FAIL):" /tmp/ch3-practice.out || exit 1
done
```

Expected:

- Every solution assertion prints `PASS`.
- Chapter 3 practice files may print `FAIL`, but never uncaught errors.
- No command hangs.

---

## 12. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3.5 interpreter scope grows beyond spec | Parser and evaluator become too large for course practice | Enforce pinned subset. Reject classes, loops, async, destructuring, imports, exports, arrays/objects syntax, `this`, and `new`. |
| Practice stubs crash before students can work | Breaks learning workflow | Apply safe-stub rules to every callable, AST, parser, `Frame`, and evaluator placeholder. |
| Parser infinite loop | Validation hangs | Every parse loop must consume a token or throw. Add finite tests only. |
| Tokenizer mishandles multi-character operators | Incorrect AST and confusing failures | Scan longest operators first: `===`, `!==`, `<=`, `>=`, `&&`, `||`, then single-character operators. |
| Scope behavior accidentally becomes dynamic | Mis-teaches environment model | Function values must capture defining environment. Function calls create a child of captured env, not caller env. |
| Block scope conflicts with function call frames | Incorrect `let` visibility | Blocks create child frames for ordinary blocks; function bodies execute in the call frame. |
| Return control flow leaks | Later statements run after `return` | Use internal return signal intercepted only by function application. |
| Negative tests throw outside `assertThrows` | Practice crashes | Wrap all intended error cases in `await assertThrows(...)`. |
| Chapter 3 edits disturb Chapter 1/2 | Regression | Path-scope edits and run all Chapter 1-3 solutions in final validation. |
| Existing dirty worktree causes accidental commit pollution | Unrelated changes committed | Use path-scoped `git add` only; never use global `git add -A`. |

---

## 13. Pre-Commit Checklist

Before each implementation commit:

- [ ] `git status --short` reviewed.
- [ ] Only expected paths changed.
- [ ] No unrelated dirty files staged.
- [ ] Staging used explicit paths only.
- [ ] Relevant solution files run and pass.
- [ ] Relevant practice files run safely.
- [ ] Markdown attribution present where applicable.
- [ ] No external dependency files changed.

Before the final Chapter 3 commit:

- [ ] 5 Chapter 3 knowledge files exist.
- [ ] 5 Chapter 3 practice directories exist.
- [ ] 5 Chapter 3 `practice.js` files exist.
- [ ] 5 Chapter 3 `solutions.js` files exist.
- [ ] Sessions 17-22 prompts are expanded.
- [ ] Chapter 3 README statuses are correct.
- [ ] All Chapter 1-3 solutions pass.
- [ ] All Chapter 3 practice files run safely.
- [ ] `git diff --cached --name-only` contains only intended Chapter 3/summary/status paths.

---

## 14. Git Hygiene

Use path-scoped staging. Examples:

```bash
git add knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction.md
git add practice/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction/practice.js practice/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction/solutions.js
git add learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
```

Do not use:

```bash
git add -A
git add .
```

Do not revert unrelated dirty files. If unrelated dirty files exist, ignore them unless they block validation.

Recommended commit sequence:

1. `chore: scaffold CS61A Chapter 3 directories`
2. `docs: add CS61A 3.1-3.3 knowledge files`
3. `docs: add CS61A 3.4-3.5 interpreter knowledge files`
4. `feat: add CS61A 3.1-3.3 practice and solutions`
5. `feat: add CS61A 3.4 calculator interpreter practice`
6. `feat: add CS61A 3.5 JavaScript subset interpreter practice`
7. `docs: add CS61A Chapter 3 session prompts and status`
8. `chore: validate CS61A Chapter 3 rebuild`

If the implementation is done in one branch by one worker, multiple chunks may be combined only when validation remains clear and commits stay reviewable.
