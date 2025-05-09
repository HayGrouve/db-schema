import { execSync } from "child_process";
import { env } from "../src/config/env";

async function resetVercelDb() {
  try {
    // Check if Vercel CLI is installed
    try {
      execSync("vercel --version", { stdio: "ignore" });
    } catch (error) {
      console.error("Vercel CLI is not installed. Please install it first:");
      console.error("npm i -g vercel");
      process.exit(1);
    }

    // Check if user is logged in to Vercel
    try {
      execSync("vercel whoami", { stdio: "ignore" });
    } catch (error) {
      console.error("Please login to Vercel first:");
      console.error("vercel login");
      process.exit(1);
    }

    console.log("Resetting Vercel database...");

    // Get project ID from DATABASE_URL
    const dbUrl = new URL(env.DATABASE_URL);
    const projectId = dbUrl.hostname.split(".")[0];

    // Reset the database using Vercel CLI
    execSync(`vercel env pull .env.production`, { stdio: "inherit" });

    // Get the database ID
    const dbInfo = execSync(`vercel storage ls`, { encoding: "utf-8" });
    const dbId = dbInfo.match(/postgres:\s*([a-z0-9-]+)/)?.[1];

    if (!dbId) {
      throw new Error("Could not find Postgres database ID");
    }

    // Reset the database
    console.log("Resetting database...");
    execSync(`vercel storage reset ${dbId} --yes`, { stdio: "inherit" });

    console.log("\nDatabase reset successfully!");
    console.log("\nNext steps:");
    console.log("1. Deploy your project to apply migrations:");
    console.log("   vercel deploy --prod");
  } catch (error) {
    console.error("Failed to reset Vercel database:", error);
    process.exit(1);
  }
}

resetVercelDb();
