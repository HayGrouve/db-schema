CREATE TABLE "api_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"last_fetched" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "api_cache_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "football_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"fixture_id" integer NOT NULL,
	"row_number" integer NOT NULL,
	"day" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"status" json NOT NULL,
	"home" json NOT NULL,
	"away" json NOT NULL,
	"score" json NOT NULL,
	"league" json NOT NULL,
	"odds" json NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "football_scores_fixture_id_unique" UNIQUE("fixture_id")
);
--> statement-breakpoint
CREATE TABLE "forecast_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"row_number" integer NOT NULL,
	"fixture_id" integer NOT NULL,
	"forecast" text NOT NULL,
	"is_correct" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "forecast_history_row_number_fixture_id_pk" PRIMARY KEY("row_number","fixture_id")
);
--> statement-breakpoint
DROP TABLE "posts" CASCADE;