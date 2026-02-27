// TypeScript Union Types Practice
// Run with: npx tsx 04-union-types.ts

console.log("=== TypeScript Union Types ===\n");

// ============================================
// LEVEL 1: Basic Union Types
// ============================================

// Union type: value can be string OR number
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log("ID:", id);
}

printId(101); // number works
printId("abc-123"); // string works
// printId(true); // Error: boolean is not StringOrNumber

// ============================================
// LEVEL 1: Type Narrowing with typeof
// ============================================

function getLength(value: string | number): number {
  // Must narrow type before using type-specific operations
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.length;
  }
  // TypeScript knows value is number here
  return value.toString().length;
}

console.log("\n=== Type Narrowing ===");
console.log("Length of 'hello':", getLength("hello"));
console.log("Length of 12345:", getLength(12345));

// ============================================
// LEVEL 1: Optional Properties with ?
// ============================================

interface User {
  id: number;
  name: string;
  email?: string; // Optional property (string | undefined)
  age?: number; // Optional property
}

const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const user2: User = {
  id: 2,
  name: "Bob",
  // email and age omitted
};

console.log("\n=== Optional Properties ===");
console.log("User 1:", user1);
console.log("User 2:", user2);

// Optional parameters in functions
function greet(name: string, greeting?: string): string {
  // greeting is string | undefined
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log("\nGreeting 1:", greet("Alice"));
console.log("Greeting 2:", greet("Bob", "Hi"));

// ============================================
// LEVEL 2: Nullish Coalescing (??)
// ============================================

// ?? only checks for null or undefined (not falsy values)
function getConfigValue(value: string | null | undefined): string {
  // Use ?? to provide fallback for null/undefined
  return value ?? "default-value";
}

console.log("\n=== Nullish Coalescing (??) ===");
console.log("Null value:", getConfigValue(null));
console.log("Undefined value:", getConfigValue(undefined));
console.log("Valid value:", getConfigValue("custom-value"));

// Difference between ?? and ||
const count = 0;
const fallback = count ?? 10; // 0 (not null/undefined)
const orFallback = count || 10; // 10 (0 is falsy)

console.log("\n?? vs ||:");
console.log("0 ?? 10 =", fallback);
console.log("0 || 10 =", orFallback);

// ============================================
// LEVEL 2: Optional Chaining (?.)
// ============================================

interface Department {
  name: string;
  manager?: {
    id: number;
    name: string;
    contact?: {
      email?: string;
      phone?: string;
    };
  };
}

const dept: Department = {
  name: "Engineering",
  manager: {
    id: 1,
    name: "Alice",
    // contact property is missing
  },
};

// Optional chaining safely accesses nested properties
const email = dept.manager?.contact?.email; // undefined (safe!)
// const unsafe = dept.manager.contact.email; // Error: possibly undefined

console.log("\n=== Optional Chaining (?.) ===");
console.log("Manager email (safe):", email);
console.log("Manager name (safe):", dept.manager?.name);

// Optional chaining with function calls
interface Utils {
  transform?: (value: string) => string;
}

const utils: Utils = {};
// utils.transform?.("test") // Returns undefined if transform doesn't exist
const result = utils.transform?.("test") ?? "no-transform";
console.log("Transform result:", result);

// ============================================
// LEVEL 2: Discriminated Unions
// ============================================

// Common pattern: shared discriminator property
type SuccessResponse = {
  status: "success";
  data: { id: number; name: string };
};

type ErrorResponse = {
  status: "error";
  error: { code: number; message: string };
};

type ApiResponse = SuccessResponse | ErrorResponse;

// Type narrowing using discriminator
function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    // TypeScript knows this is SuccessResponse
    console.log("Success:", response.data.name);
    return;
  }
  // TypeScript knows this is ErrorResponse
  console.log("Error:", response.error.message);
}

console.log("\n=== Discriminated Unions ===");
handleResponse({ status: "success", data: { id: 1, name: "Alice" } });
handleResponse({ status: "error", error: { code: 404, message: "Not found" } });

// ============================================
// LEVEL 3: Production Patterns - API Responses
// ============================================

// Real-world: Handle multiple API response types
type LoadingState = {
  status: "loading";
};

type LoadedState<T> = {
  status: "loaded";
  data: T;
  timestamp: number;
};

type ErrorState = {
  status: "error";
  error: Error;
  retryCount: number;
};

type AsyncState<T> = LoadingState | LoadedState<T> | ErrorState;

function renderState<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "loaded":
      return `Loaded at ${new Date(state.timestamp).toLocaleTimeString()}`;
    case "error":
      return `Error: ${state.error.message} (retries: ${state.retryCount})`;
  }
}

console.log("\n=== Production: Async State ===");
const loading: AsyncState<string> = { status: "loading" };
const loaded: AsyncState<string> = { status: "loaded", data: "Hello", timestamp: Date.now() };
const error: AsyncState<string> = { status: "error", error: new Error("Failed"), retryCount: 3 };

console.log(renderState(loading));
console.log(renderState(loaded));
console.log(renderState(error));

// ============================================
// LEVEL 3: Production Patterns - Event Handlers
// ============================================

// Handle different event types
type MouseEvent = {
  type: "mouse";
  x: number;
  y: number;
  button: "left" | "right" | "middle";
};

type KeyboardEvent = {
  type: "keyboard";
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
};

type AppEvent = MouseEvent | KeyboardEvent;

function handleEvent(event: AppEvent): void {
  switch (event.type) {
    case "mouse":
      console.log(`Mouse click at (${event.x}, ${event.y}) with ${event.button} button`);
      break;
    case "keyboard":
      const modifiers = [];
      if (event.ctrlKey) modifiers.push("Ctrl");
      if (event.shiftKey) modifiers.push("Shift");
      console.log(`Key "${event.key}" pressed${modifiers.length ? ` with ${modifiers.join("+")}` : ""}`);
      break;
  }
}

console.log("\n=== Production: Event Handlers ===");
handleEvent({ type: "mouse", x: 100, y: 200, button: "left" });
handleEvent({ type: "keyboard", key: "s", ctrlKey: true, shiftKey: false });

// ============================================
// LEVEL 3: Production Patterns - Validation
// ============================================

// Type guard functions for runtime validation
type ValidationResult =
  | { success: true; value: string }
  | { success: false; error: string };

function validateEmail(input: string | null | undefined): ValidationResult {
  if (input === null || input === undefined) {
    return { success: false, error: "Email is required" };
  }

  if (input.trim() === "") {
    return { success: false, error: "Email cannot be empty" };
  }

  if (!input.includes("@")) {
    return { success: false, error: "Email must contain @" };
  }

  return { success: true, value: input.trim() };
}

function sendEmail(email: string): void {
  console.log(`Sending email to: ${email}`);
}

// Safe email sending with validation
function safeSendEmail(input: string | null | undefined): void {
  const result = validateEmail(input);

  if (result.success === true) {
    sendEmail(result.value);
    return;
  }

  // TypeScript knows result is { success: false, error: string } here
  console.log(`Validation failed: ${result.error}`);
}

console.log("\n=== Production: Validation ===");
safeSendEmail("user@example.com");
safeSendEmail(null);
safeSendEmail("invalid-email");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Use union types for values that can be one of several types
type ID = string | number;

// ✅ Narrow types before using type-specific operations
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

// ✅ Use discriminated unions for related object types
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// ✅ Use ?? for null/undefined, || for falsy values
const nullableInput: string | null = null;
const defaultValue = nullableInput ?? "default"; // "default"
const falsyInput = 0;
const fallbackValue = falsyInput || "fallback"; // "fallback"

// ✅ Use optional chaining to safely access nested properties
const nestedObject = { nested: { property: "value" } };
const value = nestedObject?.nested?.property;

// ✅ Make properties optional with ?, not | undefined
interface GoodConfig {
  url?: string; // Clear and concise
}

interface BadConfig {
  url: string | undefined; // Verbose and awkward
}

// ✅ Consider readonly for properties that shouldn't change
type ImmutableUser = {
  readonly id: number;
  readonly name: string;
};

// ✅ Use type guards for runtime type checking
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// ✅ Prefer discriminated unions over unchecked type casts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

console.log("\n✅ Practice complete!");

export {}
