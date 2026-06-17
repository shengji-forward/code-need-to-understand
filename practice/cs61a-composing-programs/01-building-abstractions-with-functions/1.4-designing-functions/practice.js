// CS61A Composing Programs — 1.4 Designing Functions
// Adapted from https://composingprograms.com/pages/14-designing-functions.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/practice.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// --- Exercise 1: clamp ---
// Return low if val < low, high if val > high, otherwise val.
function clamp(val, low, high) {
  return Math.max(low, Math.min(val, high)); // TODO
}

assertEqual("clamp middle", clamp(5, 0, 10), 5);
assertEqual("clamp below", clamp(-3, 0, 10), 0);
assertEqual("clamp above", clamp(15, 0, 10), 10);

// --- Exercise 2: areaBetweenCircles ---
// Return the area of the larger circle minus the area of the smaller circle.
// Define a LOCAL helper function areaOfCircle(r) inside areaBetweenCircles.
function areaBetweenCircles(r1, r2) {
  function areaOfCircle(r) {
    function square(r) {
      return r * r
    }
    return Math.PI * square(r);
  }
  return areaOfCircle(r1) - areaOfCircle(r2); // TODO: define local areaOfCircle helper
}

assertApprox("area between circles", areaBetweenCircles(5, 3), Math.PI * 25 - Math.PI * 9);

// --- Exercise 3: isPrime ---
// For positive integers, check divisibility from 2 up to sqrt(n).
function isPrime(n) {
  return undefined; // TODO
}

assertEqual("7 is prime", isPrime(7), true);
assertEqual("4 is not prime", isPrime(4), false);
assertEqual("1 is not prime", isPrime(1), false);

// --- Helper for Exercise 4 ---
function square(x) {
  return x * x; // TODO: return x * x
}

// --- Exercise 4: distance ---
// Euclidean distance between two points. Use square() and Math.sqrt.
function distance(x1, y1, x2, y2) {
  return Math.sqrt(square(x2 - x1) + square(y2 - y1)); // TODO: Math.sqrt(square(x2 - x1) + square(y2 - y1))
}

assertApprox("distance(0,0,3,4)", distance(0, 0, 3, 4), 5);
