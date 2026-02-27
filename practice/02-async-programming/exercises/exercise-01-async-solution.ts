// EXERCISE 1: Async Programming - SOLUTION
//
// This file contains complete solutions with explanations
// Run with: npx tsx exercise-01-async-solution.ts

console.log("=== Exercise 1: Async Programming - Solutions ===\n");

// ============================================
// SOLUTION 1: Create a basic Promise
// ============================================

/**
 * Creates a Promise that resolves after a specified delay
 *
 * Key concepts:
 * - Promises wrap async operations and provide a way to handle results
 * - setTimeout is used to simulate async operations like API calls
 * - The resolve function fulfills the promise with a value
 * - TypeScript generics specify the resolved value type
 */
function delayMessage(message: string, ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✓ ${message}`);
    }, ms);
  });
}

console.log("=== Solution 1: Basic Promise ===");
delayMessage("Hello, Async!", 1000)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.error("Error:", error));
console.log("Waiting for delayed message...\n");

// ============================================
// SOLUTION 2: Convert .then() to async/await
// ============================================

// Mock data functions
function fetchUserOldStyle(): Promise<{ name: string; email: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Alice", email: "alice@example.com" });
    }, 500);
  });
}

function fetchPostsOldStyle(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2", "Post 3"]);
    }, 500);
  });
}

// Old style - using .then() chains (hard to read)
function displayUserDataOldStyle() {
  console.log("=== Old Style (.then() chains) ===");
  fetchUserOldStyle()
    .then((user) => {
      console.log("User:", user.name);
      return fetchPostsOldStyle(); // Return next promise
    })
    .then((posts) => {
      console.log("Posts:", posts.length);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/**
 * New style - using async/await (clean and readable)
 *
 * Key improvements:
 * - Code reads top-to-bottom like synchronous code
 * - No nesting or chaining needed
 * - Error handling is clearer with try/catch
 * - Easier to debug and maintain
 */
async function displayUserDataNewStyle(): Promise<void> {
  console.log("\n=== New Style (async/await) ===");

  try {
    const user = await fetchUserOldStyle();
    console.log("User:", user.name);

    const posts = await fetchPostsOldStyle();
    console.log("Posts:", posts.length);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run comparison after delay
setTimeout(() => {
  displayUserDataOldStyle();
  setTimeout(() => displayUserDataNewStyle(), 1500);
}, 1500);

// ============================================
// SOLUTION 3: Add try/catch error handling
// ============================================

function riskyOperation(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Operation failed!"));
      } else {
        resolve("Operation succeeded!");
      }
    }, 300);
  });
}

/**
 * Proper error handling with try/catch
 *
 * Key concepts:
 * - await can throw errors if the promise rejects
 * - try/catch blocks handle these errors gracefully
 * - finally block runs regardless of success/failure
 * - Always handle errors in production code
 */
async function handleRiskyOperation(): Promise<void> {
  console.log("\n=== Solution 3: Error Handling ===");

  // Test success case
  console.log("Testing success case...");
  try {
    const result = await riskyOperation(false);
    console.log("✓ Success:", result);
  } catch (error) {
    console.error("✗ Error:", error instanceof Error ? error.message : error);
  }

  // Test failure case
  console.log("\nTesting failure case...");
  try {
    const result = await riskyOperation(true);
    console.log("✓ Success:", result);
  } catch (error) {
    console.error(
      "✗ Error:",
      error instanceof Error ? error.message : error
    );
  } finally {
    console.log("Cleanup code runs here (finally block)");
  }
}

setTimeout(() => handleRiskyOperation(), 4000);

// ============================================
// SOLUTION 4: Convert sequential to parallel
// ============================================

function simulateApiCall(endpoint: string, delayMs: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${endpoint}`), delayMs);
  });
}

/**
 * Sequential operations - slow
 *
 * Each await waits for the previous operation to complete.
 * Total time = sum of all delays (500 + 500 + 500 = 1500ms)
 */
async function fetchSequentialData(): Promise<void> {
  console.log("\n=== Sequential Fetch (Slow) ===");
  const start = Date.now();

  const data1 = await simulateApiCall("/api/users", 500);
  const data2 = await simulateApiCall("/api/posts", 500);
  const data3 = await simulateApiCall("/api/comments", 500);

  const elapsed = Date.now() - start;
  console.log(`⏱ Sequential took ${elapsed}ms`);
  console.log("Results:", [data1, data2, data3]);
}

/**
 * Parallel operations - fast
 *
 * Promise.all starts all operations simultaneously.
 * Total time = longest single delay (~500ms)
 *
 * Key concepts:
 * - Promise.all accepts an array of promises
 * - Returns a promise that resolves when all promises resolve
 * - Resolves with an array of results in the same order
 * - If any promise rejects, Promise.all rejects immediately
 */
async function fetchParallelData(): Promise<void> {
  console.log("\n=== Parallel Fetch (Fast) ===");

  const start = Date.now();

  // Start all operations in parallel and wait for all to complete
  const [data1, data2, data3] = await Promise.all([
    simulateApiCall("/api/users", 500),
    simulateApiCall("/api/posts", 500),
    simulateApiCall("/api/comments", 500),
  ]);

  const elapsed = Date.now() - start;
  console.log(`⏱ Parallel took ${elapsed}ms`);
  console.log("Results:", [data1, data2, data3]);
  console.log(`⚡ Speed improvement: ~3x faster!`);
}

setTimeout(
  () => fetchSequentialData().then(() => fetchParallelData()),
  6000
);

// ============================================
// BONUS SOLUTION: Retry Logic
// ============================================

/**
 * Fetch with retry logic
 *
 * Key concepts:
 * - Retry failed operations to handle temporary failures
 * - for...of loop with break on success
 * - Throw the last error if all retries fail
 * - Exponential backoff could be added (wait longer between retries)
 */
async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}...`);
      const result = await operation();
      console.log(`✓ Success on attempt ${attempt}`);
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(`✗ Attempt ${attempt} failed: ${lastError.message}`);

      if (attempt < maxRetries) {
        // Wait before retrying (could add exponential backoff)
        const delayMs = attempt * 100;
        console.log(`Waiting ${delayMs}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

// Test retry logic
async function testRetry() {
  console.log("\n=== Bonus Solution: Retry Logic ===");
  let attempts = 0;

  const flakyOperation = (): Promise<string> => {
    attempts++;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (attempts < 3) {
          reject(new Error(`Attempt ${attempts} failed`));
        } else {
          resolve("Success on attempt " + attempts);
        }
      }, 100);
    });
  };

  try {
    const result = await fetchWithRetry(flakyOperation, 5);
    console.log("Final result:", result);
  } catch (error) {
    console.error("All retries failed:", error);
  }
}

setTimeout(() => testRetry(), 9000);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices Summary ===");

// ✅ 1. Always prefer async/await over .then() chains
// - More readable and easier to debug
// - Error handling with try/catch is clearer
// - Code flows naturally top-to-bottom

// ✅ 2. Always handle errors in async functions
// - Unhandled promise rejections can crash your app
// - Use try/catch blocks for await operations
// - Consider .catch() for fire-and-forget promises

// ✅ 3. Use Promise.all for independent operations
// - Runs operations in parallel for better performance
// - Only use sequential await when operations depend on each other
// - Measure performance to identify optimization opportunities

// ✅ 4. Add timeout handling for production code
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

// ✅ 5. Use Promise.allSettled when you need all results
// - Unlike Promise.all, it doesn't fail on first rejection
// - Returns status for each promise (fulfilled/rejected)
// - Useful for batch operations where partial success is OK

console.log("\n✅ All solutions loaded!");
console.log("👆 Watch the output above to see each solution in action\n");

export {};
