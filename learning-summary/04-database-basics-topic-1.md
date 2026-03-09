# Learning Summary: 04-Database-Basics Complete (Topic 1)

**Completed**: 2026-03-09
**Topics**: SQL Fundamentals, SELECT/INSERT/UPDATE/DELETE, JOINs, ORDER BY, LIMIT, Transactions
**Purpose**: Use this summary for AI interview practice, recap, and YouTube video preparation

---

## Topic 1: SQL Fundamentals

### What You Learned

#### 1. SELECT Queries - Retrieving Data

**Your code:**
```sql
SELECT name, email FROM users WHERE is_active = true
```

**Key concept:**
- `SELECT` specifies which columns to retrieve
- `FROM` specifies the table
- `WHERE` filters rows based on conditions
- Select specific columns (not `SELECT *`) for better performance
- Boolean values in SQL: `true`/`false` (PostgreSQL) or `1`/`0` (MySQL)

**Common patterns:**
```sql
-- Select all columns (use sparingly)
SELECT * FROM users;

-- Select specific columns (preferred)
SELECT id, name, email FROM users;

-- With WHERE clause
SELECT * FROM users WHERE is_active = true;

-- Multiple conditions
SELECT * FROM users WHERE age >= 25 AND city = 'San Francisco';
```

#### 2. INSERT Statements - Adding Data

**Your code:**
```sql
INSERT INTO goals (user_id, title, status, target_date)
VALUES (1, 'Lose 10 pounds', 'in_progress', NOW())
```

**Key concept:**
- `INSERT INTO` specifies the table
- Column list in parentheses after table name
- `VALUES` provides the data to insert
- Column order must match VALUES order
- `NOW()` inserts current timestamp
- String literals in single quotes
- Numbers without quotes

**Common patterns:**
```sql
-- Insert single row
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 30);

-- Insert multiple rows
INSERT INTO users (name, email, age) VALUES
  ('Bob', 'bob@example.com', 25),
  ('Charlie', 'charlie@example.com', 35);

-- Insert with timestamp
INSERT INTO sessions (user_id, created_at)
VALUES (1, NOW());
```

#### 3. UPDATE Statements - Modifying Data

**Your code:**
```sql
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 1
```

**Key concept:**
- `UPDATE` specifies the table
- `SET` specifies columns and new values
- `WHERE` clause is CRITICAL - without it, ALL rows are updated!
- Always check WHERE clause before running UPDATE
- Can update multiple columns: `SET col1 = val1, col2 = val2`

**Common patterns:**
```sql
-- Update single column
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- Update multiple columns
UPDATE users
SET email = 'new@example.com', updated_at = NOW()
WHERE id = 1;

-- Update based on condition
UPDATE users
SET status = 'inactive'
WHERE last_login < '2024-01-01';

-- ⚠️ DANGER: Updates ALL rows!
-- UPDATE users SET email = 'new@example.com';
```

#### 4. DELETE Statements - Removing Data

**Your code:**
```sql
DELETE FROM sessions
WHERE session_date < NOW() - INTERVAL '30 days'
```

**Key concept:**
- `DELETE FROM` specifies the table
- `WHERE` clause is CRITICAL - without it, ALL rows are deleted!
- Always check WHERE clause before running DELETE
- Use date arithmetic for time-based deletions
- PostgreSQL syntax: `INTERVAL '30 days'`
- MySQL syntax: `DATE_SUB(NOW(), INTERVAL 30 DAY)`

**Common patterns:**
```sql
-- Delete specific row
DELETE FROM users WHERE id = 1;

-- Delete based on condition
DELETE FROM sessions WHERE expires_at < NOW();

-- Delete old data (PostgreSQL)
DELETE FROM logs WHERE created_at < NOW() - INTERVAL '7 days';

-- Delete old data (MySQL)
DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);

-- ⚠️ DANGER: Deletes ALL rows!
-- DELETE FROM users;
```

#### 5. JOIN Queries - Combining Data from Multiple Tables

**Your code:**
```sql
SELECT goals.title, users.name, goals.status
FROM goals
INNER JOIN users ON goals.user_id = users.id
```

**Key concept:**
- `INNER JOIN` returns only rows that match in BOTH tables
- `LEFT JOIN` returns all rows from left table, matching from right
- `ON` specifies the join condition (usually foreign key = primary key)
- Join combines columns from both tables
- Prefix column names with table names to avoid ambiguity

**JOIN types comparison:**
```sql
-- INNER JOIN: Only matching rows
SELECT users.name, goals.title
FROM users
INNER JOIN goals ON users.id = goals.user_id;
-- Result: Only users who have goals

-- LEFT JOIN: All from left table
SELECT users.name, goals.title
FROM users
LEFT JOIN goals ON users.id = goals.user_id;
-- Result: All users, including those without goals (NULL for goals.title)

-- RIGHT JOIN: All from right table
SELECT users.name, goals.title
FROM users
RIGHT JOIN goals ON users.id = goals.user_id;
-- Result: All goals, including those without users (rarely used)

-- FULL OUTER JOIN: All from both tables
SELECT users.name, goals.title
FROM users
FULL OUTER JOIN goals ON users.id = goals.user_id;
-- Result: All users and all goals (PostgreSQL only, not MySQL)
```

**Common JOIN patterns:**
```sql
-- Join with WHERE clause
SELECT u.name, g.title
FROM users u
INNER JOIN goals g ON u.id = g.user_id
WHERE u.is_active = true;

-- Multiple JOINs
SELECT u.name, g.title, s.session_date
FROM users u
INNER JOIN goals g ON u.id = g.user_id
INNER JOIN sessions s ON u.id = s.user_id;

-- Self JOIN (rare but useful)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

#### 6. ORDER BY and LIMIT - Sorting and Pagination

**Your code:**
```sql
SELECT *
FROM sessions
ORDER BY session_date DESC
LIMIT 5
```

**Key concept:**
- `ORDER BY` sorts results by specified column(s)
- `ASC` (default): ascending (A-Z, 0-9, oldest first)
- `DESC`: descending (Z-A, 9-0, newest first)
- `LIMIT` restricts number of rows returned
- Useful for: pagination, "top N" queries, recent items

**Common patterns:**
```sql
-- Most recent first
SELECT * FROM sessions
ORDER BY created_at DESC
LIMIT 10;

-- Highest scores
SELECT * FROM leaderboard
ORDER BY score DESC
LIMIT 100;

-- Alphabetical order
SELECT * FROM users
ORDER BY name ASC
LIMIT 50;

-- Multiple sort columns
SELECT * FROM products
ORDER BY category ASC, price DESC;

-- Pagination (page 2, 20 per page)
SELECT * FROM products
ORDER BY id
LIMIT 20 OFFSET 20;
```

#### 7. Transactions - Atomic Operations (BONUS!)

**Your code:**
```sql
BEGIN
INSERT INTO sessions (user_id, duration, session_date, notes)
VALUES (1, 30, NOW(), 'First session');

UPDATE users
SET last_session_date = NOW()
WHERE id = 1;

COMMIT
```

**Key concept:**
- `BEGIN` starts a transaction
- All operations succeed together or fail together
- `COMMIT` applies all changes permanently
- `ROLLBACK` undoes all changes (if error occurs)
- Ensures data consistency across multiple operations
- Critical for: money transfers, multi-step operations

**Transaction patterns:**
```sql
-- Successful transaction
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Failed transaction (with rollback)
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Error occurs here!
ROLLBACK;

-- Application-level pattern (TypeScript/Node.js)
try {
  await db.query('BEGIN');
  await db.query(insertSession, [userId, duration]);
  await db.query(updateUser, [userId]);
  await db.query('COMMIT');
} catch (error) {
  await db.query('ROLLBACK');
  throw error;
}
```

**When to use transactions:**
- Money transfers (debit one account, credit another)
- Multi-step operations (insert order, insert items, update inventory)
- Critical data updates (multiple tables must stay in sync)
- All-or-nothing operations (partial success = failure)

---

### Mistakes You Made & Fixed (Topic 1)

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **None!** | Exercise completed without errors | N/A | SQL queries were written correctly on first attempt |

---

### Best Practices Learned (Topic 1)

1. ✅ **Always use WHERE clause** in UPDATE/DELETE statements
2. ✅ **Select specific columns** instead of `SELECT *` for better performance
3. ✅ **Use parameterized queries** to prevent SQL injection
4. ✅ **Check UPDATE/DELETE queries** twice before running
5. ✅ **Use transactions** for multi-step operations
6. ✅ **Use INNER JOIN** when you only need matching rows
7. ✅ **Use LEFT JOIN** when you need all rows from left table
8. ✅ **Add indexes** on columns used in WHERE, JOIN, ORDER BY
9. ✅ **Use LIMIT** to restrict result set size
10. ✅ **Order by DESC** for "most recent" queries
11. ✅ **Use NOW()** for current timestamp (PostgreSQL)
12. ✅ **Use INTERVAL** for date arithmetic (PostgreSQL)
13. ✅ **Prefix column names** with table names in JOINs
14. ✅ **Test queries** with SELECT before running UPDATE/DELETE
15. ✅ **Use EXPLAIN** to analyze slow queries

---

### Interview Questions (Topic 1)

1. **What's the difference between `INNER JOIN` and `LEFT JOIN`?**
   - Answer: `INNER JOIN` returns only rows that match in both tables. `LEFT JOIN` returns all rows from the left table, and matching rows from the right (NULL if no match).

2. **Why should you avoid `SELECT *` in production?**
   - Answer: It fetches unnecessary data, wastes bandwidth, slows queries, makes schema changes harder, and prevents using covering indexes.

3. **What happens if you run `UPDATE` without a `WHERE` clause?**
   - Answer: ALL rows in the table will be updated. Always include WHERE clause and verify it's correct before running.

4. **What's a transaction and when should you use one?**
   - Answer: A transaction groups multiple operations so they all succeed or all fail together. Use for money transfers, multi-step operations, and data consistency.

5. **What's the difference between `ORDER BY ASC` and `ORDER BY DESC`?**
   - Answer: `ASC` sorts ascending (A-Z, 0-9, oldest first). `DESC` sorts descending (Z-A, 9-0, newest first).

6. **How do you prevent SQL injection?**
   - Answer: Use parameterized queries (prepared statements). Never concatenate user input into SQL strings.

7. **What does `LIMIT` do in SQL?**
   - Answer: Restricts the number of rows returned. Used for pagination, "top N" queries, and limiting result set size.

8. **What's the difference between `DELETE` and `TRUNCATE`?**
   - Answer: `DELETE` removes rows one by one (can be rolled back, slower). `TRUNCATE` removes all rows instantly (cannot be rolled back, resets auto-increment).

9. **How do you insert the current timestamp in SQL?**
   - Answer: PostgreSQL: `NOW()`. MySQL: `NOW()` or `CURRENT_TIMESTAMP`.

10. **What's a foreign key and why is it important?**
    - Answer: A column that references the primary key of another table. Ensures referential integrity, prevents orphaned records, enables JOINs.

---

### Code Examples for YouTube Video (Topic 1)

#### Example 1: SELECT Query Patterns

```sql
-- ========== BASIC SELECT ==========
-- Select specific columns (preferred)
SELECT id, name, email FROM users WHERE is_active = true;

-- Select all columns (use sparingly)
SELECT * FROM users WHERE is_active = true;

-- ========== WHERE CONDITIONS ==========
-- Single condition
SELECT * FROM users WHERE age >= 25;

-- Multiple conditions (AND)
SELECT * FROM users WHERE age >= 25 AND age <= 35;

-- Multiple conditions (OR)
SELECT * FROM users WHERE city = 'SF' OR city = 'NYC';

-- Pattern matching
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- ========== ORDER BY ==========
-- Ascending (A-Z)
SELECT * FROM users ORDER BY name ASC;

-- Descending (Z-A)
SELECT * FROM users ORDER BY created_at DESC;

-- Multiple sort columns
SELECT * FROM products ORDER BY category ASC, price DESC;

-- ========== LIMIT ==========
-- Top 10
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- Pagination (page 2, 20 per page)
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 20;
```

#### Example 2: INSERT, UPDATE, DELETE

```sql
-- ========== INSERT ==========
-- Single row
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30);

-- Multiple rows
INSERT INTO users (name, email, age) VALUES
  ('Bob', 'bob@example.com', 25),
  ('Charlie', 'charlie@example.com', 35);

-- With timestamp
INSERT INTO sessions (user_id, created_at) VALUES (1, NOW());

-- ========== UPDATE ==========
-- Single column
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- Multiple columns
UPDATE users
SET email = 'new@example.com', updated_at = NOW()
WHERE id = 1;

-- ⚠️ DANGER: Updates ALL rows
-- UPDATE users SET email = 'new@example.com';

-- ========== DELETE ==========
-- Specific row
DELETE FROM users WHERE id = 1;

-- Based on condition
DELETE FROM sessions WHERE expires_at < NOW();

-- Old data cleanup (PostgreSQL)
DELETE FROM logs WHERE created_at < NOW() - INTERVAL '7 days';

-- ⚠️ DANGER: Deletes ALL rows
-- DELETE FROM users;
```

#### Example 3: JOIN Queries

```sql
-- ========== INNER JOIN (matching only) ==========
SELECT users.name, goals.title
FROM users
INNER JOIN goals ON users.id = goals.user_id;

-- Result: Only users who have goals

-- ========== LEFT JOIN (all from left) ==========
SELECT users.name, goals.title
FROM users
LEFT JOIN goals ON users.id = goals.user_id;

-- Result: All users, including those without goals

-- ========== MULTIPLE JOINS ==========
SELECT u.name, g.title, s.session_date
FROM users u
INNER JOIN goals g ON u.id = g.user_id
INNER JOIN sessions s ON u.id = s.user_id
WHERE u.is_active = true;

-- ========== JOIN WITH AGGREGATION ==========
SELECT u.name, COUNT(g.id) as goal_count
FROM users u
LEFT JOIN goals g ON u.id = g.user_id
GROUP BY u.id, u.name
HAVING COUNT(g.id) > 0;
```

#### Example 4: Transactions

```sql
-- ========== BASIC TRANSACTION ==========
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- ========== TRANSACTION WITH ROLLBACK ==========
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Error occurs!
ROLLBACK;

-- ========== APPLICATION PATTERN (Node.js) ==========
try {
  await db.query('BEGIN');
  await db.query('INSERT INTO sessions ...');
  await db.query('UPDATE users ...');
  await db.query('COMMIT');
} catch (error) {
  await db.query('ROLLBACK');
  throw error;
}
```

#### Example 5: SQL Injection Prevention

```sql
-- ❌ BAD: SQL injection vulnerable!
-- const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
-- If userEmail = "' OR '1'='1", attacker bypasses authentication!

-- ✅ GOOD: Parameterized query
-- const query = 'SELECT * FROM users WHERE email = $1';
-- await db.query(query, [userEmail]);
-- Database treats input as data, not executable code
```

---

## Progress

### Completed: Topic 1 - SQL Fundamentals ✅

- ✅ SELECT queries with WHERE clauses
- ✅ INSERT statements for adding data
- ✅ UPDATE statements for modifying data
- ✅ DELETE statements for removing data
- ✅ INNER JOIN and LEFT JOIN queries
- ✅ ORDER BY and LIMIT for sorting/pagination
- ✅ Transactions for atomic operations
- ✅ SQL injection prevention awareness

### Ready For: Next Topic

**Completed: 04-Database-Basics Topic 1**
**Next: 04-Database-Basics Topic 2**
- Drizzle ORM
- Schema definitions
- Type-safe queries
- Relations and migrations

---

## Final Stats (Topic 1)

- **Exercises Completed**: 1
  - Exercise 1: SQL Basics (TODO 1-6 + Bonus)
- **TODOs Completed**: 7 (6 main + 1 bonus)
- **Mistakes Identified**: 0 (Clean completion!)
- **Key Concepts**: 7
- **Interview Questions**: 10
- **Code Examples**: 5
- **SQL Operations Mastered**: 6 (SELECT, INSERT, UPDATE, DELETE, JOIN, ORDER BY/LIMIT)
- **Transaction Concepts Mastered**: 1

**Estimated Study Time**: ~2-3 hours
**Ready for Drizzle ORM**: ✅ YES!

---

*This document covers Topic 1. More topics to come for 04-Database-Basics module.*
