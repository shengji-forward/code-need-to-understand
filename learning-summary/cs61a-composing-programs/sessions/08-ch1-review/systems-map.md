# Chapter 1 — Systems Map (Anatomy of a Program)

> Every Chapter 1 term plays one of **six roles** in a program-as-a-system.
> This map groups them by role and shows **how the roles connect** — so you see structure, not isolated facts.
> For *definitions*, see [`glossary.md`](glossary.md). For the *through-line*, see [`concept-map.md`](concept-map.md). **⭐** = Forwardgrounds-critical.

---

## The system at a glance

```
1. ABSTRACTION  ── wraps the whole system so it stays manageable as it grows
   (function definition · abstraction barrier · HOF · recursion)

                            wraps ↓

2. DATA  ──►  3. OPERATIONS  ──►  results
(the raw       (the transformers)      │
 material)                            lives in  → 4. STATE & ENVIRONMENT  (names · frames · closures · call stack)
                                    driven by  → 5. CONTROL              (statements · loops · conditionals · return)
                                          │
                                          ▼  checked by
                            6. CORRECTNESS (errors · tests · pure functions · reproducibility)
```

Read it as a sentence: **data flows through operations (held in state, driven by control), the whole thing is wrapped in abstraction and checked by correctness.** That's any program — and any renderer.

---

## 1 · DATA — the raw material (what programs manipulate)

**Terms:** `number` · `string` · `boolean` · `BigInt` · `undefined` · `null` · `NaN` · ⭐`array` · `object` · `Set` · `numeral` · `template literal` · `typeof` · `primitive expressions` (as values).

**Connects to:** OPERATIONS consume and produce data; STATE holds it.

**⭐ Forwardgrounds:** the *pixel/cell values*, the *seed string*, the recipe *parameters* (`density`, `hold`), and the *semantic events* — the stuff your recipe manipulates.

---

## 2 · OPERATIONS — the transformers (what turns data into other data)

**Terms:** ⭐`expression` · ⭐`call expression` · `operator` · `operand` · `callee` · `arguments` · `returns` · `nested expression` · `expression tree` · ⭐`evaluation procedure (recursive)` · `infix notation` · `comparison/logical expression` · `comparison & boolean operators` · `short-circuiting` · ⭐`modulo (%)` · `exponentiation (**)` · `integer/floor division` · `Math.trunc` · `method call` · ⭐`function definition` · `function declaration` · `formal parameter` · `function body` · `arrow function` · `anonymous function` · ⭐`higher-order function (HOF)` · `functions as arguments/return values` · ⭐`function composition` · `function factory` · ⭐`currying` · `map` · `filter` · ⭐`recursion` · ⭐`recursive call` · `mutual recursion` · ⭐`tree recursion` · `Fibonacci` · `counting partitions` · `operator-as-function`.

**Connects to:** takes DATA in, returns DATA out; runs inside STATE; sequenced by CONTROL; the reusable ones get wrapped by ABSTRACTION.

**⭐ Forwardgrounds:** your **`prepare`** (signal → scene primitives) and **`render`** (scene + time → pixels) functions are the operations; `rngFor(key)` is the variation operation; a generative *field* is a recursive operation grown from the seed.

---

## 3 · STATE & ENVIRONMENT — where things live (memory & names)

**Terms:** ⭐`environment` · ⭐`frame` · `binding` · ⭐`global frame` · `local frame` · ⭐`name/identifier` · `binds / assignment / rebinding` · ⭐`const` / `let` · ⭐`scope` · `out of scope` · `block-/function-scoped` · `local names` · `intrinsic name` · ⭐`name lookup` · ⭐`lexical scope` · ⭐`parent environment` · `frame extends parent` · ⭐`closure` · ⭐`birthplace frame` · ⭐`call stack` · `module` · `namespace` · `import` · `destructuring` · ⭐`snapshot trap` · ⭐`pass-by-value`.

**Connects to:** holds the DATA that OPERATIONS use; the call stack tracks CONTROL's nested calls; closures are STATE carried by an operation (the bridge to ABSTRACTION).

**⭐ Forwardgrounds:** the **scene model** is the shared STATE; a **recipe instance closes over its own seed frame** (a closure) — that isolation is what makes two recipes not bleed into each other → reproducibility.

---

## 4 · CONTROL — the flow of execution (what runs, when, in what order)

**Terms:** `statement` · `expression statement` · `simple/compound statement` · `header` · `block` · `clause` · `suite` · ⭐`return statement` · ⭐`iteration / while` · `infinite loop` · `accumulator` · `conditional (if/else if/else)` · `boolean context` · ⭐`ternary operator` · `short-circuiting` · `statement execution vs evaluation` · ⭐`printing vs returning` · ⭐`proper tail call / tail position / TCO` · `trampolining` · `thunk` · `REPL` · `interpreter` · `script file`.

**Connects to:** drives OPERATIONS in sequence; the **call stack** is CONTROL's record of nested calls (recursion lives here); conditionals gate on DATA.

**⭐ Forwardgrounds:** the **timeline** (`atSeconds: 0 → trace, 12 → settle`), the **loop** (`durationSeconds: 20, boundary: seamless`), and the **frame clock** that drives `render` each tick — that's your CONTROL layer.

---

## 5 · ABSTRACTION — managing complexity (hiding detail behind names & barriers)

**Terms:** ⭐`means of abstraction` · `means of combination` · `primitive expressions` · ⭐`functional abstraction` · ⭐`domain / range / intent` · ⭐`abstraction barrier` · `preconditions` · `single responsibility` · `DRY` · `generality` · `documentation / JSDoc / docstring` · `@param / @returns / @example` · `default parameter value` · `default trigger (undefined)` · `locally defined / nested function` · `nested function definitions` · ⭐`first-class status` · ⭐`decorator` · `trace / memoization decorators` · `iterative improvement` · `update / close functions` · `general methods` · `Newton's method` · `callback` · ⭐`composition`.

**Connects to:** wraps OPERATIONS + STATE into reusable, hideable units; the **abstraction barrier** is the contract between layers; HOF/recursion are abstraction's power tools.

**⭐ Forwardgrounds:** your **layer stack** (source → semantic → scene → adapters) *is* a stack of abstraction barriers; **recipes-as-data** = first-class/HOF; *"renderers may not invent editorial meaning"* = a pure abstraction barrier.

---

## 6 · CORRECTNESS — knowing it works (errors, tests, purity, reproducibility)

**Terms:** `syntax error` · `runtime error` · `semantic error` · `error type/message` · `debugging` · `testing` · `test` · `unit test` · `assertion` · ⭐`console.assert` (logs) · ⭐`assertEqual` (throws) · ⭐`pure function` · `non-pure function` · `side effect` · `reliable composition` · `concurrency` · ⭐`strict equality (===)` · `loose equality (==)` · ⭐`truthiness / falsy values` · `nullish coalescing (??)` · `stack limit` · ⭐`RangeError (stack overflow)` · `RecursionError`.

**Connects to:** checks the DATA→OPERATIONS results; **purity** is the property that makes a function reproducible and parallelizable; tests assert CONTROL paths produce expected DATA.

**⭐ Forwardgrounds:** the render must be **pure + seeded → reproducible** (reproducibility manifest); *"integer coordinates, frozen assets, explicit rounding"* is a correctness/determinism contract; the **zero-stage test matrix** is your correctness gate before wiring hardware.

---

## How the roles move together — one Forwardgrounds render, all six firing

A single recipe plays out as a system:

1. **DATA** — a source signal + approved `semanticEvents` + recipe `parameters` (`density: 0.12`, `hold: 0.45`) + `seed`.
2. **OPERATIONS** — `prepare()` transforms the signal into surface-independent scene primitives; `render(time, quality, target, rng)` turns those into pixels; a recursive *field* operation grows self-similar geometry from the seed.
3. **STATE & ENVIRONMENT** — the recipe instance closes over its **own seed frame** (`rngFor(key)`); the **scene model** is the shared structure each adapter reads.
4. **CONTROL** — the **timeline** fires actions at `atSeconds` marks; the **frame clock** calls `render` each tick; the **loop** (`20s, seamless`) bounds it.
5. **ABSTRACTION** — the **layer stack** (source → semantic → scene → adapters) is the barrier; recipes are **first-class data** handed to the engine; adapters may change density/timing but *"may not invent editorial meaning."*
6. **CORRECTNESS** — purity + seed ⇒ the **reproducibility manifest** reproduces the same pixels across web / OpenTUI / LED; the **zero-stage test matrix** verifies it before hardware.

**That's systems thinking:** you stop seeing "200 vocabulary terms" and start seeing *six roles, flowing into each other, running your renderer.* When something breaks, you ask *which role* — is it bad data, a wrong operation, lost state, mis-timed control, a leaky barrier, or a failed check? That diagnosis is the engineer's move; a vibe-coder can't make it.
