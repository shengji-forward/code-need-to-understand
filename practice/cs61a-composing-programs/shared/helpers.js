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
    const safe = (v) => {
      try { return JSON.stringify(v); }
      catch { return String(v); }
    };
    console.log(`${status}: ${name} — expected ${safe(expected)}, got ${safe(actual)}`);
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

export async function assertThrows(name, fn, expectedMessage) {
  try {
    await fn();
    process.exitCode = 1;
    console.log(`FAIL: ${name} — expected to throw, but did not`);
  } catch (e) {
    if (expectedMessage && !e.message.includes(expectedMessage)) {
      process.exitCode = 1;
      console.log(`FAIL: ${name} — expected message containing "${expectedMessage}", got "${e.message}"`);
    } else {
      console.log(`PASS: ${name}`);
    }
  }
}
