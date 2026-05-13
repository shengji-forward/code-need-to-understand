/**
 * CS61A Composing Programs - 2.1 Introduction
 * Based on: https://composingprograms.com/pages/21-introduction.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.1-introduction/solutions.js
 */

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// Exercise 1: Type checking with typeof
const typeOfPi = typeof 3.14;
assertEqual("Exercise 1: typeof 3.14", typeOfPi, "number");

// Exercise 2: Number limits — check that 0.1 + 0.2 is NOT exactly 0.3
const floatTrap = (0.1 + 0.2) !== 0.3;
assertEqual("Exercise 2: float precision", floatTrap, true);

// Exercise 3: Integer check — use Number.isInteger()
const isFourInteger = Number.isInteger(4.0);
assertEqual("Exercise 3: Number.isInteger(4.0)", isFourInteger, true);

// Exercise 4: BigInt — compute 2n ** 100n > Number.MAX_SAFE_INTEGER
const bigIntComparison = 2n ** 100n > Number.MAX_SAFE_INTEGER;
assertEqual("Exercise 4: BigInt comparison", bigIntComparison, true);

// Exercise 5: typeof checks — multiple values
const typeArray = [typeof 42, typeof "hello", typeof true, typeof undefined];
assertEqual("Exercise 5: typeof array", typeArray, ["number", "string", "boolean", "undefined"]);
