/**
 * CS61A Composing Programs - 2.5 Object-Oriented Programming
 * Based on: https://composingprograms.com/pages/25-object-oriented-programming.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.5-object-oriented-programming/practice.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1 (production edition, replaces Point/distanceTo at learner's request —
// same aim: method reads THIS box's fields + ANOTHER instance's fields, computes,
// returns): Color.mix — blend two colors channel-by-channel, returning a NEW Color
// (mixing must not repaint either ingredient — the rebuild-vs-mutate choice from 2.4).
class Color {
  constructor(r, g, b) {
    this.r = r; this.g = g; this.b = b;
  }
  // Solved: manufacture the result box — new Color(…). The method's own name
  // (mix) is a label on the door, not a value; ghost names can't hold results.
  mix(other) { return new Color((this.r + other.r) / 2, (this.g + other.g) / 2, (this.b + other.b) / 2); }
}
const mixed = new Color(200, 100, 0).mix(new Color(100, 0, 200));
assertEqual("Exercise 1: mix r", mixed.r, 150);
assertEqual("Exercise 1: mix g", mixed.g, 50);
assertEqual("Exercise 1: mix b", mixed.b, 100);

// Exercise 2: Account class with deposit/withdraw
class Account {
  constructor(holder, balance) {
    this.holder = holder;
    this.balance = balance;
  }
  // Solved: parameters pour into fields (this.X = X); the receiver arrives via
  // THIS, never via a parameter — acc.getBalance() needs no arguments.
  deposit(amount) { this.balance += amount; return this.balance; }
  withdraw(amount) { if (amount > this.balance) { return "Insufficient funds"; } this.balance -= amount; return this.balance; }
  getBalance() { return this.balance; }
}
const acc = new Account("Alice", 100);
acc.deposit(50);
assertEqual("Exercise 2: balance after deposit", acc.getBalance(), 150);
acc.withdraw(30);
assertEqual("Exercise 2: balance after withdraw", acc.getBalance(), 120);

// Exercise 3: Inheritance — CheckingAccount extends Account with fee
class CheckingAccount extends Account {
  constructor(holder, balance, fee) { super(holder, balance); this.fee = fee; }
  // Solved: OVERRIDE — same name, new body (fee folded in). Computed-vs-kept
  // lesson: `-` alone computes and DISCARDS; only -= / = writes the box.
  // Pro alternative: return super.withdraw(amount + this.fee) — parent's
  // guard + write, child only folds the fee.
  withdraw(amount) { if (amount > this.balance) return "Insufficient funds"; this.balance -= (amount + this.fee); return this.balance; }
}
const checking = new CheckingAccount("Bob", 100, 1);
checking.withdraw(20);
assertEqual("Exercise 3: balance after withdraw with fee", checking.getBalance(), 79);

// Exercise 4: super keyword — SavingsAccount with interest
class SavingsAccount extends Account {
  constructor(holder, balance, interestRate) { super(holder, balance); this.interestRate = interestRate; }
  // Solved: grows by a fraction of itself — compute (this.balance * rate),
  // keep (+=), report. No parameters: everything lives on the receiver.
  addInterest() { this.balance += (this.balance * this.interestRate); return this.balance; }
}
const savings = new SavingsAccount("Carol", 1000, 0.05);
savings.addInterest();
assertEqual("Exercise 4: balance after interest", savings.getBalance(), 1050);

// Exercise 5: toString override
class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
  // Solved: toString is a BUILT-IN convention — String(obj) / `${obj}` / logging
  // all auto-call it. No ghost helpers: the method IS the formatter.
  area() { return this.width * this.height; }
  toString() { return `Rectangle(${this.width} x ${this.height})`; }
}
const rect = new Rectangle(3, 4);
assertEqual("Exercise 5: toString", rect.toString(), "Rectangle(3 x 4)");
assertEqual("Exercise 5: area", rect.area(), 12);

// Exercise 6 (production edition, replaces MathUtils at learner's request — same
// aim: static methods, one leaning on its sibling): Formatter — the money-display
// utility every e-commerce app has (2.2 lesson: money is integer cents).
// static = belongs to the CLASS (no instance, no this — like Math.sqrt);
// NOT a default instance value (that is constructor default-params).
class Formatter {
  // Extract BOTH parts from the ORIGINAL amount (floor-div for dollars, % 100 for
  // cents — never from each other), zero-pad the part, assemble with the $ literal.
  static cents(amountInCents) {
    const dollars = Math.floor(amountInCents / 100);
    const centsPart = amountInCents % 100;
    const padded = centsPart < 10 ? "0" + centsPart : String(centsPart);
    return `$${dollars}.${padded}`;
  }
  // Sibling delegation, the lcm→gcd move: convert to cents, let the sibling speak.
  static price(dollars, cents) { return Formatter.cents(dollars * 100 + cents); }
}
assertEqual("Exercise 6: cents(1099)", Formatter.cents(1099), "$10.99");
assertEqual("Exercise 6: cents(5) — the zero-pad trap", Formatter.cents(5), "$0.05");
assertEqual("Exercise 6: price(10, 99)", Formatter.price(10, 99), "$10.99");

// Exercise 7: Mixin pattern
// Solved: TEMPLATE LITERAL (backticks!) — ${…} inside single quotes is dead text.
// Trap dodged: JSON.stringify(this) inside toJSON would loop forever (stringify
// finds toJSON and calls it, which calls stringify, which…). The pro alternative:
// JSON.stringify({ title: this.title, author: this.author }) — a plain copy.
const Serializable = (Base) => class extends Base {
  toJSON() { return `{"title":"${this.title}","author":"${this.author}"}`; }
};
class Book {
  constructor(title, author) { this.title = title; this.author = author; }
}
const SerializableBook = Serializable(Book);
const book = new SerializableBook("SICP", "Abelson");
assertEqual("Exercise 7: toJSON", book.toJSON(), '{"title":"SICP","author":"Abelson"}');
