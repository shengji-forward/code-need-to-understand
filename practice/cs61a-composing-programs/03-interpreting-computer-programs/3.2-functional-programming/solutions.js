import { assertEqual } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";
import { EMPTY, link, first, rest, isEmpty, listFromArray, listToArray } from "../../shared/linked-list.js";

// Exercise 1: Pure function
// Return a new array with each number doubled; do not mutate input.
function doubleAll(nums) {
  return nums.map(n => n * 2);
}
const original = [1, 2, 3];
assertEqual("Exercise 1: doubleAll result", doubleAll(original), [2, 4, 6]);
assertEqual("Exercise 1: original unchanged", original, [1, 2, 3]);

// Exercise 2: Compose functions
// Return a function x => f(g(x)).
function compose(f, g) {
  return (x) => f(g(x));
}
const add1ThenSquare = compose((x) => x * x, (x) => x + 1);
assertEqual("Exercise 2: compose", add1ThenSquare(4), 25);

// Exercise 3: Closure-based pair transform
// Return a pair with both elements transformed by fn.
function mapPair(p, fn) {
  return pair(fn(head(p)), fn(tail(p)));
}
const mappedPair = mapPair(pair(2, 3), (x) => x * 10);
assertEqual("Exercise 3: mapPair head", head(mappedPair), 20);
assertEqual("Exercise 3: mapPair tail", tail(mappedPair), 30);

// Exercise 4: Functional list map
// Recursively map over a linked list without mutation.
function mapFunctionalList(lst, fn) {
  if (isEmpty(lst)) {
    return EMPTY;
  }
  return link(fn(first(lst)), mapFunctionalList(rest(lst), fn));
}
assertEqual("Exercise 4: map list", listToArray(mapFunctionalList(listFromArray([1, 2, 3]), x => x + 1)), [2, 3, 4]);

// Exercise 5: Symbolic expression representation
// Build an addition expression as data.
function addExpr(left, right) {
  return { type: "add", left, right };
}
assertEqual("Exercise 5: addExpr", addExpr("x", 3), { type: "add", left: "x", right: 3 });

// Exercise 6: Evaluate symbolic arithmetic
// Evaluate number literals and add/mul expression objects.
function evalSymbolic(expr) {
  if (typeof expr === "number") {
    return expr;
  }
  if (expr.type === "add") {
    return evalSymbolic(expr.left) + evalSymbolic(expr.right);
  }
  if (expr.type === "mul") {
    return evalSymbolic(expr.left) * evalSymbolic(expr.right);
  }
  return undefined;
}
const symbolic = { type: "mul", left: { type: "add", left: 2, right: 3 }, right: 4 };
assertEqual("Exercise 6: eval symbolic", evalSymbolic(symbolic), 20);

// Exercise 7: Substitute symbols
// Replace string symbols using env, recursively through add/mul expression objects.
function substitute(expr, env) {
  if (typeof expr === "string") {
    return env[expr] ?? expr;
  }
  if (expr && typeof expr === "object") {
    if (expr.type === "add" || expr.type === "mul") {
      return { type: expr.type, left: substitute(expr.left, env), right: substitute(expr.right, env) };
    }
  }
  return expr;
}
const expr = { type: "add", left: "x", right: { type: "mul", left: "y", right: 2 } };
assertEqual("Exercise 7: substitute", substitute(expr, { x: 10, y: 5 }), { type: "add", left: 10, right: { type: "mul", left: 5, right: 2 } });
