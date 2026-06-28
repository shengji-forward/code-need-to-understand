# CS61A Concept Map — 1.6 Higher-Order Functions

Use the **Big Picture** tree for orientation, the **Nodes** for teaching flow, and the **ASCII diagrams** + tables for relationships. Details live in tables (preview-friendly — no HTML in diagram labels).

Section 1.6 is the hinge of Chapter 1. So far a function took *values* and returned a *value*. 1.6 promotes **functions themselves to values** — you can pass them in, return them, and wrap them. Almost every "advanced" pattern here is **one mechanism (closures)** doing different jobs.

---

## 1.6 Big Picture

```text
Higher-Order Functions  (functions are VALUES → pass them, return them, wrap them)
         │
         ├──→ Functions are FIRST-CLASS  (bind / pass / return / store in data)
         │
         ├──→ HIGHER-ORDER FUNCTION (HOF)  — takes and/or returns a function
         │         ├── takes fn  → map · filter · improve   ◄── CALLBACKS (sync or async)
         │         └── returns fn → CLOSURE
         │
         ├──→ LEXICAL SCOPE  — parent = BIRTHPLACE = where DEFINED, not where CALLED
         │         └── the WALL: the caller's frame is unreachable;
         │             only PASS-BY-VALUE crosses it
         │
         ├──→ CLOSURE  =  function + captured birthplace names (params OR locals)
         │         ├── FACTORY pattern → makeAdder · newtonUpdate · makeCounter
         │         ├── CURRYING → f(a)(b)  → partial application
         │         └── DECORATOR → wrap a fn (trace · memoize)
         │
         └──→ Newton's method — a SHOWCASE: closures + improve applied to root-finding
                  (the math is skimmable; the structure is the lesson)
```

**Recipe analogy** (extends 1.4/1.5): so far a recipe took ingredients and returned a dish. 1.6 lets a **recipe itself be an ingredient** (pass it to another recipe) or **return a new recipe** (a factory that bakes specialized recipes). The recurring image for closures in these sessions: the **passport factory** 🪪 — a function that manufactures a person (a new function) carrying a passport (its birthplace) forever.

| 1.6 power | Kitchen meaning | JS shape |
|---|---|---|
| function as **argument** | hand a recipe to another recipe to use | `map(fn)`, `improve(update, close)` |
| function as **return value** | a recipe that builds & ships new recipes | `makeAdder(5)` → `addFive` |
| function **wrapped** | a recipe wrapped in a logging/caching sleeve | `triple = trace(triple)` |

---

### Node 1: First-class functions (the foundation)

A function has **first-class status** when it enjoys the same rights as any other value (a number, a string):

| Right | Example |
|---|---|
| bind to a name | `const f = x => x + 1` |
| pass as an argument | `improve(update, close)`, `.map(fn)` |
| return from a function | `newtonUpdate` returns `update` |
| store in a data structure | `const ops = { add: ..., sub: ... }` |

**First-class vs. higher-order** — they answer *different* questions:
- **First-class** = a *status* functions have **in the language** ("are functions values?").
- **Higher-order** = a *kind* of **specific function** ("does *this* function take/return functions?").

Higher-order functions are **possible because** functions are first-class. (🌱 citizenship analogy: first-class = "citizens have full rights"; higher-order = "a citizen whose *job* is to manage other citizens.")

---

### Node 2: Higher-order functions & callbacks (functions as arguments)

An **HOF** takes a function and calls it. The function you pass in is a **callback** — *you* don't call it; the *receiver* does.

```javascript
[1, 2, 3].map(x => x * x);          // [1, 4, 9]   — transform each
[1, 2, 3].filter(x => x > 2);       // [3]         — keep matches
improve(update, close, guess);       // 1.6.2 — refine a guess until close
```

| flavor | when the receiver calls it | example |
|---|---|---|
| **synchronous** callback | **immediately**, during the call | `.map`, `.filter`, `.sort`, `improve` |
| **asynchronous** callback | **later**, after a delay/event | `setTimeout`, `onClick`, `fetch().then()` |

**The key correction:** "callback" is about **who** calls it (the receiver, not you), **not when**. The test: *did YOU write the `()` that calls it?* If no → it's a callback. (`.map`'s function is a *synchronous* callback.)

> **Terminology:** the function you pass is a **callback**. It's a **closure** only if it *captures* something from outside — `x => x*x` captures nothing (plain callback); `x => x * factor` captures `factor` (closure).

---

### Node 3: Lexical scope & the environment model

Two model upgrades make nested functions work (from 1.6.3):

1. Every user-defined function has a **parent environment** — the frame where it was **defined** (its **birthplace**).
2. When called, its local frame **extends** that parent.

**Lexical scope** = a function's reachable names are fixed by **where it's written in the source**, not by who calls it.

```
Global Frame
   average, approxEq, improve, sqrt
        ▲
        │ parent
   ┌────┴──────────────┐
   │  sqrt() Frame     │   ← birthplace of sqrtUpdate / sqrtClose
   │   a = 256         │
   └────▲──────────────┘
        │ parent   (sqrtUpdate was BORN here)
   ┌────┴──────────────┐
   │ sqrtUpdate() Frm  │   ← running (called from inside improve)
   │  x = ...          │
   └───────────────────┘
```

**The WALL:** the caller's frame is **never** on the callee's parent chain. `sqrtUpdate` (called by `improve`) cannot see `improve`'s locals (`guess`) — only its own birthplace chain. The **only** thing that crosses the wall is **pass-by-value** (argument values handed over). **Lookup** never crosses it.

**The 3-step call model** (fires every time a function is called):
1. **Evaluate** — the operator (→ the function) and operands (→ argument values), in the caller's frame.
2. **Create frame + bind** — new frame, parent = the function's birthplace; bind params to argument values.
3. **Run body** — evaluate the body in the new frame, using **lookup** (own frame → parent → … → Global).

> **Evaluation order is inside-out:** `improve(newtonUpdate(f,df), nearZero)` evaluates `newtonUpdate(f,df)` *first* (its result `update` fills the slot), *then* calls `improve`. Arguments evaluate before the outer function runs.

---

### Node 4: Closures (functions as return values)

A **closure** = a **function + the birthplace names it captured**. When a function is returned out of its birthplace, it takes those names with it (and the birthplace frame **stays alive** because the closure's parent link points to it).

```javascript
function makeAdder(n) {            // factory
  return x => x + n;               // product: a closure capturing n
}
const addFive = makeAdder(5);      // addFive remembers n = 5
addFive(3);                        // 8   (3 is YOURS; 5 is makeAdder's)
```

| the closure's… | in `addFive` | in `update` (from `newtonUpdate`) |
|---|---|---|
| **function** (the inner fn defined) | `x => x + n` | `function update(x){…}` |
| **own param** (YOURS, passed at call) | `x` (= 3) | `x` (= 4) |
| **captured names** (birthplace) | `n` (= 5) | `f`, `df` |

**Captured names can be params OR locals** — `makeCounter` captures a local `let count = 0` (private state).

**The #1 confusion — factory ≠ product:** `upd` is **not** `newtonUpdate`. `upd` is the function `newtonUpdate` *returned* (`update`). Proof: `newtonUpdate.length === 2`, `upd.length === 1`, `upd === newtonUpdate` is `false`. (🌱 you never asked why `addFive` doesn't need `n` — because `addFive` isn't `makeAdder`; `n` was set at build time.)

**The stale-closure bug (React):** a long-lived callback (timer/interval) captures an *old* state value and never sees updates → stuck. Fix: **capture nothing** — use the functional updater `setCount(prev => prev + 1)`, so React hands you the latest value.

---

### Node 5: Currying & partial application

**Currying** = split a multi-arg function into a **chain of single-arg closures**: `f(a, b)` → `g(a)(b)`.

```javascript
const add = a => b => a + b;       // curried add  (this IS makeAdder!)
add(5)(3);                         // 8   — two calls, one arg each
const addFive = add(5);            // partial application: pre-load 5, reuse
```

Each call takes **one** arg; early calls return a **function** (a closure); only the last returns the result.

**Why it exists — partial application:** pre-fill some args, get a reusable specialized function (`curriedPow(2)` → a "powers of 2" tool; `coffee("large")` → a "large coffee builder"). In real code use a library (`_.curry`); hand-written `curry2`/`uncurry2` are teaching artifacts.

---

### Node 6: Decorators (wrapping a function)

A **decorator** takes a function and returns a **new function** that runs extra behavior **before/after/around** the original — without changing it. Mechanically: an **HOF** (takes `fn`) returning a **closure** (captures `fn`).

```javascript
function trace(fn) {               // decorator
  return function wrapped(x) {     // closure capturing fn
    console.log('-> calling', fn.name);   // BEFORE
    const result = fn(x);                 // call ORIGINAL
    return result;                        // (could log AFTER)
  };
}
triple = trace(triple);            // swap original for wrapped version
```

| decorator | layer added | captures | = which closure pattern |
|---|---|---|---|
| `trace` | logging | `fn` | like `makeAdder` |
| `memoize` | caching | `fn` + private `cache` | like `makeCounter` (private state) |

**Two phases, don't merge:** `triple = trace(triple)` is **setup** (builds `wrapped`, captures original — *no logging yet*); `triple(12)` is the **call** (`wrapped` runs, logs, calls original). `fn(x)` calls the **captured original** (no infinite loop). `x` = the arg (`12`); the **result** is `36`.

**Pragmatic value:** logging, **memoize/caching** (React `useMemo`), auth checks, timing, and **AI-agent observability** (wrap each agent action to log input/output for evaluation). React HOCs and Express middleware are decorator-shaped.

---

### 1.6 Quick reference

| Concept | One sentence |
|---|---|
| **First-class** | functions are values (bind / pass / return / store) |
| **Higher-order function** | takes and/or returns a function |
| **Callback** | a function you hand over; the *receiver* calls it (sync or async) |
| **Lexical scope** | reachable names fixed by where a function is *defined*, not called |
| **Parent / birthplace** | the frame where a function was defined; lookup walks up this chain |
| **The wall** | the caller's frame is unreachable; only pass-by-value crosses |
| **Closure** | function + captured birthplace names (params or locals) |
| **Factory vs. product** | `makeAdder` builds `addFive`; the closure is the *product* |
| **Currying** | `f(a)(b)` — chain of single-arg closures |
| **Partial application** | pre-fill some args, reuse the specialized function |
| **Decorator** | HOF returning a closure that wraps the original (before/after/around) |
| **Arrow / lambda** | anonymous function: `x => x + 1` |

---

## Bridge: 1.5 → 1.6 → 1.7

| 1.5 idea | 1.6 extends it | 1.7 (Recursion) will add |
|----------|----------------|--------------------------|
| `while` loops (accumulator, sliding window) | `map`/`filter` replace many explicit loops — pass the *what* as a function | recursion = a function calling itself = another way to repeat |
| `if/else` chooses a branch | functions choose *what runs* (passed as arguments) | base case + recursive step (a conditional that calls itself) |
| truthiness, testing | closures need the **environment model** (frames, parent chain) | recursion's power & cost come from **frames piling up** on the call stack |

**1.7 (Recursive Functions)** will reuse the environment model from 1.6 heavily — each recursive call makes a new frame, and understanding the parent chain / the wall is exactly what makes recursion legible. The closure intuition (a function carrying its birthplace) also returns in 1.7's mutual recursion and tree recursion.
