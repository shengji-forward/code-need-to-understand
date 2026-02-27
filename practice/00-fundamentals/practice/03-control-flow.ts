// Control Flow Practice
// Run with: npx tsx 03-control-flow.ts

console.log("=== Control Flow ===\n");

// ============================================
// LEVEL 1: if/else Statements
// ============================================

const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

// ============================================
// LEVEL 1: Ternary Operator
// ============================================

const age = 20;
const canVote = age >= 18 ? "Yes" : "No";
console.log(`\nCan vote: ${canVote}`);

// Nested ternary (not recommended - use if/else instead)
const grade =
  score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(`Grade (ternary): ${grade}`);

// ============================================
// LEVEL 1: Switch Statements
// ============================================

const day = "Monday";
let dayType: string;

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    dayType = "Weekday";
    break;
  case "Saturday":
  case "Sunday":
    dayType = "Weekend";
    break;
  default:
    dayType = "Unknown";
}

console.log(`\n${day} is a ${dayType}`);

// ============================================
// LEVEL 2: for Loops
// ============================================

console.log("\n=== Traditional for Loop ===");
// Traditional for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// ============================================
// LEVEL 2: for...of Loop (Arrays)
// ============================================

console.log("\n=== for...of Loop ===");
const fruits = ["apple", "banana", "orange"];

// for...of iterates over VALUES
for (const fruit of fruits) {
  console.log(fruit);
}

// ============================================
// LEVEL 2: for...in Loop (Objects)
// ============================================

console.log("\n=== for...in Loop ===");
const user = { name: "Alice", age: 30, city: "NYC" };

// for...in iterates over KEYS
for (const key in user) {
  console.log(`${key}: ${user[key as keyof typeof user]}`);
}

// ============================================
// LEVEL 2: while Loops
// ============================================

console.log("\n=== while Loop ===");
let countdown = 3;

while (countdown > 0) {
  console.log(`Countdown: ${countdown}`);
  countdown--;
}
console.log("Done!");

// ============================================
// LEVEL 2: break and continue
// ============================================

console.log("\n=== break Statement ===");
// break exits the loop completely
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Stop when i reaches 5
  }
  console.log(i);
}

console.log("\n=== continue Statement ===");
// continue skips to the next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i is 2
  }
  console.log(i);
}

// ============================================
// LEVEL 3: Early Returns
// ============================================

console.log("\n=== Early Returns ===");

function getDiscount(amount: number): number {
  // Early return for edge cases
  if (amount <= 0) {
    return 0;
  }

  if (amount < 100) {
    return 0.05; // 5% discount
  }

  if (amount < 500) {
    return 0.1; // 10% discount
  }

  return 0.15; // 15% discount
}

console.log("Discount for $50:", getDiscount(50) * 100 + "%");
console.log("Discount for $200:", getDiscount(200) * 100 + "%");
console.log("Discount for $1000:", getDiscount(1000) * 100 + "%");

// ============================================
// LEVEL 3: Loop Control Patterns
// ============================================

console.log("\n=== Finding First Match ===");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let firstEven: number | undefined;

for (const num of numbers) {
  if (num % 2 === 0) {
    firstEven = num;
    break; // Found it, stop looking
  }
}

console.log("First even number:", firstEven);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use for...of for arrays (cleaner than traditional for)
const items = ["a", "b", "c"];
for (const item of items) {
  console.log(item);
}

// ✅ Use for...in for objects (not arrays)
const obj = { x: 1, y: 2 };
for (const key in obj) {
  console.log(key, obj[key as keyof typeof obj]);
}

// ✅ Use ternary for simple conditions only
const isActive = true;
const status = isActive ? "Active" : "Inactive";
console.log("Status:", status);

// ✅ Avoid nested ternary (use if/else instead)
if (score >= 90) {
  console.log("Excellent");
} else if (score >= 70) {
  console.log("Good");
} else {
  console.log("Needs improvement");
}

// ✅ Use early returns to reduce nesting
function processUser(user: { name?: string; age?: number }) {
  if (!user.name) {
    return "No name provided";
  }

  if (!user.age) {
    return "No age provided";
  }

  return `Processing ${user.name}, age ${user.age}`;
}

console.log("\n✅ Practice complete!");

export {}