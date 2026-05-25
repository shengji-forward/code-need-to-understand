# Session 00 — Course Overview: Learning Report

**Completed**: 2026-05-19
**Source**: Setup, tools, learning philosophy

---

## Objectives

- [x] Understand the 4-chapter course structure and learning philosophy
- [x] Set up Node.js development environment
- [x] Learn the session workflow: knowledge → practice → solutions

---

## What You Learned

### 1. Course Structure — 4 Chapters, 29 Sections

| Chapter | Title | Sections | Core Idea |
|---------|-------|----------|-----------|
| 1 | Building Abstractions with Functions | 1.1–1.7 | Abstract *processes* into named, reusable units |
| 2 | Building Abstractions with Data | 2.1–2.9 | Abstract *information* into structured, composable units |
| 3 | Interpreting Computer Programs | 3.1–3.5 | Understand how languages themselves are built |
| 4 | Data Processing | 4.1–4.8 | Apply all abstractions at scale |

Each chapter is a higher layer of abstraction built on the one before. Functions are the foundation because everything else rests on the ability to wrap a computation in a name.

### 2. Node.js Setup

- **Node.js v24.14.0** installed and verified
- JavaScript runs outside the browser via Node.js
- Two ways to use it:
  - `node` → enter the REPL (interactive playground, `>` prompt)
  - `node file.js` → run a `.js` file directly

### 3. REPL Fundamentals

Practiced in the Node.js REPL:

```js
> 2 + 3
5
> "My name is " + "SJ"
'My name SJ'
> function square(x) { return x * x; }
undefined
> square(7)
49
> square
[Function: square]
```

Key insight: the REPL shows return values automatically — no `console.log` needed. When running `.js` files, `console.log()` is required.

**Critical distinction discovered:**
- `square` → references the function itself (pointing at a recipe card)
- `square(7)` → calls the function (following the recipe)

### 4. Learning Workflow

- **knowledge/*.md** → read theory first
- **practice/*/practice.js** → attempt exercises with TODO placeholders
- **practice/*/solutions.js** → check solutions after attempting

Supporting utilities live in `practice/shared/` (assertion helpers, pair/linked-list/tree data structures used in later chapters).

---

## Mistakes & Corrections

| Moment | What Happened | Lesson |
|--------|---------------|--------|
| `clear` in REPL | Typed `clear`, got `ReferenceError` | REPL treats unknown words as JS variables, not commands. Use `.clear` (with dot) to clear the screen |
| File path confusion | Thought `1.1-getting-started.md` was in `practice/` | Knowledge files (`.md`) live in `knowledge/`, practice files (`.js`) live in `practice/` — two separate directory trees |
| `square` without `()` | Guessed it would error | Referencing a function name without calling it returns `[Function: square]` — no error, no execution |

---

## Key Takeaways

1. **Abstraction is the thread** — the course builds layers: processes → data → languages → systems
2. **Node.js is your tool** — REPL for exploration, file execution for practice
3. **Knowledge first, then practice, then solutions** — read, code, verify
4. **Functions before data** — you must learn to abstract processes before abstracting information

---

## What's Next

**Session 01 — Getting Started (1.1)**
- Read: `knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md`
- Practice: `practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/practice.js`
- Objectives: Install and use Node.js REPL and script execution, distinguish syntax/runtime/semantic errors, experiment with basic expressions
