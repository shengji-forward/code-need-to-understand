// CS61A Composing Programs — 1.1 Getting Started
// Adapted from https://composingprograms.com/pages/11-getting-started.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.1-getting-started/solutions.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// 1. Arithmetic — JavaScript supports standard arithmetic operators.
const result1 = 12 + 8;
assertEqual("arithmetic", result1, 20);

// 2. String concatenation — the + operator also joins strings.
const result2 = "hello" + " " + "world";
assertEqual("string concat", result2, "hello world");

// 3. typeof — every value in JavaScript has a type you can inspect.
const result3 = typeof 42;
assertEqual("typeof number", result3, "number");

// 4. Math.sqrt — the Math object provides common mathematical functions.
const result4 = Math.sqrt(144);
assertEqual("sqrt", result4, 12);

// 5. Circle area — combine constants and arithmetic to solve a problem.
const radius = 5;
const result5 = Math.PI * radius * radius;
assertApprox("circle area", result5, Math.PI * 25);
