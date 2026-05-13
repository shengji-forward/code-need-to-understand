/**
 * CS61A Composing Programs - 2.9 Recursive Objects
 * Based on: https://composingprograms.com/pages/29-recursive-objects.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.9-recursive-objects/solutions.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: LinkedList class
class LinkedList {
  constructor(value, rest = null) {
    this.value = value;
    this.rest = rest;
  }
  static fromArray(arr) {
    if (arr.length === 0) return null;
    let result = null;
    for (let i = arr.length - 1; i >= 0; i--) {
      result = new LinkedList(arr[i], result);
    }
    return result;
  }
  get length() {
    if (this.rest === null) return 1;
    return 1 + this.rest.length;
  }
  get(i) {
    if (i === 0) return this.value;
    return this.rest.get(i - 1);
  }
  toString() {
    const parts = [];
    let node = this;
    while (node !== null) {
      parts.push(node.value);
      node = node.rest;
    }
    return `LinkedList(${parts.join(", ")})`;
  }
  map(fn) {
    return new LinkedList(fn(this.value), this.rest ? this.rest.map(fn) : null);
  }
  filter(pred) {
    const restFiltered = this.rest ? this.rest.filter(pred) : null;
    if (pred(this.value)) return new LinkedList(this.value, restFiltered);
    return restFiltered;
  }
}
const ll = LinkedList.fromArray([1, 2, 3]);
assertEqual("Exercise 1: length", ll.length, 3);
assertEqual("Exercise 1: get(1)", ll.get(1), 2);
assertEqual("Exercise 1: toString", ll.toString(), "LinkedList(1, 2, 3)");

// Exercise 2: LinkedList map and filter
const doubled = ll.map(x => x * 2);
assertEqual("Exercise 2: map", doubled.toString(), "LinkedList(2, 4, 6)");
const evens = ll.filter(x => x % 2 === 0);
assertEqual("Exercise 2: filter", evens.toString(), "LinkedList(2)");

// Exercise 3: Tree class with isLeaf and fibTree
class Tree {
  constructor(label, children = []) {
    this.label = label;
    this.children = children;
  }
  get isLeaf() {
    return this.children.length === 0;
  }
  static fibTree(n) {
    if (n <= 1) return new Tree(n);
    const left = Tree.fibTree(n - 1);
    const right = Tree.fibTree(n - 2);
    return new Tree(left.label + right.label, [left, right]);
  }
}
const t = new Tree(1, [new Tree(2), new Tree(3, [new Tree(4)])]);
assertEqual("Exercise 3: label", t.label, 1);
assertEqual("Exercise 3: children count", t.children.length, 2);
assertEqual("Exercise 3: isLeaf", t.children[0].isLeaf, true);

// Exercise 4: Tree traversal — sumLabels
function sumLabels(t) {
  let total = t.label;
  for (const child of t.children) {
    total += sumLabels(child);
  }
  return total;
}
assertEqual("Exercise 4: sumLabels", sumLabels(t), 10);

// Exercise 5: Fibonacci tree verification
const fibTree5 = Tree.fibTree(5);
assertEqual("Exercise 5: fibTree(5) root", fibTree5.label, 5);
assertEqual("Exercise 5: fibTree(5) left", fibTree5.children[0].label, 3);
assertEqual("Exercise 5: fibTree(5) right", fibTree5.children[1].label, 2);

// Exercise 6: BST — contains
class BST {
  constructor(entry, left = null, right = null) {
    this.entry = entry;
    this.left = left;
    this.right = right;
  }
  contains(val) {
    if (val === this.entry) return true;
    if (val < this.entry) return this.left ? this.left.contains(val) : false;
    return this.right ? this.right.contains(val) : false;
  }
  insert(val) {
    if (val < this.entry) {
      if (this.left) this.left.insert(val);
      else this.left = new BST(val);
    } else if (val > this.entry) {
      if (this.right) this.right.insert(val);
      else this.right = new BST(val);
    }
  }
}
const bst = new BST(5, new BST(3, new BST(1), new BST(4)), new BST(8, null, new BST(9)));
assertEqual("Exercise 6: contains 4", bst.contains(4), true);
assertEqual("Exercise 6: contains 7", bst.contains(7), false);

// Exercise 7: BST insert
bst.insert(7);
assertEqual("Exercise 7: contains 7 after insert", bst.contains(7), true);

// Exercise 8: BST to sorted array (in-order traversal)
function bstToArray(bst) {
  if (bst === null) return [];
  return [...bstToArray(bst.left), bst.entry, ...bstToArray(bst.right)];
}
assertEqual("Exercise 8: bstToArray", bstToArray(bst), [1, 3, 4, 5, 7, 8, 9]);
