# Web Server Abstraction Hierarchy

## Overview

This document represents a comprehensive understanding of web server development, incorporating concepts from the 05-web-server module. It covers the HTTP protocol, RESTful architecture, web frameworks (Hono), API design patterns, and production concerns for building modern web servers and APIs.

---

## Layer Hierarchy (Bottom-Up)

```
Layer 0: Network Foundation - HTTP Protocol (The raw communication protocol)
         ↓
Layer 1: Resource Design - RESTful Architecture (How to structure APIs)
         ↓
Layer 2: Framework Patterns - Web Server Implementation (How to build servers)
         ↓
Layer 3: Production Patterns - Real-World Concerns (Security, performance, scalability)
         ↓
Layer 4: API Design Patterns - Advanced Concepts (Versioning, pagination, batch ops)
         ↓
Cross-Cutting: Error Handling, Documentation, Testing (Span multiple layers)
```

---

## Layer 0: Network Foundation - HTTP Protocol

**The raw communication protocol that powers the web - HTTP requests and responses.**

### Level 1: HTTP Protocol Basics
```
request-response-cycle {
  client-request: {
    method:            // HTTP verb (GET, POST, PUT, PATCH, DELETE)
    url:               // Resource identifier (/api/users/123)
    headers:           // Metadata (Authorization, Content-Type, Accept)
    body:              // Optional payload (JSON, form data, multipart)
  }

  server-response: {
    status-code:       // 2xx/3xx/4xx/5xx indicating result
    headers:           // Metadata (Content-Type, Cache-Control, ETag)
    body:              // Response payload (JSON, HTML, binary)
  }

  flow: {
    1-dns:             // Domain resolved to IP address
    2-tcp:             // TCP connection established (handshake)
    3-request:         // Client sends HTTP request
    4-process:         // Server processes request (routes, business logic)
    5-response:        // Server sends HTTP response
    6-close:           // Connection kept-alive or closed
  }
}

http-versions {
  http-1.1: {
    text-based:        // Human-readable protocol
    keep-alive:        // Connection reuse (multiple requests per connection)
    pipelining:        // Send multiple requests without waiting for responses
  }

  http-2: {
    binary:            // Binary protocol (more efficient parsing)
    multiplexing:      // Multiple requests over single TCP connection simultaneously
    header-compression: // HPACK compression reduces header overhead
    server-push:       // Server can proactively send resources
  }

  http-3: {
    quic:              // Built on QUIC (UDP-based transport)
    zero-rtt:          // Faster connection establishment for repeat visitors
    head-of-line-blocking-solved: // No blocking due to packet loss
  }
}
```

### Level 2: HTTP Methods (Verbs)
```
http-methods {
  GET: {
    purpose:           // Retrieve data
    safe:              // Yes - doesn't modify server state
    idempotent:        // Yes - multiple requests = same result
    cacheable:         // Yes - responses can be cached
    body:              // No body (typically)
    example:           // GET /api/users - Get all users
    example-single:    // GET /api/users/123 - Get specific user
  }

  POST: {
    purpose:           // Create new resource
    safe:              // No - modifies server state
    idempotent:        // No - multiple requests create multiple resources
    cacheable:         // No
    body:              // Yes - resource data
    example:           // POST /api/users - Create new user
    response:          // 201 Created with Location header
  }

  PUT: {
    purpose:           // Replace entire resource
    safe:              // No
    idempotent:        // Yes - multiple PUT with same data = same result
    cacheable:         // No
    body:              // Yes - complete resource data
    example:           // PUT /api/users/123 - Replace user 123
    warning:           // PUT requires all fields (partial updates use PATCH)
  }

  PATCH: {
    purpose:           // Partial update to resource
    safe:              // No
    idempotent:        // No - depends on operation (increment counter not idempotent)
    cacheable:         // No
    body:              // Yes - fields to update
    example:           // PATCH /api/users/123 - Update user email only
    warning:           // Use PATCH for partial updates, PUT for full replacement
  }

  DELETE: {
    purpose:           // Delete resource
    safe:              // No
    idempotent:        // Yes - multiple deletes = resource still gone
    cacheable:         // No
    body:              // No body (typically)
    example:           // DELETE /api/users/123 - Delete user 123
    response:          // 204 No Content (success, no body to return)
  }
}

safety-idempotency {
  safe-operations: {
    definition:        // Operations that don't modify server state
    methods:           // GET, HEAD, OPTIONS
    benefit:           // Can be cached, safely retried
  }

  idempotent-operations: {
    definition:        // Multiple identical requests have same effect as single request
    methods:           // GET, PUT, DELETE (not POST, not always PATCH)
    importance:        // Critical for retry logic (network failures)
  }

  why-it-matters: {
    retries:           // Idempotent operations safe to retry on network failure
    caching:           // Safe operations can be cached by browsers/CDNs
    transactions:      // Idempotency prevents duplicate charges, duplicate creation
  }
}
```

### Level 3: HTTP Status Codes
```
status-codes-2xx-success {
  200-OK: {
    meaning:           // Request succeeded
    usage:             // Successful GET, PUT, PATCH
    body:              // Response body with data
  }

  201-Created: {
    meaning:           // Resource created successfully
    usage:             // Successful POST
    headers:           // Location header with new resource URL
    body:              // Created resource representation
  }

  204-No-Content: {
    meaning:           // Success, but no response body
    usage:             // Successful DELETE, PUT with no return data
    body:              // Empty (no body)
  }
}

status-codes-3xx-redirect {
  301-Moved-Permanently: {
    meaning:           // Resource has new URL permanently
    usage:             // URL restructure, resource relocation
    header:            // Location with new URL
    seo-impact:        // Search engines update index
  }

  302-Found: {
    meaning:           // Resource temporarily at different URL
    usage:             // Temporary redirects, maintenance pages
    header:            // Location with temporary URL
  }
}

status-codes-4xx-client-error {
  400-Bad-Request: {
    meaning:           // Invalid request data
    usage:             // Validation errors, malformed JSON
    response:          // { error: "Validation failed", fields: { email: "Invalid" } }
  }

  401-Unauthorized: {
    meaning:           // Authentication required or failed
    usage:             // Missing/invalid token, expired session
    headers:           // WWW-Authenticate for auth challenge
    response:          // { error: "Authentication required" }
  }

  403-Forbidden: {
    meaning:           // Authenticated but not authorized
    usage:             // User lacks permission for resource
    response:          // { error: "Insufficient permissions" }
    difference-from-401: // 401 = who are you?, 403 = we know you, but no access
  }

  404-Not-Found: {
    meaning:           // Resource doesn't exist
    usage:             // Invalid ID, wrong URL
    response:          // { error: "Resource not found" }
  }

  409-Conflict: {
    meaning:           // Request conflicts with current state
    usage:             // Duplicate unique key, version conflict
    response:          // { error: "Email already exists" }
  }

  422-Unprocessable-Entity: {
    meaning:           // Well-formed request but semantic errors
    usage:             // Business logic validation fails
    response:          // { error: "Insufficient balance" }
  }

  429-Too-Many-Requests: {
    meaning:           // Rate limit exceeded
    usage:             // API throttling
    headers:           // Retry-After: 60 (seconds to wait)
    response:          // { error: "Rate limit exceeded", retryAfter: 60 }
  }
}

status-codes-5xx-server-error {
  500-Internal-Server-Error: {
    meaning:           // Unhandled server error
    usage:             // Uncaught exceptions, bugs
    action:            // Log error details, return generic message to client
    response:          // { error: "Internal server error", requestId: "abc123" }
  }

  502-Bad-Gateway: {
    meaning:           // Invalid response from upstream server
    usage:             // Proxy/reverse proxy issues, upstream downtime
  }

  503-Service-Unavailable: {
    meaning:           // Server overloaded or down
    usage:             // Maintenance, capacity issues
    header:            // Retry-After
  }
}
```

---

## Layer 1: Resource Design - RESTful Architecture

**How to structure APIs - designing resources and their representations.**

### Level 1: URL Design Principles
```
resource-naming {
  use-nouns: {
    good:              // /api/users, /api/goals, /api/sessions
    bad:               // /api/getUsers, /api/createGoal, /api/deleteSession
    explanation:       // URLs represent resources (nouns), not actions (verbs)
    principle:         // HTTP method provides the action, URL provides the target
  }

  use-plural: {
    good:              // /api/users and /api/users/123
    bad:               // /api/user and /api/user/123
    explanation:       // Use plural for consistency - even for single-item endpoints
    benefit:           // No singular/plural confusion, consistent pattern
  }

  show-hierarchy: {
    good:              // /api/users/123/posts/456
    explanation:       // Show resource relationships in URL structure
    pattern:           // /api/{parent}/{parentId}/{child}/{childId}
  }

  avoid-verbs: {
    bad:               // /api/getUserById, /api/createNewUser
    good:              // GET /api/users/123, POST /api/users
    reason:            // HTTP methods provide the verbs (GET, POST, PUT, DELETE)
  }

  avoid-depth: {
    guideline:         // Keep URLs shallow (prefer 2-3 levels max)
    deep:              // /api/orgs/1/depts/2/teams/3/users/4/posts/5
    better:            // Use query params or IDs: /api/posts/5 (userId in body or derived)
  }
}

crud-mapping {
  collection-endpoints: {
    list:              // GET /api/users - List all users (with pagination)
    create:            // POST /api/users - Create new user
  }

  single-item-endpoints: {
    read:              // GET /api/users/:id - Get specific user
    replace:           // PUT /api/users/:id - Replace entire user
    update:            // PATCH /api/users/:id - Partial update
    delete:            // DELETE /api/users/:id - Delete user
  }

  sub-resources: {
    list:              // GET /api/users/:id/posts - List user's posts
    create:            // POST /api/users/:id/posts - Create post for user
    read:              // GET /api/users/:id/posts/:postId - Specific post
  }
}
```

### Level 2: Query Parameters
```
query-parameter-patterns {
  filtering: {
    purpose:           // Filter results by criteria
    examples: {
      simple:          // /api/users?status=active
      multiple:        // /api/users?status=active&age=gt:25
      operators:       // eq (equals), gt (greater than), lt (less than), ne (not equals)
    }
  }

  sorting: {
    purpose:           // Control sort order
    examples: {
      single:          // /api/users?sort=createdAt
      direction:       // /api/users?sort=createdAt&order=desc
      multiple:        // /api/users?sort=lastName,firstName
    }
    default:           // Always specify default sort in API docs
  }

  pagination: {
    purpose:           // Handle large result sets
    examples: {
      offset-based:    // /api/users?page=2&limit=20
      cursor-based:    // /api/users?limit=20&cursor=eyJpZCI6MTIzfQ
    }
    required:          // Always paginate endpoints that return collections
  }

  field-selection: {
    purpose:           // Partial responses (reduce bandwidth)
    examples:          // /api/users?fields=id,name,email
    benefit:           // Mobile clients, slow networks, reduce over-fetching
  }

  search: {
    purpose:           // Full-text search across fields
    examples: {
      simple:          // /api/users?q=john
      multi-field:     // /api/users?q=john&email=@gmail.com
    }
  }
}
```

### Level 3: REST Maturity
```
rest-maturity-levels {
  level-0-swamp: {
    description:       // Using HTTP as transport tunnel (one endpoint, everything via POST)
    example:           // POST /api/Action { action: "getUser", id: 123 }
    avoid:             // Not RESTful, defeats HTTP's purpose
  }

  level-1-resources: {
    description:       // Proper use of resources (nouns in URLs)
    example:           // GET /api/users/123
    good:              // Resources identified by URIs
  }

  level-2-http-verbs: {
    description:       // Proper use of HTTP methods
    example:           // POST to create, GET to read, PUT to update, DELETE to delete
    good:              // Leverages HTTP protocol features
  }

  level-3-hateoas: {
    description:       // Hypermedia as the Engine of Application State
    concept:           // Responses include links to related resources
    example: {
      user: {
        id: "abc123",
        name: "John",
        _links: {
          self: { href: "/api/users/abc123" },
          posts: { href: "/api/users/abc123/posts" },
          update: { href: "/api/users/abc123", method: "PUT" }
        }
      }
    }
    benefit:           // Discoverable API, no hard-coded URLs in clients
    trade-off:         // More complex responses, not always necessary
  }
}

put-vs-patch {
  put: {
    semantics:         // Replace entire resource
    requirement:       // Must send all fields (missing fields = cleared)
    use-case:          // Complete resource replacement
    example:           // PUT /api/users/123 with { name: "Jane", email: "jane@example.com", role: "admin" }
  }

  patch: {
    semantics:         // Partial update
    requirement:       // Send only fields to update
    use-case:          // Partial updates (e.g., update email only)
    example:           // PATCH /api/users/123 with { email: "newemail@example.com" }
  }

  best-practice: {
    use-put:           // When client has complete resource representation
    use-patch:         // When updating specific fields (most common)
    document-behavior:  // Clearly document merge strategy for PATCH
  }
}
```

---

## Layer 2: Framework Patterns - Web Server Implementation

**How to build web servers - routing, middleware, request handling with frameworks like Hono.**

### Level 1: Routing
```
route-definitions {
  basic-routes: {
    get:               // app.get('/api/hello', (c) => c.json({ message: 'Hello' }))
    post:              // app.post('/api/users', async (c) => { const body = await c.req.json(); return c.json(body, 201) })
    put:               // app.put('/api/users/:id', async (c) => { /* replace */ })
    patch:             // app.patch('/api/users/:id', async (c) => { /* update */ })
    delete:            // app.delete('/api/users/:id', (c) => c.json({ deleted: true }))
  }

  route-parameters: {
    single:            // /api/users/:id → c.req.param('id')
    multiple:          // /api/users/:userId/posts/:postId → c.req.param('userId'), c.req.param('postId')
    optional:          // /api/posts/:id? (requires framework support)
    wildcard:          // /api/files/* (match all paths after /files/)
  }

  query-parameters: {
    single:            // /api/search?q=test → c.req.query('q')
    multiple:          // /api/search?q=test&page=1 → c.req.query('q'), c.req.query('page')
    defaults:          // const page = c.req.query('page') || '1'
    type-conversion:   // const limit = Number(c.req.query('limit') || '10')
  }

  route-grouping: {
    pattern:           // app.route('/api/users')
    benefit:           // Organize routes by resource
    example: {
      // app.route('/api/users')
      //   .get('/', listUsers)
      //   .post('/', createUser)
      //   .get('/:id', getUser)
      //   .put('/:id', updateUser)
      //   .delete('/:id', deleteUser)
    }
  }
}
```

### Level 2: Middleware
```
middleware-chain {
  pattern: {
    definition:        // Functions that execute before/after route handlers
    order:             // Global → Route-specific → Handler (then reverse for response)
    next-callback:     // await next() passes control to next middleware/handler
  }

  middleware-types: {
    logger: {
      purpose:         // Log all requests
      example: {
        // const logger = async (c, next) => {
        //   console.log(`${c.req.method} ${c.req.url}`)
        //   await next()
        //   console.log(`Status: ${c.res.status}`)
        // }
      }
      position:         // First in chain (log everything)
    }

    authentication: {
      purpose:         // Verify user identity
      example: {
        // const auth = async (c, next) => {
        //   const token = c.req.header('Authorization')
        //   if (!token) return c.json({ error: 'Unauthorized' }, 401)
        //   c.set('user', await verifyToken(token))
        //   await next()
        // }
      }
      position:         // Before protected routes
      scope:            // app.use('/api/protected/*', auth)
    }

    error-handler: {
      purpose:         // Catch and format errors
      example: {
        // const errorHandler = async (c, next) => {
        //   try {
        //     await next()
        //   } catch (error) {
        //     console.error(error)
        //     return c.json({ error: 'Internal Server Error' }, 500)
        //   }
        // }
      }
      position:         // Last in chain (catches all downstream errors)
    }

    cors: {
      purpose:         // Handle cross-origin requests
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }

    rate-limit: {
      purpose:         // Throttle requests per client
      strategy:        // Token bucket or sliding window
      headers: {
        'X-RateLimit-Limit': '1000',
        'X-RateLimit-Remaining': '950',
        'X-RateLimit-Reset': '1640000000'
      }
    }
  }

  middleware-best-practices: {
    keep-thin:         // Middleware should do one thing well
    early-return:      // Return response immediately (don't await next() if not needed)
    use-conditionally: // Apply to specific routes, not globally when possible
    order-matters:     // Logger → Auth → Validation → Handler → Error Handler
  }
}
```

### Level 3: Request/Response Handling
```
request-handling {
  parsing {
    json: {
      method:           // await c.req.json()
      content-type:     // application/json
      error-handling:   // Try/catch for invalid JSON
    }

    url-encoded: {
      method:           // await c.req.parseBody()
      content-type:     // application/x-www-form-urlencoded
      use-case:         // HTML form submissions
    }

    multipart: {
      method:           // await c.req.parseBody()
      content-type:     // multipart/form-data
      use-case:         // File uploads
    }
  }

  headers: {
    request: {
      get-single:       // c.req.header('Authorization')
      get-all:          // c.req.header()
      content-type:     // c.req.header('Content-Type')
    }

    response: {
      set:              // c.header('X-Custom-Header', 'value')
      multiple:         // c.header({ 'X-Header1': 'val1', 'X-Header2': 'val2' })
      content-type:     // c.header('Content-Type', 'application/json')
    }
  }
}

response-handling {
  response-formats: {
    json: {
      method:           // c.json({ data: result })
      status:           // c.json({ data: result }, 201)
      content-type:     // Automatically set to application/json
    }

    text: {
      method:           // c.text('Hello World')
      status:           // c.text('Not Found', 404)
      content-type:     // Automatically set to text/plain
    }

    html: {
      method:           // c.html('<h1>Hello</h1>')
      content-type:     // Automatically set to text/html
    }
  }

  response-helpers: {
    success: {
      pattern:          // const success = (data, status = 200) => Response.json({ success: true, data }, { status })
      usage:            // return success(user)
      consistent:       // All success responses have same shape
    }

    error: {
      pattern:          // const error = (message, status = 400) => Response.json({ success: false, error: message }, { status })
      usage:            // return error('Validation failed', 400)
      consistent:       // All error responses have same shape
    }
  }

  status-code-selection: {
    success:            // 200 for generic success, 201 for created, 204 for no content
    client-errors:      // 400 for bad request, 401 for unauth, 403 for forbidden, 404 for not found
    server-errors:      // 500 for unhandled errors (log these!)
  }
}
```

---

## Layer 3: Production Patterns - Real-World Concerns

**Security, performance, and scalability - what APIs need in production.**

### Level 1: Authentication
```
authentication-strategies {
  bearer-token: {
    header:            // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
    token-types: {
      jwt:             // JSON Web Token (stateless, self-contained)
      opaque:          // Reference token (server-side lookup required)
    }
    validation: {
      signature:        // Verify token signature (JWT) or lookup (opaque)
      expiration:       // Check token expiry
      revocation:       // Check blacklist (if supported)
    }
    example: {
      // const token = c.req.header('Authorization')?.replace('Bearer ', '')
      // const user = await verifyJwt(token)
      // c.set('user', user)
    }
  }

  api-key: {
    header:            // X-API-Key: sk_live_12345abcdef
    purpose:           // Simple machine-to-machine authentication
    validation:        // Lookup key in database, check permissions
    use-cases:         // Public APIs, developer access
  }

  basic-auth: {
    header:            // Authorization: Basic base64(username:password)
    encoding:          // Base64 encoding of credentials
    warning:           // Only use over HTTPS, never store passwords
    deprecation:       // Considered outdated, prefer bearer tokens
  }

  oauth2: {
    flows: {
      authorization-code: // User-facing apps (web, mobile)
      client-credentials: // Service-to-service authentication
    }
    benefits:          // Industry standard, widely supported
    complexity:        // More complex than bearer tokens
  }
}
```

### Level 2: Authorization
```
authorization-patterns {
  role-based-access-control: {
    concept:           // Users have roles (admin, user, moderator)
    implementation: {
      // if (user.role !== 'admin') {
      //   return c.json({ error: 'Forbidden' }, 403)
      // }
    }
    use-case:          // Simple permission systems
  }

  resource-level-permissions: {
    concept:           // Users can access specific resources they own
    implementation: {
      // if (post.userId !== user.id) {
      //   return c.json({ error: 'Forbidden' }, 403)
      // }
    }
    use-case:          // User-specific resources
  }

  permission-based: {
    concept:           // Users have granular permissions (users:read, users:write)
    implementation: {
      // if (!user.permissions.includes('posts:delete')) {
      //   return c.json({ error: 'Forbidden' }, 403)
      // }
    }
    use-case:          // Complex permission systems
  }
}

rate-limiting {
  strategies: {
    token-bucket: {
      concept:         // Bucket with tokens, refills at rate
      benefit:         // Bursts allowed (up to bucket size)
      implementation:  // Store token count in Redis/DB
    }

    sliding-window: {
      concept:         // Count requests in rolling time window
      benefit:         // Smoother rate limiting
      implementation:  // Store timestamps in Redis
    }

    fixed-window: {
      concept:         // Reset counter at fixed intervals (hourly)
      drawback:        // Spikes at window boundaries
      simplicity:      // Easiest to implement
    }
  }

  response-headers: {
    'X-RateLimit-Limit': '1000',
    'X-RateLimit-Remaining': '950',
    'X-RateLimit-Reset': '1640000000'
  }

  rate-limit-exceeded: {
    status:           // 429 Too Many Requests
    header:           // Retry-After: 60 (seconds to wait)
    response:         // { error: 'Rate limit exceeded', retryAfter: 60 }
  }
}
```

### Level 3: Caching Strategies
```
caching-headers {
  no-cache: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
    use-cases:         // Sensitive data, real-time data, per-user data
    examples:          // Account details, cart contents, live prices
  }

  max-age: {
    headers: {
      'Cache-Control': 'max-age=3600, public'  // 1 hour
    }
    use-cases:         // Static resources, rarely changing data
    examples:          // Static assets, reference data, blog posts
  }

  etag: {
    headers: {
      'Cache-Control': 'must-revalidate',
      'ETag': '"33a64df551425fcc55e4d42a148795d9f25f89d4"'
    }
    concept:           // Fingerprint of resource content
    flow: {
      1:               // Client requests resource
      2:               // Server includes ETag in response
      3:               // Client caches with ETag
      4:               // Client requests with If-None-Match: ETag
      5:               // Server compares ETags
      6-match:          // Returns 304 Not Modified (no body)
      7-no-match:       // Returns 200 with new content and ETag
    }
    use-cases:         // API responses, conditional requests
  }

  vary: {
    header:            // Vary: Accept-Encoding, Accept-Language
    purpose:           // Cache key varies by these headers
    example:           // Different versions for gzip vs brotli
  }
}
```

### Level 4: Security
```
cors-cross-origin-resource-sharing {
  preflight-request: {
    method:            // OPTIONS (before actual request)
    headers: {
      'Origin': 'https://example.com',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type, Authorization'
    }
    trigger:           // Non-simple requests (POST with JSON, custom headers)
  }

  preflight-response: {
    headers: {
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'  // Cache preflight for 24 hours
    }
  }

  actual-request: {
    origin-header:     // Origin: https://example.com (sent by browser)
    response:          // Access-Control-Allow-Origin: https://example.com
  }

  credentials: {
    cookies: {
      allow:           // Access-Control-Allow-Credentials: true
      origin:          // Must be specific origin (not '*')
    }
  }
}

input-validation {
  validate-at-boundaries: {
    location:          // Middleware or first line of route handler
    philosophy:        // Fail fast - reject invalid input immediately
  }

  validation-types: {
    required: {
      check:           // Field exists and not null/undefined
      error:           // { error: 'name is required' }
    }

    type: {
      check:           // typeof field === 'string'
      error:           // { error: 'age must be a number' }
    }

    format: {
      check:           // Email regex, URL pattern, date format
      error:           // { error: 'email must be valid email address' }
    }

    length: {
      check:           // String length constraints
      error:           // { error: 'password must be at least 8 characters' }
    }

    range: {
      check:           // Numeric range (age >= 18, age <= 120)
      error:           // { error: 'age must be between 18 and 120' }
    }

    enum: {
      check:           // Value in allowed set
      error:           // { error: 'status must be one of: active, inactive, pending' }
    }
  }

  sanitization: {
    xss-prevention:    // Escape HTML tags in user input
    sql-injection:     // Use parameterized queries (never concatenate)
    path-traversal:    // Validate file paths (don't allow ../../../etc/passwd)
  }
}
```

---

## Layer 4: API Design Patterns - Advanced Concepts

**Versioning, pagination, batch operations - patterns for mature APIs.**

### Level 1: DTOs & Validation
```
dtos-data-transfer-objects {
  request-dto: {
    purpose:           // Define expected input structure
    example: {
      // CreateUserRequest {
      //   name: string (required, min 2 chars)
      //   email: string (required, valid email)
      //   age?: number (optional, min 18)
      //   role: 'user' | 'admin' (default: 'user')
      // }
    }
    validation:        // Validate all fields before processing
  }

  response-dto: {
    purpose:           // Define output structure (hide internals)
    example: {
      // UserResponse {
      //   id: string (UUID)
      //   name: string
      //   email: string
      //   role: string
      //   createdAt: ISO date string
      //   updatedAt: ISO date string
      // }
    }
    never-include:     // Passwords, tokens, internal IDs, sensitive data
  }

  separation: {
    benefit:           // Different representations for input vs output
    example:           // Password in request DTO, never in response DTO
  }
}

validation-frameworks: {
  zod: {
    pattern:           // Define schema, validate, infer TypeScript type
    example: {
      // const UserSchema = z.object({
      //   name: z.string().min(2),
      //   email: z.string().email(),
      //   age: z.number().min(18).optional()
      // })
    }
  }

  custom-validator: {
    pattern:           // Validation middleware or helper functions
    example: {
      // const validateUser = async (c, next) => {
      //   const body = await c.req.json()
      //   if (!body.name) return c.json({ error: 'Name required' }, 400)
      //   await next()
      // }
    }
  }
}
```

### Level 2: API Versioning
```
versioning-strategies {
  url-versioning: {
    pattern:           // /api/v1/users, /api/v2/users
    pros:              // Simple, clear, cache-friendly, easy to debug
    cons:              // Need to duplicate route definitions
    example: {
      // app.route('/api/v1/users').get('/', listUsersV1)
      // app.route('/api/v2/users').get('/', listUsersV2)
    }
    recommendation:    // Start with URL versioning (most common)
  }

  header-versioning: {
    pattern:           // Accept: application/vnd.api.v1+json
    pros:              // Clean URLs, flexible, can change version per request
    cons:              // Harder to debug, cache complexity, not discoverable
    example: {
      // const version = c.req.header('Accept')?.includes('v2') ? 'v2' : 'v1'
    }
    use-case:          // Internal APIs, versioning by client type
  }

  deprecation: {
    headers: {
      'X-API-Deprecated': 'true',
      'X-API-Sunset': '2025-01-01',  // Date when version will be removed
      'Link': '</api/v2/users>; rel="successor-version"'
    }
    communication:     // Announce breaking changes in advance
    timeline:          // Support old versions for 6-12 months
  }
}
```

### Level 3: Pagination Strategies
```
offset-pagination {
  request: {
    url:               // /api/users?page=2&limit=20
    params: {
      page:            // Page number (1-indexed)
      limit:           // Items per page (default: 20, max: 100)
    }
  }

  response: {
    data: [],          // Array of items
    pagination: {
      page: 2,
      limit: 20,
      total: 150,      // Total items (can be expensive to count)
      totalPages: 8    // Calculated: Math.ceil(total / limit)
    }
  }

  pros: {
    simple:            // Easy to implement, works with any database
    jump-to-page:      // Can jump to any page directly
    understandable:    // Familiar UI pattern
  }

  cons: {
    performance:       // OFFSET becomes slow on large offsets (database scans)
    data-gaps:         // Items added/deleted during pagination cause skips/duplicates
    total-count:       // COUNT(*) query can be expensive on large tables
  }

  sql-example: {
    // SELECT * FROM users ORDER BY id LIMIT 20 OFFSET 20
  }

  best-for:            // Small datasets (< 10,000 rows), admin interfaces
}

cursor-pagination {
  request: {
    url:               // /api/users?limit=20&cursor=eyJpZCI6MTIzfQ
    params: {
      limit:           // Items per page
      cursor:          // Encoded cursor (typically base64 JSON)
    }
  }

  response: {
    data: [],
    nextCursor: 'eyJpZCI6MTQ1fQ',
    hasMore: true
  }

  cursor-encoding: {
    approach:          // Encode (lastId, lastValue) in cursor
    example:           // base64('{"id": 123, "createdAt": "2024-01-01T00:00:00Z"}')
    decode:            // const { id, createdAt } = JSON.parse(base64decode(cursor))
  }

  sql-example: {
    // SELECT * FROM users
    // WHERE id > :lastId
    // ORDER BY id ASC
    // LIMIT 20
  }

  pros: {
    performance:       // O(1) regardless of page (uses index on cursor column)
    no-gaps:           // No skips/duplicates if data changes during pagination
    infinite-scroll:   // Perfect for "load more" patterns
  }

  cons: {
    no-jump:           // Can't jump to specific page
    complexity:        // More complex to implement
    encoding:          // Cursor format must be stable (careful with schema changes)
  }

  best-for:            // Large datasets, mobile apps, infinite scroll, real-time data
}
```

### Level 4: Advanced Patterns
```
partial-responses {
  request: {
    url:               // /api/users?fields=id,name,email
  }

  full-response: {
    user: {
      id: 'abc123',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-15T10:30:00Z'
    }
  }

  partial-response: {
    user: {
      id: 'abc123',
      name: 'John Doe',
      email: 'john@example.com'
    }
  }

  benefits: {
    bandwidth:         // Reduce payload size for mobile/slow networks
    flexibility:       // Clients request exactly what they need
    privacy:           // Don't expose fields client doesn't need
  }

  implementation: {
    // Parse fields query param
    // Filter response object to include only specified fields
  }
}

batch-operations {
  request: {
    url:               // POST /api/users/batch
    body: [
      { name: 'User 1', email: 'user1@example.com' },
      { name: 'User 2', email: 'user2@example.com' },
      { name: 'User 3', email: 'user3@example.com' }
    ]
  }

  response: {
    created: 3,
    failed: 0,
    results: [
      { success: true, id: '1', data: { name: 'User 1' } },
      { success: true, id: '2', data: { name: 'User 2' } },
      { success: true, id: '3', data: { name: 'User 3' } }
    ]
  }

  error-handling: {
    partial-success:   // Some items succeed, some fail
    response: {
      created: 2,
      failed: 1,
      results: [
        { success: true, id: '1' },
        { success: false, error: 'Email already exists', index: 1 },
        { success: true, id: '3' }
      ]
    }
  }

  endpoints: {
    create:            // POST /api/resource/batch (bulk create)
    update:            // PATCH /api/resource/batch (bulk update)
    delete:            // DELETE /api/resource/batch (bulk delete)
  }

  benefits: {
    performance:       // Reduce round trips (1 request instead of N)
    atomicity:         // Transactional if needed (all or nothing)
  }
}

hateoas-hypermedia {
  concept: {
    principle:         // Responses include links to related resources
    discoverability:   // Clients can navigate API without hard-coded URLs
  }

  example: {
    user: {
      id: 'abc123',
      name: 'John Doe',
      _links: {
        self: { href: '/api/users/abc123' },
        update: { href: '/api/users/abc123', method: 'PUT' },
        delete: { href: '/api/users/abc123', method: 'DELETE' },
        posts: { href: '/api/users/abc123/posts' }
      }
    }
  }

  benefits: {
    flexibility:       // API can change URLs without breaking clients
    discoverability:   // Clients can explore API dynamically
  }

  trade-offs: {
    complexity:        // Larger responses, more complex clients
    necessity:         // Not needed for simple/mobile apps
  }
}
```

---

## Cross-Cutting Concepts

These concerns span multiple layers and apply throughout web server development.

### Error Handling
```
error-response-format {
  structure: {
    success: false,
    error: 'Human-readable message',
    code: 'ERROR_CODE',  // Machine-readable code for client handling
    details: {
      field: 'Specific error message'
    },
    requestId: 'req_abc123'  // For debugging
  }

  examples: {
    validation: {
      status: 400,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: {
        email: 'Invalid email format',
        age: 'Must be at least 18'
      }
    }

    not-found: {
      status: 404,
      error: 'User not found',
      code: 'USER_NOT_FOUND'
    }

    server-error: {
      status: 500,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      requestId: 'req_abc123'
    }
  }

  best-practices: {
    never-expose:      // Stack traces, internal errors, database details
    log-server-side:   // Log full error details for debugging
    return-generic:    // Generic message to client for server errors
  }
}
```

### Documentation
```
api-documentation {
  openapi-swagger: {
    standard:          // OpenAPI 3.0 (formerly Swagger)
    tools:             // Swagger UI, Redoc, Stoplight
    benefits: {
      interactive:     // Try API directly from docs
      client-sdks:     // Generate client libraries (TypeScript, Python, etc.)
      documentation:   // Single source of truth
    }
  }

  required-elements: {
    endpoints:         // All routes with methods and paths
    parameters: {
      path:            // /api/users/:id (id parameter)
      query:           // ?page=2&limit=20
      body:            // Request body schema
      headers:         // Authorization, Content-Type
    }
    responses:         // All possible response codes (200, 400, 401, 404, 500)
    schemas:           // Request/response DTOs
    examples:          // Example requests and responses
  }

  keeping-in-sync: {
    code-first:        // Generate docs from code (Zod, TypeScript types)
    docs-first:        // Write OpenAPI spec, generate server stub
    validation:        // Ensure docs match implementation
  }
}
```

### Testing APIs
```
testing-strategies {
  unit-tests: {
    focus:             // Test individual route handlers
    mock:              // Mock database, external services
    example: {
      // test('GET /api/users/:id returns user', async () => {
      //   const response = await app.request('/api/users/123')
      //   assertEquals(response.status, 200)
      // })
    }
  }

  integration-tests: {
    focus:             // Test full request/response cycle
    database:          // Use test database (not production)
    example: {
      // test('POST /api/users creates user in database', async () => {
      //   const response = await app.request('/api/users', {
      //     method: 'POST',
      //     body: JSON.stringify({ name: 'John', email: 'john@example.com' })
      //   })
      //   const user = await db.query.users.findFirst({ where: eq(email, 'john@example.com') })
      //   assertEquals(user.name, 'John')
      // })
    }
  }

  contract-tests: {
    focus:             // Verify API matches OpenAPI specification
    tools:             // OpenAPI validator, Schema validator
    benefit:           // Ensures docs match implementation
  }
}
```

---

## Key Insights from This Hierarchy

1. **HTTP is the foundation** - Understanding methods, status codes, headers, and caching is prerequisite for everything else (Layer 0)

2. **REST is about resources** - URLs identify resources (nouns), HTTP methods provide actions (verbs), not the other way around (Layer 1)

3. **Middleware enables cross-cutting concerns** - Authentication, logging, error handling, CORS - applied consistently across routes (Layer 2)

4. **Validate at boundaries** - Input validation happens when request enters system (DTOs, middleware), not in business logic (Layer 4)

5. **Consistency is key** - Response shapes, error formats, URL patterns - predictable APIs are easier to use and maintain (Layer 2-4)

6. **Production requires more than features** - Rate limiting, caching, security (CORS, input sanitization), monitoring, documentation (Layer 3-4)

7. **Pagination is mandatory** - Never return unbounded collections; choose offset (simple) vs cursor (scalable) based on dataset size (Layer 4)

8. **Versioning is inevitable** - APIs evolve; plan for versioning from the start (URL versioning recommended) (Layer 4)

---

## Common Gotchas

| Concept | Gotcha | Solution |
|---------|--------|----------|
| 401 vs 403 | Using wrong status code | 401 = not authenticated (who are you?), 403 = authenticated but no permission (I know you, but no access) |
| PUT vs PATCH | Using PUT for partial updates | PUT replaces entire resource (needs all fields), PATCH updates specific fields (send only what's changing) |
| POST idempotency | Retrying POST creates duplicates | POST is not idempotent; use idempotency keys for critical operations (payments) |
| CORS errors | Preflight OPTIONS request fails | Handle OPTIONS in CORS middleware; respond with proper Access-Control headers |
| Missing pagination | Returning all results (can be 1M+ rows) | Always paginate collection endpoints; use cursor pagination for large datasets |
| Inconsistent errors | Different error formats across endpoints | Standardize error response shape; use error middleware for consistency |
| Exposing sensitive data | Returning passwords, tokens in responses | Use DTOs to define response structure; never include sensitive fields |
| Rate limiting without headers | Clients don't know limits | Return X-RateLimit-* headers on every response; include Retry-After on 429 |
| Missing validation | Trusting client input | Validate all input at boundaries (middleware or DTOs); never trust client data |
| Offset pagination on large datasets | OFFSET 100000 is slow | Use cursor-based pagination for datasets > 10,000 rows |
| Hard-coded version in client | Client breaks when API versions change | Use Accept header or URL versioning; deprecate old versions gracefully |
| Missing request ID | Can't debug production issues | Generate X-Request-ID for every request; include in error responses |
| Cache headers missing | CDN/browser doesn't cache | Set Cache-Control headers appropriately (no-cache for sensitive, max-age for static) |
| JSON.parse() without try/catch | Server crashes on invalid JSON | Always wrap JSON parsing in try/catch; return 400 on parse errors |
| Auth before route | Duplicate auth code in every route | Use auth middleware; apply to route groups instead of individual routes |

---

## Learning Progression

Based on the curriculum structure:

1. **Start with Layer 0** (HTTP basics): Learn methods (GET, POST, PUT, PATCH, DELETE), status codes (2xx, 3xx, 4xx, 5xx), headers (request/response), request/response cycle

2. **Master Layer 1** (RESTful design): Resource naming (nouns not verbs), URL hierarchy, query parameters (filtering, sorting, pagination), HTTP method mapping to CRUD

3. **Build with Layer 2** (Web framework): Routing (path params, query strings), middleware (auth, logging, error handling), request/response handling, validation patterns

4. **Add Layer 3** (Production features): Authentication (bearer tokens, JWT), authorization (RBAC, permissions), rate limiting, caching strategies, CORS, security (input validation, sanitization)

5. **Apply Layer 4** (API design patterns): DTOs and validation, API versioning, pagination strategies (offset vs cursor), partial responses, batch operations, HATEOAS

6. **Implement cross-cutting concerns**: Error handling (consistent format), documentation (OpenAPI/Swagger), testing (unit, integration, contract)

Each layer builds on the previous. You can't design effective REST APIs (Layer 1) without understanding HTTP methods (Layer 0). You can't implement authentication middleware (Layer 2) without understanding headers (Layer 0). You can't design pagination strategies (Layer 4) without understanding query parameters (Layer 1).

---

**Credits**: Developed alongside the 05-web-server curriculum, complementing the JavaScript and Node.js hierarchies with HTTP, REST, API design, and web server patterns.
