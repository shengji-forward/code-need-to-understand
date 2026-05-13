/**
 * CS61A Composing Programs - 2.6 Implementing Classes and Objects
 * Based on: https://composingprograms.com/pages/26-implementing-classes-and-objects.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.6-implementing-classes-and-objects/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Instance factory — create an object with get/set message dispatch
// TODO: Return a dispatch function that handles "get" and "set" messages
function makeInstance() {
  return (msg) => {
    if (msg === "set") return (key, val) => { /* TODO */ };
    if (msg === "get") return (key) => undefined;
    return undefined;
  };
}
const inst = makeInstance();
inst("set")("name", "Alice");
inst("set")("age", 30);
assertEqual("Exercise 1: get name", inst("get")("name"), "Alice");

// Exercise 2: Class factory — makeClass returns a function that creates instances
// TODO: Implement makeClass — should create instances with method dispatch via "send"
function makeClass(methods) {
  const factory = (...args) => {
    return (msg) => {
      if (msg === "send") return (methodName, ...methodArgs) => undefined;
      return undefined;
    };
  };
  factory.methods = methods;
  return factory;
}
const Dog = makeClass({
  init(self, name) { self.name = name; },
  bark(self) { return self.name + " says woof!"; }
});
const d = Dog("Rex");
d("send")("init", "Rex");
assertEqual("Exercise 2: bark", d("send")("bark"), "Rex says woof!");

// Exercise 3: Account via dispatch — reimplement Account with makeClass
const AccountClass = makeClass({
  init(self, holder, balance) { /* TODO: store holder, balance on self */ },
  deposit(self, amount) { /* TODO */ },
  withdraw(self, amount) { /* TODO */ },
  getBalance(self) { /* TODO */ },
});
const a = AccountClass();
a("send")("init", "Alice", 100);
a("send")("deposit", 50);
assertEqual("Exercise 3: balance", a("send")("getBalance"), 150);

// Exercise 4: Method binding — automatic self binding
// TODO: Implement bindMethod that wraps a method to auto-bind self
function bindMethod(instance, methodName, methods) { return undefined; }
// No assertions — this is a helper exercise; correctness is verified in Exercises 3 and 5

// Exercise 5: Inheritance via dispatch — CheckingAccount reuses Account methods
const CheckingClass = makeClass({
  ...AccountClass.methods, // inherit deposit, getBalance
  init(self, holder, balance, fee) { /* TODO */ },
  withdraw(self, amount) { /* TODO: include fee */ },
});
const c = CheckingClass();
c("send")("init", "Bob", 100, 1);
c("send")("withdraw", 20);
assertEqual("Exercise 5: balance with fee", c("send")("getBalance"), 79);

// Exercise 6: Compare class vs dispatch implementations
// Write a brief comparison (no assertion — just a comment exercise)
// TODO: Comment on trade-offs between JS class syntax and dispatch dicts
assertEqual("Exercise 6: comparison exercise", true, true);
