# Session 01 — 1.1 Getting Started: Learning Report

**Completed**: 2026-05-25
**Source**: [Composing Programs 1.1](https://www.composingprograms.com/pages/11-getting-started.html)

---

## Objectives

- [x] Understand why programming languages require precision (vs natural language)
- [x] Use the REPL cycle: Read → Eval → Print → Loop
- [x] Distinguish expressions (produce values) from statements (carry out actions)
- [x] Explain functions as encapsulated logic and objects as data + methods bundled together
- [x] Classify errors into three categories: syntax, runtime, semantic
- [x] Complete all 5 practice exercises

---

## What You Learned

### 1. Why Programming Languages Exist

Natural language is ambiguous — "I saw a man with a telescope" has multiple valid interpretations. Programming languages trade richness for **total precision**: every expression has exactly one meaning, enforced by strict grammar rules. Computers are powerful but stupid — they execute exactly what you say, no more and no less.

### 2. The REPL Cycle

```
Read (Enter pressed) → Eval → Print → Loop (listening for keystrokes) ↺
```

The REPL isn't idle during the Loop phase — Node's readline library runs an event loop that captures keystrokes for autocomplete and preview. The full cycle only triggers on Enter.

### 3. Expressions vs Statements

| | Expression | Statement |
|---|---|---|
| Purpose | Compute a value | Carry out an action |
| Has a result? | Yes | No (it *does* something) |
| REPL shows output? | Yes | Only if it also produces a value |
| Examples | `2 + 2`, `typeof 42`, `Math.sqrt(144)` | `const x = 5`, `console.log("hi")` |

A statement often *contains* an expression: `const area = Math.PI * 5 * 5` — the statement is the binding, the expression is the computation on the right.

### 4. Functions — Encapsulated Logic

A function hides complexity behind a simple interface — vending machine analogy: input → hidden process → output.

```
144 ──→ Math.sqrt ──→ 12
```

The algorithm inside `Math.sqrt` is irrelevant to the caller. That's encapsulation.

### 5. Objects — Data + Methods Bundled

An object bundles data with the operations that manipulate it. A string `"hello"` isn't just characters — it comes with `.toUpperCase()`, `.length`, `.includes()`, etc.

The `Set` object holds unique words (data) and provides `.has()`, `.add()`, `.size` (methods). The Shakespeare line `const words = [...new Set(text.split(/\s+/))]` chains expressions: string → array (with duplicates) → Set (deduplicated) → array (unique words).

### 6. `typeof` is an Operator, Not a Function

```javascript
typeof 42       // operator syntax — correct style
typeof(42)      // works, but parens are just grouping, NOT a function call
```

Proof: `const f = typeof` throws SyntaxError (can't store an operator). `const g = Math.sqrt` works (functions are values).

### 7. Three Error Types

| Type | When caught | Example |
|---|---|---|
| **Syntax error** | Before the program runs | `function greet(name { }` — grammar is broken |
| **Runtime error** | During execution | `consolle.log("hi")` — ReferenceError (valid syntax, name not found) |
| **Semantic error** | Never caught — wrong output | `f - 32 * 5 / 9` — runs fine, gives wrong answer |

Key misconception corrected: `consolle.log("hi")` looks like a "spelling mistake" but is actually a **runtime** error. The syntax is valid — `consolle` is a grammatically correct identifier. The interpreter only fails when it tries to look up the name during execution.

JavaScript-specific quirk: `7 / 0` returns `Infinity` (not an error), unlike Python which raises ZeroDivisionError.

### 8. The Five-Concept Relationship

```
DATA (raw material) → EXPRESSION (recipe that produces data)
  → FUNCTION (reusable named expression) → OBJECT (data + methods bundled)
    → STATEMENT (command that uses all the above)
```

See [concept-map.md](./concept-map.md) for the full diagram with the Shakespeare example traced through all five roles.

---

## Practice Exercises

All 5 exercises passed:

```text
PASS: arithmetic
PASS: string concat
PASS: typeof number
PASS: sqrt
PASS: circle area
```

Answers: `12 + 8`, `"hello" + " " + "world"`, `typeof 42`, `Math.sqrt(144)`, `Math.PI * 5 * 5`.

---

## Mistakes & Corrections

| Moment | What Happened | Lesson |
|--------|---------------|--------|
| Error classification | Called `consolle.log("hi")` a syntax error | It's a runtime ReferenceError — valid grammar, name just doesn't exist at runtime |
| `7 / 0` | Assumed runtime error | JavaScript returns `Infinity` — different languages handle edge cases differently |
| `typeof()` vs `typeof` | Thought `typeof()` was a function call | Parentheses are just grouping — `typeof` is an operator, not a function |
| `Math.PI` | Called it a method | It's a property (a stored value), not a method (a function). Methods have parentheses |
| Set contents | Said Set holds "the text object" | Set holds unique words from `split()`, not the original text string |

---

## Key Takeaways

1. **Precision is the trade** — programming languages sacrifice natural language richness for unambiguous interpretation
2. **Expressions produce, statements command** — every line of code is one or both
3. **Functions encapsulate, objects bundle** — functions hide process complexity, objects group data with its operations
4. **Three error types, three severity levels** — syntax (caught early), runtime (caught during execution), semantic (never caught by the interpreter)
5. **The interpreter is deterministic** — same input, same output, every time

---

## What's Next

**Session 02 — Elements of Programming (1.2)**
- Read: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md`
- Practice: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/practice.js`
- Objectives: Understand names, environments, nested expressions, and evaluation order
