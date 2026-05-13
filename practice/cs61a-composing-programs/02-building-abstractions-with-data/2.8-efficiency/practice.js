/**
 * CS61A Composing Programs - 2.8 Efficiency
 * Based: https://composingprograms.com/pages/28-efficiency.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.8-efficiency/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Call counter — HOF that wraps fn to count calls
// TODO: Return a wrapped function with a .callCount property that increments on each call
function countCalls(fn) {
  function wrapper(...args) {
    // TODO: increment callCount and call fn
    return fn(...args);
  }
  wrapper.callCount = 0;
  return wrapper;
}
const countedFact = countCalls(function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); });
countedFact(5);
assertEqual("Exercise 1: call count for factorial(5)", countedFact.callCount, 1);

// Exercise 2: Memoize — cache function results
// TODO: Cache results by argument so repeated calls with the same n return from cache
function memoize(fn) {
  // TODO: create a cache (Map) and return a memoized wrapper
  return (n) => fn(n);
}
let fibCalls = 0;
const memoFib = memoize(function fib(n) {
  fibCalls++;
  return n <= 1 ? n : memoFib(n - 1) + memoFib(n - 2);
});
assertEqual("Exercise 2: fib(10)", memoFib(10), 55);
assertEqual("Exercise 2: fib calls <= 11", fibCalls <= 11, true);

// Exercise 3: Linear exponentiation — b^n in O(n)
// TODO: Implement exp recursively — multiply b by exp(b, n-1), base case n===0 returns 1
function exp(b, n) {
  // TODO
  return 1;
}
assertEqual("Exercise 3: exp(2, 10)", exp(2, 10), 1024);

// Exercise 4: Fast exponentiation (successive squaring) — b^n in O(log n)
// TODO: If n is even, square b and halve n; if odd, factor out one b and recurse
function fastExp(b, n) {
  // TODO
  return 1;
}
assertEqual("Exercise 4: fastExp(2, 10)", fastExp(2, 10), 1024);
assertEqual("Exercise 4: fastExp(3, 5)", fastExp(3, 5), 243);

// Exercise 5: Count steps — return [result, steps] for exp
// TODO: Compute b^n iteratively and count each multiplication as a step
function expCounted(b, n) {
  // TODO
  return [undefined, undefined];
}
const [result5, steps5] = expCounted(2, 10);
assertEqual("Exercise 5: result", result5, 1024);
assertEqual("Exercise 5: steps", steps5, 10);

// Exercise 6: Count steps — fastExp
// TODO: Compute b^n with successive squaring iteratively, count each loop iteration
function fastExpCounted(b, n) {
  // TODO
  return [undefined, undefined];
}
const [result6, steps6] = fastExpCounted(2, 10);
assertEqual("Exercise 6: result", result6, 1024);
assertEqual("Exercise 6: steps (log)", steps6, 4);

// Exercise 7: Growth category classifier
// TODO: Classify the growth rate based on how steps relates to n
function growthCategory(steps, n) {
  // TODO: return "constant", "logarithmic", "linear", "quadratic", or "exponential"
  return "";
}
assertEqual("Exercise 7: constant", growthCategory(1, 100), "constant");
assertEqual("Exercise 7: linear", growthCategory(100, 100), "linear");
