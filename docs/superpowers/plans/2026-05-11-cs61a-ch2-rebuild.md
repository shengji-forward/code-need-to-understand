# CS61A Composing Programs JS — Chapter 2: Building Abstractions with Data

> **For agentic workers:** Follow the checkbox (`- [ ]`) steps and update them as work completes. If `superpowers:subagent-driven-development` or `superpowers:executing-plans` is available, use it; otherwise execute the checklist manually.

**Goal:** Build Chapter 2 (Building Abstractions with Data) completely — 9 knowledge files, 18 practice files, and learning-summary session prompt updates — following the patterns established in Chapter 1.

**Architecture:** Three-folder pattern (knowledge/, practice/, learning-summary/) under `cs61a-composing-programs/`. Chapter 2 introduces data structures (pairs, linked lists, trees), mutation, closures with state, OOP, and recursive objects. Shared utilities in `practice/cs61a-composing-programs/shared/` already exist; Chapter 2 will heavily use them and may need additions.

**Tech Stack:** Node.js >= 18 LTS, ES modules (.js files), no external dependencies beyond Node built-ins.

**Spec:** `docs/superpowers/specs/2026-05-06-cs61a-composing-programs-js-design.md`
**Chapter 1 Plan (reference):** `docs/superpowers/plans/2026-05-06-cs61a-ch1-rebuild.md`

**Import path convention:** Practice files live 3 levels deep under `practice/cs61a-composing-programs/02-.../<section>/`. From any practice file, `../../shared/helpers.js` resolves to `practice/cs61a-composing-programs/shared/helpers.js`. Always use `../../shared/`, never `../../../shared/`.

**Do NOT modify:** Any Chapter 1 files (knowledge/, practice/, learning-summary sessions 00-08). Only add Chapter 2 content and update structural files (README.md, PLAN.md, SESSION-PROMPTS.md, TODO.md) to reflect Chapter 2 availability.

---

## 1. Current State

### Chapter 1 Completion

Chapter 1 is fully built and validated through commit 899e8e4:

- **7 knowledge files** in `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/` (1.1–1.7)
- **14 practice files** in `practice/cs61a-composing-programs/01-building-abstractions-with-functions/` (7 practice.js + 7 solutions.js)
- **30 learning-summary session directories** scaffolded in `learning-summary/cs61a-composing-programs/sessions/`
- All solutions pass, all practice files fail safely with undefined TODOs

### Existing Shared Utilities

Four files in `practice/cs61a-composing-programs/shared/`:

| File | Exports | Current Scope |
|------|---------|---------------|
| `helpers.js` | `assertEqual`, `assertApprox`, `range` | Sufficient for Chapter 2. `assertEqual` uses `isDeepStrictEqual` which handles nested structures needed for Ch2. |
| `pairs.js` | `pair`, `head`, `tail` | Sufficient. Closure-based pair implementation. Used by linked-list.js. |
| `linked-list.js` | `EMPTY`, `link`, `first`, `rest`, `isEmpty`, `listLength` | Needs additions for Chapter 2: `listToString`, `listToArray`, `listFromArray`, `mapList`, `filterList`, `appendList`. These are used heavily in 2.3 and 2.9 exercises. |
| `tree.js` | `tree`, `label`, `branches`, `isLeaf` | Needs additions for Chapter 2: `printTree`, `treeSize`, `treeContains`, `mapTree`. Used in 2.3 and 2.9. |

**Verdict:** Shared utilities need extension (not rewrite) before Chapter 2 practice files are written. The existing exports remain unchanged; new exports are additive.

### Needed Shared Utility Additions

**`helpers.js`** — Add `assertThrows` for mutation/OOP exercises that test error behavior:
```javascript
export async function assertThrows(name, fn, expectedMessage) {
  try {
    await fn();
    process.exitCode = 1;
    console.log(`FAIL: ${name} — expected to throw, but did not`);
  } catch (e) {
    if (expectedMessage && !e.message.includes(expectedMessage)) {
      process.exitCode = 1;
      console.log(`FAIL: ${name} — expected message containing "${expectedMessage}", got "${e.message}"`);
    } else {
      console.log(`PASS: ${name}`);
    }
  }
}
```

**`linked-list.js`** — Add these exports:
```javascript
export function listToString(lst) { ... }     // "())" style for display
export function listToArray(lst) { ... }      // Convert to JS array for testing
export function listFromArray(arr) { ... }    // Build from JS array
export function mapList(lst, fn) { ... }      // Map over linked list
export function filterList(lst, pred) { ... } // Filter linked list
export function appendList(a, b) { ... }      // Append two linked lists
```

**`tree.js`** — Add these exports:
```javascript
export function printTree(t, indent = 0) { ... }  // Indented tree display
export function treeSize(t) { ... }                 // Count nodes
export function treeContains(t, val) { ... }        // Search for value
export function mapTree(t, fn) { ... }              // Map over tree labels
```

---

## 2. Chapter 2 Scope

All 9 sections from [Composing Programs Chapter 2](https://composingprograms.com/pages/21-introduction.html):

| Section | Title | Key Topics | JS Translation Focus |
|---------|-------|------------|---------------------|
| 2.1 | Introduction | Native data types, numbers, float precision, type checking | JS `Number` (IEEE 754 double), `BigInt`, `typeof`, `Number.isInteger()` |
| 2.2 | Data Abstraction | Rational numbers, constructors/selectors, pairs, abstraction barriers | Closure-based pairs (from `shared/pairs.js`), rational arithmetic functions |
| 2.3 | Sequences | Lists, sequence iteration, processing, strings, trees, linked lists | JS arrays + `for...of`, `map`/`filter`/`reduce`, custom linked lists and trees |
| 2.4 | Mutable Data | Objects, mutation, local state, `nonlocal` → closures, dispatch dicts | JS `let`, array/object mutation, closures for state, dispatch objects |
| 2.5 | Object-Oriented Programming | Classes, inheritance, multiple inheritance | JS `class` syntax, `extends`, `super`; no multiple inheritance (use mixins) |
| 2.6 | Implementing Classes and Objects | OOP via dispatch dicts/functions | JS closures + objects mimicking class dispatch |
| 2.7 | Object Abstraction | `toString`, special methods, multiple representations, generic functions | `toString`, getters/setters, Symbol methods, type-tag dispatch |
| 2.8 | Efficiency | Measuring, memoization, orders of growth, exponentiation | `Map` for cache, timing with `performance.now()`, Theta notation |
| 2.9 | Recursive Objects | Linked list class, tree class, sets/BSTs | JS `class` for `LinkedList` and `Tree`, BST implementation |

### Section Subsections (from Source)

**2.1 Introduction** (2.1.1)
- 2.1.1 Native Data Types — numbers, booleans, type coercion in JS vs Python

**2.2 Data Abstraction** (2.2.1–2.2.4)
- 2.2.1 Example: Rational Numbers — `addRational`, `mulRational`, `rationalToString`
- 2.2.2 Pairs — closure-based and array-based implementations
- 2.2.3 Abstraction Barriers — separating interface from implementation
- 2.2.4 Properties of Data — data defined by behavior, not representation

**2.3 Sequences** (2.3.1–2.3.7)
- 2.3.1 Lists — JS arrays as sequences
- 2.3.2 Sequence Iteration — `for...of`, `for` loop
- 2.3.3 Sequence Processing — `map`, `filter`, `reduce`, comprehensions
- 2.3.4 Sequence Abstraction — iteration protocols
- 2.3.5 Strings — JS string methods, template literals
- 2.3.6 Trees — recursive tree processing with shared/tree.js
- 2.3.7 Linked Lists — custom linked lists with shared/linked-list.js

**2.4 Mutable Data** (2.4.1–2.4.9)
- 2.4.1 The Object Metaphor — objects as mutable data
- 2.4.2 Sequence Objects — array mutation methods
- 2.4.3 Dictionaries — JS objects and `Map`
- 2.4.4 Local State — closures with `let` for mutable state
- 2.4.5 Benefits of Non-Local Assignment — `makeWithdraw` pattern
- 2.4.6 The Cost of Non-Local Assignment — referential transparency
- 2.4.7 Implementing Lists and Dictionaries — building from pairs
- 2.4.8 Dispatch Dictionaries — objects as dispatch mechanisms
- 2.4.9 Propagating Constraints — constraint system example

**2.5 Object-Oriented Programming** (2.5.1–2.5.8)
- 2.5.1 Objects and Classes — class syntax
- 2.5.2 Defining Classes — `constructor`, methods
- 2.5.3 Message Passing and Dot Expressions — method dispatch
- 2.5.4 Class Attributes — static properties
- 2.5.5 Inheritance — `extends`, `super`
- 2.5.6 Using Inheritance — method override
- 2.5.7 Multiple Inheritance — mixins in JS (no native MI)
- 2.5.8 The Role of Objects — when to use OOP

**2.6 Implementing Classes and Objects** (2.6.1–2.6.3)
- 2.6.1 Instances — instance dispatch objects
- 2.6.2 Classes — class dispatch objects
- 2.6.3 Using Implemented Objects — `Account` rebuilt from functions

**2.7 Object Abstraction** (2.7.1–2.7.4)
- 2.7.1 String Conversion — `toString`, `Symbol.toPrimitive`
- 2.7.2 Special Methods — `valueOf`, custom iterators
- 2.7.3 Multiple Representations — type tags, rectangular/polar complex
- 2.7.4 Generic Functions — type dispatch, coercion

**2.8 Efficiency** (2.8.1–2.8.5)
- 2.8.1 Measuring Efficiency — call counting
- 2.8.2 Memoization — `Map`-based caching
- 2.8.3 Orders of Growth — Theta notation
- 2.8.4 Example: Exponentiation — `exp`, `expIter`, `fastExp`
- 2.8.5 Growth Categories — constant through exponential

**2.9 Recursive Objects** (2.9.1–2.9.3)
- 2.9.1 Linked List Class — `class LinkedList` with iteration methods
- 2.9.2 Tree Class — `class Tree` with `label`, `branches`, `isLeaf`
- 2.9.3 Sets — unordered list, ordered list, binary search tree

---

## 3. Python-to-JavaScript Translation Decisions

### Core Type Mappings

| Python | JavaScript | Decision | Rationale |
|--------|-----------|----------|-----------|
| `tuple` | `Object.freeze([...])` or closure-based pair | Use closure pairs from `shared/pairs.js` for educational pairs; use `Object.freeze` for immutable tuples | Matches the source's "pairs as closures" approach |
| `list` | `Array` | Direct mapping | JS arrays are mutable sequences, same role as Python lists |
| Linked list (functional) | Custom from `shared/linked-list.js` | Use `link`/`first`/`rest` functions | Already implemented; matches source |
| `dict` | Plain object or `Map` | Plain objects for simple string-key dicts (2.4); `Map` for generic key-value (2.6+ dispatch) | Objects for teaching simplicity; `Map` when non-string keys needed |
| `set`/`frozenset` | `Set` | Direct mapping in 2.9 | JS `Set` has same API shape |
| `class Foo:` | `class Foo { }` | Direct mapping | ES6 class syntax is nearly identical |
| `__init__` | `constructor` | Direct mapping | |
| `self` | `this` | Direct mapping | **Risk:** arrow functions don't bind `this` — use `function` or method shorthand in classes |
| `__str__`/`__repr__` | `toString()` / custom `repr()` method | `toString()` for `__str__`, add explicit `repr()` method | JS has no built-in repr concept |
| `__len__` | `get length()` | JS getter | |
| `__getitem__` | `get(index)` method | Explicit method, no operator overloading in JS | |
| `__call__` | Callable pattern: class with `[callSymbol]` or function wrapper | Use function wrapper pattern | JS has no `__call__` equivalent |
| `__add__`/`__radd__` | `add(other)` method | Explicit method | No operator overloading in JS |
| `@property` | `get`/`set` accessors | JS getter/setter syntax | |
| `@classmethod` | `static` methods | Direct mapping | |
| `isinstance(x, T)` | `x instanceof T` | Direct mapping | |
| `nonlocal x` | `let x` in closure | `let` (not `const`) for mutable closure variables | Already established in Ch1 |
| `lambda` | Arrow function `() =>` | Already established | |
| List comprehension `[f(x) for x in s if p(x)]` | `s.filter(p).map(f)` | Method chain | Already established |
| `is` (identity) | `===` (for primitives) or `Object.is()` | `===` for most cases | JS `===` checks reference for objects |
| `range(n)` | `range(n)` from helpers | Already provided | |

### Mutation Semantics

| Python | JavaScript | Notes |
|--------|-----------|-------|
| `x.append(v)` | `x.push(v)` | Arrays |
| `x.pop()` | `x.pop()` | Same name |
| `x.pop(i)` | `x.splice(i, 1)[0]` | Different API |
| `x.insert(i, v)` | `x.splice(i, 0, v)` | Different API |
| `x[i] = v` | `x[i] = v` | Same |
| `x[a:b] = ...` | `x.splice(a, b-a, ...)` | Slice assignment → splice |
| `del x[i]` | `x.splice(i, 1)` | |
| `x[a:b]` | `x.slice(a, b)` | Slice extraction |
| `dict[key] = val` | `obj[key] = val` or `map.set(key, val)` | |
| `dict.get(k, default)` | `obj[k] ?? default` or `map.get(k) ?? default` | Nullish coalescing |

### Equality and Testing

- `assertEqual` uses `isDeepStrictEqual` from `node:util` — handles nested objects/arrays correctly
- For pair-based linked lists: convert to array with `listToArray()` before assertion, or compare via `listToString()`
- For class instances: implement `equals(other)` method and use in assertions
- For tree structures: compare via `JSON.stringify` or implement deep-equal tree comparison

### Patterns to Avoid in Primary Code

| Avoid | Use Instead | Why |
|-------|-------------|-----|
| Python `self` in comments | `this` | Confusing terminology |
| `len(x)` | `x.length` | Python function, not JS |
| `print(x)` | `console.log(x)` | Python, not JS |
| `True`/`False`/`None` | `true`/`false`/`null` | Case-sensitive |
| `def __init__(self):` | `constructor()` | Python syntax |
| `for i in range(n)` | `for (let i = 0; i < n; i++)` or `for (const i of range(n))` | Python syntax |
| `x if cond else y` | `cond ? x : y` | Python ternary |

---

## 4. File Plan

### Knowledge Files (9)

```
knowledge/cs61a-composing-programs/02-building-abstractions-with-data/
├── 2.1-introduction.md
├── 2.2-data-abstraction.md
├── 2.3-sequences.md
├── 2.4-mutable-data.md
├── 2.5-object-oriented-programming.md
├── 2.6-implementing-classes-and-objects.md
├── 2.7-object-abstraction.md
├── 2.8-efficiency.md
└── 2.9-recursive-objects.md
```

Each file follows the Chapter 1 template:
```markdown
# 2.X Section Title

> Based on [Composing Programs 2.X](https://composingprograms.com/pages/2X-....html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python to JavaScript.

## Key Concepts
- (4-6 bullet points)

## Content
### (subsections matching the source structure)
(translated theory with JavaScript code examples)

## Python vs JavaScript Notes
(only where translation is non-obvious)
```

### Practice Files (18: 9 practice.js + 9 solutions.js)

```
practice/cs61a-composing-programs/02-building-abstractions-with-data/
├── 2.1-introduction/
│   ├── practice.js
│   └── solutions.js
├── 2.2-data-abstraction/
│   ├── practice.js
│   └── solutions.js
├── 2.3-sequences/
│   ├── practice.js
│   └── solutions.js
├── 2.4-mutable-data/
│   ├── practice.js
│   └── solutions.js
├── 2.5-object-oriented-programming/
│   ├── practice.js
│   └── solutions.js
├── 2.6-implementing-classes-and-objects/
│   ├── practice.js
│   └── solutions.js
├── 2.7-object-abstraction/
│   ├── practice.js
│   └── solutions.js
├── 2.8-efficiency/
│   ├── practice.js
│   └── solutions.js
└── 2.9-recursive-objects/
    ├── practice.js
    └── solutions.js
```

Each practice.js follows the Chapter 1 format:
```javascript
/**
 * CS61A Composing Programs - 2.X Section Title
 * Based on: https://composingprograms.com/pages/2X-....html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.X-slug/solutions.js
 */

import { assertEqual } from "../../shared/helpers.js";
// Additional imports from shared/ as needed

// Exercise N: Description
// TODO: ...
const result = undefined;
assertEqual("Exercise N", result, expectedValue);
```

### Learning Summary Updates (Sessions 09–16)

Update these existing files:
- `learning-summary/cs61a-composing-programs/PLAN.md` — Session 09–16 details are already scaffolded but may need enrichment
- `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md` — Add explicit prompts for sessions 09–16 (currently placeholder text)
- `learning-summary/cs61a-composing-programs/TODO.md` — No changes needed (already has unchecked boxes for 09–16)

Also update:
- `knowledge/cs61a-composing-programs/README.md` — Change Chapter 2 status from "Not Started" to "In Progress"
- `practice/cs61a-composing-programs/README.md` — Change Chapter 2 status from "Not Started" to "In Progress"

### Directory Creation

```bash
mkdir -p knowledge/cs61a-composing-programs/02-building-abstractions-with-data
mkdir -p practice/cs61a-composing-programs/02-building-abstractions-with-data/{2.1-introduction,2.2-data-abstraction,2.3-sequences,2.4-mutable-data,2.5-object-oriented-programming,2.6-implementing-classes-and-objects,2.7-object-abstraction,2.8-efficiency,2.9-recursive-objects}
```

---

## 5. Chunk Plan

### Chunk 1: Review/Extend Shared Utilities
**Tasks:** 1–2
**Owned files:**
- `practice/cs61a-composing-programs/shared/helpers.js` (add `assertThrows`)
- `practice/cs61a-composing-programs/shared/linked-list.js` (add 6 exports)
- `practice/cs61a-composing-programs/shared/tree.js` (add 4 exports)
**Validation:**
```bash
node -e "import('./practice/cs61a-composing-programs/shared/helpers.js').then(m => { m.assertEqual('test', 1+1, 2) })"
node -e "import('./practice/cs61a-composing-programs/shared/linked-list.js').then(m => { const l = m.listFromArray([1,2,3]); m.assertEqual('listFromArray', m.listToArray(l), [1,2,3]) })"
node -e "import('./practice/cs61a-composing-programs/shared/tree.js').then(m => { const t = m.tree(1, [m.tree(2), m.tree(3)]); m.assertEqual('treeSize', m.treeSize(t), 3) })"
```
**Commit:** `feat: extend CS61A shared utilities for Chapter 2 (linked-list, tree, assertThrows)`
**Parallelizable:** No — practice files depend on these exports.

---

### Chunk 2: Knowledge Files 2.1–2.3
**Tasks:** 3–5
**Owned files:**
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction.md`
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction.md`
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences.md`
**Validation:**
```bash
ls knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.{1,2,3}*.md
grep -c "Based on.*Composing Programs" knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.{1,2,3}*.md
```
**Commit:** `docs: add CS61A 2.1-2.3 knowledge files (introduction, data abstraction, sequences)`
**Parallelizable:** Yes — tasks 3, 4, 5 can run in parallel (disjoint files).

---

### Chunk 3: Knowledge Files 2.4–2.6
**Tasks:** 6–8
**Owned files:**
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data.md`
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.5-object-oriented-programming.md`
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.6-implementing-classes-and-objects.md`
**Validation:**
```bash
ls knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.{4,5,6}*.md
```
**Commit:** `docs: add CS61A 2.4-2.6 knowledge files (mutable data, OOP, implementing objects)`
**Parallelizable:** Yes — tasks 6, 7, 8 can run in parallel.

---

### Chunk 4: Knowledge Files 2.7–2.9
**Tasks:** 9–11
**Owned files:**
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.7-object-abstraction.md`
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.8-efficiency.md`
- `knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.9-recursive-objects.md`
**Validation:**
```bash
ls knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.{7,8,9}*.md
```
**Commit:** `docs: add CS61A 2.7-2.9 knowledge files (object abstraction, efficiency, recursive objects)`
**Parallelizable:** Yes — tasks 9, 10, 11 can run in parallel.

---

### Chunk 5: Practice Files 2.1–2.3
**Tasks:** 12–14
**Owned files:**
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction/{practice.js, solutions.js}`
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction/{practice.js, solutions.js}`
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences/{practice.js, solutions.js}`
**Validation:**
```bash
for d in 2.1-introduction 2.2-data-abstraction 2.3-sequences; do
  echo "=== $d/solutions.js ==="
  node "practice/cs61a-composing-programs/02-building-abstractions-with-data/$d/solutions.js"
done
```
**Commit:** `feat: add CS61A 2.1-2.3 practice and solutions`
**Parallelizable:** Yes — tasks 12, 13, 14 can run in parallel (disjoint directories).

---

### Chunk 6: Practice Files 2.4–2.6
**Tasks:** 15–17
**Owned files:**
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data/{practice.js, solutions.js}`
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.5-object-oriented-programming/{practice.js, solutions.js}`
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.6-implementing-classes-and-objects/{practice.js, solutions.js}`
**Validation:**
```bash
for d in 2.4-mutable-data 2.5-object-oriented-programming 2.6-implementing-classes-and-objects; do
  echo "=== $d/solutions.js ==="
  node "practice/cs61a-composing-programs/02-building-abstractions-with-data/$d/solutions.js"
done
```
**Commit:** `feat: add CS61A 2.4-2.6 practice and solutions`
**Parallelizable:** Yes.

---

### Chunk 7: Practice Files 2.7–2.9
**Tasks:** 18–20
**Owned files:**
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.7-object-abstraction/{practice.js, solutions.js}`
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.8-efficiency/{practice.js, solutions.js}`
- `practice/cs61a-composing-programs/02-building-abstractions-with-data/2.9-recursive-objects/{practice.js, solutions.js}`
**Validation:**
```bash
for d in 2.7-object-abstraction 2.8-efficiency 2.9-recursive-objects; do
  echo "=== $d/solutions.js ==="
  node "practice/cs61a-composing-programs/02-building-abstractions-with-data/$d/solutions.js"
done
```
**Commit:** `feat: add CS61A 2.7-2.9 practice and solutions`
**Parallelizable:** Yes.

---

### Chunk 8: Learning Summary Updates + Validation
**Tasks:** 21–22
**Owned files:**
- `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md` (add sessions 09–16)
- `learning-summary/cs61a-composing-programs/PLAN.md` (enrich session 09–16 details if needed)
- `knowledge/cs61a-composing-programs/README.md` (update Chapter 2 status)
- `practice/cs61a-composing-programs/README.md` (update Chapter 2 status)
**Validation:**
```bash
# Full solutions run
for d in practice/cs61a-composing-programs/02-building-abstractions-with-data/*/; do
  echo "=== ${d}solutions.js ==="
  node "${d}solutions.js" || echo "FAILED: $d"
done

# Practice files parse safely
for d in practice/cs61a-composing-programs/02-building-abstractions-with-data/*/; do
  echo "=== ${d}practice.js ==="
  node "${d}practice.js" 2>&1 | head -5
done

# File counts
echo "Knowledge files:"; ls knowledge/cs61a-composing-programs/02-building-abstractions-with-data/*.md | wc -l
echo "Practice dirs:"; ls -d practice/cs61a-composing-programs/02-building-abstractions-with-data/*/ | wc -l
echo "Solutions files:"; ls practice/cs61a-composing-programs/02-building-abstractions-with-data/*/solutions.js | wc -l

# Attribution check
grep -L "CC BY-SA 3.0" knowledge/cs61a-composing-programs/02-building-abstractions-with-data/*.md

# Forbidden Python syntax check
grep -rn "def \|self\.\|print(\|True\|False\|None\|__init__\|__str__\|__repr__\|range(\|len(" knowledge/cs61a-composing-programs/02-building-abstractions-with-data/*.md | grep -v "Python vs JavaScript\|Python:\|```python\|translated\|avoid\|difference\|comparison" || echo "No forbidden Python syntax found"

# Session prompts exist for 09-16
grep -c "## Session 0[9]\|## Session 1[0-6]" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
```
**Commit:** `docs: add CS61A Chapter 2 session prompts and update status`
**Parallelizable:** No — final validation must be sequential after all chunks complete.

---

### Chunk Execution Order

```
Chunk 1 (shared utilities)  ← sequential, must complete first
        │
        ├─→ Chunk 2 (knowledge 2.1-2.3) ─┐
        ├─→ Chunk 3 (knowledge 2.4-2.6) ─┤ can run in parallel
        └─→ Chunk 4 (knowledge 2.7-2.9) ─┘
                                           │
        ├─→ Chunk 5 (practice 2.1-2.3) ──┐
        ├─→ Chunk 6 (practice 2.4-2.6) ──┤ can run in parallel
        └─→ Chunk 7 (practice 2.7-2.9) ──┘
                                           │
        Chunk 8 (summary + validation)  ← sequential, must be last
```

Knowledge chunks (2-4) can run in parallel with each other. Practice chunks (5-7) can run in parallel with each other. But all knowledge chunks should complete before practice chunks start (practice files may reference knowledge-file patterns). Alternatively, if using isolated worktrees, all chunks 2-7 can run in parallel since they write to disjoint files.

---

## 6. Exercise Design

### 2.1 Introduction (5 exercises)

```javascript
import { assertEqual, assertApprox } from "../../shared/helpers.js";

// Exercise 1: Type checking with typeof
// TODO: What type is 3.14?
const typeOfPi = undefined;
assertEqual("Exercise 1: typeof 3.14", typeOfPi, "number");

// Exercise 2: Number limits — check that 0.1 + 0.2 is NOT exactly 0.3
// TODO: Write a boolean expression that checks if 0.1 + 0.2 !== 0.3
const floatTrap = undefined;
assertEqual("Exercise 2: float precision", floatTrap, true);

// Exercise 3: Integer check — use Number.isInteger()
// TODO: Check if 4.0 is an integer
const isFourInteger = undefined;
assertEqual("Exercise 3: Number.isInteger(4.0)", isFourInteger, true);

// Exercise 4: BigInt — compute 2n ** 100n > Number.MAX_SAFE_INTEGER
// TODO: Check if 2n ** 100n is larger than Number.MAX_SAFE_INTEGER
const bigIntComparison = undefined;
assertEqual("Exercise 4: BigInt comparison", bigIntComparison, true);

// Exercise 5: typeof checks — multiple values
// TODO: Create an array [typeof 42, typeof "hello", typeof true, typeof undefined]
const typeArray = undefined;
assertEqual("Exercise 5: typeof array", typeArray, ["number", "string", "boolean", "undefined"]);
```

### 2.2 Data Abstraction (6 exercises)

```javascript
import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";

// Exercise 1: Rational constructor and selectors
// TODO: Complete makeRational and numer/denom using pair
function makeRational(n, d) { return undefined; }
function numer(r) { return undefined; }
function denom(r) { return undefined; }
const half = makeRational(1, 2);
assertEqual("Exercise 1: numer(half)", numer(half), 1);
assertEqual("Exercise 1: denom(half)", denom(half), 2);

// Exercise 2: Rational addition
// TODO: Implement addRational using makeRational, numer, denom
function addRational(r1, r2) { return undefined; }
const sum = addRational(makeRational(1, 3), makeRational(1, 6));
assertEqual("Exercise 2: 1/3 + 1/6 numer", numer(sum), 1);
assertEqual("Exercise 2: 1/3 + 1/6 denom", denom(sum), 2);

// Exercise 3: Rational multiplication
function mulRational(r1, r2) { return undefined; }
const product = mulRational(makeRational(2, 3), makeRational(3, 4));
assertEqual("Exercise 3: 2/3 * 3/4 numer", numer(product), 1);
assertEqual("Exercise 3: 2/3 * 3/4 denom", denom(product), 2);

// Exercise 4: GCD helper for reducing rationals
function gcd(a, b) { return undefined; }
assertEqual("Exercise 4: gcd(12, 8)", gcd(12, 8), 4);
assertEqual("Exercise 4: gcd(7, 3)", gcd(7, 3), 1);

// Exercise 5: Abstraction barrier — rewrite makeRational to reduce using gcd
function makeRationalReduced(n, d) { return undefined; }
const reduced = makeRationalReduced(6, 4);
assertEqual("Exercise 5: reduced numer", numer(reduced), 3);
assertEqual("Exercise 5: reduced denom", denom(reduced), 2);

// Exercise 6: Pair operations — demonstrate closure pairs are opaque
const p = pair(10, 20);
assertEqual("Exercise 6: head(pair(10,20))", head(p), 10);
assertEqual("Exercise 6: tail(pair(10,20))", tail(p), 20);
assertEqual("Exercise 6: pair is function", typeof p, "function");
```

### 2.3 Sequences (8 exercises)

```javascript
import { assertEqual } from "../../shared/helpers.js";
import { range } from "../../shared/helpers.js";
import { link, first, rest, isEmpty, listLength, listFromArray, listToArray, mapList, filterList } from "../../shared/linked-list.js";
import { tree, label, branches, isLeaf, treeSize, mapTree } from "../../shared/tree.js";

// Exercise 1: Array iteration — sum all elements
function sumArray(arr) { return undefined; }
assertEqual("Exercise 1: sumArray", sumArray([1, 2, 3, 4, 5]), 15);

// Exercise 2: Map and filter chains — get squares of even numbers
function evenSquares(arr) { return undefined; }
assertEqual("Exercise 2: evenSquares", evenSquares([1, 2, 3, 4, 5, 6]), [4, 16, 36]);

// Exercise 3: Reduce — implement sum using reduce
function sumReduce(arr) { return undefined; }
assertEqual("Exercise 3: sumReduce", sumReduce([10, 20, 30]), 60);

// Exercise 4: Linked list basics — build and query
const lst = link(1, link(2, link(3)));
assertEqual("Exercise 4: first(lst)", first(lst), 1);
assertEqual("Exercise 4: first(rest(lst))", first(rest(lst)), 2);
assertEqual("Exercise 4: listLength(lst)", listLength(lst), 3);

// Exercise 5: Linked list sum — recursive
function sumList(lst) { return undefined; }
assertEqual("Exercise 5: sumList", sumList(listFromArray([10, 20, 30])), 60);

// Exercise 6: Tree basics — count leaves
function countLeaves(t) { return undefined; }
const t1 = tree(1, [tree(2), tree(3, [tree(4), tree(5)])]);
assertEqual("Exercise 6: countLeaves", countLeaves(t1), 3);

// Exercise 7: Tree map — apply function to all labels
function doubleTree(t) { return undefined; }
const t2 = tree(1, [tree(2), tree(3)]);
const doubled = doubleTree(t2);
assertEqual("Exercise 7: label(doubled)", label(doubled), 2);
assertEqual("Exercise 7: label(branches[0])", label(branches(doubled)[0]), 4);

// Exercise 8: Partition tree — list all partitions of n using parts up to m
// (Guided: recursive structure given, fill in logic)
function partitions(n, m) { return undefined; }
assertEqual("Exercise 8: partitions(6, 4)", partitions(6, 4).length, 9);
```

### 2.4 Mutable Data (7 exercises)

```javascript
import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Array mutation — push, pop, splice
function manipulateArray(arr) {
  // TODO: push 4, pop last, insert 0 at index 0, return the array
  return undefined;
}
assertEqual("Exercise 1: mutate", manipulateArray([1, 2, 3]), [0, 1, 2, 3]);

// Exercise 2: Object mutation — update properties
function updatePerson(person, name, age) {
  // TODO: update person.name and person.age, return person
  return undefined;
}
assertEqual("Exercise 2: update", updatePerson({ name: "Alice", age: 30 }, "Bob", 25), { name: "Bob", age: 25 });

// Exercise 3: Closure with state — makeCounter
function makeCounter() { return undefined; }
const counter = makeCounter();
assertEqual("Exercise 3: counter()", counter(), 1);
assertEqual("Exercise 3: counter()", counter(), 2);
assertEqual("Exercise 3: counter()", counter(), 3);

// Exercise 4: makeWithdraw — closure that tracks balance
function makeWithdraw(initialBalance) { return undefined; }
const withdraw = makeWithdraw(100);
assertEqual("Exercise 4: withdraw(25)", withdraw(25), 75);
assertEqual("Exercise 4: withdraw(10)", withdraw(10), 65);

// Exercise 5: Dispatch object — create an account dispatch dict
function makeAccount(balance) { return undefined; }
const acct = makeAccount(100);
assertEqual("Exercise 5: deposit 50", acct("deposit")(50), 150);
assertEqual("Exercise 5: withdraw 30", acct("withdraw")(30), 120);

// Exercise 6: Reference vs value — demonstrate object identity
const a = { x: 1 };
const b = { x: 1 };
const c = a;
assertEqual("Exercise 6: a === b", a === b, false);
assertEqual("Exercise 6: a === c", a === c, true);

// Exercise 7: Spread/copy — shallow copy an object
function shallowCopy(obj) { return undefined; }
const original = { a: 1, b: { c: 2 } };
const copy = shallowCopy(original);
copy.a = 99;
assertEqual("Exercise 7: original.a unchanged", original.a, 1);
copy.b.c = 99;
assertEqual("Exercise 7: original.b.c changed (shallow)", original.b.c, 99);
```

### 2.5 Object-Oriented Programming (7 exercises)

```javascript
import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Basic class — define a Point class
class Point {
  // TODO: constructor(x, y), distanceTo(other) using distance formula
}
const p1 = new Point(0, 0);
const p2 = new Point(3, 4);
assertEqual("Exercise 1: distanceTo", Math.round(p1.distanceTo(p2)), 5);

// Exercise 2: Account class with deposit/withdraw
class Account {
  // TODO: constructor(holder, balance), deposit(amount), withdraw(amount), getBalance()
}
const acc = new Account("Alice", 100);
acc.deposit(50);
assertEqual("Exercise 2: balance after deposit", acc.getBalance(), 150);
acc.withdraw(30);
assertEqual("Exercise 2: balance after withdraw", acc.getBalance(), 120);

// Exercise 3: Inheritance — CheckingAccount extends Account with fee
class CheckingAccount extends Account {
  // TODO: constructor(holder, balance, fee), override withdraw to deduct fee
}
const checking = new CheckingAccount("Bob", 100, 1);
checking.withdraw(20);
assertEqual("Exercise 3: balance after withdraw with fee", checking.getBalance(), 79);

// Exercise 4: super keyword — SavingsAccount with interest
class SavingsAccount extends Account {
  // TODO: constructor(holder, balance, interestRate), addInterest() method
}
const savings = new SavingsAccount("Carol", 1000, 0.05);
savings.addInterest();
assertEqual("Exercise 4: balance after interest", savings.getBalance(), 1050);

// Exercise 5: toString override
class Rectangle {
  // TODO: constructor(width, height), area(), toString() returns "Rectangle(w x h)"
}
const rect = new Rectangle(3, 4);
assertEqual("Exercise 5: toString", rect.toString(), "Rectangle(3 x 4)");
assertEqual("Exercise 5: area", rect.area(), 12);

// Exercise 6: Static method
class MathUtils {
  // TODO: static gcd(a, b), static lcm(a, b)
}
assertEqual("Exercise 6: gcd", MathUtils.gcd(12, 8), 4);
assertEqual("Exercise 6: lcm", MathUtils.lcm(4, 6), 12);

// Exercise 7: Mixin pattern (for multiple inheritance simulation)
const Serializable = (Base) => class extends Base {
  // TODO: toJSON() returns JSON.stringify of all own properties
};
class Book {
  constructor(title, author) { this.title = title; this.author = author; }
}
const SerializableBook = Serializable(Book);
const book = new SerializableBook("SICP", "Abelson");
assertEqual("Exercise 7: toJSON", book.toJSON(), '{"title":"SICP","author":"Abelson"}');
```

### 2.6 Implementing Classes and Objects (6 exercises)

```javascript
import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Instance factory — create an object with get/set message dispatch
function makeInstance() { return undefined; }
const inst = makeInstance();
inst("set")("name", "Alice");
inst("set")("age", 30);
assertEqual("Exercise 1: get name", inst("get")("name"), "Alice");

// Exercise 2: Class factory — makeClass returns a function that creates instances
function makeClass(methods) { return undefined; }
const Dog = makeClass({
  init(self, name) { self.name = name; },
  bark(self) { return self.name + " says woof!"; }
});
const d = Dog("Rex");
assertEqual("Exercise 2: bark", d("send")("bark"), "Rex says woof!");

// Exercise 3: Account via dispatch — reimplement Account with makeClass
const AccountClass = makeClass({
  init(self, holder, balance) { /* TODO */ },
  deposit(self, amount) { /* TODO */ },
  withdraw(self, amount) { /* TODO */ },
  getBalance(self) { /* TODO */ },
});
const a = AccountClass("Alice", 100);
a("send")("deposit", 50);
assertEqual("Exercise 3: balance", a("send")("getBalance"), 150);

// Exercise 4: Method binding — automatic self binding
function bindMethod(instance, methodName, methods) { return undefined; }
// Test that methods receive the correct instance context

// Exercise 5: Inheritance via dispatch — CheckingAccount via makeClass
const CheckingClass = makeClass({
  init(self, holder, balance, fee) { /* TODO */ },
  withdraw(self, amount) { /* TODO: include fee */ },
});
const c = CheckingClass("Bob", 100, 1);
c("send")("withdraw", 20);
assertEqual("Exercise 5: balance with fee", c("send")("getBalance"), 79);

// Exercise 6: Compare class vs dispatch implementations
// Write a brief comparison (no assertion — just a comment exercise)
// TODO: Comment on trade-offs between JS class syntax and dispatch dicts
assertEqual("Exercise 6: comparison exercise", true, true);
```

### 2.7 Object Abstraction (6 exercises)

```javascript
import { assertEqual, assertApprox } from "../../shared/helpers.js";

// Exercise 1: toString override for custom types
class Rational {
  constructor(n, d) { this.n = n; this.d = d; }
  // TODO: toString() returns "n/d"
  // TODO: valueOf() returns n/d as float
}
const r = new Rational(3, 4);
assertEqual("Exercise 1: toString", r.toString(), "3/4");
assertApprox("Exercise 1: valueOf", r.valueOf(), 0.75);

// Exercise 2: Iterable object — make a Range class that works with for...of
class Range {
  // TODO: constructor(start, end), [Symbol.iterator]()
}
const nums = new Range(1, 4);
assertEqual("Exercise 2: spread Range", [...nums], [1, 2, 3]);

// Exercise 3: Type dispatch — handle different number representations
function addNumber(a, b) {
  // TODO: dispatch on typeTag property
  // Both a and b have { typeTag, value } — support "rational" and "complex"
}
const r1 = { typeTag: "rational", value: [1, 2] }; // 1/2
const r2 = { typeTag: "rational", value: [1, 3] }; // 1/3
assertEqual("Exercise 3: add rationals", addNumber(r1, r2), { typeTag: "rational", value: [5, 6] });

// Exercise 4: Getters and setters
class Temperature {
  // TODO: constructor(celsius), get fahrenheit(), set fahrenheit(f)
}
const temp = new Temperature(0);
assertEqual("Exercise 4: fahrenheit", temp.fahrenheit, 32);
temp.fahrenheit = 212;
assertEqual("Exercise 4: celsius after set", temp.celsius, 100);

// Exercise 5: Symbol.toPrimitive for custom conversion
class Complex {
  // TODO: constructor(real, imag), toString(), [Symbol.toPrimitive](hint)
}
const z = new Complex(3, 4);
assertEqual("Exercise 5: toString", z.toString(), "3 + 4i");
assertEqual("Exercise 5: number hint", +z, 5); // magnitude

// Exercise 6: Generic function via coercion
function multiplyGeneric(a, b) {
  // TODO: coerce types if needed, then multiply
}
assertEqual("Exercise 6: rational * integer", multiplyGeneric({ typeTag: "rational", value: [2, 3] }, { typeTag: "integer", value: 6 }), { typeTag: "rational", value: [4, 1] });
```

### 2.8 Efficiency (7 exercises)

```javascript
import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Call counter — HOF that wraps a function to count calls
function countCalls(fn) { return undefined; }
const countedFact = countCalls(function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); });
countedFact(5);
assertEqual("Exercise 1: call count for factorial(5)", countedFact.callCount, 5);

// Exercise 2: Memoize — cache function results
function memoize(fn) { return undefined; }
let fibCalls = 0;
const memoFib = memoize(function fib(n) {
  fibCalls++;
  return n <= 1 ? n : memoFib(n - 1) + memoFib(n - 2);
});
assertEqual("Exercise 2: fib(10)", memoFib(10), 55);
assertEqual("Exercise 2: fib calls <= 11", fibCalls <= 11, true);

// Exercise 3: Linear exponentiation
function exp(b, n) { return undefined; } // b^n, O(n)
assertEqual("Exercise 3: exp(2, 10)", exp(2, 10), 1024);

// Exercise 4: Fast exponentiation (successive squaring)
function fastExp(b, n) { return undefined; } // O(log n)
assertEqual("Exercise 4: fastExp(2, 10)", fastExp(2, 10), 1024);
assertEqual("Exercise 4: fastExp(3, 5)", fastExp(3, 5), 243);

// Exercise 5: Count steps — return [result, steps] for exp
function expCounted(b, n) { return undefined; }
const [result5, steps5] = expCounted(2, 10);
assertEqual("Exercise 5: result", result5, 1024);
assertEqual("Exercise 5: steps", steps5, 10);

// Exercise 6: Count steps — fastExp
function fastExpCounted(b, n) { return undefined; }
const [result6, steps6] = fastExpCounted(2, 10);
assertEqual("Exercise 6: result", result6, 1024);
assertEqual("Exercise 6: steps (log)", steps6, 4);

// Exercise 7: Growth category classifier
function growthCategory(steps, n) {
  // TODO: return "constant", "logarithmic", "linear", "quadratic", or "exponential"
  // based on the ratio of steps to n
  return undefined;
}
assertEqual("Exercise 7: constant", growthCategory(1, 100), "constant");
assertEqual("Exercise 7: linear", growthCategory(100, 100), "linear");
```

### 2.9 Recursive Objects (8 exercises)

```javascript
import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: LinkedList class
class LinkedList {
  // TODO: constructor(value, rest = null), static fromArray(arr)
  // Methods: get length, get(i), toString(), add(value)
}
const ll = LinkedList.fromArray([1, 2, 3]);
assertEqual("Exercise 1: length", ll.length, 3);
assertEqual("Exercise 1: get(1)", ll.get(1), 2);
assertEqual("Exercise 1: toString", ll.toString(), "LinkedList(1, 2, 3)");

// Exercise 2: LinkedList map and filter
// TODO: Add map(fn) and filter(pred) methods to LinkedList
const doubled = ll.map(x => x * 2);
assertEqual("Exercise 2: map", doubled.toString(), "LinkedList(2, 4, 6)");
const evens = ll.filter(x => x % 2 === 0);
assertEqual("Exercise 2: filter", evens.toString(), "LinkedList(2)");

// Exercise 3: Tree class
class Tree {
  // TODO: constructor(label, children = []), isLeaf, static fibTree(n)
}
const t = new Tree(1, [new Tree(2), new Tree(3, [new Tree(4)])]);
assertEqual("Exercise 3: label", t.label, 1);
assertEqual("Exercise 3: children count", t.children.length, 2);
assertEqual("Exercise 3: isLeaf", t.children[0].isLeaf, true);

// Exercise 4: Tree traversal — sum all labels
function sumLabels(t) { return undefined; }
assertEqual("Exercise 4: sumLabels", sumLabels(t), 10);

// Exercise 5: Fibonacci tree
const fibTree5 = Tree.fibTree(5);
assertEqual("Exercise 5: fibTree(5) root", fibTree5.label, 5);
assertEqual("Exercise 5: fibTree(5) left", fibTree5.children[0].label, 3);
assertEqual("Exercise 5: fibTree(5) right", fibTree5.children[1].label, 2);

// Exercise 6: BST — contains
class BST {
  // TODO: constructor(entry, left = null, right = null)
  // Methods: contains(val), insert(val)
}
const bst = new BST(5, new BST(3, new BST(1), new BST(4)), new BST(8, null, new BST(9)));
assertEqual("Exercise 6: contains 4", bst.contains(4), true);
assertEqual("Exercise 6: contains 7", bst.contains(7), false);

// Exercise 7: BST insert
bst.insert(7);
assertEqual("Exercise 7: contains 7 after insert", bst.contains(7), true);

// Exercise 8: BST to sorted array
function bstToArray(bst) { return undefined; }
assertEqual("Exercise 8: bstToArray", bstToArray(bst), [1, 3, 4, 5, 7, 8, 9]);
```

---

## 7. Validation Strategy

### Automated Checks

1. **Run every `solutions.js`**
   ```bash
   for d in practice/cs61a-composing-programs/02-building-abstractions-with-data/*/; do
     echo "=== ${d}solutions.js ==="
     node "${d}solutions.js" || echo "FAILED: $d"
   done
   ```
   Expected: All PASS, exit code 0.

2. **Syntax-check every `practice.js`**
   ```bash
   for d in practice/cs61a-composing-programs/02-building-abstractions-with-data/*/; do
     echo "=== ${d}practice.js ==="
     node --check "${d}practice.js" || echo "SYNTAX ERROR: $d"
   done
   ```
   Expected: All parse cleanly.

3. **Practice files fail safely**
   ```bash
   for d in practice/cs61a-composing-programs/02-building-abstractions-with-data/*/; do
     node "${d}practice.js" 2>&1 | head -5
   done
   ```
   Expected: FAIL assertions (not TypeError, ReferenceError, or infinite loops).

4. **Forbidden Python syntax in knowledge files**
   ```bash
   grep -rn "\bdef \b\|self\.\b\|print(\|True\b\|False\b\|None\b\|__init__\|__str__\|__repr__\|range(\|len(" \
     knowledge/cs61a-composing-programs/02-building-abstractions-with-data/*.md \
     | grep -v "Python vs JavaScript\|Python:\|```python\|translated\|avoid\|difference\|comparison" \
     || echo "Clean"
   ```
   Expected: "Clean" (no Python-only syntax in JS primary examples).

5. **Attribution blocks**
   ```bash
   for f in knowledge/cs61a-composing-programs/02-building-abstractions-with-data/*.md; do
     grep -c "CC BY-SA 3.0" "$f" || echo "MISSING ATTRIBUTION: $f"
   done
   ```
   Expected: Each file has 1 attribution block.

6. **File counts**
   - 9 knowledge files (.md)
   - 9 practice directories
   - 9 practice.js files
   - 9 solutions.js files
   ```bash
   echo "Knowledge: $(ls knowledge/cs61a-composing-programs/02-building-abstractions-with-data/*.md | wc -l)"
   echo "Practice dirs: $(ls -d practice/cs61a-composing-programs/02-building-abstractions-with-data/*/ | wc -l)"
   echo "Practice.js: $(ls practice/cs61a-composing-programs/02-building-abstractions-with-data/*/practice.js | wc -l)"
   echo "Solutions.js: $(ls practice/cs61a-composing-programs/02-building-abstractions-with-data/*/solutions.js | wc -l)"
   ```

### Manual Review Checklist

- [ ] Knowledge files accurately translate all subsections from the source
- [ ] No Python-only syntax in primary JS examples (only in "Python vs JS Notes" sections)
- [ ] Exercise difficulty progresses: fill-in → write-from-scratch → extend/debug
- [ ] `undefined` placeholders in practice.js don't cause TypeError (safe defaults where needed)
- [ ] Shared utility additions don't break existing Chapter 1 practice files
- [ ] Session prompts for 09–16 are explicit (not "follows same pattern" placeholders)
- [ ] README.md status updates reflect Chapter 2 progress

---

## 8. Risks and Review Checklist

### High-Risk Areas

| Risk | Impact | Mitigation |
|------|--------|------------|
| **JS arrays confused with CS61A pairs/lists** | Students may try `lst[0]` on closure-based linked lists | Knowledge file clearly separates JS arrays from custom linked lists; exercises use both with clear naming |
| **Mutation semantics** | JS objects/arrays are reference types; shallow vs deep copy confusion | Exercise 6 in 2.4 explicitly covers reference vs value; knowledge file has dedicated subsection |
| **`this` binding in classes** | Arrow functions in class methods lose `this`; callbacks lose `this` | Knowledge file 2.5 covers this pitfall; exercises use method shorthand (no arrow functions in class bodies) |
| **No operator overloading in JS** | Python's `__add__`/`__getitem__` have no direct equivalent | Knowledge file 2.7 explains the limitation; exercises use explicit methods (`.add()`, `.get()`) |
| **No multiple inheritance in JS** | Python's MRO cannot be directly translated | Knowledge file 2.5 covers mixins as the JS equivalent; Exercise 7 in 2.5 demonstrates the mixin pattern |
| **Iterator/generator scope** | `[Symbol.iterator]` is unfamiliar to most learners | Exercise 2 in 2.7 provides a guided template; knowledge file explains the protocol |
| **Performance timing variability** | `performance.now()` results vary across runs | Exercise 5–6 in 2.8 count steps instead of measuring time; avoids flaky assertions |
| **Equality of nested structures** | `===` doesn't deep-compare objects/arrays | `assertEqual` uses `isDeepStrictEqual`; exercise in 2.4 covers reference equality explicitly |
| **Infinite loops in recursive exercises** | Missing base cases in BST or linked list recursion | BST exercises limit tree depth; practice.js stubs return `undefined` (safe) |
| **Stale Python terminology** | Using "tuple", "list comprehension", "self" in JS context | Grep check for forbidden terms; knowledge files use JS terminology with Python comparison notes |

### Pre-Commit Review Checklist

Before committing each chunk, verify:

- [ ] All solutions.js pass with exit code 0
- [ ] All practice.js parse without syntax errors
- [ ] No file overwrites outside owned files (check `git diff --name-only`)
- [ ] Chapter 1 files are untouched
- [ ] Import paths use `../../shared/` (not `../../../shared/`)
- [ ] No `module.exports` (ES modules only)
- [ ] No external dependencies beyond Node built-ins
- [ ] Each exercise has a `// TODO:` comment in practice.js
- [ ] Each exercise has a corresponding `assertEqual`/`assertApprox` in both files

### Open Questions

1. **Constraint propagation (2.4.9):** The source's full constraint system (adder, multiplier, connector) is complex. Should we include it as a guided exercise or simplify to just dispatch dicts? **Recommendation:** Include as a guided exercise with substantial starter code.

2. **Mixin depth (2.5.7):** How deep should the mixin pattern go? The source shows `AsSeenOnTVAccount(CheckingAccount, SavingsAccount)`. In JS, we'd use mixins. **Recommendation:** One simple mixin example is sufficient; don't try to replicate full MRO.

3. **BST class (2.9.3):** Should BST use a separate `BST` class or extend the `Tree` class from 2.9.2? **Recommendation:** Separate `BST` class with `entry`/`left`/`right` attributes (matching the source) rather than reusing the generic `Tree` class.

4. **Performance.now availability:** `performance.now()` is available in Node.js >= 16 via `import { performance } from 'node:perf_hooks'`. This is fine for our Node >= 18 requirement, but efficiency exercises should prefer step-counting over timing.

---

## Task Summary

| Task | Chunk | Description | Owned Files |
|------|-------|-------------|-------------|
| 1 | 1 | Extend shared utilities (linked-list.js, tree.js, helpers.js) | 3 shared files |
| 2 | 1 | Create Chapter 2 directory structure | directories only |
| 3 | 2 | Knowledge 2.1 Introduction | 1 .md file |
| 4 | 2 | Knowledge 2.2 Data Abstraction | 1 .md file |
| 5 | 2 | Knowledge 2.3 Sequences | 1 .md file |
| 6 | 3 | Knowledge 2.4 Mutable Data | 1 .md file |
| 7 | 3 | Knowledge 2.5 OOP | 1 .md file |
| 8 | 3 | Knowledge 2.6 Implementing Classes | 1 .md file |
| 9 | 4 | Knowledge 2.7 Object Abstraction | 1 .md file |
| 10 | 4 | Knowledge 2.8 Efficiency | 1 .md file |
| 11 | 4 | Knowledge 2.9 Recursive Objects | 1 .md file |
| 12 | 5 | Practice 2.1 Introduction | 2 .js files |
| 13 | 5 | Practice 2.2 Data Abstraction | 2 .js files |
| 14 | 5 | Practice 2.3 Sequences | 2 .js files |
| 15 | 6 | Practice 2.4 Mutable Data | 2 .js files |
| 16 | 6 | Practice 2.5 OOP | 2 .js files |
| 17 | 6 | Practice 2.6 Implementing Classes | 2 .js files |
| 18 | 7 | Practice 2.7 Object Abstraction | 2 .js files |
| 19 | 7 | Practice 2.8 Efficiency | 2 .js files |
| 20 | 7 | Practice 2.9 Recursive Objects | 2 .js files |
| 21 | 8 | Update learning summary (SESSION-PROMPTS, PLAN, READMEs) | 4 structural files |
| 22 | 8 | Full validation + final commit | no new files |
