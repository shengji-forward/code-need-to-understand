// Environment Variables
// Run with: npx tsx 03-env-vars.ts

console.log("=== Environment Variables ===\n");

// ============================================
// LEVEL 1: Basics
// ============================================

console.log("=== LEVEL 1: Reading Environment Variables ===\n");

// process.env contains all environment variables
// It's provided by Node.js automatically

// Reading environment variables
const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT;

console.log("Environment Variables:");
console.log("  NODE_ENV:", nodeEnv ?? "not set");
console.log("  PORT:", port ?? "not set");
console.log("  HOME:", process.env.HOME);

// All env vars are strings (or undefined)
console.log("\nType of process.env.PORT:", typeof process.env.PORT);

// ============================================
// LEVEL 2: Type-Safe Environment Variables
// ============================================

console.log("\n=== LEVEL 2: Type-Safe Patterns ===\n");

// Problem: process.env values are always strings
// Solution: Parse and validate with defaults

// BAD: No validation, no defaults
// const dbPort = process.env.DB_PORT; // could be undefined!

// GOOD: With default and type conversion
const dbPort = Number(process.env.DB_PORT || 5432);
console.log("\nDatabase port (with default):", dbPort);

// BETTER: Validate at startup
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return defaultValue;
  }
  return value;
}

// Examples of type-safe config
const config = {
  // Required vars (will throw if missing)
  DATABASE_URL: getEnvVar("DATABASE_URL"),

  // Optional vars with defaults
  PORT: Number(getEnvVar("PORT", "3000")),
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  LOG_LEVEL: getEnvVar("LOG_LEVEL", "info"),
};

console.log("\nType-safe configuration:");
console.log("  PORT:", config.PORT);
console.log("  NODE_ENV:", config.NODE_ENV);
console.log("  LOG_LEVEL:", config.LOG_LEVEL);

// ============================================
// LEVEL 3: Config Module Pattern
// ============================================

console.log("\n=== LEVEL 3: Production Config Pattern ===\n");

// In a real app, create a dedicated config module
// This pattern validates ALL env vars at startup

interface AppConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  redisUrl?: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

function loadConfig(): AppConfig {
  // Required env vars
  const requiredVars = ["DATABASE_URL"] as const;

  // Check all required vars
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`❌ Missing required env var: ${varName}`);
    }
  }

  return {
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || "development",
    databaseUrl: process.env.DATABASE_URL!,
    redisUrl: process.env.REDIS_URL,
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV !== "production",
  };
}

// Load config at startup
try {
  const appConfig = loadConfig();
  console.log("✅ Config loaded successfully:");
  console.log("  Port:", appConfig.port);
  console.log("  Environment:", appConfig.nodeEnv);
  console.log("  Is Production:", appConfig.isProduction);
  console.log("  Is Development:", appConfig.isDevelopment);
  console.log("  Database URL:", appConfig.databaseUrl.replace(/:.+@/, ":***@")); // Hide password
} catch (error) {
  console.error(error);
}

// ============================================
// Security Best Practices
// ============================================

console.log("\n=== Security Best Practices ===\n");

console.log("🔒 Security Rules:");
console.log("  1. NEVER commit .env files to git");
console.log("  2. Always use .env.example as template");
console.log("  3. Validate env vars at startup");
console.log("  4. Provide sensible defaults");
console.log("  5. Never log sensitive data");
console.log("  6. Use different env vars per environment");

console.log("\n📁 .env file structure:");
console.log("  # Database");
console.log("  DATABASE_URL=postgresql://user:pass@localhost:5432/db");
console.log("");
console.log("  # Server");
console.log("  PORT=3000");
console.log("  NODE_ENV=development");
console.log("");
console.log("  # API Keys");
console.log("  API_KEY=sk_live_abc123");
console.log("  STRIPE_SECRET_KEY=sk_live_xyz789");

console.log("\n📁 .env.example file (commit this!):");
console.log("  # Database");
console.log("  DATABASE_URL=");
console.log("");
console.log("  # Server");
console.log("  PORT=3000");
console.log("  NODE_ENV=development");
console.log("");
console.log("  # API Keys");
console.log("  API_KEY=");
console.log("  STRIPE_SECRET_KEY=");

// Environment-specific .env files
console.log("\n🔧 Environment-specific files:");
console.log("  .env                # Local development (don't commit)");
console.log("  .env.development    # Shared dev config");
console.log("  .env.production     # Production config");
console.log("  .env.test           # Test environment");
console.log("  .env.example        # Template (commit this!)");

// Common mistake: Not validating at startup
console.log("\n⚠️ Common Mistake:");
console.log("  // BAD: Checking during runtime");
console.log("  function getData() {");
console.log("    if (!process.env.API_KEY) {");
console.log("      throw new Error('API_KEY missing');  // Too late!");
console.log("    }");
console.log("  }");

console.log("\n✅ Better:");
console.log("  // Validate at startup");
console.log("  const config = loadConfig();  // Throws immediately if missing");
console.log("  function getData() {");
console.log("    return fetch(config.apiUrl);");
console.log("  }");

// ============================================
// Best Practices Summary
// ============================================

console.log("\n=== Best Practices ===");

console.log("\n✅ DO:");
console.log("  • Create a .env.example template");
console.log("  • Validate env vars at application startup");
console.log("  • Use a dedicated config module");
console.log("  • Provide sensible defaults for optional vars");
console.log("  • Type-convert env vars (string → number)");
console.log("  • Hide sensitive data in logs");
console.log("  • Use different env files per environment");

console.log("\n❌ DON'T:");
console.log("  • Don't commit .env files");
console.log("  • Don't wait until runtime to validate");
console.log("  • Don't assume env vars exist");
console.log("  • Don't log passwords or API keys");
console.log("  • Don't hardcode config values");
console.log("  • Don't use process.env directly everywhere");

console.log("\n📦 Config Module Template:");
console.log("  // config.ts");
console.log("  interface Config {");
console.log("    port: number;");
console.log("    databaseUrl: string;");
console.log("  }");
console.log("  ");
console.log("  export const config: Config = loadConfig();");
console.log("  ");
console.log("  // In other files:");
console.log("  import { config } from './config.ts';");
console.log("  console.log(config.port);");

console.log("\n✅ Practice complete!");
