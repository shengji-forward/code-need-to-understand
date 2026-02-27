// SOLUTION: Exercise 4 - Arrays and Objects
// Compare with your work to see how you did!

console.log("=== Exercise 4: Arrays and Objects (Solution) ===\n");

// ============================================
// SOLUTION 1: Array manipulation methods
// ============================================
let arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4]
arr.unshift(0); // [0, 1, 2, 3, 4]
arr.pop(); // [0, 1, 2, 3]
console.log("Final array:", arr);

// ============================================
// SOLUTION 2: Use array map
// ============================================
function doubleAll(numbers: number[]): number[] {
  return numbers.map((n) => n * 2);
}

const nums = [1, 2, 3, 4, 5];
console.log("Original:", nums);
console.log("Doubled:", doubleAll(nums)); // [2, 4, 6, 8, 10]

// ============================================
// SOLUTION 3: Use array filter
// ============================================
function getEvens(numbers: number[]): number[] {
  return numbers.filter((n) => n % 2 === 0);
}

console.log("Evens:", getEvens([1, 2, 3, 4, 5, 6])); // [2, 4, 6]

// ============================================
// SOLUTION 4: Use array reduce
// ============================================
function multiplyAll(numbers: number[]): number {
  return numbers.reduce((product, n) => product * n, 1);
}

console.log("Product of [2, 3, 4]:", multiplyAll([2, 3, 4])); // 24

// ============================================
// SOLUTION 5: Object destructuring
// ============================================
const user = { name: "Alice", age: 30, email: "alice@example.com" };
const { name, email } = user;
console.log("Name:", name);
console.log("Email:", email);

// ============================================
// SOLUTION 6: Array destructuring
// ============================================
const colors = ["red", "green", "blue", "yellow", "purple"];
const [firstColor, , thirdColor] = colors;
console.log("First:", firstColor); // red
console.log("Third:", thirdColor); // blue

// ============================================
// SOLUTION 7: Spread operator with objects
// ============================================
const base = { name: "Alice", age: 30 };
const extended = { ...base, email: "alice@example.com" };
console.log("Base:", base);
console.log("Extended:", extended);

// ============================================
// SOLUTION 8: Immutable array update
// ============================================
function addTodo(todos: any[], newTodo: any): any[] {
  return [...todos, newTodo]; // Create new array with spread
}

const todos = [{ id: 1, task: "Learn JS", done: false }];
const newTodos = addTodo(todos, { id: 2, task: "Practice", done: false });
console.log("\nOriginal todos:", todos); // 1 item
console.log("New todos:", newTodos); // 2 items

// ============================================
// BONUS SOLUTION
// ============================================
function transformData(products: any[]): number {
  return products
    .filter((p) => p.category === "electronics") // Filter by category
    .map((p) => ({ ...p, priceWithTax: p.price * 1.1 })) // Add 10% tax
    .reduce((total, p) => total + p.priceWithTax, 0); // Sum totals
}

const products = [
  { id: 1, name: "Laptop", price: 1000, category: "electronics" },
  { id: 2, name: "Book", price: 20, category: "books" },
  { id: 3, name: "Phone", price: 500, category: "electronics" },
  { id: 4, name: "Desk", price: 200, category: "furniture" },
];

console.log("\n=== Bonus Challenge ===");
console.log("Total with tax:", transformData(products)); // 1650

console.log("\n✅ Exercise complete!");
