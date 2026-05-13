// CS61A Composing Programs — 2.2 Data Abstraction
// Adapted from https://composingprograms.com/pages/22-data-abstraction.html
// Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction/solutions.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";

// --- Exercise 1: myPair, myHead, myTail ---
function myPair(a, b) {
  return (selector) => selector(a, b);
}

function myHead(p) {
  return p((a, _) => a);
}

function myTail(p) {
  return p((_, b) => b);
}

const mp = myPair(3, 7);
assertEqual("myHead(myPair(3, 7))", myHead(mp), 3);
assertEqual("myTail(myPair(3, 7))", myTail(mp), 7);

// --- Exercise 2: makeRational, numer, denom ---
function makeRational(n, d) {
  return pair(n, d);
}

function numer(r) {
  return head(r);
}

function denom(r) {
  return tail(r);
}

const half = makeRational(1, 2);
assertEqual("numer(1/2)", numer(half), 1);
assertEqual("denom(1/2)", denom(half), 2);

// --- Exercise 3: addRationals ---
function addRationals(x, y) {
  return makeRational(
    numer(x) * denom(y) + numer(y) * denom(x),
    denom(x) * denom(y)
  );
}

const sum = addRationals(makeRational(1, 2), makeRational(1, 3));
assertEqual("numer(1/2 + 1/3)", numer(sum), 5);
assertEqual("denom(1/2 + 1/3)", denom(sum), 6);

// --- Exercise 4: mulRationals ---
function mulRationals(x, y) {
  return makeRational(numer(x) * numer(y), denom(x) * denom(y));
}

const product = mulRationals(makeRational(2, 3), makeRational(3, 5));
assertEqual("numer(2/3 * 3/5)", numer(product), 6);
assertEqual("denom(2/3 * 3/5)", denom(product), 15);

// --- Exercise 5: gcd ---
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

assertEqual("gcd(12, 8)", gcd(12, 8), 4);
assertEqual("gcd(15, 10)", gcd(15, 10), 5);
assertEqual("gcd(7, 0)", gcd(7, 0), 7);

// --- Exercise 6: makeRationalReduced ---
function makeRationalReduced(n, d) {
  const g = gcd(n, d);
  return pair(n / g, d / g);
}

const reduced = makeRationalReduced(6, 4);
assertEqual("numer(6/4 reduced)", numer(reduced), 3);
assertEqual("denom(6/4 reduced)", denom(reduced), 2);

// --- Exercise 7: rationalsAreEqual ---
function rationalsAreEqual(x, y) {
  return numer(x) * denom(y) === numer(y) * denom(x);
}

assertEqual("1/2 === 3/6", rationalsAreEqual(makeRational(1, 2), makeRational(3, 6)), true);
assertEqual("1/2 === 1/3", rationalsAreEqual(makeRational(1, 2), makeRational(1, 3)), false);

// --- Exercise 8: divRationals ---
function divRationals(x, y) {
  return makeRational(numer(x) * denom(y), denom(x) * numer(y));
}

const quotient = divRationals(makeRational(1, 2), makeRational(3, 4));
assertEqual("numer((1/2)/(3/4))", numer(quotient), 4);
assertEqual("denom((1/2)/(3/4))", denom(quotient), 6);
