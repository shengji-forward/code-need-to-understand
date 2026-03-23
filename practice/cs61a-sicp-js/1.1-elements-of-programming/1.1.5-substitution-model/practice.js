/**
 * CS61A SICP JS - Chapter 1.1.5: The Substitution Model for Function Application
 * Practice Exercises
 *
 * CRITICAL SECTION: The substitution model is how you mentally trace code execution.
 * Take your time with this - it's foundational for understanding recursion and scope.
 */

// ===== BASIC SUBSTITUTION =====

// Example 1: Simple function application
function square(x) {
    return x * x;
}

// Substitution model for square(5):
// Step 1: Evaluate the operator (square) → function definition
// Step 2: Evaluate the operand (5) → 5
// Step 3: Substitute 5 for x in the function body
// Step 4: Evaluate (5 * 5) → 25
console.log("Example 1: square(5) =", square(5));

// Exercise 1: Trace the substitution
function sum_of_squares(x, y) {
    return square(x) + square(y);
}

// Manually trace sum_of_squares(3, 4):
// Step 1: Evaluate operator → sum_of_squares function
// Step 2: Evaluate operands → 3, 4
// Step 3: Substitute 3 for x, 4 for y:
//         return square(3) + square(4);
// Step 4: Evaluate square(3):
//         substitute 3 for x in square: return 3 * 3; → 9
// Step 5: Evaluate square(4):
//         substitute 4 for x in square: return 4 * 4; → 16
// Step 6: Evaluate 9 + 16 → 25
console.log("\nExercise 1: sum_of_squares(3, 4) =", sum_of_squares(3, 4));

// Exercise 2: Your turn - trace this manually
function f(a) {
    return sum_of_squares(a + 1, a * 2);
}

// Manually trace f(5) before running:
// Step 1: ???
// Step 2: ???
// ...continue until you get the final answer
console.log("\nExercise 2: f(5) =", f(5));
// Was your manual trace correct? If not, where did you go wrong?

// ===== SUBSTITUTION WITH CONDITIONALS =====

function abs(x) {
    return x < 0 ? -x : x;
}

// Exercise 3: Trace abs(-5)
// Step 1: Evaluate operator → abs function
// Step 2: Evaluate operand → -5
// Step 3: Substitute -5 for x:
//         return -5 < 0 ? -(-5) : -5;
// Step 4: Evaluate -5 < 0 → true
// Step 5: Evaluate -(-5) → 5
console.log("\nExercise 3: abs(-5) =", abs(-5));

// Exercise 4: Your turn - trace abs(10)
console.log("\nExercise 4: abs(10) =", abs(10));

// ===== NESTED FUNCTION APPLICATIONS =====

// Exercise 5: Complex substitution
function g(x, y) {
    return square(x) + square(y) + square(x + y);
}

// Trace g(2, 3):
// Step 1: Evaluate g(2, 3)
// Step 2: Substitute 2 for x, 3 for y:
//         return square(2) + square(3) + square(2 + 3);
// Step 3: Evaluate each square(...):
//         square(2) → 4
//         square(3) → 9
//         square(5) → 25
// Step 4: Evaluate 4 + 9 + 25 → 38
console.log("\nExercise 5: g(2, 3) =", g(2, 3));

// Exercise 6: Challenging trace
function h(x) {
    return square(x + 1) - square(x - 1);
}

// Manually trace h(4):
// Your trace:
// Step 1: ???
console.log("\nExercise 6: h(4) =", h(4));

// ===== APPLICATIVE VS NORMAL ORDER =====

/*
This is a subtle but important distinction!

APPLICATIVE ORDER (what JavaScript actually does):
1. Evaluate the operator and operands
2. Apply the function to the evaluated arguments

Example: square(2 + 3)
Step 1: Evaluate 2 + 3 → 5
Step 2: Apply square to 5: square(5)
Step 3: Evaluate 5 * 5 → 25

NORMAL ORDER (theoretical alternative):
1. Substitute operand expressions without evaluating them
2. Evaluate until only primitive operations remain

Example: square(2 + 3) with normal order:
Step 1: Substitute (2 + 3) for x: (2 + 3) * (2 + 3)
Step 2: Evaluate: 5 * 5 → 25

For this example, both give the same answer.
But they can differ when there are side effects!
*/

// Exercise 7: Observing applicative order
function test_order(x, y) {
    return x;
}

console.log("\nExercise 7: Applicative order demonstration");
console.log("test_order(1, 2 * 3) =", test_order(1, 2 * 3));
// Note: 2 * 3 is evaluated even though y is never used!
// In normal order, 2 * 3 would never be evaluated.

// ===== CHALLENGE EXERCISES =====

// Exercise 8: Trace a complex function
function pythagorean(a, b) {
    const a_squared = square(a);
    const b_squared = square(b);
    return Math.sqrt(a_squared + b_squared);
}

// Trace pythagorean(3, 4):
// Your trace:
console.log("\nExercise 8: pythagorean(3, 4) =", pythagorean(3, 4));

// Exercise 9: Multiple levels of nesting
function double(x) {
    return x * 2;
}

function quadruple(x) {
    return double(double(x));
}

// Trace quadruple(5):
// Step 1: Evaluate double(2 * 5) ???
console.log("\nExercise 9: quadruple(5) =", quadruple(5));

// ===== PRACTICE STRATEGY =====

/*
To master the substitution model:

1. Always trace manually before running code
2. Use paper or a text editor to write out each step
3. Check your work by running the code
4. If you're wrong, figure out exactly where you went wrong
5. Practice until you can trace accurately without hesitation

This skill is crucial for:
- Understanding recursion
- Debugging complex code
- Reading other people's code
- Writing correct code
*/

module.exports = {
    square,
    sum_of_squares,
    f,
    abs,
    g,
    h,
    pythagorean,
    double,
    quadruple
};
