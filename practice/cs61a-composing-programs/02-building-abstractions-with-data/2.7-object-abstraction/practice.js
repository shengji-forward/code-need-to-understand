/**
 * CS61A Composing Programs - 2.7 Object Abstraction
 * Based on: https://composingprograms.com/pages/27-object-abstraction.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.7-object-abstraction/practice.js
 */

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// Exercise 1: toString/valueOf for Rational class
// TODO: Implement toString to return "n/d" and valueOf to return n/d as decimal
class Rational {
  constructor(n, d) { this.n = n; this.d = d; }
  toString() { return undefined; }
  valueOf() { return undefined; }
}
const r = new Rational(3, 4);
assertEqual("Exercise 1: toString", r.toString(), "3/4");
assertApprox("Exercise 1: valueOf", r.valueOf(), 0.75);

// Exercise 2: Iterable Range class with Symbol.iterator
// TODO: Implement Symbol.iterator to yield start..end-1
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() { return [][Symbol.iterator](); }
}
const nums = new Range(1, 4);
assertEqual("Exercise 2: spread Range", [...nums], [1, 2, 3]);

// Exercise 3: Type dispatch — addNumber handles "rational" and "complex" types
// TODO: Implement addNumber to dispatch on typeTag for "rational" and "complex"
function addNumber(a, b) { return undefined; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
const r1 = { typeTag: "rational", value: [1, 2] };
const r2 = { typeTag: "rational", value: [1, 3] };
assertEqual("Exercise 3: add rationals", addNumber(r1, r2), { typeTag: "rational", value: [5, 6] });
assertEqual("Exercise 3: add complex", addNumber({ typeTag: "complex", value: [1, 2] }, { typeTag: "complex", value: [3, 4] }), { typeTag: "complex", value: [4, 6] });

// Exercise 4: Temperature class with getter/setter for fahrenheit
// TODO: Implement fahrenheit getter and setter using _celsius
class Temperature {
  constructor(celsius) { this._celsius = celsius; }
  get fahrenheit() { return undefined; }
  set fahrenheit(f) { /* TODO */ }
  get celsius() { return this._celsius; }
}
const temp = new Temperature(0);
assertEqual("Exercise 4: fahrenheit", temp.fahrenheit, 32);
temp.fahrenheit = 212;
assertEqual("Exercise 4: celsius after set", temp.celsius, 100);

// Exercise 5: Complex class with Symbol.toPrimitive
// TODO: Implement toString and Symbol.toPrimitive for number/string hints
class Complex {
  constructor(real, imag) { this.real = real; this.imag = imag; }
  toString() { return undefined; }
  [Symbol.toPrimitive](hint) { return undefined; }
}
const z = new Complex(3, 4);
assertEqual("Exercise 5: toString", z.toString(), "3 + 4i");
assertEqual("Exercise 5: number hint", +z, 5);

// Exercise 6: Generic multiply with coercion
// TODO: Implement multiplyGeneric — coerce "integer" to "rational" [val,1], then multiply
function multiplyGeneric(a, b) { return undefined; }
assertEqual("Exercise 6: rational * integer", multiplyGeneric({ typeTag: "rational", value: [2, 3] }, { typeTag: "integer", value: 6 }), { typeTag: "rational", value: [4, 1] });
