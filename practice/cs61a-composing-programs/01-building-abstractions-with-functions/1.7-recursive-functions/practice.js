// CS61A: Composing Programs — 1.7 Recursive Functions
// Adapted from https://composingprograms.com/pages/17-recursive-functions.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.7-recursive-functions/solutions.js

import { assertEqual } from "../../shared/helpers.js";

// --- Exercise 1: factorial ---
// Classic recursion: n! = n * (n-1)!, with base case 1! = 1.
function factorial(n) {
  // base case
  if (n === 1) {
    return 1
  }
  // recursive step
  else {
    return n * factorial(n - 1)
  }
}

assertEqual("factorial(5)", factorial(5), 120);
assertEqual("factorial(1)", factorial(1), 1);

// --- Exercise 2: sumToN ---
// Recursive sum: 1 + 2 + ... + n
function sumToN(n) {
  // base case
  if (n === 1) {
    return 1
  }
  // recursive step
  else {
    return n + sumToN(n - 1)
  }
}

assertEqual("sumToN(5)", sumToN(5), 15);
assertEqual("sumToN(1)", sumToN(1), 1);

// --- Exercise 3: Mutual recursion (isEven / isOdd) ---
// Two functions that call each other.
// isEven(0) = true; isEven(n) = isOdd(n - 1)
// isOdd(0) = false; isOdd(n) = isEven(n - 1)
function isEven(n) {
  // base case
  if (n === 0) return true
  // recursive step
  else return isOdd(n - 1)
}

function isOdd(n) {
  // base case
  if (n === 0) return false
  // recursive step
  else return isEven(n - 1)
}

assertEqual("isEven(4)", isEven(4), true);
assertEqual("isOdd(3)", isOdd(3), true);
assertEqual("isEven(3)", isEven(3), false);

// --- Exercise 4: fibonacci ---
// Tree recursion: fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2).
function fibonacci(n) {
  // base case
  if (n === 0 || n === 1) return n
  // recursive step
  else return fibonacci(n - 1) + fibonacci(n - 2)  
}

assertEqual("fibonacci(0)", fibonacci(0), 0);
assertEqual("fibonacci(1)", fibonacci(1), 1);
assertEqual("fibonacci(7)", fibonacci(7), 13);

// --- Exercise 5: countPartitions ---
// Count the number of partitions of n using parts up to m.
// - Base case: n === 0 -> return 1
// - Base case: n < 0 or m <= 0 -> return 0
// - Recursive case: countPartitions(n - m, m) + countPartitions(n, m - 1)
function countPartitions(n, m) {
  if (n === 0) return 1
  else if (n < 0 || m <= 0) return 0
  else return countPartitions(n - m, m) + countPartitions(n, m - 1)
}

assertEqual("countPartitions(6, 4)", countPartitions(6, 4), 9);

// --- Exercise 6: sumDigits ---
// Recursive digit sum using Math.floor(n / 10) and n % 10.
// Do NOT use string methods. Use numeric operations only.
function sumDigits(n) {
  return undefined; // TODO
}

assertEqual("sumDigits(123)", sumDigits(123), 6);
assertEqual("sumDigits(9)", sumDigits(9), 9);

// --- Exercise 7: reverseString ---
// Recursive string reversal: return last char + reverse of the rest.
function reverseString(s) {
  return undefined; // TODO
}

assertEqual('reverseString("hello")', reverseString("hello"), "olleh");
assertEqual('reverseString("a")', reverseString("a"), "a");
