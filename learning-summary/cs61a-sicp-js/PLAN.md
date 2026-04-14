# Learning Plan: CS61A SICP JavaScript Edition

## Overview

97 sessions covering the full Structure and Interpretation of Computer Programs (JavaScript Edition) at subsection granularity. Each session learns one subsection, then produces a YouTube-ready Reveal.js slide deck and teaching transcript.

---

## Prerequisites

- Basic JavaScript (variables, functions, conditionals, loops)
- A browser with developer console (Chrome, Firefox, Safari)
- Access to [Source Academy](https://sourceacademy.org/sicpjs/) for interactive examples
- The knowledge repo content at `knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/`

---

## Three-Agent Workflow

Each session follows the same workflow with three cooperating agents:

### Agent Roles

| Agent | Platform | Responsibilities |
|-------|----------|-----------------|
| **Orchestrator** | Cursor sidebar (main chat) | Provides session prompts, creates slides/transcripts from learning reports, tracks progress |
| **Teacher** | Claude Code terminal | Teaches the session interactively, asks checkpoint questions, gives quizzes |
| **TA** | Cursor sidebar (separate chat) | Monitors the terminal session, assists with quizzes via Socratic method, generates learning reports |

### Per-Session Flow

1. Orchestrator provides the session prompt (from `SESSION-PROMPTS.md`)
2. Student pastes the prompt into the Claude Code terminal
3. Student opens a TA chat (from `TA-SYSTEM-PROMPT.md`) and tells the TA which session is starting
4. Teacher teaches the session; student periodically attaches transcript snippets to the TA
5. TA monitors progress, assists when the student is stuck (guides, never answers directly)
6. When the session ends, TA generates `learning-report.md` in the chapter folder
7. Student returns to the orchestrator; the learning report is the primary input for creating slides and transcript

### Learning Report

The TA-generated learning report is the key artifact that bridges learning and teaching. It contains:
- Concepts covered and how well they were understood
- Checkpoint question and quiz performance
- Key insights in the student's own words
- Areas of confusion and how they were resolved
- Readiness assessment for the next session

The orchestrator uses this report to create accurate, experience-based slides and transcripts.

---

## Phase 0: Overview (Session 00)

### Session 00: Overview & Programming Philosophy

**Source files:**
- `knowledge/.../Foreword.md`
- `knowledge/.../Preface.md`
- `knowledge/.../Acknowledgments.md`
- `knowledge/.../Foreword to Structure and Interpretation of Computer Programs, 1984.md`
- `knowledge/.../Prefaces to Structure and Interpretation of Computer Programs, 19961984.md`
- [Source Academy SICP JS Preface](https://sourceacademy.org/sicpjs/prefaces03)

**Learning objectives:**
- Understand SICP's philosophy: programs are for people to read
- Know the three key ideas: abstraction, means of combination, means of abstraction
- Understand why JavaScript was chosen as the language for the JS edition
- Know the five chapters and what each covers at a high level
- Understand the Feynman method and how this learning path works

**Video output:** The global philosophy video -- sets the stage for everything that follows.

---

## Phase 1: Building Abstractions with Functions (Sessions 01-18)

### Session 01: 1.1.1 Expressions

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1  The Elements of Programming.md`
- `knowledge/.../1.1  The Elements of Programming/1.1.1  Expressions.md`
- [Source Academy 1.1.1](https://sourceacademy.org/sicpjs/1.1.1)

**Learning objectives:**
- Understand primitive expressions: numbers and strings
- Know operator combinations with infix notation
- Understand operator precedence and associativity
- Know what a REPL is and how evaluation works at the simplest level
- Practice evaluating expressions mentally

**Video output:** "Everything starts with an expression"

---

### Session 02: 1.1.2 Naming and the Environment

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.2  Naming and the Environment.md`
- [Source Academy 1.1.2](https://sourceacademy.org/sicpjs/1.1.2)

**Learning objectives:**
- Understand constant declarations: `const name = value;`
- Know what the environment is: a memory that stores name-value pairs
- Understand naming as the simplest form of abstraction
- Know how the interpreter looks up names in the environment
- Practice building up computations incrementally using names

**Video output:** "Names give us the power of abstraction"

---

### Session 03: 1.1.3 Evaluating Operator Combinations

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.3   Evaluating Operator Combinations.md`
- [Source Academy 1.1.3](https://sourceacademy.org/sicpjs/1.1.3)

**Learning objectives:**
- Understand the recursive evaluation rule for combinations
- Draw evaluation trees for nested expressions
- Know how special forms (like `const`) are exceptions to the general rule
- Understand tree accumulation as a general process
- Practice tracing evaluation step by step

**Video output:** "Expressions form trees; evaluation walks the tree"

---

### Session 04: 1.1.4 Compound Functions

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.4   Compound Functions.md`
- [Source Academy 1.1.4](https://sourceacademy.org/sicpjs/1.1.4)

**Learning objectives:**
- Understand function declarations and function expressions
- Know the difference between parameters and arguments
- Understand function application as substitution
- See how compound functions compose with each other
- Practice writing and applying simple functions

**Video output:** "Functions are the building blocks of abstraction"

---

### Session 05: 1.1.5 The Substitution Model

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.5   The Substitution Model for Function Application.md`
- [Source Academy 1.1.5](https://sourceacademy.org/sicpjs/1.1.5)

**Learning objectives:**
- Master the substitution model for function application
- Understand applicative order vs normal order evaluation
- Know why JavaScript uses applicative order
- Trace multi-step function applications by hand
- Understand the substitution model's limitations (what it can't explain)

**Video output:** "The substitution model: your mental debugger"

---

### Session 06: 1.1.6 Conditional Expressions and Predicates

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.6   Conditional Expressions and Predicates.md`
- [Source Academy 1.1.6](https://sourceacademy.org/sicpjs/1.1.6)

**Learning objectives:**
- Understand conditional expressions (ternary operator)
- Know what predicates are (functions returning boolean)
- Understand logical operators: `&&`, `||`, `!`
- Know how conditional evaluation differs from normal evaluation (short-circuit)
- Practice writing functions with conditional logic

**Video output:** "Conditionals give programs the power to decide"

---

### Session 07: 1.1.7 Example: Square Roots by Newton's Method

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.7  Example_ Square Roots by Newton's Method.md`
- [Source Academy 1.1.7](https://sourceacademy.org/sicpjs/1.1.7)

**Learning objectives:**
- Understand iterative improvement as a computational strategy
- Know the difference between declarative ("what") and imperative ("how") knowledge
- Trace Newton's method step by step using the substitution model
- See how decomposition breaks a problem into small, testable functions
- Understand the "good enough" pattern for convergence

**Video output:** "Mathematics declares; computation describes how"

---

### Session 08: 1.1.8 Functions as Black-Box Abstractions

**Source files:**
- `knowledge/.../1.1  The Elements of Programming/1.1.8   Functions as Black-Box Abstractions.md`
- [Source Academy 1.1.8](https://sourceacademy.org/sicpjs/1.1.8)

**Learning objectives:**
- Understand black-box abstraction: interface vs implementation
- Know what local names (bound variables) and scope are
- Understand block structure and internal declarations
- See how lexical scoping works
- Synthesize all of Section 1.1 into a coherent mental model

**Section 1.1 review:** Recap all elements of programming before moving to 1.2.

**Video output:** "Black boxes let us manage complexity"

---

### Session 09: 1.2.1 Linear Recursion and Iteration

**Source files:**
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2   Functions and the Processes They Generate.md`
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2.1  Linear Recursion and Iteration.md`
- [Source Academy 1.2.1](https://sourceacademy.org/sicpjs/1.2.1)

**Learning objectives:**
- Distinguish between a recursive function and a recursive process
- Understand linear recursive processes (deferred operations chain)
- Understand linear iterative processes (state variables carry the answer)
- Trace factorial both ways using the substitution model
- Know why iterative processes use constant space

**Video output:** "The shape of a process is not the shape of a function"

---

### Session 10: 1.2.2 Tree Recursion

**Source files:**
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2.2  Tree Recursion.md`
- [Source Academy 1.2.2](https://sourceacademy.org/sicpjs/1.2.2)

**Learning objectives:**
- Understand tree-recursive processes (branching computation)
- Trace Fibonacci tree recursion and see the redundant computation
- Know how to convert tree recursion to iteration when possible
- Understand the counting change example
- See when tree recursion is natural and appropriate

**Video output:** "Tree recursion: elegant but expensive"

---

### Session 11: 1.2.3 Orders of Growth

**Source files:**
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2.3  Orders of Growth.md`
- [Source Academy 1.2.3](https://sourceacademy.org/sicpjs/1.2.3)

**Learning objectives:**
- Understand big-Theta notation for time and space
- Classify processes by their growth rates
- Know common orders: constant, logarithmic, linear, quadratic, exponential
- Relate growth to the practical limits of computation
- Practice determining the order of growth for given processes

**Video output:** "How fast does the work grow as the input grows?"

---

### Session 12: 1.2.4 Exponentiation

**Source files:**
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2.4  Exponentiation.md`
- [Source Academy 1.2.4](https://sourceacademy.org/sicpjs/1.2.4)

**Learning objectives:**
- Understand successive squaring as a logarithmic algorithm
- Compare linear vs logarithmic exponentiation
- See how a clever mathematical insight transforms complexity
- Trace the fast exponentiation process
- Understand the invariant quantity technique

**Video output:** "From linear to logarithmic: the power of successive squaring"

---

### Session 13: 1.2.5 Greatest Common Divisors

**Source files:**
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2.5  Greatest Common Divisors.md`
- [Source Academy 1.2.5](https://sourceacademy.org/sicpjs/1.2.5)

**Learning objectives:**
- Understand Euclid's algorithm for GCD
- Trace the algorithm step by step
- Know Lame's theorem and the logarithmic growth of Euclid's algorithm
- See GCD as an example of an elegant iterative process
- Understand how ancient algorithms connect to modern computation

**Video output:** "Euclid's 2300-year-old algorithm still runs today"

---

### Session 14: 1.2.6 Example: Testing for Primality

**Source files:**
- `knowledge/.../1.2   Functions and the Processes They Generate/1.2.6  Example_ Testing for Primality.md`
- [Source Academy 1.2.6](https://sourceacademy.org/sicpjs/1.2.6)

**Learning objectives:**
- Understand the brute-force primality test (trial division)
- Know the Fermat test and probabilistic algorithms
- Understand the difference between deterministic and probabilistic methods
- See how randomness can make algorithms faster
- Synthesize all of Section 1.2: processes, growth, and algorithmic thinking

**Section 1.2 review:** Recap recursive/iterative processes, growth, and key algorithms.

**Video output:** "Algorithms: from brute force to probabilistic elegance"

---

### Session 15: 1.3.1 Functions as Arguments

**Source files:**
- `knowledge/.../1.3   Formulating Abstractions with Higher-Order Functions/1.3   Formulating Abstractions with Higher-Order Functions.md`
- `knowledge/.../1.3   Formulating Abstractions with Higher-Order Functions/1.3.1   Functions as Arguments.md`
- [Source Academy 1.3.1](https://sourceacademy.org/sicpjs/1.3.1)

**Learning objectives:**
- Understand higher-order functions: functions that take functions as arguments
- See the summation pattern and how it generalizes with a function argument
- Know why higher-order functions are a powerful abstraction mechanism
- Practice writing functions that accept function arguments
- Understand `sum`, `integral` as higher-order abstractions

**Video output:** "Pass behavior as data: functions as arguments"

---

### Session 16: 1.3.2 Constructing Functions using Lambda Expressions

**Source files:**
- `knowledge/.../1.3   Formulating Abstractions with Higher-Order Functions/1.3.2   Constructing Functions using Lambda Expressions.md`
- [Source Academy 1.3.2](https://sourceacademy.org/sicpjs/1.3.2)

**Learning objectives:**
- Understand lambda expressions (arrow functions in JS)
- Know when to use named functions vs lambda expressions
- Understand `let` and `const` as syntactic sugar for immediately applied lambdas
- See how lambda expressions enable concise higher-order programming
- Practice creating and using lambda expressions

**Video output:** "Lambda: functions without names"

---

### Session 17: 1.3.3 Functions as General Methods

**Source files:**
- `knowledge/.../1.3   Formulating Abstractions with Higher-Order Functions/1.3.3   Functions as General Methods.md`
- [Source Academy 1.3.3](https://sourceacademy.org/sicpjs/1.3.3)

**Learning objectives:**
- Understand half-interval method for finding roots
- Know fixed-point computation and its convergence
- See how general methods capture computational patterns
- Understand average damping as a convergence technique
- Practice implementing general methods as higher-order functions

**Video output:** "General methods: capture the pattern, not just the answer"

---

### Session 18: 1.3.4 Functions as Returned Values

**Source files:**
- `knowledge/.../1.3   Formulating Abstractions with Higher-Order Functions/1.3.4   Functions as Returned Values.md`
- [Source Academy 1.3.4](https://sourceacademy.org/sicpjs/1.3.4)

**Learning objectives:**
- Understand functions returning functions (function factories)
- Know Newton's method as a fixed-point of a transformation
- See how abstractions compose: average damping + fixed point + Newton's transform
- Understand first-class functions and their significance
- Synthesize all of Chapter 1: from expressions to higher-order abstractions

**Chapter 1 review:** Walk through the complete journey from primitive expressions to first-class functions. Ask: "If you had to teach Chapter 1 in one sentence, what would it be?"

**Video output:** "First-class functions: the ultimate abstraction power"

---

## Phase 2: Building Abstractions with Data (Sessions 19-36)

### Session 19: 2.1.1 Arithmetic Operations for Rational Numbers

**Source files:**
- `knowledge/.../2 Building Abstractions with Data/2  Building Abstractions with Data.md`
- `knowledge/.../2.1  Introduction to Data Abstraction/2.1  Introduction to Data Abstraction.md`
- `knowledge/.../2.1  Introduction to Data Abstraction/2.1.1   Example_ Arithmetic Operations for Rational Numbers.md`
- [Source Academy 2.1.1](https://sourceacademy.org/sicpjs/2.1.1)

**Learning objectives:**
- Understand data abstraction: separating use from representation
- Know how to construct and select parts of compound data (pairs)
- See how rational number arithmetic uses constructors and selectors
- Understand `pair`, `head`, `tail` as the fundamental data operations
- Practice building compound data from primitive parts

**Video output:** "Data abstraction: separate what from how"

---

### Session 20: 2.1.2 Abstraction Barriers

**Source files:**
- `knowledge/.../2.1  Introduction to Data Abstraction/2.1.2   Abstraction Barriers.md`
- [Source Academy 2.1.2](https://sourceacademy.org/sicpjs/2.1.2)

**Learning objectives:**
- Understand abstraction barriers as horizontal layers
- Know why violating barriers creates brittle code
- See how changing representation behind a barrier doesn't break clients
- Understand the discipline of programming to interfaces
- Connect abstraction barriers to real-world API design

**Video output:** "Abstraction barriers: walls that keep code clean"

---

### Session 21: 2.1.3 What Is Meant by Data?

**Source files:**
- `knowledge/.../2.1  Introduction to Data Abstraction/2.1.3   What Is Meant by Data_.md`
- [Source Academy 2.1.3](https://sourceacademy.org/sicpjs/2.1.3)

**Learning objectives:**
- Understand the deep question: what is data?
- See how pairs can be implemented using only functions (Church pairs)
- Know the condition-based definition of data (constructor + selector contracts)
- Understand that the boundary between data and functions is blurry
- Grasp the philosophical insight: procedures can serve as data

**Video output:** "Data is just functions wearing a different hat"

---

### Session 22: 2.1.4 Extended Exercise: Interval Arithmetic

**Source files:**
- `knowledge/.../2.1  Introduction to Data Abstraction/2.1.4   Extended Exercise_ Interval Arithmetic.md`
- [Source Academy 2.1.4](https://sourceacademy.org/sicpjs/2.1.4)

**Learning objectives:**
- Apply data abstraction to a new domain: interval arithmetic
- Practice designing constructors, selectors, and operations
- See the challenges of representing uncertainty in computation
- Understand multiple equivalent representations and their trade-offs
- Synthesize all of Section 2.1: data abstraction principles

**Section 2.1 review:** Recap data abstraction, barriers, and the nature of data.

**Video output:** "Interval arithmetic: data abstraction meets the real world"

---

### Session 23: 2.2.1 Representing Sequences

**Source files:**
- [Source Academy 2.2](https://sourceacademy.org/sicpjs/2.2)
- [Source Academy 2.2.1](https://sourceacademy.org/sicpjs/2.2.1)

**Learning objectives:**
- Understand lists as chains of pairs
- Know the `list` constructor and list operations
- Understand `map` as a higher-order list operation
- Practice list manipulation: append, length, nth element
- See how lists enable sequences of arbitrary length

**Video output:** "Lists: the universal sequence"

---

### Session 24: 2.2.2 Hierarchical Structures

**Source files:**
- [Source Academy 2.2.2](https://sourceacademy.org/sicpjs/2.2.2)

**Learning objectives:**
- Understand trees as hierarchical data structures built from pairs
- Know how to process trees recursively
- Practice counting leaves, mapping over trees
- See how tree recursion naturally matches tree data
- Understand the closure property of pairs (pairs of pairs)

**Video output:** "Trees: when flat lists aren't enough"

---

### Session 25: 2.2.3 Sequences as Conventional Interfaces

**Source files:**
- [Source Academy 2.2.3](https://sourceacademy.org/sicpjs/2.2.3)

**Learning objectives:**
- Understand the signal-flow metaphor for data processing
- Know the map-filter-accumulate pattern
- See how conventional interfaces standardize data processing
- Practice composing map, filter, and accumulate into pipelines
- Understand nested mappings and flatmap

**Video output:** "Map, filter, accumulate: the universal data pipeline"

---

### Session 26: 2.2.4 Example: A Picture Language

**Source files:**
- [Source Academy 2.2.4](https://sourceacademy.org/sicpjs/2.2.4)

**Learning objectives:**
- See a complete example of abstraction with higher-order functions and data
- Understand painters as functions (not data structures)
- Know how transformations compose: beside, below, flip, etc.
- See the closure property enabling recursive image construction
- Understand the stratified design methodology

**Section 2.2 review:** Recap sequences, trees, interfaces, and stratified design.

**Video output:** "The picture language: where data and functions dance"

---

### Session 27: 2.3.1 Strings

**Source files:**
- [Source Academy 2.3.1](https://sourceacademy.org/sicpjs/2.3.1)

**Learning objectives:**
- Understand strings as symbolic data in JavaScript
- Know string comparison and equality
- See how symbolic data differs from numeric data
- Understand the role of strings in symbolic computation
- Practice using strings as data labels and identifiers

**Video output:** "Strings: from numbers to symbols"

---

### Session 28: 2.3.2 Example: Symbolic Differentiation

**Source files:**
- [Source Academy 2.3.2](https://sourceacademy.org/sicpjs/2.3.2)

**Learning objectives:**
- See symbolic computation in action: differentiating algebraic expressions
- Understand expressions as tree data structures
- Know the differentiation rules as recursive data transformations
- Practice data-directed recursive processing
- See how abstraction barriers help: separate differentiation rules from representation

**Video output:** "Teaching a computer to do calculus"

---

### Session 29: 2.3.3 Example: Representing Sets

**Source files:**
- [Source Academy 2.3.3](https://sourceacademy.org/sicpjs/2.3.3)

**Learning objectives:**
- Understand sets as an abstract data type with multiple representations
- Know unordered lists, ordered lists, and binary trees as set representations
- Compare time complexity across representations
- See how the same interface hides different implementations
- Practice analyzing trade-offs between representations

**Video output:** "One interface, many implementations: the power of data abstraction"

---

### Session 30: 2.3.4 Example: Huffman Encoding Trees

**Source files:**
- [Source Academy 2.3.4](https://sourceacademy.org/sicpjs/2.3.4)

**Learning objectives:**
- Understand Huffman encoding as a real-world data structure application
- Know how variable-length prefix codes work
- See the Huffman tree construction algorithm
- Practice encoding and decoding with Huffman trees
- Synthesize all of Section 2.3: symbolic data and tree-based representations

**Section 2.3 review:** Recap symbolic data, differentiation, sets, and encoding trees.

**Video output:** "Huffman trees: when every bit counts"

---

### Session 31: 2.4.1 Representations for Complex Numbers

**Source files:**
- [Source Academy 2.4](https://sourceacademy.org/sicpjs/2.4)
- [Source Academy 2.4.1](https://sourceacademy.org/sicpjs/2.4.1)

**Learning objectives:**
- Understand the need for multiple representations of the same data
- Know rectangular vs polar representations of complex numbers
- See why a single representation is sometimes insufficient
- Understand the problem: how do independently designed representations coexist?

**Video output:** "The same data, two different views"

---

### Session 32: 2.4.2 Tagged Data

**Source files:**
- [Source Academy 2.4.2](https://sourceacademy.org/sicpjs/2.4.2)

**Learning objectives:**
- Understand type tags as a way to distinguish representations
- Know how tagged data enables runtime dispatch
- See the pattern: attach a tag, dispatch on the tag
- Understand the limitations: modifying dispatch for every new type

**Video output:** "Tagged data: runtime type identification"

---

### Session 33: 2.4.3 Data-Directed Programming and Additivity

**Source files:**
- [Source Academy 2.4.3](https://sourceacademy.org/sicpjs/2.4.3)

**Learning objectives:**
- Understand data-directed programming: dispatch tables
- Know how message passing achieves the same goal differently
- See why additivity matters: adding types without changing existing code
- Compare explicit dispatch, data-directed, and message-passing styles
- Synthesize all of Section 2.4: multiple representations and dispatch strategies

**Section 2.4 review:** Recap tagged data, data-directed programming, and message passing.

**Video output:** "Data-directed programming: the open-closed principle"

---

### Session 34: 2.5.1 Generic Arithmetic Operations

**Source files:**
- [Source Academy 2.5](https://sourceacademy.org/sicpjs/2.5)
- [Source Academy 2.5.1](https://sourceacademy.org/sicpjs/2.5.1)

**Learning objectives:**
- Understand generic operations that work across multiple data types
- Know how to build a generic arithmetic system
- See the operation-type table and how dispatch works
- Understand packages for installing operations on types
- Practice designing generic interfaces

**Video output:** "Generic operations: one interface, many types"

---

### Session 35: 2.5.2 Combining Data of Different Types

**Source files:**
- [Source Academy 2.5.2](https://sourceacademy.org/sicpjs/2.5.2)

**Learning objectives:**
- Understand coercion: converting between types for cross-type operations
- Know the tower of types pattern (integer -> rational -> real -> complex)
- See the trade-offs of coercion vs explicit cross-type operations
- Understand the challenges of designing type hierarchies

**Video output:** "Type coercion: making different types work together"

---

### Session 36: 2.5.3 Example: Symbolic Algebra

**Source files:**
- [Source Academy 2.5.3](https://sourceacademy.org/sicpjs/2.5.3)

**Learning objectives:**
- See a complete generic system: polynomial arithmetic
- Understand polynomial representation and operations
- Know how generic operations and data-directed programming combine at scale
- See the power and complexity of a real generic system
- Synthesize all of Chapter 2: from pairs to generic systems

**Chapter 2 review:** Walk through the complete journey from simple pairs to generic operations. Ask: "How does data abstraction manage complexity?"

**Video output:** "Symbolic algebra: the capstone of data abstraction"

---

## Phase 3: Modularity, Objects, and State (Sessions 37-56)

### Session 37: 3.1.1 Local State Variables

**Source files:**
- [Source Academy 3.1](https://sourceacademy.org/sicpjs/3.1)
- [Source Academy 3.1.1](https://sourceacademy.org/sicpjs/3.1.1)

**Learning objectives:**
- Understand why assignment is introduced (modeling objects with changing state)
- Know the `let` declaration and assignment with `=`
- See how local state variables model real-world objects (bank accounts)
- Understand that assignment breaks the substitution model
- Grasp the fundamental shift: from functional to imperative

**Video output:** "Assignment: the beginning of state"

---

### Session 38: 3.1.2 The Benefits of Introducing Assignment

**Source files:**
- [Source Academy 3.1.2](https://sourceacademy.org/sicpjs/3.1.2)

**Learning objectives:**
- See how assignment enables modular random number generators
- Understand Monte Carlo simulation as a motivating example
- Know why local state makes certain programs more modular
- See the encapsulation pattern: hiding state behind an interface

**Video output:** "Why assignment makes some programs better"

---

### Session 39: 3.1.3 The Costs of Introducing Assignment

**Source files:**
- [Source Academy 3.1.3](https://sourceacademy.org/sicpjs/3.1.3)

**Learning objectives:**
- Understand referential transparency and how assignment destroys it
- Know the "sameness and change" problem (identity vs equality)
- See how assignment complicates reasoning about programs
- Understand the imperative programming pitfalls
- Synthesize Section 3.1: the trade-off between modularity and simplicity

**Section 3.1 review:** Recap the costs and benefits of introducing state.

**Video output:** "The cost of state: when equals doesn't mean equal"

---

### Session 40: 3.2.1 The Rules for Evaluation

**Source files:**
- [Source Academy 3.2](https://sourceacademy.org/sicpjs/3.2)
- [Source Academy 3.2.1](https://sourceacademy.org/sicpjs/3.2.1)

**Learning objectives:**
- Understand why the substitution model fails with assignment
- Know the environment model: frames, bindings, and enclosing environments
- Understand the rules for evaluating expressions in the environment model
- See how function application creates new frames
- Draw environment diagrams step by step

**Video output:** "The environment model: replacing substitution"

---

### Session 41: 3.2.2 Applying Simple Functions

**Source files:**
- [Source Academy 3.2.2](https://sourceacademy.org/sicpjs/3.2.2)

**Learning objectives:**
- Trace function application in the environment model
- Draw environment diagrams for simple function calls
- Understand frame creation and variable binding
- See how the environment model explains name resolution
- Practice drawing diagrams for multi-step evaluations

**Video output:** "Drawing the environment: frames in action"

---

### Session 42: 3.2.3 Frames as the Repository of Local State

**Source files:**
- [Source Academy 3.2.3](https://sourceacademy.org/sicpjs/3.2.3)

**Learning objectives:**
- See how frames explain local state (the bank account example)
- Understand how assignment modifies bindings in frames
- Know how closures capture their enclosing environment
- Trace stateful programs using environment diagrams
- See why different calls to the same function create independent state

**Video output:** "Closures and state: the environment model explains it all"

---

### Session 43: 3.2.4 Internal Declarations

**Source files:**
- [Source Academy 3.2.4](https://sourceacademy.org/sicpjs/3.2.4)

**Learning objectives:**
- Understand how internal declarations work in the environment model
- Know the scoping rules for block-structured programs
- See simultaneous scope and sequential declaration
- Understand the subtleties of declaration order

**Video output:** "Internal declarations: scope in the environment model"

---

### Session 44: 3.2.5 CSE Machine

**Source files:**
- [Source Academy 3.2.5](https://sourceacademy.org/sicpjs/3.2.5)

**Learning objectives:**
- Understand the CSE (Control, Stash, Environment) machine
- Know how CSE provides a mechanical evaluation model
- See how the CSE machine handles all JavaScript constructs
- Compare CSE machine to the substitution model and environment model
- Synthesize Section 3.2: the complete evaluation framework

**Section 3.2 review:** Recap all three models: substitution, environment, CSE machine.

**Video output:** "The CSE machine: a complete mechanical evaluator"

---

### Session 45: 3.3.1 Mutable List Structure

**Source files:**
- [Source Academy 3.3](https://sourceacademy.org/sicpjs/3.3)
- [Source Academy 3.3.1](https://sourceacademy.org/sicpjs/3.3.1)

**Learning objectives:**
- Understand `set_head` and `set_tail` as mutation operations
- Know how mutation enables sharing and circular structures
- See the difference between mutation and construction
- Draw box-and-pointer diagrams for mutable structures
- Understand the dangers of aliasing

**Video output:** "Mutable pairs: sharing, aliasing, and danger"

---

### Session 46: 3.3.2 Representing Queues

**Source files:**
- [Source Academy 3.3.2](https://sourceacademy.org/sicpjs/3.3.2)

**Learning objectives:**
- Understand queues as a FIFO data structure
- Know how front and rear pointers enable efficient queue operations
- See how mutation makes queues practical (O(1) enqueue)
- Practice implementing queue operations with mutable pairs

**Video output:** "Queues: mutation makes data structures practical"

---

### Session 47: 3.3.3 Representing Tables

**Source files:**
- [Source Academy 3.3.3](https://sourceacademy.org/sicpjs/3.3.3)

**Learning objectives:**
- Understand one-dimensional and two-dimensional tables
- Know how association lists (alists) store key-value pairs
- See how tables enable the operation-type dispatch from Chapter 2
- Practice implementing table operations with mutable lists

**Video output:** "Tables: the dictionary data structure"

---

### Session 48: 3.3.4 A Simulator for Digital Circuits

**Source files:**
- [Source Academy 3.3.4](https://sourceacademy.org/sicpjs/3.3.4)

**Learning objectives:**
- See a complete example of modeling with mutable data
- Understand wires, gates, and signal propagation
- Know the event-driven simulation pattern (agenda-based)
- See how local state models real-world interactive systems
- Practice building and simulating simple circuits

**Video output:** "Digital circuits: simulating the real world with state"

---

### Session 49: 3.3.5 Propagation of Constraints

**Source files:**
- [Source Academy 3.3.5](https://sourceacademy.org/sicpjs/3.3.5)

**Learning objectives:**
- Understand constraint networks as a declarative programming paradigm
- Know how constraints propagate values bidirectionally
- See connectors, constraints, and probes as building blocks
- Understand how constraint propagation differs from one-way computation
- Synthesize Section 3.3: mutable data enables powerful modeling paradigms

**Section 3.3 review:** Recap mutable structures, queues, tables, circuits, and constraints.

**Video output:** "Constraint propagation: computation flows both ways"

---

### Session 50: 3.4.1 The Nature of Time in Concurrent Systems

**Source files:**
- [Source Academy 3.4](https://sourceacademy.org/sicpjs/3.4)
- [Source Academy 3.4.1](https://sourceacademy.org/sicpjs/3.4.1)

**Learning objectives:**
- Understand why concurrency introduces new problems
- Know the concept of interleaving and race conditions
- See how shared state + concurrency = bugs
- Understand the joint bank account example
- Grasp the fundamental problem: ordering of events

**Video output:** "Concurrency: when time becomes the enemy"

---

### Session 51: 3.4.2 Mechanisms for Controlling Concurrency

**Source files:**
- [Source Academy 3.4.2](https://sourceacademy.org/sicpjs/3.4.2)

**Learning objectives:**
- Understand serialization as a concurrency control mechanism
- Know how serializers protect shared state
- See the deadlock problem and its solutions
- Understand the trade-off between correctness and performance
- Synthesize Section 3.4: concurrency, time, and coordination

**Section 3.4 review:** Recap concurrency challenges and control mechanisms.

**Video output:** "Serialization: taming concurrent access"

---

### Session 52: 3.5.1 Streams Are Delayed Lists

**Source files:**
- [Source Academy 3.5](https://sourceacademy.org/sicpjs/3.5)
- [Source Academy 3.5.1](https://sourceacademy.org/sicpjs/3.5.1)

**Learning objectives:**
- Understand streams as lazily-evaluated sequences
- Know `stream_tail` uses delayed evaluation (thunks)
- See how streams avoid computing elements until needed
- Understand the key idea: separate the apparent structure from actual computation
- Practice creating and consuming simple streams

**Video output:** "Streams: sequences that compute on demand"

---

### Session 53: 3.5.2 Infinite Streams

**Source files:**
- [Source Academy 3.5.2](https://sourceacademy.org/sicpjs/3.5.2)

**Learning objectives:**
- Understand infinite streams: sequences with no end
- See streams of integers, Fibonacci numbers, primes
- Know how to define streams implicitly (self-referential definitions)
- Practice building and querying infinite streams
- Understand the Sieve of Eratosthenes as a stream

**Video output:** "Infinite streams: computing forever, one element at a time"

---

### Session 54: 3.5.3 Exploiting the Stream Paradigm

**Source files:**
- [Source Academy 3.5.3](https://sourceacademy.org/sicpjs/3.5.3)

**Learning objectives:**
- See stream formulations of iterative processes (sqrt, pi)
- Understand sequence accelerators (Euler's transform)
- Know streams as signals in a signal-processing framework
- Practice using streams for numerical computation

**Video output:** "Streams as signals: a new way to think about iteration"

---

### Session 55: 3.5.4 Streams and Delayed Evaluation

**Source files:**
- [Source Academy 3.5.4](https://sourceacademy.org/sicpjs/3.5.4)

**Learning objectives:**
- Understand the subtleties of delayed evaluation in streams
- See how normal-order evaluation relates to streams
- Know the limitations of streams in an applicative-order language
- Understand the integral example and its circular dependency

**Video output:** "Delayed evaluation: the engine behind streams"

---

### Session 56: 3.5.5 Modularity of Functional Programs and Modularity of Objects

**Source files:**
- [Source Academy 3.5.5](https://sourceacademy.org/sicpjs/3.5.5)

**Learning objectives:**
- Compare functional (stream) vs object (state) approaches to modularity
- See how streams avoid assignment while modeling change
- Understand the fundamental tension: functional vs imperative
- Know when to use each paradigm
- Synthesize all of Chapter 3: state, environments, mutation, concurrency, and streams

**Chapter 3 review:** Walk through the complete journey from assignment to streams. Ask: "What is the fundamental tension between state and functional programming?"

**Video output:** "Two worldviews: objects with state vs streams without"

---

## Phase 4: Metalinguistic Abstraction (Sessions 57-73)

### Session 57: 4.1.1 The Core of the Evaluator

**Source files:**
- [Source Academy 4.1](https://sourceacademy.org/sicpjs/4.1)
- [Source Academy 4.1.1](https://sourceacademy.org/sicpjs/4.1.1)

**Learning objectives:**
- Understand the metacircular evaluator: an interpreter written in the language it interprets
- Know the evaluate-apply cycle as the core of any interpreter
- See how `evaluate` dispatches on expression type
- Understand how `apply` handles function application
- Grasp the profound insight: the evaluator defines the language

**Video output:** "The metacircular evaluator: JavaScript interpreting itself"

---

### Session 58: 4.1.2 Representing Components

**Source files:**
- [Source Academy 4.1.2](https://sourceacademy.org/sicpjs/4.1.2)

**Learning objectives:**
- Understand how syntax is represented as data structures (tagged lists)
- Know the accessor functions for each expression type
- See how the evaluator is syntax-independent through abstraction
- Practice defining new expression types

**Video output:** "Representing syntax: programs as data structures"

---

### Session 59: 4.1.3 Evaluator Data Structures

**Source files:**
- [Source Academy 4.1.3](https://sourceacademy.org/sicpjs/4.1.3)

**Learning objectives:**
- Understand the evaluator's environment representation
- Know how frames and bindings are implemented
- See how function objects carry their environment
- Understand true/false values in the evaluator

**Video output:** "Evaluator internals: environments as data"

---

### Session 60: 4.1.4 Running the Evaluator as a Program

**Source files:**
- [Source Academy 4.1.4](https://sourceacademy.org/sicpjs/4.1.4)

**Learning objectives:**
- See the complete evaluator running as a program
- Know how to set up the global environment with primitive operations
- Understand the driver loop (REPL for the interpreted language)
- Practice running programs through the metacircular evaluator

**Video output:** "Running the evaluator: a language inside a language"

---

### Session 61: 4.1.5 Data as Programs

**Source files:**
- [Source Academy 4.1.5](https://sourceacademy.org/sicpjs/4.1.5)

**Learning objectives:**
- Understand the deep idea: programs are data that can be manipulated
- Know how `evaluate` is itself a universal machine
- See the connection to Turing's universal machine concept
- Understand the halting problem and limits of computation

**Video output:** "Programs are data: the universal machine"

---

### Session 62: 4.1.6 Internal Declarations

**Source files:**
- [Source Academy 4.1.6](https://sourceacademy.org/sicpjs/4.1.6)

**Learning objectives:**
- Understand how the evaluator handles internal declarations
- Know simultaneous scope for block-scoped declarations
- See scanning out declarations and its implementation
- Understand the subtleties of declaration order in blocks

**Video output:** "Internal declarations in the evaluator"

---

### Session 63: 4.1.7 Separating Syntactic Analysis from Execution

**Source files:**
- [Source Academy 4.1.7](https://sourceacademy.org/sicpjs/4.1.7)

**Learning objectives:**
- Understand why analyzing syntax at each evaluation is wasteful
- Know how to separate analysis (compile-time) from execution (runtime)
- See the analyzing evaluator as a simple compiler
- Compare analyzed vs non-analyzed evaluation performance
- Synthesize Section 4.1: the complete metacircular evaluator

**Section 4.1 review:** Recap the evaluator: evaluate, apply, representations, analysis.

**Video output:** "The analyzing evaluator: a step toward compilation"

---

### Session 64: 4.2.1 Normal Order and Applicative Order

**Source files:**
- [Source Academy 4.2](https://sourceacademy.org/sicpjs/4.2)
- [Source Academy 4.2.1](https://sourceacademy.org/sicpjs/4.2.1)

**Learning objectives:**
- Revisit normal order vs applicative order from Chapter 1
- Understand lazy evaluation as a language design choice
- Know when lazy evaluation changes program behavior
- See examples where evaluation order matters

**Video output:** "Lazy evaluation: don't compute until you must"

---

### Session 65: 4.2.2 An Interpreter with Lazy Evaluation

**Source files:**
- [Source Academy 4.2.2](https://sourceacademy.org/sicpjs/4.2.2)

**Learning objectives:**
- Understand thunks: delayed evaluation objects
- Know the modifications to the evaluator for lazy evaluation
- See memoized vs non-memoized thunks
- Understand forcing: evaluating a thunk when its value is needed
- Practice tracing lazy evaluation step by step

**Video output:** "Thunks and forcing: implementing laziness"

---

### Session 66: 4.2.3 Streams as Lazy Lists

**Source files:**
- [Source Academy 4.2.3](https://sourceacademy.org/sicpjs/4.2.3)

**Learning objectives:**
- See how lazy evaluation makes streams and lists the same thing
- Understand that lazy evaluation eliminates the need for special stream operations
- Know the elegance of a lazy language: streams become ordinary lists
- Synthesize Section 4.2: lazy evaluation and its consequences

**Section 4.2 review:** Recap lazy evaluation, thunks, and streams-as-lists.

**Video output:** "In a lazy world, streams are just lists"

---

### Session 67: 4.3.1 Search and amb

**Source files:**
- [Source Academy 4.3](https://sourceacademy.org/sicpjs/4.3)
- [Source Academy 4.3.1](https://sourceacademy.org/sicpjs/4.3.1)

**Learning objectives:**
- Understand nondeterministic computing: programs that explore multiple paths
- Know the `amb` operator: choose a value from alternatives
- See automatic backtracking search
- Understand `require` as a constraint filter
- Practice writing nondeterministic programs

**Video output:** "amb: the choose-and-backtrack operator"

---

### Session 68: 4.3.2 Examples of Nondeterministic Programs

**Source files:**
- [Source Academy 4.3.2](https://sourceacademy.org/sicpjs/4.3.2)

**Learning objectives:**
- See nondeterministic solutions to logic puzzles
- Understand parsing natural language with amb
- Practice formulating problems as nondeterministic search
- Know when nondeterministic programming is natural

**Video output:** "Nondeterministic programs: let the computer search for you"

---

### Session 69: 4.3.3 Implementing the amb Evaluator

**Source files:**
- [Source Academy 4.3.3](https://sourceacademy.org/sicpjs/4.3.3)

**Learning objectives:**
- Understand how continuation-passing enables backtracking
- Know the success and failure continuations pattern
- See how the amb evaluator modifies the metacircular evaluator
- Understand the implementation of automatic search
- Synthesize Section 4.3: nondeterminism and search

**Section 4.3 review:** Recap amb, backtracking, and continuation-based search.

**Video output:** "Continuations: the machinery behind backtracking"

---

### Session 70: 4.4.1 Deductive Information Retrieval

**Source files:**
- [Source Academy 4.4](https://sourceacademy.org/sicpjs/4.4)
- [Source Academy 4.4.1](https://sourceacademy.org/sicpjs/4.4.1)

**Learning objectives:**
- Understand logic programming as a different paradigm
- Know how queries match against a database of facts
- See compound queries: and, or, not, with filters
- Understand rules as logical implications
- Practice writing queries and rules

**Video output:** "Logic programming: ask questions, get answers"

---

### Session 71: 4.4.2 How the Query System Works

**Source files:**
- [Source Academy 4.4.2](https://sourceacademy.org/sicpjs/4.4.2)

**Learning objectives:**
- Understand pattern matching and unification
- Know how the query system processes simple and compound queries
- See how rules are applied through unification
- Understand the frame-stream model of query evaluation

**Video output:** "Unification: the engine of logic programming"

---

### Session 72: 4.4.3 Is Logic Programming Mathematical Logic?

**Source files:**
- [Source Academy 4.4.3](https://sourceacademy.org/sicpjs/4.4.3)

**Learning objectives:**
- Understand the differences between logic programming and mathematical logic
- Know the limitations: infinite loops, negation problems
- See why `not` in logic programming differs from mathematical negation
- Understand the closed-world assumption

**Video output:** "Logic programming is not quite mathematical logic"

---

### Session 73: 4.4.4 Implementing the Query System

**Source files:**
- [Source Academy 4.4.4](https://sourceacademy.org/sicpjs/4.4.4)

**Learning objectives:**
- Understand the complete query system implementation
- Know the driver loop, pattern matcher, and unifier
- See how rules and queries compose
- Synthesize all of Chapter 4: from metacircular evaluator to logic programming

**Chapter 4 review:** Walk through all four language variations. Ask: "What does it mean to define a language by writing its evaluator?"

**Video output:** "The query system: a complete logic programming implementation"

---

## Phase 5: Computing with Register Machines (Sessions 74-95)

### Session 74: 5.1.1 A Language for Describing Register Machines

**Source files:**
- [Source Academy 5.1](https://sourceacademy.org/sicpjs/5.1)
- [Source Academy 5.1.1](https://sourceacademy.org/sicpjs/5.1.1)

**Learning objectives:**
- Understand register machines as a model of hardware execution
- Know the register machine language: assign, test, branch, goto
- See how data paths and controllers describe machine behavior
- Draw register machine diagrams
- Practice describing simple computations as register machines

**Video output:** "Register machines: bridging software and hardware"

---

### Session 75: 5.1.2 Abstraction in Machine Design

**Source files:**
- [Source Academy 5.1.2](https://sourceacademy.org/sicpjs/5.1.2)

**Learning objectives:**
- Understand how subroutine abstraction works in register machines
- See how to build complex machines from simpler components
- Know the GCD machine and its register allocation
- Practice designing register machines for simple algorithms

**Video output:** "Machine abstraction: building complex from simple"

---

### Session 76: 5.1.3 Subroutines

**Source files:**
- [Source Academy 5.1.3](https://sourceacademy.org/sicpjs/5.1.3)

**Learning objectives:**
- Understand subroutines in register machines (reusable instruction sequences)
- Know how the `continue` register enables return from subroutines
- See the limitation: subroutines cannot call themselves without a stack

**Video output:** "Subroutines: reusable machine components"

---

### Session 77: 5.1.4 Using a Stack to Implement Recursion

**Source files:**
- [Source Academy 5.1.4](https://sourceacademy.org/sicpjs/5.1.4)

**Learning objectives:**
- Understand why recursion requires a stack
- See how save/restore operations manage the stack
- Trace recursive factorial and Fibonacci on a register machine
- Know how the stack enables arbitrary recursive depth
- Understand the connection between stack depth and process type (recursive vs iterative)

**Video output:** "The stack: enabling recursion in hardware"

---

### Session 78: 5.1.5 Instruction Summary

**Source files:**
- [Source Academy 5.1.5](https://sourceacademy.org/sicpjs/5.1.5)

**Learning objectives:**
- Know all register machine instructions and their syntax
- Understand the complete instruction set as a summary
- See the register machine language as a complete computational model
- Synthesize Section 5.1: designing register machines

**Section 5.1 review:** Recap register machine language, abstraction, subroutines, and stacks.

**Video output:** "The complete register machine instruction set"

---

### Session 79: 5.2.1 The Machine Model

**Source files:**
- [Source Academy 5.2](https://sourceacademy.org/sicpjs/5.2)
- [Source Academy 5.2.1](https://sourceacademy.org/sicpjs/5.2.1)

**Learning objectives:**
- Understand the register machine simulator architecture
- Know how registers, operations, and the instruction sequence are represented
- See the `make_machine` constructor and its components
- Practice running simple machines in the simulator

**Video output:** "The machine model: simulating hardware in software"

---

### Session 80: 5.2.2 The Assembler

**Source files:**
- [Source Academy 5.2.2](https://sourceacademy.org/sicpjs/5.2.2)

**Learning objectives:**
- Understand the assembler: converting instruction text to executable procedures
- Know how labels are resolved to instruction positions
- See the two-pass assembly process
- Understand the connection between assembly and compilation

**Video output:** "The assembler: from text to executable instructions"

---

### Session 81: 5.2.3 Instructions and Their Execution Functions

**Source files:**
- [Source Academy 5.2.3](https://sourceacademy.org/sicpjs/5.2.3)

**Learning objectives:**
- Understand how each instruction type is implemented as a function
- Know the execution functions for assign, test, branch, goto, save, restore
- See how the program counter advances through instruction execution
- Practice tracing machine execution step by step

**Video output:** "Execution functions: the semantics of each instruction"

---

### Session 82: 5.2.4 Monitoring Machine Performance

**Source files:**
- [Source Academy 5.2.4](https://sourceacademy.org/sicpjs/5.2.4)

**Learning objectives:**
- Understand how to instrument register machines for performance monitoring
- Know how to count instructions and stack depth
- See the connection between monitoring and algorithmic analysis
- Synthesize Section 5.2: a complete register machine simulator

**Section 5.2 review:** Recap the simulator: machine model, assembler, execution, monitoring.

**Video output:** "Monitoring machines: measuring computational cost"

---

### Session 83: 5.3.1 Memory as Vectors

**Source files:**
- [Source Academy 5.3](https://sourceacademy.org/sicpjs/5.3)
- [Source Academy 5.3.1](https://sourceacademy.org/sicpjs/5.3.1)

**Learning objectives:**
- Understand how list structure is represented in memory as vectors
- Know the vector implementation of pairs, car, cdr, cons
- See how tagged pointers distinguish types
- Understand the free-list allocation scheme

**Video output:** "Memory as vectors: how pairs live in hardware"

---

### Session 84: 5.3.2 Maintaining the Illusion of Infinite Memory

**Source files:**
- [Source Academy 5.3.2](https://sourceacademy.org/sicpjs/5.3.2)

**Learning objectives:**
- Understand garbage collection: reclaiming unused memory
- Know the stop-and-copy garbage collection algorithm
- See how the root set determines what is reachable
- Understand the illusion of infinite memory through recycling
- Synthesize Section 5.3: memory management from allocation to collection

**Section 5.3 review:** Recap memory representation and garbage collection.

**Video output:** "Garbage collection: the illusion of infinite memory"

---

### Session 85: 5.4.1 The Dispatcher and Basic Evaluation

**Source files:**
- [Source Academy 5.4](https://sourceacademy.org/sicpjs/5.4)
- [Source Academy 5.4.1](https://sourceacademy.org/sicpjs/5.4.1)

**Learning objectives:**
- Understand the explicit-control evaluator as a register machine
- See the Chapter 4 evaluator translated to register machine code
- Know the eval-dispatch cycle in register machine form
- Understand how expression types are dispatched

**Video output:** "The explicit-control evaluator: metacircular meets register machine"

---

### Session 86: 5.4.2 Evaluating Function Applications

**Source files:**
- [Source Academy 5.4.2](https://sourceacademy.org/sicpjs/5.4.2)

**Learning objectives:**
- Understand how function application works in the register machine evaluator
- Know how arguments are evaluated and the function is applied
- See tail recursion in the explicit-control evaluator
- Understand why tail calls don't grow the stack

**Video output:** "Function application: the register machine way"

---

### Session 87: 5.4.3 Blocks, Assignments, and Declarations

**Source files:**
- [Source Academy 5.4.3](https://sourceacademy.org/sicpjs/5.4.3)

**Learning objectives:**
- See how blocks, assignments, and declarations are handled
- Know the register machine code for each construct
- Understand environment extension for blocks

**Video output:** "Blocks and declarations in the register machine"

---

### Session 88: 5.4.4 Running the Evaluator

**Source files:**
- [Source Academy 5.4.4](https://sourceacademy.org/sicpjs/5.4.4)

**Learning objectives:**
- Run the explicit-control evaluator on the register machine simulator
- Monitor its performance: instruction count and stack depth
- Compare performance to the metacircular evaluator
- Synthesize Section 5.4: a complete hardware-level evaluator

**Section 5.4 review:** Recap the explicit-control evaluator and its performance.

**Video output:** "The complete hardware-level JavaScript evaluator"

---

### Session 89: 5.5.1 Structure of the Compiler

**Source files:**
- [Source Academy 5.5](https://sourceacademy.org/sicpjs/5.5)
- [Source Academy 5.5.1](https://sourceacademy.org/sicpjs/5.5.1)

**Learning objectives:**
- Understand the difference between interpretation and compilation
- Know the compiler's structure: recursive descent over expression types
- See how the compiler generates register machine instructions
- Understand target and linkage descriptors

**Video output:** "From interpreter to compiler: the final step"

---

### Session 90: 5.5.2 Compiling Components

**Source files:**
- [Source Academy 5.5.2](https://sourceacademy.org/sicpjs/5.5.2)

**Learning objectives:**
- See how each expression type is compiled to instructions
- Know the compilation of literals, names, assignments, declarations
- Understand conditional compilation
- Practice reading compiled code

**Video output:** "Compiling expressions: from source to machine"

---

### Session 91: 5.5.3 Applications and Return Statements

**Source files:**
- [Source Academy 5.5.3](https://sourceacademy.org/sicpjs/5.5.3)

**Learning objectives:**
- Understand how function applications are compiled
- Know the calling convention: arguments, function, application
- See how return statements are compiled
- Understand tail-call optimization in the compiler

**Video output:** "Compiling function calls and returns"

---

### Session 92: 5.5.4 Combining Instruction Sequences

**Source files:**
- [Source Academy 5.5.4](https://sourceacademy.org/sicpjs/5.5.4)

**Learning objectives:**
- Understand how instruction sequences are combined
- Know the preserving mechanism for register saving
- See how the compiler avoids unnecessary saves/restores
- Understand instruction sequence metadata (needed, modified registers)

**Video output:** "Combining instructions: smart register preservation"

---

### Session 93: 5.5.5 An Example of Compiled Code

**Source files:**
- [Source Academy 5.5.5](https://sourceacademy.org/sicpjs/5.5.5)

**Learning objectives:**
- Trace the compilation of a complete program (factorial)
- See the full compiled output and understand each instruction
- Compare compiled code to interpreted execution
- Understand the performance advantages of compilation

**Video output:** "Compiled factorial: reading the output of a compiler"

---

### Session 94: 5.5.6 Lexical Addressing

**Source files:**
- [Source Academy 5.5.6](https://sourceacademy.org/sicpjs/5.5.6)

**Learning objectives:**
- Understand lexical addressing: compile-time resolution of variable locations
- Know how lexical addresses replace runtime environment lookups
- See the performance benefit of knowing variable locations at compile time
- Understand the connection to real-world compiler optimizations

**Video output:** "Lexical addressing: finding variables at compile time"

---

### Session 95: 5.5.7 Interfacing Compiled Code to the Evaluator

**Source files:**
- [Source Academy 5.5.7](https://sourceacademy.org/sicpjs/5.5.7)

**Learning objectives:**
- Understand how compiled code and interpreted code can interoperate
- Know how the evaluator can run compiled code
- See the entry point for compiled programs in the register machine
- Synthesize all of Chapter 5: from register machines through compilation

**Chapter 5 review:** Walk through the complete journey from hardware abstraction to compilation. Ask: "How does a program go from source text to machine execution?"

**Video output:** "The complete pipeline: source to machine code"

---

## Final Capstone (Session 96)

### Session 96: Full Book Capstone

**Source files:**
- All chapter materials for cross-reference
- [Source Academy full book](https://sourceacademy.org/sicpjs/)

**Learning objectives:**
- Trace the arc of the entire book: abstraction at every level
- Connect the five chapters into one unified story
- Identify the recurring themes: abstraction, representation, metalinguistic power
- If you had to rebuild all five chapters' key programs from scratch, what order and why?
- What is the minimum knowledge from each chapter that a working programmer must know?

**Final exam:**
Give a comprehensive 15-question exam covering all five chapters:
- 4 questions on Chapter 1 (functions, processes, higher-order abstractions)
- 3 questions on Chapter 2 (data abstraction, generic operations)
- 3 questions on Chapter 3 (state, environments, streams)
- 3 questions on Chapter 4 (evaluators, lazy, nondeterministic, logic)
- 2 questions on Chapter 5 (register machines, compilation)

**Career advice:**
After the exam, give practical advice:
- How does SICP knowledge translate to real-world software engineering?
- What domain would you recommend for applying these ideas?
- What should I build next to practice?

**Video output:** "The complete SICP journey -- from expressions to compilers"

---

## After Completion

By the end you should be able to:

1. Evaluate any JavaScript expression using substitution, environment, or CSE models
2. Analyze the time and space complexity of recursive and iterative processes
3. Build and use higher-order functions, data abstractions, and generic systems
4. Explain the environment model and how assignment changes program reasoning
5. Model interactive systems with mutable data, concurrency, and streams
6. Build a metacircular evaluator -- a language interpreter written in itself
7. Modify the evaluator for lazy evaluation, nondeterminism, and logic programming
8. Design register machines and write a compiler from source to machine code
9. **Teach all of the above clearly to others**

---

**Last Updated**: 2026-04-14
