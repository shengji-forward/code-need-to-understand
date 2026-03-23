/**
 * CS61A SICP JS - Chapter 1.1.2: Naming and the Environment
 * Reference Solutions
 *
 * Use this to check your work AFTER completing the practice exercises.
 */

console.log("=== SOLUTIONS FOR 1.1.2 NAMING AND ENVIRONMENT ===\n");

// ===== BASIC EXERCISES =====

const size = 2;
console.log("Exercise 1:");
console.log("size =", size);           // → 2
console.log("5 * size =", 5 * size);   // → 10

const pi = 3.14159;
const radius = 10;
console.log("\nExercise 2:");
console.log("pi =", pi);
console.log("radius =", radius);
console.log("Area of circle (pi * r²) =", pi * radius * radius);  // → 314.159

const circumference = 2 * pi * radius;
console.log("\nExercise 3:");
console.log("circumference =", circumference);  // → 62.8318

const diameter = 2 * radius;
console.log("\nExercise 4:");
console.log("diameter =", diameter);  // → 20

const radiusSquared = radius * radius;
const area = pi * radiusSquared;
console.log("\nExercise 5:");
console.log("radius² =", radiusSquared);  // → 100
console.log("area =", area);              // → 314.159

// ===== CHALLENGE EXERCISES =====

// Exercise 6: Temperature conversion
const celsius = 25;
const fahrenheit = (celsius * 9 / 5) + 32;
console.log("\nExercise 6:");
console.log(`${celsius}°C = ${fahrenheit}°F`);  // → 25°C = 77°F

// Exercise 7: Distance calculation
const speed = 60;
const time = 2.5;
const distance = speed * time;
console.log("\nExercise 7:");
console.log(`Traveling ${speed} mph for ${time} hours = ${distance} miles`);
// → Traveling 60 mph for 2.5 hours = 150 miles

// Exercise 8: Window shape (rectangle + semicircle)
const rectWidth = 10;
const rectHeight = 8;
const semicircleRadius = rectWidth / 2;

const rectArea = rectWidth * rectHeight;
const semicircleArea = (pi * semicircleRadius * semicircleRadius) / 2;
const totalArea = rectArea + semicircleArea;

console.log("\nExercise 8:");
console.log("Rectangle area:", rectArea);           // → 80
console.log("Semicircle area:", semicircleArea);     // → ~39.27
console.log("Total area:", totalArea);               // → ~119.27

// ===== INCREMENTAL DEVELOPMENT EXAMPLE =====

// Bad approach (hard to understand):
const confusing = 2 * 3.14159 * 10 + 4 * 10;
// What do these numbers mean?

// Good approach (clear and maintainable):
const pi_good = 3.14159;
const radius_good = 10;
const circumference_good = 2 * pi_good * radius_good;
const perimeter_rect = 4 * radius_good;  // Assuming square
const total_good = circumference_good + perimeter_rect;

console.log("\nIncremental Development Example:");
console.log("Bad version:", confusing);
console.log("Good version:", total_good);

// ===== REFLECTION QUESTIONS - ANSWERS =====

console.log("\n=== REFLECTION ANSWERS ===\n");

console.log("Q1: Why does SICP call constant declarations 'the simplest means of abstraction'?");
console.log("A1: Because it lets us name a complex computation and reuse it by that name.");
console.log("    Instead of repeating 3.14159, we use pi.");
console.log("    We abstract away the value and focus on the meaning.\n");

console.log("Q2: How does the environment help with incremental development?");
console.log("A2: The environment remembers all previous name-object associations.");
console.log("    We can build complex programs step by step, testing each piece.");
console.log("    Each new constant can build on previously defined ones.\n");

console.log("Q3: What are the benefits of using meaningful names vs. raw values?");
console.log("A3: - Readability: pi vs 3.14159");
console.log("    - Maintainability: Change pi in one place, updates everywhere");
console.log("    - Self-documenting: size = 2 tells us more than just 2");
console.log("    - Reduced errors: Can't typo 3.14159 as 3.14195 if using pi\n");

console.log("Q4: Why might complex programs consist of 'a large number of relatively simple functions'?");
console.log("A4: Because simple functions are easier to:");
console.log("    - Understand (one purpose)");
console.log("    - Test (fewer cases)");
console.log("    - Reuse (composable)");
console.log("    - Debug (isolated behavior)");
console.log("    - Complex functions hide bugs and confuse readers\n");

// ===== ENVIRONMENT EXPLORATION - EXPLANATIONS =====

console.log("\n=== ENVIRONMENT EXPLORATION EXPLANATIONS ===\n");

console.log("1. What happens if you try to redeclare a constant?");
console.log("   → SyntaxError: Identifier 'size' has already been declared");
console.log("   Constants cannot be reassigned or redeclared.\n");

console.log("2. What happens if you try to use a name before declaring it?");
console.log("   → ReferenceError: size is not defined");
console.log("   You must declare a constant before using it.\n");

console.log("3. Can a constant refer to itself?");
console.log("   → ReferenceError: Cannot access 'x' before initialization");
console.log("   The right side is evaluated before the assignment, so x doesn't exist yet.\n");

console.log("4. What's the difference between const and let?");
console.log("   const: Cannot be reassigned");
console.log("   let: Can be reassigned");
console.log("   Example:");
console.log("   const immutable = 1;");
console.log("   immutable = 2;  // → TypeError: Assignment to constant variable");
console.log("   let mutable = 1;");
console.log("   mutable = 2;     // → Works fine\n");

console.log("\n=== END OF SOLUTIONS ===");
