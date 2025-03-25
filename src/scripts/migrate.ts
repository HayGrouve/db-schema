import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const runMigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connectionString = process.env.DATABASE_URL;

  // For migrations, we need a connection with "max: 1"
  const sql = postgres(connectionString, { max: 1 });

  const db = drizzle(sql);

  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Migrations completed successfully");

  await sql.end();
  process.exit(0);
};

runMigration().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
