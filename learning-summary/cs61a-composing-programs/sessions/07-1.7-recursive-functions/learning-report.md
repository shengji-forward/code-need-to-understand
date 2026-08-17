# Session 07 — 1.7 Recursive Functions: Learning Report

**Concepts & practice completed**: by 2026-08-03 (practice-file date; exact session date unrecorded)
**Practice**: 7/7 exercises, 15/15 checks passing — verified by re-run 2026-08-17
**Source**: [Composing Programs 1.7](https://www.composingprograms.com/pages/17-recursive-functions.html)
**Knowledge file**: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions.md`

> **Provenance note (2026-08-17):** this report was backfilled after the fact — the session's private learner report was never written at the time. It is reconstructed from three honest sources: (1) the public `transcript.md` (what was taught), (2) `practice.js` (the learner's own completed work, self-solved), and (3) the **Chapter 1 retrieval recap of 2026-08-17** (`../08-ch1-review/learning-report.md`), which directly verified 1.7 mastery ~2 weeks after the practice. No contemporaneous notes existed, so no session-day mistakes are invented here.

---

## Concept Map

Recursion = a function solving a problem by **solving a smaller version of itself**. No new machinery — it is the Session-03 call rule (every call → a fresh local frame) applied by a function *to itself*. Full map: see `concept-map.md` in this folder.

```
BASE CASE      ← the simplest input, answered directly (STOP)
RECURSIVE STEP ← call self on a SMALLER input, combine the answer
        │
        ▼
CALL STACK     frames stack up while calls wait → unwind as answers return
```

**The two questions that read any recursive function:** *What is the base case? What gets smaller?*

---

## Objectives

- [x] Write recursive functions with a proper **base case** and **recursive step**
- [x] Trace the **call stack**: frames stack while calls wait, then **unwind** as values return
- [x] Apply the **recursive leap of faith** (trust the smaller call; don't expand it)
- [x] Compare **iteration vs recursion** (accumulator variables vs waiting frames)
- [x] Explain **mutual recursion** (`isEven`/`isOdd` — two functions, one counter going down)
- [x] Distinguish **printing vs returning** (`cascade`, `badSquare` → NaN)
- [x] Explain **tree recursion** (2+ calls per invocation → branching; `fibonacci`)
- [x] Work through **counting partitions** (include/exclude choice — decision branching)
- [x] Know the **stack limit** (`RangeError`), that JS proper tail calls are **not implemented** in Node/V8, and that deep production recursion wants a loop or **trampolining**
- [x] Complete the **practice exercises** — **7/7, 15/15 checks**, self-solved

---

## What You Learned

### 1. The shape of recursion
Every recursive function = **base case** (simplest input, direct answer, no recursion) + **recursive step** (call self on smaller input, combine). Missing either fails differently: no base case → infinite calls → stack overflow; step that doesn't shrink → the base case is never reached.

### 2. The call stack is just Session 03 again
`sumDigits(738)` → `sumDigits(73) + 8` → `sumDigits(7) + 3` → base case returns `7` → unwind: `7+3=10`, `10+8=18`. The stack **grows while calls wait, shrinks as answers return**. Each frame holds its own `n` — the same "fresh frame per call" rule from closures.

### 3. The recursive leap of faith
When *checking* code, don't expand every future call — ask: *if `factorial(n-1)` already works, does this line compute `factorial(n)`?* That's induction: base case ✓ + correct step ✓ ⇒ correct everywhere. (Reading = trace frames; writing = trust the smaller call.)

### 4. Iteration vs recursion
`factIter` keeps `total`/`k` variables and walks forward; `factorial` keeps **no explicit state** — the waiting calls hold the unfinished work. Neither is always better: loops for simple+deep, recursion when the problem breaks into smaller copies of itself.

### 5. Mutual recursion
`isEven(n)` → `isOdd(n-1)` → `isEven(n-2)` → … → `0`. Two functions defined in terms of each other; the shared counter still shrinks toward a base fact.

### 6. Printing vs returning
`cascade` is *about display* (`console.log` is the point); but `console.log` **returns `undefined`** — `badSquare(4) + 1` → `NaN`. Printing is an announcement; returning is the dish.

### 7. Tree recursion
`fibonacci(n) = fib(n-1) + fib(n-2)` — **two** calls per invocation → a tree of frames, not a line. Elegant (code matches definition) but potentially expensive: `fib(7)` recomputes smaller answers repeatedly (fix previewed in 2.8: memoization).

### 8. Counting partitions
Every partition either uses at least one `m` (`countPartitions(n-m, m)`) or none (`countPartitions(n, m-1)`) — an **include/exclude choice** that covers all cases. Base cases: `n===0` → 1 (found one way); `n<0` → 0 (overshot); `m<=0` → 0 (no parts left).

### 9. Stack limits in practice
Deep recursion → `RangeError: Maximum call stack size exceeded`. Proper tail calls exist in the ES spec but **Node/V8 don't implement them** — for deep production recursion use a loop or trampolining. Normal practice depth is fine.

---

## Practice Exercises — 7/7 (15/15 checks), self-solved

| # | Function | Solution shape | Concept exercised |
|---|----------|----------------|-------------------|
| 1 | `factorial(n)` | `n === 1 ? 1 : n * factorial(n-1)` | the classic; base case 1 |
| 2 | `sumToN(n)` | `n === 1 ? 1 : n + sumToN(n-1)` | same shape, `+` instead of `*` |
| 3 | `isEven`/`isOdd` | reduce by 1, switch function | mutual recursion |
| 4 | `fibonacci(n)` | `fib(n-1) + fib(n-2)` | tree recursion |
| 5 | `countPartitions(n, m)` | include/exclude branches | decision recursion + 3 base cases |
| 6 | `sumDigits(n)` | `(n % 10) + sumDigits(Math.floor(n/10))` | digit peeling; numeric only |
| 7 | `reverseString(s)` | last char + reverse of rest | recursion on strings |

Every solution follows the same discipline: `// base case` comment, `// recursive step` comment, `if/else` shape.

---

## Mastery Verification (from the Chapter-1 recap, 2026-08-17 — see `../08-ch1-review/learning-report.md`)

~2 weeks after practice, retrieved cold after a 5-week overall gap:

| Check | Result |
|---|---|
| Base case + what gets smaller (on `fact`) | ✅ recalled cold, incl. "interpreter stacks frames → RangeError" |
| `fact(3)` frame trace + unwind | ✅ one slip on the final unwind step (said f1 returns 1) — **self-caught** once shown |
| `fact(4)` unwind | ✅ flawless: 1 → 2 → 6 → 24 |
| Recursive step must **call AND return** (`badFact` → 12) | ✅ bug named correctly |
| Tree recursion (`fib` makes 2 calls → tree shape) | ✅ |
| From-scratch write (`sumTo`) | ✅ **first-try correct** — pattern-matched to own `sumToN` (Exercise 2) |
| `sumTo(0)` → live `RangeError` | ✅ connected to unreachable base case; precondition n ≥ 1 |

**Verdict: 1.7 solid.** The one refinement added during verification: the **recursive leap of faith** as a *writing* tool vs frame-tracing as a *reading* tool.

---

## What's Next

**Session 07 — COMPLETE** (report backfilled 2026-08-17). This closed Chapter 1; the chapter review is done (`../08-ch1-review/`).

**Session 09 — Native Data Types & Abstraction (2.1–2.2)** — Chapter 2 opens: Chapter 1 named *operations*; Chapter 2 names *data* (constructors, selectors, abstraction barriers over rational numbers). The frame/environment model built here is the foundation the whole course keeps using.
