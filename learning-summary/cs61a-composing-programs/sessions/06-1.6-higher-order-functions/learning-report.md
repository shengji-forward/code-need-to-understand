# Session 06 — 1.6 Higher-Order Functions: Learning Report

**Completed (reading & concepts)**: 2026-06-28
**Practice**: scheduled for the next session (tomorrow)
**Source**: [Composing Programs 1.6](https://www.composingprograms.com/pages/16-higher-order-functions.html)
**Knowledge file**: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md`

> Note: this session spanned several intermittent days (2026-06-26 → 06-28). The reading and concept mastery are done; the practice exercises are deliberately deferred to tomorrow, per the original study plan.

---

## Concept Map

Section 1.6 promotes **functions to values** — you can pass them, return them, and wrap them. Almost every pattern is **one mechanism (closures)** in different outfits.

```text
FIRST-CLASS FUNCTIONS  (functions are values)
        │  enables
        ▼
HIGHER-ORDER FUNCTION  (takes and/or returns a fn)
        ├── takes fn  ──▶  map · filter · improve   ◄── CALLBACKS (sync/async)
        └── returns fn ──▶ CLOSURE  (function + captured birthplace names)
                              │
   LEXICAL SCOPE ────────────┤  (parent = BIRTHPLACE = where DEFINED)
                              ├──▶ FACTORY  (makeAdder · newtonUpdate · makeCounter)
                              ├──▶ CURRYING (f(a)(b) → partial application)
                              └──▶ DECORATOR (wrap: trace · memoize)
   THE WALL ◀─ lexical scope (caller off; only pass-by-value crosses)
```

Full map: see `concept-map.md` in this folder.

---

## Objectives

- [x] Treat functions as **first-class values** (bind / pass / return / store)
- [x] Use **functions as arguments** (`map`, `filter`, `improve`) and explain callbacks
- [x] Explain **lexical scope**: parent = birthplace, the wall, pass-by-value vs lookup
- [x] Explain the **3-step call model** (eval → bind+frame → run) and inside-out evaluation
- [x] Define **closures** and identify the captured names in any example
- [x] Distinguish **factory vs. product** (`upd` ≠ `newtonUpdate`)
- [x] Explain **currying** & **partial application** (`f(a)(b)`)
- [x] Explain **decorators** (HOF + closure; build-at-setup / run-at-call)
- [x] Connect closures to real practice (React `useState`, stale-closure bug + fix, memoize, AI observability)
- [ ] Complete the **practice exercises** (`practice.js`) — *tomorrow*

---

## What You Learned

### 1. First-class functions & higher-order functions
Functions are **values** with the 4 rights (bind, pass, return, store). A **higher-order function** takes and/or returns a function; HOFs exist *because* functions are first-class. (First-class = language status; higher-order = a kind of specific function.)

### 2. Functions as arguments & callbacks
`map` (transform each), `filter` (keep matches), `improve` (refine a guess) all take a **callback** — *you* pass it, the *receiver* calls it. A callback is about **who** calls it (sync like `.map`, or async like `setTimeout`), **not** when. The function passed is a **closure only if it captures** something (`x => x*x` captures nothing; `x => x*factor` captures `factor`).

### 3. Lexical scope & the environment model
Every function's **parent = its birthplace** (where defined, not called). Lookup walks the parent chain; the **caller's frame is walled off** — only **pass-by-value** crosses the wall. The **3-step call model**: evaluate → create frame + bind (parent from the function value) → run body via lookup. **Evaluation is inside-out** (`improve(newtonUpdate(f,df), nearZero)` runs `newtonUpdate` first).

### 4. Closures (functions as return values)
A **closure = function + captured birthplace names** (params *or* locals). The birthplace frame **stays alive** because the closure's parent link points to it. `makeAdder(5)` → `addFive` (remembers `n=5`); `newtonUpdate(f,df)` → `update` (remembers `f,df`); `makeCounter` → a closure with private `count`.

### 5. Currying & partial application
`f(a, b)` → `g(a)(b)`: a chain of single-arg closures. Early calls return a function; the last returns the result. **Partial application** = pre-fill some args and reuse the specialized function (`curriedPow(2)` = a "powers-of-2" tool). In real code, use `_.curry`; `curry2`/`uncurry2` are teaching artifacts.

### 6. Decorators
A **decorator** = an HOF returning a closure that wraps the original with before/after/around behavior. `trace` (logging) captures `fn`; `memoize` (caching) captures `fn` + private `cache` (= the `makeCounter` private-state pattern). Two phases: **setup** builds the wrapper; **call** runs it and calls the original.

### 7. Newton's method (showcase — math deliberately skimmed)
`findZero(f, df)` wires two closures (`newtonUpdate(f,df)` → the update; `nearZero` → the "close enough?" check) into the 1.6.2 `improve` loop. The derivative math (`df = 2x`, etc.) was deliberately skipped — it's not used in app/web dev. The lesson was the *structure* (closures + improve), not the math.

---

## Misconceptions Corrected *(highest-value review)*

| Initially thought | Reality | What unblocked it |
|---|---|---|
| birthplace = where the fn is **stored** (`addFive` in Global) | birthplace = where it was **made** (the factory frame) | two-frames diagram (storage vs birthplace) |
| both `3` and `5` come from `makeAdder` | `3` = **yours** (call-time); `5` = **makeAdder's** (captured) | changed-vs-stayed demo (`addFive(3)=8` vs `addFive(100)=105`) |
| `upd` **is** `newtonUpdate`, so `4 → f` | `upd` is the **product** (`update`); `4 → x` | `.length` proof (`newtonUpdate` 2 args, `upd` 1 arg) + makeAdder parallel |
| callback = "called **later**" (time) | callback = **receiver** calls it (control); sync or async | the `.map`-calls-it demo + `setTimeout` contrast |
| `trace` logs at **setup** | logs at **call**; setup only builds the wrapper | two-phase demo |
| `x = 36` | `x = 12` (argument); `36` = result | two-phase demo |

---

## Key Takeaways

1. **One mechanism, many outfits.** Closures (function + captured birthplace names) power factories, currying, and decorators — the chapter's whole engine.
2. **Factory ≠ product.** The returned closure is *not* the factory (`upd` ≠ `newtonUpdate`); the factory's params are locked in at build time.
3. **Capture nothing to avoid staleness.** The React stale-closure bug is birthplace capture biting; the fix `setCount(prev => …)` captures nothing.
4. **The wall.** A callee can't see the caller's frame; only pass-by-value crosses. Lookup never does.
5. **Inside-out evaluation.** Inner calls run first; their results fill the outer call's argument slots.
6. **Callbacks = control, not time.** Sync (`.map`) and async (`setTimeout`) are both callbacks.
7. **Decorators = HOF + closure.** And they map directly to real practice — including AI-agent observability (wrap each action to log/eval).

---

## Pragmatic Connections Made

- closures → React `useState`; `makeCounter` = private state via closure
- **stale-closure bug** + functional-updater fix (`prev => …`) — a real React lesson
- `memoize` → caching (`useMemo`, expensive computations)
- **decorators → AI-agent observability/eval** (wrap each agent action to log input/output) — *your* insight, confirmed as current practice (LangSmith/Langfuse/OpenTelemetry)
- currying → pre-configured / specialized functions (`_.curry`)

---

## Deliberately Skimmed (correct for the goal)

- Newton's derivative math — never used in app/web dev.
- `curry2` / `uncurry2` source — use a library in practice.

---

## What's Next

**Tomorrow — Practice** (`practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/practice.js`)
- Guided with questions + analogies; answers not given away.
- Closures & environment model checked before each exercise.

**Session 07 — Recursive Functions (1.7)**
- Read: `knowledge/.../1.7-recursive-functions.md`
- Builds directly on the **environment model** from 1.6 (frames, parent chain, the wall) — recursion piles frames on the call stack, so this chapter's mental model is the foundation.
