import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../src/config/env";
import * as schema from "../src/schema";
import { execSync } from "child_process";

async function cleanPush() {
  const client = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    // Generate fresh migration
    console.log("Generating fresh migration...");
    execSync("npx drizzle-kit generate", { stdio: "inherit" });

    // Drop all tables and sequences
    console.log("Dropping all tables and sequences...");
    await client.unsafe(`
      DROP TABLE IF EXISTS public.recipe CASCADE;
      DROP TABLE IF EXISTS public.football_scores CASCADE;
      DROP TABLE IF EXISTS public.api_cache CASCADE;
      DROP TABLE IF EXISTS public.forecast_history CASCADE;
      DROP SEQUENCE IF EXISTS public.recipe_id_seq CASCADE;
    `);

    // Apply fresh migration
    console.log("Applying fresh migration...");
    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("Clean push completed successfully!");
    console.log("\nNext steps:");
    console.log("1. If using Vercel Postgres:");
    console.log(
      "   - Go to Vercel dashboard > Your project > Storage > Postgres"
    );
    console.log('   - Click "Reset Database"');
    console.log("   - Deploy your project to apply migrations");
    console.log("\n2. If using external Postgres:");
    console.log("   - Connect to your production database");
    console.log("   - Run the same clean-push script there");
  } catch (error) {
    console.error("Clean push failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

cleanPush();
