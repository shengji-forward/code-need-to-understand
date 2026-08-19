# Session 09 — 2.1–2.2 Native Data Types & Data Abstraction: Learning Report

**Dates:** 2026-08-17 → 2026-08-19 (one long session)
**Practice:** 2.1-introduction **5/5** · 2.2-data-abstraction **6/6 exercises, 16/16 assertions** — all green
**Source:** [2.1](https://www.composingprograms.com/pages/21-introduction.html) · [2.2](https://www.composingprograms.com/pages/22-data-abstraction.html)

---

## Objectives

- [x] Understand JS native types, IEEE-754 doubles, floating-point precision traps
- [x] Implement data abstraction with **constructor + selectors** (built *before* naming)
- [x] Build rational arithmetic on an **abstraction barrier**
- [x] Trace `makeRational`'s gcd reduction and how selectors maintain the barrier
- [x] Understand **closure-based pairs** (enforced barrier — data made of functions)

---

## How it went (the arc)

1. **Warm-up:** the parked 1.4 trap recalled cold (defaults fire only on `undefined`). One slip: echoed *call-site argument order* instead of *template slot order* → fixed (`"null, Sam!"`).
2. **Live cycle first, names after:** learner built `makePoint`/`xOf`/`yOf` from a blank page *before* any theory — then the vocabulary (constructor · selectors · representation · barrier) attached to code already owned. The "data abstraction is more abstract" reading-fear dissolved: *"you just built all of 2.2."*
3. **ADT connection, unprompted:** learner reached back to their UOP cs3303 DSA course and matched Stack push/pop ↔ selectors. Dormant recognition activated.
4. **Barrier deep-dive:**
   - hold ≠ open (users may hold boxes, never look inside)
   - breakage demos, run live: `[x,y]`→`[y,x]` reorder (same array type!) → **silent 0.5**; object swap → NaN. Semantic errors — no crash, wrong answer, unfindable.
   - **two-sided rule:** users never `r[0]` (open) *and* never `[n, d]` (build) — both are knowing the insides. Caught live when `addRational` returned a hand-built array.
   - position-addressed (arrays) vs label-addressed (objects) — meaning lives in *where* vs *what*.
   - **edit-count comparison:** representation swap = 3 functions/one room (good world) vs whole-app audit on foot (bad world).
5. **Float betrayal:** `0.1 + 0.2 === 0.3` → `false` (learner predicted true); binary non-representability (1/3-decimal analogy); the **lucky cancel** (`1/3 + 1/6` happens to print `0.5`) → floats are a *slot machine*; production rule: **money is integer cents**.
6. **Rational build (array box):** trio written (two notation bugs fixed: `[0]`-literal vs `r[0]` indexing; `return n/d` division sin caught before it ran) → `addRational` user-side with full door discipline.
7. **A/B design question** (reduce in users vs constructor): needed production translation before it clicked — **money-in-cents, lowercase-email-at-the-door**. Learner chose **B** and defended it in barrier vocabulary. Follow-up questions sharpened it: "why not just make passwordReset remember too?" (omission vs commission) and "what forces users through makeUser?" (birth sites few, usage sites many).
8. **gcd (Euclid):** written by learner. Two bugs: base case `return 0` (should return `a`) and `/` instead of `%` — **the division sin, second offense**; the buggy version's float-bounce trace (`2.67 → 0.395 → 738.9 → 10⁻¹² → …`) made "integer-land" vivid. Fixed; finale verified: `27/27 → 1/1`, `9/18 → 1/2`, `addRational` byte-for-byte unchanged = Future B's promise proven live.
9. **Closure pairs (enforced barrier):** `selector`-mystery = the recap's `x`-mystery again (slot empty at birth, caller fills it at call two). After three attempts (inside-view paste → shelf-name `head()` → inline arrow), learner **invented a third selector**: `p((a, b) => a + b)` → 30. `p[0]` shown to be *physically* impossible — promise → physics.
10. **Practice:** 2.1 (5/5 — typo catches: `number` → `"number"`, `ture` → `true` = the 1.1 trap self-delivered). 2.2 (16/16 — array→closure box swap; `mulRational` written with a **phantom `+`** carried over from addition's shape + `newNumber`/`newNumer` typo). Learner honestly flagged *"I just mechanically followed the shape"* → taught **jobs-of-lines** (each line has a job; the job names the code; `+` existed to merge piles, multiplication has no piles).

---

## Honest usefulness ledger (asked directly: "is this useful?")

**Vehicle (won't use):** rational-number arithmetic itself.
**Cargo (weekly, forever):** normalize-at-the-door (Money/Email/Date/value objects — "make invalid states unrepresentable"); representation freedom (migrations that don't ripple); closure-as-vault (private state, `makeRng`/`pair` kin); the meta-skill of catching shape-mimicry and switching to tracing.

## Recurring slips to re-check (spaced review list)

1. **Name typos → ReferenceError** (3× today: `ture`, `newNumber`/`newNumer`, plus `selector`-out-of-scope)
2. **Division sin** (2×: `n/d` in makeRational, `/` vs `%` in gcd) — "`/` is an exit visa from integer-land"
3. `[0]`-literal (build) vs `r[0]` (read) notation slip
4. Pass-the-function vs call-it (final form: `p((a,b) => a+b)`)
5. Template slot order vs call-site argument order

## Notes for next sessions

- Learner's TS insight (data-abstraction-as-promise is what TS enforces) — reprise when we hit interfaces/branded types in the JS/TS recap phase.
- Build checkpoint after Ch2 review still suggested (learner's roadmap: CS61A → JS/TS recap → build Forwardgrounds software).
- Roadmap + UOP background recorded in tutor memory.

## What's next

**Session 10 — Sequences (2.3):** arrays, strings, linked lists, trees — recursion returns to operate on data that is *shaped like* recursion.
