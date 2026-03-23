/**
 * CS61A SICP JS - Chapter 1.1.2: Naming and the Environment
 * Practice Exercises
 *
 * INSTRUCTIONS:
 * 1. Run each code block in order (statements depend on previous ones)
 * 2. Understand what each constant declaration does
 * 3. Try modifying values and see what changes
 */

// ===== CONSTANT DECLARATIONS =====

// Exercise 1: Basic constant declaration
// Before running, predict: What will size evaluate to?
const size = 2;
console.log("Exercise 1:");
console.log("size =", size);
console.log("5 * size =", 5 * size);

// Exercise 2: Using constants in calculations
// Predict: What will these evaluate to?
const pi = 3.14159;
const radius = 10;
console.log("\nExercise 2:");
console.log("pi =", pi);
console.log("radius =", radius);
console.log("Area of circle (pi * r²) =", pi * radius * radius);

// Exercise 3: Building on previous constants
// Predict: What will circumference be?
const circumference = 2 * pi * radius;
console.log("\nExercise 3:");
console.log("circumference =", circumference);

// Exercise 4: Constants can depend on other constants
// Predict: What will diameter be?
const diameter = 2 * radius;
console.log("\nExercise 4:");
console.log("diameter =", diameter);

// Exercise 5: Building complex calculations step by step
// Predict: What will area be?
const radiusSquared = radius * radius;
const area = pi * radiusSquared;
console.log("\nExercise 5:");
console.log("radius² =", radiusSquared);
console.log("area =", area);

// ===== CHALLENGE EXERCISES =====

// Exercise 6: Temperature conversion
// Create constants to convert Celsius to Fahrenheit
// Formula: F = (C * 9/5) + 32
const celsius = 25;
// Your code: Create fahrenheit constant
// const fahrenheit = ???;
console.log("\nExercise 6:");
console.log(`${celsius}°C = ${fahrenheit}°F`);

// Exercise 7: Distance calculation
// Given speed (mph) and time (hours), calculate distance
const speed = 60;  // miles per hour
const time = 2.5;  // hours
// Your code: Create distance constant
// const distance = ???;
console.log("\nExercise 7:");
console.log(`Traveling ${speed} mph for ${time} hours = ${distance} miles`);

// Exercise 8: Building a calculation step by step
// Calculate the area of a rectangle with a semicircle on top
// (like a window shape)
const rectWidth = 10;
const rectHeight = 8;
const semicircleRadius = rectWidth / 2;
// Your code: Calculate rectArea, semicircleArea, totalArea
// const rectArea = ???;
// const semicircleArea = ???;  // Hint: Area of semicircle = (π * r²) / 2
// const totalArea = ???;
console.log("\nExercise 8:");
console.log("Rectangle area:", rectArea);
console.log("Semicircle area:", semicircleArea);
console.log("Total area:", totalArea);

// ===== ENVIRONMENT EXPLORATION =====

// Exercise 9: Understanding the environment
/*
Try to answer these questions before running the code:

1. What happens if you try to redeclare a constant?
   const size = 5;  // Try this

2. What happens if you try to use a name before declaring it?
   console.log(undefinedName);  // Try this

3. Can a constant refer to itself?
   const x = x + 1;  // Try this

4. What's the difference between const and let?
   const immutable = 1;
   let mutable = 1;
   // Try to change both

Run these in your REPL and note what happens!
*/

// Exercise 10: Incremental development
/*
SICP emphasizes building programs step by step.
Instead of writing everything at once, declare constants incrementally.

Bad approach:
const result = 3.14159 * 10 * 10;  // What do these numbers mean?

Good approach:
const pi = 3.14159;
const radius = 10;
const radiusSquared = radius * radius;
const area = pi * radiusSquared;

Rewrite the following expression using this approach:
const confusing = 2 * 3.14159 * 10 + 4 * 10;
*/
// Your refactored version:
// const pi = ???;
// const circumference = ???;
// const perimeter = ???;
// const total = ???;

// ===== REFLECTION QUESTIONS =====
/*
1. Why does SICP call constant declarations "the simplest means of abstraction"?
   Your answer: ???

2. How does the environment help with incremental development?
   Your answer: ???

3. What are the benefits of using meaningful names vs. raw values?
   Your answer: ???

4. Why might complex programs consist of "a large number of relatively simple functions"?
   Your answer: ???
*/

module.exports = {
  size,
  pi,
  radius,
  circumference,
  // Add other constants as needed
};
