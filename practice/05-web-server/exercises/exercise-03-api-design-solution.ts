// SOLUTION: Exercise 3 - API Design
// Compare with your work to see how you did!

console.log("=== Exercise 3: API Design (Solution) ===\n");

// ============================================
// SOLUTION 1: Resource Structure
// ============================================

const apiEndpoints = {
  // Users
  listUsers: {
    method: "GET",
    path: "/api/v1/users",
  },
  createUser: {
    method: "POST",
    path: "/api/v1/users",
  },
  getUser: {
    method: "GET",
    path: "/api/v1/users/:id",
  },
  updateUser: {
    method: "PUT",
    path: "/api/v1/users/:id",
  },
  deleteUser: {
    method: "DELETE",
    path: "/api/v1/users/:id",
  },

  // Goals (nested under users)
  listUserGoals: {
    method: "GET",
    path: "/api/v1/users/:userId/goals",
  },
  createUserGoal: {
    method: "POST",
    path: "/api/v1/users/:userId/goals",
  },
  getUserGoal: {
    method: "GET",
    path: "/api/v1/users/:userId/goals/:goalId",
  },

  // Sessions
  listSessions: {
    method: "GET",
    path: "/api/v1/sessions",
  },
  createSession: {
    method: "POST",
    path: "/api/v1/sessions",
  },
};

console.log("--- SOLUTION 1: Resource Structure ---");
console.log("API Endpoints:");
Object.entries(apiEndpoints).forEach(([name, endpoint]) => {
  console.log(`  ${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(35)} - ${name}`);
});
console.log("");

console.log("RESTful Design Principles:");
const principles = {
  "Nouns not verbs": "URLs represent resources (users), not actions (getUsers)",
  "Plural form": "Collections use plural (/users, not /user)",
  "Hierarchy": "Related resources nested (/users/:id/goals)",
  "HTTP methods": "Methods indicate actions (GET=read, POST=create)",
  "Versioning": "Version in URL (/api/v1/users)",
};
Object.entries(principles).forEach(([name, principle]) => {
  console.log(`  ${name.padEnd(15)} - ${principle}`);
});
console.log("");

// ============================================
// SOLUTION 2: Request/Response DTOs
// ============================================

interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateGoalRequest {
  title: string;
  targetDate: string;
  status?: "active" | "completed" | "paused";
}

interface GoalResponse {
  id: string;
  userId: string;
  title: string;
  targetDate: string;
  status: "active" | "completed" | "paused";
  createdAt: string;
  updatedAt: string;
}

interface UpdateGoalRequest {
  title?: string;
  targetDate?: string;
  status?: "active" | "completed" | "paused";
}

interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  fields?: Record<string, string>;
  requestId?: string;
}

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

console.log("--- SOLUTION 2: Request/Response DTOs ---");
console.log("Request DTOs:");
console.log("  CreateUserRequest:");
console.log("    name: string (required)");
console.log("    email: string (required)");
console.log("    age?: number (optional)");
console.log("");
console.log("  CreateGoalRequest:");
console.log("    title: string (required)");
console.log("    targetDate: string (required)");
console.log("    status?: 'active' | 'completed' | 'paused' (optional, defaults to 'active')");
console.log("");
console.log("Response DTOs:");
console.log("  UserResponse:");
console.log("    id: string (UUID)");
console.log("    name: string");
console.log("    email: string");
console.log("    age?: number");
console.log("    createdAt: string (ISO date)");
console.log("    updatedAt: string (ISO date)");
console.log("");
console.log("  GoalResponse:");
console.log("    id: string (UUID)");
console.log("    userId: string");
console.log("    title: string");
console.log("    targetDate: string (ISO date)");
console.log("    status: 'active' | 'completed' | 'paused'");
console.log("    createdAt: string");
console.log("    updatedAt: string");
console.log("");
console.log("Generic Response Types:");
console.log("  SuccessResponse<T>");
console.log("    success: true");
console.log("    data: T");
console.log("");
console.log("  ErrorResponse");
console.log("    success: false");
console.log("    error: string");
console.log("    code?: string");
console.log("    fields?: Record<string, string>  // For validation errors");
console.log("");

// ============================================
// SOLUTION 3: Validation
// ============================================

const validationRules = {
  createUser: {
    name: {
      required: true,
      type: "string",
      minLength: 2,
      errorMessage: "Name is required and must be at least 2 characters",
    },
    email: {
      required: true,
      type: "string",
      format: "email",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Valid email address is required",
    },
    age: {
      required: false,
      type: "number",
      min: 18,
      max: 120,
      errorMessage: "Age must be between 18 and 120",
    },
  },
  createGoal: {
    title: {
      required: true,
      type: "string",
      minLength: 2,
      maxLength: 200,
      errorMessage: "Title is required (2-200 characters)",
    },
    targetDate: {
      required: true,
      type: "string",
      format: "ISO 8601 date",
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      errorMessage: "Target date is required (YYYY-MM-DD format)",
    },
    status: {
      required: false,
      type: "enum",
      allowedValues: ["active", "completed", "paused"],
      default: "active",
      errorMessage: "Status must be one of: active, completed, paused",
    },
  },
};

console.log("--- SOLUTION 3: Validation ---");
console.log("Validation Implementation:");
console.log("");
console.log("createUser validation:");
console.log("  1. Check name exists and is string with min length 2");
console.log("  2. Check email exists and matches email pattern");
console.log("  3. Check age (if provided) is number between 18-120");
console.log("");
console.log("Example validation error response:");
const validationErrorExample: ErrorResponse = {
  success: false,
  error: "Validation failed",
  code: "VALIDATION_ERROR",
  fields: {
    email: "Valid email address is required",
    age: "Age must be between 18 and 120",
  },
};
console.log(JSON.stringify(validationErrorExample, null, 2));
console.log("");

// Validation function example
function validateCreateUser(data: any): { valid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate name
  if (!data.name || typeof data.name !== "string") {
    errors.name = "Name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // Validate email
  if (!data.email || typeof data.email !== "string") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Valid email address is required";
  }

  // Validate age (optional)
  if (data.age !== undefined) {
    if (typeof data.age !== "number") {
      errors.age = "Age must be a number";
    } else if (data.age < 18 || data.age > 120) {
      errors.age = "Age must be between 18 and 120";
    }
  }

  return Object.keys(errors).length === 0 ? { valid: true } : { valid: false, errors };
}

console.log("Validation function example:");
console.log("  validateCreateUser(data)");
console.log("    Returns: { valid: boolean, errors?: Record<string, string> }");
console.log("");

// ============================================
// SOLUTION 4: Error Responses
// ============================================

const errorResponses = {
  validationError: {
    status: 400,
    body: {
      success: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      fields: {
        email: "Valid email is required",
        age: "Age must be between 18 and 120",
      },
    },
  },
  notFound: {
    status: 404,
    body: {
      success: false,
      error: "User not found",
      code: "USER_NOT_FOUND",
    },
  },
  unauthorized: {
    status: 401,
    body: {
      success: false,
      error: "Authentication required",
      code: "UNAUTHORIZED",
    },
  },
  forbidden: {
    status: 403,
    body: {
      success: false,
      error: "You don't have permission to access this resource",
      code: "FORBIDDEN",
    },
  },
  serverError: {
    status: 500,
    body: {
      success: false,
      error: "Internal server error",
      code: "INTERNAL_ERROR",
      requestId: "req_abc123xyz",
    },
  },
};

console.log("--- SOLUTION 4: Error Responses ---");
console.log("Status Code Guide:");
console.log("");
console.log("400 Bad Request:");
console.log("  Use for: Validation errors, malformed requests");
console.log("  ", JSON.stringify(errorResponses.validationError.body, null, 2));
console.log("");
console.log("401 Unauthorized:");
console.log("  Use for: Missing or invalid authentication");
console.log("  ", JSON.stringify(errorResponses.unauthorized.body, null, 2));
console.log("");
console.log("403 Forbidden:");
console.log("  Use for: Authenticated but no permission");
console.log("  ", JSON.stringify(errorResponses.forbidden.body, null, 2));
console.log("");
console.log("404 Not Found:");
console.log("  Use for: Resource doesn't exist");
console.log("  ", JSON.stringify(errorResponses.notFound.body, null, 2));
console.log("");
console.log("500 Internal Server Error:");
console.log("  Use for: Unexpected server errors");
console.log("  Include requestId for debugging");
console.log("  ", JSON.stringify(errorResponses.serverError.body, null, 2));
console.log("");

// ============================================
// SOLUTION 5: API Versioning
// ============================================

const versionedEndpoints = {
  v1: {
    listUsers: "GET /api/v1/users",
    createUser: "POST /api/v1/users",
    getUser: "GET /api/v1/users/:id",
    updateUser: "PUT /api/v1/users/:id",
    deleteUser: "DELETE /api/v1/users/:id",
    listUserGoals: "GET /api/v1/users/:userId/goals",
    createUserGoal: "POST /api/v1/users/:userId/goals",
  },
  v2: {
    listUsers: "GET /api/v2/users",
    createUser: "POST /api/v2/users",
    // v2 might add new fields or change behavior
  },
};

console.log("--- SOLUTION 5: API Versioning ---");
console.log("Versioned Endpoints:");
console.log("");
console.log("API v1 (current):");
Object.entries(versionedEndpoints.v1).forEach(([name, endpoint]) => {
  console.log(`  ${endpoint.padEnd(45)} - ${name}`);
});
console.log("");
console.log("Why version APIs?");
const versioningReasons = {
  "Backward Compatibility": "Existing clients continue working",
  "Breaking Changes": "Introduce changes in new version",
  "Gradual Migration": "Clients migrate at their own pace",
  "Deprecation": "Communicate old version removal",
  "Multiple Versions": "Support different client needs",
};
Object.entries(versioningReasons).forEach(([reason, description]) => {
  console.log(`  ${reason.padEnd(25)} - ${description}`);
});
console.log("");
console.log("Versioning Strategies:");
const strategies = {
  "URL Versioning": "/api/v1/users (recommended, clear, cacheable)",
  "Header Versioning": "Accept: application/vnd.api.v1+json (flexible, harder to debug)",
  "Query Versioning": "/api/users?version=1 (not recommended)",
};
Object.entries(strategies).forEach(([strategy, notes]) => {
  console.log(`  ${strategy.padEnd(20)} - ${notes}`);
});
console.log("");

// ============================================
// BONUS SOLUTION: Complete Endpoint
// ============================================

const completeEndpoint = {
  updateUserGoal: {
    request: {
      method: "PATCH",
      url: "/api/v1/users/:userId/goals/:goalId",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <jwt_token>",
      },
      body: {
        title: "Lose 15 pounds", // optional
        status: "active", // optional
        targetDate: "2024-07-01", // optional
      },
    },
    validation: {
      title: {
        optional: true,
        type: "string",
        minLength: 2,
        maxLength: 200,
      },
      status: {
        optional: true,
        type: "enum",
        allowedValues: ["active", "completed", "paused"],
      },
      targetDate: {
        optional: true,
        type: "string",
        format: "YYYY-MM-DD",
      },
    },
    responses: {
      success: {
        status: 200,
        body: {
          success: true,
          data: {
            id: "goal-123",
            userId: "user-456",
            title: "Lose 15 pounds",
            status: "active",
            targetDate: "2024-07-01",
            createdAt: "2024-03-01T10:00:00Z",
            updatedAt: "2024-03-11T14:30:00Z",
          },
        },
      },
      validationError: {
        status: 400,
        body: {
          success: false,
          error: "Validation failed",
          code: "VALIDATION_ERROR",
          fields: {
            status: "Status must be one of: active, completed, paused",
          },
        },
      },
      notFound: {
        status: 404,
        body: {
          success: false,
          error: "Goal not found",
          code: "GOAL_NOT_FOUND",
        },
      },
      forbidden: {
        status: 403,
        body: {
          success: false,
          error: "You don't have permission to update this goal",
          code: "FORBIDDEN",
        },
      },
    },
  },
};

console.log("--- BONUS SOLUTION: Complete Endpoint ---");
console.log("PATCH /api/v1/users/:userId/goals/:goalId");
console.log("");
console.log("PURPOSE: Partially update a user's goal");
console.log("");
console.log("REQUEST:");
console.log(`  Method: ${completeEndpoint.updateUserGoal.request.method}`);
console.log(`  URL: ${completeEndpoint.updateUserGoal.request.url}`);
console.log("  Headers:");
Object.entries(completeEndpoint.updateUserGoal.request.headers).forEach(([k, v]) => {
  console.log(`    ${k}: ${v}`);
});
console.log("  Body:");
console.log("    ", JSON.stringify(completeEndpoint.updateUserGoal.request.body, null, 6).split("\n").join("\n    "));
console.log("");
console.log("VALIDATION:");
Object.entries(completeEndpoint.updateUserGoal.validation).forEach(([field, rules]) => {
  console.log(`  ${field}:`);
  console.log(`    optional: ${rules.optional}`);
  console.log(`    type: ${rules.type}`);
  if (rules.allowedValues) console.log(`    allowedValues: ${rules.allowedValues.join(", ")}`);
  if (rules.minLength) console.log(`    minLength: ${rules.minLength}`);
});
console.log("");
console.log("RESPONSES:");
console.log("  200 OK - Success:");
console.log("    ", JSON.stringify(completeEndpoint.updateUserGoal.responses.success.body, null, 6).split("\n").join("\n    "));
console.log("");
console.log("  400 Bad Request - Validation Error:");
console.log("    ", JSON.stringify(completeEndpoint.updateUserGoal.responses.validationError.body, null, 6).split("\n").join("\n    "));
console.log("");
console.log("  404 Not Found:");
console.log("    ", JSON.stringify(completeEndpoint.updateUserGoal.responses.notFound.body, null, 6).split("\n").join("\n    "));
console.log("");

// ============================================
// Additional Examples: Production Patterns
// ============================================

console.log("--- Bonus: Production Patterns ---\n");

// Pagination
console.log("Pagination Pattern:");
const paginatedResponse: PaginatedResponse<{ id: string; title: string }> = {
  success: true,
  data: [
    { id: "1", title: "Goal 1" },
    { id: "2", title: "Goal 2" },
  ],
  pagination: {
    page: 1,
    limit: 20,
    total: 150,
    totalPages: 8,
  },
};
console.log("  Response:", JSON.stringify(paginatedResponse, null, 2).split("\n").join("\n  "));
console.log("");

// Partial response
console.log("Partial Response (Field Selection):");
console.log("  Request: GET /api/v1/users?fields=id,name,email");
console.log("  Response: { success: true, data: [{ id, name, email }] }");
console.log("  Benefit: Reduce bandwidth, improve performance");
console.log("");

// Rate limiting headers
console.log("Rate Limiting Headers:");
console.log("  X-RateLimit-Limit: 1000");
console.log("  X-RateLimit-Remaining: 950");
console.log("  X-RateLimit-Reset: 1640000000");
console.log("");
console.log("  When limit exceeded (429):");
console.log("  {");
console.log("    success: false,");
console.log("    error: 'Rate limit exceeded',");
console.log("    retryAfter: 60");
console.log("  }");
console.log("");

// CORS headers
console.log("CORS Headers:");
console.log("  Access-Control-Allow-Origin: https://example.com");
console.log("  Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
console.log("  Access-Control-Allow-Headers: Content-Type, Authorization");
console.log("  Access-Control-Max-Age: 86400");
console.log("");

console.log("\n✅ Exercise complete!");
console.log("\nKey takeaways:");
console.log("  ✅ Use nouns for resources, plural for collections");
console.log("  ✅ Show resource hierarchy in URL structure");
console.log("  ✅ Use HTTP methods for actions (GET, POST, PUT, DELETE, PATCH)");
console.log("  ✅ Separate request and response DTOs");
console.log("  ✅ Validate all input on the server");
console.log("  ✅ Return consistent error response formats");
console.log("  ✅ Use appropriate status codes (400, 401, 403, 404, 500)");
console.log("  ✅ Version your APIs from the start");
console.log("  ✅ Include helpful error messages with field details");
console.log("  ✅ Use pagination for large result sets");

export {};
