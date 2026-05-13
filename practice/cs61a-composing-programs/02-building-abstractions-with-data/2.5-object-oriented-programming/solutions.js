/**
 * CS61A Composing Programs - 2.5 Object-Oriented Programming
 * Based: https://composingprograms.com/pages/25-object-oriented-programming.html
 *
 * Run: node practice/cs61a-composing-programs/02-building-abstractions-with-data/2.5-object-oriented-programming/solutions.js
 */

import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Basic class — define a Point class
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}
const p1 = new Point(0, 0);
const p2 = new Point(3, 4);
assertEqual("Exercise 1: distanceTo", Math.round(p1.distanceTo(p2)), 5);

// Exercise 2: Account class with deposit/withdraw
class Account {
  constructor(holder, balance) {
    this.holder = holder;
    this.balance = balance;
  }
  deposit(amount) { this.balance += amount; return this.balance; }
  withdraw(amount) { this.balance -= amount; return this.balance; }
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
  withdraw(amount) { return super.withdraw(amount + this.fee); }
}
const checking = new CheckingAccount("Bob", 100, 1);
checking.withdraw(20);
assertEqual("Exercise 3: balance after withdraw with fee", checking.getBalance(), 79);

// Exercise 4: super keyword — SavingsAccount with interest
class SavingsAccount extends Account {
  constructor(holder, balance, interestRate) { super(holder, balance); this.interestRate = interestRate; }
  addInterest() { this.balance += this.balance * this.interestRate; return this.balance; }
}
const savings = new SavingsAccount("Carol", 1000, 0.05);
savings.addInterest();
assertEqual("Exercise 4: balance after interest", savings.getBalance(), 1050);

// Exercise 5: toString override
class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
  area() { return this.width * this.height; }
  toString() { return `Rectangle(${this.width} x ${this.height})`; }
}
const rect = new Rectangle(3, 4);
assertEqual("Exercise 5: toString", rect.toString(), "Rectangle(3 x 4)");
assertEqual("Exercise 5: area", rect.area(), 12);

// Exercise 6: Static method
class MathUtils {
  static gcd(a, b) {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
  static lcm(a, b) {
    return (a * b) / MathUtils.gcd(a, b);
  }
}
assertEqual("Exercise 6: gcd", MathUtils.gcd(12, 8), 4);
assertEqual("Exercise 6: lcm", MathUtils.lcm(4, 6), 12);

// Exercise 7: Mixin pattern
const Serializable = (Base) => class extends Base {
  toJSON() { return JSON.stringify({ title: this.title, author: this.author }); }
};
class Book {
  constructor(title, author) { this.title = title; this.author = author; }
}
const SerializableBook = Serializable(Book);
const book = new SerializableBook("SICP", "Abelson");
assertEqual("Exercise 7: toJSON", book.toJSON(), '{"title":"SICP","author":"Abelson"}');
