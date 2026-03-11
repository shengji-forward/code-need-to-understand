// EXERCISE 2: Hono Framework
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 05-web-server/exercises/exercise-02-hono.ts

console.log("=== Exercise 2: Hono Framework ===\n");

// Note: This is conceptual - in production, these routes would run on an actual server

import { Hono } from "hono";

const app = new Hono();

// ============================================
// TODO 1: Create Basic Routes
// ============================================
// Instructions:
// - Create routes for a health coaching API
// - Resources: goals, sessions
// - Implement GET (list) and POST (create) for each

// TODO: Your code here - Create the routes
app.get("/api/goals", (c) => {
  // TODO: Return a list of goals
  // Return: { success: true, data: [...] }
});

app.post("/api/goals", async (c) => {
  // TODO: Create a new goal
  // 1. Parse the request body with await c.req.json()
  // 2. Return: { success: true, data: newGoal }
  // 3. Use status code 201 for creation
});

app.get("/api/sessions", (c) => {
  // TODO: Return a list of sessions
  // Return: { success: true, data: [...] }
});

app.post("/api/sessions", async (c) => {
  // TODO: Create a new session
  // 1. Parse the request body
  // 2. Return: { success: true, data: newSession }
  // 3. Use status code 201 for creation
});

console.log("--- TODO 1: Basic Routes ---");
console.log("Routes defined:");
console.log("  GET    /api/goals");
console.log("  POST   /api/goals");
console.log("  GET    /api/sessions");
console.log("  POST   /api/sessions");
console.log("");

// ============================================
// TODO 2: Add Route Parameters
// ============================================
// Instructions:
// - Create routes for individual resources
// - Use :id in the URL path
// - Extract the ID with c.req.param("id")

// TODO: Your code here - Create routes with parameters
app.get("/api/goals/:id", (c) => {
  // TODO: Get a specific goal by ID
  // 1. Extract id with c.req.param("id")
  // 2. Return: { success: true, data: goal }
});

app.put("/api/goals/:id", async (c) => {
  // TODO: Update a goal completely
  // 1. Extract id from params
  // 2. Parse request body
  // 3. Return: { success: true, data: updatedGoal }
});

app.delete("/api/goals/:id", (c) => {
  // TODO: Delete a goal
  // 1. Extract id from params
  // 2. Return: { success: true, message: "Goal deleted" }
});

app.get("/api/users/:userId/goals", (c) => {
  // TODO: Get all goals for a specific user
  // 1. Extract userId from params
  // 2. Return: { success: true, data: [goals] }
});

console.log("--- TODO 2: Route Parameters ---");
console.log("Routes defined:");
console.log("  GET    /api/goals/:id");
console.log("  PUT    /api/goals/:id");
console.log("  DELETE /api/goals/:id");
console.log("  GET    /api/users/:userId/goals");
console.log("");

// ============================================
// TODO 3: Implement Middleware
// ============================================
// Instructions:
// - Create middleware for logging and authentication
// - Middleware pattern: async (c, next) => { ... await next(); ... }

// TODO: Your code here - Create middleware
const loggerMiddleware = async (c, next) => {
  // TODO: Log incoming request
  // 1. Log the method and URL: c.req.method, c.req.url
  // 2. Call await next() to pass to the next handler
  // 3. Log the response status
};

const authMiddleware = async (c, next) => {
  // TODO: Check for authentication
  // 1. Get Authorization header: c.req.header("Authorization")
  // 2. If missing, return 401 with error message
  // 3. If present, call await next()
};

const errorHandler = async (c, next) => {
  // TODO: Handle errors
  // 1. Wrap next() in try/catch
  // 2. On error, log and return 500 with error message
  // 3. On success, do nothing (let response pass through)
};

console.log("--- TODO 3: Middleware ---");
console.log("Middleware created:");
console.log("  - loggerMiddleware");
console.log("  - authMiddleware");
console.log("  - errorHandler");
console.log("");
console.log("To apply middleware:");
console.log("  app.use('*', loggerMiddleware)");
console.log("  app.use('/api/protected/*', authMiddleware)");
console.log("");

// ============================================
// TODO 4: Add Input Validation
// ============================================
// Instructions:
// - Create validation middleware for goal creation
// - Validate required fields and data types
// - Return 400 with field-level errors if validation fails

// TODO: Your code here - Create validation middleware
const validateGoal = async (c, next) => {
  // TODO: Validate goal creation
  // 1. Parse request body
  // 2. Check required fields: title (string), targetDate (string)
  // 3. Check optional fields: status (must be 'active', 'completed', or 'paused')
  // 4. If validation fails, return 400 with error details
  // 5. If validation passes, call await next()
};

console.log("--- TODO 4: Input Validation ---");
console.log("Validation rules for goals:");
console.log("  title: required, string, min 2 chars");
console.log("  targetDate: required, string (ISO date)");
console.log("  status: optional, must be 'active', 'completed', or 'paused'");
console.log("");
console.log("Example error response:");
console.log("  {");
console.log("    success: false,");
console.log("    error: 'Validation failed',");
console.log("    fields: {");
console.log("      title: 'Title is required',");
console.log("      status: 'Must be active, completed, or paused'");
console.log("    }");
console.log("  }");
console.log("");

// ============================================
// TODO 5: Handle Query Parameters
// ============================================
// Instructions:
// - Create routes that use query parameters
// - Extract query params with c.req.query()
// - Support filtering, sorting, and pagination

// TODO: Your code here - Create routes with query parameters
app.get("/api/goals", (c) => {
  // TODO: Support filtering and pagination
  // 1. Get status filter: c.req.query("status")
  // 2. Get page number: c.req.query("page") || "1"
  // 3. Get limit: c.req.query("limit") || "20"
  // 4. Convert to numbers where needed
  // 5. Return: { success: true, data: [...], pagination: {...} }
});

app.get("/api/search", (c) => {
  // TODO: Implement search endpoint
  // 1. Get search query: c.req.query("q")
  // 2. Return: { success: true, data: [...results], query: "..." }
});

console.log("--- TODO 5: Query Parameters ---");
console.log("Examples:");
console.log("  GET /api/goals?status=active&page=1&limit=10");
console.log("  GET /api/search?q=weight+loss");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a complete route handler with all patterns
// - Use middleware, validation, and error handling
// - Return properly formatted responses

// TODO: Your code here - Create a complete route
app.put("/api/users/:id", authMiddleware, validateUser, async (c) => {
  // TODO: Complete user update route
  // 1. Extract user id from params
  // 2. Parse request body
  // 3. Update user (simulated)
  // 4. Return success response with updated user
  // 5. Handle errors appropriately
});

console.log("--- BONUS: Complete Route ---");
console.log("PUT /api/users/:id");
console.log("  - Uses authMiddleware (requires authentication)");
console.log("  - Uses validateUser (validates input)");
console.log("  - Returns formatted response");
console.log("  - Handles errors gracefully");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-02-hono-solution.ts");

export {};
