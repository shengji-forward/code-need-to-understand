// CS61A Composing Programs — 1.6 Higher-Order Functions
// Adapted from https://composingprograms.com/pages/16-higher-order-functions.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.6-higher-order-functions/practice.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// --- Exercise 1: applyTwice ---
// Apply function f to x, then apply f to the result.
// function applyTwice(f, x) {
//   const once = f(x)
//   return f(once)
// }

function applyTwice(f, x) {
  return f(f(x))
}

assertEqual("applyTwice(x => x + 1, 5)", applyTwice(x => x + 1, 5), 7);
assertEqual("applyTwice(x => x * x, 2)", applyTwice(x => x * x, 2), 16);

// --- Exercise 2: makeAdder ---
// Return a function that adds n to its argument.
function makeAdder(n) {
  return (x) => x + n
}

const add5 = makeAdder(5);
assertEqual("makeAdder(5)(3)", add5(3), 8);

// --- Exercise 3: compose ---
// Return a function that applies g then f: x => f(g(x)).
function compose(f, g) {
  return (x) => f(g(x))
}

const doubleThenSquare = compose(x => x * x, x => x * 2);
assertEqual("compose(square, double)(3)", doubleThenSquare(3), 36);

// --- Exercise 4: myMap ---
// Implement map using a loop. Do NOT use Array.prototype.map.
function myMap(arr, f) {
  return undefined; // TODO
}

assertEqual("myMap([1, 2, 3], x => x * 2)", myMap([1, 2, 3], x => x * 2), [2, 4, 6]);

// --- Exercise 5: myFilter ---
// Implement filter using a loop. Do NOT use Array.prototype.filter.
function myFilter(arr, predicate) {
  return undefined; // TODO
}

assertEqual("myFilter([1, 2, 3, 4, 5], x => x > 3)", myFilter([1, 2, 3, 4, 5], x => x > 3), [4, 5]);

// --- Exercise 6: curry2 ---
// Convert a two-argument function f(a, b) into curried form: a => b => f(a, b).
function curry2(f) {
  return () => () => undefined; // TODO
}

const curriedAdd = curry2((a, b) => a + b);
assertEqual("curry2(add)(3)(4)", curriedAdd(3)(4), 7);

// --- Exercise 7: repeated ---
// Return a function that applies f n times to its argument.
function repeated(f, n) {
  return () => undefined; // TODO
}

const doubleThrice = repeated(x => x * 2, 3);
assertEqual("repeated(double, 3)(1)", doubleThrice(1), 8);
assertEqual("repeated(inc, 0)(10)", repeated(x => x + 1, 0)(10), 10);

// --- Exercise 8: improve ---
// Guided iterative improvement: repeatedly apply update to guess until close(guess) is true.
function improve(update, close, guess) {
  while (!close(guess)) {
    return undefined; // TODO: replace with guess = update(guess)
  }
  return guess;
}

assertEqual("improve simple", improve(x => x + 1, x => x >= 5, 0), 5);
// Newton's method square root example:
assertApprox("improve sqrt(2)", improve(g => (g + 2 / g) / 2, g => Math.abs(g * g - 2) < 0.0001, 1), Math.sqrt(2));
