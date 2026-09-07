# Session 12 — 2.5 Object-Oriented Programming: Learning Report

**Date:** 2026-09-03 → 09-07 (intermittent)
**Practice:** 7/7 exercises, 13/13 assertions — all green (two exercises swapped to production versions at the learner's request)
**Source:** [Composing Programs 2.5](https://www.composingprograms.com/pages/25-object-oriented-programming.html)

---

## Objectives

- [x] Map hand-built dispatch (`makeAccount`) onto `class` / `constructor` / `this`
- [x] Write methods that read the receiver (`this`) and other instances (parameters)
- [x] Understand **static** methods vs instance state (and vs default values)
- [x] Inheritance: `extends`, `super`, **override**, delegation
- [x] Conventions: `toString`, `toJSON`; the **mixin** pattern as JS's multiple-inheritance answer

---

## The arc

1. **Warm-up Q1 — the shared-box law, decayed.** Learner answered `user.name` stays `"Alice"` because "user and alias are not same object." Wrong: **assignment copies the arrow, never the box** — `const alias = user` makes two names for ONE box; `alias.name = "Bob"` is visible through `user`. Re-taught with the two-arrow diagram; connected to 2.4 Ex 6 (`a === c`) and armed with the debugging question: *"who else holds an arrow to this box?"*
2. **Warm-up Q2 — the translation.** `constructor` = the factory's memory-setup phase (learner guessed "dispatch" — corrected). `this.balance` = a property ON the instance box (learner guessed "birthplace frame" — corrected; privacy trade-off vs closure version made explicit: class fields are public, the closure account was an enforced barrier). `acct.deposit(50)`: **the dot `.` IS door 1** — the language ate the message-passing door and turned dispatch into syntax.
3. **Live cycle — `Account` class:** first version mutated but forgot `return`s and the guard; fixed; verified. The run exposed a bug in *the tutor's* test spec (labeled `withdraw(130)` as "guard!" but 130 < 150 is affordable — the guard fired correctly on the next call instead). Transparency both directions: machines check everyone.
4. **Practice — one exercise at a time, at the learner's explicit demand** ("DO NOT GIVE ME THE EX 2 FIRST!"). Two exercises swapped to production versions, also at the learner's request:
   - **Ex 1: `Point.distanceTo` → `Color.mix`** (same aim: read `this`'s fields + another instance's, compute, return). Bugs: wrote results onto the method's own name (`mix.r` — the ghost-name visitor now haunts method names); fix: **manufacture the result box** (`new Color(...)`) — the makePoint/doubleTree move, class edition.
   - **Ex 2: Account + holder + `getBalance`:** constructor hardcoded `0` (concrete-value trap reborn) and ghost `accountHolder`; then `getBalance(holder)` — the classic **receiver-comes-via-`this`-not-parameters** confusion (`acc.getBalance()` passes nothing; the box before the dot becomes `this`).
   - **Ex 3: override (fee):** computed-but-not-kept — `this.balance - x` without `=` (expression statement, value discarded; the 1.5 callback). Fix: `-=`.
   - **Ex 4: `addInterest`:** first-try correct — receiver-only fields, compute, keep, report.
   - **Ex 5: `toString`:** called a ghost *method* (`this.stringify()` — doesn't exist); fix: the method IS the formatter, template literal inside. `area` first-try.
   - **Ex 6: `MathUtils` → production `Formatter`** (money display — the 2.2 cents lesson shipped). Learner's static recap was wrong ("default value to the instance?") — corrected: **statics = the class's toolbox** (no instance, no `this`, like `Math.sqrt`); defaults = per-instance starting state. Learner shipped one ingredient early (dollars only), then took the remainder from the wrong box (`dollars % 100` instead of `amountInCents % 100`). Then made the right prioritization call: *"finish this for me — the importance is the static, not the computation"* — tutor completed it; concept standing verified.
   - **Ex 7: mixin:** decoded as a **class factory** — the `wrap(4)`/`makeAdder` pattern manufacturing classes; `JSON.stringify(this)`-inside-`toJSON` recursion trap flagged and dodged; learner's own bug: `${…}` inside **single quotes** (dead text) — backticks required. Patched, all green.

---

## Concepts locked

- **The mapping:** class = syntax around what you built by hand — constructor = memory setup; `.` = the eaten dispatch door; methods = the dispatch table; `this` = the receiver box.
- **`this` vs parameters:** the box before the dot arrives as `this`; parameters carry only what's inside the parens.
- **Statics:** class-level utilities, no instance (`Math.sqrt` kin); NOT default values.
- **Override + delegation:** same name wins in the child; `super.withdraw(amount + fee)` = parent's guard/write, child folds the fee (delegation over duplication).
- **Conventions:** `toString` (auto-called by string contexts) and `toJSON` (auto-called by `JSON.stringify`) — define once, every log/stringify spells your object your way. Trap: `JSON.stringify(this)` inside `toJSON` = infinite recursion (stringify calls it, which calls stringify…). Escape: stringify a **plain copy** of the fields.
- **Mixin:** `(Base) => class extends Base { … }` — compose capabilities instead of family trees; JS's answer to multiple inheritance.

## Traps logged (watchlist additions)

1. **Ghost methods** (`this.stringify()`) — the ghost-name visitor's new form; only defined or inherited methods exist on `this`.
2. **Receiver ≠ parameter** — `getBalance(holder)`; nothing is passed the receiver doesn't already own.
3. **Computed vs kept** — an expression statement discards; only `=`/`+=`/`-=` writes the box (third visit).
4. **Wrong-box remainder** — `floor`/`%` both read the ORIGINAL amount, never each other.
5. **Single quotes kill `${…}`** — template literals need backticks.
6. Shared-box law **decayed again** (Q1) — re-check it cold next session.

## What's next

**Session 13 — Implementing Objects (2.6–2.7).** The curtain lifts the other way: you built objects from closures in 2.4; now the book formalizes it — dispatch functions, message passing, `Symbol.toPrimitive`, type tags, generic functions. Your hand-built `makeAccount` was a preview of the whole section.
