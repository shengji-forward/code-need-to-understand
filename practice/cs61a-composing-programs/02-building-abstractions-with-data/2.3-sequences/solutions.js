/**
 * CS61A Composing Programs - 2.3 Sequences
 * Based on: https://composingprograms.com/pages/23-sequences.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.3-sequences/solutions.js
 */

import { assertEqual, range } from "../../shared/helpers.js";
import { link, first, rest, isEmpty, listLength, listFromArray, listToArray, mapList, filterList } from "../../shared/linked-list.js";
import { tree, label, branches, isLeaf, treeSize, mapTree } from "../../shared/tree.js";

// Exercise 1: Array iteration — sum all elements
function sumArray(arr) {
  let sum = 0;
  for (const x of arr) { sum += x; }
  return sum;
}
assertEqual("Exercise 1: sumArray", sumArray([1, 2, 3, 4, 5]), 15);

// Exercise 2: Map and filter chains — get squares of even numbers
function evenSquares(arr) {
  return arr.filter(x => x % 2 === 0).map(x => x * x);
}
assertEqual("Exercise 2: evenSquares", evenSquares([1, 2, 3, 4, 5, 6]), [4, 16, 36]);

// Exercise 3: Reduce — implement sum using reduce
function sumReduce(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
assertEqual("Exercise 3: sumReduce", sumReduce([10, 20, 30]), 60);

// Exercise 4: Linked list basics — build and query
const lst = link(1, link(2, link(3)));
assertEqual("Exercise 4: first(lst)", first(lst), 1);
assertEqual("Exercise 4: first(rest(lst))", first(rest(lst)), 2);
assertEqual("Exercise 4: listLength(lst)", listLength(lst), 3);

// Exercise 5: Linked list sum — recursive
function sumList(lst) {
  if (isEmpty(lst)) return 0;
  return first(lst) + sumList(rest(lst));
}
assertEqual("Exercise 5: sumList", sumList(listFromArray([10, 20, 30])), 60);

// Exercise 6: Tree basics — count leaves
function countLeaves(t) {
  if (isLeaf(t)) return 1;
  return branches(t).reduce((sum, b) => sum + countLeaves(b), 0);
}
const t1 = tree(1, [tree(2), tree(3, [tree(4), tree(5)])]);
assertEqual("Exercise 6: countLeaves", countLeaves(t1), 3);

// Exercise 7: Tree map — apply function to all labels
function doubleTree(t) {
  return tree(label(t) * 2, branches(t).map(b => doubleTree(b)));
}
const t2 = tree(1, [tree(2), tree(3)]);
const doubled = doubleTree(t2);
assertEqual("Exercise 7: label(doubled)", label(doubled), 2);
assertEqual("Exercise 7: label(branches[0])", label(branches(doubled)[0]), 4);

// Exercise 8: Partitions — list all partitions of n using parts up to m
function partitions(n, m) {
  if (n === 0) return [[]];
  if (n < 0 || m === 0) return [];
  const withM = partitions(n - m, m).map(p => [m, ...p]);
  const withoutM = partitions(n, m - 1);
  return [...withM, ...withoutM];
}
assertEqual("Exercise 8: partitions(6, 4)", partitions(6, 4).length, 9);
