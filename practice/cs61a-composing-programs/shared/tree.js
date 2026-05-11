/**
 * Tree data structure for Chapter 2 tree exercises.
 */

export function tree(label, branches = []) {
  return { label, branches };
}

export function label(t) {
  return t.label;
}

export function branches(t) {
  return t.branches;
}

export function isLeaf(t) {
  return branches(t).length === 0;
}

export function printTree(t, indent = 0) {
  let s = "  ".repeat(indent) + String(label(t)) + "\n";
  for (const b of branches(t)) {
    s += printTree(b, indent + 1);
  }
  return s;
}

export function treeSize(t) {
  return 1 + branches(t).reduce((sum, b) => sum + treeSize(b), 0);
}

export function treeContains(t, val) {
  if (label(t) === val) return true;
  return branches(t).some(b => treeContains(b, val));
}

export function mapTree(t, fn) {
  return tree(fn(label(t)), branches(t).map(b => mapTree(b, fn)));
}
