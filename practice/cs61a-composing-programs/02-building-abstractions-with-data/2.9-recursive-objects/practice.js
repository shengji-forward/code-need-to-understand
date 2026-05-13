/**
 * CS61A Composing Programs - 2.9 Recursive Objects
 * Based: https://composingprograms.com/pages/29-recursive-objects.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.9-recursive-objects/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: LinkedList class
// TODO: Implement the LinkedList class with fromArray, length getter, get, and toString
class LinkedList {
  constructor(value, rest = null) {
    this.value = value;
    this.rest = rest;
  }
  static fromArray(arr) {
    // TODO: Build a LinkedList chain from an array
    if (arr.length === 0) return null;
    return new LinkedList(arr[0], arr.length > 1 ? new LinkedList(arr[1]) : null);
  }
  get length() {
    // TODO: Return the number of nodes in the chain
    return 1;
  }
  get(i) {
    // TODO: Return the value at index i
    return undefined;
  }
  toString() {
    // TODO: Return a string like "LinkedList(1, 2, 3)"
    return `LinkedList(${this.value})`;
  }
  map(fn) {
    // TODO: Return a new LinkedList with fn applied to each value
    return undefined;
  }
  filter(pred) {
    // TODO: Return a new LinkedList with only values passing pred
    return undefined;
  }
}
const ll = LinkedList.fromArray([1, 2, 3]);
assertEqual("Exercise 1: length", ll.length, 3);
assertEqual("Exercise 1: get(1)", ll.get(1), 2);
assertEqual("Exercise 1: toString", ll.toString(), "LinkedList(1, 2, 3)");

// Exercise 2: LinkedList map and filter
// TODO: Implement map and filter methods on LinkedList
const doubled = ll.map(x => x * 2);
assertEqual("Exercise 2: map", doubled && doubled.toString ? doubled.toString() : undefined, "LinkedList(2, 4, 6)");
const evens = ll.filter(x => x % 2 === 0);
assertEqual("Exercise 2: filter", evens && evens.toString ? evens.toString() : undefined, "LinkedList(2)");

// Exercise 3: Tree class with isLeaf and fibTree
// TODO: Implement Tree with isLeaf getter and static fibTree
class Tree {
  constructor(label, children = []) {
    this.label = label;
    this.children = children;
  }
  get isLeaf() {
    // TODO: Return true if this node has no children
    return false;
  }
  static fibTree(n) {
    // TODO: Build a Fibonacci tree recursively
    return new Tree(undefined, [new Tree(undefined), new Tree(undefined)]);
  }
}
const t = new Tree(1, [new Tree(2), new Tree(3, [new Tree(4)])]);
assertEqual("Exercise 3: label", t.label, 1);
assertEqual("Exercise 3: children count", t.children.length, 2);
assertEqual("Exercise 3: isLeaf", t.children[0].isLeaf, true);

// Exercise 4: Tree traversal — sumLabels
// TODO: Implement sumLabels that recursively sums all labels in a tree
function sumLabels(t) {
  return t.label;
}
assertEqual("Exercise 4: sumLabels", sumLabels(t), 10);

// Exercise 5: Fibonacci tree verification
const fibTree5 = Tree.fibTree(5);
assertEqual("Exercise 5: fibTree(5) root", fibTree5.label, 5);
assertEqual("Exercise 5: fibTree(5) left", fibTree5.children[0].label, 3);
assertEqual("Exercise 5: fibTree(5) right", fibTree5.children[1].label, 2);

// Exercise 6: BST — contains
// TODO: Implement the contains method for binary search tree lookup
class BST {
  constructor(entry, left = null, right = null) {
    this.entry = entry;
    this.left = left;
    this.right = right;
  }
  contains(val) {
    // TODO: Recursively search for val in the BST
    return false;
  }
  insert(val) {
    // TODO: Insert val into the correct position in the BST
    return undefined;
  }
}
const bst = new BST(5, new BST(3, new BST(1), new BST(4)), new BST(8, null, new BST(9)));
assertEqual("Exercise 6: contains 4", bst.contains(4), true);
assertEqual("Exercise 6: contains 7", bst.contains(7), false);

// Exercise 7: BST insert
// TODO: Implement the insert method on BST
bst.insert(7);
assertEqual("Exercise 7: contains 7 after insert", bst.contains(7), true);

// Exercise 8: BST to sorted array (in-order traversal)
// TODO: Implement bstToArray using in-order traversal
function bstToArray(bst) {
  if (bst === null) return [];
  // TODO: Traverse left, collect entry, traverse right
  return [bst.entry];
}
assertEqual("Exercise 8: bstToArray", bstToArray(bst), [1, 3, 4, 5, 7, 8, 9]);
