# CS61A Concept Map — 1.4 Designing Functions

Use the **Big Picture** tree for orientation, the **Nodes** for teaching flow, and the **ASCII diagrams** + **Mermaid** for relationships. Details live in tables (preview-friendly — no HTML in diagram labels).

Section 1.4 shifts altitude: 1.3 was *how functions execute* (frames, scope, calling); 1.4 is *what makes a function **good*** — design. Every principle reinforces that **functions are abstractions**: callers use them by *what* they do, not *how*.

---

## 1.4 Big Picture

```text
Designing Good Functions  (functions as abstractions)
         │
         ├──→ Three design principles
         │         ├── Single responsibility — one function, one job
         │         ├── DRY — extract repeated logic into a named function
         │         └── Generality — define broadly; default for the common case
         │
         ├──→ Documentation — JSDoc (/** ... */) above the function
         │
         ├──→ Default parameters
         │         ├── Used ONLY when the argument is undefined
         │         └── Default param vs const-in-body — by VARIABILITY
         │
         ├──→ Locally defined functions (nested)
         │         ├── Bound in the enclosing function's LOCAL frame
         │         └── DRY helper, kept close to where it's used
         │
         └──→ Abstraction barrier — callers depend on WHAT, not HOW
                   domain · range · intent   (+ preconditions, side effects)
```

**Kitchen analogy** (extends the 1.3 cook/ticket model — 1.3 was how a cook works a ticket; 1.4 is how to write a good *recipe*):

| Concept | Kitchen | Code |
|---------|---------|------|
| **Single responsibility** | One recipe = one dish, not a whole banquet | a function does exactly one job |
| **DRY** | Write the house-sauce recipe once; reference it | extract repeated logic into a named function |
| **Generality + defaults** | "Serves 4 by default, but scales" | `pow(base, exp = 2)` — general, with a common-case default |
| **Locally defined function** | A sub-recipe only *this* dish uses | a nested function, bound in the local frame |
| **Abstraction barrier** | Diner orders "the dish", not the step-by-step recipe | caller depends on domain/range/intent, not the body |

---

### Node 1: Three design principles

| Principle | Meaning | Smell that triggers it |
|-----------|---------|------------------------|
| **Single responsibility** | One function, one job — nameable in a short name + one line | a function doing several things in sequence → split it |
| **DRY** (Don't Repeat Yourself) | Implement logic once, name it, reuse | copying/pasting a block → extract a function |
| **Generality** | Define broadly enough to cover related cases; supply specifics via args/defaults | a special-case function → generalize + default |

These improve readability, cut errors, and often reduce total code. Decomposing a complex task into concise functions is a skill built with practice.

---

### Node 2: Documentation — JSDoc

A function definition should document *what* it does. In JS that's a **JSDoc** block (`/** ... */`) directly above the declaration.

```javascript
/**
 * Compute the pressure in pascals of an ideal gas.
 *
 * @param {number} v - Volume of gas, in cubic meters
 * @param {number} t - Absolute temperature in degrees kelvin
 * @param {number} n - Particles of gas
 * @returns {number} Pressure in pascals
 */
function pressure(v, t, n) {
  const k = 1.38e-23;  // Boltzmann's constant
  return (n * k * t) / v;
}
```

- First sentence = the job in one line; `@param` / `@returns` document inputs/output.
- Editors show JSDoc as hover info (JS's analogue of Python's `help()`).
- `//` comments clarify *why* (not just *what*) for human readers; the code expresses the "what."

---

### Node 3: Default parameters

```javascript
function pressure(v, t, n = 6.022e23) {  // default: one mole
  const k = 1.38e-23;
  return (n * k * t) / v;
}
pressure(1, 273.15);                // uses default n
pressure(1, 273.15, 3 * 6.022e23);  // overrides default n
```

| Call | `n` gets | Why |
|------|----------|-----|
| `greet()` | `"World"` (default) | argument omitted |
| `greet("Alice")` | `"Alice"` | argument provided → default ignored |
| `greet(undefined)` | `"World"` (default) | explicit `undefined` |
| `greet(null)` | `null` (**not** the default) | `null` ≠ `undefined` — the trap |

**Rule:** a default is used **only** when the argument is `undefined`. Any other defined value (`null`, `0`, `""`, `false`) does *not* trigger it.

**Default param vs `const` in body — decide by variability:**

| | Default **parameter** | `const` inside the **body** |
|---|---|---|
| Use when | value **might reasonably vary** between calls | value is a **true constant** |
| Caller | *may* override it | should **never** choose it |
| Example | `n` (particle count: 1 mole, or 3 moles) | `k` (Boltzmann's constant — fixed by physics) |

Test: *"Could a caller legitimately want a different value?"* Yes → default param; No (universal constant) → `const` in body.

---

### Node 4: Locally defined functions

A function defined *inside* another function's body. It is bound in the **enclosing function's local frame** (alongside the parameters), not the global frame — so it's invisible outside, and dies when the enclosing call returns.

```javascript
function areaBetweenCircles(r1, r2) {
  function areaOfCircle(r) {     // local helper — bound in f1, not global
    return Math.PI * r * r;
  }
  return areaOfCircle(r1) - areaOfCircle(r2);   // defined once, called twice (DRY)
}
// areaOfCircle(3);   // ReferenceError — not visible out here
```

Frame picture — the inner function is **just another binding** in the local frame:

```
areaBetweenCircles() frame  [f1]      ← created on call, destroyed on return
  r1           -> 5
  r2           -> 3
  areaOfCircle -> func               ← a name→value binding, value happens to be a function
```

Why use one: define a helper **once**, call it **multiple times** (DRY), and keep it **close to where it's used** without polluting the global namespace. (Recall the 1.3 lesson: it's in **scope** only inside the enclosing function.)

---

### Node 5: Functions as abstractions — the abstraction barrier

A well-designed function is an **abstraction barrier**: callers depend only on **what** it does, not **how**. A caller needs just three things:

- **Domain** — the inputs it accepts (a volume, a temperature, …)
- **Range** — the values it returns (pressure in pascals)
- **Intent** — the relationship it computes (the ideal gas law)

If the implementation changes (say, a van der Waals correction), every caller keeps working as long as domain/range/intent stay the same.

Two refinements:

| Term | Meaning |
|------|---------|
| **Precondition** | a constraint on valid inputs (e.g., `clamp` requires `low ≤ high`; `isPrime` requires a positive integer). Invalid input → undefined behavior unless documented/handled. |
| **Side effect** | an observable interaction *beyond* the return value (printing, mutating state). Pure functions have none; they compose reliably. |

**Reuse, don't reinvent.** The `clamp` exercise shows the barrier at work — instead of hand-writing conditionals, compose two existing abstractions:

```
return Math.max(low, Math.min(val, high));
//        └─ floor ─┘  └── cap ──┘
```

`Math.min` is the *ceiling* (pulls `val` down to `high`); `Math.max` is the *floor* (pushes the result up to `low`). Zero `if/else` — just two-walls composition.

---

### 1.4 Quick reference

| Concept | One sentence |
|---------|--------------|
| **Single responsibility** | One function, one job — short name, one-line description |
| **DRY** | Repeated logic → one named function, reused |
| **Generality** | Define broadly; cover specifics with args/defaults |
| **JSDoc** | `/** ... */` above a function — the JS docstring (`@param`, `@returns`) |
| **Default parameter** | A fallback value used only when the argument is `undefined` |
| **Locally defined function** | A nested function bound in the enclosing local frame; invisible outside |
| **Abstraction barrier** | Callers depend on domain/range/intent, not the implementation |
| **Precondition** | A constraint on valid inputs |
| **Side effect** | An observable effect beyond the return value |

---

## Bridge: 1.3 → 1.4 → 1.5

| 1.3 idea | 1.4 extends it | 1.5 (Control) will add |
|----------|----------------|------------------------|
| Functions execute via frames/scope | Design them well: one job, DRY, general | `if`/`else`, loops — needed for `isPrime` |
| Domain/range/intent (the "what") | The abstraction barrier — callers depend only on the "what" | conditional logic inside function bodies |
| Local frames hold parameters | Local frames can also hold **locally defined functions** | block scope for `let`/`const` inside loops/branches |
| `Math.min`/`Math.max` as built-ins | Reuse them — `clamp` with no conditionals | loops that *repeatedly* apply such operations |

**1.5 (Control)** is where `isPrime` finally gets its loop — checking divisors from 2 to `√n`. The design work (domain = positive integers; the `1` edge case; the `√n` efficiency trick) is already done here in 1.4.
