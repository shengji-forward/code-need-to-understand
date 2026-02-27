// EXERCISE 2: TypeScript Advanced Type Annotations
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-02-type-annotations.ts

console.log("=== Exercise 2: TypeScript Advanced Type Annotations ===\n");

// ============================================
// TODO 1: Create a discriminated union
// ============================================
// Instructions:
// - Create a type 'LoadingState' with: { status: "loading" }
// - Create a type 'SuccessState' with: { status: "success"; data: string }
// - Create a type 'ErrorState' with: { status: "error"; error: string }
// - Create a union type 'AppState' that combines all three
// - Create a function 'renderState' that takes AppState and:
//   - If loading: return "Loading..."
//   - If success: return "Data: {data}"
//   - If error: return "Error: {error}"

// TODO: Your code here
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; error: string };
type AppState = LoadingState | SuccessState | ErrorState;

function renderState(state: AppState): string {
  if (state.status === "loading") {
    return `Loading...`
  } else if (state.status === "success") {
    return `Data: ${state.data}`
  } else {
    return `Error: ${state.error}`
  }
}

console.log("Loading:", renderState({ status: "loading" })); // "Loading..."
console.log("Success:", renderState({ status: "success", data: "Hello" })); // "Data: Hello"
console.log("Error:", renderState({ status: "error", error: "Failed" })); // "Error: Failed"

// ============================================
// TODO 2: Use the Partial utility type
// ============================================
// Instructions:
// - Create an interface 'Todo' with:
//   - id: number
//   - title: string
//   - description: string
//   - completed: boolean
// - Create a function 'updateTodo' that takes:
//   - A Todo object
//   - A Partial<Todo> object (updates)
// - Returns a new Todo with updates applied (use spread)
// - The original todo should NOT be modified

// TODO: Your code here
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean
}

function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
  return {...todo, ...updates}
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
// TODO 3: Use the Pick utility type
// ============================================
// Instructions:
// - Use the Todo interface from above
// - Create a type called 'TodoPreview' using Pick that:
//   - Includes only: id, title, and completed
//   - Excludes description
// - Create a TodoPreview object

// TODO: Your code here
type TodoPreview = Pick<Todo, "id" | "title" | "completed">;

const preview: TodoPreview = {
  id: 1,
  title: "Learn TypeScript",
  completed: false
};

console.log("\nPreview:", preview);

// ============================================
// TODO 4: Use the Omit utility type
// ============================================
// Instructions:
// - Create a type called 'TodoCreate' using Omit that:
//   - Excludes: id and completed
//   - Includes: title and description
// - Create a TodoCreate object for creating new todos

// TODO: Your code here
type TodoCreate = Omit<Todo, "id" | "completed">;

const newTodo: TodoCreate = {
  title: "New Task",
  description: "This is a new task"
};

console.log("\nNew todo:", newTodo);

// ============================================
// TODO 5: Type guard with 'in' operator
// ============================================
// Instructions:
// - Create interface 'Bird' with: fly() method, layEggs() method
// - Create interface 'Fish' with: swim() method, layEggs() method
// - Create a function 'move' that takes Bird | Fish
// - Use the 'in' operator to check if 'fly' exists in the animal
// - If Bird: call fly() and log "Flying"
// - If Fish: call swim() and log "Swimming"

// TODO: Your code here
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

console.log("\n=== Type Guards ===");
const bird: Bird = {
  fly: () => console.log("Flying away!"),
  layEggs: () => console.log("Laying eggs")
};

const fish: Fish = {
  swim: () => console.log("Swimming!"),
  layEggs: () => console.log("Laying eggs")
};

move(bird); // Should log "Flying away!"
move(fish); // Should log "Swimming!"

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a type 'ValueWithTimestamp' that wraps any type T and adds a timestamp
// - It should have: value (of type T), timestamp (number)
// - Create a function 'addTimestamp' that takes any value and returns a ValueWithTimestamp
// - The timestamp should be Date.now()

// TODO: Your code here
type ValueWithTimestamp<T> = {
  value: T;
  timestamp: number;
};

function addTimestamp<T>(value: T): ValueWithTimestamp<T> {
  return {
    value: value,
    timestamp: Date.now()
  }
}

console.log("\n=== Bonus Challenge ===");
const timestampedString = addTimestamp("Hello");
console.log("Timestamped string:", timestampedString);

const timestampedNumber = addTimestamp(42);
console.log("Timestamped number:", timestampedNumber);

console.log("\n✅ Exercise complete!");

export {};
