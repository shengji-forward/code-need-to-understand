// EXERCISE 3: Environment Variables
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx exercise-03-env.ts

console.log("=== Exercise 3: Environment Variables ===\n");

// ============================================
// TODO 1: Read environment variables
// ============================================
// Instructions:
// - Read the NODE_ENV environment variable
// - Read the PORT environment variable
// - Log both values with a message
// - Handle the case where they might be undefined

// TODO: Your code here
const nodeEnv = process.env.NODE_ENV
const port = process.env.PORT

console.log(" NODE_ENV:", nodeEnv ?? "not set" )
console.log(" Port:", port ?? "not set" )

// ============================================
// TODO 2: Create a getEnvVar helper function
// ============================================
// Instructions:
// - Create a function getEnvVar(key: string, defaultValue?: string)
// - If the env var exists, return it
// - If it doesn't exist but has a default, return the default
// - If it doesn't exist and has no default, throw an error

// TODO: Your code here
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key]
  
  if ( value === undefined ) {
    if ( defaultValue === undefined ) {
      throw new Error(`Missing: ${key}`)
    }
    return defaultValue
  }

  return value
}

// ============================================
// TODO 3: Create a type-safe config object
// ============================================
// Instructions:
// - Create a config object with type-safe values
// - Include: port (number), nodeEnv (string), databaseUrl (string, required)
// - Use your getEnvVar helper function
// - Convert port to a number

// TODO: Your code here
const config = {
  port: Number(getEnvVar("PORT", "3000")),
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  databaseUrl: getEnvVar("DATABASE_URL")
}

// ============================================
// TODO 4: Add validation for required variables
// ============================================
// Instructions:
// - Create a function that validates all required env vars at startup
// - Should throw an error if any required var is missing
// - List of required vars: DATABASE_URL, API_KEY

// TODO: Your code here
function validateEnv() {
  const varList = ["DATABASE_URL", "API_KEY"] as const
  for (const varName of varList) {
    if (!process.env[varName]) {
      throw new Error(`Missing: ${varName}`)
    }
  }
}

// ============================================
// TODO 5: Create a secure logging pattern
// ============================================
// Instructions:
// - Create a function that safely logs config
// - Should hide sensitive data (passwords, API keys)
// - Example: Hide password in "postgresql://user:pass@host:5432/db"

// TODO: Your code here
function logConfig(config: { port: number, nodeEnv: string, databaseUrl: string }): void {
  console.log("Port:", config.port)
  console.log("NodeEnv:", config.nodeEnv)

  const safeUrl = config.databaseUrl.replace(/:.+@/, ":***@")
  console.log("Database:", safeUrl)
}

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a complete config module pattern
// - Should: validate at startup, provide defaults, export a singleton
// - Include an isProduction boolean helper

// TODO: Your code here
try {
  validateEnv()
} catch (error) {
  console.error(error)
  process.exit(1)
}

export const appConfig = {
  ...config,
  isProduction: config.nodeEnv === "production"
}

console.log("\n✅ Exercise complete!");

export {};