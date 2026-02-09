// Async Programming: Promises and Async/Await
// Run with: npx tsx 01-promises.ts

console.log("=== Async Programming ===\n");

// ============================================
// LEVEL 1: Creating Promises
// ============================================

// Promise states: pending -> fulfilled or rejected
const myPromise = new Promise<string>((resolve, reject) => {
  // Simulate async operation
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Operation succeeded!");
    } else {
      reject(new Error("Operation failed!"));
    }
  }, 1000);
});

console.log("Promise created (pending state)...");

// Consuming the promise with .then()
myPromise
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// ============================================
// LEVEL 1: Async/Await Syntax
// ============================================

async function fetchData(): Promise<string> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 500);
  });
}

async function main() {
  console.log("\n=== Async/Await ===");
  console.log("Fetching data...");

  const data = await fetchData(); // Waits for promise to resolve
  console.log("Received:", data);
}

// Call the async function
main();

// ============================================
// LEVEL 2: Error Handling with Try/Catch
// ============================================

async function fetchWithErrorHandling(): Promise<void> {
  try {
    console.log("\n=== Error Handling ===");

    // Simulate potential error
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Network error!"));
      }, 300);
    });

    const result = await promise;
    console.log("Result:", result);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Caught error:", error.message);
    }
  } finally {
    console.log("Cleanup code runs here always");
  }
}

fetchWithErrorHandling();

// ============================================
// LEVEL 2: Parallel vs Sequential
// ============================================

async function sequentialOperations() {
  console.log("\n=== Sequential Operations ===");
  const start = Date.now();

  // These run one after another (slow!)
  const result1 = await delay(500, "First");
  const result2 = await delay(500, "Second");
  const result3 = await delay(500, "Third");

  const elapsed = Date.now() - start;
  console.log(`Sequential took ${elapsed}ms`);
  console.log("Results:", [result1, result2, result3]);
}

async function parallelOperations() {
  console.log("\n=== Parallel Operations ===");
  const start = Date.now();

  // These run at the same time (fast!)
  const [result1, result2, result3] = await Promise.all([
    delay(500, "First"),
    delay(500, "Second"),
    delay(500, "Third"),
  ]);

  const elapsed = Date.now() - start;
  console.log(`Parallel took ${elapsed}ms`);
  console.log("Results:", [result1, result2, result3]);
}

function delay(ms: number, value: string): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// Run after delay to see output clearly
setTimeout(() => {
  sequentialOperations().then(() => parallelOperations());
}, 2000);

// ============================================
// LEVEL 3: Promise.allSettled
// ============================================

async function allSettledExample() {
  console.log("\n=== Promise.allSettled ===");

  const promises = [
    delay(100, "Success 1"),
    Promise.reject(new Error("Failed 2")),
    delay(100, "Success 3"),
    Promise.reject(new Error("Failed 4")),
  ];

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Promise ${index}:`, result.value);
    } else {
      console.log(`Promise ${index}:`, result.reason.message);
    }
  });
}

setTimeout(() => allSettledExample(), 4000);

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices (immediate) ===");

// ✅ Always use async/await instead of .then() chains
async function goodStyle() {
  const result = await fetchData();
  console.log(result);
}

// ❌ Avoid nested .then() chains
function badStyle() {
  fetchData()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

// ✅ Always handle errors in async functions
async function withErrorHandling() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw or handle
  }
}

// ✅ Use Promise.all for parallel operations
async function parallelGood() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments(),
  ]);
  return { users, posts, comments };
}

// ✅ Don't forget to await (common bug!)
async function commonBug() {
  // Bad: forgets await
  const result1 = fetchData(); // This returns a Promise, not the data!
  console.log(result1); // Promise { <pending> }

  // Good: uses await
  const result2 = await fetchData();
  console.log(result2); // Actual data
}

// Mock functions for examples
async function fetchUsers() {
  return delay(100, "users");
}

async function fetchPosts() {
  return delay(100, "posts");
}

async function fetchComments() {
  return delay(100, "comments");
}

console.log("\n✅ Concepts loaded!");
