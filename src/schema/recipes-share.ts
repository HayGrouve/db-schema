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
  index,
} from "drizzle-orm/pg-core";

// Users - Updated for Clerk integration
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  username: varchar("username", { length: 50 }).unique(),
  bio: text("bio"),
  profileImageUrl: varchar("profile_image_url", { length: 512 }),
  isPrivate: boolean("is_private").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // Legacy fields for backward compatibility
  name: varchar("name", { length: 100 }),
  image: varchar("image", { length: 255 }),
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
      .references(() => recipes.id, { onDelete: 'cascade' }),
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => ingredients.id),
    quantity: varchar("quantity", { length: 50 }),
    unit: varchar("unit", { length: 50 }),
    order: integer("order"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.ingredientId] }),
    recipeIdIdx: index("recipe_ingredients_recipe_id_idx").on(table.recipeId),
  })
);

// Instructions (step-by-step)
export const instructions = pgTable("instructions", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  step: integer("step").notNull(),
  text: text("text").notNull(),
}, (table) => ({
  recipeIdIdx: index("instructions_recipe_id_idx").on(table.recipeId),
}));

// RecipeImages - Updated with proper fields
export const recipeImages = pgTable("recipe_images", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
  altText: varchar("alt_text", { length: 255 }),
  isPrimary: boolean("is_primary").default(false),
  order: integer("order"),
}, (table) => ({
  recipeIdIdx: index("recipe_images_recipe_id_idx").on(table.recipeId),
}));

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
});

// RecipeCategories (junction)
export const recipeCategories = pgTable(
  "recipe_categories",
  {
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.categoryId] }),
    recipeIdIdx: index("recipe_categories_recipe_id_idx").on(table.recipeId),
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
      .references(() => recipes.id, { onDelete: 'cascade' }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.tagId] }),
    recipeIdIdx: index("recipe_tags_recipe_id_idx").on(table.recipeId),
  })
);

// Nutrition - Updated with proper field names
export const nutrition = pgTable("nutrition", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' })
    .unique(),
  calories: integer("calories"),
  protein: decimal("protein", { precision: 5, scale: 2 }),
  carbohydrates: decimal("carbohydrates", { precision: 5, scale: 2 }),
  fat: decimal("fat", { precision: 5, scale: 2 }),
  fiber: decimal("fiber", { precision: 5, scale: 2 }),
  sugar: decimal("sugar", { precision: 5, scale: 2 }),
  sodium: decimal("sodium", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  recipeIdIdx: index("nutrition_recipe_id_idx").on(table.recipeId),
}));

// Ratings
export const ratings = pgTable(
  "ratings",
  {
    id: serial("id").primaryKey(),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    unique: unique("unique_rating").on(table.recipeId, table.userId),
    recipeIdIdx: index("ratings_recipe_id_idx").on(table.recipeId),
    userIdIdx: index("ratings_user_id_idx").on(table.userId),
  })
);

// Comments
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  recipeIdIdx: index("comments_recipe_id_idx").on(table.recipeId),
  userIdIdx: index("comments_user_id_idx").on(table.userId),
}));

// SavedRecipes
export const savedRecipes = pgTable(
  "saved_recipes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
    savedAt: timestamp("saved_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.recipeId] }),
    userIdIdx: index("saved_recipes_user_id_idx").on(table.userId),
  })
);

// Collections
export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("collections_user_id_idx").on(table.userId),
}));

// CollectionRecipes (junction)
export const collectionRecipes = pgTable(
  "collection_recipes",
  {
    collectionId: uuid("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.collectionId, table.recipeId] }),
    collectionIdIdx: index("collection_recipes_collection_id_idx").on(table.collectionId),
  })
);

// Follows (user follows user)
export const follows = pgTable(
  "follows",
  {
    followerId: uuid("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    followingId: uuid("following_id")
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followingId] }),
    followerIdIdx: index("follows_follower_id_idx").on(table.followerId),
    followingIdIdx: index("follows_following_id_idx").on(table.followingId),
  })
);
