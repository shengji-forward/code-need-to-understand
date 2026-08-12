# Transcript: Session 07 - 1.7 Recursive Functions

**Audience**: Non-technical beginners learning CS and programming fundamentals.
**Deck**: `slides.excalidraw`
**Voice**: Clear mentor, plain English, kitchen and restaurant examples.
**Length**: About 12-15 minutes.

---

## Frame 01 - Why Recursion Matters

[00:00-01:05]

Welcome to Session 07.
This is CS61A section 1.7: Recursive Functions.

Today we finish Chapter 1.

So far, a function could call another function.
In Session 06, a function could even receive or return another function.

Now we add one more idea.

A function can call itself.

That is recursion.

At first, this sounds strange.
It sounds like a recipe that says:
"make this same recipe again."

But recursion is not a trick.
It is a way to solve a large problem by reducing it to a smaller version of the same problem.

In the vibe coding era, this matters.
AI can generate recursive code quickly.
But recursive code can be wrong in quiet ways.

It can miss the stopping rule.
It can return the wrong value.
It can overflow the call stack.
It can repeat work many times.

CS fundamentals help you see those problems.

Kitchen version:
to clean a stack of plates, you clean the top plate, then clean the smaller stack underneath.

Same job.
Smaller stack.
Stop when no plates are left.

That is recursion.

---

## Frame 02 - The Shape of Recursion

[01:05-02:15]

A recursive function has two essential parts.

First, a base case.

The base case is the simplest input.
It can be answered directly.
No more recursion.

Second, a recursive step.

The recursive step calls the same function on a smaller or simpler problem.

Here is the mental shape:

```javascript
function solve(problem) {
  if (simple(problem)) {
    return directAnswer(problem);
  }
  return combine(problem, solve(smaller(problem)));
}
```

The base case stops.
The recursive step makes progress.

Both parts are required.

If there is no base case, the function calls itself forever.
Eventually JavaScript runs out of call stack.

If the recursive step does not get smaller, it also never reaches the base case.

Kitchen version:
wash one plate,
then wash the rest of the smaller stack.

But if the stack never gets smaller,
the kitchen is stuck forever.

So when you read recursive code, ask two questions:

What is the stop case?
What gets smaller each time?

---

## Frame 03 - Sum Digits

[02:15-03:30]

Let us use a concrete example.

We want the sum of the digits of a number.

For `18117`, the answer is:

```text
1 + 8 + 1 + 1 + 7 = 18
```

JavaScript gives us two useful tools.

`n % 10` gives the last digit.

```javascript
18117 % 10; // 7
```

`Math.floor(n / 10)` gives all but the last digit.

```javascript
Math.floor(18117 / 10); // 1811
```

So the recursive idea is:

sum the digits of `18117`
equals
sum the digits of `1811`
plus `7`.

Code:

```javascript
function sumDigits(n) {
  if (n < 10) {
    return n;
  }
  return (n % 10) + sumDigits(Math.floor(n / 10));
}
```

The base case is a single digit.

The recursive step removes the last digit.

Kitchen version:
you total a long receipt by tearing off the last line,
adding that price,
then asking for the total of the shorter receipt.

Each time, the receipt gets shorter.

That is why the process stops.

---

## Frame 04 - The Call Stack

[03:30-04:45]

Recursion does not need a new JavaScript rule.

It uses the same function-call rule from Session 03.

Every call creates a fresh local frame.

So when `sumDigits(738)` runs, JavaScript creates a stack of active calls.

First:

```text
sumDigits(738)
```

That needs:

```text
sumDigits(73) + 8
```

That needs:

```text
sumDigits(7) + 3
```

Now `sumDigits(7)` hits the base case and returns `7`.

Then the stack unwinds.

`7 + 3` returns `10`.

`10 + 8` returns `18`.

This is the call stack.

The stack grows while calls are waiting.
Then it shrinks as answers return.

Kitchen version:
each cook writes a sticky note:
"I am waiting for the smaller receipt total."

When the smallest receipt is solved,
the notes are finished from bottom to top.

That is recursion in memory.

Frames stack up.
Then frames unwind.

---

## Frame 05 - Factorial and the Recursive Leap

[04:45-05:55]

Another classic example is factorial.

`4!` means:

```text
4 * 3 * 2 * 1
```

So `4!` is `24`.

The recursive definition is:

```text
n! = n * (n - 1)!
```

In JavaScript:

```javascript
function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
```

The base case is `1`.

The recursive step says:
multiply `n` by the factorial of the smaller number.

Here is the important thinking tool:
the recursive leap of faith.

When checking the code, do not expand every future call in your head.

Instead, ask:
if `factorial(n - 1)` already works,
does this line correctly compute `factorial(n)`?

```javascript
return n * factorial(n - 1);
```

Yes.

Kitchen version:
if the prep team can already make one smaller tray,
then I only need to add the top tray correctly.

Trust the smaller job.
Add your part.

That is the leap of faith.

---

## Frame 06 - Iteration vs Recursion

[05:55-07:00]

Loops and recursion can both repeat work.

But they feel different.

A loop often uses changing variables.

```javascript
function factIter(n) {
  let total = 1;
  let k = 1;
  while (k <= n) {
    total = total * k;
    k = k + 1;
  }
  return total;
}
```

Here, `total` remembers the running answer.
`k` walks forward.

Recursion uses the call stack instead.

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
```

There is no explicit `total`.
There is no explicit `k`.

The waiting calls hold the unfinished work.

Kitchen version:
iteration is one cook keeping a checklist and moving down the line.

Recursion is a stack of smaller tickets,
where each ticket waits for the ticket below it.

Neither style is always better.

Use loops when the process is simple and deep.
Use recursion when the problem naturally breaks into smaller copies of itself.

---

## Frame 07 - Mutual Recursion

[07:00-08:05]

Sometimes recursion is shared between two functions.

That is mutual recursion.

The functions call each other.

Here is the even and odd example:

```javascript
function isEven(n) {
  if (n === 0) {
    return true;
  }
  return isOdd(n - 1);
}

function isOdd(n) {
  if (n === 0) {
    return false;
  }
  return isEven(n - 1);
}
```

The base facts are simple.

`0` is even.
`0` is not odd.

For any bigger number, we reduce by one and switch the question.

Is `4` even?
That asks if `3` is odd.

Is `3` odd?
That asks if `2` is even.

And so on, until `0`.

Kitchen version:
Alice and Bob take turns.

Alice handles one ticket,
then hands the smaller remaining count to Bob.
Bob handles one ticket,
then hands it back to Alice.

The work alternates.
The counter goes down.

Mutual recursion is useful when two ideas are naturally defined in terms of each other.

---

## Frame 08 - Printing vs Returning

[08:05-09:15]

Recursion can also help us see the difference between printing and returning.

The `cascade` example prints a number,
then a smaller prefix,
then prints the number again as the calls unwind.

```javascript
function cascade(n) {
  console.log(n);
  if (n >= 10) {
    cascade(Math.floor(n / 10));
    console.log(n);
  }
}
```

For `cascade(2013)`, the output is:

```text
2013
201
20
2
20
201
2013
```

This function is about display.
So `console.log` is the point.

But do not confuse `console.log` with `return`.

`console.log` shows something on the screen.
It returns `undefined`.

`return` gives a value back to the caller.

This mistake breaks composition.

```javascript
function badSquare(x) {
  console.log(x * x);
}

badSquare(4) + 1; // NaN
```

Kitchen version:
calling out "table 4 is ready" is not the same as handing over the plate.

Printing is an announcement.
Returning is the dish.

---

## Frame 09 - Tree Recursion

[09:15-10:25]

So far, each recursive call made one smaller call.

Tree recursion is different.

A tree-recursive function makes more than one recursive call.

The classic example is Fibonacci.

```javascript
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Each call branches into two smaller calls.

That is why we call it tree recursion.

It grows like a tree:
one trunk,
two branches,
then more branches.

This is elegant.
The code matches the definition.

But it can be expensive.

`fibonacci(7)` recomputes some smaller answers again and again.

Kitchen version:
two cooks both ask the prep team for the same sauce,
then their helpers ask again,
and the same sauce gets remade many times.

Tree recursion is powerful,
but you must watch repeated work.

---

## Frame 10 - Counting Partitions

[10:25-11:40]

Counting partitions is the most important example in this section.

The question is:
how many ways can we write `n` as a sum,
using parts up to size `m`?

For example, partitions of `6` using parts up to `4` include:

```text
2 + 4
1 + 1 + 4
3 + 3
1 + 2 + 3
...
```

The key recursive idea is a choice.

For the largest part `m`,
every partition is in one of two groups.

Group one:
use at least one `m`.

Then solve:

```text
countPartitions(n - m, m)
```

Group two:
do not use `m`.

Then solve:

```text
countPartitions(n, m - 1)
```

So the formula is:

```javascript
countPartitions(n - m, m) + countPartitions(n, m - 1)
```

The base cases are:

If `n === 0`, return `1`.
We found one valid way.

If `n < 0`, return `0`.
We overshot.

If `m <= 0`, return `0`.
No valid parts remain.

Kitchen version:
for every menu plan, ask:
do we include the large tray or not?

Include it:
smaller remaining hunger.

Skip it:
smaller menu.

Those two branches cover all choices.

---

## Frame 11 - Stack Limits in JavaScript

[11:40-12:45]

Recursion uses the call stack.

That means recursion has a practical limit.

Every active call needs a frame.

If the recursion goes too deep, JavaScript runs out of stack space.

In Node.js, the error is usually:

```text
RangeError: Maximum call stack size exceeded
```

JavaScript has a concept called proper tail calls in the language specification.

That means a recursive call in tail position could reuse the current frame.

But in practice, Node.js and most browsers do not implement this optimization.

So do not rely on it.

For very deep recursion in production JavaScript,
use a loop,
or use a technique like trampolining.

For learning and normal practice exercises,
recursion is fine.

Kitchen version:
sticky notes are useful.
But if you stack ten thousand sticky notes on the pass,
the pass collapses.

Use the right tool for the size of the job.

---

## Frame 12 - Chapter 1 Recap Bridge

[12:45-14:10]

Let us place recursion into the Chapter 1 map.

Session 01 gave us expressions and precision.

Session 02 gave us names and the environment.

Session 03 gave us function calls and local frames.

Session 04 gave us function design.

Session 05 gave us control flow:
choose and repeat.

Session 06 gave us functions as values:
callbacks, closures, factories, and decorators.

Session 07 gives us self-reference:
a function can solve a problem by solving a smaller version of itself.

The environment model is still the base.

Every recursive call creates a frame.
The call stack grows.
The base case returns.
Then the stack unwinds.

The two most important questions are:

What is the base case?

What gets smaller?

Kitchen version:
recursion is not magic.

It is a recipe for a pile:
handle the top,
send the smaller pile to the same recipe,
stop when the pile is simple.

That completes Chapter 1.

Next, we review the chapter as one connected system before moving into data abstraction.

