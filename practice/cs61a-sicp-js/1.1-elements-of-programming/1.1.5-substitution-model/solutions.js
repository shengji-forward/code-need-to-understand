/**
 * CS61A SICP JS - Chapter 1.1.5: The Substitution Model
 * Reference Solutions
 *
 * CRITICAL: This is the most important section in Chapter 1.
 * Make sure you understand the substitution model before moving on!
 */

console.log("=== SOLUTIONS FOR 1.1.5 SUBSTITUTION MODEL ===\n");

// ===== BASIC SUBSTITUTION =====

function square(x) {
    return x * x;
}

console.log("Example 1: square(5) =", square(5));
// Substitution model:
// square(5)
// → substitute 5 for x in return x * x
// → 5 * 5
// → 25

function sum_of_squares(x, y) {
    return square(x) + square(y);
}

console.log("\nExercise 1: sum_of_squares(3, 4) =", sum_of_squares(3, 4));
// Complete trace:
// sum_of_squares(3, 4)
// → substitute 3 for x, 4 for y
// → square(3) + square(4)
// → (3 * 3) + (4 * 4)
// → 9 + 16
// → 25

function f(a) {
    return sum_of_squares(a + 1, a * 2);
}

console.log("\nExercise 2: f(5) =", f(5));
// Complete trace:
// f(5)
// → substitute 5 for a
// → sum_of_squares(5 + 1, 5 * 2)
// → sum_of_squares(6, 10)
// → square(6) + square(10)
// → (6 * 6) + (10 * 10)
// → 36 + 100
// → 136

// ===== SUBSTITUTION WITH CONDITIONALS =====

function abs(x) {
    return x < 0 ? -x : x;
}

console.log("\nExercise 3: abs(-5) =", abs(-5));
// Trace:
// abs(-5)
// → substitute -5 for x
// → -5 < 0 ? -(-5) : -5
// → true ? 5 : -5
// → 5

console.log("\nExercise 4: abs(10) =", abs(10));
// Trace:
// abs(10)
// → substitute 10 for x
// → 10 < 0 ? -10 : 10
// → false ? -10 : 10
// → 10

// ===== NESTED FUNCTION APPLICATIONS =====

function g(x, y) {
    return square(x) + square(y) + square(x + y);
}

console.log("\nExercise 5: g(2, 3) =", g(2, 3));
// Complete trace:
// g(2, 3)
// → substitute 2 for x, 3 for y
// → square(2) + square(3) + square(2 + 3)
// → (2 * 2) + (3 * 3) + square(5)
// → 4 + 9 + (5 * 5)
// → 4 + 9 + 25
// → 38

function h(x) {
    return square(x + 1) - square(x - 1);
}

console.log("\nExercise 6: h(4) =", h(4));
// Complete trace:
// h(4)
// → substitute 4 for x
// → square(4 + 1) - square(4 - 1)
// → square(5) - square(3)
// → (5 * 5) - (3 * 3)
// → 25 - 9
// → 16

// ===== APPLICATIVE VS NORMAL ORDER =====

function test_order(x, y) {
    return x;
}

console.log("\nExercise 7: Applicative order demonstration");
console.log("test_order(1, 2 * 3) =", test_order(1, 2 * 3));
// → 1

// Note: In applicative order (what JS does):
// 1. Evaluate 2 * 3 → 6
// 2. Call test_order(1, 6)
// 3. Return 1
// The 6 is computed even though it's never used!

// In normal order (theoretical):
// 1. Substitute (2 * 3) for y WITHOUT evaluating
// 2. Since y is never used, 2 * 3 is NEVER evaluated
// 3. Return 1

// ===== CHALLENGE EXERCISES =====

function pythagorean(a, b) {
    const a_squared = square(a);
    const b_squared = square(b);
    return Math.sqrt(a_squared + b_squared);
}

console.log("\nExercise 8: pythagorean(3, 4) =", pythagorean(3, 4));
// Trace:
// pythagorean(3, 4)
// → substitute 3 for a, 4 for b
// → const a_squared = square(3);
// → const b_squared = square(4);
// → return Math.sqrt(a_squared + b_squared);
// → Math.sqrt(9 + 16)
// → Math.sqrt(25)
// → 5

function double(x) {
    return x * 2;
}

function quadruple(x) {
    return double(double(x));
}

console.log("\nExercise 9: quadruple(5) =", quadruple(5));
// Trace:
// quadruple(5)
// → substitute 5 for x
// → double(double(5))
// → double(5 * 2)
// → double(10)
// → 10 * 2
// → 20

// ===== DEEPER INSIGHTS =====

console.log("\n=== DEEPER INSIGHTS ===\n");

console.log("Why is the substitution model so important?");
console.log("1. It's a mental model for understanding code execution");
console.log("2. It helps you debug by tracing step-by-step");
console.log("3. It's essential for understanding recursion");
console.log("4. It helps you read other people's code");
console.log("5. It's the foundation for the environment model (Chapter 3)\n");

console.log("Common mistakes:");
console.log("❌ Forgetting to substitute ALL occurrences");
console.log("   square(x) + square(x) with x=3");
console.log("   Wrong: 3 * 3 + 3");
console.log("   Right: 3 * 3 + 3 * 3\n");

console.log("❌ Evaluating in wrong order");
console.log("   square(2 + 3)");
console.log("   Wrong: square(5) → substitute: 5 * 5");
console.log("   Right: substitute: (2 + 3) * (2 + 3) → 5 * 5\n");

console.log("❌ Confusing normal and applicative order");
console.log("   For most cases, they give the same answer");
console.log("   But they differ with side effects!");
console.log("   Example: console.log('a'), console.log('b')");
console.log("   Applicative: Both print immediately");
console.log("   Normal: Only print if used\n");

console.log("\n=== PRACTICE TIPS ===\n");

console.log("1. Start simple: Trace square(5)");
console.log("2. Use pen and paper: Write each step on a new line");
console.log("3. Be systematic: Substitute all parameters at once");
console.log("4. Check your work: Run code to verify");
console.log("5. Practice daily: It takes time to build intuition\n");

console.log("\n=== END OF SOLUTIONS ===");
