// EXERCISE 2: npm Scripts
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-02-scripts.ts

console.log("=== Exercise 2: npm Scripts ===\n");

// ============================================
// TODO 1: Create a package.json structure
// ============================================
// Instructions:
// - Create an object representing a package.json
// - Include: name, version, type, scripts, dependencies, devDependencies
// - Add at least 3 scripts: start, dev, build

// TODO: Your code here
const packageJson = {
  name: "my-porject",
  version: "1.0.0",
  type: "module",
  scripts: {
    start: "npx tsx index.ts", 
    dev: "npx tsx watch index.ts",
    build: "tsc",
  },
  dependencies: {
    express: "^4.18.0"
  },
  devDependencies: {
    typescript: "^5.0.0"
  }
}

// ============================================
// TODO 2: Explain semantic versioning
// ============================================
// Instructions:
// - For each version below, explain what type of change it represents
// - 1.0.0 → 1.0.1
// - 1.0.0 → 1.1.0
// - 1.0.0 → 2.0.0

// TODO: Your code here (as comments)
// - 1.0.0 → 1.0.1 = PATCH changed
// - 1.0.0 → 1.1.0 = MINOR changed
// - 1.0.0 → 2.0.0 = MAJOR changed

// ============================================
// TODO 3: Classify dependencies
// ============================================
// Instructions:
// - Given these packages, classify them as production or dev dependencies:
//   - typescript, jest, eslint, prettier, nodemon
//   - express, react, lodash, axios, mongoose
// - Create two arrays: productionDeps and devDeps

// TODO: Your code here
const productionDeps = ["express", "react", "lodash", "axios", "mongoose"]
const devDeps = ["typescript", "jest", "eslint", "prettier", "nodemon"]

// ============================================
// TODO 4: Explain version ranges
// ============================================
// Instructions:
// - Explain what each version range allows:
//   - "^1.2.3"
//   - "~1.2.3"
//   - "1.2.3"
//   - "*"

// TODO: Your code here (as comments)
//   - "^1.2.3" = >=1.2.3 <2.0.0 — same major, any minor/patch
//   - "~1.2.3" = >=1.2.3 <1.3.0 — same major+minor, any patch
//   - "1.2.3" = exactly 1.2.3 only
//   - "*" = any version (avoid in production — too unpredictable)

// ============================================
// TODO 5: Lifecycle scripts
// ============================================
// Instructions:
// - List 3 npm lifecycle scripts
// - Explain when each one runs
// - Give an example use case for each

// TODO: Your code here (as comments)
// 1. preinstall
//    Runs: Before npm install
//    Use case: Check Node.js version, create necessary directories

// 2. postinstall
//    Runs: After npm install
//    Use case: Build assets, setup database, run migrations

// 3. prestart
//    Runs: Before npm start
//    Use case: Validate environment variables, create logs directory

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Explain the difference between:
//   - npm install
//   - npm ci
//   - npm update
// - When would you use each command?

// TODO: Your code here (as comments)
// npm install
// Reads package.json, installs missing packages
// Updates package-lock.json if needed
// Use: local development, after adding a new package

// npm ci (clean install)
// Reads package-lock.json only (ignores package.json ranges)
// Deletes node_modules first, then installs exact versions
// Fails if package-lock.json is missing or out of sync
// Use: CI/CD pipelines, production builds — guarantees reproducible installs

// npm update
// Updates packages to the latest version allowed by the ^/~ ranges in package.json
// Updates package-lock.json with new versions
// Use: when you want to pull in latest bug fixes/features within your version constraints

console.log("\n✅ Exercise complete!");
export {};
