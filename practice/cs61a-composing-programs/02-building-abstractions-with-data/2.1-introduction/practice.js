// CS61A Composing Programs — 2.1 Introduction
// Adapted from https://composingprograms.com/pages/21-introduction.html
// Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction/practice.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// 1. typeof — every value has a type you can inspect with typeof.
const type1 = undefined; // TODO: check typeof 42
const type2 = undefined; // TODO: check typeof "hello"
const type3 = undefined; // TODO: check typeof true
assertEqual("typeof 42", type1, "number");
assertEqual("typeof 'hello'", type2, "string");
assertEqual("typeof true", type3, "boolean");

// 2. Float approximation — floating-point arithmetic is not exact.
//    0.1 + 0.2 does NOT equal 0.3 in JavaScript.
const floatEqual = undefined; // TODO: check if (0.1 + 0.2) === 0.3
assertEqual("0.1 + 0.2 === 0.3", floatEqual, false);

// 3. BigInt — use the n suffix for exact large integer arithmetic.
const bigResult = undefined; // TODO: compute 9007199254740993n + 1n
assertEqual("bigint addition", bigResult, 9007199254740994n);

// 4. Number.isInteger — check whether a number has no fractional part.
const isInt1 = undefined; // TODO: check Number.isInteger(7)
const isInt2 = undefined; // TODO: check Number.isInteger(7 / 2)
assertEqual("isInteger(7)", isInt1, true);
assertEqual("isInteger(7/2)", isInt2, false);

// 5. Safe integer boundary — beyond MAX_SAFE_INTEGER, integers collide.
//    Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 is true.
const beyondSafe = undefined; // TODO: compare (Number.MAX_SAFE_INTEGER + 1) === (Number.MAX_SAFE_INTEGER + 2)
assertEqual("beyond safe integer", beyondSafe, true);

// 6. typeof null quirk — typeof null returns "object", a known JavaScript oddity.
const nullType = undefined; // TODO: check typeof null
assertEqual("typeof null", nullType, "object");
