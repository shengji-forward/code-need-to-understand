/**
 * CS61A Composing Programs - 2.8 Efficiency
 * Based on: https://composingprograms.com/pages/28-efficiency.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.8-efficiency/solutions.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Call counter — HOF that wraps fn to count calls
function countCalls(fn) {
  function wrapper(...args) {
    wrapper.callCount++;
    return fn(...args);
  }
  wrapper.callCount = 0;
  return wrapper;
}
let countedFact;
countedFact = countCalls(function fact(n) { return n <= 1 ? 1 : n * countedFact(n - 1); });
countedFact(5);
assertEqual("Exercise 1: call count for factorial(5)", countedFact.callCount, 5);

// Exercise 2: Memoize — cache function results
function memoize(fn) {
  const cache = new Map();
  const memoized = (n) => {
    if (cache.has(n)) return cache.get(n);
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
  return memoized;
}
let fibCalls = 0;
const memoFib = memoize(function fib(n) {
  fibCalls++;
  return n <= 1 ? n : memoFib(n - 1) + memoFib(n - 2);
});
assertEqual("Exercise 2: fib(10)", memoFib(10), 55);
assertEqual("Exercise 2: fib calls <= 11", fibCalls <= 11, true);

// Exercise 3: Linear exponentiation — b^n in O(n)
function exp(b, n) {
  if (n === 0) return 1;
  return b * exp(b, n - 1);
}
assertEqual("Exercise 3: exp(2, 10)", exp(2, 10), 1024);

// Exercise 4: Fast exponentiation (successive squaring) — b^n in O(log n)
function fastExp(b, n) {
  if (n === 0) return 1;
  if (n % 2 === 0) return fastExp(b * b, n / 2);
  return b * fastExp(b, n - 1);
}
assertEqual("Exercise 4: fastExp(2, 10)", fastExp(2, 10), 1024);
assertEqual("Exercise 4: fastExp(3, 5)", fastExp(3, 5), 243);

// Exercise 5: Count steps — return [result, steps] for exp
function expCounted(b, n) {
  let result = 1;
  let steps = 0;
  for (let i = 0; i < n; i++) {
    result *= b;
    steps++;
  }
  return [result, steps];
}
const [result5, steps5] = expCounted(2, 10);
assertEqual("Exercise 5: result", result5, 1024);
assertEqual("Exercise 5: steps", steps5, 10);

// Exercise 6: Count steps — fastExp
function fastExpCounted(b, n) {
  let result = 1;
  let steps = 0;
  while (n > 0) {
    if (n % 2 === 1) {
      result *= b;
    }
    b *= b;
    n = Math.floor(n / 2);
    steps++;
  }
  return [result, steps];
}
const [result6, steps6] = fastExpCounted(2, 10);
assertEqual("Exercise 6: result", result6, 1024);
assertEqual("Exercise 6: steps (log)", steps6, 4);

// Exercise 7: Growth category classifier
function growthCategory(steps, n) {
  if (steps === 1) return "constant";
  if (steps === Math.log2(n)) return "logarithmic";
  if (steps === n) return "linear";
  if (steps === n * n) return "quadratic";
  return "exponential";
}
assertEqual("Exercise 7: constant", growthCategory(1, 100), "constant");
assertEqual("Exercise 7: linear", growthCategory(100, 100), "linear");
