// EXERCISE 1: Async Programming
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-01-async.ts

console.log("=== Exercise 1: Async Programming ===\n");

// ============================================
// TODO 1: Create a basic Promise
// ============================================
// Instructions:
// - Create a function called 'delayMessage' that:
//   1. Takes a message string and delay time in milliseconds
//   2. Returns a Promise that resolves after the delay
//   3. The resolved value should be the message with "✓ " prepended
// - Use setTimeout for the delay
// - Add proper TypeScript types

// TODO: Your code here

console.log("=== Testing delayMessage ===");
delayMessage("Hello, Async!", 1000)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
console.log("Waiting for delayed message...\n");

// ============================================
// TODO 2: Convert .then() chain to async/await
// ============================================
// Instructions:
// - The function below uses .then() chains (old style)
// - Convert it to use async/await syntax (modern style)
// - Keep the same functionality

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

// Old style - using .then() chains
function displayUserDataOldStyle() {
  console.log("=== Old Style (.then() chains) ===");
  fetchUserOldStyle()
    .then((user) => {
      console.log("User:", user.name);
      return fetchPostsOldStyle();
    })
    .then((posts) => {
      console.log("Posts:", posts.length);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// TODO: Convert to async/await
async function displayUserDataNewStyle(): Promise<void> {
  console.log("\n=== New Style (async/await) ===");

  // TODO: Your code here
  // 1. Await fetchUserOldStyle() and log the user's name
  // 2. Await fetchPostsOldStyle() and log the posts count
}

// Uncomment to test after implementing
// displayUserDataOldStyle();
// setTimeout(() => displayUserDataNewStyle(), 2000);

// ============================================
// TODO 3: Add try/catch error handling
// ============================================
// Instructions:
// - The function below can throw errors
// - Add proper try/catch error handling
// - Log appropriate error messages

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

// TODO: Add error handling with try/catch
async function handleRiskyOperation(): Promise<void> {
  console.log("\n=== Error Handling ===");

  // Test success case
  console.log("Testing success case...");
  // TODO: Add try/catch for success case

  // Test failure case
  console.log("\nTesting failure case...");
  // TODO: Add try/catch for failure case with shouldFail: true
}

// Uncomment to test after implementing
// handleRiskyOperation();

// ============================================
// TODO 4: Convert sequential to parallel operations
// ============================================
// Instructions:
// - The function below runs operations sequentially (slow)
// - Convert it to run operations in parallel using Promise.all
// - Measure and log the time difference

function simulateApiCall(endpoint: string, delayMs: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${endpoint}`), delayMs);
  });
}

// Sequential version (slow) - already implemented
async function fetchSequentialData(): Promise<void> {
  console.log("\n=== Sequential Fetch (Slow) ===");
  const start = Date.now();

  const data1 = await simulateApiCall("/api/users", 500);
  const data2 = await simulateApiCall("/api/posts", 500);
  const data3 = await simulateApiCall("/api/comments", 500);

  const elapsed = Date.now() - start;
  console.log(`Sequential took ${elapsed}ms`);
  console.log("Results:", [data1, data2, data3]);
}

// TODO: Implement parallel version (fast)
async function fetchParallelData(): Promise<void> {
  console.log("\n=== Parallel Fetch (Fast) ===");

  // TODO: Your code here
  // 1. Use Promise.all to fetch all three endpoints in parallel
  // 2. Measure and log the time taken
  // 3. Compare with sequential version
}

// Uncomment to test after implementing
// fetchSequentialData().then(() => fetchParallelData());

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a function called 'fetchWithRetry' that:
//   1. Takes a Promise-returning function and maxRetries (default 3)
//   2. Retries the operation up to maxRetries times on failure
//   3. Throws the last error if all retries fail
//   4. Logs retry attempts

// TODO: Your code here (bonus)
async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  // Implement retry logic here
  throw new Error("Not implemented");
}

// Uncomment to test after implementing
// async function testRetry() {
//   console.log("\n=== Bonus: Retry Logic ===");
//   let attempts = 0;
//   const flakyOperation = () => {
//     attempts++;
//     return new Promise<string>((resolve, reject) => {
//       setTimeout(() => {
//         if (attempts < 3) {
//           reject(new Error(`Attempt ${attempts} failed`));
//         } else {
//           resolve("Success on attempt " + attempts);
//         }
//       }, 100);
//     });
//   };
//
//   try {
//     const result = await fetchWithRetry(flakyOperation, 5);
//     console.log("Result:", result);
//   } catch (error) {
//     console.error("All retries failed:", error);
//   }
// }
// testRetry();

console.log("\n✅ Exercise structure ready!");
console.log("👆 Uncomment the test sections after implementing TODOs");

export {};
