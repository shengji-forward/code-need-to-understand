# Transcript: Session 04 - 1.4 Designing Functions

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides-tldraw-story-nav.html`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Function Design Matters

[00:00-01:05]

Welcome to Session 04.
This is CS61A section 1.4: Designing Functions.

In Session 03, we learned how functions run.
We saw calls, local frames, scope, and return values.

Today we ask a different question.

What makes a function good?

This matters in the vibe coding era.
AI can produce code fast.
But fast code is not automatically clear code.

If a function has a vague name, too many jobs, hidden side effects, or unclear inputs, it becomes hard to trust.

Good function design is software engineering at the small scale.
It is how we make code readable, testable, and reusable.

Kitchen version:
last session was how a cook handles an order ticket.
This session is how to write a good recipe.

---

## Frame 02 - Three Design Principles

[01:05-02:15]

We start with three design principles.

First: single responsibility.
One function should do one job.

Second: DRY.
DRY means do not repeat yourself.
If logic appears again and again, give it a name and reuse it.

Third: generality.
A function should be broad enough to cover related cases.
Specific values can come from arguments or defaults.

Kitchen version:
one recipe should make one dish.
The house sauce recipe should be written once.
A recipe can say "serves 4 by default," but still scale up.

These three principles work together.

One job makes a function easy to name.
DRY makes repeated ideas easier to change.
Generality makes a function useful in more places.

When code feels messy, ask:
Is this function doing too much?
Am I repeating the same logic?
Could this be more general?

---

## Frame 03 - One Function, One Job

[02:15-03:25]

Single responsibility means one function has one clear job.

You should be able to describe the function in one short sentence.

For example:

```javascript
function square(x) {
  return x * x;
}
```

One sentence:
return the square of a number.

That is clear.

Now imagine a function called:

```javascript
prepareOrderAndPrintReceiptAndUpdateInventory()
```

That name is already a warning.
It sounds like three jobs.

Kitchen version:
one recipe should not say:
make soup,
bake bread,
wash dishes,
and close the restaurant.

Split the work.

Small clear functions are easier to read.
They are easier to test.
They are easier to reuse.

Good design often starts by cutting a large task into named smaller tasks.

---

## Frame 04 - DRY: Reuse Named Logic

[03:25-04:40]

DRY means do not repeat yourself.

If you copy the same logic in several places, you create a maintenance problem.

Suppose two functions need to square a number.

Do not write:

```javascript
x * x
```

again and again.

Instead, define:

```javascript
function square(x) {
  return x * x;
}
```

Then reuse it.

This showed up in practice.

`areaBetweenCircles` can use a helper to compute circle area.
`distance` can reuse `square`.

Kitchen version:
write the house sauce recipe once.
Then every dish can reference "house sauce."

If the sauce changes, update one recipe.
Not ten copied paragraphs.

DRY reduces bugs because one idea has one home.

---

## Frame 05 - Generality and Defaults

[04:40-05:55]

Generality means a function should not be too narrow.

Instead of making many special-case functions, make one useful function with parameters.

Example:

```javascript
function pow(base, exp = 2) {
  return Math.pow(base, exp);
}
```

This can square by default.
But it can also cube.
Or use any exponent.

The default supports the common case.
The parameter keeps the function general.

Kitchen version:
a recipe might say "serves 4 by default."
But the cook can scale it to 8.

That is better than writing separate recipes for every group size.

But do not make every value a parameter.

Ask:
Could a caller legitimately want a different value?

If yes, it can be a parameter or default parameter.
If no, it may belong as a `const` inside the body.

---

## Frame 06 - Documentation with JSDoc

[05:55-07:05]

Good functions should explain what they promise.

In JavaScript, we can use JSDoc.

It looks like this:

```javascript
/**
 * Return a value limited to the range low through high.
 *
 * @param {number} val - Value to limit
 * @param {number} low - Lower bound
 * @param {number} high - Upper bound
 * @returns {number} Limited value
 */
function clamp(val, low, high) {
  return Math.max(low, Math.min(val, high));
}
```

The first sentence says the job.
`@param` explains the inputs.
`@returns` explains the output.

This is not decoration.
It is a contract for readers.

Kitchen version:
a recipe title is not enough.
Good recipes also say serving size, ingredients, and expected result.

JSDoc helps future readers.
That future reader may be your teammate.
It may also be you next month.

---

## Frame 07 - The Default Parameter Trap

[07:05-08:20]

Default parameters are useful.
But JavaScript has an important rule.

A default is used only when the argument is `undefined`.

Example:

```javascript
function greet(name = "World") {
  return "Hello, " + name + "!";
}
```

These use the default:

```javascript
greet()
greet(undefined)
```

Both use `"World"`.

But this does not use the default:

```javascript
greet(null)
```

`null` is a real value.
So the result is:

```text
Hello, null!
```

The same is true for `0`, empty string, and `false`.
They do not trigger the default.

Kitchen version:
an empty order line means "use the house default."
But if the ticket says "no sauce," that is a real instruction.
Do not replace it with sauce.

---

## Frame 08 - Default Parameter or const in the Body

[08:20-09:30]

Now we separate two ideas.

Some values may vary between calls.
Those can be default parameters.

Some values are true constants.
Those belong inside the function body.

Example:

```javascript
function pressure(v, t, n = 6.022e23) {
  const k = 1.38e-23;
  return (n * k * t) / v;
}
```

`n` is a default parameter.
A caller may want one mole, three moles, or another amount.

`k` is a constant.
It is Boltzmann's constant.
The caller should not choose it.

The test is simple:

Could a caller legitimately want a different value?

If yes, use a parameter or default parameter.
If no, use a `const` in the body.

Kitchen version:
serving size can vary.
The boiling point of water is not a menu choice.

---

## Frame 09 - Locally Defined Functions

[09:30-10:50]

A locally defined function is a function inside another function.

Example:

```javascript
function areaBetweenCircles(r1, r2) {
  function areaOfCircle(r) {
    return Math.PI * r * r;
  }

  return areaOfCircle(r1) - areaOfCircle(r2);
}
```

`areaOfCircle` is local.
It is bound inside the local frame of `areaBetweenCircles`.

That means it is visible inside the outer function.
It is not visible outside.

Why do this?

Because the helper belongs only to this recipe.
It keeps the helper close to where it is used.
It avoids adding extra names to the global frame.
It supports DRY because we define the helper once and call it more than once.

Kitchen version:
a special garnish step may belong only to one dish.
You keep it on that recipe card.
You do not put it on the main wall for every cook.

---

## Frame 10 - Abstraction Barrier

[10:50-12:05]

A well-designed function creates an abstraction barrier.

That means callers depend on what the function does, not how it does it.

We describe a function with three ideas.

Domain:
what inputs it accepts.

Range:
what outputs it returns.

Intent:
the relationship it promises.

For `distance`:

Domain:
four numbers, representing two points.

Range:
a non-negative number.

Intent:
return the distance between the points.

The caller should not need every implementation step.
The caller should only need the promise.

Kitchen version:
a customer orders "noodle soup."
They do not need to know the knife angle, pan temperature, or exact stirring rhythm.

That barrier is powerful.
It lets implementation change while callers keep working.

---

## Frame 11 - Preconditions, Side Effects, and clamp

[12:05-13:25]

Two more design words matter.

A precondition is a rule for valid inputs.

For `clamp`, we expect:

```text
low <= high
```

If that is not true, the function's meaning is unclear.

A side effect is an observable effect beyond the return value.
Printing is a side effect.
Changing outside state is a side effect.

Pure functions avoid side effects.
They are easier to test and compose.

Now look at `clamp`:

```javascript
function clamp(val, low, high) {
  return Math.max(low, Math.min(val, high));
}
```

This reuses existing abstractions.
No `if` statement is needed yet.

`Math.min(val, high)` pulls a value down if it is too high.
`Math.max(low, ...)` pushes it up if it is too low.

Kitchen version:
two guards check the plate.
One says "not too much."
One says "not too little."

Good design reuses tools that already express the idea.

---

## Frame 12 - Practice Recap and Next Step

[13:25-14:50]

Let us recap the practice.

`clamp` practiced single responsibility and reuse.
One job:
keep a value inside a range.

`areaBetweenCircles` practiced a local helper.
The helper belongs inside the larger function.

`distance` practiced composition.
It reused `square` and `Math.sqrt`.

`isPrime` is different.
We designed its meaning.
Its domain is positive integers.
Its range is true or false.
Its intent is to test whether a number has only two divisors.

But we did not finish the implementation here.
That needs control flow.
It needs decisions and loops.
That is Session 05.

This is an important lesson.
Design can come before implementation.

In the vibe coding era, that matters.
Before asking a tool to write code, know the function's job.
Know its inputs.
Know its output.
Know its promise.

Next session, we add control flow.
Then we can finish `isPrime`.

