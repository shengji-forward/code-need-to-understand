# CS61A Composing Programs JS — Session Prompts

Copy-paste prompts for each session's teacher agent. Each prompt sets up the Feynman-method learning workflow.

These prompts drive the private learner/mentor run and the `learning-report.md` artifact. Public YouTube `transcript.md` files and `slides.excalidraw` decks are separate orchestrator artifacts created after the learning run.

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
Teach me CS61A section 3.1 Introduction. I've read knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction.md. Now let me work through practice/cs61a-composing-programs/03-interpreting-computer-programs/3.1-introduction/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section opens the curtain on how languages work. Before I attempt each exercise, check my understanding of: the four stages of the language pipeline (source → tokens → AST → value), why syntax and semantics are different things, what an AST node looks like and why it's a tree, and how the eval/apply cycle works at a high level. Use concrete analogies: tokenizing is like splitting a sentence into individual words, parsing is like diagramming a sentence into a grammar tree, and evaluation is like following the tree from leaves to root to compute the final answer.
```

---

## Session 18 — Functional Programming in JS (3.2)

```
Teach me CS61A section 3.2 Functional Programming. I've read knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.2-functional-programming.md. Now let me work through practice/cs61a-composing-programs/03-interpreting-computer-programs/3.2-functional-programming/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section connects Ch1's higher-order functions to a stricter functional style and bridges toward the interpreter sections. Before I attempt exercises, check my understanding of: what makes a function pure vs impure (same inputs always give same outputs, no side effects), why immutability matters (never mutate the original — return a new value), how compose(f, g) builds a pipeline x => f(g(x)), and how symbolic expressions like { type: "add", left: 2, right: 3 } represent programs as data. Use concrete analogies: a pure function is like a calculator — press the same buttons, get the same answer every time. Compose is like an assembly line — each station does one transformation and passes the result to the next. Symbolic expressions are like a recipe written in data, not code — the interpreter will "read" and execute them later.
```

---

## Session 19 — Exceptions (3.3)

```
Teach me CS61A section 3.3 Exceptions. I've read knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.3-exceptions.md. Now let me work through practice/cs61a-composing-programs/03-interpreting-computer-programs/3.3-exceptions/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section teaches structured error handling that the interpreter sections will rely on heavily. Before I attempt exercises, check my understanding of: how throw interrupts control flow and bubbles up through the call stack, how try/catch lets you recover at a specific point, why finally always runs (even after return or throw), how custom Error subclasses (like InterpreterError) let you distinguish domain-specific errors from built-in ones, and the difference between throwing an error and returning an error result. Use concrete analogies: throwing is like pulling a fire alarm — everyone stops what they're doing and evacuates until someone with authority (catch) handles it. finally is like the cleaning crew — they come through no matter how the meeting ended. Custom error classes are like different alarm tones — one for fire, one for security, so responders know what they're dealing with.
```

---

## Session 20 — Calculator Interpreter (3.4)

```
Teach me CS61A section 3.4 Interpreters for Languages with Combination. I've read knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination.md. Now let me work through practice/cs61a-composing-programs/03-interpreting-computer-programs/3.4-interpreters-for-languages-with-combination/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section builds a complete (but small) interpreter for a calculator language using S-expression syntax like (+ 1 (* 2 3)). Before I attempt exercises, check my understanding of: how the tokenizer splits "(+ 1 2)" into ["(", "+", "1", "2", ")"], how recursive descent parsing turns those tokens into a tree like { type: "CallExpression", operator: "+", operands: [...] }, how tree-walking evaluation dispatches on node type (NumberLiteral evaluates to its value, CallExpression evaluates operands then applies the operator), and how the full pipeline composes: runCalculator = evaluate(parse(tokenize(source))). Use concrete analogies: the tokenizer is a word splitter, the parser is a grammar diagram builder, and the evaluator is someone reading the diagram and doing the math. The S-expression syntax is like writing math in reverse Polish notation but with parentheses around every operation.
```

---

## Session 21 — JS Interpreter (3.5)

```
Teach me CS61A section 3.5 Interpreters for Languages with Abstraction. I've read knowledge/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction.md. Now let me work through practice/cs61a-composing-programs/03-interpreting-computer-programs/3.5-interpreters-for-languages-with-abstraction/practice.js. This is the capstone of Chapter 3 — a JavaScript-subset interpreter built in JavaScript. Guide me with questions and analogies — don't give away the practice answers immediately. Before I attempt exercises, check my understanding of: how Frame objects with parent pointers implement lexical scope (lookup walks the parent chain, define places in the current frame), how the tokenizer handles multi-character operators (===, &&, ||, <=) before single-character ones, how the recursive descent parser handles operator precedence (logical OR → AND → equality → comparison → additive → multiplicative → unary → call → primary), how the evaluator dispatches on AST node type (Program, ExpressionStatement, Literal, Identifier, BinaryExpression, LetDeclaration, Assignment, FunctionDeclaration, ArrowFunction, CallExpression, IfStatement, BlockStatement, ReturnStatement), how closures capture their defining environment and create a child frame of that captured env (not the caller's env) when called, and how ReturnSignal implements non-local return flow. The interpreter intentionally excludes: classes, loops (for/while), async/await, imports/exports, destructuring, array/object literal syntax, template literals, var, const hoisting, this, and new. Use concrete analogies: Frame lookup is like looking for a book — first check your own shelf, then your parent's shelf, then their parent's shelf. A closure is like a person who carries a backpack with their hometown's phone book — no matter where they travel, they can always look up numbers from home. The ReturnSignal is like a "teleport out" card — when played inside any nested block, it instantly transports you back to the function exit.
```

---

## Session 22 — Ch3 Review

```
It's time to review all of Chapter 3. I've completed practice exercises for sections 3.1 through 3.5. Run through all solution files in practice/cs61a-composing-programs/03-interpreting-computer-programs/*/solutions.js and help me identify which concepts I should revisit. Ask me to explain the connections between the language pipeline (3.1) → functional patterns (3.2) → error handling (3.3) → calculator interpreter (3.4) → JS-subset interpreter (3.5). Don't just summarize — test my understanding with questions like: "If I change Frame to always create a child of the caller's frame instead of the closure's captured frame, what breaks and why?" and "Why does the tokenizer need to check === before =, and what would happen if it checked single-character operators first?" and "How would you add support for while loops to the 3.5 interpreter — what new AST nodes, parser functions, and evaluator cases would you need?" Ask me to predict outputs before running code. Focus especially on the ideas that are new in Chapter 3: environment frames, closures in the interpreter, return signals, recursive descent parsing, and the eval/apply cycle.
```

---

## Session 23 — Implicit Sequences (4.1-4.2)

```
Teach me CS61A sections 4.1-4.2: Introduction to Data Processing and Implicit Sequences. I've read knowledge/cs61a-composing-programs/04-data-processing/4.1-introduction.md and knowledge/cs61a-composing-programs/04-data-processing/4.2-implicit-sequences.md. Now let me work through practice/cs61a-composing-programs/04-data-processing/4.1-introduction/practice.js and practice/cs61a-composing-programs/04-data-processing/4.2-implicit-sequences/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. Section 4.1 introduces the data-processing pipeline mental model: source → transform → aggregate. Section 4.2 is the main event — it covers iterators, iterables, generators, lazy streams, and finite consumers. Before I attempt exercises, check my understanding of: how the JS iterator protocol works (an object with a next() method returning { value, done }), how [Symbol.iterator]() makes any object usable in for...of and Array.from, how function* and yield create generator functions that produce values lazily, how a Stream class with a memoized rest thunk differs from a generator (explicit thunk vs implicit suspension), and why infinite iterables need finite consumers like take(). Use concrete analogies: an iterator is like a ticket dispenser — each call to next() gives you one ticket and advances the counter. A generator is like a paused video — yield pauses the function, and calling next() resumes exactly where it left off. A stream is like a chain of promises — the rest isn't computed until you ask for it, and once computed, it's cached (memoized). A pipeline (from 4.1) is like a factory assembly line — raw material enters, each station transforms it, and the final product comes out the other end.
```

---

## Session 24 — Declarative Programming / SQL (4.3)

```
Teach me CS61A section 4.3 Declarative Programming. I've read knowledge/cs61a-composing-programs/04-data-processing/4.3-declarative-programming.md. Now let me work through practice/cs61a-composing-programs/04-data-processing/4.3-declarative-programming/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section shifts from imperative loops to declarative querying — you describe WHAT you want, not HOW to compute it. Before I attempt exercises, check my understanding of: how tables are created with table(name, rows) as named wrappers with a .rows property (not actual SQL databases), how selectRows picks specific columns from each row, how whereRows filters with a predicate (the WHERE clause), how joinRows combines two tables by matching keys (the JOIN clause), how groupBy clusters rows by a computed key and how aggregate functions like count, sum, and avg operate on those groups, and how executeQuery composes from -> join -> where -> groupBy -> select into one declarative pipeline. Compare declarative vs imperative: "give me all students in house A" as a query object vs a for loop with if/push. Use concrete analogies: a query object is like a restaurant order — you specify what you want (the dish, the modifications) and the kitchen figures out how to make it. A join is like matching left gloves with right gloves by size — you pair rows that share the same key. Grouping is like sorting a deck of cards by suit before counting each suit.
```

---

## Session 25 — Logic Programming (4.4-4.5)

```
Teach me CS61A sections 4.4-4.5: Logic Programming and Unification. I've read knowledge/cs61a-composing-programs/04-data-processing/4.4-logic-programming.md and knowledge/cs61a-composing-programs/04-data-processing/4.5-unification.md. Now let me work through practice/cs61a-composing-programs/04-data-processing/4.4-logic-programming/practice.js and practice/cs61a-composing-programs/04-data-processing/4.5-unification/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This is the most conceptually dense section in Chapter 4. Section 4.4 introduces facts, queries, and rules using structured terms. Section 4.5 builds the unification algorithm that powers logic search. Before I attempt exercises, check my understanding of: how term(name, args) represents a structured fact like parent("alice", "bob"), how logic variables are strings starting with "?" (like "?x") that act as placeholders, how matchFact compares a goal against a fact and returns bindings when they're compatible, how rules have a head and body — a rule fires when the body goals can all be proven, how walk chains through a substitution to find the ultimate value of a variable, how unify(left, right, subst) recursively matches two terms and either extends the substitution or returns null on failure, how occursCheck prevents infinite terms like ?x = f(?x), how applySubstitution replaces all variables in a term with their bound values, and how prove and solve use fuel-bounded search to find all satisfying bindings without infinite loops. Use concrete analogies: a fact database is like a detective's evidence board — facts are pinned cards, queries are questions you ask the board, and bindings are the answers. Unification is like solving a jigsaw puzzle — two pieces fit if their shapes match (same predicate name and arity) and their contents are either identical or one is a variable that can take any value. Walk is like following a chain of "see also" references in a dictionary until you reach the actual definition. The occurs check is like preventing a circular definition — a variable can't be defined in terms of itself.
```

---

## Session 26 — Distributed Computing (4.6-4.7)

```
Teach me CS61A sections 4.6-4.7: Distributed Computing and Distributed Data Processing. I've read knowledge/cs61a-composing-programs/04-data-processing/4.6-distributed-computing.md and knowledge/cs61a-composing-programs/04-data-processing/4.7-distributed-data-processing.md. Now let me work through practice/cs61a-composing-programs/04-data-processing/4.6-distributed-computing/practice.js and practice/cs61a-composing-programs/04-data-processing/4.7-distributed-data-processing/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. These sections model distributed systems concepts using deterministic in-memory code — no real network calls. Section 4.6 covers messages, client/server architecture, and peer-to-peer systems. Section 4.7 builds MapReduce for distributed data processing. Before I attempt exercises, check my understanding of: how makeMessage creates validated message objects with from, to, type, and payload fields, how serializeMessage/deserializeMessage convert messages to JSON strings and back (simulating network transmission), how MessageBus routes messages between registered handlers (simulating a network), how Server and Client classes model request/response patterns, how peer-to-peer forwarding uses a visited set to avoid infinite loops, how partition splits input data into chunks for parallel processing, how mapPartition applies a mapper function to produce key-value pairs, how shuffle groups all key-value pairs by key (the critical grouping step), how reduceGroups applies a reducer to each group's values, and how mapReduce composes partition → map → shuffle → reduce into a full pipeline. Use concrete analogies: a MessageBus is like a postal service — you register your address, send letters to specific addresses, or broadcast to everyone. A client/server is like a restaurant — the client orders, the server prepares the response. Peer-to-peer is like a game of telephone — each person passes the message to the next, but with a visited set so nobody gets called twice. MapReduce is like sorting a huge pile of mail: partition = split the pile among workers, map = each worker stamps each letter with a category, shuffle = gather all letters of the same category into one bin, reduce = count or summarize each bin.
```

---

## Session 27 — Parallel Computing (4.8)

```
Teach me CS61A section 4.8 Parallel Computing. I've read knowledge/cs61a-composing-programs/04-data-processing/4.8-parallel-computing.md. Now let me work through practice/cs61a-composing-programs/04-data-processing/4.8-parallel-computing/practice.js. Guide me with questions and analogies — don't give away the practice answers immediately. This section teaches why concurrent code needs synchronization and how message passing avoids shared-state bugs — using deterministic promise-based simulations, not real worker threads. Before I attempt exercises, check my understanding of: how splitWork divides items into chunks for parallel processing, how parallelMap runs mapper functions concurrently while preserving input order, why shared mutable state causes race conditions (two concurrent increments can lose one update), how the Mutex class uses runExclusive to ensure only one async operation touches a critical section at a time, how the Barrier class blocks all waiters until the configured party size arrives and then releases everyone together, how the Channel class provides send/receive for safe message passing between concurrent tasks, and why acquiring locks in different orders can cause deadlock. Use concrete analogies: a race condition is like two people trying to edit the same spreadsheet cell at the same time — one edit gets lost. A mutex is like a bathroom lock — only one person inside at a time, and if they drop something (throw an error), the door still unlocks for the next person. A barrier is like a group photo — nobody moves until everyone is in position. A channel is like a drive-through window — you place your order (send) and later receive your food (receive), with a queue buffering between them. Deadlock is like two people each holding a tool the other needs — neither can proceed because they're waiting for each other.
```

---

## Session 28 — Ch4 Review

```
It's time to review all of Chapter 4. I've completed practice exercises for sections 4.1 through 4.8. Run through all solution files in practice/cs61a-composing-programs/04-data-processing/*/solutions.js and help me identify which concepts I should revisit. Ask me to explain the connections between pipelines (4.1) → lazy sequences (4.2) → declarative queries (4.3) → logic programming (4.4) → unification (4.5) → distributed computing (4.6) → MapReduce (4.7) → parallel computing (4.8). Don't just summarize — test my understanding with questions like: "Why does a stream memoize its rest thunk — what would happen if it re-evaluated it every time?" and "If unify(left, right, subst) mutates subst on failure instead of returning null, what kind of bugs would that cause?" and "How is MapReduce's shuffle step similar to SQL's GROUP BY?" and "Why does a mutex need to release its lock even when the protected function throws an error?" and "How is a Barrier different from a Mutex — when would you use each?" Ask me to predict outputs before running code. Focus especially on the ideas that are new in Chapter 4: lazy evaluation, declarative vs imperative paradigms, unification and proof search, message-passing architectures, and synchronization primitives.
```

---

## Session 29 — Capstone

```
It's time for the full CS61A Composing Programs JavaScript capstone. I've completed the knowledge and practice path for Chapters 1-4. Help me synthesize the whole course without turning it into a lecture. Start by asking me to explain the through-line from expressions and names (Chapter 1) to data abstraction and objects (Chapter 2), interpreters and environments (Chapter 3), and data-processing systems (Chapter 4). Then run a selective final review using solution files from practice/cs61a-composing-programs/01-building-abstractions-with-functions/, practice/cs61a-composing-programs/02-building-abstractions-with-data/, practice/cs61a-composing-programs/03-interpreting-computer-programs/, and practice/cs61a-composing-programs/04-data-processing/. Ask me to predict outputs before running code, explain why each abstraction works, and identify where JavaScript differs from the original Python/Scheme concepts. Use cross-chapter questions like: "How is a closure in Chapter 1 related to private mutable state in Chapter 2 and closure environments in the Chapter 3 interpreter?" "How does a linked list or tree traversal prepare you for AST evaluation?" "Where do higher-order functions show up again in map/filter/reduce, streams, MapReduce, and interpreter dispatch?" "How are abstraction barriers in rational numbers similar to query objects and message-passing systems?" End by helping me produce a concise final learning report: strongest concepts, weak spots to revisit, and three capstone problems that combine multiple chapters.
```
