// SOLUTION: Exercise 3 - Control Flow and Loops
// Compare with your work to see how you did!

console.log("=== Exercise 3: Control Flow and Loops (Solution) ===\n");

// ============================================
// SOLUTION 1: Use if/else to categorize scores
// ============================================
function getGrade(score: number): string {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else {
    return "F";
  }
}

console.log("Score 95:", getGrade(95)); // "A"
console.log("Score 85:", getGrade(85)); // "B"
console.log("Score 75:", getGrade(75)); // "C"
console.log("Score 65:", getGrade(65)); // "F"

// ============================================
// SOLUTION 2: Use a ternary operator
// ============================================
function canDrive(age: number): string {
  return age >= 18 ? "Can drive" : "Cannot drive";
}

console.log("\nAge 20:", canDrive(20)); // "Can drive"
console.log("Age 15:", canDrive(15)); // "Cannot drive"

// ============================================
// SOLUTION 3: Use for...of loop
// ============================================
function sumArray(numbers: number[]): number {
  let total = 0;

  for (const num of numbers) {
    total += num;
  }

  return total;
}

console.log("\nSum of [1, 2, 3, 4, 5]:", sumArray([1, 2, 3, 4, 5])); // 15

// ============================================
// SOLUTION 4: Use for...in loop
// ============================================
function logObject(obj: Record<string, any>): void {
  for (const key in obj) {
    console.log(`Key: ${key}, Value: ${obj[key]}`);
  }
}

console.log("\n=== Object Properties ===");
logObject({ name: "Alice", age: 30, city: "NYC" });

// ============================================
// SOLUTION 5: Use break and continue
// ============================================
function findFirstNegative(numbers: number[]): number | undefined {
  for (const num of numbers) {
    if (num < 0) {
      return num; // Found it, exit early
    }
  }

  return undefined; // No negative number found
}

console.log("\nFirst negative in [1, 2, -3, 4]:", findFirstNegative([1, 2, -3, 4])); // -3
console.log("First negative in [1, 2, 3]:", findFirstNegative([1, 2, 3])); // undefined

// ============================================
// BONUS SOLUTION
// ============================================
function fizzBuzz(n: number): string {
  if (n % 15 === 0) {
    // Check both first (divisible by both 3 and 5)
    return "FizzBuzz";
  } else if (n % 3 === 0) {
    return "Fizz";
  } else if (n % 5 === 0) {
    return "Buzz";
  } else {
    return String(n);
  }
}

console.log("\n=== Bonus Challenge ===");
console.log("fizzBuzz(3):", fizzBuzz(3)); // "Fizz"
console.log("fizzBuzz(5):", fizzBuzz(5)); // "Buzz"
console.log("fizzBuzz(15):", fizzBuzz(15)); // "FizzBuzz"
console.log("fizzBuzz(7):", fizzBuzz(7)); // "7"

console.log("\n✅ Exercise complete!");
