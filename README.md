# Shared Database Schema

This package provides a shared database schema for multiple projects using Drizzle ORM with PostgreSQL.

## Features

- Type-safe database schema definitions
- Migration management
- Environment validation
- Testing setup
- Schema versioning

## Installation

```bash
npm install @haygrouve/db-schema
```

## Environment Setup

Create a `.env` file in your project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
```

## Usage

```typescript
import { db } from "@haygrouve/db-schema";
import { recipes } from "@haygrouve/db-schema/schema";

// Query example
const allRecipes = await db.select().from(recipes);
```

## Development

### Prerequisites

- Node.js 16+
- PostgreSQL 12+

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your database URL
4. Run migrations: `npm run migrate`

### Available Scripts

- `npm run build` - Build the package
- `npm run generate` - Generate Drizzle migrations
- `npm run migrate` - Run database migrations
- `npm run push` - Push schema changes to database
- `npm run studio` - Open Drizzle Studio
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run validate` - Type-check the codebase
- `npm run schema:update` - Validate, generate, and push schema changes
- `npm run schema:publish` - Update schema and publish package
- `npm run version:patch` - Increment patch version and publish
- `npm run version:minor` - Increment minor version and publish
- `npm run version:major` - Increment major version and publish

## Versioning

This package follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):

### Version Types and Examples

#### MAJOR Version (Breaking Changes)

Use `npm run version:major` when making incompatible schema changes:

1. **Table Structure Changes**:

   ```typescript
   // Before
   export const users = pgTable("users", {
     id: serial("id").primaryKey(),
     name: text("name"),
   });

   // After (MAJOR change - renamed table)
   export const accounts = pgTable("accounts", {
     id: serial("id").primaryKey(),
     name: text("name"),
   });
   ```

2. **Field Type Changes**:

   ```typescript
   // Before
   export const products = pgTable("products", {
     price: integer("price"),
   });

   // After (MAJOR change - changed type)
   export const products = pgTable("products", {
     price: decimal("price", { precision: 10, scale: 2 }),
   });
   ```

3. **Removing Fields**:

   ```typescript
   // Before
   export const posts = pgTable("posts", {
     id: serial("id").primaryKey(),
     title: text("title"),
     oldField: text("old_field"), // Removing this
   });

   // After (MAJOR change - removed field)
   export const posts = pgTable("posts", {
     id: serial("id").primaryKey(),
     title: text("title"),
   });
   ```

#### MINOR Version (New Features)

Use `npm run version:minor` when adding backward-compatible functionality:

1. **Adding New Tables**:

   ```typescript
   // New table addition
   export const categories = pgTable("categories", {
     id: serial("id").primaryKey(),
     name: text("name").notNull(),
   });
   ```

2. **Adding New Fields**:

   ```typescript
   // Before
   export const recipes = pgTable("recipes", {
     id: serial("id").primaryKey(),
     title: text("title"),
   });

   // After (MINOR change - added field)
   export const recipes = pgTable("recipes", {
     id: serial("id").primaryKey(),
     title: text("title"),
     cookingTime: integer("cooking_time"), // New field
   });
   ```

3. **Adding Indexes**:

   ```typescript
   // Before
   export const users = pgTable("users", {
     id: serial("id").primaryKey(),
     email: text("email"),
   });

   // After (MINOR change - added index)
   export const users = pgTable(
     "users",
     {
       id: serial("id").primaryKey(),
       email: text("email"),
     },
     (table) => ({
       emailIdx: index("email_idx").on(table.email),
     })
   );
   ```

#### PATCH Version (Bug Fixes)

Use `npm run version:patch` for backward-compatible bug fixes:

1. **Fixing Field Constraints**:

   ```typescript
   // Before
   export const orders = pgTable("orders", {
     status: text("status"), // Missing notNull constraint
   });

   // After (PATCH change - added constraint)
   export const orders = pgTable("orders", {
     status: text("status").notNull(),
   });
   ```

2. **Fixing Default Values**:

   ```typescript
   // Before
   export const posts = pgTable("posts", {
     published: boolean("published"), // Missing default
   });

   // After (PATCH change - added default)
   export const posts = pgTable("posts", {
     published: boolean("published").default(false),
   });
   ```

3. **Fixing Field Lengths**:

   ```typescript
   // Before
   export const users = pgTable("users", {
     username: varchar("username", { length: 50 }), // Too short
   });

   // After (PATCH change - increased length)
   export const users = pgTable("users", {
     username: varchar("username", { length: 100 }),
   });
   ```

### Version Management

1. **Making Changes**:

   - Make your schema changes
   - Run tests: `npm test`
   - Update documentation if needed

2. **Choosing Version**:

   - Breaking changes → `npm run version:major`
   - New features → `npm run version:minor`
   - Bug fixes → `npm run version:patch`

3. **Version Scripts**:
   - `version:patch`: Updates patch version (1.0.0 → 1.0.1)
   - `version:minor`: Updates minor version (1.0.0 → 1.1.0)
   - `version:major`: Updates major version (1.0.0 → 2.0.0)

Each version script will:

1. Update the version in package.json
2. Create a git tag
3. Run schema updates
4. Build the package
5. Publish to npm

## Making Schema Changes

When you need to modify the database schema, follow these steps:

1. **Prerequisites**:

   - Ensure you have a backup of your database (especially for production)
   - Verify your `.env` file has the correct `DATABASE_URL`
   - Check you have proper database access rights

2. **Make Schema Changes**:

   - Edit the appropriate schema file in `src/schema/`
   - Common changes include:
     - Adding new fields
     - Modifying field types
     - Adding indexes
     - Creating new tables
     - Adding relations

3. **Update Schema (Quick Method)**:

   ```bash
   npm run schema:update
   ```

   This single command will:

   - Validate your changes (`npm run validate`)
   - Generate migration files (`npm run generate`)
   - Push changes to database (`npm run push`)

4. **Publish Changes (If Needed)**:
   ```bash
   npm run schema:publish
   ```
   This will:
   - Run all schema update steps
   - Build the package
   - Publish to npm

### Manual Steps (Alternative)

If you prefer to run steps individually:

1. **Validate Changes**:

   ```bash
   npm run validate
   ```

2. **Generate Migration**:

   ```bash
   npm run generate
   ```

   - Review the generated migration file in the `drizzle` directory

3. **Push Changes**:

   ```bash
   npm run push
   ```

   - Verify the changes in Drizzle Studio: `npm run studio`

4. **Build and Publish**:
   ```bash
   npm run build
   npm publish
   ```

### Example: Adding a New Field

```typescript
// src/schema/recipes.ts
export const recipes = pgTable("recipe", {
  // ... existing fields ...
  newField: varchar("new_field", { length: 256 }),
});
```

Then run:

```bash
npm run schema:update
```

## Schema Structure

The schema is organized by domain/feature:

- `src/schema/recipes.ts` - Recipe-related tables
- `src/schema/sportpredict.ts` - Sports prediction tables

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Add tests if applicable
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT
