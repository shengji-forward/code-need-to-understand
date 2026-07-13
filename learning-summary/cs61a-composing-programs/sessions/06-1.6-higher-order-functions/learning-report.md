# Session 06 — 1.6 Higher-Order Functions: Learning Report

**Completed (reading & concepts)**: 2026-06-28
**Practice completed**: 2026-07-04 — 8/8 exercises, 11/11 checks passing
**Source**: [Composing Programs 1.6](https://www.composingprograms.com/pages/16-higher-order-functions.html)
**Knowledge file**: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md`

> Note: this session spanned several intermittent days (2026-06-26 → 07-04). Reading, concept mastery, AND practice are all complete.

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
- [x] Complete the **practice exercises** (`practice.js`) — **8/8 (11/11 checks)**, self-debugged via the trace method

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

## Practice Exercises

All 8 exercises passed (11/11 checks), solved from scratch via the **trace-then-translate method** (read test → one-sentence spec → hand trace → translate to code → run; and *trace your own code* to debug). No answers given away.

| # | Function | Solution | Concept + lesson / bug hit |
|---|----------|----------|----------------------------|
| 1 | `applyTwice(f, x)` | `return f(f(x))` | functions as args; traced `f(5)=6 → f(6)=7` |
| 2 | `makeAdder(n)` | `return x => x + n` | closure factory; **concrete→general** — trace used `5`, code uses `n` |
| 3 | `compose(f, g)` | `return x => f(g(x))` | closure + composition (`f` outer, `g` inner) |
| 4 | `myMap(arr, f)` | loop + `push(f(arr[counter]))` | HOF + loop (no built-in `.map`); explored `.map`/`while`/`for`; deleted a dead `counter` line (clean-code instinct) |
| 5 | `myFilter(arr, predicate)` | loop + `if (predicate(arr[counter])) push(arr[counter])` | **debugged**: was using index `counter` not element `arr[counter]`, and hardcoded `>3` not `predicate(...)` — fixed by tracing own code |
| 6 | `curry2(f)` | `return a => b => f(a, b)` | closure chain; **concrete→general** — `a+b` (test) → `f(a,b)` (code) |
| 7 | `repeated(f, n)` | `return x => { loop n times: result = f(result) }` | **synthesis** (closure factory + loop). Two debug rounds: (a) must *return a closure*, (b) `f(x)` → `f(result)` (feedback loop) |
| 8 | `improve(update, close, guess)` | `while (!close(guess)) guess = update(guess)` | guided one-liner; the general engine (`repeated` was the hand-built version). Newton `sqrt(2)` now runs on it |

**Biggest method win:** invented the **trace-then-translate** process mid-session to beat the "blank page from scratch" problem — then reused the *same trace as a debugger* (trace your buggy code → spot where it diverges from the spec). Two real bugs (`myFilter`, `repeated`) were found exactly this way. The recurring trap across exercises: baking the **test's concrete value** into the code instead of the **parameter** (`5`→`n`, `>3`→`predicate`, `a+b`→`f(a,b)`).

---

## Recap & Self-Assessment (2026-07-13)

Worked through all eight 1.6 concept areas in a Q&A recap:

| # | Concept | Result |
|---|---|---|
| 1 | First-class functions & HOFs (4 rights; status vs. kind) | ✅ solid (2nd pass: nailed 4 rights + relationship) |
| 2 | Functions as arguments & callbacks (`fn` vs `fn()`; sync vs async) | ⚠️ partial — `fn()` runs immediately; sync=waits, async=fires-later |
| 3 | Lexical scope & the environment model (parent=birthplace; 3-step call) | ⚠️ partial — `f(a)(b)` is two calls/two frames, not one |
| 4 | Closures (function + birthplace; live link ≠ snapshot) | ✅ solid (predicted 99 + counter; recovered from "not familiar") |
| 5 | Currying & partial application (`f(a)(b)`) | ⚠️ partial — practical use = partial application, not "chaining" |
| 6 | Decorators (HOF + closure) | ⚠️ partial — re-taught from scratch; core shape only (build/run deferred) |
| 7 | Newton's method / iterative improvement (showcase) | ⚠️ partial — update/close/guess roles imprecise |
| 8 | Trace-then-translate method | ✅ solid (remembered 5 steps; avoided the concrete-value trap) |

**Refinements to lock in:**

1. **First-class = functions ARE values** (4 rights: bind / pass / return / store); **HOF = takes OR returns a function**; HOFs are possible *because* functions are first-class.
2. **`fn` vs `fn()`** — no parens = pass the function; parens = call it now. `map(fn(), arr)` calls fn immediately (wrong time/args) → crash. **The receiver always calls it, not you.**
3. **Sync vs async** — sync: receiver calls now and *waits*; async: receiver stashes it, *returns immediately*, fires later on an event (timer/click/network).
4. **`f(a)(b)` = two calls, two frames, two bindings.** `makeAdder(3)`: f1 `x→3`, returns inner. `inner(4)`: f2 `y→4` (parent f1). Never `x→4`.
5. **Name lookup** = local frame first, then chain up the parent pointers (each = a birthplace). First match wins.
6. **Closure = function + birthplace frame, a LIVE LINK, not a snapshot.** Captured vars are read fresh at call time — if the box changed, you see the change (99, not 10).
7. **Captured vars live in the birthplace frame (f1), never global** — and that frame survives its function's return *only because* a closure points at it → private mutable state.
8. **Parameter = call-arg** (fresh, bound each call); **free variable = captured** (from birthplace). Don't confuse the two.
9. **Currying** = multi-arg fn → chain of single-arg fns. Practical use = **partial application** (`add5 = makeAdder(5)`). Currying *depends on* closures.
10. **`@deco` / `fn = deco(fn)`** — decorator = HOF + closure. Returns a NEW function; calling the name runs the NEW one first, which calls the original (`fn(x)`) inside. Side effect + original, in order.
11. **`improve(update, close, guess)`** — update → next better guess; close → stop predicate (`true` = done); guess → single starting value. Generic template + swappable callbacks = the HOF showcase.
12. **Trace-then-translate** — READ TEST → ONE-SENTENCE SPEC → HAND TRACE (concrete) → TRANSLATE (generalize: `5`→`n`, `"a"`→`letter`) → RUN. Same trace doubles as your debugger. **Trap:** baking the test's concrete value into the code.
13. **Boolean collapse** — `if (expr) return true; return false` → `return expr`. Never wrap a boolean expression in if-return-true-return-false.

---

## What's Next

**Session 06 — COMPLETE.** ✅ Reading, concepts, AND practice all done (8/8 exercises, 11/11 checks).

**Session 07 — Recursive Functions (1.7)**
- Read: `knowledge/.../1.7-recursive-functions.md`
- Builds directly on the **environment model** from 1.6 (frames, parent chain, the wall) — recursion piles frames on the call stack, so this chapter's mental model is the foundation.
