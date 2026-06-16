# Session 03 — 1.3 Defining New Functions: Learning Report

**Completed**: 2026-06-15
**Source**: [Composing Programs 1.3](https://www.composingprograms.com/pages/13-defining-new-functions.html)

---

## Concept Map

Section 1.3 moves from *name → value* bindings (1.2) to *name → compound operation*. The new engine: every call spawns a fresh local frame.

```
Function Definitions (name → compound operation)
       │
       ├──→ Environments = sequence of frames
       │         ├── Global frame (shared)
       │         └── Local frame  (per call — holds params)
       ├──→ Calling a user-defined function (3 steps)
       ├──→ Scope — params local to body; wall between frames
       ├──→ Pass by value — value copied to a fresh name tag
       ├──→ Composition — nested calls, multiple frames alive
       └──→ Functions as abstractions — domain, range, intent
```

| Node | One sentence | Key distinction |
|---|---|---|
| **Function definitions** | Bind a name to a compound operation; body runs only when called | Defining ≠ calling — the body is not evaluated at definition time |
| **Environments** | A sequence of frames (global + local) holding name → value bindings | Global is shared; a fresh local frame is created per call |
| **Calling a function** | Evaluate operator/operands → create local frame, bind params → evaluate body | Local frame is destroyed on `return` |
| **Name lookup** | Check the local frame first, then fall through to global | One body can pull names from both frames |
| **Scope** | A parameter is in scope only inside its own function's frame | Two frames can both bind `x` without colliding — there's a wall |
| **Pass by value** | The argument's value is *copied* onto the callee's fresh name tag | A copy, not a link — caller's later changes don't reach the callee |
| **Functions as abstractions** | Depend on domain/range/intent, not implementation | Callers can't tell built-in from user-defined |

---

## The WH-Framework — A Lens for 1.3

A useful way to organize the whole section: map each WH-question onto a function concept.

| Question | Function concept | 1.3 topic |
|---|---|---|
| **WHAT** does it do? | domain, range, intent | Functions as abstractions |
| **HOW** does it do it? | the body / implementation | what abstraction *hides* |
| **WHERE** do its names live? | environments — global vs local frames; scope | Environments, scope |
| **WHEN** does the body run? | on call (not definition); frames created → destroyed; eval order | The call procedure |
| **WHY** use / design it that way? | abstraction, reuse, purity, isolation | preview of **1.4 — Designing Functions** |
| **WHO** is involved? | caller vs callee; the interpreter as evaluator | pass-by-value, who reads which frame |

- **WHAT / HOW** is the official pair from the reading (depend on the *what*, hide the *how*).
- **WHERE** (environments/scope) and **WHEN** (call lifecycle) are the other two pillars of 1.3 — almost every trace answered a *where* or *when* question.
- **WHY** points forward to 1.4; **WHO** is a mnemonic for the caller/callee roles.

In one line: **1.3 = WHAT/HOW (abstraction) + WHERE (environments/scope) + WHEN (call lifecycle).**

---

## Objectives

- [x] Define functions with parameters and return values
- [x] Trace function calls through environment diagrams (global frame → local frame)
- [x] Understand scope and local name lookup (the wall between frames)
- [x] Compose functions (one function calling another) and trace multiple alive frames
- [x] Apply operator precedence and use `Math` built-ins
- [x] Use default parameters
- [x] Complete all 6 practice exercises (17/17 checks passing)

---

## What You Learned

### 1. Function Definitions — Naming a Compound Operation

A function definition binds a name to a *process*, going beyond 1.2's name → value bindings:

```javascript
function square(x) {
  return x * x;
}
```

| Part | Meaning |
|---|---|
| `square` | Name bound to the function (in the global frame) |
| `x` | Formal parameter — a placeholder with no value yet |
| `return x * x` | Body — not evaluated until the function is called |

Defining just tapes the name to the board; nothing runs. User-defined functions are indistinguishable from built-ins at the call site.

### 2. Environments — Global + Local Frames

An environment is a sequence of **frames**, each holding name → value bindings. There is one **global frame**; each call creates a fresh **local frame** holding the parameter bindings for that one invocation.

**Kitchen analogy used in session:** the global frame is the recipe board on the wall (every cook sees it); a local frame is a cook's order ticket + prep station (created on the order, torn up when the dish is served / `return`).

### 3. Calling a User-Defined Function

Three steps, every call:

1. Evaluate the **operator** and **operand** subexpressions.
2. Create a new **local frame**; bind formal parameters to argument values.
3. Evaluate the **body** in the environment starting at that local frame.

Trace `square(-2)`: call → frame `x -> -2` → body `x * x` → `(-2)*(-2) = 4` → return 4 → frame destroyed.

### 4. Name Lookup — Local First, Then Global

A name resolves to the value in the *innermost* frame that contains it. Local frames are checked before the global frame. In `areaOfCircle`, one body pulled `radius` from the local frame and `Math` + `square` from the global frame.

### 5. Scope & Local Names — The Wall Between Frames

Parameters are **local** to their function's body. Two frames can bind the same name to different values without interference — there is a wall between local frames. Tracing `cube(3)` = `x * square(x)` showed two frames (`f1`: cube's `x -> 3`, `f2`: square's `x -> 3`) alive at once, fully isolated. When `square`'s body looks up `x`, it opens its **own** frame (`f2`), never the caller's.

### 6. Pass by Value — How a Value Crosses the Wall

The only thing that crosses the wall is a **value being passed**, not a frame being shared:

- The caller evaluates the argument in *its own* frame (e.g. reads `x -> 3` off `f1`).
- That **value** (`3`) is handed to the callee.
- The callee creates a **fresh** binding on its own name tag (`f2: x -> 3`).

It's a **copy**, not a link — proven by changing `cube` to `square(5)`: square's `x` becomes `5` while cube's `x` stays `3`. This was the key misconception surfaced and resolved in the session (the direction of name lookup between caller and callee).

### 7. Operators as Function Application & Precedence

Infix operators model function application: `2 + 3 * 4 + 5` ≡ `add(add(2, mul(3, 4)), 5)`. Precedence (`*` `/` before `+` `-`, left-to-right) groups the expression, so `c * 9 / 5 + 32` needs no parentheses — it is already `((c * 9) / 5) + 32`. JS `/` always returns a float; use `Math.floor(a / b)` for floor division.

### 8. Functions as Abstractions

A caller depends only on **what** a function does (domain, range, intent), not **how**. Any function with the same input → output relationship is interchangeable behind the interface.

---

## Practice Exercises

All 6 exercises passed (17/17 checks):

```text
PASS: square(5)            PASS: freezing point        PASS: default greeting
PASS: square(-3)           PASS: boiling point         PASS: custom greeting
PASS: square(0)            PASS: body temp             PASS: howdy
PASS: cube(3)              PASS: areaOfCircle(10)      PASS: hypotenuse(3,4)
PASS: cube(2)              PASS: areaOfCircle(1)       PASS: hypotenuse(5,12)
PASS: cube(-1)                                        PASS: hypotenuse(1,1)
```

Answers:

| # | Function | Body | Concept exercised |
|---|----------|------|-------------------|
| 1 | `square(x)` | `return x * x;` | Basic definition; parameter as placeholder |
| 2 | `cube(x)` | `return x * square(x);` | Composition — one function calling another |
| 3 | `areaOfCircle(radius)` | `return Math.PI * square(radius);` | Local-then-global lookup (`radius` local, `Math`/`square` global) |
| 4 | `celsiusToFahrenheit(c)` | `return c * 9 / 5 + 32;` | Operator precedence — no parentheses needed |
| 5 | `greet(name, greeting = "Hello")` | `return greeting + ", " + name + "!";` | Default parameters + string concatenation |
| 6 | `hypotenuse(a, b)` | `return Math.sqrt(square(a) + square(b));` | Capstone — nested calls, multiple frames, global built-in |

Exercise 6 was the capstone: three local frames (`hypotenuse`, two `square` calls) each created and destroyed, both `square` frames naming their parameter `x` with different values (`3`, `4`) — scope isolation in action — plus `Math.sqrt` found in the global frame.

---

## Key Takeaways

1. **Defining ≠ calling** — a definition just tapes a name to the global board; the body runs only when called.
2. **Every call spawns a fresh local frame** — define → spawn frame → look up local-then-global → return → destroy frame. This loop is the engine under every program.
3. **Name lookup is innermost-first** — a single body can pull some names from its local frame and others from global.
4. **Scope walls off frames** — two functions can both use `x` without colliding; a function never reads its caller's frame.
5. **Values are passed, not frames shared** — the argument is evaluated in the caller's frame, then copied onto the callee's fresh name tag (pass by value).
6. **Composition multiplies frames, not confusion** — nested calls mean multiple isolated frames alive at once, each destroyed on return.
7. **Good functions are abstractions** — depend on domain/range/intent, not implementation; callers can't tell built-in from user-defined.

---

## Recap & Self-Assessment

After completing the exercises, worked through all 9 concepts in a Q&A recap:

| # | Concept | Result |
|---|---|---|
| 1 | Defining vs. calling | ✅ solid |
| 2 | Environments & frames | ✅ solid |
| 3 | 3-step call procedure | ✅ solid |
| 4 | Name lookup (local → global) | ✅ solid |
| 5 | Scope / the wall | ✅ solid (sharpened: *who reads which frame, when*) |
| 6 | Pass by value (copy, not link) | ✅ solid |
| 7 | Composition | ⚠️ corrected — see below |
| 8 | Abstraction (domain/range/intent) | ✅ solid |
| 9 | Operators & precedence | ⚠️ partial — see below |

**Two corrections to lock in:**

1. **Only *user-defined* functions create local frames — built-ins do not.** In `hypotenuse(3, 4)` the count is **3** frames (`hypotenuse`, `square(a)`, `square(b)`), *not* 4. `Math.sqrt` is a built-in, applied directly with **no frame**. Also, the `square` calls run **before** `Math.sqrt` — they produce its argument (`25`) — they are not nested *inside* a Math frame.
2. **Same-precedence operators evaluate left-to-right.** Precedence puts `*` `/` above `+` `-`; but when two operators share a level (`*` with `/`, or `+` with `-`), **left-to-right** decides: `c * 9 / 5` is `(c * 9) / 5`. Example: `12 / 3 * 2` → `(12/3)*2 = 8`, not `12/(3*2) = 2`.

**A subtle scope point (resolved during the recap):** "Square never reads cube's ticket" is precise only if you track *when*. The operand `x` in `square(x)` is evaluated **while the interpreter is still running cube's body** — so reading `f1` then is *cube's* lookup, done on cube's behalf. Once the interpreter switches to square's body, it consults **only** `f2` (+ global), never `f1`. There is **one interpreter** (one cook); it just stands at different tickets at different moments.

---

## What's Next

**Session 04 — Designing Functions (1.4)**
- Read: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions.md`
- Practice: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/practice.js`
- Objectives: Design functions with deliberate domain/range/intent, choose good names, understand the distinction between functions and their names, and keep functions pure and composable. Builds directly on the frame-and-scope engine from 1.3.
