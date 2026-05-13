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
function sumArray(arr) { return undefined; }
assertEqual("Exercise 1: sumArray", sumArray([1, 2, 3, 4, 5]), 15);

// Exercise 2: Map and filter chains — get squares of even numbers
function evenSquares(arr) { return undefined; }
assertEqual("Exercise 2: evenSquares", evenSquares([1, 2, 3, 4, 5, 6]), [4, 16, 36]);

// Exercise 3: Reduce — implement sum using reduce
function sumReduce(arr) { return undefined; }
assertEqual("Exercise 3: sumReduce", sumReduce([10, 20, 30]), 60);

// Exercise 4: Linked list basics — build and query
const lst = link(1, link(2, link(3)));
assertEqual("Exercise 4: first(lst)", first(lst), 1);
assertEqual("Exercise 4: first(rest(lst))", first(rest(lst)), 2);
assertEqual("Exercise 4: listLength(lst)", listLength(lst), 3);

// Exercise 5: Linked list sum — recursive
function sumList(lst) { return undefined; }
assertEqual("Exercise 5: sumList", sumList(listFromArray([10, 20, 30])), 60);

// Exercise 6: Tree basics — count leaves
function countLeaves(t) { return undefined; }
const t1 = tree(1, [tree(2), tree(3, [tree(4), tree(5)])]);
assertEqual("Exercise 6: countLeaves", countLeaves(t1), 3);

// Exercise 7: Tree map — apply function to all labels
// TODO: Return a new tree with each label doubled
// Safe stub: returns a tree-shaped placeholder so label()/branches() don't crash.
function doubleTree(t) { return tree(undefined, [tree(undefined), tree(undefined)]); }
const t2 = tree(1, [tree(2), tree(3)]);
const doubled = doubleTree(t2);
assertEqual("Exercise 7: label(doubled)", label(doubled), 2);
assertEqual("Exercise 7: label(branches[0])", label(branches(doubled)[0]), 4);

// Exercise 8: Partitions — list all partitions of n using parts up to m
// (Guided: recursive structure given, fill in logic)
// Safe stub: returns [] so .length doesn't crash.
function partitions(n, m) { return []; }
assertEqual("Exercise 8: partitions(6, 4)", partitions(6, 4).length, 9);
