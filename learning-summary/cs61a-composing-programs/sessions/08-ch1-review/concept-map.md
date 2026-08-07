# Chapter 1 — Building Abstractions with Functions
## The Whole View · An Integrated Concept Map

> **One idea**, escalating across seven sections, standing on **two pillars**.
> Primary source: [Composing Programs · Ch.1](https://www.composingprograms.com/) (DeNero, CC BY-SA 3.0), JS edition.
> *Stuck on anything below? Ask the agent — it's your teacher.*

---

### The one idea: ABSTRACTION

**Abstraction = hiding detail behind a name**, so you can think at a higher level.
Every section of Chapter 1 gives you a more powerful thing you can **name**:

| § | What you can NAME | The leap | Example |
|---|---|---|---|
| 1.1 | an **expression** | raw computation | `3 * (4 + 5)` |
| 1.2 | a **value** | bind a result to a name | `const radius = 10` |
| 1.3 | an **operation** | name a compound operation | `function area(r){ … }` |
| 1.4 | a **well-designed operation** | the *abstraction barrier*: domain / range / intent | `area(r) → number  // disk area` |
| 1.5 | a **controlled operation** | repeat / branch (loops & conditionals) | `while`, `if/else` |
| 1.6 | an **operation AS a value** | functions are first-class — pass, return, store them | `map(fn, …)`, closures |
| 1.7 | a **self-referential operation** | define a problem in terms of a smaller itself | `fact(n) = n * fact(n-1)` |

Read **down** the table — that's the whole chapter. You start with raw expressions and end able to treat *operations themselves* as building blocks, and to decompose hard problems into simpler versions of themselves.

---

### Two pillars everything stands on

**Pillar A — The Environment Model *(WHERE named things live)***
The single data structure of the chapter, escalating in complexity:

```
1.2  names  +  a global environment
1.3  +  local frames  +  the scope wall  (a callee cannot see the caller's frame)
1.6  +  closure parent links             (a function carries its birthplace frame)
1.7  +  the call stack                   (frames stack up, then unwind to a base case)
```

It's the **same object the whole way** — a frame with a parent pointer — just more of them, linked deeper.

**Pillar B — Evaluation *(WHEN things compute)***

```
1.1  parse  vs  runtime      (a typo is often a runtime ReferenceError, not a syntax error)
1.2  evaluate once           (the snapshot trap: rebinding `radius` won't recompute `area`)
1.5  execute  vs  evaluate   (a statement's value is discarded; `return` keeps it)
```

Mastery of Chapter 1 = knowing **when** each expression fires and **what kind** of result or error it produces.

---

### The one recurring trap (binds 1.2 → 1.3 → 1.6)

> **"JavaScript captures VALUES, not live links."**

Three faces of the same principle:
- **1.2 · snapshot:** `let area = π·r²` freezes `area` *once*; later changing `r` doesn't refresh it.
- **1.3 · pass-by-value:** a function receives a *copy* of its argument; it cannot see or mutate the caller's variable.
- **1.6 · closure capture:** a returned function captures the *value* sitting in its birthplace frame at the moment it reads it.

Lock in this one principle and **three sections' worth of bugs become predictable**.

---

### The dependency map (what builds on what)

```
1.1 expressions ─► 1.2 names & environment ─► 1.3 defining functions (frames + scope)
                                                     │
                                                     ▼
                          1.4 designing functions ◄── (needs control flow) ──► 1.5 control
                                                     │
                                                     ▼
                          1.6 higher-order functions ─────────────────────► 1.7 recursion
```

**Two non-obvious backward links are the keys to the whole chapter:**

- **1.6 depends on 1.3** — a closure's parent pointer *is* the 1.3 environment chain. The "birthplace frame" is just a 1.3 local frame that outlived its caller.
- **1.7 depends on 1.3 + 1.6** — recursion is the 1.3 frame mechanism repeated. The call stack is **stacked local frames unwinding to a base case**; the "leap of faith" is the same trust as a closure capturing a value.

---

### The payoff — where Chapter 1 meets Forwardgrounds

Forwardgrounds renders pixel-native **signals** through a **recipe engine** and a stack of **output adapters** (web/Canvas · OpenTUI · ESP32/HUB75 LED). Chapter 1 *is* that architecture in concept form — three sections map straight onto it:

| CS61A concept | Forwardgrounds reality |
|---|---|
| **1.4 abstraction barrier** | your **layer stack**: source signal → semantic events → normalized timeline → surface-independent scene primitives → output adapters. *"Renderers may not invent editorial meaning"* = a pure abstraction barrier. |
| **1.4 + 1.6 pure functions & composition** | your **deterministic, seekable `render` phase** + reproducibility manifests. *"Integer coordinates, frozen assets, explicit rounding"* = purity *for reproducibility* across surfaces. |
| **1.6 first-class fns / HOF / closures** | your **recipe engine**: recipes as data, `prepare`/`render` as functions, adapters composing target geometry; seeded `rngFor(key)` + cached preparation = closure-captured, reproducible state. |
| **1.7 recursion / tree recursion** | your **generative pixel systems** — self-similar fields, particles, and fractal compositions grown from a seed. |

**The math you hated is the medium.** Factorial, Fibonacci, and partitions weren't detours: self-similar recursion is how a pixel *field* grows from a seed; decision-branching (the partitions' include/exclude) is how a generative composition *chooses*. The "boring examples" were secretly your product all along.

---

### The seven biggest traps (one per section — highest-value review)

1. **1.1** — `consolle.log("hi")` is a **runtime** `ReferenceError`, not a syntax error (the grammar is valid; the name just isn't found at lookup).
2. **1.2** — snapshot trap: `let area = π·r²` computes **once**; rebinding `r` won't update `area`.
3. **1.3** — name lookup is **one-way**: a function reads its own frame + global, *never* the caller's.
4. **1.4** — default parameters trigger **only on `undefined`** (`null` / `0` / `""` / `false` do *not*).
5. **1.5** — `console.assert` **logs** (keeps running); `assertEqual` **throws** (halts).
6. **1.6** — a closure's birthplace is the **factory frame**, not `Global`.
7. **1.7** — the recursive step must **call** the function (`n * factorial(n-1)`, not `n * (n-1)`) **and `return`** the result.

---

*Next: Session 2 re-learns 1.1–1.3 by retrieval (you recall, I correct) — but first, react to this map. What feels wrong, missing, or still fuzzy?*
