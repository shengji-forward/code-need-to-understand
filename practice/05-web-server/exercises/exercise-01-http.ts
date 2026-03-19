// EXERCISE 1: HTTP Basics
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 05-web-server/exercises/exercise-01-http.ts

import { goals } from "../../04-database-basics/exercises/exercise-02-drizzle-solution";

console.log("=== Exercise 1: HTTP Basics ===\n");

// ============================================
// TODO 1: Identify HTTP Methods
// ============================================
// Instructions:
// - Match the HTTP method to its appropriate use case
// - A health coaching API needs endpoints for:
//   1. Getting a list of all users
//   2. Creating a new goal
//   3. Updating a user's profile completely
//   4. Deleting a session
//   5. Partially updating a goal (e.g., just the status)

// TODO: Your code here - Assign the correct HTTP method to each use case
const apiEndpoints = {
  listUsers: {
    method: "GET",       // Correct answer filled in as example
    path: "/api/users",
    description: "Get all users"
  },
  createGoal: {
    method: "POST",          // TODO: What method for creating?
    path: "/api/goals",
    description: "Create new goal"
  },
  updateUser: {
    method: "PUT",          // TODO: What method for full update?
    path: "/api/users/:id",
    description: "Replace entire user profile"
  },
  deleteSession: {
    method: "DELETE",          // TODO: What method for deleting?
    path: "/api/sessions/:id",
    description: "Delete a session"
  },
  patchGoal: {
    method: "PATCH",          // TODO: What method for partial update?
    path: "/api/goals/:id",
    description: "Update goal status only"
  }
};

console.log("--- TODO 1: HTTP Methods ---");
Object.entries(apiEndpoints).forEach(([key, endpoint]) => {
  console.log(`${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(20)} - ${endpoint.description}`);
});
console.log("");
console.log("Expected: GET, POST, PUT, DELETE, PATCH");
console.log("");

// ============================================
// TODO 2: Choose Status Codes
// ============================================
// Instructions:
// - Choose the appropriate status code for each scenario
// - Options: 200, 201, 204, 400, 401, 403, 404, 500

// TODO: Your code here - Fill in the correct status codes
const scenarios = {
  successfulLogin: {
    code: 200,             // TODO: User logged in successfully
    description: "Login successful, returns user data"
  },
  userCreated: {
    code: 201,             // TODO: New user account created
    description: "User created successfully, includes Location header"
  },
  deleted: {
    code: 204,             // TODO: Resource deleted, no body returned
    description: "Goal deleted successfully"
  },
  validationError: {
    code: 400,             // TODO: Invalid request data
    description: "Email is missing from request body"
  },
  notAuthorized: {
    code: 401,             // TODO: User not logged in
    description: "No valid authentication token provided"
  },
  forbidden: {
    code: 403,             // TODO: User logged in but can't access resource
    description: "User trying to delete another user's goal"
  },
  notFound: {
    code: 404,             // TODO: Resource doesn't exist
    description: "Goal with ID 123 doesn't exist"
  },
  serverError: {
    code: 500,             // TODO: Something went wrong on server
    description: "Database connection failed"
  }
};

console.log("--- TODO 2: Status Codes ---");
Object.entries(scenarios).forEach(([key, scenario]) => {
  console.log(`${String(scenario.code).padEnd(3)} - ${scenario.description}`);
});
console.log("");
console.log("Expected: 200, 201, 204, 400, 401, 403, 404, 500");
console.log("");

// ============================================
// TODO 3: Design RESTful URLs
// ============================================
// Instructions:
// - Design RESTful URLs for a health coaching API
// - Resources: users, goals, sessions, health_metrics
// - Include proper hierarchy (nested resources)

// TODO: Your code here - Write the RESTful URLs
const urls = {
  getAllUsers: "api/users",                    // TODO: Get all users
  getUserById: "api/users/:id",                    // TODO: Get specific user
  getUserGoals: "api/users/:id/goals",                   // TODO: Get all goals for a user
  getSpecificGoal: "api/users/:id/goals/:goalId",                // TODO: Get specific goal
  getUserSessions: "api/users/:id/sessions",                // TODO: Get sessions for a user
  getHealthMetrics: "api/users/:id/health-metrics",               // TODO: Get health metrics for user
  searchGoals: "api/goals?q=searchterm",                    // TODO: Search goals with query string
  paginatedUsers: "api/users?page=2&limit=10",                 // TODO: Get paginated list of users
};

console.log("--- TODO 3: RESTful URL Design ---");
console.log("getAllUsers:", urls.getAllUsers || "TODO");
console.log("getUserById:", urls.getUserById || "TODO");
console.log("getUserGoals:", urls.getUserGoals || "TODO");
console.log("getSpecificGoal:", urls.getSpecificGoal || "TODO");
console.log("getUserSessions:", urls.getUserSessions || "TODO");
console.log("getHealthMetrics:", urls.getHealthMetrics || "TODO");
console.log("searchGoals:", urls.searchGoals || "TODO");
console.log("paginatedUsers:", urls.paginatedUsers || "TODO");
console.log("");
console.log("Hints:");
console.log("  - Use plural nouns");
console.log("  - Show resource hierarchy");
console.log("  - Use query params for search/pagination");
console.log("");

// ============================================
// TODO 4: HTTP Headers
// ============================================
// Instructions:
// - Match the header to its purpose
// - Headers: Content-Type, Authorization, Accept, Cache-Control, Location

// TODO: Your code here - Match headers to purposes
const headerPurposes = {
  "Accept": "Tells server what format the client wants in response",
  "Content-Type": "Tells client what format the response body is",
  "Authorization": "Contains authentication credentials (token or API key)",
  "Location": "URL of newly created resource (for 201 responses)",
  "Cache-Control": "Instructions for caching the response"
};

console.log("--- TODO 4: HTTP Headers ---");
Object.entries(headerPurposes).forEach(([header, purpose]) => {
  console.log(`${header || "TODO".padEnd(15)} - ${purpose}`);
});
console.log("");
console.log("Expected headers: Accept, Content-Type, Authorization, Location, Cache-Control");
console.log("");

// ============================================
// TODO 5: Idempotency
// ============================================
// Instructions:
// - Mark each operation as idempotent or not idempotent
// - Idempotent = calling it multiple times has same effect as calling once

// TODO: Your code here - Mark true/false for idempotent
const idempotencyCheck = {
  "GET /api/users": true,      // TODO: Is this idempotent?
  "POST /api/users": false,     // TODO: Is this idempotent?
  "PUT /api/users/1": true,    // TODO: Is this idempotent?
  "DELETE /api/users/1": true, // TODO: Is this idempotent?
  "PATCH /api/counters/1": false // TODO: Is this idempotent?
};

console.log("--- TODO 5: Idempotency ---");
Object.entries(idempotencyCheck).forEach(([operation, isIdempotent]) => {
  console.log(`${operation.padEnd(25)} - ${isIdempotent ? "Idempotent" : "Not Idempotent"}`);
});
console.log("");
console.log("Remember:");
console.log("  - Idempotent: Safe to retry (GET, PUT, DELETE)");
console.log("  - Not idempotent: Retrying causes side effects (POST, PATCH)");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Design a complete API interaction for creating a goal and retrieving it
// - Include: method, URL, headers, body, and expected response

// TODO: Your code here - Design the full API interaction
const createGoalInteraction = {
  request: {
    method: "POST",        // TODO: What HTTP method?
    url: "/api/users/:userId/goals",           // TODO: What URL?
    headers: {         // TODO: What headers are needed?
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs...",
      "Accept": "application/json"
    },
    body: {
      title: "Lose weight",
      target: "10kg",
      deadline: "2026-12-31"
    }           // TODO: What does the request body look like?
  },
  response: {
    status: 201,         // TODO: What status code?
    headers: {         // TODO: What headers in response?
      "Location": "/api/users/123/goals/456"
    },
    body: {
      id: 1,
      userId: 123,
      title: "Lose weight",
      target: "10kg",
      deadline: "2026-12-31",
      status: "active",
      createdAt: "2026-03-19T10:00:00Z"
    }           // TODO: What does the response body look like?
  }
};

console.log("--- BONUS: Complete API Interaction ---");
console.log("Request:");
console.log("  Method:", createGoalInteraction.request.method || "TODO");
console.log("  URL:", createGoalInteraction.request.url || "TODO");
console.log("  Headers:", JSON.stringify(createGoalInteraction.request.headers) || "TODO");
console.log("  Body:", JSON.stringify(createGoalInteraction.request.body) || "TODO");
console.log("");
console.log("Response:");
console.log("  Status:", createGoalInteraction.response.status || "TODO");
console.log("  Headers:", JSON.stringify(createGoalInteraction.response.headers) || "TODO");
console.log("  Body:", JSON.stringify(createGoalInteraction.response.body) || "TODO");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-01-http-solution.ts");

export {};
