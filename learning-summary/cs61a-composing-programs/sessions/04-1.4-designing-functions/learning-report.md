# Session 04 — 1.4 Designing Functions: Learning Report

**Completed**: 2026-06-17
**Source**: [Composing Programs 1.4](https://www.composingprograms.com/pages/14-designing-functions.html)

---

## Concept Map

Section 1.4 shifts from *how functions execute* (1.3) to *what makes a function good* — design. Every principle reinforces that **functions are abstractions**.

```
Designing Good Functions (functions as abstractions)
       │
       ├──→ Three principles: single responsibility · DRY · generality
       ├──→ Documentation — JSDoc (/** ... */)
       ├──→ Default parameters (used only when arg is undefined)
       ├──→ Locally defined functions (bound in the enclosing local frame)
       └──→ Abstraction barrier — domain · range · intent
```

| Node | One sentence | Key distinction |
|---|---|---|
| **Three principles** | Good functions do one job, don't repeat logic, and are general | Generality pairs with default parameters |
| **JSDoc** | `/** ... */` above a function documents its job, params, return | JS's equivalent of Python's docstring |
| **Default parameters** | A fallback used only when the argument is `undefined` | `null` does **not** trigger the default |
| **Locally defined functions** | A nested function bound in the enclosing local frame | Invisible outside; dies when the enclosing call returns |
| **Abstraction barrier** | Callers depend on domain/range/intent, not implementation | Preconditions constrain inputs; side effects go beyond the return |

---

## Objectives

- [x] Apply the three design principles: single responsibility, DRY, generality
- [x] Document functions with JSDoc
- [x] Use default parameters (and know when to prefer a `const` in the body)
- [x] Define and use locally defined (nested) functions
- [x] Reason about a function via its domain, range, and intent
- [x] Complete 3 of 4 practice exercises (`isPrime` deferred to 1.5 — needs a loop)

---

## What You Learned

### 1. Three Design Principles

| Principle | Meaning |
|---|---|
| **Single responsibility** | One function, one job — short name, one-line description |
| **DRY** | Repeated logic → one named function, reused |
| **Generality** | Define broadly; cover specifics with args/defaults |

Decomposing a complex task into concise functions improves readability, cuts errors, and often reduces total code.

### 2. Documentation — JSDoc

A `/** ... */` block above the declaration documents *what* the function does: a first-line job summary, `@param` tags for inputs, `@returns` for the output. Editors surface it as hover info (JS's analogue of Python's `help()`). `//` comments explain *why* for human readers.

### 3. Default Parameters

A default is used **only** when the argument is `undefined` (omitted or explicit). The trap: `null` (and `0`, `""`, `false`) does **not** trigger the default.

| Call | Result |
|---|---|
| `greet()` / `greet(undefined)` | default used |
| `greet("Alice")` | default ignored |
| `greet(null)` | default **not** used → `"Hello, null!"` |

**Default param vs `const` in body — by variability:** values that *might vary between calls* → default parameter (caller may override); *true constants* → `const` in the body (caller should never choose it). Test: *"Could a caller legitimately want a different value?"*

### 4. Locally Defined Functions

A function defined inside another function's body. It's bound in the **enclosing local frame** (alongside the parameters) — invisible outside, destroyed when the enclosing call returns. Used to define a helper **once** and call it **multiple times** (DRY), kept close to where it's used.

```
areaBetweenCircles() frame  [f1]
  r1           -> 5
  r2           -> 3
  areaOfCircle -> func   ← just another binding in f1
```

(1.3 vocabulary: the inner function's **scope** is the enclosing body. *Scope* = where a name is visible; *range* = the output values — don't confuse them.)

### 5. Functions as Abstractions — the Barrier

Callers depend only on **what** (domain, range, intent), not **how**. Two refinements:

- **Precondition** — a constraint on valid inputs (e.g., `clamp` requires `low ≤ high`; `isPrime` requires a positive integer).
- **Side effect** — an observable effect beyond the return value; pure functions have none and compose reliably.

**Reuse, don't reinvent:** `clamp` was built with zero conditionals by composing two existing abstractions — `Math.max(low, Math.min(val, high))` (ceiling then floor).

---

## Practice Exercises

3 of 4 exercises passed; `isPrime` deferred to 1.5.

| # | Function | Body | Design concept exercised |
|---|----------|------|--------------------------|
| 1 | `clamp(val, low, high)` | `return Math.max(low, Math.min(val, high));` | Single responsibility; **reuse abstractions** (no `if/else`); precondition `low ≤ high` |
| 2 | `areaBetweenCircles(r1, r2)` | local `areaOfCircle(r)` → `Math.PI * square(r)`; `return areaOfCircle(r1) - areaOfCircle(r2);` | **Locally defined function** (DRY); reused `square` |
| 3 | `isPrime(n)` | *(deferred to 1.5 — needs a loop)* | Domain/precondition (positive integers); `1` edge case; `√n` efficiency trick |
| 4 | `distance(x1,y1,x2,y2)` | `return Math.sqrt(square(x2 - x1) + square(y2 - y1));` | Composition; reused `square`; range is non-negative |

**Two notable moments:**
- **Exercise 2 — a live debugging diagnosis.** Reusing `square(r)` was correct DRY, but produced `NaN` because `square` (Exercise 4's helper) still had `return undefined`. Trace: `square(r) → undefined → Math.PI * undefined → NaN`. Fix: give `square` a body. (Side note: top-level `function` declarations are **hoisted**, so `square` was *callable* from `areaBetweenCircles` despite being textually later — the `NaN` was purely from the unimplemented body.)
- **Exercises 2 & 4 both reuse `square`** — DRY in action across two functions.

---

## Key Takeaways

1. **One function, one job** — nameable in a short name and a single line; split multi-job functions.
2. **DRY** — if you're copying logic, extract a named function and reuse it (`areaBetweenCircles` and `distance` both lean on `square`).
3. **Be general, with sensible defaults** — `pow(base, exp = 2)` handles every exponent but defaults to the common case.
4. **Document the "what"** — JSDoc above the function; comments for the "why".
5. **Default vs const — by variability** — callers may override → default param; a universal constant → `const` in the body.
6. **Locally defined functions live in the local frame** — invisible outside, destroyed on return; perfect for DRY helpers.
7. **The abstraction barrier** — callers depend on domain/range/intent, not implementation. Reuse existing abstractions (`Math.min`/`Math.max` for `clamp`) instead of reinventing.

---

## Recap & Self-Assessment (2026-06-17)

Worked through all 1.4 concepts in a Q&A recap:

| # | Concept | Result |
|---|---|---|
| 1 | Three design principles | ✅ solid |
| 2 | `clamp` — design + reuse of `Math.min`/`Math.max` | ✅ solid |
| 3 | Locally defined functions (definition, visibility, frame) | ✅ solid |
| 4 | `areaBetweenCircles` — local helper + DRY | ✅ solid (with a `NaN` debugging moment) |
| 5 | `distance` — composition, non-negative range | ✅ solid |
| 6 | Default parameters (incl. the `null` trap) | ✅ solid |
| 7 | Default param vs `const` in body | ✅ solid (sharpened to "by variability") |

**Refinements to lock in:**

1. **Reuse abstractions, don't reinvent.** `clamp` needs no `if/else` — `Math.max(low, Math.min(val, high))` composes two built-ins (ceiling then floor).
2. **`scope` ≠ `range`.** Scope = where a name is visible; range = the set of output values. (A locally defined function's *scope* is the enclosing body.)
3. **A default is used only for `undefined`.** `null` is a real value, so it does **not** trigger the default → `greet(null)` is `"Hello, null!"`.
4. **Default param vs `const` by variability**, not by "commonly provided." Caller may override → default param; universal constant → `const` in body.
5. **Hoisting + unimplemented body ⇒ `NaN`.** A top-level `function` is callable before its textual position, but if its body returns `undefined`, math on its result yields `NaN`. (Caught live in Exercise 2.)

---

## What's Next

**Session 05 — Control (1.5)**
- Read: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control.md`
- Practice: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/practice.js`
- Objectives: `if`/`else` conditional execution, `for`/`while` loops, and using them to implement `isPrime` (checking divisors 2…√n) and other iterative logic. Control flow is what 1.4's `clamp`/`isPrime` exercises were waiting for.
