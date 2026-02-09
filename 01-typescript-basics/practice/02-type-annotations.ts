// TypeScript Advanced Types Practice
// Run with: npx tsx 02-type-annotations.ts

console.log("=== TypeScript Advanced Types ===\n");

// ============================================
// LEVEL 1: Optional Properties and Nullish
// ============================================

interface UserProfile {
  name: string;
  email: string;
  age?: number; // Optional
  bio?: string | null; // Optional or null
}

const profile1: UserProfile = {
  name: "Alice",
  email: "alice@example.com",
};

const profile2: UserProfile = {
  name: "Bob",
  email: "bob@example.com",
  age: 30,
  bio: null,
};

console.log("Profile 1:", profile1);
console.log("Profile 2:", profile2);

// ============================================
// LEVEL 1: Non-null Assertions
// ============================================

function getLength(str: string | null) {
  // Assert that str is not null (use carefully!)
  return str!.length;
}

console.log("\nLength:", getLength("Hello"));

// ============================================
// LEVEL 2: Type Guards
// ============================================

// Type guard for checking types
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows this is a string here
    console.log("Uppercase:", value.toUpperCase());
  } else {
    // TypeScript knows this is a number here
    console.log("Doubled:", value * 2);
  }
}

console.log("\n=== Type Guards ===");
processValue("hello");
processValue(42);

// Type guard with 'in' operator
interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// ============================================
// LEVEL 2: Discriminated Unions
// ============================================

type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  // TypeScript can narrow based on 'status' property
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

console.log("\n=== Discriminated Unions ===");
handleResponse({ status: "success", data: "User created" });
handleResponse({ status: "error", error: "Invalid input" });

// ============================================
// LEVEL 3: Utility Types
// ============================================

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Partial - makes all properties optional
function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
  return { ...todo, ...updates };
}

const todo1: Todo = {
  id: 1,
  title: "Learn TypeScript",
  description: "Study basics",
  completed: false,
};

const updatedTodo = updateTodo(todo1, { completed: true });
console.log("\n=== Partial ===");
console.log("Updated:", updatedTodo);

// Required - makes all properties required
type PartialTodo = {
  id: number;
  title?: string;
  description?: string;
};

type CompleteTodo = Required<PartialTodo>;

// Pick - select specific properties
type TodoSummary = Pick<Todo, "id" | "title" | "completed">;

const summary: TodoSummary = {
  id: 1,
  title: "Learn TypeScript",
  completed: false,
};

console.log("\n=== Pick ===");
console.log("Summary:", summary);

// Omit - remove specific properties
type TodoPreview = Omit<Todo, "description">;

const preview: TodoPreview = {
  id: 1,
  title: "Learn TypeScript",
  completed: false,
};

console.log("\n=== Omit ===");
console.log("Preview:", preview);

// ============================================
// LEVEL 3: Type Assertions
// ============================================

// Asserting a more specific type
const value: unknown = "Hello, World!";

// Assertion with 'as'
const strLength = (value as string).length;
console.log("\n=== Type Assertions ===");
console.log("Length:", strLength);

// DOM example (common use case)
// const input = document.getElementById("username") as HTMLInputElement;

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use type guards instead of assertions
function safeProcess(val: unknown) {
  if (typeof val === "string") {
    console.log(val.toUpperCase());
  }
}

// ✅ Use discriminated unions for related types
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; error: string };

type State = LoadingState | SuccessState | ErrorState;

// ✅ Use utility types for common transformations
type UserUpdate = Partial<{
  name: string;
  email: string;
  age: number;
}>;

// ✅ Avoid non-null assertions unless you're certain
function saferGetLength(str: string | null): number {
  if (str === null) {
    return 0;
  }
  return str.length;
}

// ✅ Use literal types for specific values
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function makeRequest(method: HttpMethod, url: string) {
  console.log(`Making ${method} request to ${url}`);
}

makeRequest("GET", "/api/users");

console.log("\n✅ Practice complete!");
