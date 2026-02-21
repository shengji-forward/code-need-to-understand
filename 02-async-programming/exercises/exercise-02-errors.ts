// EXERCISE 2: Error Handling in Async Code
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-02-errors.ts

console.log("=== Exercise 2: Error Handling in Async Code ===\n");

// ============================================
// TODO 1: Add try/catch/finally blocks to async function
// ============================================
// Instructions:
// - Complete the 'fetchUserData' function with proper error handling
// - Use try/catch to handle potential errors
// - Add a finally block that logs "Fetch attempt complete"
// - The function should throw an error if userId is less than 1

async function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  // TODO: Add try block
  // TODO: Validate userId (must be >= 1)
  // TODO: Simulate API call with setTimeout
  // TODO: Return user data
  // TODO: Add catch block - log error and re-throw
  // TODO: Add finally block - log completion message

  // Your code here

  // Example structure:
  // try {
  //   if (userId < 1) {
  //     throw new Error("Invalid userId");
  //   }
  //   // Simulate API delay
  //   await new Promise(resolve => setTimeout(resolve, 100));
  //   return { id: userId, name: `User ${userId}` };
  // } catch (error) {
  //   // Handle error
  //   throw error;
  // } finally {
  //   // Cleanup or logging
  // }

  throw new Error("TODO: Implement this function");
}

// Test TODO 1
console.log("=== Testing TODO 1: try/catch/finally ===");
// Uncomment after implementing:
// fetchUserData(1)
//   .then(user => console.log("✓ Success:", user))
//   .catch(err => console.log("✗ Error:", err.message));

console.log("\n");

// ============================================
// TODO 2: Create a custom error class
// ============================================
// Instructions:
// - Create a NetworkError class that extends Error
// - Add a 'statusCode' property (number)
// - Add a 'retryable' property (boolean)
// - Set the error name to "NetworkError"
// - Create a constructor that accepts message, statusCode, and retryable

// TODO: Your code here
// class NetworkError extends Error {
//   // Add properties and constructor
// }

// Test TODO 2
console.log("=== Testing TODO 2: Custom Error Class ===");
// Uncomment after implementing:
// try {
//   throw new NetworkError("Connection timeout", 504, true);
// } catch (error) {
//   if (error instanceof NetworkError) {
//     console.log(`✓ NetworkError caught: ${error.message}`);
//     console.log(`  Status: ${error.statusCode}, Retryable: ${error.retryable}`);
//   }
// }

console.log("\n");

// ============================================
// TODO 3: Handle errors with Promise.all (fail-fast)
// ============================================
// Instructions:
// - Complete the 'fetchMultipleUsers' function
// - Use Promise.all to fetch multiple users
// - Handle errors - Promise.all fails fast on first rejection
// - Log which user fetch failed and why

async function fetchMultipleUsersFailFast(userIds: number[]): Promise<Array<{ id: number; name: string }>> {
  // TODO: Use Promise.all with error handling
  // TODO: If any fetch fails, catch and log the error
  // TODO: Return array of successfully fetched users

  // Helper function to simulate API (may fail for userId 0)
  const simulateFetch = async (id: number): Promise<{ id: number; name: string }> => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    if (id === 0) throw new Error(`User ${id} not found`);
    return { id, name: `User ${id}` };
  };

  // Your code here

  throw new Error("TODO: Implement fail-fast error handling");
}

// Test TODO 3
console.log("=== Testing TODO 3: Promise.all (fail-fast) ===");
// Uncomment after implementing:
// fetchMultipleUsersFailFast([1, 2, 0, 4])
//   .then(users => console.log("✓ Fetched users:", users))
//   .catch(err => console.log("✗ Failed:", err.message));

console.log("\n");

// ============================================
// TODO 4: Handle errors with Promise.allSettled
// ============================================
// Instructions:
// - Complete the 'fetchMultipleUsersAllSettled' function
// - Use Promise.allSettled to fetch multiple users
// - Continue even if some fetches fail
// - Return separate arrays: successes and failures
// - Log both successful and failed fetches

async function fetchMultipleUsersAllSettled(
  userIds: number[]
): Promise<{
  successful: Array<{ id: number; name: string }>;
  failed: Array<{ userId: number; error: string }>;
}> {
  // TODO: Use Promise.allSettled
  // TODO: Separate successful and failed results
  // TODO: Log each result
  // TODO: Return object with successful and failed arrays

  // Helper function to simulate API (may fail for userId 0)
  const simulateFetch = async (id: number): Promise<{ id: number; name: string }> => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    if (id === 0) throw new Error(`User ${id} not found`);
    return { id, name: `User ${id}` };
  };

  // Your code here

  throw new Error("TODO: Implement allSettled error handling");
}

// Test TODO 4
console.log("=== Testing TODO 4: Promise.allSettled ===");
// Uncomment after implementing:
// fetchMultipleUsersAllSettled([1, 0, 3, 0, 5])
//   .then(({ successful, failed }) => {
//     console.log("✓ Successful:", successful);
//     console.log("✗ Failed:", failed);
//   });

console.log("\n");

// ============================================
// TODO 5: Add error logging with context
// ============================================
// Instructions:
// - Complete the 'logErrorWithContext' function
// - Log error with: timestamp, operation name, input values
// - Include error message and stack trace
// - Make it easy to debug issues in production

function logErrorWithContext(error: Error, operation: string, input: Record<string, unknown>): void {
  // TODO: Create error context object
  // TODO: Log with structured format (JSON or formatted string)
  // TODO: Include: timestamp, operation, input, error message, stack
  // TODO: Make output readable and searchable

  // Your code here

  console.log("TODO: Implement error logging");
}

// Test TODO 5
console.log("=== Testing TODO 5: Error Logging with Context ===");
// Uncomment after implementing:
// try {
//   fetchUserData(-1);
// } catch (error) {
//   logErrorWithContext(error as Error, "fetchUserData", { userId: -1, source: "web" });
// }

console.log("\n");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a 'retryWithBackoff' function
// - Takes: async function, maxRetries, initialDelay
// - Retry failed operations with exponential backoff
// - Use your NetworkError class
// - Stop retrying if error is not retryable
// - Return result or throw final error

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  // TODO: Implement retry logic
  // TODO: Use exponential backoff (delay * 2^attempt)
  // TODO: Check if error is retryable
  // TODO: Log each retry attempt
  // TODO: Return result or throw after max retries

  throw new Error("TODO: Implement retry with backoff");
}

// Test BONUS
console.log("=== BONUS: Retry with Backoff ===");
// Uncomment after implementing:
// let attempts = 0;
// const flakyOperation = async (): Promise<string> => {
//   attempts++;
//   if (attempts < 3) {
//     throw new NetworkError("Temporary failure", 503, true);
//   }
//   return "Success!";
// };
//
// retryWithBackoff(flakyOperation, 3, 100)
//   .then(result => console.log("✓ Result:", result))
//   .catch(err => console.log("✗ Final error:", err.message));

console.log("\n✅ Exercise complete!");
