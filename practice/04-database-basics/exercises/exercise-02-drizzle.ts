// EXERCISE 2: Drizzle ORM
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 04-database-basics/exercises/exercise-02-drizzle.ts

console.log("=== Exercise 2: Drizzle ORM ===\n");

// We're building a health coaching app with these tables:
// - users (id, name, email, age, created_at)
// - goals (id, user_id, title, target_date, status)

// ============================================
// TODO 1: Define a users table schema
// ============================================
// Instructions:
// - Import the necessary Drizzle functions
// - Define a users table with these columns:
//   - id: serial, primary key
//   - name: text, not null
//   - email: text, not null, unique
//   - age: integer (optional)
//   - created_at: timestamp, default NOW()

// TODO: Your code here

import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  created_at: timestamp('created_at').defaultNow()
});


console.log("--- TODO 1: Users Table Schema ---");
console.log("Define a users table schema");
console.log("Expected: Table with id, name, email, age, created_at columns");
console.log("");

// ============================================
// TODO 2: Define a goals table with foreign key
// ============================================
// Instructions:
// - Define a goals table with these columns:
//   - id: serial, primary key
//   - userId: integer, foreign key references users.id
//   - title: text, not null
//   - targetDate: timestamp
//   - status: text, default 'pending'

// TODO: Your code here

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  targetDate: timestamp('target_date'),
  status: text('status').default('pending')
});


console.log("--- TODO 2: Goals Table Schema ---");
console.log("Define a goals table with foreign key to users");
console.log("Expected: Table with id, userId, title, targetDate, status columns");
console.log("Hint: Use .references(() => users.id) for foreign key");
console.log("");

// ============================================
// TODO 3: Write an insert query using Drizzle
// ============================================
// Instructions:
// - Write a Drizzle insert query to add a new user
// - The user should have: name = 'Alice', email = 'alice@example.com', age = 30

// TODO: Your code here

const insertUserQuery = async (db: DrizzleDB) => {
  return await db.insert(users).values({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30
  });
};


const insertUserExample = `
  db.insert(users).values({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30
  })
`;

console.log("--- TODO 3: Insert Query ---");
console.log("Write a Drizzle insert query");
console.log(insertUserExample);
console.log("Expected: Insert a new user with name, email, and age");
console.log("Hint: Use .values() with the user data");
console.log("");

// ============================================
// TODO 4: Write a select query with where clause
// ============================================
// Instructions:
// - Write a query to fetch users older than 25
// - Use the gt (greater than) helper from Drizzle
// - Select only the name and email columns

// TODO: Your code here
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

const selectExample = `
  db
  .select({
    name: users.name,
    email: users.email
    })
  .from(users)
  .where(gt(users.age, 25));
`;

console.log("--- TODO 4: Select Query with WHERE ---");
console.log("Write a select query for users older than 25");
console.log(selectExample);
console.log("Expected: Query fetching name and email for users > 25");
console.log("Hint: Use .select(), .from(), .where() with gt()");
console.log("");

// ============================================
// TODO 5: Write an update query
// ============================================
// Instructions:
// - Write an update query to change a user's email
// - Update user with id = 1 to have email = 'newemail@example.com'
// - Use the eq helper for equality

// TODO: Your code here

import { eq } from 'drizzle-orm';

const updateUserEmail = async (db: DrizzleDB) => {
  return await db
    .update(users)
    .set({
      email: 'newemail@example.com'
    })
    .where(eq(users.id, 1));
};

const updateExample = `
  db.update(users)
    .set({ email: 'newemail@example.com' })
    .where(eq(users.id, 1));
`;

console.log("--- TODO 5: Update Query ---");
console.log("Write an update query to change user's email");
console.log(updateExample);
console.log("Expected: Update email for user with id = 1");
console.log("Hint: Use .update(), .set(), .where() with eq()");
console.log("");

// ============================================
// TODO 6: Write a join query between users and goals
// ============================================
// Instructions:
// - Write a query to get all goals with their owner's name
// - Use leftJoin to combine goals and users tables
// - Select: goals.title, users.name, goals.status

// TODO: Your code here
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

const joinExample = `
  db.select({
      title: goals.title, 
      name: users.name, 
      status: goals.status
    })
    .from(goals)
    .leftJoin(users, eq(goals.userId, users.id));
  };
`;

console.log("--- TODO 6: JOIN Query ---");
console.log("Write a join query to get goals with owner names");
console.log(joinExample);
console.log("Expected: Query joining goals and users tables");
console.log("Hint: Use .leftJoin() with eq() on the foreign key");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Define a relation between users and goals
// - Users have many goals (one-to-many relationship)
// - Goals belong to one user
// - Use the relations() function from Drizzle

// TODO: Your code here
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

const relationExample = `
  // Your code here
`;

console.log("--- BONUS: Define Relations ---");
console.log("Define relations between users and goals");
console.log(relationExample);
console.log("Expected: Users have many goals, goals belong to one user");
console.log("Hint: Use many(goals) for users, one(users) for goals");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-02-drizzle-solution.ts");

export {};
