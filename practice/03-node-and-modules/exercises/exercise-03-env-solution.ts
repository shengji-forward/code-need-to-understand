// SOLUTION: Exercise 3 - Environment Variables
// Compare with your work to see how you did!

console.log("=== Exercise 3: Environment Variables (Solution) ===\n");

// ============================================
// SOLUTION 1: Read Environment Variables
// ============================================

console.log("=== Reading Environment Variables ===\n");

const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT;

console.log("NODE_ENV:", nodeEnv ?? "not set (default: development)");
console.log("PORT:", port ?? "not set (default: 3000)");

// ============================================
// SOLUTION 2: getEnvVar Helper Function
// ============================================

console.log("\n=== getEnvVar Helper ===\n");

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    console.log(`Using default value for ${key}: ${defaultValue}`);
    return defaultValue;
  }

  throw new Error(`Missing required environment variable: ${key}`);
}

// Examples
console.log("NODE_ENV:", getEnvVar("NODE_ENV", "development"));
console.log("PORT:", getEnvVar("PORT", "3000"));

// This would throw if DATABASE_URL is not set:
// try {
//   const dbUrl = getEnvVar("DATABASE_URL");
//   console.log("DATABASE_URL:", dbUrl);
// } catch (error) {
//   console.error(error);
// }

// ============================================
// SOLUTION 3: Type-Safe Config Object
// ============================================

console.log("\n=== Type-Safe Config ===\n");

interface AppConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
}

const config: AppConfig = {
  port: Number(getEnvVar("PORT", "3000")),
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  databaseUrl: getEnvVar("DATABASE_URL", "postgresql://localhost:5432/mydb"),
};

console.log("Config:");
console.log("  port:", config.port, "(type:", typeof config.port + ")");
console.log("  nodeEnv:", config.nodeEnv);
console.log("  databaseUrl:", config.databaseUrl);

// ============================================
// SOLUTION 4: Validation at Startup
// ============================================

console.log("\n=== Validation at Startup ===\n");

const requiredEnvVars = ["DATABASE_URL", "API_KEY"] as const;

function validateEnvVars(): void {
  const missing: string[] = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  console.log("✅ All required environment variables are set");
}

// Try to validate (will likely fail since we haven't set these)
try {
  validateEnvVars();
} catch (error) {
  console.error("❌", (error as Error).message);
}

// ============================================
// SOLUTION 5: Secure Logging
// ============================================

console.log("\n=== Secure Logging ===\n");

function safeLogUrl(url: string): string {
  // Hide password in URLs like:
  // postgresql://user:password@host:5432/db
  // https://user:api-key@api.example.com
  return url.replace(/:([^@]+)@/, ":***@");
}

function logConfig(config: Record<string, string>): void {
  const safeConfig: Record<string, string> = {};

  for (const [key, value] of Object.entries(config)) {
    // Hide sensitive data for keys that might contain passwords/keys
    const sensitiveKeys = ["password", "secret", "key", "token"];
    const isSensitive = sensitiveKeys.some((sk) =>
      key.toLowerCase().includes(sk)
    );

    if (isSensitive) {
      safeConfig[key] = "***";
    } else if (value.includes("://") && value.includes("@")) {
      safeConfig[key] = safeLogUrl(value);
    } else {
      safeConfig[key] = value;
    }
  }

  console.log("Configuration:");
  for (const [key, value] of Object.entries(safeConfig)) {
    console.log(`  ${key}: ${value}`);
  }
}

// Example usage
const exampleConfig = {
  DATABASE_URL: "postgresql://user:secret123@localhost:5432/mydb",
  API_KEY: "sk_live_abc123xyz789",
  PORT: "3000",
  NODE_ENV: "production",
};

logConfig(exampleConfig);

// ============================================
// BONUS SOLUTION: Complete Config Module
// ============================================

console.log("\n=== BONUS: Config Module Pattern ===\n");

interface CompleteConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  redisUrl?: string;
  apiKey: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
}

function loadConfig(): CompleteConfig {
  // Validate required vars first
  const required = ["DATABASE_URL", "API_KEY"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }

  const nodeEnv = getEnvVar("NODE_ENV", "development");

  return {
    port: Number(getEnvVar("PORT", "3000")),
    nodeEnv,
    databaseUrl: getEnvVar("DATABASE_URL"),
    redisUrl: process.env.REDIS_URL,
    apiKey: getEnvVar("API_KEY"),
    isProduction: nodeEnv === "production",
    isDevelopment: nodeEnv !== "production" && nodeEnv !== "test",
    isTest: nodeEnv === "test",
  };
}

// Example usage (simulated with defaults)
console.log("Config module provides:");
console.log("  - Validation at startup");
console.log("  - Type-safe access");
console.log("  - Convenient boolean helpers");
console.log("  - Singleton export pattern");

// Simulated config output
console.log("\nExample config output:");
console.log("  port: 3000");
console.log("  nodeEnv: 'development'");
console.log("  databaseUrl: 'postgresql://user:***@localhost:5432/mydb'");
console.log("  isProduction: false");
console.log("  isDevelopment: true");
console.log("  isTest: false");

// ============================================
// Summary
// ============================================

console.log("\n=== Summary ===");
console.log("✅ process.env: Access environment variables");
console.log("✅ getEnvVar helper: Handle defaults and validation");
console.log("✅ Type-safe config: Convert strings to proper types");
console.log("✅ Validate at startup: Fail fast if config is missing");
console.log("✅ Secure logging: Hide sensitive data in logs");
console.log("✅ Config module: Centralize all configuration");

console.log("\n📁 Files to create:");
console.log("  .env                # Local (don't commit)");
console.log("  .env.example        # Template (commit this!)");
console.log("  config.ts           # Config module");

console.log("\n🔒 Security:");
console.log("  • NEVER commit .env files");
console.log("  • Always validate at startup");
console.log("  • Hide secrets in logs");

console.log("\n✅ Exercise complete!");
export {};
