# CS61A Concept Map — 2.4 Mutable Data

> The "bug smells like which idea?" reference for the build phase. Pairs with `learning-report.md`.

---

## Big Picture

```text
MUTABLE DATA = boxes whose CONTENTS can change after birth
        │
        ├─── THE KEY LAW:  const freezes the NAME-BINDING, never the box's contents
        │        const arr = [1,2,3];  arr[0] = 99  ✓ legal     (contents mutated)
        │        const arr = [1,2,3];  arr = [7]    ✗ TypeError (name rebound)
        │        const count = 0;       count += 1   ✗ TypeError (number has no inside)
        │        → EDITABLE MEMORY NEEDS let
        │
        ├─── DOMINO 1: IDENTITY CRISIS
        │        {x:1} === {x:1}  → false    (=== asks "same BOX?", never "same contents?")
        │        a = obj; b = a;  a === b    → true     (two names, one box)
        │
        ├─── DOMINO 2: SHARED BOXES  (the Google-Doc effect)
        │        mutate a box → every holder sees the change; bugs strike from a distance
        │        shallow copy { ...obj } = new outer box, SHARED inner boxes
        │        in-place vs rebuild = visible to all holders vs caller keeps the old
        │
        ├─── DOMINO 3: PRIVATE STATE  (the payoff)
        │        closure + let = a box only the closure can reach
        │        makeAdder (frozen) → makeCounter → makeWithdraw → makeAccount
        │
        └─── THE COST: REFERENTIAL TRANSPARENCY breaks
                 same inputs → different outputs (the birthplace memory is a hidden input)
                 = WHY render must be pure; why reproducibility demands immutability
```

---

## Node 1: Mutation ops return side-info, never the box

| op | mutates the box | returns |
|---|---|---|
| `push(x)` | appends | new **length** |
| `pop()` | removes last | the **removed element** |
| `splice(i, n, …items)` | removes/inserts at i | **array of removed** |
| `arr[i] = x`, `obj.k = v` | writes one slot | the assigned value |

Pattern: mutate, then `return arr;` separately. **`slice` READS (a copy — no mutation); `splice` WRITES (in place)** — one vowel, opposite philosophies.

## Node 2: The closure-state ladder (2.4's heart)

```js
function makeCounter() {
  let count = 0;                          // editable memory — born in the birthplace frame
  return () => { count += 1; return count; };  // the closure is the only key
}
```

| rung | function | memory | shape |
|---|---|---|---|
| frozen | `makeAdder(5)` | `n = 5` forever | returns `x => x + n` |
| counting | `makeCounter()` | `let count = 0` | bump, return |
| guarded | `makeWithdraw(100)` | `let balance` + insufficient-guard | check, update, return |
| dispatched | `makeAccount(100)` | balance + TWO DOORS | message → method → amount |

**Two doors** (`acct("deposit")(50)` — the `wrap(4)(3)` shape): door 1 takes the *message* and hands out the *method* **uncooked** (never call it inside — pass the recipe card); door 2 takes the amount and runs it. Door 1 knows neither its caller (`acct`) nor door 2's argument (`amount`) — ghost names from the caller's world don't exist in the birthplace.

## Node 3: Shallow vs deep copy

```js
const copy = { ...original };   // SHALLOW: one level
//   primitives → copied by VALUE   (copy.a = 99; original.a untouched)
//   nested boxes → copied by REFERENCE (copy.b.c = 99; original.b.c LEAKS to 99)
```

Deep copy = recursion over every nested level (new box at each). The spread copies exactly one floor; the basement stays shared.

## Node 4: Referential transparency (the purity contract)

```
pure:        f(x) === f(x) forever           same inputs, same output, no memory
with state:  wd(50) → 50; wd(50) → 0         same input, different answers
```

The birthplace memory is a **hidden input**. This is the formal name for what your renderer's "deterministic, seekable render" forbids — and why seeded `rngFor` beats `Math.random`: the only acceptable mutable memory is one that's a pure *function of the seed*.

---

## Quick reference

| Term | One sentence |
|---|---|
| **mutation** | changing a box's contents after birth |
| **const vs let** | const forbids rebinding the name; let allows rebinding — contents follow the box, not the keyword |
| **identity vs equality** | `===` on objects = same box, not same contents |
| **shared reference** | two names → one box → mutations visible to both |
| **shallow copy** | `{ ...obj }` — one level; nested boxes shared |
| **closure state** | `let` in the birthplace frame; the closure is the only key |
| **dispatch dictionary** | message → method lookup (object of functions, or curried two-door) |
| **referential transparency** | same inputs → same outputs; broken by hidden state |
| **non-local assignment** | an inner function assigning its birthplace's binding |

## Bridge: 2.4 → 2.5

| 2.4 idea | 2.5 formalizes it |
|---|---|
| `makeAccount`'s dispatch object | `class Account { deposit() {} withdraw() {} }` — syntax grows around the dispatch |
| balance stored next to its methods | `this.balance` — instance state bundled with methods |
| message → method by hand | method lookup by the language (`acct.deposit(50)` — one door now) |
| constructor by closure | the `constructor` method + `new` |
