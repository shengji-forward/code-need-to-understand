// CS61A Composing Programs — 1.4 Designing Functions
// Adapted from https://composingprograms.com/pages/14-designing-functions.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.4-designing-functions/solutions.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// --- Exercise 1: clamp ---
// Return low if val < low, high if val > high, otherwise val.
function clamp(val, low, high) {
  if (val < low) return low;
  if (val > high) return high;
  return val;
}

assertEqual("clamp middle", clamp(5, 0, 10), 5);
assertEqual("clamp below", clamp(-3, 0, 10), 0);
assertEqual("clamp above", clamp(15, 0, 10), 10);

// --- Exercise 2: areaBetweenCircles ---
// Return the area of the larger circle minus the area of the smaller circle.
// Uses a local helper function areaOfCircle(r).
function areaBetweenCircles(r1, r2) {
  function areaOfCircle(r) {
    return Math.PI * r * r;
  }
  return Math.abs(areaOfCircle(r1) - areaOfCircle(r2));
}

assertApprox("area between circles", areaBetweenCircles(5, 3), Math.PI * 25 - Math.PI * 9);

// --- Exercise 3: isPrime ---
// For positive integers, check divisibility from 2 up to sqrt(n).
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

assertEqual("7 is prime", isPrime(7), true);
assertEqual("4 is not prime", isPrime(4), false);
assertEqual("1 is not prime", isPrime(1), false);

// --- Exercise 4: distance ---
// Euclidean distance between two points using Math.sqrt.
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

assertApprox("distance(0,0,3,4)", distance(0, 0, 3, 4), 5);
