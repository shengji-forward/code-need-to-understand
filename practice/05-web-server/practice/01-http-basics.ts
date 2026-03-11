// HTTP Basics Practice
// Run with: npx tsx 05-web-server/practice/01-http-basics.ts

console.log("=== HTTP Basics Practice ===\n");

// ============================================
// LEVEL 1: Basic Operations
// ============================================

console.log("--- LEVEL 1: HTTP Methods & Status Codes ---\n");

// HTTP Methods - the verbs of REST APIs
const httpMethods = {
  GET: {
    method: "GET",
    purpose: "Retrieve data",
    safe: true,
    idempotent: true,
    example: "GET /api/users - Get all users",
    cacheable: "Yes",
  },
  POST: {
    method: "POST",
    purpose: "Create new resource",
    safe: false,
    idempotent: false,
    example: "POST /api/users - Create new user",
    cacheable: "No",
  },
  PUT: {
    method: "PUT",
    purpose: "Update entire resource",
    safe: false,
    idempotent: true,
    example: "PUT /api/users/1 - Replace user 1",
    cacheable: "No",
  },
  PATCH: {
    method: "PATCH",
    purpose: "Partial update",
    safe: false,
    idempotent: false,
    example: "PATCH /api/users/1 - Update user email",
    cacheable: "No",
  },
  DELETE: {
    method: "DELETE",
    purpose: "Delete resource",
    safe: false,
    idempotent: true,
    example: "DELETE /api/users/1 - Delete user 1",
    cacheable: "No",
  },
};

console.log("HTTP Methods:");
Object.values(httpMethods).forEach((m) => {
  console.log(`  ${m.method}: ${m.purpose}`);
  console.log(`    Safe: ${m.safe}, Idempotent: ${m.idempotent}`);
  console.log(`    Example: ${m.example}`);
});
console.log("");

// Status Codes - the language of API responses
const statusCodes = {
  success: {
    "200 OK": "Request succeeded",
    "201 Created": "Resource created successfully",
    "204 No Content": "Success, no response body",
  },
  redirect: {
    "301 Moved Permanently": "Resource has new URL",
    "302 Found": "Resource temporarily elsewhere",
  },
  clientError: {
    "400 Bad Request": "Invalid request data",
    "401 Unauthorized": "Authentication required",
    "403 Forbidden": "Authenticated but not authorized",
    "404 Not Found": "Resource doesn't exist",
    "409 Conflict": "Request conflicts with state",
    "422 Unprocessable": "Well-formed but semantic error",
    "429 Too Many Requests": "Rate limit exceeded",
  },
  serverError: {
    "500 Internal Server Error": "Server error",
    "502 Bad Gateway": "Invalid response from upstream",
    "503 Service Unavailable": "Server overloaded/down",
  },
};

console.log("Common Status Codes:");
Object.entries(statusCodes).forEach(([category, codes]) => {
  console.log(`  ${category}:`);
  Object.entries(codes).forEach(([code, meaning]) => {
    console.log(`    ${code}: ${meaning}`);
  });
});
console.log("");

// HTTP Headers - metadata for requests and responses
const headers = {
  request: {
    "Content-Type": "application/json | text/html | multipart/form-data",
    "Authorization": "Bearer <token> | Basic <credentials>",
    "Accept": "application/json | text/html",
    "User-Agent": "Client identifier",
    "Cache-Control": "no-cache | max-age=3600",
  },
  response: {
    "Content-Type": "Describes response body format",
    "Content-Length": "Size of response body in bytes",
    "Cache-Control": "Caching directives",
    "ETag": "Resource version for caching",
    "Location": "URL of new resource (for 201)",
    "WWW-Authenticate": "Auth challenge (for 401)",
  },
};

console.log("HTTP Headers:");
console.log("  Request Headers:");
Object.entries(headers.request).forEach(([name, usage]) => {
  console.log(`    ${name}: ${usage}`);
});
console.log("  Response Headers:");
Object.entries(headers.response).forEach(([name, usage]) => {
  console.log(`    ${name}: ${usage}`);
});
console.log("");

// ============================================
// LEVEL 2: Practical Patterns
// ============================================

console.log("\n--- LEVEL 2: Request/Response Patterns ---\n");

// Idempotency - making operations safe to retry
const idempotencyExample = {
  idempotent: {
    PUT: "PUT /api/users/1 with same data = same result",
    DELETE: "DELETE /api/users/1 twice = user still deleted",
    GET: "GET /api/users = same data (if unchanged)",
  },
  notIdempotent: {
    POST: "POST /api/charges = charges card multiple times!",
    nonIdempotentPATCH: "PATCH /api/counters/increment = increments multiple times!",
  },
  warning: "⚠️  POST is NOT idempotent - retrying creates duplicates",
};

console.log("Idempotency Examples:");
console.log("  Idempotent (safe to retry):");
Object.entries(idempotencyExample.idempotent).forEach(([method, example]) => {
  console.log(`    ${method}: ${example}`);
});
console.log("");
console.log("  Not Idempotent (retrying causes issues):");
Object.entries(idempotencyExample.notIdempotent).forEach(([method, example]) => {
  console.log(`    ${method}: ${example}`);
});
console.log("", idempotencyExample.warning);
console.log("");

// RESTful Design Principles
const restfulDesign = {
  resources: {
    good: "/api/users",
    bad: "/api/getUsers",
    explanation: "Use nouns (resources), not verbs (actions)",
  },
  plural: {
    good: "/api/users/123",
    bad: "/api/user/123",
    explanation: "Use plural for collections",
  },
  hierarchy: {
    good: "/api/users/123/posts/456",
    explanation: "Show resource relationships in URL",
  },
  filtering: {
    good: "/api/users?status=active&age=gt:25",
    bad: "/api/users/active/age/25",
    explanation: "Use query parameters for filtering",
  },
  pagination: {
    good: "/api/users?page=2&limit=20",
    explanation: "Always paginate large result sets",
  },
};

console.log("RESTful Design Principles:");
Object.entries(restfulDesign).forEach(([principle, example]) => {
  console.log(`  ${principle}:`);
  console.log(`    ${example.good || example.explanation}`);
  if (example.bad) console.log(`    ❌ ${example.bad}`);
  console.log(`    💡 ${example.explanation}`);
});
console.log("");

// Request/Response Cycle
const requestCycle = {
  step1: "1. Client sends HTTP request",
  step2: "2. Server receives and parses request",
  step3: "3. Server routes to appropriate handler",
  step4: "4. Handler processes business logic",
  step5: "5. Handler returns response with status code",
  step6: "6. Client receives and processes response",
};

console.log("HTTP Request/Response Cycle:");
Object.values(requestCycle).forEach((step) => console.log(`  ${step}`));
console.log("");

// Content Negotiation
const contentNegotiation = {
  request: {
    Accept: "Client tells server what format it wants",
    example: 'Accept: application/json',
  },
  response: {
    "Content-Type": "Server tells client what format it sent",
    example: "Content-Type: application/json",
  },
  warning: "⚠️  Always match Content-Type with actual body format!",
};

console.log("Content Negotiation:");
console.log("  Request:", contentNegotiation.request.example, "-", contentNegotiation.request.Accept);
console.log("  Response:", contentNegotiation.response.example, "-", contentNegotiation.response["Content-Type"]);
console.log("", contentNegotiation.warning);
console.log("");

// ============================================
// LEVEL 3: Production Complexity
// ============================================

console.log("\n--- LEVEL 3: Production API Patterns ---\n");

// Authentication Patterns
const authPatterns = {
  bearerToken: {
    header: "Authorization: Bearer eyJhbGciOiJIUzI1NiIs...",
    usage: "Send JWT or API token in Authorization header",
    validation: "Server validates token signature and expiration",
  },
  apiKey: {
    header: "X-API-Key: sk_live_12345abcdef",
    usage: "Simple key-based authentication",
    validation: "Server looks up key in database",
  },
  basicAuth: {
    header: "Authorization: Basic base64(username:password)",
    usage: "Username/password authentication",
    warning: "⚠️  Only use over HTTPS, never store passwords!",
  },
};

console.log("Authentication Patterns:");
Object.entries(authPatterns).forEach(([pattern, details]) => {
  console.log(`  ${pattern}:`);
  console.log(`    Header: ${details.header}`);
  console.log(`    Usage: ${details.usage}`);
  if (details.warning) console.log(`    ${details.warning}`);
  if (details.validation) console.log(`    Validation: ${details.validation}`);
});
console.log("");

// Error Response Format
const errorResponse = {
  format: {
    error: {
      status: 400,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details: {
        email: "Invalid email format",
        age: "Must be at least 18",
      },
    },
  },
  bestPractice: "✅ Include status, message, code, and details",
  badPractice: "❌ Don't expose stack traces or internal details",
};

console.log("Error Response Format:");
console.log("  Example:");
console.log(JSON.stringify(errorResponse.format, null, 4).split("\n").join("\n    "));
console.log("", errorResponse.bestPractice);
console.log("", errorResponse.badPractice);
console.log("");

// Rate Limiting
const rateLimiting = {
  headers: {
    "X-RateLimit-Limit": "100",
    "X-RateLimit-Remaining": "95",
    "X-RateLimit-Reset": "1640000000",
  },
  response429: {
    status: 429,
    error: "Too Many Requests",
    "Retry-After": "60",
  },
  strategy: "Use token bucket or sliding window algorithm",
};

console.log("Rate Limiting:");
console.log("  Headers sent with every response:");
Object.entries(rateLimiting.headers).forEach(([header, value]) => {
  console.log(`    ${header}: ${value}`);
});
console.log("  When limit exceeded:");
console.log("    ", JSON.stringify(rateLimiting.response429));
console.log("  Strategy:", rateLimiting.strategy);
console.log("");

// Caching Strategies
const cachingStrategies = {
  noCache: {
    "Cache-Control": "no-store, no-cache",
    useCase: "Sensitive data, real-time data",
  },
  etag: {
    "Cache-Control": "must-revalidate",
    ETag: '"33a64df551425fcc55e4d42a148795d9f25f89d4"',
    useCase: "Conditional requests, API responses",
  },
  maxAge: {
    "Cache-Control": "max-age=3600, public",
    useCase: "Static resources, rarely changing data",
  },
};

console.log("Caching Strategies:");
Object.entries(cachingStrategies).forEach(([strategy, headers]) => {
  console.log(`  ${strategy}:`);
  Object.entries(headers).forEach(([key, value]) => {
    console.log(`    ${key}: ${value}`);
  });
});
console.log("");

// CORS (Cross-Origin Resource Sharing)
const corsExample = {
  preflight: {
    request: "OPTIONS /api/users",
    headers: {
      Origin: "https://example.com",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "Content-Type",
    },
  },
  response: {
    headers: {
      "Access-Control-Allow-Origin": "https://example.com",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  },
};

console.log("CORS Preflight Flow:");
console.log("  Browser sends OPTIONS request:");
console.log("    ", corsExample.preflight.request);
Object.entries(corsExample.preflight.headers).forEach(([k, v]) => {
  console.log(`      ${k}: ${v}`);
});
console.log("  Server responds with allowed methods:");
Object.entries(corsExample.response.headers).forEach(([k, v]) => {
  console.log(`    ${k}: ${v}`);
});
console.log("");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===\n");

console.log("✅ HTTP Methods:");
console.log("  - Use GET for reading (safe, cacheable)");
console.log("  - Use POST for creating (not idempotent)");
console.log("  - Use PUT for full updates (idempotent)");
console.log("  - Use PATCH for partial updates (not idempotent)");
console.log("  - Use DELETE for deleting (idempotent)");
console.log("");

console.log("✅ Status Codes:");
console.log("  - 200 for success (generic)");
console.log("  - 201 for created (include Location header)");
console.log("  - 204 for success with no response body");
console.log("  - 400 for bad request (validation errors)");
console.log("  - 401 for unauthenticated (missing/invalid auth)");
console.log("  - 403 for unauthorized (authenticated but no permission)");
console.log("  - 404 for not found");
console.log("  - 500 for server errors (log these!)");
console.log("");

console.log("✅ RESTful Design:");
console.log("  - Use nouns for resources (/users, not /getUsers)");
console.log("  - Use plural for collections (/users, not /user)");
console.log("  - Use query parameters for filtering, sorting, pagination");
console.log("  - Use HTTP methods for actions (not URLs)");
console.log("  - Return consistent response formats");
console.log("");

console.log("✅ Security:");
console.log("  - Always use HTTPS in production");
console.log("  - Validate and sanitize all input");
console.log("  - Use proper authentication (JWT, API keys)");
console.log("  - Implement rate limiting");
console.log("  - Set appropriate CORS headers");
console.log("  - Never expose sensitive data in error messages");
console.log("");

console.log("✅ Headers:");
console.log("  - Always set Content-Type for responses");
console.log("  - Use Authorization for auth credentials");
console.log("  - Include Cache-Control for caching");
console.log("  - Return rate limit info in headers");
console.log("");

console.log("\n✅ Practice complete!");

export {};
