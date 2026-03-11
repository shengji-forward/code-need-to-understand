// SOLUTION: Exercise 2 - Hono Framework
// Compare with your work to see how you did!

console.log("=== Exercise 2: Hono Framework (Solution) ===\n");

import { Hono } from "hono";

const app = new Hono();

// ============================================
// SOLUTION 1: Basic Routes
// ============================================

// Mock data for demonstration
const mockGoals = [
  { id: "1", userId: "user1", title: "Lose 10 pounds", targetDate: "2024-06-01", status: "active" },
  { id: "2", userId: "user1", title: "Exercise 3x per week", targetDate: "2024-12-31", status: "active" },
];

const mockSessions = [
  { id: "1", userId: "user1", duration: 60, notes: "Initial consultation", date: "2024-03-01" },
];

// GET /api/goals - List all goals
app.get("/api/goals", (c) => {
  return c.json({
    success: true,
    data: mockGoals,
  });
});

// POST /api/goals - Create a new goal
app.post("/api/goals", async (c) => {
  const body = await c.req.json();

  const newGoal = {
    id: String(mockGoals.length + 1),
    ...body,
  };

  mockGoals.push(newGoal);

  return c.json(
    {
      success: true,
      data: newGoal,
    },
    201
  );
});

// GET /api/sessions - List all sessions
app.get("/api/sessions", (c) => {
  return c.json({
    success: true,
    data: mockSessions,
  });
});

// POST /api/sessions - Create a new session
app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  const newSession = {
    id: String(mockSessions.length + 1),
    date: new Date().toISOString().split("T")[0],
    ...body,
  };

  mockSessions.push(newSession);

  return c.json(
    {
      success: true,
      data: newSession,
    },
    201
  );
});

console.log("--- SOLUTION 1: Basic Routes ---");
console.log("GET /api/goals:");
console.log("  Returns: { success: true, data: [goals] }");
console.log("");
console.log("POST /api/goals:");
console.log("  Body: { title, targetDate, status }");
console.log("  Returns: { success: true, data: newGoal } (status 201)");
console.log("");
console.log("GET /api/sessions:");
console.log("  Returns: { success: true, data: [sessions] }");
console.log("");
console.log("POST /api/sessions:");
console.log("  Body: { userId, duration, notes }");
console.log("  Returns: { success: true, data: newSession } (status 201)");
console.log("");

// ============================================
// SOLUTION 2: Route Parameters
// ============================================

// GET /api/goals/:id - Get specific goal
app.get("/api/goals/:id", (c) => {
  const id = c.req.param("id");
  const goal = mockGoals.find((g) => g.id === id);

  if (!goal) {
    return c.json(
      {
        success: false,
        error: "Goal not found",
      },
      404
    );
  }

  return c.json({
    success: true,
    data: goal,
  });
});

// PUT /api/goals/:id - Update a goal
app.put("/api/goals/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const goalIndex = mockGoals.findIndex((g) => g.id === id);

  if (goalIndex === -1) {
    return c.json(
      {
        success: false,
        error: "Goal not found",
      },
      404
    );
  }

  // Replace entire goal
  mockGoals[goalIndex] = { id, ...body };

  return c.json({
    success: true,
    data: mockGoals[goalIndex],
  });
});

// DELETE /api/goals/:id - Delete a goal
app.delete("/api/goals/:id", (c) => {
  const id = c.req.param("id");
  const goalIndex = mockGoals.findIndex((g) => g.id === id);

  if (goalIndex === -1) {
    return c.json(
      {
        success: false,
        error: "Goal not found",
      },
      404
    );
  }

  mockGoals.splice(goalIndex, 1);

  return c.json({
    success: true,
    message: "Goal deleted",
  });
});

// GET /api/users/:userId/goals - Get all goals for a user
app.get("/api/users/:userId/goals", (c) => {
  const userId = c.req.param("userId");
  const userGoals = mockGoals.filter((g) => g.userId === userId);

  return c.json({
    success: true,
    data: userGoals,
  });
});

console.log("--- SOLUTION 2: Route Parameters ---");
console.log("GET /api/goals/:id:");
console.log("  Extract id: c.req.param('id')");
console.log("  Returns specific goal or 404");
console.log("");
console.log("PUT /api/goals/:id:");
console.log("  Extract id and parse body");
console.log("  Replace entire goal with new data");
console.log("");
console.log("DELETE /api/goals/:id:");
console.log("  Extract id, find and remove goal");
console.log("  Returns success message");
console.log("");
console.log("GET /api/users/:userId/goals:");
console.log("  Shows nested resource pattern");
console.log("  Filter goals by userId");
console.log("");

// ============================================
// SOLUTION 3: Middleware
// ============================================

// Logger middleware - logs all requests
const loggerMiddleware = async (c, next) => {
  console.log(`➡️  ${c.req.method} ${c.req.url}`);
  const startTime = Date.now();

  await next();

  const duration = Date.now() - startTime;
  console.log(`⬅️  Response: ${c.res.status} (${duration}ms)`);
};

// Authentication middleware - checks for auth token
const authMiddleware = async (c, next) => {
  const token = c.req.header("Authorization");

  if (!token) {
    return c.json(
      {
        success: false,
        error: "Unauthorized - missing token",
      },
      401
    );
  }

  // In production, validate the token here
  // const decoded = await verifyJwt(token);

  await next();
};

// Error handler middleware - catches all errors
const errorHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);

    return c.json(
      {
        success: false,
        error: "Internal server error",
        code: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

console.log("--- SOLUTION 3: Middleware ---");
console.log("Logger Middleware:");
console.log("  - Logs incoming request (method, URL)");
console.log("  - Calls await next() to pass control");
console.log("  - Logs response status and duration");
console.log("");
console.log("Auth Middleware:");
console.log("  - Checks Authorization header");
console.log("  - Returns 401 if missing");
console.log("  - Continues to next handler if present");
console.log("");
console.log("Error Handler:");
console.log("  - Wraps next() in try/catch");
console.log("  - Logs errors");
console.log("  - Returns 500 with error details");
console.log("");
console.log("Applying middleware:");
console.log("  app.use('*', loggerMiddleware);      // All routes");
console.log("  app.use('*', errorHandler);           // All routes");
console.log("  app.use('/api/protected/*', authMiddleware);  // Protected routes");
console.log("");

// ============================================
// SOLUTION 4: Input Validation
// ============================================

// Validation middleware for goal creation
const validateGoal = async (c, next) => {
  const body = await c.req.json();

  const errors: Record<string, string> = {};

  // Check required fields
  if (!body.title || typeof body.title !== "string") {
    errors.title = "Title is required and must be a string";
  } else if (body.title.length < 2) {
    errors.title = "Title must be at least 2 characters";
  }

  if (!body.targetDate || typeof body.targetDate !== "string") {
    errors.targetDate = "Target date is required";
  }

  // Check optional fields
  if (body.status !== undefined) {
    const validStatuses = ["active", "completed", "paused"];
    if (!validStatuses.includes(body.status)) {
      errors.status = `Status must be one of: ${validStatuses.join(", ")}`;
    }
  }

  // If there are errors, return 400
  if (Object.keys(errors).length > 0) {
    return c.json(
      {
        success: false,
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        fields: errors,
      },
      400
    );
  }

  // Validation passed, continue
  await next();
};

console.log("--- SOLUTION 4: Input Validation ---");
console.log("Validation rules:");
console.log("  title: required, string, min 2 chars");
console.log("  targetDate: required, string");
console.log("  status: optional, must be 'active', 'completed', or 'paused'");
console.log("");
console.log("Example error response (400):");
console.log(JSON.stringify(
  {
    success: false,
    error: "Validation failed",
    code: "VALIDATION_ERROR",
    fields: {
      title: "Title is required and must be a string",
      status: "Status must be one of: active, completed, paused",
    },
  },
  null,
  2
));
console.log("");
console.log("Using validation middleware:");
console.log("  app.post('/api/goals', validateGoal, async (c) => {");
console.log("    // Input is validated here");
console.log("    const body = await c.req.json();");
console.log("    // Process valid data...");
console.log("  });");
console.log("");

// ============================================
// SOLUTION 5: Query Parameters
// ============================================

// GET /api/goals with filtering and pagination
app.get("/api/v2/goals", (c) => {
  const status = c.req.query("status");
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "20");

  let filtered = mockGoals;

  // Apply status filter
  if (status) {
    filtered = filtered.filter((g) => g.status === status);
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginated = filtered.slice(startIndex, endIndex);

  return c.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  });
});

// GET /api/search - Search goals
app.get("/api/search", (c) => {
  const query = c.req.query("q");

  if (!query) {
    return c.json(
      {
        success: false,
        error: "Search query is required",
      },
      400
    );
  }

  const results = mockGoals.filter(
    (g) =>
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.status.includes(query.toLowerCase())
  );

  return c.json({
    success: true,
    data: results,
    query,
    count: results.length,
  });
});

console.log("--- SOLUTION 5: Query Parameters ---");
console.log("GET /api/v2/goals?status=active&page=1&limit=10:");
console.log("  Extract query: c.req.query('status')");
console.log("  Parse numbers: parseInt(c.req.query('page') || '1')");
console.log("  Filter and paginate results");
console.log("  Return: { success, data, pagination }");
console.log("");
console.log("GET /api/search?q=weight:");
console.log("  Check if query exists");
console.log("  Search across goal titles");
console.log("  Return: { success, data, query, count }");
console.log("");

// ============================================
// BONUS SOLUTION: Complete Route
// ============================================

// Validation middleware for users
const validateUser = async (c, next) => {
  const body = await c.req.json();

  const errors: Record<string, string> = {};

  if (!body.name || typeof body.name !== "string") {
    errors.name = "Name is required";
  }

  if (!body.email || !body.email.includes("@")) {
    errors.email = "Valid email is required";
  }

  if (Object.keys(errors).length > 0) {
    return c.json(
      {
        success: false,
        error: "Validation failed",
        fields: errors,
      },
      400
    );
  }

  await next();
};

// Complete user update route with all patterns
app.put("/api/users/:id", authMiddleware, validateUser, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // In production, update user in database
    // const updatedUser = await db.update(users).set(body).where(eq(users.id, id));

    const updatedUser = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return c.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    // Error handler middleware will catch this
    throw error;
  }
});

console.log("--- BONUS SOLUTION: Complete Route ---");
console.log("PUT /api/users/:id");
console.log("");
console.log("Middleware chain:");
console.log("  1. authMiddleware - checks for valid token");
console.log("  2. validateUser - validates request body");
console.log("  3. Route handler - processes the request");
console.log("");
console.log("Request:");
console.log("  PUT /api/users/123");
console.log("  Headers: Authorization: Bearer <token>");
console.log("  Body: { name: 'John Doe', email: 'john@example.com' }");
console.log("");
console.log("Response (success):");
console.log("  200 OK");
console.log("  {");
console.log("    success: true,");
console.log("    data: {");
console.log("      id: '123',");
console.log("      name: 'John Doe',");
console.log("      email: 'john@example.com',");
console.log("      updatedAt: '2024-03-11T...'");
console.log("    }");
console.log("  }");
console.log("");
console.log("Response (validation error):");
console.log("  400 Bad Request");
console.log("  {");
console.log("    success: false,");
console.log("    error: 'Validation failed',");
console.log("    fields: { email: 'Valid email is required' }");
console.log("  }");
console.log("");

// ============================================
// Additional Examples: Production Patterns
// ============================================

console.log("--- Bonus: Production Patterns ---\n");

// Response helpers for consistency
const success = (data: any, status = 200) => {
  return Response.json(
    {
      success: true,
      data,
    },
    { status }
  );
};

const errorResponse = (message: string, status = 400) => {
  return Response.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
};

console.log("Response Helper Functions:");
console.log("  const success = (data, status = 200) =>");
console.log("    Response.json({ success: true, data }, { status })");
console.log("");
console.log("  const error = (message, status = 400) =>");
console.log("    Response.json({ success: false, error: message }, { status })");
console.log("");

// Route grouping
console.log("Route Grouping Pattern:");
console.log("  app.route('/api/goals')");
console.log("    .get('/', listGoals)");
console.log("    .post('/', createGoal)");
console.log("    .get('/:id', getGoal)");
console.log("    .put('/:id', updateGoal)");
console.log("    .delete('/:id', deleteGoal)");
console.log("");

console.log("\n✅ Exercise complete!");
console.log("\nKey takeaways:");
console.log("  ✅ Use c.json() for JSON responses");
console.log("  ✅ Return 201 for resource creation");
console.log("  ✅ Extract params with c.req.param('id')");
console.log("  ✅ Extract query params with c.req.query('key')");
console.log("  ✅ Parse JSON body with await c.req.json()");
console.log("  ✅ Use middleware for cross-cutting concerns");
console.log("  ✅ Validate input early in middleware");
console.log("  ✅ Return consistent response shapes");
console.log("  ✅ Handle errors gracefully with proper status codes");

export {};
