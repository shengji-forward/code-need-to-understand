# CS61A SICP JavaScript Edition -- YouTube Video Learning Path

## Overview

A structured learning path through [SICP JavaScript Edition](https://sourceacademy.org/sicpjs/) (Structure and Interpretation of Computer Programs), producing 97 YouTube tutorial videos using Reveal.js HTML slide presentations and teaching transcripts.

This path follows the **Feynman method**: learn each subsection deeply, then teach it to others through video. Teaching forces real understanding -- if you can't explain it simply, you don't understand it well enough.

---

## Learning Philosophy

### Two Goals at Once

```
1. Learn computational thinking  → Build mental models for how programs work
2. Teach through video           → Force deeper understanding via Feynman method + practice English
```

### Key Principles

- **Programs are for people to read.** Only incidentally for machines to execute.
- **Learn one subsection per session.** Never mix sessions.
- **Teach what you just learned.** Each session produces a video-ready slide deck and transcript.
- **All code comes from the book.** Never invent code for slides -- use the actual SICP JS examples.

---

## How It Works

### Workflow per Chapter

```
Orchestrator (Cursor)           You                Claude Code (Terminal)
─────────────────────          ─────              ──────────────────────
1. Gives session prompt   →    2. Pastes prompt   →   3. Guides learning
                               4. Learns session  ←   (interactive Q&A)
5. Creates slides/transcript ← 6. Reports back
7. Updates progress
8. Gives next prompt      →    ...repeat...
```

### What Each Chapter Produces

| Artifact | Purpose |
|----------|---------|
| `transcript.md` | Teaching script for the YouTube video |
| `slides.html` | Reveal.js presentation for screen recording |

---

## Video Collection (97 Videos)

### Phase 0: Overview (Video 00)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 00 | Overview & Programming Philosophy | Foreword, Preface, Acknowledgments | 15-20 min |

### Phase 1: Building Abstractions with Functions (Videos 01-18)

#### Section 1.1: The Elements of Programming (Videos 01-08)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 01 | Expressions | 1.1.1 | 8-12 min |
| 02 | Naming and the Environment | 1.1.2 | 8-12 min |
| 03 | Evaluating Operator Combinations | 1.1.3 | 8-12 min |
| 04 | Compound Functions | 1.1.4 | 10-15 min |
| 05 | The Substitution Model | 1.1.5 | 12-18 min |
| 06 | Conditional Expressions and Predicates | 1.1.6 | 10-15 min |
| 07 | Example: Square Roots by Newton's Method | 1.1.7 | 10-15 min |
| 08 | Functions as Black-Box Abstractions | 1.1.8 | 10-15 min |

#### Section 1.2: Functions and the Processes They Generate (Videos 09-14)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 09 | Linear Recursion and Iteration | 1.2.1 | 12-18 min |
| 10 | Tree Recursion | 1.2.2 | 12-18 min |
| 11 | Orders of Growth | 1.2.3 | 10-15 min |
| 12 | Exponentiation | 1.2.4 | 10-15 min |
| 13 | Greatest Common Divisors | 1.2.5 | 8-12 min |
| 14 | Example: Testing for Primality | 1.2.6 | 10-15 min |

#### Section 1.3: Formulating Abstractions with Higher-Order Functions (Videos 15-18)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 15 | Functions as Arguments | 1.3.1 | 10-15 min |
| 16 | Constructing Functions using Lambda Expressions | 1.3.2 | 12-18 min |
| 17 | Functions as General Methods | 1.3.3 | 10-15 min |
| 18 | Functions as Returned Values | 1.3.4 | 12-18 min |

### Phase 2: Building Abstractions with Data (Videos 19-36)

#### Section 2.1: Introduction to Data Abstraction (Videos 19-22)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 19 | Example: Arithmetic Operations for Rational Numbers | 2.1.1 | 12-18 min |
| 20 | Abstraction Barriers | 2.1.2 | 10-15 min |
| 21 | What Is Meant by Data? | 2.1.3 | 10-15 min |
| 22 | Extended Exercise: Interval Arithmetic | 2.1.4 | 12-18 min |

#### Section 2.2: Hierarchical Data and the Closure Property (Videos 23-26)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 23 | Representing Sequences | 2.2.1 | 12-18 min |
| 24 | Hierarchical Structures | 2.2.2 | 12-18 min |
| 25 | Sequences as Conventional Interfaces | 2.2.3 | 12-18 min |
| 26 | Example: A Picture Language | 2.2.4 | 15-20 min |

#### Section 2.3: Symbolic Data (Videos 27-30)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 27 | Strings | 2.3.1 | 8-12 min |
| 28 | Example: Symbolic Differentiation | 2.3.2 | 12-18 min |
| 29 | Example: Representing Sets | 2.3.3 | 12-18 min |
| 30 | Example: Huffman Encoding Trees | 2.3.4 | 15-20 min |

#### Section 2.4: Multiple Representations for Abstract Data (Videos 31-33)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 31 | Representations for Complex Numbers | 2.4.1 | 10-15 min |
| 32 | Tagged Data | 2.4.2 | 10-15 min |
| 33 | Data-Directed Programming and Additivity | 2.4.3 | 15-20 min |

#### Section 2.5: Systems with Generic Operations (Videos 34-36)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 34 | Generic Arithmetic Operations | 2.5.1 | 12-18 min |
| 35 | Combining Data of Different Types | 2.5.2 | 12-18 min |
| 36 | Example: Symbolic Algebra | 2.5.3 | 15-20 min |

### Phase 3: Modularity, Objects, and State (Videos 37-56)

#### Section 3.1: Assignment and Local State (Videos 37-39)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 37 | Local State Variables | 3.1.1 | 10-15 min |
| 38 | The Benefits of Introducing Assignment | 3.1.2 | 10-15 min |
| 39 | The Costs of Introducing Assignment | 3.1.3 | 10-15 min |

#### Section 3.2: The Environment Model of Evaluation (Videos 40-44)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 40 | The Rules for Evaluation | 3.2.1 | 12-18 min |
| 41 | Applying Simple Functions | 3.2.2 | 10-15 min |
| 42 | Frames as the Repository of Local State | 3.2.3 | 12-18 min |
| 43 | Internal Declarations | 3.2.4 | 10-15 min |
| 44 | CSE Machine | 3.2.5 | 12-18 min |

#### Section 3.3: Modeling with Mutable Data (Videos 45-49)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 45 | Mutable List Structure | 3.3.1 | 12-18 min |
| 46 | Representing Queues | 3.3.2 | 10-15 min |
| 47 | Representing Tables | 3.3.3 | 10-15 min |
| 48 | A Simulator for Digital Circuits | 3.3.4 | 15-20 min |
| 49 | Propagation of Constraints | 3.3.5 | 15-20 min |

#### Section 3.4: Concurrency: Time Is of the Essence (Videos 50-51)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 50 | The Nature of Time in Concurrent Systems | 3.4.1 | 12-18 min |
| 51 | Mechanisms for Controlling Concurrency | 3.4.2 | 12-18 min |

#### Section 3.5: Streams (Videos 52-56)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 52 | Streams Are Delayed Lists | 3.5.1 | 12-18 min |
| 53 | Infinite Streams | 3.5.2 | 12-18 min |
| 54 | Exploiting the Stream Paradigm | 3.5.3 | 12-18 min |
| 55 | Streams and Delayed Evaluation | 3.5.4 | 12-18 min |
| 56 | Modularity of Functional Programs and Modularity of Objects | 3.5.5 | 12-18 min |

### Phase 4: Metalinguistic Abstraction (Videos 57-73)

#### Section 4.1: The Metacircular Evaluator (Videos 57-63)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 57 | The Core of the Evaluator | 4.1.1 | 15-20 min |
| 58 | Representing Components | 4.1.2 | 12-18 min |
| 59 | Evaluator Data Structures | 4.1.3 | 12-18 min |
| 60 | Running the Evaluator as a Program | 4.1.4 | 12-18 min |
| 61 | Data as Programs | 4.1.5 | 10-15 min |
| 62 | Internal Declarations | 4.1.6 | 10-15 min |
| 63 | Separating Syntactic Analysis from Execution | 4.1.7 | 12-18 min |

#### Section 4.2: Lazy Evaluation (Videos 64-66)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 64 | Normal Order and Applicative Order | 4.2.1 | 10-15 min |
| 65 | An Interpreter with Lazy Evaluation | 4.2.2 | 15-20 min |
| 66 | Streams as Lazy Lists | 4.2.3 | 10-15 min |

#### Section 4.3: Nondeterministic Computing (Videos 67-69)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 67 | Search and amb | 4.3.1 | 12-18 min |
| 68 | Examples of Nondeterministic Programs | 4.3.2 | 12-18 min |
| 69 | Implementing the amb Evaluator | 4.3.3 | 15-20 min |

#### Section 4.4: Logic Programming (Videos 70-73)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 70 | Deductive Information Retrieval | 4.4.1 | 12-18 min |
| 71 | How the Query System Works | 4.4.2 | 12-18 min |
| 72 | Is Logic Programming Mathematical Logic? | 4.4.3 | 10-15 min |
| 73 | Implementing the Query System | 4.4.4 | 15-20 min |

### Phase 5: Computing with Register Machines (Videos 74-95)

#### Section 5.1: Designing Register Machines (Videos 74-78)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 74 | A Language for Describing Register Machines | 5.1.1 | 12-18 min |
| 75 | Abstraction in Machine Design | 5.1.2 | 10-15 min |
| 76 | Subroutines | 5.1.3 | 10-15 min |
| 77 | Using a Stack to Implement Recursion | 5.1.4 | 12-18 min |
| 78 | Instruction Summary | 5.1.5 | 8-12 min |

#### Section 5.2: A Register-Machine Simulator (Videos 79-82)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 79 | The Machine Model | 5.2.1 | 12-18 min |
| 80 | The Assembler | 5.2.2 | 12-18 min |
| 81 | Instructions and Their Execution Functions | 5.2.3 | 12-18 min |
| 82 | Monitoring Machine Performance | 5.2.4 | 10-15 min |

#### Section 5.3: Storage Allocation and Garbage Collection (Videos 83-84)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 83 | Memory as Vectors | 5.3.1 | 12-18 min |
| 84 | Maintaining the Illusion of Infinite Memory | 5.3.2 | 12-18 min |

#### Section 5.4: The Explicit-Control Evaluator (Videos 85-88)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 85 | The Dispatcher and Basic Evaluation | 5.4.1 | 12-18 min |
| 86 | Evaluating Function Applications | 5.4.2 | 12-18 min |
| 87 | Blocks, Assignments, and Declarations | 5.4.3 | 12-18 min |
| 88 | Running the Evaluator | 5.4.4 | 10-15 min |

#### Section 5.5: Compilation (Videos 89-95)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 89 | Structure of the Compiler | 5.5.1 | 12-18 min |
| 90 | Compiling Components | 5.5.2 | 12-18 min |
| 91 | Applications and Return Statements | 5.5.3 | 12-18 min |
| 92 | Combining Instruction Sequences | 5.5.4 | 10-15 min |
| 93 | An Example of Compiled Code | 5.5.5 | 12-18 min |
| 94 | Lexical Addressing | 5.5.6 | 12-18 min |
| 95 | Interfacing Compiled Code to the Evaluator | 5.5.7 | 12-18 min |

### Final Capstone (Video 96)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 96 | Full Book Capstone | All chapters + cross-references | 20-30 min |

---

## Source Material

| Source | Location | Role |
|--------|----------|------|
| Knowledge repo (through 2.1) | `knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/` | Primary -- local markdown files |
| Source Academy online | [sourceacademy.org/sicpjs](https://sourceacademy.org/sicpjs/) | Primary -- sections beyond 2.1 |
| Existing learning note | `learning-summary/cs61a-sicp-js/1.1-elements-of-programming.md` | Reference -- prior study notes |

---

## Directory Structure

```
cs61a-sicp-js/
├── README.md                                          ← you are here
├── PLAN.md                                            ← detailed session-by-session breakdown
├── TODO.md                                            ← progress tracker
├── SESSION-PROMPTS.md                                 ← copy-paste prompts for Claude Code
├── 1.1-elements-of-programming.md                     ← existing learning note (preserved)
├── 00-overview-and-philosophy/
│   ├── transcript.md
│   └── slides.html
├── 01-1.1.1-expressions/
│   ├── transcript.md
│   └── slides.html
├── 02-1.1.2-naming-and-environment/
│   ├── transcript.md
│   └── slides.html
├── ...
├── 95-5.5.7-interfacing-compiled-code/
│   ├── transcript.md
│   └── slides.html
└── 96-capstone-full-book/
    ├── transcript.md
    └── slides.html
```

---

## Slide Technology

All slides use **Reveal.js** loaded via CDN. Each `slides.html` is self-contained -- just open in a browser.

Features:
- Syntax-highlighted code blocks (highlight.js)
- Copy button on all code blocks
- Speaker notes (press `S` in Reveal.js to view)
- PDF export (append `?print-pdf` to URL, then Ctrl+P)
- Dark theme optimized for screen recording

---

## How to Record a Video

1. Open `slides.html` in a full-screen browser
2. Open `transcript.md` in a separate window or teleprompter
3. Start screen recording (OBS, QuickTime, etc.)
4. Present slides while following the transcript
5. Use speaker notes (`S` key) as backup prompts

---

## End Goal

By video 96, you should be able to:

- Explain how JavaScript evaluates any expression using the substitution model
- Trace recursive and iterative processes and analyze their growth
- Build abstractions with higher-order functions, data structures, and generic operations
- Understand the environment model and how assignment changes everything
- Model systems with mutable state, concurrency, and streams
- Build a metacircular evaluator -- a JavaScript interpreter written in JavaScript
- Implement lazy evaluation and nondeterministic computing
- Design register machines and understand compilation from source to machine code

**If you can teach all 97 videos clearly, you truly understand computational thinking.**

---

**Last Updated**: 2026-04-12
**Current Focus**: Session 00 -- Overview & Programming Philosophy
