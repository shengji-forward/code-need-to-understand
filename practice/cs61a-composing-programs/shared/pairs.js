/**
 * Pair data structure for Chapter 2 data abstraction exercises.
 * Uses closures to implement pairs without arrays.
 */

export function pair(a, b) {
  return (selector) => selector(a, b);
}

export function head(p) {
  return p((a, _) => a);
}

export function tail(p) {
  return p((_, b) => b);
}
