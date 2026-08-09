# Transcript: Session 01 - 1.1 Getting Started

**Audience**: Non-technical beginners starting CS61A Composing Programs in JavaScript.
**Deck**: `slides.excalidraw`
**Voice**: Clear mentor, Feynman style, plain English.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Precision Matters

[00:00-01:00]

Welcome to Session 01.
This is CS61A section 1.1: Getting Started.

The first big idea is precision.

Human language is flexible.
That is useful for people.
But it can be unclear for computers.

If I say, "Bring the hot sauce from the table near the window," a person can guess what I mean.
They can look around.
They can ask a question.
They can use context.

A computer does not do that.
A computer follows exactly what we write.

Programming languages trade richness for precision.
Every symbol matters.
Every name matters.
Every pair of parentheses matters.

In a restaurant, a vague spoken order can still work.
In a program, a vague order does not exist.
The ticket must be exact.

---

## Frame 02 - The REPL Cycle

[01:00-02:15]

We start with the REPL.

REPL means:

```text
Read -> Eval -> Print -> Loop
```

Read: Node reads what you typed.
Eval: it evaluates the code.
Print: it prints the result.
Loop: it waits again.

Try this in your head before seeing the answer:

```javascript
2 + 2
```

What should the REPL print?

It prints:

```text
4
```

The REPL is like a tasting spoon in a kitchen.
You test one small thing.
You get fast feedback.
Then you adjust.

This is why beginners should use the REPL often.
Do not wait until a large file is broken.
Taste small pieces as you go.

---

## Frame 03 - Expressions and Statements

[02:15-03:40]

JavaScript programs are made from expressions and statements.

An expression produces a value.

Examples:

```javascript
2 + 3
typeof 42
Math.sqrt(144)
```

Each one asks:
what value does this become?

A statement carries out an action.

Examples:

```javascript
const radius = 5;
console.log("hello");
```

The first statement stores a value under a name.
The second statement prints text.

A statement can contain an expression.

```javascript
const area = Math.PI * 5 * 5;
```

The statement is the storage action.
The expression is on the right side.
It computes the area.

Kitchen version:
an expression makes something.
a statement tells the kitchen what to do with it.

---

## Frame 04 - Functions Hide Process

[03:40-05:00]

A function is reusable logic.
It takes input.
It follows a process.
It gives output.

Look at:

```javascript
Math.sqrt(144)
```

The input is `144`.
The output is `12`.

Do we need to know the full square-root algorithm right now?
No.

That detail is hidden inside the function.
This is called encapsulation.

Think of a kitchen station.
You hand flour and water to the noodle station.
The station gives you noodles.
You do not need to watch every movement.
You trust the station because it has a clear job.

Functions work the same way.
They hide the messy process behind a clean interface.

This is why Chapter 1 focuses on functions.
Functions are how we turn repeated work into named tools.

---

## Frame 05 - Objects Bundle Data and Tools

[05:00-06:20]

An object bundles data with operations.

Take a string:

```javascript
"hello"
```

It is not just five letters.
It also comes with useful tools.

```javascript
"hello".length
"hello".toUpperCase()
"hello".includes("ell")
```

Some are properties.
Some are methods.

`length` is a property.
It is stored information.
No parentheses.

`toUpperCase()` is a method.
It is a function attached to the object.
Parentheses mean we call it.

Kitchen version:
an object is like a labeled pantry container with built-in tools.
A flour bin may have flour inside.
It may also have a scoop attached.

Data plus useful operations.
That is the basic object idea.

---

## Frame 06 - Shakespeare Line Walkthrough

[06:20-07:50]

The source text shows a powerful one-line example:

```javascript
const words = [...new Set(text.split(/\s+/))];
```

Do not panic.
We can read it slowly.

Start inside:

```javascript
text.split(/\s+/)
```

This splits a big string into an array of words.
There may be duplicates.

Then:

```javascript
new Set(...)
```

This creates a Set.
A Set keeps unique values.
So duplicate words collapse into one copy.

Then:

```javascript
[...set]
```

The spread syntax turns the Set back into an array.

Important correction:
the Set does not hold the original whole text.
It holds the unique words after the split.

Restaurant version:
first chop a long receipt into individual order items.
Then remove duplicate items.
Then put the unique items onto a clean list.

---

## Frame 07 - Error Types

[07:50-09:40]

Errors come in three main types.

First: syntax errors.

A syntax error means the grammar is broken.
The computer cannot even start.

Example:

```javascript
function greet(name {
}
```

The parentheses are wrong.
The grammar is broken.

Second: runtime errors.

The grammar is valid.
The program starts.
But something goes wrong while running.

Example:

```javascript
consolle.log("hi")
```

This looks like a spelling mistake.
But JavaScript sees `consolle` as a possible name.
The syntax is valid.
The failure happens when the program tries to find that name.
So this is a runtime `ReferenceError`.

Third: semantic errors.

The program runs.
No error message appears.
But the answer is wrong.

Example:

```javascript
f - 32 * 5 / 9
```

If we wanted Fahrenheit to Celsius, this is wrong.
Multiplication happens before subtraction.
We needed:

```javascript
(f - 32) * 5 / 9
```

A semantic error is like a wrong recipe.
The kitchen follows it perfectly.
The dish still tastes wrong.

---

## Frame 08 - JavaScript Quirks

[09:40-11:00]

JavaScript has a few details that surprise beginners.

First:

```javascript
typeof 42
```

This gives:

```text
"number"
```

But `typeof` is an operator.
It is not a function.

This works:

```javascript
typeof(42)
```

But the parentheses are only grouping.
They do not make `typeof` a function call.

Second:

```javascript
typeof null
```

This gives:

```text
"object"
```

That is a historical JavaScript quirk.
Do not build a deep theory from it.
Just remember it.

Third:

```javascript
7 / 0
```

JavaScript gives:

```text
Infinity
```

It does not throw an error.
Different languages make different choices.

The lesson is not "JavaScript is weird."
The lesson is:
test your assumptions.

---

## Frame 09 - Practice Walkthrough

[11:00-13:00]

The practice file has five small exercises.

Do not rush them.
Each one trains a basic move.

Exercise 1:

```javascript
12 + 8
```

Before running it, predict the value.

Exercise 2:

```javascript
"hello" + " " + "world"
```

What string should this produce?
Remember that `+` can join strings.

Exercise 3:

```javascript
typeof 42
```

What exact text comes back?
Is it `"number"` or something else?

Exercise 4:

```javascript
Math.sqrt(144)
```

What does the square-root station return?

Exercise 5:

```javascript
Math.PI * 5 * 5
```

This computes the area of a circle with radius 5.
The formula is pi times radius times radius.

These exercises are small on purpose.
Small moves become automatic.
Then bigger ideas feel less scary.

---

## Frame 10 - Bridge to Section 1.2

[13:00-14:00]

Here is the mental map from this session.

Data is the raw material.
Numbers, strings, booleans, arrays.

An expression produces data.
It asks, "What value is this?"

A function is reusable logic.
It hides a process behind a name.

An object bundles data with useful operations.

A statement tells the computer to do something.
Store this.
Print this.
Run this command.

Next, we move to section 1.2.
We will learn about expressions in more detail.
We will learn names.
We will learn environments.
And we will see how JavaScript decides what to evaluate first.

For now, keep the restaurant image.
The computer is the kitchen.
Your code is the ticket.
Clear tickets make clear dishes.
