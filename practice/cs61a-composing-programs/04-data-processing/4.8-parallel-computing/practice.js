import { assertEqual, assertThrows } from "../../shared/helpers.js";

// --- Split Work ---

// Exercise 1: splitWork — split items into contiguous chunks for N workers
// TODO: Distribute items into workerCount contiguous chunks (earlier workers get extra if uneven)
function splitWork(items, workerCount) {
  return [];
}
assertEqual("Exercise 1: splitWork 6 items 2 workers",
  splitWork([1, 2, 3, 4, 5, 6], 2),
  [[1, 2, 3], [4, 5, 6]]);
assertEqual("Exercise 1: splitWork 5 items 3 workers",
  splitWork([1, 2, 3, 4, 5], 3),
  [[1, 2], [3, 4], [5]]);
assertEqual("Exercise 1: splitWork empty", splitWork([], 3), [[], [], []]);
assertEqual("Exercise 1: more workers than items",
  splitWork(["x"], 4), [["x"], [], [], []]);

// --- Parallel Map ---

// Exercise 2: parallelMap — map items concurrently, preserving input order
// TODO: Split work into chunks, map each chunk concurrently with Promise.all, flatten results
async function parallelMap(items, mapper, workerCount = 2) {
  return [];
}
const pm1 = await parallelMap([1, 2, 3, 4], (x) => x * 2);
assertEqual("Exercise 2: parallelMap doubles", pm1, [2, 4, 6, 8]);
const pm2 = await parallelMap([], (x) => x);
assertEqual("Exercise 2: parallelMap empty", pm2, []);
const pm3 = await parallelMap([1, 2, 3], (x) => x * 3, 5);
assertEqual("Exercise 2: parallelMap more workers than items", pm3, [3, 6, 9]);

// --- Simulate Race ---

// Exercise 3: simulateRace — deterministic interleaving of two generator functions
// TODO: Create generators from taskA() and taskB(), alternate .next() calls, collect yielded values
function simulateRace(taskA, taskB) {
  return [];
}
function* incrementTask(counter, label) {
  for (let i = 0; i < 3; i++) {
    const old = counter.value;
    yield `${label} read ${old}`;
    counter.value = old + 1;
    yield `${label} wrote ${old + 1}`;
  }
}
const raceCounter = { value: 0 };
const raceLog = simulateRace(
  () => incrementTask(raceCounter, "A"),
  () => incrementTask(raceCounter, "B")
);
assertEqual("Exercise 3: race counter lost updates", raceCounter.value, 3);
assertEqual("Exercise 3: race log length", raceLog.length, 12);
assertEqual("Exercise 3: race first entry", raceLog[0], "A read 0");

// --- Mutex ---

// Exercise 4: Mutex — protect a critical section with acquire/release/runExclusive
// TODO: Implement a lock with a promise queue. runExclusive must use try/finally to always release.
class Mutex {
  constructor() {
    this._locked = false;
    this._queue = [];
  }
  // TODO: resolve immediately if unlocked, otherwise queue the resolver
  async acquire() {}
  // TODO: wake next waiter or set unlocked
  release() {}
  // TODO: acquire, run fn, release in finally block
  async runExclusive(fn) {}
}
const mutex = new Mutex();
const protectedList = [];
await Promise.all([
  mutex.runExclusive(async () => { protectedList.push("a"); }),
  mutex.runExclusive(async () => { protectedList.push("b"); }),
  mutex.runExclusive(async () => { protectedList.push("c"); }),
]);
assertEqual("Exercise 4: mutex serializes access", protectedList, ["a", "b", "c"]);
const throwMutex = new Mutex();
let throwMutexAvailable = false;
await assertThrows("Exercise 4: mutex releases on throw", async () => {
  await throwMutex.runExclusive(() => { throw new Error("boom"); });
});
await throwMutex.runExclusive(() => { throwMutexAvailable = true; });
assertEqual("Exercise 4: mutex available after throw", throwMutexAvailable, true);

// --- Barrier ---

// Exercise 5: Barrier — coordinate N tasks through phases
// TODO: Track waiting count and generation. Last party resolves all waiters and advances generation.
class Barrier {
  constructor(parties) {
    this._parties = parties;
    this._waiting = 0;
    this._resolves = [];
    this._generation = 0;
  }
  // TODO: increment waiting count; if last party, release all; else wait on promise
  async wait() {}
}
const barrierResults = [];
const barrier5 = new Barrier(3);
await Promise.all([
  (async () => { barrierResults.push("A-before"); await barrier5.wait(); barrierResults.push("A-after"); })(),
  (async () => { barrierResults.push("B-before"); await barrier5.wait(); barrierResults.push("B-after"); })(),
  (async () => { barrierResults.push("C-before"); await barrier5.wait(); barrierResults.push("C-after"); })(),
]);
assertEqual("Exercise 5: barrier all-before first",
  barrierResults.slice(0, 3).sort(), ["A-before", "B-before", "C-before"]);
assertEqual("Exercise 5: barrier all-after present", barrierResults.length, 6);
const phaseBarrier = new Barrier(2);
const phaseA = [];
const phaseB = [];
await Promise.all([
  (async () => { phaseA.push(1); await phaseBarrier.wait(); phaseA.push(2); await phaseBarrier.wait(); phaseA.push(3); })(),
  (async () => { phaseB.push(1); await phaseBarrier.wait(); phaseB.push(2); await phaseBarrier.wait(); phaseB.push(3); })(),
]);
assertEqual("Exercise 5: barrier phases A", phaseA, [1, 2, 3]);
assertEqual("Exercise 5: barrier phases B", phaseB, [1, 2, 3]);

// --- Channel ---

// Exercise 6: Channel — send and receive values through a message-passing channel
// TODO: Buffer sends when no waiter; resolve waiters immediately when value available
class Channel {
  constructor() {
    this._buffer = [];
    this._waiters = [];
  }
  // TODO: if waiter exists, resolve it; else buffer the value
  send(value) {}
  // TODO: if buffer has items, return first; else wait on promise
  async receive() {}
}
const ch = new Channel();
const received = [];
await (async () => {
  ch.send(10);
  ch.send(20);
  ch.send(30);
  received.push(await ch.receive());
  received.push(await ch.receive());
  received.push(await ch.receive());
})();
assertEqual("Exercise 6: channel send/receive", received, [10, 20, 30]);
const ch2 = new Channel();
const lateReceived = { value: null };
await Promise.all([
  (async () => { lateReceived.value = await ch2.receive(); })(),
  (async () => { ch2.send(42); })(),
]);
assertEqual("Exercise 6: channel receive waits for send", lateReceived.value, 42);

// --- Safe Counter ---

// Exercise 7: safeCounter — promise-chain serialized counter
// TODO: Chain each increment onto a shared promise so they execute one at a time
function safeCounter() {
  return {
    increment() { return Promise.resolve(); },
    get value() { return 0; },
  };
}
const sc = safeCounter();
await Promise.all([
  (async () => { for (let i = 0; i < 50; i++) await sc.increment(); })(),
  (async () => { for (let i = 0; i < 50; i++) await sc.increment(); })(),
]);
assertEqual("Exercise 7: safeCounter 100 increments", sc.value, 100);
const sc2 = safeCounter();
await sc2.increment();
await sc2.increment();
assertEqual("Exercise 7: safeCounter sequential", sc2.value, 2);

// --- Deadlock Prevention ---

// Exercise 8: acquireOrdered — acquire multiple locks in a consistent global order to prevent deadlock
// TODO: Sort mutexes by id before acquiring to avoid circular wait
class OrderedMutex extends Mutex {
  constructor(id) {
    super();
    this.id = id;
  }
}
async function acquireOrdered(...mutexes) {
  return [];
}
function releaseAll(locked) {
  for (const m of locked) m.release();
}
const lockA = new OrderedMutex(1);
const lockB = new OrderedMutex(2);
const deadlockResults = [];
await Promise.all([
  (async () => {
    const locked = await acquireOrdered(lockA, lockB);
    deadlockResults.push("task1-cs");
    releaseAll(locked);
  })(),
  (async () => {
    const locked = await acquireOrdered(lockB, lockA);
    deadlockResults.push("task2-cs");
    releaseAll(locked);
  })(),
]);
assertEqual("Exercise 8: ordered locks no deadlock", deadlockResults.length, 2);
assertEqual("Exercise 8: ordered locks both completed",
  [...deadlockResults].sort(), ["task1-cs", "task2-cs"]);
