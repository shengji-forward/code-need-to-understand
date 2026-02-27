// EXERCISE 1: TypeScript Types and Interfaces - SOLUTION
//
// This file contains the solutions for exercise-01-types-and-interfaces.ts
// Run with: npx tsx exercise-01-types-and-interfaces-solution.ts

console.log("=== Exercise 1: TypeScript Types and Interfaces - SOLUTION ===\n");

// ============================================
// SOLUTION 1: Create an interface
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  category?: string; // Optional property
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 999,
  category: "Electronics"
};

console.log("Product:", product);

// ============================================
// SOLUTION 2: Extend an interface
// ============================================

interface DigitalProduct extends Product {
  downloadLink: string;
}

const digitalProduct: DigitalProduct = {
  id: 2,
  name: "E-book",
  price: 29,
  category: "Books",
  downloadLink: "https://example.com/download/ebook.pdf"
};

console.log("Digital product:", digitalProduct);

// ============================================
// SOLUTION 3: Create a type alias
// ============================================

// Using union of literal types
type Status = "pending" | "active" | "inactive" | "suspended";

const currentStatus: Status = "active";

console.log("Current status:", currentStatus);

// ============================================
// SOLUTION 4: Create a union type
// ============================================

// ID can be number or string
type ID = string | number;

function parseId(id: ID): string {
  // Type narrowing with typeof
  if (typeof id === "number") {
    return `Number ID: ${id}`;
  } else {
    return `String ID: ${id}`;
  }
}

console.log("Parse ID 123:", parseId(123)); // "Number ID: 123"
console.log("Parse ID 'abc':", parseId("abc")); // "String ID: abc"

// ============================================
// SOLUTION 5: Create an intersection type
// ============================================

type Employee = {
  id: number;
  name: string;
};

type Manager = {
  department: string;
  reports: Employee[];
};

// Intersection type combines both types
type TeamManager = Employee & Manager;

const teamManager: TeamManager = {
  id: 1,
  name: "Sarah",
  department: "Engineering",
  reports: [
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
    { id: 4, name: "Bob" }
  ]
};

console.log("Team manager:", teamManager);

// ============================================
// BONUS CHALLENGE SOLUTION
// ============================================

// Coordinate is a tuple type with exactly 2 numbers
type Coordinate = [number, number];

function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;

  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
}

const coord1: Coordinate = [0, 0];
const coord2: Coordinate = [3, 4];

console.log("\n=== Bonus Challenge ===");
console.log("Distance between (0,0) and (3,4):", calculateDistance(coord1, coord2)); // 5

console.log("\n✅ Exercise complete!");

export {};
