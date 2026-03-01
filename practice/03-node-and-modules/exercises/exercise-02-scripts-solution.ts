// SOLUTION: Exercise 2 - npm Scripts
// Compare with your work to see how you did!

console.log("=== Exercise 2: npm Scripts (Solution) ===\n");

// ============================================
// SOLUTION 1: package.json Structure
// ============================================

console.log("=== package.json Structure ===\n");

const packageJson = {
  name: "my-awesome-project",
  version: "1.0.0",
  description: "A sample Node.js project",
  main: "dist/index.js",
  type: "module",
  scripts: {
    start: "node dist/index.js",
    dev: "tsx watch src/index.ts",
    build: "tsc",
    test: "jest",
    lint: "eslint .",
    format: "prettier --write .",
  },
  dependencies: {
    express: "^4.18.0",
    axios: "^1.6.0",
  },
  devDependencies: {
    typescript: "^5.3.0",
    tsx: "^4.7.0",
    jest: "^29.7.0",
    eslint: "^8.56.0",
    prettier: "^3.1.0",
  },
};

console.log("Example package.json:");
console.log(JSON.stringify(packageJson, null, 2));

// ============================================
// SOLUTION 2: Semantic Versioning
// ============================================

console.log("\n=== Semantic Versioning ===\n");

console.log("1.0.0 → 1.0.1 (PATCH):");
console.log("  Bug fix - backward compatible, no new features");
console.log("  Example: Fixed a crash when user provides empty input");

console.log("\n1.0.0 → 1.1.0 (MINOR):");
console.log("  New feature - backward compatible");
console.log("  Example: Added dark mode support to UI");

console.log("\n1.0.0 → 2.0.0 (MAJOR):");
console.log("  Breaking changes - may require code updates");
console.log("  Example: Renamed function 'getUser' to 'fetchUser'");

// ============================================
// SOLUTION 3: Classify Dependencies
// ============================================

console.log("\n=== Dependency Classification ===\n");

const productionDeps = ["express", "react", "lodash", "axios", "mongoose"];
const devDeps = ["typescript", "jest", "eslint", "prettier", "nodemon"];

console.log("Production dependencies (needed in production):");
productionDeps.forEach((dep) => console.log(`  - ${dep}`));

console.log("\nDev dependencies (only for development):");
devDeps.forEach((dep) => console.log(`  - ${dep}`));

console.log("\nKey difference:");
console.log("  Production: npm install <package>");
console.log("  Dev: npm install --save-dev <package>");

// ============================================
// SOLUTION 4: Version Ranges
// ============================================

console.log("\n=== Version Ranges ===\n");

console.log("^1.2.3 (Caret - most common):");
console.log("  Allows: 1.2.3 to 1.x.x (but not 2.0.0)");
console.log("  Example: ^1.2.3 matches 1.2.3, 1.3.0, 1.9.9");
console.log("  Example: ^1.2.3 does NOT match 2.0.0");

console.log("\n~1.2.3 (Tilde):");
console.log("  Allows: 1.2.3 to 1.2.x (patch updates only)");
console.log("  Example: ~1.2.3 matches 1.2.3, 1.2.4, 1.2.5");
console.log("  Example: ~1.2.3 does NOT match 1.3.0");

console.log("\n1.2.3 (Exact):");
console.log("  Allows: Only 1.2.3 exactly");
console.log("  Use case: When you need exact version control");

console.log("\n* (Wildcard):");
console.log("  Allows: Any version");
console.log("  WARNING: NOT recommended for production!");

// ============================================
// SOLUTION 5: Lifecycle Scripts
// ============================================

console.log("\n=== Lifecycle Scripts ===\n");

const lifecycleScripts = [
  {
    name: "preinstall",
    runs: "Before npm install",
    useCase: "Check Node.js version, create necessary directories",
  },
  {
    name: "postinstall",
    runs: "After npm install",
    useCase: "Build assets, setup database, run migrations",
  },
  {
    name: "prestart",
    runs: "Before npm start",
    useCase: "Validate environment variables, create logs directory",
  },
];

lifecycleScripts.forEach(({ name, runs, useCase }) => {
  console.log(`${name}:`);
  console.log(`  Runs: ${runs}`);
  console.log(`  Use case: ${useCase}`);
  console.log("");
});

// ============================================
// BONUS SOLUTION
// ============================================

console.log("=== BONUS: npm Commands ===\n");

console.log("npm install:");
console.log("  - Reads package.json");
console.log("  - Downloads missing packages");
console.log("  - Updates package-lock.json if needed");
console.log("  - Use for: Local development, adding new packages");

console.log("\nnpm ci (clean install):");
console.log("  - ONLY reads package-lock.json");
console.log("  - Deletes node_modules first");
console.log("  - Installs exact versions from lock file");
console.log("  - Use for: CI/CD pipelines, production deployments");

console.log("\nnpm update:");
console.log("  - Updates packages within their version ranges");
console.log("  - Updates package-lock.json");
console.log("  - Does NOT update major versions (^1.2.3 won't go to 2.0.0)");
console.log("  - Use for: Keeping dependencies updated safely");

console.log("\nRecommended workflow:");
console.log("  1. Local dev: npm install");
console.log("  2. CI/CD: npm ci");
console.log("  3. Regular updates: npm update");
console.log("  4. Major upgrades: Manual install and test");

// ============================================
// Summary
// ============================================

console.log("\n=== Summary ===");
console.log("✅ package.json: Project metadata and dependencies");
console.log("✅ Semantic versioning: MAJOR.MINOR.PATCH");
console.log("✅ Dependencies: Production vs Development");
console.log("✅ Version ranges: ^ (caret) for most cases");
console.log("✅ Lifecycle scripts: Run automatically by npm");
console.log("✅ npm ci: Use in CI/CD for reproducible builds");

console.log("\n✅ Exercise complete!");
export {};
