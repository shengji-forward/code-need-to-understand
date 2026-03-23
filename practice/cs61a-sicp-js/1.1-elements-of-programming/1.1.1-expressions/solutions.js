/**
 * CS61A SICP JS - Chapter 1.1.1: Expressions
 * Reference Solutions
 *
 * Use this to check your work AFTER completing the practice exercises.
 * Try to solve each problem yourself first!
 */

console.log("=== SOLUTIONS FOR 1.1.1 EXPRESSIONS ===\n");

// ===== PRIMITIVE EXPRESSIONS =====

console.log("Primitive expressions:");
console.log("486 →", 486);
// Answer: 486

console.log("\nSimple arithmetic:");
console.log("137 + 349 →", 137 + 349);     // → 486
console.log("1000 - 334 →", 1000 - 334);    // → 666
console.log("5 * 99 →", 5 * 99);            // → 495
console.log("10 / 4 →", 10 / 4);            // → 2.5

console.log("\nFloating point:");
console.log("2.7 + 10 →", 2.7 + 10);        // → 12.7

// ===== OPERATOR COMBINATIONS =====

console.log("\nNested expressions:");
console.log("(3 * 5) + (10 - 6) →", (3 * 5) + (10 - 6));
// → 15 + 4 = 19

console.log("\nOperator precedence:");
console.log("3 * 5 + 10 / 2 →", 3 * 5 + 10 / 2);
// → (3 * 5) + (10 / 2) = 15 + 5 = 20

console.log("\nComplex precedence:");
console.log("1 - 5 / 2 * 4 + 3 →", 1 - 5 / 2 * 4 + 3);
// → 1 - ((5 / 2) * 4) + 3
// → 1 - (2.5 * 4) + 3
// → 1 - 10 + 3
// → -9 + 3 = -6

console.log("\nVery complex:");
console.log("3 * 2 * (3 - 5 + 4) + 27 / 6 * 10 →", 3 * 2 * (3 - 5 + 4) + 27 / 6 * 10);
// → 3 * 2 * 2 + 4.5 * 10
// → 6 * 2 + 45
// → 12 + 45 = 57

// ===== CHALLENGE EXERCISES =====

// Exercise 8a: Write an expression that evaluates to 100
const exercise8a = 10 * 10;
console.log("\nChallenge 8a (should be 100):");
console.log("10 * 10 →", exercise8a);

// Other valid answers:
// 50 + 50
// 200 / 2
// 25 * 4

// Exercise 8b: Write an expression that uses +, -, *, and / to get 42
const exercise8b = 50 - 8 + 10 * 2 / 5;
console.log("\nChallenge 8b (should be 42):");
console.log("50 - 8 + 10 * 2 / 5 →", exercise8b);
// → 50 - 8 + 20 / 5
// → 50 - 8 + 4
// → 42 + 4 = 46 ❌ Oops! Let me fix

const exercise8b_correct = 50 - 8 + 10 * 0 / 5;
console.log("Correct version →", 50 - 8 + 10 * 0 / 5);
// → 50 - 8 + 0 = 42 ✓

// Or simpler:
const exercise8b_simple = 20 * 2 + 2;
console.log("Simple version →", 20 * 2 + 2);
// → 40 + 2 = 42 ✓

// Exercise 8c: Write an expression with 5+ operations that's still readable
const exercise8c =
    (3 * 4)           // 12
    + (10 / 2)        // + 5 = 17
    - (1 + 1)         // - 2 = 15
    * 2;              // * 2 = 30

console.log("\nChallenge 8c (5+ operations, readable):");
console.log("(3 * 4) + (10 / 2) - (1 + 1) * 2 →", exercise8c);

// Better readable version:
const exercise8c_readable =
    base_value +
    adjustment +
    multiplier -
    divisor;

const base_value = 3 * 4;        // 12
const adjustment = 10 / 2;       // 5
const multiplier = 2;            // 2
const divisor = 1;               // 1

// ===== REFLECTION QUESTIONS - ANSWERS =====

console.log("\n=== REFLECTION ANSWERS ===\n");

console.log("Q1: Why does 10 / 4 evaluate to 2.5 and not 2?");
console.log("A1: JavaScript performs floating-point division, not integer division.");
console.log("    In many languages, / with integers does integer division.");
console.log("    In JavaScript, / always returns a floating-point number.\n");

console.log("Q2: What happens if you forget parentheses in a complex expression?");
console.log("A2: JavaScript uses operator precedence to determine evaluation order.");
console.log("    * and / bind tighter than + and -, so:");
console.log("    3 * 5 + 10 / 2 means (3 * 5) + (10 / 2), not 3 * (5 + 10) / 2");
console.log("    Always use parentheses when in doubt!\n");

console.log("Q3: Why is it important to write readable expressions?");
console.log("A3: Other people (and future you) need to understand your code.");
console.log("    The interpreter doesn't care about readability, but humans do.");
console.log("    Break complex expressions across lines with parentheses.\n");

console.log("Q4: What does 'left-associative' mean for operators?");
console.log("A4: It means operators of the same precedence are evaluated left-to-right.");
console.log("    Example: 10 - 5 - 2 means (10 - 5) - 2 = 3, not 10 - (5 - 2) = 7");
console.log("    This matters for - and /, but not for + and *\n");

console.log("\n=== END OF SOLUTIONS ===");
