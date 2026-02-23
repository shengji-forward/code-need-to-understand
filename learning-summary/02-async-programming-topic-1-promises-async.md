# Learning Summary: 02-Async-Programming (Topic 1 - Promises & Async/Await)

**Completed**: 2026-02-23
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

### Mistakes You Made & Fixed

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **1 - Promise** | `setTimeout((resolve) => ...)` shadows outer resolve; used `return` instead of `resolve(value)` | Remove `resolve` parameter; use `resolve(msg)` directly | Don't shadow outer `resolve`; call it to fulfill promise |
| **1 - Output** | `` `✓ + ${msg}` `` | `` `✓ ${msg}` `` | Don't add extra space after prefix |
| **2 - Destructure** | `const [posts] = ...` took first item only | Use `const posts = ...` for the array | Destructure with `[]` gets first element |
| **3 - Await** | Missing `await` in try/catch | Add `await` before async calls | Without `await`, rejections aren't caught |
| **3 - Logging** | Used `/api/users` three times; log said "Sequential" instead of "Parallel" | Use correct endpoint names; update log message | Check all output messages match context |
| **Bonus - Retry** | Threw inside catch on first error → no retries | Store `lastError` and throw after loop | Don't throw immediately if you want retries |

---

### Deep Dive: Your Mistakes

#### Mistake 1: setTimeout Callback Shadowing resolve

**What you did wrong:**
```typescript
// ❌ WRONG - Shadowing outer resolve
function delayMessage(msg: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout((resolve) => {  // ❌ This shadows the outer resolve!
      resolve(`✓ ${msg}`);
    }, time);
  });
}
```

**Why this is wrong:**
- `setTimeout((resolve) => ...)` creates a NEW parameter named `resolve`
- This shadows (hides) the outer `resolve` from the Promise constructor
- The inner `resolve` is just a callback parameter, not the Promise resolver
- The Promise never resolves because you called the wrong function

**Correct version:**
```typescript
// ✅ CORRECT - Don't name setTimeout callback parameter
function delayMessage(msg: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {  // ✅ No parameter, or use different name
      resolve(`✓ ${msg}`);  // ✅ Calls the Promise resolver
    }, time);
  });
}

// OR with different parameter name
function delayMessage(msg: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout((_unused) => {  // ✅ Different name
      resolve(`✓ ${msg}`);
    }, time);
  });
}
```

**Key lesson:**
- Never reuse parameter names from outer scope
- `setTimeout` callback parameter is rarely needed
- Be aware of variable shadowing

#### Mistake 2: Using return Instead of resolve()

**What you did wrong:**
```typescript
// ❌ WRONG - Using return in Promise constructor
return new Promise((resolve) => {
  setTimeout(() => {
    return `✓ ${msg}`;  // ❌ This doesn't resolve the promise!
  }, time);
});
```

**Why this is wrong:**
- `return` inside `setTimeout` callback just returns from the callback
- It does NOT resolve the Promise
- Promise never settles (stays pending forever)

**Correct version:**
```typescript
// ✅ CORRECT - Call resolve() to fulfill the promise
return new Promise((resolve) => {
  setTimeout(() => {
    resolve(`✓ ${msg}`);  // ✅ This resolves the promise
  }, time);
});
```

**Key lesson:**
- In Promise constructor, use `resolve()` and `reject()`
- `return` does NOT settle the promise
- Promise only settles when you call `resolve()` or `reject()`

#### Mistake 3: Array Destructuring Gone Wrong

**What you did wrong:**
```typescript
// ❌ WRONG - Destructuring gets first element only
const [data1, data2, data3] = await Promise.all([
  simulateApiCall("/api/users", 500),
  simulateApiCall("/api/posts", 500),
  simulateApiCall("/api/comments", 500),
]);

// Then later...
const [posts] = await fetchPostsOldStyle();  // ❌ posts is first element only
console.log(posts.length);  // ❌ Error if posts is not an array
```

**Why this is wrong:**
- `const [posts] = array` gets the FIRST element and assigns it to `posts`
- If `fetchPostsOldStyle()` returns `["Post 1", "Post 2", "Post 3"]`
- Then `posts` becomes `"Post 1"` (a string, not an array)
- `posts.length` works but gives 6 (string length), not 3 (array length)

**Correct version:**
```typescript
// ✅ CORRECT - Get the whole array
const posts = await fetchPostsOldStyle();  // ✅ posts is the entire array
console.log(posts.length);  // ✅ 3 (correct!)
```

**When to destructure:**
```typescript
// ✅ Destructure when you want individual elements
const [user, posts, comments] = await Promise.all([
  fetchUser(),     // user = individual user object
  fetchPosts(),    // posts = entire posts array
  fetchComments(), // comments = entire comments array
]);

// ✅ Don't destructure when you want the whole array
const posts = await fetchPosts();  // posts = array of all posts
```

**Key lesson:**
- `const [x] = arr` gets first element (`arr[0]`)
- `const x = arr` gets the entire array
- Choose based on what you need

#### Mistake 4: Missing await in try/catch

**What you did wrong:**
```typescript
// ❌ WRONG - No await, errors not caught
try {
  const result = riskyOperation(false);  // ❌ Missing await!
  console.log(result);  // Promise object, not the value!
} catch (error) {
  console.error("Error:", error);  // ❌ Never called!
}
```

**Why this is wrong:**
- Without `await`, `riskyOperation()` returns a Promise object
- The Promise object is assigned to `result` (not the resolved value)
- `console.log(result)` logs `Promise { <pending> }` instead of the value
- Errors from the Promise are NOT caught by `try/catch`
- Unhandled rejections can crash your app

**Correct version:**
```typescript
// ✅ CORRECT - Use await to get value and catch errors
try {
  const result = await riskyOperation(false);  // ✅ Awaits the promise
  console.log(result);  // ✅ "Operation succeeded!"
} catch (error) {
  console.error("Error:", error);  // ✅ Catches rejection
}
```

**Key lesson:**
- Always `await` Promise calls in `async` functions
- Without `await`: you get a Promise object, not the value
- Without `await`: errors won't be caught by `try/catch`
- Rule of thumb: If it returns a Promise, await it!

#### Mistake 5: Incorrect Endpoint Names and Labels

**What you did wrong:**
```typescript
// ❌ WRONG - Using same endpoint name everywhere
const [data1, data2, data3] = await Promise.all([
  simulateApiCall("/api/users", 500),
  simulateApiCall("/api/users", 500),  // ❌ Should be /api/posts
  simulateApiCall("/api/users", 500),  // ❌ Should be /api/comments
]);

// ❌ WRONG - Wrong log message
async function fetchParallelData(): Promise<void> {
  console.log("\n=== Sequential Fetch (Slow) ===");  // ❌ Should say "Parallel"
  // ...
}
```

**Why this is wrong:**
- Results are misleading - all say "Data from /api/users"
- Log message contradicts what the code actually does
- Makes debugging confusing
- Tests don't verify the right behavior

**Correct version:**
```typescript
// ✅ CORRECT - Use distinct endpoint names
const [data1, data2, data3] = await Promise.all([
  simulateApiCall("/api/users", 500),
  simulateApiCall("/api/posts", 500),   // ✅ Correct endpoint
  simulateApiCall("/api/comments", 500), // ✅ Correct endpoint
]);

// ✅ CORRECT - Accurate log message
async function fetchParallelData(): Promise<void> {
  console.log("\n=== Parallel Fetch (Fast) ===");  // ✅ Matches behavior
  // ...
}
```

**Key lesson:**
- Use meaningful, distinct names in tests
- Log messages should match what code does
- Clear labels make debugging easier
- Be precise and accurate

#### Mistake 6: Throwing Inside Retry Loop

**What you did wrong:**
```typescript
// ❌ WRONG - Throws immediately, no retries
async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();  // Success
    } catch (error) {
      console.log(`Attempt ${attempt} failed`);
      throw error;  // ❌ Throws immediately! No more retries!
    }
  }
}
```

**Why this is wrong:**
- Loop exits on first error due to `throw`
- `maxRetries` parameter is ignored
- Function never retries, just fails immediately
- Defeats the purpose of retry logic

**Correct version:**
```typescript
// ✅ CORRECT - Store error, throw after loop
async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: unknown;  // ✅ Store error for later

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation();
      console.log(`✓ Success on attempt ${attempt}`);
      return result;  // ✅ Return immediately on success
    } catch (error) {
      lastError = error;  // ✅ Save error, don't throw yet
      console.log(`✗ Attempt ${attempt} failed`);
      // ✅ Loop continues to next iteration
    }
  }

  throw lastError;  // ✅ All retries exhausted, now throw
}
```

**Key lesson:**
- Don't throw inside retry loop
- Store errors and throw after all retries fail
- Return immediately on success
- Loop continues only when there's an error AND more retries left

---

### Best Practices Learned

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

### Promise Methods Reference

| Method | Behavior | Use Case |
|--------|----------|----------|
| `Promise.all([p1, p2])` | Fails fast on first rejection | All operations must succeed |
| `Promise.allSettled([p1, p2])` | Waits for all to settle | Handle partial failures gracefully |
| `Promise.race([p1, p2])` | First to settle (resolve/reject) | Timeout patterns |
| `Promise.any([p1, p2])` | First fulfilled (ignore rejections) | Fastest of multiple sources |

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

### Ready For: Topic 2 - Advanced Error Handling

**Next:**
- Custom error classes
- Promise.all() vs Promise.allSettled()
- Global error handlers
- Logging with context

---

## Final Stats (Topic 1)

- **Exercises Completed**: 1 (Exercise 1: Async Programming)
- **TODOs Completed**: 5 (4 main + 1 bonus)
- **Mistakes Identified**: 6
- **Key Concepts**: 6
- **Interview Questions**: 8
- **Code Examples**: 4
- **Promise Methods Mastered**: 4 (all, allSettled, race, any)

**Estimated Study Time**: ~2-3 hours
**Ready for Advanced Error Handling**: ✅ YES!

---

*This document covers Topic 1 (Promises & Async/Await). Continue with Topic 2 for advanced error handling patterns.*
