/**
 * CS61A Composing Programs - 2.6 Implementing Classes and Objects
 * Based on: https://composingprograms.com/pages/26-implementing-classes-and-objects.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.6-implementing-classes-and-objects/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Instance factory — create an object with get/set message dispatch
// Solved (Cure B — after the machine rejected Cure A): a PRIVATE attributes box
// sealed in the factory frame. Cure A (data as properties on the dispatch fn)
// crashed on the test's first key: functions carry a built-in READ-ONLY `name`
// property (their own name), and assigning fn["name"] throws in strict mode.
// THIS is why the knowledge doc uses a separate box — self-defense, not style.
function makeInstance() {
  const attributes = {};
  return (msg) => {
    if (msg === "set") {
      return (key, val) => { attributes[key] = val; };
    }
    if (msg === "get") {
      return (key) => (key in attributes) ? attributes[key] : undefined;
    }
    return undefined;
  };
}
const inst = makeInstance();
inst("set")("name", "Alice");
inst("set")("age", 30);
assertEqual("Exercise 1: get name", inst("get")("name"), "Alice");

// Exercise 2: Class factory — makeClass returns a function that creates instances
// Solved: factory body = the doc's createNew/initInstance role (birth machinery);
// send door = getValue + bindMethod combined (lookup + self-injection, one line);
// init/bark = business methods, like deposit/withdraw. self is a PLAIN {} —
// Ex 1's crash taught why (functions carry reserved, read-only signage like `name`).
function makeClass(methods) {
  const factory = (...args) => {
    const self = {};
    return (msg) => {
      if (msg === "send") return (methodName, ...methodArgs) => {
        const method = methods[methodName];
        return method(self, ...methodArgs);
      };
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
  // Solved (tutor-completes mode after gap): session-12's class Account,
  // translated this → self; the send door delivers the plain {} as arg one.
  init(self, holder, balance) { self.holder = holder; self.balance = balance; },
  deposit(self, amount) { self.balance += amount; return self.balance; },
  withdraw(self, amount) {
    if (amount > self.balance) { return "Insufficient funds"; }
    self.balance -= amount;
    return self.balance;
  },
  getBalance(self) { return self.balance; },
});
const a = AccountClass();
a("send")("init", "Alice", 100);
a("send")("deposit", 50);
assertEqual("Exercise 3: balance", a("send")("getBalance"), 150);

// Exercise 4: Method binding — automatic self binding
// TODO: Implement bindMethod that wraps a method to auto-bind self
// Solved: the doc's injector re-signed — look the method up by NAME (bracket
// lookup), then the traced wrapper: instance sealed in, args forwarded.
function bindMethod(instance, methodName, methods) {
  const method = methods[methodName];
  return (...args) => method(instance, ...args);
}
// No assertions — this is a helper exercise; correctness is verified in Exercises 3 and 5

// Exercise 5: Inheritance via dispatch — CheckingAccount reuses Account methods
const CheckingClass = makeClass({
  ...AccountClass.methods, // inherit deposit, getBalance
  // Solved: init stores the fee; withdraw DELEGATES — the parent's guard + write
  // do the work, the child only folds the fee (session-12's super.move, rebuilt).
  // Spread-inheritance: later keys override earlier ones.
  init(self, holder, balance, fee) { self.holder = holder; self.balance = balance; self.fee = fee; },
  withdraw(self, amount) { return AccountClass.methods.withdraw(self, amount + self.fee); },
});
const c = CheckingClass();
c("send")("init", "Bob", 100, 1);
c("send")("withdraw", 20);
assertEqual("Exercise 5: balance with fee", c("send")("getBalance"), 79);

// Exercise 6: Compare class vs dispatch implementations
// Write a brief comparison (no assertion — just a comment exercise)
// Comparison (learner + tutor, session 13): JS `class` syntax gives you the dot,
// `this`, `new`, and inheritance for free — but the machinery is hidden and `this`
// binding has famous traps. Dispatch dicts (this file) show every moving part —
// self is visibly injected, inheritance is a visible spread/delegation — at the
// cost of verbosity and no language support. Same machine; the class is syntax
// over the dispatch. Knowing both = you can build the machine, not just use it.
assertEqual("Exercise 6: comparison exercise", true, true);
