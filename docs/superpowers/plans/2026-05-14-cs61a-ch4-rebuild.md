# CS61A Composing Programs JS - Chapter 4: Data Processing

> **For agentic workers:** Follow the checkbox (`- [ ]`) steps and update them as work completes. If `superpowers:subagent-driven-development` or `superpowers:executing-plans` is available, use it; otherwise execute the checklist manually.

**Goal:** Build Chapter 4 (Data Processing) completely: 8 knowledge files, 16 practice files, and learning-summary updates for sessions 23-28, following the Chapter 1, Chapter 2, and Chapter 3 patterns.

**Architecture:** Three-folder pattern (`knowledge/`, `practice/`, `learning-summary/`) under `cs61a-composing-programs/`. Chapter 4 introduces lazy/implicit sequences, declarative querying, logic programming, unification, distributed computing, MapReduce, and parallel computing.

**Tech Stack:** Node.js >= 18 LTS, ES modules (`.js` files), zero external npm dependencies. Node built-ins may be used only where the exercise requires them. Practice files must remain deterministic, finite, and runnable with plain `node`.

**Spec:** `docs/superpowers/specs/2026-05-06-cs61a-composing-programs-js-design.md`
**Chapter 1 Plan (reference):** `docs/superpowers/plans/2026-05-06-cs61a-ch1-rebuild.md`
**Chapter 2 Plan (reference):** `docs/superpowers/plans/2026-05-11-cs61a-ch2-rebuild.md`
**Chapter 3 Plan (reference):** `docs/superpowers/plans/2026-05-13-cs61a-ch3-rebuild.md`

**Import path convention:** Practice files live 3 levels deep under `practice/cs61a-composing-programs/04-.../<section>/`. From any practice file, `../../shared/helpers.js` resolves to `practice/cs61a-composing-programs/shared/helpers.js`. Always use `../../shared/`, never `../../../shared/`.

**Do NOT modify:** Chapter 1, Chapter 2, or Chapter 3 content except shared README status lines and learning-summary sessions 23-28. Do not modify unrelated `.ts` practice modules, unrelated learning materials, or unrelated dirty files. Only add Chapter 4 content and update structural files that must reflect Chapter 4 availability.

---

## 1. Current State

### Completed Dependencies

Chapter 1 is complete enough to provide the functional foundation:

- Higher-order functions, closures, currying, recursion, and tree recursion.
- Safe-stub practice pattern using `undefined` placeholders and assertions.
- `range` helper for finite iteration exercises.

Chapter 2 is complete and provides the data foundation:

- Data abstraction, arrays, linked lists, trees, mutation, local state, classes, inheritance, and recursive objects.
- Shared linked-list and tree helpers are available for sequence and tree-shaped data examples.
- `assertThrows` is available for error-path practice.

Chapter 3 is complete and provides the interpreter foundation:

- Tokenizer -> parser -> evaluator pipelines.
- `Frame` environment models, closures, recursive descent parsing, and error propagation.
- These ideas feed directly into Chapter 4 SQL, logic programming, and query engines.

### Existing Shared Utilities

`practice/cs61a-composing-programs/shared/` currently contains:

| File | Exports | Chapter 4 Use |
|------|---------|---------------|
| `helpers.js` | `assertEqual`, `assertApprox`, `range`, `assertThrows` | Sufficient for all Chapter 4 assertions, including async assertions when awaited locally. |
| `pairs.js` | `pair`, `head`, `tail` | Optional for stream pairs or logic-programming terms, but do not require learners to use it. |
| `linked-list.js` | `EMPTY`, `link`, `first`, `rest`, `isEmpty`, `listLength`, `listToString`, `listToArray`, `listFromArray`, `mapList`, `filterList`, `appendList` | Optional for implicit sequence comparisons. Prefer arrays for tests unless linked lists are explicitly part of an exercise. |
| `tree.js` | `tree`, `label`, `branches`, `isLeaf`, `printTree`, `treeSize`, `treeContains`, `mapTree` | Optional for proof trees in logic programming. Prefer plain objects for query/proof terms unless a tree exercise needs this helper. |

**Verdict:** No shared utility additions are required for Chapter 4. Keep section-specific implementations inside the relevant practice/solution files so students build the data-processing machinery explicitly.

### Learning Summary Status

The 30-session plan already reserves Chapter 4 as:

| Session | Topic | Source |
|---------|-------|--------|
| 23 | Implicit Sequences | 4.2, with 4.1 intro folded in |
| 24 | Declarative Programming / SQL | 4.3 |
| 25 | Logic Programming | 4.4-4.5 |
| 26 | Distributed Computing | 4.6-4.7 |
| 27 | Parallel Computing | 4.8 |
| 28 | Ch4 Review | All of Ch4 |

`learning-summary/cs61a-composing-programs/PLAN.md` has usable high-level session details. `SESSION-PROMPTS.md` still has placeholders for sessions 23-28 and must be expanded after Chapter 4 files land.

---

## 2. Chapter 4 Scope

Build all sections 4.1 through 4.8:

| Section | Title | Key Topics | JavaScript Adaptation |
|---------|-------|------------|-----------------------|
| 4.1 | Introduction | Data-processing pipelines, sequential streams, unbounded data | Finite and lazy pipelines: `source -> transform -> aggregate`. |
| 4.2 | Implicit Sequences | Iterators, iterables, generators, streams | JS iterator protocol, `function*`, `yield`, lazy `Stream` class, finite stream consumers. |
| 4.3 | Declarative Programming | Tables, SQL, joins, recursive selects, aggregation | In-memory table/query engine using arrays of records and query objects. |
| 4.4 | Logic Programming | Facts, queries, recursive facts | Small fact/rule database using structured terms and variable bindings. |
| 4.5 | Unification | Pattern matching, substitutions, proofs, search | Unification over variables and compound terms, proof search with backtracking. |
| 4.6 | Distributed Computing | Messages, client/server, peer-to-peer systems | Deterministic in-memory message passing; knowledge may mention `net`/`fetch`, but practice avoids live networking. |
| 4.7 | Distributed Data Processing | MapReduce, local and distributed implementations | Local MapReduce pipeline: partition, map, shuffle, reduce, combine. |
| 4.8 | Parallel Computing | Threads, shared state, locks, barriers, message passing | Worker-thread concepts via deterministic helpers, promise-based simulations, mutex/barrier/channel exercises. |

### Chapter 4 Source Mapping

The source Chapter 4 is Python-oriented and includes SQL, logic programming, distributed systems, and concurrency examples. This rebuild keeps the conceptual progression but translates implementation details to idiomatic, dependency-free JavaScript.

**4.1 Introduction**

- Sequential data streams.
- Unbounded and evolving data sets.
- Data-processing pipelines.

**4.2 Implicit Sequences** (4.2.1-4.2.10)

- 4.2.1 Iterators
- 4.2.2 Iterables
- 4.2.3 Built-in Iterators
- 4.2.4 For Statements
- 4.2.5 Generators and Yield Statements
- 4.2.6 Iterable Interface
- 4.2.7 Creating Iterables with Yield
- 4.2.8 Iterator Interface
- 4.2.9 Streams
- 4.2.10 Python Streams

**4.3 Declarative Programming** (4.3.1-4.3.6)

- 4.3.1 Tables
- 4.3.2 Select Statements
- 4.3.3 Joins
- 4.3.4 Interpreting SQL
- 4.3.5 Recursive Select Statements
- 4.3.6 Aggregation and Grouping

**4.4 Logic Programming** (4.4.1-4.4.2)

- 4.4.1 Facts and Queries
- 4.4.2 Recursive Facts

**4.5 Unification** (4.5.1-4.5.5)

- 4.5.1 Pattern Matching
- 4.5.2 Representing Facts and Queries
- 4.5.3 The Unification Algorithm
- 4.5.4 Proofs
- 4.5.5 Search

**4.6 Distributed Computing** (4.6.1-4.6.3)

- 4.6.1 Messages
- 4.6.2 Client/Server Architecture
- 4.6.3 Peer-to-Peer Systems

**4.7 Distributed Data Processing** (4.7.1-4.7.3)

- 4.7.1 MapReduce
- 4.7.2 Local Implementation
- 4.7.3 Distributed Implementation

**4.8 Parallel Computing** (4.8.1-4.8.9)

- 4.8.1 Parallelism in Python
- 4.8.2 The Problem with Shared State
- 4.8.3 When No Synchronization is Necessary
- 4.8.4 Synchronized Data Structures
- 4.8.5 Locks
- 4.8.6 Barriers
- 4.8.7 Message Passing
- 4.8.8 Synchronization Pitfalls
- 4.8.9 Conclusion

---

## 3. JavaScript Adaptation Decisions

### Core Mappings

| Source Concept | JavaScript Decision | Rationale |
|----------------|---------------------|-----------|
| Python iterator protocol | JS `{ next() }` objects and `[Symbol.iterator]()` | Native JS protocol mirrors the source concept closely. |
| Python generators | `function*` and `yield` | Direct and teachable mapping. |
| Streams | Lazy `Stream` class with memoized rest thunk | Keeps laziness visible without depending on Web Streams or Node streams. |
| SQL tables | Arrays of frozen row objects or lightweight `Table` class | Easy to inspect and deep-compare in tests. |
| SQL parser | Do not build a full SQL text parser initially | Chapter 3 already taught parsing. Chapter 4 should focus on declarative query semantics. |
| Select statements | Query-object representation | Example: `{ select, from, where, join, groupBy, aggregates }`. |
| Logic variables | Strings beginning with `?`, for example `"?x"` | Keeps variables visible without a custom class. |
| Compound terms | Plain objects `{ type: "term", name, args }` or arrays `[name, ...args]` | Use one representation consistently within 4.4-4.5. |
| Substitutions | `Map` or plain null-prototype object | Use `Map` when keys are variable names and values may be compound terms. |
| Distributed messages | Plain serializable objects `{ from, to, type, payload }` | Makes serialization and routing explicit. |
| Networking practice | In-memory `MessageBus`, not real sockets | Avoids open ports, timing flakiness, and network restrictions. |
| MapReduce | Local deterministic pipeline | Students learn partition/map/shuffle/reduce before real distribution. |
| Python threads | Node worker-thread concepts plus deterministic simulations | Avoids nondeterministic tests while preserving concurrency concepts. |
| Locks/barriers | Promise-based `Mutex` and `Barrier` classes | Teachable and testable with top-level `await`. |
| Shared memory | Mention `SharedArrayBuffer`/`Atomics` in knowledge; keep practice minimal | Shared-memory correctness is high-risk for beginner practice. |

### Pinned Mini SQL Engine

The SQL practice should not become a full SQL parser. Use a small query engine with explicit data structures:

```javascript
const students = table("students", [
  { id: 1, name: "Ada", house: "A" },
  { id: 2, name: "Grace", house: "B" },
]);

executeQuery({
  from: students,
  select: ["name"],
  where: row => row.house === "A",
});
```

Supported operations:

- `table(name, rows)`
- `selectRows(table, columns)`
- `whereRows(table, predicate)`
- `joinRows(left, right, leftKey, rightKey)`
- `groupBy(rows, keyFn)`
- aggregate helpers: `count`, `sum`, `avg`, `min`, `max`
- `executeQuery(query)` composing these operations

Explicit exclusions:

- No full SQL grammar or SQL text parser.
- No persistence, file I/O, indexes, query optimizer, transactions, or recursive SQL engine unless a small recursive example is provided as scaffolding.

### Pinned Logic Programming Representation

Use one consistent representation across 4.4 and 4.5:

```javascript
const term = (name, args = []) => ({ type: "term", name, args });
const variable = name => `?${name}`;
```

Examples:

```javascript
term("parent", ["alice", "bob"]);
term("ancestor", [variable("x"), variable("y")]);
```

Required components:

- `isVariable(value)`
- `walk(value, substitution)`
- `extend(variableName, value, substitution)`
- `unify(left, right, substitution)`
- `applySubstitution(term, substitution)`
- `FactBase` or equivalent store for facts and rules
- `prove(goal, database)` with bounded backtracking

Explicit exclusions:

- No full Scheme-like logic language parser.
- No infinite search without a depth/fuel limit.
- No occurs-check-heavy examples unless the implementation includes an explicit occurs check.

### Pinned Distributed/Parallel Scope

Chapter 4 can mention real systems, but practice must stay deterministic:

- Do not open network ports in practice assertions.
- Do not make HTTP requests.
- Do not depend on timers for correctness.
- Do not spawn unbounded workers.
- Do not leave workers, servers, or intervals running after a test.
- Use finite fixtures and pure data wherever possible.

For 4.8, worker-thread examples may be shown in knowledge, but practice should either:

- use a provided finite `runWorkerTask` helper that terminates workers, or
- simulate parallel scheduling with promises/message queues while focusing on synchronization concepts.

---

## 4. File Plan

### Knowledge Files

Create:

```text
knowledge/cs61a-composing-programs/04-data-processing/
+-- 4.1-introduction.md
+-- 4.2-implicit-sequences.md
+-- 4.3-declarative-programming.md
+-- 4.4-logic-programming.md
+-- 4.5-unification.md
+-- 4.6-distributed-computing.md
+-- 4.7-distributed-data-processing.md
+-- 4.8-parallel-computing.md
```

Each file follows the Chapter 1-3 template:

```markdown
# 4.X Section Title

> Based on [Composing Programs 4.X](https://composingprograms.com/pages/4X-....html)
> by John DeNero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Translated from Python concepts to JavaScript.

## Key Concepts
- 4-7 bullets

## Content
### Subsections
Translated theory with JavaScript examples.

## Python vs JavaScript Notes
Only where translation is non-obvious.
```

### Practice Files

Create:

```text
practice/cs61a-composing-programs/04-data-processing/
+-- 4.1-introduction/
|   +-- practice.js
|   +-- solutions.js
+-- 4.2-implicit-sequences/
|   +-- practice.js
|   +-- solutions.js
+-- 4.3-declarative-programming/
|   +-- practice.js
|   +-- solutions.js
+-- 4.4-logic-programming/
|   +-- practice.js
|   +-- solutions.js
+-- 4.5-unification/
|   +-- practice.js
|   +-- solutions.js
+-- 4.6-distributed-computing/
|   +-- practice.js
|   +-- solutions.js
+-- 4.7-distributed-data-processing/
|   +-- practice.js
|   +-- solutions.js
+-- 4.8-parallel-computing/
    +-- practice.js
    +-- solutions.js
```

Every practice file:

- Uses ES module syntax only.
- Imports from `../../shared/...` as needed.
- Runs with `node path/to/practice.js`.
- Produces only `PASS`/`FAIL` assertion output.
- Must not crash, hang, throw uncaught exceptions, or depend on user input.
- Must not depend on random values, wall-clock timing, network access, filesystem access, or external services.
- May use top-level `await` where async concurrency assertions are needed.

### Learning Summary Updates

Update during the final summary chunk:

- `learning-summary/cs61a-composing-programs/PLAN.md` only if session objectives need enrichment after content lands.
- `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md` to replace placeholders for sessions 23-28.
- `learning-summary/cs61a-composing-programs/TODO.md` only if status references are needed.
- `knowledge/cs61a-composing-programs/README.md` to mark Chapter 4 `In Progress` or `Complete`.
- `practice/cs61a-composing-programs/README.md` to mark Chapter 4 `In Progress` or `Complete`.

Do not create session artifacts (`learning-report.md`, `transcript.md`, `slides.html`) as part of the Chapter 4 rebuild unless separately requested.

---

## 5. Safe-Stub Rules

Every `practice.js` must parse and run end-to-end before a student fills TODOs. A stub may fail assertions, but it must not cause `TypeError`, `ReferenceError`, `SyntaxError`, uncaught exceptions, or hangs.

Required safe-stub patterns:

- Functions used by assertions must exist and return `undefined`, `[]`, `{}`, or a safe placeholder of the expected broad shape.
- Iterator stubs must return objects with callable `next()` methods when tests call `next()`.
- Iterable stubs must expose `[Symbol.iterator]` when used in `for...of` or `Array.from`.
- Generator exercises may use regular function stubs returning empty iterables in practice files.
- Stream stubs must avoid recursive rest evaluation until implemented.
- Query-engine stubs must return arrays or table-shaped objects, not `undefined`, when downstream code maps over results.
- Logic/unification stubs must return `null`, an empty `Map`, or an empty solution array rather than recursing indefinitely.
- Proof-search stubs must be fuel-bounded. No unbounded recursion or infinite generator in practice stubs.
- Message-bus stubs must avoid timers and never leave open handles.
- Parallel/concurrency stubs must resolve promises and terminate any workers they create.
- Negative tests must use `await assertThrows(...)` or local `try/catch`; no expected error may escape practice execution.

For `solutions.js`:

- All assertions must pass.
- All async exercises must settle deterministically.
- Any worker/thread/message examples must clean up all resources.
- If a solution uses `Map`, convert to arrays or objects before asserting unless exact `Map` equality is intended.
- If results are order-independent, sort results before asserting so tests are deterministic.

---

## 6. Exercise Specs

These specs define the required public surface and expected learning outcomes. Implementers may add small helper functions, but should not widen the conceptual scope beyond these boundaries.

### 4.1 Introduction - Data Processing Pipelines

**Target:** Introduce Chapter 4 as pipeline-based processing of sequential data.

Required functions:

```javascript
function pipe(...fns) { ... }
function mapStage(fn) { ... }
function filterStage(pred) { ... }
function reduceStage(reducer, initial) { ... }
function runPipeline(input, stages) { ... }
function summarizeEvents(events) { ... }
```

Exercises:

1. `pipe(...fns)` composes unary functions left-to-right.
2. `mapStage(fn)` transforms every input item.
3. `filterStage(pred)` keeps matching items.
4. `reduceStage(reducer, initial)` collapses a sequence.
5. `runPipeline(input, stages)` composes stages.
6. `summarizeEvents(events)` groups finite event records by type and count.

Expected assertion count: 8-12.

Key edge cases:

- Empty input.
- Pipelines with one stage.
- Unknown event types should still be counted.

### 4.2 Implicit Sequences

**Target:** Build finite consumers around potentially infinite producers.

Required functions/classes:

```javascript
function rangeIterator(start, end) { ... }
function iterableRange(start, end) { ... }
function* naturals(start = 1) { ... }
function* fibonacci() { ... }
function take(iterable, n) { ... }
function* mapIterable(iterable, fn) { ... }
function* filterIterable(iterable, pred) { ... }
class Stream { ... }
function streamMap(stream, fn) { ... }
function streamFilter(stream, pred) { ... }
```

Exercises:

1. Manual iterator with `next()`.
2. Iterable range with `[Symbol.iterator]()`.
3. Generator basics with `naturals`.
4. Infinite Fibonacci generator consumed by `take`.
5. Lazy `mapIterable`.
6. Lazy `filterIterable`.
7. `Stream` class with memoized rest.
8. Stream map/filter over finite prefixes.

Expected assertion count: 18-24.

Key edge cases:

- `take(iterable, 0)` returns `[]`.
- `take` must stop early on infinite iterables.
- Stream rest thunk must be called at most once.
- Filtering an infinite iterable must be tested only with predicates that find values promptly.

### 4.3 Declarative Programming

**Target:** Teach declarative query semantics without building a full SQL parser.

Required functions/classes:

```javascript
function table(name, rows) { ... }
function selectRows(rows, columns) { ... }
function whereRows(rows, predicate) { ... }
function joinRows(leftRows, rightRows, leftKey, rightKey) { ... }
function groupBy(rows, keyFn) { ... }
function count(rows) { ... }
function sum(rows, selector) { ... }
function avg(rows, selector) { ... }
function executeQuery(query) { ... }
```

Exercises:

1. Create table-shaped data with stable row copies.
2. Select columns from rows.
3. Filter rows with a predicate.
4. Join two tables on key fields.
5. Group rows by a computed key.
6. Aggregate groups with `count`, `sum`, and `avg`.
7. Execute a query object that composes `from`, `where`, `select`, `join`, and `groupBy`.
8. Compare declarative query object to equivalent imperative loop.

Expected assertion count: 20-28.

Key edge cases:

- Selecting a missing column should produce `undefined` for that field or throw a clear error; choose one behavior and document it.
- Joins should be deterministic and preserve input order.
- Group keys should be converted to strings only when returning plain objects; otherwise use `Map`.
- Aggregation on an empty group should be explicit.

### 4.4 Logic Programming

**Target:** Represent facts and simple queries before full unification.

Required functions/classes:

```javascript
function term(name, args = []) { ... }
function variable(name) { ... }
function isVariable(value) { ... }
class FactBase {
  addFact(fact) { ... }
  addRule(rule) { ... }
  factsFor(name) { ... }
  query(goal) { ... }
}
function rule(head, body) { ... }
function matchFact(goal, fact) { ... }
```

Exercises:

1. Build fact and query terms.
2. Identify logic variables.
3. Match exact facts.
4. Match facts with variables and return bindings.
5. Query a fact database.
6. Represent simple rules.
7. Query one-step rules.

Expected assertion count: 14-20.

Key edge cases:

- Predicate names must match.
- Arity must match.
- Variables repeated in one query must bind consistently.
- Query results should be arrays of plain binding objects sorted deterministically.

### 4.5 Unification

**Target:** Implement the algorithm that powers logic-programming search.

Required functions:

```javascript
function isVariable(value) { ... }
function walk(value, subst) { ... }
function occursCheck(variableName, value, subst) { ... }
function extend(variableName, value, subst) { ... }
function unify(left, right, subst = new Map()) { ... }
function applySubstitution(value, subst) { ... }
function prove(goal, database, subst = new Map(), fuel = 50) { ... }
function solve(goals, database, subst = new Map(), fuel = 50) { ... }
```

Exercises:

1. Walk substitutions through chained variable bindings.
2. Unify identical constants.
3. Unify variable with constant.
4. Unify compound terms recursively.
5. Reject incompatible predicates or arities.
6. Reject cyclic bindings if using occurs check.
7. Apply substitutions to compound terms.
8. Prove a fact.
9. Prove a rule body.
10. Search multiple goals with bounded backtracking.

Expected assertion count: 24-34.

Key edge cases:

- Repeated variables must remain consistent.
- Failed unification should return `null`, not partially mutate the original substitution.
- Proof search must be fuel-bounded.
- Recursive rules should be tested with small finite data.

### 4.6 Distributed Computing

**Target:** Model messages and distributed roles without real network dependencies.

Required functions/classes:

```javascript
function makeMessage({ from, to, type, payload }) { ... }
function serializeMessage(message) { ... }
function deserializeMessage(text) { ... }
class MessageBus {
  register(id, handler) { ... }
  send(message) { ... }
  broadcast(from, type, payload) { ... }
}
class Server {
  handle(message) { ... }
}
class Client {
  request(to, type, payload) { ... }
}
```

Exercises:

1. Construct validated message objects.
2. Serialize/deserialize messages.
3. Route direct messages through `MessageBus`.
4. Broadcast messages to peers.
5. Implement a request/response client/server flow.
6. Model peer-to-peer forwarding with a visited set.
7. Surface routing errors clearly.

Expected assertion count: 16-24.

Key edge cases:

- Unknown recipient should throw or return an error result consistently.
- Broadcast should not send back to the sender unless explicitly requested.
- Message handlers must be deterministic.
- No live sockets, ports, timers, or real HTTP requests in practice.

### 4.7 Distributed Data Processing

**Target:** Implement MapReduce locally while preserving the distributed mental model.

Required functions:

```javascript
function partition(items, partitionCount) { ... }
function mapPartition(partition, mapper) { ... }
function shuffle(mappedPairs) { ... }
function reduceGroups(groups, reducer) { ... }
function mapReduce(items, mapper, reducer, partitionCount = 2) { ... }
function wordCount(lines) { ... }
function invertedIndex(documents) { ... }
```

Exercises:

1. Partition input evenly and deterministically.
2. Map one partition to key-value pairs.
3. Shuffle key-value pairs into grouped values.
4. Reduce grouped values to final records.
5. Compose local `mapReduce`.
6. Implement `wordCount`.
7. Implement `invertedIndex`.
8. Add combiner optimization as an optional helper or final exercise.

Expected assertion count: 18-26.

Key edge cases:

- Empty input.
- More partitions than items.
- Repeated words/documents.
- Output order should be sorted for deterministic assertions.

### 4.8 Parallel Computing

**Target:** Teach why concurrency needs synchronization and how message passing avoids shared-state bugs.

Required functions/classes:

```javascript
function splitWork(items, workerCount) { ... }
async function parallelMap(items, mapper, workerCount = 2) { ... }
class Mutex {
  async runExclusive(fn) { ... }
}
class Barrier {
  async wait() { ... }
}
class Channel {
  send(value) { ... }
  async receive() { ... }
}
function simulateRace(steps) { ... }
function safeCounter() { ... }
```

Exercises:

1. Split work into deterministic chunks.
2. `parallelMap` preserves input order while mapping concurrently.
3. Demonstrate a race with deterministic interleaving data.
4. Protect critical section with `Mutex`.
5. Coordinate tasks with `Barrier`.
6. Send and receive values through a `Channel`.
7. Use message passing to avoid shared state.
8. Identify a deadlock-prone pattern and reject it with a clear error.

Expected assertion count: 18-28.

Key edge cases:

- `parallelMap([], fn)` resolves to `[]`.
- Worker count greater than item count.
- Mutex must release lock if the protected function throws.
- Barrier must release exactly the configured number of waiters.
- Channel receives should settle deterministically.

---

## 7. Chunk Plan

### Chunk 1: Chapter 4 Structure and Status Gates

**Tasks:** 1-2

**Owned files:**

- `knowledge/cs61a-composing-programs/README.md`
- `practice/cs61a-composing-programs/README.md`
- New Chapter 4 directories under `knowledge/` and `practice/`

**Steps:**

- [ ] Create `knowledge/cs61a-composing-programs/04-data-processing/`.
- [ ] Create practice section directories for 4.1 through 4.8.
- [ ] Add `.gitkeep` placeholders if directories are empty.
- [ ] Update knowledge README Chapter 4 status to `In Progress`.
- [ ] Update practice README Chapter 4 status to `In Progress`.
- [ ] Do not touch Chapter 1, Chapter 2, or Chapter 3 content.

**Validation:**

```bash
ls knowledge/cs61a-composing-programs/04-data-processing
ls practice/cs61a-composing-programs/04-data-processing
grep -n "Data Processing.*In Progress" knowledge/cs61a-composing-programs/README.md practice/cs61a-composing-programs/README.md
git status --short
```

**Commit:** `chore: scaffold CS61A Chapter 4`

**Parallelizable:** No. This establishes shared paths and status gates.

### Chunk 2: Knowledge Files 4.1-4.3

**Tasks:** 3-5

**Owned files:**

- `knowledge/cs61a-composing-programs/04-data-processing/4.1-introduction.md`
- `knowledge/cs61a-composing-programs/04-data-processing/4.2-implicit-sequences.md`
- `knowledge/cs61a-composing-programs/04-data-processing/4.3-declarative-programming.md`

**Steps:**

- [ ] Write 4.1 introduction to data pipelines and unbounded sequential data.
- [ ] Write 4.2 implicit sequences with JS iterators, iterables, generators, and lazy streams.
- [ ] Write 4.3 declarative programming with table/query examples and the pinned mini SQL engine.
- [ ] Include CC BY-SA 3.0 attribution and "Translated from Python concepts to JavaScript" note once in each file.
- [ ] Keep examples executable JavaScript unless explicitly marked as SQL text.

**Validation:**

```bash
grep -n "CC BY-SA 3.0" knowledge/cs61a-composing-programs/04-data-processing/4.{1,2,3}-*.md
grep -n "Translated from Python concepts to JavaScript" knowledge/cs61a-composing-programs/04-data-processing/4.{1,2,3}-*.md
grep -n "Symbol.iterator\\|function\\*\\|yield\\|Stream" knowledge/cs61a-composing-programs/04-data-processing/4.2-implicit-sequences.md
grep -n "SELECT\\|JOIN\\|GROUP BY\\|executeQuery" knowledge/cs61a-composing-programs/04-data-processing/4.3-declarative-programming.md
```

**Commit:** `docs: add CS61A 4.1-4.3 knowledge files`

**Parallelizable:** Yes with Chunk 3 and Chunk 4 if file ownership is isolated.

### Chunk 3: Knowledge Files 4.4-4.5

**Tasks:** 6-7

**Owned files:**

- `knowledge/cs61a-composing-programs/04-data-processing/4.4-logic-programming.md`
- `knowledge/cs61a-composing-programs/04-data-processing/4.5-unification.md`

**Steps:**

- [ ] Write 4.4 logic programming with facts, queries, recursive facts, and rule search.
- [ ] Write 4.5 unification with variables, substitutions, occurs check, proofs, and bounded search.
- [ ] Use the pinned `term(name, args)` and `"?x"` variable representation.
- [ ] Include finite recursive examples only.
- [ ] Include CC BY-SA 3.0 attribution and translation note once in each file.

**Validation:**

```bash
grep -n "CC BY-SA 3.0" knowledge/cs61a-composing-programs/04-data-processing/4.{4,5}-*.md
grep -n "term(\\|unify\\|substitution\\|occurs" knowledge/cs61a-composing-programs/04-data-processing/4.5-unification.md
grep -n "facts\\|queries\\|recursive" knowledge/cs61a-composing-programs/04-data-processing/4.4-logic-programming.md
```

**Commit:** `docs: add CS61A 4.4-4.5 knowledge files`

**Parallelizable:** Yes with Chunk 2 and Chunk 4 if file ownership is isolated.

### Chunk 4: Knowledge Files 4.6-4.8

**Tasks:** 8-10

**Owned files:**

- `knowledge/cs61a-composing-programs/04-data-processing/4.6-distributed-computing.md`
- `knowledge/cs61a-composing-programs/04-data-processing/4.7-distributed-data-processing.md`
- `knowledge/cs61a-composing-programs/04-data-processing/4.8-parallel-computing.md`

**Steps:**

- [ ] Write 4.6 distributed computing with messages, client/server, and peer-to-peer systems.
- [ ] Write 4.7 distributed data processing with local MapReduce and distributed mental model.
- [ ] Write 4.8 parallel computing with Node.js worker concepts, shared state, locks, barriers, message passing, and pitfalls.
- [ ] Make clear which examples are conceptual versus runnable practice code.
- [ ] Include CC BY-SA 3.0 attribution and translation note once in each file.

**Validation:**

```bash
grep -n "CC BY-SA 3.0" knowledge/cs61a-composing-programs/04-data-processing/4.{6,7,8}-*.md
grep -n "MessageBus\\|client/server\\|peer-to-peer" knowledge/cs61a-composing-programs/04-data-processing/4.6-distributed-computing.md
grep -n "MapReduce\\|shuffle\\|reduce" knowledge/cs61a-composing-programs/04-data-processing/4.7-distributed-data-processing.md
grep -n "Mutex\\|Barrier\\|worker_threads\\|message passing" knowledge/cs61a-composing-programs/04-data-processing/4.8-parallel-computing.md
```

**Commit:** `docs: add CS61A 4.6-4.8 knowledge files`

**Parallelizable:** Yes with Chunk 2 and Chunk 3 if file ownership is isolated.

### Chunk 5: Practice Files 4.1-4.2

**Tasks:** 11-12

**Owned files:**

- `practice/cs61a-composing-programs/04-data-processing/4.1-introduction/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.1-introduction/solutions.js`
- `practice/cs61a-composing-programs/04-data-processing/4.2-implicit-sequences/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.2-implicit-sequences/solutions.js`

**Steps:**

- [ ] Implement 4.1 practice and solution files from the exercise spec.
- [ ] Implement 4.2 practice and solution files from the exercise spec.
- [ ] Keep all infinite sequences guarded by finite consumers.
- [ ] Ensure all practice stubs fail safely without uncaught errors.

**Validation:**

```bash
for d in 4.1-introduction 4.2-implicit-sequences; do
  node "practice/cs61a-composing-programs/04-data-processing/$d/solutions.js"
  node "practice/cs61a-composing-programs/04-data-processing/$d/practice.js" >/tmp/ch4-practice.out 2>/tmp/ch4-practice.err || true
  test ! -s /tmp/ch4-practice.err
  grep -Eq "^(PASS|FAIL):" /tmp/ch4-practice.out
done
```

**Commit:** `feat: add CS61A 4.1-4.2 practice and solutions`

**Parallelizable:** Yes with other practice chunks after knowledge vocabulary is stable.

### Chunk 6: Practice Files 4.3

**Tasks:** 13

**Owned files:**

- `practice/cs61a-composing-programs/04-data-processing/4.3-declarative-programming/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.3-declarative-programming/solutions.js`

**Steps:**

- [ ] Implement the pinned mini SQL/table query engine.
- [ ] Do not add a full SQL parser.
- [ ] Include joins, grouping, and aggregation.
- [ ] Ensure practice stubs return table/array-shaped placeholders safely.

**Validation:**

```bash
node practice/cs61a-composing-programs/04-data-processing/4.3-declarative-programming/solutions.js
node practice/cs61a-composing-programs/04-data-processing/4.3-declarative-programming/practice.js >/tmp/ch43-practice.out 2>/tmp/ch43-practice.err || true
test ! -s /tmp/ch43-practice.err
grep -Eq "^(PASS|FAIL):" /tmp/ch43-practice.out
```

**Commit:** `feat: add CS61A 4.3 declarative programming practice`

**Parallelizable:** Yes, if no shared query module is introduced.

### Chunk 7: Practice Files 4.4-4.5

**Tasks:** 14-15

**Owned files:**

- `practice/cs61a-composing-programs/04-data-processing/4.4-logic-programming/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.4-logic-programming/solutions.js`
- `practice/cs61a-composing-programs/04-data-processing/4.5-unification/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.5-unification/solutions.js`

**Steps:**

- [ ] Implement 4.4 facts/query practice with simple matching.
- [ ] Implement 4.5 unification/proof-search practice with bounded recursion.
- [ ] Keep representations consistent across both files.
- [ ] Add tests for repeated variables, arity mismatch, incompatible terms, and recursive proof with finite data.
- [ ] Ensure practice stubs do not recurse indefinitely.

**Validation:**

```bash
for d in 4.4-logic-programming 4.5-unification; do
  node "practice/cs61a-composing-programs/04-data-processing/$d/solutions.js"
  node "practice/cs61a-composing-programs/04-data-processing/$d/practice.js" >/tmp/ch4-practice.out 2>/tmp/ch4-practice.err || true
  test ! -s /tmp/ch4-practice.err
  grep -Eq "^(PASS|FAIL):" /tmp/ch4-practice.out
done
```

**Commit:** `feat: add CS61A 4.4-4.5 logic practice`

**Parallelizable:** No within the chunk. 4.4 and 4.5 share vocabulary and representation.

### Chunk 8: Practice Files 4.6-4.7

**Tasks:** 16-17

**Owned files:**

- `practice/cs61a-composing-programs/04-data-processing/4.6-distributed-computing/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.6-distributed-computing/solutions.js`
- `practice/cs61a-composing-programs/04-data-processing/4.7-distributed-data-processing/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.7-distributed-data-processing/solutions.js`

**Steps:**

- [ ] Implement deterministic in-memory distributed message exercises.
- [ ] Implement local MapReduce exercises.
- [ ] Do not open sockets or perform real network requests.
- [ ] Sort order-independent outputs before asserting.
- [ ] Keep all async behavior finite and resource-clean.

**Validation:**

```bash
for d in 4.6-distributed-computing 4.7-distributed-data-processing; do
  node "practice/cs61a-composing-programs/04-data-processing/$d/solutions.js"
  node "practice/cs61a-composing-programs/04-data-processing/$d/practice.js" >/tmp/ch4-practice.out 2>/tmp/ch4-practice.err || true
  test ! -s /tmp/ch4-practice.err
  grep -Eq "^(PASS|FAIL):" /tmp/ch4-practice.out
done
```

**Commit:** `feat: add CS61A 4.6-4.7 distributed practice`

**Parallelizable:** Yes with Chunk 6 or Chunk 9 if file ownership is isolated.

### Chunk 9: Practice Files 4.8

**Tasks:** 18

**Owned files:**

- `practice/cs61a-composing-programs/04-data-processing/4.8-parallel-computing/practice.js`
- `practice/cs61a-composing-programs/04-data-processing/4.8-parallel-computing/solutions.js`

**Steps:**

- [ ] Implement deterministic parallel/concurrency exercises.
- [ ] Use top-level `await` for async assertions as needed.
- [ ] Keep any worker-thread example bounded and cleaned up, or simulate parallelism with promises.
- [ ] Add tests for mutex release on thrown error and barrier release behavior.
- [ ] Ensure practice stubs settle without hanging.

**Validation:**

```bash
node practice/cs61a-composing-programs/04-data-processing/4.8-parallel-computing/solutions.js
node practice/cs61a-composing-programs/04-data-processing/4.8-parallel-computing/practice.js >/tmp/ch48-practice.out 2>/tmp/ch48-practice.err || true
test ! -s /tmp/ch48-practice.err
grep -Eq "^(PASS|FAIL):" /tmp/ch48-practice.out
```

**Commit:** `feat: add CS61A 4.8 parallel computing practice`

**Parallelizable:** Yes with other independent practice chunks, but review carefully for hangs.

### Chunk 10: Learning Summary Updates

**Tasks:** 19-20

**Owned files:**

- `learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md`
- `learning-summary/cs61a-composing-programs/PLAN.md` if enrichment is needed
- `learning-summary/cs61a-composing-programs/TODO.md` if status references are needed
- `knowledge/cs61a-composing-programs/README.md`
- `practice/cs61a-composing-programs/README.md`

**Steps:**

- [ ] Replace placeholder prompts for sessions 23-28 with full teacher-agent prompts.
- [ ] Keep session numbering exactly 23-28.
- [ ] Make session 23 reference 4.1 and 4.2 knowledge/practice paths.
- [ ] Make session 24 reference 4.3 knowledge/practice paths.
- [ ] Make session 25 reference 4.4 and 4.5 knowledge/practice paths.
- [ ] Make session 26 reference 4.6 and 4.7 knowledge/practice paths.
- [ ] Make session 27 reference 4.8 knowledge/practice paths.
- [ ] Make session 28 run all Chapter 4 solutions and test data-processing understanding.
- [ ] Update README status for Chapter 4 to `Complete` only after files and validation pass.

**Prompt requirements:**

- Prompts must ask the teacher agent to guide with questions and not give away answers immediately.
- Prompts must reference exact knowledge and practice paths.
- 4.2 prompt must mention iterators, iterables, generators, lazy streams, and finite consumers.
- 4.3 prompt must mention declarative vs imperative querying, joins, grouping, aggregation, and the mini query engine.
- 4.4-4.5 prompt must mention facts, rules, variables, substitutions, unification, and bounded search.
- 4.6-4.7 prompt must mention messages, client/server, peer-to-peer, MapReduce, shuffle, and reduce.
- 4.8 prompt must mention shared state, locks/mutexes, barriers, message passing, and synchronization pitfalls.
- Review prompt must ask the learner to predict outputs before running code.

**Validation:**

```bash
grep -n "## Session 2[3-8]" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
grep -n "4.2-implicit-sequences\\|4.3-declarative-programming\\|4.5-unification\\|4.8-parallel-computing" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
grep -n "iterator\\|generator\\|MapReduce\\|unification\\|Mutex\\|Barrier" learning-summary/cs61a-composing-programs/SESSION-PROMPTS.md
grep -n "Data Processing.*Complete" knowledge/cs61a-composing-programs/README.md practice/cs61a-composing-programs/README.md
```

**Commit:** `docs: update CS61A Chapter 4 learning summary`

**Parallelizable:** No. This should happen after practice paths and names are final.

### Chunk 11: Full Chapter 1-4 Validation and Final Commit Check

**Tasks:** 21

**Owned files:** None unless validation reveals a scoped fix.

**Steps:**

- [ ] Run every Chapter 4 `solutions.js`.
- [ ] Run every Chapter 4 `practice.js` and confirm safe-stub behavior.
- [ ] Spot-check Chapter 4 knowledge attribution.
- [ ] Confirm exactly 8 Chapter 4 knowledge files.
- [ ] Confirm exactly 8 Chapter 4 practice directories, each with `practice.js` and `solutions.js`.
- [ ] Confirm no CommonJS (`require`, `module.exports`) in Chapter 4 practice.
- [ ] Confirm no real network calls or unbounded worker/server handles in practice.
- [ ] Confirm no unrelated dirty files are included in Chapter 4 commits.

**Validation:**

```bash
for f in practice/cs61a-composing-programs/04-data-processing/*/solutions.js; do
  echo "=== $f ==="
  node "$f"
done

for f in practice/cs61a-composing-programs/04-data-processing/*/practice.js; do
  echo "=== $f ==="
  node "$f" >/tmp/ch4-practice.out 2>/tmp/ch4-practice.err || true
  test ! -s /tmp/ch4-practice.err || { cat /tmp/ch4-practice.err; exit 1; }
  grep -Eq "^(PASS|FAIL):" /tmp/ch4-practice.out || { cat /tmp/ch4-practice.out; exit 1; }
done

test "$(ls knowledge/cs61a-composing-programs/04-data-processing/*.md | wc -l | tr -d ' ')" = "8"
test "$(ls practice/cs61a-composing-programs/04-data-processing/*/practice.js | wc -l | tr -d ' ')" = "8"
test "$(ls practice/cs61a-composing-programs/04-data-processing/*/solutions.js | wc -l | tr -d ' ')" = "8"

grep -R "module.exports\\|require(" practice/cs61a-composing-programs/04-data-processing && exit 1 || true
grep -R "fetch(\\|createServer\\|listen(" practice/cs61a-composing-programs/04-data-processing && exit 1 || true
git status --short
```

**Commit:** Usually none. If validation requires a small scoped fix, commit as `fix: finalize CS61A Chapter 4 validation`.

**Parallelizable:** No. This is the final integration pass.

---

## 8. Chunk Execution Order

```text
Chunk 1 (structure/status gates)
   |
   +--> Chunk 2 (knowledge 4.1-4.3) --+
   |                                   |
   +--> Chunk 3 (knowledge 4.4-4.5) --+--> knowledge review
   |                                   |
   +--> Chunk 4 (knowledge 4.6-4.8) --+
                                           |
                                           v
        +--> Chunk 5 (practice 4.1-4.2) --+
        |                                  |
        +--> Chunk 6 (practice 4.3) -------+
        |                                  |
        +--> Chunk 7 (practice 4.4-4.5) ---+--> practice review
        |                                  |
        +--> Chunk 8 (practice 4.6-4.7) ---+
        |                                  |
        +--> Chunk 9 (practice 4.8) -------+
                                           |
                                           v
        Chunk 10 (learning-summary updates)
                                           |
                                           v
        Chunk 11 (full Ch1-Ch4 validation)
```

Recommended order:

1. Complete Chunk 1.
2. Run Chunks 2, 3, and 4 in parallel if separate workers or isolated worktrees are available.
3. Review knowledge vocabulary, especially shared term/query/message names.
4. Run practice chunks after their matching knowledge files are stable.
5. Keep Chunk 7 single-owner because 4.4 and 4.5 share logic-programming representation.
6. Keep Chunk 9 carefully reviewed because async/concurrency exercises can hang if stubs are not finite.
7. Run Chunk 10 once paths and exercise names are final.
8. Run Chunk 11 before final status/merge.

---

## 9. Task Checklist

- [ ] **Task 1:** Create Chapter 4 knowledge directory and mark knowledge status in progress.
- [ ] **Task 2:** Create Chapter 4 practice directories and mark practice status in progress.
- [ ] **Task 3:** Write 4.1 introduction knowledge file.
- [ ] **Task 4:** Write 4.2 implicit sequences knowledge file.
- [ ] **Task 5:** Write 4.3 declarative programming knowledge file.
- [ ] **Task 6:** Write 4.4 logic programming knowledge file.
- [ ] **Task 7:** Write 4.5 unification knowledge file.
- [ ] **Task 8:** Write 4.6 distributed computing knowledge file.
- [ ] **Task 9:** Write 4.7 distributed data processing knowledge file.
- [ ] **Task 10:** Write 4.8 parallel computing knowledge file.
- [ ] **Task 11:** Implement 4.1 practice and solutions.
- [ ] **Task 12:** Implement 4.2 practice and solutions.
- [ ] **Task 13:** Implement 4.3 practice and solutions.
- [ ] **Task 14:** Implement 4.4 practice and solutions.
- [ ] **Task 15:** Implement 4.5 practice and solutions.
- [ ] **Task 16:** Implement 4.6 practice and solutions.
- [ ] **Task 17:** Implement 4.7 practice and solutions.
- [ ] **Task 18:** Implement 4.8 practice and solutions.
- [ ] **Task 19:** Update learning-summary prompts for sessions 23-28.
- [ ] **Task 20:** Update Chapter 4 status in knowledge/practice READMEs after validation.
- [ ] **Task 21:** Run full Chapter 1-4 validation and final scope check.

---

## 10. Parallelization Guidance

Safe parallel work:

- Knowledge 4.1-4.3, 4.4-4.5, and 4.6-4.8 can be drafted in parallel with disjoint file ownership.
- Practice 4.1-4.2, 4.3, 4.6-4.7, and 4.8 can be implemented in parallel after vocabulary is stable.
- Validation-only review can run in parallel with a separate documentation review if no files are edited.

Do not parallelize:

- Chunk 1 structure/status gates.
- 4.4 and 4.5 practice if representation is still being decided.
- Chunk 10 learning-summary updates.
- Chunk 11 final validation.

If multiple agents work in one shared worktree:

- Each agent must edit only its owned files.
- The orchestrator should run integration validation and commit.
- Do not let parallel workers commit overlapping files.

---

## 11. Risk Register

| Risk | Consequence | Mitigation |
|------|-------------|------------|
| Infinite iterables accidentally consumed with `Array.from` | Hangs validation | Always use `take` for infinite sources; add comments and tests for finite consumers. |
| Stream rest thunk evaluated repeatedly | Incorrect laziness/memoization lesson | Add assertion that a rest thunk is called once. |
| SQL scope expands into parser/optimizer | Chunk becomes too large | Use query objects; knowledge can show SQL text separately. |
| Logic proof search recurses forever | Hanging tests | Add `fuel` parameter and finite fixtures. |
| Unification mutates substitution on failure | Subtle false positives | Clone substitutions on extension or rollback cleanly. |
| Distributed practice opens ports | Flaky tests and sandbox issues | Use in-memory `MessageBus`; no `listen()` in practice. |
| MapReduce output order nondeterministic | Intermittent assertion failures | Sort order-independent outputs before asserting. |
| Worker-thread examples leave open handles | Node process hangs | Prefer promise simulation; terminate workers explicitly if used. |
| Mutex does not release on thrown error | Later async assertions hang | Test thrown-error release path. |
| README marks Chapter 4 Complete too early | Misleading course status | Only mark complete in Chunk 10 after files and validation pass. |

---

## 12. Final Acceptance Criteria

Chapter 4 is complete only when:

- [ ] 8 Chapter 4 knowledge files exist under `knowledge/cs61a-composing-programs/04-data-processing/`.
- [ ] Every knowledge file has CC BY-SA 3.0 attribution and JavaScript translation note.
- [ ] 8 Chapter 4 practice directories exist under `practice/cs61a-composing-programs/04-data-processing/`.
- [ ] Each practice directory has `practice.js` and `solutions.js`.
- [ ] All Chapter 4 `solutions.js` files pass.
- [ ] All Chapter 4 `practice.js` files fail safely or pass safely without uncaught errors.
- [ ] No Chapter 4 practice file uses CommonJS.
- [ ] No Chapter 4 practice file performs real network calls or leaves open servers/workers.
- [ ] Learning-summary sessions 23-28 have full teacher prompts with exact paths.
- [ ] Chapter 4 is marked `Complete` in both knowledge and practice READMEs.
- [ ] `git status --short` reviewed, and only intended files are included in commits.

---

## 13. Suggested Commit Sequence

1. `chore: scaffold CS61A Chapter 4`
2. `docs: add CS61A 4.1-4.3 knowledge files`
3. `docs: add CS61A 4.4-4.5 knowledge files`
4. `docs: add CS61A 4.6-4.8 knowledge files`
5. `feat: add CS61A 4.1-4.2 practice and solutions`
6. `feat: add CS61A 4.3 declarative programming practice`
7. `feat: add CS61A 4.4-4.5 logic practice`
8. `feat: add CS61A 4.6-4.7 distributed practice`
9. `feat: add CS61A 4.8 parallel computing practice`
10. `docs: update CS61A Chapter 4 learning summary`
11. Optional: `fix: finalize CS61A Chapter 4 validation`

If the implementation is done in one branch by one worker, multiple chunks may be combined only when validation remains clear and commits stay reviewable.
