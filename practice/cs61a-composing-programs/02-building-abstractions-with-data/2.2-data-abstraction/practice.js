/**
 * CS61A Composing Programs - 2.2 Data Abstraction
 * Based on: https://composingprograms.com/pages/22-data-abstraction.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.2-data-abstraction/practice.js
 */

import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";

// Exercise 1: Pair operations — demonstrate closure pairs
// TODO: Use pair(), head(), tail() to create and query a pair
const p = pair(10, 20);
assertEqual("Exercise 1: head(pair(10,20))", head(p), 10);
assertEqual("Exercise 1: tail(pair(10,20))", tail(p), 20);
assertEqual("Exercise 1: pair is function", typeof p, "function");

// Exercise 2: GCD helper (needed before makeRational for reduction)
// TODO: Implement gcd using Euclidean algorithm: gcd(a, b) = gcd(b, a % b), base case b === 0
function gcd(a, b) { return undefined; }
assertEqual("Exercise 2: gcd(12, 8)", gcd(12, 8), 4);
assertEqual("Exercise 2: gcd(7, 3)", gcd(7, 3), 1);
assertEqual("Exercise 2: gcd(6, 4)", gcd(6, 4), 2);

// Exercise 3: Rational constructor and selectors — makeRational reduces using gcd
// TODO: Complete makeRational (store reduced n/d using gcd), numer, denom using pair
// Safe stub: makeRational returns a pair-shaped closure so numer/denom don't crash.
function makeRational(n, d) { return (sel) => sel(n, d); } // placeholder: stores raw n, d
function numer(r) { return undefined; }
function denom(r) { return undefined; }
const half = makeRational(1, 2);
assertEqual("Exercise 3: numer(half)", numer(half), 1);
assertEqual("Exercise 3: denom(half)", denom(half), 2);
const reduced = makeRational(6, 4);
assertEqual("Exercise 3: reduced numer", numer(reduced), 3);
assertEqual("Exercise 3: reduced denom", denom(reduced), 2);

// Exercise 4: Rational addition — result is automatically reduced by makeRational
// TODO: Implement addRational using makeRational, numer, denom
// Safe stub: returns a pair-shaped placeholder so numer/denom don't crash.
function addRational(r1, r2) { return (sel) => sel(undefined, undefined); }
const sum = addRational(makeRational(1, 3), makeRational(1, 6));
assertEqual("Exercise 4: 1/3 + 1/6 numer", numer(sum), 1);
assertEqual("Exercise 4: 1/3 + 1/6 denom", denom(sum), 2);

// Exercise 5: Rational multiplication — result is automatically reduced by makeRational
// Safe stub: returns a pair-shaped placeholder so numer/denom don't crash.
function mulRational(r1, r2) { return (sel) => sel(undefined, undefined); }
const product = mulRational(makeRational(2, 3), makeRational(3, 4));
assertEqual("Exercise 5: 2/3 * 3/4 numer", numer(product), 1);
assertEqual("Exercise 5: 2/3 * 3/4 denom", denom(product), 2);

// Exercise 6: Abstraction barrier — verify implementation independence
// Demonstrate that numer/denom work regardless of whether the internal pair
// stores reduced or unreduced values. (No TODO — just run the assertions.)
const r1 = makeRational(4, 6);
assertEqual("Exercise 6: abstraction barrier", numer(r1) / denom(r1), 2 / 3);
