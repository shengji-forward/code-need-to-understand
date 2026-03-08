// EXERCISE 1: SQL Basics
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 04-database-basics/exercises/exercise-01-sql.ts

console.log("=== Exercise 1: SQL Basics ===\n");

// Imagine we have a health coaching database with these tables:
// - users (id, name, email, age, is_active, created_at)
// - goals (id, user_id, title, target_date, status)
// - sessions (id, user_id, duration, session_date, notes)
// - health_metrics (id, user_id, weight, steps, date)

// ============================================
// TODO 1: Write a SELECT query
// ============================================
// Instructions:
// - Write a SELECT query to fetch all active users' names and emails
// - Active users have is_active = true
// - Select only the name and email columns (not all columns)

// TODO: Your code here - Write the SQL query as a string
const selectActiveUsers = `
  -- Your SQL query here
`;

console.log("--- TODO 1: SELECT Query ---");
console.log("Your query:");
console.log(selectActiveUsers);
console.log("Expected: Should return name and email for all active users");
console.log("");

// ============================================
// TODO 2: Write an INSERT query
// ============================================
// Instructions:
// - Write an INSERT query to add a new goal
// - The goal should have: user_id = 1, title = 'Lose 10 pounds', status = 'in_progress'
// - Include the current timestamp for target_date (use NOW())

// TODO: Your code here
const insertGoal = `
  -- Your SQL query here
`;

console.log("--- TODO 2: INSERT Query ---");
console.log("Your query:");
console.log(insertGoal);
console.log("Expected: Should insert a new goal for user 1");
console.log("");

// ============================================
// TODO 3: Write an UPDATE query
// ============================================
// Instructions:
// - Write an UPDATE query to change a user's email
// - Update user with id = 1 to have email = 'newemail@example.com'

// TODO: Your code here
const updateEmail = `
  -- Your SQL query here
`;

console.log("--- TODO 3: UPDATE Query ---");
console.log("Your query:");
console.log(updateEmail);
console.log("Expected: Should update email for user 1");
console.log("Warning: ⚠️  Don't forget the WHERE clause!");
console.log("");

// ============================================
// TODO 4: Write a DELETE query
// ============================================
// Instructions:
// - Write a DELETE query to remove completed sessions
// - Delete sessions older than 30 days
// - Use: session_date < NOW() - INTERVAL '30 days'

// TODO: Your code here
const deleteOldSessions = `
  -- Your SQL query here
`;

console.log("--- TODO 4: DELETE Query ---");
console.log("Your query:");
console.log(deleteOldSessions);
console.log("Expected: Should delete sessions older than 30 days");
console.log("Warning: ⚠️  Don't forget the WHERE clause!");
console.log("");

// ============================================
// TODO 5: Write a JOIN query
// ============================================
// Instructions:
// - Write a query to get all goals with their owner's name
// - Use JOIN to combine goals and users tables
// - Select: goals.title, users.name, goals.status

// TODO: Your code here
const goalsWithOwner = `
  -- Your SQL query here
`;

console.log("--- TODO 5: JOIN Query ---");
console.log("Your query:");
console.log(goalsWithOwner);
console.log("Expected: Should return goals with owner names");
console.log("Hint: Use INNER JOIN on user_id = users.id");
console.log("");

// ============================================
// TODO 6: Write a query with ORDER BY and LIMIT
// ============================================
// Instructions:
// - Write a query to get the 5 most recent sessions
// - Order by session_date descending
// - Select all columns

// TODO: Your code here
const recentSessions = `
  -- Your SQL query here
`;

console.log("--- TODO 6: ORDER BY + LIMIT Query ---");
console.log("Your query:");
console.log(recentSessions);
console.log("Expected: Should return 5 most recent sessions");
console.log("Hint: Use ORDER BY session_date DESC LIMIT 5");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Write a transaction that:
//   1. Inserts a new session for user 1
//   2. Updates the user's last_session_date
//   3. Commits if successful, rolls back on error
// - Use BEGIN, COMMIT, and ROLLBACK

// TODO: Your code here
const createSessionTransaction = `
  -- Your transaction SQL here
`;

console.log("--- BONUS: Transaction ---");
console.log("Your transaction:");
console.log(createSessionTransaction);
console.log("Expected: Should insert session and update user atomically");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-01-sql-solution.ts");

export {};
