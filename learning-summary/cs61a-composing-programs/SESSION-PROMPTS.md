# CS61A Composing Programs JS — Session Prompts

Copy-paste prompts for each session's teacher agent. Each prompt sets up the Feynman-method learning workflow.

---

## Session 00 — Course Overview

```
I'm starting the CS61A Composing Programs (JavaScript Edition) course. Help me understand the overall course structure: 4 chapters covering functions, data, interpreters, and data processing. Guide me through setting up Node.js (verify with `node --version`) and exploring the REPL. I have knowledge files in knowledge/cs61a-composing-programs/ and practice exercises in practice/cs61a-composing-programs/. Don't lecture — ask me questions to check my understanding of the course structure and learning workflow.
```

---

## Session 01 — Getting Started (1.1)

```
Teach me CS61A section 1.1 Getting Started. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Check my understanding of error types (syntax vs runtime vs semantic) and basic REPL usage before I attempt each exercise.
```

---

## Session 02 — Expressions & Names (1.2)

```
Teach me CS61A section 1.2 Elements of Programming. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Make sure I understand call expressions, name bindings (const/let), and the difference between pure and non-pure functions before I attempt each exercise.
```

---

## Session 03 — Defining Functions (1.3)

```
Teach me CS61A section 1.3 Defining New Functions. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Help me trace function calls through environment diagrams (global frame → local frame) and understand scope before I attempt each exercise.
```

---

## Session 04 — Designing Functions (1.4)

```
Teach me CS61A section 1.4 Designing Functions. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Focus on design principles: each function should do one thing, use descriptive names, think about domain and range. Check my understanding of locally defined functions and default parameters.
```

---

## Session 05 — Control Flow (1.5)

```
Teach me CS61A section 1.5 Control. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Help me understand statements vs expressions, boolean truthiness in JS (what values are falsy?), and when to use if/else vs while loops. Check my understanding before each exercise.
```

---

## Session 06 — Higher-Order Functions (1.6)

```
Teach me CS61A section 1.6 Higher-Order Functions. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/practice.js. This is the most important section in Chapter 1. Guide me with questions and analogies — don't give away the practice answers immediately. Use concrete analogies to explain functions as arguments, functions as return values, currying, and the decorator pattern. Check my understanding of closures and the environment model before I attempt each exercise.
```

---

## Session 07 — Recursive Functions (1.7)

```
Teach me CS61A section 1.7 Recursive Functions. I've read knowledge/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions.md. Now let me work through practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Help me think recursively: what's the base case? What's the recursive step? Use concrete analogies (Russian dolls, fractals) for tree recursion. Check my tracing ability before I attempt each exercise.
```

---

## Session 08 — Chapter 1 Review

```
It's time to review all of Chapter 1. I've completed practice exercises for sections 1.1 through 1.7. Run through all solution files in practice/cs61a-composing-programs/01-building-abstractions-with-functions/*/solutions.js and help me identify which concepts I should revisit. Ask me to explain the connections between expressions → function definitions → higher-order functions → recursion. Don't just summarize — test my understanding with questions and ask me to predict outputs before running code.
```

---

## Session 09 — Native Data Types & Abstraction (2.1-2.2)

```
Teach me CS61A sections 2.1-2.2: Introduction and Data Abstraction. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction.md and knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction/practice.js and practice/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Check my understanding of JavaScript's number types (IEEE 754 doubles, BigInt, typeof), floating-point precision traps, and how closure-based pairs enable data abstraction before I attempt each exercise. Help me trace through how makeRational uses gcd to reduce fractions and how numer/denom selectors maintain the abstraction barrier.
```

---

## Session 10 — Sequences (2.3)

```
Teach me CS61A section 2.3 Sequences. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section covers a lot of ground: arrays, linked lists, and trees. Make sure I understand the difference between JS array iteration (for...of, map, filter, reduce) and custom data structures. Before I attempt exercises, check that I can trace through a linked list recursively (what's first? what's rest? when do I stop?) and explain tree recursion (base case = leaf, recursive step = process branches). Use concrete analogies: arrays are like a row of lockers, linked lists are like a scavenger hunt with clues, trees are like an org chart.
```

---

## Session 11 — Mutable Data (2.4)

```
Teach me CS61A section 2.4 Mutable Data. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This is a critical mindset shift from Chapter 1's immutable style. Before I attempt exercises, check my understanding of: why objects are mutable by default in JS (vs const only preventing reassignment), how closures with let variables create private mutable state (the makeCounter pattern), and the difference between identity (===) and equality (deep comparison). Use concrete analogies: mutating an array is like editing a shared Google Doc — everyone with a reference sees the change. A closure with state is like a function with its own private notebook that only it can read and write.
```

---

## Session 12 — OOP (2.5)

```
Teach me CS61A section 2.5 Object-Oriented Programming. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.5-object-oriented-programming.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.5-object-oriented-programming/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Focus on how JS class syntax relates to the dispatch objects from 2.4: a class is a blueprint, an instance is a concrete object built from that blueprint. Before I attempt exercises, check my understanding of: constructor initialization, this binding (and why arrow functions in methods are dangerous), inheritance with extends and super, and why JS uses mixins instead of multiple inheritance. Use concrete analogies: a class hierarchy is like a species classification (Animal → Dog → Poodle), super is like "ask my parent how they do this," and mixins are like adding optional capabilities ( waterproof trait) without changing the family tree.
```

---

## Session 13 — Implementing Objects (2.6-2.7)

```
Teach me CS61A sections 2.6-2.7: Implementing Classes and Objects + Object Abstraction. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.6-implementing-classes-and-objects.md and knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.7-object-abstraction.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.6-implementing-classes-and-objects/practice.js and practice/cs61a-composing-programs/02-building-abstractions-with-data/2.7-object-abstraction/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Section 2.6 peels back the curtain: classes aren't magic — they're dispatch functions + closures. Before exercises, check that I can explain how makeClass creates instances and how "send" dispatches to methods with self binding. For 2.7, make sure I understand toString, Symbol.toPrimitive, and why type-tag dispatch lets us write generic functions that work across different representations. Use concrete analogies: dispatch is like a receptionist who routes your request to the right department, and type tags are like name badges that tell the system how to handle each object.
```

---

## Session 14 — Efficiency (2.8)

```
Teach me CS61A section 2.8 Efficiency. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.8-efficiency.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.8-efficiency/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section connects back to recursion from Chapter 1 and asks: how expensive is each call? Before I attempt exercises, check my understanding of: counting function calls as a proxy for time complexity, how memoization turns exponential fibonacci into linear by caching results, and the difference between O(n) linear exponentiation and O(log n) fast exponentiation via successive squaring. Use concrete analogies: memoization is like writing down answers in a notebook so you never solve the same subproblem twice, and successive squaring is like folding a piece of paper — each fold doubles the layers with just one action.
```

---

## Session 15 — Recursive Objects (2.9)

```
Teach me CS61A section 2.9 Recursive Objects. I've read knowledge/cs61a-composing-programs/02-building-abstractions-with-data/2.9-recursive-objects.md. Now let me work through practice/cs61a-composing-programs/02-building-abstractions-with-data/2.9-recursive-objects/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section brings together OOP (2.5), recursive data structures (2.3), and efficiency (2.8). Before I attempt exercises, check my understanding of: how a LinkedList node references another LinkedList node (the recursive structure), how Tree.fibTree(n) builds a tree by recursively computing left and right subtrees, and how BST uses ordering invariants to enable O(log n) search. Use concrete analogies: a linked list is like a train where each car knows about the next one, a tree is like a family tree where each person knows their children, and a BST is like the "guess my number" game — each guess eliminates half the possibilities.
```

---

## Session 16 — Ch2 Review

```
It's time to review all of Chapter 2. I've completed practice exercises for sections 2.1 through 2.9. Run through all solution files in practice/cs61a-composing-programs/02-building-abstractions-with-data/*/solutions.js and help me identify which concepts I should revisit. Ask me to explain the connections between data abstraction → sequences → mutation → OOP → efficiency. Don't just summarize — test my understanding with questions like: "If I change the pair implementation from closures to arrays, which functions break and why?" and "Why does memoizing fibonacci reduce calls from exponential to linear, but memoizing factorial barely helps?" Ask me to predict outputs before running code. Focus especially on the ideas that are new in Chapter 2 compared to Chapter 1: mutable state, this binding, dispatch dictionaries, and algorithmic complexity analysis.
```

---

## Session 17 — Programming Languages (3.1)

```
[Planned] Session 17 will introduce programming language interpreters (section 3.1). Prompt will reference knowledge file and practice exercises for 3.1.
```

---

## Session 18 — Functional Programming in JS (3.2)

```
[Planned] Session 18 will cover functional programming patterns in JS: closures, immutability, pure functions (section 3.2). Prompt will reference knowledge file and practice exercises for 3.2.
```

---

## Session 19 — Exceptions (3.3)

```
[Planned] Session 19 will cover exceptions, try/catch/finally, and custom errors (section 3.3). Prompt will reference knowledge file and practice exercises for 3.3.
```

---

## Session 20 — Calculator Interpreter (3.4)

```
[Planned] Session 20 will cover building a calculator interpreter with tokenizer and parser (section 3.4). Prompt will reference knowledge file and practice exercises for 3.4.
```

---

## Session 21 — JS Interpreter (3.5)

```
[Planned] Session 21 will cover building a full JS subset interpreter with eval/apply (section 3.5). Prompt will reference knowledge file and practice exercises for 3.5.
```

---

## Session 22 — Ch3 Review

```
[Planned] Session 22 will review all of Chapter 3, running through practice solutions and testing understanding of interpreters and language design.
```

---

## Session 23 — Implicit Sequences (4.2)

```
[Planned] Session 23 will cover iterators, generators, and lazy sequences (section 4.2). Prompt will reference knowledge file and practice exercises for 4.2.
```

---

## Session 24 — Declarative Programming / SQL (4.3)

```
[Planned] Session 24 will cover declarative programming and SQL (section 4.3). Prompt will reference knowledge file and practice exercises for 4.3.
```

---

## Session 25 — Logic Programming (4.4-4.5)

```
[Planned] Session 25 will cover logic programming and unification (sections 4.4-4.5). Prompt will reference knowledge file and practice exercises for 4.4-4.5.
```

---

## Session 26 — Distributed Computing (4.6-4.7)

```
[Planned] Session 26 will cover distributed computing and MapReduce (sections 4.6-4.7). Prompt will reference knowledge file and practice exercises for 4.6-4.7.
```

---

## Session 27 — Parallel Computing (4.8)

```
[Planned] Session 27 will cover parallel computing with worker threads (section 4.8). Prompt will reference knowledge file and practice exercises for 4.8.
```

---

## Session 28 — Ch4 Review

```
[Planned] Session 28 will review all of Chapter 4, running through practice solutions and testing understanding of data processing paradigms.
```

---

## Session 29 — Capstone

```
[Planned] Session 29 will be a full course capstone, synthesizing all concepts from Chapters 1-4 with comprehensive review exercises.
```
