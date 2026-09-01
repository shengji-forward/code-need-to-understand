# Session 11 — 2.4 Mutable Data: Learning Report

**Dates:** 2026-08-31 → 09-01
**Practice:** 7/7 exercises, 13/13 assertions — all green
**Source:** [Composing Programs 2.4](https://www.composingprograms.com/pages/24-mutable-data.html)

---

## Objectives

- [x] Mutate arrays/objects in place (`push`/`pop`/`splice`, index & dot assignment); `const` vs mutation
- [x] Understand **identity vs equality** (`===` asks "same box?")
- [x] Build **closures with private mutable state** (`makeCounter`, `makeWithdraw`, `makeAccount`)
- [x] Understand **dispatch dictionaries** (message → method) and **referential transparency** (what purity means and what breaks it)
- [x] Distinguish **shallow vs deep copy**

---

## The arc

1. **Reading (focused):** 2.4.1, 2.4.2, 2.4.4, 2.4.6, 2.4.8. Two substantial self-traces, both machine-verified correct: `makeWithdraw(100)` through three calls (`50 | 20 | "Insufficient funds"`) and the `account(20)` dispatch object. Best phrasing of the session, learner's own: *"wd holds a closure: a function with inner memory from its birthplace."* The trace was explicitly connected to 2.4.6 — it **is** referential transparency breaking (same function, different answers; the birthplace memory is a hidden input).
2. **The const warm-up, closed with the machine:** `nums[0] = 99` on a `const` array → legal, `[99,2,3]`; `nums = [7]` → `TypeError`. **const freezes the name's binding, never the box's contents.**
3. **Ex 1 (array mutation):** learned that **mutation methods return side-info, never the box** (`push` → length, `pop` → removed element, `splice` → removed array) — mutate, then `return arr` separately. Plus the one-vowel philosophy split: `slice` READS (copy), `splice` WRITES (in place).
4. **Ex 2 (object mutation):** caught building a NEW box where editing-in-place was asked — the Google-Doc lesson: mutate, and every holder of the box sees the change; rebuild, and the caller keeps the old one. Two tools, two consequences.
5. **Ex 3 (`makeCounter`):** one-word bug — `const count = 0` → `TypeError` on `count += 1` (a number has no "inside"; reassignment is the forbidden op). **Editable memory needs `let`.** Learner asked precisely why their version "failed" when the test passed — transparency given: the whole design was theirs, one borrowed letter (`let`).
6. **Ex 4 (`makeWithdraw`):** ghost-name bug — renamed the param to `iB` but wrote the update against the book's `balance` → `ReferenceError`. Fixed via Way B (explicit `let balance = initialBalance`). One name, guard to update to return.
7. **Ex 5 (`makeAccount`, the stretch):** two-door dispatch (`acct("deposit")(50)` — the `wrap(4)(3)` shape). Bugs: ghost names from the **caller's world** (`acct`, `amount` — door 1 knows neither) and door 1 trying to *cook* the method instead of handing out the card → **pass the recipe card, uncooked**. Then a `//` comment swallowed the deposit `return` whole (comments own their line's remainder). Final version clean, guard included.
8. **Ex 6 (identity, run-only):** `a === b` false (two boxes, equal contents), `a === c` true (two names, one box).
9. **Ex 7 (shallow copy — the reverse trap):** the stub was deliberately *over-protective* (deep-copied `b`, killing the leak the test demands). Fix = **delete** the deep copy: `{ ...obj }` — one level; primitives by value, nested boxes by reference (shared). One submission echoed the unchanged stub back — attention slip, called out plainly.

---

## Concepts locked

- **const/let/contents triangle:** const array → contents mutable, rebinding forbidden; let → both allowed; const primitive → frozen (no inside).
- **Mutation ops return side-info** — the box is the message: `return arr` after mutating.
- **`slice` vs `splice`:** read-a-copy vs cut-in-place.
- **In-place vs rebuild:** mutation is visible to all holders (Google-Doc); rebuild isolates the caller.
- **Identity vs equality:** `===` on objects compares *box identity*, never contents.
- **Shallow copy:** `{ ...obj }` — one level; nested boxes shared. Deep copy = recursion over every level.
- **The closure-state ladder:** `makeAdder` (frozen memory) → `makeCounter` (`let` counter) → `makeWithdraw` (guarded balance) → `makeAccount` (two-door dispatch: message picks the method; the method is handed out uncooked).
- **Referential transparency:** same inputs → same outputs; birthplace memory is a hidden input that breaks it — *why `render` must be pure* (the renderer connection, now first-principles).

## Traps logged (watchlist additions)

1. **Ghost names from the caller's world** (`acct`, `amount` inside `makeAccount`; `balance` after renaming the param) — the birthplace knows neither its storage name nor door 2's arguments.
2. **`//` eats to end-of-line** — returns swallowed by trailing comments; comments live on their own line.
3. **Echoing the diagnostic as the fix** (submitting the unchanged stub) — re-read the target before submitting.
4. `slice`/`splice` one-letter semantics.
5. Split-brain naming (guard checks `iB`, update edits `balance`) — one name per memory, always.

## What's next

**Session 12 — OOP (2.5).** Classes as formalized dispatch: constructor, `this`, methods, inheritance. Everything in `makeAccount` grows a syntax — and the dispatch dictionary becomes a `class`.
