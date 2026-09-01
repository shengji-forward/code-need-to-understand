/**
 * CS61A Composing Programs - 2.4 Mutable Data
 * Based on: https://composingprograms.com/pages/24-mutable-data.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Array mutation — push, pop, splice
// Solved: mutation methods return side-info (length / removed element / removed
// array), never the box — mutate, then return arr. slice READS (copy, no mutation);
// splice WRITES (mutates in place) — one vowel, opposite philosophies.
function manipulateArray(arr) {
  arr.push(4);          // [1,2,3,4]
  arr.pop();            // [1,2,3]   (push+pop = deliberate no-op pair)
  arr.splice(0, 0, 0);  // [0,1,2,3] (insert 0 at index 0)
  return arr;
}
assertEqual("Exercise 1: mutate", manipulateArray([1, 2, 3]), [0, 1, 2, 3]);

// Exercise 2: Object mutation — update properties
// Solved: edit the EXISTING box in place (the Google-Doc effect — every holder
// of this person sees the change); never rebuild a new one when the job is update
function updatePerson(person, name, age) { person.name = name; person.age = age; return person; }
assertEqual("Exercise 2: update", updatePerson({ name: "Alice", age: 30 }, "Bob", 25), { name: "Bob", age: 25 });

// Exercise 3: Closure with state — makeCounter
// Solved: editable memory must be LET (const forbids reassignment — a number has
// no "inside" to mutate, unlike a const array whose contents CAN change).
// The birthplace frame is the memory; the closure is the only key to it.
function makeCounter() { let count = 0; return () => { count += 1; return count; }; }
const counter = makeCounter();
assertEqual("Exercise 3: counter()", counter(), 1);
assertEqual("Exercise 3: counter()", counter(), 2);
assertEqual("Exercise 3: counter()", counter(), 3);

// Exercise 4: makeWithdraw — closure that tracks balance
// TODO: Return a function that deducts amount from balance and returns new balance
// Solved (Way B — explicit memory): the param is copied into an editable let in
// the birthplace frame; the closure is the only key to it. ONE name throughout.
function makeWithdraw(initialBalance) {
  let balance = initialBalance;
  return (amount) => {
    if (amount > balance) return "Insufficient funds";
    balance = balance - amount;
    return balance;
  };
}
const withdraw = makeWithdraw(100);
assertEqual("Exercise 4: withdraw(25)", withdraw(25), 75);
assertEqual("Exercise 4: withdraw(10)", withdraw(10), 65);

// Exercise 5: Dispatch object — create an account dispatch dict
// TODO: Return a dispatch function that handles "deposit" and "withdraw" messages
// Solved: TWO DOORS (the wrap(4)(3) shape). Door 1 takes a MESSAGE and hands out
// the METHOD — the card, uncooked (never call it inside). Door 2 takes the amount
// and runs it. Ghost names lesson: door 1 knows nothing of its caller (acct) or
// door 2's argument (amount). Comments live on their OWN line — // eats to EOL.
function makeAccount(balance) {
  return (msg) => {
    if (msg === "deposit")          // door 1: message picks the card
      return (amount) => { balance += amount; return balance; };
    if (msg === "withdraw")         // your Ex-4 body, relocated
      return (amount) => { if (amount > balance) { return "Insufficient funds"; } balance -= amount; return balance; };
  };
}
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
// Solved: shallow = copy ONE level — primitives by value, nested boxes by
// REFERENCE (shared). { ...obj } alone; deep-copying b would break the leak
// the test demands. Deep copy needs recursion over every nested box.
function shallowCopy(obj) { return { ...obj }; }
const original = { a: 1, b: { c: 2 } };
const copy = shallowCopy(original);
copy.a = 99;
assertEqual("Exercise 7: original.a unchanged", original.a, 1);
copy.b.c = 99;
assertEqual("Exercise 7: original.b.c changed (shallow)", original.b.c, 99);
