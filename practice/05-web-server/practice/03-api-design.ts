// API Design Practice
// Run with: npx tsx 05-web-server/practice/03-api-design.ts

console.log("=== API Design Practice ===\n");

// ============================================
// LEVEL 1: Basic Operations
// ============================================

console.log("--- LEVEL 1: API Design Fundamentals ---\n");

// Resource Naming - foundation of good API design
const resourceNaming = {
  principles: {
    nouns: {
      good: ["/users", "/goals", "/sessions"],
      bad: ["/getUsers", "/createGoal", "/deleteSession"],
      explanation: "URLs represent resources (nouns), not actions (verbs)",
    },
    plural: {
      good: "/users", // and "/users/123/posts"
      bad: "/user", // and "/user/123/post"
      explanation: "Use plural for consistency - even for single item endpoints",
    },
    hierarchy: {
      good: "/users/123/goals/456",
      explanation: "Show resource relationships in URL structure",
    },
  },
};

console.log("Resource Naming Principles:");
console.log("  1. Use Nouns (not verbs):");
console.log(`    ✅ ${resourceNaming.principles.nouns.good.join(", ")}`);
console.log(`    ❌ ${resourceNaming.principles.nouns.bad.join(", ")}`);
console.log(`    💡 ${resourceNaming.principles.nouns.explanation}`);
console.log("");
console.log("  2. Use Plural:");
console.log(`    ✅ ${resourceNaming.principles.plural.good}`);
console.log(`    ❌ ${resourceNaming.principles.plural.bad}`);
console.log(`    💡 ${resourceNaming.principles.plural.explanation}`);
console.log("");
console.log("  3. Show Hierarchy:");
console.log(`    ✅ ${resourceNaming.principles.hierarchy.good}`);
console.log(`    💡 ${resourceNaming.principles.hierarchy.explanation}`);
console.log("");

// HTTP Method Mapping
const methodMapping = {
  collection: {
    GET: "List all items",
    POST: "Create new item",
  },
  single: {
    GET: "Get specific item",
    PUT: "Replace item",
    PATCH: "Partial update",
    DELETE: "Delete item",
  },
};

console.log("HTTP Method Mapping:");
console.log("  Collection endpoints:");
Object.entries(methodMapping.collection).forEach(([method, action]) => {
  console.log(`    ${method} /api/users → ${action}`);
});
console.log("  Single item endpoints:");
Object.entries(methodMapping.single).forEach(([method, action]) => {
  console.log(`    ${method} /api/users/:id → ${action}`);
});
console.log("");

// Query Parameters for Filtering
const queryParameters = {
  filtering: {
    example: "/api/users?status=active&age=gt:25",
    purpose: "Filter results by criteria",
  },
  sorting: {
    example: "/api/users?sort=createdAt&order=desc",
    purpose: "Control sort order",
  },
  pagination: {
    example: "/api/users?page=2&limit=20",
    purpose: "Paginate large result sets",
  },
  fields: {
    example: "/api/users?fields=id,name,email",
    purpose: "Partial response (reduce bandwidth)",
  },
  search: {
    example: "/api/users?q=john&email=@gmail.com",
    purpose: "Search across fields",
  },
};

console.log("Query Parameter Patterns:");
Object.entries(queryParameters).forEach(([pattern, details]) => {
  console.log(`  ${pattern}:`);
  console.log(`    Example: ${details.example}`);
  console.log(`    Purpose: ${details.purpose}`);
});
console.log("");

// ============================================
// LEVEL 2: Practical Patterns
// ============================================

console.log("\n--- LEVEL 2: DTOs and Validation ---\n");

// Request/Response DTOs
const dtoPatterns = {
  requestDTO: {
    createUser: {
      name: "string (required, min 2 chars)",
      email: "string (required, valid email)",
      age: "number (optional, min 18)",
      role: "enum: 'user' | 'admin' (default: 'user')",
    },
    bestPractice: "✅ Validate all required fields, types, and constraints",
  },
  responseDTO: {
    user: {
      id: "string (UUID)",
      name: "string",
      email: "string",
      role: "string",
      createdAt: "ISO date string",
      updatedAt: "ISO date string",
    },
    neverResponse: "❌ Never include passwords, tokens, or sensitive data",
  },
};

console.log("DTO (Data Transfer Object) Patterns:");
console.log("  Request DTO Example:");
console.log("    POST /api/users");
console.log("    Body:", JSON.stringify(dtoPatterns.requestDTO.createUser, null, 6).split("\n").join("\n      "));
console.log("   ", dtoPatterns.requestDTO.bestPractice);
console.log("");
console.log("  Response DTO Example:");
console.log("    201 Created");
console.log("    Body:", JSON.stringify(dtoPatterns.responseDTO.user, null, 6).split("\n").join("\n      "));
console.log("   ", dtoPatterns.responseDTO.neverResponse);
console.log("");

// Validation Rules
const validationRules = {
  required: {
    rule: "Field must be present",
    error: "name is required",
  },
  type: {
    rule: "Field must match expected type",
    error: "age must be a number",
  },
  format: {
    rule: "Field must match pattern",
    error: "email must be valid email address",
  },
  length: {
    rule: "String length constraints",
    error: "password must be at least 8 characters",
  },
  range: {
    rule: "Numeric range constraints",
    error: "age must be between 18 and 120",
  },
  enum: {
    rule: "Value must be in allowed set",
    error: "status must be one of: active, inactive, pending",
  },
};

console.log("Validation Rules:");
Object.entries(validationRules).forEach(([rule, details]) => {
  console.log(`  ${rule}:`);
  console.log(`    Rule: ${details.rule}`);
  console.log(`    Error: ${details.error}`);
});
console.log("");

// Error Response Format
const errorResponseFormat = {
  validationError: {
    status: 400,
    error: "Validation Failed",
    code: "VALIDATION_ERROR",
    fields: {
      email: "Invalid email format",
      age: "Must be at least 18 years old",
    },
  },
  notFound: {
    status: 404,
    error: "User not found",
    code: "USER_NOT_FOUND",
  },
  serverError: {
    status: 500,
    error: "Internal server error",
    code: "INTERNAL_ERROR",
    requestId: "req_abc123",
  },
};

console.log("Error Response Formats:");
console.log("  Validation Error (400):");
console.log("    ", JSON.stringify(errorResponseFormat.validationError, null, 4).split("\n").join("\n    "));
console.log("");
console.log("  Not Found (404):");
console.log("    ", JSON.stringify(errorResponseFormat.notFound, null, 4).split("\n").join("\n    "));
console.log("");
console.log("  Server Error (500):");
console.log("    ", JSON.stringify(errorResponseFormat.serverError, null, 4).split("\n").join("\n    "));
console.log("");

// Consistent Response Shape
const responseShapes = {
  success: {
    success: true,
    data: {
      /* actual data */
    },
  },
  collection: {
    success: true,
    data: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 150,
      totalPages: 8,
    },
  },
  error: {
    success: false,
    error: "Error message",
    code: "ERROR_CODE",
  },
};

console.log("Consistent Response Shapes:");
Object.entries(responseShapes).forEach(([type, shape]) => {
  console.log(`  ${type}:`);
  console.log("    ", JSON.stringify(shape, null, 6).split("\n").join("\n    "));
});
console.log("");

// ============================================
// LEVEL 3: Production Complexity
// ============================================

console.log("\n--- LEVEL 3: Production API Patterns ---\n");

// API Versioning
const apiVersioning = {
  urlVersioning: {
    example: "/api/v1/users",
    pros: "Simple, clear, cache-friendly",
    cons: "Need to duplicate route definitions",
  },
  headerVersioning: {
    example: "Accept: application/vnd.api.v1+json",
    pros: "Clean URLs, flexible",
    cons: "Harder to debug, cache complexity",
  },
  bestPractice: "✅ Start with URL versioning, deprecate old versions",
};

console.log("API Versioning Strategies:");
Object.entries(apiVersioning).forEach(([strategy, details]) => {
  if (strategy !== "bestPractice") {
    console.log(`  ${strategy}:`);
    console.log(`    Example: ${details.example}`);
    console.log(`    Pros: ${details.pros}`);
    console.log(`    Cons: ${details.cons}`);
  }
});
console.log("", apiVersioning.bestPractice);
console.log("");

// Partial Responses (Field Selection)
const partialResponse = {
  request: {
    url: "/api/users?fields=id,name,email",
  },
  fullResponse: {
    user: {
      id: "abc123",
      name: "John Doe",
      email: "john@example.com",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      lastLogin: "2024-01-15T10:30:00Z",
    },
  },
  partialResponse: {
    user: {
      id: "abc123",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  benefit: "✅ Reduce bandwidth and improve performance",
};

console.log("Partial Responses (Field Selection):");
console.log("  Request:", partialResponse.request.url);
console.log("  Full response:", JSON.stringify(partialResponse.fullResponse.user, null, 4).split("\n").join("\n    "));
console.log("  Partial response:", JSON.stringify(partialResponse.partialResponse.user, null, 4).split("\n").join("\n    "));
console.log("", partialResponse.benefit);
console.log("");

// Pagination Strategies
const paginationStrategies = {
  offset: {
    request: "/api/users?page=2&limit=20",
    response: {
      data: [],
      pagination: {
        page: 2,
        limit: 20,
        total: 150,
        totalPages: 8,
      },
    },
    pros: "Easy to implement, works with any DB",
    cons: "Performance issues with large offsets, data gaps",
  },
  cursor: {
    request: "/api/users?limit=20&cursor=eyJpZCI6MTIzfQ",
    response: {
      data: [],
      nextCursor: "eyJpZCI6MTQ1fQ",
      hasMore: true,
    },
    pros: "Constant time performance, no gaps",
    cons: "Can't jump to specific page",
  },
};

console.log("Pagination Strategies:");
Object.entries(paginationStrategies).forEach(([strategy, details]) => {
  console.log(`  ${strategy.toUpperCase()} Pagination:`);
  console.log(`    Request: ${details.request}`);
  console.log(`    Response: ${JSON.stringify(details.response).slice(0, 80)}...`);
  console.log(`    Pros: ${details.pros}`);
  console.log(`    Cons: ${details.cons}`);
});
console.log("");

// HATEOAS (Hypermedia as the Engine of Application State)
const hateoasExample = {
  user: {
    id: "abc123",
    name: "John Doe",
    email: "john@example.com",
    _links: {
      self: { href: "/api/v1/users/abc123" },
      update: { href: "/api/v1/users/abc123", method: "PUT" },
      delete: { href: "/api/v1/users/abc123", method: "DELETE" },
      goals: { href: "/api/v1/users/abc123/goals" },
    },
  },
  explanation: "Include links to related resources for discoverability",
};

console.log("HATEOAS (Hypermedia):");
console.log("  Response:", JSON.stringify(hateoasExample.user, null, 4).split("\n").join("\n    "));
console.log("  ", hateoasExample.explanation);
console.log("");

// Batch Operations
const batchOperations = {
  bulkCreate: {
    request: "POST /api/users/batch",
    body: [
      { name: "User 1", email: "user1@example.com" },
      { name: "User 2", email: "user2@example.com" },
      { name: "User 3", email: "user3@example.com" },
    ],
    response: {
      created: 3,
      failed: 0,
      results: [
        { success: true, id: "1", data: { name: "User 1" } },
        { success: true, id: "2", data: { name: "User 2" } },
        { success: true, id: "3", data: { name: "User 3" } },
      ],
    },
  },
  benefit: "✅ Reduce round trips, improve performance",
};

console.log("Batch Operations:");
console.log("  Request:", batchOperations.bulkCreate.request);
console.log("  Body:", JSON.stringify(batchOperations.bulkCreate.body, null, 4).split("\n").join("\n    "));
console.log("  Response:", JSON.stringify(batchOperations.bulkCreate.response, null, 4).split("\n").join("\n    "));
console.log("", batchOperations.benefit);
console.log("");

// Rate Limiting Headers
const rateLimitHeaders = {
  standard: {
    "X-RateLimit-Limit": "1000",
    "X-RateLimit-Remaining": "950",
    "X-RateLimit-Reset": "1640000000",
  },
  responseOnLimit: {
    status: 429,
    headers: {
      "Retry-After": "60",
      "X-RateLimit-Limit": "1000",
      "X-RateLimit-Remaining": "0",
    },
    body: {
      error: "Rate limit exceeded",
      retryAfter: 60,
    },
  },
};

console.log("Rate Limiting Headers:");
console.log("  Standard response headers:");
Object.entries(rateLimitHeaders.standard).forEach(([k, v]) => {
  console.log(`    ${k}: ${v}`);
});
console.log("  When limit exceeded:");
console.log("    Status:", rateLimitHeaders.responseOnLimit.status);
Object.entries(rateLimitHeaders.responseOnLimit.headers).forEach(([k, v]) => {
  console.log(`    ${k}: ${v}`);
});
console.log("    Body:", JSON.stringify(rateLimitHeaders.responseOnLimit.body));
console.log("");

// API Documentation Standards
const apiDocumentation = {
  openapi: {
    standard: "OpenAPI 3.0 (Swagger)",
    tools: "Swagger UI, Redoc",
    benefits: "Interactive docs, client SDK generation",
  },
  required: {
    endpoints: "All routes with methods",
    parameters: "Path, query, body parameters",
    responses: "All possible response codes",
    schemas: "Request/response DTOs",
    examples: "Example requests/responses",
  },
  bestPractice: "✅ Auto-generate docs from code, keep them in sync",
};

console.log("API Documentation:");
console.log("  Standard:", apiDocumentation.openapi.standard);
console.log("  Tools:", apiDocumentation.openapi.tools);
console.log("  Benefits:", apiDocumentation.openapi.benefits);
console.log("  Required elements:");
Object.entries(apiDocumentation.required).forEach(([element, description]) => {
  console.log(`    - ${element}: ${description}`);
});
console.log("", apiDocumentation.bestPractice);
console.log("");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===\n");

console.log("✅ Resource Design:");
console.log("  - Use nouns for resource paths (/users, /goals)");
console.log("  - Use plural form for consistency");
console.log("  - Nest related resources (/users/:id/posts)");
console.log("  - Use query params for filtering, sorting, pagination");
console.log("");

console.log("✅ Request/Response:");
console.log("  - Validate all input on the server");
console.log("  - Use consistent response shapes");
console.log("  - Return proper status codes");
console.log("  - Never expose sensitive data (passwords, tokens)");
console.log("  - Include helpful error messages with field-level details");
console.log("");

console.log("✅ DTOs:");
console.log("  - Separate request and response DTOs");
console.log("  - Validate required fields, types, formats");
console.log("  - Use TypeScript types for compile-time safety");
console.log("  - Document DTOs with comments or schemas");
console.log("");

console.log("✅ Versioning:");
console.log("  - Version your APIs from the start");
console.log("  - Use URL versioning (/api/v1/users)");
console.log("  - Deprecate old versions gracefully");
console.log("  - Communicate breaking changes in advance");
console.log("");

console.log("✅ Performance:");
console.log("  - Always paginate large result sets");
console.log("  - Support partial responses (field selection)");
console.log("  - Use cursor-based pagination for large datasets");
console.log("  - Implement rate limiting");
console.log("  - Use ETags for conditional requests");
console.log("");

console.log("✅ Security:");
console.log("  - Authenticate all requests");
console.log("  - Authorize access to resources");
console.log("  - Validate and sanitize all input");
console.log("  - Use HTTPS in production");
console.log("  - Implement rate limiting");
console.log("  - Log and monitor API usage");
console.log("");

console.log("✅ Documentation:");
console.log("  - Use OpenAPI/Swagger for docs");
console.log("  - Provide example requests/responses");
console.log("  - Keep docs in sync with code");
console.log("  - Document error responses");
console.log("");

console.log("\n✅ Practice complete!");

export {};
