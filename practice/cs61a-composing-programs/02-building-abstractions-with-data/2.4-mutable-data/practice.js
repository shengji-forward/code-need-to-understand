/**
 * CS61A Composing Programs - 2.4 Mutable Data
 * Based on: https://composingprograms.com/pages/24-mutable-data.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Array mutation — push, pop, splice
// TODO: push 4, pop last, insert 0 at index 0, return the array
function manipulateArray(arr) {
  return undefined;
}
assertEqual("Exercise 1: mutate", manipulateArray([1, 2, 3]), [0, 1, 2, 3]);

// Exercise 2: Object mutation — update properties
// TODO: update person.name and person.age, return person
function updatePerson(person, name, age) {
  return undefined;
}
assertEqual("Exercise 2: update", updatePerson({ name: "Alice", age: 30 }, "Bob", 25), { name: "Bob", age: 25 });

// Exercise 3: Closure with state — makeCounter
// TODO: Return a function that increments and returns a count each call
// Safe stub: returns a callable so counter() doesn't crash.
function makeCounter() { return () => undefined; }
const counter = makeCounter();
assertEqual("Exercise 3: counter()", counter(), 1);
assertEqual("Exercise 3: counter()", counter(), 2);
assertEqual("Exercise 3: counter()", counter(), 3);

// Exercise 4: makeWithdraw — closure that tracks balance
// TODO: Return a function that deducts amount from balance and returns new balance
// Safe stub: returns a callable so withdraw(25) doesn't crash.
function makeWithdraw(initialBalance) { return (amount) => undefined; }
const withdraw = makeWithdraw(100);
assertEqual("Exercise 4: withdraw(25)", withdraw(25), 75);
assertEqual("Exercise 4: withdraw(10)", withdraw(10), 65);

// Exercise 5: Dispatch object — create an account dispatch dict
// TODO: Return a dispatch function that handles "deposit" and "withdraw" messages
// Safe stub: returns a callable that returns a callable so acct("deposit")(50) doesn't crash.
function makeAccount(balance) { return (msg) => (amount) => undefined; }
const acct = makeAccount(100);
assertEqual("Exercise 5: deposit 50", acct("deposit")(50), 150);
assertEqual("Exercise 5: withdraw 30", acct("withdraw")(30), 120);

// Exercise 6: Reference vs value — demonstrate object identity
const a = { x: 1 };
const b = { x: 1 };
const c = a;
assertEqual("Exercise 6: a === b", a === b, false);
assertEqual("Exercise 6: a === c", a === c, true);

// Exercise 7: Spread/copy — shallow copy an object
// TODO: Return a shallow copy of obj using spread or Object.assign
// Safe stub: deep-copies b, so the "shallow" assertion fails (original.b.c stays 2).
function shallowCopy(obj) { return { ...obj, b: { ...obj.b } }; }
const original = { a: 1, b: { c: 2 } };
const copy = shallowCopy(original);
copy.a = 99;
assertEqual("Exercise 7: original.a unchanged", original.a, 1);
copy.b.c = 99;
assertEqual("Exercise 7: original.b.c changed (shallow)", original.b.c, 99);
