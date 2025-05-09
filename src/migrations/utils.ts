import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../config/env";
import * as schema from "../schema";
import { migrations } from "./meta";

export async function runMigrations() {
  const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient, { schema: { ...schema, migrations } });

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await migrationClient.end();
  }
}

export async function checkMigrations() {
  const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient, { schema: { ...schema, migrations } });

  try {
    const result = await db.query.migrations.findMany();
    return result;
  } catch (error) {
    console.error("Failed to check migrations:", error);
    throw error;
  } finally {
    await migrationClient.end();
  }
}
