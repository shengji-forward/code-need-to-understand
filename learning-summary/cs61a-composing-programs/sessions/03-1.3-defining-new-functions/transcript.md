# Transcript: Session 03 - 1.3 Defining New Functions

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides-tldraw-story-nav.html`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 15-18 minutes.

---

## Frame 01 - Why Defining Functions Matters

[00:00-01:20]

Welcome to Session 03.
This is CS61A section 1.3: Defining New Functions.

In Session 02, we used names for values.

For example:

```javascript
const radius = 10;
```

The name `radius` points to a value.

Today we take a bigger step.
We use a name for a process.

That process can be called again and again.

This matters a lot in the vibe coding era.
AI can generate many lines of code.
But if you do not understand functions, the code is just a pile of instructions.

Functions are how we package meaning.
They are how we turn repeated work into a named tool.

Kitchen version:
instead of explaining "wash, chop, season, and mix" every time, the kitchen says "make salsa."
One name now stands for a whole process.

That is what a function definition gives us.

---

## Frame 02 - Defining Is Not Calling

[01:20-02:45]

Look at this function:

```javascript
function square(x) {
  return x * x;
}
```

This defines a function.
It does not run the body yet.

That is the first key idea.

Defining a function is like writing a recipe card.
Calling a function is like asking the kitchen to cook from that recipe.

When JavaScript reads the definition, it binds the name `square` to a function.
The name goes into the global frame.

But this line:

```javascript
return x * x;
```

does not run yet.

There is no value for `x` yet.
`x` is only a placeholder.

To actually run the function, we call it:

```javascript
square(5)
```

Now the recipe gets used.
Now `x` receives a value.
Now the body can run.

So remember:
definition stores the recipe.
Call cooks the order.

---

## Frame 03 - Parts of a Function

[02:45-04:10]

Let us name the parts.

```javascript
function square(x) {
  return x * x;
}
```

`square` is the function name.
It is the public label.

`x` is a formal parameter.
That means it is a blank space on the recipe.
It says, "when someone calls me, put the input here."

`return x * x` is the body.
It describes what the function does.

The `return` keyword sends a value back to the caller.

Kitchen version:

Function name:
the recipe title.

Parameter:
the blank line on the order ticket.

Body:
the cooking steps.

Return:
the finished dish leaving the station.

When you read a function, do not rush.
Ask four questions:

What is its name?
What inputs does it expect?
What process does it run?
What value does it return?

---

## Frame 04 - Every Call Creates a Local Frame

[04:10-05:45]

Now we get the engine under function calls.

Every time we call a user-defined function, JavaScript creates a fresh local frame.

Call:

```javascript
square(-2)
```

The function has a parameter named `x`.
The argument value is `-2`.

So the new local frame gets this binding:

```text
x -> -2
```

Then the body runs:

```javascript
return x * x;
```

JavaScript looks up `x`.
It finds `-2` in the local frame.

So it computes:

```text
(-2) * (-2) = 4
```

Then it returns `4`.
After return, that local frame is gone.

Kitchen version:
an order comes in.
A cook gets a fresh ticket.
The cook fills the ticket with this order's values.
When the dish leaves the kitchen, the ticket is thrown away.

Fresh call.
Fresh ticket.
Fresh local frame.

---

## Frame 05 - Global Frame and Local Frame

[05:45-07:10]

An environment is a sequence of frames.

For now, we need two kinds.

The global frame is shared.
It holds top-level names.

Examples:

```text
square -> function square(x)
Math -> built-in object
```

A local frame belongs to one function call.
It holds that call's parameter values.

Example:

```text
square frame:
x -> 5
```

Kitchen version:
the global frame is the recipe board on the wall.
Every cook can read it.

The local frame is one cook's order ticket.
It belongs to one order.

This distinction is important.
The global board is shared.
The local ticket is private.

When a beginner gets confused by functions, it is often because these frames are mixed together in the mind.

So separate them.
Wall board.
Order ticket.

Global frame.
Local frame.

---

## Frame 06 - The Three Steps of a Function Call

[07:10-08:35]

Every user-defined function call follows three steps.

Step 1:
evaluate the operator and operands.

In:

```javascript
square(5)
```

the operator is `square`.
The operand is `5`.

Step 2:
create a new local frame.
Bind the parameter to the argument value.

```text
x -> 5
```

Step 3:
evaluate the body in the environment that starts at that local frame.

```javascript
return x * x;
```

This gives:

```text
25
```

Then the value returns.
The local frame is destroyed.

This is the cycle:

look up the function.
prepare the ticket.
run the body.
return the dish.
clear the station.

If you can trace this cycle, you can understand many programs that first look mysterious.

---

## Frame 07 - Name Lookup: Local First, Then Global

[08:35-10:00]

When JavaScript sees a name, it must find its value.

The lookup rule is:
local first, then global.

Look at:

```javascript
function areaOfCircle(radius) {
  return Math.PI * square(radius);
}
```

Inside the body, JavaScript sees three important names.

`radius`
is found in the local frame.
It came from this function call.

`square`
is not local.
So JavaScript looks in the global frame.
There it finds the function `square`.

`Math`
is also global.
It is a built-in object.

So one body can use both local and global names.

Kitchen version:
the cook checks their own ticket first.
If the ticket says "radius = 10," use that.
If the ticket does not mention the sauce recipe, check the wall board.

Own ticket first.
Wall board second.

That is local first, then global.

---

## Frame 08 - Scope Is a Wall Between Frames

[10:00-11:25]

Scope tells us where a name can be used.

A parameter is local to its own function body.

This means two functions can both use the name `x`.
They do not collide.

Example:

```javascript
function square(x) {
  return x * x;
}

function cube(x) {
  return x * square(x);
}
```

Both functions use `x`.
But each call gets its own local frame.

When we call:

```javascript
cube(3)
```

the `cube` call gets one frame:

```text
cube frame: x -> 3
```

Then `cube` calls `square(3)`.
That creates another frame:

```text
square frame: x -> 3
```

These are two separate name tags.
They happen to have the same name.
But they live on different tickets.

Kitchen version:
two cooks can both have a ticket line called "sauce."
One ticket does not overwrite the other.

Scope is the wall between the tickets.

---

## Frame 09 - Pass by Value

[11:25-12:55]

Now we answer a subtle question.

When `cube` calls `square(x)`, does `square` read `cube`'s `x`?

No.

The caller evaluates the argument first.

In the `cube` frame:

```text
x -> 3
```

So the argument value is `3`.

Then that value is passed into `square`.

The `square` call creates a fresh local frame:

```text
x -> 3
```

This is a new binding.
It is not a link back to `cube`'s frame.

It is a copy of the value.

Kitchen version:
one cook shouts "3" across the kitchen.
The other cook writes "3" on their own ticket.
They do not share the same ticket.

That is pass by value.

Values cross the wall.
Frames do not cross the wall.

This idea prevents many bugs.

---

## Frame 10 - Composition: Functions Calling Functions

[12:55-14:20]

Composition means building bigger work from smaller functions.

Look at:

```javascript
function cube(x) {
  return x * square(x);
}
```

`cube` uses `square`.
That is composition.

Look at a bigger example:

```javascript
function hypotenuse(a, b) {
  return Math.sqrt(square(a) + square(b));
}
```

This function uses:
`square(a)`,
`square(b)`,
and `Math.sqrt`.

Several frames can be alive while this runs.

The `hypotenuse` frame has:

```text
a -> 3
b -> 4
```

Then one `square` frame handles `3`.
Another `square` frame handles `4`.

Each frame is separate.
Each one returns a value.
Then the outer function uses those values.

Kitchen version:
one station prepares sauce.
One station cooks noodles.
The final station plates the dish.

Each station has its own ticket.
The result moves forward.

Good programs are built this way.
Small clear functions.
Composed into larger work.

---

## Frame 11 - Functions as Abstractions

[14:20-15:50]

A function is an abstraction.

That means callers should depend on what it does, not every detail of how it does it.

For a function, we can describe three things.

Domain:
what inputs are allowed.

Range:
what outputs can come back.

Intent:
what relationship the function promises.

For `square`:

Domain:
one number.

Range:
a non-negative number.

Intent:
return the input multiplied by itself.

Kitchen version:
when you order "house salsa," you care about the result.
You do not need to know which knife the cook used.

This is why functions are powerful.
They hide details behind a useful name.

But the name must be honest.
The inputs must make sense.
The return value must be clear.

This prepares us for the next session:
designing good functions.

---

## Frame 12 - Practice Recap and Next Step

[15:50-17:30]

Let us connect this to the practice.

You defined:

```javascript
function square(x) {
  return x * x;
}
```

That practiced a simple function definition.

You defined:

```javascript
function cube(x) {
  return x * square(x);
}
```

That practiced composition.

You defined:

```javascript
function areaOfCircle(radius) {
  return Math.PI * square(radius);
}
```

That practiced local and global lookup.

You defined `greet` with a default parameter.
That means a caller can omit one argument, and the function still has a useful value.

You defined `hypotenuse`.
That was the capstone.
It used nested calls, multiple local frames, and a built-in function.

The big idea is this:

Define a function.
Call the function.
Create a fresh frame.
Bind parameters.
Look up local first, then global.
Return a value.
Destroy the frame.

In the vibe coding era, this is grounding knowledge.
If a tool writes code for you, you still need to know where values live.
You still need to know what each function promises.

Next session, we use this engine to design better functions.

