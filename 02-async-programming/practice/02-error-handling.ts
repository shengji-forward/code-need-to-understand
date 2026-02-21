// Async Programming: Error Handling
// Run with: npx tsx 02-error-handling.ts

console.log("=== Async Error Handling ===\n");

// ============================================
// LEVEL 1: Basic Error Handling
// ============================================

// Try/Catch/Finally in async functions
async function basicTryCatch() {
  console.log("=== Try/Catch/Finally ===");

  try {
    console.log("Attempting operation...");

    // Simulate an error
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Something went wrong!"));
      }, 100);
    });

    const result = await promise;
    console.log("Result:", result);
  } catch (error) {
    // Catches any errors from await or thrown in try block
    if (error instanceof Error) {
      console.error("Caught:", error.message);
    }
  } finally {
    // ALWAYS runs, regardless of success or failure
    console.log("Cleanup: Closing connections, releasing resources");
  }
}

basicTryCatch();

// ============================================
// LEVEL 1: Throwing Errors in Async Functions
// ============================================

async function throwingErrors() {
  console.log("\n=== Throwing Errors ===");

  async function validateUser(userId: number): Promise<string> {
    if (userId <= 0) {
      throw new Error("Invalid user ID: must be positive");
    }

    return `User ${userId} is valid`;
  }

  try {
    await validateUser(-1);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Validation failed:", error.message);
    }
  }
}

setTimeout(() => throwingErrors(), 300);

// ============================================
// LEVEL 1: Finally Always Runs
// ============================================

async function finallyAlwaysRuns() {
  console.log("\n=== Finally Always Runs ===");

  let resourceAcquired = false;

  // Example 1: Success case
  async function successCase() {
    try {
      resourceAcquired = true;
      console.log("Resource acquired");
      await Promise.resolve("Success!");
    } catch (error) {
      console.log("Catch block");
    } finally {
      resourceAcquired = false;
      console.log("Resource released (finally)");
    }
  }

  // Example 2: Error case
  async function errorCase() {
    try {
      resourceAcquired = true;
      console.log("Resource acquired");
      await Promise.reject(new Error("Failed!"));
    } catch (error) {
      console.log("Catch block: error handled");
    } finally {
      resourceAcquired = false;
      console.log("Resource released (finally)");
    }
  }

  await successCase();
  await errorCase();
}

setTimeout(() => finallyAlwaysRuns(), 600);

// ============================================
// LEVEL 2: Custom Error Classes
// ============================================

// Custom error types for different categories
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "NetworkError";
  }
}

class DatabaseError extends Error {
  constructor(message: string, public query: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

async function customErrorsExample() {
  console.log("\n=== Custom Error Classes ===");

  // Throwing custom errors
  async function createUser(email: string): Promise<void> {
    if (!email.includes("@")) {
      throw new ValidationError("Invalid email format");
    }
    console.log("User created with email:", email);
  }

  // Catching and handling by type
  try {
    await createUser("invalid-email");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation failed:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

setTimeout(() => customErrorsExample(), 1200);

// ============================================
// LEVEL 2: Error vs TypeError
// ============================================

async function errorTypesExample() {
  console.log("\n=== Error Types ===");

  async function processData(data: unknown): Promise<string> {
    // TypeError: wrong type of value
    if (typeof data !== "string") {
      throw new TypeError("Data must be a string");
    }

    // Error: general problem
    if (data.length === 0) {
      throw new Error("Data cannot be empty");
    }

    return data.toUpperCase();
  }

  // Test TypeError
  try {
    await processData(123);
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("TypeError:", error.message);
    }
  }

  // Test Error
  try {
    await processData("");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }

  // Success case
  try {
    const result = await processData("hello");
    console.log("Success:", result);
  } catch (error) {
    console.error("Unexpected error");
  }
}

setTimeout(() => errorTypesExample(), 1500);

// ============================================
// LEVEL 3: Global Error Handlers
// ============================================

// Global handler for unhandled promise rejections
process.on("unhandledRejection", (reason: unknown) => {
  console.error("\n⚠️  UNHANDLED REJECTION:", reason);
  // In production: log to monitoring service, send alerts
});

// Global handler for uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("\n⚠️  UNCAUGHT EXCEPTION:", error.message);
  // In production: log, cleanup, then exit
  process.exit(1);
});

async function globalHandlerExample() {
  console.log("\n=== Global Error Handlers ===");

  // This would trigger unhandledRejection if no .catch()
  const badPromise = Promise.reject(new Error("No handler attached"));

  // Attach handler to prevent unhandledRejection
  badPromise.catch((error) => {
    console.log("Handled locally:", error.message);
  });
}

setTimeout(() => globalHandlerExample(), 2000);

// ============================================
// LEVEL 3: Logging Errors with Context
// ============================================

interface ErrorContext {
  operation: string;
  inputs?: Record<string, unknown>;
  timestamp: string;
}

function logError(error: Error, context: ErrorContext): void {
  console.error("\n📋 ERROR LOG:", {
    name: error.name,
    message: error.message,
    operation: context.operation,
    inputs: context.inputs,
    timestamp: context.timestamp,
  });
}

async function loggingExample() {
  console.log("\n=== Logging with Context ===");

  async function fetchUserProfile(userId: number): Promise<void> {
    if (userId <= 0) {
      const error = new ValidationError("Invalid userId");
      logError(error, {
        operation: "fetchUserProfile",
        inputs: { userId },
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
    console.log(`User ${userId} profile fetched`);
  }

  try {
    await fetchUserProfile(-5);
  } catch (error) {
    console.log("Error handled after logging");
  }
}

setTimeout(() => loggingExample(), 2500);

// ============================================
// LEVEL 3: Promise.all vs Promise.allSettled
// ============================================

async function promiseAllExample() {
  console.log("\n=== Promise.all Error Handling ===");

  const promises = [
    delay(100, "Task 1"),
    delay(100, "Task 2"),
    Promise.reject(new Error("Task 3 failed")),
    delay(100, "Task 4"),
  ];

  try {
    const results = await Promise.all(promises);
    console.log("All completed:", results);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Promise.all fails fast:", error.message);
      console.log("Note: All other promises are cancelled");
    }
  }
}

async function allSettledExample() {
  console.log("\n=== Promise.allSettled Error Handling ===");

  const promises = [
    delay(100, "Task 1"),
    Promise.reject(new Error("Task 2 failed")),
    delay(100, "Task 3"),
    Promise.reject(new Error("Task 4 failed")),
  ];

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Task ${index + 1}:`, result.value);
    } else {
      console.error(`Task ${index + 1}:`, result.reason.message);
    }
  });
}

setTimeout(async () => {
  await promiseAllExample();
  await allSettledExample();
}, 3000);

// ============================================
// LEVEL 3: Throwing Inside Catch Block
// ============================================

async function throwInCatchExample() {
  console.log("\n=== Throwing Inside Catch ===");

  async function processWithRetry(): Promise<void> {
    try {
      console.log("Attempt 1: Processing...");
      await Promise.reject(new Error("First attempt failed"));
    } catch (error) {
      console.log("Caught error, will retry...");

      // Re-throw with additional context
      if (error instanceof Error) {
        throw new Error(`Retry failed: ${error.message}`);
      }
    }
  }

  try {
    await processWithRetry();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Final error:", error.message);
    }
  }
}

setTimeout(() => throwInCatchExample(), 3800);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices (immediate) ===");

// ✅ Always handle errors in async functions
async function goodErrorHandling() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("Operation failed:", error);
    throw error; // Re-throw for caller to handle
  }
}

// ❌ Never swallow errors silently
async function badErrorHandling() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    // Error is caught but ignored!
    // This makes debugging impossible
  }
}

// ✅ Use try/catch/finally for resource cleanup
async function withCleanup() {
  const connection = { open: true };

  try {
    await doSomething(connection);
  } catch (error) {
    console.error("Error during operation:", error);
    throw error;
  } finally {
    connection.open = false;
    console.log("Connection closed");
  }
}

// ✅ Create custom error types for categorization
async function withCustomErrors() {
  try {
    await validateInput("");
  } catch (error) {
    if (error instanceof ValidationError) {
      // Handle validation errors specifically
      console.error("Please check your input");
    } else if (error instanceof NetworkError) {
      // Handle network errors
      console.error("Connection problem, please retry");
    } else {
      // Fallback for unknown errors
      console.error("Unexpected error occurred");
    }
  }
}

// ✅ Log errors with context for debugging
async function withLogging() {
  try {
    await processOrder({ orderId: 123, items: [] });
  } catch (error) {
    if (error instanceof Error) {
      logError(error, {
        operation: "processOrder",
        inputs: { orderId: 123, items: [] },
        timestamp: new Date().toISOString(),
      });
    }
  }
}

// ✅ Use Promise.allSettled when you need all results
async function handlePartialFailure() {
  const tasks = [fetchTask1(), fetchTask2(), fetchTask3()];

  const results = await Promise.allSettled(tasks);

  const successful = results.filter((r) => r.status === "fulfilled");
  const failed = results.filter((r) => r.status === "rejected");

  console.log(`Completed: ${successful.length}, Failed: ${failed.length}`);

  // Handle partial success gracefully
  if (successful.length > 0) {
    // Process successful results
  }

  if (failed.length > 0) {
    // Log failures but continue
  }
}

console.log("\n✅ Error handling concepts loaded!");

// Helper functions for examples
async function fetchData(): Promise<string> {
  return Promise.resolve("data");
}

async function doSomething(connection: { open: boolean }): Promise<void> {
  return Promise.resolve();
}

async function validateInput(input: string): Promise<void> {
  if (!input) {
    throw new ValidationError("Input required");
  }
}

async function processOrder(order: {
  orderId: number;
  items: unknown[];
}): Promise<void> {
  if (order.items.length === 0) {
    throw new ValidationError("Order cannot be empty");
  }
}

async function fetchTask1(): Promise<string> {
  return Promise.resolve("Task 1 done");
}

async function fetchTask2(): Promise<string> {
  return Promise.reject(new Error("Task 2 failed"));
}

async function fetchTask3(): Promise<string> {
  return Promise.resolve("Task 3 done");
}

function delay(ms: number, value: string): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
