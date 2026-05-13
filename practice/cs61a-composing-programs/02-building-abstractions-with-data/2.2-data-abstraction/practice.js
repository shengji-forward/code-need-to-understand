// CS61A Composing Programs — 2.2 Data Abstraction
// Adapted from https://composingprograms.com/pages/22-data-abstraction.html
// Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction/practice.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";

// --- Exercise 1: myPair, myHead, myTail ---
// Implement a closure-based pair from scratch. myPair(a, b) returns a
// function that takes a selector and calls it with a and b.
function myPair(a, b) {
  return undefined; // TODO: return a function that takes a selector
}

function myHead(p) {
  return undefined; // TODO: call p with a selector that returns the first element
}

function myTail(p) {
  return undefined; // TODO: call p with a selector that returns the second element
}

const mp = myPair(3, 7);
assertEqual("myHead(myPair(3, 7))", myHead(mp), 3);
assertEqual("myTail(myPair(3, 7))", myTail(mp), 7);

// --- Exercise 2: makeRational, numer, denom ---
// Represent a rational number as a pair (numerator, denominator).
// Use the imported pair/head/tail for these.
function makeRational(n, d) {
  return undefined; // TODO
}

function numer(r) {
  return undefined; // TODO
}

function denom(r) {
  return undefined; // TODO
}

const half = makeRational(1, 2);
assertEqual("numer(1/2)", numer(half), 1);
assertEqual("denom(1/2)", denom(half), 2);

// --- Exercise 3: addRationals ---
// Add two rationals: a/b + c/d = (a*d + c*b) / (b*d).
function addRationals(x, y) {
  return undefined; // TODO
}

const sum = addRationals(makeRational(1, 2), makeRational(1, 3));
assertEqual("numer(1/2 + 1/3)", numer(sum), 5);
assertEqual("denom(1/2 + 1/3)", denom(sum), 6);

// --- Exercise 4: mulRationals ---
// Multiply two rationals: a/b * c/d = (a*c) / (b*d).
function mulRationals(x, y) {
  return undefined; // TODO
}

const product = mulRationals(makeRational(2, 3), makeRational(3, 5));
assertEqual("numer(2/3 * 3/5)", numer(product), 6);
assertEqual("denom(2/3 * 3/5)", denom(product), 15);

// --- Exercise 5: gcd ---
// Compute the greatest common divisor using Euclid's algorithm.
// gcd(a, 0) = a; gcd(a, b) = gcd(b, a % b).
function gcd(a, b) {
  return undefined; // TODO
}

assertEqual("gcd(12, 8)", gcd(12, 8), 4);
assertEqual("gcd(15, 10)", gcd(15, 10), 5);
assertEqual("gcd(7, 0)", gcd(7, 0), 7);

// --- Exercise 6: makeRationalReduced ---
// Like makeRational, but reduce to lowest terms using gcd.
function makeRationalReduced(n, d) {
  return undefined; // TODO
}

const reduced = makeRationalReduced(6, 4);
assertEqual("numer(6/4 reduced)", numer(reduced), 3);
assertEqual("denom(6/4 reduced)", denom(reduced), 2);

// --- Exercise 7: rationalsAreEqual ---
// Two rationals are equal if cross-multiplied numerators match.
function rationalsAreEqual(x, y) {
  return undefined; // TODO
}

assertEqual("1/2 === 3/6", rationalsAreEqual(makeRational(1, 2), makeRational(3, 6)), true);
assertEqual("1/2 === 1/3", rationalsAreEqual(makeRational(1, 2), makeRational(1, 3)), false);

// --- Exercise 8: divRationals ---
// Divide two rationals: (a/b) / (c/d) = (a*d) / (b*c).
function divRationals(x, y) {
  return undefined; // TODO
}

const quotient = divRationals(makeRational(1, 2), makeRational(3, 4));
assertEqual("numer((1/2)/(3/4))", numer(quotient), 4);
assertEqual("denom((1/2)/(3/4))", denom(quotient), 6);
