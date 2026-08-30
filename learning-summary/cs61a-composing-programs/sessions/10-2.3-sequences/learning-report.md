# Session 10 — 2.3 Sequences: Learning Report

**Dates:** reading + tracing 2026-08-28 · practice 2026-08-29 → 08-30
**Practice:** 8/8 exercises, 11/11 assertions — all green
**Source:** [Composing Programs 2.3](https://www.composingprograms.com/pages/23-sequences.html)

---

## Objectives

- [x] Work with arrays as sequences: `for...of`, spread, destructuring
- [x] Process sequences with `map` / `filter` / `reduce` pipelines
- [x] Understand the **sequence abstraction** (length + selection) as a barrier
- [x] Build and walk **trees** (constructor `tree`, selectors `label`/`branches`, `isLeaf`)
- [x] Build and walk **linked lists** from closure pairs (`link`/`first`/`rest`/`isEmpty`)
- [x] Meet **recursive data** — structures defined in terms of smaller versions of themselves

---

## The arc

1. **Reading with heavy self-tracing (2026-08-28)** — the deepest unguided tracing to date: **ten hand traces** covering `rightBinarizeList`, the closure construction of `four`, `first(four)` (with the head-supplies-the-selector insight in their own words), iterative `lenLink` + `getitemLink`, recursive `lenLinkRecursive`/`getitemLinkRecursive` (unwind pre-computed), `extendLink`, `applyToAllLink`, and `partitions(2,1)`. **9/10 fully correct**, machine-verified. The one miss (`partitions`): a substitution slip — wrote `mapList(rest(lst))` in the header then traced over the original list; fix rule recorded: *substitute `rest(x)` before tracing the next step*.
2. **Practice Round 1 (arrays):** `sumArray` first-try; `evenSquares` first-try (filter→map, order right); `sumReduce` needed the redirect — wrote the for...of loop again (`sum = sum + sum` typo included) instead of the requested `reduce`. Corrected to the fold.
3. **Gap + re-entry (08-29):** several days away; learner asked for guided Ex 5. `sumList` traced by hand, then written with **four bugs** (all former traps): `=` vs `===` in the base test (base unreachable), base returning `EMPTY` not `0`, phantom `sum` name (ReferenceError), and `sumList(list)` recursing on the un-shrunk original. All four named, fixed, PASS.
4. **`countLeaves`:** leaf base returned `0` not `1` (a leaf IS one), `brances` typo (survived one fix round), `countLeaves(t)` instead of `(b)` inside the map. Fixed, PASS.
5. **`doubleTree` — the frustration moment.** "I do not know" ×2. Method win: shrink the step until failure is impossible — leaf box first (`tree(label(t) * 2)`), then label slot, then branches slot, then the **recursive leap of faith** named and applied (`map(b => doubleTree(b))`). Final bug: `doubleTree(t)` — recursing on the parent instead of the branch. Rule coined: **"inside a map, recurse on what the map hands you (`b`), never the original (`t`)."** PASS.
6. **`partitions` — the honest-usefulness conversation.** Learner challenged the value of partitions outright. Truth given: **nobody ships partition counting**; the cargo is *branching recursion* (include/exclude) + the *count→list* upgrade. Ledger: making change, subset enumeration ("show me the combinations"), search (count vs list), generative composition choosing. Learner chose the speed-run: base conversions (`1 → [[]]`, `0 → []` — one empty way ≠ no ways), the stamping map (`[m, ...p]` — **not** a recursive map: the recursion already happened; this map decorates), and combine by **concatenation not addition** (`[...withM, ...withoutM]`). PASS — Ch1's `countPartitions` now enumerates.

---

## New concepts locked

- **Recursive data**: a list whose rest is a list; a tree whose branches are trees; `EMPTY` = the base case as a *value*.
- **Two recursion-on-data shapes:**
  - *collapse* (`sumList`, `countLeaves`): structure → number. Base returns a number; step folds parts together.
  - *preserve* (`doubleTree`, `partitions`): structure → new structure. Three moves: **read door, compute, build door** (`label(t) * 2` → `tree(...)`); branches slot = map each branch through the same function.
- **Two kinds of map callbacks:** recursive (branch needs the same job: `b => doubleTree(b)`) vs decorative (result is finished, just build data: `p => [m, ...p]`).
- **count → list conversions:** base `1 → [[]]`, `0 → []`; combine `+ → [...a, ...b]`.
- **Sequence processing pipeline:** `filter` → `map` → `reduce` (keep, transform, fold).

## Traps logged (watchlist updated)

1. **Recurse on the iterator's gift, not the original** — `sumList(list)`, `countLeaves(t)`, `doubleTree(t)`: three visits in one session. The rule is now written in the learner's own notes.
2. `=` assigns, `===` compares (returned after the gap).
3. Name typos → ReferenceError (`brances` — twice before caught).
4. `sum = sum + sum` (element never joined).
5. Base-case values: empty *sum* → `0`; a leaf *count* → `1`; one empty *way* → `[[]]`.

## What's next

**Session 11 — Mutable Data (2.4).** The calm ends: values that *change* after birth, identity vs equality (`===` on objects), and closures as private mutable state (`makeCounter`). Chapter 1's "JS captures values, not live links" gets its sequel.
