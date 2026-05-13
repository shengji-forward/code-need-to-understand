// CS61A Composing Programs — 2.1 Introduction
// Adapted from https://composingprograms.com/pages/21-introduction.html
// Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction/solutions.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// 1. typeof — every value has a type you can inspect with typeof.
const type1 = typeof 42;
const type2 = typeof "hello";
const type3 = typeof true;
assertEqual("typeof 42", type1, "number");
assertEqual("typeof 'hello'", type2, "string");
assertEqual("typeof true", type3, "boolean");

// 2. Float approximation — floating-point arithmetic is not exact.
const floatEqual = (0.1 + 0.2) === 0.3;
assertEqual("0.1 + 0.2 === 0.3", floatEqual, false);

// 3. BigInt — use the n suffix for exact large integer arithmetic.
const bigResult = 9007199254740993n + 1n;
assertEqual("bigint addition", bigResult, 9007199254740994n);

// 4. Number.isInteger — check whether a number has no fractional part.
const isInt1 = Number.isInteger(7);
const isInt2 = Number.isInteger(7 / 2);
assertEqual("isInteger(7)", isInt1, true);
assertEqual("isInteger(7/2)", isInt2, false);

// 5. Safe integer boundary — beyond MAX_SAFE_INTEGER, integers collide.
const beyondSafe = (Number.MAX_SAFE_INTEGER + 1) === (Number.MAX_SAFE_INTEGER + 2);
assertEqual("beyond safe integer", beyondSafe, true);

// 6. typeof null quirk — typeof null returns "object", a known JavaScript oddity.
const nullType = typeof null;
assertEqual("typeof null", nullType, "object");
