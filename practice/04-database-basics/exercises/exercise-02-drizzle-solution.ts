// SOLUTION: Exercise 2 - Drizzle ORM
// Compare with your work to see how you did!

console.log("=== Exercise 2: Drizzle ORM (Solution) ===\n");

// We're building a health coaching app with these tables:
// - users (id, name, email, age, created_at)
// - goals (id, user_id, title, target_date, status)

// ============================================
// SOLUTION 1: Define a users table schema
// ============================================

import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  age: integer("age"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

console.log("--- SOLUTION 1: Users Table Schema ---");
console.log("Schema definition:");
console.log(`
import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});
`);
console.log("Explanation:");
console.log("  - pgTable('users', {...}): Creates a PostgreSQL table");
console.log("  - serial('id').primaryKey(): Auto-incrementing ID as primary key");
console.log("  - text('name').notNull(): Required text column");
console.log("  - text('email').notNull().unique(): Required unique email");
console.log("  - integer('age'): Optional integer (no .notNull())");
console.log("  - timestamp('created_at').defaultNow(): Defaults to current timestamp");
console.log("");

// ============================================
// SOLUTION 2: Define a goals table with foreign key
// ============================================

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  targetDate: timestamp("target_date"),
  status: text("status").default("pending"),
});

console.log("--- SOLUTION 2: Goals Table Schema ---");
console.log("Schema definition:");
console.log(`
export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  targetDate: timestamp('target_date'),
  status: text('status').default('pending'),
});
`);
console.log("Explanation:");
console.log("  - userId: Integer column with foreign key reference");
console.log("  - .references(() => users.id): Links to users.id");
console.log("  - .notNull(): Every goal must belong to a user");
console.log("  - .default('pending'): New goals start as pending");
console.log("");

// ============================================
// SOLUTION 3: Write an insert query using Drizzle
// ============================================

console.log("--- SOLUTION 3: Insert Query ---");
console.log("Code:");
console.log(`
const insertUser = async (db) => {
  const newUser = await db.insert(users).values({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30,
  }).returning();

  return newUser;
};

// Result: [{ id: 1, name: 'Alice', email: 'alice@example.com', age: 30, ... }]
`);
console.log("Explanation:");
console.log("  - db.insert(users): Insert into users table");
console.log("  - .values({...}): Provide the data to insert");
console.log("  - .returning(): Get back the inserted row with its ID");
console.log("  - TypeScript infers the type from the schema!");
console.log("");

// Alternative: Insert multiple users
console.log("Bonus: Insert multiple rows");
console.log(`
await db.insert(users).values([
  { name: 'Alice', email: 'alice@example.com', age: 30 },
  { name: 'Bob', email: 'bob@example.com', age: 25 },
  { name: 'Charlie', email: 'charlie@example.com', age: 35 },
]);
`);
console.log("");

// ============================================
// SOLUTION 4: Write a select query with where clause
// ============================================

console.log("--- SOLUTION 4: Select Query with WHERE ---");
console.log("Code:");
console.log(`
import { gt, and } from 'drizzle-orm';

const getUsersOlderThan25 = async (db) => {
  return await db
    .select({
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(gt(users.age, 25));
};
`);
console.log("Explanation:");
console.log("  - .select({ name, email }): Choose specific columns");
console.log("  - .from(users): Specify the table");
console.log("  - .where(gt(users.age, 25)): Filter where age > 25");
console.log("  - gt() is a helper for 'greater than'");
console.log("");

// More helper functions
console.log("Common comparison helpers:");
console.log(`
import { eq, ne, gt, gte, lt, lte, and, or, inArray } from 'drizzle-orm';

eq(users.age, 25)          // age = 25
ne(users.age, 25)          // age != 25
gt(users.age, 25)          // age > 25
gte(users.age, 25)         // age >= 25
lt(users.age, 25)          // age < 25
lte(users.age, 25)         // age <= 25
and(gt(users.age, 25), lt(users.age, 35))  // age > 25 AND age < 35
or(eq(users.age, 25), eq(users.age, 30))   // age = 25 OR age = 30
inArray(users.age, [25, 30, 35])           // age IN (25, 30, 35)
`);
console.log("");

// ============================================
// SOLUTION 5: Write an update query
// ============================================

console.log("--- SOLUTION 5: Update Query ---");
console.log("Code:");
console.log(`
import { eq } from 'drizzle-orm';

const updateUserEmail = async (db) => {
  return await db
    .update(users)
    .set({ email: 'newemail@example.com' })
    .where(eq(users.id, 1));
};
`);
console.log("Explanation:");
console.log("  - .update(users): Update users table");
console.log("  - .set({...}): Columns to update and their new values");
console.log("  - .where(eq(users.id, 1)): ⚠️  CRITICAL - only update user 1");
console.log("  - Without WHERE, ALL users would get this email!");
console.log("");

// Alternative: Update with returning
console.log("Bonus: Update with returning");
console.log(`
const updatedUser = await db
  .update(users)
  .set({ email: 'newemail@example.com' })
  .where(eq(users.id, 1))
  .returning();

// Result: [{ id: 1, name: 'Alice', email: 'newemail@example.com', ... }]
`);
console.log("");

// ============================================
// SOLUTION 6: Write a join query between users and goals
// ============================================

console.log("--- SOLUTION 6: JOIN Query ---");
console.log("Code:");
console.log(`
import { eq } from 'drizzle-orm';

const goalsWithOwner = async (db) => {
  return await db
    .select({
      goalTitle: goals.title,
      userName: users.name,
      goalStatus: goals.status,
    })
    .from(goals)
    .leftJoin(users, eq(goals.userId, users.id));
};
`);
console.log("Explanation:");
console.log("  - .from(goals): Start from goals table");
console.log("  - .leftJoin(users, ...): Join users table (includes goals without users)");
console.log("  - eq(goals.userId, users.id): Match where userId = id");
console.log("  - Select columns from both tables with custom names");
console.log("");

// Alternative: INNER JOIN (only goals with users)
console.log("Alternative: INNER JOIN");
console.log(`
const goalsWithOwnerInner = async (db) => {
  return await db
    .select({
      goalTitle: goals.title,
      userName: users.name,
      goalStatus: goals.status,
    })
    .from(goals)
    .innerJoin(users, eq(goals.userId, users.id));
};

// INNER JOIN only returns goals that have a matching user
// LEFT JOIN returns all goals, even if user is deleted
`);
console.log("");

// ============================================
// BONUS SOLUTION: Define relations
// ============================================

console.log("--- BONUS SOLUTION: Define Relations ---");
console.log("Code:");
console.log(`
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}));
`);
console.log("Explanation:");
console.log("  - usersRelations: Define relationships FROM users");
console.log("  - many(goals): One user has many goals");
console.log("  - goalsRelations: Define relationships FROM goals");
console.log("  - one(users): One goal belongs to one user");
console.log("  - fields: [goals.userId]: The foreign key column");
console.log("  - references: [users.id]: The primary key it references");
console.log("");

// Using relations in queries
console.log("Using relations in queries:");
console.log(`
import { relations } from 'drizzle-orm';

// Fetch user with all their goals
const userWithGoals = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    goals: true, // Include all goals for this user
  },
});

// Result:
// {
//   id: 1,
//   name: 'Alice',
//   email: 'alice@example.com',
//   goals: [
//     { id: 1, userId: 1, title: 'Lose weight', ... },
//     { id: 2, userId: 1, title: 'Exercise more', ... },
//   ]
// }
`);
console.log("");

// ============================================
// Additional Examples: Production Patterns
// ============================================

console.log("--- Bonus: Production Patterns ---\n");

// Transactions
console.log("1. Transactions (atomic operations):");
console.log(`
await db.transaction(async (tx) => {
  // Insert a new goal
  await tx.insert(goals).values({
    userId: 1,
    title: 'Run a marathon',
    targetDate: new Date('2024-12-31'),
  });

  // Update user's goal count
  await tx.update(users)
    .set({ goalCount: sql\`goal_count + 1\` })
    .where(eq(users.id, 1));

  // Both succeed together or both fail together
});
`);
console.log("");

// Type inference
console.log("2. Type Safety (TypeScript inference):");
console.log(`
// Drizzle automatically infers types!
type User = typeof users.$inferSelect;
// { id: number, name: string, email: string, age: number | null, ... }

type NewUser = typeof users.$inferInsert;
// { id?: number, name: string, email: string, age?: number, ... }

// Use in function signatures
const createUser = async (user: NewUser) => {
  return await db.insert(users).values(user).returning();
};

// TypeScript validates at compile time!
createUser({ name: 'Bob', email: 'bob@example.com' }); // ✅ OK
createUser({ name: 'Bob' }); // ❌ TypeScript error: email required!
`);
console.log("");

// Complex queries
console.log("3. Complex Queries (aggregation):");
console.log(`
import { sql, gt, count, avg } from 'drizzle-orm';

const userGoalStats = await db
  .select({
    userName: users.name,
    goalCount: count(goals.id),
    completedGoals: count(sql\`CASE WHEN ${goals.status} = 'completed' THEN 1 END\`),
  })
  .from(users)
  .leftJoin(goals, eq(users.id, goals.userId))
  .groupBy(users.id)
  .having(gt(count(goals.id), 0))
  .orderBy(sql\`count(${goals.id}) DESC\`);

// Result: Users sorted by number of goals (most first)
`);
console.log("");

// Indexes
console.log("4. Indexes (for performance):");
console.log(`
import { pgTable, serial, text, integer, index } from 'drizzle-orm/pg-core';

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id").references(() => users.id),
  title: text('title'),
  targetDate: timestamp('target_date'),
}, (table) => ({
  userIdIdx: index('goals_user_id_idx').on(table.userId),
  targetDateIdx: index('goals_target_date_idx').on(table.targetDate),
}));

// Indexes make queries filtering by these columns MUCH faster
`);
console.log("");

console.log("\n✅ Exercise complete!");
console.log("\nKey takeaways:");
console.log("  ✅ Define schemas with pgTable() and column helpers");
console.log("  ✅ Use .insert(), .select(), .update(), .delete() for CRUD");
console.log("  ✅ Use helper functions (eq, gt, and, or) for queries");
console.log("  ✅ Join tables with .leftJoin() and .innerJoin()");
console.log("  ✅ Define relations to easily query related data");
console.log("  ✅ Transactions ensure data consistency");
console.log("  ✅ TypeScript types are automatically inferred!");

export {};
