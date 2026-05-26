# Transcript: Session 00 - Course Overview

**Audience**: Non-technical beginners starting CS61A Composing Programs in JavaScript.
**Deck**: `slides-tldraw-story-nav.html`
**Voice**: Clear mentor, Feynman style, plain English.
**Length**: About 8-10 minutes.

---

## Frame 01 - Welcome

[00:00-00:45]

Welcome to CS61A Composing Programs.

This course is about the basics of computer science.
Not just JavaScript.
Not just coding syntax.
The real topic is how to think clearly.

If you have no computer science background, that is fine.
We will move slowly.
We will use small examples.
And we will connect hard ideas to everyday work.

Think about a kitchen.
A chef does not begin with a full restaurant.
First they learn how to cut, mix, heat, taste, and clean.
Computer science is similar.
Before we build large programs, we learn the small moves.

In this course, the small moves are expressions, names, functions, data, and systems.

---

## Frame 02 - The Whole Course

[00:45-01:45]

The course has four big chapters.

Chapter 1 is about functions.
Functions let us name a process.
It is like saying, "make sauce," instead of listing every tiny step each time.

Chapter 2 is about data.
Data lets us organize information.
It is like a pantry with labeled containers.
Rice here.
Salt there.
Sauces on this shelf.

Chapter 3 is about interpreters.
An interpreter is a program that understands another program.
In restaurant terms, it is like the kitchen ticket system.
It reads an order and tells the kitchen what actions to take.

Chapter 4 is about data processing.
Now we use all the earlier ideas on larger flows of information.
It is like running a full restaurant service.
Orders come in.
Stations work.
Food goes out.
The system has to stay organized.

So the path is simple:
functions, then data, then languages, then systems.

---

## Frame 03 - The Main Idea: Abstraction

[01:45-02:45]

The word "abstraction" sounds academic.
But the idea is practical.

Abstraction means hiding details behind a simple name.

When you order noodles at a restaurant, you do not say:
boil water,
add noodles,
wait,
drain,
heat sauce,
mix,
plate,
serve.

You just say, "one bowl of noodles."
That phrase hides many steps.

Programming works the same way.
We take a messy process and give it a clear name.
Then we can use that name without thinking about every detail.

This is why functions come first.
A function is the first major tool for abstraction.
It lets us wrap a process in a name.

The whole course keeps repeating this pattern.
Hide details.
Use clear names.
Build bigger ideas from smaller ideas.

---

## Frame 04 - Your Tool: Node.js

[02:45-04:00]

For this course, we use JavaScript with Node.js.

JavaScript can run in a web browser.
But Node.js lets JavaScript run directly on your computer.
That is useful for learning.
We can type code in a terminal.
We can run practice files.
We can test ideas quickly.

The first check is:

```text
node --version
```

If you see a version number, Node is installed.

There are two main ways to use Node.

First, type:

```text
node
```

That opens the REPL.
The REPL is an interactive playground.
It is like tasting sauce with a spoon.
Small input.
Immediate feedback.

Second, run a file:

```text
node file.js
```

That is more like following a written recipe from top to bottom.

We will use both.
REPL for quick experiments.
Files for practice exercises.

---

## Frame 05 - The REPL

[04:00-05:15]

REPL means Read, Eval, Print, Loop.

Read means Node reads what you typed.
Eval means it evaluates the code.
Print means it shows the result.
Loop means it waits for the next input.

Try this:

```javascript
2 + 3
```

The REPL prints:

```text
5
```

You did not need `console.log`.
The REPL automatically shows the value of an expression.

This is different from a script file.
Inside a file, if you want visible output, use:

```javascript
console.log(2 + 3);
```

Remember the kitchen analogy.
The REPL is a tasting spoon.
You taste one small thing right now.
A script file is the full recipe.
It runs, but it only speaks when you tell it to print.

---

## Frame 06 - A Function Name Is Not a Function Call

[05:15-06:20]

One important early lesson is this:
a function name and a function call are different.

Suppose we define:

```javascript
function square(x) {
  return x * x;
}
```

If we type:

```javascript
square
```

we are pointing at the function.
We are holding the recipe card.
Nothing is cooked yet.

If we type:

```javascript
square(7)
```

now we are calling the function.
We are following the recipe with the input `7`.
The result is `49`.

This distinction matters a lot.
Parentheses mean: do the work now.
No parentheses means: refer to the function itself.

Pause for a second.
Say it out loud:
`square` is the recipe.
`square(7)` is cooking with the recipe.

---

## Frame 07 - How the Repo Is Organized

[06:20-07:30]

This learning path has a simple workflow.

First, read the knowledge file.
That is the theory.
It explains the ideas.

Second, work on the practice file.
That is where you type code.
Practice files have TODO placeholders.
You fill them in.

Third, check the solution file.
Do not start with the solution.
Use it after you have tried.

Fourth, write or read the learning report.
The report records what was understood, what went wrong, and what comes next.

The folders are separate on purpose.

`knowledge/` is for reading.
`practice/` is for doing.
`learning-summary/` is for reflection and video artifacts.

Think of it like a cooking class.
The textbook explains the dish.
The kitchen station is where you cook.
The instructor notes record what you learned.

---

## Frame 08 - Mistakes Are Part of the System

[07:30-08:30]

You will make mistakes.
That is expected.

In the first session, some mistakes already appeared.

Typing `clear` in the REPL caused an error.
Why?
Because the REPL thought `clear` was JavaScript code.
The REPL command is `.clear`, with a dot.

Another mistake was file path confusion.
The knowledge file is not inside the practice folder.
The theory and exercises live in different trees.

Another important discovery:
typing `square` without parentheses does not call the function.
It returns the function itself.

These are not failures.
They are useful signals.

A kitchen mistake teaches you where the salt is, how hot the pan is, and which knife to use.
A programming mistake teaches you how the language thinks.

---

## Frame 09 - What Comes Next

[08:30-09:15]

In the next session, we begin section 1.1: Getting Started.

We will talk about why programming languages need precision.
We will use the REPL.
We will separate expressions from statements.
We will meet functions, objects, and errors.

The goal is not to memorize many words.
The goal is to build a simple mental map.

Data is the raw ingredient.
An expression produces a value.
A function is reusable logic.
An object bundles data with useful tools.
A statement tells the computer to do something.

Keep the kitchen image in mind.
We are not opening the restaurant yet.
We are learning the first tools at the counter.

