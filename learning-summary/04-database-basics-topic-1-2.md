# Learning Summary: 04-Database-Basics Complete (Topics 1-2)

**Completed**: 2026-03-10
**Topics**: SQL Fundamentals, Drizzle ORM, Schema Definitions, Type-Safe Queries, Relations
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

## Topic 2: Drizzle ORM

### What You Learned

#### 1. Defining Table Schemas with pgTable

**Your code:**
```typescript
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  created_at: timestamp('created_at').defaultNow()
});
```

**Key concept:**
- `pgTable('table_name', {...})` creates a PostgreSQL table definition
- Column names in snake_case inside parentheses: `serial('id')`
- Chain methods: `.primaryKey()`, `.notNull()`, `.unique()`, `.defaultNow()`
- `.references(() => table.column)` creates foreign keys
- TypeScript infers types from schema automatically
- Export table definitions to use in queries

**Column types reference:**
```typescript
import { pgTable, serial, text, integer, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  // Auto-incrementing ID
  id: serial('id').primaryKey(),

  // String types
  name: text('name').notNull(),
  email: text('email').notNull().unique(),

  // Number types
  age: integer('age'),           // Whole numbers
  balance: decimal('balance', { precision: 10, scale: 2 }), // Money

  // Boolean
  isActive: boolean('is_active').default(true),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),

  // Arrays (PostgreSQL)
  tags: text('tags').array(),
});
```

**Constraints reference:**
```typescript
// Primary key
id: serial('id').primaryKey()

// Not null (required field)
name: text('name').notNull()

// Unique (no duplicates)
email: text('email').unique()

// Default value
status: text('status').default('pending')
createdAt: timestamp('created_at').defaultNow()

// Foreign key
userId: integer('user_id').references(() => users.id)
```

#### 2. Foreign Keys and Table Relations

**Your code:**
```typescript
export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  targetDate: timestamp('target_date'),
  status: text('status').default('pending')
});
```

**Key concept:**
- Foreign keys link tables together
- `.references(() => users.id)` creates relationship
- Arrow function `() => users.id` prevents circular dependencies
- Use `.notNull()` if every record must belong to another
- Database enforces referential integrity (can't delete user with goals)

**Foreign key patterns:**
```typescript
// Required foreign key (every goal must have a user)
userId: integer('user_id')
  .references(() => users.id)
  .notNull()

// Optional foreign key (goal can exist without user)
userId: integer('user_id')
  .references(() => users.id)

// Cascade delete (delete goals when user deleted)
userId: integer('user_id')
  .references(() => users.id, { onDelete: 'cascade' })

// Set null on delete (keep goals, remove user reference)
userId: integer('user_id')
  .references(() => users.id, { onDelete: 'set null' })
```

#### 3. INSERT Queries with Drizzle

**Your code:**
```typescript
const insertUserQuery = async (db: DrizzleDB) => {
  return await db.insert(users).values({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30
  });
};
```

**Key concept:**
- `db.insert(table)` starts insert operation
- `.values({...})` provides data to insert
- TypeScript validates data against schema
- Use `.returning()` to get inserted rows back
- Returns array of inserted rows

**INSERT patterns:**
```typescript
// Insert single row
const newUser = await db.insert(users).values({
  name: 'Alice',
  email: 'alice@example.com',
  age: 30
}).returning();

// newUser: [{ id: 1, name: 'Alice', email: 'alice@example.com', age: 30, ... }]

// Insert multiple rows
await db.insert(users).values([
  { name: 'Bob', email: 'bob@example.com', age: 25 },
  { name: 'Charlie', email: 'charlie@example.com', age: 35 }
]);

// Insert with default values
await db.insert(goals).values({
  userId: 1,
  title: 'Lose weight'
  // status defaults to 'pending' from schema
});

// Insert without returning
await db.insert(users).values({
  name: 'Dave',
  email: 'dave@example.com'
});
```

#### 4. SELECT Queries with WHERE Clause

**Your code:**
```typescript
import { gt } from 'drizzle-orm';

const getUsersOlderThan25 = async (db: DrizzleDB) => {
  return await db
    .select({
      name: users.name,
      email: users.email
    })
    .from(users)
    .where(gt(users.age, 25));
};
```

**Key concept:**
- `db.select({...})` specifies columns to return
- `.from(table)` specifies the table
- `.where(condition)` filters rows
- Use helper functions: `eq`, `gt`, `lt`, `gte`, `lte`, `and`, `or`
- TypeScript knows exact return type

**Comparison helpers:**
```typescript
import { eq, ne, gt, gte, lt, lte, and, or, inArray } from 'drizzle-orm';

// Equal
eq(users.age, 25)           // age = 25

// Not equal
ne(users.age, 25)           // age != 25

// Greater than
gt(users.age, 25)           // age > 25

// Greater than or equal
gte(users.age, 25)          // age >= 25

// Less than
lt(users.age, 25)           // age < 25

// Less than or equal
lte(users.age, 25)          // age <= 25

// AND (both conditions)
and(
  gte(users.age, 25),
  lt(users.age, 35)
)                           // age >= 25 AND age < 35

// OR (either condition)
or(
  eq(users.city, 'SF'),
  eq(users.city, 'NYC')
)                           // city = 'SF' OR city = 'NYC'

// IN (match any value)
inArray(users.id, [1, 2, 3]) // id IN (1, 2, 3)
```

**SELECT patterns:**
```typescript
// Select all columns
const allUsers = await db.select().from(users);

// Select specific columns
const userEmails = await db.select({
  name: users.name,
  email: users.email
}).from(users);

// With WHERE clause
const activeUsers = await db.select()
  .from(users)
  .where(eq(users.isActive, true));

// Complex WHERE
const users25to35 = await db.select()
  .from(users)
  .where(
    and(
      gte(users.age, 25),
      lt(users.age, 35),
      eq(users.isActive, true)
    )
  );
```

#### 5. UPDATE Queries with Drizzle

**Your code:**
```typescript
import { eq } from 'drizzle-orm';

const updateUserEmail = async (db: DrizzleDB) => {
  return await db
    .update(users)
    .set({
      email: 'newemail@example.com'
    })
    .where(eq(users.id, 1));
};
```

**Key concept:**
- `db.update(table)` starts update operation
- `.set({...})` specifies columns and new values
- `.where(condition)` is CRITICAL - without it, ALL rows updated!
- TypeScript validates data against schema
- Use `.returning()` to get updated rows back

**UPDATE patterns:**
```typescript
// Update single column
await db.update(users)
  .set({ email: 'new@example.com' })
  .where(eq(users.id, 1));

// Update multiple columns
await db.update(users)
  .set({
    email: 'new@example.com',
    age: 31
  })
  .where(eq(users.id, 1));

// Update with returning
const updatedUser = await db.update(users)
  .set({ lastLogin: new Date() })
  .where(eq(users.id, 1))
  .returning();

// updatedUser: [{ id: 1, name: 'Alice', ..., lastLogin: Date }]

// Update based on condition
await db.update(users)
  .set({ status: 'inactive' })
  .where(lt(users.lastLogin, new Date('2024-01-01')));

// ⚠️ DANGER: Updates ALL rows
// await db.update(users).set({ email: 'new@example.com' });
```

#### 6. JOIN Queries with Drizzle

**Your code:**
```typescript
const goalsWithOwner = async (db: DrizzleDB) => {
  return await db
    .select({
      title: goals.title,
      name: users.name,
      status: goals.status
    })
    .from(goals)
    .leftJoin(users, eq(goals.userId, users.id));
};
```

**Key concept:**
- `.leftJoin(table, condition)` joins tables (all from left)
- `.innerJoin(table, condition)` joins tables (only matching)
- Select columns from both tables in `.select({...})`
- Prefix with table name: `goals.title`, `users.name`
- Use `eq()` for join condition

**JOIN types:**
```typescript
// LEFT JOIN (all goals, with user names if exists)
const goalsWithOwners = await db.select({
  goalTitle: goals.title,
  userName: users.name
})
  .from(goals)
  .leftJoin(users, eq(goals.userId, users.id));

// INNER JOIN (only goals that have users)
const goalsWithOwnersOnly = await db.select({
  goalTitle: goals.title,
  userName: users.name
})
  .from(goals)
  .innerJoin(users, eq(goals.userId, users.id));

// Multiple JOINs
const goalDetails = await db.select({
  goalTitle: goals.title,
  userName: users.name,
  sessionCount: count(sessions.id)
})
  .from(goals)
  .innerJoin(users, eq(goals.userId, users.id))
  .leftJoin(sessions, eq(users.id, sessions.userId))
  .groupBy(users.id, goals.id);
```

#### 7. Defining Relations (BONUS!)

**Your code:**
```typescript
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals)
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id]
  })
}));
```

**Key concept:**
- `relations(table, ({ many, one }) => ({ ... }))` defines relationships
- `many(otherTable)` for one-to-many (user has many goals)
- `one(otherTable, {...})` for many-to-one (goal belongs to user)
- `fields: [table.foreignKey]` specifies foreign key column
- `references: [otherTable.primaryKey]` specifies referenced column
- Enables eager loading with `db.query.tables.findMany()`

**Relation patterns:**
```typescript
// One-to-many: User → Goals
export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),         // User has many goals
  sessions: many(sessions),   // User has many sessions
}));

// Many-to-one: Goal → User
export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],      // Foreign key in goals
    references: [users.id]       // Primary key in users
  })
}));

// Many-to-many: User ← Groups → Members
export const usersRelations = relations(users, ({ many }) => ({
  groups: many(groupMembers, {
    relationName: 'user_groups'
  })
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  members: many(groupMembers, {
    relationName: 'user_groups'
  })
}));

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id]
  }),
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id]
  })
}));
```

**Using relations in queries:**
```typescript
// Fetch user with all their goals
const userWithGoals = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    goals: true  // Include all goals for this user
  }
});

// Result:
// {
//   id: 1,
//   name: 'Alice',
//   email: 'alice@example.com',
//   goals: [
//     { id: 1, userId: 1, title: 'Lose weight', ... },
//     { id: 2, userId: 1, title: 'Exercise more', ... }
//   ]
// }

// Fetch user with limited goals
const userWithRecentGoals = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    goals: {
      limit: 5,
      orderBy: [desc(goals.createdAt)]
    }
  }
});
```

---

### Mistakes You Made & Fixed (Topic 2)

| TODO | Mistake | Fixed | Lesson |
|-----|---------|-------|--------|
| **None!** | Exercise completed without errors | N/A | Drizzle ORM queries were written correctly on first attempt |

---

### Best Practices Learned (Topic 2)

16. ✅ **Define schemas with pgTable()** using snake_case for column names
17. ✅ **Add .notNull() to required columns** (name, email, foreign keys)
18. ✅ **Add .unique() to natural keys** (email, username)
19. ✅ **Use foreign keys** with `.references(() => table.id)` for relationships
20. ✅ **Use helper functions** (eq, gt, and, or) for type-safe queries
21. ✅ **Always use .where()** in UPDATE/DELETE operations
22. ✅ **Select specific columns** in `.select({...})` instead of all columns
23. ✅ **Use .returning()** to get inserted/updated/deleted rows back
24. ✅ **Define relations** with `relations()` for eager loading
25. ✅ **Use TypeScript inference** with `typeof table.$inferSelect`
26. ✅ **Use transactions** for multi-step operations
27. ✅ **Validate data** before passing to Drizzle (TypeScript helps)
28. ✅ **Use .leftJoin()** when you need all rows from left table
29. ✅ **Use .innerJoin()** when you only need matching rows
30. ✅ **Prefix column names** in JOINs to avoid ambiguity

---

### Interview Questions (Topic 2)

1. **What's Drizzle ORM and why use it?**
   - Answer: Drizzle is a type-safe ORM for TypeScript. It provides schema definitions, query building, type inference, and prevents SQL injection through parameterized queries.

2. **How do you define a table in Drizzle?**
   - Answer: Use `pgTable('table_name', {...})` with column definitions. Example: `pgTable('users', { id: serial('id').primaryKey(), name: text('name').notNull() })`.

3. **What's the difference between `.insert().values()` and raw SQL?**
   - Answer: Drizzle uses parameterized queries automatically, preventing SQL injection. TypeScript validates data against schema before runtime.

4. **How do you create a foreign key in Drizzle?**
   - Answer: Use `.references(() => table.column)`. Example: `userId: integer('user_id').references(() => users.id)`.

5. **What are the comparison helpers in Drizzle?**
   - Answer: `eq` (equal), `ne` (not equal), `gt` (greater than), `gte` (>=), `lt` (less than), `lte` (<=), `and`, `or`, `inArray`.

6. **How do you define relations in Drizzle?**
   - Answer: Use `relations(table, ({ many, one }) => ({ ... }))`. For one-to-many: `many(otherTable)`. For many-to-one: `one(otherTable, { fields: [fk], references: [pk] })`.

7. **What's type inference in Drizzle?**
   - Answer: Drizzle automatically infers TypeScript types from schema. Use `typeof table.$inferSelect` for row types and `typeof table.$inferInsert` for input types.

8. **How do you perform a JOIN in Drizzle?**
   - Answer: Use `.leftJoin(table, condition)` or `.innerJoin(table, condition)`. Example: `.leftJoin(users, eq(goals.userId, users.id))`.

9. **Why use `.returning()` in Drizzle?**
   - Answer: Gets back the inserted/updated/deleted rows with their database-generated values (like IDs or timestamps).

10. **How do you prevent SQL injection with Drizzle?**
    - Answer: Drizzle automatically uses parameterized queries. Never concatenate user input into queries. Always use the helper functions like `.values()`, `.where()`, `.set()`.

---

### Code Examples for YouTube Video (Topic 2)

#### Example 6: Drizzle Schema Definition

```typescript
// ========== IMPORTS ==========
import { pgTable, serial, text, integer, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

// ========== USERS TABLE ==========
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  isActive: boolean('is_active').default(true),
  balance: decimal('balance', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// ========== GOALS TABLE (WITH FOREIGN KEY) ==========
export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  targetDate: timestamp('target_date'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ========== TYPE INFERENCE ==========
type User = typeof users.$inferSelect;
// { id: number, name: string, email: string, age: number | null, ... }

type NewUser = typeof users.$inferInsert;
// { id?: number, name: string, email: string, age?: number, ... }
```

#### Example 7: Drizzle CRUD Operations

```typescript
// ========== INSERT ==========
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(pool);

// Insert single row
const newUser = await db.insert(users).values({
  name: 'Alice',
  email: 'alice@example.com',
  age: 30
}).returning();

// Insert multiple rows
await db.insert(users).values([
  { name: 'Bob', email: 'bob@example.com', age: 25 },
  { name: 'Charlie', email: 'charlie@example.com', age: 35 }
]);

// ========== SELECT ==========
import { eq, gt, and, or } from 'drizzle-orm';

// Select all columns
const allUsers = await db.select().from(users);

// Select specific columns
const userEmails = await db.select({
  name: users.name,
  email: users.email
}).from(users);

// With WHERE clause
const activeUsers = await db.select()
  .from(users)
  .where(eq(users.isActive, true));

// Complex WHERE
const users25to35 = await db.select()
  .from(users)
  .where(
    and(
      gte(users.age, 25),
      lt(users.age, 35),
      eq(users.isActive, true)
    )
  );

// ========== UPDATE ==========
// Update single column
await db.update(users)
  .set({ email: 'new@example.com' })
  .where(eq(users.id, 1));

// Update multiple columns
await db.update(users)
  .set({
    email: 'new@example.com',
    age: 31,
    updatedAt: new Date()
  })
  .where(eq(users.id, 1));

// Update with returning
const updatedUser = await db.update(users)
  .set({ lastLogin: new Date() })
  .where(eq(users.id, 1))
  .returning();

// ========== DELETE ==========
// Delete specific row
await db.delete(users).where(eq(users.id, 1));

// Delete with condition
await db.delete(sessions)
  .where(lt(sessions.expiresAt, new Date()));
```

#### Example 8: Drizzle JOIN Queries

```typescript
// ========== LEFT JOIN ==========
const goalsWithOwners = await db.select({
  goalTitle: goals.title,
  userName: users.name,
  goalStatus: goals.status
})
  .from(goals)
  .leftJoin(users, eq(goals.userId, users.id));

// Result: All goals, including those without users

// ========== INNER JOIN ==========
const goalsWithOwnersOnly = await db.select({
  goalTitle: goals.title,
  userName: users.name,
  goalStatus: goals.status
})
  .from(goals)
  .innerJoin(users, eq(goals.userId, users.id));

// Result: Only goals that have users

// ========== MULTIPLE JOINS ==========
const goalDetails = await db.select({
  goalTitle: goals.title,
  userName: users.name,
  sessionCount: count(sessions.id)
})
  .from(goals)
  .innerJoin(users, eq(goals.userId, users.id))
  .leftJoin(sessions, eq(users.id, sessions.userId))
  .groupBy(goals.id, users.id);
```

#### Example 9: Drizzle Relations

```typescript
// ========== DEFINE RELATIONS ==========
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  sessions: many(sessions)
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id]
  })
}));

// ========== USE RELATIONS IN QUERIES ==========
// Fetch user with all goals
const userWithGoals = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    goals: true
  }
});

// Fetch user with limited goals
const userWithRecentGoals = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    goals: {
      limit: 5,
      orderBy: [desc(goals.createdAt)]
    }
  }
});

// Fetch all users with their goal counts
const usersWithGoalCounts = await db.query.users.findMany({
  with: {
    goals: {
      columns: {
        id: true
      }
    }
  }
});
```

#### Example 10: Drizzle Transactions

```typescript
// ========== TRANSACTION FOR MULTI-STEP OPERATION ==========
await db.transaction(async (tx) => {
  // Insert new goal
  await tx.insert(goals).values({
    userId: 1,
    title: 'Run a marathon',
    targetDate: new Date('2024-12-31')
  });

  // Update user's goal count
  await tx.update(users)
    .set({ goalCount: sql`goal_count + 1` })
    .where(eq(users.id, 1));

  // Both succeed together or both fail together
});

// ========== TRANSACTION WITH ERROR HANDLING ==========
try {
  await db.transaction(async (tx) => {
    const user = await tx.insert(users).values({
      name: 'Alice',
      email: 'alice@example.com'
    }).returning();

    await tx.insert(goals).values({
      userId: user[0].id,
      title: 'First goal'
    });
  });
} catch (error) {
  console.error('Transaction failed:', error);
  // Both inserts were rolled back
}
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

### Completed: Topic 2 - Drizzle ORM ✅

- ✅ Defining table schemas with pgTable
- ✅ Foreign keys and table relationships
- ✅ INSERT queries with type safety
- ✅ SELECT queries with WHERE clauses
- ✅ UPDATE queries with helpers
- ✅ JOIN queries (left, inner)
- ✅ Defining and using relations
- ✅ Type inference from schemas

### Module Complete: 04-Database-Basics ✅

**All 2 topics completed!**

---

## Final Stats (Topics 1-2)

- **Exercises Completed**: 2
  - Exercise 1: SQL Basics (TODO 1-6 + Bonus)
  - Exercise 2: Drizzle ORM (TODO 1-6 + Bonus)
- **TODOs Completed**: 14 (12 main + 2 bonuses)
- **Mistakes Identified**: 0 (Both exercises completed cleanly!)
- **Key Concepts**: 14
- **Interview Questions**: 20
- **Code Examples**: 10
- **SQL Operations Mastered**: 6 (SELECT, INSERT, UPDATE, DELETE, JOIN, ORDER BY/LIMIT)
- **Drizzle Operations Mastered**: 6 (Schema, Relations, CRUD, Queries, Type Inference, Transactions)
- **Transaction Concepts Mastered**: 2 (SQL transactions, Drizzle transactions)

**Estimated Study Time**: ~4-6 hours
**Module 04-Database-Basics**: ✅ COMPLETE!

**Next Module**: 05-Web-Server
- Hono framework
- REST API design
- Middleware and routing

---

*This document covers Topics 1-2. 04-Database-Basics module complete!*
