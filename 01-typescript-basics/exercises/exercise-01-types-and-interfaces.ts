// EXERCISE 1: TypeScript Types and Interfaces
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-01-types-and-interfaces.ts

console.log("=== Exercise 1: TypeScript Types and Interfaces ===\n");

// ============================================
// TODO 1: Create an interface
// ============================================
// Instructions:
// - Create an interface called 'Product' with:
//   - id: number
//   - name: string
//   - price: number
//   - category: string (optional)
// - Create a product object using this interface

// TODO: Your code here
// interface Product {
//   ...
// }

// const product: Product = { ... };

console.log("Product:", product);

// ============================================
// TODO 2: Extend an interface
// ============================================
// Instructions:
// - Create an interface called 'DigitalProduct' that extends Product
// - Add a 'downloadLink' property (string)
// - Create a digital product object

// TODO: Your code here
// interface DigitalProduct extends Product {
//   ...
// }

// const digitalProduct: DigitalProduct = { ... };

console.log("Digital product:", digitalProduct);

// ============================================
// TODO 3: Create a type alias
// ============================================
// Instructions:
// - Create a type alias called 'Status' that can be:
//   - "pending"
//   - "active"
//   - "inactive"
//   - "suspended"
// - Create a variable of this type

// TODO: Your code here
// type Status = ...

// const currentStatus: Status = ...;

console.log("Current status:", currentStatus);

// ============================================
// TODO 4: Create a union type
// ============================================
// Instructions:
// - Create a type alias called 'ID' that can be either:
//   - A number
//   - A string
// - Create a function called 'parseId' that takes an ID and:
//   - If it's a number, return "Number ID: {id}"
//   - If it's a string, return "String ID: {id}"
// - Use type narrowing (typeof)

// TODO: Your code here
// type ID = ...

// function parseId(id: ID): string {
//   // Use typeof to narrow the type
// }

console.log("Parse ID 123:", parseId(123)); // Should be "Number ID: 123"
console.log("Parse ID 'abc':", parseId("abc")); // Should be "String ID: abc"

// ============================================
// TODO 5: Create an intersection type
// ============================================
// Instructions:
// - Create type 'Employee' with: id (number), name (string)
// - Create type 'Manager' with: department (string), reports (Employee[])
// - Create intersection type 'TeamManager' = Employee & Manager
// - Create a teamManager object with all properties

// TODO: Your code here
// type Employee = { ... };
// type Manager = { ... };
// type TeamManager = Employee & Manager;

// const teamManager: TeamManager = { ... };

console.log("Team manager:", teamManager);

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a type alias called 'Coordinate' that is a tuple: [number, number]
// - Create a function called 'calculateDistance' that takes two coordinates
// - Return the distance between them (use the distance formula: sqrt((x2-x1)^2 + (y2-y1)^2))
// - Use Math.sqrt()

// TODO: Your code here
// type Coordinate = ...

// function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
//   ...
// }

const coord1: Coordinate = [0, 0];
const coord2: Coordinate = [3, 4];

console.log("\n=== Bonus Challenge ===");
console.log("Distance between (0,0) and (3,4):", calculateDistance(coord1, coord2)); // Should be 5

console.log("\n✅ Exercise complete!");

export {};
