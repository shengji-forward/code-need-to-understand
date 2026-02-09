// Hono Web Server Framework
// This demonstrates the patterns used in OpenCoach's gateway

console.log("=== Hono Framework Patterns ===\n");

// ============================================
// LEVEL 1: Basic Route Definitions
// ============================================

// Note: This is a conceptual demonstration
// In practice, you'd run this as a server

import { Hono } from "hono";

const app = new Hono();

// GET route
app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, World!" });
});

// POST route
app.post("/api/users", async (c) => {
  const body = await c.req.json();
  return c.json({ created: true, user: body }, 201);
});

// PUT route
app.put("/api/users/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  return c.json({ updated: true, id, ...body });
});

// DELETE route
app.delete("/api/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ deleted: true, id });
});

console.log("Routes defined:");
console.log("- GET    /api/hello");
console.log("- POST   /api/users");
console.log("- PUT    /api/users/:id");
console.log("- DELETE /api/users/:id");

// ============================================
// LEVEL 2: Middleware
// ============================================

// Logger middleware
const loggerMiddleware = async (c: any, next: any) => {
  console.log(`⬅️  ${c.req.method} ${c.req.url}`);
  await next(); // Pass to next handler/route
  console.log(`➡️  Response status: ${c.res.status}`);
};

// Authentication middleware
const authMiddleware = async (c: any, next: any) => {
  const token = c.req.header("Authorization");

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
};

// Error handler middleware
const errorHandler = async (c: any, next: any) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);
    return c.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

// Apply middleware
// app.use("*", loggerMiddleware);
// app.use("/api/protected/*", authMiddleware);
// app.use("*", errorHandler);

console.log("\nMiddleware configured:");
console.log("- Logger (all routes)");
console.log("- Auth (/api/protected/*)");
console.log("- Error handler (all routes)");

// ============================================
// LEVEL 2: Route Parameters and Query Strings
// ============================================

// Route parameters
app.get("/api/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ userId: id });
});

// Multiple parameters
app.get("/api/users/:userId/posts/:postId", (c) => {
  const userId = c.req.param("userId");
  const postId = c.req.param("postId");
  return c.json({ userId, postId });
});

// Query parameters
app.get("/api/search", (c) => {
  const query = c.req.query("q");
  const page = c.req.query("page") || "1";
  const limit = c.req.query("limit") || "10";

  return c.json({
    query,
    page: Number(page),
    limit: Number(limit),
  });
});

console.log("\nParameter handling:");
console.log("- Route params: /api/users/:id");
console.log("- Query strings: /api/search?q=test&page=1");

// ============================================
// LEVEL 3: Request Validation
// ============================================

// Validation middleware
const validateUser = async (c: any, next: any) => {
  const body = await c.req.json();

  if (!body.name || typeof body.name !== "string") {
    return c.json({ error: "Name is required" }, 400);
  }

  if (!body.email || !body.email.includes("@")) {
    return c.json({ error: "Valid email is required" }, 400);
  }

  await next();
};

// Usage
// app.post("/api/users", validateUser, async (c) => {
//   const body = await c.req.json();
//   // Save to database...
//   return c.json({ created: true, user: body }, 201);
// });

console.log("\nValidation patterns:");
console.log("- Check required fields");
console.log("- Validate data types");
console.log("- Return 400 for invalid input");

// ============================================
// LEVEL 3: Response Formatting
// ============================================

// Success response helper
const success = (data: any, status = 200) => {
  return Response.json({ success: true, data }, { status });
};

// Error response helper
const error = (message: string, status = 400) => {
  return Response.json({ success: false, error: message }, { status });
};

// Usage in routes
// app.get("/api/users", (c) => {
//   const users = await db.query.users.findMany();
//   return success(users);
// });

// app.post("/api/users", async (c) => {
//   const body = await c.req.json();
//   const user = await createUser(body);
//   return success(user, 201);
// });

console.log("\nResponse formatting:");
console.log("- Consistent structure");
console.log("- Separate success/error helpers");
console.log("- Proper status codes");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

// ✅ Group routes by resource
// app.route("/api/users")
//   .get("/", listUsers)
//   .post("/", createUser)
//   .get("/:id", getUser)
//   .put("/:id", updateUser)
//   .delete("/:id", deleteUser);

// ✅ Use middleware for cross-cutting concerns
// app.use("*", loggerMiddleware);
// app.use("*", errorHandler);

// ✅ Validate input early
// app.post("/api/users", validateUser, async (c) => {
//   // Input is validated here
// });

// ✅ Return consistent error responses
// { success: false, error: "Message" }

// ✅ Use appropriate HTTP methods
// GET = read
// POST = create
// PUT = update (full)
// PATCH = update (partial)
// DELETE = delete

// ✅ Keep route handlers thin
// app.get("/api/users/:id", async (c) => {
//   const id = c.req.param("id");
//   const user = await userService.findById(id);
//   return c.json(user);
// });

// ❌ Don't put business logic in routes
// Move it to service layer

console.log("\n✅ Practice complete!");
console.log("\nNote: This is a conceptual demonstration.");
console.log("To run a real Hono server, check the OpenCoach gateway code.");
