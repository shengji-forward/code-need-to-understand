/**
 * Linked list data structure for Chapter 2 sequence exercises.
 * Uses the pair abstraction from pairs.js.
 */

import { pair, head, tail } from "./pairs.js";

export const EMPTY = null;

export function link(first, rest = EMPTY) {
  return pair(first, rest);
}

export function first(lst) {
  return head(lst);
}

export function rest(lst) {
  return tail(lst);
}

export function isEmpty(lst) {
  return lst === EMPTY;
}

export function listLength(lst) {
  return isEmpty(lst) ? 0 : 1 + listLength(rest(lst));
}

export function listToString(lst) {
  if (isEmpty(lst)) return "()";
  const parts = [];
  let cur = lst;
  while (!isEmpty(cur)) {
    parts.push(String(first(cur)));
    cur = rest(cur);
  }
  return `(${parts.join(", ")})`;
}

export function listToArray(lst) {
  const arr = [];
  let cur = lst;
  while (!isEmpty(cur)) {
    arr.push(first(cur));
    cur = rest(cur);
  }
  return arr;
}

export function listFromArray(arr) {
  let lst = EMPTY;
  for (let i = arr.length - 1; i >= 0; i--) {
    lst = link(arr[i], lst);
  }
  return lst;
}

export function mapList(lst, fn) {
  return isEmpty(lst) ? EMPTY : link(fn(first(lst)), mapList(rest(lst), fn));
}

export function filterList(lst, pred) {
  if (isEmpty(lst)) return EMPTY;
  if (pred(first(lst))) {
    return link(first(lst), filterList(rest(lst), pred));
  }
  return filterList(rest(lst), pred);
}

export function appendList(a, b) {
  return isEmpty(a) ? b : link(first(a), appendList(rest(a), b));
}
