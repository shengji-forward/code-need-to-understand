# Transcript: Session 02 - 1.2 Elements of Programming

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides.excalidraw`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Elements Matter Now

[00:00-01:10]

Welcome to Session 02.
This is CS61A section 1.2: Elements of Programming.

Today we look at the small pieces that make programs work.

This matters even more in the vibe coding era.
AI tools can write code quickly.
But if you do not understand the pieces, the code feels like magic.
And magic is hard to fix.

Our goal is not to memorize everything.
Our goal is to build a clear mental map.

Think about a restaurant kitchen.
You do not start by cooking a full banquet.
You first learn ingredients.
Then you learn how to combine them.
Then you learn how to name a recipe so the team can reuse it.

Programming works the same way.

---

## Frame 02 - Three Tools in Every Language

[01:10-02:25]

Every powerful programming language gives us three basic tools.

First: primitive expressions.
These are the simplest pieces.
Numbers, strings, booleans, and other small values.

Second: means of combination.
This is how we build bigger things from smaller things.

Third: means of abstraction.
This is how we give a useful thing a name.
Then we can reuse it without rebuilding it every time.

Kitchen version:
primitive means raw ingredients.
Combination means cooking steps.
Abstraction means writing down the recipe name.

If I say "house sauce," the kitchen does not need the full recipe every time.
The name stands for the whole process.

That is the heart of programming.
Small pieces.
Combined pieces.
Named pieces.

---

## Frame 03 - Primitive Expressions

[02:25-03:35]

A primitive expression is a simple expression the language already understands.

Examples:

```javascript
42
"hello"
true
```

Each one evaluates to a value.

The number `42` evaluates to the number 42.
The string `"hello"` evaluates to text.
The boolean `true` evaluates to a true value.

This sounds almost too simple.
But simple pieces matter.

In a kitchen, salt is just salt.
Water is just water.
A tomato is just a tomato.

You cannot understand a recipe if you do not know the ingredients.
You cannot understand a program if you do not know the primitive values.

When you see a piece of code, ask:
what value does this become?

That question will help you again and again.

---

## Frame 04 - Combining Expressions

[03:35-04:45]

Now we combine simple pieces.

Look at:

```javascript
2 + 3
```

This is not a primitive anymore.
It combines two numbers with an operator.
It evaluates to:

```text
5
```

JavaScript also has comparison expressions:

```javascript
3 > 2
5 === 5
```

These evaluate to booleans.
They become `true` or `false`.

Kitchen version:
one ingredient is primitive.
Mixing flour and water is combination.
Now we have dough.

In code, combination lets us build larger ideas.
But larger ideas can get hard to read.
So we need clear structure.

That brings us to call expressions.

---

## Frame 05 - Call Expressions

[04:45-06:05]

A call expression applies a function to arguments.

Example:

```javascript
Math.max(7.5, 9.5)
```

`Math.max` is the operator.
It is the function we call.

`7.5` and `9.5` are operands.
They are the input values.

The return value is:

```text
9.5
```

In plain English:
ask the `Math.max` function to choose the bigger number.

Restaurant version:
the operator is the kitchen station.
The operands are the ingredients on the ticket.
The return value is the finished item.

Call expressions are useful because they can take many arguments:

```javascript
Math.max(1, -2, 3, -4)
```

They also make nesting clear:

```javascript
Math.max(Math.min(1, -2), 3)
```

The parentheses show what must be cooked first.

---

## Frame 06 - Nested Expression Trees

[06:05-07:30]

Nested expressions can look scary.
But the rule is steady.

To evaluate a call expression:

1. Find the function.
2. Evaluate the arguments from left to right.
3. Apply the function.

If an argument is also a call expression, repeat the same rule.

This is why we draw an expression tree.

Example:

```javascript
Math.pow(2, 1 + 10) - Math.pow(2, 5)
```

The small pieces are evaluated first.
Then values move upward.

Kitchen version:
you cannot plate the dish before the rice is cooked.
You cannot cook the rice before measuring the water.

Programs are the same.
Some steps depend on earlier steps.

When nested code feels confusing, draw the tree.
Do not try to hold everything in your head.

---

## Frame 07 - Names and the Environment

[07:30-08:45]

Programming languages let us give names to values.

Example:

```javascript
const radius = 10;
```

Now the name `radius` is bound to the value `10`.

The interpreter needs memory for this.
That memory is called the environment.

You can think of the environment as an in-memory lookup table.

Name:

```text
radius
```

Value:

```text
10
```

Kitchen version:
the kitchen has a prep board.
It says:

```text
table7Sauce = "chili oil"
```

Now everyone can use that name.
They do not need to ask again.

Important point:
the environment lives while the program is running.
It is not a file on disk.
When the process ends, that memory is gone.

---

## Frame 08 - const, let, Snapshots, and Swap

[08:45-10:10]

In JavaScript, we usually use `const` first.

Use `const` when the name should not be reassigned.

```javascript
const pi = Math.PI;
```

Use `let` only when the name must change.

```javascript
let count = 0;
count = count + 1;
```

Here is a detail beginners often miss.

Names are snapshots.
They are not live links.

```javascript
let r = 10;
let area = Math.PI * r * r;
r = 11;
```

The value of `area` does not automatically change.
It still stores the old result.

Kitchen version:
if you write "soup count = 10" on the board, then make one more soup, the board does not update itself.
Someone must update it.

JavaScript also has destructuring swap:

```javascript
[a, b] = [b, a];
```

That means:
evaluate the right side first.
Then bind the new values on the left.

---

## Frame 09 - Library Functions and Functions as Values

[10:10-11:20]

JavaScript gives us useful library functions.

The `Math` object is always available.

```javascript
Math.sqrt(256)
Math.abs(-5)
Math.round(3.7)
```

These are tools already in the kitchen.
You do not need to build the oven before baking bread.

You can also bind a function to a name:

```javascript
const f = Math.max;
f(2, 3, 4)
```

This returns:

```text
4
```

That is an important idea.
A function can be a value.

For now, just remember this:
names can point to numbers.
Names can point to strings.
Names can also point to functions.

Later, this becomes very powerful.

---

## Frame 10 - Pure vs Non-Pure Functions

[11:20-12:45]

Now we separate two kinds of functions.

A pure function returns a value and has no side effect.

Example:

```javascript
Math.sqrt(16)
```

It returns `4`.
It does not print.
It does not change the outside world.

A non-pure function may have a side effect.

Example:

```javascript
console.log(2)
```

It prints `2`.
But its return value is `undefined`.

This is a common beginner trap:

```javascript
const two = console.log(2);
```

This prints `2`.
But `two` is bound to `undefined`.

Kitchen version:
calling out "Order ready!" is a side effect.
It makes sound in the room.
But it is not the food.

Pure functions are easier to combine.
Non-pure functions are useful, but you must know what they really return.

---

## Frame 11 - Practice Recap and Next Step

[12:45-14:15]

Let us recap the practice.

You used `Math.max`.
That practiced call expressions.

You computed circumference.
That practiced names and values.

You used:

```javascript
Math.pow(2 + 3, 4 - 1)
```

That practiced nested expressions.

You used `typeof`.
That practiced checking values.

You compared:

```javascript
typeof Math.sqrt(16) === "number"
```

That practiced pure function return values.

The big map is:

primitive pieces.
Combined pieces.
Named pieces.
Evaluated in an environment.
Returned by functions.

In the vibe coding era, this is the grounding skill.
Tools can generate code.
But you need to read the recipe.
You need to know what the kitchen is doing.

Next session, we stop only using functions.
We learn how to define our own functions.
