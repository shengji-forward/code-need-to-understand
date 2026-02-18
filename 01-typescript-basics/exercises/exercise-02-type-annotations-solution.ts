// EXERCISE 2: TypeScript Advanced Type Annotations - SOLUTION
//
// This file contains the solutions for exercise-02-type-annotations.ts
// Run with: npx tsx exercise-02-type-annotations-solution.ts

console.log("=== Exercise 2: TypeScript Advanced Type Annotations - SOLUTION ===\n");

// ============================================
// SOLUTION 1: Create a discriminated union
// ============================================

type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; error: string };

// Union type combines all three states
type AppState = LoadingState | SuccessState | ErrorState;

function renderState(state: AppState): string {
  // Discriminated union narrowing based on 'status' property
  if (state.status === "loading") {
    return "Loading...";
  } else if (state.status === "success") {
    return `Data: ${state.data}`;
  } else {
    return `Error: ${state.error}`;
  }
}

console.log("Loading:", renderState({ status: "loading" })); // "Loading..."
console.log("Success:", renderState({ status: "success", data: "Hello" })); // "Data: Hello"
console.log("Error:", renderState({ status: "error", error: "Failed" })); // "Error: Failed"

// ============================================
// SOLUTION 2: Use the Partial utility type
// ============================================

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
  // Spread creates new object, Partial<Todo> makes all properties optional
  return { ...todo, ...updates };
}

const todo: Todo = {
  id: 1,
  title: "Learn TypeScript",
  description: "Practice generics",
  completed: false
};

const updated = updateTodo(todo, { completed: true, description: "Practice generics and utility types" });

console.log("\nOriginal:", todo); // completed should be false
console.log("Updated:", updated); // completed should be true

// ============================================
// SOLUTION 3: Use the Pick utility type
// ============================================

// Pick only specific properties from Todo
type TodoPreview = Pick<Todo, "id" | "title" | "completed">;

const preview: TodoPreview = {
  id: 1,
  title: "Learn TypeScript",
  completed: false
};

console.log("\nPreview:", preview);

// ============================================
// SOLUTION 4: Use the Omit utility type
// ============================================

// Omit specific properties from Todo
type TodoCreate = Omit<Todo, "id" | "completed">;

const newTodo: TodoCreate = {
  title: "New Task",
  description: "This is a new task"
};

console.log("\nNew todo:", newTodo);

// ============================================
// SOLUTION 5: Type guard with 'in' operator
// ============================================

interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function move(animal: Bird | Fish) {
  // Use 'in' operator to check if property exists
  if ("fly" in animal) {
    animal.fly();
    console.log("Flying");
  } else {
    animal.swim();
    console.log("Swimming");
  }
}

console.log("\n=== Type Guards ===");
const bird: Bird = {
  fly: () => console.log("Flying away!"),
  layEggs: () => console.log("Laying eggs")
};

const fish: Fish = {
  swim: () => console.log("Swimming!"),
  layEggs: () => console.log("Laying eggs")
};

move(bird); // Should log "Flying away!" and "Flying"
move(fish); // Should log "Swimming!" and "Swimming"

// ============================================
// BONUS CHALLENGE SOLUTION
// ============================================

// Generic type that wraps any type T and adds a timestamp
type ValueWithTimestamp<T> = {
  value: T;
  timestamp: number;
};

function addTimestamp<T>(value: T): ValueWithTimestamp<T> {
  return {
    value,
    timestamp: Date.now()
  };
}

console.log("\n=== Bonus Challenge ===");
const timestampedString = addTimestamp("Hello");
console.log("Timestamped string:", timestampedString);

const timestampedNumber = addTimestamp(42);
console.log("Timestamped number:", timestampedNumber);

console.log("\n✅ Exercise complete!");

export {};
