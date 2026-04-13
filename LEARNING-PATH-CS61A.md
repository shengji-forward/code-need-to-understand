# Learning Path: CS61A SICP JavaScript Edition

## Overview

A structured learning path for CS61A's Structure and Interpretation of Computer Programs (JavaScript Edition), following the practice-first philosophy. Now includes a **97-video YouTube learning path** using the Feynman method.

---

## Learning Philosophy

### Three Pillars

```
practice/          → Build muscle memory through hands-on coding
knowledge/         → Understand why things work (theory)
learning-summary/  → Document your insights, teach through video
```

### Key Principle

**Don't get stuck in theory.** Use SICP to deepen understanding of concepts you encounter in practical work. Then **teach what you learned** through video to solidify understanding.

> *"The best way to learn is by doing. Use theory to deepen practice, not replace it."*

---

## YouTube Video Learning Path (97 Videos)

Each subsection becomes one video using Reveal.js slides and a teaching transcript.

**Full details:** `learning-summary/cs61a-sicp-js/`

| Document | Purpose |
|----------|---------|
| `learning-summary/cs61a-sicp-js/README.md` | Video collection overview |
| `learning-summary/cs61a-sicp-js/PLAN.md` | Session-by-session breakdown |
| `learning-summary/cs61a-sicp-js/TODO.md` | Progress tracker |
| `learning-summary/cs61a-sicp-js/SESSION-PROMPTS.md` | Copy-paste prompts for Claude Code |

---

## Phase 1: Foundation (Chapter 1)

### Section 1.1: The Elements of Programming (Videos 01-08)

**Status**: In Progress

**Sections:**
- [ ] 1.1.1 - Expressions
- [ ] 1.1.2 - Naming and the Environment
- [ ] 1.1.3 - Evaluating Operator Combinations
- [ ] 1.1.4 - Compound Functions
- [ ] 1.1.5 - The Substitution Model -- CRITICAL
- [ ] 1.1.6 - Conditional Expressions and Predicates
- [ ] 1.1.7 - Square Roots by Newton's Method
- [ ] 1.1.8 - Black-Box Abstractions

**Learning Objectives:**
- Understand how JavaScript evaluates expressions
- Master the substitution model (mental code tracing)
- Learn to name and reuse computational objects
- Build functions as abstractions

**Practice Files:**
```
practice/cs61a-sicp-js/1.1-elements-of-programming/
├── 1.1.1-expressions/practice.js
├── 1.1.2-naming-and-environment/practice.js
├── 1.1.5-substitution-model/practice.js -- Focus here
└── README.md
```

**Estimated Time**: 2-3 weeks (don't rush!)

**Success Criteria:**
- Can trace function execution mentally without paper
- Understand the difference between applicative and normal order
- Use substitution to debug code
- Write clear, composable functions

---

### Section 1.2: Functions and the Processes They Generate (Videos 09-14)

**Status**: Not Started

**Learning Objectives:**
- Distinguish recursive functions from recursive processes
- Understand tree recursion and its cost
- Grasp orders of growth (big-Theta)
- Recognize when recursion is appropriate

**Practice Strategy:**
- Implement recursive functions
- Convert recursive to iterative
- Practice time/space analysis

**Connection to Practice:**
- Understanding stack depth
- Writing efficient algorithms
- Choosing between recursion and iteration

---

### Section 1.3: Formulating Abstractions with Higher-Order Functions (Videos 15-18)

**Status**: Not Started

**Learning Objectives:**
- Functions as arguments
- Functions as return values
- Lambda expressions
- Functions as general methods (fixed points, Newton's method)

**Practice Strategy:**
- Rewrite loops using higher-order functions
- Practice function composition
- Build small utilities that compose

**Connection to Practice:**
- Modern JavaScript/TypeScript patterns
- React hooks and components
- Data transformation pipelines

---

## Phase 2: Data Abstraction (Chapter 2, Videos 19-36)

### Section 2.1: Introduction to Data Abstraction (Videos 19-22)

**Status**: Not Started

**Learning Objectives:**
- Data abstraction barriers
- Constructors and selectors (pairs)
- What is meant by data?

### Section 2.2: Hierarchical Data and the Closure Property (Videos 23-26)

**Status**: Not Started

**Learning Objectives:**
- Lists and sequences
- Tree structures
- Conventional interfaces (map/filter/accumulate)
- The picture language

### Section 2.3: Symbolic Data (Videos 27-30)

**Status**: Not Started

**Learning Objectives:**
- Strings as symbolic data
- Symbolic differentiation
- Representing sets
- Huffman encoding

### Section 2.4: Multiple Representations for Abstract Data (Videos 31-33)

**Status**: Not Started

**Learning Objectives:**
- Tagged data and type dispatch
- Data-directed programming
- Message passing

### Section 2.5: Systems with Generic Operations (Videos 34-36)

**Status**: Not Started

**Learning Objectives:**
- Generic arithmetic
- Type coercion and the tower of types
- Symbolic algebra

**Connection to Practice:**
- Type systems and TypeScript
- Data modeling and API design
- State management patterns

---

## Phase 3: Modularity, Objects, and State (Chapter 3, Videos 37-56)

### Section 3.1: Assignment and Local State (Videos 37-39)

**Status**: Not Started

**Learning Objectives:**
- Local state variables and assignment
- Benefits and costs of introducing assignment

### Section 3.2: The Environment Model of Evaluation (Videos 40-44)

**Status**: Not Started

**Learning Objectives:**
- Environment model: frames, bindings, scoping
- Why substitution model breaks with assignment
- CSE Machine (JS-specific)

### Section 3.3: Modeling with Mutable Data (Videos 45-49)

**Status**: Not Started

**Learning Objectives:**
- Mutable list structure
- Queues, tables, digital circuit simulator
- Constraint propagation

### Section 3.4: Concurrency (Videos 50-51)

**Status**: Not Started

**Learning Objectives:**
- Time and concurrent systems
- Serialization and concurrency control

### Section 3.5: Streams (Videos 52-56)

**Status**: Not Started

**Learning Objectives:**
- Delayed evaluation and lazy lists
- Infinite streams
- Functional vs object-oriented modularity

**Connection to Practice:**
- React state management
- Async/await and promises
- Web Workers and concurrency

---

## Phase 4: Metalinguistic Abstraction (Chapter 4, Videos 57-73)

### Section 4.1: The Metacircular Evaluator (Videos 57-63)

**Status**: Not Started

**Learning Objectives:**
- Building a JavaScript interpreter in JavaScript
- The evaluate-apply cycle
- Separating analysis from execution

### Section 4.2: Lazy Evaluation (Videos 64-66)

**Status**: Not Started

**Learning Objectives:**
- Normal order vs applicative order
- Thunks and forcing
- Streams as lazy lists

### Section 4.3: Nondeterministic Computing (Videos 67-69)

**Status**: Not Started

**Learning Objectives:**
- The `amb` operator and search
- Continuations and backtracking

### Section 4.4: Logic Programming (Videos 70-73)

**Status**: Not Started

**Learning Objectives:**
- Query systems and pattern matching
- Unification
- Logic programming vs mathematical logic

**Connection to Practice:**
- Understanding how languages work
- Building DSLs
- Compiler/transpiler concepts

---

## Phase 5: Computing with Register Machines (Chapter 5, Videos 74-95)

### Section 5.1: Designing Register Machines (Videos 74-78)

**Status**: Not Started

**Learning Objectives:**
- Register machine language
- Subroutines and the stack

### Section 5.2: A Register-Machine Simulator (Videos 79-82)

**Status**: Not Started

**Learning Objectives:**
- Machine model, assembler, execution functions

### Section 5.3: Storage Allocation and Garbage Collection (Videos 83-84)

**Status**: Not Started

**Learning Objectives:**
- Memory as vectors
- Garbage collection

### Section 5.4: The Explicit-Control Evaluator (Videos 85-88)

**Status**: Not Started

**Learning Objectives:**
- Register machine evaluator for JavaScript
- Tail recursion in hardware

### Section 5.5: Compilation (Videos 89-95)

**Status**: Not Started

**Learning Objectives:**
- Compiler structure
- Compiling to register machine code
- Lexical addressing

**Connection to Practice:**
- Understanding low-level execution
- Performance optimization
- How compilers work
- Memory management

---

## Final Capstone (Video 96)

Comprehensive review of all five chapters with a 15-question final exam.

---

## Weekly Learning Schedule

### Recommended Pace

**Per Subsection (e.g., 1.1.1):**
- **Day 1**: Read knowledge content (30 min) + Run examples in Source Academy (15 min)
- **Day 2**: Complete practice exercises (60 min) + Document insights (15 min)
- **Day 3**: Review reflection questions (30 min) + Connect to practice work (30 min)
- **Day 4**: Rest or light review
- **Day 5**: Move to next subsection

**Per Section (e.g., 1.1):**
- 2-3 weeks total
- Don't move on until substitution model is solid
- Section 1.1.5 is the most important in the entire book!

---

## Learning Tools

### Primary Resources

1. **Source Academy** (Interactive)
   - https://sourceacademy.org/
   - Online textbook with runnable examples
   - Built-in exercises and visualizations

2. **Knowledge Files** (Local)
   - `knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/`
   - Markdown versions of textbook content (through 2.1)
   - Reference when offline

3. **Practice Files** (Hands-on)
   - `practice/cs61a-sicp-js/`
   - Coding exercises with reflection questions
   - Run in browser console or Node.js

4. **Learning Summaries & Video Path** (Documentation)
   - `learning-summary/cs61a-sicp-js/`
   - Video learning path materials
   - Your personal insights and connections

### Secondary Resources

- **Original SICP** (Scheme version): https://mitpress.mit.edu/sites/default/files/sicp/index.html
- **CS61A Berkeley**: https://cs61a.org/
- **SICP JS Book**: https://sourceacademy.org/sicpjs/
- **SICP Comparison Edition**: https://sicp.sourceacademy.org/

---

## Success Metrics

### Completion Criteria

**For Each Subsection:**
- Read knowledge content
- Complete practice exercises
- Answer reflection questions
- Update learning summary
- Can explain concepts to someone else (Feynman test)

**For Each Chapter:**
- All sections completed
- Learning summary updated
- Connected concepts to practice work
- Can apply concepts in real code
- Video materials created (transcript + slides)

---

## Common Pitfalls

### Don't Rush

Especially Section 1.1.5 (Substitution Model). Rushing here will haunt you in:
- Recursion (Section 1.2)
- Higher-order functions (Section 1.3)
- Environment model (Chapter 3)
- Interpreters (Chapter 4)

**Take your time.** Practice until tracing is second nature.

### Don't Skip Practice

Reading alone isn't enough. You must:
- Type the code
- Run the code
- Break the code
- Fix the code

### Don't Get Stuck in Theory

If you spend more than 30 minutes on a concept:
- Move on and come back later
- Try a practical example
- Ask for help

### Don't Isolate From Practice

Always connect SICP to your real work:
- "How does this relate to React?"
- "Where have I seen this pattern?"
- "How can I use this in my current code?"

---

## Progress Tracking

### Overall Progress

- [ ] Section 1.1 - The Elements of Programming (Videos 01-08) -- In Progress
- [ ] Section 1.2 - Functions and Processes (Videos 09-14)
- [ ] Section 1.3 - Higher-Order Functions (Videos 15-18)
- [ ] Section 2.1 - Introduction to Data Abstraction (Videos 19-22)
- [ ] Section 2.2 - Hierarchical Data (Videos 23-26)
- [ ] Section 2.3 - Symbolic Data (Videos 27-30)
- [ ] Section 2.4 - Multiple Representations (Videos 31-33)
- [ ] Section 2.5 - Generic Operations (Videos 34-36)
- [ ] Section 3.1 - Assignment and Local State (Videos 37-39)
- [ ] Section 3.2 - Environment Model (Videos 40-44)
- [ ] Section 3.3 - Mutable Data (Videos 45-49)
- [ ] Section 3.4 - Concurrency (Videos 50-51)
- [ ] Section 3.5 - Streams (Videos 52-56)
- [ ] Section 4.1 - Metacircular Evaluator (Videos 57-63)
- [ ] Section 4.2 - Lazy Evaluation (Videos 64-66)
- [ ] Section 4.3 - Nondeterministic Computing (Videos 67-69)
- [ ] Section 4.4 - Logic Programming (Videos 70-73)
- [ ] Section 5.1 - Designing Register Machines (Videos 74-78)
- [ ] Section 5.2 - Register-Machine Simulator (Videos 79-82)
- [ ] Section 5.3 - Storage and Garbage Collection (Videos 83-84)
- [ ] Section 5.4 - Explicit-Control Evaluator (Videos 85-88)
- [ ] Section 5.5 - Compilation (Videos 89-95)
- [ ] Capstone - Full Book Review (Video 96)

### Detailed Progress

See `learning-summary/cs61a-sicp-js/TODO.md` for per-video tracking.

---

## Support and Resources

### When Stuck

1. **Re-read the section** (maybe you missed something)
2. **Try a simpler example** (build intuition)
3. **Use Source Academy** (interactive environment)
4. **Take a break** (come back with fresh eyes)
5. **Connect to practice** (real-world examples)

### Community

- **Source Academy Forums**: https://sourceacademy.org/
- **CS61A Berkeley**: https://cs61a.org/
- **SICP Communities**: Reddit, Discord, etc.

---

## Inspirational Quotes

> *"It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures."* -- Alan Perlis

> *"A computer is like a violin...it sounds terrible until you learn how to use it."* -- Marvin Minsky

> *"Programs must be written for people to read, and only incidentally for machines to execute."* -- Harold Abelson

---

**Remember**: This isn't about memorizing JavaScript syntax. It's about building **mental models** for computation and learning to **manage complexity** in software systems.

---

**Last Updated**: 2026-04-12
**Current Focus**: Section 1.1 - The Elements of Programming
