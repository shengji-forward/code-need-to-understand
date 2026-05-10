// CS61A Composing Programs — 1.5 Control
// Adapted from https://composingprograms.com/pages/15-control.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/solutions.js

import { assertEqual } from "../../shared/helpers.js";

// --- Exercise 1: absoluteValue ---
// Return the absolute value of n using if/else (no Math.abs).
function absoluteValue(n) {
  if (n < 0) {
    return -n;
  } else {
    return n;
  }
}

assertEqual("absoluteValue(-5)", absoluteValue(-5), 5);
assertEqual("absoluteValue(5)", absoluteValue(5), 5);
assertEqual("absoluteValue(0)", absoluteValue(0), 0);

// --- Exercise 2: classifyAngle ---
// Return "acute", "right", "obtuse", or "straight" based on the angle in degrees.
function classifyAngle(degrees) {
  if (degrees < 90) {
    return "acute";
  } else if (degrees === 90) {
    return "right";
  } else if (degrees < 180) {
    return "obtuse";
  } else if (degrees === 180) {
    return "straight";
  }
}

assertEqual("classifyAngle(45)", classifyAngle(45), "acute");
assertEqual("classifyAngle(90)", classifyAngle(90), "right");
assertEqual("classifyAngle(120)", classifyAngle(120), "obtuse");
assertEqual("classifyAngle(180)", classifyAngle(180), "straight");

// --- Exercise 3: sumToN ---
// Return the sum of integers from 1 to n using a while loop.
function sumToN(n) {
  let total = 0;
  let i = 1;
  while (i <= n) {
    total += i;
    i++;
  }
  return total;
}

assertEqual("sumToN(5)", sumToN(5), 15);
assertEqual("sumToN(1)", sumToN(1), 1);
assertEqual("sumToN(0)", sumToN(0), 0);

// --- Exercise 4: fibonacci ---
// Return the nth Fibonacci number using an iterative while loop.
function fibonacci(n) {
  if (n === 0) return 0;
  let prev = 0;
  let curr = 1;
  let i = 1;
  while (i < n) {
    let next = prev + curr;
    prev = curr;
    curr = next;
    i++;
  }
  return curr;
}

assertEqual("fibonacci(0)", fibonacci(0), 0);
assertEqual("fibonacci(1)", fibonacci(1), 1);
assertEqual("fibonacci(7)", fibonacci(7), 13);

// --- Exercise 5: countDigits ---
// Return the number of digits in n using a while loop. 0 has 1 digit.
function countDigits(n) {
  if (n === 0) return 1;
  let count = 0;
  let num = Math.abs(n);
  while (num > 0) {
    count++;
    num = Math.floor(num / 10);
  }
  return count;
}

assertEqual("countDigits(12345)", countDigits(12345), 5);
assertEqual("countDigits(0)", countDigits(0), 1);

// --- Exercise 6: isLeapYear ---
// A year is a leap year if divisible by 4 but not 100, unless also divisible by 400.
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

assertEqual("isLeapYear(2000)", isLeapYear(2000), true);
assertEqual("isLeapYear(1900)", isLeapYear(1900), false);
assertEqual("isLeapYear(2024)", isLeapYear(2024), true);
