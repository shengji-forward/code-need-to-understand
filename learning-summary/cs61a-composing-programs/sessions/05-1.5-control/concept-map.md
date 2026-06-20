# CS61A Concept Map — 1.5 Control

Use the **Big Picture** tree for orientation, the **Nodes** for teaching flow, and the **ASCII diagrams** + tables for relationships. Details live in tables (preview-friendly — no HTML in diagram labels).

Section 1.5 gives programs two powers they didn't have in 1.1–1.4: **choosing** (`if/else`) and **repeating** (`while`). Together = **control flow** — deciding *which* statements run and *how many times*.

---

## 1.5 Big Picture

```text
Control Flow  (choosing + repeating)
         │
         ├──→ Statements vs. expressions
         │         └── expression statements: evaluated, value DISCARDED
         │
         ├──→ Compound statements — header + { } block (= a clause)
         │
         ├──→ Conditionals — if / else if / else
         │         ├── boolean context; clauses checked in order, FIRST MATCH WINS
         │         └── comparison (===, !==, >, <) + boolean ops (&&, ||, !)
         │
         ├──→ Iteration — while
         │         └── loop recipe: INIT · CONDITION · UPDATE  (forget update → infinite loop)
         │
         ├──→ Truthiness
         │         ├── falsy: false, 0, -0, 0n, "", null, undefined, NaN
         │         └── [] and {} are TRUTHY in JS  (unlike Python — key gotcha)
         │
         └──→ Testing — console.assert (logs, no halt) vs assertEqual helper (throws)
```

**Recipe analogy** (extends 1.4's): so far recipes were a straight-line list of steps. 1.5 adds **decision points** ("*if* the steak is underdone, cook 2 more min") and **loops** ("*keep stirring* until smooth").

| Control structure | Kitchen meaning | Block runs… |
|---|---|---|
| `if/else` | a fork in the recipe | **at most once** (a choice) |
| `while` | "keep doing until done" | **many times** (a loop) |

---

### Node 1: Statements vs. expressions

| | Expression | Statement |
|---|---|---|
| Is… | *evaluated* | *executed* |
| Produces | a value | a change (side effect), no value |
| Examples | `2 + 2`, `x * x`, `Math.sqrt(9)` | `const x = 5`, `return x`, `if (...) {}` |

**The wrinkle — expression statements:** an expression can sit where a statement is expected; it's evaluated but its **value is discarded**:

```javascript
function square(x) {
  x * x;        // evaluated (→ 16) but DISCARDED — no return!
}
square(4);      // → undefined   (no `return` ⇒ default undefined)
```

**The recurring trap:** `x + 1;` (or `counter + 1;`) computes a value and throws it away — it does **not** update anything. To keep the result you must **assign** (`x = x + 1`) or **return** it. (This bug surfaced in `countDigits`.)

---

### Node 2: Compound statements

A **simple statement** is one operation (no block). A **compound statement** groups statements under a controlling header + `{ }` block. Header + block = a **clause**.

```javascript
<header> {
  <statement>
  <statement>
}
```

- `function`, `if/else if/else`, `while` are compound statements — their headers **control** whether/how often the block runs.
- Statements execute **in order**, but a control statement can **redirect flow** (so later statements may never run). `return`, `if`, `while` all redirect.

---

### Node 3: Conditional statements (`if / else if / else`)

```javascript
if (<expression>) {
  <suite>
} else if (<expression>) {
  <suite>
} else {
  <suite>
}
```

**Execution:** consider clauses **in order** — evaluate the header; if **truthy**, run that block and **skip the rest**. `else` runs only if every header above was falsy. → **first match wins.**

**Comparison operators** return booleans:

```javascript
4 < 2;       // false
5 >= 5;      // true
0 === -0;    // true      (=== strict equality — ALWAYS prefer over ==)
```

**Boolean operators** (`&&`, `||`, `!`) with **short-circuiting**:

| Expression | Evaluates to |
|---|---|
| `<left> && <right>` | left if left is falsy, else right |
| `<left> \|\| <right>` | left if left is truthy, else right |
| `!<expr>` | `true` if expr is falsy, else `false` |

**The two classic bugs seen in practice:**
- **`=` vs `===`** — `if (degrees = 90)` *assigns* 90 (truthy) → always true. Use `===` to compare.
- **`!` vs `-`** — `!n` flips *truthiness* (boolean); `-n` flips *sign* (arithmetic).

---

### Node 4: Iteration (`while`) — the loop recipe

```javascript
while (<expression>) {
  <block>        // runs while header is truthy; re-checked after every pass
}
```

Every `while` loop = **three ingredients** (forget one ⇒ broken):

| Ingredient | Role | If forgotten… |
|---|---|---|
| **Init** | set up state *before* the loop | wrong start |
| **Condition** | the `while (...)` test | wrong stopping point |
| **Update** | change state *inside* the body each pass | **infinite loop** |

**Accumulator pattern** (`sumToN`): one running total + a counter.

```javascript
let total = 0, k = 1;
while (k <= n) { total = total + k; k = k + 1; }
```

**Sliding-window pattern** (`fibonacci`): track **two** consecutive values; each pass compute `next = pred + curr` and slide.

```javascript
let pred = 0, curr = 1, k = 1;
while (k < n) { [pred, curr] = [curr, pred + curr]; k = k + 1; }
```

**Edge cases & off-by-one:** handle base cases explicitly (`fibonacci(0)`, `countDigits(0)`); a result "one step short" means the **init** or the **`<` vs `<=`** is off.

---

### Node 5: Truthiness (boolean context)

When JS evaluates a condition (`if`, `while`, `&&`, `||`, `!`), it treats each value as true-like or false-like.

**Falsy values (the full list):** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.

**The big JS-vs-Python gotcha:** empty collections are **truthy** in JS:

```javascript
if ([])  { /* RUNS — [] is truthy in JS (falsy in Python!) */ }
if ({})  { /* RUNS — {} is truthy in JS */ }
if ("")  { /* does NOT run — "" is falsy */ }
```

⇒ To test "is this array non-empty," use `if (items.length > 0)`, **not** `if (items)`.

**Short-circuit defaults:** `name || "Anonymous"` gives a fallback — but beware `0` is falsy, so `count || "none"` treats `0` as missing. Prefer `??` (nullish coalescing) when only `null`/`undefined` should trigger the default.

---

### Node 6: Testing

| Mechanism | On failure | Use |
|---|---|---|
| `console.assert(expr, "msg")` | **logs** the message, **keeps running** | quick checks (JS built-in) |
| `assertEqual(actual, expected, "msg")` helper | **throws**, halts execution | strict tests (mirrors Python's `assert`) |

Write tests **right after** implementing (or before). Unit tests double as documentation: they show how to call a function and what inputs are valid.

---

### 1.5 Quick reference

| Concept | One sentence |
|---|---|
| **Statement vs. expression** | statements are *executed* (no value); expressions are *evaluated* (yield a value) |
| **Expression statement** | an expression used as a statement — its value is discarded |
| **Compound statement** | header + `{ }` block (a clause); header controls the block |
| **`if / else if / else`** | choose a branch; first truthy header wins |
| **`while`** | repeat a block while the header is truthy |
| **Loop recipe** | init · condition · update (no update ⇒ infinite loop) |
| **Truthiness** | only `false 0 -0 0n "" null undefined NaN` are falsy; `[]`/`{}` are truthy |
| **`===` vs `==`** | always use strict `===` (no type coercion) |
| **`&&` `\|\|` `!`** | boolean operators; short-circuit; return an operand, not always a boolean |
| **Testing** | `console.assert` logs; a throwing `assertEqual` halts |

---

## Bridge: 1.4 → 1.5 → 1.6

| 1.4 idea | 1.5 extends it | 1.6 (Higher-Order Functions) will add |
|----------|----------------|----------------------------------------|
| Functions hide *what* from *how* | `if`/`while` let the **body** choose & repeat | functions as **arguments** and **return values** |
| `clamp` deferred conditionals | now you have `if/else` — and could rewrite `clamp` with them | `map`/`filter`/`reduce` replace many explicit loops |
| `isPrime` needed a loop | `while` makes it possible (check divisors 2…√n) | recursion (1.7) is another way to repeat |

**1.6 (Higher-Order Functions)** will show that loops are often better expressed by *passing functions to functions* (`map`, `filter`) — but the control-flow fundamentals from 1.5 (`if`, `while`, truthiness) are the bedrock underneath.
