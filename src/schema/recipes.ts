import {
  pgTable,
  index,
  integer,
  timestamp,
  varchar,
  text,
  jsonb,
  serial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const recipes = pgTable(
  "recipe",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    ingredients: jsonb("ingredients")
      .$type<{ name: string; quantity: number; unit?: string }[]>()
      .notNull()
      .default([]),
    instructions: text("instructions").notNull(),
    categories: jsonb("categories").$type<string[]>().notNull().default([]),
    prepTime: integer("prep_time"), // Prep time in minutes
    cookTime: integer("cook_time"), // Cook time in minutes
    servings: integer("servings"),
    imageUrl: varchar("image_url", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
    userId: varchar("user_id", { length: 256 }).notNull(), // Clerk user ID
  },
  (recipe) => ({
    userIdIndex: index("recipe_user_id_idx").on(recipe.userId),
  })
);

export type Recipe = typeof recipes.$inferSelect; // Type for SELECT
export type NewRecipe = typeof recipes.$inferInsert; // Type for INSERT
