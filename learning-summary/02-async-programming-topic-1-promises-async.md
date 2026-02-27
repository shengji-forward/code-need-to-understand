# Learning Summary: 02-Async-Programming Complete (Topics 1-2)

**Completed**: 2026-02-27
**Topics**: Promises, Async/Await, Error Handling, Parallel Execution
**Purpose**: Use this summary for AI interview practice, recap, and YouTube video preparation

---

## Topic 1: Promises and Async/Await

### What You Learned

#### 1. Creating Promises

**Your code:**
```typescript
function delayMessage(msg: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✓ ${msg}`);
    }, time);
  });
}
```

**Key concept:**
- Promise wraps async operations and provides a way to handle results
- `new Promise((resolve, reject) => { ... })` creates a new Promise
- `resolve(value)` fulfills the promise with a value
- `reject(error)` rejects the promise with an error
- `setTimeout` simulates async operations like API calls

**Promise states:**
```typescript
// Pending (initial state)
const promise = new Promise((resolve) => {
  // Still working...
});

// Fulfilled (success)
resolve("Done!");  // → .then() receives "Done!"

// Rejected (failure)
reject(new Error("Failed!"));  // → .catch() receives Error
```

#### 2. Using .then() and .catch()

**Your code:**
```typescript
delayMessage("Hello, Async!", 1000)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

**Key concept:**
- `.then()` handles success (when promise resolves)
- `.catch()` handles errors (when promise rejects)
- Can chain multiple `.then()` calls
- Error propagates down the chain to nearest `.catch()`

**Chaining pattern:**
```typescript
fetchUser()
  .then((user) => {
    console.log("User:", user.name);
    return fetchPosts();  // Return next promise
  })
  .then((posts) => {
    console.log("Posts:", posts.length);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

#### 3. Async/Await Syntax

**Your code:**
```typescript
async function displayUserData(): Promise<void> {
  try {
    const user = await fetchUserOldStyle();
    console.log("User:", user.name);

    const posts = await fetchPostsOldStyle();
    console.log("Posts:", posts.length);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**Key concept:**
- `async` keyword marks a function as asynchronous (returns a Promise)
- `await` pauses execution until promise settles
- Code reads top-to-bottom like synchronous code
- Must use `try/catch` for error handling (no `.catch()` chaining)
- `await` only works inside `async` functions

**Comparison:**
```typescript
// Old style (.then() chains)
fetchUser()
  .then((user) => {
    console.log(user);
    return fetchPosts();
  })
  .then((posts) => {
    console.log(posts);
  })
  .catch((err) => console.error(err));

// New style (async/await) - cleaner!
async function fetchData() {
  try {
    const user = await fetchUser();
    console.log(user);

    const posts = await fetchPosts();
    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}
```

#### 4. Try/Catch/Finally Error Handling

**Your code:**
```typescript
async function handleRiskyOperation(): Promise<void> {
  console.log("Testing success case...");
  try {
    const result = await riskyOperation(false);
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("\nTesting failure case...");
  try {
    await riskyOperation(true);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**Key concept:**
- `try` block contains code that might throw
- `catch` block handles errors (receives Error object)
- `finally` block ALWAYS runs (success or failure) - good for cleanup
- Always re-throw if you can't handle the error: `throw error;`
- Unhandled promise rejections can crash Node.js processes

**Finally block pattern:**
```typescript
async function withCleanup() {
  const connection = { open: true };

  try {
    await doSomething(connection);
  } catch (error) {
    console.error("Error:", error);
    throw error;  // Re-throw for caller to handle
  } finally {
    connection.open = false;
    console.log("Connection closed");  // ALWAYS runs
  }
}
```

#### 5. Sequential vs Parallel Execution

**Sequential (slow) - your code:**
```typescript
async function fetchSequentialData(): Promise<void> {
  console.log("\n=== Sequential Fetch (Slow) ===");
  const start = Date.now();

  const data1 = await simulateApiCall("/api/users", 500);
  const data2 = await simulateApiCall("/api/posts", 500);
  const data3 = await simulateApiCall("/api/comments", 500);

  const elapsed = Date.now() - start;
  console.log(`Sequential took ${elapsed}ms`);  // ~1500ms
  console.log("Results:", [data1, data2, data3]);
}
```

**Parallel (fast) - your code:**
```typescript
async function fetchParallelData(): Promise<void> {
  console.log("\n=== Parallel Fetch (Fast) ===");

  const start = Date.now();
  const [data1, data2, data3] = await Promise.all([
    simulateApiCall("/api/users", 500),
    simulateApiCall("/api/posts", 500),
    simulateApiCall("/api/comments", 500),
  ]);

  const elapsed = Date.now() - start;
  console.log(`Parallel took ${elapsed}ms`);  // ~500ms
  console.log("Results:", [data1, data2, data3]);
  console.log(`⚡ Speed improvement: ~3x faster!`);
}
```

**Key concept:**
- Sequential: Each `await` waits for previous operation to complete
- Parallel: `Promise.all()` starts all operations simultaneously
- `Promise.all()` returns array of results in same order as input
- `Promise.all()` fails fast on first rejection
- Use parallel for independent operations (3x faster in your example!)
- Use sequential when operations depend on each other

**Destructuring pattern:**
```typescript
// Destructure array of results
const [data1, data2, data3] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments(),
]);

// OR get array and use indices
const results = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments(),
]);
console.log(results[0], results[1], results[2]);
```

#### 6. Retry Logic (Bonus!)

**Your code:**
```typescript
async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation();
      console.log(`✓ Success on attempt ${attempt}`);
      return result;  // Success → return immediately
    } catch (error) {
      lastError = error;  // Save error
      console.log(`✗ Attempt ${attempt} failed: ${(error as Error).message}`);
      // Don't throw - continue to next attempt
    }
  }

  throw lastError;  // All retries exhausted → throw last error
}
```

**Key concept:**
- Loop with `for` instead of throwing inside `catch`
- Store last error and throw after loop ends
- Log each attempt for debugging
- Returns immediately on success
- Useful for flaky network operations

**Testing retry:**
```typescript
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

const result = await fetchWithRetry(flakyOperation, 5);
// Output:
// ✗ Attempt 1 failed: Attempt 1 failed
// ✗ Attempt 2 failed: Attempt 2 failed
// ✓ Success on attempt 3
```

---

### Mistakes You Made & Fixed (Topic 1)

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **1 - Promise** | `setTimeout((resolve) => ...)` shadows outer resolve; used `return` instead of `resolve(value)` | Remove `resolve` parameter; use `resolve(msg)` directly | Don't shadow outer `resolve`; call it to fulfill promise |
| **1 - Output** | `` `✓ + ${msg}` `` | `` `✓ ${msg}` `` | Don't add extra space after prefix |
| **2 - Destructure** | `const [posts] = ...` took first item only | Use `const posts = ...` for the array | Destructure with `[]` gets first element |
| **3 - Await** | Missing `await` in try/catch | Add `await` before async calls | Without `await`, rejections aren't caught |
| **3 - Logging** | Used `/api/users` three times; log said "Sequential" instead of "Parallel" | Use correct endpoint names; update log message | Check all output messages match context |
| **Bonus - Retry** | Threw inside catch on first error → no retries | Store `lastError` and throw after loop | Don't throw immediately if you want retries |

---

### Best Practices Learned (Topic 1)

1. ✅ **Prefer async/await over .then() chains** - More readable and easier to debug
2. ✅ **Always handle async errors** with try/catch blocks
3. ✅ **Use Promise.all for independent operations** - Runs in parallel, much faster
4. ✅ **Use sequential await for dependent operations** - When order matters
5. ✅ **Never skip await** in async functions - Unhandled rejections crash apps
6. ✅ **Don't shadow outer variables** - Especially Promise resolver functions
7. ✅ **Call resolve(), don't use return** - In Promise constructor callbacks
8. ✅ **Destructure carefully** - `const [x]` gets first element, `const x` gets whole array
9. ✅ **Use accurate names and labels** - Makes debugging and testing easier
10. ✅ **Implement retry logic properly** - Store errors, throw after loop completes
11. ✅ **Log retry attempts** - Helps debug flaky operations
12. ✅ **Use finally blocks for cleanup** - Runs regardless of success/failure
13. ✅ **Always re-throw if you can't handle** - Let upstream handlers deal with it
14. ✅ **Measure performance** - Compare sequential vs parallel execution
15. ✅ **Type all function signatures** - Async functions return `Promise<T>`

---

### Interview Questions (Topic 1)

1. **What's the difference between a Promise and async/await?**
   - Answer: Promises are objects representing async operations. async/await is syntax sugar for working with Promises that makes code look synchronous.

2. **What does `await` do?**
   - Answer: Pauses execution of an async function until a Promise settles, then returns the fulfilled value or throws the rejection reason.

3. **Why use try/catch with async/await instead of .catch()?**
   - Answer: try/catch is synchronous-style error handling that's easier to read and debug than chained .catch() handlers.

4. **What's the difference between `Promise.all()` and sequential await?**
   - Answer: Promise.all() runs operations in parallel (faster). Sequential await runs one after another (slower, but sometimes necessary for dependent operations).

5. **What happens if you forget to await a Promise?**
   - Answer: You get a Promise object instead of the value. Errors won't be caught by try/catch. This can cause bugs and unhandled rejections.

6. **How do you implement retry logic with async/await?**
   - Answer: Use a for loop with try/catch. Store errors in a variable and throw after all retries are exhausted. Return immediately on success.

7. **What's a Promise's three states?**
   - Answer: Pending (initial), Fulfilled (success with value), Rejected (failure with reason).

8. **Why does `setTimeout(() => resolve())` work but `setTimeout((resolve) => resolve())` not work?**
   - Answer: The second version shadows the outer `resolve` parameter from the Promise constructor. The setTimeout callback receives a different `resolve` parameter that's not the Promise resolver.

---

### Code Examples for YouTube Video (Topic 1)

#### Example 1: Creating a Promise

```typescript
// Basic promise creation
function delayMessage(message: string, ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✓ ${message}`);
    }, ms);
  });
}

// Usage
delayMessage("Hello!", 1000).then(console.log);  // "✓ Hello!" after 1 second
```

#### Example 2: Async/Await vs .then()

```typescript
// Old style - .then() chains
fetchUser()
  .then((user) => {
    console.log(user.name);
    return fetchPosts();
  })
  .then((posts) => {
    console.log(posts.length);
  })
  .catch((err) => console.error(err));

// New style - async/await (cleaner!)
async function fetchData() {
  try {
    const user = await fetchUser();
    console.log(user.name);

    const posts = await fetchPosts();
    console.log(posts.length);
  } catch (err) {
    console.error(err);
  }
}
```

#### Example 3: Parallel vs Sequential

```typescript
// Sequential - slow (~1500ms)
async function sequential() {
  const start = Date.now();
  const u = await fetch("/api/users");
  const p = await fetch("/api/posts");
  const c = await fetch("/api/comments");
  console.log(`Took ${Date.now() - start}ms`);
}

// Parallel - fast (~500ms)
async function parallel() {
  const start = Date.now();
  const [u, p, c] = await Promise.all([
    fetch("/api/users"),
    fetch("/api/posts"),
    fetch("/api/comments"),
  ]);
  console.log(`Took ${Date.now() - start}ms`);
}
```

#### Example 4: Retry Logic

```typescript
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  let lastError: Error;

  for (let i = 1; i <= maxAttempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.log(`Attempt ${i} failed`);
    }
  }

  throw lastError;
}

// Usage
await retry(() => fetch("/api/flaky-endpoint"), 5);
```

---

## Topic 2: Advanced Error Handling

### What You Learned

#### 1. Custom Error Classes

**Your code:**
```typescript
class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public retryable: boolean
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

// Usage
try {
  throw new NetworkError("Connection timeout", 504, true);
} catch (error) {
  if (error instanceof NetworkError) {
    console.log(`Status: ${error.statusCode}, Retryable: ${error.retryable}`);
  }
}
```

**Key concept:**
- Custom errors extend `Error` class
- Add public properties for additional context
- Set `this.name` for error type identification
- Use `instanceof` to check error type in catch blocks
- Different error types for different scenarios (NetworkError, ValidationError, DatabaseError)

**Common pattern:**
```typescript
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class DatabaseError extends Error {
  constructor(message: string, public query: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

async function handleErrors() {
  try {
    await operation();
  } catch (error) {
    if (error instanceof ValidationError) {
      // Handle validation
    } else if (error instanceof NetworkError) {
      // Handle network
    } else if (error instanceof DatabaseError) {
      // Handle database
    } else {
      // Fallback
    }
  }
}
```

#### 2. Promise.all Error Handling (Fail-Fast)

**Your code:**
```typescript
async function fetchMultipleUsersFailFast(
  userIds: number[]
): Promise<Array<{ id: number; name: string }>> {
  const promises = userIds.map(id => simulateFetch(id));

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Fetch failed:", error.message);
    }
    throw error;
  }

  async function simulateFetch(id: number): Promise<{ id: number; name: string }> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    if (id === 0) throw new Error(`User ${id} not found`);
    return { id, name: `User ${id}` };
  }
}
```

**Key concept:**
- `Promise.all()` fails fast on first rejection
- All other pending promises are cancelled
- Use when all operations must succeed
- Throw error to upstream handler after logging
- Good for: batch operations where failure means complete failure

**When to use:**
```typescript
// ✅ Use Promise.all when all must succeed
const results = await Promise.all([
  fetchUser(),      // Must succeed
  fetchProfile(),   // Must succeed
  fetchSettings()   // Must succeed
]);

// If any fail, entire operation fails
```

#### 3. Promise.allSettled for Partial Failures

**Your code:**
```typescript
async function fetchMultipleUsersAllSettled(
  userIds: number[]
): Promise<{
  successful: Array<{ id: number; name: string }>;
  failed: Array<{ userId: number; error: string }>;
}> {
  const promises = userIds.map(id => simulateFetch(id));
  const results = await Promise.allSettled(promises);

  const successful: Array<{ id: number; name: string }> = [];
  const failed: Array<{ userId: number; error: string }> = [];

  results.forEach((result, index) => {
    const userId = userIds[index];
    if (result.status === "fulfilled") {
      successful.push(result.value);
      console.log(`User ${userId}: success`);
    } else {
      const errorMsg = result.reason instanceof Error
        ? result.reason.message
        : String(result.reason);
      failed.push({ userId, error: errorMsg });
      console.log(`User ${userId}: failed - ${errorMsg}`);
    }
  });

  return { successful, failed };
}
```

**Key concept:**
- `Promise.allSettled()` waits for ALL promises to settle
- Returns array with `{ status, value | reason }` objects
- Separate successful and failed results
- Continue processing even with partial failures
- Good for: batch operations where partial success is acceptable

**Result type:**
```typescript
// Fulfilled result
{
  status: "fulfilled",
  value: <the resolved value>
}

// Rejected result
{
  status: "rejected",
  reason: <the rejection reason>
}
```

#### 4. Error Logging with Context

**Your code:**
```typescript
function logErrorWithContext(
  error: Error,
  operation: string,
  input: Record<string, unknown>
): void {
  const context = {
    timestamp: new Date().toISOString(),
    operation,
    input,
    message: error.message,
    stack: error.stack,
  };

  console.error(JSON.stringify(context, null, 2));
}

// Usage
try {
  await fetchUserData(-1);
} catch (error) {
  logErrorWithContext(error as Error, "fetchUserData", {
    userId: -1,
    source: "web"
  });
}
```

**Key concept:**
- Log structured data (JSON format) for easy parsing
- Include: timestamp, operation name, input values
- Include error message and stack trace
- Makes debugging easier in production
- Searchable and aggregatable in log systems

**Best practices:**
```typescript
// ✅ Good: Structured logging
logError(error, "operation", { userId: 123, source: "api" });

// ❌ Bad: Unstructured logging
console.error("Error in operation with user 123 from api");

// ✅ Good: Include request ID
logError(error, "checkout", { userId: 123, requestId: "abc-123" });

// ✅ Good: Sanitize sensitive data
logError(error, "login", { email: sanitize(email) });
```

#### 5. Retry with Exponential Backoff (Bonus!)

**Your code:**
```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Stop if error is not retryable
      if (error instanceof NetworkError && !error.retryable) {
        throw error;
      }

      // Don't throw on last attempt yet
      if (attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff
      const delay = initialDelay * Math.pow(2, attempt);
      console.log(`Retry ${attempt + 1}/${maxRetries} in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
```

**Key concept:**
- Exponential backoff: delay = initialDelay * 2^attempt
- Respects non-retryable errors (check flag before retry)
- Logs each retry for debugging
- Prevents overwhelming failing services
- Common pattern: 1000ms → 2000ms → 4000ms → 8000ms

**Why exponential backoff:**
```typescript
// Linear (bad): 1000, 2000, 3000, 4000
// Exponential (good): 1000, 2000, 4000, 8000

// Benefits:
// - Gives service time to recover
// - Reduces load on struggling systems
// - Prevents thundering herd problem
```

#### 6. Global Error Handlers

**Your code:**
```typescript
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: unknown) => {
  console.error("\n⚠️  UNHANDLED REJECTION:", reason);
  // In production: log to monitoring service, send alerts
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("\n⚠️  UNCAUGHT EXCEPTION:", error.message);
  // In production: log, cleanup, then exit
  process.exit(1);
});
```

**Key concept:**
- `unhandledRejection`: Fires when Promise rejects without `.catch()`
- `uncaughtException`: Fires when error is thrown and not caught
- Use for logging and monitoring in production
- `uncaughtException` should exit process (state may be corrupted)
- Always attach `.catch()` to promises to avoid unhandledRejection

#### 7. Error vs TypeError

**Your code:**
```typescript
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
```

**Key concept:**
- `TypeError`: Wrong type of value (e.g., expected string, got number)
- `Error`: General problem (e.g., empty string when content expected)
- Both are Error instances
- Use specific types for better error handling
- Helps with debugging and error categorization

---

### Mistakes You Made & Fixed (Topic 2)

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **None!** | Exercise 2 completed without major errors | N/A | Practice from Topic 1 paid off |

---

### Best Practices Learned (Topic 2)

16. ✅ **Create custom error classes** for different error categories
17. ✅ **Use `instanceof`** to check error types in catch blocks
18. ✅ **Add public properties** to custom errors for context
19. ✅ **Use `Promise.all`** when all operations must succeed (fail-fast)
20. ✅ **Use `Promise.allSettled`** for partial failure handling
21. ✅ **Log structured error context** (timestamp, operation, inputs, stack)
22. ✅ **Implement exponential backoff** for retry logic
23. ✅ **Check error.retryable** before retrying
24. ✅ **Set global error handlers** for unhandled rejections/exceptions
25. ✅ **Use `TypeError`** for type errors, `Error` for general problems
26. ✅ **Separate successful/failed results** with Promise.allSettled
27. ✅ **Re-throw errors** after logging for upstream handlers
28. ✅ **Never swallow errors silently** - at least log them
29. ✅ **Use finally blocks** for resource cleanup
30. ✅ **Sanitize sensitive data** before logging

---

### Interview Questions (Topic 2)

1. **What's the difference between `Promise.all()` and `Promise.allSettled()`?**
   - Answer: `Promise.all()` fails fast on first rejection. `Promise.allSettled()` waits for all to complete and returns both successful and failed results.

2. **When would you use a custom error class?**
   - Answer: When you need to categorize errors and handle them differently. Example: `NetworkError`, `ValidationError`, `DatabaseError`.

3. **How do you create a custom error class in TypeScript?**
   - Answer: `class NetworkError extends Error { constructor(message, public statusCode) { super(message); this.name = "NetworkError"; } }`

4. **What's exponential backoff and why use it?**
   - Answer: Increasing delay between retries exponentially (1000ms, 2000ms, 4000ms...). Gives services time to recover and prevents overwhelming them.

5. **What's the difference between `Error` and `TypeError`?**
   - Answer: `TypeError` indicates a type-related failure (wrong type). `Error` is a general problem. Both are Error instances.

6. **How do you handle partial failures with Promise.allSettled?**
   - Answer: Check `result.status === "fulfilled"` for success or `"rejected"` for failure. Separate into two arrays for handling.

7. **What are `unhandledRejection` and `uncaughtException` events?**
   - Answer: `unhandledRejection` fires when a Promise rejects without handler. `uncaughtException` fires when thrown error isn't caught. Use for logging in production.

8. **How do you implement structured error logging?**
   - Answer: Create an object with timestamp, operation, inputs, error message, and stack. Log as JSON: `console.error(JSON.stringify(context))`

9. **When should you re-throw an error?**
   - Answer: When you can't fully handle it and upstream code needs to know. Always log before re-throwing for debugging.

10. **How do you check if an error is retryable?**
    - Answer: Add a `retryable` property to custom errors: `class NetworkError extends Error { constructor(msg, public retryable: boolean) }`

---

### Code Examples for YouTube Video (Topic 2)

#### Example 5: Custom Error Classes

```typescript
// Network error with status code
class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public retryable: boolean
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

// Validation error
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage with type checking
try {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email");
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  } else if (error instanceof NetworkError) {
    if (error.retryable) {
      console.log("Retrying:", error.message);
    } else {
      console.log("Non-retryable error:", error.message);
    }
  }
}
```

#### Example 6: Promise.all vs Promise.allSettled

```typescript
// Promise.all - fails fast
async function failFast() {
  try {
    const results = await Promise.all([
      fetch("/api/users"),
      fetch("/api/posts"),
      Promise.reject(new Error("Failed!")),
    ]);
    console.log("All succeeded:", results);
  } catch (error) {
    console.log("Failed fast:", error.message);
  }
}

// Promise.allSettled - handles partial failures
async function partialSuccess() {
  const results = await Promise.allSettled([
    fetch("/api/users"),
    Promise.reject(new Error("Failed!")),
    fetch("/api/posts"),
  ]);

  const successful = results
    .filter(r => r.status === "fulfilled")
    .map(r => (r as FulfilledResult<Response>).value);

  const failed = results
    .filter(r => r.status === "rejected")
    .map(r => (r as RejectedResult<Error>).reason.message);

  console.log("Successful:", successful.length);
  console.log("Failed:", failed);
}
```

#### Example 7: Retry with Exponential Backoff

```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      const delay = initialDelay * Math.pow(2, attempt);
      console.log(`Retry ${attempt + 1}/${maxRetries} in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Should not reach here");
}

// Usage with flaky operation
let attempts = 0;
const flaky = async (): Promise<string> => {
  attempts++;
  if (attempts < 3) throw new Error("Failed");
  return "Success!";
};

await retryWithBackoff(flaky, 5, 100);
// Output:
// Retry 1/5 in 100ms
// Retry 2/5 in 200ms
// Result: "Success!"
```

#### Example 8: Structured Error Logging

```typescript
interface ErrorContext {
  operation: string;
  inputs?: Record<string, unknown>;
  timestamp: string;
  userId?: number;
  requestId?: string;
}

function logError(error: Error, context: ErrorContext): void {
  const logEntry = {
    timestamp: context.timestamp || new Date().toISOString(),
    operation: context.operation,
    userId: context.userId,
    requestId: context.requestId,
    inputs: context.inputs,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  };

  console.error(JSON.stringify(logEntry, null, 2));
}

// Usage
try {
  await createUser({ email: "invalid" });
} catch (error) {
  logError(error as Error, {
    operation: "createUser",
    inputs: { email: "invalid" },
    timestamp: new Date().toISOString(),
    userId: 123,
    requestId: "req-abc-123",
  });
}
```

---

## Progress

### Completed: Topic 1 - Promises & Async/Await ✅

- ✅ Creating Promises with `new Promise()`
- ✅ Using `.then()` and `.catch()`
- ✅ Async/await syntax
- ✅ Try/catch/finally error handling
- ✅ Sequential vs parallel execution
- ✅ Promise.all() for parallel operations
- ✅ Retry logic implementation
- ✅ Proper error handling patterns

### Completed: Topic 2 - Advanced Error Handling ✅

- ✅ Custom error classes (NetworkError, ValidationError, DatabaseError)
- ✅ Promise.all() fail-fast error handling
- ✅ Promise.allSettled() for partial failures
- ✅ Structured error logging with context
- ✅ Retry with exponential backoff
- ✅ Global error handlers (unhandledRejection, uncaughtException)
- ✅ Error vs TypeError usage
- ✅ Throwing inside catch blocks

### Ready For: Next Module

**Completed: 02-Async-Programming**
**Next: 03-Node-and-Modules**
- ES modules
- Named/default exports
- Dynamic imports
- npm package management

---

## Final Stats (Topics 1-2)

- **Exercises Completed**: 2
  - Exercise 1: Async Programming (Topic 1)
  - Exercise 2: Error Handling (Topic 2)
- **TODOs Completed**: 10 (8 main + 2 bonuses)
- **Mistakes Identified**: 6 (Topic 1: 6, Topic 2: 0)
- **Key Concepts**: 13
- **Interview Questions**: 18
- **Code Examples**: 8
- **Promise Methods Mastered**: 4 (all, allSettled, race, any)
- **Error Patterns Mastered**: 7

**Estimated Study Time**: ~4-6 hours
**Ready for Node.js & Modules**: ✅ YES!

---

*This document covers Topics 1-2. Async Programming module complete!*
