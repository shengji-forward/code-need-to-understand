import { assertEqual, assertThrows } from "../../shared/helpers.js";

// --- Split Work ---

// Exercise 1: splitWork — split items into contiguous chunks for N workers
function splitWork(items, workerCount) {
  const chunks = [];
  const baseSize = Math.floor(items.length / workerCount);
  const extra = items.length % workerCount;
  let idx = 0;
  for (let i = 0; i < workerCount; i++) {
    const size = baseSize + (i < extra ? 1 : 0);
    chunks.push(items.slice(idx, idx + size));
    idx += size;
  }
  return chunks;
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
async function parallelMap(items, mapper, workerCount = 2) {
  const chunks = splitWork(items, workerCount);
  const mappedChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const results = [];
      for (const item of chunk) {
        results.push(await mapper(item));
      }
      return results;
    })
  );
  return mappedChunks.flat();
}
const pm1 = await parallelMap([1, 2, 3, 4], (x) => x * 2);
assertEqual("Exercise 2: parallelMap doubles", pm1, [2, 4, 6, 8]);
const pm2 = await parallelMap([], (x) => x);
assertEqual("Exercise 2: parallelMap empty", pm2, []);
const pm3 = await parallelMap([1, 2, 3], (x) => x * 3, 5);
assertEqual("Exercise 2: parallelMap more workers than items", pm3, [3, 6, 9]);

// --- Simulate Race ---

// Exercise 3: simulateRace — deterministic interleaving of two generator functions
function simulateRace(taskA, taskB) {
  const genA = taskA();
  const genB = taskB();
  let doneA = false;
  let doneB = false;
  const log = [];
  while (!doneA || !doneB) {
    if (!doneA) {
      const { value, done } = genA.next();
      if (done) doneA = true;
      else log.push(value);
    }
    if (!doneB) {
      const { value, done } = genB.next();
      if (done) doneB = true;
      else log.push(value);
    }
  }
  return log;
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
class Mutex {
  constructor() {
    this._locked = false;
    this._queue = [];
  }
  acquire() {
    return new Promise((resolve) => {
      if (!this._locked) {
        this._locked = true;
        resolve();
      } else {
        this._queue.push(resolve);
      }
    });
  }
  release() {
    if (this._queue.length > 0) {
      const next = this._queue.shift();
      next();
    } else {
      this._locked = false;
    }
  }
  async runExclusive(fn) {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
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
class Barrier {
  constructor(parties) {
    this._parties = parties;
    this._waiting = 0;
    this._resolves = [];
    this._generation = 0;
  }
  async wait() {
    const gen = this._generation;
    this._waiting++;
    if (this._waiting === this._parties) {
      this._waiting = 0;
      this._generation++;
      const resolves = this._resolves;
      this._resolves = [];
      for (const r of resolves) r();
      return;
    }
    return new Promise((resolve) => {
      this._resolves.push(resolve);
    });
  }
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
const blockBarrier = new Barrier(2);
let blockPassed = false;
const blockPromise = (async () => { await blockBarrier.wait(); blockPassed = true; })();
await Promise.resolve();
assertEqual("Exercise 5: barrier blocks incomplete party", blockPassed, false);
await blockBarrier.wait();
await blockPromise;
assertEqual("Exercise 5: barrier releases on full party", blockPassed, true);

// --- Channel ---

// Exercise 6: Channel — send and receive values through a message-passing channel
class Channel {
  constructor() {
    this._buffer = [];
    this._waiters = [];
  }
  send(value) {
    if (this._waiters.length > 0) {
      const resolve = this._waiters.shift();
      resolve(value);
    } else {
      this._buffer.push(value);
    }
  }
  receive() {
    if (this._buffer.length > 0) {
      return Promise.resolve(this._buffer.shift());
    }
    return new Promise((resolve) => {
      this._waiters.push(resolve);
    });
  }
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
function safeCounter() {
  let value = 0;
  let queue = Promise.resolve();
  return {
    increment() {
      queue = queue.then(() => { value++; });
      return queue;
    },
    get value() { return value; },
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
class OrderedMutex extends Mutex {
  constructor(id) {
    super();
    this.id = id;
  }
}
async function acquireOrdered(...mutexes) {
  const sorted = [...mutexes].sort((a, b) => a.id - b.id);
  for (const m of sorted) {
    await m.acquire();
  }
  return sorted;
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
const lockC = new OrderedMutex(3);
const lockD = new OrderedMutex(1);
const lockE = new OrderedMutex(2);
const sortedLocks = await acquireOrdered(lockC, lockD, lockE);
assertEqual("Exercise 8: acquireOrdered sorts by id",
  sortedLocks.map(m => m.id), [1, 2, 3]);
assertEqual("Exercise 8: locks held after acquire",
  [lockD._locked, lockE._locked, lockC._locked], [true, true, true]);
releaseAll(sortedLocks);
assertEqual("Exercise 8: locks released after releaseAll",
  [lockD._locked, lockE._locked, lockC._locked], [false, false, false]);
