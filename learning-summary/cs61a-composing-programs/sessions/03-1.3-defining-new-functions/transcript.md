# Transcript: Session 03 - 1.3 Defining New Functions

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides-tldraw-story-nav.html`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Defining Functions Matters

[00:00-01:05]

Welcome to Session 03.
This is CS61A section 1.3: Defining New Functions.

In Session 02, we used names for values.

```javascript
const radius = 10;
```

The name `radius` points to a value.

Today we use a name for a process.

That process can be called again and again.

This matters in the vibe coding era.
AI can generate many lines of code.
But functions are how we package meaning.

Kitchen version:
instead of saying "wash, chop, season, and mix" every time, the kitchen says "make salsa."

One name now stands for the whole process.

That is what a function definition gives us.

---

## Frame 02 - Defining Is Not Calling

[01:05-02:15]

Look at this function:

```javascript
function square(x) {
  return x * x;
}
```

This defines a function.
It does not run the body yet.

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

To run the function, we call it:

```javascript
square(5)
```

Now the recipe gets used.
Now `x` receives a value.
Now the body can run.

Definition stores the recipe.
Call cooks the order.

---

## Frame 03 - Parts of a Function

[02:15-03:25]

Let us name the parts.

```javascript
function square(x) {
  return x * x;
}
```

`square` is the function name.
It is the public label.

`x` is a formal parameter.
It is a blank space on the recipe.
When someone calls the function, the input goes there.

`return x * x` is the body.
It says what work to do.

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

When you read a function, ask four quick questions.

What is its name?
What inputs does it expect?
What process does it run?
What value does it return?

---

## Frame 04 - Local Frames and the Global Board

[03:25-04:50]

Now we get the engine under function calls.

Every time we call a user-defined function, JavaScript creates a fresh local frame.

Call:

```javascript
square(-2)
```

The function has a parameter named `x`.
The argument value is `-2`.

So the local frame gets:

```text
x -> -2
```

Then the body runs.
JavaScript looks up `x`, finds `-2`, and computes:

```text
(-2) * (-2) = 4
```

Then it returns `4`.
After return, that local frame is gone.

Now connect that to the global frame.

The global frame is the shared recipe board.
It holds top-level names like:

```text
square -> function
Math -> built-in object
```

The local frame is one cook's order ticket.
It belongs to one call.

Global board:
shared.

Local ticket:
private.

Fresh call.
Fresh ticket.
Fresh local frame.

---

## Frame 05 - The Three Steps of a Function Call

[04:50-06:05]

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

Kitchen version:
look up the recipe.
Prepare the ticket.
Cook the order.
Return the dish.
Clear the station.

If you can trace this cycle, you can read many programs that first look mysterious.

---

## Frame 06 - Name Lookup: Local First, Then Global

[06:05-07:15]

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

`radius` is local.
It came from this function call.

`square` is not local.
So JavaScript checks the global frame and finds the function.

`Math` is also global.
It is a built-in object.

Kitchen version:
the cook checks their own ticket first.
If the ticket says "radius = 10," use that.
If the ticket does not mention the sauce recipe, check the wall board.

Own ticket first.
Wall board second.

That is local first, then global.

---

## Frame 07 - Scope Is a Wall Between Frames

[07:15-08:30]

Scope tells us where a name can be used.

A parameter is local to its own function body.

That means two functions can both use the name `x`.
They do not collide.

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

## Frame 08 - Pass by Value

[08:30-09:45]

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

Values cross the wall.
Frames do not cross the wall.

That is pass by value.

---

## Frame 09 - Composition: Functions Calling Functions

[09:45-11:05]

Composition means building bigger work from smaller functions.

Look at:

```javascript
function cube(x) {
  return x * square(x);
}
```

`cube` uses `square`.
That is composition.

Here is a bigger example:

```javascript
function hypotenuse(a, b) {
  return Math.sqrt(square(a) + square(b));
}
```

This function uses `square(a)`, `square(b)`, and `Math.sqrt`.

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

Good programs are built this way:
small clear functions composed into larger work.

---

## Frame 10 - Functions as Abstractions

[11:05-12:20]

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

That prepares us for designing good functions.

---

## Frame 11 - Practice Recap and Next Step

[12:20-13:45]

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
That means a caller can omit one argument and still get a useful value.

You defined `hypotenuse`.
That was the capstone.
It used nested calls, multiple local frames, and a built-in function.

The big idea is this:

Define a function.
Call the function.
Create a fresh frame.
Bind parameters.
Look up local first, then global.
Pass values across the scope wall.
Return a value.
Destroy the frame.

In the vibe coding era, this is grounding knowledge.
If a tool writes code for you, you still need to know where values live.
You still need to know what each function promises.

Next session, we use this engine to design better functions.
