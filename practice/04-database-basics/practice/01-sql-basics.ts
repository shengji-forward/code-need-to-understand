// SQL Basics Practice
// Run with: npx tsx 04-database-basics/practice/01-sql-basics.ts

console.log("=== SQL Basics Practice ===\n");

// ============================================
// LEVEL 1: Basic Operations
// ============================================

console.log("--- LEVEL 1: Basic SQL Operations ---\n");

// SELECT queries - retrieve data from tables
// Syntax: SELECT column1, column2 FROM table_name WHERE condition;

const selectExample = {
  query: "SELECT id, name, email FROM users WHERE is_active = true;",
  explanation: "Fetch id, name, and email from active users only",
  output: "Returns: [{id: 1, name: 'Alice', email: 'alice@example.com'}, ...]",
};
console.log("SELECT Example:");
console.log("  Query:", selectExample.query);
console.log("  What it does:", selectExample.explanation);
console.log("  Sample output:", selectExample.output);
console.log("");

// INSERT statements - add new data
// Syntax: INSERT INTO table_name (column1, column2) VALUES (value1, value2);

const insertExample = {
  query: `INSERT INTO users (name, email, age, created_at)
  VALUES ('Bob Smith', 'bob@example.com', 28, NOW());`,
  explanation: "Add a new user to the users table",
  output: "Returns: 1 (number of rows inserted)",
};
console.log("INSERT Example:");
console.log("  Query:", insertExample.query);
console.log("  What it does:", insertExample.explanation);
console.log("  Sample output:", insertExample.output);
console.log("");

// UPDATE statements - modify existing data
// Syntax: UPDATE table_name SET column1 = value1 WHERE condition;

const updateExample = {
  query: "UPDATE users SET last_login = NOW() WHERE id = 1;",
  explanation: "Update the last_login timestamp for user with id 1",
  warning: "⚠️  Always use WHERE clause, otherwise ALL rows will be updated!",
  output: "Returns: 1 (number of rows updated)",
};
console.log("UPDATE Example:");
console.log("  Query:", updateExample.query);
console.log("  What it does:", updateExample.explanation);
console.log("  Warning:", updateExample.warning);
console.log("  Sample output:", updateExample.output);
console.log("");

// DELETE statements - remove data
// Syntax: DELETE FROM table_name WHERE condition;

const deleteExample = {
  query: "DELETE FROM sessions WHERE expires_at < NOW();",
  explanation: "Delete all expired sessions",
  warning: "⚠️  Always use WHERE clause, otherwise ALL rows will be deleted!",
  output: "Returns: 42 (number of rows deleted)",
};
console.log("DELETE Example:");
console.log("  Query:", deleteExample.query);
console.log("  What it does:", deleteExample.explanation);
console.log("  Warning:", deleteExample.warning);
console.log("  Sample output:", deleteExample.output);
console.log("");

// ============================================
// LEVEL 2: Query Building
// ============================================

console.log("\n--- LEVEL 2: Query Building ---\n");

// JOINs - combine data from multiple tables
const joinExample = {
  innerJoin: {
    query: `SELECT users.name, goals.title, goals.target_date
    FROM users
    INNER JOIN goals ON users.id = goals.user_id
    WHERE users.is_active = true;`,
    explanation: "Get all goals with their owner names (only matches that exist in both tables)",
  },
  leftJoin: {
    query: `SELECT users.name, COUNT(goals.id) as goal_count
    FROM users
    LEFT JOIN goals ON users.id = goals.user_id
    GROUP BY users.id, users.name;`,
    explanation: "Get all users and their goal count (includes users with 0 goals)",
  },
};
console.log("JOIN Examples:");
console.log("  INNER JOIN (only matching rows):");
console.log("    ", joinExample.innerJoin.query.split("\n").join("\n    "));
console.log("    Explanation:", joinExample.innerJoin.explanation);
console.log("");
console.log("  LEFT JOIN (all from left table):");
console.log("    ", joinExample.leftJoin.query.split("\n").join("\n    "));
console.log("    Explanation:", joinExample.leftJoin.explanation);
console.log("");

// ORDER BY and LIMIT - sort and limit results
const sortExample = {
  query: `SELECT name, score
  FROM health_metrics
  ORDER BY score DESC
  LIMIT 10;`,
  explanation: "Get top 10 highest scoring health metrics",
  tip: "Use ASC (default) for ascending, DESC for descending",
};
console.log("ORDER BY + LIMIT Example:");
console.log("  Query:", sortExample.query);
console.log("  What it does:", sortExample.explanation);
console.log("  Tip:", sortExample.tip);
console.log("");

// GROUP BY and HAVING - aggregate data
const groupByExample = {
  query: `SELECT user_id, COUNT(*) as session_count, AVG(duration) as avg_duration
  FROM sessions
  GROUP BY user_id
  HAVING COUNT(*) > 5
  ORDER BY session_count DESC;`,
  explanation: "Find users with more than 5 sessions and their average session duration",
  tip: "WHERE filters rows before grouping, HAVING filters groups after aggregation",
};
console.log("GROUP BY + HAVING Example:");
console.log("  Query:", groupByExample.query);
console.log("  What it does:", groupByExample.explanation);
console.log("  Tip:", groupByExample.tip);
console.log("");

// Complex WHERE conditions
const whereExample = {
  query: `SELECT name, email, age
  FROM users
  WHERE (age >= 25 AND age <= 35)
    AND (is_active = true)
    AND (email LIKE '%@gmail.com' OR email LIKE '%@yahoo.com')
    AND created_at >= '2024-01-01';`,
  explanation: "Find active users aged 25-35 with Gmail/Yahoo emails created this year",
  operators: {
    "AND, OR": "Combine conditions",
    "LIKE": "Pattern matching with % (wildcard)",
    "BETWEEN": "Range check (inclusive)",
    "IN": "Match any value in a list",
  },
};
console.log("Complex WHERE Example:");
console.log("  Query:", whereExample.query);
console.log("  What it does:", whereExample.explanation);
console.log("  Operators:", JSON.stringify(whereExample.operators, null, 2));
console.log("");

// ============================================
// LEVEL 3: Production Patterns
// ============================================

console.log("\n--- LEVEL 3: Production Patterns ---\n");

// Indexes - dramatically improve query performance
const indexExample = {
  createIndex: {
    query: "CREATE INDEX idx_users_email ON users(email);",
    explanation: "Create index on email column for fast lookups",
  },
  compositeIndex: {
    query: "CREATE INDEX idx_sessions_user_date ON sessions(user_id, created_at);",
    explanation: "Composite index for queries filtering by both user_id and created_at",
  },
  bestPractice: "✅ Index columns used in WHERE, JOIN, and ORDER BY clauses",
};
console.log("INDEX Examples:");
console.log("  Single column index:");
console.log("    ", indexExample.createIndex.query);
console.log("    ", indexExample.createIndex.explanation);
console.log("");
console.log("  Composite index:");
console.log("    ", indexExample.compositeIndex.query);
console.log("    ", indexExample.compositeIndex.explanation);
console.log("  ", indexExample.bestPractice);
console.log("");

// Transactions - ensure data consistency
const transactionExample = {
  begin: "BEGIN;",
  operations: [
    "INSERT INTO payment_logs (user_id, amount) VALUES (1, 99.99);",
    "UPDATE users SET credits = credits - 99.99 WHERE id = 1;",
  ],
  commit: "COMMIT;",
  rollback: "ROLLBACK;",
  explanation: "All operations succeed together or fail together",
  useCase: "Use for money transfers, multi-step operations, critical data updates",
};
console.log("TRANSACTION Example:");
console.log("  ", transactionExample.begin);
transactionExample.operations.forEach((op) => console.log("  ", op));
console.log("  ", transactionExample.commit);
console.log("  ", transactionExample.rollback);
console.log("  Explanation:", transactionExample.explanation);
console.log("  Use case:", transactionExample.useCase);
console.log("");

// SQL injection prevention - NEVER trust user input
const sqlInjectionExample = {
  bad: {
    code: `// ❌ BAD - SQL injection vulnerability!
const query = "SELECT * FROM users WHERE email = '" + userEmail + "'";`,
    risk: "If userEmail = \"' OR '1'='1\", attacker can bypass authentication",
  },
  good: {
    code: `// ✅ GOOD - Use parameterized queries
const query = "SELECT * FROM users WHERE email = $1";
await db.query(query, [userEmail]);`,
    benefit: "Database treats input as data, not executable code",
  },
};
console.log("SQL Injection Prevention:");
console.log("  ❌ BAD:", sqlInjectionExample.bad.risk);
console.log("    ", sqlInjectionExample.bad.code);
console.log("");
console.log("  ✅ GOOD:", sqlInjectionExample.good.benefit);
console.log("    ", sqlInjectionExample.good.code);
console.log("");

// Query optimization tips
const optimizationTips = {
  "SELECT *": "❌ Avoid - fetch only columns you need",
  "SELECT col1, col2": "✅ Better - specify columns explicitly",
  "N+1 queries": "❌ Bad - running 1 query to get items, then N queries for related data",
  "JOINs": "✅ Good - fetch related data in a single query",
  "Indexes": "✅ Use indexes on frequently filtered columns",
  "EXPLAIN": "✅ Use EXPLAIN before SELECT to analyze query performance",
  "Batch inserts": "✅ Insert multiple rows in one query instead of loops",
};
console.log("Query Optimization Tips:");
Object.entries(optimizationTips).forEach(([tip, advice]) => {
  console.log(`  ${tip}: ${advice}`);
});
console.log("");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===\n");

console.log("✅ Security:");
console.log("  - ALWAYS use parameterized queries to prevent SQL injection");
console.log("  - NEVER concatenate user input into SQL strings");
console.log("  - Validate and sanitize all user data");
console.log("");

console.log("✅ Performance:");
console.log("  - Create indexes on columns used in WHERE, JOIN, ORDER BY");
console.log("  - Avoid SELECT * - specify only needed columns");
console.log("  - Use EXPLAIN to analyze slow queries");
console.log("  - Use JOINs instead of N+1 queries");
console.log("");

console.log("✅ Data Integrity:");
console.log("  - Use transactions for multi-step operations");
console.log("  - Always include WHERE clause in UPDATE/DELETE");
console.log("  - Use foreign keys to enforce referential integrity");
console.log("  - Add constraints (NOT NULL, UNIQUE, CHECK)");
console.log("");

console.log("✅ Code Quality:");
console.log("  - Use consistent naming conventions (snake_case for columns)");
console.log("  - Write readable queries with proper indentation");
console.log("  - Comment complex queries");
console.log("  - Use views for complex queries you reuse");
console.log("");

console.log("\n✅ Practice complete!");

export {};
