import { assertEqual, assertThrows } from "../../shared/helpers.js";

// Exercise 1: Throw on invalid input
// TODO: Return n / d, but throw Error("division by zero") when d is 0.
function safeDivide(n, d) { return undefined; }
assertEqual("Exercise 1: safeDivide", safeDivide(10, 2), 5);
await assertThrows("Exercise 1: divide by zero", () => safeDivide(10, 0), "division by zero");

// Exercise 2: Catch and recover
// TODO: Return fallback when fn throws; otherwise return fn().
function withFallback(fn, fallback) { return undefined; }
assertEqual("Exercise 2: no error", withFallback(() => 42, 0), 42);
assertEqual("Exercise 2: fallback", withFallback(() => { throw new Error("boom"); }, 0), 0);

// Exercise 3: finally behavior
// TODO: Push "try", "catch", "finally" in the correct order and return the log.
function traceTryCatchFinally(shouldThrow) { return []; }
assertEqual("Exercise 3: no throw", traceTryCatchFinally(false), ["try", "finally"]);
assertEqual("Exercise 3: throw", traceTryCatchFinally(true), ["try", "catch", "finally"]);

// Exercise 4: Custom error subclass
// TODO: Define InterpreterError extends Error with name "InterpreterError".
class InterpreterError extends Error {
  constructor(message) {
    super(message);
    this.name = undefined;
  }
}
const err = new InterpreterError("unbound name: x");
assertEqual("Exercise 4: error name", err.name, "InterpreterError");
assertEqual("Exercise 4: instanceof Error", err instanceof Error, true);

// Exercise 5: Assertion helper use
// TODO: Throw InterpreterError when name is missing from env.
function lookupOrThrow(name, env) { return undefined; }
assertEqual("Exercise 5: lookup", lookupOrThrow("x", { x: 10 }), 10);
await assertThrows("Exercise 5: missing name", () => lookupOrThrow("y", { x: 10 }), "unbound name");

// Exercise 6: Parse error reporting
// TODO: Throw SyntaxError with the unexpected token value in the message.
function expectToken(actual, expectedValue) { return undefined; }
assertEqual("Exercise 6: matching token", expectToken({ value: ")" }, ")"), ")");
await assertThrows("Exercise 6: unexpected token", () => expectToken({ value: "+" }, ")"), "expected )");

// Exercise 7: Error boundary for a tiny evaluator
// TODO: Return { ok: true, value } or { ok: false, error } without throwing.
function runSafely(fn) { return { ok: false, error: undefined }; }
assertEqual("Exercise 7: run success", runSafely(() => 5), { ok: true, value: 5 });
assertEqual("Exercise 7: run failure", runSafely(() => { throw new Error("bad"); }), { ok: false, error: "bad" });
