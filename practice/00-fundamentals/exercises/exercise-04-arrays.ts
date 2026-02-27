// EXERCISE 4: Arrays and Objects
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-04-arrays.ts

console.log("=== Exercise 4: Arrays and Objects ===\n");

// ============================================
// TODO 1: Array manipulation methods
// ============================================
// Instructions:
// - Start with array [1, 2, 3]
// - Use push to add 4 (result: [1, 2, 3, 4])
// - Use unshift to add 0 at start (result: [0, 1, 2, 3, 4])
// - Use pop to remove last element (result: [0, 1, 2, 3])
// - Log the final array

// TODO: Your code here
let arr = [1, 2, 3];
arr.push(4); // add at the end of array
arr.unshift(0); // add at the start of array
arr.pop(); // removes from end of array
console.log("Final array:", arr);

// ============================================
// TODO 2: Use array map
// ============================================
// Instructions:
// - Create a function called 'doubleAll' that takes an array of numbers
// - Use map to return a new array with each number doubled

// TODO: Your code here
function doubleAll(numbers: number[]): number[] {
  return numbers.map((n) => n * 2)
}

const nums = [1, 2, 3, 4, 5];
console.log("Original:", nums);
console.log("Doubled:", doubleAll(nums)); // Should be [2, 4, 6, 8, 10]

// ============================================
// TODO 3: Use array filter
// ============================================
// Instructions:
// - Create a function called 'getEvens' that takes an array of numbers
// - Use filter to return only even numbers

// TODO: Your code here
// function getEvens(numbers: number[]): number[] {
//   return numbers.filter((n) => {
//     if (n % 2 === 0) {
//       return n
//     }
//   })
// } // works but wrong reason

function getEvents(numbers: number[]):number[] {
  return numbers.filter((n) => n % 2 === 0)
}

console.log("Evens:", getEvents([1, 2, 3, 4, 5, 6])); // Should be [2, 4, 6]

// ============================================
// TODO 4: Use array reduce
// ============================================
// Instructions:
// - Create a function called 'multiplyAll' that takes an array of numbers
// - Use reduce to return the product of all numbers
// - Hint: Start with initial value of 1

// TODO: Your code here
function multiplyAll(numbers: number[]): number {
  return numbers.reduce((product, n) => product * n, 1)
}

console.log("Product of [2, 3, 4]:", multiplyAll([2, 3, 4])); // Should be 24

// ============================================
// TODO 5: Object destructuring
// ============================================
// Instructions:
// - Create a user object with properties: name (string), age (number), email (string)
// - Destructure to extract name and email
// - Log them separately

// TODO: Your code here

type User = {
  name: string,
  age: number,
  email: string
}

const user: User = {
  name: "SJ",
  age: 26,
  email: "shengjideng@gmail.com"
}

const { name, email } = user;
console.log("Name:", name);
console.log("Email:", email);

// ============================================
// TODO 6: Array destructuring
// ============================================
// Instructions:
// - Create an array with 5 colors
// - Destructure to get the first and third colors
// - Log them

// TODO: Your code here
const colors = ["black", "white", "yellow", "brown", "red"];
const [ firstColor, , thirdColor] = colors;
console.log("First:", firstColor);
console.log("Third:", thirdColor);

// ============================================
// TODO 7: Spread operator with objects
// ============================================
// Instructions:
// - Create a base object: { name: "Alice", age: 30 }
// - Use spread to create a new object with all properties plus email: "alice@example.com"
// - Log both objects

// TODO: Your code here
const base = { name: "Alice", age: 30 };
const extended = { ...base, email: "alice@example.com" };
console.log("Base:", base);
console.log("Extended:", extended);

// ============================================
// TODO 8: Immutable array update
// ============================================
// Instructions:
// - Create an array of todos: [{ id: 1, task: "Learn JS", done: false }]
// - Use spread to add a new todo: { id: 2, task: "Practice", done: false }
// - Return a NEW array (don't mutate the original)

// TODO: Your code here
function addTodo(todos: any[], newTodo: any): any[] {
  return [...todos, newTodo] 
}

const todos = [{ id: 1, task: "Learn JS", done: false }];
const newTodos = addTodo(todos, { id: 2, task: "Practice", done: false });
console.log("\nOriginal todos:", todos); // Should have 1 item
console.log("New todos:", newTodos); // Should have 2 items

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a function called 'transformData' that:
//   1. Takes an array of products: { id, name, price, category }
//   2. Filters to only get products in the "electronics" category
//   3. Maps to add a 10% tax to the price (new property: priceWithTax)
//   4. Reduces to calculate total of all priceWithTax values
// - Chain these operations together

// TODO: Your code here
// function transformData(products: any[]): number {
//   return products
//     .filter(({product}) => {product.category === "electronics"}) // Filter by category
//     .map(({product}) => {product.priceWithTax: 1.1})    // Add tax
//     .reduce((sum, product.price) => sum + product.price * product.priceWithTax, 1); // Sum totals
// }

function transformData(products: any[]): number {
  return products
    .filter(({category}) => {return category === "electronics"}) // Filter by category
    .map((product) => ({...product, priceWithTax: product.price * 1.1}))    // Add tax
    .reduce((sum, product) => sum + product.priceWithTax, 0); // Sum totals
}

const products = [
  { id: 1, name: "Laptop", price: 1000, category: "electronics" },
  { id: 2, name: "Book", price: 20, category: "books" },
  { id: 3, name: "Phone", price: 500, category: "electronics" },
  { id: 4, name: "Desk", price: 200, category: "furniture" },
];

console.log("\n=== Bonus Challenge ===");
console.log("Total with tax:", transformData(products));
// Should be: (1000 * 1.1) + (500 * 1.1) = 1100 + 550 = 1650

console.log("\n✅ Exercise complete!");

export {}