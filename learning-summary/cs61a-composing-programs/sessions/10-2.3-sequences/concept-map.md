# CS61A Concept Map — 2.3 Sequences

> Use as the "bug smells like which idea?" reference during the build phase.
> Pairs with `learning-report.md` in this folder.

---

## Big Picture

```text
SEQUENCE = arbitrary-length data behind one interface:
           LENGTH + ELEMENT SELECTION              (a barrier, like 2.2's doors)
        │
        ├─── NATIVE sequences:  arrays · strings
        │         processing pipeline:  filter (keep) → map (transform) → reduce (fold)
        │         walking:  for...of  (no index variable), destructuring [x, y]
        │
        ├─── TREES — hierarchical data (closure property: parts of parts)
        │         door: tree(label, branches) · label(t) · branches(t) · isLeaf(t)
        │         recursive DATA: each branch is itself a tree
        │
        └─── LINKED LISTS — sequences built from closure PAIRS
                  door: link(first, rest) · first(lst) · rest(lst) · isEmpty(lst)
                  recursive DATA: rest of a list is a list; EMPTY = base case as a value
```

**The flip worth remembering:** Chapter 1 = recursive *functions* (`fact` calls `fact`).
2.3 = recursive *data* (a list's rest is a list) — and recursive functions walk it.

---

## Node 1: The processing pipeline (arrays)

```js
arr.filter(x => x % 2 === 0)     // KEEP      [1,2,3,4] → [2,4]
   .map(x => x * x)              // TRANSFORM [2,4]     → [4,16]
   .reduce((sum, x) => sum + x, 0)   // FOLD  [4,16]    → 20
```

`reduce` = your accumulator loop folded into one call: `(running, next) => new running`, plus a starting value. Order matters: filter *then* map avoids squaring numbers you'll throw away.

## Node 2: Trees

```
        tree(1, [tree(2), tree(3, [tree(4), tree(5)])])
            1
           / \          label(t)     → 1
          2   3         branches(t)  → [tree(2), tree(3, …)]
             / \        isLeaf(tree(2)) → true
            4   5
```

Two recursion shapes — the section's core skill:

| shape | base | step | examples |
|---|---|---|---|
| **collapse** (tree → number) | `isLeaf(t) → 1` (or other base value) | map each branch to its result, **fold** with reduce | `countLeaves` |
| **preserve** (tree → new tree) | `isLeaf(t) → tree(label(t) * 2)` | `tree(label(t) * 2, branches(t).map(b => sameFn(b)))` | `doubleTree` |

Preserve-shape mantra: **read door → compute → build door**, and the branches slot maps each branch through the same function (leap of faith on `b`).

## Node 3: Linked lists (recursive data from closure pairs)

```
link(1, link(2, link(3, EMPTY)))

┌─box─┐    ┌─box─┐    ┌─box─┐
│ 1  ●─┼───►│ 2  ●─┼───►│ 3  ●─┼───► EMPTY   (null — base case as a value)
└─────┘    └─────┘    └─────┘
```

Each box is the 2.2 closure `pair`. `first` reads the element, `rest` reads the smaller list.

```js
// collapse on a list — sumTo's skeleton with list fuel:
function sumList(lst) {
  if (isEmpty(lst)) return 0;              // base: the empty sum
  return first(lst) + sumList(rest(lst));  // my element + sum of the smaller pile
}
```

## Node 4: count → list (the partitions upgrade)

Same skeleton; three conversions:

| | counting (Ch1) | listing (2.3) |
|---|---|---|
| one way exists | return `1` | return `[[]]` (one partition: the empty one) |
| no ways | return `0` | return `[]` |
| combine groups | `+` (counts add) | `[...a, ...b]` (lists concatenate) |
| decorate results | — | `.map(p => [m, ...p])` — stamp, don't recurse |

`[[]]` ≠ `[]`: *one empty way* vs *no ways*.

## Node 5: Two kinds of map callbacks (the session's subtlest lesson)

| callback | when | shape |
|---|---|---|
| **recursive** | each piece needs the same job done | `b => doubleTree(b)` |
| **decorative** | pieces are finished; just build data | `p => [m, ...p]` |

Not every blank inside a recursive function is another recursive call.

---

## Quick reference

| Term | One sentence |
|---|---|
| **sequence** | any value with length + element selection |
| **for...of** | walk elements directly — no index variable |
| **spread `...`** | unpack elements into a new array / call |
| **reduce** | fold a sequence into one value: `(running, next) => next-running`, from a start |
| **closure property** | combining values yields something combinable the same way (arrays in arrays → trees) |
| **tree** | label + branches; each branch is a tree; `isLeaf` = no branches |
| **linked list** | chain of pairs; `rest` is a list or `EMPTY`; built from 2.2 closures |
| **EMPTY** | the end of a list — the base case as a value |
| **collapse vs preserve** | recursion that returns a number vs recursion that returns a new structure |

## Bridge: 2.3 → 2.4

| 2.3 idea | 2.4 shakes it |
|---|---|
| values passed around, never changed | **mutation**: boxes whose contents change after birth |
| `===` worked (canonical ints) | **identity vs equality**: two boxes can hold the same values and still be different boxes |
| linked list immutable by convention | arrays/objects mutate freely — and everyone holding them sees it |
| closures held frozen data (`pair`) | closures hold **private mutable state** (`makeCounter`) — the recipe-engine seed grows up |
