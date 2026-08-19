/**
 * CS61A Composing Programs - 2.2 Data Abstraction
 * Based on: https://www.composingprograms.com/pages/22-data-abstraction.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction/practice.js
 */

import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";

// Exercise 1: Pair operations — demonstrate closure pairs
// Understood + traced: pair returns a closure holding (a, b) in its birthplace
// frame; head/tail feed it selectors. Invented a third selector live:
//   p((a, b) => a + b)  →  30
const p = pair(10, 20);
assertEqual("Exercise 1: head(pair(10,20))", head(p), 10);
assertEqual("Exercise 1: tail(pair(10,20))", tail(p), 20);
assertEqual("Exercise 1: pair is function", typeof p, "function");

// Exercise 2: GCD helper (needed before makeRational for reduction)
// Solved: Euclid via recursion — base case b === 0 returns a; step gcd(b, a % b)
function gcd(a, b) { if (b === 0) return a; return gcd(b, a % b); }
assertEqual("Exercise 2: gcd(12, 8)", gcd(12, 8), 4);
assertEqual("Exercise 2: gcd(7, 3)", gcd(7, 3), 1);
assertEqual("Exercise 2: gcd(6, 4)", gcd(6, 4), 2);

// Exercise 3: Rational constructor and selectors — makeRational reduces using gcd
// Solved: reduce at birth (Future B — normalize inside the door), box = closure pair
function makeRational(n, d) {
  const g = gcd(n, d);
  return pair(n / g, d / g);
}
function numer(r) { return head(r); }
function denom(r) { return tail(r); }
const half = makeRational(1, 2);
assertEqual("Exercise 3: numer(half)", numer(half), 1);
assertEqual("Exercise 3: denom(half)", denom(half), 2);
const reduced = makeRational(6, 4);
assertEqual("Exercise 3: reduced numer", numer(reduced), 3);
assertEqual("Exercise 3: reduced denom", denom(reduced), 2);

// Exercise 4: Rational addition — result is automatically reduced by makeRational
// Solved: byte-for-byte identical to the array-box version — users don't care
// what the box is made of. That is the abstraction barrier working.
function addRational(r1, r2) {
  const newNumer = (numer(r1) * denom(r2)) + (numer(r2) * denom(r1));
  const newDenom = denom(r1) * denom(r2);
  return makeRational(newNumer, newDenom);
}
const sum = addRational(makeRational(1, 3), makeRational(1, 6));
assertEqual("Exercise 4: 1/3 + 1/6 numer", numer(sum), 1);
assertEqual("Exercise 4: 1/3 + 1/6 denom", denom(sum), 2);

// Exercise 5: Rational multiplication — result is automatically reduced by makeRational
// Solved: multiplication is "a fraction OF a fraction" — tops meet tops, bottoms meet
// bottoms, NO cross (the cross exists in addRational only to re-cut piles into
// same-sized pieces; multiplication has no piles to merge, so it has no + either)
function mulRational(r1, r2) {
  const newNumer = numer(r1) * numer(r2);
  const newDenom = denom(r1) * denom(r2);
  return makeRational(newNumer, newDenom);
}
const product = mulRational(makeRational(2, 3), makeRational(3, 4));
assertEqual("Exercise 5: 2/3 * 3/4 numer", numer(product), 1);
assertEqual("Exercise 5: 2/3 * 3/4 denom", denom(product), 2);

// Exercise 6: Abstraction barrier — verify implementation independence
// (No TODO — just run the assertions.)
const r1 = makeRational(4, 6);
assertEqual("Exercise 6: abstraction barrier", numer(r1) / denom(r1), 2 / 3);
