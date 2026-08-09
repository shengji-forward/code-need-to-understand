# Transcript: Session 05 - 1.5 Control

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides.excalidraw`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Control Flow Matters

[00:00-01:05]

Welcome to Session 05.
This is CS61A section 1.5: Control.

So far, most of our code has moved in a straight line.

Run this expression.
Bind this name.
Call this function.
Return this value.

That is useful.
But real programs need more power.

They need to choose.
They need to repeat.

That is control flow.

In a restaurant, a recipe is not always a straight list.
It can say:

If the soup is too salty, add water.
If the steak is undercooked, cook it longer.
Keep stirring until the sauce is smooth.

Code needs the same ideas.

`if` lets a program choose.
`while` lets a program repeat.

In the vibe coding era, this matters.
AI can write code that looks complete.
But when the code takes the wrong branch or loops forever, you need the fundamentals to debug it.

Today we build that mental model.

---

## Frame 02 - Statements vs Expressions

[01:05-02:15]

CS61A starts this section with an important distinction.

Expressions are evaluated.
Statements are executed.

An expression produces a value.

For example:

```javascript
2 + 3
x * x
Math.sqrt(9)
```

Each one becomes a value.

`2 + 3` becomes `5`.
`Math.sqrt(9)` becomes `3`.

A statement is different.
A statement is an instruction to do something.

Examples:

```javascript
const x = 5;
return x;
if (x > 0) { ... }
```

A statement may contain expressions.
But the statement itself is executed.

Kitchen version:
an expression is like asking, "What is the total price?"
It gives an answer.

A statement is like a kitchen instruction:
"write this on the ticket,"
"send this plate,"
"choose this station."

Programs are built from statements.
Expressions are the values inside those statements.

That difference sounds small.
But it explains many beginner bugs.

---

## Frame 03 - Expression Statements Discard Values

[02:15-03:25]

Here is the classic trap.

In JavaScript, an expression can appear as a statement.

Look at this function:

```javascript
function square(x) {
  x * x;
}
```

This code is valid.
But it does not return the square.

Inside the body, `x * x` is evaluated.
If `x` is `4`, it becomes `16`.

Then JavaScript discards the value.
Nothing keeps it.
Nothing returns it.

So:

```javascript
square(4)
```

returns `undefined`.

To keep a value, we must say what to do with it.

```javascript
function square(x) {
  return x * x;
}
```

The same bug appears in loops.

```javascript
counter + 1;
```

This computes a bigger number.
Then throws it away.

It does not update `counter`.

To update the ticket, you need assignment:

```javascript
counter = counter + 1;
```

Kitchen version:
imagine a cook counts one more order in their head.
But they never write it on the board.
The kitchen board has not changed.

Computation is not enough.
You must return the value or store the value.

---

## Frame 04 - Compound Statements and Clauses

[03:25-04:35]

Now we move from single instructions to compound statements.

A compound statement controls a block of statements.

The shape is:

```javascript
<header> {
  <statement>
  <statement>
}
```

The header and the block together are called a clause.

Examples:

```javascript
if (hungry) {
  cookFood();
}
```

and:

```javascript
while (sauceIsLumpy) {
  stir();
}
```

The header controls the block.

The `if` header decides whether the block runs.
The `while` header decides how many times the block runs.

This is why the section is called control.

Usually, statements run in order.
First statement.
Then next statement.
Then next statement.

But control statements can redirect the flow.

`return` can leave a function early.
`if` can skip a block.
`while` can run a block again and again.

Kitchen version:
normal recipe steps go top to bottom.
But a recipe can contain a decision box.
It can also contain a repeat box.

That is what compound statements give us.

---

## Frame 05 - Conditional Statements

[04:35-05:50]

The first control structure is the conditional statement.

In JavaScript, it looks like this:

```javascript
if (condition) {
  ...
} else if (otherCondition) {
  ...
} else {
  ...
}
```

The rule is simple.

JavaScript checks the clauses in order.

First, it checks the `if`.
If that condition is truthy, it runs that block.
Then it skips the rest.

If the first condition is not truthy, it checks the next one.
If that one is truthy, it runs that block.
Then it skips the rest.

The `else` block only runs if every condition above it failed.

So the first match wins.

Here is an angle example:

```javascript
if (degrees < 90) {
  return "acute";
} else if (degrees === 90) {
  return "right";
} else if (degrees < 180) {
  return "obtuse";
} else {
  return "straight";
}
```

The order matters.
The boundaries matter.

`90` belongs to the right-angle case.
So the first test should be `< 90`, not `<= 90`.

Kitchen version:
the server reads the order rules from top to bottom.
First matching rule gets the ticket.
After that, the ticket does not keep searching.

This is why conditionals must be ordered carefully.

---

## Frame 06 - Boolean Operators and Short-Circuiting

[05:50-07:05]

Conditions often use comparisons.

```javascript
x > 0
degrees === 90
year % 4 === 0
```

These produce booleans:
`true` or `false`.

Use `===` for equality.
Do not use `=` in a condition when you mean compare.

```javascript
if (degrees = 90) { ... }
```

This assigns `90`.
It does not compare.
And because `90` is truthy, the branch runs.

That is a painful bug.

Boolean operators combine conditions.

```javascript
a && b
a || b
!a
```

`&&` means "and."
Both sides must pass.

`||` means "or."
At least one side must pass.

`!` means "not."
It flips truthiness into a boolean.

Important detail:
`&&` and `||` short-circuit.

For `a && b`, if `a` is falsy, JavaScript does not need `b`.

For `a || b`, if `a` is truthy, JavaScript does not need `b`.

Kitchen version:
for a dish that needs "rice and sauce," if there is no rice, stop checking.
The dish cannot go out.

For "cash or card," if the customer already paid cash, you do not ask for a card.

One more beginner trap:
`!n` is not negative `n`.

`!n` flips truthiness.
`-n` flips the sign of a number.

They are completely different tools.

---

## Frame 07 - The While Loop Execution Rule

[07:05-08:15]

The second big control structure is `while`.

`if` chooses a block at most once.
`while` repeats a block many times.

The shape is:

```javascript
while (condition) {
  ...
}
```

Here is the execution rule.

First, evaluate the condition.
If it is truthy, run the whole block.
Then go back and evaluate the condition again.

If it is still truthy, run the block again.
If it is falsy, stop the loop.

That is the whole loop.

The condition is checked before each pass.

Kitchen version:
"while the sauce is lumpy, stir."

Check the sauce.
If lumpy, stir.
Check again.
If still lumpy, stir again.
When it is smooth, stop.

The loop only works if the block changes something.

If stirring never changes the sauce, you never stop.

In code, that is an infinite loop.

---

## Frame 08 - The Loop Recipe

[08:15-09:25]

Every `while` loop needs three ingredients.

Init.
Condition.
Update.

Init means set up the starting state.

Condition means decide whether to keep looping.

Update means change something each pass.

Example:

```javascript
let k = 1;

while (k <= 5) {
  console.log(k);
  k = k + 1;
}
```

`let k = 1` is the init.

`k <= 5` is the condition.

`k = k + 1` is the update.

If you forget the update, `k` stays `1`.
Then `k <= 5` is always true.
The loop never stops.

This is one of the most important beginner loop rules.

Kitchen version:
suppose the restaurant calls each waiting table.
You start at table 1.
You keep going while there are more tables.
After each call, you move to the next table.

If you never move to the next table, you keep calling table 1 forever.

That is the loop recipe.

Start.
Check.
Do.
Update.
Check again.

---

## Frame 09 - Accumulator Pattern

[09:25-10:25]

One common loop pattern is the accumulator.

An accumulator keeps a running answer.

Example:
sum the numbers from `1` to `n`.

```javascript
function sumToN(n) {
  let total = 0;
  let k = 1;

  while (k <= n) {
    total = total + k;
    k = k + 1;
  }

  return total;
}
```

`total` is the accumulator.
It remembers the running sum.

`k` is the counter.
It walks through the numbers.

For `sumToN(5)`, the loop adds:

```text
1, 2, 3, 4, 5
```

The final total is `15`.

Kitchen version:
a cashier totals a bill.
Start with zero.
Add each dish price.
Move to the next item.
When the ticket ends, return the total.

Notice the two jobs:
one variable remembers the answer,
and one variable moves through the work.

That pattern appears everywhere.

---

## Frame 10 - Sliding Window Pattern

[10:25-11:30]

Another loop pattern is the sliding window.

For Fibonacci numbers, each new value depends on the two previous values.

The sequence starts:

```text
0, 1, 1, 2, 3, 5, 8, 13
```

So we track two values:

```javascript
let pred = 0;
let curr = 1;
let k = 1;

while (k < n) {
  let next = pred + curr;
  pred = curr;
  curr = next;
  k = k + 1;
}
```

`pred` is the previous value.
`curr` is the current value.

Each loop pass computes the next value.
Then the window slides forward.

Old current becomes the new previous.
Next becomes the new current.

Kitchen version:
imagine a prep line with two plates in view.
The next plate depends on the last two plates.
After you make the next plate, the line shifts.

This is different from the accumulator pattern.

Accumulator:
one running result.

Sliding window:
two nearby values that move together.

This is also where off-by-one bugs appear.
If the loop stops one step too early or too late, check the initial values and the `<` versus `<=` condition.

---

## Frame 11 - Truthiness and JavaScript Gotchas

[11:30-12:45]

`if` and `while` do not require only `true` or `false`.

They use boolean context.

That means JavaScript asks:
is this value true-like or false-like?

The falsy values are:

```javascript
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy.

The big JavaScript gotcha is empty arrays and empty objects.

```javascript
if ([]) {
  // this runs
}

if ({}) {
  // this also runs
}
```

In JavaScript, `[]` and `{}` are truthy.

So do not test an array like this:

```javascript
if (items) { ... }
```

That runs even when `items` is an empty array.

Use:

```javascript
if (items.length > 0) { ... }
```

Kitchen version:
an empty tray still exists.
The tray is real.
But it has no food on it.

So ask how many items are on the tray.
Do not just ask whether the tray exists.

Truthiness is powerful.
But it must be precise.

---

## Frame 12 - Testing Recap and Bridge to 1.6

[12:45-14:20]

Now let us recap.

Control flow gives programs two new powers:

Choose.
Repeat.

Statements are executed.
Expressions are evaluated.

Expression statements can discard values.
So `x + 1` is not the same as `x = x + 1`.

Compound statements use a header and a block.
The header controls the block.

`if / else if / else` checks clauses in order.
The first truthy clause wins.

`while` repeats while the header is truthy.
A good loop needs init, condition, and update.

Truthiness decides what counts as true-like or false-like.
In JavaScript, `[]` and `{}` are truthy.

Finally, tests help us trust the code.

`console.assert` logs a failure and keeps running.

A helper like `assertEqual` can throw an error and stop immediately.

That is why strict tests are useful during practice.

Kitchen version:
testing is tasting the dish before it leaves the pass.
If the taste is wrong, stop and fix it.
Do not keep serving wrong plates.

This session gives us the control tools we were missing.

Next session is 1.6: Higher-Order Functions.

There, functions become even more powerful.
We can pass functions as arguments.
We can return functions as values.
And we will see how tools like `map`, `filter`, and `reduce` can replace many explicit loops.

But those tools still rest on today's foundation:
statements,
conditions,
loops,
and truthiness.
