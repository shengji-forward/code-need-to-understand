# Session 02 — 1.2 Elements of Programming: Learning Report

**Completed**: 2026-06-01
**Source**: [Composing Programs 1.2](https://www.composingprograms.com/pages/12-elements-of-programming.html)

---

## Concept Map

Section 1.2 introduces five core ideas, each building on the last:

```
Three Language Mechanisms
       │
       ├──→ Primitive Expressions (numbers, strings, booleans, regex)
       ├──→ Means of Combination ──→ Call Expressions ──→ Nested Expression Trees
       └──→ Means of Abstraction ──→ Names (const/let) ──→ Environment
                                                              │
                                                              ▼
                                                   Pure vs Non-Pure Functions
```

| Node | One sentence | Key distinction |
|---|---|---|
| **Three mechanisms** | Every language feature is a primitive, a combination, or an abstraction | Lego bricks → snapping → labeling |
| **Call expressions** | Operator + operands, evaluated recursively | Three advantages over infix: arbitrary args, explicit nesting, unified notation |
| **Names & environment** | Bindings stored in the interpreter's in-memory lookup table | `const` (fixed) vs `let` (reassignable); snapshots, not live links |
| **Expression trees** | Evaluate operator → evaluate operands left-to-right → apply | Recursive procedure; stops at primitives and names |
| **Pure vs non-pure** | Pure returns values; non-pure has side effects | `console.log` returns `undefined` — breaks when nested |

---

## Objectives

- [x] Understand the three mechanisms of a programming language: primitives, combination, abstraction
- [x] Evaluate call expressions and trace nested expression trees
- [x] Use `const`/`let` for name bindings and understand the environment
- [x] Distinguish pure functions from non-pure functions
- [x] Complete all 5 practice exercises

---

## What You Learned

### 1. The Three Mechanisms of a Language

Every powerful programming language provides exactly three things:

| Mechanism | What it does | Example |
|---|---|---|
| **Primitive expressions** | Simplest building blocks | `42`, `true`, `"hello"`, `/\s+/` |
| **Means of combination** | Combine simple things into compound things | `Math.max(1, 2)`, `text.split(/\s+/)` |
| **Means of abstraction** | Name compound things for reuse as units | `const radius = 10` |

Analogy: Lego bricks (primitives), snapping them together (combination), labeling the assembly "door frame" (abstraction).

### 2. Call Expressions

A call expression applies a function to arguments:

```
Math.max(7.5, 9.5)
│────────│ │──────│
operator   operands
```

Evaluation: resolve operator to a function → evaluate operands left-to-right → apply function → return value.

Three advantages over infix notation:
- Arbitrary number of arguments (`Math.max(1, -2, 3, -4)`)
- Nesting is explicit in parentheses (`Math.max(Math.min(1, -2), 3)`)
- All math notation unifies to one form

### 3. Names and the Environment

`const` and `let` bind names to values. The **environment** is the interpreter's in-memory lookup table — lives in RAM, dies when the program exits.

| Keyword | Can reassign? | When to use |
|---|---|---|
| `const` | No | Default choice |
| `let` | Yes | Only when mutation is needed |

Critical detail: changing one name does NOT update other names defined in terms of it. `const area = Math.PI * r * r` captures a snapshot, not a live link.

**Destructuring swap:** `[a, b] = [b, a]` — array destructuring is idiomatic in JS. Object destructuring `({a, b} = {b, a})` also works but requires parens. Bare `a, b = b, a` doesn't work because JS comma operator is not Python tuple unpacking.

### 4. Expression Trees

The evaluation procedure is recursive:

1. Evaluate the operator (resolve to function)
2. Evaluate the operands left-to-right (may recurse into sub-expressions)
3. Apply the function to the resulting values

Recursion stops at primitives: numerals evaluate to the number they name, names evaluate to their binding in the environment.

### 5. Pure vs Non-Pure Functions

| | Pure | Non-Pure |
|---|---|---|
| Returns useful value? | Always | Maybe not (`console.log` → `undefined`) |
| Side effects? | None | Yes (printing, modifying state) |
| Same input → same output? | Always | Not guaranteed |
| Composable in nesting? | Yes | Dangerous |

The trap: `const two = console.log(2)` binds `undefined` to `two` — the print is a side effect, not a return value.

---

## Practice Exercises

All 5 exercises passed:

```text
PASS: call expression max
PASS: circumference
PASS: nested expression
PASS: typeof string
PASS: typeof boolean
PASS: sqrt returns number
```

Answers: `Math.max(3, 7, 1)`, `2 * pi * 10`, `Math.pow(2 + 3, 4 - 1)`, `typeof "hello"`, `typeof true`, `typeof Math.sqrt(16) === "number"`.

Exercise 5 combined three concepts in one line: call expression (`Math.sqrt(16)`) → typeof operator → strict equality comparison.

---

## Key Takeaways

1. **Three mechanisms frame everything** — primitives, combination, abstraction — every language feature fits one of these roles
2. **Call expressions are the workhorse** — operator + operands, evaluated recursively through expression trees
3. **`const` by default, `let` when needed** — bindings capture snapshots, not live links
4. **The environment is runtime memory** — lives in RAM, dies with the process, not disk or cache
5. **Pure functions compose, non-pure functions don't** — `console.log` returns `undefined`, so it breaks when nested

---

## What's Next

**Session 03 — Defining Functions (1.3)**
- Read: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md`
- Practice: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/practice.js`
- Objectives: Define functions with parameters and return values, trace calls through environment diagrams, understand scope and local name lookup
