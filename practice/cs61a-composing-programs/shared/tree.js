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
