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
