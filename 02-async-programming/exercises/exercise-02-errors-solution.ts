// SOLUTION: Exercise 2 - Error Handling in Async Code
// Compare with your work to see how you did!

console.log("=== Exercise 2: Error Handling in Async Code (Solution) ===\n");

// ============================================
// SOLUTION 1: Add try/catch/finally blocks to async function
// ============================================
// Key concepts:
// - try block contains code that might throw
// - catch block handles errors
// - finally block always runs (success or failure)
// - Always re-throw if you can't handle the error

async function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  try {
    // Validate input
    if (userId < 1) {
      throw new Error(`Invalid userId: ${userId}. Must be >= 1.`);
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Return data
    return { id: userId, name: `User ${userId}` };
  } catch (error) {
    // Log error for debugging
    console.error(`[ERROR] Failed to fetch user ${userId}:`, (error as Error).message);
    // Re-throw so caller can handle
    throw error;
  } finally {
    // Always runs - good for cleanup/logging
    console.log(`[INFO] Fetch attempt complete for userId: ${userId}`);
  }
}

// Test SOLUTION 1
console.log("=== Testing SOLUTION 1: try/catch/finally ===");
await fetchUserData(1)
  .then((user) => console.log("✓ Success:", user))
  .catch((err) => console.log("✗ Error:", err.message));

console.log("");

await fetchUserData(-1)
  .then((user) => console.log("✓ Success:", user))
  .catch((err) => console.log("✗ Error:", err.message));

console.log("\n");

// ============================================
// SOLUTION 2: Create a custom error class
// ============================================
// Key concepts:
// - Extend Error to create domain-specific errors
// - Add custom properties for better error handling
// - Set correct prototype chain for instanceof checks
// - Override name property for error type identification

class NetworkError extends Error {
  statusCode: number;
  retryable: boolean;

  constructor(message: string, statusCode: number = 500, retryable: boolean = false) {
    // Call parent constructor (sets this.message)
    super(message);

    // Set error name for easy identification
    this.name = "NetworkError";

    // Custom properties
    this.statusCode = statusCode;
    this.retryable = retryable;

    // Maintain proper stack trace (V8-specific)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

// Test SOLUTION 2
console.log("=== Testing SOLUTION 2: Custom Error Class ===");
try {
  throw new NetworkError("Connection timeout", 504, true);
} catch (error) {
  if (error instanceof NetworkError) {
    console.log(`✓ NetworkError caught: ${error.message}`);
    console.log(`  Name: ${error.name}`);
    console.log(`  Status: ${error.statusCode}, Retryable: ${error.retryable}`);
  }
}

console.log("\n");

// ============================================
// SOLUTION 3: Handle errors with Promise.all (fail-fast)
// ============================================
// Key concepts:
// - Promise.all fails immediately when any promise rejects
// - Good when all operations must succeed
// - Use try/catch to handle the first rejection
// - Other pending promises continue but results are lost

async function fetchMultipleUsersFailFast(
  userIds: number[]
): Promise<Array<{ id: number; name: string }>> {
  // Helper function to simulate API (may fail for userId 0)
  const simulateFetch = async (id: number): Promise<{ id: number; name: string }> => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
    if (id === 0) throw new Error(`User ${id} not found`);
    return { id, name: `User ${id}` };
  };

  try {
    // Promise.all waits for all promises or rejects on first error
    const users = await Promise.all(userIds.map((id) => simulateFetch(id)));
    console.log(`✓ Successfully fetched all ${users.length} users`);
    return users;
  } catch (error) {
    // Only the first error is caught
    console.error(`✗ Failed fast: ${(error as Error).message}`);
    throw error; // Re-throw for caller to handle
  }
}

// Test SOLUTION 3
console.log("=== Testing SOLUTION 3: Promise.all (fail-fast) ===");
await fetchMultipleUsersFailFast([1, 2, 0, 4])
  .then((users) => console.log("✓ Fetched users:", users))
  .catch((err) => console.log("✗ Operation failed:", err.message));

console.log("\n");

// ============================================
// SOLUTION 4: Handle errors with Promise.allSettled
// ============================================
// Key concepts:
// - Promise.allSettled waits for ALL promises to settle
// - Returns results for both fulfilled and rejected promises
// - Good when you want to handle partial failures
// - Each result has status: 'fulfilled' or 'rejected'

async function fetchMultipleUsersAllSettled(userIds: number[]): Promise<{
  successful: Array<{ id: number; name: string }>;
  failed: Array<{ userId: number; error: string }>;
}> {
  // Helper function to simulate API (may fail for userId 0)
  const simulateFetch = async (id: number): Promise<{ id: number; name: string }> => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
    if (id === 0) throw new Error(`User ${id} not found`);
    return { id, name: `User ${id}` };
  };

  // Promise.allSettled returns array of result objects
  const results = await Promise.allSettled(userIds.map((id) => simulateFetch(id)));

  // Separate successful and failed results
  const successful: Array<{ id: number; name: string }> = [];
  const failed: Array<{ userId: number; error: string }> = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      successful.push(result.value);
      console.log(`✓ User ${userIds[index]}: fetched successfully`);
    } else {
      failed.push({ userId: userIds[index], error: result.reason.message });
      console.log(`✗ User ${userIds[index]}: ${result.reason.message}`);
    }
  });

  return { successful, failed };
}

// Test SOLUTION 4
console.log("=== Testing SOLUTION 4: Promise.allSettled ===");
const { successful, failed } = await fetchMultipleUsersAllSettled([1, 0, 3, 0, 5]);
console.log("\nSummary:");
console.log("✓ Successful:", successful);
console.log("✗ Failed:", failed);

console.log("\n");

// ============================================
// SOLUTION 5: Add error logging with context
// ============================================
// Key concepts:
// - Structured logging helps debug production issues
// - Include timestamp for time-based analysis
// - Add operation context to understand what failed
// - Include input values to reproduce issues
// - Stack traces help locate error source

function logErrorWithContext(
  error: Error,
  operation: string,
  input: Record<string, unknown>
): void {
  const context = {
    timestamp: new Date().toISOString(),
    operation,
    input,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack?.split("\n").slice(0, 3), // First 3 lines of stack
    },
  };

  // Log as JSON for parsing, or formatted for readability
  console.error("\n--- ERROR LOG ---");
  console.error(`Time: ${context.timestamp}`);
  console.error(`Operation: ${context.operation}`);
  console.error(`Input:`, context.input);
  console.error(`Error: ${context.error.name} - ${context.error.message}`);
  console.error(`Stack trace:`);
  context.error.stack.forEach((line) => console.error(`  ${line}`));
  console.error("--- END LOG ---\n");
}

// Test SOLUTION 5
console.log("=== Testing SOLUTION 5: Error Logging with Context ===");
try {
  await fetchUserData(-1);
} catch (error) {
  logErrorWithContext(error as Error, "fetchUserData", {
    userId: -1,
    source: "web",
    requestId: "req-123",
  });
}

console.log("\n");

// ============================================
// BONUS SOLUTION: Retry with Backoff
// ============================================
// Key concepts:
// - Exponential backoff: delay increases with each retry
// - Formula: delay = initialDelay * 2^attempt
// - Check if error is retryable before attempting
// - Log each attempt for debugging
// - Throw final error after all retries exhausted

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        // Calculate delay with exponential backoff
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.log(`[RETRY] Attempt ${attempt}/${maxRetries} after ${delay}ms delay`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      // Try the operation
      const result = await operation();
      if (attempt > 0) {
        console.log(`[RETRY] ✓ Success on attempt ${attempt}`);
      }
      return result;
    } catch (error) {
      lastError = error as Error;

      // Check if error is retryable
      if (error instanceof NetworkError && !error.retryable) {
        console.log(`[RETRY] ✗ Error not retryable: ${error.message}`);
        throw error;
      }

      console.log(`[RETRY] ✗ Attempt ${attempt} failed: ${lastError.message}`);
    }
  }

  // All retries exhausted
  console.log(`[RETRY] ✗ All ${maxRetries} retries exhausted`);
  throw lastError!;
}

// Test BONUS SOLUTION
console.log("=== BONUS SOLUTION: Retry with Backoff ===");
let attempts = 0;
const flakyOperation = async (): Promise<string> => {
  attempts++;
  if (attempts < 3) {
    throw new NetworkError("Temporary failure", 503, true);
  }
  return "Success!";
};

await retryWithBackoff(flakyOperation, 3, 100)
  .then((result) => console.log("✓ Final result:", result))
  .catch((err) => console.log("✗ Final error:", err.message));

console.log("\n");

// ============================================
// BEST PRACTICES SUMMARY
// ============================================
console.log("=== Best Practices for Async Error Handling ===\n");

console.log(`
1. ALWAYS handle async errors with try/catch
   - Unhandled promise rejections crash Node.js processes
   - Use try/catch/finally for cleanup operations

2. Use custom error classes for domain-specific errors
   - Add relevant properties (statusCode, retryable, etc.)
   - Makes error handling more type-safe and predictable

3. Choose the right Promise combinator:
   - Promise.all: fail-fast, all operations must succeed
   - Promise.allSettled: handle partial failures gracefully
   - Promise.race: first to settle (fulfilled or rejected)
   - Promise.any: first fulfilled (ignore rejections)

4. Log errors with context
   - Include timestamp, operation, input values
   - Structure logs for parsing (JSON) or readability
   - Keep stack traces for debugging

5. Implement retry logic for transient failures
   - Use exponential backoff to avoid overwhelming services
   - Check if errors are retryable
   - Log retry attempts for monitoring

6. Always re-throw if you can't handle the error
   - Let upstream handlers deal with it
   - Don't swallow errors silently
`);

console.log("\n✅ Exercise complete!");
