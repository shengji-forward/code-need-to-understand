// EXERCISE 3: API Design
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 05-web-server/exercises/exercise-03-api-design.ts

console.log("=== Exercise 3: API Design ===\n");

// ============================================
// TODO 1: Design Resource Structure
// ============================================
// Instructions:
// - Design RESTful URLs for a health coaching API
// - Resources: users, goals, sessions, health_metrics
// - Include both collection and single-item endpoints
// - Show proper resource hierarchy

// TODO: Your code here - Define the API endpoints
const apiEndpoints = {
  // Users
  listUsers: {
    method: "",      // TODO: What HTTP method?
    path: "",        // TODO: What path?
  },
  createUser: {
    method: "",
    path: "",
  },
  getUser: {
    method: "",
    path: "",
  },
  updateUser: {
    method: "",
    path: "",
  },
  deleteUser: {
    method: "",
    path: "",
  },

  // Goals (nested under users)
  listUserGoals: {
    method: "",
    path: "",        // TODO: Should be nested under user
  },
  createUserGoal: {
    method: "",
    path: "",
  },
  getUserGoal: {
    method: "",
    path: "",
  },

  // Sessions
  listSessions: {
    method: "",
    path: "",
  },
  createSession: {
    method: "",
    path: "",
  },
};

console.log("--- TODO 1: Resource Structure ---");
console.log("API Endpoints:");
Object.entries(apiEndpoints).forEach(([name, endpoint]) => {
  console.log(`  ${endpoint.method.padEnd(6)} ${endpoint.path || "TODO".padEnd(30)} - ${name}`);
});
console.log("");
console.log("Remember:");
console.log("  - Use plural nouns for resources");
console.log("  - Show hierarchy with nested paths");
console.log("  - Use HTTP methods for actions");
console.log("");

// ============================================
// TODO 2: Create Request/Response DTOs
// ============================================
// Instructions:
// - Define TypeScript types for request and response bodies
// - Include all necessary fields with proper types
// - Separate request DTOs from response DTOs

// TODO: Your code here - Define the DTOs
interface CreateUserRequest {
  // TODO: Define required fields for creating a user
  // Should include: name, email, and optionally age
}

interface UserResponse {
  // TODO: Define fields returned for a user
  // Should include: id, name, email, createdAt
}

interface CreateGoalRequest {
  // TODO: Define fields for creating a goal
  // Should include: title, targetDate, status
}

interface GoalResponse {
  // TODO: Define fields returned for a goal
  // Should include: id, userId, title, targetDate, status, createdAt
}

interface ErrorResponse {
  // TODO: Define error response structure
  // Should include: success flag, error message, optional field details
}

console.log("--- TODO 2: Request/Response DTOs ---");
console.log("CreateUserRequest:");
console.log("  name: string (required)");
console.log("  email: string (required)");
console.log("  age: number (optional)");
console.log("");
console.log("UserResponse:");
console.log("  id: string");
console.log("  name: string");
console.log("  email: string");
console.log("  createdAt: string");
console.log("");
console.log("GoalResponse:");
console.log("  id: string");
console.log("  userId: string");
console.log("  title: string");
console.log("  targetDate: string");
console.log("  status: 'active' | 'completed' | 'paused'");
console.log("  createdAt: string");
console.log("");

// ============================================
// TODO 3: Implement Validation
// ============================================
// Instructions:
// - Write validation rules for each field
// - Define appropriate error messages
// - Return structured error responses

// TODO: Your code here - Define validation rules
const validationRules = {
  createUser: {
    name: {
      required: true,
      type: "",           // TODO: What type?
      minLength: 0,       // TODO: Minimum length?
      errorMessage: "",   // TODO: Error message?
    },
    email: {
      required: true,
      type: "",
      format: "",         // TODO: What format?
      errorMessage: "",
    },
    age: {
      required: false,
      type: "",
      min: 0,            // TODO: Minimum age?
      max: 0,            // TODO: Maximum age?
      errorMessage: "",
    },
  },
  createGoal: {
    title: {
      required: true,
      type: "",
      minLength: 0,
      errorMessage: "",
    },
    targetDate: {
      required: true,
      type: "",
      errorMessage: "",
    },
    status: {
      required: false,
      type: "",
      allowedValues: [],  // TODO: What values?
      errorMessage: "",
    },
  },
};

console.log("--- TODO 3: Validation ---");
console.log("createUser validation:");
console.log("  name:");
console.log("    - Required: true");
console.log("    - Type: string");
console.log("    - Min length: 2");
console.log("    - Error: 'Name is required'");
console.log("  email:");
console.log("    - Required: true");
console.log("    - Format: must contain @");
console.log("    - Error: 'Valid email is required'");
console.log("  age:");
console.log("    - Required: false");
console.log("    - Type: number");
console.log("    - Range: 18-120");
console.log("    - Error: 'Age must be between 18 and 120'");
console.log("");

// ============================================
// TODO 4: Design Error Responses
// ============================================
// Instructions:
// - Create error responses for different scenarios
// - Include appropriate status codes
// - Provide helpful error messages

// TODO: Your code here - Define error responses
const errorResponses = {
  validationError: {
    status: 0,           // TODO: What status code?
    body: {
      // TODO: Define error response structure
    },
  },
  notFound: {
    status: 0,           // TODO: What status code?
    body: {
      // TODO: Define error response structure
    },
  },
  unauthorized: {
    status: 0,           // TODO: What status code?
    body: {
      // TODO: Define error response structure
    },
  },
  serverError: {
    status: 0,           // TODO: What status code?
    body: {
      // TODO: Define error response structure
    },
  },
};

console.log("--- TODO 4: Error Responses ---");
console.log("Validation Error (400):");
console.log("  {");
console.log("    success: false,");
console.log("    error: 'Validation failed',");
console.log("    code: 'VALIDATION_ERROR',");
console.log("    fields: {");
console.log("      email: 'Valid email is required'");
console.log("    }");
console.log("  }");
console.log("");
console.log("Not Found (404):");
console.log("  {");
console.log("    success: false,");
console.log("    error: 'Resource not found',");
console.log("    code: 'NOT_FOUND'");
console.log("  }");
console.log("");

// ============================================
// TODO 5: Add API Versioning
// ============================================
// Instructions:
// - Update the API endpoints to include versioning
// - Use URL-based versioning (/api/v1/...)
// - Explain why versioning is important

// TODO: Your code here - Add versioning to endpoints
const versionedEndpoints = {
  listUsers: {
    path: "",            // TODO: Add version to path
  },
  createUser: {
    path: "",            // TODO: Add version to path
  },
  getUser: {
    path: "",            // TODO: Add version to path
  },
};

console.log("--- TODO 5: API Versioning ---");
console.log("Versioned endpoints:");
console.log("  GET    /api/v1/users");
console.log("  POST   /api/v1/users");
console.log("  GET    /api/v1/users/:id");
console.log("  GET    /api/v1/users/:id/goals");
console.log("");
console.log("Why version APIs?");
console.log("  - Avoid breaking existing clients");
console.log("  - Introduce breaking changes in new version");
console.log("  - Maintain backward compatibility");
console.log("  - Deprecate old versions gracefully");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Design a complete API endpoint with all elements
// - Include: URL, method, request DTO, response DTO, validation, errors

// TODO: Your code here - Design complete endpoint
const completeEndpoint = {
  updateUserGoal: {
    request: {
      method: "",        // TODO: What method?
      url: "",           // TODO: What URL (with version)?
      headers: {         // TODO: What headers?
      },
      body: {},          // TODO: Request body structure
    },
    validation: {
      // TODO: Validation rules
    },
    responses: {
      success: {
        status: 0,       // TODO: Success status
        body: {},        // TODO: Success response
      },
      validationError: {
        status: 0,       // TODO: Error status
        body: {},        // TODO: Error response
      },
      notFound: {
        status: 0,
        body: {},
      },
    },
  },
};

console.log("--- BONUS: Complete Endpoint Design ---");
console.log("PUT /api/v1/users/:userId/goals/:goalId");
console.log("");
console.log("Request:");
console.log("  Headers:");
console.log("    Authorization: Bearer <token>");
console.log("    Content-Type: application/json");
console.log("  Body:");
console.log("    { title: 'Updated title', status: 'completed' }");
console.log("");
console.log("Validation:");
console.log("  - title: optional, string, min 2 chars");
console.log("  - status: optional, enum [active, completed, paused]");
console.log("");
console.log("Response (200):");
console.log("  {");
console.log("    success: true,");
console.log("    data: { id, userId, title, status, ... }");
console.log("  }");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-03-api-design-solution.ts");

export {};
