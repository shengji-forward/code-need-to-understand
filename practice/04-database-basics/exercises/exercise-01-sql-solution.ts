// SOLUTION: Exercise 1 - SQL Basics
// Compare with your work to see how you did!

console.log("=== Exercise 1: SQL Basics (Solution) ===\n");

// Imagine we have a health coaching database with these tables:
// - users (id, name, email, age, is_active, created_at)
// - goals (id, user_id, title, target_date, status)
// - sessions (id, user_id, duration, session_date, notes)
// - health_metrics (id, user_id, weight, steps, date)

// ============================================
// SOLUTION 1: SELECT query
// ============================================

const selectActiveUsers = `
  SELECT name, email
  FROM users
  WHERE is_active = true;
`;

console.log("--- SOLUTION 1: SELECT Query ---");
console.log("Query:");
console.log(selectActiveUsers);
console.log("Explanation:");
console.log("  - SELECT name, email: Only fetch the columns we need");
console.log("  - FROM users: Specify the table");
console.log("  - WHERE is_active = true: Filter for active users only");
console.log("");

// ============================================
// SOLUTION 2: INSERT query
// ============================================

const insertGoal = `
  INSERT INTO goals (user_id, title, target_date, status)
  VALUES (1, 'Lose 10 pounds', NOW(), 'in_progress');
`;

console.log("--- SOLUTION 2: INSERT Query ---");
console.log("Query:");
console.log(insertGoal);
console.log("Explanation:");
console.log("  - INSERT INTO goals: Specify the table");
console.log("  - (user_id, title, target_date, status): List columns");
console.log("  - VALUES (...): Provide values matching the columns");
console.log("  - NOW(): Current timestamp");
console.log("");

// ============================================
// SOLUTION 3: UPDATE query
// ============================================

const updateEmail = `
  UPDATE users
  SET email = 'newemail@example.com'
  WHERE id = 1;
`;

console.log("--- SOLUTION 3: UPDATE Query ---");
console.log("Query:");
console.log(updateEmail);
console.log("Explanation:");
console.log("  - UPDATE users: Specify the table");
console.log("  - SET email = ...: Set the new value");
console.log("  - WHERE id = 1: ⚠️  CRITICAL - only update user 1");
console.log("  - Without WHERE, ALL users would get this email!");
console.log("");

// ============================================
// SOLUTION 4: DELETE query
// ============================================

const deleteOldSessions = `
  DELETE FROM sessions
  WHERE session_date < NOW() - INTERVAL '30 days';
`;

console.log("--- SOLUTION 4: DELETE Query ---");
console.log("Query:");
console.log(deleteOldSessions);
console.log("Explanation:");
console.log("  - DELETE FROM sessions: Specify the table");
console.log("  - WHERE session_date < ...: Only delete old sessions");
console.log("  - INTERVAL '30 days': PostgreSQL interval syntax");
console.log("  - ⚠️  Without WHERE, ALL sessions would be deleted!");
console.log("");

// ============================================
// SOLUTION 5: JOIN query
// ============================================

const goalsWithOwner = `
  SELECT
    goals.title,
    users.name,
    goals.status
  FROM goals
  INNER JOIN users ON goals.user_id = users.id;
`;

console.log("--- SOLUTION 5: JOIN Query ---");
console.log("Query:");
console.log(goalsWithOwner);
console.log("Explanation:");
console.log("  - SELECT goals.title, users.name, goals.status: Pick columns from both tables");
console.log("  - FROM goals: Start with goals table");
console.log("  - INNER JOIN users: Join with users table");
console.log("  - ON goals.user_id = users.id: Match rows where user_id matches id");
console.log("  - INNER JOIN only returns goals that have a matching user");
console.log("");

// Alternative with LEFT JOIN (includes goals even if user is deleted)
const goalsWithOwnerLeft = `
  SELECT
    goals.title,
    users.name,
    goals.status
  FROM goals
  LEFT JOIN users ON goals.user_id = users.id;
`;

console.log("Alternative (LEFT JOIN):");
console.log(goalsWithOwnerLeft);
console.log("  - LEFT JOIN would include goals even if the user was deleted");
console.log("");

// ============================================
// SOLUTION 6: ORDER BY + LIMIT query
// ============================================

const recentSessions = `
  SELECT *
  FROM sessions
  ORDER BY session_date DESC
  LIMIT 5;
`;

console.log("--- SOLUTION 6: ORDER BY + LIMIT Query ---");
console.log("Query:");
console.log(recentSessions);
console.log("Explanation:");
console.log("  - SELECT *: Get all columns");
console.log("  - FROM sessions: From the sessions table");
console.log("  - ORDER BY session_date DESC: Sort by date, newest first");
console.log("  - LIMIT 5: Only return the top 5 results");
console.log("");

// ============================================
// BONUS SOLUTION: Transaction
// ============================================

const createSessionTransaction = `
  BEGIN;

  INSERT INTO sessions (user_id, duration, session_date, notes)
  VALUES (1, 60, NOW(), 'Initial consultation');

  UPDATE users
  SET last_session_date = NOW()
  WHERE id = 1;

  COMMIT;

  -- If anything goes wrong, use ROLLBACK instead of COMMIT
`;

console.log("--- BONUS SOLUTION: Transaction ---");
console.log("Transaction:");
console.log(createSessionTransaction);
console.log("Explanation:");
console.log("  - BEGIN: Start the transaction");
console.log("  - INSERT INTO sessions: Add the new session");
console.log("  - UPDATE users: Update the user's last session date");
console.log("  - COMMIT: Apply both changes permanently");
console.log("  - ROLLBACK: If used instead, both changes would be undone");
console.log("  - Both operations succeed together, or both fail");
console.log("");

// Real-world example with error handling
console.log("Real-world pattern with error handling:");
const transactionWithErrorHandling = `
  try {
    await db.query('BEGIN');
    await db.query(insertSessionQuery, [userId, duration]);
    await db.query(updateUserQuery, [userId]);
    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
`;
console.log(transactionWithErrorHandling);
console.log("");

// ============================================
// Additional Examples: Production Patterns
// ============================================

console.log("--- Bonus: Production Patterns ---\n");

// Indexing for performance
const indexingExample = `
  -- Create index on frequently filtered columns
  CREATE INDEX idx_sessions_user_date ON sessions(user_id, session_date);

  -- Now queries filtering by user_id and session_date are much faster
  SELECT * FROM sessions
  WHERE user_id = 1 AND session_date > '2024-01-01';
`;
console.log("Indexing Example:");
console.log(indexingExample);
console.log("");

// Preventing SQL injection
const sqlInjectionPrevention = `
  -- ❌ BAD - SQL injection vulnerable!
  -- const query = "SELECT * FROM users WHERE email = '" + userEmail + "'";

  -- ✅ GOOD - Use parameterized queries
  -- const query = "SELECT * FROM users WHERE email = $1";
  -- await db.query(query, [userEmail]);
`;
console.log("SQL Injection Prevention:");
console.log(sqlInjectionPrevention);
console.log("");

// Aggregate queries
const aggregateExample = `
  -- Count sessions per user
  SELECT
    u.name,
    COUNT(s.id) as session_count,
    AVG(s.duration) as avg_duration
  FROM users u
  LEFT JOIN sessions s ON u.id = s.user_id
  GROUP BY u.id, u.name
  HAVING COUNT(s.id) > 0
  ORDER BY session_count DESC;
`;
console.log("Aggregate Query Example:");
console.log(aggregateExample);
console.log("Explanation:");
console.log("  - COUNT(s.id): Count sessions per user");
console.log("  - AVG(s.duration): Average session duration");
console.log("  - GROUP BY u.id, u.name: Group results by user");
console.log("  - HAVING COUNT(s.id) > 0: Only show users with sessions");
console.log("  - ORDER BY session_count DESC: Most sessions first");
console.log("");

console.log("\n✅ Exercise complete!");
console.log("\nKey takeaways:");
console.log("  ✅ Always use WHERE clause in UPDATE/DELETE");
console.log("  ✅ Use JOINs to combine related data");
console.log("  ✅ Use parameterized queries to prevent SQL injection");
console.log("  ✅ Transactions ensure data consistency");
console.log("  ✅ Indexes dramatically improve query performance");

export {};
