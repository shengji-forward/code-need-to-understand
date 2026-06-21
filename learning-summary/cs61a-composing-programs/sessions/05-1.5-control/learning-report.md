# Session 05 — 1.5 Control: Learning Report

**Completed**: 2026-06-20
**Source**: [Composing Programs 1.5](https://www.composingprograms.com/pages/15-control.html)

---

## Concept Map

Section 1.5 gives programs two new powers: **choosing** (`if/else`) and **repeating** (`while`) — together, **control flow**.

```
Control Flow (choosing + repeating)
       │
       ├──→ Statements vs. expressions (expression statements discard values)
       ├──→ Compound statements — header + { } block
       ├──→ Conditionals — if / else if / else  (first match wins)
       ├──→ Iteration — while  (loop recipe: init · condition · update)
       ├──→ Truthiness — falsy list; [] and {} are TRUTHY in JS
       └──→ Testing — console.assert (logs) vs assertEqual (throws)
```

| Node | One sentence | Key distinction |
|---|---|---|
| **Statements vs. expressions** | statements *executed* (no value); expressions *evaluated* (yield a value) | an expression statement's value is **discarded** |
| **Compound statements** | header + `{ }` block; the header controls the block | `if`, `while`, `function` redirect control flow |
| **Conditionals** | `if / else if / else` — clauses checked in order, first truthy wins | boolean context; `===` for equality, never `=` |
| **Iteration (`while`)** | repeat a block while the header is truthy | loop recipe — forget the update ⇒ **infinite loop** |
| **Truthiness** | only 8 values are falsy; everything else is truthy | **`[]` and `{}` are truthy** in JS (falsy in Python) |
| **Testing** | verify behavior with assertions | `console.assert` logs; a throwing helper halts |

---

## Objectives

- [x] Distinguish statements from expressions (and the discarded-value trap)
- [x] Use `if / else if / else` conditionals and boolean operators
- [x] Write `while` loops using the init · condition · update recipe
- [x] Understand JS truthiness (the falsy list; `[]`/`{}` are truthy)
- [x] Use `%` for divisibility and combine conditions with `&&`/`||`/`!`
- [x] Complete all 6 practice exercises (18/18 checks passing)

---

## What You Learned

### 1. Statements vs. Expressions

An **expression** is *evaluated* and yields a value; a **statement** is *executed* and does something. An expression used as a statement is evaluated but its value is **discarded** — the classic trap (`x * x;` with no `return` ⇒ `undefined`; `counter + 1;` ⇒ no update). To keep a result you must **assign** or **return** it.

### 2. Compound Statements & Control Flow

A **compound statement** = header + `{ }` block (a **clause**). `if`, `while`, and `function` are compound — their headers control whether/how often the block runs and can **redirect flow** (later statements may never execute).

### 3. Conditional Statements

`if / else if / else`: clauses are checked **in order**; the **first truthy** header wins, the rest skipped; `else` runs only if all above were falsy. Comparison operators (`===`, `!==`, `>`, `<`, `>=`, `<=`) return booleans. Boolean operators `&&`, `||`, `!` **short-circuit** and return an operand (not always a boolean).

### 4. Iteration (`while`) — the Loop Recipe

Every `while` loop needs three ingredients: **init** (set up before), **condition** (`while (...)`), **update** (change state each pass — without it, an **infinite loop**). Two patterns practiced: the **accumulator** (`sumToN`) and the **sliding window** (`fibonacci`).

### 5. Truthiness

**Falsy:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. **Everything else is truthy** — including `[]` and `{}` (a key difference from Python). So test array emptiness with `items.length > 0`, not `if (items)`.

### 6. Testing

`console.assert(expr, "msg")` only **logs** on failure (doesn't halt); a custom `assertEqual(actual, expected, "msg")` helper **throws** to halt immediately — mirroring Python's `assert`. Write tests right after (or before) implementing.

---

## Practice Exercises

All 6 exercises passed (18/18 checks):

| # | Function | Solution | Concept + lesson |
|---|----------|----------|------------------|
| 1 | `absoluteValue(n)` | `if (n < 0) return -n; else return n;` | first `if/else`; **`!` vs `-`** (logical NOT vs arithmetic negation) |
| 2 | `classifyAngle(degrees)` | `if (<90)"acute" else if (===90)"right" else if (<180)"obtuse" else "straight"` | multi-branch; **`=` vs `===`**; **`<` vs `<=`** boundaries |
| 3 | `sumToN(n)` | `total=0,k=1; while(k<=n){total+=k;k++;} return total` | first loop — accumulator + loop recipe |
| 4 | `fibonacci(n)` | `if(n===0)return 0; pred=0,curr=1,k=1; while(k<n){[pred,curr]=[curr,pred+curr];k++;} return curr` | sliding window; **off-by-one** (match the test's indexing, don't copy-paste) |
| 5 | `countDigits(n)` | `if(n===0)return 1; c=0; while(n>0){n=Math.floor(n/10);c++;} return c` | edge case `n===0`; **numbers have no `.length`**; **`x+1` ≠ `x=x+1`** |
| 6 | `isLeapYear(year)` | `return (year%4===0 && year%100!==0) \|\| year%400===0;` | boolean logic (`%`, `&&`, `||`, `!==`); translating English to a condition |

---

## Key Takeaways

1. **Expression vs. assignment** — `x + 1` computes and discards; `x = x + 1` updates. (Bite-sized version of the `return` trap.)
2. **`if` = choice (≤1 run); `while` = loop (many runs)** — and `while` re-checks its header after every pass.
3. **Loop recipe: init · condition · update** — skip the update and you get an infinite loop.
4. **`===` always, never `=` or `==`** in conditions — `if (x = 5)` silently assigns and is always truthy.
5. **`!` flips truthiness; `-` flips sign** — two different operators that look related.
6. **Boundaries:** ask "which branch catches the exact edge value?" — `<` vs `<=` decides it.
7. **Truthiness:** `[]`/`{}` are **truthy** in JS — check `.length`, don't `if (array)`.
8. **Match the convention the tests expect** — the reading's example can use different indexing than the tests; don't blindly copy-paste (off-by-one).

---

## Recap & Self-Assessment (2026-06-21)

Worked through all five 1.5 concept areas in a Q&A recap:

| # | Concept | Result |
|---|---|---|
| 1 | Statements vs. expressions (discarded-value trap) | ✅ solid |
| 2 | Conditionals — `if/else if/else` (`=` vs `===`; `<` vs `<=`) | ✅ solid |
| 3 | Boolean operators & truthiness (`!` vs `-`; falsy list; `[]` truthy) | ✅ solid |
| 4 | `while` loops (loop recipe; accumulator vs. sliding window) | ✅ solid (minor: it's 1-vs-2 tracked values, not "linear/non-linear") |
| 5 | Testing (`console.assert` vs `assertEqual`) | ⚠️ partial — logs-vs-throws distinction |

**Refinements to lock in:**

1. **Expression statement** → value discarded; `return` or assign to keep it (`x + 1` ≠ `x = x + 1`).
2. **`if (x = 5)`** assigns (always truthy → always-true bug); use **`===`** to compare.
3. **Boundary:** strict **`<`** when the edge belongs to the *next* category.
4. **`!` flips truthiness** (returns a boolean); **`-` flips sign** (returns a number).
5. **`[]`/`{}` are truthy** in JS (falsy in Python) → test `.length`, not `if (array)`.
6. **Loop recipe:** init · condition · update — no update ⇒ infinite loop.
7. **Accumulator** = 1 running value; **sliding window** = 2 consecutive values that shift each step.
8. **`console.assert` logs (keeps running); `assertEqual` throws (halts)** — hence the helper.

---

## What's Next

**Session 06 — Higher-Order Functions (1.6)**
- Read: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md`
- Practice: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/practice.js`
- Objectives: Functions as **arguments** and **return values**, `map`/`filter`/`reduce` patterns, and how higher-order functions replace many explicit `while` loops. Also implement `isPrime` properly now that `while` is available (check divisors 2…√n). Builds directly on the control-flow and truthiness fundamentals from 1.5.
