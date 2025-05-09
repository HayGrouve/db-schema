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

```

```
