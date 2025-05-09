import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../src/config/env";
import * as schema from "../src/schema";
import * as fs from "fs/promises";
import * as path from "path";

async function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(process.cwd(), "backups");
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

  const client = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(client, { schema });

  try {
    // Create backups directory if it doesn't exist
    await fs.mkdir(backupDir, { recursive: true });

    const backup: Record<string, any> = {
      timestamp: new Date().toISOString(),
    };

    // Function to safely backup a table
    async function safeBackupTable(
      tableName: string,
      query: () => Promise<any[]>
    ) {
      try {
        const data = await query();
        backup[tableName] = data;
        console.log(`Successfully backed up ${tableName}`);
      } catch (error: any) {
        if (error.code === "42P01") {
          // Table doesn't exist
          console.log(`Table ${tableName} doesn't exist, skipping...`);
          backup[tableName] = [];
        } else {
          throw error;
        }
      }
    }

    // Backup each table safely
    await safeBackupTable("recipes", () => db.select().from(schema.recipes));
    await safeBackupTable("footballScores", () =>
      db.select().from(schema.footballScores)
    );
    await safeBackupTable("apiCache", () => db.select().from(schema.apiCache));
    await safeBackupTable("forecastHistory", () =>
      db.select().from(schema.forecastHistory)
    );

    // Write backup to file
    await fs.writeFile(backupFile, JSON.stringify(backup, null, 2));
    console.log(`Backup created: ${backupFile}`);
  } catch (error) {
    console.error("Backup failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

backup();
