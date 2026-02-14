// EXERCISE 3: Control Flow and Loops
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-03-loops.ts

console.log("=== Exercise 3: Control Flow and Loops ===\n");

// ============================================
// TODO 1: Use if/else to categorize scores
// ============================================
// Instructions:
// - Write a function called 'getGrade' that takes a score (number)
// - Return "A" for 90+, "B" for 80+, "C" for 70+, "F" for below 70
// - Use if/else statements

// TODO: Your code here
function getGrade(score: number): string {
  if (score >= 90) {
    return "A"
  } else if (score >= 80) {
    return "B"
  } else if (score >= 70 ) {
    return "C"
  } else {
    return "F"
  }
}

console.log("Score 95:", getGrade(95)); // Should be "A"
console.log("Score 85:", getGrade(85)); // Should be "B"
console.log("Score 75:", getGrade(75)); // Should be "C"
console.log("Score 65:", getGrade(65)); // Should be "F"

// ============================================
// TODO 2: Use a ternary operator
// ============================================
// Instructions:
// - Write a function called 'canDrive' that takes an age
// - Return "Can drive" if age >= 18, "Cannot drive" otherwise
// - Use a ternary operator

// TODO: Your code here

// if/else solution
// function canDrive(age: number): string {
//   if (age >= 18) {
//     return "Can drive"
//   } else {
//     return "Cannot drive"
//   }
// }

// ternary operator solution
function canDrive(age: number): string {
  return age >= 18 ? "Can drive" : "Cannot drive";
}

console.log("\nAge 20:", canDrive(20)); // Should be "Can drive"
console.log("Age 15:", canDrive(15)); // Should be "Cannot drive"

// ============================================
// TODO 3: Use for...of loop
// ============================================
// Instructions:
// - Create a function called 'sumArray' that takes an array of numbers
// - Use a for...of loop to sum all numbers
// - Return the total

// TODO: Your code here
// for...of loop
function sumArray(numbers: number[]): number {
  let total = 0;
  for (const num of numbers) {
    total += num
  }
  return total;
}

// classic for loop
// function sumArray(numbers: number[]): number {
//   let total = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     total += numbers[i];
//   }
//   return total;
// }

// forEach loop – do this for each item (no return value)
// function sumArray(numbers: number[]): number {
//   let total = 0
//   numbers.forEach((n) => { total += n })
//   return total
// }

// while loop
// function sumArray(numbers: number[]): number {
//   let total = 0
//   let i = 0
//   while (i < numbers.length) {
//     total += numbers[i]
//     i++
//   }
//   return total
// }

// reduce – combine all items into one value
// function sumArray(numbers: number[]): number {
//   return numbers.reduce((sum, n) => {
//     return sum + n
//   }, 0)
// }


console.log("\nSum of [1, 2, 3, 4, 5]:", sumArray([1, 2, 3, 4, 5])); // Should be 15

// ============================================
// TODO 4: Use for...in loop
// ============================================
// Instructions:
// - Create a function called 'logObject' that takes an object
// - Use for...in to log each key and value
// - Format: "Key: [key], Value: [value]"

// TODO: Your code here
function logObject(obj: any): void {
  for (const key in obj) {
    console.log(`Key: ${key}, Value: ${obj[key]}`);
  }
}

console.log("\n=== Object Properties ===");
logObject({ name: "Alice", age: 30, city: "NYC" });
// Should log:
// Key: name, Value: Alice
// Key: age, Value: 30
// Key: city, Value: NYC

// ============================================
// TODO 5: Use break and continue
// ============================================
// Instructions:
// - Create a function called 'findFirstNegative' that takes an array
// - Use a for...of loop to find and return the first negative number
// - Use 'break' to exit the loop once found
// - Return undefined if no negative number exists

// TODO: Your code here
// function findFirstNegative(numbers: number[]): number | undefined {
//   for (const n of numbers) {
//     if (n < 0) {
//       return n
//     }
//   }
//   return undefined
// }

function findFirstNegative(numbers: number[]): number | undefined {
  let result: number | undefined = undefined
  for (const n of numbers) {
    if (n < 0) {
      result = n
      break
    }
  }
  return result
}

console.log("\nFirst negative in [1, 2, -3, 4]:", findFirstNegative([1, 2, -3, 4])); // Should be -3
console.log("First negative in [1, 2, 3]:", findFirstNegative([1, 2, 3])); // Should be undefined

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a function called 'fizzBuzz' that takes a number
// - Return "Fizz" if divisible by 3
// - Return "Buzz" if divisible by 5
// - Return "FizzBuzz" if divisible by both 3 and 5
// - Return the number as a string otherwise
// - Use modulo operator (%)

// TODO: Your code here
function fizzBuzz(n: number): string | number {
  if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz"
  } else if (n % 3 === 0) {
    return "Fizz"
  } else if (n % 5 === 0) {
    return "Buzz"
  } else {
    return `${n}`
  }
}

console.log("\n=== Bonus Challenge ===");
console.log("fizzBuzz(3):", fizzBuzz(3)); // Should be "Fizz"
console.log("fizzBuzz(5):", fizzBuzz(5)); // Should be "Buzz"
console.log("fizzBuzz(15):", fizzBuzz(15)); // Should be "FizzBuzz"
console.log("fizzBuzz(7):", fizzBuzz(7)); // Should be "7"

console.log("\n✅ Exercise complete!");
