// CS61A Composing Programs — 2.3 Sequences
// Adapted from https://composingprograms.com/pages/23-sequences.html
// Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences/practice.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { tree, label, branches, isLeaf } from "../../shared/tree.js";
import { link, first, rest, isEmpty, listFromArray, listToArray } from "../../shared/linked-list.js";

// --- Exercise 1: combine ---
// Use the spread operator to combine two arrays into a new one.
function combine(a, b) {
  return undefined; // TODO
}

assertEqual("combine([1, 2], [3, 4])", combine([1, 2], [3, 4]), [1, 2, 3, 4]);
assertEqual("combine([], [5])", combine([], [5]), [5]);

// --- Exercise 2: countOccurrence ---
// Count how many times value appears in an array using for...of.
function countOccurrence(arr, value) {
  return undefined; // TODO
}

assertEqual("count [1,8,2,8] for 8", countOccurrence([1, 8, 2, 8], 8), 2);
assertEqual("count [1,8,2,8] for 3", countOccurrence([1, 8, 2, 8], 3), 0);

// --- Exercise 3: myReduce ---
// Implement reduce: apply fn(accumulator, element) for each element,
// starting with initial. Do NOT use Array.prototype.reduce.
function myReduce(arr, fn, initial) {
  return undefined; // TODO
}

assertEqual("sum via myReduce", myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
assertEqual("product via myReduce", myReduce([2, 4, 8], (a, b) => a * b, 1), 64);

// --- Exercise 4: divisors ---
// Return an array of all divisors of n from 1 to n inclusive.
// Hint: create an array [1, 2, ..., n] and filter.
function divisors(n) {
  return undefined; // TODO
}

assertEqual("divisors(12)", divisors(12), [1, 2, 3, 4, 6, 12]);
assertEqual("divisors(7)", divisors(7), [1, 7]);

// --- Exercise 5: countLeaves ---
// Count the number of leaf nodes in a tree.
// A leaf has no branches (isLeaf returns true).
function countLeaves(t) {
  return undefined; // TODO
}

const t1 = tree(1, [tree(2), tree(3, [tree(4), tree(5)])]);
assertEqual("countLeaves", countLeaves(t1), 3);

// --- Exercise 6: sumTreeLabels ---
// Sum all labels in a tree recursively.
function sumTreeLabels(t) {
  return undefined; // TODO
}

const t2 = tree(1, [tree(2), tree(3, [tree(4)])]);
assertEqual("sumTreeLabels", sumTreeLabels(t2), 10);

// --- Exercise 7: lenLinkRecursive ---
// Compute the length of a linked list recursively.
// isEmpty(s) checks for the empty list; rest(s) returns the remainder.
function lenLinkRecursive(s) {
  return undefined; // TODO
}

assertEqual("lenLinkRecursive([])", lenLinkRecursive(listFromArray([])), 0);
assertEqual("lenLinkRecursive([10, 20, 30])", lenLinkRecursive(listFromArray([10, 20, 30])), 3);

// --- Exercise 8: applyToAllLink ---
// Apply function f to every element of a linked list, returning a new
// linked list. Use link(first, rest) to construct the result.
function applyToAllLink(f, s) {
  return undefined; // TODO
}

const doubled = applyToAllLink(x => x * 2, listFromArray([1, 2, 3]));
assertEqual("applyToAllLink double", listToArray(doubled), [2, 4, 6]);
