# Learning Path: CS61A SICP JavaScript Edition

## Overview

A structured learning path for CS61A's Structure and Interpretation of Computer Programs (JavaScript Edition), following the practice-first philosophy.

---

## Learning Philosophy

### Three Pillars

```
practice/          → Build muscle memory through hands-on coding
knowledge/         → Understand why things work (theory)
learning-summary/  → Document your insights and connections
```

### Key Principle

**Don't get stuck in theory.** Use SICP to deepen understanding of concepts you encounter in practical work.

> *"The best way to learn is by doing. Use theory to deepen practice, not replace it."*

---

## Phase 1: Foundation (Chapter 1)

### Chapter 1.1: The Elements of Programming ⭐ START HERE

**Status**: 🟡 In Progress

**Sections:**
- [ ] 1.1.1 - Expressions
- [ ] 1.1.2 - Naming and the Environment
- [ ] 1.1.3 - Evaluating Operator Combinations
- [ ] 1.1.4 - Compound Functions
- [ ] 1.1.5 - The Substitution Model ⭐ CRITICAL
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
├── 1.1.5-substitution-model/practice.js ⭐ Focus here
└── README.md
```

**Estimated Time**: 2-3 weeks (don't rush!)

**Success Criteria:**
- Can trace function execution mentally without paper
- Understand the difference between applicative and normal order
- Use substitution to debug code
- Write clear, composable functions

---

### Chapter 1.2: Procedures and the Processes They Generate

**Status**: ⚪ Not Started

**Learning Objectives:**
- Understand recursive vs iterative processes
- Learn tree recursion
- Grasp orders of growth (big-O)
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

### Chapter 1.3: Formulating Abstractions with Higher-Order Functions

**Status**: ⚪ Not Started

**Learning Objectives:**
- Functions as arguments
- Functions as return values
- Lambda expressions
- `map`, `filter`, `reduce` patterns

**Practice Strategy:**
- Rewrite loops using higher-order functions
- Practice function composition
- Build small utilities that compose

**Connection to Practice:**
- Modern JavaScript/TypeScript patterns
- React hooks and components
- Data transformation pipelines

---

### Chapter 1.4: Higher-Order Functions (Continued)

**Status**: ⚪ Not Started

**Learning Objectives:**
- Deeper exploration of higher-order functions
- Function composition patterns
- Building abstractions on abstractions

---

## Phase 2: Data Abstraction (Chapter 2)

### Chapter 2: Building Abstractions with Data

**Status**: ⚪ Not Started

**Learning Objectives:**
- Data abstraction barriers
- Hierarchical data structures
- Symbolic data
- Tagged data

**Connection to Practice:**
- Type systems
- Data modeling
- API design
- State management

---

## Phase 3: Modularity (Chapter 3)

### Chapter 3: Modularity, Objects, and State

**Status**: ⚪ Not Started

**Learning Objectives:**
- Environment model of execution
- Mutable state
- Concurrency
- Streams

**Connection to Practice:**
- React state management
- Redux patterns
- Async/await and promises
- Web Workers and concurrency

---

## Phase 4: Metalinguistic Abstraction (Chapter 4)

### Chapter 4: Metalinguistic Abstraction

**Status**: ⚪ Not Started

**Learning Objectives:**
- Building interpreters
- Domain-specific languages
- Lazy evaluation
- Non-deterministic computing

**Connection to Practice:**
- Understanding how languages work
- Building DSLs
- Compiler/transpiler concepts
- Advanced patterns

---

## Phase 5: Computing with Register Machines (Chapter 5)

### Chapter 5: Computing with Register Machines

**Status**: ⚪ Not Started

**Learning Objectives:**
- Machine organization
- Register machines
- Explicit-control evaluators
- Storage allocation

**Connection to Practice:**
- Understanding low-level execution
- Performance optimization
- How compilers work
- Memory management

---

## Weekly Learning Schedule

### Recommended Pace

**Per Section (e.g., 1.1.1):**
- **Day 1**: Read knowledge content (30 min) + Skim practice file (15 min)
- **Day 2**: Complete practice exercises (60 min) + Document insights (15 min)
- **Day 3**: Review reflection questions (30 min) + Connect to practice work (30 min)
- **Day 4**: Rest or light review
- **Day 5**: Move to next section

**Per Chapter (e.g., 1.1):**
- 2-3 weeks total
- Don't move on until substitution model is solid
- Chapter 1.5 is the most important in the entire book!

---

## Learning Tools

### Primary Resources

1. **Source Academy** (Interactive)
   - https://sourceacademy.org/
   - Online textbook with runnable examples
   - Built-in exercises and visualizations

2. **Knowledge Files** (Local)
   - `knowledge/cs61a-sicp-js/`
   - Markdown versions of textbook content
   - Reference when offline

3. **Practice Files** (Hands-on)
   - `practice/cs61a-sicp-js/`
   - Coding exercises with reflection questions
   - Run in browser console or Node.js

4. **Learning Summaries** (Documentation)
   - `learning-summary/cs61a-sicp-js/`
   - Your personal insights and connections
   - Update after each section

### Secondary Resources

- **Original SICP** (Scheme version): https://mitpress.mit.edu/sites/default/files/sicp/index.html
- **CS61A Berkeley**: https://cs61a.org/
- **SICP JS Book**: https://sourceacademy.org/sicpjs/

---

## Success Metrics

### Completion Criteria

**For Each Section:**
- ✅ Read knowledge content
- ✅ Complete practice exercises
- ✅ Answer reflection questions
- ✅ Update learning summary
- ✅ Can explain concepts to someone else

**For Each Chapter:**
- ✅ All sections completed
- ✅ Learning summary updated
- ✅ Connected concepts to practice work
- ✅ Can apply concepts in real code

---

## Common Pitfalls

### ❌ Don't Rush

Especially Chapter 1.5 (Substitution Model). Rushing here will haunt you in:
- Recursion (Chapter 1.2)
- Higher-order functions (Chapter 1.3)
- Environment model (Chapter 3)
- Interpreters (Chapter 4)

**Take your time.** Practice until tracing is second nature.

### ❌ Don't Skip Practice

Reading alone isn't enough. You must:
- Type the code
- Run the code
- Break the code
- Fix the code

### ❌ Don't Get Stuck in Theory

If you spend more than 30 minutes on a concept:
- Move on and come back later
- Try a practical example
- Ask for help

### ❌ Don't Isolate From Practice

Always connect SICP to your real work:
- "How does this relate to React?"
- "Where have I seen this pattern?"
- "How can I use this in my current code?"

---

## Progress Tracking

### Overall Progress

- [ ] Chapter 1.1 - The Elements of Programming 🟡 In Progress
- [ ] Chapter 1.2 - Procedures and Processes
- [ ] Chapter 1.3 - Higher-Order Functions
- [ ] Chapter 1.4 - More on Higher-Order Functions
- [ ] Chapter 2 - Data Abstraction
- [ ] Chapter 3 - Modularity, Objects, and State
- [ ] Chapter 4 - Metalinguistic Abstraction
- [ ] Chapter 5 - Computing with Register Machines

### Detailed Progress

See individual chapter/section tracking in learning summaries.

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

> *"It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures."* — Alan Perlis

> *"A computer is like a violin...it sounds terrible until you learn how to use it."* — Marvin Minsky

> *"Programs must be written for people to read, and only incidentally for machines to execute."* — Harold Abelson

> *"Think of it this way: conversations are games of catch. If you throw a ball that's too heavy, no one can catch it. If you throw a ball that's too light, it carries no weight."* — Unknown

---

**Remember**: This isn't about memorizing JavaScript syntax. It's about building **mental models** for computation and learning to **manage complexity** in software systems.

Let's make some music. 🎵

---

**Last Updated**: 2026-03-22
**Current Focus**: Chapter 1.1 - The Elements of Programming
