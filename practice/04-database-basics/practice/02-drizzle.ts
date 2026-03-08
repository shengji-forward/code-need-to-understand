// Drizzle ORM Practice
// Run with: npx tsx 04-database-basics/practice/02-drizzle.ts

console.log("=== Drizzle ORM Practice ===\n");

// ============================================
// LEVEL 1: Schema Definition
// ============================================

console.log("--- LEVEL 1: Schema Definition ---\n");

// Import Drizzle types (conceptual - for practice)
// import { pgTable, serial, text, integer, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

console.log("Defining tables with Drizzle ORM:\n");

// Basic table definition
const usersTableExample = {
  tableName: "users",
  schema: {
    id: "serial('id').primaryKey()",
    name: "text('name').notNull()",
    email: "text('email').notNull().unique()",
    age: "integer('age')",
    isActive: "boolean('is_active').default(true)",
    createdAt: "timestamp('created_at').defaultNow()",
  },
  codeExample: `import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});`,
};
console.log("Example 1: Users table");
console.log("  Schema:", JSON.stringify(usersTableExample.schema, null, 2));
console.log("  Code:");
console.log("  ", usersTableExample.codeExample.split("\n").join("\n  "));
console.log("");

// Column types reference
const columnTypes = {
  "serial()": "Auto-incrementing integer ID",
  "text()": "Variable-length text strings",
  "integer()": "Whole numbers",
  "decimal()": "Precise decimal numbers (money)",
  "boolean()": "true/false values",
  "timestamp()": "Date and time",
  "date()": "Date without time",
  "array()": "PostgreSQL arrays",
  "json()": "JSON data",
};
console.log("Common Column Types:");
Object.entries(columnTypes).forEach(([type, description]) => {
  console.log(`  ${type}: ${description}`);
});
console.log("");

// Constraints
const constraints = {
  ".primaryKey()": "Unique identifier for each row",
  ".notNull()": "Column must have a value",
  ".unique()": "All values must be different",
  ".default(value)": "Default value if not specified",
  ".references(() => table.column)": "Foreign key to another table",
};
console.log("Constraints:");
Object.entries(constraints).forEach(([constraint, description]) => {
  console.log(`  ${constraint}: ${description}`);
});
console.log("");

// Enums
const enumExample = {
  name: "user_role",
  values: ["user", "coach", "admin"],
  codeExample: `export const userRoleEnum = pgEnum('user_role', ['user', 'coach', 'admin']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  role: userRoleEnum('role').default('user'),
  // ...
});`,
};
console.log("Enum Example:");
console.log("  Name:", enumExample.name);
console.log("  Values:", enumExample.values.join(", "));
console.log("  Code:");
console.log("  ", enumExample.codeExample.split("\n").join("\n  "));
console.log("");

// ============================================
// LEVEL 2: CRUD Operations
// ============================================

console.log("\n--- LEVEL 2: CRUD Operations ---\n");

// INSERT - add new data
const insertExample = {
  code: `import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from './schema';

const db = drizzle(pool);

// Insert single row
const newUser = await db.insert(users).values({
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
}).returning();

console.log(newUser); // [{ id: 1, name: 'Alice', email: 'alice@example.com', ... }]

// Insert multiple rows
await db.insert(users).values([
  { name: 'Bob', email: 'bob@example.com', age: 25 },
  { name: 'Charlie', email: 'charlie@example.com', age: 35 },
]);`,
  tip: "Use .returning() to get the inserted row(s) back",
};
console.log("INSERT Example:");
console.log("  ", insertExample.code.split("\n").join("\n  "));
console.log("  Tip:", insertExample.tip);
console.log("");

// SELECT - query data
const selectExample = {
  code: `import { eq, and, or, gte, lte } from 'drizzle-orm';

// Select all columns
const allUsers = await db.select().from(users);

// Select specific columns
const userEmails = await db.select({
  name: users.name,
  email: users.email,
}).from(users);

// With WHERE clause
const activeUsers = await db.select().from(users)
  .where(eq(users.isActive, true));

// Complex conditions
const users25to35 = await db.select().from(users)
  .where(
    and(
      gte(users.age, 25),
      lte(users.age, 35),
      eq(users.isActive, true)
    )
  );`,
  operators: {
    eq: "Equal to",
    ne: "Not equal to",
    gt: "Greater than",
    gte: "Greater than or equal",
    lt: "Less than",
    lte: "Less than or equal",
    and: "All conditions must be true",
    or: "At least one condition must be true",
    like: "Pattern matching",
    inArray: "Match any value in array",
  },
};
console.log("SELECT Example:");
console.log("  ", selectExample.code.split("\n").join("\n  "));
console.log("");
console.log("  Operators:");
Object.entries(selectExample.operators).forEach(([op, desc]) => {
  console.log(`    ${op}: ${desc}`);
});
console.log("");

// UPDATE - modify data
const updateExample = {
  code: `// Update single row
await db.update(users)
  .set({ age: 31 })
  .where(eq(users.id, 1));

// Update multiple columns
await db.update(users)
  .set({
    name: 'Alice Smith',
    age: 31,
    isActive: true,
  })
  .where(eq(users.email, 'alice@example.com'));

// Update with returning
const updatedUser = await db.update(users)
  .set({ lastLogin: new Date() })
  .where(eq(users.id, 1))
  .returning();`,
  warning: "⚠️  Always use .where() to update specific rows!",
};
console.log("UPDATE Example:");
console.log("  ", updateExample.code.split("\n").join("\n  "));
console.log("  ", updateExample.warning);
console.log("");

// DELETE - remove data
const deleteExample = {
  code: `// Delete specific row
await db.delete(users)
  .where(eq(users.id, 1));

// Delete with complex condition
await db.delete(users)
  .where(
    and(
      eq(users.isActive, false),
      lt(users.createdAt, new Date('2024-01-01'))
    )
  );

// Delete with returning
const deletedUsers = await db.delete(users)
  .where(eq(users.isActive, false))
  .returning();`,
  warning: "⚠️  Always use .where() or ALL rows will be deleted!",
};
console.log("DELETE Example:");
console.log("  ", deleteExample.code.split("\n").join("\n  "));
console.log("  ", deleteExample.warning);
console.log("");

// ============================================
// LEVEL 3: Advanced Features
// ============================================

console.log("\n--- LEVEL 3: Advanced Features ---\n");

// Relations - define relationships between tables
const relationsExample = {
  schema: `import { pgTable, serial, text, integer, timestamp, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  targetDate: timestamp('target_date'),
}, (table) => ({
  userIdIdx: index('goals_user_id_idx').on(table.userId),
}));`,
  relation: `import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}));`,
};
console.log("Relations Example:");
console.log("  Schema:");
console.log("    ", relationsExample.schema.split("\n").join("\n    "));
console.log("");
console.log("  Relations:");
console.log("    ", relationsExample.relation.split("\n").join("\n    "));
console.log("");

// JOINs - query related data
const joinExample = {
  code: `import { sql } from 'drizzle-orm';

// LEFT JOIN - get users with their goals (including users with 0 goals)
const usersWithGoals = await db
  .select({
    userId: users.id,
    userName: users.name,
    goalId: goals.id,
    goalTitle: goals.title,
  })
  .from(users)
  .leftJoin(goals, eq(users.id, goals.userId));

// INNER JOIN - only users with goals
const usersWithGoalsOnly = await db
  .select({
    userId: users.id,
    userName: users.name,
    goalId: goals.id,
    goalTitle: goals.title,
  })
  .from(users)
  .innerJoin(goals, eq(users.id, goals.userId));`,
  explanation: "LEFT JOIN includes all from left table, INNER JOIN only matches",
};
console.log("JOINs Example:");
console.log("  ", joinExample.code.split("\n").join("\n  "));
console.log("  Explanation:", joinExample.explanation);
console.log("");

// Transactions
const transactionExample = {
  code: `await db.transaction(async (tx) => {
  // All operations succeed or fail together
  await tx.insert(paymentLogs).values({
    userId: 1,
    amount: 99.99,
  });

  await tx.update(users)
    .set({ credits: sql\`credits - 99.99\` })
    .where(eq(users.id, 1));

  // If any operation fails, all are rolled back automatically
});`,
  useCase: "Use for money transfers, multi-step operations, critical updates",
};
console.log("TRANSACTION Example:");
console.log("  ", transactionExample.code.split("\n").join("\n  "));
console.log("  Use case:", transactionExample.useCase);
console.log("");

// Migrations
const migrationExample = {
  generate: "npx drizzle-kit generate:pg", // Generate migration from schema
  migrate: "npx drizzle-kit push:pg", // Push schema changes to database
  studio: "npx drizzle-kit studio", // Visual database browser
  explanation: "Drizzle tracks schema changes and generates SQL migrations",
};
console.log("Migrations:");
Object.entries(migrationExample).forEach(([cmd, desc]) => {
  console.log(`  ${cmd}: ${desc}`);
});
console.log("");

// Type inference - Drizzle is fully type-safe!
const typeInferenceExample = {
  explanation: "Drizzle automatically infers types from your schema",
  code: `// TypeScript knows the exact type!
type User = typeof users.$inferSelect; // { id: number, name: string, ... }
type NewUser = typeof users.$inferInsert; // { id?: number, name: string, ... }

const user: User = await db
  .select()
  .from(users)
  .where(eq(users.id, 1))
  .then(rows => rows[0]!);

// TypeScript will error if you try to access non-existent columns
console.log(user.name); // ✅ OK
// console.log(user.nonExistentColumn); // ❌ TypeScript error!`,
  benefit: "Catch errors at compile time, not runtime",
};
console.log("Type Inference:");
console.log("  ", typeInferenceExample.explanation);
console.log("  ", typeInferenceExample.code.split("\n").join("\n  "));
console.log("  Benefit:", typeInferenceExample.benefit);
console.log("");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===\n");

console.log("✅ Schema Design:");
console.log("  - Use descriptive column names (snake_case)");
console.log("  - Add .notNull() where appropriate");
console.log("  - Use .unique() for natural keys (email, username)");
console.log("  - Define foreign keys with .references()");
console.log("  - Add indexes on frequently queried columns");
console.log("");

console.log("✅ Query Building:");
console.log("  - Use the helper functions (eq, and, or) instead of raw SQL");
console.log("  - Use .returning() to get inserted/updated/deleted rows");
console.log("  - Always use .where() in UPDATE and DELETE operations");
console.log("  - Select only columns you need, not all columns");
console.log("");

console.log("✅ Type Safety:");
console.log("  - Let Drizzle infer types from schema");
console.log("  - Use typeof table.$inferSelect for return types");
console.log("  - Use typeof table.$inferInsert for input types");
console.log("  - Leverage TypeScript autocomplete");
console.log("");

console.log("✅ Migrations:");
console.log("  - Generate migrations before schema changes");
console.log("  - Review generated SQL before applying");
console.log("  - Keep migrations in version control");
console.log("  - Test migrations on staging first");
console.log("");

console.log("✅ Performance:");
console.log("  - Use indexes on foreign keys and filter columns");
console.log("  - Prefer JOINs over N+1 queries");
console.log("  - Use transactions for multi-step operations");
console.log("  - Consider connection pooling for production");
console.log("");

console.log("\n✅ Practice complete!");

export {};
