# CS61A Concept Map — 2.5 Object-Oriented Programming

> The "bug smells like which idea?" reference. Pairs with `learning-report.md`.

---

## Big Picture

```text
CLASS = official syntax around the machine you built by hand in 2.4
        │
        ├──  constructor    = the factory's MEMORY-SETUP phase   (this.X = X)
        ├──  methods        = the dispatch table, built-in
        ├──  the dot `.`    = DOOR 1 — the language ate message-passing
        ├──  this           = the RECEIVER — the box before the dot
        └──  new            = run constructor, hand back the instance box

INSTANCE = a box with fields; memory lives ON the box (public by default —
           unlike the closure account's enforced-private birthplace frame)
```

---

## Node 1: The receiver, `this`

```js
acct.deposit(50)      // acct IS this, inside deposit. Nothing is passed.
other.distanceTo(p2)  // this = the left box; p2 = a parameter (the right box)
```

| channel | carries | example |
|---|---|---|
| **`this`** | the box before the dot (implicit) | `this.balance` |
| **parameters** | only what's inside the parens | `mix(other)` — the OTHER instance |

`getBalance(holder)` is the classic confusion — the receiver needs no parameter to reach itself.

## Node 2: constructor — pour parameters into fields

```js
constructor(holder, balance) {
  this.holder = holder;        // the pleasing shape: this.X = X
  this.balance = balance;      // field (left) = parameter (right)
}
```

Traps: hardcoding values (the concrete-value trap) and ghost parameter names. Defaults, if wanted, live here: `constructor(holder, balance = 0)`.

## Node 3: static — the class's toolbox

```js
Formatter.cents(1099);     // called ON THE CLASS. No instance. No this. Ever.
```

- Kin of `Math.sqrt` / `Math.min` — a namespace of functions.
- **NOT** a default instance value (that's constructor defaults) — the test: a static runs with zero instances in the room.
- Sibling delegation: `static price(d, c) { return Formatter.cents(d * 100 + c); }` (the `lcm → gcd` move).

## Node 4: inheritance — extend, super, override

```js
class CheckingAccount extends Account {          // inherit EVERYTHING free
  constructor(holder, balance, fee) {
    super(holder, balance);                      // run the parent's setup first
    this.fee = fee;                              // then the child's extras
  }
  withdraw(amount) { … }                         // OVERRIDE: same name wins here
}
```

- **Override** = same name, new body; the child's version wins for child instances; the parent's remains for plain `Account`s.
- **Delegation** (the pro override): `return super.withdraw(amount + this.fee)` — parent's guard and write, child only folds the fee. Don't duplicate; delegate.

## Node 5: conventions — toString / toJSON

```js
toString() { return `Rectangle(${this.width} x ${this.height})`; }
```

Auto-called by string contexts (`String(rect)`, `` `${rect}` ``, logs). `toJSON` is the JSON sibling — `JSON.stringify(obj)` calls it if present. **Trap:** `JSON.stringify(this)` *inside* `toJSON` recurses forever (stringify calls toJSON, which calls stringify…). Escape: stringify a **plain copy** — `JSON.stringify({ title: this.title })`. And: `${…}` needs **backticks** — single quotes make it dead text.

## Node 6: mixin — compose capabilities

```js
const Serializable = (Base) => class extends Base {
  toJSON() { … }
};
const SerializableBook = Serializable(Book);   // Book + serialization
```

A **class factory** — the closure-factory pattern (`makeAdder`, `wrap`) manufacturing classes. JS has no multiple inheritance; mixins are the answer: stack capabilities (`Serializable(Loggable(Book))`) instead of growing the family tree.

---

## Quick reference

| Term | One sentence |
|---|---|
| **class / instance** | blueprint / box built from it (`new`) |
| **constructor** | runs once at `new`; pours params into fields (`this.X = X`) |
| **`this`** | the receiver — the box before the dot; never a parameter |
| **static** | class-level utility; no instance, no `this` (`Math.sqrt` kin) |
| **override** | child redefines a parent method; same name wins |
| **`super`** | reach the parent: `super(...)` in constructor, `super.method()` to delegate |
| **toString / toJSON** | auto-called serialization conventions (mind the recursion trap) |
| **mixin** | `(Base) => class extends Base` — capability composition, JS's MI answer |

## Bridge: 2.5 → 2.6–2.7

| 2.5 idea | 2.6–2.7 peels it back |
|---|---|
| `class` syntax | dispatch functions + closures UNDER the syntax (you did this in 2.4!) |
| `.` lookup | message passing implemented by hand (`send(obj, "method")`) |
| `toString` convention | `Symbol.toPrimitive` and generic functions / type tags |
| single dispatch | generic functions dispatching on multiple arguments |
