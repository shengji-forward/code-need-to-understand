import { assertEqual } from "../../shared/helpers.js";
import { pair, head, tail } from "../../shared/pairs.js";
import { EMPTY, link, first, rest, isEmpty, listFromArray, listToArray } from "../../shared/linked-list.js";

// Exercise 1: Pure function
// TODO: Return a new array with each number doubled; do not mutate input.
function doubleAll(nums) { return []; }
const original = [1, 2, 3];
assertEqual("Exercise 1: doubleAll result", doubleAll(original), [2, 4, 6]);
assertEqual("Exercise 1: original unchanged", original, [1, 2, 3]);

// Exercise 2: Compose functions
// TODO: Return a function x => f(g(x)).
function compose(f, g) { return (x) => undefined; }
const add1ThenSquare = compose((x) => x * x, (x) => x + 1);
assertEqual("Exercise 2: compose", add1ThenSquare(4), 25);

// Exercise 3: Closure-based pair transform
// TODO: Return a pair with both elements transformed by fn.
function mapPair(p, fn) { return pair(undefined, undefined); }
const mappedPair = mapPair(pair(2, 3), (x) => x * 10);
assertEqual("Exercise 3: mapPair head", head(mappedPair), 20);
assertEqual("Exercise 3: mapPair tail", tail(mappedPair), 30);

// Exercise 4: Functional list map
// TODO: Recursively map over a linked list without mutation.
function mapFunctionalList(lst, fn) { return EMPTY; }
assertEqual("Exercise 4: map list", listToArray(mapFunctionalList(listFromArray([1, 2, 3]), x => x + 1)), [2, 3, 4]);

// Exercise 5: Symbolic expression representation
// TODO: Build an addition expression as data.
function addExpr(left, right) { return { type: undefined }; }
assertEqual("Exercise 5: addExpr", addExpr("x", 3), { type: "add", left: "x", right: 3 });

// Exercise 6: Evaluate symbolic arithmetic
// TODO: Evaluate number literals and add/mul expression objects.
function evalSymbolic(expr) { return undefined; }
const symbolic = { type: "mul", left: { type: "add", left: 2, right: 3 }, right: 4 };
assertEqual("Exercise 6: eval symbolic", evalSymbolic(symbolic), 20);

// Exercise 7: Substitute symbols
// TODO: Replace string symbols using env, recursively through add/mul expression objects.
function substitute(expr, env) { return expr; }
const expr = { type: "add", left: "x", right: { type: "mul", left: "y", right: 2 } };
assertEqual("Exercise 7: substitute", substitute(expr, { x: 10, y: 5 }), { type: "add", left: 10, right: { type: "mul", left: 5, right: 2 } });
