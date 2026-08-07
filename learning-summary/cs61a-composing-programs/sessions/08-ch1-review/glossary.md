# Chapter 1 — Complete Glossary

> Every term in Chapter 1, plain-language. When a term goes fuzzy, come here.
> **⭐** = Forwardgrounds-critical (maps onto your renderer). Pairs with [`concept-map.md`](concept-map.md).

---

## ⭐ The Forwardgrounds-critical few (why these matter)

| Term | Why it's load-bearing for your renderer |
|---|---|
| **pure function** | your `render` phase must be pure → same seed ⇒ same pixels, every surface |
| **abstraction barrier** | your layer stack: source → semantic → scene primitives → output adapters |
| **closure** | a recipe *carries its own seed frame* → determinism + reproducibility |
| **first-class fn / HOF** | recipes-as-data; adapters compose target geometry |
| **recursion / tree recursion** | generative pixel fields — self-similar, seed-grown |
| **environment / frame** | the one data structure behind both closures and the call stack |
| **composition** | pure functions chain cleanly → your recipe→adapter pipeline |

---

## Two cross-cutting principles (bind multiple sections together)

1. **"JS captures values, not live links."** Three faces: the **snapshot trap** (1.2: `let area=π·r²` computes once), **pass-by-value** (1.3: a copy, not a link), **closure capture** (1.6: the birthplace frame). Lock this and three sections' bugs become predictable.
2. **Evaluation timing & error kind matter.** **Syntax vs runtime** (1.1: a typo is usually runtime, not syntax), **default-triggers-only-on-`undefined`** (1.4), **statement-executed vs expression-evaluated** (1.5).

---

## 1.1 · Getting Started

- **expression** — code that produces a value (`2 + 2`).
- **statement** — code that carries out an action; may contain expressions but isn't itself a value.
- **interpreter** — the program that evaluates/runs your code by a precise procedure.
- **REPL (Read-Eval-Print Loop)** — interactive mode: type an expression, see the result immediately.
- **`const` declaration** — binds a name to a value that won't be reassigned.
- **comment (`//`)** — text ignored by the engine, for human readers.
- **template literal** — backtick string with embedded `${…}` expressions.
- **arrow function** — inline function syntax `w => …`; defines an anonymous function.
- **anonymous function** — a function defined without a name.
- **method call** — invoking a function attached to an object (`response.text()`).
- **object** — data bundled with the operations that manipulate it (Chapter 2's topic).
- **array** — ordered list of values, written `[...]`.
- **`Set`** — collection storing only unique values.
- **debugging** — interpreting errors and diagnosing their causes.
- **syntax error** — violates grammar; caught *before* running.
- **runtime error** — syntactically valid but fails during execution (`TypeError`, `ReferenceError`).
- **semantic error** — runs without error but produces wrong results (flawed logic).
- **number type** — JS's single numeric type (IEEE-754 double; ints + floats together).
- **string** — text value, in quotes or backticks.
- **boolean** — a truth value (`true` / `false`).
- **`undefined`** — default "no value" marker for uninitialized things.
- **`null`** — explicit "no value" value (distinct from `undefined`).
- **`typeof` operator** — returns a string describing a value's type.
- **`Math` object** — built-in namespace of math functions/constants.
- **exponentiation (`**`)** — raises a base to a power (also `Math.pow`).
- **modulo (`%`)** ⭐ — remainder of a division. *(Used in 1.7 digit-splitting: `n % 10` = last digit.)*
- **integer division** — no dedicated JS operator; use `Math.floor(a / b)`.
- **Promise / async / `await`** — JS's asynchronous-I/O model; `fetch` returns a Promise.

## 1.2 · Elements of Programming

- **primitive expressions & statements** — the simplest building blocks the language provides.
- **means of combination** — how compound elements are built from simpler ones.
- **means of abstraction** ⭐ — how compound elements can be **named** and manipulated as units.
- **functions** — logic that transforms data (the other primitive kind, alongside data).
- **infix notation** — operator between operands (`3 + 4`).
- **operator** — the function being called (the expression before the parens, or the symbol `+`).
- **operand** — an argument subexpression inside a call's parens.
- **call expression** ⭐ — applies a function to arguments: `fn(arg1, arg2)`.
- **callee** — the function being called (the operator subexpression).
- **arguments** — the input values supplied in a call.
- **returns / return value** — the output a function produces.
- **nested expression** — an expression whose parts are themselves compound.
- **expression tree** — tree diagram of a nested expression; values combine upward.
- **leaf node / interior node** — primitive (leaf) vs call (interior) points in the tree.
- **evaluation procedure (recursive)** ⭐ — evaluate operator → evaluate operands left-to-right → apply.
- **import (ES module)** — `import … from '…'` to load library functions.
- **module / namespace** — an organized unit / grouping object of related functions (`Math`).
- **name / identifier** — a label referring to a value.
- **binds / binding / assignment / rebinding** — associating (or re-associating) a name with a value.
- **`const` / `let`** — keywords for non-reassignable / reassignable bindings.
- **environment** ⭐ — the interpreter's memory of names, values, and their bindings.
- **destructuring assignment** — binding several names at once from an array/object pattern.
- **numeral** — a primitive expression evaluating to the number it names.
- **pure function** ⭐ — no effects beyond returning; same args ⇒ same result. *(Your `render` phase.)*
- **non-pure function** — produces side effects (`console.log`).
- **side effect** — a change to interpreter/world state beyond returning a value.
- **reliable composition / concurrency** — pure functions chain safely and run in parallel without interference.
- **`BigInt`** — arbitrary-precision integer type, written `10n`.
- **strict equality (`===`)** ⭐ — equality with no type coercion (always prefer).
- **loose equality (`==`)** — equality that coerces types (avoid).
- **truthiness / falsy** — which values count as true-like vs false-like in conditions.
- **snapshot trap** ⭐ — `let area = π·r²` computes **once**; rebinding `r` won't update `area`.

## 1.3 · Defining New Functions

- **function definition** ⭐ — binding a name to a compound operation so it's reusable.
- **function declaration** — `function name(x){ … }` syntax creating a user-defined function.
- **formal parameter** — placeholder name for a value the function will receive.
- **function body** — the statements specifying what the function computes.
- **user-defined function** — a function you define; used identically to built-ins.
- **environment (sequence of frames)** ⭐ — the chain of frames determining how names resolve.
- **frame** ⭐ — a structure holding name→value bindings.
- **binding** — a name→value association stored in a frame.
- **global frame** — the single top-level frame holding all top-level declarations.
- **local frame** — a new frame created for each function call, holding its parameters.
- **intrinsic name** — the name on a function definition; informational, not used for lookup.
- **name lookup / evaluation** — finding a value in the innermost frame that has the name.
- **local names** — parameter names accessible only inside their defining function.
- **scope** ⭐ — the region of code where a name is accessible.
- **out of scope / block-scoped / function-scoped** — accessibility rules for `let`/`const` (block) vs `var` (function).
- **camelCase** — JS naming convention (`sumSquares`).
- **functional abstraction** — treating a function by *what* it does, not *how*.
- **domain / range / intent** ⭐ — the inputs accepted / outputs produced / input→output relationship.
- **operator-as-function** — reading `2 + 3` as `add(2, 3)`.
- **precedence** — rules deciding which operator binds tighter.
- **floor division / `Math.trunc`** — `Math.floor(a/b)` (rounds down) vs `Math.trunc` (toward zero).
- **remainder operator (`%`)** — JS's sign-of-dividend remainder (not true modulo).
- **first-class (function as value)** — referencing a function without calling it (`square` vs `square(3)`).
- **pass-by-value** ⭐ — the function gets a **copy** of the argument; can't see the caller's variable.

## 1.4 · Designing Functions

- **single responsibility** — each function has exactly one job.
- **DRY (Don't Repeat Yourself)** — extract repeated logic into a named, reused function.
- **generality** — define functions broadly enough to cover related cases.
- **documentation / JSDoc** — `/** … */` block comment documenting a function (`@param`, `@returns`, `@example`).
- **default parameter value** — value used when a caller omits that argument.
- **default trigger (`undefined`)** ⭐ — JS defaults activate **only** when an arg is `undefined` (not `null`/`0`/`""`).
- **locally defined / nested function** — a function defined inside another, visible only there.
- **lexical scope** ⭐ — inner functions access names from where they were *defined*, not called.
- **abstraction barrier** ⭐ — callers depend only on *what* a function does, not *how*. *(Your layer stack.)*
- **preconditions** — constraints on the valid inputs a function accepts.
- **string interpolation** — embedding expressions in backtick strings.

## 1.5 · Control

- **statement (executed)** — code run for its effect; produces no value.
- **expression statement** — an expression used as a statement; its value is discarded.
- **simple vs compound statement** — single statement vs header + `{ }` block.
- **header / block / clause / suite** — the controlling line / enclosed statements / header+block pair.
- **local environment / local frame** — the new environment created when a function is called.
- **`return` statement** ⭐ — exits a function, supplying its return value.
- **modular** — programs whose parts interact only through inputs/outputs.
- **conditional statement** — `if / else if / else` choosing which block runs.
- **boolean context / boolean values** — a position where only truth matters; `true`/`false`.
- **comparison operators** — `>`, `<`, `>=`, `<=`, `===`, `!==` → booleans.
- **assignment vs equality** — `=` assigns, `===` compares (don't confuse).
- **boolean operators** — `&&` (and), `||` (or), `!` (not).
- **short-circuiting** — `&&`/`||` may return without evaluating their right side.
- **iteration / `while`** ⭐ — repeats a block while its header stays truthy (init · condition · update).
- **infinite loop** — a `while` whose condition never becomes false.
- **destructuring swap** — `[a, b] = [b, a]` exchanging two values.
- **testing / test / unit test** — verifying behavior; a test exercises one function.
- **assertion / `console.assert`** ⭐ — checks a condition; **logs** if falsy (keeps running).
- **`assertEqual`** ⭐ — helper that **throws** on mismatch (halts) — unlike `console.assert`.
- **falsy values** — `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- **truthy values** — everything else (note: `[]` and `{}` are truthy in JS).
- **nullish coalescing (`??`)** — default only for `null`/`undefined`, not `0`/`""`.
- **`NaN`** — "not-a-number"; falsy and *unequal to itself*.

## 1.6 · Higher-Order Functions ⭐ (the Forwardgrounds payoff)

- **higher-order function (HOF)** ⭐ — takes functions as args **or** returns them.
- **functions as arguments** — passing a function to generalize a pattern.
- **general methods / iterative improvement** — generic algorithms independent of specific functions.
- **update / close functions** — refine a guess one step / test whether it's good enough.
- **nested function definitions** — helper functions defined inside another.
- **lexical scope (recap)** ⭐ — inner functions see names from their definition site, not call site.
- **parent environment / frame extends parent** — a called function's local frame chains to its parent.
- **functions as return values / function factory** ⭐ — a function (`makeAdder`) that creates specialized functions.
- **function composition** — building `f(g(x))` via an HOF like `compose1`.
- **closure** ⭐ — the returned function **carrying its parent environment** with it. *(Full re-teach below.)*
- **birthplace frame** ⭐ — the frame active when a function was *defined*; a closure's parent points here (NOT global).
- **Newton's method / derivative / zeros** — iterative root-finding (showcase; math deliberately skimmed).
- **currying / `curry2`** — transforming a multi-arg function into a chain of single-arg ones.
- **lambda / arrow function** — anonymous function expression `(x) => …`.
- **first-class status** ⭐ — an element that can be named, passed, returned, stored.
- **function decorator** — HOF wrapping another to add behavior (`@deco` ≡ `f = deco(f)`).
- **trace / memoization decorators** — log each call / cache results to avoid recomputation.
- **callback** — a function passed to be invoked later.
- **`map` / `filter`** — array methods applying a function to elements.

## 1.7 · Recursive Functions ⭐ (the generative medium)

- **recursive function** — calls itself directly or indirectly.
- **base case** ⭐ — simplest input handled directly, without recursion (the stop condition).
- **recursive call / recursive step** ⭐ — calling the same function on a simpler argument; **must call AND `return`**.
- **recursive leap of faith** ⭐ — trust the simpler call works when checking your logic (proof by induction).
- **iterative vs recursive** — looping with accumulators vs calling itself on smaller inputs.
- **call stack** ⭐ — the implicit stack of frames for active calls; recursion holds state here.
- **mutual recursion** — 2+ functions calling each other (`isEven`/`isOdd`).
- **ternary operator** — `test ? value : alternative` expression.
- **printing vs returning** ⭐ — `console.log` displays but returns `undefined`; `return` produces a usable value.
- **tree recursion / tree recursive** ⭐ — makes **2+ recursive calls** per invocation, branching into a tree.
- **Fibonacci sequence** — `0,1,1,2,3,5,8,…`; classic tree-recursion example.
- **counting partitions** — ways to write `n` as a sum of parts up to size `m` (decision-branching).
- **stack limit / `RangeError`** — max call-stack depth; too-deep recursion overflows.
- **proper tail call (PTC) / tail position / TCO** — a tail-position call allowed (ES2015) to reuse a frame; **Node.js/V8 don't implement it**.
- **trampolining / thunk** — wrapping recursive calls in zero-arg functions to avoid stack overflow.

---

## ⭐ Appendix — Closure, the full re-teach

**Definition:** a **closure** = a function **+ the birthplace frame it carries**. The function "remembers" the names visible where it was *made*, even after that frame's function has returned.

```js
function makeAdder(n) {        // n lives in makeAdder's frame — the BIRTHPLACE
  return function (x) {        // this inner function IS the closure
    return x + n;              // it remembers n via its birthplace frame
  };
}
const add5 = makeAdder(5);     // add5 carries n=5 even after makeAdder() returns
add5(3);                       // 8
```

- **The mechanism (concept-map key):** a closure's parent pointer *is* the 1.3 environment chain. The birthplace is just a **1.3 local frame that outlived its caller** — kept alive because the closure still points at it.
- **The trap:** it captures the birthplace **frame** (a *live box*), **not a frozen value** — if the box changes before you call, the closure sees the change.
- **Each call makes its own:** `makeAdder(5)` and `makeAdder(10)` carry **separate** `n` values — separate birthplace frames.
- **Forwardgrounds payoff:** a recipe closes over its **own seed frame** (`rngFor(key)`). Two recipes never share state → same seed ⇒ same pixels, on every surface. *That isolation is reproducibility.*
