// CS61A Composing Programs — 1.2 Elements of Programming
// Adapted from https://composingprograms.com/pages/12-elements-of-programming.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.2-elements-of-programming/practice.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// =============================================================================
// Exercise 1: Call Expressions
// Call expressions apply a function to arguments: fn(arg1, arg2, ...)
// Math.max takes any number of arguments and returns the largest.
// =============================================================================

const result1 = Math.max(3, 7, 1); // TODO: use Math.max(3, 7, 1)
assertEqual("call expression max", result1, 7);

// =============================================================================
// Exercise 2: Names and the Environment
// Names bind values using const (or let). The environment tracks bindings.
// =============================================================================

const pi = 3.14159;
const circumference = 2 * pi * 10; // TODO: compute 2 * pi * 10
assertApprox("circumference", circumference, 62.8318);

// =============================================================================
// Exercise 3: Nested Expressions
// Expressions can be nested: subexpressions are evaluated first (recursively),
// then the outer function is applied. Think of it as an expression tree.
// =============================================================================

const result3 = Math.pow(2 + 3, 4 - 1); // TODO: compute Math.pow(2 + 3, 4 - 1)
assertEqual("nested expression", result3, 125);

// =============================================================================
// Exercise 4: typeof Checks
// Every value in JavaScript has a type. The typeof operator returns a string
// describing the type of its operand.
// =============================================================================

const type1 = typeof "hello"; // TODO: typeof "hello"
const type2 = typeof true; // TODO: typeof true
assertEqual("typeof string", type1, "string");
assertEqual("typeof boolean", type2, "boolean");

// =============================================================================
// Exercise 5: Pure vs Non-Pure Functions
// Pure functions return values with no side effects (e.g., Math.sqrt).
// Non-pure functions produce side effects (e.g., console.log returns undefined).
// Math.sqrt(16) returns 4, which is a number.
// =============================================================================

const result5 = typeof Math.sqrt(16) === "number"; // TODO: typeof Math.sqrt(16) === "number"
assertEqual("sqrt returns number", result5, true);

console.log("\nAll exercises complete. Fill in the TODOs to make all tests pass.");
