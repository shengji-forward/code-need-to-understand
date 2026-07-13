# Transcript: Session 06 - 1.6 Higher-Order Functions

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides-tldraw-story-nav.html`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Higher-Order Functions Matter

[00:00-01:05]

Welcome to Session 06.
This is CS61A section 1.6: Higher-Order Functions.

So far, we have used functions like recipes.

You give the recipe some ingredients.
The recipe does work.
Then it returns a dish.

Today, we add a new idea.

A function can also be a value.

That means we can pass a function into another function.
We can return a function from another function.
We can even wrap a function with extra behavior.

This is a big step.

In the vibe coding era, AI can write code that uses callbacks, closures, hooks, middleware, and decorators.
Those words sound advanced.
But many of them come from one foundation.

Functions are values.

Today we build that foundation slowly.

Kitchen version:
instead of passing only tomatoes, rice, or salt,
we can pass a whole recipe into another recipe.

That is higher-order thinking.

---

## Frame 02 - Functions Are Values

[01:05-02:10]

First, we need one phrase:
first-class functions.

A function is first-class when the language treats it like a normal value.

In JavaScript, functions are first-class.

That means a function can be bound to a name.

```javascript
const double = x => x * 2;
```

It can be passed as an argument.

```javascript
[1, 2, 3].map(double);
```

It can be returned from another function.

```javascript
function makeAdder(n) {
  return x => x + n;
}
```

And it can be stored in data.

```javascript
const ops = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
};
```

Kitchen version:
a recipe card is now an object the kitchen can move around.

You can put the recipe on the wall.
You can hand it to a cook.
You can put it inside a recipe box.
You can make a new recipe card from an old one.

That is the key.

A function is not only something we call.
It is also something we can pass around.

---

## Frame 03 - Higher-Order Functions

[02:10-03:20]

Now we can define the main term.

A higher-order function is a function that takes another function as input, or returns a function as output.

Here is a simple example.

```javascript
function applyTwice(fn, x) {
  return fn(fn(x));
}
```

`applyTwice` receives a function.
So `applyTwice` is higher-order.

If we pass in a function that adds one:

```javascript
const addOne = x => x + 1;
applyTwice(addOne, 5);
```

The answer is `7`.

First, `addOne(5)` gives `6`.
Then, `addOne(6)` gives `7`.

The important part is not the math.
The important part is the shape.

`applyTwice` does not know what `fn` does.
It only knows when to use it.

Kitchen version:
imagine a kitchen rule:
"do this prep step twice."

The prep step could be chop.
It could be wash.
It could be season.

The rule stays the same.
The recipe you pass in changes.

That is why higher-order functions are powerful.
They let us reuse a pattern, while swapping the specific action.

---

## Frame 04 - Callbacks and `fn` vs `fn()`

[03:20-04:35]

When you pass a function into another function, that passed function is often called a callback.

A callback is a function you hand over.
The receiver calls it.

You do not call it directly.

This is where beginners hit a common bug.

```javascript
arr.map(fn);
```

This passes the function.

But:

```javascript
arr.map(fn());
```

This calls `fn` immediately.
Then it passes the result.

That is usually wrong.

No parentheses means:
"Here is the recipe. You call it."

Parentheses mean:
"Cook this right now."

Callbacks can be synchronous or asynchronous.

Synchronous means the receiver calls it now and waits.

```javascript
[1, 2, 3].map(x => x * x);
```

`map` calls the function now.

Asynchronous means the receiver saves it and calls it later.

```javascript
setTimeout(() => console.log("done"), 1000);
```

The timer calls the function later.

So callback does not mean "later."
Callback means "the receiver calls it."

Kitchen version:
you hand a prep card to the station.
Sometimes the station uses it now.
Sometimes the station pins it for later.
Either way, the station is the one that uses the card.

---

## Frame 05 - `improve`: A Reusable Tasting Loop

[04:35-05:50]

CS61A uses higher-order functions to express a general method called iterative improvement.

In JavaScript, the shape is:

```javascript
function improve(update, close, guess = 1) {
  while (!close(guess)) {
    guess = update(guess);
  }
  return guess;
}
```

This function has three parts.

`guess` is the current answer.

`close` asks:
"Are we done yet?"

`update` says:
"If not, make a better guess."

Notice what `improve` does not know.

It does not know if we are finding a square root.
It does not know if we are finding the golden ratio.
It does not know the math goal.

It only knows the process:
check, update, check again.

Kitchen version:
make sauce until it tastes right.

`guess` is the current sauce.
`close` is the taste test.
`update` is the adjustment.

Too salty?
Add water.

Too thin?
Reduce it.

The tasting loop is reusable.
The actual adjustment can change.

That is a higher-order function doing real work.

---

## Frame 06 - Lexical Scope: A Function's Birthplace

[05:50-07:05]

Now we need the environment model again.

Nested functions can use names from the place where they were defined.

That is lexical scope.

Here is the square root shape from the notes:

```javascript
function sqrt(a) {
  function sqrtUpdate(x) {
    return average(x, a / x);
  }

  function sqrtClose(x) {
    return approxEq(x * x, a);
  }

  return improve(sqrtUpdate, sqrtClose);
}
```

Look at `sqrtUpdate`.

It has a parameter named `x`.
But it also uses `a`.

Where does `a` come from?

It comes from the `sqrt` call where `sqrtUpdate` was defined.

That place is the function's birthplace.

In JavaScript, when a function is created, it carries a parent environment.

The parent is not where the function is called.
The parent is where the function was defined.

Kitchen version:
a recipe card is written in one kitchen.
It carries that kitchen's house rules.

Even if another station uses the card later, the card still points back to the kitchen where it was written.

That is the birthplace idea.

---

## Frame 07 - The Wall

[07:05-08:15]

Lexical scope also gives us a wall.

When a function is called, it can see:
its own local names,
then names in its parent environment,
then names above that.

But it cannot see the caller's local frame just because the caller called it.

That caller frame is behind a wall.

Only argument values cross the wall.

Here is the rule:
values can be passed in,
but name lookup does not jump into the caller.

This is why `sqrtUpdate` can see `a`.

It was defined inside `sqrt`.
So its parent is the `sqrt` frame.

But if `improve` calls `sqrtUpdate`, `sqrtUpdate` does not suddenly see the local variables inside `improve`.

Kitchen version:
one station can hand another station an order ticket.
The ticket crosses the pass.

But the second station does not get access to every private note on the first station's board.

Only the ticket crosses.

In programming:
arguments cross.
Lookup does not.

That rule prevents many closure and scope confusions.

---

## Frame 08 - Closures: Recipe Factories

[08:15-09:30]

Now we can name the central idea.

A closure is a function plus the birthplace names it carries with it.

Here is the classic example:

```javascript
function makeAdder(n) {
  return x => x + n;
}

const addFive = makeAdder(5);
addFive(3); // 8
```

`makeAdder` is a factory.

It builds a new function.

When we call `makeAdder(5)`, the name `n` is bound to `5`.
Then the inner function is returned.

That returned function still remembers where it was born.

So later, when we call:

```javascript
addFive(3)
```

the `3` becomes `x`.
The `5` comes from the captured `n`.

Two values.
Two different sources.

`x` is passed at call time.
`n` was captured at build time.

Kitchen version:
make a "large coffee recipe."

The size is locked in when the recipe is created.
Later, the customer chooses milk or sugar.

The recipe remembers large.
The new order supplies the extra detail.

That is a closure.

---

## Frame 09 - Factory vs Product

[09:30-10:35]

One of the most important corrections is this:
the factory is not the product.

`makeAdder` is the factory.
`addFive` is the product.

They are not the same function.

```javascript
const addFive = makeAdder(5);
```

After this line, `addFive` is the inner function that was returned.

`addFive` needs one argument.

```javascript
addFive(3);
```

That `3` goes to `x`.
It does not go to `n`.

`n` was already set to `5`.

The same idea appears in Newton's method:

```javascript
function newtonUpdate(f, df) {
  return function update(x) {
    return x - f(x) / df(x);
  };
}
```

`newtonUpdate` is the factory.
`update` is the product.

The product remembers `f` and `df`.
Later, when it is called, it receives `x`.

Kitchen version:
the factory makes a sauce recipe.
The sauce recipe is not the factory.

Once the recipe is made, the kitchen uses the recipe.
It does not rebuild the whole factory each time.

Keep this distinction clear:
factory builds.
product runs.

---

## Frame 10 - Currying and Partial Application

[10:35-11:45]

Currying is a special closure pattern.

It turns a function with multiple arguments into a chain of one-argument functions.

Normal shape:

```javascript
add(5, 3);
```

Curried shape:

```javascript
add(5)(3);
```

Here is the code:

```javascript
const add = a => b => a + b;
```

The first call receives `a`.

```javascript
const addFive = add(5);
```

That returns a function that remembers `a = 5`.

The second call receives `b`.

```javascript
addFive(3);
```

Now the result is `8`.

The practical reason is partial application.

Partial application means we pre-load some inputs and get a reusable specialized tool.

Kitchen version:
make a "large coffee builder."

Size is already chosen.
Now each customer only chooses milk, sugar, or flavor.

We do not repeat the size every time.

In real code, libraries often handle currying for us.
But the idea matters.

Currying works because closures remember earlier inputs.

---

## Frame 11 - Decorators: Wrapping a Function

[11:45-13:00]

A decorator is another closure pattern.

A decorator takes a function and returns a new function that wraps it.

The wrapper can do something before, after, or around the original call.

Example:

```javascript
function trace(fn) {
  return function wrapped(x) {
    console.log("calling", fn.name);
    return fn(x);
  };
}
```

`trace` is higher-order because it takes a function.

It returns `wrapped`.

`wrapped` is a closure because it remembers `fn`.

Now:

```javascript
triple = trace(triple);
```

This is setup.
It builds the wrapper.
It does not log yet.

Later:

```javascript
triple(12);
```

This is the call.
The wrapper runs first.
Then it calls the original function inside.

Kitchen version:
wrap a recipe with a checklist.

Before the dish goes out, log the station.
Then cook the original recipe.
Maybe after that, record how long it took.

The original recipe still exists.
The wrapper adds process around it.

Decorators are used for logging, caching, permissions, timing, and observability.

---

## Frame 12 - Concept Map and Bridge to Recursion

[13:00-14:30]

Let us connect the whole map.

First:
functions are values.

That is first-class functions.

Because functions are values, we can build higher-order functions.

Some higher-order functions take functions as inputs.
Examples:
`map`, `filter`, and `improve`.

The functions we pass in are callbacks.

Other higher-order functions return functions.
That gives us closures.

Closures depend on lexical scope.
The function remembers its birthplace.

The wall still matters.
The caller's frame is not visible.
Only argument values cross.

From closures, we get useful patterns:
factories,
currying,
partial application,
and decorators.

Newton's method is just a showcase.
The math is not the main lesson here.
The structure is the lesson.

Reusable loop.
Swappable functions.
Closures carrying the right names.

Kitchen version:
Session 06 teaches the kitchen to move recipes around.

A recipe can be an ingredient.
A recipe can build another recipe.
A recipe can be wrapped with a checklist.

Next session is recursion.

Recursion means a function calls itself.

The environment model from today will matter again.
Every call creates a frame.
Those frames stack up.

So do not rush past this session.
Higher-order functions are a bridge.
They connect simple functions to real software patterns.

And they make recursion easier to understand next.

