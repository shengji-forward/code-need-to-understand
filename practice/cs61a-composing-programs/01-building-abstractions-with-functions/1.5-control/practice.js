// CS61A Composing Programs — 1.5 Control
// Adapted from https://composingprograms.com/pages/15-control.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.5-control/solutions.js

import { assertEqual } from "../../shared/helpers.js";

// --- Exercise 1: absoluteValue ---
// Return the absolute value of n using if/else (no Math.abs).
function absoluteValue(n) {
  return undefined; // TODO
}

assertEqual("absoluteValue(-5)", absoluteValue(-5), 5);
assertEqual("absoluteValue(5)", absoluteValue(5), 5);
assertEqual("absoluteValue(0)", absoluteValue(0), 0);

// --- Exercise 2: classifyAngle ---
// Return "acute", "right", "obtuse", or "straight" based on the angle in degrees.
function classifyAngle(degrees) {
  return undefined; // TODO
}

assertEqual("classifyAngle(45)", classifyAngle(45), "acute");
assertEqual("classifyAngle(90)", classifyAngle(90), "right");
assertEqual("classifyAngle(120)", classifyAngle(120), "obtuse");
assertEqual("classifyAngle(180)", classifyAngle(180), "straight");

// --- Exercise 3: sumToN ---
// Return the sum of integers from 1 to n using a while loop.
function sumToN(n) {
  return undefined; // TODO
}

assertEqual("sumToN(5)", sumToN(5), 15);
assertEqual("sumToN(1)", sumToN(1), 1);
assertEqual("sumToN(0)", sumToN(0), 0);

// --- Exercise 4: fibonacci ---
// Return the nth Fibonacci number using an iterative while loop.
function fibonacci(n) {
  return undefined; // TODO
}

assertEqual("fibonacci(0)", fibonacci(0), 0);
assertEqual("fibonacci(1)", fibonacci(1), 1);
assertEqual("fibonacci(7)", fibonacci(7), 13);

// --- Exercise 5: countDigits ---
// Return the number of digits in n using a while loop. 0 has 1 digit.
function countDigits(n) {
  return undefined; // TODO
}

assertEqual("countDigits(12345)", countDigits(12345), 5);
assertEqual("countDigits(0)", countDigits(0), 1);

// --- Exercise 6: isLeapYear ---
// A year is a leap year if divisible by 4 but not 100, unless also divisible by 400.
function isLeapYear(year) {
  return undefined; // TODO
}

assertEqual("isLeapYear(2000)", isLeapYear(2000), true);
assertEqual("isLeapYear(1900)", isLeapYear(1900), false);
assertEqual("isLeapYear(2024)", isLeapYear(2024), true);
