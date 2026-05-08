/**
 * Shared helpers for CS61A Composing Programs practice exercises.
 * Provides assertion and utility functions.
 */

import { isDeepStrictEqual } from "node:util";

export function assertEqual(name, actual, expected) {
  const pass = isDeepStrictEqual(actual, expected);
  const status = pass ? "PASS" : "FAIL";
  if (!pass) {
    process.exitCode = 1;
    console.log(`${status}: ${name} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`${status}: ${name}`);
  }
}

export function assertApprox(name, actual, expected, tolerance = 0.0001) {
  const pass = Math.abs(actual - expected) < tolerance;
  const status = pass ? "PASS" : "FAIL";
  if (!pass) {
    process.exitCode = 1;
    console.log(`${status}: ${name} — expected ~${expected}, got ${actual}`);
  } else {
    console.log(`${status}: ${name}`);
  }
}

export function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}
