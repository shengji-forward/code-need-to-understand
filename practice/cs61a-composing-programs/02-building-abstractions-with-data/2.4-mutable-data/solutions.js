/**
 * CS61A Composing Programs - 2.4 Mutable Data
 * Based on: https://composingprograms.com/pages/24-mutable-data.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.4-mutable-data/solutions.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Array mutation — push, pop, splice
function manipulateArray(arr) {
  arr.push(4);
  arr.pop();
  arr.splice(0, 0, 0);
  return arr;
}
assertEqual("Exercise 1: mutate", manipulateArray([1, 2, 3]), [0, 1, 2, 3]);

// Exercise 2: Object mutation — update properties
function updatePerson(person, name, age) {
  person.name = name;
  person.age = age;
  return person;
}
assertEqual("Exercise 2: update", updatePerson({ name: "Alice", age: 30 }, "Bob", 25), { name: "Bob", age: 25 });

// Exercise 3: Closure with state — makeCounter
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
assertEqual("Exercise 3: counter()", counter(), 1);
assertEqual("Exercise 3: counter()", counter(), 2);
assertEqual("Exercise 3: counter()", counter(), 3);

// Exercise 4: makeWithdraw — closure that tracks balance
function makeWithdraw(initialBalance) {
  let balance = initialBalance;
  return (amount) => {
    balance -= amount;
    return balance;
  };
}
const withdraw = makeWithdraw(100);
assertEqual("Exercise 4: withdraw(25)", withdraw(25), 75);
assertEqual("Exercise 4: withdraw(10)", withdraw(10), 65);

// Exercise 5: Dispatch object — create an account dispatch dict
function makeAccount(balance) {
  return (msg) => {
    if (msg === "deposit") {
      return (amount) => {
        balance += amount;
        return balance;
      };
    } else if (msg === "withdraw") {
      return (amount) => {
        balance -= amount;
        return balance;
      };
    }
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
function shallowCopy(obj) {
  return { ...obj };
}
const original = { a: 1, b: { c: 2 } };
const copy = shallowCopy(original);
copy.a = 99;
assertEqual("Exercise 7: original.a unchanged", original.a, 1);
copy.b.c = 99;
assertEqual("Exercise 7: original.b.c changed (shallow)", original.b.c, 99);
