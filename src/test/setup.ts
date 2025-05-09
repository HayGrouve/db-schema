import { env } from "../config/env";

// Set test environment
process.env.NODE_ENV = "test";

// Ensure we have a test database URL
if (!env.DATABASE_URL.includes("postgres")) {
  throw new Error(
    'Test database URL must contain "postgres" in the connection string'
  );
}

// Global test timeout
jest.setTimeout(10000);
