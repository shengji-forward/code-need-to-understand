# Session 08 — Chapter 1 Review · Learner Report

**Date:** 2026-08-17
**Format:** Interactive retrieval recap (tutor asks → learner recalls → tutor corrects), one question per turn, with one from-scratch coding cycle at the end.
**Context:** ~5-week gap since completing Chapter 1 (session 07). Learner self-reported "forgot lots of things" — correct, and expected per the known decay pattern.

---

## What had decayed (observed, not guessed)

- **"Abstraction" — total blank.** Could not produce the one-idea definition after 2 minutes. (Rebuilt Socratically via the café metaphor: *"latte" = a name hiding the whole hidden process* → learner then stated the definition correctly: *hiding detail/process behind a name, to think at a higher level*.)
- **Ladder rungs 1.6/1.7 — blank.** Could not name what became nameable (first-class functions; self-referential operations).
- **Vocabulary vs mechanism split (2nd confirmation):** terms vanished first, but mechanisms recovered fast under guided retrieval. Implication for future sessions: open with retrieval on concrete code, never re-teaching.

## What was rebuilt and verified

**1.6 — Higher-Order Functions (deep pass, the Forwardgrounds-critical section)**
- `double` vs `double(3)` — function-as-value recalled correctly by the learner unprompted.
- Three confusions surfaced and were fixed:
  1. *Arrow syntax ≠ returning a function* (thought `x => x * 2` is a HOF "because it returns an arrow function"). Fix: the test "what comes OUT when you call it — number or function?"
  2. *First-class vs higher-order conflated* (assigned first-class to "floors"). Fix: two measuring sticks — **rights** (citizenship: every JS function) vs **job** (order: what level it operates on).
  3. *Curried two-arg blank* ("where does x's argument come from?"). Fix: desugar `n => x => x + n` to nested named functions + two-doors picture + MOMENT 1 (birth) / MOMENT 2 (use) timeline.
- **Closure: fully reconstructed.** Learner produced the definition in their own words ("function + the birthplace frame it carries with it"), traced `wrap(4)` → `add4(3)` frame-by-frame (f1: n=4 birthplace surviving wrap's exit; f2: x=3), distinguished the argument-`1` from the return-value-`1` unprompted, and proved separate frames (`wrap(4)` vs `wrap(10)` → 7 vs 13, no shared `n`).
- **Payoff connected:** `makeRng(seed)` sketched — each recipe instance = an `add4` with its own seed frame; separate frames ⇒ reproducible pixels across surfaces.

**1.7 — Recursive Functions**
- Base case + what-gets-smaller: recalled cold (including "interpreter stacks frames → RangeError without it").
- `fact(3)` traced with one self-caught slip on the final unwind step; `fact(4)` traced flawlessly (1 → 2 → 6 → 24).
- Leap of faith: introduced (read = trace frames; write = trust the smaller call).
- Tree recursion: correctly identified `fib`'s two calls → tree shape; `branch()` generative-plant example connected it to Forwardgrounds fields.

## Trap quiz (the seven highest-value traps)

| § | Trap | Result |
|---|---|---|
| 1.1 | typo → runtime ReferenceError, not syntax | ✅ |
| 1.2 | snapshot trap (`area` stays 314) | ✅ |
| 1.3 | one-way lookup — callee can't see caller's frame | ✅ (hedged undefined vs error → pinned to ReferenceError; frames-link-to-birthplaces rule) |
| 1.4 | defaults fire only on `undefined`, not `null` | ❌ said `"Hello, Sam!"` → **re-taught** (null table + `??` tip) — **re-check first next session** |
| 1.5 | `console.assert` logs vs `assertEqual` throws | ✅ |
| 1.6 | closure birthplace = factory frame | ✅ |
| 1.7 | recursive step must call AND return | ✅ (`badFact` → 12, bug named) |

**Score: 6/7.**

## From-scratch coding cycle (trace-then-translate)

Traced `sumTo(4)` by hand (base case at 1; unwind 1 → 3 → 6 → 10), then wrote:

```js
function sumTo(n) { if (n === 1) return 1; else return n + sumTo(n - 1) }
```

**First-try correct.** Node-verified: `sumTo(1)=1, sumTo(4)=10, sumTo(10)=55, sumTo(100)=5050`. Bonus observation: `sumTo(0)` → live `RangeError: Maximum call stack size exceeded` (unreachable base case; precondition n ≥ 1 discussed).

## Verdict & next steps

- **Chapter 1 recap: LOCKED.** All seven sections retrieved; both peaks (1.6, 1.7) solid; writing muscle reactivated with a first-try success.
- **Next session:** Chapter 2 — start at 2.1–2.2 (Native Data Types & Abstraction). Open with the 1.4 default-null re-check (the single trap missed).
- Declined by learner: inter-session self-quizzing homework — retrieval happens at session starts with the tutor instead.
