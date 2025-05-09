import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const migrations = pgTable("drizzle_migrations", {
  id: text("id").primaryKey(),
  hash: text("hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
