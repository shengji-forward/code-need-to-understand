/**
 * CS61A Composing Programs - 2.7 Object Abstraction
 * Based on: https://composingprograms.com/pages/27-object-abstraction.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.7-object-abstraction/solutions.js
 */

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// Exercise 1: toString/valueOf for Rational class
class Rational {
  constructor(n, d) { this.n = n; this.d = d; }
  toString() { return `${this.n}/${this.d}`; }
  valueOf() { return this.n / this.d; }
}
const r = new Rational(3, 4);
assertEqual("Exercise 1: toString", r.toString(), "3/4");
assertApprox("Exercise 1: valueOf", r.valueOf(), 0.75);

// Exercise 2: Iterable Range class with Symbol.iterator
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  *[Symbol.iterator]() {
    for (let i = this.start; i < this.end; i++) yield i;
  }
}
const nums = new Range(1, 4);
assertEqual("Exercise 2: spread Range", [...nums], [1, 2, 3]);

// Exercise 3: Type dispatch — addNumber handles "rational" and "complex" types
function addNumber(a, b) {
  if (a.typeTag === "rational" && b.typeTag === "rational") {
    const [an, ad] = a.value;
    const [bn, bd] = b.value;
    const num = an * bd + bn * ad;
    const den = ad * bd;
    const g = gcd(num, den);
    return { typeTag: "rational", value: [num / g, den / g] };
  }
  if (a.typeTag === "complex" && b.typeTag === "complex") {
    return { typeTag: "complex", value: [a.value[0] + b.value[0], a.value[1] + b.value[1]] };
  }
  return undefined;
}
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
const r1 = { typeTag: "rational", value: [1, 2] };
const r2 = { typeTag: "rational", value: [1, 3] };
assertEqual("Exercise 3: add rationals", addNumber(r1, r2), { typeTag: "rational", value: [5, 6] });
assertEqual("Exercise 3: add complex", addNumber({ typeTag: "complex", value: [1, 2] }, { typeTag: "complex", value: [3, 4] }), { typeTag: "complex", value: [4, 6] });

// Exercise 4: Temperature class with getter/setter for fahrenheit
class Temperature {
  constructor(celsius) { this._celsius = celsius; }
  get fahrenheit() { return this._celsius * 9 / 5 + 32; }
  set fahrenheit(f) { this._celsius = (f - 32) * 5 / 9; }
  get celsius() { return this._celsius; }
}
const temp = new Temperature(0);
assertEqual("Exercise 4: fahrenheit", temp.fahrenheit, 32);
temp.fahrenheit = 212;
assertEqual("Exercise 4: celsius after set", temp.celsius, 100);

// Exercise 5: Complex class with Symbol.toPrimitive
class Complex {
  constructor(real, imag) { this.real = real; this.imag = imag; }
  toString() {
    if (this.imag >= 0) return `${this.real} + ${this.imag}i`;
    return `${this.real} - ${-this.imag}i`;
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return Math.sqrt(this.real * this.real + this.imag * this.imag);
    return this.toString();
  }
}
const z = new Complex(3, 4);
assertEqual("Exercise 5: toString", z.toString(), "3 + 4i");
assertEqual("Exercise 5: number hint", +z, 5);

// Exercise 6: Generic multiply with coercion
function multiplyGeneric(a, b) {
  const coerce = (x) => x.typeTag === "integer"
    ? { typeTag: "rational", value: [x.value, 1] }
    : x;
  const ca = coerce(a);
  const cb = coerce(b);
  const [an, ad] = ca.value;
  const [bn, bd] = cb.value;
  const num = an * bn;
  const den = ad * bd;
  const g = gcd(Math.abs(num), Math.abs(den));
  return { typeTag: "rational", value: [num / g, den / g] };
}
assertEqual("Exercise 6: rational * integer", multiplyGeneric({ typeTag: "rational", value: [2, 3] }, { typeTag: "integer", value: 6 }), { typeTag: "rational", value: [4, 1] });
