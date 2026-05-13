// CS61A Composing Programs — 2.3 Sequences
// Adapted from https://composingprograms.com/pages/23-sequences.html
// Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences/solutions.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";
import { tree, label, branches, isLeaf } from "../../shared/tree.js";
import { link, first, rest, isEmpty, listFromArray, listToArray } from "../../shared/linked-list.js";

// --- Exercise 1: combine ---
function combine(a, b) {
  return [...a, ...b];
}

assertEqual("combine([1, 2], [3, 4])", combine([1, 2], [3, 4]), [1, 2, 3, 4]);
assertEqual("combine([], [5])", combine([], [5]), [5]);

// --- Exercise 2: countOccurrence ---
function countOccurrence(arr, value) {
  let count = 0;
  for (const item of arr) {
    if (item === value) count++;
  }
  return count;
}

assertEqual("count [1,8,2,8] for 8", countOccurrence([1, 8, 2, 8], 8), 2);
assertEqual("count [1,8,2,8] for 3", countOccurrence([1, 8, 2, 8], 3), 0);

// --- Exercise 3: myReduce ---
function myReduce(arr, fn, initial) {
  let result = initial;
  for (const item of arr) {
    result = fn(result, item);
  }
  return result;
}

assertEqual("sum via myReduce", myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
assertEqual("product via myReduce", myReduce([2, 4, 8], (a, b) => a * b, 1), 64);

// --- Exercise 4: divisors ---
function divisors(n) {
  return Array.from({ length: n }, (_, i) => i + 1).filter(i => n % i === 0);
}

assertEqual("divisors(12)", divisors(12), [1, 2, 3, 4, 6, 12]);
assertEqual("divisors(7)", divisors(7), [1, 7]);

// --- Exercise 5: countLeaves ---
function countLeaves(t) {
  if (isLeaf(t)) return 1;
  return branches(t).reduce((sum, b) => sum + countLeaves(b), 0);
}

const t1 = tree(1, [tree(2), tree(3, [tree(4), tree(5)])]);
assertEqual("countLeaves", countLeaves(t1), 3);

// --- Exercise 6: sumTreeLabels ---
function sumTreeLabels(t) {
  return label(t) + branches(t).reduce((sum, b) => sum + sumTreeLabels(b), 0);
}

const t2 = tree(1, [tree(2), tree(3, [tree(4)])]);
assertEqual("sumTreeLabels", sumTreeLabels(t2), 10);

// --- Exercise 7: lenLinkRecursive ---
function lenLinkRecursive(s) {
  if (isEmpty(s)) return 0;
  return 1 + lenLinkRecursive(rest(s));
}

assertEqual("lenLinkRecursive([])", lenLinkRecursive(listFromArray([])), 0);
assertEqual("lenLinkRecursive([10, 20, 30])", lenLinkRecursive(listFromArray([10, 20, 30])), 3);

// --- Exercise 8: applyToAllLink ---
function applyToAllLink(f, s) {
  if (isEmpty(s)) return s;
  return link(f(first(s)), applyToAllLink(f, rest(s)));
}

const doubled = applyToAllLink(x => x * 2, listFromArray([1, 2, 3]));
assertEqual("applyToAllLink double", listToArray(doubled), [2, 4, 6]);
