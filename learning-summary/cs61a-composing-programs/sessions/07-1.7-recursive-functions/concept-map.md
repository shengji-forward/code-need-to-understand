# CS61A Concept Map — 1.7 Recursive Functions

Use the **Big Picture** tree for orientation, the **Nodes** for teaching flow, and the tables for relationships. This is the final section of Chapter 1 — it adds **self-reference** on top of 1.6's functions-as-values.

---

## 1.7 Big Picture

```text
RECURSION  =  a function solving a problem by solving a SMALLER VERSION OF ITSELF
        │
        ├──→ THE TWO PARTS (every recursive function)
        │        ├── BASE CASE      simplest input → direct answer → STOP
        │        └── RECURSIVE STEP call self on smaller input → combine
        │
        ├──→ THE MECHANISM  (nothing new!)
        │        CALL STACK = Session-03 rule applied to self:
        │        every call → fresh local frame → frames STACK while calls wait
        │        → base case returns → stack UNWINDS, answers combining upward
        │
        ├──→ THE THINKING TOOL
        │        LEAP OF FAITH: "if the smaller call works, is my step right?"
        │        (reading = trace frames; writing = trust the smaller call)
        │
        └──→ THE VARIANTS
                 ├── MUTUAL RECURSION   isEven ↔ isOdd (counter still shrinks)
                 ├── TREE RECURSION     2+ calls each → frames form a TREE (fib)
                 └── ITERATION vs RECURSION   accumulator vars vs waiting frames
```

**The two questions that read ANY recursive function:**

> 1. **What is the base case?**
> 2. **What gets smaller?**

**Kitchen version** (the series' recurring image): a recipe for a *pile* — handle the top, send the smaller pile to the same recipe, stop when the pile is simple. Recursion is not magic; it is recipe-for-a-pile.

| 1.7 idea | Kitchen meaning | JS shape |
|---|---|---|
| base case | pile is simple — handle directly | `if (n === 1) return 1` |
| recursive step | one plate + smaller stack | `return n * factorial(n - 1)` |
| call stack | sticky notes: "waiting on the smaller pile" | frames pile, then unwind |
| leap of faith | trust the prep team's smaller tray | assume `f(n-1)` correct, check your line |
| tree recursion | two cooks each spawn two helpers | `fib(n-1) + fib(n-2)` |

---

### Node 1: The shape (base case + recursive step)

```javascript
function solve(problem) {
  if (simple(problem)) return directAnswer(problem);   // BASE CASE — stops
  return combine(problem, solve(smaller(problem)));    // STEP — must SHRINK
}
```

Two failure modes, different symptoms:
- **No base case** → calls itself forever → `RangeError` (stack overflow).
- **Step doesn't shrink** → base case exists but is never reached → same ending.

**Trap:** the step must **call the function** (`n * factorial(n-1)`), not just compute on numbers (`n * (n-1)` — that's a plain expression, no recursion), **and return its result**.

---

### Node 2: The call stack (Session 03, repeated)

`sumDigits(738)` — no new JS rule, just frames:

```text
GROWS:   sumDigits(738) needs sumDigits(73) + 8
         sumDigits(73)  needs sumDigits(7)  + 3
         sumDigits(7)   → base case, returns 7
UNWINDS: 7 + 3 = 10  →  10 + 8 = 18
```

Each frame holds **its own `n`** (same "fresh frame per call" rule as closures). The stack grows while calls wait; shrinks as answers return. Each waiting frame is holding `combine(…, ___)` with a blank that the call below will fill.

---

### Node 3: The leap of faith (how to *write*, not just read)

Don't expand future calls in your head. Check one level: *if `factorial(n-1)` gives the right answer, does `n * factorial(n-1)` compute `factorial(n)`?* Yes ⇒ done. This is mathematical induction: correct base + correct step ⇒ correct everywhere. Trace frames when **reading/debugging**; trust the smaller call when **writing**.

---

### Node 4: Iteration vs recursion

| | Iteration (`while`) | Recursion |
|---|---|---|
| state lives in | **variables** you update (`total`, `k`) | **waiting frames** on the call stack |
| mental image | one cook + checklist | stack of tickets, each waiting on the one below |
| choose when | process is simple and/or deep | problem naturally splits into smaller selves |

---

### Node 5: Mutual recursion

`isEven(n) → isOdd(n-1) → isEven(n-2) → … → 0`. Two functions defined in terms of each other; base facts `isEven(0)=true`, `isOdd(0)=false`; the shared counter shrinks either way. Use when two ideas are naturally co-defined.

---

### Node 6: Printing vs returning

`console.log` **displays** and returns `undefined`; `return` hands back a usable value. `badSquare` (logs, doesn't return) → `badSquare(4) + 1` = `NaN`. Printing is the announcement; returning is the dish. `cascade` is the rare case where printing *is* the point (and prints again on the unwind — visible proof of the stack).

---

### Node 7: Tree recursion

**2+ recursive calls per invocation** → the frames form a **tree**, not a line:

```text
                fib(4)
              /        \
          fib(3)        fib(2)
         /      \       /     \
     fib(2)   fib(1) fib(1)  fib(0)
     /    \
  fib(1) fib(0)
```

Elegant (code mirrors the definition) but **repeats work** — `fib(2)` computed twice above. Cost fix comes in 2.8 (**memoization**: cache answers so nothing is computed twice). Payoff shape: a generative branching structure (`branch(len)` calling itself twice with smaller lengths) is literally this tree drawn — Forwardgrounds' self-similar pixel fields.

---

### Node 8: Counting partitions (decision recursion)

Ways to write `n` as a sum using parts ≤ `m`. Every partition lands in exactly one of two groups — an **include/exclude choice**:

```text
use at least one m  →  countPartitions(n - m, m)     (m used; hunger smaller)
use no m at all     →  countPartitions(n, m - 1)     (menu smaller)
```

Base cases: `n === 0` → **1** (one valid way found); `n < 0` → **0** (overshot); `m <= 0` → **0** (no parts left). Two branches that cover all cases, added together — decision-branching as recursion.

---

### Node 9: Stack limits (production reality)

- Deep recursion → `RangeError: Maximum call stack size exceeded` (each active call = one frame).
- **Proper tail calls (PTC)** are in the ES2015 spec (a tail-position call could reuse its frame) — but **Node.js/V8 don't implement it**. Don't rely on it.
- Deep production recursion → use a **loop**, or **trampolining** (wrap recursive calls in zero-arg **thunks** and drive them from a loop, so the stack never grows). Practice-depth recursion is fine as-is.

---

## 1.7 Quick reference

| Concept | One sentence |
|---|---|
| **Recursive function** | calls itself (directly or via a partner) |
| **Base case** | simplest input, answered directly — the stop |
| **Recursive step** | call self on a smaller input, combine the answer — must CALL and RETURN |
| **Call stack** | frames stack while calls wait; unwind as values return |
| **Leap of faith** | trust the smaller call when checking your step (induction) |
| **Mutual recursion** | two functions calling each other (`isEven`/`isOdd`) |
| **Tree recursion** | 2+ calls per invocation → tree of frames; watch repeated work |
| **Printing vs returning** | `console.log` shows + returns `undefined`; `return` composes |
| **Stack limit** | too-deep recursion → `RangeError`; PTC unimplemented in Node |
| **Trampolining / thunk** | zero-arg wrapper + loop = recursion without stack growth |

---

## Bridge: 1.6 → 1.7 → 2.x

| 1.6 idea | 1.7 uses it | Chapter 2 will add |
|----------|-------------|--------------------|
| fresh frame per call (closures) | the call stack is those frames, piled by self-calls | frames hold *data structures* too (objects, lists) |
| parent chain / the wall | each frame's `n` is private — no shared mutable state | mutation will break that calm (2.4) |
| functions as values | trampolining wraps calls in thunks — functions as data | data made *of* functions (closure-based pairs, 2.2/3.2) |
| memoize decorator | the fix for tree recursion's repeated work (2.8 deep-dive) | memoization meets efficiency analysis |

**With 1.7, Chapter 1 closes:** expressions → names → functions → design → control → functions-as-values → self-reference. Next: Chapter 2 names **data**.
