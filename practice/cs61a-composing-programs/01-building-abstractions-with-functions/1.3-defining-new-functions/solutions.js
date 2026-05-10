// CS61A Composing Programs — 1.3 Defining New Functions
// Adapted from https://composingprograms.com/pages/13-defining-new-functions.html
// Run: node practice/cs61a-composing-programs/01-building-abstractions-with-functions/1.3-defining-new-functions/solutions.js

import { assertEqual, assertApprox } from "../../shared/helpers.js";

// --- Exercise 1: square ---
// Return the square of x (x * x).
function square(x) {
  return x * x;
}
assertEqual("square(5)", square(5), 25);
assertEqual("square(-3)", square(-3), 9);
assertEqual("square(0)", square(0), 0);

// --- Exercise 2: cube ---
// Return the cube of x (x^3). Use the square() function above.
function cube(x) {
  return square(x) * x;
}
assertEqual("cube(3)", cube(3), 27);
assertEqual("cube(2)", cube(2), 8);
assertEqual("cube(-1)", cube(-1), -1);

// --- Exercise 3: areaOfCircle ---
// Return the area of a circle with the given radius. Use square() and Math.PI.
function areaOfCircle(radius) {
  return Math.PI * square(radius);
}
assertApprox("areaOfCircle(10)", areaOfCircle(10), Math.PI * 100);
assertApprox("areaOfCircle(1)", areaOfCircle(1), Math.PI);

// --- Exercise 4: celsiusToFahrenheit ---
// Convert a Celsius temperature to Fahrenheit: F = C * 9 / 5 + 32
function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}
assertEqual("freezing point", celsiusToFahrenheit(0), 32);
assertEqual("boiling point", celsiusToFahrenheit(100), 212);
assertEqual("body temp", celsiusToFahrenheit(37), 98.6);

// --- Exercise 5: greet ---
// Return a greeting string. The greeting parameter defaults to "Hello".
function greet(name, greeting = "Hello") {
  return greeting + ", " + name + "!";
}
assertEqual("default greeting", greet("World"), "Hello, World!");
assertEqual("custom greeting", greet("World", "Hi"), "Hi, World!");
assertEqual("howdy", greet("Partner", "Howdy"), "Howdy, Partner!");

// --- Exercise 6: hypotenuse ---
// Return the length of the hypotenuse of a right triangle with sides a and b.
// Use square() and Math.sqrt.
function hypotenuse(a, b) {
  return Math.sqrt(square(a) + square(b));
}
assertApprox("hypotenuse(3,4)", hypotenuse(3, 4), 5);
assertApprox("hypotenuse(5,12)", hypotenuse(5, 12), 13);
assertApprox("hypotenuse(1,1)", hypotenuse(1, 1), Math.SQRT2);

console.log("\n=== Section 1.3 Solutions Complete ===");
