// SOLUTION: Exercise 1 - HTTP Basics
// Compare with your work to see how you did!

console.log("=== Exercise 1: HTTP Basics (Solution) ===\n");

// ============================================
// SOLUTION 1: HTTP Methods
// ============================================

const apiEndpoints = {
  listUsers: {
    method: "GET",
    path: "/api/users",
    description: "Get all users",
    explanation: "GET retrieves data without side effects. Safe and cacheable."
  },
  createGoal: {
    method: "POST",
    path: "/api/goals",
    description: "Create new goal",
    explanation: "POST creates new resources. Not idempotent - each call creates a new goal."
  },
  updateUser: {
    method: "PUT",
    path: "/api/users/:id",
    description: "Replace entire user profile",
    explanation: "PUT updates entire resource. Idempotent - sending same data multiple times has same effect."
  },
  deleteSession: {
    method: "DELETE",
    path: "/api/sessions/:id",
    description: "Delete a session",
    explanation: "DELETE removes resource. Idempotent - deleting same resource twice = still deleted."
  },
  patchGoal: {
    method: "PATCH",
    path: "/api/goals/:id",
    description: "Update goal status only",
    explanation: "PATCH does partial update. Not idempotent - incrementing status multiple times = different result."
  }
};

console.log("--- SOLUTION 1: HTTP Methods ---");
Object.entries(apiEndpoints).forEach(([key, endpoint]) => {
  console.log(`${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(20)} - ${endpoint.description}`);
});
console.log("");
console.log("Explanation:");
Object.entries(apiEndpoints).forEach(([key, endpoint]) => {
  console.log(`  ${endpoint.method}:`, endpoint.explanation);
});
console.log("");

// Quick reference
const methodSummary = {
  "GET": "Read data, safe, idempotent, cacheable",
  "POST": "Create data, not safe, NOT idempotent, not cacheable",
  "PUT": "Replace data, not safe, idempotent, not cacheable",
  "PATCH": "Partial update, not safe, NOT idempotent, not cacheable",
  "DELETE": "Delete data, not safe, idempotent, not cacheable"
};
console.log("Quick Reference:");
Object.entries(methodSummary).forEach(([method, summary]) => {
  console.log(`  ${method.padEnd(6)} - ${summary}`);
});
console.log("");

// ============================================
// SOLUTION 2: Status Codes
// ============================================

const scenarios = {
  successfulLogin: {
    code: 200,
    description: "Login successful, returns user data",
    explanation: "200 OK - Generic success response when returning data"
  },
  userCreated: {
    code: 201,
    description: "User created successfully, includes Location header",
    explanation: "201 Created - New resource created. Should include Location header with new resource URL."
  },
  deleted: {
    code: 204,
    description: "Goal deleted successfully",
    explanation: "204 No Content - Success, but no response body needed. Used for DELETE operations."
  },
  validationError: {
    code: 400,
    description: "Email is missing from request body",
    explanation: "400 Bad Request - Client sent invalid data. Should include error details."
  },
  notAuthorized: {
    code: 401,
    description: "No valid authentication token provided",
    explanation: "401 Unauthorized - Authentication required or failed. Client needs to log in."
  },
  forbidden: {
    code: 403,
    description: "User trying to delete another user's goal",
    explanation: "403 Forbidden - Authenticated but lacks permission. Different from 401!"
  },
  notFound: {
    code: 404,
    description: "Goal with ID 123 doesn't exist",
    explanation: "404 Not Found - Resource doesn't exist (or client lacks permission to know it exists)."
  },
  serverError: {
    code: 500,
    description: "Database connection failed",
    explanation: "500 Internal Server Error - Something went wrong on the server. Log and monitor these!"
  }
};

console.log("--- SOLUTION 2: Status Codes ---");
Object.entries(scenarios).forEach(([key, scenario]) => {
  console.log(`${scenario.code} - ${scenario.description}`);
  console.log(`  Explanation: ${scenario.explanation}`);
});
console.log("");

// Status code categories
const statusCategories = {
  "2xx Success": {
    codes: ["200 OK", "201 Created", "204 No Content"],
    usage: "Request succeeded"
  },
  "3xx Redirection": {
    codes: ["301 Moved Permanently", "302 Found"],
    usage: "Client needs to take additional action"
  },
  "4xx Client Error": {
    codes: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"],
    usage: "Client made an error (fix the request)"
  },
  "5xx Server Error": {
    codes: ["500 Internal Server Error", "502 Bad Gateway", "503 Service Unavailable"],
    usage: "Server failed (fix the server, log and monitor!)"
  }
};
console.log("Status Code Categories:");
Object.entries(statusCategories).forEach(([category, details]) => {
  console.log(`  ${category}:`);
  console.log(`    Codes: ${details.codes.join(", ")}`);
  console.log(`    Usage: ${details.usage}`);
});
console.log("");

// ============================================
// SOLUTION 3: RESTful URLs
// ============================================

const urls = {
  getAllUsers: "/api/users",
  getUserById: "/api/users/:id",
  getUserGoals: "/api/users/:id/goals",
  getSpecificGoal: "/api/users/:id/goals/:goalId",
  getUserSessions: "/api/users/:id/sessions",
  getHealthMetrics: "/api/users/:id/health-metrics",
  searchGoals: "/api/goals?q=weight+loss&status=active",
  paginatedUsers: "/api/users?page=2&limit=20"
};

console.log("--- SOLUTION 3: RESTful URL Design ---");
Object.entries(urls).forEach(([name, url]) => {
  console.log(`${name.padEnd(20)} → ${url}`);
});
console.log("");

console.log("RESTful Design Principles:");
const principles = {
  "Use Nouns": "Resources are nouns (users), not actions (getUsers)",
  "Use Plural": "Collections are plural (/users), not singular (/user)",
  "Show Hierarchy": "Nested resources show relationships (/users/:id/goals)",
  "Query Params": "Use ? for filtering, sorting, pagination (?q=search&page=1)",
  "No Verbs": "HTTP methods provide actions, URLs identify resources"
};
Object.entries(principles).forEach(([name, principle]) => {
  console.log(`  ${name.padEnd(15)} - ${principle}`);
});
console.log("");

// ============================================
// SOLUTION 4: HTTP Headers
// ============================================

const headerPurposes = {
  "Accept": "Tells server what format the client wants in response",
  "Content-Type": "Tells client what format the response body is",
  "Authorization": "Contains authentication credentials (token or API key)",
  "Location": "URL of newly created resource (for 201 responses)",
  "Cache-Control": "Instructions for caching the response"
};

console.log("--- SOLUTION 4: HTTP Headers ---");
Object.entries(headerPurposes).forEach(([header, purpose]) => {
  console.log(`${header.padEnd(15)} - ${purpose}`);
});
console.log("");

console.log("Header Examples:");
const headerExamples = {
  "Request Headers": {
    "Accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs...",
    "Content-Type": "application/json",
    "User-Agent": "MyApp/1.0"
  },
  "Response Headers": {
    "Content-Type": "application/json",
    "Content-Length": "1234",
    "Cache-Control": "max-age=3600",
    "Location": "/api/users/123"
  }
};
Object.entries(headerExamples).forEach(([category, headers]) => {
  console.log(`  ${category}:`);
  Object.entries(headers).forEach(([name, value]) => {
    console.log(`    ${name}: ${value}`);
  });
});
console.log("");

// ============================================
// SOLUTION 5: Idempotency
// ============================================

const idempotencyCheck = {
  "GET /api/users": true,
  "POST /api/users": false,
  "PUT /api/users/1": true,
  "DELETE /api/users/1": true,
  "PATCH /api/counters/1": false
};

console.log("--- SOLUTION 5: Idempotency ---");
Object.entries(idempotencyCheck).forEach(([operation, isIdempotent]) => {
  const status = isIdempotent ? "✅ Idempotent" : "❌ Not Idempotent";
  console.log(`${operation.padEnd(25)} - ${status}`);
});
console.log("");

console.log("Why it matters:");
console.log("  ✅ Idempotent operations can be safely retried");
console.log("  ❌ Non-idempotent operations may cause issues if retried");
console.log("");
console.log("Examples:");
const idempotencyExamples = {
  "PUT /api/users/1": {
    safe: true,
    reason: "Sending same data twice = user ends up in same state"
  },
  "POST /api/charges": {
    safe: false,
    reason: "Sending request twice = charges card twice!"
  },
  "DELETE /api/users/1": {
    safe: true,
    reason: "Deleting twice = user still deleted (second call returns 404)"
  },
  "PATCH /api/counters/increment": {
    safe: false,
    reason: "Calling twice = counter increments twice"
  }
};
Object.entries(idempotencyExamples).forEach(([operation, details]) => {
  console.log(`  ${operation}:`);
  console.log(`    Safe to retry: ${details.safe ? "Yes" : "No"}`);
  console.log(`    Reason: ${details.reason}`);
});
console.log("");

// ============================================
// BONUS SOLUTION: Complete API Interaction
// ============================================

const createGoalInteraction = {
  request: {
    method: "POST",
    url: "/api/users/abc123/goals",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs...",
      "Accept": "application/json"
    },
    body: {
      title: "Lose 10 pounds",
      targetDate: "2024-06-01",
      status: "active"
    }
  },
  response: {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Location": "/api/users/abc123/goals/456",
      "Cache-Control": "no-cache"
    },
    body: {
      success: true,
      data: {
        id: "456",
        userId: "abc123",
        title: "Lose 10 pounds",
        targetDate: "2024-06-01",
        status: "active",
        createdAt: "2024-03-11T10:30:00Z"
      }
    }
  }
};

console.log("--- BONUS SOLUTION: Complete API Interaction ---");
console.log("Creating a new goal:");
console.log("");
console.log("REQUEST:");
console.log(`  ${createGoalInteraction.request.method} ${createGoalInteraction.request.url}`);
console.log("  Headers:");
Object.entries(createGoalInteraction.request.headers).forEach(([name, value]) => {
  console.log(`    ${name}: ${value}`);
});
console.log("  Body:");
console.log("    ", JSON.stringify(createGoalInteraction.request.body, null, 4).split("\n").join("\n    "));
console.log("");
console.log("RESPONSE:");
console.log(`  Status: ${createGoalInteraction.response.status} Created`);
console.log("  Headers:");
Object.entries(createGoalInteraction.response.headers).forEach(([name, value]) => {
  console.log(`    ${name}: ${value}`);
});
console.log("  Body:");
console.log("    ", JSON.stringify(createGoalInteraction.response.body, null, 4).split("\n").join("\n    "));
console.log("");

console.log("Key points:");
console.log("  1. POST used for creating new resource");
console.log("  2. URL shows hierarchy (/users/:id/goals)");
console.log("  3. Authorization header includes JWT token");
console.log("  4. Content-Type tells server to expect JSON");
console.log("  5. Response status 201 indicates creation");
console.log("  6. Location header points to new resource");
console.log("  7. Response body includes created resource with generated ID");
console.log("");

// ============================================
// Additional Examples: Production Patterns
// ============================================

console.log("--- Bonus: Production Patterns ---\n");

// Error Response Format
const errorResponse = {
  status: 400,
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    success: false,
    error: "Validation failed",
    code: "VALIDATION_ERROR",
    fields: {
      title: "Title is required",
      targetDate: "Must be a future date"
    }
  }
};
console.log("Error Response Example (400):");
console.log("  ", JSON.stringify(errorResponse.body, null, 4).split("\n").join("\n  "));
console.log("");

// Pagination Headers
const paginationHeaders = {
  "X-Page": "2",
  "X-Per-Page": "20",
  "X-Total": "150",
  "X-Total-Pages": "8"
};
console.log("Pagination Headers:");
Object.entries(paginationHeaders).forEach(([name, value]) => {
  console.log(`  ${name}: ${value}`);
});
console.log("");

// Rate Limiting
const rateLimitResponse = {
  status: 429,
  headers: {
    "X-RateLimit-Limit": "1000",
    "X-RateLimit-Remaining": "0",
    "X-RateLimit-Reset": "1640000000",
    "Retry-After": "60"
  },
  body: {
    success: false,
    error: "Rate limit exceeded",
    retryAfter: 60
  }
};
console.log("Rate Limit Response (429):");
console.log("  Status:", rateLimitResponse.status);
console.log("  Headers:");
Object.entries(rateLimitResponse.headers).forEach(([name, value]) => {
  console.log(`    ${name}: ${value}`);
});
console.log("");

console.log("\n✅ Exercise complete!");
console.log("\nKey takeaways:");
console.log("  ✅ Use correct HTTP methods (GET for read, POST for create)");
console.log("  ✅ Return appropriate status codes (200, 201, 400, 404, 500)");
console.log("  ✅ Design RESTful URLs with nouns, plural, and hierarchy");
console.log("  ✅ Use headers properly (Content-Type, Authorization)");
console.log("  ✅ Understand idempotency for safe retries");
console.log("  ✅ Include helpful error messages with validation details");

export {};
