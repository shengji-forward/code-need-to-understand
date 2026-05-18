import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: rangeIterator — manual iterator with next()
function rangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current >= end) {
        return { value: undefined, done: true };
      }
      const value = current;
      current += 1;
      return { value, done: false };
    },
  };
}
const ri = rangeIterator(1, 4);
assertEqual("Exercise 1: first", ri.next(), { value: 1, done: false });
assertEqual("Exercise 1: second", ri.next(), { value: 2, done: false });
assertEqual("Exercise 1: third", ri.next(), { value: 3, done: false });
assertEqual("Exercise 1: exhausted", ri.next(), { value: undefined, done: true });

// Exercise 2: iterableRange — iterable with [Symbol.iterator]()
function iterableRange(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current >= end) {
            return { value: undefined, done: true };
          }
          return { value: current++, done: false };
        },
      };
    },
  };
}
assertEqual("Exercise 2: spread", [...iterableRange(1, 4)], [1, 2, 3]);
assertEqual("Exercise 2: Array.from", Array.from(iterableRange(5, 8)), [5, 6, 7]);

// Exercise 3: take — extract first n elements from any iterable
function take(iterable, n) {
  const result = [];
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}
assertEqual("Exercise 3: take 0", take([1, 2, 3], 0), []);
assertEqual("Exercise 3: take 3 of 4", take([10, 20, 30, 40], 3), [10, 20, 30]);
assertEqual("Exercise 3: take more than available", take([1, 2], 5), [1, 2]);

// Exercise 4: naturals — infinite generator of natural numbers
function* naturals(start = 1) {
  let n = start;
  while (true) {
    yield n;
    n += 1;
  }
}
assertEqual("Exercise 4: naturals from 1", take(naturals(), 5), [1, 2, 3, 4, 5]);
assertEqual("Exercise 4: naturals from 10", take(naturals(10), 3), [10, 11, 12]);

// Exercise 5: fibonacci — infinite generator of Fibonacci numbers
function* fibonacci() {
  let prev = 0;
  let curr = 1;
  while (true) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}
assertEqual("Exercise 5: fibonacci first 8", take(fibonacci(), 8), [0, 1, 1, 2, 3, 5, 8, 13]);

// Exercise 6: mapIterable — lazy map over any iterable
function* mapIterable(iterable, fn) {
  for (const x of iterable) {
    yield fn(x);
  }
}
assertEqual("Exercise 6: map squares", take(mapIterable(naturals(1), x => x * x), 4), [1, 4, 9, 16]);

// Exercise 7: filterIterable — lazy filter over any iterable
function* filterIterable(iterable, pred) {
  for (const x of iterable) {
    if (pred(x)) {
      yield x;
    }
  }
}
assertEqual("Exercise 7: filter evens", take(filterIterable(naturals(1), x => x % 2 === 0), 4), [2, 4, 6, 8]);

// Exercise 8: Stream class — lazy linked list with memoized rest
class Stream {
  constructor(head, restThunk) {
    this.head = head;
    this._restThunk = restThunk;
    this._restEvaluated = false;
    this._rest = null;
  }
  get rest() {
    if (!this._restEvaluated) {
      this._rest = this._restThunk();
      this._restEvaluated = true;
    }
    return this._rest;
  }
}
assertEqual("Exercise 8: stream head", new Stream(42, () => null).head, 42);

const s123 = new Stream(1, () => new Stream(2, () => new Stream(3, () => null)));
assertEqual("Exercise 8: stream traversal", [s123.head, s123.rest.head, s123.rest.rest.head], [1, 2, 3]);

let restCalls = 0;
const memoStream = new Stream(1, () => { restCalls++; return new Stream(2, () => null); });
memoStream.rest;
memoStream.rest;
assertEqual("Exercise 8: rest thunk called once", restCalls, 1);

// Exercise 9: streamMap — transform each stream element lazily
function streamMap(stream, fn) {
  if (stream === null) return null;
  return new Stream(fn(stream.head), () => streamMap(stream.rest, fn));
}
const mapped = streamMap(s123, x => x * 10);
assertEqual("Exercise 9: streamMap", [mapped.head, mapped.rest.head, mapped.rest.rest.head], [10, 20, 30]);

// Exercise 10: streamFilter — filter stream elements lazily
function streamFilter(stream, pred) {
  if (stream === null) return null;
  if (pred(stream.head)) {
    return new Stream(stream.head, () => streamFilter(stream.rest, pred));
  }
  return streamFilter(stream.rest, pred);
}
function naturalsStream(start = 1) {
  return new Stream(start, () => naturalsStream(start + 1));
}
const evens = streamFilter(naturalsStream(1), n => n % 2 === 0);
assertEqual("Exercise 10: streamFilter evens", [evens.head, evens.rest.head, evens.rest.rest.head], [2, 4, 6]);
