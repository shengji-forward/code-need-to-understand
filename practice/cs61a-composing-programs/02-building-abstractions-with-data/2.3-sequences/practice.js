/**
 * CS61A Composing Programs - 2.3 Sequences
 * Based on: https://composingprograms.com/pages/23-sequences.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences/practice.js
 */

import { assertEqual, range } from "../../shared/helpers.js";
import { link, first, rest, isEmpty, listLength, listFromArray, listToArray, mapList, filterList } from "../../shared/linked-list.js";
import { tree, label, branches, isLeaf, treeSize, mapTree } from "../../shared/tree.js";

// Exercise 1: Array iteration — sum all elements
// Solved: accumulator + for...of, no index variable
function sumArray(arr) { let sum = 0; for (const x of arr) { sum = sum + x; } return sum; }
assertEqual("Exercise 1: sumArray", sumArray([1, 2, 3, 4, 5]), 15);

// Exercise 2: Map and filter chains — get squares of even numbers
// Solved: filter first (keep evens), then map (square)
function evenSquares(arr) { return arr.filter( n => n % 2 === 0).map( n => n * n); }
assertEqual("Exercise 2: evenSquares", evenSquares([1, 2, 3, 4, 5, 6]), [4, 16, 36]);

// Exercise 3: Reduce — implement sum using reduce
// Solved: the fold — (running, next) => running + next, starting at 0
function sumReduce(arr) { return arr.reduce( (sum, x) => sum + x, 0); }
assertEqual("Exercise 3: sumReduce", sumReduce([10, 20, 30]), 60);

// Exercise 4: Linked list basics — build and query
const lst = link(1, link(2, link(3)));
assertEqual("Exercise 4: first(lst)", first(lst), 1);
assertEqual("Exercise 4: first(rest(lst))", first(rest(lst)), 2);
assertEqual("Exercise 4: listLength(lst)", listLength(lst), 3);

// Exercise 5: Linked list sum — recursive
// Solved: sumTo's skeleton with list fuel — base: empty sum is 0;
// step: first's number + sum of the rest (the shrink)
function sumList(lst) { if(isEmpty(lst)) return 0; return first(lst) + sumList(rest(lst)); }
assertEqual("Exercise 5: sumList", sumList(listFromArray([10, 20, 30])), 60);

// Exercise 6: Tree basics — count leaves
// Solved: base — a leaf IS one leaf (return 1); step — map each branch to its
// own leaf-count, then fold the counts (map over branches(t), recurse on b)
function countLeaves(t) { if (isLeaf(t)) return 1; return branches(t).map(b => countLeaves(b)).reduce((sum, c) => sum + c, 0); }
const t1 = tree(1, [tree(2), tree(3, [tree(4), tree(5)])]);
assertEqual("Exercise 6: countLeaves", countLeaves(t1), 3);

// Exercise 7: Tree map — apply function to all labels
// TODO: Return a new tree with each label doubled
// Solved: structure-PRESERVING recursion — read door (label), compute (×2),
// build door (tree) — and map each branch through the same function (leap of
// faith on b, the branch the map hands you — never the original t)
function doubleTree(t) {
  if (isLeaf(t)) return tree(label(t) * 2);
  return tree(label(t) * 2, branches(t).map(b => doubleTree(b)));
}
const t2 = tree(1, [tree(2), tree(3)]);
const doubled = doubleTree(t2);
assertEqual("Exercise 7: label(doubled)", label(doubled), 2);
assertEqual("Exercise 7: label(branches[0])", label(branches(doubled)[0]), 4);

// Exercise 8: Partitions — list all partitions of n using parts up to m
// Solved: Ch1 countPartitions upgraded from COUNTING to LISTING —
// base: one way (the empty partition) = [[]]; no ways = [] (NOT the same!)
// groups: withM = stamp m in front of each way of the remainder (map builds
// data — no recursion inside this map); withoutM = menu shrinks;
// combine: counts ADD, lists CONCATENATE via spread
function partitions(n, m) {
  if (n === 0) return [[]];
  if (n < 0 || m === 0) return [];
  const withM = partitions(n - m, m).map(p => [m, ...p]);
  const withoutM = partitions(n, m - 1);
  return [...withM, ...withoutM];
}
assertEqual("Exercise 8: partitions(6, 4)", partitions(6, 4).length, 9);
