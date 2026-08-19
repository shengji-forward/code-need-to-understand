# CS61A Concept Map — 2.1–2.2 Data Abstraction

> Built in session 09 the other way around: **the code first, the names after.** Use this
> map when a build-phase bug smells like one of these ideas. Pairs with `learning-report.md`.

---

## Big Picture

```text
DATA ABSTRACTION  =  the Ch.1 abstraction move (hide detail behind a name) applied to DATA
        │
        ├──→ THE CAST
        │      DOOR   = constructor + selectors   (the interface — IS the barrier)
        │      BOX    = the representation        (array? object? closure? users never know)
        │      USER   = any code that calls the door and nothing else
        │
        ├──→ THE RULES (two-sided)
        │      users never OPEN the box    (r[0], p.x — reading insides)
        │      users never BUILD the box   ([n, d] literal — manufacturing insides)
        │      users HOLD boxes freely     (pass, store, hand to other doors) — holding ≠ opening
        │
        ├──→ WHY IT PAYS
        │      representation may change → only door bodies follow → users see nothing
        │      upgrades land in the door  → every user enhanced for free
        │
        └──→ PROMISE vs ENFORCED
               array/object box: barrier is a promise (p[0] runs; silent wrong answers)
               closure box:      barrier is physics  (a function has no index;
                                 values reachable ONLY by calling the closure)
```

**Same idea, three names:** CS61A data abstraction = your DSA course's **ADT** = "design
against the interface." Stack's push/pop : users :: `numer`/`denom` : users.

---

## Node 1: Constructor + selectors (the minimal door)

```js
function makePoint(x, y) { return [x, y] }   // constructor — BUNDLES, never computes
function xOf(p)       { return p[0] }        // selector — READS one part
```

- Constructor's job: **bundle, don't compute** (the day's mantra). Never `return n/d`.
- The ADT test for any code: **does its body touch the box?** `[0]`/`[1]`/literal → it's
  the door. Only door calls → it's a user.

## Node 2: Breaking the barrier = semantic error

| world | code | symptom |
|---|---|---|
| swap to `[y, x]` (still an array!) | `b[1] - a[1]` | **silent 0.5** — confident, wrong, no error |
| swap to `{x, y}` object | same | `undefined` → `NaN` |
| repair bill, good world | edit 3 door bodies, one room | minutes, findable |
| repair bill, bad world | audit every `[0]`/`[1]` app-wide | unfindable — nothing marks the sin |

Failure shape: **omission is invisible; commission has fingerprints** — barrier breaks are
omissions (you just didn't use the door), which is why they're never caught by tools.

## Node 3: Position vs label (why arrays and objects betray differently)

- array: **meaning lives in position** — index 0 *means* x only by agreement → reorder = silent disaster
- object: **meaning lives in the label** — `{x: 1}` keeps meaning if keys reorder → only position-reads break
- conclusion: **the box's material doesn't matter; opening it does**

## Node 4: Floats are a slot machine → integer exactness

```
0.1 + 0.2 === 0.3            → false   (0.30000000000000004)
1/3 + 1/6                    → 0.5     — RIGHT, by luck: errors cancelled
```
Binary can't represent 0.1 (same as decimal can't write ⅓). Sometimes right, never
trustworthy. Production rules: **money = integer cents**; renderer = integer coordinates;
fractions = two integers behind a door, division banished from the box.

## Node 5: Normalize at the door (canonical form)

- **Future A:** every user remembers to normalize (`.toLowerCase()`, reduce) → N chances to
  forget → silent duplicates ("Alice@X.com" ≠ "alice@x.com")
- **Future B (chosen):** the constructor normalizes once → every birth-site canonical →
  100 usage sites inherit it free; breaks require *commission* (hand-building a box)
- canonical form makes `===` work: `9/18` and `1/2` must be the *same box*
- real-world names for this: value objects, "make invalid states unrepresentable",
  TypeScript's enforced contracts (interface = the door written down)

## Node 6: gcd (Euclid) — recursion working inside the door

```js
function gcd(a, b) { if (b === 0) return a; return gcd(b, a % b); }
```
Base case: `b === 0` → answer is `a`. What shrinks: `b`. **`%` stays in integer-land;
`/` is an exit visa** (the buggy `/` version bounced `2.67 → 0.395 → 738.9 → 10⁻¹²` until
it lied). Division by gcd IS exact (g divides both by definition) — safe inside the door.

## Node 7: Rational arithmetic (users, pure door calls)

| op | rule | why |
|---|---|---|
| add | `(n₁·d₂ + n₂·d₁) / (d₁·d₂)` — the **cross** | merge piles → must re-cut to same-sized pieces first |
| mul | `(n₁·n₂) / (d₁·d₂)` — **no cross, no `+`** | "a fraction OF a fraction" nests directly |

Every line has a **job**; the job names the code. The `+` in add exists to merge piles —
multiplication has no piles, so it has no `+`. (Phantom-operator bug = shape-matching
without asking "what is this line FOR?")

## Node 8: Closure pairs — the enforced barrier

```js
pair(a, b)  →  (selector) => selector(a, b)     // data made OF a function
head(p)     →  p((a, _) => a)                   // caller writes its own selector
```
- `selector` is a **waiting slot** — empty at birth, filled by the caller at the second
  call (same two-door structure as `makeAdder`; same "where does x come from?" trap)
- inventing a third selector is the comprehension test: `p((a, b) => a + b)` → 30
- `p[0]` is **physically impossible** — no subscript exists on a function; the values
  live in a birthplace frame, reachable only by *calling* the closure

---

## Quick reference

| Term | One sentence |
|---|---|
| **constructor** | bundles values into the box — never computes |
| **selectors** | read one part back out |
| **representation** | the box's actual inside — door-only knowledge |
| **abstraction barrier** | the door itself; users depend on *what*, never *how* |
| **ADT** | the same concept, DSA-course name |
| **canonical form** | one normalized box per value → `===` works |
| **normalize at the door** | constructor-side normalization (Future B) |
| **closure property** | combining values yields something combinable the same way (→ 2.3 trees) |
| **enforced barrier** | closure-based box — violation unwritable, not merely forbidden |

---

## Bridge: 2.2 → 2.3

| 2.2 idea | 2.3 extends it |
|---|---|
| pair = **two** values behind a door | sequences = **N** values (arrays, strings — and linked lists *built from your pairs*) |
| selector reads one part | sequence interface: `length` + element selection |
| closure property previewed (arrays in arrays) | trees: branches are trees; recursive data for recursive functions (1.7 returns) |
| hand-built boxes break barriers | same discipline at sequence scale — process via `map`/`filter`/`reduce`, don't reach in |
