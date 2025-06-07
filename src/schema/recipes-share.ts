import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  uuid,
  primaryKey,
  unique,
  decimal,
} from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Recipes
export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  instructions: text("instructions"),
  prepTime: integer("prep_time"),
  cookTime: integer("cook_time"),
  servings: integer("servings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isPublished: boolean("is_published").default(false),
});

// Ingredients
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

// RecipeIngredients (junction)
export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id),
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => ingredients.id),
    quantity: varchar("quantity", { length: 50 }),
    unit: varchar("unit", { length: 50 }),
    order: integer("order"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.ingredientId] }),
  })
);

// Instructions (step-by-step)
export const instructions = pgTable("instructions", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id),
  step: integer("step").notNull(),
  text: text("text").notNull(),
});

// RecipeImages
export const recipeImages = pgTable("recipe_images", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id),
  url: varchar("url", { length: 255 }).notNull(),
  alt: varchar("alt", { length: 255 }),
  order: integer("order"),
});

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

// RecipeCategories (junction)
export const recipeCategories = pgTable(
  "recipe_categories",
  {
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.categoryId] }),
  })
);

// Tags
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

// RecipeTags (junction)
export const recipeTags = pgTable(
  "recipe_tags",
  {
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.tagId] }),
  })
);

// Nutrition
export const nutrition = pgTable("nutrition", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id),
  calories: integer("calories"),
  protein: decimal("protein", { precision: 5, scale: 2 }),
  fat: decimal("fat", { precision: 5, scale: 2 }),
  carbs: decimal("carbs", { precision: 5, scale: 2 }),
  fiber: decimal("fiber", { precision: 5, scale: 2 }),
  sugar: decimal("sugar", { precision: 5, scale: 2 }),
  sodium: decimal("sodium", { precision: 5, scale: 2 }),
});

// Ratings
export const ratings = pgTable(
  "ratings",
  {
    id: serial("id").primaryKey(),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    unique: unique("unique_rating").on(table.recipeId, table.userId),
  })
);

// Comments
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SavedRecipes
export const savedRecipes = pgTable(
  "saved_recipes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id),
    savedAt: timestamp("saved_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.recipeId] }),
  })
);

// Collections
export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CollectionRecipes (junction)
export const collectionRecipes = pgTable(
  "collection_recipes",
  {
    collectionId: uuid("collection_id")
      .notNull()
      .references(() => collections.id),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.collectionId, table.recipeId] }),
  })
);

// Follows (user follows user)
export const follows = pgTable(
  "follows",
  {
    followerId: uuid("follower_id")
      .notNull()
      .references(() => users.id),
    followingId: uuid("following_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followingId] }),
  })
);
